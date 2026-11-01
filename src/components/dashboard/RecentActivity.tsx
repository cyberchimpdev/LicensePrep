"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserProgress } from "@/types/question";
import { Award, Clock, ArrowRight, RotateCcw, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning / Resume Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-navy-900 to-slate-900 rounded-2xl p-6 text-white shadow-card flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium mb-3 backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span>Resume Session</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Continue Practicing
            </h3>
            {lastPractice ? (
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                You were practicing Question #{lastPractice.questionNumber}
                {lastPractice.section ? ` in “${lastPractice.section}”` : ""}.
              </p>
            ) : (
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Start from Question #1 or practice by category. Master all 500 questions at your own pace.
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <Link
              href={
                lastPractice
                  ? `/practice?question=${lastPractice.questionNumber}${
                      lastPractice.section ? `&section=${encodeURIComponent(lastPractice.section)}` : ""
                    }`
                  : "/practice"
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <span>{lastPractice ? "Resume Practice" : "Start Practicing"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setShowResetModal(true)}
              className="text-xs text-slate-400 hover:text-red-300 transition-colors flex items-center gap-1"
              title="Reset all local progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Recent Exam History */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg tracking-tight">
                Mock Exam History
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
            <div className="py-10 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">No mock exams taken yet</p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Take a 20-question timed mock examination to simulate the actual Nepal DOTM written test.
              </p>
              <Link
                href="/exam"
                className="mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Start First Mock Exam
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-y-auto max-h-56 pr-1">
              {examHistory.slice(0, 5).map((exam) => (
                <div
                  key={exam.id}
                  className="py-3 flex items-center justify-between gap-4 group hover:bg-slate-50/70 rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
                  onClick={() => handleReviewExam(exam)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">
                      {exam.passed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {exam.examTitle}
                      </p>
                      <p className="text-xs text-slate-400">
                        {exam.dateStr} • {exam.totalQuestions} Questions • {Math.round(exam.timeSpentSeconds / 60)} min
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900">
                        {exam.score} / {exam.totalQuestions}
                      </span>
                      <p className="text-[11px] text-slate-500">{exam.percentage}%</p>
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
        title="Reset All Progress?"
        description="This action cannot be undone. All your practice attempts, mock exam history, and bookmarks stored in this browser will be cleared."
      >
        <div className="space-y-4 pt-2">
          <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800 leading-relaxed">
              <strong>Warning:</strong> You will lose {Object.keys(progress.attemptedQuestions).length} practiced answers, {progress.examHistory.length} exam records, and {progress.bookmarks.length} bookmarks.
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetModal(false)}
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
            >
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

