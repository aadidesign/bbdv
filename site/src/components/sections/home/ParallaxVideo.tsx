"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Palmtree, HeartPulse, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";

const points = [
  { icon: HeartPulse, t: "Nurse-guided recovery", d: "Daily check-ins so you heal safely and calmly." },
  { icon: Palmtree, t: "Rest like a getaway", d: "Comfortable, private accommodation, not a rushed return home." },
  { icon: MapPin, t: "Bangalore at your pace", d: "Gentle rest-day experiences when you are ready." },
];

export function ParallaxVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-28">
      {/* parallax video layer */}
      <motion.div style={{ y, scale }} className="absolute inset-x-0 -top-[14%] -bottom-[14%]">
        <video autoPlay muted loop playsInline poster="/images/site/recovery.jpg" className="h-full w-full object-cover">
          <source src="/videos/massage.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/80" />

      <div className="container-bbdv relative">
        <div className="mx-auto max-w-2xl text-center text-white">
          <div className="flex justify-center">
            <Eyebrow className="text-magenta-400">Recover in comfort</Eyebrow>
          </div>
          <SplitText
            as="h2"
            text="Heal somewhere that feels like a holiday"
            className="mx-auto mt-5 text-balance text-4xl text-white sm:text-5xl lg:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/75"
          >
            Your recovery matters as much as your surgery. We settle you into calm, supported accommodation so your body can heal while you simply rest.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="rounded-2xl glass-dark p-6 text-white"
            >
              <p.icon className="text-magenta-400" size={24} />
              <h3 className="mt-3 font-display text-xl">{p.t}</h3>
              <p className="mt-1 text-sm text-white/70">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
