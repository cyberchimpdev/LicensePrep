import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <span className="font-bold text-lg text-navy-900 tracking-tight">
                License<span className="text-blue-600">Prep</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              नेपाल यातायात व्यवस्था विभाग (DOTM) द्वारा निर्धारण गरिएको वर्ग ‘क’ (मोटरसाइकल) र ‘ट’ (स्कुटर/मोपेड) सवारी चालक अनुमतिपत्र लिखित परीक्षाको पूर्ण र आधिकारिक ५०० वस्तुगत प्रश्नोत्तर तयारी पोर्टल।
            </p>
            <div className="text-xs text-slate-400">
              Preserving original examination questions and answer keys verbatim from official publications.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/practice"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Interactive Practice (अभ्यास)
                </Link>
              </li>
              <li>
                <Link
                  href="/exam"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Timed Mock Examination (नमुना परीक्षा)
                </Link>
              </li>
              <li>
                <Link
                  href="/questions"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Full 500 Question Bank (प्रश्न बैंक)
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmarks"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Bookmarked Questions (सुरक्षित प्रश्नहरू)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Educational Resource
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Category A (Motorcycle)</li>
              <li>Category K (Scooter / Moped)</li>
              <li>500 Objective Q&A</li>
              <li>Client-side Storage</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LicensePrep. Free & Open Learning Resource for Nepal Driving License Aspirants.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with care for safe driving in Nepal</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}

