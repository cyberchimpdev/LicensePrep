import rawData from "@/data/questions.json";
import {
  RawDataset,
  RawQuestion,
  Question,
  OptionItem,
} from "@/types/question";
import { matchesQuery } from "./utils";

const dataset = rawData as unknown as RawDataset;

/**
 * Clean and normalize option text safely
 */
function sanitizeText(val: unknown): string {
  if (typeof val === "string") return val.trim();
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

/**
 * Parse a raw question into a standardized Question object
 */
export function parseQuestion(raw: RawQuestion): Question {
  const options: OptionItem[] = Array.isArray(raw.options)
    ? raw.options
        .filter((opt) => opt && (opt.key || opt.text))
        .map((opt) => ({
          key: sanitizeText(opt.key),
          text: sanitizeText(opt.text),
        }))
    : [];

  const correctKey = sanitizeText(raw.correct_answer?.key);
  const correctText = sanitizeText(raw.correct_answer?.text);

  // A question is valid for mock examination and interactive testing if it has at least 2 options and a designated correct key
  const isValidForExam = options.length >= 2 && Boolean(correctKey);

  let isNote: string | undefined = undefined;
  if (options.length === 0) {
    isNote = "यस प्रश्नका उत्तर विकल्पहरू मूल स्रोत सामग्रीमा समावेश नगरिएको हुनाले यसलाई परीक्षामा समावेश गरिएको छैन।";
  }

  return {
    id: `q-${raw.number}`,
    number: raw.number,
    section: sanitizeText(raw.section) || "सामान्य ज्ञान",
    question: sanitizeText(raw.question),
    options,
    correctAnswerKey: correctKey,
    correctAnswerText: correctText,
    sourcePage: raw.source_page || 1,
    isValidForExam,
    isNote,
    explanation: raw.explanation ? sanitizeText(raw.explanation) : undefined,
    images: Array.isArray(raw.images) ? raw.images : [],
  };
}

let cachedQuestions: Question[] | null = null;

export function getAllQuestions(): Question[] {
  if (cachedQuestions) return cachedQuestions;
  if (!dataset || !Array.isArray(dataset.questions)) {
    return [];
  }
  cachedQuestions = dataset.questions.map(parseQuestion);
  return cachedQuestions;
}

export function getValidExamQuestions(): Question[] {
  return getAllQuestions().filter((q) => q.isValidForExam);
}

export function getQuestionByNumber(num: number): Question | undefined {
  return getAllQuestions().find((q) => q.number === num);
}

export function getQuestionsBySection(sectionName: string): Question[] {
  return getAllQuestions().filter((q) => q.section === sectionName);
}

export function getSections(): { name: string; count: number; questionRange: { from: number; to: number } }[] {
  if (dataset.sections && Array.isArray(dataset.sections)) {
    return dataset.sections.map((s) => ({
      name: s.name,
      count: s.count,
      questionRange: s.question_range,
    }));
  }
  // Fallback: derive dynamically from questions
  const sectionMap = new Map<string, number>();
  getAllQuestions().forEach((q) => {
    sectionMap.set(q.section, (sectionMap.get(q.section) || 0) + 1);
  });
  return Array.from(sectionMap.entries()).map(([name, count]) => ({
    name,
    count,
    questionRange: { from: 1, to: count },
  }));
}

/**
 * Filter questions by query string and options
 */
export function searchQuestions(
  query: string,
  filter?: {
    section?: string;
    validExamOnly?: boolean;
    hasImageOnly?: boolean;
  }
): Question[] {
  let list = getAllQuestions();

  if (filter?.section && filter.section !== "all") {
    list = list.filter((q) => q.section === filter.section);
  }

  if (filter?.validExamOnly) {
    list = list.filter((q) => q.isValidForExam);
  }

  if (filter?.hasImageOnly) {
    list = list.filter((q) => q.images && q.images.length > 0);
  }

  const q = query.trim();
  if (!q) return list;

  return list.filter((question) => {
    // Check question number if query is numeric
    if (!isNaN(Number(q)) && question.number === Number(q)) {
      return true;
    }

    // Check question text
    if (matchesQuery(question.question, q)) return true;

    // Check options
    for (const opt of question.options) {
      if (matchesQuery(opt.text, q)) return true;
    }

    // Check section name
    if (matchesQuery(question.section, q)) return true;

    // Check explanation if present
    if (question.explanation && matchesQuery(question.explanation, q)) {
      return true;
    }

    return false;
  });
}
