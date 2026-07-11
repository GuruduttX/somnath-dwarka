/**
 * Presentation-only metadata for the destination pillar pages (Somnath / Dwarka).
 * Pure serialisable data (strings + icon *keys*) so it can cross the
 * server → client boundary into <DestinationHero>. Facts here mirror the
 * verified seed content in ./destinations.ts — this file only adds display
 * flourish (hero image, accent colour, icons), never new claims.
 */

export type IconKey =
  | "plane"
  | "train"
  | "car"
  | "sun"
  | "clock"
  | "route"
  | "landmark"
  | "waves"
  | "moon"
  | "flower"
  | "star"
  | "flame";

export type DestinationMeta = {
  slug: string;
  /**
   * Optional. Without it the hero paints an accent-tinted backdrop instead of a
   * photo — better than shipping a stock image of the wrong place. Gir has no
   * photograph in the repo yet.
   */
  heroImage?: string;
  /** Devotional line under the eyebrow, e.g. "Lord Shiva · First Jyotirlinga". */
  deity: string;
  deityShort: string;
  /** Secondary accent (site stays orange-led; this tints deity badge + glow). */
  accent: string;
  accentSoft: string;
  glyph: string; // large watermark glyph in the hero
  tagline: string;
  chips: { icon: IconKey; label: string }[];
  stats: { value: string; label: string; icon: IconKey }[];
  reach: { icon: IconKey; mode: string; detail: string }[];
  placeIcon: IconKey;
};

export const DESTINATION_META: Record<string, DestinationMeta> = {
  /** Junagadh–Girnar: a sacred mountain climb rather than a single temple. */
  "junagadh-girnar": {
    slug: "junagadh-girnar",
    heroImage: "/images/junagadh-girnar/junagadh-girnar-hero.jpg",
    deity: "Girnar · Jain & Hindu tirth",
    deityShort: "Girnar climb",
    accent: "#B45309",
    accentSoft: "rgba(180,83,9,0.16)",
    glyph: "गिरनार",
    tagline:
      "A sacred mountain of roughly ten thousand steps — Jain and Hindu summit temples, the ropeway, Uparkot Fort and the Bhavnath fair.",
    chips: [
      { icon: "landmark", label: "~10,000 steps to the top" },
      { icon: "route", label: "Ropeway to Amba Mata" },
      { icon: "sun", label: "Oct – Mar best" },
    ],
    stats: [
      { value: "~10k", label: "steps to the summit", icon: "landmark" },
      { value: "2 days", label: "comfortable stay", icon: "clock" },
      { value: "2 faiths", label: "Jain & Hindu tirth", icon: "star" },
      { value: "85 km", label: "to Somnath", icon: "route" },
    ],
    reach: [
      { icon: "plane", mode: "By Air", detail: "Rajkot ~100 km" },
      { icon: "train", mode: "By Rail", detail: "Junagadh station · Ahmedabad–Veraval line" },
      { icon: "car", mode: "By Road", detail: "From Rajkot, Somnath or Gir" },
    ],
    placeIcon: "landmark",
  },
  /** Gir is not a temple town, so `deity` carries what people actually come for. */
  gir: {
    slug: "gir",
    heroImage: "/images/gir/gir-hero.jpg",
    deity: "Asiatic Lion · Sasan Gir",
    deityShort: "Asiatic lion",
    accent: "#15803D",
    accentSoft: "rgba(21,128,61,0.16)",
    glyph: "गिर",
    tagline:
      "The only place on earth where the Asiatic lion still lives wild — safari permits, Devalia, and the drive from Somnath.",
    chips: [
      { icon: "star", label: "Only wild Asiatic lions" },
      { icon: "landmark", label: "Sasan gate · Devalia" },
      { icon: "sun", label: "Dec – Mar best" },
    ],
    stats: [
      { value: "1", label: "wild lion range on earth", icon: "star" },
      { value: "1–2 nights", label: "typical stay", icon: "clock" },
      { value: "2", label: "gates: Sasan & Devalia", icon: "landmark" },
      { value: "45 km", label: "to Somnath", icon: "route" },
    ],
    reach: [
      { icon: "plane", mode: "By Air", detail: "Rajkot ~160 km · Diu ~110 km" },
      { icon: "train", mode: "By Rail", detail: "Sasan Gir halt · Junagadh ~60 km" },
      { icon: "car", mode: "By Road", detail: "From Somnath, Junagadh or Veraval" },
    ],
    placeIcon: "landmark",
  },
  somnath: {
    slug: "somnath",
    heroImage: "/images/home/SomnathLongImage.webp",
    deity: "Lord Shiva · First Jyotirlinga",
    deityShort: "Shiva Jyotirlinga",
    accent: "#7C3AED",
    accentSoft: "rgba(124,58,237,0.16)",
    glyph: "ॐ",
    tagline:
      "Where the eternal jyotirlinga meets the Arabian Sea — plan your darshan, the evening aarti and the light-and-sound show.",
    chips: [
      { icon: "flame", label: "First Jyotirlinga" },
      { icon: "waves", label: "Seaside temple" },
      { icon: "sun", label: "Oct – Mar season" },
    ],
    stats: [
      { value: "1st", label: "of 12 Jyotirlingas", icon: "flame" },
      { value: "1 day", label: "ideal darshan stay", icon: "clock" },
      { value: "3+", label: "sacred sites nearby", icon: "landmark" },
      { value: "233 km", label: "to Dwarka", icon: "route" },
    ],
    reach: [
      { icon: "plane", mode: "By Air", detail: "Diu ~85 km · Rajkot ~190 km" },
      { icon: "train", mode: "By Rail", detail: "Veraval railhead ~7 km" },
      { icon: "car", mode: "By Road", detail: "From Dwarka, Rajkot or Ahmedabad" },
    ],
    placeIcon: "landmark",
  },
  dwarka: {
    slug: "dwarka",
    heroImage: "/images/home/DwarikaLongImage.webp",
    deity: "Lord Krishna · One of the Char Dham",
    deityShort: "Krishna Char Dham",
    accent: "#0D9488",
    accentSoft: "rgba(13,148,136,0.16)",
    glyph: "卐",
    tagline:
      "Krishna's ancient kingdom on Gujarat's western tip — Dwarkadhish darshan, Nageshwar Jyotirlinga and Bet Dwarka by ferry.",
    chips: [
      { icon: "star", label: "One of Char Dham" },
      { icon: "flower", label: "Krishna's Dwarka" },
      { icon: "sun", label: "Oct – Mar season" },
    ],
    stats: [
      { value: "1 of 4", label: "Char Dham sites", icon: "star" },
      { value: "1–2 days", label: "ideal darshan stay", icon: "clock" },
      { value: "3+", label: "sacred sites nearby", icon: "landmark" },
      { value: "233 km", label: "to Somnath", icon: "route" },
    ],
    reach: [
      { icon: "plane", mode: "By Air", detail: "Jamnagar ~130 km" },
      { icon: "train", mode: "By Rail", detail: "Dwarka station · Ahmedabad–Okha line" },
      { icon: "car", mode: "By Road", detail: "From Rajkot, Jamnagar or Somnath" },
    ],
    placeIcon: "flower",
  },
};

export const findDestinationMeta = (slug: string): DestinationMeta | null =>
  DESTINATION_META[slug] ?? null;
