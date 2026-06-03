// Phase 0.B/0.C: Deep scrape of reference sites (structure + animation tech) + Instagram og.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SITES = [
  { host: "restoredbeautygetaways", base: "https://www.restoredbeautygetaways.com" },
  { host: "destinationbeauty", base: "https://destinationbeauty.com" },
];
const MAX = 12;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (u) => {
  try { const p = new URL(u).pathname.replace(/\/$/, "").replace(/^\//, ""); return (p || "home").replace(/[^a-z0-9]+/gi, "-").slice(0, 60); }
  catch { return "page"; }
};

async function scrapeSite(browser, site) {
  const OUT = path.join("e:/BBDV/research/reference", site.host);
  const SHOTS = path.join(OUT, "screenshots");
  mkdirSync(SHOTS, { recursive: true });
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  const toVisit = [site.base + "/"];
  const visited = new Set();
  const pages = [];
  const libAgg = new Set();
  const scriptAgg = new Set();

  while (toVisit.length && visited.size < MAX) {
    const url = toVisit.shift();
    const norm = url.replace(/#.*$/, "").replace(/\/$/, "");
    if (visited.has(norm)) continue;
    visited.add(norm);
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
      // trigger lazy/scroll animations
      await page.evaluate(async () => {
        await new Promise((res) => {
          let y = 0; const t = setInterval(() => { window.scrollBy(0, 700); y += 700; if (y > document.body.scrollHeight + 1400) { clearInterval(t); res(); } }, 80);
        });
        window.scrollTo(0, 0);
      });
      await sleep(700);

      const data = await page.evaluate(() => {
        const text = (el) => (el ? el.innerText.replace(/\s+/g, " ").trim() : "");
        // animation/library detection via globals
        const g = (k) => { try { return typeof window[k] !== "undefined"; } catch { return false; } };
        const libs = {
          gsap: g("gsap"), ScrollTrigger: g("ScrollTrigger"), ScrollSmoother: g("ScrollSmoother"),
          Swiper: g("Swiper"), Lenis: g("Lenis"), LocomotiveScroll: g("LocomotiveScroll"),
          barba: g("barba"), Splitting: g("Splitting"), AOS: g("AOS"), ScrollMagic: g("ScrollMagic"),
          THREE: g("THREE"), jQuery: g("jQuery") || g("$"), Webflow: !!document.querySelector("html.w-mod-js,[data-wf-page]"),
          WordPress: !!document.querySelector('link[href*="wp-content"],script[src*="wp-content"]'),
          Elementor: !!document.querySelector('.elementor,[data-elementor-type]'),
          Next: !!document.getElementById("__NEXT_DATA__"),
        };
        const scripts = Array.from(document.querySelectorAll("script[src]")).map((s) => s.src);
        // DOM animation markers
        const markerCount = (sel) => document.querySelectorAll(sel).length;
        const markers = {
          dataScroll: markerCount("[data-scroll]"),
          dataAos: markerCount("[data-aos]"),
          swiper: markerCount(".swiper,.swiper-slide,[class*='swiper']"),
          splitting: markerCount(".splitting,[data-splitting]"),
          parallax: markerCount("[data-parallax],.parallax,[class*='parallax']"),
          sticky: markerCount("[class*='sticky']"),
          marquee: markerCount("marquee,[class*='marquee']"),
          backdropBlurClass: markerCount("[class*='blur'],[class*='glass']"),
        };
        // sections outline
        const secEls = Array.from(document.querySelectorAll("section, header, footer, [data-scroll-section], main > div"));
        const sections = secEls.slice(0, 40).map((s) => ({
          tag: s.tagName.toLowerCase(),
          cls: (s.className || "").toString().slice(0, 80),
          heading: text(s.querySelector("h1,h2,h3")).slice(0, 120),
          intro: text(s.querySelector("p")).slice(0, 200),
        })).filter((s) => s.heading || s.intro);
        // CTAs
        const ctas = Array.from(document.querySelectorAll("a,button"))
          .map((a) => ({ label: text(a).slice(0, 50), href: a.getAttribute("href") || "" }))
          .filter((c) => c.label && /quote|enquir|book|contact|call|start|get|brochure|consult|apply|journey|begin|free/i.test(c.label));
        const ctaSeen = new Set(); const ctasU = [];
        for (const c of ctas) { const k = c.label + c.href; if (!ctaSeen.has(k)) { ctaSeen.add(k); ctasU.push(c); } }
        // forms
        const forms = Array.from(document.querySelectorAll("form")).map((f) => ({
          action: f.getAttribute("action") || "",
          fields: Array.from(f.querySelectorAll("input,select,textarea")).map((i) => ({ tag: i.tagName.toLowerCase(), type: i.getAttribute("type") || "", name: i.getAttribute("name") || "", ph: i.getAttribute("placeholder") || "" })),
        }));
        // media + nav
        const links = Array.from(document.querySelectorAll("a[href]")).map((a) => a.href);
        const videos = Array.from(document.querySelectorAll("iframe,video,source")).map((v) => v.src || v.getAttribute("data-src") || "").filter((s) => s && /youtube|vimeo|\.mp4/i.test(s));
        const navLinks = Array.from(document.querySelectorAll("header a, nav a")).map((a) => ({ label: text(a).slice(0, 40), href: a.href })).filter((n) => n.label);
        const fonts = Array.from(document.querySelectorAll("link[href*='fonts.googleapis'],link[href*='font']")).map((l) => l.href);
        return {
          title: document.title,
          metaDesc: document.querySelector('meta[name="description"]')?.content || "",
          libs, scripts, markers, sections, ctas: ctasU.slice(0, 25), forms, videos,
          navLinks: navLinks.slice(0, 30), links, fonts,
          bodyLen: document.body.innerText.length,
        };
      });

      Object.entries(data.libs).forEach(([k, v]) => v && libAgg.add(k));
      data.scripts.forEach((s) => scriptAgg.add(s));

      try { await page.screenshot({ path: path.join(SHOTS, slug(url) + ".png"), fullPage: true, timeout: 20000 }); } catch {}

      pages.push({ url, title: data.title, metaDesc: data.metaDesc, libs: data.libs, markers: data.markers, sections: data.sections, ctas: data.ctas, forms: data.forms, videos: data.videos, navLinks: data.navLinks, fonts: data.fonts });

      for (const l of data.links) {
        try {
          const lu = new URL(l);
          if (lu.hostname.replace(/^www\./, "").endsWith(site.base.replace(/^https?:\/\/(www\.)?/, "")) && !/\.(jpg|png|pdf|jpeg|webp|svg|zip|mp4)$/i.test(lu.pathname)) {
            const ln = l.replace(/#.*$/, "").replace(/\/$/, "");
            if (!visited.has(ln) && toVisit.length + visited.size < MAX) toVisit.push(l);
          }
        } catch {}
      }
      console.log(site.host, "OK", visited.size, url);
    } catch (e) {
      console.log(site.host, "FAIL", url, e.message);
    }
  }

  writeFileSync(path.join(OUT, "report.json"), JSON.stringify({ base: site.base, scrapedAt: new Date().toISOString(), detectedLibs: [...libAgg], scriptHosts: [...new Set([...scriptAgg].map((s) => { try { return new URL(s).hostname; } catch { return s; } }))], pageCount: pages.length, pages }, null, 2));
  console.log(`\n${site.host}: ${pages.length} pages. Libs: ${[...libAgg].join(", ")}`);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  for (const s of SITES) await scrapeSite(browser, s);

  // Instagram og (login-walled; best effort)
  const IG = path.join("e:/BBDV/research/instagram");
  mkdirSync(IG, { recursive: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const igTargets = ["https://www.instagram.com/aestheticsplusclinics/"];
  const igRes = [];
  for (const u of igTargets) {
    try {
      await page.goto(u, { waitUntil: "domcontentloaded", timeout: 30000 });
      await sleep(2500);
      const info = await page.evaluate(() => ({
        title: document.title,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || "",
        ogDesc: document.querySelector('meta[property="og:description"]')?.content || "",
        ogImg: document.querySelector('meta[property="og:image"]')?.content || "",
      }));
      igRes.push({ url: u, ...info });
      console.log("IG", u, info.ogTitle);
    } catch (e) { igRes.push({ url: u, error: e.message }); console.log("IG FAIL", e.message); }
  }
  writeFileSync(path.join(IG, "instagram.json"), JSON.stringify(igRes, null, 2));

  await browser.close();
  console.log("REFERENCE DONE");
})();
