import { cache } from "react";
import { isValidSlug } from "@/src/lib/content";
import { RESERVED_SLUGS, customPagesCollection, type CustomPage } from "@/src/lib/customPages";

/**
 * The published custom page at /<slug>/, read once per request (metadata and
 * page share it). /[rootSlug]/ is ISR-cached and every CMS save calls
 * refreshSite(), so no extra data cache is needed. A database error is not
 * swallowed: like lib/content.ts, a failed read must answer 500 (not cached)
 * rather than a 404 that ISR would keep serving.
 */
export const getPublishedCustomPage = cache(async (slug: string): Promise<CustomPage | null> => {
  if (!isValidSlug(slug) || RESERVED_SLUGS.has(slug)) return null;
  return (await customPagesCollection()).findOne({ slug, status: "published" }, { projection: { _id: 0 } });
});
