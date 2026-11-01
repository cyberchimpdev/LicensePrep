import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format seconds into mm:ss format
 */
export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Convert English digits to Devanagari numerals
 */
export const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toDevanagariNumber(num: number | string): string {
  return num
    .toString()
    .replace(/[0-9]/g, (match) => devanagariDigits[parseInt(match, 10)]);
}

/**
 * Normalize search strings for fuzzy / flexible searching in Nepali and English
 * Replaces variants of characters, strips extra diacritics where helpful, lowercases Latin text.
 */
export function normalizeSearchString(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, ""); // strip zero-width characters
}

/**
 * Check if text matches query using case-insensitive and normalized substring matching
 */
export function matchesQuery(text: string, query: string): boolean {
  if (!query) return true;
  const normalizedText = normalizeSearchString(text);
  const normalizedQuery = normalizeSearchString(query);
  return normalizedText.includes(normalizedQuery);
}

/**
 * Shuffles an array with Fisher-Yates algorithm, returning a new copy
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

