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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Total Questions Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Bank
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.totalQuestions}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Questions in syllabus (वर्ग क र ट)
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Categories:</span>
          <span className="font-semibold text-slate-800">6 Sections</span>
        </div>
      </div>

      {/* Practiced Progress Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Practiced
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.attemptedCount}
            <span className="text-sm font-normal text-slate-400 ml-1.5">
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
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Completion:</span>
          <span className="font-semibold text-blue-600">
            {Math.round((stats.attemptedCount / (stats.totalQuestions || 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Accuracy Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Accuracy
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.accuracyPercentage}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {stats.correctCount} correct of {stats.attemptedCount} attempted
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>Passing benchmark:</span>
          <span className="font-semibold text-emerald-700">50% Pass</span>
        </div>
      </div>

      {/* Mock Exams / Bookmarks */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Exam Performance
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.examsPassed}
            <span className="text-sm font-normal text-slate-400 ml-1.5">
              passed / {stats.examsTaken} taken
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {stats.bookmarksCount} bookmarked questions
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-slate-400" /> Bookmarks:
          </span>
          <span className="font-semibold text-slate-800">{stats.bookmarksCount} saved</span>
        </div>
      </div>
    </div>
  );
}

