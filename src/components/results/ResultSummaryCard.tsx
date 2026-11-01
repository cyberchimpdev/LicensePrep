"use client";

import React from "react";
import { ExamResult } from "@/types/question";
import { CheckCircle2, XCircle, Clock, RotateCcw, Home, Filter, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatSeconds } from "@/lib/utils";
import Link from "next/link";

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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
      {/* Top Banner */}
      <div
        className={`p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isPassed
            ? "bg-gradient-to-br from-emerald-600 via-teal-700 to-navy-900"
            : "bg-gradient-to-br from-rose-600 via-red-700 to-navy-900"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            {isPassed ? (
              <CheckCircle2 className="w-10 h-10 text-emerald-200" />
            ) : (
              <XCircle className="w-10 h-10 text-rose-200" />
            )}
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/20 text-white mb-2 backdrop-blur-sm">
              {isDistinction
                ? "उत्कृष्ट नतिजा (Distinction)"
                : isPassed
                ? "उत्तीर्ण (Passed)"
                : "पुनः अभ्यास आवश्यक (Needs Practice)"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isPassed ? "बधाई छ! तपाईं उत्तीर्ण हुनुभयो।" : "तपाईं यस पटक अनुत्तीर्ण हुनुभयो।"}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg leading-relaxed">
              {isPassed
                ? `तपाईंले ${result.percentage}% अङ्क प्राप्त गर्नुभएको छ। आधिकारिक परीक्षामा उत्तीर्ण हुन कम्तीमा ${result.passingPercentage}% अङ्क आवश्यक हुन्छ।`
                : `तपाईंले ${result.percentage}% अङ्क प्राप्त गर्नुभयो। उत्तीर्ण हुन ${result.passingPercentage}% आवश्यक हुन्छ। तल दिइएका गलत प्रश्नहरू पुनः अभ्यास गर्नुहोस्।`}
            </p>
          </div>
        </div>

        {/* Big Score Box */}
        <div className="bg-white/15 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/20 text-center shrink-0 min-w-[160px] shadow-lg">
          <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
            Total Score
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1">
            {result.score}
            <span className="text-xl font-normal text-white/70">
              /{result.totalQuestions}
            </span>
          </div>
          <div className="text-xs font-bold text-white/90 mt-1.5 px-2.5 py-0.5 rounded-full bg-white/15 inline-block">
            {result.percentage}% Accuracy
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-b border-slate-100 bg-slate-50/50">
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-semibold">Correct Answers</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">
            {result.correctCount}
          </div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-semibold">Incorrect Answers</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-0.5">
            {result.incorrectCount}
          </div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-semibold">Unanswered</span>
          <div className="text-2xl font-extrabold text-slate-600 mt-0.5">
            {result.skippedCount}
          </div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-semibold">Time Elapsed</span>
          <div className="text-2xl font-extrabold text-slate-800 mt-0.5 flex items-center justify-center gap-1.5">
            <Clock className="w-5 h-5 text-slate-400" />
            <span>{formatSeconds(result.timeSpentSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        {/* Review Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-bold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter Review:
          </span>
          <button
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === "all"
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All ({result.totalQuestions})
          </button>
          <button
            onClick={() => onFilterChange("incorrect")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === "incorrect"
                ? "bg-rose-600 text-white shadow-sm"
                : "bg-rose-50 text-rose-700 hover:bg-rose-100"
            }`}
          >
            Incorrect ({result.incorrectCount})
          </button>
          <button
            onClick={() => onFilterChange("correct")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === "correct"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            Correct ({result.correctCount})
          </button>
          {result.skippedCount > 0 && (
            <button
              onClick={() => onFilterChange("skipped")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "skipped"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Skipped ({result.skippedCount})
            </button>
          )}
        </div>

        {/* Global CTA Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="flex-1 sm:flex-none gap-2 rounded-xl font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </Button>

          <Link href="/practice" className="flex-1 sm:flex-none">
            <Button
              variant="primary"
              size="sm"
              className="w-full gap-2 rounded-xl font-bold bg-navy-900 hover:bg-navy-800"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Continue Practice</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
