import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import ItineraryAccordion from "@/src/components/shared/ItineraryAccordion";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import VerifyStamp from "@/src/components/shared/VerifyStamp";
import JsonLd from "@/src/components/seo/JsonLd";
import { getPackageBySlug, packagePath } from "@/src/lib/content";
import { SEED_PACKAGES, findSeedPackage } from "@/src/lib/seed/packages";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

/** Normalise a CMS or seed record into one render shape. */
async function resolvePackage(slug: string) {
  const cms = (await getPackageBySlug(slug)) as Record<string, unknown> | null;
  if (cms) {
    return {
      slug,
      title: String(cms.title || slug),
      h1: String(cms.h1 || cms.title || slug),
      title_tag: String(cms.title_tag || cms.title || slug),
      meta_description: String(cms.meta_description || cms.overview || ""),
      duration: String(cms.duration || ""),
      price_from: Number(cms.price_from || (cms as { price?: number }).price || 0),
      price_verified: false,
      answer_first: String(cms.answer_first || cms.overview || ""),
      highlights: ((cms.highlights as { description: string }[]) || []).map((h) => h.description),
      itinerary: ((cms.itinerary as { day: number; title: string; description: string }[]) || []).map((d) => ({
        day: d.day,
        title: d.title,
        description: d.description,
      })),
      inclusions: ((cms.inclusions as { description: string }[]) || []).map((i) => i.description),
      exclusions: ((cms.exclusions as { description: string }[]) || []).map((e) => e.description),
      faq: ((cms.faqs as { question: string; answer: string }[]) || []).map((f) => ({ question: f.question, answer: f.answer })),
      noindex: Boolean(cms.noindex),
    };
  }
  const seed = findSeedPackage(slug);
  if (!seed) return null;
  return { ...seed, title_tag: seed.title, meta_description: seed.answer_first, noindex: false };
}

export async function generateStaticParams() {
  return SEED_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await resolvePackage(slug);
  if (!pkg) return {};
  return buildMetadata({
    title: pkg.title_tag,
    description: pkg.meta_description,
    path: packagePath(slug),
    noindex: pkg.noindex,
  });
}

export default async function PackageVariantPage({ params }: Params) {
  const { slug } = await params;
  const pkg = await resolvePackage(slug);
  if (!pkg) notFound();

  const related = buildRelatedLinks({
    self: packagePath(slug),
    pillar: { target: "/somnath-dwarka-tour-package/", anchor: "all Somnath Dwarka packages" },
    money: "taxi",
    siblings: SEED_PACKAGES.filter((s) => s.slug !== slug)
      .slice(0, 3)
      .map((s) => ({ target: packagePath(s.slug), anchor: s.h1, type: "sibling" as const })),
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tour packages", path: "/somnath-dwarka-tour-package/" },
        { name: pkg.h1, path: packagePath(slug) },
      ]}
    >
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{pkg.h1}</h1>
        <p className="text-gray-500 mt-1">{pkg.duration}</p>
        {pkg.answer_first ? <AnswerFirst>{pkg.answer_first}</AnswerFirst> : null}
        {pkg.price_from ? (
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <span className="text-xl font-bold text-[#B85C10]">
              from ₹{pkg.price_from.toLocaleString("en-IN")}
            </span>
            <VerifyStamp fact={{ key: "price", label: "Price", value: "", verify: pkg.price_verified }} />
          </div>
        ) : null}
      </div>

      {pkg.highlights?.length ? (
        <Section id="highlights" title="Trip highlights">
          <ul className="grid gap-2 sm:grid-cols-2">
            {pkg.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span aria-hidden="true" className="text-[#E87722]">◆</span>
                {h}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {pkg.itinerary?.length ? (
        <Section id="itinerary" title="Day-wise itinerary">
          <ItineraryAccordion days={pkg.itinerary} />
        </Section>
      ) : null}

      {(pkg.inclusions?.length || pkg.exclusions?.length) ? (
        <Section id="inclusions" title="Inclusions & exclusions">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-green-700 mb-2">Included</h3>
              <ul className="space-y-1 text-gray-700">
                {pkg.inclusions?.map((i, k) => (
                  <li key={k} className="flex gap-2"><span className="text-green-600">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 mb-2">Not included</h3>
              <ul className="space-y-1 text-gray-700">
                {pkg.exclusions?.map((e, k) => (
                  <li key={k} className="flex gap-2"><span className="text-red-500">✕</span>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ) : null}

      <Faq items={pkg.faq} heading="Package FAQs" />
      <CtaBand context={pkg.h1} />
      <RelatedLinks links={related} />

      <JsonLd
        data={touristTripSchema({
          name: pkg.h1,
          description: pkg.meta_description || pkg.answer_first,
          path: packagePath(slug),
          price: pkg.price_verified ? pkg.price_from : undefined,
        })}
      />
    </PageShell>
  );
}
