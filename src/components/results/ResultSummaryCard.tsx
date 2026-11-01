"use client";

import React from "react";
import { ExamResult } from "@/types/question";
import { CheckCircle2, XCircle, Clock, RotateCcw, Home, Filter, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatSeconds } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ResultSummaryCardProps {
  result: ExamResult;
  onFilterChange: (filter: "all" | "incorrect" | "correct" | "skipped") => void;
  activeFilter: "all" | "incorrect" | "correct" | "skipped";
  onRetry: () => void;
}

export function ResultSummaryCard({
  result,
  onFilterChange,
  activeFilter,
  onRetry,
}: ResultSummaryCardProps) {
  const isPassed = result.passed;
  const isDistinction = result.percentage >= 80;

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden font-devanagari">
      {/* Top Banner - Clean flat modern surface */}
      <div
        className={cn(
          "p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6",
          isPassed ? "bg-emerald-700" : "bg-rose-700"
        )}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            {isPassed ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-200" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-200" />
            )}
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white mb-1.5">
              {isDistinction
                ? "उत्कृष्ट नतिजा (Distinction)"
                : isPassed
                ? "उत्तीर्ण (Passed)"
                : "पुनः अभ्यास आवश्यक (Needs Practice)"}
            </div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
              {isPassed ? "बधाई छ! तपाईं लिखित परीक्षामा उत्तीर्ण हुनुभयो।" : "यस पटक अनुत्तीर्ण हुनुभयो।"}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-lg leading-relaxed">
              {isPassed
                ? `तपाईंले ${result.percentage}% अङ्क प्राप्त गर्नुभएको छ। यातायात व्यवस्था विभाग (DOTM) को उत्तीर्ण मापदण्ड ५०% हो।`
                : `तपाईंले ${result.percentage}% अङ्क प्राप्त गर्नुभयो। उत्तीर्ण हुन कम्तीमा ${result.passingPercentage}% आवश्यक पर्दछ।`}
            </p>
          </div>
        </div>

        {/* Score Box */}
        <div className="bg-white/10 rounded-xl p-4 sm:p-5 border border-white/20 text-center shrink-0 min-w-[150px]">
          <div className="text-[11px] font-medium text-white/80 uppercase tracking-wider">
            प्राप्ताङ्क (Score)
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white mt-0.5 font-sans">
            {result.score}
            <span className="text-lg font-normal text-white/70">
              /{result.totalQuestions}
            </span>
          </div>
          <div className="text-xs font-semibold text-white/90 mt-1 px-2 py-0.5 rounded-full bg-white/15 inline-block font-sans">
            {result.percentage}% Accuracy
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-zinc-100 border-b border-zinc-100 bg-zinc-50/50">
        <div className="p-4 text-center">
          <span className="text-xs text-zinc-500 font-medium">सही उत्तर (Correct)</span>
          <div className="text-xl font-bold text-emerald-600 mt-0.5 font-sans">
            {result.correctCount}
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-zinc-500 font-medium">गलत उत्तर (Incorrect)</span>
          <div className="text-xl font-bold text-rose-600 mt-0.5 font-sans">
            {result.incorrectCount}
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-zinc-500 font-medium">हल नगरिएको (Skipped)</span>
          <div className="text-xl font-bold text-zinc-600 mt-0.5 font-sans">
            {result.skippedCount}
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-zinc-500 font-medium">लागेको समय (Time Spent)</span>
          <div className="text-xl font-bold text-blue-600 mt-0.5 font-sans">
            {formatSeconds(result.timeSpentSeconds)}
          </div>
        </div>
      </div>

      {/* Action Toolbar & Filters */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs font-medium text-zinc-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> प्रश्न समीक्षा:
          </span>
          <button
            onClick={() => onFilterChange("all")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
              activeFilter === "all"
                ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
            )}
          >
            सबै ({result.totalQuestions})
          </button>
          <button
            onClick={() => onFilterChange("incorrect")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
              activeFilter === "incorrect"
                ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
            )}
          >
            गलत मात्र ({result.incorrectCount})
          </button>
          <button
            onClick={() => onFilterChange("correct")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
              activeFilter === "correct"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            )}
          >
            सही मात्र ({result.correctCount})
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="gap-1.5 rounded-lg text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>पुनः परीक्षा दिनुहोस्</span>
          </Button>

          <Link href="/practice">
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>अभ्यास सुरु गर्नुहोस्</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
