import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/config/site";
import { STATIC_ROUTES } from "@/src/config/routes";
import { getSitemapEntries } from "@/src/lib/content";
import { getLiveSeedRoutePaths } from "@/src/lib/liveRoutes";
import { SEED_AUTHOR } from "@/src/lib/seed/destinations";
import { publishedCustomPagesForSitemap } from "@/src/lib/customPages";
import { hiddenPagePaths } from "@/src/lib/pages/visibility";

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

  // The author page is noindex until its bio is verified; submitting a noindex
  // URL is a Search Console error, so it joins the sitemap when it joins the index.
  const excluded = new Set(SEED_AUTHOR.bio_verified ? [] : ["/author/harsh-rawat/"]);
  // Code-built pages hidden through the CMS (they answer 404 or redirect).
  for (const path of await hiddenPagePaths()) excluded.add(path);

  STATIC_ROUTES.filter((r) => !excluded.has(r.path)).forEach((r) =>
    add(out, r.path, { lastModified: now, changeFrequency: r.changeFreq ?? "monthly", priority: r.priority ?? 0.5 })
  );

  // Seed-backed strategic spokes (indexable even before a CMS entry exists).
  // Seed-backed spokes, as edited through the CMS (added items join, removed ones leave).
  (await getLiveSeedRoutePaths()).forEach((path) =>
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

  // Custom pages made through the Claude connector (never throws).
  (await publishedCustomPagesForSitemap()).forEach((e) =>
    add(out, e.path, { lastModified: e.lastModified ?? now, changeFrequency: "monthly", priority: 0.5 })
  );

  return out;
}
