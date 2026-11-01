"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Award, Layers, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM_NAV_ITEMS = [
  { href: "/", label: "गृहपृष्ठ", sublabel: "Home", icon: Home },
  { href: "/questions", label: "प्रश्नोत्तर", sublabel: "Q&A", icon: Layers },
  { href: "/exam", label: "परीक्षा", sublabel: "Exam", icon: Award },
  { href: "/practice", label: "अभ्यास", sublabel: "Practice", icon: BookOpen },
  { href: "/bookmarks", label: "बुकमार्क", sublabel: "Saved", icon: Bookmark },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1 px-2 safe-bottom shadow-sm">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-colors select-none",
                active
                  ? "text-blue-600"
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
                  "text-[11px] mt-0.5 leading-tight tracking-tight",
                  active ? "font-semibold text-blue-600" : "font-medium text-slate-600"
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
