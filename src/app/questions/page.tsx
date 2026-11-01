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
  XCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 20;

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
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-navy-900 text-white">
                <Layers className="w-5 h-5 text-blue-400" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Question Bank (५०० प्रश्नोत्तर भण्डार)
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Search and explore all official DOTM Category A and K examination questions. Toggle answer visibility for self-testing or study.
            </p>
          </div>

          {/* Reveal Answers Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setRevealAnswers(true)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
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
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          {/* Keyword Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search in Nepali or English (e.g. जेब्रा क्रस, बत्ती, helmet, speed...)"
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Questions Status</option>
              <option value="attempted">Practiced Questions</option>
              <option value="unattempted">Unpracticed Questions</option>
              <option value="bookmarked">Bookmarked Only</option>
            </select>
          </div>
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
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
              className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-5 sm:p-6 space-y-4 hover:border-slate-300 transition-colors"
            >
              {/* Card Meta Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-navy-900 text-white">
                    प्रश्न नं. {q.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {q.section}
                  </Badge>
                  <span className="text-xs text-slate-400">पृष्ठ {q.sourcePage}</span>

                  {userAttempt && (
                    <Badge variant={userAttempt.isCorrect ? "success" : "danger"} size="sm">
                      {userAttempt.isCorrect ? "Practiced Correctly" : "Practiced Incorrectly"}
                    </Badge>
                  )}
                </div>

                <button
                  onClick={() => toggleBookmark(q.number)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isQBookmarked
                      ? "text-amber-500 bg-amber-50"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                  title={isQBookmarked ? "Remove Bookmark" : "Bookmark this question"}
                >
                  <Bookmark className={`w-4 h-4 ${isQBookmarked ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Special Note (e.g. Q290) */}
              {q.isNote && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{q.isNote}</p>
                </div>
              )}

              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-devanagari">
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
                          "p-3 rounded-xl border flex items-start gap-3 text-sm transition-all",
                          isCorrect
                            ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-500"
                            : "border-slate-200/80 bg-slate-50/50 text-slate-800"
                        )}
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5",
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
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    सही उत्तर: ({q.correctAnswerKey}) {q.correctAnswerText || "(स्रोत बमोजिम)"}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No questions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No questions matched your search query or selected filters. Try searching for different keywords or resetting filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedSection("all");
                setStatusFilter("all");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage <= 1}
            className="gap-1.5"
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
            className="gap-1.5"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </PageContainer>
  );
}

