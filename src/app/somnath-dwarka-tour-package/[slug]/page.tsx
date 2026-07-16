import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, ShieldCheck, Sparkles, Star, Check, X } from "lucide-react";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import ItineraryAccordion from "@/src/components/shared/ItineraryAccordion";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { getPackageBySlug, packagePath } from "@/src/lib/content";
import { SEED_PACKAGES, findSeedPackage } from "@/src/lib/seed/packages";
import { buildRelatedLinks } from "@/src/lib/links";
import SideForm from "@/src/components/TourPackage/SideForm";
import SpokeContent, { DecisionBlock, ProseSections, PriceMatrixTable } from "@/src/components/TourPackage/SpokeContent";
import PackageDurationStrip from "@/src/components/TourPackage/PackageDurationStrip";
import PackageInclusionsStrip from "@/src/components/TourPackage/PackageInclusionsStrip";
import PackageVisualHeader from "@/src/components/TourPackage/PackageVisualHeader";
import TrustBuildingSection from "@/src/utils/TrustBuildingSection";
import Policies from "@/src/components/TourPackage/Policies";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };
type PackageImage = { image: string; alt: string };

const FALLBACK_GALLERY: PackageImage[] = [
  {
    image: "/images/home/HomeHero.webp",
    alt: "Somnath Dwarka pilgrimage aarti experience",
  },
  {
    image: "/images/home/DwarikaLongImage.webp",
    alt: "Dwarkadhish Temple in Dwarka",
  },
  {
    image: "/images/home/SomnathLongImage.webp",
    alt: "Somnath Temple on the Gujarat coast",
  },
  {
    image: "/images/CTA.webp",
    alt: "Somnath Dwarka temple tour",
  },
  {
    image: "/images/home/HomeHero.webp",
    alt: "Sacred Gujarat travel experience",
  },
];

function asPackageImage(value: unknown): PackageImage | null {
  if (!value || typeof value !== "object") return null;
  const image = (value as { image?: unknown }).image;
  const alt = (value as { alt?: unknown }).alt;
  if (typeof image !== "string" || !image.trim()) return null;
  return {
    image,
    alt: typeof alt === "string" && alt.trim() ? alt : "Somnath Dwarka tour package",
  };
}


/** Normalise a CMS or seed record into one render shape. */
async function resolvePackage(slug: string) {
  const cms = (await getPackageBySlug(slug)) as Record<string, unknown> | null;
  if (cms) {
    const heroImage = asPackageImage(cms.heroImage);
    const childImages = Array.isArray(cms.childImages)
      ? cms.childImages.map(asPackageImage).filter((image): image is PackageImage => Boolean(image))
      : [];

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
      itinerary: ((cms.itinerary as { day: number; title: string; description: string; stops?: string[]; steps?: { time: string; activity: string }[] }[]) || []).map((d) => ({
        day: d.day,
        title: d.title,
        description: d.description,
        stops: d.stops,
        steps: Array.isArray(d.steps) ? d.steps.map((s) => ({ time: String(s.time || ""), activity: String(s.activity || "") })) : [],
      })),
      inclusions: ((cms.inclusions as { description: string }[]) || []).map((i) => i.description),
      exclusions: ((cms.exclusions as { description: string }[]) || []).map((e) => e.description),
      priceTiers: ((cms.priceTiers as { tier?: string; perNight?: number; total?: number; hotel?: string }[]) || [])
        .filter((t) => t && (t.tier || t.perNight || t.total))
        .map((t) => ({
          tier: String(t.tier || ""),
          perNight: Number(t.perNight || 0),
          total: Number(t.total || 0),
          hotel: String(t.hotel || ""),
        })),
      faq: ((cms.faqs as { question: string; answer: string }[]) || []).map((f) => ({ question: f.question, answer: f.answer })),
      heroImage,
      childImages,
      noindex: Boolean(cms.noindex),
      transfer_included: Boolean(cms.isTransferIncluded),
      stay_included: Boolean(cms.isStayIncluded),
      breakfast_included: Boolean(cms.isBreakfastIncluded),
      sightseeing_included: Boolean(cms.isSightseeingIncluded),
      policies: [
        { title: "Refund", description: String(cms.refund || "") },
        { title: "Cancel", description: String(cms.cancel || "") },
        { title: "Confirmation", description: String(cms.confirmation || "") },
        { title: "Payment", description: String(cms.payment || "") },
      ].filter((p) => p.description.trim() !== ""),
      extras: readSpokeExtras(cms),
    };
  }
  const seed = findSeedPackage(slug);
  if (!seed) return null;
  return {
    ...seed,
    title_tag: seed.title,
    meta_description: seed.answer_first,
    priceTiers: [] as { tier: string; perNight: number; total: number; hotel: string }[],
    heroImage: FALLBACK_GALLERY[0],
    childImages: FALLBACK_GALLERY.slice(1),
    noindex: false,
    transfer_included: true,
    stay_included: true,
    breakfast_included: true,
    sightseeing_included: true,
    policies: [],
    extras: readSpokeExtras({}),
  };
}

/** The long-form docx/JSON sections stored on the package doc (seed-managed canon). */
type SpokeExtras = {
  decision: { title: string; intro: string; headers: string[]; rows: string[][]; note: string } | null;
  sections: { h2: string; body: string[] }[];
  priceMatrix: { headers: string[]; rows: string[][] } | null;
  whyChoose: { title: string; points: string[] } | null;
  notForYou: { title: string; items: string[] } | null;
  priceNotes: string[];
  finalCta: string;
};

function readSpokeExtras(cms: Record<string, unknown>): SpokeExtras {
  const asStrArr = (v: unknown) => (Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : []);
  const d = cms.decision as { title?: string; intro?: string; headers?: unknown; rows?: unknown; note?: string } | undefined;
  const decision =
    d && (d.intro || (Array.isArray(d.rows) && d.rows.length))
      ? {
          title: String(d.title || ""),
          intro: String(d.intro || ""),
          headers: asStrArr(d.headers),
          rows: Array.isArray(d.rows) ? d.rows.map((r) => asStrArr(r)) : [],
          note: String(d.note || ""),
        }
      : null;
  const wc = cms.whyChoose as { title?: string; points?: unknown } | undefined;
  const whyChoose = wc && Array.isArray(wc.points) && wc.points.length
    ? { title: String(wc.title || "Why choose Experience My India"), points: asStrArr(wc.points) }
    : null;
  const nf = cms.notForYou as { title?: string; items?: unknown } | undefined;
  const notForYou = nf && Array.isArray(nf.items) && nf.items.length
    ? { title: String(nf.title || "This plan is not for you if"), items: asStrArr(nf.items) }
    : null;
  const sections = (Array.isArray(cms.sections) ? cms.sections : [])
    .map((s) => {
      const sec = s as { h2?: string; body?: unknown };
      return { h2: String(sec.h2 || ""), body: asStrArr(sec.body) };
    })
    .filter((s) => s.h2 && s.body.length);

  const pm = cms.priceMatrix as { headers?: unknown; rows?: unknown } | undefined;
  const priceMatrix =
    pm && Array.isArray(pm.rows) && pm.rows.length
      ? { headers: asStrArr(pm.headers), rows: pm.rows.map((r) => asStrArr(r)) }
      : null;

  return {
    decision,
    sections,
    priceMatrix,
    whyChoose,
    notForYou,
    priceNotes: asStrArr(cms.priceNotes),
    finalCta: String(cms.finalCta || ""),
  };
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

  const breakdown = pkg.itinerary.map((item, index) => {
    let place = "Dwarka";
    const text = `${item.title} ${item.description} ${item.stops?.join(" ") || ""}`.toLowerCase();
    
    if (text.includes("ahmedabad drop")) place = "Ahmedabad Drop";
    else if (text.includes("ahmedabad")) place = "Ahmedabad";
    else if (text.includes("bet dwarka")) place = "Bet Dwarka";
    else if (text.includes("dwarka")) place = "Dwarka";
    else if (text.includes("somnath")) place = "Somnath";
    else if (text.includes("porbandar")) place = "Porbandar";
    else if (text.includes("rajkot")) place = "Rajkot";
    else if (text.includes("mumbai")) place = "Mumbai";
    else if (text.includes("jamnagar")) place = "Jamnagar";
    else if (text.includes("diu")) place = "Diu";
    else {
      const cleanTitle = item.title.replace(/arrival|departure|sightseeing|to/gi, "").trim();
      const words = cleanTitle.split(/\s+/).filter(w => w.length > 2);
      place = words[0] || "Dwarka";
    }

    return {
      id: `stop-${index}`,
      days: 1,
      place,
    };
  });

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
                A clear, temple-first plan for your Somnath Dwarka trip
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
                  <span>Private cab & hotel support</span>
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

            {/* Decision block (where the night goes / the fork / Gir or Diu) */}
            {pkg.extras.decision ? <DecisionBlock decision={pkg.extras.decision} /> : null}

            {/* Origin-page argument sections (the 02:57 problem, the road, etc.) */}
            <ProseSections sections={pkg.extras.sections} />

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

            {/* Pricing: full tier-by-nights matrix where the page has one, else tier cards */}
            {pkg.extras.priceMatrix ? <PriceMatrixTable matrix={pkg.extras.priceMatrix} /> : null}

            {!pkg.extras.priceMatrix && pkg.priceTiers?.length ? (
              <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <h3 className="text-xl font-bold text-slate-950 mb-2 flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />
                  Pricing by tier
                </h3>
                <p className="mb-5 text-sm text-slate-500">
                  Per person. The tier is the hotel; hotel, breakfast and your vehicle with driver are included in every tier.
                </p>
                <div className="overflow-x-auto rounded-xl border border-orange-100">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-orange-50 text-[#7a4a2b]">
                      <tr>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Tier</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Per person, per night</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Total per person</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Hotels</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-50">
                      {pkg.priceTiers.map((t, i) => (
                        <tr key={i} className="align-top hover:bg-orange-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">{t.tier}</td>
                          <td className="px-4 py-3 text-slate-700">
                            {t.perNight ? `₹${t.perNight.toLocaleString("en-IN")}` : "—"}
                          </td>
                          <td className="px-4 py-3 font-bold text-[#B85C10]">
                            {t.total ? `₹${t.total.toLocaleString("en-IN")}` : "—"}
                          </td>
                          <td className="px-4 py-3 text-slate-600">{t.hotel || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

      {/* Long-form docx sections: why-choose, honest fit, price notes */}
      <SpokeContent extras={pkg.extras} />

      {pkg.extras.finalCta ? (
        <div className="mx-auto max-w-3xl px-4 pb-4 text-center">
          <p className="text-base leading-relaxed text-slate-600">{pkg.extras.finalCta}</p>
        </div>
      ) : null}

      <CtaBand context={pkg.h1} />
      <TrustBuildingSection />
      <Faq items={pkg.faq} heading="Package FAQs" />
      <RelatedLinks links={related} />
      <Policies PackageData={pkg} />

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
