"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, MessageCircle, ChevronDown, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { primaryNav, contact, cta } from "@/content/site";
import { categories, proceduresByCategory } from "@/content/procedures";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container-bbdv">
          <div
            className={cn(
              "flex items-center justify-between rounded-full py-1.5 pl-5 pr-3 transition-all duration-500 sm:pl-6 sm:pr-4",
              scrolled ? "glass-nav shadow-soft" : ""
            )}
          >
            <Logo className="shrink-0" />

            {/* desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) =>
                item.href === "/procedures" ? (
                  <div key={item.href} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)} className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-magenta",
                        pathname.startsWith("/procedures") && "text-magenta"
                      )}
                    >
                      {item.label}
                      <ChevronDown size={14} className={cn("transition-transform", mega && "rotate-180")} />
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium text-ink/80 transition-colors hover:text-magenta",
                      pathname === item.href && "text-magenta"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={contact.primaryWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-brand-gradient hover:text-white hover:border-transparent sm:grid"
                aria-label="WhatsApp us"
              >
                <MessageCircle size={18} />
              </a>
              <Button href={cta.quote.href} size="sm" className="hidden sm:inline-flex">
                {cta.quote.label}
              </Button>
              <button
                onClick={() => setOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* mega menu */}
          <AnimatePresence>
            {mega && (
              <motion.div
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-x-0 top-full mt-2 hidden px-[var(--cbpad,0)] lg:block"
              >
                <div className="container-bbdv">
                  <div className="grid grid-cols-5 gap-2 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-ink/5">
                    {categories.map((c) => (
                      <div key={c.slug}>
                        <Link
                          href={`/procedures#${c.slug}`}
                          className="mb-2 flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-magenta"
                        >
                          {c.label}
                          <ArrowUpRight size={14} />
                        </Link>
                        <ul className="space-y-1">
                          {proceduresByCategory(c.slug).slice(0, 5).map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/procedures/${p.slug}`}
                                className="block rounded-lg px-2 py-1.5 text-sm text-ink/70 transition-colors hover:bg-blush/70 hover:text-ink"
                              >
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-gradient lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto p-6 text-white">
              <div className="flex items-center justify-between">
                <Logo tone="light" />
                <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/15" aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {primaryNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link href={item.href} className="block border-b border-white/15 py-4 font-display text-3xl">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pt-8">
                <Button href={cta.quote.href} variant="light" size="lg" className="w-full">
                  {cta.quote.label}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <a href={contact.primaryPhoneHref} className="flex items-center justify-center gap-2 rounded-full bg-white/15 py-3 text-sm font-medium">
                    <Phone size={16} /> Call
                  </a>
                  <a href={contact.primaryWhatsApp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-white/15 py-3 text-sm font-medium">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
                <p className="pt-2 text-center text-sm text-white/70">{contact.primaryPhone} · Melbourne, Australia</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
