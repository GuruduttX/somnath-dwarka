import { conform, emptyLike, isPlainObject } from "@/src/lib/pages/content";
import { refreshSite } from "@/src/lib/refreshSite";
import { datasetTemplate, datasetsCollection, mergeDataset, type StoredDatasetDoc } from "./store";
import type { DatasetDef } from "./types";

/*
  Write side of the datasets (lib/datasets/types.ts), used by the /mcp/
  connector. Every write is checked against the shape of the code items and
  refreshes the site.
*/

export class DatasetError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}

type Doc = Record<string, unknown>;

const SLUGGY = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;

async function load(def: DatasetDef) {
  const col = await datasetsCollection();
  const docs = (await col.find({ dataset: def.id }, { projection: { _id: 0 } }).toArray()) as StoredDatasetDoc[];
  return { col, docs, entries: mergeDataset(def, docs, true) };
}

export function titleOf(def: DatasetDef, item: Doc, key: string): string {
  if (def.title) return def.title(item);
  for (const f of ["title", "name", "label", "h1", "heading", "city", "route"]) {
    if (typeof item[f] === "string" && item[f]) return item[f] as string;
  }
  return key;
}

export function summarize(def: DatasetDef, e: { key: string; item: Doc; status: string; deleted?: boolean }) {
  const path = def.path?.(e.item) ?? null;
  return {
    id: e.key,
    title: titleOf(def, e.item, e.key),
    status: e.deleted ? "deleted" : e.status,
    ...(path ? { path } : {}),
  };
}

export async function listDataset(def: DatasetDef) {
  const { entries } = await load(def);
  return entries.map((e) => summarize(def, e));
}

export async function getDatasetEntry(def: DatasetDef, key: string) {
  const { entries } = await load(def);
  const e = entries.find((x) => x.key === key.trim());
  if (!e) throw new DatasetError(404, `${def.label}: no item "${key}". Use list_items to find it.`);
  const path = def.path?.(e.item) ?? null;
  return { ...e.item, _id: e.key, _status: e.deleted ? "deleted" : e.status, ...(path ? { _path: path } : {}) };
}

const META = ["_id", "_status", "_path", "id"];

/** Changes top-level fields of one item. null puts a field back to its code value (or empties it on an added item). */
export async function updateDatasetItem(def: DatasetDef, key: string, changes: Doc) {
  const sent = Object.fromEntries(Object.entries(changes).filter(([k]) => !META.includes(k) || (k === "id" && "id" in datasetTemplate(def))));
  if (!Object.keys(sent).length) throw new DatasetError(400, "Nothing to change: pass the fields to update in `changes`.");
  const { col, docs, entries } = await load(def);
  const entry = entries.find((x) => x.key === key.trim());
  if (!entry) throw new DatasetError(404, `${def.label}: no item "${key}". Use list_items to find it.`);
  const doc = docs.find((d) => d.key === entry.key);
  const template = datasetTemplate(def);
  const codeItem = def.defaults.find((i) => def.key(i) === entry.key) as Doc | undefined;
  const errors: string[] = [];
  const set: Doc = {};
  const unset: string[] = [];

  for (const [field, value] of Object.entries(sent)) {
    if (def.keyFields.includes(field) && value !== (entry.item as Doc)[field]) {
      errors.push(`${field} is part of this item's key and cannot change; delete the item and create a new one instead.`);
      continue;
    }
    if (!(field in template)) {
      errors.push(`"${field}" is not a field of ${def.label}. Fields: ${Object.keys(template).join(", ")}.`);
      continue;
    }
    if (value === null) {
      unset.push(field);
      continue;
    }
    const shape = (entry.item as Doc)[field] ?? template[field];
    set[field] = conform(value, shape, field, errors);
  }
  if (errors.length) throw new DatasetError(400, errors.slice(0, 20).join(" "));

  const now = new Date().toISOString();
  if (entry.status === "added") {
    const item: Doc = { ...(doc?.item ?? {}), ...set };
    for (const f of unset) item[f] = emptyLike(template[f]);
    await col.updateOne({ dataset: def.id, key: entry.key }, { $set: { item, updatedAt: now } });
  } else {
    // Code item: only the changed fields are stored; a field equal to its code value is dropped again.
    const fields: Doc = { ...(doc?.fields ?? {}) };
    for (const [f, v] of Object.entries(set)) {
      if (codeItem && JSON.stringify(codeItem[f]) === JSON.stringify(v)) delete fields[f];
      else fields[f] = v;
    }
    for (const f of unset) delete fields[f];
    await col.updateOne(
      { dataset: def.id, key: entry.key },
      { $set: { dataset: def.id, key: entry.key, fields, updatedAt: now }, $unset: { deleted: "" } },
      { upsert: true }
    );
  }
  refreshSite();
  return getDatasetEntry(def, entry.key);
}

/** Adds a new item. Fields left out get empty values. A removed code item with the same key is restored instead. */
export async function createDatasetItem(def: DatasetDef, data: Doc) {
  if (def.allowCreate === false) throw new DatasetError(400, `${def.label}: new items cannot be added; edit the existing ones.`);
  const input = Object.fromEntries(Object.entries(data).filter(([k]) => !META.includes(k) || (k === "id" && "id" in datasetTemplate(def))));
  const template = datasetTemplate(def);
  const errors: string[] = [];
  for (const f of def.keyFields) {
    if (typeof input[f] !== "string" || !String(input[f]).trim()) errors.push(`${f} is required (it is part of the item's key).`);
  }
  if (errors.length) throw new DatasetError(400, errors.join(" "));
  const item = conform(input, template, "data", errors, "empty") as Doc;
  if (!isPlainObject(item)) throw new DatasetError(400, "data must be an object.");
  const key = def.key(item as never);
  if (!SLUGGY.test(key)) errors.push(`The key "${key}" must be lowercase words joined by hyphens (slugs).`);
  if (errors.length) throw new DatasetError(400, errors.slice(0, 20).join(" "));

  const { col, entries } = await load(def);
  const existing = entries.find((e) => e.key === key);
  if (existing && !existing.deleted) throw new DatasetError(409, `${def.label}: "${key}" already exists. Use update_item to change it.`);
  const now = new Date().toISOString();
  if (existing?.deleted) {
    // Restoring a removed code item, with the given fields as its edits.
    await col.updateOne({ dataset: def.id, key }, { $unset: { deleted: "" }, $set: { updatedAt: now } });
    refreshSite();
    const rest = Object.fromEntries(Object.entries(input).filter(([k]) => !def.keyFields.includes(k)));
    return Object.keys(rest).length ? updateDatasetItem(def, key, rest) : getDatasetEntry(def, key);
  }
  await col.insertOne({ dataset: def.id, key, item, added: true, updatedAt: now });
  refreshSite();
  return getDatasetEntry(def, key);
}

/** Removes an item: an added item is deleted, a code item is hidden (create_item with its key brings it back). */
export async function deleteDatasetItem(def: DatasetDef, key: string) {
  if (def.allowDelete === false) throw new DatasetError(400, `${def.label}: items cannot be removed.`);
  const { col, entries } = await load(def);
  const entry = entries.find((x) => x.key === key.trim());
  if (!entry || entry.deleted) throw new DatasetError(404, `${def.label}: no item "${key}". Use list_items to find it.`);
  if (entry.status === "added") await col.deleteOne({ dataset: def.id, key: entry.key });
  else {
    await col.updateOne(
      { dataset: def.id, key: entry.key },
      { $set: { dataset: def.id, key: entry.key, deleted: true, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
  }
  refreshSite();
  return summarize(def, entry);
}
