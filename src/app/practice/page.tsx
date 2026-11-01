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
  Search,
  ArrowRight,
  XCircle,
} from "lucide-react";

function PracticeContent() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") || "all";
  const initialQuestionNum = searchParams.get("question")
    ? parseInt(searchParams.get("question")!, 10)
    : null;

  const { progress, recordAttempt, toggleBookmark, isBookmarked } = useUserProgress();

  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [filterType, setFilterType] = useState<"all" | "unanswered" | "incorrect" | "bookmarked">("all");
  const [mode, setMode] = useState<"sequential" | "random">("sequential");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [jumpInput, setJumpInput] = useState<string>("");

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
    } else if (filterType === "incorrect") {
      pool = pool.filter((q) => {
        const att = progress.attemptedQuestions[q.number];
        return att && !att.isCorrect;
      });
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

  const handleJumpToQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (isNaN(num)) return;

    const targetIdx = filteredQuestions.findIndex((q) => q.number === num);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
      setJumpInput("");
    } else {
      // If question exists in all questions but not in current filter, reset filters
      const globalQ = allQuestions.find((q) => q.number === num);
      if (globalQ) {
        setSelectedSection("all");
        setFilterType("all");
        const newIdx = allQuestions.findIndex((q) => q.number === num);
        setCurrentIndex(newIdx);
        setJumpInput("");
      }
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

  // Global Left/Right Arrow keyboard navigation
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
      {/* Top Filter & Navigation Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Interactive Practice (वस्तुगत अभ्यास)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Practice questions with instant evaluation and persistent progress tracking.
            </p>
          </div>

          {/* Sequential vs Random Toggle */}
          <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => {
                setMode("sequential");
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-slate-100 items-end">
          {/* Category Dropdown */}
          <div className="sm:col-span-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category (विषयगत छनोट)
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories (सम्पूर्ण ५०० प्रश्नहरू)</option>
              {sections.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.count} Qs)
                </option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          <div className="sm:col-span-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Filter by Status
            </label>
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => {
                  setFilterType("all");
                  setCurrentIndex(0);
                }}
                className={`py-2 px-1.5 rounded-xl text-xs font-bold border text-center transition-all ${
                  filterType === "all"
                    ? "bg-navy-900 text-white border-navy-900 shadow-sm"
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
                className={`py-2 px-1.5 rounded-xl text-xs font-bold border text-center transition-all ${
                  filterType === "unanswered"
                    ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                New
              </button>
              <button
                onClick={() => {
                  setFilterType("incorrect");
                  setCurrentIndex(0);
                }}
                className={`py-2 px-1.5 rounded-xl text-xs font-bold border text-center transition-all ${
                  filterType === "incorrect"
                    ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                }`}
              >
                Mistakes
              </button>
              <button
                onClick={() => {
                  setFilterType("bookmarked");
                  setCurrentIndex(0);
                }}
                className={`py-2 px-1.5 rounded-xl text-xs font-bold border text-center transition-all ${
                  filterType === "bookmarked"
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                    : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                }`}
              >
                Saved
              </button>
            </div>
          </div>
        </div>

        {/* Jump To Question & Progress */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {/* Jump input */}
          <form onSubmit={handleJumpToQuestion} className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
              Jump to Q#:
            </span>
            <input
              type="number"
              min="1"
              max="500"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder="e.g. 45"
              className="w-20 px-2.5 py-1 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" variant="outline" size="sm" className="h-7 px-2.5 text-xs">
              Go
            </Button>
          </form>

          {/* Quick Progress status */}
          {filteredQuestions.length > 0 && (
            <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <span>
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-[11px]">
                {Math.round(((currentIndex + 1) / filteredQuestions.length) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {filteredQuestions.length > 0 && (
          <ProgressBar
            value={currentIndex + 1}
            max={filteredQuestions.length}
            size="sm"
            barColor="blue"
          />
        )}
      </div>

      {/* Main Question Card or Empty State */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No questions match this filter
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            {filterType === "incorrect"
              ? "Awesome! You have no recorded incorrect answers in this category."
              : filterType === "bookmarked"
              ? "You haven't bookmarked any questions in this category yet. Click the bookmark icon on any question to save it."
              : filterType === "unanswered"
              ? "Great job! You have already practiced all questions in this category."
              : "No questions found."}
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setFilterType("all");
              setSelectedSection("all");
            }}
          >
            Show All Questions
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
              className="gap-2 rounded-xl font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                {currentIndex + 1} / {filteredQuestions.length}
              </span>
              <button
                onClick={handleRestart}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Restart session from beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={currentIndex >= filteredQuestions.length - 1}
              className="gap-2 rounded-xl font-bold bg-navy-900 hover:bg-navy-800"
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
    <Suspense
      fallback={
        <div className="p-16 text-center text-slate-500 font-medium">
          Loading practice session...
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
