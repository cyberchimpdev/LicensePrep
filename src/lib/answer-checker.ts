import { Question, ExamQuestion, ExamConfig, ExamResult, ExamResultSectionScore } from "@/types/question";

export interface AnswerCheckResult {
  isCorrect: boolean;
  correctKey: string;
  correctText: string;
  selectedKey?: string;
  selectedText?: string;
}

/**
 * Checks an answer submitted in practice mode
 */
export function checkPracticeAnswer(
  question: Question,
  selectedKey: string
): AnswerCheckResult {
  const isCorrect =
    Boolean(selectedKey) &&
    selectedKey.trim() === question.correctAnswerKey.trim();

  const selectedOpt = question.options.find((o) => o.key === selectedKey);

  return {
    isCorrect,
    correctKey: question.correctAnswerKey,
    correctText: question.correctAnswerText,
    selectedKey,
    selectedText: selectedOpt?.text,
  };
}

/**
 * Checks an answer submitted for an exam question
 */
export function checkExamAnswer(
  examQ: ExamQuestion,
  selectedKey?: string
): { isCorrect: boolean; isSkipped: boolean } {
  if (!selectedKey) {
    return { isCorrect: false, isSkipped: true };
  }

  const isCorrect = selectedKey === examQ.correctOptionKey;
  return { isCorrect, isSkipped: false };
}

/**
 * Calculates score and generates a full ExamResult
 */
export function gradeExam(
  questions: ExamQuestion[],
  timeSpentSeconds: number,
  config: ExamConfig
): ExamResult {
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  const sectionStats: Record<
    string,
    { total: number; correct: number; incorrect: number; skipped: number }
  > = {};

  questions.forEach((q) => {
    // initialize section stat if not present
    if (!sectionStats[q.section]) {
      sectionStats[q.section] = { total: 0, correct: 0, incorrect: 0, skipped: 0 };
    }
    sectionStats[q.section].total += 1;

    if (!q.userSelectedKey) {
      skippedCount += 1;
      sectionStats[q.section].skipped += 1;
    } else if (q.userSelectedKey === q.correctOptionKey) {
      correctCount += 1;
      sectionStats[q.section].correct += 1;
    } else {
      incorrectCount += 1;
      sectionStats[q.section].incorrect += 1;
    }
  });

  const total = questions.length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = percentage >= config.passingPercentage;

  const sectionBreakdown: ExamResultSectionScore[] = Object.entries(sectionStats).map(
    ([sectionName, stat]) => ({
      sectionName,
      total: stat.total,
      correct: stat.correct,
      incorrect: stat.incorrect,
      skipped: stat.skipped,
      percentage: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
    })
  );

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    id: `result-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    examTitle: config.title || "सवारी चालक अनुमतिपत्र नमुना परीक्षा",
    timestamp: Date.now(),
    dateStr,
    totalQuestions: total,
    correctCount,
    incorrectCount,
    skippedCount,
    score: correctCount,
    percentage,
    passed,
    passingPercentage: config.passingPercentage,
    timeSpentSeconds,
    timeLimitSeconds: config.timeLimitMinutes * 60,
    questions,
    sectionBreakdown,
  };
}

