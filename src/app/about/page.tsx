import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ShieldCheck, BookOpen, Layers, Award, CheckCircle2, Lock, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <PageContainer size="narrow" className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-10 space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              About LicensePrep
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Nepal Driving License Written Examination Preparation Platform (वर्ग ‘क’ र ‘ट’)
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Platform Objective</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>LicensePrep</strong> is an open educational preparation resource designed to help Nepali driving license candidates thoroughly prepare for their written examination.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          The written exam for Category A (Motorcycle) and Category K (Scooter / Moped) administered by the Department of Transport Management (DOTM / यातायात व्यवस्था विभाग) draws its questions from a fixed syllabus of <strong>500 official objective questions</strong>.
        </p>
      </div>

      {/* Syllabus Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-5">
        <h2 className="text-lg font-bold text-slate-900">
          Official Examination Syllabus & Question Distribution
        </h2>
        <div className="divide-y divide-slate-100 text-sm">
          <div className="py-3 flex items-center justify-between">
            <span className="font-medium text-slate-800">१. सवारी सञ्चालन सम्बन्धी ज्ञान</span>
            <span className="font-bold text-slate-900">१३० प्रश्नहरू (१ - १३०)</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="font-medium text-slate-800">२. सवारी ऐन नियमसम्बन्धी ज्ञान</span>
            <span className="font-bold text-slate-900">९० प्रश्नहरू (१३१ - २२०)</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="font-medium text-slate-800">३. सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान</span>
            <span className="font-bold text-slate-900">८० प्रश्नहरू (२२१ - ३००)</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="font-medium text-slate-800">४. वातावरण प्रदूषण सम्बन्धी अवधारणात्मक ज्ञान</span>
            <span className="font-bold text-slate-900">३० प्रश्नहरू (३०१ - ३३०)</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="font-medium text-slate-800">५. दुर्घटना सचेतना सम्बन्धी ज्ञान</span>
            <span className="font-bold text-slate-900">६० प्रश्नहरू (३३१ - ३९०)</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="font-medium text-slate-800">६. ट्राफिक सङ्केत सम्बन्धी ज्ञान</span>
            <span className="font-bold text-slate-900">११० प्रश्नहरू (३९१ - ५००)</span>
          </div>
          <div className="pt-3 flex items-center justify-between font-bold text-navy-900 text-base">
            <span>जम्मा वस्तुगत प्रश्नहरू</span>
            <span>५०० प्रश्नहरू</span>
          </div>
        </div>
      </div>

      {/* Examination Structure */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Examination Format & Pass Rules</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Objective Questions:</strong> Each question features 4 multiple-choice options (क, ख, ग, घ).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Passing Mark:</strong> 50% to 60% depending on the specific DOTM examination batch (e.g. 10 or 12 marks out of 20).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>No Negative Marking:</strong> There is no penalty for incorrect answers. You should attempt every question.</span>
          </li>
        </ul>
      </div>

      {/* Privacy Guarantee */}
      <div className="bg-blue-50/60 rounded-3xl border border-blue-200/80 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-blue-900 font-bold">
          <Lock className="w-5 h-5 text-blue-600" />
          <span>Local Storage & Privacy</span>
        </div>
        <p className="text-xs text-blue-950/80 leading-relaxed">
          LicensePrep operates completely client-side. Your practice history, bookmarks, and mock exam scores are saved exclusively in your browser&apos;s localStorage. We do not transmit or store any personal data on external servers.
        </p>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-4">
        <Link href="/practice">
          <Button variant="primary" size="lg" className="px-8 bg-navy-900 hover:bg-navy-800">
            Start Preparing Now
          </Button>
        </Link>
      </div>
    </PageContainer>
  );
}

