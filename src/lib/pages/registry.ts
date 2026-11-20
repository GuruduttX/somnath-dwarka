import { SITE_SETTINGS_DEF } from "./siteSettings";
import type { PageDef } from "./types";
import { HOME_PAGE } from "@/src/app/content";
import { ABOUT_PAGE } from "@/src/app/about/content";
import { CONTACT_PAGE } from "@/src/app/contact/content";
import { PRIVACY_PAGE } from "@/src/app/privacy/content";
import { TERMS_PAGE } from "@/src/app/terms/content";
import { BOOKING_POLICY_PAGE } from "@/src/app/booking-policy/content";
import { CANCELLATION_REFUND_PAGE } from "@/src/app/cancellation-refund/content";
import { GROUP_PAGES } from "@/src/lib/cms-groups";

/*
  Every code-built page whose copy is editable through /api/admin/pages (and
  so through the /mcp/ connector as the "page" type). To make another
  code-built page editable:
    1. move its copy into a `defaults` object and export a PageDef next to it
       (e.g. src/app/about/content.ts),
    2. render it from `await getPageContent(def)`,
    3. add the def to this list.
  Pages built from the CMS collections (hubs, destinations, guides, ...) are
  edited as their own content types instead.
*/

export const PAGE_DEFS: PageDef[] = [
  SITE_SETTINGS_DEF,
  HOME_PAGE,
  ABOUT_PAGE,
  CONTACT_PAGE,
  PRIVACY_PAGE,
  TERMS_PAGE,
  BOOKING_POLICY_PAGE,
  CANCELLATION_REFUND_PAGE,
  // Page copy registered by each part of the site (src/lib/cms-groups).
  ...GROUP_PAGES,
] as PageDef[];

/** Fields the API adds around a page's content; page copy never uses these names. */
export const META_FIELDS = ["id", "pageTitle", "pageGroup", "pagePath", "pageNotes", "edited", "updatedAt"] as const;

export function findPageDef(id: string): PageDef | undefined {
  return PAGE_DEFS.find((d) => d.id === id);
}

if (process.env.NODE_ENV !== "production") {
  const ids = new Set<string>();
  for (const d of PAGE_DEFS) {
    if (ids.has(d.id)) throw new Error(`Duplicate page id "${d.id}" in lib/pages/registry.ts`);
    ids.add(d.id);
    const clash = Object.keys(d.defaults).filter((k) => (META_FIELDS as readonly string[]).includes(k));
    if (clash.length) throw new Error(`Page "${d.id}" uses reserved field names: ${clash.join(", ")}`);
  }
}
