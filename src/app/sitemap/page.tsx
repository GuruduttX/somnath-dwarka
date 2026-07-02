import type { Metadata } from "next";
import Link from "next/link";
import { STATIC_ROUTES } from "@/src/config/routes";
import { getPublishedPackages, getPublishedGuides, packagePath, guidePath } from "@/src/lib/content";
import { buildMetadata } from "@/src/lib/seo";
import Breadcrumb from "@/src/components/shared/Breadcrumb";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Sitemap — all pages",
  description: "Browse every page on the Somnath Dwarka tour package site: packages, cabs, hotels, destinations, guides and more.",
  path: "/sitemap/",
});

export default async function HtmlSitemap() {
  const [packages, guides] = await Promise.all([
    getPublishedPackages(),
    getPublishedGuides(),
  ]);

  const groups: { heading: string; items: { label: string; path: string }[] }[] = [
    {
      heading: "Main pages",
      items: STATIC_ROUTES.map((r) => ({ label: r.label, path: r.path })),
    },
    {
      heading: "Tour packages",
      items: (packages as Array<Record<string, unknown>>).map((p) => ({
        label: String(p.title ?? p.slug),
        path: packagePath(String(p.slug)),
      })),
    },
    {
      heading: "Guides",
      items: (guides as Array<Record<string, unknown>>).map((g) => ({
        label: String(g.title ?? g.slug),
        path: guidePath(String(g.slug)),
      })),
    },
  ];

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[{ name: "Home", path: "/" }, { name: "Sitemap", path: "/sitemap/" }]} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sitemap</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {groups.map((g) =>
            g.items.length ? (
              <section key={g.heading}>
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
    </main>
  );
}
