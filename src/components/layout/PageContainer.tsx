import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  const sizeStyles = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <main
      className={cn(
        "flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </main>
  );
}

