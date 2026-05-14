import ServiceHero from "@/src/components/Service/ServiceHero";
import ServicesCards from "@/src/components/Service/ServicesCards";
import Navbar from "@/src/utils/Navbar";
import Footer from "@/src/utils/Footer";

export default function page(){
    return (
        <>
        <Navbar/>
        <ServiceHero/>
        <ServicesCards/>
        <Footer/>
      </>
    )
}