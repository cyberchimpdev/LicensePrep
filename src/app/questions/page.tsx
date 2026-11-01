"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAllQuestions, getSections, searchQuestions } from "@/lib/question-parser";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Eye,
  EyeOff,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE_OPTIONS = [20, 50, 100];

const POPULAR_SEARCH_TAGS = [
  "जेब्रा क्रस (Zebra Cross)",
  "रातो बत्ती (Red Light)",
  "हेलमेट (Helmet)",
  "ओभरटेक (Overtaking)",
  "गति (Speed)",
  "इन्जिन (Engine)",
  "सवारी कर (Tax)",
  "ट्राफिक संकेत (Signs)",
];

export default function ImportantQuestionsPage() {
  const { progress, toggleBookmark, isBookmarked } = useUserProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "attempted" | "unattempted" | "bookmarked">("all");
  const [showAllAnswers, setShowAllAnswers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Track individually toggled answers (when showAllAnswers is false)
  const [revealedMap, setRevealedMap] = useState<Record<number, boolean>>({});
  // Track user interactive clicks for self-testing
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const allQuestions = useMemo(() => getAllQuestions(), []);
  const sections = useMemo(() => getSections(), []);

  // Filter and search questions
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
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSingleAnswer = (qNum: number) => {
    setRevealedMap((prev) => ({
      ...prev,
      [qNum]: !prev[qNum],
    }));
  };

  const handleOptionSelect = (qNum: number, optKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qNum]: optKey,
    }));
  };

  return (
    <PageContainer size="wide" className="space-y-6">
      {/* Header Box */}
      <div className="liquid-glass-card p-5 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-pill text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Category &apos;A&apos; & &apos;K&apos; • Official 500 Q&A Bank</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Important Questions Library (500 Q&A)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Complete collection of 500 official DOTM written exam questions. Study questions, reveal official keys, and test your readiness.
            </p>
          </div>

          {/* Quick Answer Toggle Action & Practice Link */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <Link href="/practice">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 font-semibold text-xs rounded-xl border-slate-200"
              >
                <Shuffle className="w-3.5 h-3.5 text-blue-600" />
                <span>Random 20 Practice</span>
              </Button>
            </Link>

            <Button
              variant={showAllAnswers ? "primary" : "outline"}
              size="sm"
              onClick={() => {
                setShowAllAnswers(!showAllAnswers);
                setRevealedMap({});
              }}
              className="gap-2 font-semibold text-xs rounded-xl"
            >
              {showAllAnswers ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Hide Answers</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Show All Answers</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => {
                setSelectedSection("all");
                setCurrentPage(1);
              }}
              className={cn(
                "whitespace-nowrap px-3.5 py-1.5 rounded-xl font-semibold transition-all border shrink-0",
                selectedSection === "all"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              )}
            >
              All Questions ({allQuestions.length})
            </button>
            {sections.map((sec) => {
              const isSelected = selectedSection === sec.name;
              return (
                <button
                  key={sec.name}
                  onClick={() => {
                    setSelectedSection(sec.name);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "whitespace-nowrap px-3 py-1.5 rounded-xl font-medium transition-all border shrink-0 flex items-center gap-1.5 font-devanagari",
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm font-semibold"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  )}
                >
                  <span>{sec.name}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {sec.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100 items-center">
          {/* Search box */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search in English or Nepali (e.g., zebra cross, helmet, engine, बत्ती...)"
              className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Questions (All Status)</option>
              <option value="attempted">Practiced Questions</option>
              <option value="unattempted">Unpracticed (New)</option>
              <option value="bookmarked">Bookmarked (Saved)</option>
            </select>
          </div>

          {/* Items per page */}
          <div className="md:col-span-2 flex items-center justify-end gap-1.5 text-xs text-slate-500">
            <span>Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mr-1">
            Key Topics:
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const keyword = tag.split(" ")[0];
                setSearchQuery(keyword);
                setCurrentPage(1);
              }}
              className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors font-devanagari"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Total <strong>{filteredQuestions.length}</strong> questions found (Page {validCurrentPage} of {totalPages})
            {searchQuery && ` — results for "${searchQuery}"`}
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {paginatedQuestions.map((q) => {
          const isQBookmarked = isBookmarked(q.number);
          const userAttempt = progress.attemptedQuestions[q.number];

          // Determine answer visibility
          const isAnswerRevealed =
            showAllAnswers ||
            Boolean(revealedMap[q.number]) ||
            Boolean(selectedAnswers[q.number]);

          const userSelectedOptionKey = selectedAnswers[q.number];

          return (
            <div
              key={q.id}
              className="liquid-glass-card p-5 sm:p-6 space-y-4 liquid-glass-card-hover"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-bold text-xs tracking-wide">
                    Question #{q.number}
                  </span>
                  <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded-lg font-devanagari">
                    {q.section}
                  </span>

                  {userAttempt && (
                    <span
                      className={cn(
                        "text-[11px] font-semibold px-2 py-0.5 rounded-lg",
                        userAttempt.isCorrect
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      )}
                    >
                      {userAttempt.isCorrect ? "Previously Correct" : "Needs Review"}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(q.number)}
                    className={cn(
                      "p-1.5 rounded-lg transition-all",
                      isQBookmarked
                        ? "text-amber-600 bg-amber-50 ring-1 ring-amber-300"
                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    )}
                    title={isQBookmarked ? "Remove Bookmark" : "Save Question"}
                  >
                    <Bookmark className={cn("w-4 h-4", isQBookmarked ? "fill-current text-amber-500" : "")} />
                  </button>
                </div>
              </div>

              {/* Edge Case Note (e.g. Q290) */}
              {q.isNote && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2 font-devanagari">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{q.isNote}</p>
                </div>
              )}

              {/* Question Text (Authentic Nepali) */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-devanagari">
                {q.question}
              </div>

              {/* Multiple Choice Options List (Authentic Nepali) */}
              {q.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const isCorrect = isAnswerRevealed && opt.key === q.correctAnswerKey;
                    const isUserChoice = userSelectedOptionKey === opt.key;
                    const isUserWrong = isAnswerRevealed && isUserChoice && !isCorrect;

                    let cardClass =
                      "border-slate-200 bg-slate-50/70 hover:bg-blue-50/30 hover:border-blue-300 text-slate-800";
                    let badgeClass = "bg-slate-200 text-slate-700";

                    if (isCorrect) {
                      cardClass =
                        "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500/30";
                      badgeClass = "bg-emerald-600 text-white";
                    } else if (isUserWrong) {
                      cardClass =
                        "border-rose-400 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-400/30";
                      badgeClass = "bg-rose-600 text-white";
                    }

                    return (
                      <div
                        key={opt.key}
                        onClick={() => handleOptionSelect(q.number, opt.key)}
                        className={cn(
                          "p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm transition-all select-none cursor-pointer",
                          cardClass
                        )}
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                            badgeClass
                          )}
                        >
                          {opt.key}
                        </div>
                        <div className="flex-1 leading-relaxed font-devanagari font-medium text-slate-900">
                          {opt.text}
                        </div>
                        {isCorrect && (
                          <div className="shrink-0 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {/* Answer Callout */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {isAnswerRevealed ? (
                  <div className="p-2.5 px-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-emerald-950 flex-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Official Correct Answer: Option <strong>({q.correctAnswerKey}) <span className="font-devanagari">{q.correctAnswerText || "(स्रोत बमोजिम)"}</span></strong>
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleSingleAnswer(q.number)}
                    className="p-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors self-start"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Show Answer</span>
                  </button>
                )}

                <div className="flex items-center justify-end gap-2 shrink-0">
                  {!showAllAnswers && isAnswerRevealed && (
                    <button
                      onClick={() => toggleSingleAnswer(q.number)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-medium px-2 py-1"
                    >
                      Hide
                    </button>
                  )}
                  <Link
                    href={`/practice?question=${q.number}`}
                    className="p-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Practice</span>
                    <ArrowRight className="w-3 h-3 text-blue-600" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty Search Result */}
        {filteredQuestions.length === 0 && (
          <div className="liquid-glass-card p-12 text-center space-y-3 shadow-sm">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Questions Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;. Please try a different keyword or reset filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedSection("all");
                setStatusFilter("all");
              }}
              className="rounded-xl font-semibold text-xs"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="liquid-glass-card p-3.5 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage <= 1}
            className="gap-1.5 rounded-xl text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-xs font-semibold text-slate-700">
            Page {validCurrentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={validCurrentPage >= totalPages}
            className="gap-1.5 rounded-xl text-xs font-semibold"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
