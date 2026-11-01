"use client";

import React, { useState, useMemo } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAllQuestions, getSections, searchQuestions } from "@/lib/question-parser";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Question } from "@/types/question";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Filter,
  Eye,
  EyeOff,
  Bookmark,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
  AlertCircle,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 20;

const POPULAR_SEARCH_TAGS = [
  "जेब्रा क्रस",
  "रातो बत्ती",
  "हेलमेट",
  "गति (Speed)",
  "इन्जिन",
  "सवारी कर",
  "दुर्घटना",
  "ओभरटेक",
];

export default function QuestionsPage() {
  const { progress, toggleBookmark, isBookmarked } = useUserProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "attempted" | "unattempted" | "bookmarked">("all");
  const [revealAnswers, setRevealAnswers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const allQuestions = useMemo(() => getAllQuestions(), []);
  const sections = useMemo(() => getSections(), []);

  // Filter and search
  const filteredQuestions = useMemo(() => {
    let list = searchQuestions(searchQuery, {
      section: selectedSection,
    });

    if (statusFilter === "attempted") {
      list = list.filter((q) => Boolean(progress.attemptedQuestions[q.number]));
    } else if (statusFilter === "unattempted") {
      list = list.filter((q) => !progress.attemptedQuestions[q.number]);
    } else if (statusFilter === "bookmarked") {
      const bSet = new Set(progress.bookmarks);
      list = list.filter((q) => bSet.has(q.number));
    }

    return list;
  }, [searchQuery, selectedSection, statusFilter, progress.attemptedQuestions, progress.bookmarks]);

  // Pagination calculation
  const totalItems = filteredQuestions.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageContainer size="wide" className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-navy-900 text-white shadow-md shadow-navy-900/10">
                <Layers className="w-6 h-6 text-blue-400" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Question Bank (५०० वस्तुगत प्रश्नोत्तर)
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Browse, search, and study all official DOTM Category A & K written test questions.
                </p>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setRevealAnswers(true)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                revealAnswers
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Study Mode (Show Answers)</span>
            </button>
            <button
              onClick={() => setRevealAnswers(false)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                !revealAnswers
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
              <span>Quiz Mode (Hide Answers)</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-100">
          {/* Keyword Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by keywords in Nepali or English..."
              className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-9 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories ({allQuestions.length})</option>
              {sections.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.count})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Question Statuses</option>
              <option value="attempted">Practiced Questions</option>
              <option value="unattempted">Unpracticed Questions</option>
              <option value="bookmarked">Bookmarked Only</option>
            </select>
          </div>
        </div>

        {/* Popular Search Suggestion Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-blue-500" /> Suggestions:
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const keyword = tag.split(" ")[0];
                setSearchQuery(keyword);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
          <span>
            Showing <strong>{filteredQuestions.length}</strong> of {allQuestions.length} questions
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <span>
            Page {validCurrentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {paginatedQuestions.map((q) => {
          const userAttempt = progress.attemptedQuestions[q.number];
          const isQBookmarked = isBookmarked(q.number);

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-5 sm:p-7 space-y-4 hover:border-blue-200 transition-all"
            >
              {/* Card Meta Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-xs px-3 py-1 rounded-xl bg-navy-900 text-white shadow-sm">
                    प्रश्न नं. {q.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {q.section}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">पृष्ठ {q.sourcePage}</span>

                  {userAttempt && (
                    <Badge variant={userAttempt.isCorrect ? "success" : "danger"} size="sm">
                      {userAttempt.isCorrect ? "Practiced Correctly" : "Practiced Incorrectly"}
                    </Badge>
                  )}
                </div>

                <button
                  onClick={() => toggleBookmark(q.number)}
                  className={`p-2 rounded-xl transition-all ${
                    isQBookmarked
                      ? "text-amber-600 bg-amber-50 ring-1 ring-amber-300"
                      : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  }`}
                  title={isQBookmarked ? "Remove Bookmark" : "Save Question"}
                >
                  <Bookmark className={`w-4 h-4 ${isQBookmarked ? "fill-current scale-110" : ""}`} />
                </button>
              </div>

              {/* Special Note (e.g. Q290) */}
              {q.isNote && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{q.isNote}</p>
                </div>
              )}

              {/* Question Text */}
              <div className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed font-devanagari">
                {q.question}
              </div>

              {/* Options */}
              {q.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const isCorrect = revealAnswers && opt.key === q.correctAnswerKey;

                    return (
                      <div
                        key={opt.key}
                        className={cn(
                          "p-3.5 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm transition-all",
                          isCorrect
                            ? "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-sm"
                            : "border-slate-200/90 bg-slate-50/50 text-slate-800"
                        )}
                      >
                        <div
                          className={cn(
                            "w-7 h-7 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm",
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
              ) : null}

              {/* Correct answer indicator when reveal is active */}
              {revealAnswers && q.correctAnswerKey && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    सही उत्तर: ({q.correctAnswerKey}) {q.correctAnswerText || "(स्रोत बमोजिम)"}
                  </span>
                  <a
                    href={`/practice?question=${q.number}`}
                    className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
                  >
                    Practice this Q →
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              No questions matched &quot;{searchQuery}&quot;. Try clearing filters or searching for terms like &quot;जेब्रा&quot;, &quot;बत्ती&quot;, or &quot;गति&quot;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedSection("all");
                setStatusFilter("all");
              }}
              className="rounded-xl font-bold"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-4 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage <= 1}
            className="gap-2 rounded-xl font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-xs font-bold text-slate-700">
            Page {validCurrentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={validCurrentPage >= totalPages}
            className="gap-2 rounded-xl font-bold"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
