"use client";

import React from "react";
import { Clock, Flag, CheckCircle, AlertTriangle, Monitor } from "lucide-react";
import { formatSeconds } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
  const isUrgent = timeRemainingSeconds <= 180; // less than 3 minutes
  const totalSeconds = 30 * 60; // 30 mins
  const progressPercent = Math.max(0, Math.min(100, ((totalSeconds - timeRemainingSeconds) / totalSeconds) * 100));

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-2.5 relative shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Real CBT Candidate & Examination Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Monitor className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 truncate">
                  DOTM Computer-Based Testing (CBT)
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                  Category A & K
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1 font-medium text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{answeredCount} / {totalQuestions} Answered</span>
                </span>
                {flaggedCount > 0 && (
                  <span className="flex items-center gap-1 font-medium text-amber-700">
                    <Flag className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>{flaggedCount} Flagged</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Real CBT Timer & Action Button */}
          <div className="flex items-center gap-2.5">
            {/* Digital Timer Pill */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all ${
                isUrgent
                  ? "bg-rose-50 text-rose-700 border-rose-300 animate-pulse"
                  : "bg-slate-50 text-slate-800 border-slate-200"
              }`}
            >
              {isUrgent ? (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              )}
              <span className="font-sans font-bold">{formatSeconds(timeRemainingSeconds)}</span>
              <span className="text-[10px] font-medium text-slate-400 hidden sm:inline">Remaining</span>
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={onSubmitClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm px-4"
            >
              <span>Submit Exam</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Thin Timer Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100">
        <div
          className={`h-full transition-all duration-1000 ${
            isUrgent ? "bg-rose-500" : "bg-blue-600"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
