"use client";

import React from "react";
import { ExamQuestion } from "@/types/question";
import { Flag, CheckCircle2, User, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamPaletteProps {
  questions: ExamQuestion[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
}

export function ExamPalette({
  questions,
  currentIndex,
  onSelectQuestion,
}: ExamPaletteProps) {
  const answeredCount = questions.filter((q) => Boolean(q.userSelectedKey)).length;
  const flaggedCount = questions.filter((q) => q.isFlagged).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm text-slate-900">
            Question Navigator
          </h3>
          <span className="text-[11px] text-slate-500">
            Total {questions.length} Questions
          </span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
          CBT Mode
        </span>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-0.5">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = Boolean(q.userSelectedKey);
          const isFlagged = q.isFlagged;

          let btnClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";

          if (isCurrent) {
            btnClass = "border-blue-600 bg-blue-600 text-white ring-2 ring-blue-300 font-bold shadow-sm";
          } else if (isFlagged) {
            btnClass = "border-amber-400 bg-amber-500 text-white font-semibold shadow-sm";
          } else if (isAnswered) {
            btnClass = "border-emerald-500 bg-emerald-600 text-white font-semibold shadow-sm";
          }

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={cn(
                "relative h-9 w-full rounded-xl border text-xs flex items-center justify-center transition-all shrink-0 font-medium font-sans",
                btnClass
              )}
              title={`Question ${idx + 1}`}
            >
              <span>{idx + 1}</span>
              {isFlagged && !isCurrent && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* CBT Legend with Live Counts */}
      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-600" />
            <span>Answered</span>
          </div>
          <strong className="text-emerald-700 font-bold font-sans">{answeredCount}</strong>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span>Marked for Review</span>
          </div>
          <strong className="text-amber-700 font-bold font-sans">{flaggedCount}</strong>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
            <span>Unanswered</span>
          </div>
          <strong className="text-slate-700 font-bold font-sans">{unansweredCount}</strong>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-600 ring-1 ring-blue-300" />
            <span>Current Question</span>
          </div>
          <span className="text-blue-700 font-semibold font-sans">Active</span>
        </div>
      </div>
    </div>
  );
}
