export interface RawOption {
  key: string;
  text: string | null;
}

export interface RawAnswer {
  key: string;
  text: string | null;
}

export interface RawSection {
  name: string;
  question_range: {
    from: number;
    to: number;
  };
  count: number;
}

export interface QuestionImage {
  src: string; // e.g. "images/question-416-image-1.png"
  alt: string; // e.g. "प्रश्न 416 को चित्र"
  source_page?: number;
}

export interface RawQuestion {
  number: number;
  section: string;
  question: string;
  options: RawOption[];
  correct_answer: RawAnswer;
  source_page: number;
  explanation?: string;
  images?: QuestionImage[];
}

export interface RawDataset {
  title: string;
  language: string;
  total_questions: number;
  source_file: string;
  notes: string[];
  sections: RawSection[];
  questions: RawQuestion[];
}

export interface OptionItem {
  key: string; // e.g. "क", "ख", "ग", "घ" or "A", "B", "C", "D"
  text: string;
}

export interface Question {
  id: string; // "q-1"
  number: number; // 1 to 500
  section: string;
  question: string;
  options: OptionItem[];
  correctAnswerKey: string;
  correctAnswerText: string;
  sourcePage: number;
  isValidForExam: boolean; // false for edge cases like Q290
  explanation?: string;
  isNote?: string;
  images?: QuestionImage[];
}

export interface ExamConfig {
  id?: string;
  title?: string;
  questionCount: number;
  timeLimitMinutes: number;
  passingPercentage: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  selectedSections?: string[];
}

export interface ExamOptionItem extends OptionItem {
  originalKey: string; // maps back to the dataset option key
}

export interface ExamQuestion {
  id: string;
  originalNumber: number;
  section: string;
  question: string;
  options: ExamOptionItem[];
  correctOptionKey: string; // the option key that is correct in current question representation
  correctAnswerText: string;
  userSelectedKey?: string;
  isFlagged: boolean;
  sourcePage: number;
  explanation?: string;
  images?: QuestionImage[];
}

export interface ExamResultSectionScore {
  sectionName: string;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  percentage: number;
}

export interface ExamResult {
  id: string;
  examTitle: string;
  timestamp: number;
  dateStr: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  passingPercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  timeLimitSeconds?: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  questions: ExamQuestion[];
  sectionBreakdown: ExamResultSectionScore[];
}

export interface AttemptRecord {
  questionNumber?: number;
  answeredKey: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface UserProgressData {
  version: number;
  bookmarks: number[]; // question numbers
  attemptedQuestions: Record<number, AttemptRecord>;
  examHistory: ExamResult[];
  lastPractice?: {
    questionNumber: number;
    section: string | null;
    mode?: "sequential" | "random";
    timestamp: number;
  } | null;
  lastPracticeSession?: {
    questionNumber: number;
    section: string | null;
    mode: "sequential" | "random";
    timestamp: number;
  };
}

export type UserProgress = UserProgressData;
