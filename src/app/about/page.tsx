import AboutHero from "@/src/components/About/AboutHero"
import Navbar from "@/src/utils/Navbar"
import Footer from "@/src/utils/Footer"
import AboutWhoWeAre from "@/src/components/About/AboutWhoWeAre"
import AboutDifferent from "@/src/components/About/AboutDifferent"

export default function page(){
    return (
        <>
         <Navbar/>
         <AboutHero/>
         <AboutWhoWeAre/>
         <AboutDifferent/>
         <Footer/>

        </>
    )
}