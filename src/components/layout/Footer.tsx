import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight font-sans">
                License<span className="text-blue-600">Prep</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Your companion for preparing for the Nepal driving license written examination.
            </p>
            <p className="text-xs text-slate-400">
              Preserving official Nepal Department of Transport Management (DOTM) Category A (Motorcycle) & K (Scooter) examination questions verbatim.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/practice"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Practice
                </Link>
              </li>
              <li>
                <Link
                  href="/exam"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Mock Exam
                </Link>
              </li>
              <li>
                <Link
                  href="/questions"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Question Bank
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmarks"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Examination Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Official Syllabus
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Category A (Motorcycle)</li>
              <li>Category K (Scooter / Moped)</li>
              <li>500 Official Questions</li>
              <li>Computer-Based Testing (CBT)</li>
              <li>Offline & Client-Side Ready</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LicensePrep. All rights reserved.</p>
          <p className="text-slate-400">
            For educational preparation purposes based on official DOTM curriculum.
          </p>
        </div>
      </div>
    </footer>
  );
}
