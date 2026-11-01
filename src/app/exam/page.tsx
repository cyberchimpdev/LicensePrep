"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Settings,
  ShieldCheck,
  Timer,
  Play,
  RotateCcw,
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
  const [customConfig, setCustomConfig] = useState<ExamConfig>({
    title: "कस्टम नमुना परीक्षा (Custom Exam)",
    questionCount: 20,
    timeLimitMinutes: 30,
    passingPercentage: 50,
    randomizeQuestions: true,
    randomizeOptions: true,
  });

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isTimeExpired, setIsTimeExpired] = useState(false);

  // Check if an existing exam was in progress
  useEffect(() => {
    const saved = getActiveExam<ActiveExamPayload>();
    if (saved && saved.questions && saved.questions.length > 0) {
      setActiveSession(saved);
    }
  }, []);

  // Timer interval
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
        // Periodically save to localStorage
        if (prev.timeRemainingSeconds % 5 === 0) {
          saveActiveExam(updated);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession !== null]);

  // Start a new exam
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

    // Toggle selection if clicked again or change
    currentQ.userSelectedKey =
      currentQ.userSelectedKey === optionKey ? undefined : optionKey;
    questions[activeSession.currentIndex] = currentQ;

    const updated = { ...activeSession, questions };
    setActiveSession(updated);
    saveActiveExam(updated);
  };

  // Flag toggle
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

  // Navigation
  const handleNext = () => {
    if (!activeSession) return;
    if (activeSession.currentIndex < activeSession.questions.length - 1) {
      setActiveSession((prev) =>
        prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : null
      );
    }
  };

  const handlePrev = () => {
    if (!activeSession) return;
    if (activeSession.currentIndex > 0) {
      setActiveSession((prev) =>
        prev ? { ...prev, currentIndex: prev.currentIndex - 1 } : null
      );
    }
  };

  const handleSelectQuestionIndex = (index: number) => {
    if (!activeSession) return;
    setActiveSession((prev) => (prev ? { ...prev, currentIndex: index } : null));
  };

  // Submission
  const handleConfirmSubmit = () => {
    if (!activeSession) return;

    const timeSpent =
      activeSession.config.timeLimitMinutes * 60 -
      activeSession.timeRemainingSeconds;

    const result = gradeExam(
      activeSession.questions,
      Math.max(1, timeSpent),
      activeSession.config
    );

    saveExamResult(result);
    clearActiveExam();
    setActiveSession(null);
    setShowSummaryModal(false);

    router.push("/results");
  };

  const handleCancelActiveExam = () => {
    if (confirm("Are you sure you want to abandon this examination session?")) {
      clearActiveExam();
      setActiveSession(null);
      setIsTimeExpired(false);
      setShowSummaryModal(false);
    }
  };

  // ==========================================
  // VIEW: Exam Setup / Configuration
  // ==========================================
  if (!activeSession) {
    return (
      <PageContainer size="narrow" className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white mx-auto flex items-center justify-center shadow-md">
            <Award className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mock Examination Simulation
          </h1>
          <p className="text-sm text-slate-600">
            Simulate the official Nepal DOTM driving license written test with timed questions, randomized options, and instant grading.
          </p>
        </div>

        {/* Examination Presets */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs text-slate-500">
            Choose Examination Mode
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEFAULT_EXAM_CONFIGS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id!)}
                  className={cn(
                    "p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none relative group",
                    isSelected
                      ? "border-blue-600 bg-blue-50/40 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  )}
                >
                  {preset.id === "standard" && (
                    <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      Official Format
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {preset.title?.split("(")[0]}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {preset.title?.includes("(")
                        ? `(${preset.title.split("(")[1]}`
                        : ""}
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span><strong>{preset.questionCount}</strong> Questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-indigo-600" />
                        <span><strong>{preset.timeLimitMinutes}</strong> Minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Pass Mark: <strong>{preset.passingPercentage}%</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600">
                      {isSelected ? "Selected" : "Select"}
                    </span>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300"
                      )}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Start CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 space-y-0.5 text-center sm:text-left">
              <p>• Correct answers remain hidden until final submission.</p>
              <p>• You can mark questions to review before finishing.</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const conf = DEFAULT_EXAM_CONFIGS.find((p) => p.id === selectedPresetId);
                if (conf) handleStartExam(conf);
              }}
              className="w-full sm:w-auto px-8 gap-2 bg-navy-900 hover:bg-navy-800"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Begin Examination Now</span>
            </Button>
          </div>
        </div>

        {/* Rules note */}
        <div className="bg-slate-100/70 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
          <h4 className="font-bold text-slate-800">Examination Instructions:</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>The questions are randomly selected from the official 500-question Nepal DOTM syllabus.</li>
            <li>Each question has multiple choices. Click one option to register your response.</li>
            <li>The examination will automatically submit when the countdown timer reaches 00:00.</li>
            <li>Each correct answer carries 1 mark. There is no negative marking for incorrect answers.</li>
          </ul>
        </div>
      </PageContainer>
    );
  }

  // ==========================================
  // VIEW: Active Exam Running
  // ==========================================
  const currentQ = activeSession.questions[activeSession.currentIndex];
  const totalQuestions = activeSession.questions.length;
  const answeredCount = activeSession.questions.filter((q) => Boolean(q.userSelectedKey)).length;
  const flaggedCount = activeSession.questions.filter((q) => q.isFlagged).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Header with Timer & Submit */}
      <ExamHeader
        title={activeSession.config.title || "सवारी चालक अनुमतिपत्र नमुना परीक्षा"}
        timeRemainingSeconds={activeSession.timeRemainingSeconds}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        onSubmitClick={() => setShowSummaryModal(true)}
      />

      <PageContainer size="wide" className="flex-1 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Area (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 space-y-6">
              {/* Question Meta */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm px-3 py-1 rounded-lg bg-navy-900 text-white">
                    Question {activeSession.currentIndex + 1} of {totalQuestions}
                  </span>
                  <Badge variant="info">{currentQ.section}</Badge>
                </div>

                {/* Flag for Review */}
                <button
                  onClick={handleToggleFlag}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
                    currentQ.isFlagged
                      ? "bg-amber-50 text-amber-800 border-amber-300"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <Flag
                    className={cn(
                      "w-3.5 h-3.5",
                      currentQ.isFlagged ? "fill-current text-amber-500" : "text-slate-400"
                    )}
                  />
                  <span>
                    {currentQ.isFlagged ? "Flagged for Review" : "Flag for Later"}
                  </span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-devanagari">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = currentQ.userSelectedKey === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={cn(
                        "w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 select-none group",
                        isSelected
                          ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 text-blue-950 font-medium"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50/50 text-slate-800"
                      )}
                    >
                      <div
                        className={cn(
                          "w-7 h-7 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 border mt-0.5 transition-colors",
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-100 text-slate-700 border-slate-200 group-hover:border-blue-400"
                        )}
                      >
                        {opt.key}
                      </div>
                      <div className="flex-1 font-medium leading-relaxed pt-0.5 text-base font-devanagari">
                        {opt.text}
                      </div>
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
                    Clear selection
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handlePrev}
                disabled={activeSession.currentIndex === 0}
                className="gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <button
                onClick={handleCancelActiveExam}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Exit Exam</span>
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                disabled={activeSession.currentIndex >= totalQuestions - 1}
                className="gap-1.5"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Palette Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <ExamPalette
              questions={activeSession.questions}
              currentIndex={activeSession.currentIndex}
              onSelectQuestion={handleSelectQuestionIndex}
            />

            {/* Quick Finish Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Examination Status
              </h4>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Total Answered:</span>
                <strong className="text-slate-900 font-bold">{answeredCount} / {totalQuestions}</strong>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Remaining:</span>
                <strong className="text-amber-700 font-bold">{unansweredCount}</strong>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setShowSummaryModal(true)}
                className="w-full mt-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold"
              >
                Submit Examination
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Confirmation / Timeout Modal */}
      <ExamSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onConfirmSubmit={handleConfirmSubmit}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        flaggedCount={flaggedCount}
        isTimeExpired={isTimeExpired}
      />
    </div>
  );
}

