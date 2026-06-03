import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { contact, cta } from "@/content/site";

export function CtaBand({
  title = "Ready to begin your transformation?",
  subtitle = "Tell us what you are considering. You will have a clear, no-obligation quote in Australian dollars, usually within 48 hours.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-80 w-80 rounded-full bg-magenta/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-orange/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple/25 blur-3xl" />
      </div>
      <div className="container-bbdv relative text-center">
        <SplitText as="h2" text={title} className="mx-auto max-w-3xl text-balance text-4xl text-white sm:text-5xl lg:text-6xl" />
        <Reveal direction="up" delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/70">{subtitle}</p>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={cta.quote.href} variant="primary" size="lg">
              {cta.quote.label} <ArrowRight size={18} />
            </Button>
            <Button href={contact.primaryWhatsApp} variant="light" size="lg">
              <MessageCircle size={18} /> WhatsApp our team
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
