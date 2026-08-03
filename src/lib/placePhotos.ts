/**
 * Photos for the "Places to visit" cards, keyed by `${destination}/${place}`
 * — the same pair that builds the place URL.
 *
 * A place with no entry here renders the icon-only card, so this map can be
 * filled a few landmarks at a time. To add one: drop the file in
 * `public/images/places/<destination>/<place>.webp` and add a line below.
 *
 * Every photo here came from Wikimedia Commons and was checked against the
 * landmark before being used. `credit` carries the attribution the licences
 * require — see PlacePhotoCredits, rendered under the grid. Anything added
 * later must carry a credit too, unless it is genuinely CC0/own work.
 */
export type PlacePhoto = {
  src: string;
  alt: string;
  /** Photographer + licence, e.g. "Vinayaraj / CC BY-SA 4.0". Empty for CC0. */
  credit: string;
};

const PLACE_PHOTOS: Record<string, PlacePhoto> = {
  // ── Somnath ──
  "somnath/somnath-temple": {
    src: "/images/places/somnath/somnath-temple.webp",
    alt: "The Somnath Temple complex in Prabhas Patan, Gujarat",
    credit: "Aditya Mahar / CC BY-SA 4.0",
  },
  "somnath/bhalka-tirth": {
    src: "/images/places/somnath/bhalka-tirth.webp",
    alt: "Bhalka Tirth temple at Veraval, framed by its sacred trees",
    credit: "", // CC0
  },
  "somnath/gita-mandir": {
    src: "/images/places/somnath/gita-mandir.webp",
    alt: "The red sandstone Gita Mandir near Triveni Sangam, Somnath",
    credit: "Vinayaraj / CC BY-SA 4.0",
  },
  "somnath/old-somnath-ahilyabai-temple": {
    src: "/images/places/somnath/old-somnath-ahilyabai-temple.webp",
    alt: "The older Somnath Mahadev temple rebuilt by Rani Ahilyabai Holkar",
    credit: "", // public domain
  },

  // ── Dwarka ──
  "dwarka/dwarkadhish-temple": {
    src: "/images/places/dwarka/dwarkadhish-temple.webp",
    alt: "The carved shikhara and flag of the Dwarkadhish Temple",
    credit: "Kunalmehra7 / CC BY-SA 3.0",
  },
  "dwarka/nageshwar-jyotirlinga": {
    src: "/images/places/dwarka/nageshwar-jyotirlinga.webp",
    alt: "The red and cream spires of the Nageshwar Jyotirlinga temple",
    credit: "YAKSH75 / CC BY 4.0",
  },
  "dwarka/bet-dwarka": {
    src: "/images/places/dwarka/bet-dwarka.webp",
    alt: "The ferry jetty and turquoise water at Bet Dwarka",
    credit: "Vinayaraj / CC BY-SA 4.0",
  },
  "dwarka/rukmini-temple": {
    src: "/images/places/dwarka/rukmini-temple.webp",
    alt: "Rukmini Devi Temple outside Dwarka at dusk",
    credit: "Vinayaraj / CC BY-SA 4.0",
  },
  "dwarka/gomti-ghat": {
    src: "/images/places/dwarka/gomti-ghat.webp",
    alt: "Pilgrims on the Gomti ghat steps below the Dwarkadhish Temple",
    credit: "Njoy deep / CC BY-SA 4.0",
  },
  "dwarka/sudama-setu": {
    src: "/images/places/dwarka/sudama-setu.webp",
    alt: "The Sudama Setu pedestrian suspension bridge over the Gomti creek",
    credit: "VasuVR / CC BY-SA 4.0",
  },
  "dwarka/shivrajpur-beach": {
    src: "/images/places/dwarka/shivrajpur-beach.webp",
    alt: "Clear water and pale sand at Shivrajpur Beach near Dwarka",
    credit: "", // CC0
  },
  "dwarka/dwarka-lighthouse": {
    src: "/images/places/dwarka/dwarka-lighthouse.webp",
    alt: "The Dwarka lighthouse above the Arabian Sea",
    credit: "VasuVR / CC BY-SA 4.0",
  },
};

export function findPlacePhoto(destination: string, place: string): PlacePhoto | null {
  return PLACE_PHOTOS[`${destination}/${place}`] ?? null;
}

/** Distinct credits for the places shown on one destination page, in order. */
export function placePhotoCredits(destination: string, places: { slug: string }[]): string[] {
  const seen = new Set<string>();
  for (const p of places) {
    const credit = findPlacePhoto(destination, p.slug)?.credit;
    if (credit) seen.add(credit);
  }
  return [...seen];
}
