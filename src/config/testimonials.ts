/**
 * Traveller testimonials — the single source of truth for every surface that
 * displays them (home page carousel, guide pages).
 *
 * These were previously hard-coded inside the home page's carousel component,
 * so nothing else could show them and editing one meant editing a 466-line
 * client component. They live here now because a second surface needs them.
 *
 * IMPORTANT — read before adding an entry:
 *
 * This project does not publish invented customer feedback. `/reviews/` ships
 * deliberately empty and `PackageTestimonials` renders nothing without real CMS
 * data, both for the same reason: a fabricated review is a lie about a real
 * person's experience, and in schema form it is a manual-action risk. Nothing
 * here emits Review or AggregateRating JSON-LD, and nothing should until these
 * entries are confirmed as genuine, attributable quotes.
 *
 * Every consumer degrades gracefully when the list is empty, so the honest move
 * — should these turn out to be placeholder copy — is to empty the array rather
 * than to delete the components.
 */
export type Testimonial = {
  id: number | string;
  name: string;
  location: string;
  destination: string;
  rating: number;
  initials: string;
  /** Avatar background + text colour, so a card needs no image asset. */
  bg: string;
  color: string;
  review: string;
};

/** A testimonial as the CMS stores it — presentation fields are derived. */
export type CmsTestimonial = {
  id?: string;
  name?: string;
  location?: string;
  destination?: string;
  rating?: number;
  review?: string;
};

/** Avatar palette, cycled by index so adjacent cards never share a colour. */
const AVATAR_PALETTE = [
  { bg: "#FFF3EA", color: "#C2410C" },
  { bg: "#FFFBEB", color: "#B45309" },
  { bg: "#FFF0F3", color: "#9D174D" },
] as const;

/** "Ankit & Sunita Patel" -> "AP"; falls back to a neutral mark. */
const initialsFrom = (name: string) => {
  const words = name.trim().split(/\s+/).filter((w) => /[a-z]/i.test(w));
  if (!words.length) return "★";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
};

/**
 * Turn a CMS row into something renderable.
 *
 * The editor supplies the words; initials and avatar colours are computed here
 * so the CMS form stays four plain fields and a star picker rather than asking
 * a content editor to choose hex codes. Rows with no review text are dropped —
 * the server strips them too, but a stale document could still hold one.
 */
export const fromCms = (rows: CmsTestimonial[] | undefined): Testimonial[] =>
  (rows ?? [])
    .filter((r) => r.review?.trim())
    .map((r, i) => {
      const name = (r.name || "").trim() || "Traveller";
      const palette = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
      return {
        id: r.id ?? `cms-${i}`,
        name,
        location: (r.location || "").trim(),
        destination: (r.destination || "").trim(),
        // Clamp to the 1–5 the UI can draw; default to 5 for legacy rows.
        rating: Math.min(5, Math.max(1, Math.round(r.rating ?? 5))),
        initials: initialsFrom(name),
        bg: palette.bg,
        color: palette.color,
        review: r.review!.trim(),
      };
    });

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1, name: "Rajesh Sharma", location: "Delhi, India", destination: "Dwarka",
    rating: 5, initials: "RS", bg: "#FFF3EA", color: "#C2410C",
    review: "An absolutely soul-stirring experience. The Dwarkadhish temple darshan at sunrise was something I will carry in my heart forever. The team arranged everything flawlessly — from the hotel to the evening aarti. Truly divine.",
  },
  {
    id: 2, name: "Priya Mehta", location: "Mumbai, Maharashtra", destination: "Somnath",
    rating: 5, initials: "PM", bg: "#FFFBEB", color: "#B45309",
    review: "The Somnath temple light and sound show in the evening gave me goosebumps. Our guide was incredibly knowledgeable about the history and significance of each spot. Hotel was right by the sea — woke up to the sound of waves every morning.",
  },
  {
    id: 3, name: "Ankit & Sunita Patel", location: "Ahmedabad, Gujarat", destination: "Sacred Gujarat",
    rating: 5, initials: "AP", bg: "#FFF0F3", color: "#9D174D",
    review: "We celebrated our 25th anniversary on this tour and it couldn't have been more perfect. The premium package meant zero stress — every detail was taken care of. Bet Dwarka ferry ride was the highlight. Will come back every year.",
  },
  {
    id: 4, name: "Kavitha Nair", location: "Bengaluru, Karnataka", destination: "Somnath",
    rating: 5, initials: "KN", bg: "#FFF3EA", color: "#C2410C",
    review: "I was traveling solo as a woman and felt completely safe and well taken care of throughout. The coastal walk near Somnath beach at dusk is pure magic. The prasad thali arranged by the team was a lovely personal touch.",
  },
  {
    id: 5, name: "Suresh Iyer", location: "Chennai, Tamil Nadu", destination: "Dwarka",
    rating: 5, initials: "SI", bg: "#FFFBEB", color: "#B45309",
    review: "From the moment we landed in Gujarat, everything was seamless. The driver knew every temple and legend by heart. Rukmini Devi temple visit was unexpectedly moving. Highly recommend for families with elders — very comfortable pace.",
  },
  {
    id: 6, name: "Meena & Ramesh Gupta", location: "Jaipur, Rajasthan", destination: "Bet Dwarka",
    rating: 5, initials: "MG", bg: "#FFF0F3", color: "#9D174D",
    review: "Bet Dwarka is something most people miss and we are so glad we didn't. The boat ride, the smaller temples, the quieter energy — it felt like stepping back 5,000 years. Our guide recited shlokas at the ghat. Absolutely unforgettable.",
  },
  {
    id: 7, name: "Deepak Verma", location: "Pune, Maharashtra", destination: "Dwarka",
    rating: 5, initials: "DV", bg: "#FFF3EA", color: "#C2410C",
    review: "Booked the premium package for my parents' 60th birthday pilgrimage. The team went above and beyond — special seating arrangements, wheelchair assistance, personalised itinerary. My parents were in tears of joy. Thank you.",
  },
  {
    id: 8, name: "Archana Joshi", location: "Nagpur, Maharashtra", destination: "Somnath",
    rating: 5, initials: "AJ", bg: "#FFFBEB", color: "#B45309",
    review: "I had visited Somnath 15 years ago on my own. This time with a proper tour was a completely different and far richer experience. Learning the history, standing at the shore pillar pointing to the South Pole — it puts things in perspective.",
  },
  {
    id: 9, name: "Vikram Singh", location: "Lucknow, Uttar Pradesh", destination: "Dwarka",
    rating: 5, initials: "VS", bg: "#FFF0F3", color: "#9D174D",
    review: "Came with a group of 12 and the coordination was impeccable. Nageshwar Jyotirlinga and Gopi Talav were spots I hadn't even known about. The team curated hidden gems alongside the main temples. Entire group is already planning a return.",
  },
];
