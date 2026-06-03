import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ProcedureSlider } from "@/components/ui/ProcedureSlider";
import { Button } from "@/components/ui/Button";
import { categories, popularProcedures } from "@/content/procedures";

export function ProceduresShowcase() {
  return (
    <Section className="bg-ivory">
      <div className="container-bbdv">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Procedures"
            title="Loved by patients, performed by specialists"
            subtitle="Face, breast, body, men and non-surgical, all carried out by board-certified plastic surgeons."
            className="lg:mb-0"
          />
          <Reveal direction="up">
            <Button href="/procedures" variant="outline">
              View all procedures <ArrowRight size={16} />
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="mt-14">
        <ProcedureSlider items={popularProcedures()} />
      </div>

      <div className="container-bbdv mt-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/procedures#${c.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-transparent hover:bg-brand-gradient hover:text-white"
            >
              <Icon name={c.icon} size={16} className="text-magenta group-hover:text-white" />
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
