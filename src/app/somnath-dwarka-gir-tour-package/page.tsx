import type { Metadata } from "next";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { GIR_HUB_SLUG, getHubBySlug, getPublishedHubSpokes, girPackagePath } from "@/src/lib/content";
import { GIR_SEED_PACKAGES, type GirSeedPackage } from "@/src/lib/seed/girPackages";
import {
  isAuthorisedGirPackage,
  girPackageBucket,
  type GirPackageBucket,
} from "@/src/config/girPackageSpokes";
import { buildRelatedLinks } from "@/src/lib/links";
import type { TourPackage } from "@/src/utils/TourData";
import PackageExplorer from "@/src/components/TourArchive/PackageExplorer";
import TourArchiveCTA from "@/src/components/TourArchive/TourArchiveCTA";
import CustomPackageCTA from "@/src/components/shared/CustomPackageCTA";
import HangingDiyas from "@/src/components/TourArchive/HangingDiyas";
import PackageHubHero from "@/src/components/TourArchive/PackageHubHero";
import HubContent from "@/src/components/hub/HubContent";
import { faqOf, s, bool, verifiedValue, relatedOf, h1Of, titleOf } from "@/src/lib/cms";

const PATH = "/somnath-dwarka-gir-tour-package/";

export const revalidate = 3600;

const DEFAULT_TITLE = "Somnath Dwarka Gir Tour Package";
const DEFAULT_DESCRIPTION =
  "Somnath Dwarka Gir tour packages with day-wise itinerary, safari planning, inclusions and indicative prices. Choose by duration, starting city or traveller.";

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getHubBySlug(GIR_HUB_SLUG);
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
const HERO_SOMNATH = "/images/home/SomnathLongImage.webp";
const HERO_DWARKA = "/images/home/DwarikaLongImage.webp";
const HERO_GIR = "/images/gir/gir-hero.jpg";
const HERO_MOBILE = "/images/gir/gir-hero.jpg";

// Rotating pool of temple/forest imagery for variants that have no CMS photos yet.
const FALLBACK_CARD_IMAGES = [
  HERO_GIR,
  HERO_SOMNATH,
  HERO_DWARKA,
  "/images/junagadh-girnar/junagadh-girnar-hero.jpg",
  "/images/CTA.webp",
];

// Wraps the "Tour Package" phrase in the CMS-authored H1 with the warm orange
// gradient, case-insensitively, leaving the rest of the headline as-is.
function highlightHeadline(text: string) {
  const parts = text.split(/(tour package)/i);
  return parts.map((part, i) =>
    /^tour package$/i.test(part) ? (
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
  seed: GirSeedPackage,
  index: number,
  override: SpokeOverride | undefined,
): TourPackage {
  const duration = override?.duration || seed.duration;
  const days = Number(duration.match(/(\d+)/)?.[1] ?? 4);
  const rotated = [
    ...FALLBACK_CARD_IMAGES.slice(index % FALLBACK_CARD_IMAGES.length),
    ...FALLBACK_CARD_IMAGES.slice(0, index % FALLBACK_CARD_IMAGES.length),
  ];

  const location =
    seed.facet === "from-city"
      ? `${seed.h1.replace(/^Somnath Dwarka Gir Tour Package from /i, "")} to Dwarka, Somnath & Gir`
      : "Dwarka, Somnath, Sasan Gir";

  const groupType =
    seed.facet === "traveller"
      ? seed.slug === "group"
        ? "Group Trip"
        : "Family Trip"
      : "Private Trip";

  const badge =
    seed.facet === "from-city"
      ? "Starts from your city"
      : seed.facet === "addon"
      ? "Extended circuit"
      : seed.facet === "traveller"
      ? seed.slug === "for-senior-citizens"
        ? "Easy pace"
        : "Family Friendly"
      : index === 0
      ? "Popular"
      : "Curated";

  return {
    id: seed.slug,
    slug: seed.slug,
    title: override?.h1 || seed.h1,
    location,
    duration,
    groupType,
    days,
    price: override?.price_from ?? seed.price_from,
    // No invented "was" price: a strikethrough must reflect a real former rate.
    originalPrice: 0,
    inclusions: seed.inclusions.slice(0, 4),
    images: rotated.slice(0, 5),
    href: girPackagePath(seed.slug),
    badge,
    popular: index === 0,
  };
}

/** Explorer copy for this hub — its groups mean different things than the flagship's. */
const GROUP_COPY = {
  duration: {
    blurb: "From a compressed 3-day run to an unhurried 6-day loop with a spare safari morning.",
  },
  city: {
    blurb: "Private round trips with pickup and drop from your city, with Gir on the return leg.",
  },
  traveller: {
    title: "Choose by traveller",
    blurb: "Plans tuned for families, senior travellers or a group with several safari jeeps.",
  },
  route: {
    title: "Add a destination",
    blurb: "Extend the circuit with Diu's beaches or Junagadh and the Girnar climb.",
  },
} as const;

export default async function GirPackagePillarPage() {
  const hub = await getHubBySlug(GIR_HUB_SLUG);
  // h1Of strips the URL map's "— Itinerary, Price & Booking" keyword tail.
  const heroHeadline = hub ? h1Of(hub) : "";

  // Editor-authored spoke docs win over the seed for the fields they carry;
  // the seed supplies the itinerary and copy the CMS has no field for yet.
  const spokeDocs = (await getPublishedHubSpokes()).filter((d) => d.hub === GIR_HUB_SLUG);
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
  const variants: TourPackage[] = GIR_SEED_PACKAGES.filter((p) => isAuthorisedGirPackage(p.slug)).map(
    (seed, i) => seedToTourPackage(seed, i, overrides.get(seed.slug)),
  );

  const inBucket = (bucket: GirPackageBucket) =>
    variants.filter((v) => girPackageBucket(v.slug) === bucket);

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
      { target: "/gir/", anchor: "Gir travel guide", type: "pillar" },
      { target: "/somnath/", anchor: "Somnath travel guide", type: "pillar" },
      { target: "/dwarka/", anchor: "Dwarka travel guide", type: "pillar" },
      { target: "/gir/gir-safari-booking/", anchor: "how Gir safari booking works", type: "sibling" },
      { target: "/hotels/sasan-gir-hotels/", anchor: "hotels in Sasan Gir", type: "money" },
    ],
    extra: hub ? relatedOf(hub) : [],
  });

  const dbFaq = hub ? faqOf(hub) : [];
  const pillarFaq =
    dbFaq.length > 0
      ? dbFaq
      : [
          {
            question: "What does a Somnath Dwarka Gir tour package include?",
            answer:
              "Hotel stays, a private vehicle with driver, daily breakfast, a temple-sequenced itinerary and help booking your Gir safari. The safari permit and jeep are charged separately at actuals, and air/train fare and lunch/dinner are excluded. Exact inclusions are listed on each variant.",
          },
          {
            question: "How many days do I need for Somnath, Dwarka and Gir?",
            answer:
              "Four days is the working minimum, because the safari has to be a morning departure and the drive from Somnath to Sasan Gir takes most of a day. Five days is the comfortable version and leaves a fallback morning if a safari slot falls through.",
          },
          {
            question: "Is the Gir safari included in the package price?",
            answer:
              "No. Safari permits and jeeps are booked through the forest department's online system and charged at actuals — we handle the booking and share the confirmation, but the price is not ours to quote.",
          },
          {
            question: "When is Gir closed?",
            answer:
              "The park shuts for the monsoon — roughly mid-June to mid-October. The forest department sets the exact dates each year, so we confirm them against your travel window before you book. The Devalia Interpretation Zone often stays open when the main park does not.",
          },
          {
            question: "Can I customise the itinerary and starting city?",
            answer:
              "Yes — every package here is a starting point. We can change the number of days, add pickup from your city, swap in Diu or Junagadh, and tune the hotel tier to your budget. Share your dates for a tailored plan.",
          },
        ];

  let schemaData: Record<string, unknown> | null = touristTripSchema({
    name: "Somnath Dwarka Gir Tour Package",
    description:
      "Pilgrimage and wildlife tour packages covering Somnath, Dwarka and Gir National Park with private transport and hotels.",
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
        { name: "Somnath Dwarka Gir packages", path: PATH },
      ]}
      flushHero
    >
      <PackageHubHero
        headline={
          heroHeadline ? (
            highlightHeadline(heroHeadline)
          ) : (
            <>
              Somnath Dwarka Gir{" "}
              <span className="pkg-headline-grad inline-block pr-[0.12em] pb-[0.1em] italic">Tour Package</span>
            </>
          )
        }
        description={
          s(hub || {}, "answer_first") || (
            <>
              These packages run the Saurashtra triangle —{" "}
              <strong className="font-semibold text-orange-700">Dwarkadhish Temple</strong>, Nageshwar
              Jyotirlinga, <strong className="font-semibold text-orange-700">Somnath Temple</strong> with the
              evening aarti, and a morning safari in{" "}
              <strong className="font-semibold text-orange-700">Gir National Park</strong>. Every plan is
              sequenced around darshan timings and the safari&apos;s morning slot; prices shown are indicative
              until confirmed, and the safari permit is booked separately at actuals.
            </>
          )
        }
        mobileImage={{
          src: HERO_MOBILE,
          alt: "Gir National Park, Somnath and Dwarka",
          title: "Somnath, Dwarka & Gir",
          region: "Saurashtra, Gujarat",
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
          { value: "4–6", label: "Days circuit" },
        ]}
        waMessage="Hi, I'd like a Somnath Dwarka Gir tour package quote"
      />

      {/* ── PACKAGE GRIDS ── */}
      <div className="relative bg-white">
        <HangingDiyas />

        {/* Section intro */}
        <div className="relative z-20 mx-auto max-w-3xl px-4 pt-14 text-center sm:pt-16">
          <h2 className="font-playfair mt-20 text-4xl font-black leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            <span className="text-orange-500">Somnath, Dwarka &amp; Gir</span>
            <span className="mt-1 block text-[#111827]">Tour Packages</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Two jyotirlinga-circuit temples, the Dwarkadhish darshan and a morning with Asia&apos;s only
            wild lions — planned as one trip, with the safari booked around your dates.
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
        heading="Somnath, Dwarka & Gir — Your Questions Answered"
        subheading="Safari slots, park closures, darshan timings and what the package price actually covers."
      />

      <TourArchiveCTA />

      <RelatedLinks links={related} />

      <JsonLd data={schemaData} />
    </PageShell>
  );
}
