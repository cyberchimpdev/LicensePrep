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
    <PageContainer size="wide" className="space-y-8 sm:space-y-10 font-devanagari">
      {/* Liquid Glass Hero Section */}
      <section className="relative overflow-hidden liquid-glass-card p-6 sm:p-10 lg:p-12">
        {/* Subtle Liquid Glass Specular Highlight */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Official DOTM Syllabus Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>यातायात व्यवस्था विभाग (DOTM) वर्ग ‘क’ (A) र ‘ट’ (K) आधिकारिक पाठ्यक्रम</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.25]">
            नेपाल ड्राइभिङ लाइसेन्स <br className="hidden sm:inline" />
            <span className="text-blue-600">लिखित परीक्षा तयारी (Likhit Exam)</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-devanagari">
            यातायात व्यवस्था विभागद्वारा निर्धारित ५०० आधिकारिक वस्तुगत प्रश्नोत्तरहरू। वास्तविक परीक्षा जस्तै ३० मिनेटको अनलाइन CBT परीक्षा सिमुलेसन, अनियमित २० प्रश्न अभ्यास सेट, र पूर्ण प्रश्न बैंक।
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/exam"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)] active:scale-[0.98]"
            >
              <Monitor className="w-4 h-4 text-white" />
              <span>वास्तविक CBT नमुना परीक्षा (२० प्रश्न)</span>
              <ArrowRight className="w-4 h-4 text-white ml-0.5" />
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl liquid-glass hover:bg-white text-slate-800 font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              <Shuffle className="w-4 h-4 text-blue-600" />
              <span>अनियमित अभ्यास सेट (Random 20 Qs)</span>
            </Link>

            <Link
              href="/questions"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl liquid-glass hover:bg-white text-slate-700 font-semibold text-sm transition-all active:scale-[0.98]"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>५०० प्रश्नोत्तर बैंक</span>
            </Link>
          </div>

          {/* Official Verification Feature Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 border-t border-slate-200/60 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ५०० वस्तुगत आधिकारिक प्रश्नोत्तर
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

      {/* Real CBT Examination Showcase Banner */}
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
                  DOTM Computer-Based Testing
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                वास्तविक कम्प्युटर आधारित लिखित परीक्षा (CBT Simulation)
              </h2>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                यातायात कार्यालयमा हुने परीक्षाकै ढाँचामा २० वटा प्रश्न, ३० मिनेट समय गणना, प्रश्न नेभिगेटर प्यालेट र तत्काल नतिजा विश्लेषण।
              </p>
            </div>
          </div>

          <Link
            href="/exam"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-sm active:scale-[0.98] shrink-0"
          >
            <span>परीक्षा सुरु गर्नुहोस्</span>
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
              अनियमित २० प्रश्न अभ्यास
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              ५०० प्रश्नहरूबाट प्रत्येक पटक नयाँ २० प्रश्नहरूको अनियमित सेट हल गर्नुहोस् र तत्काल सही/गलत उत्तर हेर्नुहोस्।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>अभ्यास सुरु गर्नुहोस्</span>
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
              अनलाइन नमुना परीक्षा (CBT)
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              ३० मिनेटको आधिकारिक घडी, प्रश्न फ्ल्याग, र परीक्षा सकिएपछि उत्तीर्ण/अनुत्तीर्ण प्रमाणपत्र नतिजा।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-amber-600">
            <span>परीक्षा दिनुहोस्</span>
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
              महत्त्वपूर्ण प्रश्नोत्तर बैंक
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              विषयगत विभाजन, नेपाली खोजी, र १-क्लिकमा उत्तर देखाउने/लुकाउने सुविधासहित ५०० प्रश्नहरूको अध्ययन।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>प्रश्नोत्तर हेर्नुहोस्</span>
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
              ट्राफिक सङ्केतहरू (Traffic Signs)
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              आदेशात्मक, चेतावनीमूलक र सूचनामूलक ११० ट्राफिक चिह्न तथा सडक रेखाङ्कन सम्बन्धी प्रश्नहरू।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span>सङ्केतहरू हेर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Dashboard Statistics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              प्रगति विवरण (Learning Analytics)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              तपाईंको अभ्यास, सही उत्तर र नमुना परीक्षाको अद्यावधिक स्थिति।
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400 liquid-glass-pill px-2.5 py-1">
            {isLoaded ? "अफलाइन सुरक्षित" : "लोड हुँदैछ..."}
          </span>
        </div>

        <StatCards stats={stats} />
      </section>

      {/* Category Grid */}
      <section>
        <CategoryGrid sectionStats={stats.sectionStats} />
      </section>

      {/* Official Exam Format Reference Guide */}
      <section className="liquid-glass-card p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            यातायात व्यवस्था विभाग (DOTM) लिखित परीक्षा ढाँचा तथा अंकभार
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            सवारी चालक अनुमतिपत्र (Driving License) परीक्षाको आधिकारिक नियमावली बमोजिमको विवरण।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">कुल प्रश्न संख्या:</span>
            <strong className="text-slate-900 text-sm font-bold">२० वस्तुगत बहुवैकल्पिक</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">तोकिएको समय:</span>
            <strong className="text-slate-900 text-sm font-bold">३० मिनेट (कम्प्युटर वा कागज)</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">उत्तीर्ण मापदण्ड (Pass):</span>
            <strong className="text-emerald-700 text-sm font-bold">कम्तीमा १० प्रश्न सही (५०%)</strong>
          </div>
          <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200/70">
            <span className="font-semibold text-slate-500 block mb-1">नेगेटिभ मार्किङ:</span>
            <strong className="text-blue-700 text-sm font-bold">छैन (No Negative Marking)</strong>
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
