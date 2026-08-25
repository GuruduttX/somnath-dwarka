import type { Metadata } from "next";
import HomeHero from "@/src/components/Home/HomeHero";
import ProductsShowcase from "@/src/components/Home/ProductsShowcase";
import TravelCTA from "@/src/components/Home/TravelCTA";
import HomeTrustBuildingSection from "@/src/utils/HomeTrustBuildingSection";
import Navbar from "@/src/utils/Navbar";
import PopularTourPackages from "@/src/utils/PopularTourPackages";
import DwarkaTourPackage from "@/src/components/Home/DwarkaTourPackage";
import BookDarshanCTA from "@/src/components/Home/BookDarshanCTA";
import SomnathTourPackage from "@/src/components/Home/SomnathTourPackage";
import DwarkaSomnathTrustSection from "@/src/components/Home/WhyChooseUs";
import TestimonialsSection from "@/src/components/Home/TestimonialCard";
import FinalCTA from "@/src/components/Home/FinalCTA";
import BeyondTemples from "@/src/components/Home/BeyondTemples";
import HomeFaqSection from "@/src/components/Home/HomeFaqSection";
import { buildMetadata, faqSchema, webPageSchema } from "@/src/lib/seo";
import { BRAND } from "@/src/config/site";
import JsonLd from "@/src/components/seo/JsonLd";
import { HOME_FAQS } from "@/src/config/homeFaqs";
import { getPublishedPackages } from "@/src/lib/content";
import { mapAdminPackagesToTourCards, toCarouselCards } from "@/src/utils/TourData";

import CredentialsBar from "@/src/components/Home/v6/CredentialsBar";
import ChooseYourJourney, {
  DestinationPackages,
} from "@/src/components/Home/v6/ChooseYourJourney";
// import JourneyBanner from "@/src/components/Home/v6/JourneyBanner";
import {
  ExploreByInterest,
  PlanEssentials,
} from "@/src/components/Home/v6/sections";
import {
  DataAndResearch,
  FestivalsTeaser,
  PersonaRouting,
} from "@/src/components/Home/v6/cmsSections";

/**
 * Home page ordered to the v6 home-page map (§1–§16).
 *
 * Gated sections render nothing until their flag is confirmed in
 * config/site.ts: credentials (§2), the offer ribbon (§7) and the experience
 * video (§9). §3 and §5 read the CMS, so a hub or persona tile appears the
 * moment its page exists and never before — no link here can 404.
 *
 * The header language switcher is deliberately out of scope for this pass.
 */
export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Tour Package | Itinerary, Cab & Hotel",
  description:
    "Plan your Somnath–Dwarka pilgrimage: tour packages with itineraries, private cabs and hotel help. Temple-sequenced trips, transparent pricing, real support.",
  path: "/",
});

export default async function Home() {
  // Packages come from the CMS only — deliberately no static fallback here, so
  // an empty collection renders empty package sections rather than demo data.
  const adminPackages = await getPublishedPackages();
  const packages = mapAdminPackagesToTourCards(adminPackages);
  const dwarkaCards = toCarouselCards(adminPackages, "Dwarka");
  const somnathCards = toCarouselCards(adminPackages, "Somnath");

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
      <main id="main-content">
        <HomeHero />
        <CredentialsBar />

        {/* Unified Journey, Interest & Persona Section with a beautiful orange gradient merging with top & bottom */}
        <div className="relative bg-gradient-to-b from-white via-orange-50/45 to-white pt-2 pb-2 md:pt-10 md:pb-10 overflow-hidden">
          {/* Ambient background glowing circles */}
          <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none" />

          <ChooseYourJourney />
          <div className="cv-section"><ExploreByInterest /></div>
          <div className="cv-section"><DestinationPackages /></div>
          <div className="cv-section"><PersonaRouting /></div>
        </div>


        {/* Temporarily hidden — restore by un-commenting. */}
        {/* <JourneyBanner /> */}

        {/* Below-the-fold sections opt into content-visibility so the browser
            skips their style/layout/paint until they scroll near — see
            .cv-section in globals.css. This is what keeps the ~9k-element page
            from blocking the hero's LCP paint behind a full-page layout. */}
        <div className="cv-section"><ProductsShowcase packages={packages} /></div>

        <div className="cv-section"><HomeTrustBuildingSection /></div>

        <div className="cv-section"><PopularTourPackages packages={packages} /></div>

        <div className="cv-section"><PlanEssentials /></div>

        <div className="cv-section"><TravelCTA /></div>


        <div className="cv-section"><BeyondTemples /></div>
        <div className="cv-section"><DwarkaTourPackage packages={dwarkaCards} /></div>
        <div className="cv-section"><BookDarshanCTA /></div>
        <div className="cv-section"><SomnathTourPackage packages={somnathCards} /></div>

        <div className="cv-section"><DwarkaSomnathTrustSection /></div>


        <div className="cv-section"><TestimonialsSection /></div>

        <div className="cv-section"><HomeFaqSection /></div>
        <div className="cv-section"><FinalCTA /></div>

        <div className="cv-section"><FestivalsTeaser /></div>
        <div className="cv-section"><DataAndResearch /></div>

      </main>
      {/* The home page carried no WebPage node, so nothing tied its FAQ and
          the sitewide Organization/WebSite nodes to an actual page entity. */}
      <JsonLd
        data={[
          webPageSchema({
            name: `${BRAND.name} — Itinerary, Cab & Hotel`,
            description: BRAND.tagline,
            path: "/",
            speakable: true,
            primaryImage: BRAND.ogImage,
          }),
          faqSchema(HOME_FAQS),
        ]}
      />
    </>
  );
}
