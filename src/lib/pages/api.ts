import { revalidatePath } from "next/cache";
import { pagesCollection } from "./db";
import { conform, mergeContent } from "./content";
import { META_FIELDS } from "./registry";
import type { PageDef } from "./types";
import { canHide, redirectError } from "./visibility";

/*
  Server side of /api/admin/pages. A page's API view is its content (code
  defaults with the stored edits laid over them, tokens like {{whatsapp}} left
  as they are) plus a few read-only fields describing the page. Pages that can
  be hidden also show pageStatus ("live" | "hidden") and redirectTo, which are
  stored beside the content, not in it (see lib/pages/visibility.ts).
*/

export async function pageView(def: PageDef) {
  const doc = await (await pagesCollection()).findOne({ id: def.id }, { projection: { _id: 0 } });
  const content = doc ? mergeContent(def.defaults, doc.content) : def.defaults;
  return {
    id: def.id,
    pageTitle: def.title,
    pageGroup: def.group,
    pagePath: def.path,
    ...(def.notes ? { pageNotes: def.notes } : {}),
    edited: doc ? Object.keys(doc.content ?? {}) : [],
    updatedAt: doc?.updatedAt ?? null,
    ...(canHide(def) ? { pageStatus: doc?.status === "hidden" ? "hidden" : "live", redirectTo: doc?.redirectTo ?? "" } : {}),
    ...content,
  };
}

export class PageEditError extends Error {}

/** Refreshes the pages a saved page's copy shows on. */
function refreshAfterSave(def: PageDef, visibilityChange: boolean) {
  try {
    // A route pattern such as "/guides/[slug]" refreshes every page that route renders.
    const refresh = (p: string) => (p.includes("[") ? revalidatePath(p, "page") : revalidatePath(p));
    // Hiding a page also changes the sitemap, so everything refreshes.
    if (def.scope === "layout" || visibilityChange) revalidatePath("/", "layout");
    else refresh(def.path);
    for (const p of def.alsoRevalidate ?? []) refresh(p);
  } catch (error) {
    console.error("[pages] revalidate failed", error);
  }
}

/**
 * Saves the top-level fields in `changes`. Each field replaces the stored value
 * whole after it has been checked against the default's shape; `null` removes
 * the edit so the field goes back to its code default.
 */
export async function savePage(def: PageDef, changes: unknown) {
  if (!changes || typeof changes !== "object" || Array.isArray(changes)) {
    throw new PageEditError("Send a JSON object of the fields to change.");
  }

  const errors: string[] = [];
  const set: Record<string, unknown> = {};
  const unset: Record<string, ""> = {};
  const known = Object.keys(def.defaults);

  // Objects are checked against the page as it is now (defaults + earlier edits), so
  // sending a few sub-fields of an object (one key of `meta`) keeps the object's
  // other sub-fields, earlier edits included.
  const stored = await (await pagesCollection()).findOne({ id: def.id }, { projection: { _id: 0, content: 1 } });
  const current = stored?.content ? mergeContent(def.defaults, stored.content) : def.defaults;

  const given = changes as Record<string, unknown>;
  for (const [field, value] of Object.entries(given)) {
    if ((META_FIELDS as readonly string[]).includes(field) || field === "pageStatus" || field === "redirectTo") continue;
    if (!(field in def.defaults)) {
      errors.push(`"${field}" is not a field of this page. Fields: ${known.join(", ")}.`);
      continue;
    }
    if (value === null) unset[`content.${field}`] = "";
    else set[`content.${field}`] = conform(value, (current as Record<string, unknown>)[field], field, errors);
  }

  // Hiding: stored beside the content. The path is stored too, for the sitemap.
  const visibilityChange = "pageStatus" in given || "redirectTo" in given;
  if (visibilityChange) {
    const status = given.pageStatus;
    const target =
      given.redirectTo === null ? "" : typeof given.redirectTo === "string" ? given.redirectTo.trim() : given.redirectTo;
    if (!canHide(def)) {
      if (status === "hidden" || (typeof target === "string" && target)) {
        errors.push(`${def.title} cannot be hidden: site-wide blocks and the home page always show.`);
      }
    } else {
      if (status === "hidden") Object.assign(set, { status: "hidden", path: def.path });
      else if (status === "live" || status === null) Object.assign(unset, { status: "", path: "" });
      else if (status !== undefined) errors.push('pageStatus must be "live" or "hidden".');
      if (target !== undefined) {
        const problem = typeof target === "string" ? redirectError(target, def.path) : "redirectTo must be text.";
        if (problem) errors.push(problem);
        else if (target) set.redirectTo = target;
        else unset.redirectTo = "";
      }
    }
  }

  if (errors.length) throw new PageEditError(errors.slice(0, 20).join(" "));
  if (!Object.keys(set).length && !Object.keys(unset).length) {
    throw new PageEditError(`Nothing to change. Fields: ${known.join(", ")}.`);
  }

  await (await pagesCollection()).updateOne(
    { id: def.id },
    {
      $set: { id: def.id, updatedAt: new Date().toISOString(), ...set },
      ...(Object.keys(unset).length ? { $unset: unset } : {}),
    },
    { upsert: true }
  );

  refreshAfterSave(def, visibilityChange);
}
