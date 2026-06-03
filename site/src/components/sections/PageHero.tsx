import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient-soft pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-magenta/10 blur-3xl" />
      <div className="container-bbdv relative">
        {crumbs && (
          <Reveal direction="up">
            <nav className="mb-6 flex items-center gap-1.5 text-sm text-ink/50">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-magenta">{c.label}</Link>
                  ) : (
                    <span className="text-ink/70">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight size={14} />}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        {eyebrow && (
          <Reveal direction="up"><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        )}
        <SplitText as="h1" text={title} className="mt-5 max-w-4xl text-balance text-5xl text-ink sm:text-6xl lg:text-7xl" />
        {highlight && (
          <Reveal direction="up" delay={0.1}>
            <span className="text-gradient font-display text-3xl sm:text-4xl">{highlight}</span>
          </Reveal>
        )}
        {subtitle && (
          <Reveal direction="up" delay={0.15}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
