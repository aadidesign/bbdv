"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { videos as allVideos, thumb, embed, type Video } from "@/content/videos";

/**
 * Video cards for the clinic's YouTube content. The descriptive title sits in
 * a clean footer below the thumbnail (the thumbnails already carry their own
 * busy text, so we never overlay our copy on top of it). Clicking opens an
 * in-page lightbox rather than sending the visitor away to YouTube.
 */
export function VideoGrid({ limit }: { limit?: number }) {
  const videos: Video[] = limit ? allVideos.slice(0, limit) : allVideos;
  const [active, setActive] = useState<Video | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <Reveal key={v.id} direction={["right", "up", "left"][i % 3] as "right" | "up" | "left"} delay={(i % 3) * 0.07} className="h-full">
            <button
              type="button"
              onClick={() => setActive(v)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(194,24,91,0.3)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Img src={thumb(v.id)} alt={v.title} sizes="(max-width:768px) 100vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover:bg-ink/25" />
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-magenta shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} fill="currentColor" className="ml-0.5" />
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <p className="font-display text-lg text-ink">{v.title}</p>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-magenta opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Watch
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="absolute -top-12 right-0 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Close <X size={18} />
              </button>
              <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-glow ring-1 ring-white/10">
                <iframe
                  src={`${embed(active.id)}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
