"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Layers,
  BookOpen,
  Award,
  Bookmark,
  Info,
  Menu,
  X,
  Shield,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { href: "/", label: t.navHome, icon: Compass },
    { href: "/questions", label: t.navQuestions, icon: Layers },
    { href: "/practice", label: t.navPractice, icon: BookOpen },
    { href: "/exam", label: t.navExam, icon: Award },
    { href: "/bookmarks", label: t.navBookmarks, icon: Bookmark },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full liquid-glass border-b border-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo with Liquid Glass Badge */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
              <Shield className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight leading-none">
                  License<span className="text-blue-600">Prep</span>
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full liquid-glass-pill text-blue-700">
                  DOTM A & K
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                {language === "ne" ? "नेपाल लाइसेन्स लिखित परीक्षा" : "Nepal Written License Prep"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all select-none",
                    active
                      ? "liquid-glass-accent text-blue-700 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5",
                      active ? "text-blue-600 stroke-[2.25]" : "text-slate-400"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Take Exam CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher Pill */}
            <div className="liquid-glass-pill p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => setLanguage("ne")}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all",
                  language === "ne"
                    ? "bg-blue-600 text-white shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                )}
                title="नेपाली भाषा"
              >
                नेपाली
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all",
                  language === "en"
                    ? "bg-blue-600 text-white shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                )}
                title="English Language"
              >
                EN
              </button>
            </div>

            <Link
              href="/exam"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm transition-all"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.takeExamBtn}</span>
            </Link>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={() => setLanguage(language === "ne" ? "en" : "ne")}
              className="px-2 py-1 rounded-lg text-xs font-bold liquid-glass-pill text-blue-700"
            >
              {language === "ne" ? "EN" : "नेपा"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 liquid-glass-pill"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/60 liquid-glass px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  active
                    ? "liquid-glass-accent text-blue-700"
                    : "text-slate-700 hover:bg-white/50"
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
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/exam"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{t.takeExamBtn} (२० प्रश्न / ३० मिनेट)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
