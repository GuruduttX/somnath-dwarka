/**
 * Central read layer over the CMS for public pages + sitemap.
 *
 * Each getter returns plain, index-safe data (published, non-noindex only) and
 * fails soft (returns []/null) so a DB hiccup can't break the build. As new
 * content-type models land they get wired in here and to getSitemapEntries().
 */
import { connectDB } from "@/src/lib/mongodb";
import TourPackageModel from "@/src/models/packageModel";
import Blog from "@/src/models/blogModel";
import FestivalModel from "@/src/models/festivalModel";
import HubModel from "@/src/models/hubModel";
import HubSpokeModel from "@/src/models/hubSpokeModel";
import TempleModel from "@/src/models/templeModel";
import TrustModel from "@/src/models/trustModel";
import DataPageModel from "@/src/models/dataPageModel";
import ItineraryModel from "@/src/models/itineraryModel";
import DestinationModel from "@/src/models/destinationModel";
import TempleInfoModel from "@/src/models/templeInfoModel";
import PlaceModel from "@/src/models/placeModel";

export type SitemapEntry = { path: string; lastModified?: Date };

/** A URL-safe slug: lowercase letters, digits and hyphens only (SOP §3). */
export const isValidSlug = (slug: unknown): slug is string =>
  typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

/** Package variant canonical path (SOP §3). */
export const packagePath = (slug: string) => `/somnath-dwarka-tour-package/${slug}/`;
/** Gir-triangle variant canonical path (SOP §3). */
export const GIR_HUB_SLUG = "somnath-dwarka-gir-tour-package";
export const girPackagePath = (slug: string) => `/${GIR_HUB_SLUG}/${slug}/`;
/** Gujarat umbrella variant canonical path (SOP §3). */
export const GUJARAT_HUB_SLUG = "gujarat-tour-packages";
export const gujaratPackagePath = (slug: string) => `/${GUJARAT_HUB_SLUG}/${slug}/`;
/** Guides replace the old /blog path (SOP §3). */
export const guidePath = (slug: string) => `/guides/${slug}/`;

export async function getPublishedPackages() {
  try {
    await connectDB();
    return await TourPackageModel.find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean();
  } catch {
    return [];
  }
}

export async function getPackageBySlug(slug: string) {
  try {
    await connectDB();
    const pkg = await TourPackageModel.findOne({ slug }).lean();
    if (!pkg || (pkg as { status?: string }).status !== "published") return null;
    return pkg;
  } catch {
    return null;
  }
}

export async function getPublishedGuides() {
  try {
    await connectDB();
    const guides = await Blog.find({ status: "published" }).sort({ createdAt: -1 }).lean();
    // Skip legacy/invalid slugs (e.g. containing spaces) so we never emit broken links.
    return (guides as Array<Record<string, unknown>>).filter((g) => isValidSlug(g.slug));
  } catch {
    return [];
  }
}

export async function getGuideBySlug(slug: string) {
  try {
    await connectDB();
    const g = await Blog.findOne({ slug, status: "published" }).lean();
    return g ?? null;
  } catch {
    return null;
  }
}

/** Published festivals for the /festivals hub (admin-managed). */
export async function getPublishedFestivals() {
  try {
    await connectDB();
    const items = await FestivalModel.find({ status: "published" }).sort({ createdAt: -1 }).lean();
    return (items as Array<Record<string, unknown>>).filter((f) => isValidSlug(f.slug));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ *
 * Hub-and-spoke layer (SOP §3, §8)
 *
 * Root-level slugs are owned by four collections at once (cab routes, hubs,
 * pillars, trust pages), so `resolveRootSlug` is the single dispatcher the
 * /[rootSlug]/ route consults. Static app-router folders always win over the
 * dynamic segment, so those slugs are reserved and never dispatched here.
 * ------------------------------------------------------------------ */

export const hubPath = (slug: string) => `/${slug}/`;
export const hubSpokePath = (hub: string, slug: string) => `/${hub}/${slug}/`;
export const templePath = (slug: string) => `/temples/${slug}/`;
export const dataPath = (slug: string) => `/data/${slug}/`;
export const trustPath = (slug: string) => `/${slug}/`;
export const itineraryPath = (slug: string) => `/plan/itinerary/${slug}/`;
export const pillarPath = (slug: string) => `/${slug}/`;

/** Root slugs served by static folders — never resolved by /[rootSlug]/. */
export const RESERVED_ROOT_SLUGS = new Set([
  "about", "author", "booking-policy", "cancellation-refund", "compare",
  "contact", "dwarka", "dwarka-tour-package", "festivals", "guides", "gujarat-tour-packages",
  "hotels", "plan", "privacy",
  "reviews", "sitemap", "somnath", "somnath-tour-package", "somnath-dwarka-taxi-service",
  "somnath-dwarka-tour-package", "somnath-dwarka-gir-tour-package",
  "terms", "thank-you", "tools", "llms.txt",
  "temples",
]);

type Doc = Record<string, unknown>;

const published = { status: "published" as const };

async function findPublished(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: { find: (q: any) => any },
  extra: Record<string, unknown> = {}
): Promise<Doc[]> {
  try {
    await connectDB();
    const docs = await model.find({ ...published, ...extra }).lean();
    return (docs as Doc[]).filter((d) => isValidSlug(d.slug));
  } catch {
    return [];
  }
}

async function findOnePublished(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: { findOne: (q: any) => any },
  query: Record<string, unknown>
): Promise<Doc | null> {
  try {
    await connectDB();
    const doc = await model.findOne({ ...published, ...query }).lean();
    return (doc as Doc) ?? null;
  } catch {
    return null;
  }
}

export const getPublishedHubs = () => findPublished(HubModel);
export const getHubBySlug = (slug: string) => findOnePublished(HubModel, { slug });

export const getPublishedHubSpokes = () => findPublished(HubSpokeModel);
export const getHubSpoke = (hub: string, slug: string) =>
  findOnePublished(HubSpokeModel, { hub, slug });

export const getPublishedTemples = () => findPublished(TempleModel);
export const getTempleBySlug = (slug: string) => findOnePublished(TempleModel, { slug });

export const getPublishedTrustPages = () => findPublished(TrustModel);
export const getTrustBySlug = (slug: string) => findOnePublished(TrustModel, { slug });

export const getPublishedDataPages = () => findPublished(DataPageModel);
export const getDataPageBySlug = (slug: string) => findOnePublished(DataPageModel, { slug });

export const getPublishedItineraries = () => findPublished(ItineraryModel);
export const getItineraryBySlug = (slug: string) => findOnePublished(ItineraryModel, { slug });

export const getPublishedPillars = () => findPublished(DestinationModel);
export const getPillarBySlug = (slug: string) => findOnePublished(DestinationModel, { slug });

export const getPublishedPillarSpokes = () => findPublished(TempleInfoModel);
/** Every published topic spoke under one pillar, e.g. all of /gir/{topic}/. */
export const getPillarSpokesFor = (destination: string) =>
  findPublished(TempleInfoModel, { destination });
export const getPillarSpoke = (destination: string, slug: string) =>
  findOnePublished(TempleInfoModel, { destination, slug });

export const getPublishedPlaces = () => findPublished(PlaceModel);
/** Every published place under one pillar, e.g. all of /gir/places/{slug}/. */
export const getPlacesFor = (parent_destination: string) =>
  findPublished(PlaceModel, { parent_destination });
export const getPlace = (parent_destination: string, slug: string) =>
  findOnePublished(PlaceModel, { parent_destination, slug });

export type RootKind = "hub" | "pillar" | "trust";
export type RootMatch = { kind: RootKind; doc: Doc };

/**
 * Resolve a root-level slug to the collection that owns it. Order matters only
 * for diagnostics — slugs are disjoint across collections by construction.
 */
export async function resolveRootSlug(slug: string): Promise<RootMatch | null> {
  if (!isValidSlug(slug) || RESERVED_ROOT_SLUGS.has(slug)) return null;
  const hub = await getHubBySlug(slug);
  if (hub) return { kind: "hub", doc: hub };
  const pillar = await getPillarBySlug(slug);
  if (pillar) return { kind: "pillar", doc: pillar };
  const trust = await getTrustBySlug(slug);
  if (trust) return { kind: "trust", doc: trust };
  return null;
}

/** All root slugs to prerender, minus the ones static folders already own. */
export async function getRootSlugs(): Promise<string[]> {
  const [hubs, pillars, trust] = await Promise.all([
    getPublishedHubs(),
    getPublishedPillars(),
    getPublishedTrustPages(),
  ]);
  return [...hubs, ...pillars, ...trust]
    .map((d) => String(d.slug))
    .filter((s) => !RESERVED_ROOT_SLUGS.has(s));
}

/** All dynamic, index-safe URLs for the sitemap (SOP §11). */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const [
    packages, guides, hubs, hubSpokes, temples,
    trust, dataPages, itineraries, pillars, pillarSpokes, places,
  ] = await Promise.all([
    getPublishedPackages(),
    getPublishedGuides(),
    getPublishedHubs(),
    getPublishedHubSpokes(),
    getPublishedTemples(),
    getPublishedTrustPages(),
    getPublishedDataPages(),
    getPublishedItineraries(),
    getPublishedPillars(),
    getPublishedPillarSpokes(),
    getPublishedPlaces(),
  ]);

  const entries: SitemapEntry[] = [];
  /** noindex pages are excluded: an unverified scaffold must never be submitted. */
  const add = (docs: Doc[], toPath: (d: Doc) => string | null) => {
    for (const d of docs) {
      if (d.noindex) continue;
      const path = toPath(d);
      if (path) entries.push({ path, lastModified: d.updatedAt as Date });
    }
  };

  add(packages as Doc[], (d) => (typeof d.slug === "string" ? packagePath(d.slug) : null));
  add(guides as Doc[], (d) => (typeof d.slug === "string" ? guidePath(d.slug) : null));
  add(hubs, (d) => hubPath(String(d.slug)));
  add(hubSpokes, (d) => (d.hub ? hubSpokePath(String(d.hub), String(d.slug)) : null));
  add(temples, (d) => templePath(String(d.slug)));
  add(trust, (d) => trustPath(String(d.slug)));
  add(dataPages, (d) => dataPath(String(d.slug)));
  add(itineraries, (d) => itineraryPath(String(d.slug)));
  add(pillars, (d) => pillarPath(String(d.slug)));
  add(pillarSpokes, (d) => (d.destination ? `/${d.destination}/${d.slug}/` : null));
  add(places, (d) => (d.parent_destination ? `/${d.parent_destination}/places/${d.slug}/` : null));

  return entries;
}
