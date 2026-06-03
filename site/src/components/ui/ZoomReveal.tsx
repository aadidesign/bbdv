"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Immersive zoom-in reveal. The content sits in a clipping frame and scales
 * down from an over-zoom into place as it enters the viewport, the way premium
 * editorial sites introduce a hero image. Pair with a `fill` image child.
 */
export function ZoomReveal({
  children,
  className,
  once = true,
  amount = 0.3,
  delay = 0,
  from = 1.3,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  delay?: number;
  /** Initial scale before settling to 1. */
  from?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={reduce ? { opacity: 1 } : { scale: from, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
