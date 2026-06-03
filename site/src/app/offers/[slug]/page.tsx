import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Star, MessageCircle, Phone, Plane, Video, HeartPulse } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Accordion } from "@/components/ui/Accordion";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { getProcedure, savingsPct, formatAUD } from "@/content/procedures";
import { stats, trustPoints } from "@/content/clinic";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faqs";
import { contact } from "@/content/site";

// Curated set of dedicated paid-traffic landing pages, matched to the first
// Google Search campaigns in the Lead Generation Playbook (section 4 and 10).
// These are message-matched to the ad and intentionally focused: one procedure,
// one job, the quote form high on the page.
const OFFER_SLUGS = [
  "rhinoplasty",
  "breast-augmentation",
  "liposuction",
  "gynecomastia",
  "fue-hair-transplant",
  "tummy-tuck",
  "facelift",
];

export function generateStaticParams() {
  return OFFER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProcedure(slug);
  if (!p) return { title: "Offer" };
  return {
    title: `${p.name} in India from ${formatAUD(p.fromAUD)}`,
    description: `${p.name} with board-certified surgeons in Bangalore, about ${savingsPct(p)}% less than Australia. Free quote in AUD, no obligation.`,
    // Paid-traffic landing pages are kept out of the index to avoid duplicate
    // content and to keep organic and paid measurement clean.
    robots: { index: false, follow: false },
  };
}

const fearFaqGroups = ["Safety and surgeons", "Cost and payments"];

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProcedure(slug);
  if (!p || !OFFER_SLUGS.includes(slug)) notFound();

  const saving = savingsPct(p);
  const audSaved = p.auFromAUD - p.fromAUD;

  // A loosely matching patient story for social proof, with a sensible fallback.
  const story =
    testimonials.find((t) =>
      (t.procedure ?? "").toLowerCase().includes(p.name.split(" ")[0].toLowerCase())
    ) ?? testimonials[0];

  const faqItems = faqs
    .filter((f) => fearFaqGroups.includes(f.group))
    .slice(0, 5)
    .map((f) => ({ q: f.q, a: f.a }));

  const reasons = [
    { icon: ShieldCheck, t: "Board-certified surgeons", d: "Your procedure is performed by MCh-qualified plastic surgeons in an accredited Bangalore hospital, never a general practitioner." },
    { icon: Video, t: "Meet your surgeon before you fly", d: "A free online consultation, photos and a clear plan, so there are no surprises when you arrive." },
    { icon: Plane, t: "Your whole trip, coordinated", d: "Flights guidance, visa letter, airport pickup and recovery stay, all handled from Melbourne." },
    { icon: HeartPulse, t: "Aftercare that follows you home", d: "Structured follow-ups with your surgeon and coordinator long after you land back in Australia." },
  ];

  return (
    <>
      {/* Hero: message-matched headline + savings, with the quote form high on the page */}
      <section id="quote" className="relative overflow-hidden bg-brand-gradient-soft pt-32 pb-16 lg:pt-40 scroll-mt-24">
        <div className="container-bbdv grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>Cosmetic surgery holiday to India</Eyebrow>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              {p.name} in India,
              <br />
              <span className="text-gradient">from {formatAUD(p.fromAUD)}</span>
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink/70">
              The same {p.commonName.toLowerCase()} performed in Australia for around {formatAUD(p.auFromAUD)},
              with board-certified surgeons in an award-winning Bangalore clinic. Save about {saving}%,
              even after flights and your recovery stay.
            </p>

            <div className="mt-7 inline-flex flex-wrap items-center gap-4 rounded-2xl bg-white/70 px-5 py-4 shadow-soft ring-1 ring-white/50">
              <div>
                <span className="text-xs text-muted line-through">{formatAUD(p.auFromAUD)} in Australia</span>
                <p className="font-display text-3xl text-ink">{formatAUD(p.fromAUD)}</p>
              </div>
              <span className="h-10 w-px bg-ink/10" />
              <div>
                <span className="text-xs text-muted">You save around</span>
                <p className="text-gradient font-display text-3xl">{formatAUD(audSaved)}</p>
              </div>
            </div>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {trustPoints.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-gradient">
                    <Check size={12} className="text-white" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={contact.primaryWhatsApp} variant="primary" size="lg">
                <MessageCircle size={18} /> WhatsApp us now
              </Button>
              <Button href={contact.primaryPhoneHref} variant="outline" size="lg">
                <Phone size={18} /> {contact.au.phone}
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted">Indicative price in AUD, confirmed after your free consultation.</p>
          </div>

          {/* Quote form, pre-matched to this procedure */}
          <Reveal direction="left">
            <div className="rounded-[2rem] bg-white p-1.5 shadow-soft ring-1 ring-ink/5">
              <div className="rounded-[1.7rem] bg-brand-gradient px-6 py-4 text-center text-white">
                <p className="font-display text-xl">Get your free {p.name.toLowerCase()} quote</p>
                <p className="text-sm text-white/80">A clear quote in AUD, usually within 48 hours. No obligation.</p>
              </div>
              <div className="p-1.5">
                <QuoteForm presetProcedures={[p.slug]} source={`offer:${p.slug}`} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-y border-ink/8 bg-ivory py-10">
        <div className="container-bbdv grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl text-ink sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why BBDV */}
      <Section className="bg-cream">
        <div className="container-bbdv">
          <div className="max-w-2xl">
            <Eyebrow>Why patients choose us</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
              {p.name} done safely, for a fraction of the price
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <Reveal key={r.t} direction="up">
                <div className="h-full rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient-soft text-magenta">
                    <r.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-ink">{r.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Matching patient story */}
      <Section className="bg-ivory">
        <div className="container-bbdv grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-white/40">
              <Img src={p.image} alt={`${p.name} result`} sizes="(max-width:1024px) 100vw, 40vw" />
            </div>
          </Reveal>
          <div>
            <div className="flex items-center gap-1 text-orange">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-5 text-pretty font-display text-2xl leading-snug text-ink sm:text-3xl">
              &ldquo;{story.quote}&rdquo;
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-ink">{story.name}</p>
            {story.procedure && <p className="text-sm text-muted">{story.procedure}</p>}
          </div>
        </div>
      </Section>

      {/* Fear-removal FAQ */}
      <Section className="bg-cream">
        <div className="container-bbdv grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Your questions, answered</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
              The things people ask before they book
            </h2>
            <p className="mt-4 text-muted">
              Still unsure? Message us on WhatsApp and a Melbourne coordinator will answer honestly, with no pressure.
            </p>
            <div className="mt-6">
              <Button href={contact.primaryWhatsApp} variant="solid" size="md">
                <MessageCircle size={17} /> Ask us anything
              </Button>
            </div>
          </div>
          <Accordion items={faqItems} />
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-ink py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-magenta/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-orange/25 blur-3xl" />
        </div>
        <div className="container-bbdv relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-balance font-display text-3xl text-white sm:text-4xl">
            Ready to find out what your {p.name.toLowerCase()} would cost?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`#quote`} variant="light" size="lg">Get my free quote</Button>
            <Button href={contact.primaryWhatsApp} variant="primary" size="lg">
              <MessageCircle size={18} /> WhatsApp {contact.au.whatsappLabel}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
