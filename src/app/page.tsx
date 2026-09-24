import type { Metadata } from "next";
import HomeHero from "@/src/components/Home/HomeHero";
import ProductsShowcase from "@/src/components/Home/ProductsShowcase";
import Navbar from "@/src/utils/Navbar";
import DwarkaTourPackage from "@/src/components/Home/DwarkaTourPackage";
import SomnathTourPackage from "@/src/components/Home/SomnathTourPackage";
import BeyondTemples from "@/src/components/Home/BeyondTemples";
import HomeFaqSection from "@/src/components/Home/HomeFaqSection";
import {
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
import {
  HOME_HERO,
  HOME_ITINERARY,
  HOME_ROUTE_STOPS,
  HOME_TIERS,
} from "@/src/config/homePage";
import { getPublishedPackages } from "@/src/lib/content";
import { mapAdminPackagesToTourCards, toCarouselCards } from "@/src/utils/TourData";

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
  const dwarkaCards = toCarouselCards(adminPackages, "Dwarka");
  const somnathCards = toCarouselCards(adminPackages, "Somnath");
  const months = upcomingMonths();

  return (
    <>
      {/* Preload the mobile LCP hero image so it starts downloading with the
          document instead of ~4 s into load. media-scoped to phones and hoisted
          to <head> by React; the matching plain <img> lives in HomeHero. */}
      <link
        rel="preload"
        as="image"
        href="/images/CTA-mobile.webp"
        media="(max-width: 640px)"
        fetchPriority="high"
      />
      <Navbar />
      <main id="main-content" className="home-sections">
        {/* §1 Hero · §2 Trust strip */}
        <HomeHero />
        <TrustStrip />
        <CredentialsBar />

        {/* Discovery, right under the trust strip: ways to travel, interests,
            destinations and traveller types — every hub one click from home. */}
        <div className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/45 to-white">
          <div className="pointer-events-none absolute top-10 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-200/20 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-amber-200/25 blur-[140px]" />
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
        <div className="cv-section"><ProductsShowcase packages={packages} /></div>

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

        {/* Experience video (gated) */}
        <ExperienceVideo />

        <div className="cv-section"><PlanEssentials /></div>
        <div className="cv-section"><FestivalsTeaser /></div>
        <div className="cv-section"><DataAndResearch /></div>

        {/* §16 FAQ — last section on the page. */}
        <div className="cv-section"><HomeFaqSection /></div>
      </main>

      {/* One connected graph: WebPage → the package (Product + TouristTrip,
          priced per tier) → FAQ, plus the package carousel and, when real
          data exists, the video. Organization/WebSite come from the layout.
          No Review markup: the page shows no reviews. */}
      <JsonLd
        data={[
          webPageSchema({
            name: "Somnath Dwarka Tour Package, Planned by a Local Guide",
            description: HOME_HERO.lead,
            path: "/",
            speakable: true,
            primaryImage: BRAND.ogImage,
            mainEntityId: "/#trip",
          }),
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
