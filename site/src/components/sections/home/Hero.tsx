"use client";

import { motion } from "motion/react";
import { Star, ArrowRight, ShieldCheck, Plane, Globe, Building2, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Eyebrow } from "@/components/ui/Section";
import { reviewSummary } from "@/content/testimonials";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const word = {
  hidden: { y: "115%", opacity: 0, filter: "blur(6px)" },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.15 + i * 0.08, duration: 0.85, ease: EASE },
  }),
};

const stats = [
  { icon: Globe, label: "International patients", value: "39+", sub: "countries served" },
  { icon: Building2, label: "Premium facilities", value: "Accredited", sub: "hospitals" },
  { icon: Users, label: "Personalised care", value: "End-to-End", sub: "support" },
  { icon: Tag, label: "Affordable excellence", value: "70% Less", sub: "than Western prices" },
];

export function Hero() {
  const line1 = ["Your", "transformation,"];
  const line2 = ["beautifully", "planned."];

  return (
    <section className="relative overflow-hidden bg-brand-gradient-soft pt-32 pb-14 lg:pt-40 lg:pb-20">
      {/* Soft ambient orbs for depth (lightweight, no WebGL) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-magenta/10 blur-3xl" />
        <div className="absolute right-[6%] top-[14%] h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      </div>

      <div className="container-bbdv relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        {/* copy */}
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Cosmetic Surgery Holidays to India</Eyebrow>
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.1rem,9vw,3rem)] leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <span className="block">
              {line1.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden align-top">
                  <motion.span className="inline-block pr-[0.25em]" variants={word} custom={i} initial="hidden" animate="show">
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block">
              {line2.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden align-top">
                  <motion.span
                    className={`inline-block pr-[0.25em] ${i === 0 ? "text-gradient-animated" : ""}`}
                    variants={word}
                    custom={i + 2}
                    initial="hidden"
                    animate="show"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink/70"
          >
            World-class cosmetic and plastic surgery in Bangalore, performed by board-certified surgeons and coordinated end to end from Australia. The result you want, for a fraction of the price at home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="/get-a-quote" size="lg" className="w-full sm:w-auto">
              Get a Free Quote <ArrowRight size={18} />
            </Button>
            <Button href="/procedures" variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Procedures
            </Button>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div>
              <div className="flex items-center gap-1 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-1 text-sm text-ink/60">{reviewSummary.count}+ patient reviews</p>
            </div>
            <div className="hidden h-10 w-px bg-ink/10 sm:block" />
            <div className="flex items-center gap-2 text-sm text-ink/70">
              <ShieldCheck size={18} className="text-magenta" />
              Board-certified surgeons
            </div>
            <div className="hidden h-10 w-px bg-ink/10 sm:block" />
            <div className="flex items-center gap-2 text-sm text-ink/70">
              <Plane size={18} className="text-magenta" />
              Patients from 39+ countries
            </div>
          </motion.div>
        </div>

        {/* visual: arched portrait + floating cards (responsive, no 3D) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          className="relative mx-auto w-full max-w-96 sm:max-w-104 lg:mr-0 lg:max-w-lg"
        >
          {/* pink disc behind the figure */}
          <div className="absolute left-1/2 top-3 aspect-square w-[95%] -translate-x-1/2 rounded-full bg-gradient-to-b from-magenta/30 via-magenta/12 to-orange/[0.06]" />
          <div className="absolute left-1/2 top-3 aspect-square w-[95%] -translate-x-1/2 rounded-full ring-1 ring-magenta/15" />
          {/* soft accent glow */}
          <div className="pointer-events-none absolute -right-4 top-1/3 h-24 w-24 rounded-full bg-orange/20 blur-2xl" />

          {/* transparent cut-out portrait, overflowing the disc */}
          <div className="relative z-10 mx-auto aspect-[640/761] w-[96%]">
            <Img
              src="/images/hero/hero-model-eu.png"
              alt="A confident patient after her transformation"
              sizes="(min-width: 1024px) 26rem, 85vw"
              priority
              className="object-contain object-bottom drop-shadow-[0_14px_28px_rgba(124,20,63,0.12)]"
            />
          </div>

          {/* rating card — top right */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -right-1 top-3 z-20 rounded-2xl bg-white px-3 py-2 shadow-soft sm:-right-5 sm:top-6 sm:px-4 sm:py-3"
          >
            <p className="font-display text-base leading-none text-ink sm:text-xl">5.0 Rating</p>
            <div className="mt-1.5 flex items-center gap-0.5 text-orange">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" className="sm:h-3.5 sm:w-3.5" />
              ))}
            </div>
            <p className="mt-1 text-[0.7rem] text-ink/60 sm:mt-1.5 sm:text-xs">{reviewSummary.count}+ patient reviews</p>
          </motion.div>

          {/* surgeon card — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -left-1 bottom-2 z-20 flex items-center gap-2 rounded-2xl bg-white p-2 pr-3 shadow-soft sm:-left-5 sm:bottom-6 sm:gap-3 sm:p-2.5 sm:pr-4"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-14 sm:rounded-xl">
              <Img src="/images/clinic/portrait-1.webp" alt="Dr. Surindher D.S.A" sizes="56px" />
            </div>
            <div>
              <p className="text-[0.5rem] font-medium uppercase tracking-[0.16em] text-ink/45 sm:text-[0.6rem]">Your surgeon</p>
              <p className="font-display text-xs leading-tight text-ink sm:text-base">Dr. Surindher D.S.A</p>
              <p className="text-[0.6rem] text-ink/55 sm:text-[0.7rem]">Board-certified Plastic Surgeon</p>
            </div>
          </motion.div>

          {/* savings card — bottom right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="absolute -right-2 bottom-16 z-20 rounded-2xl bg-gradient-to-br from-magenta to-[#b01a5b] px-3.5 py-3 text-white shadow-glow sm:-right-5 sm:bottom-20 sm:px-5 sm:py-4"
          >
            <p className="text-[0.55rem] uppercase tracking-wider text-white/70 sm:text-[0.6rem]">Save up to</p>
            <p className="font-display text-2xl leading-none sm:text-4xl">70%</p>
            <p className="mt-1 text-[0.55rem] uppercase tracking-wide text-white/70 sm:text-[0.65rem]">vs Australian prices</p>
          </motion.div>
        </motion.div>
      </div>

      {/* stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="container-bbdv relative mt-14"
      >
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 rounded-[1.75rem] border border-white/60 bg-white/60 px-4 py-6 shadow-soft backdrop-blur-sm sm:gap-x-4 sm:px-8 sm:py-7 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 sm:gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-magenta/10 text-magenta sm:h-11 sm:w-11">
                <s.icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink/45">{s.label}</p>
                <p className="font-display text-lg leading-tight text-ink sm:text-xl">{s.value}</p>
                <p className="text-xs text-ink/55">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
