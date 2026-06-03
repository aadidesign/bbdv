"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Loads the WebGL hero accent only on capable clients, with a CSS fallback. */
export function HeroCanvas({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const okWidth = window.innerWidth >= 768;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setEnabled(!reduce && okWidth && webgl);
  }, []);

  return (
    <div className={className}>
      {/* CSS fallback / base glow always present */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-magenta/30 blur-3xl animate-float" />
        <div className="absolute right-[26%] top-[40%] h-56 w-56 rounded-full bg-orange/30 blur-3xl animate-float [animation-delay:1.5s]" />
        <div className="absolute right-[4%] top-[48%] h-48 w-48 rounded-full bg-purple/30 blur-3xl animate-float [animation-delay:0.8s]" />
      </div>
      {enabled && <HeroScene />}
    </div>
  );
}
