/**
 * On-demand ISR invalidation for CMS writes.
 *
 * Public pages are cached with `export const revalidate = 3600`, so without
 * this a freshly published guide stays invisible on /guides/ for up to an
 * hour — and worse, any 404 already cached for its URL (someone opening the
 * link before publish) keeps being served from the stale entry. Calling
 * revalidatePath on write marks those entries stale so the next request
 * regenerates them.
 *
 * Safe to call from Route Handlers only (not Client Components).
 */
import { revalidatePath } from "next/cache";

/** Paths that render guide/blog content and go stale when one is written. */
export function revalidateGuide(slug?: string) {
  try {
    // Hub list, plus the guide's own page (invalidates a cached 404 too).
    revalidatePath("/guides");
    if (slug) revalidatePath(`/guides/${slug}`);
    // Home renders the latest guides; both sitemaps list every guide URL.
    revalidatePath("/");
    revalidatePath("/sitemap");
    revalidatePath("/sitemap.xml");
  } catch (error) {
    // Never fail the write because cache invalidation hiccuped.
    console.error("revalidateGuide failed", error);
  }
}
