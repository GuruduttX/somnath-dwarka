/**
 * A list of items kept in code (seed data or config: festivals, temple
 * topics, cab routes, taxi page copy, ...) whose items are editable one by
 * one through the CMS and the /mcp/ connector. The code list stays the
 * default; the database holds only the edits, the added items and which code
 * items were removed (lib/datasets/store.ts). Pages read the live list with
 * `await getDataset(def)`.
 *
 * Every item is a plain JSON object (strings, numbers, booleans, lists and
 * objects). Edits are checked against the shape of the code items, so a bad
 * edit is refused with a message instead of breaking a page.
 */
export interface DatasetDef<T extends Record<string, unknown> = Record<string, unknown>> {
  /** The MCP content type key, e.g. "site_festivals". Lowercase, words joined by "_". */
  id: string;
  /** Name shown in lists, e.g. "Festival pages (/festivals/<slug>/)". */
  label: string;
  /** For Claude: what the items drive on the site, the URL pattern, what the main fields mean, any quirks. */
  description: string;
  /** Rough grouping, e.g. "Destinations", "Taxi". */
  group: string;
  /** The code items, in their default order. */
  defaults: T[];
  /** The item's stable key, e.g. its slug, or "somnath/aarti-timings" for a key made of two fields. */
  key: (item: T) => string;
  /** Fields that make up the key. They are required on create and cannot change on update. */
  keyFields: (keyof T & string)[];
  /** The item's public URL, when it has a page of its own. */
  path?: (item: T) => string | null;
  /** The item's name in lists (default: title, name, label, h1 or the key). */
  title?: (item: T) => string;
  /** New items can be added (default true). Turn off when the code only knows a fixed set (e.g. three tiers). */
  allowCreate?: boolean;
  /** Items can be removed (default true). */
  allowDelete?: boolean;
}

export type DatasetItemStatus = "code" | "edited" | "added";

/**
 * The def as the untyped DatasetDef the registries hold (function params make
 * DatasetDef<T> not assignable to DatasetDef<Record<...>> on its own). Pages
 * keep using the typed def with getDataset, so they get T back.
 */
export const asAnyDataset = <T extends Record<string, unknown>>(def: DatasetDef<T>): DatasetDef =>
  def as unknown as DatasetDef;
