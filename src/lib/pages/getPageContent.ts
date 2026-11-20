import { notFound, permanentRedirect } from "next/navigation";
import { fillTokens, mergeContent } from "./content";
import { getSiteSettings, settingsTokens } from "./siteSettings";
import { readPageVisibility, readStoredContent } from "./store";
import type { PageDef } from "./types";
import { canHide } from "./visibility";

/**
 * A page's copy as it should render: the code defaults with the CMS edits laid
 * over them, and the site-wide tokens ({{whatsapp}}, {{phone}}, ...) filled in.
 * A page hidden through the CMS stops here with a 404, or a permanent redirect
 * when it has a redirectTo (every page reads only its own copy, so this is the
 * one place that needs to check).
 */
export async function getPageContent<T extends Record<string, unknown>>(def: PageDef<T>): Promise<T> {
  const [stored, settings, visibility] = await Promise.all([
    readStoredContent(def.id),
    getSiteSettings(),
    readPageVisibility(def.id),
  ]);
  if (visibility.hidden && canHide(def)) {
    if (visibility.redirectTo) permanentRedirect(visibility.redirectTo);
    notFound();
  }
  const content = stored ? mergeContent(def.defaults, stored) : def.defaults;
  return fillTokens(content, settingsTokens(settings));
}
