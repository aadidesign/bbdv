"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ArrowRight, ArrowLeft, PartyPopper, MessageCircle, Zap } from "lucide-react";
import { categories, proceduresByCategory, procedures as allProcedures } from "@/content/procedures";
import { markets, contact } from "@/content/site";
import { scoreLead, type LeadScore } from "@/lib/lead-score";
import { cn } from "@/lib/utils";

const steps = ["Your interest", "Your trip", "Your details"];

const tierStyles: Record<string, string> = {
  Hot: "bg-brand-gradient text-white",
  Warm: "bg-orange/15 text-orange",
  Cool: "bg-ink/8 text-ink",
};

export function QuoteForm({
  presetProcedures = [],
  source,
}: {
  /** Pre-selected procedure slugs, e.g. from a landing page so the form matches the ad. */
  presetProcedures?: string[];
  /** Campaign or page the lead came from, captured for attribution in the live site. */
  source?: string;
} = {}) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [lead, setLead] = useState<LeadScore | null>(null);
  const [picked, setPicked] = useState<string[]>(presetProcedures);
  const [form, setForm] = useState({
    country: "Australia",
    state: "",
    timeframe: "Within 3 months",
    budget: "Not sure yet",
    notes: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "WhatsApp",
    heard: "Google search",
  });

  const toggle = (slug: string) =>
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Persist the lead to the shared store so it shows up alongside chat leads.
  function saveLead() {
    const names = picked
      .map((slug) => allProcedures.find((p) => p.slug === slug)?.name)
      .filter((n): n is string => Boolean(n));
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, procedures: names, source: source || "quote-form" }),
    }).catch(() => {});
  }

  const canNext = step === 0 ? picked.length > 0 : step === 1 ? true : form.firstName && form.email;

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] bg-white p-10 text-center shadow-soft ring-1 ring-ink/5"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-gradient text-white">
          <PartyPopper size={30} />
        </span>
        <h3 className="mt-6 font-display text-3xl text-ink">Thank you, {form.firstName || "there"}!</h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-muted">
          Your enquiry is on its way. A BBDV coordinator in Melbourne will be in touch within 48 hours with a personalised quote in Australian dollars. For anything sooner, message us on WhatsApp.
        </p>
        <a
          href={contact.primaryWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 font-medium text-white"
        >
          <MessageCircle size={18} /> Chat on WhatsApp now
        </a>

        {lead && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-ink/15 bg-cream/60 p-5 text-left"
          >
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
              <Zap size={13} className="text-magenta" /> Sample: how the live system handles this lead
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tierStyles[lead.tier])}>
                {lead.tier} lead
              </span>
              <span className="text-xs text-muted">Priority score {lead.score}/100</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{lead.action}</p>
            <p className="mt-3 text-[0.7rem] leading-relaxed text-muted">
              Scored automatically from procedure, budget, timeframe and contact preference, so the right leads are called first.
            </p>
          </motion.div>
        )}

        <p className="mt-5 text-xs text-muted">
          This is a sample form. In the live site, submissions post to your lead inbox and dashboard, and trigger an instant WhatsApp and email reply.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-ink/5">
      {/* progress */}
      <div className="flex items-center gap-2 border-b border-ink/8 px-6 py-5 sm:px-8">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors",
                i < step ? "bg-brand-gradient text-white" : i === step ? "bg-ink text-white" : "bg-cream text-muted"
              )}
            >
              {i < step ? <Check size={16} /> : i + 1}
            </span>
            <span className={cn("hidden text-sm font-medium sm:block", i === step ? "text-ink" : "text-muted")}>{s}</span>
            {i < steps.length - 1 && <span className="ml-1 hidden h-px flex-1 bg-ink/10 sm:block" />}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) {
            if (canNext) setStep(step + 1);
          } else if (canNext) {
            setLead(
              scoreLead({
                procedures: picked,
                timeframe: form.timeframe,
                budget: form.budget,
                contactMethod: form.contactMethod,
                phone: form.phone,
              })
            );
            setDone(true);
            saveLead();
          }
        }}
        className="p-6 sm:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="space-y-7">
                <p className="text-muted">Select the procedures you are interested in. You can choose more than one.</p>
                {categories.map((c) => (
                  <div key={c.slug}>
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-magenta">{c.label}</h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {proceduresByCategory(c.slug).map((p) => {
                        const on = picked.includes(p.slug);
                        return (
                          <button
                            type="button"
                            key={p.slug}
                            onClick={() => toggle(p.slug)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                              on ? "border-magenta bg-blush/60 text-ink" : "border-ink/12 text-ink/70 hover:border-magenta/40"
                            )}
                          >
                            <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-md border", on ? "border-magenta bg-magenta text-white" : "border-ink/25")}>
                              {on && <Check size={13} />}
                            </span>
                            {p.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Which country are you travelling from?">
                    <select value={form.country} onChange={(e) => set("country", e.target.value)} className={inputCls}>
                      {markets.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="State or region">
                    <input value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="e.g. Victoria" className={inputCls} />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="When are you hoping to travel?">
                    <select value={form.timeframe} onChange={(e) => set("timeframe", e.target.value)} className={inputCls}>
                      {["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Approximate budget (AUD)">
                    <select value={form.budget} onChange={(e) => set("budget", e.target.value)} className={inputCls}>
                      {["Not sure yet", "Under $5,000", "$5,000 to $10,000", "$10,000 to $20,000", "$20,000+"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Anything you would like us to know? (optional)">
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={4}
                    placeholder="Your goals, questions, or anything that would help us help you."
                    className={inputCls}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First name *">
                    <input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} required className={inputCls} />
                  </Field>
                  <Field label="Last name">
                    <input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputCls} />
                  </Field>
                </div>
                <Field label="Email *">
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputCls} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Phone / WhatsApp">
                    <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+61 ..." className={inputCls} />
                  </Field>
                  <Field label="Preferred way to be contacted">
                    <select value={form.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} className={inputCls}>
                      {["WhatsApp", "Phone call", "Email"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="How did you hear about us?">
                  <select value={form.heard} onChange={(e) => set("heard", e.target.value)} className={inputCls}>
                    {["Google search", "Facebook or Instagram", "A friend or family member", "YouTube", "Other"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                {picked.length > 0 && (
                  <p className="text-sm text-muted">
                    Interested in: <span className="text-ink">{picked.length}</span> procedure{picked.length > 1 ? "s" : ""}.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink">
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3 text-sm font-medium text-white shadow-[0_14px_30px_-12px_rgba(194,24,91,0.6)] transition-opacity disabled:opacity-40"
          >
            {step < 2 ? "Continue" : "Request my free quote"} <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-magenta focus:bg-white focus:ring-2 focus:ring-magenta/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
