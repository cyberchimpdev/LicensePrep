"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { OptionItem } from "@/types/question";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language, translateKey } = useLanguage();

  if (!options || options.length === 0) {
    return (
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs sm:text-sm font-medium font-devanagari">
        {language === "ne"
          ? "यस प्रश्नका विकल्पहरू स्रोत सामग्रीमा उपलब्ध छैनन्।"
          : "Options for this question are not available in source documents."}
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {options.map((option) => {
        const isSelected = selectedKey === option.key;
        const isThisCorrect = isSubmitted && option.key === correctKey;
        const isThisWrong = isSubmitted && isSelected && option.key !== correctKey;

        // Display key format: If English, show "A (क)", else "क"
        const keyDisplay = language === "en" ? `${translateKey(option.key)} (${option.key})` : option.key;

        // Styling based on state
        let containerStyle =
          "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-800 shadow-sm";
        let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200 group-hover:border-slate-300";

        if (!isSubmitted && isSelected) {
          containerStyle =
            "liquid-glass-accent border-blue-500 text-blue-950 ring-1 ring-blue-500/30 shadow-sm";
          badgeStyle = "bg-blue-600 text-white border-blue-600 shadow-sm";
        } else if (isSubmitted) {
          if (isThisCorrect) {
            containerStyle =
              "border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500/30";
            badgeStyle = "bg-emerald-600 text-white border-emerald-600";
          } else if (isThisWrong) {
            containerStyle =
              "border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400/30";
            badgeStyle = "bg-rose-600 text-white border-rose-600";
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
              "w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all flex items-start gap-3 group select-none relative focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.99]",
              containerStyle,
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {/* Option Key Badge */}
            <div
              className={cn(
                "min-w-7 h-7 px-1 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border mt-0.5 transition-colors",
                badgeStyle
              )}
            >
              {keyDisplay}
            </div>

            {/* Option Text */}
            <div className="flex-1 font-medium leading-relaxed pt-0.5 text-slate-900 text-sm sm:text-base font-devanagari">
              {option.text}
            </div>

            {/* Feedback Icon */}
            {isSubmitted && (
              <div className="shrink-0 pt-0.5">
                {isThisCorrect && (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                {isThisWrong && (
                  <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-sm">
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
