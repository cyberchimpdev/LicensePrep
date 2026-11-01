"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Layers, Bookmark, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatCards } from "@/components/dashboard/StatCards";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function HomePage() {
  const { progress, stats, isLoaded, resetProgress } = useUserProgress();

  return (
    <PageContainer size="wide" className="space-y-10 sm:space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-navy-900 text-white p-8 sm:p-12 lg:p-16 shadow-card border border-navy-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Nepal DOTM 500 Questions Bank (वर्ग क र ट)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Prepare Smarter. <br />
            <span className="text-blue-400">Drive Safer.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Practice driving license questions, improve your knowledge, and prepare confidently for your written examination.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Practicing</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/exam"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              <Award className="w-4 h-4 text-blue-300" />
              <span>Take Mock Exam</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Original DOTM Dataset
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Category A & K (Motorcycle / Scooter)
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" /> Offline Local Progress
            </span>
          </div>
        </div>
      </section>

      {/* Dashboard Statistics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Your Learning Dashboard
          </h2>
          <span className="text-xs text-slate-500">
            {isLoaded ? "Progress updated automatically" : "Loading progress..."}
          </span>
        </div>

        <StatCards stats={stats} />
      </section>

      {/* Learning Sections: Category Grid */}
      <section>
        <CategoryGrid sectionStats={stats.sectionStats} />
      </section>

      {/* Continue Practicing & Exam History */}
      <section>
        <RecentActivity progress={progress} onReset={resetProgress} />
      </section>

      {/* Fast Resource Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">
              Full 500 Question Bank (सम्पूर्ण प्रश्नहरू)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore and search all 500 questions with keywords in Nepali and English. Use Study Mode to reveal answers immediately or practice individually.
            </p>
            <Link
              href="/questions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 pt-1"
            >
              <span>Browse Question Bank</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base">
              Bookmarked Questions ({stats.bookmarksCount})
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Flag difficult or important questions for quick revision anytime. Practice specifically with your bookmarked questions list.
            </p>
            <Link
              href="/bookmarks"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 pt-1"
            >
              <span>View Bookmarked Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

