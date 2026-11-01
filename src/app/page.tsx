"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrafficCone,
  Shuffle,
  Sparkles,
  Zap,
  Target,
  FileCheck,
  Monitor,
  Flame,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatCards } from "@/components/dashboard/StatCards";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function HomePage() {
  const { progress, stats, isLoaded, resetProgress } = useUserProgress();

  return (
    <PageContainer size="wide" className="space-y-8 sm:space-y-10">
      {/* Liquid Glass Hero Section - Inspired by likhitexam.com */}
      <section className="relative overflow-hidden liquid-glass-card p-6 sm:p-10 lg:p-12">
        {/* Subtle Specular Highlights */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Official DOTM Syllabus Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Official DOTM Nepal Driving License Preparation (Category A & K)</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
            Pass Your Nepal Driving License <br className="hidden sm:inline" />
            <span className="text-blue-600">Written Exam (लिखित परीक्षा)</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Master all 500 official questions issued by the Department of Transport Management (DOTM). Take timed CBT mock exams, randomized 20-question practice drills, and review answers instantly.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/exam"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)] active:scale-[0.98]"
            >
              <Monitor className="w-4 h-4 text-white" />
              <span>Take Free CBT Mock Test (20 Qs)</span>
              <ArrowRight className="w-4 h-4 text-white ml-0.5" />
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl liquid-glass hover:bg-white text-slate-800 font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              <Shuffle className="w-4 h-4 text-blue-600" />
              <span>Random 20 Qs Practice</span>
            </Link>

            <Link
              href="/questions"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl liquid-glass hover:bg-white text-slate-700 font-semibold text-sm transition-all active:scale-[0.98]"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Browse 500 Question Bank</span>
            </Link>
          </div>

          {/* Feature Highlights Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 border-t border-slate-200/60 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 500 DOTM Official Questions
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" /> Real Exam Randomizer (20 Qs)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" /> 30-Minute Timed CBT Simulation
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-indigo-600" /> 100% Free & Works Offline
            </span>
          </div>
        </div>
      </section>

      {/* Real Computer-Based Test (CBT) Spotlight Banner */}
      <section className="liquid-glass-card p-5 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/80 shadow-sm mt-0.5">
              <Monitor className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  CBT Simulator
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  DOTM Computer-Based Written Test
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Simulate the Real Examination Environment
              </h2>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                Experience the official DOTM test room with 20 randomized questions, 30-minute countdown timer, question palette navigator, and instant score certificate.
              </p>
            </div>
          </div>

          <Link
            href="/exam"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-sm active:scale-[0.98] shrink-0"
          >
            <span>Start Mock Exam</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
          </Link>
        </div>
      </section>

      {/* 4 Interactive Modes - Liquid Glass Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/practice"
          className="liquid-glass-card liquid-glass-card-hover p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50/90 text-blue-600 flex items-center justify-center mb-3 border border-blue-200/60 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Shuffle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              Random Practice Sets
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Solve unpredictable 20-question randomized batches with immediate correct answer explanations.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>Start Practice Drill</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/exam"
          className="liquid-glass-card liquid-glass-card-hover p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50/90 text-amber-600 flex items-center justify-center mb-3 border border-amber-200/60 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
              Timed Mock Exam (CBT)
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              30-minute official exam format with randomized options, question flagging, and detailed evaluation.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-amber-600">
            <span>Take CBT Test</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/questions"
          className="liquid-glass-card liquid-glass-card-hover p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50/90 text-indigo-600 flex items-center justify-center mb-3 border border-indigo-200/60 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
              500 Questions Bank
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Browse all 500 DOTM questions chapter-wise with 1-click toggle to reveal or hide answers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>Browse Library</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href={`/questions?section=${encodeURIComponent("ट्राफिक सङ्केत सम्बन्धी ज्ञान")}`}
          className="liquid-glass-card liquid-glass-card-hover p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50/90 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-200/60 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <TrafficCone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
              Traffic Signs & Signals
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              110 mandatory, cautionary, and informatory road signs and pavement markings.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span>View Traffic Signs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Dashboard Analytics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Learning Analytics & Progress
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live statistics of your practice attempts, accuracy rate, and mock exam performance.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500 liquid-glass-pill px-2.5 py-1">
            {isLoaded ? "Offline Storage Active" : "Loading..."}
          </span>
        </div>

        <StatCards stats={stats} />
      </section>

      {/* Category Grid */}
      <section>
        <CategoryGrid sectionStats={stats.sectionStats} />
      </section>

      {/* Official DOTM Exam Reference Structure */}
      <section className="liquid-glass-card p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            DOTM Written Examination Marking Scheme & Structure
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official regulations prescribed by the Department of Transport Management for Category A (Motorcycle) and Category K (Scooter).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">Total Questions:</span>
            <strong className="text-slate-900 text-sm font-bold">20 Objective Multiple-Choice</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">Time Allowed:</span>
            <strong className="text-slate-900 text-sm font-bold">30 Minutes (Computer / Paper)</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">Passing Mark:</span>
            <strong className="text-emerald-700 text-sm font-bold">At least 10 Correct (50%)</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">Negative Marking:</span>
            <strong className="text-blue-700 text-sm font-bold">None (No penalty for mistakes)</strong>
          </div>
        </div>
      </section>

      {/* Continue Practicing & Exam History */}
      <section>
        <RecentActivity progress={progress} onReset={resetProgress} />
      </section>
    </PageContainer>
  );
}
