import { ExamConfig, ExamQuestion, ExamOptionItem, Question } from "@/types/question";
import { getValidExamQuestions } from "./question-parser";
import { shuffleArray } from "./utils";

export const DEFAULT_EXAM_CONFIGS: ExamConfig[] = [
  {
    id: "standard",
    title: "आधिकारिक स्तर नमुना परीक्षा (Standard Official)",
    questionCount: 20,
    timeLimitMinutes: 30,
    passingPercentage: 50,
    randomizeQuestions: true,
    randomizeOptions: true,
  },
  {
    id: "quick",
    title: "द्रुत नमुना परीक्षा (Quick Sprint)",
    questionCount: 10,
    timeLimitMinutes: 12,
    passingPercentage: 60,
    randomizeQuestions: true,
    randomizeOptions: true,
  },
  {
    id: "comprehensive",
    title: "विस्तृत नमुना परीक्षा (Comprehensive Practice)",
    questionCount: 50,
    timeLimitMinutes: 60,
    passingPercentage: 60,
    randomizeQuestions: true,
    randomizeOptions: true,
  },
];

const STANDARD_DEV_KEYS = ["क", "ख", "ग", "घ", "ङ", "च"];

/**
 * Creates a randomized set of exam questions based on configuration
 */
export function createExamSession(config: ExamConfig): ExamQuestion[] {
  let pool = getValidExamQuestions();

  if (config.selectedSections && config.selectedSections.length > 0) {
    const sectionSet = new Set(config.selectedSections);
    pool = pool.filter((q) => sectionSet.has(q.section));
  }

  // Shuffle pool if requested
  const selectedPool = config.randomizeQuestions ? shuffleArray(pool) : [...pool];

  // Restrict to max available questions
  const totalToPick = Math.min(config.questionCount, selectedPool.length);
  const pickedQuestions = selectedPool.slice(0, totalToPick);

  return pickedQuestions.map((q, idx) => {
    return prepareExamQuestion(q, config.randomizeOptions, idx + 1);
  });
}

/**
 * Transforms a Question into an ExamQuestion, handling option randomization if enabled
 */
export function prepareExamQuestion(
  q: Question,
  randomizeOptions: boolean,
  orderNumber?: number
): ExamQuestion {
  let finalOptions: ExamOptionItem[];
  let correctKey: string;

  if (randomizeOptions && q.options.length > 1) {
    // Shuffle the options array
    const shuffledOpts = shuffleArray(q.options);
    
    // Assign standard keys (क, ख, ग, घ...) sequentially to the shuffled options
    finalOptions = shuffledOpts.map((opt, i) => {
      const assignedKey = STANDARD_DEV_KEYS[i] || opt.key;
      return {
        key: assignedKey,
        text: opt.text,
        originalKey: opt.key,
      };
    });

    // Locate which option holds the original correct key
    const matchingOption = finalOptions.find((o) => o.originalKey === q.correctAnswerKey);
    correctKey = matchingOption ? matchingOption.key : q.correctAnswerKey;
  } else {
    // Keep original keys and order
    finalOptions = q.options.map((opt) => ({
      key: opt.key,
      text: opt.text,
      originalKey: opt.key,
    }));
    correctKey = q.correctAnswerKey;
  }

  return {
    id: `exam-q-${orderNumber ?? q.number}`,
    originalNumber: q.number,
    section: q.section,
    question: q.question,
    options: finalOptions,
    correctOptionKey: correctKey,
    correctAnswerText: q.correctAnswerText,
    userSelectedKey: undefined,
    isFlagged: false,
    sourcePage: q.sourcePage,
    explanation: q.explanation,
  };
}

