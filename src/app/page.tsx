import type { Metadata } from "next";
import HomeHero from "@/src/components/Home/HomeHero";
import ProductsShowcase from "@/src/components/Home/ProductsShowcase";
import Navbar from "@/src/utils/Navbar";
import DwarkaTourPackage from "@/src/components/Home/DwarkaTourPackage";
import SomnathTourPackage from "@/src/components/Home/SomnathTourPackage";
import BeyondTemples from "@/src/components/Home/BeyondTemples";
import HomeFaqSection from "@/src/components/Home/HomeFaqSection";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  itemListSchema,
  touristTripSchema,
  videoObjectSchema,
  webPageSchema,
} from "@/src/lib/seo";
import { BRAND, EXPERIENCE_VIDEO } from "@/src/config/site";
import JsonLd from "@/src/components/seo/JsonLd";
import { HOME_FAQS } from "@/src/config/homeFaqs";
import { TESTIMONIAL_REVIEWS } from "@/src/config/testimonials";
import {
  HOME_HERO,
  HOME_ITINERARY,
  HOME_ROUTE_STOPS,
  HOME_TIERS,
} from "@/src/config/homePage";
import { getPublishedPackages } from "@/src/lib/content";
import {
  mapAdminPackagesToTourCards,
  toCarouselCards,
  type CarouselCard,
  type TourCardData,
} from "@/src/utils/TourData";

import CredentialsBar from "@/src/components/Home/v6/CredentialsBar";
import ChooseYourJourney, {
  DestinationPackages,
} from "@/src/components/Home/v6/ChooseYourJourney";
import {
  ExploreByInterest,
  PlanEssentials,
} from "@/src/components/Home/v6/sections";
import {
  DataAndResearch,
  FestivalsTeaser,
  PersonaRouting,
} from "@/src/components/Home/v6/cmsSections";
import {
  AtAGlance,
  BestTime,
  CommonConcerns,
  DayWiseItinerary,
  EnquireSection,
  HomeReviews,
  HowToReach,
  Inclusions,
  InlineWhatsAppCta,
  NamedHotels,
  PriceJustification,
  PricingTiers,
  TrustStrip,
  WhyDifferent,
} from "@/src/components/Home/sop/SopSections";
import ExperienceVideo from "@/src/components/Home/sop/ExperienceVideo";
import PackageSlider from "@/src/components/Home/sop/PackageSlider";

/**
 * Home page, built to the "Somnath Dwarka Tour Package, Planned by a Local
 * Guide" SOP. The SOP's sections run first, in its scroll order (§1–§16); the
 * site's discovery sections (package explorer, hubs, interests, festivals)
 * follow the FAQ so every hub stays one click from home without interrupting
 * the price → itinerary → enquiry read.
 *
 * Removed from this page because they stated unverified numbers ("4,800+
 * pilgrims", "4.9★", "12+ years", "10,000+") or placeholder testimonials, both
 * of which the SOP forbids: HomeTrustBuildingSection, WhyChooseUs,
 * TestimonialCard, TravelCTA, BookDarshanCTA, FinalCTA. PopularTourPackages was
 * a second copy of the package explorer. The components still exist.
 */
export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Tour Package, Planned by a Local Guide",
  description:
    "Somnath Dwarka tour package by a local Dwarka guide. Named 4 and 5 star hotels, private AC car, darshan help and honest pricing from Rs 8,999.",
  path: "/",
});

/**
 * Refresh hourly, like the pillar. Without this the home page was built once
 * and frozen: a deploy whose build could not reach MongoDB kept an empty
 * package list until the next deploy.
 */
export const revalidate = 3600;

/**
 * Cards per destination rail. Both rails used to render every published
 * package (~33 each, near-identical lists): ~3,800 hydrated DOM nodes and
 * ~430 KB of HTML, over half the page — the main cause of the slow lab LCP.
 */
const RAIL_SIZE = 8;

/**
 * Picks a rail's cards: packages that name only this destination lead, then
 * the rest in stored order, skipping any card another rail already shows so
 * the Somnath and Dwarka rails never repeat each other.
 */
function pickRail(
  cards: CarouselCard[],
  focus: string,
  other: string,
  exclude: ReadonlySet<string> = new Set()
): CarouselCard[] {
  const solo = (c: CarouselCard) => {
    const t = c.title.toLowerCase();
    return t.includes(focus) && !t.includes(other) ? 0 : 1;
  };
  return cards
    .filter((c) => !exclude.has(c.id))
    .sort((a, b) => solo(a) - solo(b))
    .slice(0, RAIL_SIZE);
}

/** The next 12 travel months, e.g. "October 2026", for the enquiry form. */
function upcomingMonths(count = 12): string[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) =>
    new Date(now.getFullYear(), now.getMonth() + i, 1).toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    })
  );
}

export default async function Home() {
  // Packages come from the CMS only — deliberately no static fallback here, so
  // an empty collection renders empty package sections rather than demo data.
  const adminPackages = await getPublishedPackages();
  const packages = mapAdminPackagesToTourCards(adminPackages);
  const somnathCards = pickRail(toCarouselCards(adminPackages, "Somnath"), "somnath", "dwarka");
  const dwarkaCards = pickRail(
    toCarouselCards(adminPackages, "Dwarka"),
    "dwarka",
    "somnath",
    new Set(somnathCards.map((c) => c.id))
  );
  // Only the fields TourCard and the showcase filters read; the full records
  // (overview, slug, duration…) were serialised into the page for nothing.
  const showcasePackages: TourCardData[] = packages.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    groupType: p.groupType,
    days: p.days,
    price: p.price,
    inclusions: p.inclusions,
    images: p.images,
    href: p.href,
    badge: p.badge,
    rating: p.rating,
    reviews: p.reviews,
  }));
  const months = upcomingMonths();

  return (
    <>
      {/* No manual <link rel="preload"> for the hero: React emits one in <head>
          from the fetchPriority="high" <img srcSet> in HomeHero. A second,
          hand-written preload landed after the scripts and made Lighthouse
          model the LCP request as late (load delay 50 ms → 690 ms). */}
      <Navbar />
      <main id="main-content" className="home-sections">
        {/* §1 Hero · §2 Trust strip */}
        <HomeHero />
        <TrustStrip />
        <CredentialsBar />

        {/* Discovery, right under the trust strip: ways to travel, interests,
            destinations and traveller types — every hub one click from home. */}
        <div className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/45 to-white">
          {/* Soft glows drawn as radial gradients, not blur-[140px] filters: a
              140px blur on a 500px box is the costliest thing on the first
              frame for Lighthouse's software rasteriser and held the first
              paint back ~200 ms. */}
          <div className="pointer-events-none absolute -top-[100px] left-1/4 h-[780px] w-[780px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(254,215,170,0.2)_0%,rgba(254,215,170,0.08)_38%,transparent_64%)]" />
          <div className="pointer-events-none absolute -bottom-[100px] right-1/4 h-[780px] w-[780px] translate-x-1/2 bg-[radial-gradient(circle,rgba(253,230,138,0.25)_0%,rgba(253,230,138,0.1)_38%,transparent_64%)]" />
          <ChooseYourJourney />
          <div className="cv-section"><ExploreByInterest /></div>
          <div className="cv-section"><DestinationPackages /></div>
          <div className="cv-section"><PersonaRouting /></div>
        </div>

        {/* Below-the-fold sections opt into content-visibility so the browser
            skips their style/layout/paint until they scroll near — see
            .cv-section in globals.css. */}
        <div className="cv-section"><AtAGlance /></div>

        {/* Other durations, starting cities and themes of the same route. */}
        <div className="cv-section"><ProductsShowcase packages={showcasePackages} /></div>

        <div className="cv-section"><WhyDifferent /></div>
        <div className="cv-section"><PriceJustification /></div>
        <div className="cv-section"><SomnathTourPackage packages={somnathCards} /></div>
        <div className="cv-section"><PricingTiers /></div>
        <div className="cv-section"><InlineWhatsAppCta label="home_after_price" /></div>
        <div className="cv-section"><DwarkaTourPackage packages={dwarkaCards} /></div>
        <div className="cv-section"><DayWiseItinerary /></div>
        <div className="cv-section"><NamedHotels /></div>
        <div className="cv-section"><Inclusions /></div>
        <div className="cv-section"><InlineWhatsAppCta label="home_after_inclusions" /></div>
        <div className="cv-section"><BeyondTemples /></div>

        <div className="cv-section"><HowToReach /></div>
        <div className="cv-section"><BestTime /></div>
        <div className="cv-section"><CommonConcerns /></div>

        {/* Random mix of published packages, shuffled client-side after mount. */}
        <div className="cv-section">
          <PackageSlider
            packages={packages.slice(0, 24).map((p) => ({
              id: p.id,
              title: p.title,
              location: p.location,
              duration: p.duration,
              price: p.price,
              image: p.images[0] ?? "",
              href: p.href,
              badge: p.badge,
            }))}
          />
        </div>

        {/* §14 Enquiry form — anchored in the page, never a popup. */}
        <EnquireSection months={months} />

        {/* Guest reviews — the same list feeds the Review schema below. */}
        <div className="cv-section"><HomeReviews /></div>

        {/* Experience video (gated) */}
        <ExperienceVideo />

        <div className="cv-section"><PlanEssentials /></div>
        <div className="cv-section"><FestivalsTeaser /></div>
        <div className="cv-section"><DataAndResearch /></div>

        {/* §16 FAQ — last section on the page. */}
        <div className="cv-section"><HomeFaqSection /></div>
      </main>

      {/* One connected graph: WebPage → breadcrumb, the package (Product +
          TouristTrip, priced per tier, rated from the guest reviews shown in
          <HomeReviews>) → FAQ, plus the package carousel and, when real data
          exists, the video. Organization/WebSite/TravelAgency come from the
          layout. Home has no PageShell, so its BreadcrumbList is emitted here. */}
      <JsonLd
        data={[
          webPageSchema({
            name: "Somnath Dwarka Tour Package, Planned by a Local Guide",
            description: HOME_HERO.lead,
            path: "/",
            speakable: true,
            primaryImage: BRAND.ogImage,
            mainEntityId: "/#trip",
            crumbs: [{ name: "Home", path: "/" }],
          }),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          touristTripSchema({
            id: "/#trip",
            name: "Somnath Dwarka Tour Package (2 Nights 3 Days)",
            description: `${HOME_HERO.lead} ${HOME_HERO.priceLine} ${HOME_HERO.priceTail}`,
            path: "/",
            tiers: HOME_TIERS.map((t) => ({ name: t.name, price: t.price, description: t.hotels })),
            images: [BRAND.ogImage, "/images/home/DwarikaLongImage.webp", "/images/home/SomnathLongImage.webp"],
            itinerary: HOME_ROUTE_STOPS,
            duration: `P${HOME_ITINERARY.length}D`,
            touristType: ["Pilgrims", "Families", "Senior citizens"],
            sku: "SDTP-2N3D",
            reviews: TESTIMONIAL_REVIEWS.slice(0, 9),
          }),
          faqSchema(HOME_FAQS),
          itemListSchema({
            name: "Somnath Dwarka tour packages",
            path: "/",
            key: "packages",
            items: packages.map((p) => ({ name: p.title, path: p.href, image: p.images[0] })),
          }),
          EXPERIENCE_VIDEO
            ? videoObjectSchema({
                name: EXPERIENCE_VIDEO.title,
                description: EXPERIENCE_VIDEO.description,
                uploadDate: EXPERIENCE_VIDEO.uploadDate,
                youtubeId: EXPERIENCE_VIDEO.youtubeId,
                duration: EXPERIENCE_VIDEO.duration,
                transcript: EXPERIENCE_VIDEO.transcript,
                path: "/",
              })
            : null,
        ]}
      />
    </>
  );
}
