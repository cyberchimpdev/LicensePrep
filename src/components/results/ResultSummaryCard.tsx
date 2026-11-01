"use client";

import React from "react";
import { ExamResult } from "@/types/question";
import { CheckCircle2, XCircle, Clock, RotateCcw, Home, Filter, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatSeconds } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language, t } = useLanguage();
  const isPassed = result.passed;
  const isDistinction = result.percentage >= 80;

  return (
    <div className="liquid-glass-card rounded-2xl shadow-sm overflow-hidden font-devanagari">
      {/* Top Banner - Clean flat modern surface */}
      <div
        className={cn(
          "p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6",
          isPassed ? "bg-emerald-700" : "bg-rose-700"
        )}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            {isPassed ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-200" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-200" />
            )}
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white mb-1.5">
              {isDistinction
                ? (language === "ne" ? "उत्कृष्ट नतिजा (Distinction)" : "Distinction Grade")
                : isPassed
                ? (language === "ne" ? "उत्तीर्ण (Passed)" : "Passed (उत्तीर्ण)")
                : (language === "ne" ? "पुनः अभ्यास आवश्यक (Needs Practice)" : "Needs Practice")}
            </div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
              {isPassed ? t.resultsPassed : t.resultsFailed}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-lg leading-relaxed">
              {isPassed
                ? (language === "ne"
                    ? `तपाईंले ${result.percentage}% अङ्क प्राप्त गर्नुभएको छ। यातायात व्यवस्था विभाग (DOTM) को उत्तीर्ण मापदण्ड ५०% हो।`
                    : `You achieved ${result.percentage}% score. Nepal DOTM passing benchmark is 50% (10/20 marks).`)
                : (language === "ne"
                    ? `तपाईंले ${result.percentage}% अङ्क प्राप्त गर्नुभयो। उत्तीर्ण हुन कम्तीमा ${result.passingPercentage}% आवश्यक पर्दछ।`
                    : `You achieved ${result.percentage}% score. At least ${result.passingPercentage}% is required to pass.`)}
            </p>
          </div>
        </div>

        {/* Score Box */}
        <div className="bg-white/15 rounded-2xl p-4 sm:p-5 border border-white/20 text-center shrink-0 min-w-[150px] shadow-sm">
          <div className="text-[11px] font-medium text-white/80 uppercase tracking-wider">
            {t.scoreLabel}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white mt-0.5 font-sans">
            {result.score}
            <span className="text-lg font-normal text-white/70">
              /{result.totalQuestions}
            </span>
          </div>
          <div className="text-xs font-semibold text-white/90 mt-1 px-2.5 py-0.5 rounded-full bg-white/20 inline-block font-sans">
            {result.percentage}% Accuracy
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-b border-slate-100 bg-slate-50/50">
        <div className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">
            {language === "ne" ? "सही उत्तर (Correct)" : "Correct Answers"}
          </span>
          <div className="text-xl font-bold text-emerald-600 mt-0.5 font-sans">
            {result.correctCount}
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">
            {language === "ne" ? "गलत उत्तर (Incorrect)" : "Incorrect Answers"}
          </span>
          <div className="text-xl font-bold text-rose-600 mt-0.5 font-sans">
            {result.incorrectCount}
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">
            {language === "ne" ? "हल नगरिएको (Skipped)" : "Unanswered (Skipped)"}
          </span>
          <div className="text-xl font-bold text-slate-600 mt-0.5 font-sans">
            {result.skippedCount}
          </div>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-slate-500 font-medium">
            {language === "ne" ? "लागेको समय (Time Spent)" : "Time Taken"}
          </span>
          <div className="text-xl font-bold text-blue-600 mt-0.5 font-sans">
            {formatSeconds(result.timeSpentSeconds)}
          </div>
        </div>
      </div>

      {/* Action Toolbar & Filters */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs font-medium text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> {language === "ne" ? "प्रश्न समीक्षा:" : "Review:"}
          </span>
          <button
            onClick={() => onFilterChange("all")}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-semibold transition-all border",
              activeFilter === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "liquid-glass-pill text-slate-700 hover:bg-slate-100"
            )}
          >
            {t.reviewAll} ({result.totalQuestions})
          </button>
          <button
            onClick={() => onFilterChange("incorrect")}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-semibold transition-all border",
              activeFilter === "incorrect"
                ? "bg-rose-600 text-white border-rose-600 shadow-sm font-bold"
                : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
            )}
          >
            {t.reviewIncorrect} ({result.incorrectCount})
          </button>
          <button
            onClick={() => onFilterChange("correct")}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-semibold transition-all border",
              activeFilter === "correct"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            )}
          >
            {t.reviewCorrect} ({result.correctCount})
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="gap-1.5 rounded-xl text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.retakeExamBtn}</span>
          </Button>

          <Link href="/practice">
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === "ne" ? "अनियमित अभ्यास गर्नुहोस्" : "Practice Random Sets"}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
