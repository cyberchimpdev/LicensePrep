"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { UserProgress, AttemptRecord, ExamResult } from "@/types/question";
import {
  getUserProgress,
  recordAttempt as storageRecordAttempt,
  toggleBookmark as storageToggleBookmark,
  resetAllProgress as storageResetAllProgress,
} from "@/lib/storage";
import { getAllQuestions, getSections } from "@/lib/question-parser";

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    version: 1,
    attemptedQuestions: {},
    bookmarks: [],
    examHistory: [],
    lastPractice: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const reload = useCallback(() => {
    const current = getUserProgress();
    setProgress(current);
  }, []);

  useEffect(() => {
    reload();
    setIsLoaded(true);

    const handleUpdate = () => {
      reload();
    };

    window.addEventListener("licenseprep_storage_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("licenseprep_storage_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [reload]);

  const recordAttempt = useCallback(
    (questionNumber: number, answeredKey: string, isCorrect: boolean) => {
      storageRecordAttempt(questionNumber, answeredKey, isCorrect);
      reload();
    },
    [reload]
  );

  const toggleBookmark = useCallback(
    (questionNumber: number) => {
      const res = storageToggleBookmark(questionNumber);
      reload();
      return res;
    },
    [reload]
  );

  const isBookmarked = useCallback(
    (questionNumber: number) => {
      return progress.bookmarks.includes(questionNumber);
    },
    [progress.bookmarks]
  );

  const resetProgress = useCallback(() => {
    storageResetAllProgress();
    reload();
  }, [reload]);

  // Derived statistics
  const stats = useMemo(() => {
    const allQuestions = getAllQuestions();
    const totalQuestions = allQuestions.length;
    const attemptedEntries = Object.values(progress.attemptedQuestions) as AttemptRecord[];
    const attemptedCount = attemptedEntries.length;
    const correctCount = attemptedEntries.filter((a) => a.isCorrect).length;
    const incorrectCount = attemptedEntries.filter((a) => !a.isCorrect).length;
    const accuracyPercentage =
      attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const bookmarksCount = progress.bookmarks.length;
    const examsTaken = progress.examHistory.length;
    const examsPassed = progress.examHistory.filter((e: ExamResult) => e.passed).length;

    // Calculate section stats
    const sections = getSections();
    const sectionStats = sections.map((sec) => {
      const sectionQuestions = allQuestions.filter((q) => q.section === sec.name);
      let secAttempted = 0;
      let secCorrect = 0;

      sectionQuestions.forEach((q) => {
        const att = progress.attemptedQuestions[q.number];
        if (att) {
          secAttempted++;
          if (att.isCorrect) secCorrect++;
        }
      });

      const secPercentage =
        secAttempted > 0 ? Math.round((secCorrect / secAttempted) * 100) : 0;
      const completionPercentage =
        sectionQuestions.length > 0
          ? Math.round((secAttempted / sectionQuestions.length) * 100)
          : 0;

      return {
        name: sec.name,
        total: sectionQuestions.length,
        attempted: secAttempted,
        correct: secCorrect,
        percentage: secPercentage,
        completionPercentage,
      };
    });

    return {
      totalQuestions,
      attemptedCount,
      correctCount,
      incorrectCount,
      accuracyPercentage,
      bookmarksCount,
      examsTaken,
      examsPassed,
      sectionStats,
    };
  }, [progress]);

  return {
    progress,
    isLoaded,
    stats,
    recordAttempt,
    toggleBookmark,
    isBookmarked,
    resetProgress,
    reload,
  };
}

