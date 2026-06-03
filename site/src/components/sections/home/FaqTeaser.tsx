import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/content/faqs";
import { contact } from "@/content/site";

export function FaqTeaser() {
  const top = faqs.slice(0, 5);
  return (
    <Section className="bg-ivory">
      <div className="container-bbdv grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>Good questions</Eyebrow>
          <SplitText as="h2" text="The things everyone asks first" className="mt-5 text-4xl text-ink sm:text-5xl" />
          <Reveal direction="up" delay={0.1}>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-muted">
              Travelling for surgery is a big decision. Here are honest answers to the questions we hear most, and we are always one message away for the rest.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="mt-8 rounded-3xl bg-brand-gradient p-6 text-white">
              <p className="font-display text-xl">Still wondering about something?</p>
              <p className="mt-1 text-sm text-white/80">Talk to a coordinator in Melbourne, no obligation.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={contact.primaryWhatsApp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink">
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a href={contact.primaryPhoneHref} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                  <Phone size={16} /> {contact.au.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div>
          <Accordion items={top.map((f) => ({ q: f.q, a: f.a }))} />
          <Link href="/faq" className="group mt-6 inline-flex items-center gap-2 font-medium text-magenta">
            Read all FAQs <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
