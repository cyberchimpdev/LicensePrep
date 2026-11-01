"use client";

import React from "react";
import { ExamQuestion } from "@/types/question";
import { Flag } from "lucide-react";
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
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-slate-900">Question Palette</h3>
        <span className="text-xs text-slate-500">{questions.length} Questions</span>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = Boolean(q.userSelectedKey);
          const isFlagged = q.isFlagged;

          let btnClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";

          if (isCurrent) {
            btnClass = "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500 font-bold";
          } else if (isFlagged) {
            btnClass = "border-amber-400 bg-amber-50 text-amber-900 font-medium";
          } else if (isAnswered) {
            btnClass = "border-emerald-400 bg-emerald-50 text-emerald-900 font-medium";
          }

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={cn(
                "relative h-10 w-full rounded-xl border text-xs flex items-center justify-center transition-all",
                btnClass
              )}
            >
              <span>{idx + 1}</span>
              {isFlagged && (
                <span className="absolute top-1 right-1">
                  <Flag className="w-2.5 h-2.5 fill-current text-amber-500" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-100 border border-amber-400" />
          <span>Flagged</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-white border border-slate-300" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-100 border border-blue-600 ring-1 ring-blue-500" />
          <span>Current</span>
        </div>
      </div>
    </div>
  );
}

