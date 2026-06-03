import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

export function Eyebrow({
  children,
  className,
  vertical = false,
}: {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <span
        className={cn(
          "hidden lg:flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-magenta [writing-mode:vertical-rl] rotate-180",
          className
        )}
      >
        <span className="h-10 w-px bg-magenta/40" />
        {children}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-magenta",
        className
      )}
    >
      <span className="h-px w-7 bg-gradient-to-r from-magenta to-orange" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-xl",
        className
      )}
    >
      {eyebrow && <Reveal direction="up"><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
      <SplitText
        as="h2"
        text={title}
        className={cn(
          "text-balance text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.03]",
          light ? "text-white" : "text-ink"
        )}
      />
      {highlight && (
        <Reveal direction="up" delay={0.1}>
          <span className="text-gradient font-display text-3xl sm:text-4xl lg:text-5xl">{highlight}</span>
        </Reveal>
      )}
      {subtitle && (
        <Reveal direction="up" delay={0.15}>
          <p className={cn("text-pretty text-base sm:text-lg leading-relaxed", light ? "text-white/70" : "text-muted")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-24 lg:py-28", className)}>
      {children}
    </section>
  );
}
