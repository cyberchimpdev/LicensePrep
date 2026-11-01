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
  TrafficCone,
  Shuffle,
  Sparkles,
  Zap,
  Target,
  FileCheck,
  Play,
  RotateCcw,
  Check,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatCards } from "@/components/dashboard/StatCards";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { progress, stats, isLoaded, resetProgress } = useUserProgress();
  const { language, t } = useLanguage();

  // Interactive Hero Preview State
  const [heroSelectedOption, setHeroSelectedOption] = useState<number | null>(1);

  return (
    <PageContainer size="wide" className="space-y-8 sm:space-y-10">
      {/* Liquid Glass Hero Section */}
      <section className="relative rounded-2xl liquid-glass p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Official DOTM Syllabus Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-pill text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
                {t.heroTitle} <br />
                <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">
                  {t.heroTitleHighlight}
                </span>
              </h1>
              {language === "ne" && (
                <p className="text-xs text-slate-400 font-sans tracking-wide">
                  Nepal Driving License Computer-Based Written Exam Preparation Portal
                </p>
              )}
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/exam"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.98]"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>{t.ctaExam}</span>
                <ArrowRight className="w-4 h-4 text-blue-200" />
              </Link>

              <Link
                href="/practice"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl liquid-glass-card text-slate-800 hover:text-blue-700 font-semibold text-xs sm:text-sm transition-all active:scale-[0.98]"
              >
                <Shuffle className="w-4 h-4 text-blue-600" />
                <span>{t.ctaPractice}</span>
              </Link>

              <Link
                href="/questions"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl liquid-glass-subtle text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm transition-all active:scale-[0.98]"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>{t.ctaQuestions}</span>
              </Link>
            </div>

            {/* Syllabus Verification Strip */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600 border-t border-slate-200/60 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.syllabusPoint1}
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-600" /> {t.syllabusPoint2}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" /> {t.syllabusPoint3}
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-600" /> {t.syllabusPoint4}
              </span>
            </div>
          </div>

          {/* Right Column: Live Interactive Exam Simulation Preview Card */}
          <div className="lg:col-span-5">
            <div className="liquid-glass-card rounded-2xl p-5 sm:p-6 space-y-4">
              {/* Simulator Header */}
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === "ne" ? "वास्तविक परीक्षा सिमुलेटर" : "DOTM Exam Simulator"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full liquid-glass-pill text-[11px] font-mono font-bold text-blue-700">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span>29:45</span>
                </div>
              </div>

              {/* Sample Question Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{language === "ne" ? "प्रश्न नं. १ / २०" : "Question 1 of 20"}</span>
                  <span className="px-2 py-0.5 rounded-full liquid-glass-pill text-[10px] text-slate-700">
                    {language === "ne" ? "सवारी सञ्चालन" : "Vehicle Operation"}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 leading-snug font-devanagari">
                  {language === "ne"
                    ? "जेब्रा क्रसिङ केका लागि प्रयोग गरिन्छ ?"
                    : "What is a pedestrian zebra crossing used for?"}
                </div>

                {/* Preview Options with Click Interaction */}
                <div className="space-y-2 pt-1 text-xs">
                  {[
                    { key: "क", enKey: "A", text: "सवारी साधन पार्किङ गर्न", enText: "For vehicle parking" },
                    { key: "ख", enKey: "B", text: "पैदल यात्रीले बाटो काट्न", enText: "For pedestrians crossing the road", correct: true },
                    { key: "ग", enKey: "C", text: "गाडीको गति बढाउन", enText: "To accelerate speed" },
                    { key: "घ", enKey: "D", text: "ओभरटेक गर्न", enText: "To overtake vehicles" },
                  ].map((opt, i) => {
                    const isSelected = heroSelectedOption === i;
                    return (
                      <div
                        key={opt.key}
                        onClick={() => setHeroSelectedOption(i)}
                        className={cn(
                          "p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer select-none",
                          isSelected
                            ? "bg-emerald-50/90 border-emerald-400 text-emerald-950 font-semibold shadow-sm"
                            : "bg-white/70 border-slate-200 hover:bg-white text-slate-800"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 border",
                              isSelected
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            )}
                          >
                            {language === "ne" ? opt.key : opt.enKey}
                          </span>
                          <span className="font-devanagari">
                            {language === "ne" ? opt.text : opt.enText}
                          </span>
                        </div>
                        {isSelected && opt.correct && (
                          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            <span>{language === "ne" ? "सही उत्तर" : "Correct"}</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Simulator Action Button */}
              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {language === "ne" ? "अङ्क: ५ | उत्तीर्ण: ५०%" : "Marks: 5 | Pass: 50%"}
                </span>
                <Link
                  href="/exam"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                >
                  <span>{language === "ne" ? "पूर्ण परीक्षा सुरु गर्नुहोस्" : "Start Full Exam"}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Liquid Glass Quick Navigation Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/practice"
          className="liquid-glass-card rounded-2xl p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <Shuffle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
              {t.cardPracticeTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.cardPracticeDesc}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>{language === "ne" ? "अभ्यास सुरु गर्नुहोस्" : "Start Practice"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/exam"
          className="liquid-glass-card rounded-2xl p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-amber-600 transition-colors">
              {t.cardExamTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.cardExamDesc}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
            <span>{language === "ne" ? "परीक्षा दिनुहोस्" : "Take Exam"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/questions"
          className="liquid-glass-card rounded-2xl p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
              {t.cardQuestionsTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.cardQuestionsDesc}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
            <span>{language === "ne" ? "प्रश्नोत्तर हेर्नुहोस्" : "Browse Questions"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href={`/questions?section=${encodeURIComponent("ट्राफिक सङ्केत सम्बन्धी ज्ञान")}`}
          className="liquid-glass-card rounded-2xl p-5 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
              <TrafficCone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-600 transition-colors">
              {t.cardSignsTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.cardSignsDesc}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span>{language === "ne" ? "सङ्केतहरू हेर्नुहोस्" : "View Signs"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Dashboard Statistics */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {t.dashboardTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.dashboardSubtitle}
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {isLoaded ? (language === "ne" ? "अफलाइन सुरक्षित" : "Offline Ready") : "Loading..."}
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
