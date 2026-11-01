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
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-amber-900 text-xs sm:text-sm font-medium">
        यस प्रश्नका विकल्पहरू स्रोत सामग्रीमा उपलब्ध छैनन्।
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = selectedKey === option.key;
        const isThisCorrect = isSubmitted && option.key === correctKey;
        const isThisWrong = isSubmitted && isSelected && option.key !== correctKey;

        // Styling based on state
        let containerStyle =
          "border-slate-200/90 bg-white hover:border-blue-400 hover:bg-blue-50/20 text-slate-800 shadow-sm";
        let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200 group-hover:border-blue-300";

        if (!isSubmitted && isSelected) {
          containerStyle =
            "border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-500/30 shadow-md";
          badgeStyle = "bg-blue-600 text-white border-blue-600 shadow-sm";
        } else if (isSubmitted) {
          if (isThisCorrect) {
            containerStyle =
              "border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-500/40 shadow-sm";
            badgeStyle = "bg-emerald-600 text-white border-emerald-600";
          } else if (isThisWrong) {
            containerStyle =
              "border-rose-400 bg-rose-50/90 text-rose-950 ring-2 ring-rose-400/30";
            badgeStyle = "bg-rose-600 text-white border-rose-600";
          } else {
            containerStyle = "border-slate-200/60 bg-slate-50/40 text-slate-400 opacity-60";
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
              "w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 group select-none relative focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.99]",
              containerStyle,
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {/* Option Key Badge */}
            <div
              className={cn(
                "w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 border mt-0.5 transition-colors",
                badgeStyle
              )}
            >
              {option.key}
            </div>

            {/* Option Text */}
            <div className="flex-1 font-medium leading-relaxed pt-0.5 text-slate-900 text-sm sm:text-base font-devanagari">
              {option.text}
            </div>

            {/* Feedback Icon */}
            {isSubmitted && (
              <div className="shrink-0 pt-0.5">
                {isThisCorrect && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                {isThisWrong && (
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-sm">
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
