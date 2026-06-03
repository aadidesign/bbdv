"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Check } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-magenta focus:bg-white focus:ring-2 focus:ring-magenta/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-ink/5">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-white"><Check size={28} /></span>
        <h3 className="mt-5 font-display text-2xl text-ink">Message sent</h3>
        <p className="mt-2 text-sm text-muted">Thanks for reaching out. A coordinator will reply within 48 hours. This is a sample form; live submissions are delivered to your inbox.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink/5 sm:p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block"><span className="mb-1.5 block text-sm font-medium text-ink">Name *</span><input required className={inputCls} /></label>
          <label className="block"><span className="mb-1.5 block text-sm font-medium text-ink">Phone / WhatsApp</span><input className={inputCls} placeholder="+61 ..." /></label>
        </div>
        <label className="block"><span className="mb-1.5 block text-sm font-medium text-ink">Email *</span><input type="email" required className={inputCls} /></label>
        <label className="block"><span className="mb-1.5 block text-sm font-medium text-ink">How can we help?</span><textarea rows={5} className={inputCls} placeholder="Tell us a little about what you are considering." /></label>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3 font-medium text-white shadow-[0_14px_30px_-12px_rgba(194,24,91,0.6)]">
          Send message <Send size={16} />
        </button>
      </div>
    </form>
  );
}
