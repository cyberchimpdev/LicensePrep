"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, BookOpen, Award, Layers, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM_NAV_ITEMS = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/practice", label: "Practice", icon: BookOpen },
  { href: "/exam", label: "Exam", icon: Award, highlight: true },
  { href: "/questions", label: "Bank", icon: Layers },
  { href: "/bookmarks", label: "Saved", icon: Bookmark },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 py-1.5 px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4 group focus:outline-none"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95",
                    active
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-navy-900 text-white hover:bg-navy-800"
                  )}
                >
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold mt-1 tracking-tight",
                    active ? "text-blue-600 font-extrabold" : "text-slate-600"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all select-none",
                active ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform",
                    active && "scale-110 text-blue-600"
                  )}
                />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

