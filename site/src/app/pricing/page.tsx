import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { categories, proceduresByCategory, savingsPct, formatAUD } from "@/content/procedures";
import { packages } from "@/content/clinic";

export const metadata: Metadata = {
  title: "Pricing & Savings",
  description: "Indicative cosmetic surgery prices in Australian dollars, with typical savings compared to Australia. Confirmed after a free consultation.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing and savings"
        title="Honest pricing, in Australian dollars"
        subtitle="Every figure below is an indicative starting price for planning. Your personalised quote is confirmed after a free consultation, with no hidden charges."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      <Section className="bg-ivory">
        <div className="container-bbdv space-y-12">
          {categories.map((c) => (
            <Reveal key={c.slug} direction="up">
              <div id={c.slug} className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/5">
                <div className="flex items-center justify-between bg-brand-gradient px-7 py-5 text-white">
                  <h2 className="font-display text-2xl">{c.label}</h2>
                  <span className="text-sm text-white/80">{proceduresByCategory(c.slug).length} procedures</span>
                </div>
                <div className="hidden grid-cols-[2fr_1fr_1fr_auto] gap-4 border-b border-ink/8 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:grid">
                  <span>Procedure</span><span>Australia (from)</span><span>With BBDV (from)</span><span className="text-right">Save</span>
                </div>
                {proceduresByCategory(c.slug).map((p) => (
                  <Link key={p.slug} href={`/procedures/${p.slug}`} className="group grid grid-cols-2 items-center gap-3 border-b border-ink/6 px-7 py-4 transition-colors last:border-0 hover:bg-blush/40 sm:grid-cols-[2fr_1fr_1fr_auto]">
                    <span className="flex items-center gap-1.5 font-medium text-ink">
                      {p.name}
                      <ArrowUpRight size={14} className="text-magenta opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="text-sm text-muted">{formatAUD(p.auFromAUD)}</span>
                    <span className="font-medium text-ink">{formatAUD(p.fromAUD)}</span>
                    <span className="justify-self-end rounded-full bg-brand-gradient px-2.5 py-1 text-xs font-semibold text-white">{savingsPct(p)}%</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          ))}

          <div className="flex items-start gap-3 rounded-2xl bg-blush/60 p-5 text-sm text-ink/70">
            <Info size={18} className="mt-0.5 shrink-0 text-magenta" />
            <p>
              Prices are indicative estimates for planning only and are confirmed after a personal consultation. Australian figures are typical market ranges and vary by clinic. Your quote in Australian dollars is itemised with no hidden charges, and finance or instalment options may be available.
            </p>
          </div>
        </div>
      </Section>

      {/* packages */}
      <Section className="bg-cream">
        <div className="container-bbdv">
          <SectionHeading eyebrow="What is included" title="Your quote covers more than the surgery" subtitle="Every package includes board-certified surgical care. Choose how much of the journey you would like us to handle." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`flex h-full flex-col rounded-3xl p-8 ${pkg.highlight ? "bg-ink text-white ring-2 ring-magenta" : "bg-white text-ink shadow-soft ring-1 ring-ink/5"}`}>
                <h3 className="font-display text-2xl">{pkg.name}</h3>
                <p className={`mt-1 text-sm ${pkg.highlight ? "text-white/70" : "text-muted"}`}>{pkg.tagline}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-gradient"><Check size={12} className="text-white" /></span>
                      <span className={pkg.highlight ? "text-white/85" : "text-ink/75"}>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand title="Get your exact price" subtitle="Your indicative price becomes a firm, itemised quote after a free consultation. Start with a no-obligation enquiry." />
    </>
  );
}
