import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { CtaBand } from "@/components/sections/CtaBand";
import { journey, packages } from "@/content/clinic";

export const metadata: Metadata = {
  title: "How It Works",
  description: "From your first enquiry to flying home, see exactly how Body By Design Vacations plans your cosmetic surgery holiday to India.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A clear path, from first question to full recovery"
        subtitle="Travelling for surgery should feel reassuring, not overwhelming. Here is exactly how we guide you through every step."
        crumbs={[{ label: "Home", href: "/" }, { label: "How It Works" }]}
      />

      {/* journey timeline */}
      <Section className="bg-ivory">
        <div className="container-bbdv">
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-magenta via-orange to-purple sm:left-1/2" />
            <div className="space-y-10">
              {journey.map((step, i) => (
                <Reveal key={step.n} direction="up" delay={i * 0.05}>
                  <div className={`relative flex items-start gap-6 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right sm:flex-row-reverse"}`}>
                    <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-magenta shadow-soft ring-1 ring-ink/5">
                      <Icon name={step.icon} size={24} />
                    </span>
                    <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-magenta">Step {step.n}</span>
                      <h3 className="mt-1 font-display text-xl text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* recovery image feature */}
      <Section className="bg-cream">
        <div className="container-bbdv grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-soft">
              <Img src="/images/site/recovery.jpg" alt="Comfortable recovery accommodation in Bangalore" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <div>
            <Eyebrow>Recovery, reimagined</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Heal in comfort, not in a rush</h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              The best results come from a calm, supported recovery. We arrange comfortable accommodation, daily check-ins and gentle local transfers so your only job is to rest and heal, with your surgeon and coordinator close by.
            </p>
            <ul className="mt-6 space-y-3">
              {["Supported recovery accommodation", "Daily nurse-guided check-ins", "Local transfers throughout your stay", "A coordinator on WhatsApp at all times"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-ink/80">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-gradient"><Check size={13} className="text-white" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* packages */}
      <Section className="bg-ivory">
        <div className="container-bbdv">
          <SectionHeading
            eyebrow="Packages"
            title="Choose how supported you want to feel"
            subtitle="Every package includes your surgery with board-certified surgeons. The difference is how much of the rest we take off your plate."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} direction="up" delay={i * 0.08}>
                <div className={`relative flex h-full flex-col rounded-3xl p-8 ${pkg.highlight ? "bg-ink text-white ring-2 ring-magenta" : "bg-white text-ink shadow-soft ring-1 ring-ink/5"}`}>
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-4 py-1 text-xs font-semibold text-white">Most popular</span>
                  )}
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
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">Package contents are confirmed in your personalised quote.</p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
