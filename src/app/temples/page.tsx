import type { Metadata } from "next";
import Navbar from "@/src/utils/Navbar";
import TemplesPageClient from "./TemplesPageClient";
import { getPublishedTemples, getHubBySlug } from "@/src/lib/content";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/src/lib/seo";
import { SITE_URL } from "@/src/config/site";
import JsonLd from "@/src/components/seo/JsonLd";

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

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Temples", path: "/temples/" },
  ];

  const description =
    serializedHub?.answer_first ||
    "Pilgrimage guide to the famous temples of Gujarat — timings, darshan and travel details.";

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-[#FFFBF7]">
        <TemplesPageClient temples={serializedTemples} hub={serializedHub} />
      </main>
      {/*
        This page renders its own shell rather than PageShell, so it was the one
        hub shipping no BreadcrumbList and no page entity. Both are emitted here
        so the temple directory sits in the same graph as every other hub.
      */}
      <JsonLd
        data={[
          webPageSchema({
            name: serializedHub?.h1 || "Temples of Gujarat",
            description,
            path: "/temples/",
            type: "CollectionPage",
            crumbs,
          }),
          breadcrumbSchema(crumbs),
          ...(serializedTemples.length
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  "@id": `${SITE_URL}/temples/#list`,
                  name: "Temples of Gujarat",
                  numberOfItems: serializedTemples.length,
                  isPartOf: { "@id": `${SITE_URL}/temples/#webpage` },
                  itemListElement: serializedTemples.map((t, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    url: `${SITE_URL}/temples/${t.slug}/`,
                    name: t.temple || t.title,
                  })),
                },
              ]
            : []),
        ]}
      />
    </>
  );
}
