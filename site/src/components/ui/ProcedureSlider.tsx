"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Img } from "./Img";
import { type Procedure, savingsPct, formatAUD } from "@/content/procedures";
import { cn } from "@/lib/utils";

export function ProcedureSlider({ items }: { items: Procedure[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center", containScroll: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  const tween = useCallback(() => {
    if (!embla) return;
    const progress = embla.scrollProgress();
    const slides = embla.slideNodes();
    embla.scrollSnapList().forEach((snap, i) => {
      let diff = snap - progress;
      // handle loop wrap
      if (diff > 0.5) diff -= 1;
      if (diff < -0.5) diff += 1;
      const scale = Math.max(0.82, 1 - Math.abs(diff) * 0.9);
      const opacity = Math.max(0.35, 1 - Math.abs(diff) * 1.6);
      const node = slides[i] as HTMLElement;
      if (node) {
        node.style.transform = `scale(${scale})`;
        node.style.opacity = String(opacity);
      }
    });
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    tween();
    embla.on("select", onSelect);
    embla.on("scroll", tween);
    embla.on("reInit", () => {
      onSelect();
      tween();
    });
  }, [embla, onSelect, tween]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {items.map((p) => (
            <div key={p.slug} className="min-w-0 shrink-0 grow-0 basis-[82%] px-3 transition-[transform,opacity] duration-200 sm:basis-[55%] lg:basis-[38%]">
              <Link
                href={`/procedures/${p.slug}`}
                className="group block overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-ink/5"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Img
                    src={p.image}
                    alt={p.name}
                    sizes="(max-width:768px) 80vw, 40vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
                    {p.category}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                    Save {savingsPct(p)}%
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-2xl">{p.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{p.tagline}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <span className="text-sm">
                        <span className="block text-white/60">From</span>
                        <span className="font-display text-2xl">{formatAUD(p.fromAUD)}</span>
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-magenta">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <SliderButton dir="prev" disabled={!canPrev} onClick={() => embla?.scrollPrev()} />
        <SliderButton dir="next" disabled={!canNext} onClick={() => embla?.scrollNext()} />
      </div>
    </div>
  );
}

function SliderButton({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={cn(
        "grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:bg-brand-gradient hover:text-white hover:border-transparent",
        disabled && "opacity-40"
      )}
    >
      {dir === "prev" ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
    </button>
  );
}
