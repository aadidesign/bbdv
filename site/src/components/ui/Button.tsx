import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 will-change-transform focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-gradient text-white shadow-[0_14px_34px_-12px_rgba(194,24,91,0.6)] hover:shadow-[0_20px_46px_-12px_rgba(244,81,30,0.65)] hover:-translate-y-0.5",
        solid:
          "bg-ink text-white hover:bg-plum hover:-translate-y-0.5",
        outline:
          "border border-magenta/30 text-ink hover:border-magenta hover:bg-magenta/5",
        light:
          "bg-white/90 text-ink shadow-sm hover:bg-white hover:-translate-y-0.5",
        ghost: "text-ink hover:text-magenta",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-[0.95rem]",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type BaseProps = VariantProps<typeof button> & { className?: string; children: React.ReactNode };
type AsLink = BaseProps & { href: string; target?: string; rel?: string };
type AsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

function isLink(p: AsLink | AsButton): p is AsLink {
  return "href" in p && typeof (p as AsLink).href === "string";
}

export function Button(props: AsLink | AsButton) {
  const { variant, size, className, children } = props;
  const cls = cn(button({ variant, size }), className);
  if (isLink(props)) {
    const { href, target, rel } = props;
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} target={target} rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  const rest = { ...props } as Record<string, unknown>;
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.children;
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
