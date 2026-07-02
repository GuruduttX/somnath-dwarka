import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import { getPublishedGuides, guidePath } from "@/src/lib/content";

const PATH = "/guides/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Travel Guides & Tips",
  description:
    "In-depth guides for planning a Somnath–Dwarka pilgrimage: itineraries, temple tips, travel advice and local know-how from our team.",
  path: PATH,
});

export default async function GuidesHubPage() {
  const guides = (await getPublishedGuides()) as Array<Record<string, unknown>>;

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Somnath Dwarka guides</h1>
        <AnswerFirst>
          Practical, first-hand guides to help you plan the Somnath–Dwarka circuit — from
          itineraries and temple timings to travel tips and what to expect on the ground.
        </AnswerFirst>
      </div>

      <Section id="all" title="All guides">
        {guides.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <li key={String(g.slug)}>
                <Link href={guidePath(String(g.slug))} className="block rounded-xl overflow-hidden border border-orange-100 bg-white hover:shadow-sm transition">
                  {g.image ? (
                    <div className="relative aspect-video">
                      <Image src={String(g.image)} alt={String(g.alt || g.title)} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                    </div>
                  ) : null}
                  <div className="p-4">
                    <span className="block font-semibold text-gray-800">{String(g.title)}</span>
                    <span className="block text-sm text-gray-500 mt-1 line-clamp-2">{String(g.subContent || "")}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Guides are being published. Check back soon.</p>
        )}
      </Section>

      <CtaBand context="Somnath Dwarka trip planning" />
    </PageShell>
  );
}
