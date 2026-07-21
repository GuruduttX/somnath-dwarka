import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, ShieldCheck, Sparkles, Star, Check, X } from "lucide-react";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import ItineraryAccordion from "@/src/components/shared/ItineraryAccordion";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { GUJARAT_HUB_SLUG, getHubSpoke, gujaratPackagePath } from "@/src/lib/content";
import { GUJARAT_SEED_PACKAGES, findGujaratSeedPackage } from "@/src/lib/seed/gujaratPackages";
import { isAuthorisedGujaratPackage } from "@/src/config/gujaratPackageSpokes";
import { buildRelatedLinks } from "@/src/lib/links";
import { bool, faqOf, h1Of, list, s, titleOf, verifiedValue, type Doc } from "@/src/lib/cms";
import SideForm from "@/src/components/TourPackage/SideForm";
import PackageDurationStrip from "@/src/components/TourPackage/PackageDurationStrip";
import PackageInclusionsStrip from "@/src/components/TourPackage/PackageInclusionsStrip";
import PackageVisualHeader from "@/src/components/TourPackage/PackageVisualHeader";
import ProductRatings from "@/src/components/TourPackage/ProductRatings";
import PackageTestimonials from "@/src/components/TourPackage/PackageTestimonials";
import TrustBuildingSection from "@/src/utils/TrustBuildingSection";
import Policies from "@/src/components/TourPackage/Policies";

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
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Gujarat tour packages", path: "/gujarat-tour-packages/" },
        { name: pkg.h1, path: gujaratPackagePath(slug) },
      ]}
    >
      <PackageVisualHeader pkg={pkg} />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Row 1: Overview & Price Card (Equal Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-8">
          {/* Left Column - Overview (8 cols) */}
          <div className="lg:col-span-8 flex">
            <div className="w-full h-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] p-5 sm:p-6 relative flex flex-col justify-center">
              <div className="absolute inset-y-4 left-0 w-1.5 rounded-r-lg bg-gradient-to-b from-orange-500 to-amber-500" />
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-orange-700">
                Package overview
              </p>
              <h2 id="package-overview-h" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl leading-snug">
                A day-wise plan built around darshan timings and the drives between them
              </h2>
              {pkg.answer_first ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base mb-0">
                  {pkg.answer_first}
                </p>
              ) : null}
            </div>
          </div>

          {/* Right Column - Price Card (4 cols) */}
          <div className="lg:col-span-4 flex">
            <div className="w-full h-full overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/50 p-5 sm:p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] relative flex flex-col justify-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Starts from</p>
              {pkg.price_from ? (
                <p className="mt-1 text-2xl font-black tracking-tight text-[#B85C10] sm:text-3xl">
                  ₹{pkg.price_from.toLocaleString("en-IN")}
                </p>
              ) : (
                <p className="mt-1 text-2xl font-black tracking-tight text-[#B85C10]">On request</p>
              )}
              <div className="mt-4 space-y-2.5 text-[13px] font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-md bg-orange-100/40 text-orange-600">
                    <Clock size={15} />
                  </span>
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-md bg-orange-100/40 text-orange-600">
                    <Star size={15} className="fill-orange-400 text-orange-400" />
                  </span>
                  <span>Hotel, breakfast & vehicle included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-md bg-orange-100/40 text-orange-600">
                    <ShieldCheck size={15} />
                  </span>
                  <span>Tickets & permits arranged for you</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Content (left) vs Sticky Enquiry Form (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column - Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stops & Duration Strip */}
            <PackageDurationStrip duration={pkg.duration} breakdown={breakdown} />

            {/* Quick Inclusions Strip */}
            <PackageInclusionsStrip packageData={pkg} />

            {/* Trip Highlights */}
            {pkg.highlights?.length ? (
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />
                  Trip highlights
                </h3>
                <ul className="grid gap-3.5 sm:grid-cols-2">
                  {pkg.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-orange-100/30 bg-gradient-to-r from-orange-50/20 via-white to-transparent hover:border-orange-100 hover:bg-orange-50/30 transition-all duration-200 shadow-sm shadow-orange-500/5 active:scale-[0.99] cursor-default"
                    >
                      <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-orange-100/40 text-orange-600 shadow-sm">
                        <Sparkles size={11} className="fill-orange-300 text-orange-500" />
                      </span>
                      <span className="text-slate-800 text-[13.5px] sm:text-[14px] font-semibold">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Day-wise Itinerary */}
            {pkg.itinerary?.length ? (
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />
                  Day-wise itinerary
                </h3>
                <ItineraryAccordion days={pkg.itinerary} />
              </div>
            ) : null}

            {/* Inclusions & Exclusions */}
            {(pkg.inclusions?.length || pkg.exclusions?.length) ? (
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />
                  Inclusions & exclusions
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {pkg.inclusions?.length ? (
                    <div className="rounded-2xl bg-emerald-50/15 border border-emerald-100/50 p-5 sm:p-6 shadow-sm hover:bg-emerald-50/20 transition-all duration-300">
                      <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2.5 text-[13px] uppercase tracking-wider">
                        <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700 shadow-sm shadow-emerald-700/5">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        What is Included
                      </h4>
                      <ul className="space-y-2 text-slate-700 font-semibold text-[13.5px]">
                        {pkg.inclusions.map((i, k) => (
                          <li key={k} className="flex gap-3 items-center p-2 rounded-xl border border-transparent hover:border-emerald-100/25 hover:bg-emerald-50/30 transition-all duration-150">
                            <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-emerald-100/40 text-emerald-600">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span className="text-slate-800">{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {pkg.exclusions?.length ? (
                    <div className="rounded-2xl bg-rose-50/15 border border-rose-100/50 p-5 sm:p-6 shadow-sm hover:bg-rose-50/20 transition-all duration-300">
                      <h4 className="font-bold text-rose-800 mb-4 flex items-center gap-2.5 text-[13px] uppercase tracking-wider">
                        <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-rose-100/80 text-rose-700 shadow-sm shadow-rose-700/5">
                          <X size={12} strokeWidth={3} />
                        </span>
                        What is Excluded
                      </h4>
                      <ul className="space-y-2 text-slate-700 font-semibold text-[13.5px]">
                        {pkg.exclusions.map((e, k) => (
                          <li key={k} className="flex gap-3 items-center p-2 rounded-xl border border-transparent hover:border-rose-100/25 hover:bg-rose-50/30 transition-all duration-150">
                            <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-rose-100/40 text-rose-600">
                              <X size={11} strokeWidth={3} />
                            </span>
                            <span className="text-slate-800">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Column - Sticky Enquiry Form (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SideForm />
          </div>
        </div>
      </div>

      <CtaBand context={pkg.h1} />
      <ProductRatings />
      <PackageTestimonials PackageData={pkg} />
      <TrustBuildingSection />
      <Faq items={pkg.faq} heading="Package FAQs" />
      <RelatedLinks links={related} />
      <Policies PackageData={pkg} />

      <JsonLd
        data={touristTripSchema({
          name: pkg.h1,
          description: pkg.meta_description || pkg.answer_first,
          path: gujaratPackagePath(slug),
          price: pkg.price_verified ? pkg.price_from : undefined,
        })}
      />
    </PageShell>
  );
}
