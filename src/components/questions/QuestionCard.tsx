"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Question } from "@/types/question";
import { Bookmark, CheckCircle2, XCircle, RotateCcw, AlertCircle, HelpCircle, CornerDownLeft } from "lucide-react";
import { OptionList } from "./OptionList";
import { QuestionImage } from "./QuestionImage";
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

  // Sync state when question changes
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

  const handleSubmit = useCallback(() => {
    if (!selectedKey || !question.isValidForExam || isSubmitted) return;

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
  }, [selectedKey, question, isSubmitted, onAnswerSubmitted]);

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedKey(undefined);
    setFeedback(null);
  };

  // Keyboard navigation inside QuestionCard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!isSubmitted) {
        const keyMap: Record<string, number> = {
          "1": 0, "2": 1, "3": 2, "4": 3,
          "a": 0, "b": 1, "c": 2, "d": 3,
          "A": 0, "B": 1, "C": 2, "D": 3,
        };

        if (e.key in keyMap) {
          const optIndex = keyMap[e.key];
          if (question.options[optIndex]) {
            setSelectedKey(question.options[optIndex].key);
          }
        } else if (e.key === "Enter" && selectedKey) {
          handleSubmit();
        }
      } else if (e.key === "r" || e.key === "R") {
        handleRetry();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitted, selectedKey, question.options, handleSubmit]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 space-y-5 shadow-sm">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wide">
            Question #{question.number}
          </span>
          <Badge variant="info">{question.section}</Badge>
          <span className="text-[11px] text-slate-400 font-medium">
            Page {question.sourcePage}
          </span>
        </div>

        <button
          onClick={() => onToggleBookmark(question.number)}
          className={`p-1.5 px-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold ${
            isBookmarked
              ? "bg-amber-50 text-amber-700 hover:bg-amber-100 ring-1 ring-amber-300"
              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Save Question"}
        >
          <Bookmark
            className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current text-amber-500" : ""}`}
          />
          <span className="hidden sm:inline">
            {isBookmarked ? "Saved" : "Save"}
          </span>
        </button>
      </div>

      {/* Special Notice for Edge Questions */}
      {question.isNote && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 font-devanagari">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-950 leading-relaxed font-medium">
            {question.isNote}
          </p>
        </div>
      )}

      {/* Question Text (Authentic DOTM Nepali) */}
      <div className="text-lg sm:text-2xl font-bold text-slate-900 leading-relaxed font-devanagari">
        {question.question}
      </div>

      {/* Associated Question Image (Traffic Signs, Markings, Road Diagrams) */}
      <QuestionImage question={question} size="md" />

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
      <div className="pt-2 border-t border-slate-100">
        {!isSubmitted ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1">
              <span>Tip: Press 1, 2, 3, 4 on your keyboard to select an option.</span>
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              disabled={!selectedKey || !question.isValidForExam}
              className="w-full sm:w-auto px-6 font-semibold rounded-xl gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <span>Submit Answer</span>
              <CornerDownLeft className="w-4 h-4 hidden sm:inline opacity-70" />
            </Button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* Feedback Alert */}
            {feedback?.isCorrect ? (
              <div className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-950 font-devanagari">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm sm:text-base font-sans">Correct Answer!</h4>
                  <p className="text-xs sm:text-sm text-emerald-900 mt-0.5 font-devanagari">
                    सही उत्तर विकल्प: <strong>({question.correctAnswerKey}) {question.correctAnswerText}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 sm:p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-950 font-devanagari">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm sm:text-base font-sans">Incorrect Answer</h4>
                  <p className="text-xs sm:text-sm text-rose-900 mt-0.5 font-devanagari">
                    सही उत्तर विकल्प: <strong>({question.correctAnswerKey}) {question.correctAnswerText}</strong> हो।
                  </p>
                </div>
              </div>
            )}

            {/* Optional Explanation */}
            {question.explanation && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs sm:text-sm space-y-1 font-devanagari">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 font-sans">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Explanation:</span>
                </div>
                <p className="leading-relaxed">{question.explanation}</p>
              </div>
            )}

            {/* Retry Button */}
            <div className="flex justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="gap-1.5 rounded-xl text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again (Retry)</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
