import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Img } from "@/components/ui/Img";
import { TiltCard } from "@/components/ui/TiltCard";
import { ZoomReveal } from "@/components/ui/ZoomReveal";
import { ParallaxImage } from "@/components/ui/Parallax";
import { CtaBand } from "@/components/sections/CtaBand";
import { surgeons, stats, accreditation } from "@/content/clinic";
import { partner } from "@/content/site";

export const metadata: Metadata = {
  title: "Your Surgery in India",
  description: "Meet the board-certified surgeons of Aesthetics Plus, Bangalore, and see why patients from 39+ countries trust their care.",
};

export default function SurgeryInIndiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Your surgery in India"
        title="World-class care, in expert hands"
        subtitle={`Your procedures are performed by the board-certified surgeons of ${partner.name}, an award-winning clinic in ${partner.city} that has cared for patients since ${partner.established}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Surgery in India" }]}
      />

      {/* stats band */}
      <Section className="bg-ink !py-16 text-white">
        <div className="container-bbdv grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl text-gradient-warm"><Counter to={s.value} suffix={s.suffix} decimals={s.decimals} /></p>
              <p className="mt-2 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* surgeons */}
      <Section className="bg-ivory">
        <div className="container-bbdv">
          <SectionHeading
            eyebrow="Meet your surgeons"
            title="Skilled, certified and genuinely caring"
            subtitle="Every procedure is led by a fully qualified plastic surgeon with advanced surgical credentials."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
            {surgeons.map((s, i) => (
              <Reveal key={s.name} direction={["right", "left"][i % 2] as "right" | "left"} delay={(i % 2) * 0.08}>
                <TiltCard className="group h-full" intensity={6}>
                  <div className="h-full overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/5">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <ZoomReveal className="absolute inset-0" from={1.25}>
                        <Img src={s.image} alt={s.name} sizes="(max-width:1024px) 100vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" />
                      </ZoomReveal>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 text-white">
                        <h3 className="font-display text-2xl">{s.name}</h3>
                        <p className="text-sm text-white/80">{s.role}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-medium uppercase tracking-wider text-magenta">{s.creds}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{s.bio}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.focus.map((f) => (
                          <span key={f} className="rounded-full bg-blush px-3 py-1 text-xs text-magenta-600">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* accreditation + hospital image */}
      <Section className="bg-cream">
        <div className="container-bbdv grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Safety first</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">{accreditation.heading}</h2>
            <div className="mt-8 space-y-5">
              {accreditation.points.map((a) => (
                <div key={a.title} className="flex gap-4">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-gradient"><Check size={15} className="text-white" /></span>
                  <div>
                    <p className="font-display text-lg text-ink">{a.title}</p>
                    <p className="mt-1 text-sm text-muted">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Reveal direction="left">
            <ParallaxImage
              src="/images/site/hospital.jpg"
              alt="Accredited hospital theatre"
              sizes="(max-width:1024px) 100vw, 50vw"
              className="aspect-[4/5] rounded-[2rem] shadow-soft"
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Ready to meet your surgeon?" subtitle="Request a free quote and we will arrange a no-obligation video consultation with a board-certified surgeon." />
    </>
  );
}
