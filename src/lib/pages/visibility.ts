import { cache } from "react";
import { pagesCollection } from "./db";
import type { PageDef } from "./types";

/*
  A code-built page can be hidden through the CMS (pageStatus "hidden" in
  /api/admin/pages). A hidden page answers 404, or permanently redirects when
  redirectTo is set, and drops out of the sitemap. Its code and copy stay, so
  showing it again is one save. (Menu links in the Navbar and footer are code,
  so remove those by hand if a page is hidden for good.)
*/

/** Site-wide blocks, the home page and route templates cannot be hidden. */
export function canHide(def: Pick<PageDef, "path" | "scope">): boolean {
  return def.scope !== "layout" && def.path !== "/" && !def.path.includes("[");
}

/** Where a hidden page may redirect: a path on this site or a full http(s) URL, never to itself. */
export function redirectError(target: string, ownPath: string): string | null {
  if (target === "") return null;
  const norm = (p: string) => p.replace(/\/+$/, "") || "/";
  if (norm(target) === norm(ownPath)) return "redirectTo cannot be the page itself.";
  if (target.startsWith("/") && !target.startsWith("//")) return null;
  if (/^https?:\/\/[^\s]+$/i.test(target)) return null;
  return 'redirectTo must be a path on this site such as "/about/", or a full https:// URL.';
}

/** Paths of every hidden page (the save API stores each one's path), read once per request. */
export const hiddenPagePaths = cache(async (): Promise<Set<string>> => {
  try {
    const docs = await (await pagesCollection())
      .find({ status: "hidden" }, { projection: { _id: 0, path: 1 } })
      .toArray();
    return new Set(
      docs.map((d) => (d as { path?: unknown }).path).filter((p): p is string => typeof p === "string" && p !== "")
    );
  } catch (err) {
    console.warn(`[pages] hidden pages unknown: ${err instanceof Error ? err.message : String(err)}`);
    return new Set();
  }
});
