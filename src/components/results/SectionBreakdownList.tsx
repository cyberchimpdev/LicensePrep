import React from "react";
import { ExamResultSectionScore } from "@/types/question";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface SectionBreakdownListProps {
  sections: ExamResultSectionScore[];
}

export function SectionBreakdownList({ sections }: SectionBreakdownListProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="font-bold text-slate-900 text-base">
          Category Performance Breakdown (विषयगत नतिजा)
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed accuracy metrics for each examination syllabus section.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((sec) => (
          <div
            key={sec.sectionName}
            className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-xs text-slate-800 line-clamp-1">
                {sec.sectionName}
              </span>
              <span className="text-xs font-bold text-slate-700 shrink-0">
                {sec.correct}/{sec.total} ({sec.percentage}%)
              </span>
            </div>
            <ProgressBar
              value={sec.correct}
              max={sec.total}
              size="sm"
              barColor={
                sec.percentage >= 70
                  ? "emerald"
                  : sec.percentage >= 50
                  ? "blue"
                  : "amber"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

