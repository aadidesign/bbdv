"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Marquee({
  children,
  reverse = false,
  className,
  itemClassName,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          itemClassName
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          itemClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
