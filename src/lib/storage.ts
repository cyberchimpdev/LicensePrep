import { UserProgress, AttemptRecord, ExamResult } from "@/types/question";

const STORAGE_KEY = "licenseprep_progress_v1";
const ACTIVE_EXAM_KEY = "licenseprep_active_exam_v1";
const LATEST_RESULT_KEY = "licenseprep_latest_result_v1";

const DEFAULT_PROGRESS: UserProgress = {
  version: 1,
  attemptedQuestions: {},
  bookmarks: [],
  examHistory: [],
  lastPractice: null,
};

function isClient(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function notifyUpdate() {
  if (isClient()) {
    window.dispatchEvent(new Event("licenseprep_storage_update"));
  }
}

export function getUserProgress(): UserProgress {
  if (!isClient()) return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_PROGRESS;

    // Check version and safely migrate if needed
    if (parsed.version === 1) {
      return {
        version: 1,
        attemptedQuestions: parsed.attemptedQuestions || {},
        bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
        examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
        lastPractice: parsed.lastPractice || null,
      };
    }

    return DEFAULT_PROGRESS;
  } catch (err) {
    console.error("Error reading LicensePrep progress:", err);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    notifyUpdate();
  } catch (err) {
    console.error("Error saving LicensePrep progress:", err);
  }
}

export function recordAttempt(
  questionNumber: number,
  answeredKey: string,
  isCorrect: boolean
): void {
  const current = getUserProgress();
  const newAttempt: AttemptRecord = {
    questionNumber,
    answeredKey,
    isCorrect,
    timestamp: Date.now(),
  };

  current.attemptedQuestions[questionNumber] = newAttempt;
  saveUserProgress(current);
}

export function isBookmarked(questionNumber: number): boolean {
  const progress = getUserProgress();
  return progress.bookmarks.includes(questionNumber);
}

export function toggleBookmark(questionNumber: number): boolean {
  const current = getUserProgress();
  const set = new Set(current.bookmarks);
  let nowBookmarked = false;

  if (set.has(questionNumber)) {
    set.delete(questionNumber);
    nowBookmarked = false;
  } else {
    set.add(questionNumber);
    nowBookmarked = true;
  }

  current.bookmarks = Array.from(set);
  saveUserProgress(current);
  return nowBookmarked;
}

export function getBookmarks(): number[] {
  return getUserProgress().bookmarks;
}

export function saveExamResult(result: ExamResult): void {
  const current = getUserProgress();
  // Keep last 50 exams
  current.examHistory = [result, ...(current.examHistory || [])].slice(0, 50);
  saveUserProgress(current);

  // Also cache as latest exam result for results page display
  if (isClient()) {
    try {
      localStorage.setItem(LATEST_RESULT_KEY, JSON.stringify(result));
    } catch (e) {
      console.error(e);
    }
  }
}

export function getLatestExamResult(): ExamResult | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(LATEST_RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ExamResult;
  } catch {
    return null;
  }
}

export function setLatestExamResult(result: ExamResult): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(LATEST_RESULT_KEY, JSON.stringify(result));
  } catch (e) {
    console.error(e);
  }
}

export function saveActiveExam(data: unknown): void {
  if (!isClient()) return;
  try {
    if (!data) {
      localStorage.removeItem(ACTIVE_EXAM_KEY);
    } else {
      localStorage.setItem(ACTIVE_EXAM_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error("Error saving active exam:", e);
  }
}

export function getActiveExam<T>(): T | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(ACTIVE_EXAM_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearActiveExam(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(ACTIVE_EXAM_KEY);
  } catch (e) {
    console.error(e);
  }
}

export function saveLastPractice(
  lastPractice: UserProgress["lastPractice"]
): void {
  const current = getUserProgress();
  current.lastPractice = lastPractice;
  saveUserProgress(current);
}

export function resetAllProgress(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_EXAM_KEY);
    localStorage.removeItem(LATEST_RESULT_KEY);
    notifyUpdate();
  } catch (err) {
    console.error("Error resetting progress:", err);
  }
}

