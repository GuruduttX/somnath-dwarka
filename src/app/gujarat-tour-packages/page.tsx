import type { Metadata } from "next";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import {
  GUJARAT_HUB_SLUG,
  getHubBySlug,
  getPublishedHubSpokes,
  gujaratPackagePath,
} from "@/src/lib/content";
import { GUJARAT_SEED_PACKAGES, type GujaratSeedPackage } from "@/src/lib/seed/gujaratPackages";
import {
  isAuthorisedGujaratPackage,
  gujaratPackageBucket,
  type GujaratPackageBucket,
} from "@/src/config/gujaratPackageSpokes";
import { buildRelatedLinks } from "@/src/lib/links";
import type { TourPackage } from "@/src/utils/TourData";
import PackageExplorer from "@/src/components/TourArchive/PackageExplorer";
import TourArchiveCTA from "@/src/components/TourArchive/TourArchiveCTA";
import CustomPackageCTA from "@/src/components/shared/CustomPackageCTA";
import HangingDiyas from "@/src/components/TourArchive/HangingDiyas";
import PackageHubHero from "@/src/components/TourArchive/PackageHubHero";
import HubContent from "@/src/components/hub/HubContent";
import { faqOf, s, bool, verifiedValue, relatedOf, h1Of, titleOf } from "@/src/lib/cms";

const PATH = "/gujarat-tour-packages/";

export const revalidate = 3600;

const DEFAULT_TITLE = "Gujarat Tour Packages";
const DEFAULT_DESCRIPTION =
  "Gujarat tour packages with day-wise itineraries, inclusions and indicative prices — jyotirlinga circuits, Saurashtra darshan, UNESCO heritage, wildlife safaris and short temple trips.";

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getHubBySlug(GUJARAT_HUB_SLUG);
  if (!hub) {
    return buildMetadata({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: PATH });
  }
  return buildMetadata({
    title: titleOf(hub) || DEFAULT_TITLE,
    // The scaffolded hub docs carry an empty meta_description; an empty
    // description tag is worse than the hand-written fallback.
    description: s(hub, "meta_description") || DEFAULT_DESCRIPTION,
    path: PATH,
    noindex: bool(hub, "noindex"),
    canonicalOverride: s(hub, "canonical_override") || undefined,
  });
}

// Hero image composition (local photography).
const HERO_MOBILE = "/images/home/StatueOfUnity.webp";

// Rotating pool of state-wide imagery for variants that have no CMS photos yet.
const FALLBACK_CARD_IMAGES = [
  "/images/home/SomnathLongImage.webp",
  "/images/home/DwarikaLongImage.webp",
  "/images/gir/gir-hero.jpg",
  "/images/junagadh-girnar/junagadh-girnar-hero.jpg",
  "/images/home/StatueOfUnity.webp",
  "/images/festivals/hero.jpg",
];

// Wraps the "Tour Packages" phrase in the CMS-authored H1 with the warm orange
// gradient, case-insensitively, leaving the rest of the headline as-is.
function highlightHeadline(text: string) {
  const parts = text.split(/(tour packages?)/i);
  return parts.map((part, i) =>
    /^tour packages?$/i.test(part) ? (
      <span key={i} className="pkg-headline-grad inline-block pr-[0.12em] pb-[0.05em] italic">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/** A CMS hub-spoke doc, indexed by slug, so editor copy wins over the seed. */
type SpokeOverride = { title?: string; h1?: string; duration?: string; price_from?: number };

function seedToTourPackage(
  seed: GujaratSeedPackage,
  index: number,
  override: SpokeOverride | undefined,
): TourPackage {
  const duration = override?.duration || seed.duration;
  const days = Number(duration.match(/(\d+)/)?.[1] ?? 1);
  const rotated = [
    ...FALLBACK_CARD_IMAGES.slice(index % FALLBACK_CARD_IMAGES.length),
    ...FALLBACK_CARD_IMAGES.slice(0, index % FALLBACK_CARD_IMAGES.length),
  ];

  const groupType =
    seed.facet === "traveller" ? "Corporate Group" : seed.facet === "duration" ? "Short Trip" : "Private Trip";

  const badge =
    seed.facet === "from-city"
      ? "Starts from your city"
      : seed.facet === "traveller"
      ? "For teams"
      : seed.facet === "duration"
      ? "Short trip"
      : index === 0
      ? "Popular"
      : "Curated";

  return {
    id: seed.slug,
    slug: seed.slug,
    title: override?.h1 || seed.h1,
    location: seed.location || "Gujarat",
    duration,
    groupType,
    days,
    price: override?.price_from ?? seed.price_from,
    // No invented "was" price: a strikethrough must reflect a real former rate.
    originalPrice: 0,
    inclusions: seed.inclusions.slice(0, 4),
    images: rotated.slice(0, 5),
    href: gujaratPackagePath(seed.slug),
    badge,
    popular: index === 0,
  };
}

/**
 * Explorer copy for this hub. The umbrella sells circuits and short temple
 * trips rather than one route at different lengths, so the default group
 * headings ("Choose by duration") would misdescribe what the cards are.
 */
const GROUP_COPY = {
  route: {
    title: "Choose your circuit",
    blurb: "Multi-day routes across the state — jyotirlingas, Saurashtra, heritage, wildlife.",
  },
  duration: {
    title: "Short pilgrimage trips",
    blurb: "One- and two-day temple runs that work from Ahmedabad or Vadodara.",
  },
  city: {
    title: "Choose by starting city",
    blurb: "Plans that begin at your arrival airport or station in Gujarat.",
  },
  traveller: {
    title: "For teams",
    blurb: "Corporate offsites with a conference room, coach transport and free afternoons.",
  },
} as const;

export default async function GujaratPackagePillarPage() {
  const hub = await getHubBySlug(GUJARAT_HUB_SLUG);
  // h1Of strips the URL map's "— Itinerary, Price & Booking" keyword tail.
  const heroHeadline = hub ? h1Of(hub) : "";

  // Editor-authored spoke docs win over the seed for the fields they carry;
  // the seed supplies the itinerary and copy the CMS has no field for yet.
  const spokeDocs = (await getPublishedHubSpokes()).filter((d) => d.hub === GUJARAT_HUB_SLUG);
  const overrides = new Map<string, SpokeOverride>(
    spokeDocs.map((d) => [
      String(d.slug),
      {
        title: titleOf(d) || undefined,
        h1: h1Of(d) || undefined,
        duration: s(d, "duration") || undefined,
        price_from: Number(verifiedValue(d, "price_from") || 0) || undefined,
      },
    ]),
  );

  // Only variants the URL map authorises are listed. A record outside the map
  // is not part of the planned architecture, so it never reaches the money page.
  const variants: TourPackage[] = GUJARAT_SEED_PACKAGES.filter((p) =>
    isAuthorisedGujaratPackage(p.slug),
  ).map((seed, i) => seedToTourPackage(seed, i, overrides.get(seed.slug)));

  const inBucket = (bucket: GujaratPackageBucket) =>
    variants.filter((v) => gujaratPackageBucket(v.slug) === bucket);

  const byDuration = inBucket("duration");
  const byCity = inBucket("city");
  const byType = inBucket("traveller");
  const byRoute = inBucket("route");

  const prices = variants.map((v) => v.price).filter((p) => p > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const priceValueStr = hub ? verifiedValue(hub, "price_from") : null;

  const related = buildRelatedLinks({
    self: PATH,
    money: "packages",
    siblings: [
      { target: "/somnath-dwarka-tour-package/", anchor: "Somnath Dwarka tour packages", type: "sibling" },
      { target: "/somnath-dwarka-gir-tour-package/", anchor: "Somnath Dwarka Gir packages", type: "sibling" },
      { target: "/somnath/", anchor: "Somnath travel guide", type: "pillar" },
      { target: "/dwarka/", anchor: "Dwarka travel guide", type: "pillar" },
      { target: "/gir/", anchor: "Gir travel guide", type: "pillar" },
    ],
    extra: hub ? relatedOf(hub) : [],
  });

  const dbFaq = hub ? faqOf(hub) : [];
  const pillarFaq =
    dbFaq.length > 0
      ? dbFaq
      : [
          {
            question: "How many days do I need for a Gujarat tour?",
            answer:
              "It depends what you are after. Four days covers the two jyotirlingas at Somnath and Nageshwar; a week does the Saurashtra loop with Gir and Palitana; ten days is the full state including Kutch and the Statue of Unity. Short temple trips like Dakor or Modhera run in one or two days from Ahmedabad.",
          },
          {
            question: "What does a Gujarat tour package include?",
            answer:
              "Hotel stays, a private vehicle with driver, daily breakfast and a planned day-wise itinerary. Monument tickets, ropeway fares and safari permits are charged at actuals, and air/train fare and lunch/dinner are excluded. Exact inclusions are listed on each package.",
          },
          {
            question: "When is the best time to visit Gujarat?",
            answer:
              "October to March. Summer gets hot enough to make midday sightseeing unpleasant, and the monsoon closes Gir and floods the Rann. December and January are peak — book early if your dates fall near the Rann Utsav or the holiday weeks.",
          },
          {
            question: "Can you build a custom Gujarat itinerary?",
            answer:
              "Yes — every package here is a starting point. We can change the length, start from your arrival city, combine circuits, and tune the hotel tier to your budget. Share your dates and what you most want to see.",
          },
        ];

  let schemaData: Record<string, unknown> | null = touristTripSchema({
    name: "Gujarat Tour Packages",
    description:
      "Tour packages across Gujarat — jyotirlinga and temple circuits, Saurashtra darshan, UNESCO heritage sites and wildlife safaris, with private transport and hotels.",
    path: PATH,
  });

  if (hub?.schema_overrides) {
    try {
      schemaData = JSON.parse(hub.schema_overrides as string);
    } catch {}
  }

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Gujarat tour packages", path: PATH },
      ]}
      flushHero
    >
      <PackageHubHero
        headline={
          heroHeadline ? (
            highlightHeadline(heroHeadline)
          ) : (
            <>
              Gujarat{" "}
              <span className="pkg-headline-grad inline-block pr-[0.12em] pb-[0.1em] italic">Tour Packages</span>
            </>
          )
        }
        description={
          s(hub || {}, "answer_first") || (
            <>
              One state, four very different trips: the jyotirlinga coast at{" "}
              <strong className="font-semibold text-orange-700">Somnath and Dwarka</strong>, the Saurashtra
              loop through <strong className="font-semibold text-orange-700">Gir and Palitana</strong>, four
              UNESCO World Heritage sites, and short temple runs to Dakor, Pavagadh and Modhera. Pick a
              circuit below — prices shown are indicative until confirmed, and tickets are charged at actuals.
            </>
          )
        }
        mobileImage={{
          src: HERO_MOBILE,
          alt: "The Statue of Unity in Gujarat",
          title: "Gujarat",
          region: "Western India",
        }}
        stats={[
          { value: `${variants.length}+`, label: "Curated plans" },
          {
            value: priceValueStr
              ? `₹${Number(priceValueStr).toLocaleString("en-IN")}`
              : minPrice
              ? `₹${minPrice.toLocaleString("en-IN")}`
              : "Custom",
            label: "Starts from*",
          },
          { value: "1–10", label: "Days on offer" },
        ]}
        waMessage="Hi, I'd like a Gujarat tour package quote"
        browseHref="#by-route"
      />

      {/* ── PACKAGE GRIDS ── */}
      <div className="relative bg-white">
        <HangingDiyas />

        {/* Section intro */}
        <div className="relative z-20 mx-auto max-w-3xl px-4 pt-14 text-center sm:pt-16">
          <h2 className="font-playfair mt-20 text-4xl font-black leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            <span className="text-orange-500">Gujarat</span>
            <span className="mt-1 block text-[#111827]">Tour Packages</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Temple circuits, heritage routes and wildlife trails across the state — each one sequenced
            around darshan timings, safari slots and the drives that actually connect them.
          </p>
        </div>

        <PackageExplorer
          duration={byDuration}
          city={byCity}
          traveller={byType}
          route={byRoute}
          groupCopy={GROUP_COPY}
        />
      </div>

      {/* ── Long-form, admin-driven hub content. Renders only the blocks the
          CMS doc carries, so an unfilled hub adds nothing. ── */}
      {hub ? <HubContent hub={hub} /> : null}

      <CustomPackageCTA />

      <Faq
        items={pillarFaq}
        heading="Planning a Gujarat Trip — Your Questions Answered"
        subheading="How long to take, what the price covers, when to come and what can be customised."
      />

      <TourArchiveCTA />

      <RelatedLinks links={related} />

      <JsonLd data={schemaData} />
    </PageShell>
  );
}
