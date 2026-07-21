import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetailTemplate from "@/src/components/TourPackage/PackageDetailTemplate";
import { buildMetadata } from "@/src/lib/seo";
import { GUJARAT_HUB_SLUG, getHubSpoke, gujaratPackagePath } from "@/src/lib/content";
import { GUJARAT_SEED_PACKAGES, findGujaratSeedPackage } from "@/src/lib/seed/gujaratPackages";
import { isAuthorisedGujaratPackage } from "@/src/config/gujaratPackageSpokes";
import { buildRelatedLinks } from "@/src/lib/links";
import { bool, faqOf, h1Of, list, s, titleOf, verifiedValue, type Doc } from "@/src/lib/cms";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };
type PackageImage = { image: string; alt: string };

const GALLERY: PackageImage[] = [
  { image: "/images/home/StatueOfUnity.webp", alt: "The Statue of Unity at Kevadia" },
  { image: "/images/home/SomnathLongImage.webp", alt: "Somnath Temple on the Gujarat coast" },
  { image: "/images/home/DwarikaLongImage.webp", alt: "Dwarkadhish Temple in Dwarka" },
  { image: "/images/gir/gir-hero.jpg", alt: "Gir National Park, home of the Asiatic lion" },
  { image: "/images/junagadh-girnar/junagadh-girnar-hero.jpg", alt: "Girnar hills near Junagadh" },
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
  if (!isAuthorisedGujaratPackage(slug)) return null;
  const seed = findGujaratSeedPackage(slug);
  if (!seed) return null;

  const cms = (await getHubSpoke(GUJARAT_HUB_SLUG, slug)) as Doc | null;
  const cmsPrice = cms ? Number(verifiedValue(cms, "price_from") || 0) : 0;
  const cmsInclusions = cms ? list<string>(cms, "inclusions").filter(Boolean) : [];
  const cmsExclusions = cms ? list<string>(cms, "exclusions").filter(Boolean) : [];
  const cmsDays = cms
    ? list<{ day: number; title: string; description?: string }>(cms, "itinerary_days")
    : [];
  const cmsFaq = cms ? faqOf(cms) : [];
  const inclusions = cmsInclusions.length ? cmsInclusions : seed.inclusions;
  const inclusionText = inclusions.join(" ");

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
    inclusions,
    exclusions: cmsExclusions.length ? cmsExclusions : seed.exclusions,
    faq: cmsFaq.length ? cmsFaq : seed.faq,
    heroImage: GALLERY[0],
    childImages: GALLERY.slice(1),
    noindex: cms ? bool(cms, "noindex") : false,
    // Read the strip's four chips off the inclusions rather than asserting
    // them: the day trips carry no hotel and so no breakfast, and ticking
    // either would be a claim the package does not make.
    transfer_included: true,
    stay_included: /hotel|night/i.test(inclusionText),
    breakfast_included: /breakfast/i.test(inclusionText),
    sightseeing_included: true,
    policies: [] as { title: string; description: string }[],
  };
}

export function generateStaticParams() {
  return GUJARAT_SEED_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await resolvePackage(slug);
  if (!pkg) return {};
  return buildMetadata({
    title: pkg.title_tag,
    description: pkg.meta_description,
    path: gujaratPackagePath(slug),
    noindex: pkg.noindex,
  });
}

/** Places for the duration strip, read off the itinerary the same way the flagship page does. */
function stopsOf(itinerary: { title: string; description: string; stops?: string[] }[]) {
  return itinerary.map((item, index) => {
    const text = `${item.title} ${item.description} ${item.stops?.join(" ") || ""}`.toLowerCase();
    let place = "Gujarat";

    if (text.includes("ahmedabad drop") || text.includes("departure transfer")) place = "Departure";
    else if (text.includes("dholavira")) place = "Dholavira";
    else if (text.includes("rann") || text.includes("dhordo") || text.includes("dasada")) place = "Rann of Kutch";
    else if (text.includes("bhuj") || text.includes("kutch")) place = "Bhuj";
    else if (text.includes("statue of unity") || text.includes("kevadia")) place = "Kevadia";
    else if (text.includes("velavadar")) place = "Velavadar";
    else if (text.includes("gir")) place = "Sasan Gir";
    else if (text.includes("palitana") || text.includes("shatrunjaya")) place = "Palitana";
    else if (text.includes("junagadh") || text.includes("girnar")) place = "Junagadh";
    else if (text.includes("pavagadh") || text.includes("champaner")) place = "Pavagadh";
    else if (text.includes("dakor")) place = "Dakor";
    else if (text.includes("modhera")) place = "Modhera";
    else if (text.includes("becharaji")) place = "Becharaji";
    else if (text.includes("patan")) place = "Patan";
    else if (text.includes("bet dwarka")) place = "Bet Dwarka";
    else if (text.includes("somnath")) place = "Somnath";
    else if (text.includes("porbandar")) place = "Porbandar";
    else if (text.includes("dwarka")) place = "Dwarka";
    else if (text.includes("jamnagar")) place = "Jamnagar";
    else if (text.includes("rajkot")) place = "Rajkot";
    else if (text.includes("vadodara")) place = "Vadodara";
    else if (text.includes("ahmedabad")) place = "Ahmedabad";
    else {
      const words = item.title.replace(/arrival|departure|sightseeing|to/gi, "").trim().split(/\s+/);
      place = words.find((w) => w.length > 2) || "Gujarat";
    }

    return { id: `stop-${index}`, days: 1, place };
  });
}

export default async function GujaratPackageVariantPage({ params }: Params) {
  const { slug } = await params;
  const pkg = await resolvePackage(slug);
  if (!pkg) notFound();

  const breakdown = stopsOf(pkg.itinerary);

  const related = buildRelatedLinks({
    self: gujaratPackagePath(slug),
    pillar: { target: "/gujarat-tour-packages/", anchor: "all Gujarat tour packages" },
    money: "packages",
    siblings: [
      { target: "/somnath-dwarka-tour-package/", anchor: "Somnath Dwarka tour packages", type: "sibling" as const },
      ...GUJARAT_SEED_PACKAGES.filter((p) => p.slug !== slug)
        .slice(0, 3)
        .map((p) => ({ target: gujaratPackagePath(p.slug), anchor: p.h1, type: "sibling" as const })),
    ],
  });

  return (
    <PackageDetailTemplate
      pkg={{ ...pkg, meta_description: pkg.meta_description }}
      path={gujaratPackagePath(slug)}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Gujarat tour packages", path: "/gujarat-tour-packages/" },
        { name: pkg.h1, path: gujaratPackagePath(slug) },
      ]}
      related={related}
      breakdown={breakdown}
      overviewHeading="A day-wise plan built around darshan timings and the drives between them"
      assurance="Tickets & permits arranged for you"
    />
  );
}
