import type { SiteApi } from "./api";
import { SiteError, type ContentType, type Doc, type ItemSummary, type UpdateResult } from "./types";

/**
 * Describes one CMS section that follows the usual REST shape:
 * GET list, GET/PUT/DELETE one item, POST to create. Website adapters fill
 * this in per section; the quirks of each site's API live here as options.
 */
export interface RestTypeConfig {
  key: string;
  label: string;
  description: string;
  /** GET: every item, drafts included. Response `{ data: [...] }`. */
  listPath: string;
  /** Item routes are `${itemBase}/${key}`. */
  itemBase: string;
  /** POST here to create. Leave out when the section cannot be created through the API. */
  createPath?: string;
  /** Which field the item routes expect in the URL. */
  itemKey: "id" | "slug" | "_id";
  /** Item routes accept the id and the slug alike, so no list lookup is needed first. */
  acceptsIdOrSlug?: boolean;
  /** Field holding the item's name (title, routeName, cityName, ...). */
  titleField: string;
  /** Extra short fields shown in list results. */
  summaryFields?: string[];
  /**
   * "patch": the site merges the body into the stored item, so only changed fields are sent.
   * "full": the site replaces the item with the body, so the hub sends the whole item with the changes applied.
   */
  updateMode: "patch" | "full";
  updateMethod?: "PUT" | "PATCH" | "POST";
  /** Applied on create when the caller leaves the field out (e.g. start as a draft). */
  createDefaults?: Doc;
  allowDelete?: boolean;
  /** The site treats a field sent as null as "back to its default", so a null that comes back as a value counts as saved. */
  nullResets?: boolean;
  /** Last touch to the body before it is sent on create and update (e.g. give list rows the ids the site requires). */
  prepare?: (body: Doc) => Doc;
  /** Runs after every create, update and delete, with the item as it was before (if any) and after (if any): refreshes the site's pages. */
  afterWrite?: (before: Doc | null, after: Doc | null) => void;
}

/** Fields the MCP layer never sends: the site owns them, and overwriting them breaks lookups. */
const SERVER_FIELDS = ["_id", "id", "__v", "createdAt", "updatedAt"];
const LIST_CACHE_MS = 30_000;

function withoutServerFields(doc: Doc): Doc {
  const copy = { ...doc };
  for (const f of SERVER_FIELDS) delete copy[f];
  return copy;
}

/**
 * The stored item without its null fields, at any depth. A site that checks
 * the whole item on save treats a missing optional field as fine but refuses
 * null; fields left out of the save keep their stored value anyway.
 */
function withoutNulls(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutNulls);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Doc).filter(([, v]) => v !== null).map(([k, v]) => [k, withoutNulls(v)]));
  }
  return value;
}

/** JSON with sorted keys, so two equal objects compare equal whatever their key order. */
function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Doc)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => a.localeCompare(b));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

/** Keeps list results and diffs small. */
function clip(value: unknown, max = 160): unknown {
  if (typeof value === "string") return value.length > max ? `${value.slice(0, max)}…` : value;
  if (value && typeof value === "object") {
    const json = JSON.stringify(value);
    return json.length > max ? `(${Array.isArray(value) ? `list of ${value.length}` : "object"}, use get_item to see it)` : value;
  }
  return value;
}

const isObject = (v: unknown): v is Doc => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Whether the stored value holds what was sent. Objects only need the sent
 * sub-fields to match, because a site may keep or fill in the ones left out
 * (an edited `meta` without `description` keeps its description); lists must
 * match item by item.
 */
function holds(stored: unknown, sent: unknown): boolean {
  if (isObject(sent) && isObject(stored)) return Object.entries(sent).every(([k, v]) => v === undefined || holds(stored[k], v));
  if (Array.isArray(sent) && Array.isArray(stored)) return sent.length === stored.length && sent.every((v, i) => holds(stored[i], v));
  return stableJson(stored) === stableJson(sent);
}

export function compareSaved(id: string, title: string, sent: Doc, after: Doc, nullResets = false): UpdateResult {
  const result: UpdateResult = { id, title, saved: [], differs: [] };
  for (const [field, value] of Object.entries(sent)) {
    if (holds(after[field], value) || (nullResets && value === null && after[field] != null)) result.saved.push(field);
    else result.differs.push({ field, savedValue: clip(after[field], 400) ?? null });
  }
  return result;
}

export function restType(session: SiteApi, cfg: RestTypeConfig): ContentType {
  let cache: { at: number; docs: Doc[] } | undefined;
  const itemPath = (key: string) => `${cfg.itemBase}/${encodeURIComponent(key)}`;

  async function listDocs(fresh = false): Promise<Doc[]> {
    if (!fresh && cache && Date.now() - cache.at < LIST_CACHE_MS) return cache.docs;
    const json = await session.request<{ data?: unknown }>("GET", cfg.listPath);
    const docs = Array.isArray(json.data) ? (json.data as Doc[]) : [];
    cache = { at: Date.now(), docs };
    return docs;
  }

  const idOf = (doc: Doc) => String(doc.id ?? doc._id ?? doc.slug ?? "");
  const titleOf = (doc: Doc) => String(doc[cfg.titleField] ?? doc.title ?? "(untitled)");

  function summarize(doc: Doc): ItemSummary {
    const s: ItemSummary = { id: idOf(doc), title: titleOf(doc) };
    if (doc.slug) s.slug = String(doc.slug);
    if (doc.status != null && doc.status !== "") s.status = String(doc.status);
    const when = doc.updatedAt ?? doc.createdAt;
    if (when) s.updatedAt = String(when);
    for (const f of cfg.summaryFields ?? []) {
      if (doc[f] !== undefined && doc[f] !== null && doc[f] !== "") s[f] = clip(doc[f], 80);
    }
    return s;
  }

  /** Turns the id, slug or _id Claude passed into the key this section's item routes expect. */
  async function endpointKey(given: string): Promise<string> {
    const wanted = given.trim();
    if (!wanted) throw new SiteError(400, "An id or slug is required.");
    if (cfg.acceptsIdOrSlug) return wanted;
    const find = (docs: Doc[]) =>
      docs.find((d) => [d.id, d._id, d.slug].some((v) => v != null && String(v) === wanted));
    const doc = find(await listDocs()) ?? find(await listDocs(true));
    if (!doc) throw new SiteError(404, `No ${cfg.label} item with id or slug "${wanted}". Use list_items to find it.`);
    const key = doc[cfg.itemKey];
    if (key == null || key === "") throw new SiteError(400, `This item has no ${cfg.itemKey}, so the site's API cannot address it.`);
    return String(key);
  }

  async function fetchDoc(key: string): Promise<Doc> {
    const json = await session.request<{ data?: unknown }>("GET", itemPath(key));
    if (!json.data || typeof json.data !== "object") throw new SiteError(404, `${cfg.label} item "${key}" not found.`);
    return json.data as Doc;
  }

  const type: ContentType = {
    key: cfg.key,
    label: cfg.label,
    description: cfg.description,
    async list() {
      return (await listDocs(true)).map(summarize);
    },
    async get(id) {
      return fetchDoc(await endpointKey(id));
    },
    async update(id, changes) {
      const sent = withoutServerFields(changes);
      if (!Object.keys(sent).length) throw new SiteError(400, "Nothing to change: pass the fields to update in `changes`.");
      const key = await endpointKey(id);
      const before = await fetchDoc(key);
      const merged = cfg.updateMode === "full" ? { ...(withoutNulls(withoutServerFields(before)) as Doc), ...sent } : sent;
      const body = cfg.prepare ? cfg.prepare(merged) : merged;
      await session.request(cfg.updateMethod ?? "PUT", itemPath(key), body);
      cache = undefined;
      // Re-read by a key that survives a slug change, then report what really got stored.
      const stableKey = cfg.acceptsIdOrSlug && before.id ? String(before.id) : key;
      let after: Doc;
      try {
        after = await fetchDoc(stableKey);
      } catch (err) {
        // An item without an id that just changed its slug is only reachable by the new slug.
        if (!(err instanceof SiteError && err.status === 404 && typeof sent.slug === "string")) throw err;
        after = await fetchDoc(sent.slug);
      }
      cfg.afterWrite?.(before, after);
      return compareSaved(idOf(after), titleOf(after), sent, after, cfg.nullResets);
    },
  };

  if (cfg.createPath) {
    const createPath = cfg.createPath;
    type.create = async (data) => {
      const merged = { ...(cfg.createDefaults ?? {}), ...withoutServerFields(data) };
      const body = cfg.prepare ? cfg.prepare(merged) : merged;
      const json = await session.request<{ data?: unknown }>("POST", createPath, body);
      cache = undefined;
      if (json.data && typeof json.data === "object") {
        cfg.afterWrite?.(null, json.data as Doc);
        return summarize(json.data as Doc);
      }
      // The site did not echo the new item; find it by slug or title instead.
      const docs = await listDocs(true);
      const made = docs.find((d) => (body.slug && d.slug === body.slug) || titleOf(d) === body[cfg.titleField]);
      if (!made) throw new SiteError(500, "The site accepted the item but it could not be found afterwards. Check the admin panel.");
      cfg.afterWrite?.(null, made);
      return summarize(made);
    };
  }

  if (cfg.allowDelete !== false) {
    type.remove = async (id) => {
      const key = await endpointKey(id);
      const before = await fetchDoc(key);
      await session.request("DELETE", itemPath(key));
      cache = undefined;
      cfg.afterWrite?.(before, null);
      return summarize(before);
    };
  }

  return type;
}

/** A single settings document, such as the home page. */
export function singletonType(
  session: SiteApi,
  cfg: { key: string; label: string; description: string; path: string; updateMethod?: "PUT" | "POST" }
): ContentType {
  const read = async () => {
    const json = await session.request<{ data?: unknown }>("GET", cfg.path);
    return (json.data && typeof json.data === "object" ? json.data : {}) as Doc;
  };
  return {
    key: cfg.key,
    label: cfg.label,
    description: cfg.description,
    singleton: true,
    async list() {
      const doc = await read();
      return [{ id: cfg.key, title: cfg.label, ...(doc.updatedAt ? { updatedAt: String(doc.updatedAt) } : {}) }];
    },
    get: () => read(),
    async update(_id, changes) {
      const sent = withoutServerFields(changes);
      if (!Object.keys(sent).length) throw new SiteError(400, "Nothing to change: pass the fields to update in `changes`.");
      await session.request(cfg.updateMethod ?? "POST", cfg.path, sent);
      return compareSaved(cfg.key, cfg.label, sent, await read());
    },
  };
}
