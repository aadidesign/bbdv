# BBDV — Body By Design Vacations

A premium, conversion-focused sample website for **Body By Design Vacations** (BBDV), a Melbourne based medical tourism brand that arranges cosmetic and plastic surgery holidays to Bangalore, India, performed by the board-certified surgeons of **Aesthetics Plus Clinics**.

Built with Next.js 16, Tailwind v4, Motion, GSAP-style scroll reveals, Embla, and a React Three Fiber WebGL hero accent. Includes a working **Gemini-powered AI concierge ("Aria")** with a custom knowledge base and guardrails.

## Repo layout

```
/site        Next.js 16 website (deploy to Vercel)
/chatbot     Standalone Gemini chatbot service (deploy to Render)
/research    Discovery dossier, scraped content, reference analysis, screenshots
/scripts     Playwright scrapers + stock image fetcher used to build the sample
```

## Run locally

```bash
# 1) Website
cd site
npm install
cp .env.example .env.local   # optional: add a Gemini key for the built-in chat route
npm run dev                  # http://localhost:3000

# 2) Chatbot service (optional locally; the site has a built-in fallback route)
cd ../chatbot
npm install
cp .env.example .env         # add GEMINI_API_KEY
npm start                    # http://localhost:8787  (health: /health)
```

## The chatbot (two ways to run it)

The chat widget calls `NEXT_PUBLIC_CHATBOT_URL` if set, otherwise the built-in Next.js `/api/chat` route.

- **Recommended (matches the intended architecture):** deploy `/chatbot` to **Render** and set `NEXT_PUBLIC_CHATBOT_URL` on the site to the Render URL.
- **Simplest:** leave `NEXT_PUBLIC_CHATBOT_URL` blank and set `GEMINI_API_KEY` on the site; the built-in route handles chat on Vercel.

Get a free Gemini API key at https://aistudio.google.com/apikey. Until a key is added, the assistant returns a friendly fallback that points to WhatsApp, so nothing ever looks broken.

## Deploy

### Website → Vercel
1. Import the repo, set **Root Directory = `site`**.
2. Add env vars: `NEXT_PUBLIC_CHATBOT_URL` (your Render URL) or `GEMINI_API_KEY` for the built-in route.
3. Deploy. `metadataBase` is set from `site.url` in `src/content/site.ts` — update it to the final domain.

### Chatbot → Render
1. New Web Service, **Root Directory = `chatbot`** (or use `chatbot/render.yaml`).
2. Build `npm install`, Start `npm start`, health check `/health`.
3. Add env var `GEMINI_API_KEY`. Set `ALLOWED_ORIGINS` to your Vercel domain for production.

## What is real vs. sample

- **Real:** brand name, logo direction and palette (from the BBDV Facebook logo), all clinic content, three named surgeons and credentials, stats, the patient journey, 7 patient testimonials, FAQs, embedded YouTube videos, and all contact details (Aesthetics Plus + the Melbourne BBDV line +61 411 888 504).
- **Theme-matched stock photography** stands in for hero, category, procedure and recovery imagery. Swap with the clinic's own photos when available (see checklist below).
- **Lead capture is wired (live):** the AI concierge and the multi-step quote form both capture the visitor's details, score the lead, and persist it. See below.
- **UI only (per sample scope):** the Contact form and the admin dashboard UI are not built yet. The dashboard's data API already exists, so the dashboard is a front end over `GET /api/leads`.

## Lead capture and storage

Both lead sources, **Aria (the chat concierge)** and the **multi-step Get a Quote form**, post to `POST /api/leads`. Each lead is:
- validated (a name plus at least one contact method),
- scored server-side into **Hot / Warm / Cool** with a routing action (`src/lib/lead-score.ts`),
- saved with an id, timestamp and `status: "new"` via the store in `src/lib/leads-store.ts`.

Chat leads also store the **conversation transcript** that produced the enquiry.

- **Read API (for the future admin dashboard):** `GET /api/leads` returns all leads, newest first. Protect it in production by setting `ADMIN_TOKEN` (sent as the `x-admin-token` header or `?token=`).
- **Where it is saved:** a local JSON file at `LEADS_FILE` (default `data/leads.json`). This works in local dev and on a host with a persistent disk (Render). **For Vercel production, swap the internals of `src/lib/leads-store.ts` for a managed store** (Supabase / Postgres / Vercel KV). Nothing else changes, because the app only calls `saveLead()` and `listLeads()`.

> The admin dashboard UI is intentionally not built yet. When it is, it reads `GET /api/leads` and advances each lead's `status` (new → contacted → consult → booked → lost).

## Asset replacement checklist (for launch)
- [ ] Real before/after photography on `/patient-stories` (currently representative images).
- [ ] Real surgeon headshots in `/public/images/surgeons/` (currently stock portraits).
- [ ] Any clinic-supplied hero/procedure photography in `/public/images/`.
- [ ] Confirm indicative AUD prices in `site/src/content/procedures.ts` with the business.
- [ ] Swap `src/lib/leads-store.ts` from the file store to a managed DB for Vercel, and set `ADMIN_TOKEN`.
- [ ] Add email/WhatsApp notifications on new leads, and build the admin dashboard over `GET /api/leads`.
- [ ] Wire the Contact form (it is still UI only) the same way as the quote form.
- [ ] Update `site.url` and re-run for correct sitemap/OG metadata.

## Tech notes
- Brand tokens and signature CSS utilities: `site/src/app/globals.css`.
- All copy/content is centralised in `site/src/content/*` for easy editing.
- The chatbot knowledge base mirrors the site content: `site/src/lib/chat-kb.ts` and `chatbot/kb.js`.
