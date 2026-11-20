import type { RelatedLink } from "@/src/components/shared/RelatedLinks";

/*
  Small helpers for CMS-editable template copy (the destination & guides part).
  Template copy is shared by several pages, so it carries placeholders such as
  {destination} or {name} that each page fills in when it renders.
*/

/** Fills {placeholder} names in a piece of template copy. Unknown placeholders stay as written. */
export function fillVars(text: string, vars: Record<string, string | number>): string {
  return String(text ?? "").replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

const LINK_TYPES: NonNullable<RelatedLink["type"]>[] = ["hub", "pillar", "money", "sibling", "spoke"];

/** An editable related link: the CMS stores `type` as plain text. */
export type EditableLink = { target: string; anchor: string; type: string };

/** Editable links as RelatedLinks: blank rows dropped, an unknown type left off. */
export function toLinks(links: EditableLink[] | null | undefined): RelatedLink[] {
  return (links ?? [])
    .filter((l) => l && l.target && l.anchor)
    .map((l) => {
      const type = LINK_TYPES.find((t) => t === l.type);
      return type ? { target: l.target, anchor: l.anchor, type } : { target: l.target, anchor: l.anchor };
    });
}

/**
 * Lays an item over its defaults field by field, keeping the default where the
 * item's value is blank. A CMS-added item that leaves a label empty then shows
 * the standard label rather than an empty heading.
 */
export function withDefaults<T extends Record<string, unknown>>(value: Partial<T> | null | undefined, defaults: T): T {
  if (!value) return defaults;
  const out: Record<string, unknown> = { ...defaults };
  for (const [k, v] of Object.entries(value)) {
    const blank = v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0);
    if (!blank) out[k] = v;
  }
  return out as T;
}
