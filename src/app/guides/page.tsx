import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Compass, Map, Building2, Calendar } from "lucide-react";
import { buildMetadata, itemListSchema, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import GuidesHero from "@/src/components/guides/GuidesHero";
import { GuidesGrid, type GuideItem } from "@/src/components/guides/GuidesGrid";
import { getPublishedGuides } from "@/src/lib/content";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { rich } from "@/src/lib/pages/rich";
import { GUIDES_PAGE } from "./content";

const PATH = "/guides/";
/* Copy lives in ./content.ts and is editable through the CMS; the guides are the CMS blog items. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(GUIDES_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

export default async function GuidesHubPage() {
  const [rawGuides, c] = await Promise.all([getPublishedGuides(), getPageContent(GUIDES_PAGE)]);
  const raw = rawGuides as Array<Record<string, unknown>>;
  const guides: GuideItem[] = raw.map((g) => ({
    slug: String(g.slug),
    title: String(g.title ?? c.grid.untitled),
    subContent: g.subContent ? String(g.subContent) : undefined,
    image: g.image ? String(g.image) : undefined,
    alt: g.alt ? String(g.alt) : undefined,
  }));

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: PATH }]} flushHero>
      <GuidesHero count={guides.length} copy={c.hero} />

      {/* ── All guides ── */}
      <div id="all-guides" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              {c.list.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              {c.list.heading.before} <span className="text-orange-500">{c.list.heading.highlight}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
              {rich(c.list.intro)}
            </p>
          </div>

          <div className="mt-10 pb-4">
            <GuidesGrid guides={guides} copy={c.grid} />
          </div>
        </div>
      </div>

      <Faq items={c.faqs} heading={c.faqHeading} subheading={c.faqSubheading} />

      <CtaBand context={c.ctaContext} />

      {/* ── Related guides & services (Below CTA) ── */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="border-t border-orange-100/60 pt-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600 mb-4 flex items-center gap-1.5">
            <Sparkles size={11} className="text-orange-500" />
            <span>{c.relatedHeading}</span>
          </p>
          <ul className="grid gap-4 sm:grid-cols-4">
            {c.related.map((l) => {
              let Icon = Calendar;
              let label = "Read more";
              if (l.type === "pillar") {
                Icon = Compass;
                label = "Travel guide";
              } else if (l.type === "money") {
                Icon = Building2;
                label = "Book & compare";
              } else if (l.type === "sibling") {
                Icon = Map;
                label = "Plan your trip";
              }
              
              return (
                <li key={l.target + l.anchor}>
                  <Link
                    href={l.target}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-orange-100 bg-white p-4 shadow-[0_4px_20px_rgba(234,88,12,0.03)] transition-all duration-250 hover:-translate-y-0.5 hover:border-orange-250 hover:shadow-[0_12px_36px_rgba(234,88,12,0.08)]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-orange-400">
                        {label}
                      </span>
                      <span className="mt-1 block text-xs sm:text-sm font-extrabold text-[#2a1a10] capitalize line-clamp-2">
                        {l.anchor}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-600"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <JsonLd
        data={[
          webPageSchema({
            type: "CollectionPage",
            name: c.schema.name,
            description: c.schema.description,
            path: PATH,
            crumbs: [
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
            ],
          }),
          itemListSchema({
            name: c.schema.name,
            path: PATH,
            key: "guides",
            items: guides
              .filter((g) => g.slug && g.slug !== "undefined")
              .map((g) => ({ name: g.title, path: `/guides/${g.slug}/`, image: g.image })),
          }),
        ]}
      />
    </PageShell>
  );
}
