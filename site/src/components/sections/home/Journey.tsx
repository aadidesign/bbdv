import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { journey } from "@/content/clinic";

const slideByColumn = ["right", "up", "left"] as const;

export function Journey() {
  return (
    <Section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />
      <div className="container-bbdv relative">
        <SectionHeading
          eyebrow="How it works"
          title="From first question to flying home, we plan all of it"
          subtitle="One team, one clear plan. You focus on your decision and your recovery, we handle everything in between."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journey.map((step, i) => (
            <Reveal key={step.n} direction={slideByColumn[i % 3]} delay={(i % 3) * 0.08}>
              <TiltCard className="group h-full" intensity={5}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-ink/8 bg-white/70 p-7 backdrop-blur-sm transition-colors hover:border-magenta/30">
                  <span className="text-gradient absolute -right-1 -top-3 select-none font-display text-8xl font-semibold opacity-25 transition-opacity group-hover:opacity-45">
                    {step.n}
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white">
                    <Icon name={step.icon} size={22} />
                  </span>
                  <h3 className="relative mt-5 font-display text-xl text-ink">{step.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" className="mt-12 flex justify-center">
          <Link href="/how-it-works" className="group inline-flex items-center gap-2 font-medium text-magenta">
            See the full journey
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
