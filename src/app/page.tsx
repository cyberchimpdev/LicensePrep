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
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatCards } from "@/components/dashboard/StatCards";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function HomePage() {
  const { progress, stats, isLoaded, resetProgress } = useUserProgress();

  return (
    <PageContainer size="wide" className="space-y-6 sm:space-y-8 font-devanagari">
      {/* Modern High-Contrast Clean Hero (Zero Gradients / Zero Blurs) */}
      <section className="rounded-xl bg-white border border-zinc-200 p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          {/* Official DOTM Syllabus Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>नेपाल सरकार यातायात व्यवस्था विभाग (DOTM) वर्ग ‘क’ (A) र ‘ट’ (K)</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
            नेपाल ड्राइभिङ लाइसेन्स लिखित परीक्षा तयारी
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
            ५०० आधिकारिक प्रश्नहरूको भण्डारबाट वास्तविक परीक्षा जस्तै अनियमित (Randomized) २० प्रश्नहरूको अभ्यास सेट, ३० मिनेटको अनलाइन नमुना परीक्षा र विषयगत प्रश्नोत्तर।
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <Link
              href="/exam"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>वास्तविक नमुना परीक्षा (२० प्रश्न / ३० मिनेट)</span>
              <ArrowRight className="w-4 h-4 ml-0.5 text-zinc-300" />
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              <Shuffle className="w-4 h-4 text-white" />
              <span>अनियमित अभ्यास सेट (Random 20 Qs)</span>
            </Link>

            <Link
              href="/questions"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200 font-semibold text-xs sm:text-sm transition-all active:scale-[0.98]"
            >
              <Layers className="w-4 h-4 text-zinc-600" />
              <span>५०० प्रश्न बैंक (All Q&A)</span>
            </Link>
          </div>

          {/* Official Verification Strip */}
          <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500 border-t border-zinc-100 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ५०० आधिकारिक प्रश्नोत्तर
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" /> २० प्रश्नहरूको अनियमित छनोट
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" /> ३० मिनेट परीक्षा / १० अङ्क उत्तीर्ण
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-indigo-600" /> १००% नि:शुल्क र अफलाइन चल्ने
            </span>
          </div>
        </div>
      </section>

      {/* 4 Clean Quick Navigation Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Link
          href="/practice"
          className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm hover:border-blue-500 hover:shadow transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Shuffle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-zinc-900 text-sm group-hover:text-blue-600 transition-colors">
              अनियमित २० प्रश्न अभ्यास
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              प्रत्येक पटक नयाँ २० प्रश्नहरूको अनियमित सेट हल गर्नुहोस् र तयारी तिखार्नुहोस्।
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>अभ्यास सुरु गर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/exam"
          className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm hover:border-zinc-400 hover:shadow transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-zinc-900 text-sm group-hover:text-amber-600 transition-colors">
              वास्तविक नमुना परीक्षा (Mock Exam)
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              ३० मिनेटको आधिकारिक ढाँचा, घडी गणना र तत्काल नतिजा विश्लेषण।
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-amber-600">
            <span>परीक्षा दिनुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/questions"
          className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm hover:border-indigo-500 hover:shadow transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-zinc-900 text-sm group-hover:text-indigo-600 transition-colors">
              महत्त्वपूर्ण प्रश्नोत्तर (५०० Q&A)
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              विषयगत वर्गीकरण, खोजी र १-क्लिकमा उत्तर हेरेर पूर्ण अध्ययन गर्नुहोस्।
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>प्रश्नोत्तर हेर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href={`/questions?section=${encodeURIComponent("ट्राफिक सङ्केत सम्बन्धी ज्ञान")}`}
          className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm hover:border-emerald-500 hover:shadow transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TrafficCone className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-zinc-900 text-sm group-hover:text-emerald-600 transition-colors">
              ट्राफिक सङ्केतहरू (Traffic Signs)
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              ११० ट्राफिक चिह्न र सडक रेखाङ्कन सम्बन्धी सम्पूर्ण प्रश्नोत्तरहरू।
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span>सङ्केतहरू हेर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Dashboard Statistics */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              प्रगति विवरण (Dashboard)
            </h2>
            <p className="text-xs text-zinc-500">
              तपाईंको अभ्यास, सही उत्तर र नमुना परीक्षाको अद्यावधिक स्थिति।
            </p>
          </div>
          <span className="text-xs font-medium text-zinc-400">
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
