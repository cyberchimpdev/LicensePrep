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
    <div className="space-y-4 font-devanagari">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Continue Learning / Resume Card */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-zinc-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>अभ्यास निरन्तरता</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900">
              अभ्यास जारी राख्नुहोस्
            </h3>
            {lastPractice ? (
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                तपाईंले पछिल्लो पटक प्रश्न नं. {lastPractice.questionNumber}
                {lastPractice.section ? ` (${lastPractice.section})` : ""} अभ्यास गर्नुभएको थियो।
              </p>
            ) : (
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                अनियमित २० प्रश्नहरूको नमुना सेट वा विषयगत प्रश्नहरू अभ्यास गरी परीक्षाको तयारी मजबुत बनाउनुहोस्।
              </p>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
            <Link
              href={
                lastPractice
                  ? `/practice?question=${lastPractice.questionNumber}${
                      lastPractice.section ? `&section=${encodeURIComponent(lastPractice.section)}` : ""
                    }`
                  : "/practice"
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>{lastPractice ? "अभ्यास जारी राख्नुहोस्" : "नयाँ अभ्यास सुरु गर्नुहोस्"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setShowResetModal(true)}
              className="text-xs text-zinc-400 hover:text-rose-600 transition-colors flex items-center gap-1"
              title="सबै प्रगति रिसेट गर्नुहोस्"
            >
              <RotateCcw className="w-3 h-3" />
              <span>रिसेट</span>
            </button>
          </div>
        </div>

        {/* Recent Exam History */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-zinc-900 text-base tracking-tight flex items-center gap-1.5">
                <History className="w-4 h-4 text-blue-600" />
                <span>नमुना परीक्षाको इतिहास (Exam History)</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                तपाईंको ब्राउजरमा सुरक्षित भएका विगतका नमुना परीक्षाका नतिजाहरू।
              </p>
            </div>
            <Link
              href="/exam"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>नयाँ परीक्षा</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {examHistory.length === 0 ? (
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-zinc-700">कुनै परीक्षा दिइएको छैन</p>
              <p className="text-xs text-zinc-400 max-w-xs mt-0.5">
                यातायात व्यवस्था विभागको २० प्रश्न र ३० मिनेटको वास्तविक परीक्षा सिमुलेसन लिनुहोस्।
              </p>
              <Link
                href="/exam"
                className="mt-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                पहिलो नमुना परीक्षा सुरु गर्नुहोस्
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 overflow-y-auto max-h-52 pr-1">
              {examHistory.slice(0, 5).map((exam) => (
                <div
                  key={exam.id}
                  className="py-2.5 flex items-center justify-between gap-3 group hover:bg-zinc-50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
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
                      <p className="text-xs font-semibold text-zinc-900 truncate">
                        {exam.examTitle}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        {exam.dateStr} • {exam.totalQuestions} प्रश्नहरू • {Math.round(exam.timeSpentSeconds / 60)} मिनेट
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-zinc-900 font-sans">
                        {exam.score} / {exam.totalQuestions}
                      </span>
                      <p className="text-[10px] text-zinc-500 font-sans">{exam.percentage}%</p>
                    </div>
                    <Badge variant={exam.passed ? "success" : "danger"} size="sm">
                      {exam.passed ? "उत्तीर्ण" : "अनुत्तीर्ण"}
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
        title="सबै प्रगति विवरण रिसेट गर्ने?"
        description="यो कार्य पूर्ववत गर्न सकिँदैन। यस उपकरणमा सुरक्षित भएका सम्पूर्ण अभ्यास प्रयास, नमुना परीक्षा र बुकमार्कहरू मेटिनेछन्।"
      >
        <div className="space-y-4 pt-2 font-devanagari">
          <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800 leading-relaxed">
              <strong>चेतावनी:</strong> तपाईंले अभ्यास गर्नुभएको {Object.keys(progress.attemptedQuestions).length} प्रश्नहरू, {progress.examHistory.length} परीक्षा इतिहास र {progress.bookmarks.length} सुरक्षित प्रश्नहरू हट्नेछन्।
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetModal(false)}
              className="text-xs rounded-lg"
            >
              रद्द गर्नुहोस्
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onReset();
                setShowResetModal(false);
              }}
              className="text-xs rounded-lg"
            >
              हो, सबै रिसेट गर्नुहोस्
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
