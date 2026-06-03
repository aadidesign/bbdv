import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Body By Design Vacations. Call or WhatsApp our Melbourne team, or reach the clinic in Bangalore.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your transformation"
        subtitle="Reach our Melbourne team by phone, WhatsApp or message. We usually reply within 48 hours, and there is never any obligation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section className="bg-ivory">
        <div className="container-bbdv grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* details */}
          <div className="space-y-5">
            <div className="rounded-3xl bg-brand-gradient p-7 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Australia</span>
              <p className="mt-1 font-display text-2xl">Speak to {contact.au.contactName}</p>
              <p className="text-sm text-white/80">{contact.au.city}</p>
              <div className="mt-5 space-y-2.5">
                <a href={contact.primaryWhatsApp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
                  <MessageCircle size={18} /> WhatsApp {contact.au.whatsappLabel}
                </a>
                <a href={contact.primaryPhoneHref} className="flex items-center gap-3 rounded-full bg-white/15 px-5 py-3 text-sm font-medium">
                  <Phone size={18} /> {contact.au.phone}
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-magenta">India clinic</span>
              <p className="mt-1 font-display text-xl text-ink">Aesthetics Plus, Bangalore</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex items-start gap-3"><Phone size={16} className="mt-0.5 text-magenta" /><span>{contact.india.phones.join(" / ")}</span></li>
                <li className="flex items-start gap-3"><Mail size={16} className="mt-0.5 text-magenta" /><a href={contact.india.emailHref} className="hover:text-magenta">{contact.india.email}</a></li>
                <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-magenta" /><span>{contact.india.address}</span></li>
                <li className="flex items-start gap-3"><Clock size={16} className="mt-0.5 text-magenta" /><span>{contact.india.hours}</span></li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-ink/5">
              <iframe
                title="Clinic location"
                src="https://maps.google.com/maps?q=aesthetics%20plus%20sadashiv%20nagar%20bangalore&t=m&z=12&output=embed&iwloc=near"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
