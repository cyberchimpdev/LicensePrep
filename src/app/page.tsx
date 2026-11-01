"use client";

import React, { useState } from "react";
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
  Shuffle,
  Sparkles,
  Target,
  FileCheck,
  Monitor,
  Check,
  ChevronRight,
  BarChart3,
  Lightbulb,
  Timer,
  Compass,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatCards } from "@/components/dashboard/StatCards";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useUserProgress } from "@/hooks/useUserProgress";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { progress, stats, isLoaded, resetProgress } = useUserProgress();
  const [previewSelectedOption, setPreviewSelectedOption] = useState<number>(2);

  return (
    <PageContainer size="wide" className="space-y-12 sm:space-y-16 py-6 sm:py-8">
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Two-Column Desktop / Stacked Mobile)    */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>NEPAL DRIVING LICENSE PREPARATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Your Journey to a Driving License Starts Here.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Practice driving license questions, understand traffic signs, and prepare confidently with interactive mock examinations.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/practice"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="/exam"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all active:scale-[0.98]"
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>Take Mock Exam</span>
              </Link>
            </div>

            {/* Feature Highlights Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 border-t border-slate-100 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 500 DOTM Questions
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-600" /> Category A (Motorcycle) & K (Scooter)
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" /> 30-Min Timed Simulator
              </span>
            </div>
          </div>

          {/* Right Visual Composition (Interactive Examination Preview) */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Backing Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl" />

            <div className="relative bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-md space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    DOTM CBT Simulation
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold font-mono">
                  <Timer className="w-3.5 h-3.5 text-amber-600" />
                  <span>24:18 left</span>
                </div>
              </div>

              {/* Question Metadata */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold">
                  Question #416 • Traffic Sign (ट्राफिक संकेत)
                </span>
                <span className="text-slate-400 font-medium">
                  5 Marks • 50% to Pass
                </span>
              </div>

              {/* Simulated Authentic Nepali Question */}
              <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-devanagari">
                यस्तो ट्राफिक चिन्हले केलाई जनाउँछ ?
              </div>

              {/* Road Sign Image from Dataset */}
              <div className="flex items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/questions/images/question-416-image-1.png"
                  alt="प्रश्न 416 को ट्राफिक संकेत चित्र (पार्किङ्ग स्थल)"
                  className="h-20 w-auto object-contain drop-shadow-sm select-none"
                />
              </div>

              {/* Sample Interactive Options */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-devanagari text-xs">
                {[
                  { key: "क", text: "वर्गाकार" },
                  { key: "ख", text: "आयताकार" },
                  { key: "ग", text: "पार्किङ्ग स्थल", isCorrect: true },
                  { key: "घ", text: "अस्पताल" },
                ].map((opt, idx) => {
                  const isSelected = previewSelectedOption === idx;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setPreviewSelectedOption(idx)}
                      className={cn(
                        "w-full text-left p-2.5 sm:p-3 rounded-xl border flex items-center justify-between transition-all select-none text-xs sm:text-sm",
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold"
                          : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "w-5 h-5 rounded-md font-bold text-xs flex items-center justify-center shrink-0",
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          )}
                        >
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 ml-2">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Floating Live Badge */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instant Answer Validation
                </span>
                <span className="font-semibold text-slate-700">
                  500 Verified Q&A
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. QUICK STATISTICS (Dynamic LocalStorage Values)        */}
      {/* ======================================================== */}
      <section id="analytics" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Learning Statistics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Real metrics calculated dynamically from your personal learning progress.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {isLoaded ? "Progress Active" : "Loading..."}
          </span>
        </div>

        <StatCards stats={stats} />
      </section>

      {/* ======================================================== */}
      {/* 3. MAIN FEATURES (5 Professional Cards with Actions)     */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Comprehensive Exam Features
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Everything you need to master traffic rules, road signs, and pass your written test on the first attempt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Feature 1: Practice Questions */}
          <Link
            href="/practice"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 border border-blue-200/60 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                Practice Questions
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Practice 10, 20, 50, or all 500 questions sequentially or randomized with instant correct answer explanations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Start Practicing</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 2: Mock Examination */}
          <Link
            href="/exam"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 border border-amber-200/60 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                Mock Examination
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Simulate the real 30-minute CBT written examination with randomized questions, countdown timer, and pass/fail grading.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>Take Mock Exam</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 3: Question Bank */}
          <Link
            href="/questions"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 border border-indigo-200/60 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                Question Bank
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Browse the complete library of 500 official DOTM questions with real-time bilingual search and instant answer reveal toggle.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>Browse 500 Q&A</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 4: Performance Tracking */}
          <Link
            href="#analytics"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-200/60 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
                Performance Tracking
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Track your attempted questions, category-by-category accuracy, and mock exam history stored locally in your browser.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <span>View Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 5: Bookmarked Questions */}
          <Link
            href="/bookmarks"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all group md:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 border border-amber-200/60 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                Bookmarked Questions
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Save difficult or frequently missed questions with one tap, and launch dedicated revision practice sessions on your saved questions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>View Saved Questions ({stats.bookmarksCount})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. LEARNING CATEGORIES (Actual 6 Dataset Sections)       */}
      {/* ======================================================== */}
      <section>
        <CategoryGrid sectionStats={stats.sectionStats} />
      </section>

      {/* ======================================================== */}
      {/* 5. HOW IT WORKS (Three-Step Educational Method)         */}
      {/* ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How LicensePrep Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A proven three-step learning methodology designed to prepare you thoroughly for the Nepal written driving test.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
            <span className="text-xs font-extrabold text-blue-600 font-mono tracking-wider">
              01 — LEARN
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Study the Question Bank
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore the question bank and understand traffic rules, road signs, and safe driving principles chapter by chapter.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
            <span className="text-xs font-extrabold text-blue-600 font-mono tracking-wider">
              02 — PRACTICE
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Practice Random Sets
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Answer questions and identify areas that need improvement with immediate feedback and explanation notes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
            <span className="text-xs font-extrabold text-blue-600 font-mono tracking-wider">
              03 — EVALUATE
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Simulate Real Exams
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Take mock examinations and review your results against the official 50% passing mark with detailed answer review.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. RECENT ACTIVITY & RESUME LEARNING                     */}
      {/* ======================================================== */}
      <section>
        <RecentActivity progress={progress} onReset={resetProgress} />
      </section>

      {/* ======================================================== */}
      {/* 7. FINAL CALL TO ACTION (CTA)                            */}
      {/* ======================================================== */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Start preparing today with Nepal&apos;s most comprehensive driving license preparation platform.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/practice"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              Start Practicing
            </Link>
            <Link
              href="/questions"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 active:scale-[0.98]"
            >
              Explore Questions
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
