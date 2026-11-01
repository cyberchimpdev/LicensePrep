"use client";

import React from "react";
import { ExamResult } from "@/types/question";
import { CheckCircle2, XCircle, Clock, Award, RotateCcw, Home, Filter } from "lucide-react";
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

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
      {/* Top Banner */}
      <div
        className={`p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isPassed
            ? "bg-gradient-to-r from-emerald-700 to-teal-800"
            : "bg-gradient-to-r from-red-600 to-rose-700"
        }`}
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
            {isPassed ? (
              <CheckCircle2 className="w-9 h-9 text-emerald-200" />
            ) : (
              <XCircle className="w-9 h-9 text-rose-200" />
            )}
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white mb-1.5">
              {isPassed ? "Examination Passed" : "Needs More Practice"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isPassed ? "बधाई छ! तपाईं उत्तीर्ण हुनुभयो।" : "तपाईं यस पटक अनुत्तीर्ण हुनुभयो।"}
            </h2>
            <p className="text-sm text-white/80 mt-1">
              {isPassed
                ? "You scored above the required passing benchmark. Keep practicing to maintain confidence!"
                : `You scored ${result.percentage}%. The passing threshold is ${result.passingPercentage}%. Practice the incorrect questions below.`}
            </p>
          </div>
        </div>

        {/* Big Score Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-center shrink-0 min-w-[140px]">
          <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">
            Score
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            {result.score}
            <span className="text-lg font-normal text-white/70">
              /{result.totalQuestions}
            </span>
          </div>
          <div className="text-xs font-bold text-white/90 mt-1">
            {result.percentage}% Accuracy
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-b border-slate-100 bg-slate-50/50">
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-medium">Correct</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-0.5">
            {result.correctCount}
          </div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-medium">Incorrect</span>
          <div className="text-xl sm:text-2xl font-bold text-red-600 mt-0.5">
            {result.incorrectCount}
          </div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-medium">Unanswered</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-600 mt-0.5">
            {result.skippedCount}
          </div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <span className="text-xs text-slate-500 font-medium">Time Taken</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{formatSeconds(result.timeSpentSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        {/* Review Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter Review:
          </span>
          <button
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-navy-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All ({result.totalQuestions})
          </button>
          <button
            onClick={() => onFilterChange("incorrect")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === "incorrect"
                ? "bg-red-600 text-white"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            Incorrect ({result.incorrectCount})
          </button>
          <button
            onClick={() => onFilterChange("correct")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === "correct"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            Correct ({result.correctCount})
          </button>
          {result.skippedCount > 0 && (
            <button
              onClick={() => onFilterChange("skipped")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === "skipped"
                  ? "bg-slate-800 text-white"
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
            className="flex-1 sm:flex-none gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Exam</span>
          </Button>
          <Link href="/" className="flex-1 sm:flex-none">
            <Button variant="secondary" size="sm" className="w-full gap-1.5">
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

