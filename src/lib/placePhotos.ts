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
  "somnath/triveni-sangam": {
    src: "/images/places/somnath/triveni-sangam.webp",
    alt: "Sunset over the water at Triveni Ghat, Somnath",
    credit: "Sangita Pujara / CC BY-SA 3.0",
  },
  "somnath/somnath-beach": {
    src: "/images/places/somnath/somnath-beach.webp",
    alt: "Evening crowds on Somnath beach at sunset",
    credit: "Dhimant2702 / CC BY-SA 4.0",
  },
  "somnath/panchpandav-gufa": {
    src: "/images/places/somnath/panchpandav-gufa.webp",
    alt: "Entrance to a rock cave shrine",
    credit: "", // supplied by the site owner
  },
  "somnath/prabhas-patan-museum": {
    src: "/images/places/somnath/prabhas-patan-museum.webp",
    alt: "Museum gallery with sculptures in lit display cases",
    credit: "", // supplied by the site owner
  },
  "somnath/dehotsarg-tirth": {
    src: "/images/places/somnath/dehotsarg-tirth.webp",
    alt: "Pillared mandap at Dehotsarg Tirth overlooking the fields",
    credit: "", // supplied by the site owner
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
  "dwarka/iskcon-dwarka": {
    src: "/images/places/dwarka/iskcon-dwarka.webp",
    alt: "Red sandstone ISKCON temple with carved towers",
    credit: "", // supplied by the site owner
  },
  "dwarka/gopi-talav": {
    src: "/images/places/dwarka/gopi-talav.webp",
    alt: "The still water and wooded bank of Gopi Talav",
    credit: "", // supplied by the site owner
  },
  "dwarka/sudarshan-setu": {
    src: "/images/places/dwarka/sudarshan-setu.webp",
    alt: "The pylon and deck of the Sudarshan Setu cable-stayed bridge",
    credit: "AshishRajeshValanju / CC BY-SA 4.0",
  },
  "dwarka/hanuman-dandi": {
    src: "/images/places/dwarka/hanuman-dandi.webp",
    alt: "Entrance gate of the Hanuman Dandi temple on Bet Dwarka",
    credit: "Dhaval.purohit84 / CC BY-SA 4.0",
  },
  "dwarka/okha-port": {
    src: "/images/places/dwarka/okha-port.webp",
    alt: "Okha town with cargo ships anchored offshore",
    credit: "Amiwins / CC BY-SA 4.0",
  },
  "dwarka/dwarka-lighthouse": {
    src: "/images/places/dwarka/dwarka-lighthouse.webp",
    alt: "The Dwarka lighthouse above the Arabian Sea",
    credit: "VasuVR / CC BY-SA 4.0",
  },
};

/**
 * Portrait shot of the destination's main temple, used as the side panel on the
 * timings card. Same sourcing and credit rules as PLACE_PHOTOS above.
 */
const TEMPLE_PHOTOS: Record<string, PlacePhoto> = {
  somnath: {
    src: "/images/temples/somnath-timings.webp",
    alt: "The flag-topped shikhara of the Somnath Temple",
    credit: "Aditya Mahar / CC BY-SA 4.0",
  },
  dwarka: {
    src: "/images/temples/dwarka-timings.webp",
    alt: "The Dwarkadhish Temple rising above the Gomti ghat",
    credit: "Njoy deep / CC BY-SA 4.0",
  },
};

export function findPlacePhoto(destination: string, place: string): PlacePhoto | null {
  return PLACE_PHOTOS[`${destination}/${place}`] ?? null;
}

export function findTemplePhoto(destination: string): PlacePhoto | null {
  return TEMPLE_PHOTOS[destination] ?? null;
}

/** Distinct credits for every photo shown on one destination page, in order. */
export function placePhotoCredits(destination: string, places: { slug: string }[]): string[] {
  const seen = new Set<string>();
  const temple = findTemplePhoto(destination)?.credit;
  if (temple) seen.add(temple);
  for (const p of places) {
    const credit = findPlacePhoto(destination, p.slug)?.credit;
    if (credit) seen.add(credit);
  }
  return [...seen];
}
