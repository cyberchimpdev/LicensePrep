"use client";

import React, { useState, useEffect, useMemo, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { getAllQuestions, getSections, getValidExamQuestions } from "@/lib/question-parser";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Question } from "@/types/question";
import { shuffleArray } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { saveLastPractice } from "@/lib/storage";
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SET_SIZE_OPTIONS = [
  { value: 20, label: "२० प्रश्नहरू (Real Exam Format)" },
  { value: 10, label: "१० प्रश्नहरू (द्रुत अभ्यास)" },
  { value: 50, label: "५० प्रश्नहरू (विस्तृत अभ्यास)" },
  { value: 500, label: "सबै ५०० प्रश्नहरू (Full Bank)" },
];

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") || "all";
  const initialQuestionNum = searchParams.get("question")
    ? parseInt(searchParams.get("question")!, 10)
    : null;

  const { progress, recordAttempt, toggleBookmark, isBookmarked } = useUserProgress();

  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [setSize, setSetSize] = useState<number>(20);
  const [filterType, setFilterType] = useState<"all" | "unanswered" | "incorrect" | "bookmarked">("all");
  const [randomSeed, setRandomSeed] = useState<number>(() => Date.now());
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // In-session score tracking for this specific randomized set
  const [sessionResults, setSessionResults] = useState<Record<number, boolean>>({});

  const allQuestions = useMemo(() => getAllQuestions(), []);
  const validQuestions = useMemo(() => getValidExamQuestions(), []);
  const sections = useMemo(() => getSections(), []);

  // Generate randomized question set based on selected size, category and filter
  const activeQuestionSet = useMemo(() => {
    let pool = validQuestions;

    if (selectedSection !== "all") {
      pool = pool.filter((q) => q.section === selectedSection);
    }

    if (filterType === "unanswered") {
      pool = pool.filter((q) => !progress.attemptedQuestions[q.number]);
    } else if (filterType === "incorrect") {
      pool = pool.filter((q) => {
        const att = progress.attemptedQuestions[q.number];
        return att && !att.isCorrect;
      });
    } else if (filterType === "bookmarked") {
      const bSet = new Set(progress.bookmarks);
      pool = pool.filter((q) => bSet.has(q.number));
    }

    // Always shuffle for unpredictable randomized training (except when full bank is explicitly chosen)
    if (setSize !== 500) {
      const shuffled = shuffleArray(pool);
      return shuffled.slice(0, Math.min(setSize, shuffled.length));
    }

    return pool;
    // Dependency on randomSeed allows users to regenerate a fresh set with 1 click
  }, [validQuestions, selectedSection, filterType, setSize, randomSeed, progress.bookmarks, progress.attemptedQuestions]);

  // Set initial question if passed via URL query
  useEffect(() => {
    if (initialQuestionNum && activeQuestionSet.length > 0) {
      const idx = activeQuestionSet.findIndex((q) => q.number === initialQuestionNum);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [initialQuestionNum, activeQuestionSet]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= activeQuestionSet.length) {
      setCurrentIndex(Math.max(0, activeQuestionSet.length - 1));
    }
  }, [activeQuestionSet.length, currentIndex]);

  const currentQuestion: Question | undefined = activeQuestionSet[currentIndex];

  // Generate new random set
  const handleGenerateNewSet = useCallback(() => {
    setRandomSeed(Date.now());
    setCurrentIndex(0);
    setSessionResults({});
  }, []);

  const handleNext = () => {
    if (currentIndex < activeQuestionSet.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleAnswerSubmitted = (
    qNum: number,
    key: string,
    isCorrect: boolean
  ) => {
    recordAttempt(qNum, key, isCorrect);
    setSessionResults((prev) => ({
      ...prev,
      [qNum]: isCorrect,
    }));
    saveLastPractice({
      questionNumber: qNum,
      section: selectedSection === "all" ? null : selectedSection,
      mode: "random",
      timestamp: Date.now(),
    });
  };

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Calculate session progress
  const answeredInSession = Object.keys(sessionResults).length;
  const correctInSession = Object.values(sessionResults).filter(Boolean).length;
  const isSetCompleted = activeQuestionSet.length > 0 && answeredInSession >= activeQuestionSet.length;
  const sessionPercentage = activeQuestionSet.length > 0
    ? Math.round((correctInSession / activeQuestionSet.length) * 100)
    : 0;
  const isSessionPassed = sessionPercentage >= 50;

  return (
    <PageContainer size="narrow" className="space-y-5">
      {/* Set Controls & Configuration Header */}
      <div className="bg-white rounded-xl border border-zinc-200 p-4 sm:p-5 space-y-4 shadow-sm font-devanagari">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>वास्तविक लिखित परीक्षा ढाँचा (Randomized Exam Practice)</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
              अनियमित प्रश्न अभ्यास (Random Practice)
            </h1>
          </div>

          {/* New Random Set Trigger */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleGenerateNewSet}
            className="gap-2 font-semibold text-xs rounded-lg self-start sm:self-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>नयाँ प्रश्न सेट (New Random Set)</span>
          </Button>
        </div>

        {/* Set Size & Category Selector Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-3 border-t border-zinc-100 items-center">
          {/* Set Size Dropdown */}
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
              प्रश्न संख्या (Set Size):
            </label>
            <select
              value={setSize}
              onChange={(e) => {
                setSetSize(parseInt(e.target.value, 10));
                handleGenerateNewSet();
              }}
              className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SET_SIZE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
              विषय छनोट (Category):
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                handleGenerateNewSet();
              }}
              className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">सबै विषयहरू (६ खण्डहरू)</option>
              {sections.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.count})
                </option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
              अवस्था (Status):
            </label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value as any);
                handleGenerateNewSet();
              }}
              className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">सबै प्रश्नहरू (All)</option>
              <option value="unanswered">नयाँ प्रश्नहरू (New)</option>
              <option value="incorrect">गलत भएका (Mistakes)</option>
              <option value="bookmarked">सुरक्षित (Saved)</option>
            </select>
          </div>
        </div>

        {/* Question Palette / Mini Navigator (1 to 20 Grid) */}
        {activeQuestionSet.length > 0 && (
          <div className="pt-2 border-t border-zinc-100 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
              <span>
                सेट प्रगति: <strong>{answeredInSession}</strong> / {activeQuestionSet.length} हल गरियो
              </span>
              <span className="text-blue-600 font-semibold font-sans">
                {correctInSession} सही ({sessionPercentage}%)
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-0.5">
              {activeQuestionSet.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const status = sessionResults[q.number];
                const isSaved = isBookmarked(q.number);

                let itemClass = "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200";

                if (isCurrent) {
                  itemClass = "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 font-bold";
                } else if (status === true) {
                  itemClass = "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold";
                } else if (status === false) {
                  itemClass = "bg-rose-50 text-rose-800 border-rose-300 font-semibold";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "w-7 h-7 rounded-lg text-xs font-medium border flex items-center justify-center transition-all shrink-0",
                      itemClass
                    )}
                    title={`प्रश्न नं. ${q.number} मा जानुहोस्`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Set Completed Banner (Appears when all questions in this random set are answered) */}
      {isSetCompleted && (
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm space-y-3 font-devanagari">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                  isSessionPassed ? "bg-emerald-600" : "bg-rose-600"
                )}
              >
                {isSessionPassed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                  {isSessionPassed
                    ? `बधाई छ! यस सेटमा तपाईं उत्तीर्ण हुनुभयो (${sessionPercentage}%)`
                    : `यस सेटमा थप अभ्यास आवश्यक छ (${sessionPercentage}%)`}
                </h3>
                <p className="text-xs text-zinc-500">
                  कुल {activeQuestionSet.length} प्रश्नहरू मध्ये {correctInSession} सही उत्तर। उत्तीर्ण मापदण्ड: ५०%।
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleGenerateNewSet}
              className="gap-1.5 rounded-lg text-xs font-semibold shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>अर्को सेट लिनुहोस्</span>
            </Button>
          </div>
        </div>
      )}

      {/* Main Question Card or Empty State */}
      {activeQuestionSet.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-200 p-10 text-center shadow-sm space-y-3 font-devanagari">
          <HelpCircle className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800">
            यस फिल्टरमा कुनै प्रश्न फेला परेन
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
            {filterType === "incorrect"
              ? "बधाई छ! यस वर्गमा तपाईंको कुनै पनि गलत उत्तर बाँकी छैन।"
              : filterType === "bookmarked"
              ? "तपाईंले यस वर्गमा कुनै पनि प्रश्न सुरक्षित गर्नुभएको छैन।"
              : "कृपया अन्य वर्ग छनोट गर्नुहोस् वा फिल्टर रिसेट गर्नुहोस्।"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilterType("all");
              setSelectedSection("all");
              handleGenerateNewSet();
            }}
            className="rounded-lg text-xs font-semibold"
          >
            सबै प्रश्नहरू देखाउनुहोस्
          </Button>
        </div>
      ) : currentQuestion ? (
        <div className="space-y-4">
          <QuestionCard
            key={currentQuestion.number}
            question={currentQuestion}
            isBookmarked={isBookmarked(currentQuestion.number)}
            onToggleBookmark={toggleBookmark}
            onAnswerSubmitted={handleAnswerSubmitted}
            savedAnswer={progress.attemptedQuestions[currentQuestion.number]}
          />

          {/* Navigation Controls Footer */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-3.5 flex items-center justify-between gap-3 font-devanagari">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="gap-1.5 rounded-lg text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>अघिल्लो (Previous)</span>
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-700">
                सेट प्रश्न {currentIndex + 1} / {activeQuestionSet.length}
              </span>
              <button
                onClick={handleGenerateNewSet}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                title="नयाँ सेट सुरु गर्नुहोस्"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex >= activeQuestionSet.length - 1}
              className="gap-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white"
            >
              <span>पछिल्लो (Next)</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-zinc-500 font-medium">
          अभ्यास सत्र लोड हुँदैछ...
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
