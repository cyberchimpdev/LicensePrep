"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserProgress } from "@/types/question";
import { Award, Clock, ArrowRight, RotateCcw, AlertTriangle, CheckCircle, XCircle, Play, History } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { setLatestExamResult } from "@/lib/storage";
import { useRouter } from "next/navigation";

interface RecentActivityProps {
  progress: UserProgress;
  onReset: () => void;
}

export function RecentActivity({ progress, onReset }: RecentActivityProps) {
  const router = useRouter();
  const [showResetModal, setShowResetModal] = useState(false);
  const examHistory = progress.examHistory || [];
  const lastPractice = progress.lastPractice;

  const handleReviewExam = (result: typeof examHistory[0]) => {
    setLatestExamResult(result);
    router.push("/results");
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Continue Learning / Resume Card */}
        <div className="lg:col-span-1 liquid-glass-card p-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Resume Learning</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
              Continue Practicing
            </h3>
            {lastPractice ? (
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-devanagari">
                You were practicing Question #{lastPractice.questionNumber}
                {lastPractice.section ? ` in “${lastPractice.section}”` : ""}.
              </p>
            ) : (
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Take a randomized 20-question practice set or choose a topic to begin mastering the syllabus.
              </p>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
            <Link
              href={
                lastPractice
                  ? `/practice?question=${lastPractice.questionNumber}${
                      lastPractice.section ? `&section=${encodeURIComponent(lastPractice.section)}` : ""
                    }`
                  : "/practice"
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>{lastPractice ? "Resume Practice" : "Start Practice Set"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setShowResetModal(true)}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
              title="Reset local progress data"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Recent Exam History */}
        <div className="lg:col-span-2 liquid-glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-1.5">
                <History className="w-4 h-4 text-blue-600" />
                <span>Mock Examination History</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Past examination attempts and scores stored on your device.
              </p>
            </div>
            <Link
              href="/exam"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>New Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {examHistory.length === 0 ? (
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-700">No mock exams taken yet</p>
              <p className="text-xs text-slate-400 max-w-xs mt-0.5">
                Take a 20-question, 30-minute timed CBT mock test simulating the official Nepal DOTM written examination.
              </p>
              <Link
                href="/exam"
                className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Start First Mock Exam
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-y-auto max-h-52 pr-1">
              {examHistory.slice(0, 5).map((exam) => (
                <div
                  key={exam.id}
                  className="py-2.5 flex items-center justify-between gap-3 group hover:bg-slate-50/70 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
                  onClick={() => handleReviewExam(exam)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="shrink-0">
                      {exam.passed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {exam.examTitle}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {exam.dateStr} • {exam.totalQuestions} Questions • {Math.round(exam.timeSpentSeconds / 60)} mins
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 font-sans">
                        {exam.score} / {exam.totalQuestions}
                      </span>
                      <p className="text-[10px] text-slate-500 font-sans">{exam.percentage}%</p>
                    </div>
                    <Badge variant={exam.passed ? "success" : "danger"} size="sm">
                      {exam.passed ? "PASSED" : "FAILED"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset All Progress Data?"
        description="This action cannot be undone. All your practice attempts, mock exam history, and bookmarks stored in this browser will be cleared."
      >
        <div className="space-y-4 pt-2">
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800 leading-relaxed">
              <strong>Warning:</strong> You will lose {Object.keys(progress.attemptedQuestions).length} practiced answers, {progress.examHistory.length} exam records, and {progress.bookmarks.length} saved bookmarks.
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetModal(false)}
              className="text-xs rounded-xl"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onReset();
                setShowResetModal(false);
              }}
              className="text-xs rounded-xl"
            >
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
