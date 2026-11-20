import type { Metadata } from "next";
import {
  buildMetadata,
  itemListSchema,
  sanitizeSchemaOverride,
  touristTripSchema,
  webPageSchema,
} from "@/src/lib/seo";
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
import type { GujaratSeedPackage } from "@/src/lib/seed/gujaratPackages";
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
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { rich, type RichBold } from "@/src/lib/pages/rich";
import { getDataset } from "@/src/lib/datasets/store";
import { GUJARAT_PACKAGES_DATASET } from "@/src/lib/cms-groups/packages";
import { GUJARAT_HUB_PAGE, type GujaratHubContent } from "./content";

const PATH = "/gujarat-tour-packages/";

export const revalidate = 3600;

const OrangeBold: RichBold = ({ children }) => <strong className="font-semibold text-orange-700">{children}</strong>;

export async function generateMetadata(): Promise<Metadata> {
  const [hub, c] = await Promise.all([getHubBySlug(GUJARAT_HUB_SLUG), getPageContent(GUJARAT_HUB_PAGE)]);
  if (!hub) {
    return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
  }
  return buildMetadata({
    title: titleOf(hub) || c.meta.title,
    // The scaffolded hub docs carry an empty meta_description; an empty
    // description tag is worse than the hand-written fallback.
    description: s(hub, "meta_description") || c.meta.description,
    path: PATH,
    noindex: bool(hub, "noindex"),
    canonicalOverride: s(hub, "canonical_override") || undefined,
  });
}

// Rotating pool of state-wide imagery for variants that have no CMS photos yet.
const FALLBACK_CARD_IMAGES = [
  "/images/home/SomnathLongImage.webp",
  "/images/home/DwarikaLongImage.webp",
  "/images/gir/gir-hero.webp",
  "/images/junagadh-girnar/junagadh-girnar-hero.webp",
  "/images/home/StatueOfUnity.webp",
  "/images/festivals/festival-hero.webp",
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
  cards: GujaratHubContent["cards"],
): TourPackage {
  const duration = override?.duration || seed.duration;
  const days = Number(duration.match(/(\d+)/)?.[1] ?? 1);
  const rotated = [
    ...FALLBACK_CARD_IMAGES.slice(index % FALLBACK_CARD_IMAGES.length),
    ...FALLBACK_CARD_IMAGES.slice(0, index % FALLBACK_CARD_IMAGES.length),
  ];

  const groupType =
    seed.facet === "traveller"
      ? cards.groupTypeTraveller
      : seed.facet === "duration"
      ? cards.groupTypeDuration
      : cards.groupTypeDefault;

  const badge =
    seed.facet === "from-city"
      ? cards.badgeFromCity
      : seed.facet === "traveller"
      ? cards.badgeTraveller
      : seed.facet === "duration"
      ? cards.badgeDuration
      : index === 0
      ? cards.badgeFirst
      : cards.badgeDefault;

  return {
    id: seed.slug,
    slug: seed.slug,
    title: override?.h1 || seed.h1,
    location: seed.location || cards.defaultLocation,
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
 * The wording is `groups` in ./content.ts.
 */

export default async function GujaratPackagePillarPage() {
  const [hub, c, seeds] = await Promise.all([
    getHubBySlug(GUJARAT_HUB_SLUG),
    getPageContent(GUJARAT_HUB_PAGE),
    // The code variants with their CMS edits (dataset site_gujarat_packages).
    getDataset(GUJARAT_PACKAGES_DATASET),
  ]);
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
  const variants: TourPackage[] = seeds
    .filter((p) => isAuthorisedGujaratPackage(p.slug))
    .map((seed, i) => seedToTourPackage(seed, i, overrides.get(seed.slug), c.cards));

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
  const pillarFaq = dbFaq.length > 0 ? dbFaq : c.faqs;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Gujarat tour packages", path: PATH },
  ];

  const description = c.schema.description;

  const pageNode = webPageSchema({
    name: c.schema.name,
    description,
    path: PATH,
    type: "CollectionPage",
    crumbs,
    speakable: true,
  });

  const fallbackTrip = touristTripSchema({
    name: c.schema.name,
    description,
    path: PATH,
  });

  // An editor's pasted graph wins, minus the nodes this page already emits.
  const override = hub?.schema_overrides
    ? sanitizeSchemaOverride(hub.schema_overrides as string)
    : null;
  // Same cards, in the same group order, that PackageExplorer renders.
  const packageList = itemListSchema({
    name: c.schema.listName,
    path: PATH,
    key: "packages",
    items: [...byDuration, ...byCity, ...byType, ...byRoute].map((p) => ({
      name: p.title,
      path: p.href,
      image: p.images[0],
    })),
  });
  const schemaData = [pageNode, ...(override ?? [fallbackTrip]), packageList];

  return (
    <PageShell
      crumbs={crumbs}
      flushHero
    >
      <PackageHubHero
        headline={
          heroHeadline ? (
            highlightHeadline(heroHeadline)
          ) : (
            <>
              {c.headline.lead}{" "}
              <span className="pkg-headline-grad inline-block pr-[0.12em] pb-[0.1em] italic">{c.headline.highlight}</span>
            </>
          )
        }
        description={s(hub || {}, "answer_first") || rich(c.heroText, undefined, OrangeBold)}
        mobileImage={c.mobileImage}
        stats={[
          { value: `${variants.length}+`, label: c.stats.plansLabel },
          {
            value: priceValueStr
              ? `₹${Number(priceValueStr).toLocaleString("en-IN")}`
              : minPrice
              ? `₹${minPrice.toLocaleString("en-IN")}`
              : c.stats.priceFallback,
            label: c.stats.priceLabel,
          },
          { value: c.stats.daysValue, label: c.stats.daysLabel },
        ]}
        waMessage={c.whatsappMessage}
        browseHref="#by-route"
        browseLabel={c.browseLabel}
        whatsappLabel={c.whatsappLabel}
      />

      {/* ── PACKAGE GRIDS ── */}
      <div className="relative bg-white">
        <HangingDiyas />

        {/* Section intro */}
        <div className="relative z-20 mx-auto max-w-3xl px-4 pt-14 text-center sm:pt-16">
          <h2 className="font-playfair mt-20 text-4xl font-black leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            <span className="text-orange-500">{c.intro.headingHighlight}</span>
            <span className="mt-1 block text-[#111827]">{c.intro.headingRest}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            {c.intro.text}
          </p>
        </div>

        <PackageExplorer
          duration={byDuration}
          city={byCity}
          traveller={byType}
          route={byRoute}
          groupCopy={c.groups}
          banner={c.yatraBanner}
        />
      </div>

      {/* ── Long-form, admin-driven hub content. Renders only the blocks the
          CMS doc carries, so an unfilled hub adds nothing. ── */}
      {hub ? <HubContent hub={hub} /> : null}

      <CustomPackageCTA />

      <Faq items={pillarFaq} heading={c.faqHeading} subheading={c.faqSubheading} />

      <TourArchiveCTA copy={c.archiveCta} />

      <RelatedLinks links={related} />

      <JsonLd data={schemaData} />
    </PageShell>
  );
}
