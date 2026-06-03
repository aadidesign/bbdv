"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  Send,
  Sparkles,
  Bot,
  Zap,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Lock,
  HelpCircle,
  FileText,
  Compass,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { contact } from "@/content/site";
import { procedures } from "@/content/procedures";
import { scoreLead, type LeadScore } from "@/lib/lead-score";
import { parseQuoteCue, CHAT_TIMEFRAMES, type QuoteCue } from "@/lib/chat-lead";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const ENDPOINT = process.env.NEXT_PUBLIC_CHATBOT_URL || "/api/chat";

const GREETING =
  "Hi, I am Aria, your BBDV concierge. I can help with procedures, pricing, the India journey and booking, and put together a free quote for you. What would you like to know?";

const SUGGESTIONS: { label: string; icon: typeof HelpCircle }[] = [
  { label: "How much does a tummy tuck cost?", icon: Wallet },
  { label: "Is surgery in India safe?", icon: ShieldCheck },
  { label: "Get a free quote", icon: FileText },
  { label: "How do I get started?", icon: Compass },
];

const tierStyles: Record<string, string> = {
  Hot: "bg-brand-gradient text-white",
  Warm: "bg-orange/15 text-orange",
  Cool: "bg-ink/10 text-ink",
};

const NOT_SURE = "Not sure yet";

/* Small gradient-ringed AI assistant avatar. */
function AriaAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const dims = size === "sm" ? "h-7 w-7" : "h-11 w-11";
  const icon = size === "sm" ? 15 : 22;
  // On dark header it sits on a translucent disc; beside chat bubbles it gets the brand gradient.
  const skin = size === "sm" ? "bg-brand-gradient text-white ring-white/40" : "bg-white/20 text-white ring-white/30";
  return (
    <span className={cn("relative grid shrink-0 place-items-center rounded-full ring-1", dims, skin)}>
      <Bot size={icon} strokeWidth={2.2} />
    </span>
  );
}

/* Renders the assistant's light markdown (bold + bullets) so visitors never see raw
   asterisks. User messages stay plain. */
function renderInline(text: string, keyBase: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) return <strong key={`${keyBase}-${i}`} className="font-semibold text-ink">{m[1]}</strong>;
    // Drop any stray, unmatched asterisks the model might leave behind.
    return <span key={`${keyBase}-${i}`}>{part.replace(/\*/g, "")}</span>;
  });
}

function FormattedMessage({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={key} className="list-disc space-y-0.5 pl-4 marker:text-magenta">
        {bullets.map((li, i) => (
          <li key={i}>{renderInline(li, `${key}-${i}`)}</li>
        ))}
      </ul>
    );
    bullets = [];
  };

  content.split("\n").forEach((line, i) => {
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1]);
      return;
    }
    flush(`ul-${i}`);
    if (line.trim()) blocks.push(<p key={`p-${i}`}>{renderInline(line, `p-${i}`)}</p>);
  });
  flush("ul-end");

  return <div className="space-y-1.5">{blocks}</div>;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tip, setTip] = useState(false);
  // Lead capture lives in the front end, so it works even before the Gemini key is set.
  const [capture, setCapture] = useState<QuoteCue | null>(null);
  const [lead, setLead] = useState<{ score: LeadScore; firstName: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const procedureNames = useMemo(() => procedures.map((p) => p.name), []);

  // The nudge shows once shortly after load and auto-dismisses, so it never sits
  // stuck over the page. Opening the chat (by any means) silences it for the rest
  // of the session; if the visitor never opens it, it may reappear after a long gap.
  const tipEngaged = useRef(false);
  function dismissTip() {
    tipEngaged.current = true;
    setTip(false);
    try {
      sessionStorage.setItem("bbdv_chat_engaged", "1");
    } catch {}
  }
  useEffect(() => {
    try {
      if (sessionStorage.getItem("bbdv_chat_engaged")) tipEngaged.current = true;
    } catch {}
    if (tipEngaged.current) return;
    let hide: ReturnType<typeof setTimeout>;
    const show = () => {
      if (tipEngaged.current) return;
      setTip(true);
      hide = setTimeout(() => setTip(false), 7000);
    };
    const first = setTimeout(show, 4500);
    const repeat = setInterval(show, 90000);
    return () => {
      clearTimeout(first);
      clearTimeout(hide);
      clearInterval(repeat);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, capture, lead]);

  // Free-tier chatbot hosting (Render) spins down when idle, so the first request
  // after a nap can fail with a cold start. Warm it the moment the panel opens.
  useEffect(() => {
    if (!open || !/^https?:/i.test(ENDPOINT)) return;
    const health = ENDPOINT.replace(/\/(api\/)?chat\/?$/i, "/health");
    fetch(health, { mode: "no-cors" }).catch(() => {});
  }, [open]);

  // Match a procedure name Aria mentioned to one of our real options.
  function matchProcedure(name: string): string {
    if (!name) return NOT_SURE;
    const n = name.toLowerCase();
    return (
      procedureNames.find((p) => p.toLowerCase() === n) ||
      procedureNames.find((p) => n.includes(p.toLowerCase()) || p.toLowerCase().includes(n)) ||
      NOT_SURE
    );
  }

  function openCapture(cue: QuoteCue) {
    setLead(null);
    setCapture({ procedure: matchProcedure(cue.procedure), timeframe: cue.timeframe || "" });
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    // Let visitors open the quote form straight from the suggestion or a typed request.
    if (/^get a (free )?quote$/i.test(content)) {
      setMessages((m) => [
        ...m,
        { role: "user", content },
        { role: "assistant", content: "Wonderful. Leave a few details below and a Melbourne coordinator will send your free quote in Australian dollars, usually within 48 hours." },
      ]);
      setInput("");
      openCapture({ procedure: "", timeframe: "" });
      return;
    }

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const body = JSON.stringify({ messages: next.slice(-12) });
      const post = async () => {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      };

      // A sleeping free-tier service returns errors while it cold-starts (~30-60s).
      // Keep the typing indicator showing and quietly retry until it wakes, rather
      // than surfacing an error mid-boot.
      let data;
      const maxAttempts = 15;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          data = await post();
          break;
        } catch (err) {
          if (attempt === maxAttempts - 1) throw err;
          await new Promise((r) => setTimeout(r, 4000));
        }
      }

      const raw = data.reply || data.error || "Sorry, I had trouble responding. Please try WhatsApp.";
      const { clean, cue } = parseQuoteCue(String(raw));
      setMessages((m) => [...m, { role: "assistant", content: clean || "Happy to help with that." }]);
      if (cue) openCapture(cue);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Aria is just waking up. Please send that again in a few seconds, or reach our team on WhatsApp and we will help right away." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(form: { firstName: string; channel: string; procedure: string; timeframe: string }) {
    const looksPhone = form.channel.replace(/\D/g, "").length >= 7;
    const procedures = form.procedure && form.procedure !== NOT_SURE ? [form.procedure] : [];
    const contactMethod = looksPhone ? "WhatsApp" : "Email";

    // Show the result instantly with a client-side score, then persist.
    const score = scoreLead({ procedures, timeframe: form.timeframe || "Just researching", budget: "Not sure yet", contactMethod, phone: looksPhone ? form.channel : "" });
    setCapture(null);
    setLead({ score, firstName: form.firstName });

    // Save the lead (and the conversation that produced it) to the lead store.
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "chat",
          firstName: form.firstName,
          email: looksPhone ? "" : form.channel,
          phone: looksPhone ? form.channel : "",
          contactMethod,
          procedures,
          timeframe: form.timeframe,
          transcript: messages,
        }),
      });
      const data = await res.json();
      if (data?.score) setLead({ score: data.score, firstName: form.firstName });
    } catch {
      // Persistence is best-effort from the visitor's point of view; the live
      // site also mirrors leads to WhatsApp/email so nothing is ever lost.
    }
  }

  return (
    <>
      {/* launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {tip && !open && (
            <motion.button
              onClick={() => { setOpen(true); setTip(false); }}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-60 rounded-2xl glass p-3.5 text-left shadow-soft"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Sparkles size={14} className="text-magenta" /> Questions about your journey?
              </span>
              <span className="mt-1 block text-xs text-muted">Ask Aria, our AI assistant — replies in seconds.</span>
            </motion.button>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat assistant" : "Open chat assistant"}
          className="relative grid h-15 w-15 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_14px_34px_-10px_rgba(194,24,91,0.55)] transition-transform hover:scale-105 active:scale-95"
        >
          {!open && <span className="animate-calm-pulse pointer-events-none absolute inset-0 rounded-full bg-magenta/40" />}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot size={26} strokeWidth={2.2} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Aria, BBDV concierge"
            className="fixed bottom-24 right-3 z-40 flex h-[70dvh] max-h-[min(660px,calc(100dvh-7rem))] w-[calc(100vw-1.5rem)] max-w-[400px] flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_80px_-20px_rgba(27,16,20,0.45)] ring-1 ring-ink/10 sm:right-6 sm:w-[calc(100vw-2rem)]"
          >
            {/* header */}
            <div className="noise relative overflow-hidden bg-brand-gradient px-5 pb-5 pt-4 text-white">
              {/* decorative glow orbs */}
              <span className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
              <span className="pointer-events-none absolute -bottom-12 left-10 h-24 w-24 rounded-full bg-amber/30 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <AriaAvatar />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">Aria</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/85">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300/80" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
                    </span>
                    BBDV AI Assistant · online
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 text-white/90 transition-colors hover:bg-white/25"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-blush/40 p-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={m.role === "user" ? "flex justify-end" : "flex items-end justify-start gap-2"}
                >
                  {m.role === "assistant" && <AriaAvatar size="sm" />}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-gradient px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm"
                        : "max-w-[78%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-sm ring-1 ring-ink/5"
                    }
                  >
                    {m.role === "assistant" ? <FormattedMessage content={m.content} /> : m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex items-end justify-start gap-2">
                  <AriaAvatar size="sm" />
                  <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-ink/5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-magenta/60" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* inline lead capture, opened by Aria or by the visitor */}
              {capture && !lead && (
                <CaptureCard
                  cue={capture}
                  procedureNames={procedureNames}
                  onCancel={() => setCapture(null)}
                  onSubmit={submitLead}
                />
              )}

              {/* scored confirmation */}
              {lead && <LeadDone lead={lead} />}

              {messages.length <= 1 && !loading && !capture && (
                <div className="pt-1">
                  <p className="mb-2 flex items-center gap-1.5 px-1 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                    <Sparkles size={11} className="text-magenta" /> Popular questions
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => send(label)}
                        className="group flex items-center gap-2.5 rounded-2xl border border-magenta/15 bg-white px-3.5 py-2.5 text-left text-sm text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-magenta/40 hover:shadow-md"
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush text-magenta transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                          <Icon size={14} />
                        </span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="border-t border-ink/10 bg-white px-3 pt-3"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-magenta/40 focus-within:bg-white focus-within:ring-4 focus-within:ring-magenta/10">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about a procedure, price or the trip..."
                  className="flex-1 bg-transparent py-1 text-sm text-ink outline-none placeholder:text-muted/70"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-white shadow-sm transition-all hover:scale-105 disabled:scale-100 disabled:bg-none disabled:bg-ink/10 disabled:text-muted disabled:shadow-none"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
            <div className="flex items-center justify-between gap-3 bg-white px-4 pb-3 pt-2.5 text-xs">
              <button
                onClick={() => { setLead(null); openCapture({ procedure: "", timeframe: "" }); }}
                className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3 py-1.5 font-medium text-magenta transition-colors hover:bg-magenta hover:text-white"
              >
                <FileText size={13} /> Get a free quote
              </button>
              <a
                href={contact.primaryWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-cream hover:text-magenta"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CaptureCard({
  cue,
  procedureNames,
  onSubmit,
  onCancel,
}: {
  cue: QuoteCue;
  procedureNames: string[];
  onSubmit: (f: { firstName: string; channel: string; procedure: string; timeframe: string }) => void;
  onCancel: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [channel, setChannel] = useState("");
  const [procedure, setProcedure] = useState(cue.procedure || NOT_SURE);
  const [timeframe, setTimeframe] = useState(cue.timeframe || CHAT_TIMEFRAMES[0]);
  const ready = firstName.trim() && channel.trim();

  const field =
    "w-full rounded-xl border border-ink/15 bg-cream/60 px-3 py-2 text-sm text-ink outline-none transition focus:border-magenta focus:bg-white focus:ring-2 focus:ring-magenta/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-magenta/15"
    >
      <div className="bg-brand-gradient-soft px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Sparkles size={15} className="text-magenta" /> Your free quote
        </p>
        <p className="mt-0.5 text-xs text-muted">A coordinator in Melbourne replies in AUD, usually within 48 hours. No obligation.</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); if (ready) onSubmit({ firstName, channel, procedure, timeframe }); }}
        className="space-y-2.5 p-4"
      >
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className={field} />
        <input value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="WhatsApp number or email" className={field} />
        <select value={procedure} onChange={(e) => setProcedure(e.target.value)} className={field} aria-label="Procedure of interest">
          <option>{NOT_SURE}</option>
          {procedureNames.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className={field} aria-label="Timeframe">
          {CHAT_TIMEFRAMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <div className="flex items-center gap-2 pt-0.5">
          <button type="button" onClick={onCancel} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-cream" aria-label="Back">
            <ArrowLeft size={15} />
          </button>
          <button
            type="submit"
            disabled={!ready}
            className="flex-1 rounded-full bg-brand-gradient px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-40"
          >
            Request my free quote
          </button>
        </div>
        <p className="flex items-center justify-center gap-1.5 pt-0.5 text-[0.7rem] text-muted">
          <Lock size={11} /> Your details are private and never shared.
        </p>
      </form>
    </motion.div>
  );
}

function LeadDone({ lead }: { lead: { score: LeadScore; firstName: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5"
    >
      <p className="flex items-center gap-2 font-display text-base text-ink">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-gradient text-white">
          <ShieldCheck size={15} />
        </span>
        Thank you, {lead.firstName || "there"}!
      </p>
      <p className="mt-2 text-sm text-muted">
        Your enquiry is on its way. A BBDV coordinator in Melbourne will be in touch shortly with your quote in Australian dollars.
      </p>
      <a
        href={contact.primaryWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
      >
        <MessageCircle size={15} /> Chat on WhatsApp now
      </a>

      <div className="mt-3 rounded-xl border border-dashed border-ink/15 bg-cream/60 p-3">
        <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
          <Zap size={11} className="text-magenta" /> Sample: how the live system handles this lead
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className={cn("rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold", tierStyles[lead.score.tier])}>
            {lead.score.tier} lead
          </span>
          <span className="text-[0.7rem] text-muted">Score {lead.score.score}/100</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-ink/75">{lead.score.action}</p>
      </div>
    </motion.div>
  );
}
