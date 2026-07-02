/**
 * Shared CMS fields for every content type (SOP §2). Spread `sharedFields` into
 * each Mongoose schema; use `SharedFields` for the TS shape. This is what makes
 * every template SEO-complete by construction (answer-first, faq, related links,
 * breadcrumb parent, canonical/noindex overrides, four-tag facts).
 */
import { Schema } from "mongoose";

export type FactTagType = "verified" | "faith" | "local" | "opinion";

export type FaqEntry = {
  id?: string;
  question: string;
  answer: string;
  fact_tag?: FactTagType;
};

export type RelatedLinkEntry = {
  target: string;
  anchor: string;
  type?: "pillar" | "money" | "sibling" | "spoke";
};

export type VerifyField = {
  value?: string;
  verified: boolean;
  verified_at?: string; // ISO
  source_url?: string;
};

export type SharedFields = {
  slug: string;
  title_tag?: string;
  meta_description?: string;
  h1?: string;
  answer_first?: string; // 40–60 words
  body?: string; // rich text / HTML
  faq?: FaqEntry[];
  breadcrumb_parent?: string; // path of parent page
  related_links?: RelatedLinkEntry[];
  hero_image?: { url?: string; alt?: string };
  schema_overrides?: string; // raw JSON-LD override
  noindex?: boolean;
  canonical_override?: string;
  status?: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
};

export const faqFieldSchema = {
  id: { type: String },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  fact_tag: {
    type: String,
    enum: ["verified", "faith", "local", "opinion"],
    default: "verified",
  },
};

export const relatedLinkSchema = {
  target: { type: String, required: true },
  anchor: { type: String, required: true },
  type: { type: String, enum: ["pillar", "money", "sibling", "spoke"] },
};

export const verifyFieldSchema = {
  value: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  verified_at: { type: String, default: "" },
  source_url: { type: String, default: "" },
};

/** Spread into every content-type schema. */
export const sharedFields = {
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  title_tag: { type: String, default: "" },
  meta_description: { type: String, default: "" },
  h1: { type: String, default: "" },
  answer_first: { type: String, default: "" },
  body: { type: String, default: "" },
  faq: [faqFieldSchema],
  breadcrumb_parent: { type: String, default: "" },
  related_links: [relatedLinkSchema],
  hero_image: {
    url: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  schema_overrides: { type: String, default: "" },
  noindex: { type: Boolean, default: false },
  canonical_override: { type: String, default: "" },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
    index: true,
  },
} as const;

/** Helper for building a mongoose Schema with shared fields + type-specific. */
export function withShared<T extends Record<string, unknown>>(typeSpecific: T) {
  return { ...sharedFields, ...typeSpecific };
}

export type { Schema };
