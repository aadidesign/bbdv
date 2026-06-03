import { Award, Check, ArrowRight, BadgeCheck } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Counter } from "@/components/ui/Counter";
import { Img } from "@/components/ui/Img";
import { ZoomReveal } from "@/components/ui/ZoomReveal";
import { Button } from "@/components/ui/Button";
import { stats, trustPoints, surgeons } from "@/content/clinic";
import { partner } from "@/content/site";

export function PartnerClinic() {
  const lead = surgeons[0]; // Dr. Surindher D.S.A

  return (
    <Section className="bg-ink text-white">
      <div className="container-bbdv grid items-center gap-14 lg:grid-cols-2">
        {/* surgeon portrait (real photo of Dr. Surindher) */}
        <Reveal direction="right">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <ZoomReveal className="absolute inset-0" from={1.35}>
                <Img src="/images/clinic/portrait-2.webp" alt={`${lead.name}, ${lead.role}`} sizes="(max-width:1024px) 100vw, 45vw" />
              </ZoomReveal>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              {/* name plate */}
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-display text-2xl leading-tight text-white sm:text-3xl">{lead.name}</p>
                <p className="mt-1 text-sm text-white/75">{lead.role}</p>
                <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
                  <BadgeCheck size={14} className="text-magenta-400" />
                  {lead.creds}
                </p>
              </div>
            </div>
            <div className="absolute -left-4 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-soft">
              <Award className="text-magenta" size={26} />
              <span className="text-sm font-medium leading-tight">
                Karnataka Healthcare
                <br />
                Leadership Award
              </span>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <Eyebrow>Your surgery, in expert hands</Eyebrow>
          <SplitText
            as="h2"
            text={`Meet ${lead.name}`}
            className="mt-5 text-4xl text-white sm:text-5xl"
          />
          <Reveal direction="up" delay={0.1}>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-magenta-400">
              {lead.role} · {partner.name}, {partner.city}
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-white/70">
              Your procedures are led by {lead.name}, founder of {partner.name} and a board-certified plastic surgeon with more than two decades of experience. He has cared for patients from over 39 countries, and is known by them for one word above all: trustworthy.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} direction="up" delay={i * 0.08}>
                <div>
                  <p className="font-display text-4xl text-gradient-warm">
                    <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </p>
                  <p className="mt-1 text-xs leading-snug text-white/60">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {trustPoints.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-white/80">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-gradient">
                  <Check size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <Reveal direction="up" delay={0.2}>
            <div className="mt-10">
              <Button href="/surgery-in-india" variant="primary">
                Meet your surgeons <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
