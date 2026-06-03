import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <Section className="bg-ivory">
        <div className="container-bbdv mx-auto max-w-3xl space-y-6 text-pretty leading-relaxed text-muted">
          <p>Body By Design Vacations respects your privacy. This sample policy explains, in plain terms, how we handle the information you share when you enquire about cosmetic surgery in India.</p>
          <h2 className="font-display text-2xl text-ink">What we collect</h2>
          <p>When you request a quote or contact us, we collect details such as your name, contact information, the procedures you are interested in, and any notes you choose to share. We use this only to prepare your quote and to coordinate your care.</p>
          <h2 className="font-display text-2xl text-ink">How we use it</h2>
          <p>Your information is used to respond to your enquiry, arrange consultations and quotes, and coordinate your treatment and travel with our partner clinic. We do not sell your information.</p>
          <h2 className="font-display text-2xl text-ink">Your health information</h2>
          <p>Any health information you share is treated as sensitive and confidential, and is only shared with the medical team involved in your care, with your consent.</p>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p>For any privacy question, contact us on +61 411 888 504 or hello@aestheticsplus.in.</p>
          <p className="text-sm">This is placeholder policy copy for the sample website and should be reviewed by the business before launch.</p>
        </div>
      </Section>
    </>
  );
}
