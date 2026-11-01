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
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", subLabel: "गृहपृष्ठ", icon: Compass },
  { href: "/practice", label: "Practice", subLabel: "अभ्यास", icon: BookOpen },
  { href: "/exam", label: "Mock Exam", subLabel: "नमुना परीक्षा", icon: Award },
  { href: "/questions", label: "Question Bank", subLabel: "प्रश्न बैंक", icon: Layers },
  { href: "/bookmarks", label: "Bookmarks", subLabel: "सुरक्षित", icon: Bookmark },
  { href: "/about", label: "About", subLabel: "जानकारी", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-md shadow-navy-900/10 group-hover:bg-blue-600 transition-colors">
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 2.3-.56 4.33-1.89 5.86-3.66l-1.46-1.46C14.19 21.05 12.67 21.9 12 22c-4.41-1.12-7-5.46-7-10V8.3l7-3.5 7 3.5V13h2V7l-10-5zm-1 9v2h2v-2h-2zm0 4v2h2v-2h-2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-navy-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                License<span className="text-blue-600">Prep</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Nepal Driving License (A & K)
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      active ? "text-blue-600" : "text-slate-400"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Practice Fast CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/exam"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-navy-900 text-white hover:bg-navy-800 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Take Exam</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors",
                  active
                    ? "bg-blue-50 text-blue-700 font-semibold"
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
                <span className="text-xs text-slate-400 font-normal">
                  {item.subLabel}
                </span>
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/exam"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-navy-900 text-white font-semibold text-sm hover:bg-navy-800 transition-colors shadow-sm"
            >
              <Award className="w-4 h-4 text-blue-400" />
              <span>Start Mock Exam Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

