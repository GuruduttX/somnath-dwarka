import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/config/site";
import { STATIC_ROUTES } from "@/src/config/routes";
import { getSitemapEntries } from "@/src/lib/content";
import { getSeedRoutePaths } from "@/src/lib/seed/routes";

/**
 * XML sitemap (SOP §11): only index,follow canonical URLs; excludes noindex;
 * auto-updates on publish. Dynamic spokes come from the CMS via getSitemapEntries.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const seen = new Set<string>();
  const add = (arr: MetadataRoute.Sitemap, path: string, entry: Omit<MetadataRoute.Sitemap[number], "url">) => {
    if (seen.has(path)) return;
    seen.add(path);
    arr.push({ url: `${SITE_URL}${path}`, ...entry });
  };

  const out: MetadataRoute.Sitemap = [];

  STATIC_ROUTES.forEach((r) =>
    add(out, r.path, { lastModified: now, changeFrequency: r.changeFreq ?? "monthly", priority: r.priority ?? 0.5 })
  );

  // Seed-backed strategic spokes (indexable even before a CMS entry exists).
  getSeedRoutePaths().forEach((path) =>
    add(out, path, { lastModified: now, changeFrequency: "weekly", priority: 0.6 })
  );

  // Live CMS entries (packages, guides) — override/extend the seed set.
  try {
    const entries = await getSitemapEntries();
    entries.forEach((e) =>
      add(out, e.path, { lastModified: e.lastModified ?? now, changeFrequency: "weekly", priority: 0.6 })
    );
  } catch {
    // DB unreachable at build — ship the static + seed sitemap.
  }

  return out;
}
