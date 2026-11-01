"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
  Check,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
  AlertCircle,
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE_OPTIONS = [20, 50, 100];

const POPULAR_SEARCH_TAGS = [
  "जेब्रा क्रस",
  "रातो बत्ती",
  "हेलमेट",
  "गति (Speed)",
  "ओभरटेक",
  "इन्जिन",
  "सवारी कर",
  "दुर्घटना",
];

export default function ImportantQuestionsPage() {
  const { progress, toggleBookmark, isBookmarked } = useUserProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "attempted" | "unattempted" | "bookmarked">("all");
  const [displayMode, setDisplayMode] = useState<"show-all" | "quiz" | "toggle">("show-all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Track individually toggled answers (in "toggle" mode)
  const [revealedMap, setRevealedMap] = useState<Record<number, boolean>>({});
  // Track user interactive clicks in quiz mode
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

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
      {/* nepallicense.com inspired Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>वर्ग ‘क’ (Motorcycle) र ‘ट’ (Scooter/Moped) ५०० वस्तुगत प्रश्नोत्तर</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Important Questions with Answers <br />
              <span className="text-blue-600 font-extrabold text-xl sm:text-2xl font-devanagari">
                (महत्त्वपूर्ण वस्तुगत प्रश्न र आधिकारिक उत्तरहरू)
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-medium leading-relaxed">
              यातायात व्यवस्था विभाग (DOTM) को लिखित परीक्षामा सोधिने ५०० प्रश्नोत्तरहरू। यहाँबाट सम्पूर्ण प्रश्नहरूको अध्ययन गर्नुहोस् र उत्तरहरू जाँच्नुहोस्।
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start lg:self-auto border border-slate-200">
            <button
              onClick={() => setDisplayMode("show-all")}
              className={cn(
                "flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all",
                displayMode === "show-all"
                  ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Show Answers (उत्तरसहित)</span>
            </button>
            <button
              onClick={() => setDisplayMode("quiz")}
              className={cn(
                "flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all",
                displayMode === "quiz"
                  ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <EyeOff className="w-4 h-4 text-slate-500" />
              <span>Self-Test Mode (आफैँ जाँच्नुहोस्)</span>
            </button>
          </div>
        </div>

        {/* Category Tabs (Horizontally scrollable like nepallicense.com) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => {
                setSelectedSection("all");
                setCurrentPage(1);
              }}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-xl font-bold transition-all border shrink-0",
                selectedSection === "all"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              )}
            >
              सबै प्रश्नहरू (All {allQuestions.length})
            </button>
            {sections.map((sec, idx) => {
              const isSelected = selectedSection === sec.name;
              return (
                <button
                  key={sec.name}
                  onClick={() => {
                    setSelectedSection(sec.name);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "whitespace-nowrap px-3.5 py-2 rounded-xl font-bold transition-all border shrink-0 flex items-center gap-1.5",
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  )}
                >
                  <span>{sec.name}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-black",
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
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search in Nepali or English (e.g. जेब्रा क्रस, बत्ती, helmet, speed...)"
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
              <option value="all">All Statuses (सबै अवस्था)</option>
              <option value="attempted">Practiced Questions</option>
              <option value="unattempted">Unpracticed Questions</option>
              <option value="bookmarked">Bookmarked Only (सुरक्षित)</option>
            </select>
          </div>

          {/* Items per page */}
          <div className="md:col-span-2 flex items-center justify-end gap-1.5 text-xs text-slate-500 font-bold">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} Qs
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-blue-500" /> Hot Topics:
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

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
          <span>
            Showing <strong>{filteredQuestions.length}</strong> of {allQuestions.length} questions
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <span>
            Page {validCurrentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Questions List (Styled like nepallicense.com Important Questions) */}
      <div className="space-y-5">
        {paginatedQuestions.map((q) => {
          const isQBookmarked = isBookmarked(q.number);
          const userAttempt = progress.attemptedQuestions[q.number];

          // Determine answer visibility
          const isAnswerRevealed =
            displayMode === "show-all" ||
            Boolean(revealedMap[q.number]) ||
            Boolean(selectedAnswers[q.number]);

          const userSelectedOptionKey = selectedAnswers[q.number];

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-5 sm:p-7 space-y-4 hover:border-blue-200 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black text-xs tracking-wide shadow-sm shadow-blue-600/20">
                    प्रश्न नं. {q.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {q.section}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">
                    DOTM Page {q.sourcePage}
                  </span>

                  {userAttempt && (
                    <Badge variant={userAttempt.isCorrect ? "success" : "danger"} size="sm">
                      {userAttempt.isCorrect ? "Practiced Correctly" : "Practiced Incorrectly"}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
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
              </div>

              {/* Edge Case Note (Q290) */}
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

              {/* Multiple Choice Options List */}
              {q.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const isCorrect = isAnswerRevealed && opt.key === q.correctAnswerKey;
                    const isUserChoice = userSelectedOptionKey === opt.key;
                    const isUserWrong = isAnswerRevealed && isUserChoice && !isCorrect;

                    let cardClass =
                      "border-slate-200/90 bg-slate-50/50 hover:bg-blue-50/20 hover:border-blue-300 text-slate-800";
                    let badgeClass = "bg-slate-200 text-slate-700";

                    if (isCorrect) {
                      cardClass =
                        "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-sm";
                      badgeClass = "bg-emerald-600 text-white";
                    } else if (isUserWrong) {
                      cardClass =
                        "border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400/20";
                      badgeClass = "bg-rose-600 text-white";
                    }

                    return (
                      <div
                        key={opt.key}
                        onClick={() => {
                          if (displayMode === "quiz") {
                            handleOptionSelect(q.number, opt.key);
                          }
                        }}
                        className={cn(
                          "p-3.5 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm transition-all select-none cursor-pointer",
                          cardClass
                        )}
                      >
                        <div
                          className={cn(
                            "w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-colors",
                            badgeClass
                          )}
                        >
                          {opt.key}
                        </div>
                        <div className="flex-1 leading-snug font-devanagari font-medium">
                          {opt.text}
                        </div>
                        {isCorrect && (
                          <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {/* Answer Callout (like nepallicense.com's Important Questions format) */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {isAnswerRevealed ? (
                  <div className="p-3 px-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm text-emerald-950 font-bold font-devanagari flex-1 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      आधिकारिक सही उत्तर: विकल्प <strong>({q.correctAnswerKey}) {q.correctAnswerText || "(स्रोत बमोजिम)"}</strong>
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleSingleAnswer(q.number)}
                    className="p-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-colors self-start"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>Show Answer (उत्तर हेर्नुहोस्)</span>
                  </button>
                )}

                <div className="flex items-center justify-end gap-2 shrink-0">
                  {displayMode !== "show-all" && isAnswerRevealed && (
                    <button
                      onClick={() => toggleSingleAnswer(q.number)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1"
                    >
                      Hide
                    </button>
                  )}
                  <Link
                    href={`/practice?question=${q.number}`}
                    className="p-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Practice this Q</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty Search Result */}
        {filteredQuestions.length === 0 && (
          <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">कुनै प्रश्न भेटिएन (No Questions Found)</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              तपाईंले खोज्नुभएको &quot;{searchQuery}&quot; अनुसार कुनै प्रश्न भेटिएन। कृपया अर्को शब्द खोजी गर्नुहोस् वा फिल्टर रिसेट गर्नुहोस्।
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
              फिल्टर रिसेट गर्नुहोस् (Clear Filters)
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
            <span>अघिल्लो (Previous)</span>
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
            <span>पछिल्लो (Next)</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
