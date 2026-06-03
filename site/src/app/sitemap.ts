import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { procedures } from "@/content/procedures";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = [
    "",
    "/how-it-works",
    "/procedures",
    "/surgery-in-india",
    "/pricing",
    "/patient-stories",
    "/about",
    "/faq",
    "/get-a-quote",
    "/contact",
  ];
  const staticPages = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
  const procedurePages = procedures.map((p) => ({
    url: `${base}/procedures/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...procedurePages];
}
