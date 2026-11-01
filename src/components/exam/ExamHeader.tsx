"use client";

import React from "react";
import { Clock, Flag, CheckCircle, AlertTriangle } from "lucide-react";
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

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Title & Stats */}
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {answeredCount} of {totalQuestions} answered
                </span>
              </span>
              {flaggedCount > 0 && (
                <span className="flex items-center gap-1 font-medium text-amber-700">
                  <Flag className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>{flaggedCount} flagged</span>
                </span>
              )}
            </div>
          </div>

          {/* Timer & Submit Action */}
          <div className="flex items-center gap-3">
            {/* Timer Badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border transition-colors ${
                isUrgent
                  ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                  : "bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              {isUrgent ? (
                <AlertTriangle className="w-4 h-4 text-red-600" />
              ) : (
                <Clock className="w-4 h-4 text-slate-500" />
              )}
              <span>{formatSeconds(timeRemainingSeconds)}</span>
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={onSubmitClick}
              className="bg-navy-900 hover:bg-navy-800 text-white font-semibold"
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

