import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ProcedureCard } from "@/components/ui/ProcedureCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { categories, proceduresByCategory } from "@/content/procedures";

export const metadata: Metadata = {
  title: "Procedures",
  description: "Explore cosmetic and plastic surgery procedures available through Body By Design Vacations, performed by board-certified surgeons in Bangalore.",
};

export default function ProceduresPage() {
  return (
    <>
      <PageHero
        eyebrow="Procedures"
        title="Every procedure, one trusted team"
        subtitle="Browse the full range of cosmetic and plastic surgery we coordinate in Bangalore. Each is performed by board-certified surgeons, with indicative pricing in Australian dollars."
        crumbs={[{ label: "Home", href: "/" }, { label: "Procedures" }]}
      />

      {categories.map((c, ci) => {
        const items = proceduresByCategory(c.slug);
        return (
          <Section key={c.slug} id={c.slug} className={ci % 2 === 0 ? "bg-ivory" : "bg-cream"}>
            <div className="container-bbdv">
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <Eyebrow>
                    <Icon name={c.icon} size={14} /> {c.label}
                  </Eyebrow>
                  <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{c.title}</h2>
                  <p className="mt-2 text-pretty text-muted">{c.blurb}</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p, i) => (
                  <Reveal key={p.slug} direction="up" delay={(i % 3) * 0.06}>
                    <ProcedureCard p={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Section>
        );
      })}

      <CtaBand title="Not sure which procedure is right?" subtitle="Send us a message and a coordinator will help you understand your options, with a free surgeon consultation and a clear quote." />
    </>
  );
}
