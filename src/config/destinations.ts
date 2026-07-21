/**
 * Visual identity for the destination hubs (hub_kind === "destination").
 *
 * `photo` is set only where the repo actually holds a picture of that place.
 * The rest fall back to their accent gradient and monogram: showing a Somnath
 * photograph on the Saputara page would be a small lie, and a traveller
 * choosing a hill station deserves not to be sold a temple by accident. Drop a
 * real image into /public/images and add it here to upgrade a card.
 */
export type DestinationTheme = {
  /** Short display name for the hero eyebrow and cards. */
  name: string;
  /** Tailwind `from`/`to` stops for the accent gradient. */
  accent: [string, string];
  /** Local photo, where one exists. */
  photo?: string;
  /** A short summary of the place, shown under the hero headline until an
   * editor writes an `answer_first` on the hub doc. */
  standfirst?: string;
  /**
   * Chips for under the headline. The hero prefers the subtitle an editor
   * wrote in the CMS h1 and tops up from here, so a hub whose h1 carries no
   * subtitle (or only one) still shows a full row.
   */
  highlights?: string[];
};

export const DESTINATION_THEMES: Record<string, DestinationTheme> = {
  "gir-tour-package": {
    name: "Gir",
    accent: ["#166534", "#65A30D"],
    photo: "/images/gir/gir-hero.jpg",
    standfirst:
      "Gir is the only place on earth where the Asiatic lion still lives wild, in a dry deciduous forest spread across Junagadh, Gir Somnath and Amreli. Trips here are built around a permit-based jeep safari from Sasan Gir, with the Devalia enclosure as the reliable alternative when slots are gone. The park closes through the monsoon, so dates matter more here than anywhere else in Gujarat.",
    highlights: ["Asiatic lions", "Sasan Gir", "Devalia zone"],
  },
  "statue-of-unity-tour-package": {
    name: "Statue of Unity",
    accent: ["#0F766E", "#0891B2"],
    photo: "/images/home/StatueOfUnity.webp",
    standfirst:
      "The Statue of Unity stands 182 metres over the Narmada at Kevadia, facing the Sardar Sarovar dam — the tallest statue in the world, with a viewing gallery inside the figure. Around it sits a built-up visitor complex of gardens, a jungle safari park and a river valley, which is why most travellers come from Vadodara, Ahmedabad or Surat for a day or an overnight rather than a long stay.",
    highlights: ["Kevadia", "Viewing gallery", "Narmada dam"],
  },
  "kutch-tour-package": {
    name: "Kutch",
    accent: ["#7C2D12", "#EA580C"],
    standfirst:
      "Kutch is the largest district in India and the strangest landscape in Gujarat: a salt flat that turns to white desert after the water dries, walled villages where embroidery and bell-metal work are still household trades, and Dholavira, a Harappan city on an island in the Rann. Most visits centre on Bhuj, with the white Rann at sunset and craft villages by day.",
    highlights: ["White Rann", "Bhuj", "Dholavira"],
  },
  "ambaji-tour-package": {
    name: "Ambaji",
    accent: ["#9D174D", "#DB2777"],
    standfirst:
      "Ambaji is one of the fifty-one Shakti Peeths, set in the Aravalli foothills near the Rajasthan border, where the shrine holds no idol but an inscribed yantra. It pairs naturally with Mount Abu an hour away and with the marble Jain temples at Kumbhariya, and it draws its largest crowds during Bhadarvi Poonam, when pilgrims walk in from across the state.",
    highlights: ["Shakti Peeth", "Gabbar Hill", "Mount Abu nearby"],
  },
  "palitana-tour-package": {
    name: "Palitana",
    accent: ["#1E3A8A", "#3B82F6"],
    standfirst:
      "Palitana is the centre of the Jain world: nearly nine hundred temples crowd the summit of Shatrunjaya hill, reached by a climb of roughly 3,800 steps that pilgrims start before dawn. Doli chairs with porters are available for those who cannot walk it. The temples close at dusk — nobody, including monks, stays on the hill overnight.",
    highlights: ["Jain temples", "Shatrunjaya hill", "Bhavnagar nearby"],
  },
  "diu-tour-package": {
    name: "Diu",
    accent: ["#0C4A6E", "#0EA5E9"],
    standfirst:
      "Diu is a small island off the Saurashtra coast, Portuguese until 1961 and still visibly so in its sea fort, its churches and its quiet lanes. Beaches at Nagoa and Ghoghla, a slower pace and a licensing regime unlike the rest of Gujarat make it the usual soft landing at the end of a Somnath or Gir trip.",
    highlights: ["Nagoa beach", "Diu Fort", "Somnath nearby"],
  },
  "saputara-tour-package": {
    name: "Saputara",
    accent: ["#14532D", "#22C55E"],
    standfirst:
      "Saputara is Gujarat's only hill station, sitting on a plateau in the Dang forests near the Maharashtra border. A lake at its centre, viewpoints over the Sahyadris and tribal villages around it make it a two-day trip from Surat or Ahmedabad — greenest and busiest through the monsoon, when the state runs its festival here.",
    highlights: ["Hill station", "Saputara lake", "Dang forests"],
  },
  "ahmedabad-tour-package": {
    name: "Ahmedabad",
    accent: ["#78350F", "#D97706"],
    standfirst:
      "Ahmedabad's walled city is India's first UNESCO World Heritage City: a dense grid of pols — self-contained residential clusters with carved wooden facades and shared courtyards — alongside Indo-Islamic mosques and stepwells at Adalaj and Dada Harir. It also works as the base for day trips to Modhera, Patan and the Rann.",
    highlights: ["Walled city pols", "Stepwells", "Day trips"],
  },
  "porbandar-tour-package": {
    name: "Porbandar",
    accent: ["#3730A3", "#6366F1"],
    standfirst:
      "Porbandar is where Gandhi was born, in a house preserved beside the Kirti Mandir memorial, and where tradition places Sudama's town. It sits midway along the coast road between Dwarka and Somnath, which is why it most often enters an itinerary as a half-day stop rather than a destination in itself.",
    highlights: ["Kirti Mandir", "Sudama Mandir", "Coast road"],
  },
};

/** Neutral theme for a destination hub added to the CMS before it is themed. */
export const DEFAULT_DESTINATION_THEME: DestinationTheme = {
  name: "Gujarat",
  accent: ["#7C2D12", "#EA580C"],
};

export const themeFor = (slug: string): DestinationTheme =>
  DESTINATION_THEMES[slug] ?? DEFAULT_DESTINATION_THEME;
