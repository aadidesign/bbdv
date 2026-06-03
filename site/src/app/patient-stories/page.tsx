import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Img } from "@/components/ui/Img";
import { CtaBand } from "@/components/sections/CtaBand";
import { testimonials, reviewSummary } from "@/content/testimonials";
import { beforeAfters } from "@/content/before-after";
import { VideoGrid } from "@/components/sections/home/VideoGrid";

export const metadata: Metadata = {
  title: "Patient Stories",
  description: "Real reviews and stories from cosmetic surgery patients of our partner clinic in Bangalore.",
};

export default function PatientStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient stories"
        title="Transformations, in their own words"
        subtitle={`Rated ${reviewSummary.rating} out of 5 across ${reviewSummary.count}+ reviews. Here are real words from patients of our partner clinic in Bangalore.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Patient Stories" }]}
      />

      {/* testimonials grid */}
      <Section className="bg-ivory">
        <div className="container-bbdv grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} direction={["right", "up", "left"][i % 3] as "right" | "up" | "left"} delay={(i % 3) * 0.07} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(194,24,91,0.35)]">
                <div className="flex items-center justify-between">
                  <Quote className="text-magenta/30" size={30} />
                  <div className="flex gap-0.5 text-orange">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                  </div>
                </div>
                <blockquote className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink/80">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-ink/8 pt-4">
                  <p className="font-medium text-ink">{t.name}</p>
                  {t.procedure && <p className="text-xs text-muted">{t.procedure}</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* before / after */}
      <Section className="bg-cream">
        <div className="container-bbdv">
          <SectionHeading
            eyebrow="See the difference"
            title="Drag to compare"
            subtitle="A simple before and after slider. Drag the handle to reveal the result."
          />
          <Reveal direction="up" className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <figure>
              <BeforeAfter before="/images/clinic/before-3.png" after="/images/clinic/after-3.png" className="aspect-[4/5]" />
              <figcaption className="mt-2 text-center text-xs text-muted">Facial contouring</figcaption>
            </figure>
            <figure>
              <BeforeAfter before="/images/clinic/before-2.png" after="/images/clinic/after-2.png" className="aspect-[4/5]" />
              <figcaption className="mt-2 text-center text-xs text-muted">Ear surgery (otoplasty)</figcaption>
            </figure>
          </Reveal>

          {/* real before/after results gallery */}
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beforeAfters.map((b, i) => (
              <Reveal key={b.src} direction={["right", "up", "left"][i % 3] as "right" | "up" | "left"} delay={(i % 3) * 0.07} className="h-full">
                <figure className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-2.5 shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(194,24,91,0.3)]">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-cream/70">
                    <Img src={`/images/clinic/${b.src}.png`} alt={`${b.procedure} before and after result at Aesthetics Plus`} sizes="(max-width:640px) 100vw, 33vw" className="object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <figcaption className="flex items-center justify-between px-2 pb-1 pt-3">
                    <span className="font-display text-base text-ink">{b.procedure}</span>
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted">
                      Before
                      <span className="h-px w-5 bg-gradient-to-r from-magenta to-orange" />
                      <span className="text-magenta">After</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-muted">
            Real before and after results from our partner clinic in Bangalore. Individual results vary from person to person.
          </p>
        </div>
      </Section>

      {/* videos */}
      <Section className="bg-ivory">
        <div className="container-bbdv">
          <SectionHeading eyebrow="In their words" title="Hear from the clinic" subtitle="Tap any video to watch it right here, without leaving the page." />
          <div className="mt-12">
            <VideoGrid />
          </div>
        </div>
      </Section>

      <CtaBand title="Your story could be next" />
    </>
  );
}
