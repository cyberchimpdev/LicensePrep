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
  Sparkles,
  CheckCircle2,
  Zap,
  TrafficCone,
  Car,
  FileText,
  Clock,
  HelpCircle,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatCards } from "@/components/dashboard/StatCards";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function HomePage() {
  const { progress, stats, isLoaded, resetProgress } = useUserProgress();

  return (
    <PageContainer size="wide" className="space-y-10 sm:space-y-12">
      {/* nepallicense.com inspired Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-navy-950 text-white p-7 sm:p-12 lg:p-16 shadow-2xl border border-blue-600/30">
        {/* Glow Gradients */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-black backdrop-blur-md border border-white/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>DOTM Nepal Official 500 Questions Bank (वर्ग ‘क’ र ‘ट’)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            नेपाल ड्राइभिङ लाइसेन्स <br />
            <span className="bg-gradient-to-r from-sky-200 via-white to-sky-100 bg-clip-text text-transparent">
              लिखित परीक्षा तयारी (Likhit)
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-blue-100 leading-relaxed max-w-2xl font-medium">
            यातायात व्यवस्था विभाग (DOTM) द्वारा निर्धारण गरिएको वर्ग ‘क’ (Motorcycle) र ‘ट’ (Scooter/Moped) का ५०० वस्तुगत प्रश्नोत्तरहरू, विषयगत अभ्यास र अनलाइन नमुना परीक्षा।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/questions"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-blue-800 hover:bg-blue-50 active:bg-blue-100 font-black text-sm transition-all shadow-lg active:scale-95"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Important Questions with Answers</span>
              <ArrowRight className="w-4 h-4 text-blue-600 ml-0.5" />
            </Link>

            <Link
              href="/exam"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600/80 hover:bg-blue-600 active:bg-blue-500 text-white font-black text-sm border border-white/30 backdrop-blur-md transition-all active:scale-95 shadow-md shadow-blue-900/30"
            >
              <Award className="w-4 h-4 text-sky-200" />
              <span>Online Mock Exam (नमुना परीक्षा)</span>
            </Link>
          </div>

          <div className="pt-5 flex flex-wrap items-center gap-6 text-xs text-blue-100 border-t border-white/15 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> ५०० वस्तुगत प्रश्नोत्तर
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-200" /> वर्ग ‘क’ (A) र ‘ट’ (K)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-300" /> ३० मिनेट / उत्तीर्ण अङ्क: ५०-६०%
            </span>
          </div>
        </div>
      </section>

      {/* nepallicense.com inspired 4 Quick Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Link
          href="/questions"
          className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-subtle hover:border-blue-400 hover:shadow-card transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              Important Questions
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              ५०० आधिकारिक प्रश्नहरू उत्तरसहित अध्ययन गर्नुहोस्।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>अध्ययन गर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/practice"
          className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-subtle hover:border-indigo-400 hover:shadow-card transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
              Interactive Practice
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              एक-एक गरी प्रश्न हल गर्नुहोस् र तत्काल नतिजा पाउनुहोस्।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>अभ्यास सुरु गर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/exam"
          className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-subtle hover:border-amber-400 hover:shadow-card transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
              Online Mock Exam
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              ३० मिनेटको वास्तविक परीक्षा सिमुलेसन दिनुहोस्।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
            <span>परीक्षा दिनुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href={`/questions?section=${encodeURIComponent("ट्राफिक सङ्केत सम्बन्धी ज्ञान")}`}
          className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-subtle hover:border-emerald-400 hover:shadow-card transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TrafficCone className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
              Traffic Signs (सङ्केत)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              ११० ट्राफिक चिह्न र सडक रेखाङ्कन प्रश्नहरू।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>सङ्केतहरू हेर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Dashboard Statistics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Learning Dashboard (प्रगति विवरण)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              तपाईंको अभ्यास, सही उत्तर र नमुना परीक्षाको अद्यावधिक तथ्याङ्क।
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {isLoaded ? "Live Offline Storage" : "Loading..."}
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
    </PageContainer>
  );
}
