import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
import CmsPage from "@/src/components/templates/cms/CmsPage";
import {
  HubVariants,
  InclusionsExclusions,
  PillarFacts,
  TopPlaces,
  TrustSections,
} from "@/src/components/templates/cms/blocks";
import { buildRelatedLinks } from "@/src/lib/links";
import DestinationHubTemplate, { type DestinationVariant as HubVariant } from "@/src/components/templates/destination/DestinationHubTemplate";
import InterestHubTemplate, { type InterestEntry } from "@/src/components/templates/interest/InterestHubTemplate";
import GirPillar from "@/src/components/templates/GirPillar";
import JunagadhGirnarPillar from "@/src/components/templates/JunagadhGirnarPillar";
import { getDestinationGuidePath, getHubSpokesFor, getRootSlugs, resolveRootSlug } from "@/src/lib/content";
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
 * Root-level dispatcher (SOP §3). Three collections share this URL level —
 * money/vertical hubs, destination pillars and trust pages — and the App Router
 * allows only one dynamic segment per level, so one route resolves all three.
 * Static folders (/somnath/, /guides/, …) take precedence and are held in
 * RESERVED_ROOT_SLUGS so they are never dispatched here.
 *
 * Cab routes used to live at this level too. The URL map nests them under the
 * taxi hub, so they now render at /somnath-dwarka-taxi-service/{slug}/ and the
 * old root URLs 301 there via next.config.ts.
 *
 * Anything that resolves to none of the three 404s.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ rootSlug: string }> };

export async function generateStaticParams() {
  const cms = await getRootSlugs();
  return cms.map((rootSlug) => ({ rootSlug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { rootSlug } = await params;
  const match = await resolveRootSlug(rootSlug);
  if (!match) return {};
  const d = match.doc;
  return buildMetadata({
    title: titleOf(d),
    description: descOf(d),
    path: `/${rootSlug}/`,
    noindex: bool(d, "noindex"),
    canonicalOverride: s(d, "canonical_override") || undefined,
  });
}

function HubBody({
  slug,
  d,
  guidePath,
  entries,
}: {
  slug: string;
  d: Doc;
  guidePath?: string | null;
  entries?: InterestEntry[];
}) {
  const kind = s(d, "hub_kind");
  const pillar = s(d, "pillar_path");
  const siblings = list<string>(d, "sibling_hubs");
  const price = verifiedValue(d, "price_from");

  const related = buildRelatedLinks({
    self: `/${slug}/`,
    ...(pillar ? { pillar: { target: pillar, anchor: `${s(d, "title")} travel guide` } } : {}),
    money: "packages",
    // A sibling is stored as a path, so build a readable anchor from it:
    // "/palitana-tour-package/" was rendering as the raw slug in the UI.
    siblings: siblings.map((t) => ({
      target: t,
      anchor: t
        .replace(/\//g, " ")
        .trim()
        .split("-")
        .join(" ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      type: "sibling" as const,
    })),
    extra: relatedOf(d),
  });

  const isMoney = ["circuit", "triangle", "umbrella", "destination", "vertical"].includes(kind);

  const tripSchema = touristTripSchema({
    name: h1Of(d),
    description: descOf(d),
    path: `/${slug}/`,
    ...(price ? { price: Number(price) || undefined } : {}),
  });

  // Interest hubs list places and guides, not packages, so they get the
  // card-grid template rather than the package explorer.
  if (kind === "vertical" && entries?.length) {
    return (
      <InterestHubTemplate
        slug={slug}
        h1={h1Of(d)}
        path={`/${slug}/`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: s(d, "title"), path: `/${slug}/` },
        ]}
        answerFirst={s(d, "answer_first") || undefined}
        body={s(d, "body") || undefined}
        entries={entries}
        faq={faqOf(d)}
        related={related}
        extraSchema={tripSchema}
      />
    );
  }

  // Destination hubs sell a place rather than a route, so they get their own
  // template instead of the generic CMS shell. Everything else is unchanged.
  if (kind === "destination") {
    return (
      <DestinationHubTemplate
        slug={slug}
        h1={h1Of(d)}
        path={`/${slug}/`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: s(d, "title"), path: `/${slug}/` },
        ]}
        answerFirst={s(d, "answer_first") || undefined}
        body={s(d, "body") || undefined}
        variants={list<HubVariant>(d, "variants")}
        faq={faqOf(d)}
        related={related}
        pillarPath={pillar || guidePath || undefined}
        extraSchema={tripSchema}
      />
    );
  }

  return (
    <CmsPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: s(d, "title"), path: `/${slug}/` },
      ]}
      h1={h1Of(d)}
      path={`/${slug}/`}
      answerFirst={s(d, "answer_first") || undefined}
      body={s(d, "body") || undefined}
      faq={faqOf(d)}
      related={related}
      ctaContext={s(d, "head_term") || s(d, "title")}
      ctaTitle={isMoney ? "Plan this trip" : undefined}
      extraSchema={isMoney ? tripSchema : null}
    >
      <HubVariants hub={slug} variants={list(d, "variants")} />
      <InclusionsExclusions inclusions={list(d, "inclusions")} exclusions={list(d, "exclusions")} />
    </CmsPage>
  );
}

/**
 * Pillars that have a bespoke, designed page instead of the generic CMS shell.
 * Add a slug here and its component takes over; everything else keeps rendering
 * through PillarBody. The pillar's spokes are unaffected either way.
 */
const PILLAR_TEMPLATES: Record<string, (props: { doc: Doc }) => Promise<React.ReactNode>> = {
  gir: GirPillar,
  "junagadh-girnar": JunagadhGirnarPillar,
};

function PillarBody({ slug, d }: { slug: string; d: Doc }) {
  const related = buildRelatedLinks({
    self: `/${slug}/`,
    money: "packages",
    extra: relatedOf(d),
  });

  return (
    <CmsPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: s(d, "destination") || s(d, "title"), path: `/${slug}/` },
      ]}
      h1={h1Of(d)}
      path={`/${slug}/`}
      answerFirst={s(d, "answer_first") || undefined}
      body={s(d, "body") || undefined}
      faq={faqOf(d)}
      related={related}
      ctaContext={s(d, "destination") || s(d, "title")}
    >
      <PillarFacts
        bestTime={s(d, "best_time") || undefined}
        howToReach={s(d, "how_to_reach") || undefined}
        distances={list(d, "key_distances")}
      />
      <TopPlaces parent={slug} places={list(d, "top_places")} />
    </CmsPage>
  );
}

function TrustBody({ slug, d }: { slug: string; d: Doc }) {
  return (
    <CmsPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: s(d, "title"), path: `/${slug}/` },
      ]}
      h1={h1Of(d)}
      path={`/${slug}/`}
      answerFirst={s(d, "answer_first") || undefined}
      body={s(d, "body") || undefined}
      faq={faqOf(d)}
      related={buildRelatedLinks({ self: `/${slug}/`, money: "packages", extra: relatedOf(d) })}
      ctaContext={s(d, "title")}
    >
      <TrustSections sections={list(d, "sections")} />
    </CmsPage>
  );
}

export default async function RootSlugPage({ params }: Params) {
  const { rootSlug } = await params;

  const match = await resolveRootSlug(rootSlug);
  if (!match) notFound();

  if (match.kind === "hub") {
    // Destination hubs link out to their travel guide; most docs do not record
    // the path, so it is resolved by convention and only used if published.
    const kind = s(match.doc, "hub_kind");
    const guidePath = kind === "destination" ? await getDestinationGuidePath(rootSlug) : null;

    // Interest hubs need each spoke's own h1 and kind for its card, which the
    // hub's `variants` array does not carry. Order follows `variants`, the
    // editor's running order, with anything unlisted appended.
    let entries: InterestEntry[] | undefined;
    if (kind === "vertical") {
      const order = list<HubVariant>(match.doc, "variants").map((v) => v.slug);
      const rank = (x: string) => (order.indexOf(x) === -1 ? order.length : order.indexOf(x));
      entries = (await getHubSpokesFor(rootSlug))
        .map((doc) => ({
          slug: String(doc.slug),
          title: s(doc, "title"),
          h1: h1Of(doc),
          kind: s(doc, "spoke_kind"),
        }))
        .sort((a, b) => rank(a.slug) - rank(b.slug));
    }

    return <HubBody slug={rootSlug} d={match.doc} guidePath={guidePath} entries={entries} />;
  }
  if (match.kind === "pillar") {
    const Bespoke = PILLAR_TEMPLATES[rootSlug];
    if (Bespoke) return <Bespoke doc={match.doc} />;
    return <PillarBody slug={rootSlug} d={match.doc} />;
  }
  return <TrustBody slug={rootSlug} d={match.doc} />;
}
