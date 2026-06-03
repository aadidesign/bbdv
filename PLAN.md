# BBDV — Cosmetic Surgery Tours to India — Build Plan (v1, for review)

> Status: **PLANNING — no site code will be written until you approve this.**
> Scaffolding done so far (reversible): empty Next.js 16 app in `site/`, animation libs installed, Playwright installing for scraping.

---

## 0. Who / What / Why (locked)

- **BBDV — Cosmetic Surgery Tours To India**: a **Melbourne, Australia** medical-tourism brand (contact Shree, +61 411 888 504). No site yet. Job of the site: look world-class, run fast, and **capture leads** (enquiry/quote forms, mail capture, WhatsApp, working chatbot).
- **Aesthetics Plus Clinics (Bangalore)**: the **accredited India surgical partner** that performs the procedures. We pull real content/assets from aestheticsplus.in.
- **Model** (same as the two reference sites, destination = India): bring AU/international patients to India for world-class, affordable cosmetic surgery + a guided recovery getaway.
- **Confirmed decisions:** Brand lead = BBDV, Aesthetics Plus featured as the clinical partner · Audience = international, **Australia-first** (AUD, "save vs Australia") · Pricing = **indicative "from" AUD + savings**, marked indicative · WhatsApp is a first-class CTA · Deploy-ready, you plug Gemini key + connect Vercel/Render at the end.

---

## Phase 0 — Deep Discovery & Asset Scraping (Playwright) [DO FIRST]

**0.1 Aesthetics Plus full crawl (`aestheticsplus.in`)**
- Enumerate every internal URL (nav, footer, service submenus, sitemap.xml).
- Per page: extract headings, body copy, service descriptions, FAQs, stats, awards, doctor bios/credentials.
- Download brand assets: **logo** (header/footer SVG/PNG), favicon, hero/section images, gallery photos, before/after where public.
- Capture **video** embeds (YouTube IDs, self-hosted mp4 URLs).
- Scrape **testimonials** (text, names, ratings) and any Google-review snippets.
- Capture social links (FB, IG, YouTube, LinkedIn, X) + exact contact (phone, email, hours, address, map).
- Output: `research/aesthetics-plus/` → `content.json`, `pages.md`, `/assets/*` (downloaded), `assets-manifest.json`.

**0.2 Reference-site analysis (design/flow only, NOT branding/colors)**
- `restoredbeautygetaways.com` and `destinationbeauty.com`.
- Crawl each page; record: full sitemap/IA, section order per page, nav/footer structure, every CTA + form, trust-signal patterns (stats, reviews, accreditations), pricing/quote flow.
- Capture **animation behaviour**: scroll-reveal patterns, sliders/carousels (3D?), parallax, sticky/pinned sections, hover effects, hero treatment, page-transition style. Save full-page **screenshots** + notes.
- Output: `research/reference/<site>/` → `ia.md`, `sections.md`, `animations.md`, `/screenshots/*`.
- Result feeds a **"replicate the experience, not the brand"** mapping doc: which effect goes where in BBDV.

**0.3 Facebook (`fb.com/share/1DsG…`, `…1Emg…`)** — *honest constraint*
- Attempt public scrape via Playwright. FB login-walls most content; I expect to retrieve only public page name/about/profile image/handful of public posts at best.
- Output what is retrievable to `research/facebook/`. **If blocked, I'll flag it and we proceed with website + Google + IG data** (I will not fabricate FB content).

**0.4 Component-library harvest** (`skiper-ui`, `uilora`, `watermelon ui`, `chanhdai`, `wrappixel`)
- Fetch component source where openly available (shadcn-style registry JSON / public GitHub / docs).
- Catalogue signature components worth adapting (e.g. skiper-ui 3D card stack / image-trail, watermelon animated components, chanhdai UI bits).
- **Approach:** adapt + rebrand to BBDV (not blind copy-paste of proprietary/paid assets). Output: `research/components/catalog.md` with what we'll reuse and where.

**0.5 Stock imagery sourcing**
- Curate premium, theme-fit imagery (Indian clinical excellence, surgeon/consult, luxury recovery/travel India, Melbourne→India journey, wellness). Verify each URL loads; **localise into `public/`** so the demo never shows a broken image.
- Before/after slots: use tasteful representative imagery + clear "illustrative, replace with real consented before/afters" note in handoff (medical before/afters can't be fabricated).

**Deliverable of Phase 0:** a research dossier + downloaded real assets + an effect-placement map. I'll summarise findings back to you before building.

---

## Phase 1 — Brand & Design System
- BBDV identity: logo/wordmark (designed, since BBDV has none yet) + Aesthetics Plus co-brand lockup using their real logo.
- Palette (NOT copied from refs): deep teal/forest + champagne-gold accent + ivory/cream + charcoal. Premium clinical-meets-travel.
- Type: editorial serif display (e.g. Fraunces) + clean sans body. Scale, spacing, radius, shadow, glass tokens.
- Tailwind v4 `@theme` tokens + base layer + reusable utility classes (glass, gradient text, etc.).

## Phase 2 — Information Architecture & Content/Copy
- Sitemap (proposed): Home · How It Works · Procedures (hub + per-procedure dynamic pages) · Your Surgery in India (Aesthetics Plus) · Pricing & Savings · Patient Stories/Gallery (before-after) · About · FAQ · Get a Quote/Contact.
- Expert copywriter voice, AU-first, conversion-led, **no em dashes**, human and natural. All real (services, stats, process, finance, safety/accreditation).
- Centralised typed content layer (`src/content/*`) so nothing is hard-coded ad hoc.

## Phase 3 — Animation & Component Strategy (effect → library)
> Your list has 9 libs. Loading all (Theatre.js + Cannon + Rapier + barba + Shery + R3F + GSAP …) bloats the bundle and risks a fragile build = the opposite of premium. **Recommended curated stack that delivers every effect you named, reliably:**
- **GSAP + ScrollTrigger** → parallax storytelling, pinned/scrub sequences, kinetic typography, immersive reveals.
- **Lenis** → buttery smooth scroll.
- **Motion (Framer Motion)** → component/microinteractions, shared-layout, staggered reveals.
- **React Three Fiber + drei (WebGL/Three.js)** → optional hero 3D + "exploding objects that reveal info."
- **Custom GLSL shader (Shery.js-style)** → image distortion/melt + hover ripple, without the unmaintained dependency.
- Signature pieces: **3D draggable slider**, **3D tilt/hover cards**, **before/after drag slider**, **glassmorphism**, **animated counters**, **marquee**, **magnetic buttons**, page-transition reveals.
- *Decision needed:* OK to use this curated stack (recommended), or do you want me to literally wire specific libs (Theatre/Cannon/Rapier/barba/Shery) even at a cost to performance/stability?

## Phase 4 — Global Layout & Shell
- Lenis smooth-scroll provider, sticky glass navbar (mega-menu for procedures), footer, WhatsApp FAB (+61 411 888 504), persistent chatbot launcher, page-transition wrapper, SEO/metadata + OG, favicon.

## Phase 5 — Homepage (the showcase)
- Kinetic hero (optional 3D/WebGL accent) → trust bar → "why India / save vs Australia" → how-it-works journey (parallax) → procedures 3D slider → Aesthetics Plus partner section → savings/pricing teaser → before/after slider → testimonials → safety/accreditation → quote CTA → footer.

## Phase 6 — Inner Pages (all fully designed, responsive)
- How It Works · Procedures hub + dynamic `/procedures/[slug]` (Face/Breast/Body/Men/Non-surgical) · Your Surgery in India (Aesthetics Plus, surgeons, hospital, safety) · Pricing & Savings · Patient Stories + Gallery (before/after, video) · About · FAQ · Get a Quote/Contact.

## Phase 7 — Advanced Animation Pass
- Apply signature effects from Phase 3 across pages per the Phase-0 effect map; tune timing/easing; reduced-motion fallbacks.

## Phase 8 — Chatbot (Gemini, premium) → Render
- Standalone Node/Express service in `chatbot/` (deploy Render): Gemini Flash 2.5 via env key, streaming responses.
- **Knowledge base** built from real BBDV + Aesthetics Plus info (services, procedures, process, medical tourism steps, AUD pricing approach, finance, booking, contact, safety).
- **Guardrails:** stay on services/procedures/booking/medical tourism; **no medical advice/diagnosis** (deflect to consultation); politely redirect off-topic; capture lead intent (name/contact) into chat.
- Polished glass chat widget in the site, calls service via `NEXT_PUBLIC_CHATBOT_URL`; graceful local fallback. (Future dashboard out of scope, but message/lead shape designed so it can plug in later.)

## Phase 9 — Lead-Capture UI (UI only, deploy-ready)
- Multi-step Get-a-Quote form, enquiry forms, email capture, WhatsApp/click-to-call CTAs. Validation + success states, **not backend-wired** (per scope) but structured for easy wiring post-deal.

## Phase 10 — Responsive / Performance / A11y / SEO
- Mobile-first QA on all breakpoints, image optimisation, lazy/Suspense for 3D, reduced-motion, semantic + aria, metadata/sitemap/robots, Lighthouse pass.

## Phase 11 — QA + Build Verification
- `next build` clean, click every nav/button/link, test chatbot end-to-end locally with a key.

## Phase 12 — Deploy Configs + Handoff
- Vercel config (site) + Render config (chatbot), `.env.example`, README + handoff doc: how to add Gemini key, connect domains, and what's UI-only vs live. Asset-replacement checklist (logo, before/afters).

---

## Honest constraints (so there are no surprises)
1. **Playwright works here** (installing now) — I can genuinely scrape aestheticsplus.in + the reference sites and download real images/logo.
2. **Facebook** is login-walled; expect limited public data. I will not fabricate FB content.
3. **Component libraries:** I adapt + rebrand signature components; I don't wholesale-lift proprietary/paid code.
4. **Animation libs:** recommending a curated, performant subset that achieves every effect you listed (see Phase 3 decision).
5. **Deploy + Gemini key + domains** need your accounts/keys; I build everything deploy-ready and hand off.
6. **Before/after medical images** are illustrative/swappable; real consented ones drop in later.

---

## Phase 0 — EXPANDED (re-plan v2): Discovery is gated before any UI code

> Implementation (any site component/page code) does **NOT** begin until this expanded discovery is complete and the findings summarised. Discovery and asset/code scraping is the current work.

**0.A Aesthetics Plus — DONE** ✅ 30 pages crawled, 69 images downloaded, FB logo + brand palette + regional structure extracted. Still to mine: testimonials, doctor bios, stats, awards, FAQs, video embeds from `content.json`.

**0.B Reference-site DEEP scrape (restoredbeautygetaways.com + destinationbeauty.com)** — the core of this re-plan:
- Enumerate **every** page from nav + footer + sitemap.
- Per page capture: full section outline (each section's heading + intro line + role), nav/footer structure, **every CTA** (label + destination), **every form** (fields, labels, placeholders), trust signals, image/video inventory.
- **Detect the actual front-end/animation tech** by inspecting each page's runtime: `script[src]` list + `window` globals (GSAP, ScrollTrigger, ScrollSmoother, Swiper, Lenis/Locomotive, barba.js, Splitting, AOS, ScrollMagic, three.js, Webflow/WordPress signatures), plus DOM markers (`data-scroll`, `data-aos`, `swiper-*`, splitting chars, parallax attrs).
- **Full-page screenshots** of every page (desktop) for visual reference.
- Output per site: `report.json`, `animations.md` (detected libs + techniques + where used), `sections.md`, `/screenshots/*`.
- Produce an **Animation Inventory → BBDV map**: each effect they use (hero treatment, reveals, sliders, parallax, hovers, page transitions) mapped to how we recreate it in BBDV with the curated stack — "replicate the experience, rebrand the surface."

**0.C Instagram + video**
- Attempt IG public og data for Aesthetics Plus (`@aestheticsplusclinics`) + any BBDV IG found in scraped socials (login-wall caveat, no fabrication).
- Collect all YouTube IDs / video embeds from AP pages for use on the site.

**0.D Component-library code harvest** (`skiper-ui`, `uilora`, `watermelon ui`, `chanhdai`, `wrappixel`)
- Fetch real component source (registry JSON / public repos / docs), catalogue signature pieces (3D card stack, image-trail/reveal, marquee, animated nav, etc.), note which we adapt + rebrand and where they go in BBDV.

**0.E Imagery + asset finalisation**
- Audit the 69 scraped AP images; keep on-brand ones; fill gaps with curated premium stock (verified-loading, localised into `public/`). Build the final asset manifest mapped to sections.

**0.F Discovery sign-off**
- Summarise everything back (brand, palette, content, reference animation map, asset manifest). Then — and only then — proceed to Phase 1 build.

---

## Decisions I need from you before I build
1. Approve the **sitemap** in Phase 2 (add/remove pages?).
2. Approve the **curated animation stack** (Phase 3) vs. forcing all 9 libs.
3. Anything brand-critical I should treat as fixed (e.g. must reuse Aesthetics Plus logo prominently, or design a distinct BBDV mark?).
