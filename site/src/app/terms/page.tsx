import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { medicalDisclaimer } from "@/content/site";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <Section className="bg-ivory">
        <div className="container-bbdv mx-auto max-w-3xl space-y-6 text-pretty leading-relaxed text-muted">
          <h2 className="font-display text-2xl text-ink">About this website</h2>
          <p>This sample website presents information about cosmetic and plastic surgery holidays coordinated by Body By Design Vacations, with surgery performed by our partner clinic in Bangalore, India.</p>
          <h2 className="font-display text-2xl text-ink">Medical disclaimer</h2>
          <p>{medicalDisclaimer}</p>
          <h2 className="font-display text-2xl text-ink">Pricing</h2>
          <p>All prices shown are indicative estimates in Australian dollars for planning purposes. Your final, itemised quote is confirmed after a personal consultation.</p>
          <h2 className="font-display text-2xl text-ink">Results</h2>
          <p>Cosmetic surgery results vary from person to person. No specific outcome is guaranteed, and any images are for illustration only.</p>
          <p className="text-sm">This is placeholder terms copy for the sample website and should be reviewed by the business before launch.</p>
        </div>
      </Section>
    </>
  );
}
