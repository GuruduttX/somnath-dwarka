import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
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
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10">
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
