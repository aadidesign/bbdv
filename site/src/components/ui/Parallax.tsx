"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Img } from "./Img";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked parallax image. The picture lives in an oversized inner layer
 * that drifts vertically as the section moves through the viewport, so the
 * frame stays put while the image breathes behind it. Reduced-motion safe.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  amount = 12,
  priority = false,
  overlay,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Peak drift as a percentage of the image overscan. */
  amount?: number;
  priority?: boolean;
  overlay?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-x-0 -top-[16%] -bottom-[16%]">
        <Img src={src} alt={alt} sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
      {overlay}
    </div>
  );
}
