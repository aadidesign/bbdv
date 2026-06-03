import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Clock, Stethoscope, BedDouble, CalendarDays, Plane, ArrowRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProcedureCard } from "@/components/ui/ProcedureCard";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  procedures, getProcedure, proceduresByCategory, getCategory, savingsPct, formatAUD,
} from "@/content/procedures";

export function generateStaticParams() {
  return procedures.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProcedure(slug);
  if (!p) return { title: "Procedure" };
  return {
    title: `${p.name} in India`,
    description: `${p.name} (${p.commonName}) from ${formatAUD(p.fromAUD)}, about ${savingsPct(p)}% less than Australia. ${p.shortDesc}`,
  };
}

export default async function ProcedurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProcedure(slug);
  if (!p) notFound();

  const cat = getCategory(p.category);
  const related = proceduresByCategory(p.category).filter((r) => r.slug !== p.slug).slice(0, 3);
  const facts = [
    { icon: Stethoscope, label: "Anaesthetic", value: p.anaesthetic },
    { icon: Clock, label: "Procedure time", value: p.duration },
    { icon: BedDouble, label: "Hospital stay", value: p.hospitalStay },
    { icon: CalendarDays, label: "Recovery", value: p.recovery },
    { icon: Plane, label: "Stay in India", value: p.stayInIndia },
  ];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-brand-gradient-soft pt-36 pb-16 lg:pt-44">
        <div className="container-bbdv grid items-center gap-12 lg:grid-cols-2">
          <div>
            <nav className="mb-5 flex items-center gap-1.5 text-sm text-ink/50">
              <Link href="/" className="hover:text-magenta">Home</Link> /
              <Link href="/procedures" className="hover:text-magenta">Procedures</Link> /
              <Link href={`/procedures#${cat.slug}`} className="hover:text-magenta">{cat.label}</Link>
            </nav>
            <Eyebrow>{p.tagline}</Eyebrow>
            <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">{p.name}</h1>
            <p className="mt-2 text-lg text-muted">Also known as {p.commonName}</p>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink/70">{p.shortDesc}</p>

            <div className="mt-8 flex flex-wrap items-end gap-6">
              <div>
                <span className="text-sm text-muted">From</span>
                <p className="font-display text-4xl text-ink">{formatAUD(p.fromAUD)}</p>
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-2">
                <span className="text-sm text-muted line-through">{formatAUD(p.auFromAUD)} in Australia</span>
                <p className="text-gradient font-display text-2xl">Save {savingsPct(p)}%</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-a-quote" size="lg">Get a quote for {p.name} <ArrowRight size={18} /></Button>
            </div>
          </div>

          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-white/40">
              <Img src={p.image} alt={p.name} sizes="(max-width:1024px) 100vw, 45vw" priority />
            </div>
          </Reveal>
        </div>
      </section>

      {/* overview + facts */}
      <Section className="bg-ivory">
        <div className="container-bbdv grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>The procedure</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">What {p.name.toLowerCase()} involves</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{p.overview}</p>

            <h3 className="mt-10 font-display text-2xl text-ink">Why patients choose it</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-gradient">
                    <Check size={13} className="text-white" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5">
            <h3 className="font-display text-xl text-ink">At a glance</h3>
            <dl className="mt-5 space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-3 border-b border-ink/8 pb-4 last:border-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-magenta">
                    <f.icon size={17} />
                  </span>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                    <dd className="text-sm text-ink">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              These details are general guidance. Your surgeon confirms the plan that is right for you at your free consultation.
            </p>
          </div>
        </div>
      </Section>

      {/* related */}
      {related.length > 0 && (
        <Section className="bg-cream">
          <div className="container-bbdv">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">More {cat.label.toLowerCase()} procedures</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProcedureCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </Section>
      )}

      <CtaBand title={`Considering ${p.name.toLowerCase()}?`} subtitle="Request a free, no-obligation quote and a video consultation with a board-certified surgeon." />
    </>
  );
}
