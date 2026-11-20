/*
  Shape rules for CMS-editable page content.

  Every editable page keeps its full default copy in code as a plain JSON-like
  object (strings, numbers, booleans, arrays, objects). The CMS stores only the
  top-level fields an editor changed. These helpers:
    - check an edit against the default's shape before it is saved (conform),
    - lay the stored fields over the defaults when the page renders (mergeContent),
  so a bad edit is refused with a clear message instead of breaking the page.
*/

type Plain = Record<string, unknown>;

export const isPlainObject = (v: unknown): v is Plain =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function kind(v: unknown): "string" | "number" | "boolean" | "array" | "object" | "null" | "other" {
  if (v === null || v === undefined) return "null";
  if (Array.isArray(v)) return "array";
  if (isPlainObject(v)) return "object";
  const t = typeof v;
  return t === "string" || t === "number" || t === "boolean" ? t : "other";
}

/**
 * The shape one item of a default list follows. Object items are combined, so a
 * field that only some default items carry (an optional link, say) is still allowed.
 */
export function itemTemplate(list: unknown[]): unknown {
  if (!list.length) return undefined;
  if (!list.every(isPlainObject)) return list[0];
  const shape: Plain = {};
  for (const item of list as Plain[]) {
    for (const [k, v] of Object.entries(item)) {
      if (!(k in shape) || kind(shape[k]) === "null") shape[k] = v;
    }
  }
  return shape;
}

/** An empty value of the template's kind, for fields a new list item leaves out. */
export function emptyLike(template: unknown): unknown {
  switch (kind(template)) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return Object.fromEntries(Object.entries(template as Plain).map(([k, v]) => [k, emptyLike(v)]));
    default:
      return null;
  }
}

const describe: Record<string, string> = {
  string: "text",
  number: "a number",
  boolean: "true or false",
  array: "a list",
  object: "an object",
};

/**
 * Checks `value` against `template` (the default copy) and returns a cleaned copy.
 * Problems are pushed onto `errors` with their path, e.g. `faqs[2].a: expected text`.
 *
 * `fill` decides what an object's missing fields become: "template" keeps the
 * default's value (an edited `meta` without `description` keeps the default
 * description), "empty" blanks them (a new list item without `note` gets "").
 */
export function conform(value: unknown, template: unknown, path: string, errors: string[], fill: "template" | "empty" = "template"): unknown {
  const want = kind(template);
  const got = kind(value);

  if (want === "null" || want === "other") return value;

  if (want === "string") {
    if (got === "string") return value;
    if (got === "number" || got === "boolean") return String(value);
    errors.push(`${path}: expected text, got ${describe[got] ?? got}.`);
    return template;
  }
  if (want === "number") {
    if (got === "number") return value;
    if (got === "string" && (value as string).trim() !== "" && !Number.isNaN(Number(value))) return Number(value);
    errors.push(`${path}: expected a number.`);
    return template;
  }
  if (want === "boolean") {
    if (got === "boolean") return value;
    errors.push(`${path}: expected true or false.`);
    return template;
  }
  if (want === "array") {
    if (got !== "array") {
      errors.push(`${path}: expected a list.`);
      return template;
    }
    const item = itemTemplate(template as unknown[]);
    if (item === undefined) return value;
    return (value as unknown[]).map((v, i) => conform(v, item, `${path}[${i}]`, errors, "empty"));
  }
  // object
  if (got !== "object") {
    errors.push(`${path}: expected an object with fields ${Object.keys(template as Plain).join(", ")}.`);
    return template;
  }
  const tpl = template as Plain;
  const given = value as Plain;
  for (const k of Object.keys(given)) {
    if (!(k in tpl)) errors.push(`${path}.${k}: unknown field. Allowed: ${Object.keys(tpl).join(", ")}.`);
  }
  const out: Plain = {};
  for (const [k, t] of Object.entries(tpl)) {
    out[k] = k in given ? conform(given[k], t, `${path}.${k}`, errors, fill) : fill === "template" ? t : emptyLike(t);
  }
  return out;
}

/**
 * Lays stored CMS fields over the code defaults. Only fields the defaults know
 * are used (a stale stored field from older code is ignored), objects merge field
 * by field, and a stored list replaces the default list whole, with each object
 * item topped up with any field newer code expects.
 */
export function mergeContent<T>(defaults: T, stored: unknown): T {
  return merge(defaults, stored) as T;
}

function merge(def: unknown, stored: unknown): unknown {
  const want = kind(def);
  if (stored === undefined || stored === null) return def;
  if (want === "null" || want === "other") return stored;
  if (want !== kind(stored)) return def;
  if (want === "object") {
    const d = def as Plain;
    const s = stored as Plain;
    return Object.fromEntries(Object.entries(d).map(([k, v]) => [k, merge(v, s[k])]));
  }
  if (want === "array") {
    const item = itemTemplate(def as unknown[]);
    if (!isPlainObject(item)) return stored;
    return (stored as unknown[]).map((v) => (isPlainObject(v) ? merge(emptyLike(item), v) : v));
  }
  return stored;
}

/** Replaces `{{token}}` placeholders in every string of the content. */
export function fillTokens<T>(content: T, tokens: Record<string, string>): T {
  const walk = (v: unknown): unknown => {
    if (typeof v === "string") return v.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, name: string) => tokens[name] ?? m);
    if (Array.isArray(v)) return v.map(walk);
    if (isPlainObject(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return walk(content) as T;
}
