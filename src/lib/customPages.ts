import type { Collection } from "mongodb";
import { connectDB } from "@/src/lib/mongodb";
import { RESERVED_ROOT_SLUGS } from "@/src/lib/content";
import HubModel from "@/src/models/hubModel";
import DestinationModel from "@/src/models/destinationModel";
import TrustModel from "@/src/models/trustModel";

/*
  Custom pages: brand-new pages made through the /mcp/ connector (Claude),
  served at /<slug>/ by src/app/[rootSlug]/page.tsx with one shared template
  (src/components/CustomPage/CustomPageView.tsx) when no hub, destination
  pillar or trust page owns that slug. Every save goes through
  `normalizeCustomPage`, which keeps only the known fields, coerces them to
  their shape and collects every problem, so a stored page always renders.
  Text is plain with the lib/pages/rich.tsx markup ([text](/path/), **bold**);
  links and images are checked so nothing like `javascript:` reaches a page.
*/

export type PublishStatus = "draft" | "published";

export interface CustomPageLink {
  label: string;
  href: string;
}

export type CustomPageSection =
  | { type: "text"; heading: string; paragraphs: string[] }
  | { type: "imageText"; heading: string; paragraphs: string[]; image: string; imageAlt: string; imageSide: "left" | "right" }
  | { type: "list"; heading: string; intro: string; items: string[] }
  | { type: "cards"; heading: string; intro: string; cards: { title: string; text: string; image: string; href: string }[] }
  | { type: "packages"; heading: string; intro: string; packageSlugs: string[] }
  | { type: "image"; image: string; imageAlt: string; caption: string }
  | { type: "table"; heading: string; columns: string[]; rows: string[][] }
  | { type: "cta"; heading: string; text: string; button: CustomPageLink };

export interface CustomPage {
  /** Stable id the CMS edits by. */
  id: string;
  /** Name of the page; also the H1 when hero.heading is empty. */
  title: string;
  /** The page lives at /<slug>/. */
  slug: string;
  /** Earlier slugs; their URLs permanently redirect here. */
  previousSlugs?: string[];
  status: PublishStatus;
  meta: { title: string; description: string; ogImage: string; noindex: boolean };
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    image: string;
    imageAlt: string;
    primaryButton: CustomPageLink;
    secondaryButton: CustomPageLink;
  };
  sections: CustomPageSection[];
  faqs: { q: string; a: string }[];
  /** The site's enquiry form near the end of the page. */
  showEnquiryForm: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ── Storage ─────────────────────────────────────────────────────── */

export const CUSTOM_PAGES_COLLECTION = "custom_pages";
/** Data-cache tag of the public custom-page lookups. */
export const CUSTOM_PAGES_TAG = "custom-pages";
let indexed: Promise<unknown> | undefined;

export async function customPagesCollection(): Promise<Collection<CustomPage>> {
  const db = (await connectDB()).connection.db;
  if (!db) throw new Error("The database is not connected.");
  const col = db.collection<CustomPage>(CUSTOM_PAGES_COLLECTION);
  indexed ??= Promise.all([
    col.createIndex({ id: 1 }, { unique: true }),
    col.createIndex({ slug: 1 }, { unique: true }),
    col.createIndex({ previousSlugs: 1 }),
  ]).catch((err: unknown) => {
    indexed = undefined;
    throw err;
  });
  await indexed;
  return col;
}

export const customPagePath = (slug: string) => `/${slug}/`;

/* ── Slugs ───────────────────────────────────────────────────────── */

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
    .replace(/-+$/g, "");
}

/** First path segments the site already uses; a custom page there would never show. */
export const RESERVED_SLUGS = new Set([
  // Static route folders (src/app) and the ones content.ts keeps from /[rootSlug]/
  ...RESERVED_ROOT_SLUGS,
  "admin-x9aqp7mk2", "admin-x9aqp7mk2-preview", "x9aqp7mk2-login", "api", "mcp",
  "robots-txt", "sitemap-xml", "llms-txt", "data",
  // Redirect sources in next.config.ts and /[rootSlug]/'s legacy redirects
  "tour-packages", "somnath-tour-package", "dwarka-tour-package", "blog", "services",
  "best-places-to-visit-in-dwarka", "best-diu-tourist-attractions-for-nature-history-lovers",
  "gujarat", "kutch", "sasan-gir",
  // Framework and generic admin paths
  "images", "favicon-ico", "next", "well-known", "not-found", "404", "500",
  "admin", "login", "dashboard", "cms", "preview",
]);

/** Why a slug cannot be used, or null when it is free of site routes and redirects. */
function slugConflict(slug: string): string | null {
  if (RESERVED_SLUGS.has(slug) || slug.startsWith("sitemap")) return `The slug "${slug}" is already a section of the site; choose another.`;
  // next.config.ts 301s every root "/<x>-taxi" path to the taxi hub.
  if (slug.endsWith("-taxi")) return `Slugs ending in "-taxi" redirect to /somnath-dwarka-taxi-service/; choose another.`;
  return null;
}

/** A slug for a new or renamed page, or an error when it is empty or taken by a site route. */
export function customPageSlug(raw: unknown, title: string, errors: string[]): string {
  const slug = slugify(typeof raw === "string" && raw.trim() ? raw : title);
  if (!slug) errors.push("A title or slug is required.");
  else {
    const conflict = slugConflict(slug);
    if (conflict) errors.push(conflict);
  }
  return slug;
}

/**
 * Hubs, destination pillars and trust pages share the root URL level with
 * custom pages and win over them there, so their slugs (any status, drafts
 * included, so a later publish cannot hide the custom page) are refused.
 */
export async function rootSlugOwner(slug: string): Promise<string | null> {
  await connectDB();
  const [hub, pillar, trust] = await Promise.all([
    HubModel.exists({ slug }),
    DestinationModel.exists({ slug }),
    TrustModel.exists({ slug }),
  ]);
  if (hub) return `The slug "${slug}" is used by a hub page (content type "hub"); choose another.`;
  if (pillar) return `The slug "${slug}" is used by a destination page (content type "destination"); choose another.`;
  if (trust) return `The slug "${slug}" is used by a trust page (content type "trust"); choose another.`;
  return null;
}

/** The current slug of the published page that used to have `slug`, or null. */
export async function customPageMovedTo(slug: string): Promise<string | null> {
  try {
    const doc = await (await customPagesCollection()).findOne({ previousSlugs: slug, status: "published" }, { projection: { slug: 1 } });
    return doc?.slug && doc.slug !== slug ? doc.slug : null;
  } catch (error) {
    console.error("Custom page redirect lookup failed", error);
    return null;
  }
}

/** Every published, indexable custom page, for the sitemap. Never throws. */
export async function publishedCustomPagesForSitemap(): Promise<{ path: string; lastModified?: Date }[]> {
  try {
    const docs = await (await customPagesCollection())
      .find({ status: "published", "meta.noindex": { $ne: true } }, { projection: { _id: 0, slug: 1, updatedAt: 1 } })
      .toArray();
    return docs.map((d) => ({ path: customPagePath(d.slug), lastModified: d.updatedAt ? new Date(d.updatedAt) : undefined }));
  } catch (error) {
    console.error("Custom pages for sitemap failed", error);
    return [];
  }
}

/* ── Validation ──────────────────────────────────────────────────── */

export const SECTION_TYPES = ["text", "imageText", "list", "cards", "packages", "image", "table", "cta"] as const;

const LIMITS = { sections: 40, items: 60, faqs: 60, short: 300, long: 5000 };

export class CustomPageError extends Error {}

type Errors = string[];
type Raw = Record<string, unknown>;

const isObj = (v: unknown): v is Raw => !!v && typeof v === "object" && !Array.isArray(v);

function text(v: unknown, field: string, errors: Errors, max = LIMITS.short): string {
  if (v === undefined || v === null) return "";
  if (typeof v === "number") return String(v);
  if (typeof v !== "string") {
    errors.push(`${field} must be text.`);
    return "";
  }
  const s = v.trim();
  if (s.length > max) errors.push(`${field} is longer than ${max} characters.`);
  if (/<\/?[a-z][^>]*>/i.test(s)) errors.push(`${field} must not contain HTML; use **bold** and [text](/path/) instead.`);
  return s;
}

function list<T>(v: unknown, field: string, errors: Errors, each: (x: unknown, f: string) => T, max = LIMITS.items): T[] {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v)) {
    errors.push(`${field} must be a list.`);
    return [];
  }
  if (v.length > max) errors.push(`${field} has more than ${max} entries.`);
  return v.slice(0, max).map((x, i) => each(x, `${field}[${i}]`));
}

const paragraphs = (v: unknown, field: string, errors: Errors) =>
  list(typeof v === "string" ? [v] : v, field, errors, (x, f) => text(x, f, errors, LIMITS.long)).filter(Boolean);

/** A link target: a site path, #anchor, http(s) URL, tel:, mailto: or a site token like {{whatsappUrl}}. */
function href(v: unknown, field: string, errors: Errors): string {
  const s = text(v, field, errors);
  if (!s) return "";
  if (/^(\/(?!\/)|#|https?:\/\/|tel:|mailto:|\{\{\s*\w+\s*\}\})/i.test(s)) return s;
  errors.push(`${field} must be a site path like "/about/", a #section, an https:// URL, tel: or mailto:.`);
  return "";
}

/** An image: an https URL (e.g. from upload_image) or a path on this site. */
function image(v: unknown, field: string, errors: Errors): string {
  const s = text(v, field, errors, 1000);
  if (!s) return "";
  if (/^https:\/\/\S+$/i.test(s) || /^\/(?!\/)\S+$/.test(s)) return s;
  errors.push(`${field} must be an https:// image URL or a site path.`);
  return "";
}

function link(v: unknown, field: string, errors: Errors): CustomPageLink {
  if (v === undefined || v === null) return { label: "", href: "" };
  if (!isObj(v)) {
    errors.push(`${field} must be an object {label, href}.`);
    return { label: "", href: "" };
  }
  return { label: text(v.label, `${field}.label`, errors), href: href(v.href, `${field}.href`, errors) };
}

function section(v: unknown, f: string, errors: Errors): CustomPageSection | null {
  if (!isObj(v)) {
    errors.push(`${f} must be an object with a type.`);
    return null;
  }
  const heading = () => text(v.heading, `${f}.heading`, errors);
  const intro = () => text(v.intro, `${f}.intro`, errors, LIMITS.long);
  switch (v.type) {
    case "text":
      return { type: "text", heading: heading(), paragraphs: paragraphs(v.paragraphs, `${f}.paragraphs`, errors) };
    case "imageText":
      return {
        type: "imageText",
        heading: heading(),
        paragraphs: paragraphs(v.paragraphs, `${f}.paragraphs`, errors),
        image: image(v.image, `${f}.image`, errors),
        imageAlt: text(v.imageAlt, `${f}.imageAlt`, errors),
        imageSide: v.imageSide === "left" ? "left" : "right",
      };
    case "list":
      return {
        type: "list",
        heading: heading(),
        intro: intro(),
        items: list(v.items, `${f}.items`, errors, (x, g) => text(x, g, errors, 1000)).filter(Boolean),
      };
    case "cards":
      return {
        type: "cards",
        heading: heading(),
        intro: intro(),
        cards: list(
          v.cards,
          `${f}.cards`,
          errors,
          (x, g) => {
            const c = isObj(x) ? x : (errors.push(`${g} must be an object.`), {} as Raw);
            return {
              title: text(c.title, `${g}.title`, errors),
              text: text(c.text, `${g}.text`, errors, 1500),
              image: image(c.image, `${g}.image`, errors),
              href: href(c.href, `${g}.href`, errors),
            };
          },
          24
        ),
      };
    case "packages":
      return {
        type: "packages",
        heading: heading(),
        intro: intro(),
        packageSlugs: list(v.packageSlugs, `${f}.packageSlugs`, errors, (x, g) => slugify(text(x, g, errors))).filter(Boolean),
      };
    case "image":
      return {
        type: "image",
        image: image(v.image, `${f}.image`, errors),
        imageAlt: text(v.imageAlt, `${f}.imageAlt`, errors),
        caption: text(v.caption, `${f}.caption`, errors),
      };
    case "table": {
      const columns = list(v.columns, `${f}.columns`, errors, (x, g) => text(x, g, errors), 8);
      const rows = list(v.rows, `${f}.rows`, errors, (r, g) => list(r, g, errors, (x, h) => text(x, h, errors, 1000), 8));
      if (rows.some((r) => r.length !== columns.length)) errors.push(`${f}.rows: every row needs ${columns.length} cells, one per column.`);
      return { type: "table", heading: heading(), columns, rows };
    }
    case "cta":
      return { type: "cta", heading: heading(), text: text(v.text, `${f}.text`, errors, 1500), button: link(v.button, `${f}.button`, errors) };
    default:
      errors.push(`${f}.type must be one of: ${SECTION_TYPES.join(", ")}.`);
      return null;
  }
}

export type CustomPageFields = Omit<CustomPage, "id" | "slug" | "previousSlugs" | "createdAt" | "updatedAt">;

/** The page's content fields, checked and in shape. Throws CustomPageError listing every problem. */
export function normalizeCustomPage(input: Raw): CustomPageFields {
  const errors: Errors = [];
  const meta = isObj(input.meta) ? input.meta : {};
  const hero = isObj(input.hero) ? input.hero : {};
  const title = text(input.title, "title", errors);
  if (!title) errors.push("title is required.");
  const status = input.status === "published" ? "published" : input.status === "draft" || input.status == null ? "draft" : null;
  if (!status) errors.push('status must be "draft" or "published".');

  const page: CustomPageFields = {
    title,
    status: status ?? "draft",
    meta: {
      title: text(meta.title, "meta.title", errors),
      description: text(meta.description, "meta.description", errors, 500),
      ogImage: image(meta.ogImage, "meta.ogImage", errors),
      noindex: meta.noindex === true,
    },
    hero: {
      eyebrow: text(hero.eyebrow, "hero.eyebrow", errors),
      heading: text(hero.heading, "hero.heading", errors),
      subheading: text(hero.subheading, "hero.subheading", errors, 1000),
      image: image(hero.image, "hero.image", errors),
      imageAlt: text(hero.imageAlt, "hero.imageAlt", errors),
      primaryButton: link(hero.primaryButton, "hero.primaryButton", errors),
      secondaryButton: link(hero.secondaryButton, "hero.secondaryButton", errors),
    },
    sections: list(input.sections, "sections", errors, (x, f) => section(x, f, errors), LIMITS.sections).filter(
      (s): s is CustomPageSection => s !== null
    ),
    faqs: list(
      input.faqs,
      "faqs",
      errors,
      (x, f) => {
        const q = isObj(x) ? x : (errors.push(`${f} must be an object {q, a}.`), {} as Raw);
        return { q: text(q.q ?? q.question, `${f}.q`, errors), a: text(q.a ?? q.answer, `${f}.a`, errors, 3000) };
      },
      LIMITS.faqs
    ).filter((q) => q.q && q.a),
    showEnquiryForm: input.showEnquiryForm !== false,
  };
  if (errors.length) throw new CustomPageError(errors.slice(0, 25).join(" "));
  return page;
}

/** Stored fields an update may not set: the server owns them. */
export const SERVER_FIELDS = ["_id", "id", "previousSlugs", "createdAt", "updatedAt", "path"];

/**
 * An update's fields laid over the stored page. Top-level fields replace the
 * stored ones; inside `meta` and `hero`, sub-fields left out keep their value.
 */
export function mergeUpdate(existing: CustomPage, body: Raw): Raw {
  const merged: Raw = { ...existing };
  for (const [k, v] of Object.entries(body)) {
    if (SERVER_FIELDS.includes(k) || k === "slug") continue;
    merged[k] = (k === "meta" || k === "hero") && isObj(v) ? { ...(existing[k] as unknown as Raw), ...v } : v;
  }
  return merged;
}
