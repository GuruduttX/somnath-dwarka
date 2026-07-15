import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Compass, Map, Building2, Calendar } from "lucide-react";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import GuidesHero from "@/src/components/guides/GuidesHero";
import { GuidesGrid, type GuideItem } from "@/src/components/guides/GuidesGrid";
import { getPublishedGuides } from "@/src/lib/content";

const PATH = "/guides/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Travel Guides & Tips",
  description:
    "In-depth guides for planning a Somnath–Dwarka pilgrimage: itineraries, temple tips, travel advice and local know-how from our team.",
  path: PATH,
});

const FAQ = [
  {
    question: "What do your travel guides cover?",
    answer:
      "Day-wise itineraries, temple timings and darshan tips, routes and distances, the best time to visit, and practical local know-how for the Somnath–Dwarka pilgrimage circuit.",
  },
  {
    question: "Are the guides free to read?",
    answer:
      "Yes, every guide is free to read. When you're ready, you can request a matching tour package, cab or hotel quote from the same page.",
  },
  {
    question: "How current is the information?",
    answer:
      "We review and refresh the guides regularly and clearly flag any detail that is still pending confirmation, so faith or legend is never presented as verified fact.",
  },
  {
    question: "Can you turn a guide into a booked trip?",
    answer:
      "Yes. Tell us which itinerary suits you and we arrange stays, private transport and darshan planning across Somnath and Dwarka.",
  },
];

export default async function GuidesHubPage() {
  const raw = (await getPublishedGuides()) as Array<Record<string, unknown>>;
  const guides: GuideItem[] = raw.map((g) => ({
    slug: String(g.slug),
    title: String(g.title ?? "Untitled guide"),
    subContent: g.subContent ? String(g.subContent) : undefined,
    image: g.image ? String(g.image) : undefined,
    alt: g.alt ? String(g.alt) : undefined,
  }));

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: PATH }]} flushHero>
      <GuidesHero count={guides.length} />

      {/* ── All guides ── */}
      <div id="all-guides" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              All guides
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              Read up before you <span className="text-orange-500">go</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
              Practical, first-hand advice on temples, timings, routes and local tips for the
              Somnath–Dwarka circuit.
            </p>
          </div>

          <div className="mt-10 pb-4">
            <GuidesGrid guides={guides} />
          </div>
        </div>
      </div>

      <Faq items={FAQ} heading="Travel guide FAQs" subheading="How our Somnath–Dwarka guides work." />

      <CtaBand context="Somnath Dwarka trip planning" />

      {/* ── Related guides & services (Below CTA) ── */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="border-t border-orange-100/60 pt-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600 mb-4 flex items-center gap-1.5">
            <Sparkles size={11} className="text-orange-500" />
            <span>Related guides & services</span>
          </p>
          <ul className="grid gap-4 sm:grid-cols-4">
            {[
              { target: "/somnath/", anchor: "Somnath Travel Guide", type: "pillar" },
              { target: "/dwarka/", anchor: "Dwarka Travel Guide", type: "pillar" },
              { target: "/somnath-dwarka-taxi-service/", anchor: "Book Taxi Service", type: "sibling" },
              { target: "/somnath-dwarka-tour-package/", anchor: "Tour Packages", type: "money" },
            ].map((l) => {
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
        data={webPageSchema({
          type: "CollectionPage",
          name: "Somnath Dwarka Travel Guides",
          description:
            "Practical travel guides for planning a Somnath–Dwarka pilgrimage — itineraries, distances, timings and tips.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Guides", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}
