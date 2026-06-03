import { NextResponse } from "next/server";
import { scoreLead } from "@/lib/lead-score";
import { saveLead, listLeads, type LeadInput } from "@/lib/leads-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

// POST /api/leads -> capture, score and persist a lead (from the chat or the quote form).
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const firstName = clean(body.firstName, 80);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);

  // Minimum viable lead: a name and at least one way to reach them.
  if (!firstName || (!email && !phone)) {
    return NextResponse.json({ ok: false, error: "Name and a contact method are required." }, { status: 422 });
  }

  const procedures = Array.isArray(body.procedures)
    ? (body.procedures as unknown[]).map((p) => clean(p, 80)).filter(Boolean).slice(0, 30)
    : [];

  const transcript = Array.isArray(body.transcript)
    ? (body.transcript as { role?: unknown; content?: unknown }[])
        .map((m) => ({ role: clean(m.role, 20) || "user", content: clean(m.content, 4000) }))
        .filter((m) => m.content)
        .slice(-40)
    : undefined;

  const input: LeadInput = {
    source: clean(body.source, 60) || "quote-form",
    firstName,
    lastName: clean(body.lastName, 80),
    email,
    phone,
    contactMethod: clean(body.contactMethod, 40) || (phone ? "WhatsApp" : "Email"),
    country: clean(body.country, 80),
    state: clean(body.state, 80),
    procedures,
    timeframe: clean(body.timeframe, 60),
    budget: clean(body.budget, 60),
    notes: clean(body.notes, 4000),
    heard: clean(body.heard, 120),
    transcript,
  };

  // Score on the server so it is authoritative and consistent with the form.
  const score = scoreLead({
    procedures: input.procedures,
    timeframe: input.timeframe || "Just researching",
    budget: input.budget || "Not sure yet",
    contactMethod: input.contactMethod || "Email",
    phone: input.phone,
  });

  try {
    const lead = await saveLead(input, score);
    return NextResponse.json({ ok: true, id: lead.id, score });
  } catch (e) {
    console.error("lead save failed", e);
    // Do not block the visitor's success experience if persistence hiccups.
    return NextResponse.json({ ok: false, error: "Could not save right now.", score }, { status: 200 });
  }
}

// GET /api/leads -> data source for the future admin dashboard.
// Protected by ADMIN_TOKEN when set (header `x-admin-token` or `?token=`).
// No dashboard UI is built yet; this is only the read API it will consume.
export async function GET(req: Request) {
  const required = process.env.ADMIN_TOKEN;
  if (required) {
    const url = new URL(req.url);
    const provided = req.headers.get("x-admin-token") || url.searchParams.get("token") || "";
    if (provided !== required) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }
  const leads = await listLeads();
  return NextResponse.json({ ok: true, count: leads.length, leads });
}
