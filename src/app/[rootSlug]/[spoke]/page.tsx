import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, touristTripSchema, placeSchema } from "@/src/lib/seo";
import CmsPage from "@/src/components/templates/cms/CmsPage";
import PackageDetailTemplate from "@/src/components/TourPackage/PackageDetailTemplate";
import { themeFor } from "@/src/config/destinations";
import {
  DatasetTable,
  InclusionsExclusions,
  ItineraryDays,
  TempleTimings,
} from "@/src/components/templates/cms/blocks";
import { buildRelatedLinks } from "@/src/lib/links";
import {
  RESERVED_ROOT_SLUGS,
  getDataPageBySlug,
  getHubBySlug,
  getHubSpoke,
  getPublishedDataPages,
  getPublishedHubSpokes,
  getPublishedPillarSpokes,
  getPublishedTemples,
  getPillarSpoke,
  getTempleBySlug,
  resolveRootSlug,
} from "@/src/lib/content";
import {
  bool,
  descOf,
  faqOf,
  h1Of,
  list,
  relatedOf,
  s,
  titleOf,
  verifiedValue,
  type Doc,
} from "@/src/lib/cms";

/**
 * Depth-2 dispatcher (SOP §3). What a spoke *is* depends on its parent hub:
 * /temples/{slug}/ is a temple, /data/{slug}/ is a research asset, any other
 * hub's child is a money/info variant, and a pillar's child is a topic spoke.
 *
 * `/{pillar}/places/{place}/` is served by the sibling static `places` folder,
 * which takes precedence over this dynamic segment.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ rootSlug: string; spoke: string }> };

type Resolved =
  | { kind: "hub-spoke"; doc: Doc; hubTitle: string; hubKind: string }
  | { kind: "temple"; doc: Doc }
  | { kind: "data"; doc: Doc }
  | { kind: "pillar-spoke"; doc: Doc; pillarTitle: string };

async function resolve(rootSlug: string, spoke: string): Promise<Resolved | null> {
  let parent = null;
  if (rootSlug === "temples") {
    const hub = await getHubBySlug("temples");
    if (hub) parent = { kind: "hub" as const, doc: hub };
  } else {
    parent = await resolveRootSlug(rootSlug);
  }
  if (!parent) return null;

  if (parent.kind === "hub") {
    const kind = s(parent.doc, "hub_kind");
    if (kind === "temples") {
      const doc = await getTempleBySlug(spoke);
      return doc ? { kind: "temple", doc } : null;
    }
    if (kind === "data") {
      const doc = await getDataPageBySlug(spoke);
      return doc ? { kind: "data", doc } : null;
    }
    const doc = await getHubSpoke(rootSlug, spoke);
    return doc ? { kind: "hub-spoke", doc, hubTitle: s(parent.doc, "title"), hubKind: kind } : null;
  }

  if (parent.kind === "pillar") {
    const doc = await getPillarSpoke(rootSlug, spoke);
    return doc ? { kind: "pillar-spoke", doc, pillarTitle: s(parent.doc, "destination") || s(parent.doc, "title") } : null;
  }

  return null;
}

export async function generateStaticParams() {
  const [hubSpokes, temples, dataPages, pillarSpokes] = await Promise.all([
    getPublishedHubSpokes(),
    getPublishedTemples(),
    getPublishedDataPages(),
    getPublishedPillarSpokes(),
  ]);

  return [
    ...hubSpokes.map((d) => ({ rootSlug: String(d.hub), spoke: String(d.slug) })),
    ...temples.map((d) => ({ rootSlug: "temples", spoke: String(d.slug) })),
    ...dataPages.map((d) => ({ rootSlug: "data", spoke: String(d.slug) })),
    // Somnath and Dwarka topic spokes are served by their own static folders.
    ...pillarSpokes
      .filter((d) => !RESERVED_ROOT_SLUGS.has(String(d.destination)))
      .map((d) => ({ rootSlug: String(d.destination), spoke: String(d.slug) })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { rootSlug, spoke } = await params;
  const found = await resolve(rootSlug, spoke);
  if (!found) return {};
  const d = found.doc;
  return buildMetadata({
    title: titleOf(d),
    description: descOf(d),
    path: `/${rootSlug}/${spoke}/`,
    noindex: bool(d, "noindex"),
    canonicalOverride: s(d, "canonical_override") || undefined,
  });
}

export default async function SpokePage({ params }: Params) {
  const { rootSlug, spoke } = await params;
  const found = await resolve(rootSlug, spoke);
  if (!found) notFound();

  const d = found.doc;
  const path = `/${rootSlug}/${spoke}/`;
  const parentPath = `/${rootSlug}/`;

  const parentName =
    found.kind === "hub-spoke"
      ? found.hubTitle
      : found.kind === "pillar-spoke"
        ? found.pillarTitle
        : found.kind === "temple"
          ? "Temples of Gujarat"
          : "Data & research";

  const crumbs = [
    { name: "Home", path: "/" },
    { name: parentName, path: parentPath },
    { name: s(d, "title"), path },
  ];

  const related = buildRelatedLinks({
    self: path,
    pillar: { target: parentPath, anchor: parentName },
    money: found.kind === "hub-spoke" ? "packages" : undefined,
    extra: relatedOf(d),
  });

  const price = verifiedValue(d, "price_from");
  const isMoney = found.kind === "hub-spoke" && s(d, "spoke_kind") === "money";

  const extraSchema = isMoney
    ? touristTripSchema({
        name: h1Of(d),
        description: descOf(d),
        path,
        ...(price ? { price: Number(price) || undefined } : {}),
      })
    : found.kind === "temple"
      ? placeSchema({ name: h1Of(d), description: descOf(d), path })
      : null;

  // A destination hub's money spoke is a package, so it opens the same
  // package-detail page the circuit hubs use rather than the generic CMS shell.
  if (found.kind === "hub-spoke" && found.hubKind === "destination" && isMoney) {
    const theme = themeFor(rootSlug);
    const itinerary = list<{ day: number; title: string; description?: string }>(d, "itinerary_days");
    const inclusions = list<string>(d, "inclusions").filter(Boolean);
    const inclusionText = inclusions.join(" ");
    const gallery = theme.photo
      ? [{ image: theme.photo, alt: `${theme.name}, Gujarat` }]
      : [];

    /**
     * Where this trip goes, for the route map. Read off the variant slug, which
     * is the only routing fact these records carry: "from-rajkot" really does
     * mean Rajkot to the destination, and "with-diu" really does add Diu. Any
     * other variant is just the destination itself — no day plan is invented.
     */
    const titleCase = (t: string) =>
      t.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
    const routePlaces = spoke.startsWith("from-")
      ? [titleCase(spoke.slice(5)), theme.name]
      : spoke.startsWith("with-")
        ? [theme.name, titleCase(spoke.slice(5))]
        : [theme.name];

    return (
      <PackageDetailTemplate
        pkg={{
          slug: spoke,
          h1: h1Of(d),
          duration: s(d, "duration"),
          price_from: Number(price || 0),
          // Only a verified CMS price reaches the page, so nothing is invented.
          price_verified: Boolean(price),
          answer_first: s(d, "answer_first"),
          meta_description: descOf(d),
          body: s(d, "body") || undefined,
          highlights: [],
          itinerary: itinerary.map((x) => ({
            day: x.day,
            title: x.title,
            description: x.description || "",
            stops: [],
            steps: [],
          })),
          inclusions,
          exclusions: list<string>(d, "exclusions").filter(Boolean),
          faq: faqOf(d),
          heroImage: gallery[0] ?? null,
          childImages: gallery.slice(1),
          transfer_included: true,
          stay_included: /hotel|night/i.test(inclusionText),
          breakfast_included: /breakfast/i.test(inclusionText),
          sightseeing_included: true,
          policies: [],
          routePlaces,
        }}
        path={path}
        crumbs={crumbs}
        related={related}
        breakdown={itinerary.map((x, i) => ({
          id: `stop-${i}`,
          days: 1,
          place: x.title || theme.name,
        }))}
        overviewHeading={`What the ${theme.name} plan covers`}
        assurance="Hotels, vehicle & permits arranged"
      />
    );
  }

  return (
    <CmsPage
      crumbs={crumbs}
      h1={h1Of(d)}
      path={path}
      answerFirst={s(d, "answer_first") || undefined}
      body={s(d, "body") || undefined}
      faq={faqOf(d)}
      related={related}
      ctaContext={s(d, "title")}
      ctaTitle={isMoney ? "Plan this trip" : undefined}
      extraSchema={extraSchema}
    >
      {found.kind === "hub-spoke" ? (
        <>
          <ItineraryDays days={list(d, "itinerary_days")} />
          <InclusionsExclusions inclusions={list(d, "inclusions")} exclusions={list(d, "exclusions")} />
        </>
      ) : null}

      {found.kind === "temple" ? (
        <TempleTimings
          rows={list(d, "timings_table")}
          verified={bool(d, "timings_verified")}
          sourceUrl={s(d, "official_source_url") || undefined}
        />
      ) : null}

      {found.kind === "data" ? (
        <DatasetTable
          rows={list(d, "rows")}
          methodology={s(d, "methodology") || undefined}
          lastUpdated={s(d, "last_updated") || undefined}
          sourceNote={s(d, "source_note") || undefined}
        />
      ) : null}
    </CmsPage>
  );
}
