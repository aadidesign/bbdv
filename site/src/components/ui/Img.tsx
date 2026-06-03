"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image wrapper with a graceful on-brand fallback, so a missing asset
 * never shows a broken-image icon in front of a client.
 */
export function Img({
  src,
  alt,
  fill = true,
  width,
  height,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div
        className={cn("bg-brand-gradient-soft flex items-center justify-center", className)}
        aria-label={alt}
        role="img"
      >
        <span className="text-gradient font-display text-lg opacity-70">BBDV</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setErr(true)}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 800}
      sizes={sizes}
      priority={priority}
      onError={() => setErr(true)}
      className={className}
    />
  );
}
