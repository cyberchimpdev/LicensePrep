"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ExamResult } from "@/types/question";
import { getLatestExamResult } from "@/lib/storage";
import { ResultSummaryCard } from "@/components/results/ResultSummaryCard";
import { SectionBreakdownList } from "@/components/results/SectionBreakdownList";
import { QuestionReviewCard } from "@/components/results/QuestionReviewCard";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Button } from "@/components/ui/Button";
import { Award, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "incorrect" | "correct" | "skipped"
  >("all");

  const { isBookmarked, toggleBookmark } = useUserProgress();

  useEffect(() => {
    const latest = getLatestExamResult();
    if (latest) {
      setResult(latest);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <PageContainer size="default" className="py-20 text-center text-slate-500">
        Loading examination results...
      </PageContainer>
    );
  }

  if (!result) {
    return (
      <PageContainer size="narrow" className="py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          No Examination Result Found
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Complete a timed mock examination to view your comprehensive score, pass/fail status, and question-by-question review.
        </p>
        <div className="pt-2">
          <Link href="/exam">
            <Button variant="primary" size="md">
              Take Mock Examination
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  // Filter questions for review
  const filteredQuestions = result.questions.filter((q) => {
    const isAnswered = Boolean(q.userSelectedKey);
    const isCorrect = isAnswered && q.userSelectedKey === q.correctOptionKey;
    const isSkipped = !isAnswered;

    if (activeFilter === "incorrect") return isAnswered && !isCorrect;
    if (activeFilter === "correct") return isCorrect;
    if (activeFilter === "skipped") return isSkipped;
    return true;
  });

  return (
    <PageContainer size="wide" className="space-y-8">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="text-xs text-slate-400">Exam Taken: {result.dateStr}</span>
      </div>

      {/* Main Score & Banner Card */}
      <ResultSummaryCard
        result={result}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onRetry={() => router.push("/exam")}
      />

      {/* Subject / Category Performance Breakdown */}
      <SectionBreakdownList sections={result.sectionBreakdown} />

      {/* Question by Question Review Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Question-by-Question Review (विस्तृत प्रश्न समीक्षा)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredQuestions.length} of {result.totalQuestions} questions
              {activeFilter !== "all" ? ` (Filter: ${activeFilter})` : ""}.
            </p>
          </div>
        </div>

        {/* List of reviewed questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => (
            <QuestionReviewCard
              key={q.id}
              question={q}
              index={idx}
              isBookmarked={isBookmarked(q.originalNumber)}
              onToggleBookmark={toggleBookmark}
            />
          ))}

          {filteredQuestions.length === 0 && (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
              No questions found for the &quot;{activeFilter}&quot; filter.
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

