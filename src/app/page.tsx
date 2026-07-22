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
import Footer from "@/src/utils/Footer";
import HomeFaqSection from "@/src/components/Home/HomeFaqSection";
import { buildMetadata, faqSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import { HOME_FAQS } from "@/src/config/homeFaqs";
import { getPublishedPackages } from "@/src/lib/content";
import { mapAdminPackagesToTourCards, toCarouselCards } from "@/src/utils/TourData";

import CredentialsBar from "@/src/components/Home/v6/CredentialsBar";
import ChooseYourJourney from "@/src/components/Home/v6/ChooseYourJourney";
import JourneyBanner from "@/src/components/Home/v6/JourneyBanner";
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
      <Navbar />
      <main id="main-content">
        <HomeHero />
        <CredentialsBar />

        {/* Unified Journey, Interest & Persona Section with a beautiful orange gradient merging with top & bottom */}
        <div className="relative bg-gradient-to-b from-white via-orange-50/45 to-white pt-2 pb-10 md:pt-10 overflow-hidden">
          {/* Ambient background glowing circles */}
          <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none" />

          <ChooseYourJourney />
          <ExploreByInterest />
          <PersonaRouting />
        </div>


        <JourneyBanner />

        <ProductsShowcase packages={packages} />

        <HomeTrustBuildingSection />

        <PopularTourPackages packages={packages} />

        <PlanEssentials />

        <TravelCTA />


        <BeyondTemples />
        <DwarkaTourPackage packages={dwarkaCards} />
        <BookDarshanCTA />
        <SomnathTourPackage packages={somnathCards} />

        <DwarkaSomnathTrustSection />


        <TestimonialsSection />

        <HomeFaqSection />
        <FinalCTA />

        <FestivalsTeaser />
        <DataAndResearch />

      </main>
      <Footer />
      <JsonLd data={faqSchema(HOME_FAQS)} />
    </>
  );
}
