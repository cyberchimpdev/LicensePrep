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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-devanagari">
      {/* Total Questions Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            कुल प्रश्नहरू
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            {stats.totalQuestions}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            पाठ्यक्रमका प्रश्नहरू (वर्ग क र ट)
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>विषय खण्ड:</span>
          <span className="font-semibold text-slate-800">६ खण्डहरू</span>
        </div>
      </div>

      {/* Practiced Progress Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            अभ्यास गरिएको
          </span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
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
          <span>प्रगति:</span>
          <span className="font-semibold text-blue-600 font-sans">
            {Math.round((stats.attemptedCount / (stats.totalQuestions || 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Accuracy Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            सटीकता (Accuracy)
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            {stats.accuracyPercentage}%
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {stats.correctCount} सही / {stats.attemptedCount} हल
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>उत्तीर्ण मापदण्ड:</span>
          <span className="font-semibold text-emerald-700">५०% (१०/२०)</span>
        </div>
      </div>

      {/* Mock Exams / Bookmarks */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            नमुना परीक्षा
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            {stats.examsPassed}
            <span className="text-sm font-normal text-slate-400 ml-1">
              उत्तीर्ण / {stats.examsTaken} परीक्षा
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {stats.bookmarksCount} सुरक्षित प्रश्नहरू
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-slate-400" /> सुरक्षित:
          </span>
          <span className="font-semibold text-slate-800">{stats.bookmarksCount} प्रश्नहरू</span>
        </div>
      </div>
    </div>
  );
}
