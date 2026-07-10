import Link from "next/link";
import {
  ArrowRight,
  Binoculars,
  CalendarHeart,
  Clock,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import { placeSchema, webPageSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import FactTag from "@/src/components/shared/FactTag";
import MapEmbed from "@/src/components/shared/MapEmbed";
import JsonLd from "@/src/components/seo/JsonLd";
import { findDestinationMeta } from "@/src/lib/seed/destinationMeta";
import { buildRelatedLinks } from "@/src/lib/links";
import { getPillarSpokesFor, getPlacesFor } from "@/src/lib/content";
import { faqOf, h1Of, list, s, type Doc } from "@/src/lib/cms";
import DestinationHero from "./destination/DestinationHero";
import DPSection from "./destination/DPSection";
import Reveal from "./destination/Reveal";
import { ICONS } from "./destination/icons";

/**
 * Bespoke pillar for /gir/, built on the same components as the Somnath and
 * Dwarka pillars (DestinationHero, DPSection, Reveal, FactTag, MapEmbed) so the
 * destination pages read as one family.
 *
 * The difference is the data source. Somnath and Dwarka come from seed files;
 * Gir comes from the CMS, and its safari guides and places are queried rather
 * than hardcoded — publish a new /gir/{topic}/ record and it appears here.
 *
 * Nothing quotes a permit fee, a safari rate or a gate timing: those live on
 * their own VERIFY-gated pages. Road distances render behind DataTable's verify
 * stamp because they are still unconfirmed.
 */

const PATH = "/gir/";

/**
 * The hero renders `<title minus " Travel Guide">` then re-adds "Travel Guide"
 * as the gradient word, the way Somnath's seed h1 ("Somnath Travel Guide") is
 * written. The CMS h1 is a long SERP string, so it gets its own short display
 * title here; the SERP string still drives <title> and the page description.
 */
const HERO_TITLE = "Sasan Gir Travel Guide";

const SPOKE_ICONS: Record<string, typeof Ticket> = {
  "gir-safari-booking": Ticket,
  "gir-safari-timings-price": Clock,
  "best-time-to-visit-gir": CalendarHeart,
  "devalia-safari-park": Binoculars,
  "how-to-reach-gir": Route,
};

/** Reading order for the safari cluster; anything new falls in after. */
const SPOKE_ORDER = [
  "gir-safari-booking",
  "gir-safari-timings-price",
  "best-time-to-visit-gir",
  "devalia-safari-park",
  "how-to-reach-gir",
];

/** The commercial pages Gir funnels into (destination-hubs v5 linking contract). */
const JOURNEYS = [
  {
    href: "/gir-tour-package/",
    title: "Gir tour package",
    blurb: "Safari-led trips built around the permit, not the hotel.",
    primary: true,
  },
  {
    href: "/somnath-dwarka-gir-tour-package/",
    title: "Somnath, Dwarka & Gir",
    blurb: "The pilgrimage circuit with a night at Sasan added.",
    primary: false,
  },
  {
    href: "/somnath-dwarka-tour-package/with-gir/",
    title: "Add Gir to your circuit",
    blurb: "Already planning Somnath–Dwarka? Bolt on a safari.",
    primary: false,
  },
  {
    href: "/wildlife-nature-tours/",
    title: "Wildlife & nature tours",
    blurb: "Gir, Velavadar, the Rann and the rest of wild Gujarat.",
    primary: false,
  },
];

const TOC = [
  { id: "significance", label: "Why Gir" },
  { id: "reach", label: "How to reach" },
  { id: "safari", label: "Plan your safari" },
  { id: "places", label: "Inside the forest" },
  { id: "distances", label: "Key distances" },
  { id: "journeys", label: "Ways to visit" },
  { id: "map", label: "Map" },
];

export default async function GirPillar({ doc }: { doc: Doc }) {
  const meta = findDestinationMeta("gir");
  if (!meta) return null;

  const [spokes, places] = await Promise.all([getPillarSpokesFor("gir"), getPlacesFor("gir")]);

  const h1 = h1Of(doc);
  const answerFirst = s(doc, "answer_first");
  const distances = list<{ from: string; to: string; distance?: string; duration?: string }>(
    doc,
    "key_distances",
  );

  const ordered = [...spokes].sort(
    (a, b) => SPOKE_ORDER.indexOf(String(a.slug)) - SPOKE_ORDER.indexOf(String(b.slug)),
  );

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Gir", path: PATH },
  ];

  const related = buildRelatedLinks({
    self: PATH,
    pillar: { target: "/wildlife-nature-tours/", anchor: "wildlife tours across Gujarat" },
    money: "packages",
    siblings: [
      { target: "/somnath/", anchor: "Somnath travel guide", type: "sibling" as const },
      { target: "/junagadh-girnar/", anchor: "Junagadh & Girnar", type: "sibling" as const },
    ],
    extra: [{ target: "/gir-tour-package/", anchor: "Gir tour packages", type: "money" as const }],
  });

  const PlaceIcon = ICONS[meta.placeIcon];

  return (
    <PageShell crumbs={crumbs} flushHero lightCrumb>
      <DestinationHero meta={meta} destination="Gir" h1={HERO_TITLE} answerFirst={answerFirst} />

      {/* ── Answer-first intro + on-page nav ── */}
      <div className="mx-auto max-w-6xl px-4 pt-18 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-white via-orange-50/30 to-orange-100/10 p-6 shadow-[0_16px_40px_rgba(234,88,12,0.06)] backdrop-blur-md transition-all hover:border-orange-300/80 sm:p-7.5">
            <span
              className="pointer-events-none absolute -right-5 -top-6 hidden select-none font-serif text-[120px] leading-none text-emerald-700/[0.04] sm:block"
              aria-hidden="true"
            >
              {meta.glyph}
            </span>

            <div className="mb-3.5">
              <FactTag type="verified" />
            </div>

            <p className="relative text-[14.5px] font-medium leading-relaxed text-[#4a3223] sm:text-[15px]">
              {answerFirst}
            </p>

            <div className="my-5 border-t border-orange-100/50" />

            <nav aria-label="On this page" className="relative flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <span className="flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-orange-650">
                <Sparkles size={11} className="text-orange-500" />
                <span>On this page</span>
              </span>
              <span className="hidden text-orange-200 sm:inline">|</span>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-bold tracking-wide text-[#6b4c38]">
                {TOC.map((it) => (
                  <li key={it.id}>
                    <a href={`#${it.id}`} className="transition-colors hover:text-orange-650">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>
      </div>

      {/* ── Why Gir ── */}
      {s(doc, "significance") ? (
        <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-orange-50/15 via-white to-amber-50/10 py-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <DPSection id="significance" eyebrow="Why it matters" title="Why people come to Gir">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              <Reveal>
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-white via-orange-50/20 to-orange-100/10 p-6 transition-shadow hover:shadow-md sm:p-8">
                  <p className="text-[15px] font-medium leading-relaxed text-[#4a3223] sm:text-[15.5px]">
                    {s(doc, "significance")}
                  </p>
                  <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-800 shadow-xs">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-600 shadow-[0_0_8px_#15803d]" />
                    {meta.deity}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-orange-200 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF3E4] p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                      <CalendarHeart size={20} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-650">Best time to visit</p>
                      <p className="mt-0.5 text-sm font-extrabold leading-snug text-[#2a1a10]">{s(doc, "best_time")}</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-orange-200/50 to-transparent" />
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-white shadow-md">
                      <Star size={20} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-650">What you come for</p>
                      <p className="mt-0.5 text-base font-extrabold text-[#2a1a10]">{meta.deityShort}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </DPSection>
        </div>
      ) : null}

      {/* ── How to reach ── */}
      <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-amber-50/10 via-white to-[#F2F7FB]/40 py-4">
        <DPSection id="reach" eyebrow="Getting there" title="How to reach Sasan Gir">
          <div className="grid gap-6 sm:grid-cols-3">
            {meta.reach.map((r, i) => {
              const Icon = ICONS[r.icon];
              return (
                <Reveal key={r.mode} delay={i * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-350 hover:shadow-[0_22px_50px_rgba(234,88,12,0.12)]">
                    <span className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-orange-50/60 transition-transform duration-300 group-hover:scale-130" />
                    <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md transition-transform group-hover:scale-108">
                      <Icon size={22} />
                    </span>
                    <h3 className="relative mt-5 text-lg font-black text-[#2D1B10]">{r.mode}</h3>
                    <p className="relative mt-1.5 text-xs font-semibold leading-relaxed text-[#6b4c38] sm:text-[13px]">
                      {r.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {s(doc, "how_to_reach") ? (
            <Reveal delay={0.1}>
              <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-orange-100/80 bg-orange-50/40 p-4 shadow-inner sm:p-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <ShieldCheck size={15} />
                </span>
                <p className="text-xs font-medium leading-relaxed text-[#6b4c38] sm:text-[13px]">
                  {s(doc, "how_to_reach")}
                </p>
              </div>
            </Reveal>
          ) : null}
        </DPSection>
      </div>

      {/* ── Plan your safari (CMS-driven, mirrors the temple-timings block) ── */}
      {ordered.length ? (
        <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-[#F2F7FB]/40 via-white to-orange-50/15 py-4">
          <DPSection id="safari" eyebrow="Permits & gates" title="Plan your safari">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-3.5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white px-5 py-4.5 shadow-inner">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-white shadow-md">
                  <Ticket size={18} />
                </span>
                <p className="text-xs font-bold leading-relaxed text-[#4a3223] sm:text-[14px]">
                  Permits are limited and released in advance — book the permit first and the stay around it.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ordered.map((spoke, i) => {
                const Icon = SPOKE_ICONS[String(spoke.slug)] ?? Binoculars;
                return (
                  <Reveal key={String(spoke.slug)} delay={(i % 3) * 0.08}>
                    <Link
                      href={`/gir/${spoke.slug}/`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_22px_50px_rgba(21,128,61,0.10)]"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-white shadow-md transition-transform duration-300 group-hover:scale-108">
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-5 text-base font-black leading-snug text-[#2D1B10]">{h1Of(spoke)}</h3>
                      {s(spoke, "meta_description") ? (
                        <p className="mt-2 flex-1 text-xs font-semibold leading-relaxed text-[#6b4c38] sm:text-[13px]">
                          {s(spoke, "meta_description")}
                        </p>
                      ) : null}
                      <span className="mt-5 inline-flex items-center gap-1.5 border-t border-orange-50/40 pt-3 text-[11.5px] font-extrabold uppercase tracking-wider text-emerald-700">
                        Read the guide
                        <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </DPSection>
        </div>
      ) : null}

      {/* ── Inside the forest ── */}
      {places.length ? (
        <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-orange-50/15 via-white to-[#FAF6EE] py-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <DPSection id="places" eyebrow="Things to do" title="Inside the forest">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((p, i) => (
                <Reveal key={String(p.slug)} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/gir/places/${p.slug}/`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100/80 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-355 hover:shadow-[0_24px_55px_rgba(234,88,12,0.12)]"
                  >
                    <span className="pointer-events-none absolute -right-2.5 -top-4 select-none font-mono text-7xl font-black leading-none text-emerald-700/[0.06] transition-transform duration-500 group-hover:-translate-x-2 group-hover:scale-108">
                      0{i + 1}
                    </span>

                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md transition-all duration-305 group-hover:rotate-3 group-hover:scale-108">
                      <PlaceIcon size={20} />
                    </span>
                    <h3 className="mt-5 text-lg font-black text-[#2D1B10]">{s(p, "place") || h1Of(p)}</h3>
                    <p className="mt-2 flex-1 text-xs font-semibold leading-relaxed text-[#6b4c38] sm:text-[13px]">
                      {s(p, "meta_description")}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 border-t border-orange-50/30 pt-2 text-xs font-bold text-orange-600 group-hover:text-orange-700">
                      <MapPinned size={13} className="text-orange-500" />
                      <span>Explore Route Guide</span>
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </DPSection>
        </div>
      ) : null}

      {/* ── Key distances ── */}
      {distances.length ? (
        <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-[#FAF6EE] via-white to-[#F6FAFD] py-4">
          <DPSection id="distances" eyebrow="Plan the drive" title="Key distances">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-3.5 rounded-2xl border border-orange-100/80 bg-gradient-to-br from-orange-50/40 to-amber-50/30 px-5 py-4.5 shadow-inner">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                  <Route size={18} />
                </span>
                <p className="text-xs font-bold leading-relaxed text-[#4a3223] sm:text-[14px]">
                  Sasan Gir sits an easy drive from Somnath — most travellers add a night here to the pilgrimage circuit.
                </p>
              </div>

              <div className="rounded-2xl border border-orange-100/60 bg-white/70 p-4 shadow-[0_12px_36px_rgba(234,88,12,0.03)] backdrop-blur-md sm:p-6">
                <DataTable
                  columns={["From", "To", "Distance", "Time"]}
                  rows={distances.map((d) => [d.from, d.to, d.distance ?? "—", d.duration ?? "—"])}
                  verify={{ key: "gir-distances", label: "Distances", value: "", verify: false }}
                />
              </div>
            </Reveal>
          </DPSection>
        </div>
      ) : null}

      {/* ── Ways to visit ── */}
      <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-[#F6FAFD] via-white to-orange-50/15 py-4">
        <DPSection id="journeys" eyebrow="Book it" title="Ways to visit Gir">
          <div className="grid gap-6 sm:grid-cols-2">
            {JOURNEYS.map((j, i) => (
              <Reveal key={j.href} delay={(i % 2) * 0.08}>
                <Link
                  href={j.href}
                  className={`group flex h-full items-center justify-between gap-4 rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(234,88,12,0.12)] ${
                    j.primary
                      ? "border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50/40 hover:border-orange-400"
                      : "border-orange-100 bg-white hover:border-orange-300"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-lg font-black text-[#2D1B10] group-hover:text-orange-700">
                      {j.title}
                    </span>
                    <span className="mt-1.5 block text-xs font-semibold leading-relaxed text-[#6b4c38] sm:text-[13px]">
                      {j.blurb}
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 text-sm font-semibold text-[#6b4c38]">
              Staying overnight?{" "}
              <Link href="/hotels/sasan-gir-hotels/" className="font-bold text-orange-700 hover:underline">
                Sasan Gir hotels &amp; resorts →
              </Link>
            </p>
          </Reveal>
        </DPSection>
      </div>

      {/* ── Map ── */}
      {s(doc, "map_query") ? (
        <div className="relative w-full bg-gradient-to-b from-orange-50/15 via-white to-[#FFFDFC] py-4">
          <DPSection id="map" eyebrow="Find it" title="Gir on the map">
            <Reveal className="overflow-hidden rounded-3xl border border-orange-100/60 [&_div]:my-0 [&_div]:rounded-3xl [&_div]:shadow-[0_18px_50px_rgba(234,88,12,0.10)]">
              <MapEmbed query={s(doc, "map_query")} title="Map of Sasan Gir" />
            </Reveal>
          </DPSection>
        </div>
      ) : null}

      {faqOf(doc).length ? <Faq items={faqOf(doc)} heading="Gir FAQs" /> : null}

      <CtaBand
        context="Gir safari trip"
        title="Book the permit first"
        subtitle="Tell us your dates and we will tell you honestly whether a permit is still realistic."
      />
      <RelatedLinks links={related} />

      {/* PageShell already emits the BreadcrumbList for these crumbs. */}
      <JsonLd data={webPageSchema({ name: h1, description: answerFirst || h1, path: PATH })} />
      <JsonLd
        data={placeSchema({
          name: "Gir National Park & Sasan Gir",
          description: answerFirst || h1,
          path: PATH,
        })}
      />
    </PageShell>
  );
}
