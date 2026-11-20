import { fillTokens, mergeContent } from "@/src/lib/pages/content";
import { getSiteSettings, settingsTokens } from "@/src/lib/pages/siteSettings";
import { readStoredContent } from "@/src/lib/pages/store";
import type { PageDef } from "@/src/lib/pages/types";

/**
 * A PageDef's copy for use OUTSIDE its own page: the code defaults with the
 * CMS edits laid over them and the site tokens filled in, like getPageContent,
 * but without the hidden-page check. Used where one page's copy also feeds a
 * section on another page (the /compare/ copy's "Compare & decide" block on
 * /plan/, the /reviews/ copy's testimonial heading on guide pages) and by the
 * 404 page, which must never call notFound() itself. Hiding the owning page
 * must not take those other pages down.
 */
export async function getPageCopy<T extends Record<string, unknown>>(def: PageDef<T>): Promise<T> {
  const [stored, settings] = await Promise.all([readStoredContent(def.id), getSiteSettings()]);
  const content = stored ? mergeContent(def.defaults, stored) : def.defaults;
  return fillTokens(content, settingsTokens(settings));
}

/** Fills single-brace placeholders such as "{city}" or "{festival}" in template copy. */
export function fillVars(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, name: string) => vars[name] ?? m);
}
