"use client";

import { useRef, useState, useCallback } from "react";
import { Img } from "./Img";
import { cn } from "@/lib/utils";

/** Drag-to-reveal before/after comparison slider. */
export function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
  sizes = "(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw",
}: {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative select-none overflow-hidden rounded-3xl", className)}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* After (full) */}
      <Img src={after} alt={afterAlt} sizes={sizes} className="object-cover" />
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img src={before} alt={beforeAlt} sizes={sizes} className="object-cover" />
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-medium text-white">
        After
      </span>

      {/* handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 cursor-ew-resize bg-white/90"
        style={{ left: `${pos}%` }}
        onMouseDown={() => (dragging.current = true)}
        onTouchStart={() => (dragging.current = true)}
      >
        <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-magenta">
            <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
