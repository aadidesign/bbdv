import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * BBDV brand lockup using the real logo asset (transparent PNG processed from
 * the brand's Facebook logo). On dark/colour surfaces it sits on a light chip
 * so the wordmark and tagline stay legible.
 */
export function Logo({
  tone = "dark",
  className,
  href = "/",
}: {
  tone?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  const onDark = tone === "light";
  return (
    <Link href={href} aria-label="Body By Design Vacations home" className={cn("inline-flex items-center", className)}>
      <span className={cn("inline-flex items-center transition-transform duration-300", onDark && "rounded-xl bg-white/95 px-3 py-1.5 shadow-sm")}>
        <Image
          src="/brand/bbdv-logo.png"
          alt="Body By Design Vacations — Cosmetic Holidays India"
          width={1418}
          height={1227}
          priority
          className="h-14 w-auto object-contain sm:h-17"
        />
      </span>
    </Link>
  );
}

// Kept for compatibility where a compact mark is needed.
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image src="/brand/bbdv-logo.png" alt="BBDV" width={1418} height={1227} className={cn("h-9 w-auto object-contain", className)} />
  );
}
