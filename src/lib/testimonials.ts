import { cache } from "react";
import type { RealReview } from "@/src/lib/seo";
import { getDataset } from "@/src/lib/datasets/store";
import { TESTIMONIALS_DATASET, type TestimonialItem } from "@/src/lib/cms-groups/catalog";
import { AVATAR_PALETTE, initialsFrom, type Testimonial } from "@/src/config/testimonials";

/*
  The live guest testimonials (CMS dataset site_testimonials, default
  TESTIMONIALS in src/config/testimonials.ts), for every surface that shows
  them. Server only: client components get the list as a prop.
*/

/** Dataset rows in the renderable shape: initials and avatar colours worked out, as the code list has them. */
export function toTestimonials(rows: TestimonialItem[]): Testimonial[] {
  return rows
    .filter((r) => r.review?.trim())
    .map((r, i) => {
      const name = r.name.trim() || "Traveller";
      const palette = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
      return {
        id: r.slug,
        name,
        location: r.location.trim(),
        destination: r.destination.trim(),
        // Kept as given (the code entries are 4.9), only held to the 1–5 the stars can draw.
        rating: Math.min(5, Math.max(1, Number(r.rating) || 5)),
        initials: initialsFrom(name),
        bg: palette.bg,
        color: palette.color,
        review: r.review.trim(),
      };
    });
}

/** The live testimonials, in order. Read once per request. */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => toTestimonials(await getDataset(TESTIMONIALS_DATASET)));

/** The live testimonials in the shape the Review / AggregateRating schema builder takes (was TESTIMONIAL_REVIEWS). */
export async function getTestimonialReviews(): Promise<RealReview[]> {
  return (await getTestimonials()).map((t) => ({ author: t.name, rating: t.rating, body: t.review }));
}
