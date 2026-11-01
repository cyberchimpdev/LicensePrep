"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { useUserProgress } from "@/hooks/useUserProgress";
import { getAllQuestions } from "@/lib/question-parser";
import { Question } from "@/types/question";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bookmark, BookOpen, Trash2, ArrowRight, HelpCircle, CheckCircle } from "lucide-react";
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
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 shadow-sm">
                <Bookmark className="w-6 h-6 fill-current" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Bookmarked Questions (सुरक्षित प्रश्नहरू)
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Questions you have flagged for revision and dedicated practice.
                </p>
              </div>
            </div>
          </div>

          {bookmarkedQuestions.length > 0 && (
            <Link href="/practice?filter=bookmarked">
              <Button variant="primary" size="md" className="gap-2 bg-navy-900 hover:bg-navy-800 rounded-xl font-bold shadow-md">
                <BookOpen className="w-4 h-4" />
                <span>Practice All Saved ({progress.bookmarks.length})</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Section Filter Pills */}
        {uniqueSections.length > 1 && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-bold">Filter Category:</span>
            <button
              onClick={() => setSelectedSection("all")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                selectedSection === "all"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              All ({progress.bookmarks.length})
            </button>
            {uniqueSections.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                  selectedSection === sec
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
        <div className="bg-white rounded-3xl border border-slate-200 p-12 sm:p-16 text-center shadow-card space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            No Bookmarked Questions Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            While practicing or browsing the question bank, click the bookmark icon on any tricky questions to save them for revision.
          </p>
          <div className="pt-2">
            <Link href="/practice">
              <Button variant="primary" size="md" className="rounded-xl font-bold bg-navy-900 hover:bg-navy-800">
                Start Practicing Questions
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-5 sm:p-7 space-y-4 hover:border-amber-200 transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-xs px-3 py-1 rounded-xl bg-navy-900 text-white shadow-sm">
                    प्रश्न नं. {q.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {q.section}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/practice?question=${q.number}`}
                    className="p-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Practice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleBookmark(q.number)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed font-devanagari">
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
                        "p-3 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-all",
                        isCorrect
                          ? "border-emerald-400 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-300"
                          : "border-slate-200/80 bg-slate-50/50 text-slate-700 font-medium"
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-lg font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5",
                          isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        )}
                      >
                        {opt.key}
                      </div>
                      <div className="flex-1 leading-snug font-devanagari">{opt.text}</div>
                      {isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
