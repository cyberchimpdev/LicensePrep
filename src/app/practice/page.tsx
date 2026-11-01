"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { getAllQuestions, getSections } from "@/lib/question-parser";
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
  ListOrdered,
  RotateCcw,
  Filter,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") || "all";
  const initialQuestionNum = searchParams.get("question")
    ? parseInt(searchParams.get("question")!, 10)
    : null;

  const { progress, recordAttempt, toggleBookmark, isBookmarked } = useUserProgress();

  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [filterType, setFilterType] = useState<"all" | "unanswered" | "bookmarked">("all");
  const [mode, setMode] = useState<"sequential" | "random">("sequential");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const allQuestions = useMemo(() => getAllQuestions(), []);
  const sections = useMemo(() => getSections(), []);

  // Filter pool
  const filteredQuestions = useMemo(() => {
    let pool = allQuestions;

    if (selectedSection !== "all") {
      pool = pool.filter((q) => q.section === selectedSection);
    }

    if (filterType === "unanswered") {
      pool = pool.filter((q) => !progress.attemptedQuestions[q.number]);
    } else if (filterType === "bookmarked") {
      const bSet = new Set(progress.bookmarks);
      pool = pool.filter((q) => bSet.has(q.number));
    }

    if (mode === "random") {
      return shuffleArray(pool);
    }

    return pool;
  }, [allQuestions, selectedSection, filterType, mode, progress.bookmarks, progress.attemptedQuestions]);

  // Set initial question if provided in query
  useEffect(() => {
    if (initialQuestionNum && filteredQuestions.length > 0) {
      const idx = filteredQuestions.findIndex((q) => q.number === initialQuestionNum);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [initialQuestionNum, filteredQuestions]);

  // Ensure currentIndex stays within bounds
  useEffect(() => {
    if (currentIndex >= filteredQuestions.length) {
      setCurrentIndex(Math.max(0, filteredQuestions.length - 1));
    }
  }, [filteredQuestions.length, currentIndex]);

  const currentQuestion: Question | undefined = filteredQuestions[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
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
    saveLastPractice({
      questionNumber: qNum,
      section: selectedSection === "all" ? null : selectedSection,
      mode,
      timestamp: Date.now(),
    });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  // Keyboard navigation
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

  return (
    <PageContainer size="narrow" className="space-y-6">
      {/* Top Filter & Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Interactive Practice (अभ्यास)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice questions with instant answer evaluation and progress tracking.
            </p>
          </div>

          {/* Sequential vs Random Toggle */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setMode("sequential");
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === "sequential"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Sequential</span>
            </button>
            <button
              onClick={() => {
                setMode("random");
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === "random"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random</span>
            </button>
          </div>
        </div>

        {/* Section & Status Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Category (विषय)
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories (सम्पूर्ण ५०० प्रश्नहरू)</option>
              {sections.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Filter Questions
            </label>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setFilterType("all");
                  setCurrentIndex(0);
                }}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  filterType === "all"
                    ? "bg-navy-900 text-white border-navy-900 font-semibold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setFilterType("unanswered");
                  setCurrentIndex(0);
                }}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  filterType === "unanswered"
                    ? "bg-navy-900 text-white border-navy-900 font-semibold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Unanswered
              </button>
              <button
                onClick={() => {
                  setFilterType("bookmarked");
                  setCurrentIndex(0);
                }}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                  filterType === "bookmarked"
                    ? "bg-navy-900 text-white border-navy-900 font-semibold"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Bookmarked
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar in current set */}
        {filteredQuestions.length > 0 && (
          <div className="pt-2">
            <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
              <span>
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span>
                {Math.round(((currentIndex + 1) / filteredQuestions.length) * 100)}%
              </span>
            </div>
            <ProgressBar
              value={currentIndex + 1}
              max={filteredQuestions.length}
              size="sm"
              barColor="blue"
            />
          </div>
        )}
      </div>

      {/* Main Question Card or Empty State */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-card space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No questions match this filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {filterType === "bookmarked"
              ? "You haven't bookmarked any questions in this category yet. Click the bookmark icon on any question to save it."
              : filterType === "unanswered"
              ? "Great job! You have already practiced all questions in this selection."
              : "No questions found."}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilterType("all");
              setSelectedSection("all");
            }}
          >
            Reset Filters
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
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">
                {currentIndex + 1} / {filteredQuestions.length}
              </span>
              <button
                onClick={handleRestart}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Restart from beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={currentIndex >= filteredQuestions.length - 1}
              className="gap-1.5"
            >
              <span>Next</span>
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
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading practice session...</div>}>
      <PracticeContent />
    </Suspense>
  );
}

