/**
 * Copy and imagery for the interest hubs (hub_kind === "vertical") —
 * /wildlife-nature-tours/ and /heritage-tours-gujarat/.
 *
 * These are not package shelves: their spokes are places and guides, so the
 * cards carry a picture and a descriptor rather than a price and a duration.
 *
 * PLACEHOLDER IMAGERY: the Unsplash URLs below are stand-ins chosen by subject
 * (a stepwell, a grassland, a waterfall), not photographs of these specific
 * sites — the same convention the home-page rail already uses. Upload a real
 * hero image per spoke in admin and it should win over these.
 */
export type InterestTheme = {
  /** Eyebrow above the hero headline. */
  eyebrow: string;
  /** Short label used in CTA copy and the FAQ. */
  name: string;
  /** Shown under the headline until an editor writes an `answer_first`. */
  standfirst: string;
  /** Chips under the headline, topping up whatever the CMS h1 subtitle gives. */
  highlights: string[];
  /**
   * Word to start the headline's second line on, so the wrap is deliberate
   * rather than left to the viewport. Omit to let it flow.
   */
  headlineBreakBefore?: string;
  /** Heading above the card grid. */
  gridHeading: string;
  gridBlurb: string;
};

export const INTEREST_THEMES: Record<string, InterestTheme> = {
  "wildlife-nature-tours": {
    eyebrow: "Explore by interest",
    name: "wildlife & nature",
    standfirst:
      "Gujarat holds animals found nowhere else in India — the last wild Asiatic lions at Gir, the wild ass of the Little Rann, and the largest blackbuck herds in the country at Velavadar. Add a coral park off Jamnagar, a winter lake full of migratory birds and the monsoon waterfalls of the Dangs, and the state carries more range than its desert reputation suggests.",
    highlights: ["Safari parks", "Bird sanctuaries", "Monsoon waterfalls"],
    headlineBreakBefore: "Nature",
    gridHeading: "Where the wild things are",
    gridBlurb:
      "Each park runs on its own season, permit system and timings. Open one for what it takes to visit.",
  },
  "heritage-tours-gujarat": {
    eyebrow: "Explore by interest",
    name: "heritage",
    standfirst:
      "Four UNESCO World Heritage inscriptions sit inside Gujarat: the stepwell at Patan, the Harappan city at Dholavira, the Champaner-Pavagadh park and the walled city of Ahmedabad — India's first World Heritage City. Around them are the Indus port at Lothal, the palaces of Vadodara and stepwells that read as architecture rather than plumbing.",
    highlights: ["4 UNESCO sites", "Stepwells", "Palaces & museums"],
    headlineBreakBefore: "Tours",
    gridHeading: "The places worth the detour",
    gridBlurb:
      "Ticketed monuments, walking routes and museum complexes. Open one for timings, access and what to expect.",
  },
  circuits: {
    eyebrow: "Explore by interest",
    name: "themed circuits",
    standfirst:
      "Routes built around a single thread rather than a region — following one story across the state, stop by stop.",
    highlights: ["Themed routes", "Multi-stop", "Across Gujarat"],
    gridHeading: "Follow a thread",
    gridBlurb: "Multi-stop routes tied together by a theme rather than a map.",
  },
};

export const DEFAULT_INTEREST_THEME: InterestTheme = {
  eyebrow: "Explore by interest",
  name: "Gujarat",
  standfirst: "",
  highlights: [],
  gridHeading: "Explore",
  gridBlurb: "Open one for the full guide.",
};

export const interestThemeFor = (slug: string): InterestTheme =>
  INTEREST_THEMES[slug] ?? DEFAULT_INTEREST_THEME;

/** Subject-matched stand-in imagery, keyed by spoke slug. See the note above. */
export const INTEREST_SPOKE_IMAGES: Record<string, string> = {
  // Wildlife & nature
  "velavadar-blackbuck-national-park":
    "https://images.unsplash.com/photo-1551845041-63e8e76836ea?w=800&q=75&auto=format&fit=crop",
  "wild-ass-sanctuary-little-rann":
    "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=75&auto=format&fit=crop",
  "marine-national-park-jamnagar":
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=75&auto=format&fit=crop",
  "nalsarovar-bird-sanctuary":
    "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=75&auto=format&fit=crop",
  "gujarat-waterfalls-guide":
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=75&auto=format&fit=crop",
  "saputara-hill-station":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75&auto=format&fit=crop",

  // Heritage
  "unesco-world-heritage-sites":
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=75&auto=format&fit=crop",
  "rani-ki-vav-patan":
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=75&auto=format&fit=crop",
  "dholavira-harappan-city":
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=75&auto=format&fit=crop",
  "historic-ahmedabad-heritage-walk":
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=75&auto=format&fit=crop",
  "gujarat-stepwells-vav-guide":
    "https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?w=800&q=75&auto=format&fit=crop",
  "lothal-indus-valley-site":
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=75&auto=format&fit=crop",
  "vadodara-palaces-laxmi-vilas":
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=75&auto=format&fit=crop",
  "kutch-museums-smritivan-bhuj":
    "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=75&auto=format&fit=crop",

  // Circuits
  "gandhi-circuit-gujarat":
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=75&auto=format&fit=crop",
};

/** Last-resort image if a URL above ever dies, so a card never shows a broken icon. */
export const INTEREST_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=75&auto=format&fit=crop";

/** Rotated when a spoke has no entry above, so a new spoke still shows a card. */
export const INTEREST_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=75&auto=format&fit=crop",
];
