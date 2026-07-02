import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/config/site";
import { STATIC_ROUTES } from "@/src/config/routes";
import { getSitemapEntries } from "@/src/lib/content";

/**
 * XML sitemap (SOP §11): only index,follow canonical URLs; excludes noindex;
 * auto-updates on publish. Dynamic spokes come from the CMS via getSitemapEntries.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFreq ?? "monthly",
    priority: r.priority ?? 0.5,
  }));

  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const entries = await getSitemapEntries();
    dynamicEntries = entries.map((e) => ({
      url: `${SITE_URL}${e.path}`,
      lastModified: e.lastModified ?? now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // DB unreachable at build — ship static sitemap, spokes fill in on ISR.
  }

  return [...staticEntries, ...dynamicEntries];
}
