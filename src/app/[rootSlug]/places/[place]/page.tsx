import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, placeSchema } from "@/src/lib/seo";
import CmsPage from "@/src/components/templates/cms/CmsPage";
import { buildRelatedLinks } from "@/src/lib/links";
import {
  RESERVED_ROOT_SLUGS,
  getPlace,
  getPublishedPlaces,
  resolveRootSlug,
} from "@/src/lib/content";
import { bool, descOf, faqOf, h1Of, relatedOf, s, titleOf } from "@/src/lib/cms";

/**
 * CMS place spoke — /{pillar}/places/{place}/ for pillars served by the root
 * dispatcher (Gir, Junagadh-Girnar, …). Somnath and Dwarka keep their own
 * seed-backed static routes, so their slugs are excluded from prerendering here.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ rootSlug: string; place: string }> };

export async function generateStaticParams() {
  const places = await getPublishedPlaces();
  return places
    .filter((p) => !RESERVED_ROOT_SLUGS.has(String(p.parent_destination)))
    .map((p) => ({ rootSlug: String(p.parent_destination), place: String(p.slug) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { rootSlug, place } = await params;
  const doc = await getPlace(rootSlug, place);
  if (!doc) return {};
  return buildMetadata({
    title: titleOf(doc),
    description: descOf(doc),
    path: `/${rootSlug}/places/${place}/`,
    noindex: bool(doc, "noindex"),
    canonicalOverride: s(doc, "canonical_override") || undefined,
  });
}

export default async function CmsPlacePage({ params }: Params) {
  const { rootSlug, place } = await params;

  const parent = await resolveRootSlug(rootSlug);
  if (!parent || parent.kind !== "pillar") notFound();

  const doc = await getPlace(rootSlug, place);
  if (!doc) notFound();

  const path = `/${rootSlug}/places/${place}/`;
  const pillarName = s(parent.doc, "destination") || s(parent.doc, "title");

  return (
    <CmsPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: pillarName, path: `/${rootSlug}/` },
        { name: s(doc, "place") || s(doc, "title"), path },
      ]}
      h1={h1Of(doc)}
      path={path}
      answerFirst={s(doc, "answer_first") || undefined}
      body={s(doc, "body") || undefined}
      faq={faqOf(doc)}
      related={buildRelatedLinks({
        self: path,
        pillar: { target: `/${rootSlug}/`, anchor: `${pillarName} travel guide` },
        money: "packages",
        extra: relatedOf(doc),
      })}
      ctaContext={s(doc, "place") || s(doc, "title")}
      extraSchema={placeSchema({ name: h1Of(doc), description: descOf(doc), path })}
    />
  );
}
