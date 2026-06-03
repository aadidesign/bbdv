import { Star, Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { testimonials, reviewSummary } from "@/content/testimonials";

function Card({ name, procedure, quote, rating }: (typeof testimonials)[number]) {
  return (
    <figure className="flex w-[330px] shrink-0 flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5 sm:w-[380px]">
      <Quote className="text-magenta/30" size={32} />
      <blockquote className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink/80">{quote}</blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4">
        <div>
          <p className="font-medium text-ink">{name}</p>
          {procedure && <p className="text-xs text-muted">{procedure}</p>}
        </div>
        <div className="flex gap-0.5 text-orange">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half).concat(testimonials.slice(0, 2));

  return (
    <Section className="overflow-hidden bg-blush/50">
      <div className="container-bbdv">
        <SectionHeading
          eyebrow="Patient stories"
          title="Real people, real results, real relief"
          subtitle={`Rated ${reviewSummary.rating} out of 5 across ${reviewSummary.count}+ reviews. These are real words from patients of our partner clinic.`}
        />
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <Marquee>
          {row1.map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </Marquee>
        <Marquee reverse>
          {row2.map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
