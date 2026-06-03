import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { beforeAfters } from "@/content/before-after";

export function BeforeAfterShowcase() {
  return (
    <Section className="bg-cream">
      <div className="container-bbdv grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Real results</Eyebrow>
          <SplitText as="h2" text="The proof is in the mirror" className="mt-4 text-4xl text-ink sm:text-5xl" />
          <Reveal direction="up" delay={0.1}>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
              These are genuine before and after results from our partner clinic in Bangalore. Drag the slider to see the difference our surgeons make, then picture your own transformation.
            </p>
          </Reveal>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {beforeAfters.slice(0, 3).map((b) => (
              <figure key={b.src} className="overflow-hidden rounded-xl bg-white p-1.5 shadow-soft ring-1 ring-ink/5">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-cream/70">
                  <Img src={`/images/clinic/${b.src}.png`} alt={`${b.procedure} before and after result`} sizes="160px" className="object-contain" />
                </div>
                <figcaption className="px-1 pb-0.5 pt-1.5 text-center text-[0.65rem] font-medium text-muted">{b.procedure}</figcaption>
              </figure>
            ))}
          </div>

          <Reveal direction="up" delay={0.2}>
            <Link href="/patient-stories" className="group mt-8 inline-flex items-center gap-2 font-medium text-magenta">
              See more patient results <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal direction="left">
          <BeforeAfter before="/images/clinic/before-3.png" after="/images/clinic/after-3.png" className="aspect-[4/5] w-full" />
          <p className="mt-3 text-center text-xs text-muted">Individual results vary. Photography supplied by the partner clinic.</p>
        </Reveal>
      </div>
    </Section>
  );
}
