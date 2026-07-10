import Link from "next/link";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";

/**
 * Type-specific blocks for CmsPage. Every block returns null when its data is
 * absent, so an unfilled scaffold degrades to just H1 + links rather than
 * rendering an empty table or a "TBD" price.
 */

type Variant = { label: string; slug: string; blurb?: string };

/** DOWN links from a hub to its variants (SOP §8 linking contract). */
export function HubVariants({ hub, variants }: { hub: string; variants?: Variant[] }) {
  if (!variants?.length) return null;
  return (
    <Section id="variants" title="Choose your variant" wide>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {variants.map((v) => (
          <li key={v.slug}>
            <Link
              href={`/${hub}/${v.slug}/`}
              className="block h-full rounded-xl border border-orange-100 bg-white p-4 transition hover:border-orange-300 hover:shadow-sm"
            >
              <span className="block font-semibold text-gray-900">{v.label}</span>
              {v.blurb ? (
                <span className="mt-1 block text-sm text-gray-600">{v.blurb}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function InclusionsExclusions({
  inclusions,
  exclusions,
}: {
  inclusions?: string[];
  exclusions?: string[];
}) {
  if (!inclusions?.length && !exclusions?.length) return null;
  return (
    <Section id="inclusions" title="What's included">
      <div className="grid gap-6 sm:grid-cols-2">
        {inclusions?.length ? (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Inclusions</h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {inclusions.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {exclusions?.length ? (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Exclusions</h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {exclusions.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

type TimingRow = { label: string; open?: string; close?: string };

/**
 * Timings publish only when an editor has ticked `timings_verified` AND supplied
 * an official source. The SOP forbids publishing unverified darshan timings.
 */
export function TempleTimings({
  rows,
  verified,
  sourceUrl,
}: {
  rows?: TimingRow[];
  verified?: boolean;
  sourceUrl?: string;
}) {
  if (!rows?.length || !verified || !sourceUrl) return null;
  return (
    <Section id="timings" title="Darshan & aarti timings">
      <DataTable
        columns={["Session", "Opens", "Closes"]}
        rows={rows.map((r) => [r.label, r.open ?? "—", r.close ?? "—"])}
      />
      <p className="mt-3 text-xs text-gray-500">
        Source:{" "}
        <a href={sourceUrl} className="underline" rel="nofollow noopener" target="_blank">
          official temple trust
        </a>
      </p>
    </Section>
  );
}

type DataRow = { label: string; value?: string; note?: string };

/** A data page renders its table only with methodology + last-updated present. */
export function DatasetTable({
  rows,
  methodology,
  lastUpdated,
  sourceNote,
}: {
  rows?: DataRow[];
  methodology?: string;
  lastUpdated?: string;
  sourceNote?: string;
}) {
  if (!rows?.length || !methodology || !lastUpdated) return null;
  return (
    <Section id="dataset" title="The data">
      <DataTable
        columns={["Metric", "Value", "Note"]}
        rows={rows.map((r) => [r.label, r.value ?? "—", r.note ?? ""])}
      />
      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <p>Methodology: {methodology}</p>
        <p>Last updated: {lastUpdated}</p>
        {sourceNote ? <p>Source: {sourceNote}</p> : null}
      </div>
    </Section>
  );
}

export function TrustSections({
  sections,
}: {
  sections?: { heading: string; body?: string }[];
}) {
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((s) => (
        <Section key={s.heading} title={s.heading}>
          {s.body ? <p className="text-[15px] leading-7 text-gray-700">{s.body}</p> : null}
        </Section>
      ))}
    </>
  );
}

export function ItineraryDays({
  days,
}: {
  days?: { day: number; title: string; description?: string }[];
}) {
  if (!days?.length) return null;
  return (
    <Section id="itinerary" title="Day-wise plan">
      <ol className="space-y-4">
        {days
          .slice()
          .sort((a, b) => a.day - b.day)
          .map((d) => (
            <li key={d.day} className="rounded-xl border border-orange-100 bg-white p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                Day {d.day}
              </span>
              <h3 className="mt-1 font-semibold text-gray-900">{d.title}</h3>
              {d.description ? (
                <p className="mt-1 text-sm leading-6 text-gray-700">{d.description}</p>
              ) : null}
            </li>
          ))}
      </ol>
    </Section>
  );
}

type KeyDistance = { from: string; to: string; distance?: string; duration?: string };

export function PillarFacts({
  bestTime,
  howToReach,
  distances,
}: {
  bestTime?: string;
  howToReach?: string;
  distances?: KeyDistance[];
}) {
  if (!bestTime && !howToReach && !distances?.length) return null;
  return (
    <Section id="essentials" title="Trip essentials">
      {bestTime ? (
        <p className="text-[15px] leading-7 text-gray-700">
          <strong className="font-semibold text-gray-900">Best time:</strong> {bestTime}
        </p>
      ) : null}
      {howToReach ? (
        <p className="mt-2 text-[15px] leading-7 text-gray-700">
          <strong className="font-semibold text-gray-900">How to reach:</strong> {howToReach}
        </p>
      ) : null}
      {distances?.length ? (
        <div className="mt-5">
          <DataTable
            columns={["From", "To", "Distance", "Duration"]}
            rows={distances.map((d) => [d.from, d.to, d.distance ?? "—", d.duration ?? "—"])}
          />
        </div>
      ) : null}
    </Section>
  );
}

export function TopPlaces({
  parent,
  places,
}: {
  parent: string;
  places?: { name: string; slug: string; blurb?: string }[];
}) {
  if (!places?.length) return null;
  return (
    <Section id="places" title="Places to see" wide>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/${parent}/places/${p.slug}/`}
              className="block h-full rounded-xl border border-orange-100 bg-white p-4 transition hover:border-orange-300"
            >
              <span className="block font-semibold text-gray-900">{p.name}</span>
              {p.blurb ? <span className="mt-1 block text-sm text-gray-600">{p.blurb}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
