"use client";

import React from "react";
import { Clock, Flag, CheckCircle, AlertTriangle } from "lucide-react";
import { formatSeconds } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface ExamHeaderProps {
  title: string;
  timeRemainingSeconds: number;
  totalQuestions: number;
  answeredCount: number;
  flaggedCount: number;
  onSubmitClick: () => void;
}

export function ExamHeader({
  title,
  timeRemainingSeconds,
  totalQuestions,
  answeredCount,
  flaggedCount,
  onSubmitClick,
}: ExamHeaderProps) {
  const { language, t } = useLanguage();
  const isUrgent = timeRemainingSeconds <= 180; // less than 3 minutes

  return (
    <div className="sticky top-16 z-30 liquid-glass border-b border-white/70 py-2.5 font-devanagari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Title & Stats */}
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate flex items-center gap-2">
              <span>{title}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full liquid-glass-pill text-blue-700 hidden sm:inline">
                DOTM Category A & K
              </span>
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {answeredCount} / {totalQuestions} {language === "ne" ? "हल गरिएका" : "answered"}
                </span>
              </span>
              {flaggedCount > 0 && (
                <span className="flex items-center gap-1 font-medium text-amber-700">
                  <Flag className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>{flaggedCount} {language === "ne" ? "Flag गरिएका" : "flagged"}</span>
                </span>
              )}
            </div>
          </div>

          {/* Timer & Submit Action */}
          <div className="flex items-center gap-2.5">
            {/* Timer Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-colors ${
                isUrgent
                  ? "bg-rose-50 text-rose-600 border-rose-300 animate-pulse shadow-sm"
                  : "liquid-glass-pill text-slate-800"
              }`}
            >
              {isUrgent ? (
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-blue-600" />
              )}
              <span>{formatSeconds(timeRemainingSeconds)}</span>
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={onSubmitClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm"
            >
              {t.submitExamBtn}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
