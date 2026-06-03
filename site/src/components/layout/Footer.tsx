import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site, contact, socials, footerNav, medicalDisclaimer, partner } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-magenta/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-orange/15 blur-3xl" />

      <div className="container-bbdv relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-white/60">
              {site.name} plans your cosmetic surgery holiday to India end to end, performed by the board-certified surgeons of {partner.shortName}, {partner.city}.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-brand-gradient hover:text-white"
                >
                  <SocialIcon name={s.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Procedures" links={footerNav.procedures} />
          <FooterCol title="Company" links={footerNav.company} />

          <div>
            <h4 className="font-display text-lg">Get in touch</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-magenta-400" />
                <span>
                  <a href={contact.primaryPhoneHref} className="hover:text-white">{contact.au.phone}</a>
                  <span className="block text-xs text-white/45">{contact.au.city}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={16} className="mt-0.5 text-magenta-400" />
                <a href={contact.primaryWhatsApp} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp {contact.au.whatsappLabel}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-magenta-400" />
                <a href={contact.india.emailHref} className="hover:text-white">{contact.india.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-magenta-400" />
                <span>{contact.india.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/40">{medicalDisclaimer}</p>
          <div className="mt-5 flex flex-col items-start justify-between gap-4 text-xs text-white/50 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              {footerNav.support.slice(3).map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>
              ))}
              <span>Surgery by {partner.name}, {partner.city}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-lg">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-white/60">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
