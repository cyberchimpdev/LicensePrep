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
  FileText,
  Sparkles,
  HelpCircle,
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
      {/* nepallicense.com inspired Clean Educational Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Subtle decorative background accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-50/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Official Syllabus Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>नेपाल सरकार यातायात व्यवस्था विभाग (DOTM) वर्ग ‘क’ र ‘ट’ (Category A & K)</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.25] font-devanagari">
            नेपाल ड्राइभिङ लाइसेन्स <br className="hidden sm:inline" />
            <span className="text-blue-600 font-extrabold">लिखित परीक्षा तयारी (Likhit Exam)</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-devanagari">
            यातायात व्यवस्था विभाग (DOTM) द्वारा निर्धारण गरिएको मोटरसाइकल तथा स्कुटरको ५०० आधिकारिक वस्तुगत प्रश्नोत्तरहरू, विषयगत अभ्यास र अनलाइन नमुना परीक्षा।
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/questions"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              <Layers className="w-4 h-4 text-white" />
              <span>महत्त्वपूर्ण प्रश्नोत्तर (५०० Q&A)</span>
              <ArrowRight className="w-4 h-4 text-white ml-0.5" />
            </Link>

            <Link
              href="/exam"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>अनलाइन नमुना परीक्षा (Mock Exam)</span>
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-300 font-semibold text-sm transition-all active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>विषयगत अभ्यास (Practice)</span>
            </Link>
          </div>

          {/* Verified Syllabus Features */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 border-t border-slate-100 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ५०० वस्तुगत आधिकारिक प्रश्नोत्तर
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> वर्ग ‘क’ (A) र ‘ट’ (K) पाठ्यक्रम
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" /> ३० मिनेट परीक्षा / १० अङ्क उत्तीर्ण
            </span>
          </div>
        </div>
      </section>

      {/* 4 Quick Access Navigation Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/questions"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors font-devanagari">
              महत्त्वपूर्ण प्रश्नोत्तर (५०० Q&A)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed font-devanagari">
              सबै ५०० आधिकारिक प्रश्नहरू एक-क्लिकमा उत्तर हेरेर अध्ययन गर्नुहोस्।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>अध्ययन गर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/exam"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-400 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors font-devanagari">
              अनलाइन नमुना परीक्षा (Mock Exam)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed font-devanagari">
              ३० मिनेटको वास्तविक परीक्षा सिमुलेसन दिनुहोस् र तत्काल नतिजा हेर्नुहोस्।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
            <span>परीक्षा सुरु गर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/practice"
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors font-devanagari">
              अन्तर्क्रियात्मक अभ्यास (Practice)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed font-devanagari">
              एक-एक गरी प्रश्न हल गर्नुहोस् र तत्काल सही/गलत जानकारी पाउनुहोस्।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>अभ्यास गर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href={`/questions?section=${encodeURIComponent("ट्राफिक सङ्केत सम्बन्धी ज्ञान")}`}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TrafficCone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors font-devanagari">
              ट्राफिक सङ्केत (Traffic Signs)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed font-devanagari">
              ११० ट्राफिक चिह्न र सडक रेखाङ्कन सम्बन्धी सम्पूर्ण प्रश्नोत्तरहरू।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span>सङ्केतहरू हेर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Dashboard Statistics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-devanagari">
              प्रगति विवरण (Learning Dashboard)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              तपाईंको अभ्यास, सही उत्तर र नमुना परीक्षाको अद्यावधिक तथ्याङ्क।
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {isLoaded ? "अफलाइन सुरक्षित" : "लोड हुँदैछ..."}
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
