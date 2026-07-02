import type { Metadata } from "next"
import AboutHero from "@/src/components/About/AboutHero"
import Navbar from "@/src/utils/Navbar"
import Footer from "@/src/utils/Footer"
import AboutWhoWeAre from "@/src/components/About/AboutWhoWeAre"
import AboutDifferent from "@/src/components/About/AboutDifferent"
import { buildMetadata } from "@/src/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "About Us — Somnath Dwarka Tour Package",
  description:
    "Who we are and how we help pilgrims plan the Somnath–Dwarka circuit with tailored itineraries, private cabs and hotel assistance.",
  path: "/about/",
})

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