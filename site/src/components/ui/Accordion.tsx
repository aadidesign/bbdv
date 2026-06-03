"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn("divide-y divide-ink/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="py-1">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className={cn("font-display text-lg sm:text-xl transition-colors", isOpen ? "text-magenta" : "text-ink")}>
                {item.q}
              </span>
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                  isOpen ? "rotate-45 border-magenta bg-magenta text-white" : "border-ink/20 text-ink"
                )}
              >
                <Plus size={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-12 text-pretty leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
