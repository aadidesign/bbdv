import type { Metadata } from "next";
import { ShieldCheck, Clock, MessageCircle, Phone, Star } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { contact } from "@/content/site";
import { reviewSummary } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Request a free, no-obligation cosmetic surgery quote in Australian dollars. A BBDV coordinator replies within 48 hours.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free, no obligation"
        title="Get your personalised quote"
        subtitle="Tell us what you are considering and a little about your trip. A coordinator in Melbourne will send a clear quote in Australian dollars, usually within 48 hours."
        crumbs={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]}
      />

      <Section className="bg-ivory !pt-12">
        <div className="container-bbdv grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <QuoteForm />

          <aside className="space-y-5">
            <div className="rounded-3xl bg-ink p-7 text-white">
              <div className="flex items-center gap-1 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 font-display text-2xl">Loved by {reviewSummary.count}+ patients</p>
              <p className="mt-1 text-sm text-white/70">A trusted partner for your transformation, from first message to full recovery.</p>
            </div>

            {[
              { icon: Clock, t: "48-hour response", d: "A real coordinator replies with a clear, itemised quote, not an automated email." },
              { icon: ShieldCheck, t: "No obligation", d: "A quote is just information. There is never any pressure to proceed." },
            ].map((b) => (
              <div key={b.t} className="flex gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient-soft text-magenta">
                  <b.icon size={20} />
                </span>
                <div>
                  <p className="font-display text-lg text-ink">{b.t}</p>
                  <p className="mt-1 text-sm text-muted">{b.d}</p>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-brand-gradient p-7 text-white">
              <p className="font-display text-xl">Prefer to talk?</p>
              <p className="mt-1 text-sm text-white/80">We are based in Melbourne and happy to help.</p>
              <div className="mt-5 space-y-3">
                <a href={contact.primaryWhatsApp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
                  <MessageCircle size={17} /> WhatsApp {contact.au.whatsappLabel}
                </a>
                <a href={contact.primaryPhoneHref} className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-medium">
                  <Phone size={17} /> Call {contact.au.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
