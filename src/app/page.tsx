"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Layers, Bookmark, ShieldCheck, Sparkles, CheckCircle2, Zap } from "lucide-react";
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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-slate-900 to-navy-950 text-white p-7 sm:p-12 lg:p-16 shadow-2xl border border-navy-800">
        {/* Glow Gradients */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-md border border-white/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Nepal DOTM 500 Questions Bank (वर्ग क र ट)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Prepare Smarter. <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Drive Safer.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-medium">
            Practice driving license questions, improve your knowledge, and prepare confidently for your written examination.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-600/30 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Practicing</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/exam"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-extrabold text-sm border border-white/20 backdrop-blur-md transition-all active:scale-95"
            >
              <Award className="w-4 h-4 text-blue-300" />
              <span>Take Mock Exam</span>
            </Link>
          </div>

          <div className="pt-5 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-white/10 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Original DOTM Dataset
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Category A & K (Motorcycle / Scooter)
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Offline Local Progress
            </span>
          </div>
        </div>
      </section>

      {/* Dashboard Statistics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Learning Dashboard (प्रगति विवरण)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Real-time progress tracked locally on your device.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {isLoaded ? "Live Sync" : "Loading..."}
          </span>
        </div>

        <StatCards stats={stats} />
      </section>

      {/* Category Grid */}
      <section>
        <CategoryGrid sectionStats={stats.sectionStats} />
      </section>

      {/* Continue Practicing & Exam History */}
      <section>
        <RecentActivity progress={progress} onReset={resetProgress} />
      </section>

      {/* Quick Action Highlight Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-subtle flex items-start gap-4 hover:border-blue-200 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              Full 500 Question Bank (सम्पूर्ण प्रश्नहरू)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Explore and search all 500 questions with keywords in Nepali and English. Use Study Mode to reveal answers immediately or quiz yourself.
            </p>
            <Link
              href="/questions"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 pt-1"
            >
              <span>Browse Question Bank</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-subtle flex items-start gap-4 hover:border-amber-200 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
              Bookmarked Questions ({stats.bookmarksCount})
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Flag difficult questions for revision anytime. Start a practice session filtered specifically to your saved questions.
            </p>
            <Link
              href="/bookmarks"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 pt-1"
            >
              <span>View Bookmarked Questions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
