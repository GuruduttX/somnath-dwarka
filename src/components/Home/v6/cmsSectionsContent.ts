import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of the CMS-backed home sections in ./cmsSections.tsx (traveller-type
  tiles, guides teaser, festivals teaser, data & research), editable through
  the CMS (the Claude connector's "page" type, id "home-package-sections").
  The tiles and cards themselves are the live packages, guides, festivals and
  data pages; only the words around them live here.
*/

export const HOME_CMS_SECTIONS_DEFAULTS = {
  personas: {
    title: "Plan by traveller type",
    /** A tile shows only while the package variant /somnath-dwarka-tour-package/<slug>/ exists. */
    tiles: [
      { slug: "for-family", label: "Families", blurb: "Pace and stops that suit children and elders" },
      { slug: "for-senior-citizens", label: "Senior citizens", blurb: "Accessibility, shorter days, wheelchair help" },
      { slug: "group", label: "Groups & satsang mandals", blurb: "Coaches, group darshan, bulk stays" },
      { slug: "for-nri-international", label: "NRI & international", blurb: "Airport transfers, longer circuits" },
    ],
  },
  guides: {
    title: "Travel guides & resources",
    allLink: "All travel guides →",
  },
  festivals: {
    eyebrow: "When to plan",
    title: "Festivals & yatra calendar",
    intro:
      "Janmashtami at Dwarka, Maha Shivratri at Somnath, and the Girnar parikrama shape when the temples are busiest. Planning around these events makes darshan far smoother.",
    /** Shown only while no festival is published in the CMS. */
    fallback: [
      { name: "Janmashtami", place: "Dwarka" },
      { name: "Maha Shivratri", place: "Somnath" },
      { name: "Girnar parikrama", place: "Junagadh" },
    ],
    fallbackNote: "busiest days at the temple",
    calendarEyebrow: "Full calendar",
    calendarLink: "See every festival date",
  },
  data: {
    eyebrow: "First-party research",
    title: "Our data & research",
    intro:
      "Datasets we keep for this route, from crowd patterns to fares and temple timings, so your plans rest on more than guesswork.",
  },
};

export type HomeCmsSectionsContent = typeof HOME_CMS_SECTIONS_DEFAULTS;

export const HOME_CMS_SECTIONS_PAGE: PageDef<HomeCmsSectionsContent> = {
  id: "home-package-sections",
  title: "Home page: traveller-type, guides, festivals & data sections",
  group: "Home page",
  path: "/",
  notes:
    "Four home-page sections built from live CMS items; this holds only their headings and fixed words. " +
    "personas.tiles[{slug, label, blurb}] are the 'Plan by traveller type' tiles: each links to /somnath-dwarka-tour-package/<slug>/ and shows only " +
    "while that package variant exists (a CMS package or a site_packages item), so slug must be an existing variant slug. " +
    "guides: heading and the 'all guides' link text of the guides teaser (it lists published guides). " +
    "festivals: eyebrow, title and intro of the festival calendar teaser; fallback[{name, place}] + fallbackNote show only while no festival is " +
    "published; calendarEyebrow/calendarLink are the dark tile linking to /festivals/. data: eyebrow, title and intro of the data & research teaser " +
    "(shown only when data pages are published). All fields are plain text.",
  defaults: HOME_CMS_SECTIONS_DEFAULTS,
};
