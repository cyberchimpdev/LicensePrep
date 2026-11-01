import { Question, ExamQuestion, QuestionImage } from "@/types/question";

export interface ResolvedImage {
  src: string; // Primary browser path e.g. "/questions/images/question-416-image-1.png"
  fallbackSrc: string; // Fallback path e.g. "/images/question-416-image-1.png"
  alt: string;
  sourcePage?: number;
  filename: string;
}

/**
 * Resolves a raw image source string (e.g. "images/question-416-image-1.png")
 * to browser-accessible public URLs.
 */
export function resolveQuestionImageUrl(rawSrc: string): {
  primary: string;
  fallback: string;
  filename: string;
} {
  if (!rawSrc || typeof rawSrc !== "string") {
    return { primary: "", fallback: "", filename: "" };
  }

  // Extract pure filename
  const filename = rawSrc.replace(/^.*[\\\/]/, "").trim();
  if (!filename) {
    return { primary: "", fallback: "", filename: "" };
  }

  return {
    primary: `/questions/images/${filename}`,
    fallback: `/images/${filename}`,
    filename,
  };
}

/**
 * Centralized extractor that retrieves all valid resolved images for a given question.
 * Supports Question, ExamQuestion, or any object with an `images` array.
 */
export function getQuestionImages(
  question?:
    | Question
    | ExamQuestion
    | { images?: QuestionImage[]; number?: number; originalNumber?: number; question?: string }
    | null
): ResolvedImage[] {
  if (!question || !question.images || !Array.isArray(question.images) || question.images.length === 0) {
    return [];
  }

  const qNum =
    "number" in question && typeof question.number === "number"
      ? question.number
      : "originalNumber" in question && typeof question.originalNumber === "number"
      ? question.originalNumber
      : undefined;

  return question.images
    .filter((img): img is QuestionImage => Boolean(img && img.src && typeof img.src === "string"))
    .map((img) => {
      const { primary, fallback, filename } = resolveQuestionImageUrl(img.src);
      return {
        src: primary,
        fallbackSrc: fallback,
        alt: img.alt || (qNum ? `प्रश्न ${qNum} को चित्र (ट्राफिक संकेत)` : "सवारी चालक लिखित परीक्षा प्रश्नको चित्र"),
        sourcePage: img.source_page,
        filename,
      };
    });
}
