"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Award, Layers, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM_NAV_ITEMS = [
  { href: "/", label: "Home", sublabel: "गृहपृष्ठ", icon: Home },
  { href: "/exam", label: "Mock Exam", sublabel: "परीक्षा", icon: Award },
  { href: "/practice", label: "Practice", sublabel: "अभ्यास", icon: BookOpen },
  { href: "/questions", label: "Questions", sublabel: "५०० प्रश्न", icon: Layers },
  { href: "/bookmarks", label: "Saved", sublabel: "सुरक्षित", icon: Bookmark },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-2xl border-t border-white/70 py-1.5 px-2 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors select-none",
                active
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform",
                  active ? "text-blue-600 stroke-[2.25]" : "text-slate-500 stroke-[1.75]"
                )}
              />
              <span
                className={cn(
                  "text-[10px] mt-0.5 leading-tight tracking-tight",
                  active ? "font-bold text-blue-600" : "font-medium text-slate-600"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
