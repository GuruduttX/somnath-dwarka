/**
 * Photos for the "Places to visit" cards, keyed by `${destination}/${place}`
 * — the same pair that builds the place URL.
 *
 * A place with no entry here renders the icon-only card, so this map can be
 * filled a few landmarks at a time. To add one: drop the file in
 * `public/images/places/<destination>/<place>.webp` and add a line below.
 *
 * Photos are checked against the landmark before being used. `credit` records
 * where one came from and under what licence — it is a provenance record only
 * and is NOT rendered on the page. Several entries are CC BY-SA, whose licence
 * requires visible attribution, so a credits line was deliberately removed at
 * the owner's request; restore one if these ever need to be licence-clean.
 */
export type PlacePhoto = {
  src: string;
  alt: string;
  /** Photographer + licence, e.g. "Vinayaraj / CC BY-SA 4.0". Not rendered. */
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

  // ── Gir ──
  "gir/kamleshwar-dam": {
    src: "/images/places/gir/kamleshwar-dam.webp",
    alt: "The Kamleshwar Dam reservoir with the Gir hills behind",
    credit: "Bernard Gagnon / CC BY-SA 3.0",
  },
  "gir/kankai-mata-temple": {
    src: "/images/places/gir/kankai-mata-temple.webp",
    alt: "The brightly painted Kankai Mata shrine deep inside the Gir forest",
    credit: "", // supplied by the site owner
  },
  "gir/tulsishyam": {
    src: "/images/places/gir/tulsishyam.webp",
    alt: "The carved entrance arch of the Tulsishyam temple",
    credit: "Gazal world / CC BY-SA 4.0",
  },

  // ── Junagadh–Girnar ──
  "junagadh-girnar/ashoka-rock-edict": {
    src: "/images/places/junagadh-girnar/ashoka-rock-edict.webp",
    alt: "The pavilion sheltering Ashoka's major rock edict at Junagadh",
    credit: "Snehrashmi / CC BY-SA 4.0",
  },
  "junagadh-girnar/damodar-kund": {
    src: "/images/places/junagadh-girnar/damodar-kund.webp",
    alt: "Pilgrims at Damodar Kund below the Girnar hills",
    credit: "Snehrashmi / CC BY-SA 4.0",
  },
  "junagadh-girnar/mahabat-maqbara": {
    src: "/images/places/junagadh-girnar/mahabat-maqbara.webp",
    alt: "The domes and carved facade of the Mahabat Maqbara mausoleum",
    credit: "Snehrashmi / CC BY-SA 4.0",
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

/**
 * Photo for each travel mode on the "How to reach" cards, keyed by the icon key
 * the seed data already carries. Shared by every destination template.
 */
const REACH_PHOTOS: Record<string, PlacePhoto> = {
  plane: { src: "/images/reach/air.webp", alt: "Aircraft wing above the clouds at sunset", credit: "" },
  train: { src: "/images/reach/rail.webp", alt: "Indian Railways passenger train on the tracks", credit: "" },
  car: { src: "/images/reach/road.webp", alt: "Car on an open Indian highway", credit: "" },
};

export function findReachPhoto(icon: string): PlacePhoto | null {
  return REACH_PHOTOS[icon] ?? null;
}

export function findPlacePhoto(destination: string, place: string): PlacePhoto | null {
  return PLACE_PHOTOS[`${destination}/${place}`] ?? null;
}

export function findTemplePhoto(destination: string): PlacePhoto | null {
  return TEMPLE_PHOTOS[destination] ?? null;
}
