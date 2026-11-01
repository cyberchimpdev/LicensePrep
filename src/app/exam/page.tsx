"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ExamConfig, ExamQuestion } from "@/types/question";
import { DEFAULT_EXAM_CONFIGS, createExamSession } from "@/lib/exam-engine";
import { gradeExam } from "@/lib/answer-checker";
import { saveExamResult, saveActiveExam, getActiveExam, clearActiveExam } from "@/lib/storage";
import { ExamHeader } from "@/components/exam/ExamHeader";
import { ExamPalette } from "@/components/exam/ExamPalette";
import { ExamSummaryModal } from "@/components/exam/ExamSummaryModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Flag,
  ShieldCheck,
  Timer,
  Play,
  RotateCcw,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Monitor,
  Check,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveExamPayload {
  config: ExamConfig;
  questions: ExamQuestion[];
  currentIndex: number;
  timeRemainingSeconds: number;
  startedAt: number;
}

export default function ExamPage() {
  const router = useRouter();

  const [activeSession, setActiveSession] = useState<ActiveExamPayload | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("standard");
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);

  // Check if an existing exam was in progress
  useEffect(() => {
    const saved = getActiveExam<ActiveExamPayload>();
    if (saved && saved.questions && saved.questions.length > 0) {
      setActiveSession(saved);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!activeSession) return;

    const timer = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev) return null;
        if (prev.timeRemainingSeconds <= 1) {
          clearInterval(timer);
          setIsTimeExpired(true);
          setShowSummaryModal(true);
          return { ...prev, timeRemainingSeconds: 0 };
        }
        const updated = {
          ...prev,
          timeRemainingSeconds: prev.timeRemainingSeconds - 1,
        };
        // Save periodically
        if (prev.timeRemainingSeconds % 5 === 0) {
          saveActiveExam(updated);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession !== null]);

  // Start exam
  const handleStartExam = (config: ExamConfig) => {
    const questions = createExamSession(config);
    const newSession: ActiveExamPayload = {
      config,
      questions,
      currentIndex: 0,
      timeRemainingSeconds: config.timeLimitMinutes * 60,
      startedAt: Date.now(),
    };
    setActiveSession(newSession);
    saveActiveExam(newSession);
  };

  // Option selection
  const handleSelectOption = (optionKey: string) => {
    if (!activeSession) return;
    const questions = [...activeSession.questions];
    const currentQ = { ...questions[activeSession.currentIndex] };

    // Toggle if same option tapped
    if (currentQ.userSelectedKey === optionKey) {
      currentQ.userSelectedKey = undefined;
    } else {
      currentQ.userSelectedKey = optionKey;
    }

    questions[activeSession.currentIndex] = currentQ;
    const updated = { ...activeSession, questions };
    setActiveSession(updated);
    saveActiveExam(updated);
  };

  // Toggle flag
  const handleToggleFlag = () => {
    if (!activeSession) return;
    const questions = [...activeSession.questions];
    const currentQ = { ...questions[activeSession.currentIndex] };
    currentQ.isFlagged = !currentQ.isFlagged;
    questions[activeSession.currentIndex] = currentQ;
    const updated = { ...activeSession, questions };
    setActiveSession(updated);
    saveActiveExam(updated);
  };

  // Navigate question
  const handleSelectQuestion = (idx: number) => {
    if (!activeSession) return;
    if (idx >= 0 && idx < activeSession.questions.length) {
      const updated = { ...activeSession, currentIndex: idx };
      setActiveSession(updated);
      setMobilePaletteOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (!activeSession) return;
    if (activeSession.currentIndex < activeSession.questions.length - 1) {
      handleSelectQuestion(activeSession.currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!activeSession) return;
    if (activeSession.currentIndex > 0) {
      handleSelectQuestion(activeSession.currentIndex - 1);
    }
  };

  // Submit exam and grade
  const handleSubmitExam = () => {
    if (!activeSession) return;

    const timeSpent =
      activeSession.config.timeLimitMinutes * 60 - activeSession.timeRemainingSeconds;

    const gradedResult = gradeExam(
      activeSession.questions,
      Math.max(1, timeSpent),
      activeSession.config
    );

    saveExamResult(gradedResult);
    clearActiveExam();
    setActiveSession(null);
    router.push("/results");
  };

  // Abandon exam
  const handleCancelActiveExam = () => {
    if (
      window.confirm(
        "के तपाईं यो परीक्षा रद्द गर्न चाहनुहुन्छ? तपाईंको अहिलेसम्मको प्रगति सुरक्षित हुने छैन।"
      )
    ) {
      clearActiveExam();
      setActiveSession(null);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!activeSession) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const keyMap: Record<string, number> = {
        "1": 0, "2": 1, "3": 2, "4": 3,
        "a": 0, "b": 1, "c": 2, "d": 3,
        "A": 0, "B": 1, "C": 2, "D": 3,
      };

      if (e.key in keyMap) {
        const curQ = activeSession.questions[activeSession.currentIndex];
        const optIndex = keyMap[e.key];
        if (curQ.options[optIndex]) {
          handleSelectOption(curQ.options[optIndex].key);
        }
      } else if (e.key === "f" || e.key === "F") {
        handleToggleFlag();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSession]);

  // ==========================================
  // VIEW: Exam Configuration / Preset Selection
  // ==========================================
  if (!activeSession) {
    return (
      <PageContainer size="narrow" className="space-y-6 font-devanagari">
        <div className="text-center max-w-xl mx-auto space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-[0_4px_16px_rgba(37,99,235,0.3)]">
            <Monitor className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            कम्प्युटर आधारित लिखित परीक्षा (CBT Simulation)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            यातायात व्यवस्था विभागको आधिकारिक वर्ग ‘क’ (Motorcycle) र ‘ट’ (Scooter) लिखित परीक्षाको वास्तविक कम्प्युटर प्रणाली।
          </p>
        </div>

        {/* Examination Presets */}
        <div className="liquid-glass-card p-5 sm:p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              परीक्षा प्रकार छनोट गर्नुहोस्
            </h2>
            <span className="text-xs font-semibold text-blue-600">DOTM आधिकारिक ढाँचा</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DEFAULT_EXAM_CONFIGS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id!)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none relative group",
                    isSelected
                      ? "liquid-glass-active"
                      : "liquid-glass hover:bg-white"
                  )}
                >
                  {preset.id === "standard" && (
                    <div className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      आधिकारिक ढाँचा
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {preset.title?.split("(")[0]}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {preset.title?.includes("(")
                        ? `(${preset.title.split("(")[1]}`
                        : ""}
                    </p>

                    <div className="mt-3 space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span><strong>{preset.questionCount}</strong> बहुवैकल्पिक प्रश्नहरू</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5 text-amber-600" />
                        <span><strong>{preset.timeLimitMinutes}</strong> मिनेट समय</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>उत्तीर्ण: <strong>{preset.passingPercentage}%</strong> अङ्क</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? "text-blue-600" : "text-slate-500"}>
                      {isSelected ? "छनोट गरिएको" : "छनोट गर्नुहोस्"}
                    </span>
                    <input
                      type="radio"
                      name="examPreset"
                      checked={isSelected}
                      onChange={() => setSelectedPresetId(preset.id!)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Exam Rules & Instructions */}
          <div className="p-4 rounded-xl liquid-glass space-y-2 text-xs text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>परीक्षा निर्देशन तथा नियमहरू:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>परीक्षा सुरु भएपछि ३० मिनेटको घडी निरन्तर चल्नेछ।</li>
              <li>कुनै पनि प्रश्न बाँकी राख्न वा पछि समीक्षा गर्नका लागि &apos;Flag&apos; गर्न सकिन्छ।</li>
              <li>समय समाप्त भएपछि परीक्षा स्वतः बुझाइनेछ र नतिजा तत्काल प्रदर्शित हुनेछ।</li>
              <li>प्रत्येक प्रश्नको उत्तर विकल्पहरू निष्पक्षताका लागि अनियमित क्रममा राखिएका हुन्छन्।</li>
            </ul>
          </div>

          {/* Start CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <div className="text-xs text-slate-500 font-medium">
              तयारी पूरा भएपछि मात्र परीक्षा सुरु गर्नुहोस्।
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const selected =
                  DEFAULT_EXAM_CONFIGS.find((p) => p.id === selectedPresetId) ||
                  DEFAULT_EXAM_CONFIGS[0];
                handleStartExam(selected);
              }}
              className="w-full sm:w-auto px-6 font-semibold rounded-xl shadow-[0_4px_16px_rgba(37,99,235,0.3)] gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>परीक्षा सुरु गर्नुहोस् (Start CBT Exam)</span>
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  // ==========================================
  // VIEW: Active Exam Taking Interface
  // ==========================================
  const totalQuestions = activeSession.questions.length;
  const currentQ = activeSession.questions[activeSession.currentIndex];
  const answeredCount = activeSession.questions.filter((q) => Boolean(q.userSelectedKey)).length;
  const flaggedCount = activeSession.questions.filter((q) => q.isFlagged).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen flex flex-col font-devanagari">
      {/* Sticky Liquid Glass Header with Timer & Submit */}
      <ExamHeader
        title={activeSession.config.title || "सवारी चालक अनुमतिपत्र नमुना परीक्षा"}
        timeRemainingSeconds={activeSession.timeRemainingSeconds}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        onSubmitClick={() => setShowSummaryModal(true)}
      />

      <PageContainer size="wide" className="flex-1 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Question Card (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="liquid-glass-card p-5 sm:p-7 space-y-5">
              {/* Question Meta */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded-lg bg-blue-600 text-white">
                    प्रश्न {activeSession.currentIndex + 1} / {totalQuestions}
                  </span>
                  <Badge variant="info">{currentQ.section}</Badge>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                    अङ्क: ५ (5 Marks)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Palette Toggle */}
                  <button
                    onClick={() => setMobilePaletteOpen(!mobilePaletteOpen)}
                    className="lg:hidden p-1.5 rounded-lg text-slate-600 liquid-glass hover:bg-white text-xs font-semibold flex items-center gap-1.5"
                    title="View Palette"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Grid</span>
                  </button>

                  {/* Flag for Review */}
                  <button
                    onClick={handleToggleFlag}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all active:scale-95",
                      currentQ.isFlagged
                        ? "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-300"
                        : "liquid-glass text-slate-600 hover:bg-white"
                    )}
                  >
                    <Flag
                      className={cn(
                        "w-3.5 h-3.5",
                        currentQ.isFlagged ? "fill-current text-amber-500" : "text-slate-400"
                      )}
                    />
                    <span>{currentQ.isFlagged ? "Flagged" : "Flag for Later"}</span>
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed font-devanagari">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {currentQ.options.map((opt) => {
                  const isSelected = currentQ.userSelectedKey === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={cn(
                        "w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 select-none group active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500",
                        isSelected
                          ? "liquid-glass-active text-blue-950 font-bold"
                          : "liquid-glass hover:bg-white text-slate-800"
                      )}
                    >
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border mt-0.5 transition-colors",
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-slate-100 text-slate-700 border-slate-200 group-hover:border-blue-300"
                        )}
                      >
                        {opt.key}
                      </div>
                      <div className="flex-1 font-medium leading-relaxed pt-0.5 text-sm sm:text-base font-devanagari">
                        {opt.text}
                      </div>
                      {isSelected && (
                        <div className="shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Clear Selection Option */}
              {currentQ.userSelectedKey && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleSelectOption(currentQ.userSelectedKey!)}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    छनोट हटाउनुहोस् (Clear selection)
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="liquid-glass-card p-3.5 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={activeSession.currentIndex === 0}
                className="gap-1.5 rounded-xl text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>अघिल्लो (Previous)</span>
              </Button>

              <button
                onClick={handleCancelActiveExam}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">परीक्षा रद्द गर्नुहोस्</span>
              </button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                disabled={activeSession.currentIndex >= totalQuestions - 1}
                className="gap-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                <span>पछिल्लो (Next)</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Question Palette Sidebar (lg:col-span-4) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <ExamPalette
              questions={activeSession.questions}
              currentIndex={activeSession.currentIndex}
              onSelectQuestion={handleSelectQuestion}
            />

            {/* Submit Action Box */}
            <div className="liquid-glass-card p-4 space-y-3">
              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>हल गरिएका प्रश्न:</span>
                  <strong className="text-emerald-700 font-bold font-sans">{answeredCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>बाँकी प्रश्न:</span>
                  <strong className="text-slate-700 font-bold font-sans">{unansweredCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>समीक्षा (Flag):</span>
                  <strong className="text-amber-700 font-bold font-sans">{flaggedCount}</strong>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowSummaryModal(true)}
                className="w-full font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-[0_2px_10px_rgba(37,99,235,0.25)]"
              >
                परीक्षा बुझाउनुहोस् (Submit Exam)
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Mobile Palette Drawer / Modal */}
      {mobilePaletteOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end">
          <div className="bg-white/95 backdrop-blur-2xl w-full rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto space-y-4 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900">प्रश्न नेभिगेटर (Palette)</h3>
              <button
                onClick={() => setMobilePaletteOpen(false)}
                className="text-xs font-bold text-slate-500 p-1"
              >
                बन्द गर्नुहोस्
              </button>
            </div>
            <ExamPalette
              questions={activeSession.questions}
              currentIndex={activeSession.currentIndex}
              onSelectQuestion={handleSelectQuestion}
            />
          </div>
        </div>
      )}

      {/* Confirmation & Summary Modal */}
      <ExamSummaryModal
        isOpen={showSummaryModal}
        isTimeExpired={isTimeExpired}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        unansweredCount={unansweredCount}
        onClose={() => !isTimeExpired && setShowSummaryModal(false)}
        onConfirmSubmit={handleSubmitExam}
      />
    </div>
  );
}
