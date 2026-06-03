import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { faqs, faqGroups } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about cosmetic surgery in India, safety, pricing, travel and recovery with Body By Design Vacations.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Good questions"
        title="Everything you want to ask"
        subtitle="Travelling for surgery is a big decision. Here are honest answers, grouped by topic. If your question is not here, we are one message away."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <Section className="bg-ivory">
        <div className="container-bbdv mx-auto max-w-3xl space-y-14">
          {faqGroups.map((group) => (
            <div key={group}>
              <h2 className="mb-2 font-display text-2xl text-ink sm:text-3xl">{group}</h2>
              <Accordion items={faqs.filter((f) => f.group === group).map((f) => ({ q: f.q, a: f.a }))} />
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Still have a question?" subtitle="Send us a message on WhatsApp or request a free quote, and a Melbourne coordinator will get back to you within 48 hours." />
    </>
  );
}
