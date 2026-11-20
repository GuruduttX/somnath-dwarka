import { revalidatePath, revalidateTag } from "next/cache";
import { CUSTOM_PAGES_TAG } from "@/src/lib/customPages";

/**
 * Called after every create, update and delete made through the /mcp/
 * connector (and by the content, package, custom-page and page-copy APIs), so
 * the change shows at once instead of when a page's hourly revalidate timer
 * runs out. Content is shared across pages (a package also shows on the home
 * page, the listing and hub pages; a hub in the sitemap and menus), so the
 * whole site is marked stale rather than only the item's own page; each page
 * is rebuilt on its next visit. Never throws: a cache hiccup must not fail a save.
 */
export function refreshSite() {
  try {
    revalidatePath("/", "layout");
    // Route handlers sit outside the layout tree; they list every page too.
    revalidatePath("/sitemap.xml");
    revalidatePath("/llms.txt");
    revalidateTag(CUSTOM_PAGES_TAG, "max");
  } catch (error) {
    console.error("refreshSite failed", error);
  }
}
