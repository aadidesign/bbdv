// Lead scoring for the Get-a-Quote funnel.
// In the live site this runs server-side on submit so coordinators know who to
// call first (see the Lead Generation Playbook, section 5). It is a pure
// function of what the lead tells us: timeframe, budget, procedure intent and
// how they want to be contacted. No personal data leaves the form for scoring.

export type LeadInput = {
  procedures: string[];
  timeframe: string;
  budget: string;
  contactMethod: string;
  phone?: string;
};

export type LeadTier = "Hot" | "Warm" | "Cool";

export type LeadScore = {
  score: number; // 0 to 100
  tier: LeadTier;
  action: string; // what the live system would do with this lead
};

const TIMEFRAME_POINTS: Record<string, number> = {
  "Within 3 months": 40,
  "3 to 6 months": 28,
  "6 to 12 months": 16,
  "Just researching": 6,
};

const BUDGET_POINTS: Record<string, number> = {
  "$20,000+": 25,
  "$10,000 to $20,000": 22,
  "$5,000 to $10,000": 18,
  "Under $5,000": 10,
  "Not sure yet": 8,
};

export function scoreLead(input: LeadInput): LeadScore {
  let score = 0;

  score += TIMEFRAME_POINTS[input.timeframe] ?? 10;
  score += BUDGET_POINTS[input.budget] ?? 8;

  // Procedure intent: picking something specific is a strong signal.
  if (input.procedures.length >= 1) score += 18;
  if (input.procedures.length >= 2) score += 6; // multi-procedure interest, higher value

  // Reachability: a phone number plus a fast channel means we can act now.
  if (input.phone && input.phone.replace(/\D/g, "").length >= 7) score += 6;
  if (input.contactMethod === "WhatsApp" || input.contactMethod === "Phone call") score += 5;

  score = Math.min(100, score);

  if (score >= 75) {
    return {
      score,
      tier: "Hot",
      action:
        "Routed to Shree for a WhatsApp message and call within minutes, while the patient is still on the page.",
    };
  }
  if (score >= 50) {
    return {
      score,
      tier: "Warm",
      action:
        "Personal reply the same day, then added to the nurture sequence with their matching patient story.",
    };
  }
  return {
    score,
    tier: "Cool",
    action:
      "Sent the indicative quote and helpful content, then nurtured over the coming weeks until ready to consult.",
  };
}
