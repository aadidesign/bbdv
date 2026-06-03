"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Kinetic split-text reveal (word level), recreating the reference site's
 * js-split-text headline animation. Each word rises and fades in, staggered.
 */
export function SplitText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.span;
  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
      variants={{ show: { transition: { delayChildren: delay, staggerChildren: stagger } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
