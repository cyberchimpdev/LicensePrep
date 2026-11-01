"use client";

import React from "react";
import { ExamQuestion } from "@/types/question";
import { Check, X, Bookmark, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface QuestionReviewCardProps {
  question: ExamQuestion;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (qNum: number) => void;
}

export function QuestionReviewCard({
  question,
  index,
  isBookmarked,
  onToggleBookmark,
}: QuestionReviewCardProps) {
  const isAnswered = Boolean(question.userSelectedKey);
  const isCorrect = isAnswered && question.userSelectedKey === question.correctOptionKey;
  const isSkipped = !isAnswered;

  return (
    <div
      className={cn(
        "liquid-glass-card p-5 sm:p-6 space-y-4 font-devanagari",
        isCorrect
          ? "border-emerald-300/80 bg-emerald-50/30"
          : isSkipped
          ? "border-slate-200"
          : "border-rose-300/80 bg-rose-50/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
            Q{index + 1} (मूल प्रश्न नं. {question.originalNumber})
          </span>
          <Badge variant="default" size="sm">
            {question.section}
          </Badge>
          {isCorrect && (
            <Badge variant="success" size="sm">
              Correct
            </Badge>
          )}
          {!isCorrect && !isSkipped && (
            <Badge variant="danger" size="sm">
              Incorrect
            </Badge>
          )}
          {isSkipped && (
            <Badge variant="outline" size="sm">
              Unanswered
            </Badge>
          )}
        </div>

        <button
          onClick={() => onToggleBookmark(question.originalNumber)}
          className={`p-1.5 rounded-lg transition-colors ${
            isBookmarked
              ? "text-amber-500 bg-amber-50"
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Save Question"}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Question Text */}
      <div className="text-base font-bold text-slate-900 leading-relaxed">
        {question.question}
      </div>

      {/* Options List */}
      <div className="space-y-2 pt-1">
        {question.options.map((opt) => {
          const isThisCorrect = opt.key === question.correctOptionKey;
          const isUserChoice = opt.key === question.userSelectedKey;

          let optStyle = "border-slate-100 bg-slate-50/60 text-slate-700";
          let badgeStyle = "bg-slate-200 text-slate-700";

          if (isThisCorrect) {
            optStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-400";
            badgeStyle = "bg-emerald-600 text-white";
          } else if (isUserChoice && !isThisCorrect) {
            optStyle = "border-red-400 bg-red-50 text-red-950 font-medium ring-1 ring-red-400";
            badgeStyle = "bg-red-600 text-white";
          }

          return (
            <div
              key={opt.key}
              className={cn(
                "p-3 rounded-xl border flex items-start gap-3 text-sm transition-all",
                optStyle
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5",
                  badgeStyle
                )}
              >
                {opt.key}
              </div>

              <div className="flex-1 leading-snug">{opt.text}</div>

              <div className="shrink-0 flex items-center gap-1.5 text-xs">
                {isUserChoice && !isThisCorrect && (
                  <span className="text-red-700 font-semibold flex items-center gap-1">
                    <X className="w-4 h-4" /> Your Answer
                  </span>
                )}
                {isThisCorrect && (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4 stroke-[3]" /> Correct
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation if any */}
      {question.explanation && (
        <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

