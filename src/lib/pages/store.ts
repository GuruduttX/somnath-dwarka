import { cache } from "react";
import { pagesCollection } from "./db";

type StoredPage = { content?: Record<string, unknown>; status?: unknown; redirectTo?: unknown };

/**
 * A page's stored document (its CMS edits and whether it is hidden), read
 * once per request. A database problem never takes a page down: the page
 * falls back to its code defaults and stays visible.
 */
const readStoredPage = cache(async (id: string): Promise<StoredPage | null> => {
  try {
    return (await (await pagesCollection()).findOne(
      { id },
      { projection: { _id: 0, content: 1, status: 1, redirectTo: 1 } }
    )) as StoredPage | null;
  } catch (err) {
    console.warn(`[pages] "${id}" uses its code defaults: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
});

/** The CMS edits stored for one page, or null when it has none. */
export async function readStoredContent(id: string): Promise<Record<string, unknown> | null> {
  return (await readStoredPage(id))?.content ?? null;
}

/** Whether the page was hidden through the CMS, and where it then redirects ("" = nowhere, a 404). */
export async function readPageVisibility(id: string): Promise<{ hidden: boolean; redirectTo: string }> {
  const doc = await readStoredPage(id);
  return {
    hidden: doc?.status === "hidden",
    redirectTo: typeof doc?.redirectTo === "string" ? doc.redirectTo : "",
  };
}
