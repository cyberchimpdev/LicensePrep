"use client";

import React, { useState } from "react";
import { Question, ExamQuestion, QuestionImage as QuestionImageType } from "@/types/question";
import { getQuestionImages, ResolvedImage } from "@/lib/image-resolver";
import { ZoomIn, X, AlertCircle, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionImageProps {
  question?:
    | Question
    | ExamQuestion
    | { images?: QuestionImageType[]; number?: number; originalNumber?: number; question?: string }
    | null;
  images?: QuestionImageType[];
  className?: string;
  size?: "sm" | "md" | "lg";
  allowZoom?: boolean;
}

export function QuestionImage({
  question,
  images: directImages,
  className,
  size = "md",
  allowZoom = true,
}: QuestionImageProps) {
  const [activeZoomImage, setActiveZoomImage] = useState<ResolvedImage | null>(null);
  const [failedImageKeys, setFailedImageKeys] = useState<Record<string, boolean>>({});
  const [useFallbackKeys, setUseFallbackKeys] = useState<Record<string, boolean>>({});

  // Resolve images either from direct images prop or question object
  const resolvedImages = directImages
    ? getQuestionImages({ images: directImages })
    : getQuestionImages(question);

  if (!resolvedImages || resolvedImages.length === 0) {
    return null;
  }

  const handleImageError = (imgKey: string, fallbackUrl: string) => {
    if (!useFallbackKeys[imgKey] && fallbackUrl) {
      // Try fallback URL
      setUseFallbackKeys((prev) => ({ ...prev, [imgKey]: true }));
    } else {
      // Both primary and fallback failed
      setFailedImageKeys((prev) => ({ ...prev, [imgKey]: true }));
    }
  };

  // Dimensions based on size
  const sizeClasses = {
    sm: "max-h-36 sm:max-h-44",
    md: "max-h-52 sm:max-h-64",
    lg: "max-h-64 sm:max-h-80",
  };

  return (
    <div className={cn("space-y-3 my-2", className)}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-3 justify-center sm:justify-start",
          resolvedImages.length > 1 && "grid grid-cols-1 sm:grid-cols-2"
        )}
      >
        {resolvedImages.map((img, idx) => {
          const imgKey = `${img.filename}-${idx}`;
          const isFailed = failedImageKeys[imgKey];
          const currentSrc = useFallbackKeys[imgKey] ? img.fallbackSrc : img.src;

          if (isFailed) {
            return (
              <div
                key={imgKey}
                className="w-full max-w-sm p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-xs flex items-center gap-2.5 font-medium"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  चित्र लोड हुन सकेन: <code className="font-mono text-[11px]">{img.filename}</code>
                </span>
              </div>
            );
          }

          return (
            <div
              key={imgKey}
              className="group relative rounded-2xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center max-w-sm sm:max-w-md w-auto"
            >
              {/* Traffic Sign / Illustration Badge */}
              <div className="w-full flex items-center justify-between pb-1.5 px-1 text-[11px] font-semibold text-slate-500 border-b border-slate-100 mb-1.5">
                <span className="inline-flex items-center gap-1 text-blue-700">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>ट्राफिक संकेत / चित्र (Traffic Sign)</span>
                </span>
                {img.sourcePage && (
                  <span className="text-slate-400 font-mono text-[10px]">
                    PDF Page {img.sourcePage}
                  </span>
                )}
              </div>

              {/* Main Image Container */}
              <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/60 p-2 min-h-[120px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentSrc}
                  alt={img.alt}
                  loading="lazy"
                  onError={() => handleImageError(imgKey, img.fallbackSrc)}
                  className={cn(
                    "w-auto h-auto object-contain transition-transform duration-200 select-none",
                    sizeClasses[size],
                    allowZoom && "cursor-zoom-in group-hover:scale-[1.02]"
                  )}
                  onClick={() => allowZoom && setActiveZoomImage(img)}
                />

                {/* Hover Zoom Hint */}
                {allowZoom && (
                  <button
                    type="button"
                    onClick={() => setActiveZoomImage(img)}
                    className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-700 shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 hover:text-blue-600 focus:opacity-100"
                    title="Click to enlarge image"
                    aria-label="Enlarge image"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Caption */}
              {img.alt && (
                <div className="w-full pt-1.5 px-1 text-center text-xs font-medium text-slate-600 font-devanagari">
                  {img.alt}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Zoom Modal */}
      {activeZoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveZoomImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl p-4 sm:p-6 max-w-3xl w-full shadow-2xl border border-white/20 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-devanagari">
                  {activeZoomImage.alt}
                </h3>
              </div>
              <button
                onClick={() => setActiveZoomImage(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close zoomed view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center bg-slate-50 rounded-2xl p-4 sm:p-8 min-h-[280px] max-h-[70vh] overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeZoomImage.src}
                alt={activeZoomImage.alt}
                className="max-h-[60vh] max-w-full object-contain drop-shadow-md"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>{activeZoomImage.filename}</span>
              <button
                type="button"
                onClick={() => setActiveZoomImage(null)}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors text-xs"
              >
                Close (बन्द गर्नुहोस्)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
