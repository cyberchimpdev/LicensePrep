import React from "react";
import { HelpCircle, CheckCircle2, Target, Award, Bookmark } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface StatCardsProps {
  stats: {
    totalQuestions: number;
    attemptedCount: number;
    correctCount: number;
    incorrectCount: number;
    accuracyPercentage: number;
    bookmarksCount: number;
    examsTaken: number;
    examsPassed: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-sans">
      {/* 1. Total Questions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Questions
          </span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60 shadow-sm">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            {stats.totalQuestions}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            DOTM Syllabus (Cat A & K)
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Categories:</span>
          <span className="font-semibold text-slate-800">6 Sections</span>
        </div>
      </div>

      {/* 2. Practiced Questions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Practiced Questions
          </span>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200/60 shadow-sm">
            <Target className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            {stats.attemptedCount}
            <span className="text-sm font-normal text-slate-400 ml-1">
              / {stats.totalQuestions}
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar
              value={stats.attemptedCount}
              max={stats.totalQuestions}
              size="sm"
              barColor="blue"
            />
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Completion:</span>
          <span className="font-semibold text-blue-600 font-sans">
            {Math.round((stats.attemptedCount / (stats.totalQuestions || 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* 3. Accuracy */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Accuracy
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            {stats.accuracyPercentage}%
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {stats.correctCount} correct of {stats.attemptedCount} tried
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Passing benchmark:</span>
          <span className="font-semibold text-emerald-700">50% (10/20)</span>
        </div>
      </div>

      {/* 4. Mock Tests Completed */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Mock Tests Completed
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 shadow-sm">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            {stats.examsTaken}
            <span className="text-sm font-normal text-slate-400 ml-1">
              ({stats.examsPassed} passed)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {stats.bookmarksCount} bookmarked questions
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-slate-400" /> Saved:
          </span>
          <span className="font-semibold text-slate-800">{stats.bookmarksCount} questions</span>
        </div>
      </div>
    </div>
  );
}
