import HomeHero from "@/src/components/Home/HomeHero";
import ProductsShowcase from "@/src/components/Home/ProductsShowcase";
import TravelCTA from "@/src/components/Home/TravelCTA";
import HomeTrustBuildingSection from "@/src/utils/HomeTrustBuildingSection";
import Navbar from "@/src/utils/Navbar";
import PopularTourPackages from "@/src/utils/PopularTourPackages";
import Image from "next/image";
import DwarkaTourPackage from "@/src/components/Home/DwarkaTourPackage";
import BookDarshanCTA from "@/src/components/Home/BookDarshanCTA";
import SomnathTourPackage from "@/src/components/Home/SomnathTourPackage";
import DwarkaSomnathTrustSection from "@/src/components/Home/WhyChooseUs";
import Testimonials from "@/src/components/Admin/PackageEditor/Testimonials";
import TestimonialsSection from "@/src/components/Home/TestimonialCard";
import FinalCTA from "@/src/components/Home/FinalCTA";
import BeyondTemples from "@/src/components/Home/BeyondTemples";
import Footer from "@/src/utils/Footer";
import HomeFaqSection from "@/src/components/Home/HomeFaqSection";

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
       <HomeFaqSection/>
       <Footer/>
       
  
    </>
  );
}
