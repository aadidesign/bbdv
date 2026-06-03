import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { whyIndia } from "@/content/clinic";

// Cards fan in: left column slides from the left, centre rises, right column
// slides from the right.
const slideByColumn = ["right", "up", "left"] as const;

export function WhyIndia() {
  return (
    <Section className="bg-ivory">
      <div className="container-bbdv">
        <SectionHeading
          eyebrow="Why Bangalore"
          title="The same surgery, a world away from the same price"
          subtitle="Australians are quietly choosing India for cosmetic surgery, and not because it costs less. They choose it because it costs less and the care is genuinely world-class."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyIndia.map((w, i) => (
            <Reveal key={w.title} direction={slideByColumn[i % 3]} delay={(i % 3) * 0.08}>
              <div className="group h-full" style={{ perspective: 1000 }}>
                <TiltCard className="h-full rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(194,24,91,0.4)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient-soft text-magenta">
                    <Icon name={w.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-ink">{w.title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">{w.desc}</p>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
