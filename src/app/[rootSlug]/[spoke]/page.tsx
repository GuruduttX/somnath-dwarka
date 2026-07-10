import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, touristTripSchema, placeSchema } from "@/src/lib/seo";
import CmsPage from "@/src/components/templates/cms/CmsPage";
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
  | { kind: "hub-spoke"; doc: Doc; hubTitle: string }
  | { kind: "temple"; doc: Doc }
  | { kind: "data"; doc: Doc }
  | { kind: "pillar-spoke"; doc: Doc; pillarTitle: string };

async function resolve(rootSlug: string, spoke: string): Promise<Resolved | null> {
  const parent = await resolveRootSlug(rootSlug);
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
    return doc ? { kind: "hub-spoke", doc, hubTitle: s(parent.doc, "title") } : null;
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
