"use client";

import React, { useState, useEffect } from "react";
import { Question } from "@/types/question";
import { Bookmark, CheckCircle, XCircle, RotateCcw, AlertCircle, HelpCircle } from "lucide-react";
import { OptionList } from "./OptionList";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { checkPracticeAnswer } from "@/lib/answer-checker";

interface QuestionCardProps {
  question: Question;
  isBookmarked: boolean;
  onToggleBookmark: (qNum: number) => void;
  onAnswerSubmitted?: (qNum: number, key: string, isCorrect: boolean) => void;
  savedAnswer?: { answeredKey: string; isCorrect: boolean };
}

export function QuestionCard({
  question,
  isBookmarked,
  onToggleBookmark,
  onAnswerSubmitted,
  savedAnswer,
}: QuestionCardProps) {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(
    savedAnswer?.answeredKey
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(Boolean(savedAnswer));
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctKey: string;
    correctText: string;
  } | null>(
    savedAnswer
      ? {
          isCorrect: savedAnswer.isCorrect,
          correctKey: question.correctAnswerKey,
          correctText: question.correctAnswerText,
        }
      : null
  );

  // Reset local state when question changes
  useEffect(() => {
    if (savedAnswer) {
      setSelectedKey(savedAnswer.answeredKey);
      setIsSubmitted(true);
      setFeedback({
        isCorrect: savedAnswer.isCorrect,
        correctKey: question.correctAnswerKey,
        correctText: question.correctAnswerText,
      });
    } else {
      setSelectedKey(undefined);
      setIsSubmitted(false);
      setFeedback(null);
    }
  }, [question.number, savedAnswer]);

  const handleSubmit = () => {
    if (!selectedKey || !question.isValidForExam) return;

    const res = checkPracticeAnswer(question, selectedKey);
    setIsSubmitted(true);
    setFeedback({
      isCorrect: res.isCorrect,
      correctKey: res.correctKey,
      correctText: res.correctText,
    });

    if (onAnswerSubmitted) {
      onAnswerSubmitted(question.number, selectedKey, res.isCorrect);
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedKey(undefined);
    setFeedback(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-7 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-navy-900 text-white font-bold text-sm tracking-wide">
            प्रश्न नं. {question.number}
          </span>
          <Badge variant="info">{question.section}</Badge>
          <span className="text-xs text-slate-400">पृष्ठ {question.sourcePage}</span>
        </div>

        <button
          onClick={() => onToggleBookmark(question.number)}
          className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-medium ${
            isBookmarked
              ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Save Question"}
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? "fill-current text-amber-500" : ""}`}
          />
          <span className="hidden sm:inline">
            {isBookmarked ? "सुरक्षित" : "सुरक्षित राख्नुहोस्"}
          </span>
        </button>
      </div>

      {/* Special Notice for Edge Questions */}
      {question.isNote && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            {question.isNote}
          </p>
        </div>
      )}

      {/* Question Text */}
      <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
        {question.question}
      </div>

      {/* Options List */}
      <OptionList
        options={question.options}
        selectedKey={selectedKey}
        onSelectOption={(key) => !isSubmitted && setSelectedKey(key)}
        isSubmitted={isSubmitted}
        correctKey={question.correctAnswerKey}
        disabled={!question.isValidForExam}
      />

      {/* Action / Feedback Section */}
      <div className="pt-2">
        {!isSubmitted ? (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500 hidden sm:inline">
              विकल्प छानेर उत्तर पुष्टि गर्न &quot;उत्तर बुझाउनुहोस्&quot; थिच्नुहोस्।
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              disabled={!selectedKey || !question.isValidForExam}
              className="ml-auto w-full sm:w-auto"
            >
              उत्तर बुझाउनुहोस् (Submit Answer)
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Feedback Alert */}
            {feedback?.isCorrect ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-900">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">बधाई छ! तपाईंको उत्तर सही छ।</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    सही उत्तर विकल्प <strong>({question.correctAnswerKey}) {question.correctAnswerText}</strong> हो।
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-900">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">गलत उत्तर!</h4>
                  <p className="text-xs text-red-800 mt-0.5">
                    सही उत्तर विकल्प <strong>({question.correctAnswerKey}) {question.correctAnswerText}</strong> हो।
                  </p>
                </div>
              </div>
            )}

            {/* Optional Explanation */}
            {question.explanation && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>थप व्याख्या:</span>
                </div>
                <p>{question.explanation}</p>
              </div>
            )}

            {/* Retry Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>पुनः प्रयास गर्नुहोस् (Retry)</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

