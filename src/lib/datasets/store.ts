import { cache } from "react";
import { connectDB } from "@/src/lib/mongodb";
import { emptyLike, fillTokens, isPlainObject, itemTemplate, mergeContent } from "@/src/lib/pages/content";
import { getSiteSettings, settingsTokens } from "@/src/lib/pages/siteSettings";
import type { DatasetDef, DatasetItemStatus } from "./types";

/*
  Stored edits of code datasets (lib/datasets/types.ts), one document per
  edited, added or removed item:
    { dataset, key, fields }        a code item with some top-level fields changed
    { dataset, key, item, added }   an item added through the CMS
    { dataset, key, deleted }       a code item removed through the CMS
  Code items keep their code values for every field not in `fields`, so a
  later code change to an unedited field still shows.
*/

export const DATASETS_COLLECTION = "site_data";

export interface StoredDatasetDoc {
  dataset: string;
  key: string;
  fields?: Record<string, unknown>;
  item?: Record<string, unknown>;
  added?: boolean;
  deleted?: boolean;
  updatedAt?: string;
}

let indexed: Promise<unknown> | undefined;

export async function datasetsCollection() {
  const db = (await connectDB()).connection.db;
  if (!db) throw new Error("The database is not connected.");
  const col = db.collection<StoredDatasetDoc>(DATASETS_COLLECTION);
  indexed ??= col.createIndex({ dataset: 1, key: 1 }, { unique: true }).catch((err: unknown) => {
    indexed = undefined;
    throw err;
  });
  await indexed;
  return col;
}

export interface DatasetEntry<T> {
  key: string;
  item: T;
  status: DatasetItemStatus;
}

/** The shape every item follows: the code items combined, so an optional field some items carry is allowed. */
export function datasetTemplate(def: DatasetDef): Record<string, unknown> {
  const t = itemTemplate(def.defaults);
  return isPlainObject(t) ? t : {};
}

/**
 * Lays the stored docs over the code items: edited fields over code items,
 * removed code items left out (unless `withDeleted`), added items appended
 * in the order they were added.
 */
export function mergeDataset<T extends Record<string, unknown>>(
  def: DatasetDef<T>,
  docs: StoredDatasetDoc[],
  withDeleted = false
): (DatasetEntry<T> & { deleted?: boolean })[] {
  const byKey = new Map(docs.map((d) => [d.key, d]));
  const out: (DatasetEntry<T> & { deleted?: boolean })[] = [];
  const seen = new Set<string>();
  for (const item of def.defaults) {
    const key = def.key(item);
    seen.add(key);
    const doc = byKey.get(key);
    if (doc?.deleted) {
      if (withDeleted) out.push({ key, item, status: "code", deleted: true });
      continue;
    }
    if (doc?.fields && Object.keys(doc.fields).length) {
      // An edit may set an optional field this code item does not carry (one that
      // other items have); a null base lets mergeContent take the stored value.
      const base: Record<string, unknown> = { ...item };
      for (const k of Object.keys(doc.fields)) if (!(k in base)) base[k] = null;
      out.push({ key, item: mergeContent(base, { ...item, ...doc.fields }) as T, status: "edited" });
    } else {
      out.push({ key, item, status: "code" });
    }
  }
  const template = datasetTemplate(def as DatasetDef);
  for (const doc of docs) {
    if (!doc.added || !doc.item || seen.has(doc.key)) continue;
    const item = mergeContent(emptyLike(template) as T, doc.item) as T;
    out.push({ key: doc.key, item, status: "added" });
  }
  return out;
}

const readDocs = cache(async (id: string): Promise<StoredDatasetDoc[] | null> => {
  try {
    return (await (await datasetsCollection()).find({ dataset: id }, { projection: { _id: 0 } }).toArray()) as StoredDatasetDoc[];
  } catch (err) {
    console.warn(`[datasets] "${id}" uses its code defaults: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
});

/**
 * The live items of a dataset, in order, with the site tokens ({{whatsapp}},
 * {{phone}}, ...) filled in. Read once per request. A database problem never
 * takes a page down: the code items are used.
 */
export async function getDataset<T extends Record<string, unknown>>(def: DatasetDef<T>): Promise<T[]> {
  const [docs, settings] = await Promise.all([readDocs(def.id), getSiteSettings()]);
  const items = docs?.length ? mergeDataset(def, docs).map((e) => e.item) : def.defaults;
  return fillTokens(items, settingsTokens(settings));
}

/** One live item by key, or null. */
export async function getDatasetItem<T extends Record<string, unknown>>(def: DatasetDef<T>, key: string): Promise<T | null> {
  return (await getDataset(def)).find((item) => def.key(item) === key) ?? null;
}

/** The live items as a record keyed by the dataset key, for code that looks items up by slug. */
export async function getDatasetRecord<T extends Record<string, unknown>>(def: DatasetDef<T>): Promise<Record<string, T>> {
  return Object.fromEntries((await getDataset(def)).map((item) => [def.key(item), item]));
}

/** Turns a code record `{ slug: {...} }` into dataset items that carry their key in `keyField`. */
export function recordItems<V extends object, K extends string>(record: Record<string, V>, keyField: K): (V & Record<K, string>)[] {
  return Object.entries(record).map(([key, value]) => ({ [keyField]: key, ...value }) as V & Record<K, string>);
}

/** The reverse of recordItems: drops the key field again, for code typed against the original record values. */
export function withoutKey<T extends Record<string, unknown>, K extends keyof T>(item: T, keyField: K): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyField]: _k, ...rest } = item;
  return rest;
}
