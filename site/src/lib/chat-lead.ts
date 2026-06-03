// Lead capture for the chat concierge.
// Aria (the assistant) emits a hidden cue on a final line when a visitor is ready
// for a quote or consultation, e.g.  [[QUOTE procedure="Tummy Tuck" timeframe="Within 3 months"]]
// The widget parses it, hides it from the visible message, and opens an inline
// capture card pre-filled with what Aria already worked out. The cue is optional:
// a persistent "Get my free quote" action gives the same flow if the model (or the
// API key) is not available, so lead capture never depends on the LLM.

export type QuoteCue = { procedure: string; timeframe: string };

const CUE_RE = /\[\[\s*QUOTE\b([^\]]*)\]\]/i;

function attr(raw: string, key: string): string {
  const m = raw.match(new RegExp(`${key}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? m[1].trim() : "";
}

/** Strip the capture cue from an assistant message and return what it asked for. */
export function parseQuoteCue(text: string): { clean: string; cue: QuoteCue | null } {
  const match = text.match(CUE_RE);
  if (!match) return { clean: text, cue: null };
  const raw = match[1] || "";
  const clean = text.replace(CUE_RE, "").replace(/\n{3,}/g, "\n\n").trim();
  return {
    clean,
    cue: { procedure: attr(raw, "procedure"), timeframe: attr(raw, "timeframe") },
  };
}

export const CHAT_TIMEFRAMES = [
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "Just researching",
];
