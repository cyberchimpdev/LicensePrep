"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertTriangle, Flag, HelpCircle } from "lucide-react";

interface ExamSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  flaggedCount: number;
  isTimeExpired?: boolean;
}

export function ExamSummaryModal({
  isOpen,
  onClose,
  onConfirmSubmit,
  totalQuestions,
  answeredCount,
  unansweredCount,
  flaggedCount,
  isTimeExpired = false,
}: ExamSummaryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={isTimeExpired ? () => {} : onClose}
      title={isTimeExpired ? "Time's Up!" : "Submit Examination?"}
      description={
        isTimeExpired
          ? "Your examination time has expired. Your answers will now be evaluated."
          : "Please review your progress before final evaluation."
      }
    >
      <div className="space-y-4 pt-2">
        {/* Breakdown Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-emerald-950">{answeredCount}</div>
            <div className="text-[11px] text-emerald-700 font-medium">Answered</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <HelpCircle className="w-5 h-5 text-slate-500 mx-auto mb-1" />
            <div className="text-xl font-bold text-slate-800">{unansweredCount}</div>
            <div className="text-[11px] text-slate-600 font-medium">Unanswered</div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-center">
            <Flag className="w-5 h-5 text-amber-500 mx-auto mb-1 fill-current" />
            <div className="text-xl font-bold text-amber-950">{flaggedCount}</div>
            <div className="text-[11px] text-amber-700 font-medium">Flagged</div>
          </div>
        </div>

        {/* Warning if unanswered */}
        {unansweredCount > 0 && !isTimeExpired && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              You have <strong>{unansweredCount} unanswered questions</strong>. Unanswered questions will receive 0 marks.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3">
          {!isTimeExpired && (
            <Button variant="outline" size="md" onClick={onClose}>
              Back to Questions
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={onConfirmSubmit}
            className="bg-navy-900 hover:bg-navy-800 text-white w-full sm:w-auto"
          >
            {isTimeExpired ? "View Results" : "Yes, Submit Exam"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

