"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAllQuestions, getSections, searchQuestions } from "@/lib/question-parser";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
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
  "जेब्रा क्रस",
  "रातो बत्ती",
  "हेलमेट",
  "ओभरटेक",
  "गति (Speed)",
  "इन्जिन",
  "सवारी कर",
  "ट्राफिक संकेत",
];

export default function ImportantQuestionsPage() {
  const { progress, toggleBookmark, isBookmarked } = useUserProgress();
  const { language, t, translateCategory, translateKey } = useLanguage();

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
      {/* Liquid Glass Header Box */}
      <div className="liquid-glass-card rounded-2xl p-5 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-pill text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "ne" ? "वर्ग ‘क’ (Motorcycle) र ‘ट’ (Scooter) - ५०० वस्तुगत प्रश्नोत्तर" : "DOTM Category A & K — Official 500 Question Bank"}</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight font-devanagari">
              {t.bankTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-devanagari max-w-2xl">
              {t.bankSubtitle}
            </p>
          </div>

          {/* Quick Answer Toggle Action & Practice Link */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <Link href="/practice">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 font-semibold text-xs rounded-xl liquid-glass-pill text-blue-700"
              >
                <Shuffle className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === "ne" ? "अनियमित २० प्रश्न अभ्यास" : "Random 20 Qs Practice"}</span>
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
                  <span>{t.hideAnswers}</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>{t.showAllAnswers}</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Category Tabs (Horizontally scrollable with Liquid Glass pills) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => {
                setSelectedSection("all");
                setCurrentPage(1);
              }}
              className={cn(
                "whitespace-nowrap px-3.5 py-1.5 rounded-xl font-semibold transition-all border shrink-0 font-devanagari",
                selectedSection === "all"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "liquid-glass-pill text-slate-700 hover:bg-slate-100"
              )}
            >
              {language === "ne" ? "सबै प्रश्नहरू" : "All Questions"} ({allQuestions.length})
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
                      : "liquid-glass-pill text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <span>{translateCategory(sec.name)}</span>
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
              placeholder={t.searchPlaceholder}
              className="w-full text-xs sm:text-sm font-medium bg-white/80 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-devanagari"
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
              className="w-full text-xs sm:text-sm font-medium bg-white/80 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-devanagari"
            >
              <option value="all">{language === "ne" ? "सबै प्रश्नहरू (All Status)" : "All Status"}</option>
              <option value="attempted">{language === "ne" ? "अभ्यास गरिएका (Practiced)" : "Practiced"}</option>
              <option value="unattempted">{language === "ne" ? "बाँकी प्रश्नहरू (Unpracticed)" : "Unpracticed"}</option>
              <option value="bookmarked">{language === "ne" ? "सुरक्षित (Bookmarked)" : "Bookmarked"}</option>
            </select>
          </div>

          {/* Items per page */}
          <div className="md:col-span-2 flex items-center justify-end gap-1.5 text-xs text-slate-500">
            <span>{language === "ne" ? "प्रति पृष्ठ:" : "Show:"}</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              className="bg-white/80 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {language === "ne" ? "प्रमुख विषय:" : "Hot Topics:"}
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const keyword = tag.split(" ")[0];
                setSearchQuery(keyword);
                setCurrentPage(1);
              }}
              className="px-2.5 py-0.5 rounded-lg text-xs font-medium liquid-glass-pill hover:text-blue-700 text-slate-600 transition-colors font-devanagari"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            {language === "ne"
              ? `कुल ${filteredQuestions.length} प्रश्नहरू मध्ये (पृष्ठ ${validCurrentPage} / ${totalPages})`
              : `Showing ${filteredQuestions.length} questions (Page ${validCurrentPage} of ${totalPages})`}
            {searchQuery && ` — "${searchQuery}"`}
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
              className="liquid-glass-card rounded-2xl p-5 sm:p-6 space-y-4 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-bold text-xs tracking-wide">
                    {language === "ne" ? `प्रश्न नं. ${q.number}` : `Q# ${q.number}`}
                  </span>
                  <span className="text-xs text-slate-600 font-medium liquid-glass-pill px-2 py-0.5 rounded-lg font-devanagari">
                    {translateCategory(q.section)}
                  </span>

                  {userAttempt && (
                    <span
                      className={cn(
                        "text-[11px] font-semibold px-2 py-0.5 rounded-lg font-devanagari",
                        userAttempt.isCorrect
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      )}
                    >
                      {userAttempt.isCorrect ? (language === "ne" ? "पहिले सही गरिएको" : "Solved Correctly") : (language === "ne" ? "पहिले गलत भएको" : "Solved Incorrectly")}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(q.number)}
                    className={cn(
                      "p-1.5 rounded-xl transition-all",
                      isQBookmarked
                        ? "text-amber-600 bg-amber-50 ring-1 ring-amber-300"
                        : "liquid-glass-pill text-slate-400 hover:text-slate-700"
                    )}
                    title={isQBookmarked ? "Remove bookmark" : "Save question"}
                  >
                    <Bookmark className={cn("w-4 h-4", isQBookmarked ? "fill-current text-amber-500" : "")} />
                  </button>
                </div>
              </div>

              {/* Edge Case Note */}
              {q.isNote && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2 font-devanagari">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{q.isNote}</p>
                </div>
              )}

              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-devanagari">
                {q.question}
              </div>

              {/* Multiple Choice Options List */}
              {q.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const isCorrect = isAnswerRevealed && opt.key === q.correctAnswerKey;
                    const isUserChoice = userSelectedOptionKey === opt.key;
                    const isUserWrong = isAnswerRevealed && isUserChoice && !isCorrect;
                    const keyDisplay = language === "en" ? `${translateKey(opt.key)} (${opt.key})` : opt.key;

                    let cardClass =
                      "border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300 text-slate-800";
                    let badgeClass = "bg-slate-100 text-slate-700";

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
                            "min-w-6 h-6 px-1 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                            badgeClass
                          )}
                        >
                          {keyDisplay}
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
                  <div className="p-2.5 px-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-emerald-950 font-devanagari flex-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {t.officialAnswer} विकल्प <strong>({language === "en" ? `${translateKey(q.correctAnswerKey)} / ${q.correctAnswerKey}` : q.correctAnswerKey}) {q.correctAnswerText || "(स्रोत बमोजिम)"}</strong>
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleSingleAnswer(q.number)}
                    className="p-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors self-start font-devanagari"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.showAnswerBtn}</span>
                  </button>
                )}

                <div className="flex items-center justify-end gap-2 shrink-0">
                  {!showAllAnswers && isAnswerRevealed && (
                    <button
                      onClick={() => toggleSingleAnswer(q.number)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-medium px-2 py-1 font-devanagari"
                    >
                      {language === "ne" ? "लुकाउनुहोस्" : "Hide"}
                    </button>
                  )}
                  <Link
                    href={`/practice?question=${q.number}`}
                    className="p-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors font-devanagari"
                  >
                    <span>{language === "ne" ? "अभ्यास गर्नुहोस्" : "Practice This"}</span>
                    <ArrowRight className="w-3 h-3 text-blue-600" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty Search Result */}
        {filteredQuestions.length === 0 && (
          <div className="p-12 liquid-glass-card rounded-2xl text-center space-y-3 font-devanagari">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {language === "ne" ? "कुनै प्रश्न भेटिएन" : "No Questions Found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              {language === "ne"
                ? `तपाईंले खोज्नुभएको "${searchQuery}" अनुसार कुनै प्रश्न फेला परेन। कृपया अर्को शब्द खोज्नुहोस् वा फिल्टर रिसेट गर्नुहोस्।`
                : `No questions match your query "${searchQuery}". Try different keywords or clear filters.`}
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
              {language === "ne" ? "फिल्टर रिसेट गर्नुहोस्" : "Reset Filters"}
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="liquid-glass-card rounded-2xl p-3.5 flex items-center justify-between gap-4 font-devanagari">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage <= 1}
            className="gap-1.5 rounded-xl text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.previousBtn}</span>
          </Button>

          <div className="text-xs font-semibold text-slate-700">
            {language === "ne" ? `पृष्ठ ${validCurrentPage} / ${totalPages}` : `Page ${validCurrentPage} of ${totalPages}`}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={validCurrentPage >= totalPages}
            className="gap-1.5 rounded-xl text-xs font-semibold"
          >
            <span>{t.nextBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
