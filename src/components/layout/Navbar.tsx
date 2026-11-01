"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  BookOpen,
  Award,
  Bookmark,
  Info,
  Menu,
  X,
  Shield,
  Sparkles,
  TrafficCone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", sub: "गृहपृष्ठ", icon: Home },
  { href: "/exam", label: "Mock Exam", sub: "नमुना परीक्षा", icon: Award },
  { href: "/practice", label: "Practice", sub: "अभ्यास सेट", icon: BookOpen },
  { href: "/questions", label: "500 Questions", sub: "प्रश्नोत्तर", icon: Layers },
  {
    href: `/questions?section=${encodeURIComponent("ट्राफिक सङ्केत सम्बन्धी ज्ञान")}`,
    label: "Traffic Signs",
    sub: "ट्राफिक संकेत",
    icon: TrafficCone,
  },
  { href: "/bookmarks", label: "Bookmarks", sub: "सुरक्षित", icon: Bookmark },
  { href: "/about", label: "Syllabus", sub: "पाठ्यक्रम", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full liquid-glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.3)] group-hover:bg-blue-700 transition-all group-hover:scale-105">
              <Shield className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight leading-none font-sans">
                  License<span className="text-blue-600">Prep</span>
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                  DOTM
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                Nepal Driving License Exam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                    active
                      ? "bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5",
                      active ? "text-blue-600" : "text-slate-400"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/exam"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_2px_10px_rgba(37,99,235,0.25)] transition-all active:scale-[0.98]"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Take Mock Test</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/80 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  active
                    ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      active ? "text-blue-600" : "text-slate-400"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-slate-400 font-normal font-devanagari">
                  {item.sub}
                </span>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/exam"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Start Mock Exam (20 Questions / 30 Min)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
