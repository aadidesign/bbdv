"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";

export function VideoBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12]);

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center overflow-hidden py-24 lg:min-h-[72vh]">
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/hero-1.jpg"
        style={{ y, scale }}
        className="absolute inset-x-0 -top-[12%] -bottom-[12%] w-full object-cover"
      >
        <source src="/videos/beauty.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />

      <div className="container-bbdv relative">
        <div className="max-w-2xl text-white">
          <Eyebrow className="text-magenta-400">Your surgery, your getaway</Eyebrow>
          <SplitText
            as="h2"
            text="Arrive as you are. Leave as the you that you imagined."
            className="mt-5 text-balance text-4xl text-white sm:text-5xl lg:text-6xl"
          />
          <Reveal direction="up" delay={0.1}>
            <p className="mt-6 max-w-xl text-pretty text-lg text-white/75">
              World-class surgery, a calm and supported recovery, and the quiet confidence of a result that finally feels like you. All coordinated from Australia, all in one trip.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-a-quote" size="lg">Start your journey <ArrowRight size={18} /></Button>
              <Button href="/how-it-works" variant="light" size="lg">See how it works</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
