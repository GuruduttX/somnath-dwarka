import { isValidObjectId, type Model, type Schema } from "mongoose";
import { connectDB } from "@/src/lib/mongodb";
import { refreshSite } from "@/src/lib/refreshSite";
import type { ContentTypeDef } from "@/src/lib/contentRegistry";
import { compareSaved } from "./restType";
import { SiteError, type ContentType, type Doc, type ItemSummary } from "./types";

/*
  One content type of the generic CMS registry (src/lib/contentRegistry.ts:
  hubs, temples, destinations, festivals, ...) as an MCP content type. It
  works on the Mongoose model directly, the same way the admin "Content"
  screens do through services/admin/contentService.ts, with the model's own
  validators run on every write. The field list Claude sees is read from the
  model's schema, so it can never drift from what the site stores.
*/

/** Fields the MCP layer never writes: the site owns them. */
const SERVER_FIELDS = ["_id", "id", "__v", "createdAt", "updatedAt"];
const SKIP_PATHS = new Set(["_id", "__v", "createdAt", "updatedAt"]);

type SchemaType = {
  instance?: string;
  isRequired?: boolean;
  enumValues?: string[];
  schema?: Schema;
  caster?: { instance?: string; enumValues?: string[] };
  $isMongooseDocumentArray?: boolean;
};

function typeHint(t: SchemaType): string {
  const enums = t.enumValues?.length ? t.enumValues : t.caster?.enumValues;
  if (enums?.length) return ` (${enums.map((e) => `'${e}'`).join(" | ")})`;
  switch (t.instance) {
    case "Number":
      return " (number)";
    case "Boolean":
      return " (boolean)";
    case "Date":
      return " (date)";
    case "ObjectId":
      return " (id)";
    case "Mixed":
      return " (any JSON)";
    default:
      return "";
  }
}

/** The schema's fields as one compact line, e.g. `title (required), faq[{id, question, answer}], hero_image {url, alt}`. */
export function describeSchema(schema: Schema, depth = 0): string {
  const order: string[] = [];
  const top = new Map<string, string>();
  const nested = new Map<string, string[]>();

  schema.eachPath((path: string, raw: unknown) => {
    if (SKIP_PATHS.has(path)) return;
    const t = raw as SchemaType;
    const [head, ...rest] = path.split(".");
    if (!order.includes(head)) order.push(head);

    let desc: string;
    if (t.schema && (t.$isMongooseDocumentArray || t.instance === "Array")) {
      desc = depth < 2 ? `[{${describeSchema(t.schema, depth + 1)}}]` : "[...]";
    } else if (t.schema) {
      desc = depth < 2 ? ` {${describeSchema(t.schema, depth + 1)}}` : " {...}";
    } else if (t.instance === "Array") {
      const inner = t.caster?.instance && t.caster.instance !== "String" ? ` of ${t.caster.instance.toLowerCase()}` : "";
      desc = `[]${inner ? ` (list${inner})` : ""}${typeHint({ enumValues: t.caster?.enumValues })}`;
    } else {
      desc = typeHint(t);
    }
    const required = t.isRequired ? " (required)" : "";

    if (rest.length) {
      const list = nested.get(head) ?? [];
      list.push(`${rest.join(".")}${desc}${required}`);
      nested.set(head, list);
    } else {
      top.set(head, `${head}${desc}${required}`);
    }
  });

  return order
    .map((head) => top.get(head) ?? `${head} {${(nested.get(head) ?? []).join(", ")}}`)
    .join(", ");
}

const plain = <T>(v: T): T => JSON.parse(JSON.stringify(v));

function withoutServerFields(doc: Doc): Doc {
  const copy = { ...doc };
  for (const f of SERVER_FIELDS) delete copy[f];
  return copy;
}

const titleOf = (d: Doc) => String(d.title ?? d.name ?? d.h1 ?? d.slug ?? "(untitled)");

export function modelType(def: ContentTypeDef, notes = ""): ContentType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = def.model as Model<any>;

  function summarize(d: Doc): ItemSummary {
    const s: ItemSummary = { id: String(d._id ?? ""), title: titleOf(d) };
    if (d.slug) s.slug = String(d.slug);
    if (d.status) s.status = String(d.status);
    const when = d.updatedAt ?? d.createdAt;
    if (when) s.updatedAt = String(when);
    for (const f of ["hub", "destination", "parent_destination", "kind", "hub_kind", "page_kind", "spoke_kind"]) {
      if (typeof d[f] === "string" && d[f]) s[f] = d[f];
    }
    return s;
  }

  async function find(key: string): Promise<Doc> {
    const wanted = key.trim();
    if (!wanted) throw new SiteError(400, "An id or slug is required.");
    await connectDB();
    const doc =
      (isValidObjectId(wanted) ? await model.findById(wanted).lean() : null) ?? (await model.findOne({ slug: wanted }).lean());
    if (!doc) throw new SiteError(404, `No ${def.label} item with id or slug "${wanted}". Use list_items to find it.`);
    return plain(doc) as Doc;
  }

  /** Mongoose validation and duplicate-key errors as a readable SiteError. */
  function asSiteError(err: unknown): never {
    const e = err as { name?: string; code?: number; message?: string; errors?: Record<string, { message?: string }>; keyValue?: Doc };
    if (e?.code === 11000) throw new SiteError(409, `Another ${def.label} item already uses ${JSON.stringify(e.keyValue ?? {})}.`);
    if (e?.name === "ValidationError" && e.errors) {
      throw new SiteError(400, `Validation failed. ${Object.entries(e.errors).map(([k, v]) => `${k}: ${v.message}`).join("; ")}`);
    }
    if (e?.name === "CastError" || e?.name === "StrictModeError") throw new SiteError(400, e.message ?? "Invalid value.");
    throw err;
  }

  return {
    key: def.key,
    label: def.label,
    description:
      `${def.label}. Public URL: ${def.pathHint}. Fields: ${describeSchema(model.schema)}. ` +
      "status ('draft' | 'published'): only published items show on the site. slug must be lowercase words joined by hyphens and unique. " +
      `${notes}`.trim(),
    async list() {
      await connectDB();
      const docs = await model
        .find({}, { title: 1, name: 1, h1: 1, slug: 1, status: 1, updatedAt: 1, createdAt: 1, hub: 1, destination: 1, parent_destination: 1, kind: 1, hub_kind: 1, page_kind: 1, spoke_kind: 1 })
        .sort({ updatedAt: -1 })
        .lean();
      return (plain(docs) as Doc[]).map(summarize);
    },
    async get(id) {
      return find(id);
    },
    async create(data) {
      const body = { status: "draft", ...withoutServerFields(data) };
      await connectDB();
      let created: Doc;
      try {
        created = plain((await model.create(body)).toObject()) as Doc;
      } catch (err) {
        asSiteError(err);
      }
      refreshSite();
      return summarize(created);
    },
    async update(id, changes) {
      const sent = withoutServerFields(changes);
      if (!Object.keys(sent).length) throw new SiteError(400, "Nothing to change: pass the fields to update in `changes`.");
      const before = await find(id);
      let after: Doc | null;
      try {
        after = await model.findByIdAndUpdate(before._id, { $set: sent }, { new: true, runValidators: true }).lean();
      } catch (err) {
        asSiteError(err);
      }
      if (!after) throw new SiteError(404, `${def.label} item "${id}" disappeared during the update.`);
      refreshSite();
      const saved = plain(after) as Doc;
      return compareSaved(String(saved._id), titleOf(saved), sent, saved);
    },
    async remove(id) {
      const before = await find(id);
      await model.findByIdAndDelete(before._id);
      refreshSite();
      return summarize(before);
    },
  };
}
