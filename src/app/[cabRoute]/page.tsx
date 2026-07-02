import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import VerifyStamp from "@/src/components/shared/VerifyStamp";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_CAB_ROUTES, findSeedCab } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";

/**
 * Root-level CabRoute page (SOP §3 — /{origin}-to-{dest}-taxi/). Static routes
 * take precedence at this level; only known `-taxi` slugs render, everything
 * else 404s. Data comes from the CMS/seed by slug.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ cabRoute: string }> };

export async function generateStaticParams() {
  return SEED_CAB_ROUTES.map((r) => ({ cabRoute: r.slug }));
}

function getRoute(slug: string) {
  if (!slug.endsWith("-taxi")) return null;
  const r = findSeedCab(slug);
  return r && r.kind === "route" ? r : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { cabRoute } = await params;
  const r = getRoute(cabRoute);
  if (!r) return {};
  return buildMetadata({ title: r.title, description: r.answer_first, path: `/${cabRoute}/` });
}

export default async function CabRoutePage({ params }: Params) {
  const { cabRoute } = await params;
  const r = getRoute(cabRoute);
  if (!r) notFound();

  const related = buildRelatedLinks({
    self: `/${cabRoute}/`,
    pillar: { target: "/somnath-dwarka-taxi-service/", anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: SEED_CAB_ROUTES.filter((x) => x.slug !== cabRoute).map((x) => ({
      target: `/${x.slug}/`,
      anchor: `${x.origin} to ${x.destination} taxi`,
      type: "sibling" as const,
    })),
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Taxi service", path: "/somnath-dwarka-taxi-service/" },
        { name: `${r.origin} to ${r.destination}`, path: `/${cabRoute}/` },
      ]}
    >
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{r.h1}</h1>
        <AnswerFirst>{r.answer_first}</AnswerFirst>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
          <span>Distance: <strong>{r.distance}</strong></span>
          <span>Time: <strong>{r.duration}</strong></span>
        </div>
        <div className="mt-1">
          <VerifyStamp fact={{ key: "dist", label: "Distance/time", value: "", verify: r.verified }} />
        </div>
      </div>

      <Section id="fares" title="Fare by vehicle">
        <DataTable
          columns={["Vehicle", "Seats", "One-way", "Round-trip"]}
          rows={r.fares.map((f) => [f.vehicle, String(f.seats), f.oneWay, f.roundTrip])}
          verify={{ key: "fare", label: "Fares", value: "", verify: false }}
        />
      </Section>

      {r.stops?.length ? (
        <Section id="stops" title="Stops en route">
          <ul className="flex flex-wrap gap-2">
            {r.stops.map((s) => (
              <li key={s} className="px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-sm text-gray-700">
                {s}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Faq items={r.faq} heading={`${r.origin} to ${r.destination} taxi FAQs`} />
      <CtaBand context={`${r.origin} to ${r.destination} taxi`} title="Book this route" subtitle="Get a firm one-way or round-trip fare." />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: r.h1,
          description: r.answer_first,
          path: `/${cabRoute}/`,
          areaServed: `${r.origin}, ${r.destination}`,
        })}
      />
    </PageShell>
  );
}
