type TextItem = {
  description?: string;
};

type ImageItem = {
  image?: string;
  alt?: string;
};

export type AdminPackageRecord = {
  _id?: unknown;
  slug?: string;
  title?: string;
  category?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  duration?: string;
  status?: "draft" | "published";
  days?: number;
  nights?: number;
  destination?: string;
  overview?: string;
  highlights?: TextItem[];
  inclusions?: TextItem[];
  heroImage?: ImageItem;
  childImages?: ImageItem[];
  routes?: {
    source?: string;
    destination?: string;
  };
  isTransferIncluded?: boolean;
  isStayIncluded?: boolean;
  isBreakfastIncluded?: boolean;
  isSightseeingIncluded?: boolean;
};

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  location: string;
  duration: string;
  groupType: string;
  days: number;
  price: number;
  originalPrice: number;
  inclusions: string[];
  images: string[];
  href: string;
  badge?: string;
  popular?: boolean;
  rating?: number;
  reviews?: number;
  overview?: string;
}

const packagePath = (slug: string) => `/somnath-dwarka-tour-package/${slug}/`;

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=75&auto=format&fit=crop",
];

const includedWhenTrue = (pkg: AdminPackageRecord) => [
  pkg.isTransferIncluded ? "Private AC transfer" : "",
  pkg.isStayIncluded ? "Hotel stay" : "",
  pkg.isBreakfastIncluded ? "Daily breakfast" : "",
  pkg.isSightseeingIncluded ? "Sightseeing support" : "",
].filter(Boolean);

const inferDays = (duration?: string, days?: number) => {
  if (typeof days === "number" && days > 0) return days;
  const match = duration?.match(/(\d+)\s*(?:day|days)/i);
  return match ? Number(match[1]) : 1;
};

const normalizeDuration = (duration: string | undefined, days: number, nights?: number) => {
  if (duration?.trim()) return duration.trim();
  if (nights && nights > 0) return `${days} Days / ${nights} Nights`;
  return `${days} Day${days === 1 ? "" : "s"}`;
};

const inferBadge = (pkg: AdminPackageRecord, index: number) => {
  if (pkg.category) return pkg.category;
  if (index === 0) return "Featured";
  if (pkg.price && pkg.price <= 12000) return "Budget Pick";
  if (inferDays(pkg.duration, pkg.days) >= 5) return "Complete Tour";
  return "Curated";
};

export function mapAdminPackageToTourCard(
  pkg: AdminPackageRecord,
  index: number,
): TourPackage | null {
  if (!pkg.slug || !pkg.title) return null;

  const days = inferDays(pkg.duration, pkg.days);
  const images = [
    pkg.heroImage?.image,
    ...(pkg.childImages ?? []).map((image) => image.image),
  ].filter((image): image is string => Boolean(image?.trim()));

  const inclusions = [
    ...(pkg.inclusions ?? []).map((item) => item.description).filter(Boolean),
    ...includedWhenTrue(pkg),
  ].filter((item, itemIndex, all): item is string => Boolean(item) && all.indexOf(item) === itemIndex);

  return {
    id: pkg._id ? String(pkg._id) : pkg.slug,
    slug: pkg.slug,
    title: pkg.title,
    location: pkg.destination || [pkg.routes?.source, pkg.routes?.destination].filter(Boolean).join(" to ") || "Somnath Dwarka",
    duration: normalizeDuration(pkg.duration, days, pkg.nights),
    groupType: pkg.category || "Private Trip",
    days,
    price: Number(pkg.price || 0),
    // Was `Math.round(pkg.price * 1.18)` — a strikethrough "was" price invented
    // from the current one. The CMS carries no former price, so there is no
    // discount to show. Add an originalPrice field before rendering one again.
    originalPrice: 0,
    inclusions: inclusions.slice(0, 4),
    images: [...images, ...FALLBACK_IMAGES].slice(0, 5),
    href: packagePath(pkg.slug),
    badge: inferBadge(pkg, index),
    popular: index < 3,
    rating: pkg.rating,
    reviews: pkg.reviews,
    overview: pkg.overview,
  };
}

export function mapAdminPackagesToTourCards(packages: AdminPackageRecord[]) {
  return packages
    .filter((pkg) => pkg.status !== "draft")
    .map(mapAdminPackageToTourCard)
    .filter((pkg): pkg is TourPackage => Boolean(pkg));
}

/** Shape consumed by the destination carousels on the home page. */
export type CarouselCard = {
  id: string;
  slug: string;
  title: string;
  href: string;
  image: string;
  destination: string;
  days: number;
  nights: number;
  category: string;
  rating?: number;
  reviews?: number;
  isStayIncluded?: boolean;
  isBreakfastIncluded?: boolean;
  isSightseeingIncluded?: boolean;
  isTransferIncluded?: boolean;
};

/**
 * Cards for a destination carousel, drawn from published CMS packages.
 *
 * `rating` and `reviews` pass through only when the CMS actually holds them: the
 * carousels used to hardcode a 4.9 and a review count for packages that did not
 * exist, alongside a discount computed from an invented "original" price.
 */
export function toCarouselCards(
  records: AdminPackageRecord[],
  destination: string,
): CarouselCard[] {
  const needle = destination.toLowerCase();

  return records
    .map((record, index) => ({ record, card: mapAdminPackageToTourCard(record, index) }))
    .filter(
      (entry): entry is { record: AdminPackageRecord; card: TourPackage } =>
        Boolean(entry.card) && entry.card!.location.toLowerCase().includes(needle),
    )
    .map(({ record, card }) => ({
      id: card.id,
      slug: card.slug,
      title: card.title,
      href: card.href,
      image: card.images[0],
      destination: card.location,
      days: card.days,
      nights: Number(record.nights ?? Math.max(card.days - 1, 0)),
      category: card.groupType,
      rating: card.rating,
      reviews: card.reviews,
      isStayIncluded: record.isStayIncluded,
      isBreakfastIncluded: record.isBreakfastIncluded,
      isSightseeingIncluded: record.isSightseeingIncluded,
      isTransferIncluded: record.isTransferIncluded,
    }));
}
