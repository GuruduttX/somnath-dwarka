import PageShell from "@/src/components/shared/PageShell";
import ItineraryAccordion from "@/src/components/shared/ItineraryAccordion";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks, { type RelatedLink } from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { Clock, ShieldCheck, Sparkles, Star } from "lucide-react";
import InclusionsExclusions from "@/src/components/TourPackage/InclusionsExclusions";
import { touristTripSchema, type Crumb } from "@/src/lib/seo";
import SideForm from "@/src/components/TourPackage/SideForm";
import PackageDurationStrip from "@/src/components/TourPackage/PackageDurationStrip";
import PackageInclusionsStrip from "@/src/components/TourPackage/PackageInclusionsStrip";
import PackageVisualHeader from "@/src/components/TourPackage/PackageVisualHeader";
import ProductRatings from "@/src/components/TourPackage/ProductRatings";
import PackageTestimonials from "@/src/components/TourPackage/PackageTestimonials";
import TrustBuildingSection from "@/src/utils/TrustBuildingSection";
import Policies from "@/src/components/TourPackage/Policies";
import ItineraryRouteMap from "@/src/components/TourPackage/ItineraryRouteMap";

export type PackageImage = { image: string; alt: string };

/**
 * One package variant, normalised from whichever source owns it — a CMS
 * package doc, a hub-spoke doc or a seed entry. Empty arrays hide their
 * section, so a half-filled CMS record still renders a coherent page instead
 * of an empty heading.
 */
export type PackageDetail = {
  slug: string;
  h1: string;
  duration: string;
  price_from: number;
  /** A price renders in schema only once an editor has verified it. */
  price_verified: boolean;
  answer_first: string;
  meta_description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string; stops?: string[]; steps?: { time: string; activity: string }[] }[];
  inclusions: string[];
  exclusions: string[];
  faq: { question: string; answer: string }[];
  heroImage?: PackageImage | null;
  childImages?: PackageImage[];
  transfer_included: boolean;
  stay_included: boolean;
  breakfast_included: boolean;
  sightseeing_included: boolean;
  policies: { title: string; description: string }[];
  /** Free prose from the CMS `body` field, rendered as paragraphs. */
  body?: string;
  /** Where the trip goes, for packages with no day-wise itinerary yet. */
  routePlaces?: string[];
};

/**
 * The package-detail page layout: gallery header, overview and price card,
 * stops strip, inclusions chips, highlights, itinerary, inclusions/exclusions
 * table and the sticky enquiry form, followed by the trust blocks.
 *
 * Shared by every hub that sells variants — the Somnath–Dwarka–Gir triangle,
 * the Gujarat umbrella and the destination hubs — so a card anywhere on the
 * site opens the same page, whatever collection its data came from.
 */
export default function PackageDetailTemplate({
  pkg,
  path,
  crumbs,
  related,
  breakdown,
  overviewHeading,
  assurance,
}: {
  pkg: PackageDetail;
  path: string;
  crumbs: Crumb[];
  related: RelatedLink[];
  /** Stops for the duration strip, derived by the caller from its own geography. */
  breakdown: { id: string; days: number; place: string }[];
  overviewHeading: string;
  /** The third line of the price card — what this hub promises to handle. */
  assurance: string;
}) {
  const paragraphs = (pkg.body ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PageShell crumbs={crumbs}>
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
                {overviewHeading}
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
                  <span>{assurance}</span>
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
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 sm:p-6 lg:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <h3 className="mb-3 flex items-start gap-2 text-lg font-bold text-slate-950 sm:mb-5 sm:text-xl">
                  <span className="mt-1 h-5 w-1 shrink-0 rounded-full bg-orange-500 inline-block sm:mt-1.5 sm:h-6" />
                  Trip highlights
                </h3>
                {/* Flat rows: a bordered card per highlight wrapped two lines of
                    copy in its own box, which reads as noise on a phone. */}
                <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                        <Sparkles size={10} className="fill-orange-300 text-orange-500" />
                      </span>
                      <span className="text-[13px] font-medium leading-relaxed text-slate-700 sm:text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Editor prose, where the CMS doc carries any */}
            {paragraphs.length ? (
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <div className="space-y-4">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-[15px] leading-7 text-slate-700">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Day-wise Itinerary */}
            {pkg.itinerary?.length ? (
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-3 sm:p-6 lg:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <h3 className="mb-3 flex items-center gap-2 px-1 text-lg font-bold text-slate-950 sm:mb-5 sm:px-0 sm:text-xl">
                  <span className="h-5 w-1 shrink-0 rounded-full bg-orange-500 inline-block sm:h-6" />
                  Day-wise itinerary
                </h3>
                <ItineraryAccordion days={pkg.itinerary} />
              </div>
            ) : null}

            <InclusionsExclusions
              inclusions={pkg.inclusions}
              exclusions={pkg.exclusions}
            />
          </div>

          {/* Right Column - Sticky Enquiry Form (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SideForm />
          </div>
        </div>
      </div>

      {/* Day-wise route map, sitting just above the CTA. */}
      <ItineraryRouteMap
        title={pkg.h1}
        days={pkg.itinerary.map((d) => ({
          day: d.day,
          title: d.title,
          description: d.description,
          stops: d.stops ?? [],
          steps: d.steps ?? [],
        }))}
        fallbackPlaces={breakdown.map((b) => b.place)}
        places={pkg.routePlaces}
      />

      <CtaBand context={pkg.h1} />
      <ProductRatings />
      <PackageTestimonials PackageData={pkg} />
      <TrustBuildingSection />
      <Faq items={pkg.faq} heading="Package FAQs" />
      <RelatedLinks links={related} />
      <Policies PackageData={pkg} />

      {/* BreadcrumbList JSON-LD comes from PageShell, which owns the single breadcrumb. */}
      <JsonLd
        data={touristTripSchema({
          name: pkg.h1,
          description: pkg.meta_description || pkg.answer_first,
          path,
          price: pkg.price_verified ? pkg.price_from : undefined,
        })}
      />
    </PageShell>
  );
}
