import { SEED_DESTINATIONS, type SeedDestination } from "@/src/lib/seed/destinations";
import { DESTINATION_META, type DestinationMeta, type IconKey } from "@/src/lib/seed/destinationMeta";
import { findPlacePhoto, findReachPhoto, findTemplePhoto } from "@/src/lib/placePhotos";
import { ICONS } from "./icons";

/*
  Dataset items for the destination pillars (/somnath/, /dwarka/) and the
  hero/display data every destination pillar uses (also /gir/ and
  /junagadh-girnar/). Built from the seed files plus the photo maps in
  lib/placePhotos.ts, so the photos become editable item by item while the
  code files stay the defaults. Registered in src/lib/cms-groups/destinations.ts.
*/

/** One "Places to visit" card, which is also the page /<destination>/places/<slug>/. */
export type PillarPlace = SeedDestination["top_places"][number] & {
  /** Card photo (https URL or /images/... path); "" shows the glyph panel. */
  image: string;
  image_alt: string;
};

export type PillarItem = Omit<SeedDestination, "top_places"> & { top_places: PillarPlace[] };

export const PILLAR_ITEMS: PillarItem[] = SEED_DESTINATIONS.map((d) => ({
  ...d,
  top_places: d.top_places.map((p) => {
    const photo = findPlacePhoto(d.slug, p.slug);
    return { ...p, image: photo?.src ?? "", image_alt: photo?.alt ?? "" };
  }),
}));

/** Hero and display data of a destination pillar (DESTINATION_META plus its photos). */
export type DestinationHeroItem = {
  slug: string;
  /** "" paints the accent backdrop instead of a photo. */
  heroImage: string;
  deity: string;
  deityShort: string;
  accent: string;
  accentSoft: string;
  glyph: string;
  tagline: string;
  chips: { icon: string; label: string }[];
  stats: { value: string; label: string; icon: string }[];
  reach: { icon: string; mode: string; detail: string; photo: string; photo_alt: string }[];
  placeIcon: string;
  /** Side photo on the temple-timings card (Somnath and Dwarka only); "" for none. */
  templePhoto: string;
  templePhotoAlt: string;
};

export const DESTINATION_HERO_ITEMS: DestinationHeroItem[] = Object.values(DESTINATION_META).map((m) => {
  const temple = findTemplePhoto(m.slug);
  return {
    slug: m.slug,
    heroImage: m.heroImage ?? "",
    deity: m.deity,
    deityShort: m.deityShort,
    accent: m.accent,
    accentSoft: m.accentSoft,
    glyph: m.glyph,
    tagline: m.tagline,
    chips: m.chips.map((c) => ({ icon: c.icon, label: c.label })),
    stats: m.stats.map((s) => ({ value: s.value, label: s.label, icon: s.icon })),
    reach: m.reach.map((r) => {
      const photo = findReachPhoto(r.icon);
      return { icon: r.icon, mode: r.mode, detail: r.detail, photo: photo?.src ?? "", photo_alt: photo?.alt ?? "" };
    }),
    placeIcon: m.placeIcon,
    templePhoto: temple?.src ?? "",
    templePhotoAlt: temple?.alt ?? "",
  };
});

export const ICON_KEYS = Object.keys(ICONS) as IconKey[];

/** An icon key from the CMS, or "landmark" when it is not one the site knows. */
export const iconKey = (k: string): IconKey => (ICON_KEYS.includes(k as IconKey) ? (k as IconKey) : "landmark");

/** The hero item as the DestinationMeta the hero component takes (icons checked, plain data only). */
export function heroMeta(item: DestinationHeroItem): DestinationMeta {
  return {
    slug: item.slug,
    ...(item.heroImage ? { heroImage: item.heroImage } : {}),
    deity: item.deity,
    deityShort: item.deityShort,
    accent: item.accent,
    accentSoft: item.accentSoft,
    glyph: item.glyph,
    tagline: item.tagline,
    chips: item.chips.map((c) => ({ icon: iconKey(c.icon), label: c.label })),
    stats: item.stats.map((s) => ({ value: s.value, label: s.label, icon: iconKey(s.icon) })),
    reach: item.reach.map((r) => ({ icon: iconKey(r.icon), mode: r.mode, detail: r.detail })),
    placeIcon: iconKey(item.placeIcon),
  };
}
