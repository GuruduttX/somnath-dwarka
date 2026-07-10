import type { Metadata } from "next";
import Navbar from "@/src/utils/Navbar";
import Footer from "@/src/utils/Footer";
import TemplesPageClient from "./TemplesPageClient";
import { getPublishedTemples, getHubBySlug } from "@/src/lib/content";
import { buildMetadata } from "@/src/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getHubBySlug("temples");
  
  // Safe fallbacks in case the CMS hub isn't fully configured
  const title = (hub?.title_tag as string) || "Temples of Gujarat — Timings, Darshan Guide & Tour Packages";
  const description = (hub?.meta_description as string) || "Pilgrimage guide to famous temples of Gujarat, including Dakor Ranchhodrai, Virpur Jalaram, Salangpur Hanuman, Chotila, Koteshwar, Akshardham. Verified timings & details.";

  return buildMetadata({
    title,
    description,
    path: "/temples/",
    noindex: false,
  });
}

export default async function TemplesPage() {
  const [temples, hub] = await Promise.all([
    getPublishedTemples(),
    getHubBySlug("temples"),
  ]);

  // Map Mongoose documents to plain objects for safe client boundary passing
  const serializedTemples = temples.map(t => ({
    _id: String(t._id),
    slug: String(t.slug),
    title: String(t.title),
    temple: String(t.temple),
    deity: String(t.deity || ""),
    town: String(t.town || ""),
    district: String(t.district || ""),
    significance: String(t.significance || ""),
    timings_verified: Boolean(t.timings_verified),
    distance_from_ahmedabad: String(t.distance_from_ahmedabad || ""),
    dress_code: String(t.dress_code || ""),
    status: String(t.status || "published"),
    timings_table: Array.isArray(t.timings_table) ? t.timings_table.map((row: any) => ({
      label: String(row.label || ""),
      open: String(row.open || ""),
      close: String(row.close || ""),
    })) : [],
  }));

  const serializedHub = hub ? {
    title: String(hub.title || ""),
    h1: String(hub.h1 || ""),
    answer_first: String(hub.answer_first || ""),
    body: String(hub.body || ""),
  } : null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-[#FFFBF7]">
        <TemplesPageClient temples={serializedTemples} hub={serializedHub} />
      </main>
      <Footer />
    </>
  );
}
