"use client";

import React from "react";
import { HelpCircle, CheckCircle2, Target, Award, Bookmark } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language, t } = useLanguage();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-devanagari">
      {/* Total Questions Card */}
      <div className="liquid-glass-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.totalQuestions}
          </span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {stats.totalQuestions}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "ne" ? "पाठ्यक्रमका प्रश्नहरू (वर्ग क र ट)" : "DOTM Syllabus Questions (A & K)"}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>{language === "ne" ? "विषय खण्ड:" : "Sections:"}</span>
          <span className="font-semibold text-slate-800">{t.categoriesCount}</span>
        </div>
      </div>

      {/* Practiced Progress Card */}
      <div className="liquid-glass-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.practicedQuestions}
          </span>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
            <Target className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
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
          <span>{language === "ne" ? "प्रगति:" : "Completion:"}</span>
          <span className="font-semibold text-blue-600 font-sans">
            {Math.round((stats.attemptedCount / (stats.totalQuestions || 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Accuracy Card */}
      <div className="liquid-glass-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.accuracy}
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {stats.accuracyPercentage}%
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "ne"
              ? `${stats.correctCount} सही / ${stats.attemptedCount} हल`
              : `${stats.correctCount} correct of ${stats.attemptedCount} solved`}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span>{language === "ne" ? "उत्तीर्ण मापदण्ड:" : "Benchmark:"}</span>
          <span className="font-semibold text-emerald-700">{t.passingBenchmark}</span>
        </div>
      </div>

      {/* Mock Exams / Bookmarks */}
      <div className="liquid-glass-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.mockExams}
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {stats.examsPassed}
            <span className="text-sm font-normal text-slate-400 ml-1">
              {language === "ne" ? `उत्तीर्ण / ${stats.examsTaken} परीक्षा` : `passed / ${stats.examsTaken} tests`}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "ne" ? `${stats.bookmarksCount} सुरक्षित प्रश्नहरू` : `${stats.bookmarksCount} bookmarked Qs`}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-slate-400" /> {language === "ne" ? "सुरक्षित:" : "Saved:"}
          </span>
          <span className="font-semibold text-slate-800">{stats.bookmarksCount}</span>
        </div>
      </div>
    </div>
  );
}
