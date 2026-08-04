import { z } from "zod";

// sub schemas
const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

/**
 * Only the quote itself is mandatory. The rest is optional so a half-filled
 * row does not block a draft save; empty rows are stripped before they reach
 * the database (see the controller).
 */
const testimonialSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  location: z.string().optional(),
  destination: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().optional(),
});

const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const schemaData = z.object({
  title: z.string(),
  description: z.string(),
});

export const blogSchema = z
  .object({
    title: z.string().optional(),
    category: z.string().optional(),
    slug: z.string().optional(),

    author: z.string().optional(),

    content: z.string().optional(),
    subContent: z.string().optional(),

    /**
     * Absolute URL (Cloudinary upload) or a site-relative path (/images/…).
     *
     * This was `z.string().url()`, which rejects a leading-slash path — and
     * every blog in the database stores one, so *every* update from the blog
     * editor failed with `image: Invalid URL` before it reached the database.
     * The editor's own media picker offers local images, so relative paths are
     * a supported input, not bad data to be validated away.
     */
    image: z
      .string()
      .refine(
        (v) => /^https?:\/\//.test(v) || v.startsWith("/"),
        "Image must be an absolute URL or a path starting with /"
      )
      .optional(),
    alt: z.string().optional(),

    meta: metaSchema.optional(),
    structuredData: schemaData.optional(),

    faqs: z.array(faqSchema).optional(),
    testimonials: z.array(testimonialSchema).optional(),

    status: z.enum(["draft", "published"]),
  })
  .superRefine((data, ctx) => {
    if (data.status === "published") {
      // required fields for publish
      if (!data.title) {
        ctx.addIssue({
          path: ["title"],
          message: "Title is required when publishing",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.slug) {
        ctx.addIssue({
          path: ["slug"],
          message: "Slug is required when publishing",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.content || data.content.length < 20) {
        ctx.addIssue({
          path: ["content"],
          message: "Content must be at least 20 characters",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.image) {
        ctx.addIssue({
          path: ["image"],
          message: "Image is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.meta) {
        ctx.addIssue({
          path: ["meta"],
          message: "Meta is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });