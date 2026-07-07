import type { Metadata } from "next"
import AboutHero from "@/src/components/About/AboutHero"
import Navbar from "@/src/utils/Navbar"
import Footer from "@/src/utils/Footer"
import AboutWhoWeAre from "@/src/components/About/AboutWhoWeAre"
import AboutDifferent from "@/src/components/About/AboutDifferent"
import { buildMetadata, webPageSchema, breadcrumbSchema } from "@/src/lib/seo"
import JsonLd from "@/src/components/seo/JsonLd"

const PATH = "/about/"

export const metadata: Metadata = buildMetadata({
  title: "About Us — Somnath Dwarka Tour Package",
  description:
    "Who we are and how we help pilgrims plan the Somnath–Dwarka circuit with tailored itineraries, private cabs and hotel assistance.",
  path: PATH,
})

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
]

export default function page(){
    return (
        <>
         <Navbar/>
         <AboutHero/>
         <AboutWhoWeAre/>
         <AboutDifferent/>
         <Footer/>
         <JsonLd
           data={[
             webPageSchema({
               type: "AboutPage",
               name: "About Somnath Dwarka Tour Package",
               description:
                 "Who we are and how we help pilgrims plan the Somnath–Dwarka circuit.",
               path: PATH,
               crumbs: CRUMBS,
             }),
             breadcrumbSchema(CRUMBS),
           ]}
         />
        </>
    )
}