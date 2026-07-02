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

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Tour Package | Itinerary, Cab & Hotel",
  description:
    "Plan your Somnath–Dwarka pilgrimage: tour packages with itineraries, private cabs and hotel help. Temple-sequenced trips, transparent pricing, real support.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HomeHero />
        <ProductsShowcase />
        <TravelCTA />
        <PopularTourPackages />
        <HomeTrustBuildingSection />
        <DwarkaTourPackage />
        <BookDarshanCTA />
        <SomnathTourPackage />
        <DwarkaSomnathTrustSection />
        <TestimonialsSection />
        <BeyondTemples />
        <FinalCTA />
        <HomeFaqSection />
      </main>
      <Footer />
      <JsonLd data={faqSchema(HOME_FAQS)} />
    </>
  );
}
