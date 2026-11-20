import type { Metadata } from "next"
import AboutHero from "@/src/components/About/AboutHero"
import Navbar from "@/src/utils/Navbar"
import AboutWhoWeAre from "@/src/components/About/AboutWhoWeAre"
import AboutDifferent from "@/src/components/About/AboutDifferent"
import { buildMetadata, webPageSchema, breadcrumbSchema } from "@/src/lib/seo"
import JsonLd from "@/src/components/seo/JsonLd"
import { getPageContent } from "@/src/lib/pages/getPageContent"
import { ABOUT_PAGE } from "./content"

const PATH = ABOUT_PAGE.path

/* Copy lives in ./content.ts and is editable through the CMS; a save refreshes this page at once. */
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(ABOUT_PAGE)
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH })
}

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
]

export default async function page(){
    const c = await getPageContent(ABOUT_PAGE)
    return (
        <>
         <Navbar/>
         <AboutHero/>
         <AboutWhoWeAre content={c.whoWeAre}/>
         <AboutDifferent content={c.different}/>
         <JsonLd
           data={[
             webPageSchema({
               type: "AboutPage",
               name: c.schema.name,
               description: c.schema.description,
               path: PATH,
               crumbs: CRUMBS,
             }),
             breadcrumbSchema(CRUMBS),
           ]}
         />
        </>
    )
}
