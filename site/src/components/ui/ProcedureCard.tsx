import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Img } from "./Img";
import { type Procedure, savingsPct, formatAUD } from "@/content/procedures";

export function ProcedureCard({ p }: { p: Procedure }) {
  return (
    <Link
      href={`/procedures/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(194,24,91,0.4)]"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <Img src={p.image} alt={p.name} sizes="(max-width:640px) 100vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute right-3 top-3 rounded-full bg-brand-gradient px-2.5 py-1 text-xs font-semibold text-white">
          Save {savingsPct(p)}%
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-ink">{p.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{p.shortDesc}</p>
        <div className="mt-5 flex items-end justify-between border-t border-ink/8 pt-4">
          <div>
            <span className="block text-xs text-muted">From</span>
            <span className="font-display text-xl text-ink">{formatAUD(p.fromAUD)}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted">
            <Clock size={13} /> {p.stayInIndia.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
      </div>
      <span className="flex items-center justify-between bg-cream px-6 py-3 text-sm font-medium text-magenta">
        View procedure
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
