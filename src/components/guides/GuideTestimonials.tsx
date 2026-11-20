import type { Testimonial } from "@/src/config/testimonials";
import GuideTestimonialsClient from "@/src/components/testimonials/GuideTestimonialsClient";
import { getTestimonials } from "@/src/lib/testimonials";
import { getPageCopy } from "@/src/lib/sectionCopy";
import { REVIEWS_PAGE } from "@/src/app/reviews/content";

/**
 * Traveller testimonials for the guide (blog) pages. Server part: picks the
 * list and the heading copy, then renders the carousel
 * (components/testimonials/GuideTestimonialsClient.tsx).
 *
 * The list is this guide's own testimonials when it has some, else the live
 * shared list (CMS dataset site_testimonials). The heading block is the
 * guideSection field of the /reviews/ page copy (CMS page "reviews").
 *
 * No Review or AggregateRating JSON-LD is emitted here. See the note in
 * src/config/testimonials.ts — this project publishes rating schema only for
 * confirmed, attributable reviews, and these have not been through that gate.
 */
export default async function GuideTestimonials({
  items: itemsProp,
  heading,
  subheading,
}: {
  /**
   * This guide's own testimonials, from the CMS. When the guide has none, the
   * shared sitewide list is used so the section is never an empty band — pass
   * an empty array explicitly to opt a page out entirely.
   */
  items?: Testimonial[];
  heading?: string;
  subheading?: string;
}) {
  const [shared, { guideSection: copy }] = await Promise.all([
    itemsProp ? Promise.resolve([] as Testimonial[]) : getTestimonials(),
    getPageCopy(REVIEWS_PAGE),
  ]);
  const items = itemsProp?.length ? itemsProp : itemsProp ? [] : shared;
  return (
    <GuideTestimonialsClient
      items={items}
      badge={copy.badge}
      heading={heading ?? copy.heading}
      subheading={subheading ?? copy.subheading}
      readMore={copy.readMore}
    />
  );
}
