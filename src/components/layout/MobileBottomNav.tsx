"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Award, Layers, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const BOTTOM_NAV_ITEMS = [
    { href: "/", label: t.navHome, icon: Home },
    { href: "/questions", label: t.navQuestions, icon: Layers },
    { href: "/exam", label: t.navExam, icon: Award },
    { href: "/practice", label: t.navPractice, icon: BookOpen },
    { href: "/bookmarks", label: t.navBookmarks, icon: Bookmark },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 liquid-glass border-t border-white/80 py-1 px-2 safe-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all select-none",
                active
                  ? "liquid-glass-accent text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-transform",
                  active ? "text-blue-600 stroke-[2.25] scale-105" : "text-slate-500 stroke-[1.75]"
                )}
              />
              <span
                className={cn(
                  "text-[10px] mt-0.5 leading-tight tracking-tight",
                  active ? "font-bold text-blue-700" : "font-medium text-slate-600"
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
