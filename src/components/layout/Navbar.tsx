"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Award,
  Layers,
  Bookmark,
  Info,
  Menu,
  X,
  Compass,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Dashboard", subLabel: "गृहपृष्ठ", icon: Compass },
  { href: "/questions", label: "Important Q&A", subLabel: "५०० प्रश्नोत्तर", icon: Layers, highlightPill: "500 Qs" },
  { href: "/practice", label: "Practice Mode", subLabel: "विषयगत अभ्यास", icon: BookOpen },
  { href: "/exam", label: "Online Exam", subLabel: "नमुना परीक्षा", icon: Award },
  { href: "/bookmarks", label: "Saved Questions", subLabel: "सुरक्षित", icon: Bookmark },
  { href: "/about", label: "Exam Syllabus", subLabel: "ढाँचा र नियम", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 text-white text-[11px] py-1 px-4 text-center border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              नेपाल यातायात व्यवस्था विभाग (DOTM) आधिकारिक वर्ग ‘क’ र ‘ट’ लिखित परीक्षा तयारी
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <span>५०० वस्तुगत प्रश्नोत्तर</span>
            <span>•</span>
            <span>समय: ३० मिनेट (Pass: ५०-६०%)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-all">
              <FileCheck2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                  License<span className="text-blue-600">Prep</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
                  DOTM
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider mt-0.5">
                नेपाल लाइसेन्स लिखित परीक्षा
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all relative",
                    active
                      ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600/15"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      active ? "text-blue-600" : "text-slate-400"
                    )}
                  />
                  <span>{item.label}</span>
                  {item.highlightPill && !active && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.highlightPill}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Practice Fast CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/exam"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 active:scale-95"
            >
              <Award className="w-4 h-4 text-white" />
              <span>अनलाइन परीक्षा (Mock Test)</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-colors",
                  active
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      active ? "text-blue-600" : "text-slate-400"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {item.subLabel}
                </span>
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/exam"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
            >
              <Award className="w-4 h-4 text-white" />
              <span>२५ प्रश्नको नमुना परीक्षा सुरु गर्नुहोस्</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
