import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetailTemplate from "@/src/components/TourPackage/PackageDetailTemplate";
import { buildMetadata } from "@/src/lib/seo";
import { GIR_HUB_SLUG, getHubSpoke, girPackagePath } from "@/src/lib/content";
import { GIR_SEED_PACKAGES, findGirSeedPackage } from "@/src/lib/seed/girPackages";
import { isAuthorisedGirPackage } from "@/src/config/girPackageSpokes";
import { buildRelatedLinks } from "@/src/lib/links";
import { bool, faqOf, h1Of, list, s, titleOf, verifiedValue, type Doc } from "@/src/lib/cms";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };
type PackageImage = { image: string; alt: string };

const GALLERY: PackageImage[] = [
  { image: "/images/gir/gir-hero.jpg", alt: "Gir National Park, home of the Asiatic lion" },
  { image: "/images/home/DwarikaLongImage.webp", alt: "Dwarkadhish Temple in Dwarka" },
  { image: "/images/home/SomnathLongImage.webp", alt: "Somnath Temple on the Gujarat coast" },
  { image: "/images/junagadh-girnar/junagadh-girnar-hero.jpg", alt: "Girnar hills near Junagadh" },
  { image: "/images/CTA.webp", alt: "Somnath Dwarka Gir tour" },
];

/**
 * Normalise the CMS hub-spoke doc and the seed into one render shape.
 *
 * The spoke doc is the editor's copy and wins field by field; the seed carries
 * the day-wise plan and long-form answer the CMS model has no field for yet, so
 * an unfilled spoke still renders a complete, honest page. A price shows only
 * when it is verified in the CMS — an unverified figure falls back to the seed
 * placeholder, which the header stamps as awaiting confirmation.
 */
async function resolvePackage(slug: string) {
  if (!isAuthorisedGirPackage(slug)) return null;
  const seed = findGirSeedPackage(slug);
  if (!seed) return null;

  const cms = (await getHubSpoke(GIR_HUB_SLUG, slug)) as Doc | null;
  const cmsPrice = cms ? Number(verifiedValue(cms, "price_from") || 0) : 0;
  const cmsInclusions = cms ? list<string>(cms, "inclusions").filter(Boolean) : [];
  const cmsExclusions = cms ? list<string>(cms, "exclusions").filter(Boolean) : [];
  const cmsDays = cms
    ? list<{ day: number; title: string; description?: string }>(cms, "itinerary_days")
    : [];
  const cmsFaq = cms ? faqOf(cms) : [];

  return {
    slug,
    // h1Of/titleOf drop the URL map's "— Itinerary, Price & Booking" tail.
    title: (cms && titleOf(cms)) || seed.title,
    h1: (cms && h1Of(cms)) || seed.h1,
    title_tag: (cms && titleOf(cms)) || seed.title,
    meta_description: (cms && s(cms, "meta_description")) || seed.answer_first,
    duration: (cms && s(cms, "duration")) || seed.duration,
    price_from: cmsPrice || seed.price_from,
    price_verified: Boolean(cmsPrice),
    answer_first: (cms && s(cms, "answer_first")) || seed.answer_first,
    highlights: seed.highlights,
    itinerary: cmsDays.length
      ? cmsDays.map((d) => ({
          day: d.day,
          title: d.title,
          description: d.description || "",
          stops: [] as string[],
          steps: [] as { time: string; activity: string }[],
        }))
      : seed.itinerary.map((d) => ({ ...d, steps: [] as { time: string; activity: string }[] })),
    inclusions: cmsInclusions.length ? cmsInclusions : seed.inclusions,
    exclusions: cmsExclusions.length ? cmsExclusions : seed.exclusions,
    faq: cmsFaq.length ? cmsFaq : seed.faq,
    heroImage: GALLERY[0],
    childImages: GALLERY.slice(1),
    noindex: cms ? bool(cms, "noindex") : false,
    // Every Gir plan carries the same four; the safari permit is the one thing
    // that is not, and it is spelled out in the exclusions rather than implied.
    transfer_included: true,
    stay_included: true,
    breakfast_included: true,
    sightseeing_included: true,
    policies: [] as { title: string; description: string }[],
  };
}

export function generateStaticParams() {
  return GIR_SEED_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await resolvePackage(slug);
  if (!pkg) return {};
  return buildMetadata({
    title: pkg.title_tag,
    description: pkg.meta_description,
    path: girPackagePath(slug),
    noindex: pkg.noindex,
  });
}

/** Places for the duration strip, read off the itinerary the same way the flagship page does. */
function stopsOf(itinerary: { title: string; description: string; stops?: string[] }[]) {
  return itinerary.map((item, index) => {
    const text = `${item.title} ${item.description} ${item.stops?.join(" ") || ""}`.toLowerCase();
    let place = "Dwarka";

    if (text.includes("ahmedabad drop")) place = "Ahmedabad Drop";
    else if (text.includes("gir")) place = "Sasan Gir";
    else if (text.includes("junagadh") || text.includes("girnar")) place = "Junagadh";
    else if (text.includes("diu")) place = "Diu";
    else if (text.includes("bet dwarka")) place = "Bet Dwarka";
    else if (text.includes("somnath")) place = "Somnath";
    else if (text.includes("porbandar")) place = "Porbandar";
    else if (text.includes("dwarka")) place = "Dwarka";
    else if (text.includes("rajkot")) place = "Rajkot";
    else if (text.includes("surat")) place = "Surat";
    else if (text.includes("ahmedabad")) place = "Ahmedabad";
    else {
      const words = item.title.replace(/arrival|departure|sightseeing|to/gi, "").trim().split(/\s+/);
      place = words.find((w) => w.length > 2) || "Dwarka";
    }

    return { id: `stop-${index}`, days: 1, place };
  });
}

export default async function GirPackageVariantPage({ params }: Params) {
  const { slug } = await params;
  const pkg = await resolvePackage(slug);
  if (!pkg) notFound();

  const breakdown = stopsOf(pkg.itinerary);

  const related = buildRelatedLinks({
    self: girPackagePath(slug),
    pillar: { target: "/somnath-dwarka-gir-tour-package/", anchor: "all Somnath Dwarka Gir packages" },
    money: "packages",
    siblings: [
      { target: "/gir/gir-safari-booking/", anchor: "how Gir safari booking works", type: "sibling" as const },
      ...GIR_SEED_PACKAGES.filter((p) => p.slug !== slug)
        .slice(0, 3)
        .map((p) => ({ target: girPackagePath(p.slug), anchor: p.h1, type: "sibling" as const })),
    ],
  });

  return (
    <PackageDetailTemplate
      pkg={{ ...pkg, meta_description: pkg.meta_description }}
      path={girPackagePath(slug)}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Somnath Dwarka Gir packages", path: "/somnath-dwarka-gir-tour-package/" },
        { name: pkg.h1, path: girPackagePath(slug) },
      ]}
      related={related}
      breakdown={breakdown}
      overviewHeading="A temple-first plan with the Gir safari built around its morning slot"
      assurance="Safari booking handled for you"
    />
  );
}
