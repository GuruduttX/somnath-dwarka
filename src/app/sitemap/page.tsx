import type { Metadata } from "next";
import Link from "next/link";
import { STATIC_ROUTES } from "@/src/config/routes";
import { getPublishedPackages, getPublishedGuides, packagePath, guidePath } from "@/src/lib/content";
import { buildMetadata, webPageSchema, breadcrumbSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { HTML_SITEMAP_PAGE } from "./content";

/* Copy: ./content.ts (CMS page "html-sitemap"); the lists are generated. */
export const revalidate = 3600;

const PATH = "/sitemap/";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(HTML_SITEMAP_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Sitemap", path: PATH },
];

export default async function HtmlSitemap() {
  const [packages, guides, c] = await Promise.all([
    getPublishedPackages(),
    getPublishedGuides(),
    getPageContent(HTML_SITEMAP_PAGE),
  ]);

  // Section ids stay fixed (links may point at #tour-packages), whatever the headings say.
  const groups: { id: string; heading: string; items: { label: string; path: string }[] }[] = [
    {
      id: "main-pages",
      heading: c.groupHeadings.main,
      items: STATIC_ROUTES.map((r) => ({ label: r.label, path: r.path })),
    },
    {
      id: "tour-packages",
      heading: c.groupHeadings.packages,
      items: (packages as Array<Record<string, unknown>>).map((p) => ({
        label: String(p.title ?? p.slug),
        path: packagePath(String(p.slug)),
      })),
    },
    {
      id: "guides",
      heading: c.groupHeadings.guides,
      items: (guides as Array<Record<string, unknown>>).map((g) => ({
        label: String(g.title ?? g.slug),
        path: guidePath(String(g.slug)),
      })),
    },
  ];

  return (
    <main id="main-content">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{c.h1}</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {groups.map((g) =>
            g.items.length ? (
              <section key={g.id} id={g.id} className="scroll-mt-24">
                <h2 className="text-lg font-semibold text-[#B85C10] mb-3">{g.heading}</h2>
                <ul className="space-y-1">
                  {g.items.map((it) => (
                    <li key={it.path}>
                      <Link href={it.path} className="text-gray-700 hover:text-[#E87722]">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null
          )}
        </div>
      </div>
      <JsonLd
        data={[
          webPageSchema({
            type: "CollectionPage",
            name: c.schema.name,
            description: c.schema.description,
            path: PATH,
            crumbs: CRUMBS,
          }),
          breadcrumbSchema(CRUMBS),
        ]}
      />
    </main>
  );
}
