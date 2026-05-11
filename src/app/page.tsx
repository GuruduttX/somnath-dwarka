import HomeHero from "@/components/Home/HomeHero";
import ProductsShowcase from "@/components/Home/ProductsShowcase";
import TravelCTA from "@/components/Home/TravelCTA";
import HomeTrustBuildingSection from "@/utils/HomeTrustBuildingSection";
import Navbar from "@/utils/Navbar";
import PopularTourPackages from "@/utils/PopularTourPackages";
import Image from "next/image";
import DwarkaTourPackage from "@/components/Home/DwarkaTourPackage";
import BookDarshanCTA from "@/components/Home/BookDarshanCTA";
import SomnathTourPackage from "@/components/Home/SomnathTourPackage";
import DwarkaSomnathTrustSection from "@/components/Home/WhyChooseUs";
import Testimonials from "@/components/Admin/PackageEditor/Testimonials";
import TestimonialsSection from "@/components/Home/TestimonialCard";
import FinalCTA from "@/components/Home/FinalCTA";
import BeyondTemples from "@/components/Home/BeyondTemples";
import Footer from "@/utils/Footer";

export default function Home() {
  return (
    <>
       <Navbar/>
       <HomeHero/>
       <ProductsShowcase/>
       <TravelCTA/>
       <PopularTourPackages/>
       <HomeTrustBuildingSection/>
       <DwarkaTourPackage/>
       <BookDarshanCTA/>
       <SomnathTourPackage/>
       <DwarkaSomnathTrustSection/>
       <TestimonialsSection/>
       <BeyondTemples/>
       <FinalCTA/>
       <Footer/>
       
  
    </>
  );
}
