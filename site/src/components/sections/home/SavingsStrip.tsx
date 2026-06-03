import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { procedures, savingsPct, formatAUD } from "@/content/procedures";

const featured = ["rhinoplasty", "breast-augmentation", "tummy-tuck", "fue-hair-transplant", "liposuction", "mummy-makeover"];

export function SavingsStrip() {
  const rows = featured.map((s) => procedures.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <Section className="bg-ivory">
      <div className="container-bbdv">
        <SectionHeading
          eyebrow="Pricing and savings"
          title="Transparent pricing, quoted in Australian dollars"
          subtitle="A snapshot of what patients typically invest with us compared with Australia. Every quote is personalised and confirmed after your consultation."
        />

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/5">
          <div className="hidden grid-cols-[2fr_1fr_1fr_auto] gap-4 border-b border-ink/8 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-muted sm:grid">
            <span>Procedure</span>
            <span>Australia (from)</span>
            <span>With BBDV (from)</span>
            <span className="text-right">You save</span>
          </div>
          {rows.map((p, i) => (
            <Reveal key={p.slug} direction="right" delay={i * 0.06}>
              <Link
                href={`/procedures/${p.slug}`}
                className="group grid grid-cols-2 items-center gap-3 border-b border-ink/6 px-7 py-5 transition-colors hover:bg-blush/40 sm:grid-cols-[2fr_1fr_1fr_auto]"
              >
                <span className="flex items-center gap-2 font-display text-lg text-ink">
                  {p.name}
                  <ArrowUpRight size={15} className="text-magenta opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="text-sm text-muted line-through decoration-magenta/40 sm:no-underline sm:decoration-transparent">
                  <span className="sm:hidden">AU </span>{formatAUD(p.auFromAUD)}
                </span>
                <span className="font-medium text-ink">{formatAUD(p.fromAUD)}</span>
                <span className="justify-self-end rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  {savingsPct(p)}%
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-muted">
          Prices are indicative estimates for planning only and are confirmed after a personal consultation. Australian figures are typical market ranges.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/pricing" variant="outline">
            See full pricing <ArrowRight size={16} />
          </Button>
          <Button href="/get-a-quote">Get your personalised quote</Button>
        </div>
      </div>
    </Section>
  );
}
