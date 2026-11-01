"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { useUserProgress } from "@/hooks/useUserProgress";
import { getAllQuestions } from "@/lib/question-parser";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bookmark, BookOpen, Trash2, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookmarksPage() {
  const { progress, toggleBookmark } = useUserProgress();
  const [selectedSection, setSelectedSection] = useState("all");

  const allQuestions = useMemo(() => getAllQuestions(), []);

  // Filter bookmarked questions safely (ignoring any nonexistent question numbers)
  const bookmarkedQuestions = useMemo(() => {
    const bookmarkSet = new Set(progress.bookmarks);
    let list = allQuestions.filter((q) => bookmarkSet.has(q.number));

    if (selectedSection !== "all") {
      list = list.filter((q) => q.section === selectedSection);
    }

    return list;
  }, [allQuestions, progress.bookmarks, selectedSection]);

  const uniqueSections = useMemo(() => {
    const bookmarkSet = new Set(progress.bookmarks);
    const secs = new Set<string>();
    allQuestions.forEach((q) => {
      if (bookmarkSet.has(q.number)) {
        secs.add(q.section);
      }
    });
    return Array.from(secs);
  }, [allQuestions, progress.bookmarks]);

  return (
    <PageContainer size="narrow" className="space-y-6">
      {/* Header */}
      <div className="liquid-glass-card p-5 sm:p-7 space-y-4 font-devanagari">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Bookmark className="w-5 h-5 fill-current" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  सुरक्षित प्रश्नहरू (Bookmarked Questions)
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  तपाईंले थप अभ्यास वा दोहोर्‍याउनका लागि सुरक्षित गर्नुभएका प्रश्नहरू।
                </p>
              </div>
            </div>
          </div>

          {bookmarkedQuestions.length > 0 && (
            <Link href="/practice?filter=bookmarked">
              <Button variant="primary" size="sm" className="gap-2 rounded-xl font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>सबै अभ्यास गर्नुहोस् ({progress.bookmarks.length})</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Section Filter Pills */}
        {uniqueSections.length > 1 && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">विषय छनोट:</span>
            <button
              onClick={() => setSelectedSection("all")}
              className={cn(
                "px-3 py-1 rounded-xl text-xs font-semibold transition-all border",
                selectedSection === "all"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              )}
            >
              सबै ({progress.bookmarks.length})
            </button>
            {uniqueSections.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={cn(
                  "px-3 py-1 rounded-xl text-xs font-semibold transition-all border",
                  selectedSection === sec
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                )}
              >
                {sec}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarks List or Empty State */}
      {bookmarkedQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-14 text-center shadow-sm space-y-3 font-devanagari">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            कुनै प्रश्न सुरक्षित गरिएको छैन
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            अभ्यास गर्दा वा प्रश्न बैंक हेर्दा कुनै पनि महत्त्वपूर्ण वा गाह्रो प्रश्नमा रहेको बुकमार्क आइकन थिचेर यहाँ सुरक्षित गर्न सक्नुहुन्छ।
          </p>
          <div className="pt-2">
            <Link href="/questions">
              <Button variant="primary" size="sm" className="rounded-xl font-semibold">
                महत्त्वपूर्ण प्रश्नहरू हेर्नुहोस्
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q) => (
            <div
              key={q.id}
              className="liquid-glass-card p-5 sm:p-6 space-y-4 liquid-glass-card-hover font-devanagari"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-xs px-2.5 py-0.5 rounded-lg bg-blue-600 text-white">
                    प्रश्न नं. {q.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {q.section}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/practice?question=${q.number}`}
                    className="p-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>अभ्यास गर्नुहोस्</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleBookmark(q.number)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="बुकमार्कबाट हटाउनुहोस्"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {q.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt) => {
                  const isCorrect = opt.key === q.correctAnswerKey;
                  return (
                    <div
                      key={opt.key}
                      className={cn(
                        "p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-all",
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400/30"
                          : "border-slate-200 bg-slate-50/60 text-slate-800 font-medium"
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5",
                          isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        )}
                      >
                        {opt.key}
                      </div>
                      <div className="flex-1 leading-relaxed">{opt.text}</div>
                      {isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-emerald-900 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>आधिकारिक सही उत्तर: ({q.correctAnswerKey}) {q.correctAnswerText}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
