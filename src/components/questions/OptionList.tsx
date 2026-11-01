"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { OptionItem } from "@/types/question";
import { cn } from "@/lib/utils";

interface OptionListProps {
  options: OptionItem[];
  selectedKey?: string;
  onSelectOption: (key: string) => void;
  isSubmitted: boolean;
  correctKey?: string;
  disabled?: boolean;
}

export function OptionList({
  options,
  selectedKey,
  onSelectOption,
  isSubmitted,
  correctKey,
  disabled = false,
}: OptionListProps) {
  if (!options || options.length === 0) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
        यस प्रश्नका विकल्पहरू स्रोत सामग्रीमा उपलब्ध छैनन्।
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedKey === option.key;
        const isThisCorrect = isSubmitted && option.key === correctKey;
        const isThisWrong = isSubmitted && isSelected && option.key !== correctKey;

        // Styling based on state
        let containerStyle =
          "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 text-slate-800";
        let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";

        if (!isSubmitted && isSelected) {
          containerStyle =
            "border-blue-600 bg-blue-50/60 text-blue-900 ring-2 ring-blue-500/20";
          badgeStyle = "bg-blue-600 text-white border-blue-600";
        } else if (isSubmitted) {
          if (isThisCorrect) {
            containerStyle =
              "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30";
            badgeStyle = "bg-emerald-600 text-white border-emerald-600";
          } else if (isThisWrong) {
            containerStyle =
              "border-red-400 bg-red-50 text-red-950 ring-2 ring-red-400/20";
            badgeStyle = "bg-red-600 text-white border-red-600";
          } else {
            containerStyle = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
            badgeStyle = "bg-slate-100 text-slate-400 border-slate-200";
          }
        }

        return (
          <button
            key={option.key}
            type="button"
            disabled={disabled || isSubmitted}
            onClick={() => onSelectOption(option.key)}
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group select-none text-base",
              containerStyle,
              disabled && "cursor-not-allowed"
            )}
          >
            {/* Option Key Badge */}
            <div
              className={cn(
                "w-7 h-7 rounded-lg font-bold text-sm flex items-center justify-center shrink-0 border mt-0.5 transition-colors",
                badgeStyle
              )}
            >
              {option.key}
            </div>

            {/* Option Text */}
            <div className="flex-1 font-medium leading-relaxed pt-0.5 text-slate-900">
              {option.text}
            </div>

            {/* Feedback Icon */}
            {isSubmitted && (
              <div className="shrink-0 pt-0.5">
                {isThisCorrect && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                {isThisWrong && (
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

