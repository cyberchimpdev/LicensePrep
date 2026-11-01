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
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Bookmark className="w-5 h-5 fill-current" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Bookmarked Questions (सुरक्षित प्रश्नहरू)
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Questions you have marked for quick review and dedicated revision.
            </p>
          </div>

          {bookmarkedQuestions.length > 0 && (
            <Link href="/practice?filter=bookmarked">
              <Button variant="primary" size="md" className="gap-2 bg-navy-900 hover:bg-navy-800">
                <BookOpen className="w-4 h-4" />
                <span>Practice Bookmarks</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Section Filter Pills */}
        {uniqueSections.length > 1 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Category:</span>
            <button
              onClick={() => setSelectedSection("all")}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                selectedSection === "all"
                  ? "bg-navy-900 text-white"
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
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  selectedSection === sec
                    ? "bg-navy-900 text-white"
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
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Bookmarked Questions Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            While practicing or browsing the question bank, click the bookmark icon on questions you find tricky or want to review again.
          </p>
          <div className="pt-2">
            <Link href="/practice">
              <Button variant="primary" size="md">
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
              className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-navy-900 text-white">
                    प्रश्न नं. {q.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {q.section}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/practice?question=${q.number}`}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Practice this</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleBookmark(q.number)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-base font-bold text-slate-900 leading-relaxed font-devanagari">
                {q.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt) => {
                  const isCorrect = opt.key === q.correctAnswerKey;
                  return (
                    <div
                      key={opt.key}
                      className={cn(
                        "p-3 rounded-xl border text-xs flex items-start gap-2.5",
                        isCorrect
                          ? "border-emerald-300 bg-emerald-50 text-emerald-950 font-medium"
                          : "border-slate-200/70 bg-slate-50/50 text-slate-700"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded font-bold text-[11px] flex items-center justify-center shrink-0",
                          isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        )}
                      >
                        {opt.key}
                      </div>
                      <div className="flex-1 leading-snug">{opt.text}</div>
                      {isCorrect && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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

