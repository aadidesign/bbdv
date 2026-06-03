import type { Metadata } from "next";
import { Heart, Globe, ShieldCheck, HandHeart } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Img } from "@/components/ui/Img";
import { CtaBand } from "@/components/sections/CtaBand";
import { stats } from "@/content/clinic";
import { site, partner, markets } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Body By Design Vacations is a Melbourne based medical tourism company connecting patients with world-class cosmetic surgery in Bangalore.",
};

const values = [
  { icon: Heart, t: "Care, not pressure", d: "We give you honest information and the space to decide. A quote is never a commitment." },
  { icon: ShieldCheck, t: "Safety above all", d: "Board-certified surgeons, accredited hospitals, and recovery planned for your wellbeing." },
  { icon: Globe, t: "Coordinated from Australia", d: "A local team you can call, managing every detail of your journey to India and back." },
  { icon: HandHeart, t: "With you the whole way", d: "From your first message to your final follow-up, you are never on your own." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Cosmetic surgery, beautifully coordinated"
        subtitle={`${site.name} is a Melbourne based company that helps people access world-class cosmetic and plastic surgery in India, without the guesswork, the stress, or the price tag at home.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* story */}
      <Section className="bg-ivory">
        <div className="container-bbdv grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
              <Img src="/images/site/quote-2.jpg" alt="A happy patient" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Born from a simple belief</h2>
            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted">
              <p>
                Everyone deserves to feel confident in their own skin, and no one should have to wait years or remortgage their home to get there. We saw how many Australians were quietly priced out of the cosmetic surgery they wanted, and how many were travelling overseas without the right support around them.
              </p>
              <p>
                So we built {site.name}. We partner exclusively with {partner.name} in {partner.city}, an award-winning clinic with board-certified surgeons and more than two decades of experience, then wrap your entire journey in care, coordinated from Australia.
              </p>
              <p>
                Today we help patients from {markets.slice(0, 4).join(", ")} and beyond travel for surgery with genuine confidence.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* values */}
      <Section className="bg-cream">
        <div className="container-bbdv">
          <SectionHeading eyebrow="What we stand for" title="The way we look after you" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} direction="up" delay={i * 0.06}>
                <div className="h-full rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient-soft text-magenta"><v.icon size={24} /></span>
                  <h3 className="mt-5 font-display text-xl text-ink">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* stats */}
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

      <CtaBand />
    </>
  );
}
