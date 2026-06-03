// Server-only lead store.
//
// This is the single place leads are persisted, so the future admin dashboard
// has one source to read from. For the sample it writes newline-delimited JSON
// to a local file (LEADS_FILE, default ./data/leads.json), which works in local
// dev and on a host with a persistent disk (e.g. Render).
//
// AT LAUNCH: swap the read/write internals here for a managed store
// (Supabase / Postgres / Vercel KV / Airtable). Nothing else in the app changes,
// because the rest of the code only calls saveLead() and listLeads().

// NOTE: server-only module. Only import from server code (route handlers), never
// from a "use client" component, since it touches the filesystem.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import type { LeadScore } from "./lead-score";

export type LeadSource = "chat" | "quote-form" | string;

export type LeadInput = {
  source: LeadSource;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  contactMethod?: string;
  country?: string;
  state?: string;
  procedures: string[];
  timeframe?: string;
  budget?: string;
  notes?: string;
  heard?: string;
  /** For chat leads: the conversation that produced the enquiry. */
  transcript?: { role: string; content: string }[];
};

export type StoredLead = LeadInput & {
  id: string;
  createdAt: string; // ISO 8601
  status: "new"; // the dashboard advances this: new -> contacted -> consult -> booked -> lost
  score: number;
  tier: LeadScore["tier"];
  action: string;
};

const FILE = resolve(process.cwd(), process.env.LEADS_FILE || "data/leads.json");

// Serialise writes so concurrent submits never corrupt the file.
let queue: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

async function readAll(): Promise<StoredLead[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

export async function saveLead(
  input: LeadInput,
  score: { score: number; tier: LeadScore["tier"]; action: string }
): Promise<StoredLead> {
  return withLock(async () => {
    const leads = await readAll();
    const lead: StoredLead = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
      score: score.score,
      tier: score.tier,
      action: score.action,
    };
    leads.push(lead);
    await mkdir(dirname(FILE), { recursive: true });
    await writeFile(FILE, JSON.stringify(leads, null, 2), "utf8");
    return lead;
  });
}

/** For the future admin dashboard. Newest first. */
export async function listLeads(): Promise<StoredLead[]> {
  const leads = await readAll();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
