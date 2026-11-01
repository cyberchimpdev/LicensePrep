import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barColor?: "blue" | "emerald" | "amber" | "red" | "navy";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barColor = "blue",
  size = "md",
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorStyles = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-500",
    red: "bg-red-600",
    navy: "bg-navy-900",
  };

  const sizeStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-600 mb-1 font-medium">
          <span>{percentage}%</span>
          <span>
            {value} / {max}
          </span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-slate-200 rounded-full overflow-hidden",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            colorStyles[barColor]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

