import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  CalendarHeart,
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
import { buildRelatedLinks, type LinkContext } from "@/src/lib/links";
import { getPillarSpokesFor, getPlacesFor } from "@/src/lib/content";
import { faqOf, h1Of, list, s, type Doc } from "@/src/lib/cms";
import DestinationHero from "./destination/DestinationHero";
import DPSection from "./destination/DPSection";
import Reveal from "./destination/Reveal";
import { ICONS } from "./destination/icons";

/**
 * Shared destination-cluster pillar. Renders exactly the layout GirPillar used
 * to hardcode — hero, answer-first + on-page nav, "why", "how to reach", the
 * CMS-driven spoke cluster, places, distances, ways-to-visit, map, FAQ — but
 * driven by a config so every cluster pillar (Gir, Junagadh–Girnar, …) is
 * pixel-identical in style. Spokes and places are queried, never hardcoded.
 *
 * Honesty gates hold: no price, timing or date is stated here; distances render
 * behind DataTable's verify stamp.
 */

/** Secondary accent applied to the "what you come for" badge, the cluster
 *  banner and the spoke cards. Full class strings so Tailwind keeps them. */
const ACCENT_THEMES = {
  emerald: {
    badge: "border-emerald-200 text-emerald-800",
    badgeDot: "bg-emerald-600 shadow-[0_0_8px_#15803d]",
    comeForChip: "from-emerald-700 to-emerald-500",
    bannerBox: "border-emerald-100 from-emerald-50/50",
    bannerChip: "from-emerald-700 to-emerald-500",
    spokeIcon: "from-emerald-700 to-emerald-500",
    spokeHover: "hover:border-emerald-300 hover:shadow-[0_22px_50px_rgba(21,128,61,0.10)]",
    spokeCta: "text-emerald-700",
    numberWatermark: "text-emerald-700/[0.06]",
    glyph: "text-emerald-700/[0.04]",
  },
  amber: {
    badge: "border-amber-300 text-amber-800",
    badgeDot: "bg-amber-600 shadow-[0_0_8px_#b45309]",
    comeForChip: "from-amber-700 to-orange-500",
    bannerBox: "border-amber-200 from-amber-50/50",
    bannerChip: "from-amber-700 to-orange-500",
    spokeIcon: "from-amber-700 to-orange-500",
    spokeHover: "hover:border-amber-300 hover:shadow-[0_22px_50px_rgba(180,83,9,0.10)]",
    spokeCta: "text-amber-800",
    numberWatermark: "text-amber-700/[0.06]",
    glyph: "text-amber-700/[0.05]",
  },
} as const;

export type ClusterConfig = {
  /** Pillar slug — drives the CMS query and all child links. */
  slug: string;
  /** meta key in DESTINATION_META. Defaults to slug. */
  metaKey?: string;
  /** Short hero title ending in "Travel Guide" (the hero re-styles that word). */
  heroTitle: string;
  /** DestinationHero `destination` prop and breadcrumb label. */
  label: string;
  /** TouristAttraction schema name. */
  placeName: string;
  accent: keyof typeof ACCENT_THEMES;
  spokeIcons: Record<string, LucideIcon>;
  spokeFallbackIcon: LucideIcon;
  spokeOrder: string[];
  journeys: { href: string; title: string; blurb: string; primary?: boolean }[];
  overnight?: { href: string; label: string };
  toc: { id: string; label: string }[];
  copy: {
    significanceTitle: string;
    comeForLabel: string;
    reachTitle: string;
    clusterEyebrow: string;
    clusterTitle: string;
    clusterBanner: string;
    clusterBannerIcon: LucideIcon;
    placesEyebrow: string;
    placesTitle: string;
    distancesBanner: string;
    journeysTitle: string;
    mapTitle: string;
    faqHeading: string;
    ctaContext: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
  /** ACROSS/INTO links for the related-links block. */
  related: Omit<LinkContext, "self">;
};

export default async function ClusterPillar({ doc, config }: { doc: Doc; config: ClusterConfig }) {
  const meta = findDestinationMeta(config.metaKey ?? config.slug);
  if (!meta) return null;

  const t = ACCENT_THEMES[config.accent];
  const path = `/${config.slug}/`;

  const [spokes, places] = await Promise.all([
    getPillarSpokesFor(config.slug),
    getPlacesFor(config.slug),
  ]);

  const h1 = h1Of(doc);
  const answerFirst = s(doc, "answer_first");
  const distances = list<{ from: string; to: string; distance?: string; duration?: string }>(
    doc,
    "key_distances",
  );

  const ordered = [...spokes].sort(
    (a, b) => config.spokeOrder.indexOf(String(a.slug)) - config.spokeOrder.indexOf(String(b.slug)),
  );

  const crumbs = [
    { name: "Home", path: "/" },
    { name: config.label, path },
  ];

  const related = buildRelatedLinks({ self: path, ...config.related });
  const PlaceIcon = ICONS[meta.placeIcon];
  const BannerIcon = config.copy.clusterBannerIcon;

  return (
    <PageShell crumbs={crumbs} flushHero lightCrumb>
      <DestinationHero meta={meta} destination={config.label} h1={config.heroTitle} answerFirst={answerFirst} />

      {/* ── Answer-first intro + on-page nav ── */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-28 lg:px-10 xl:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-white via-orange-50/30 to-orange-100/10 p-6 shadow-[0_16px_40px_rgba(234,88,12,0.06)] backdrop-blur-md transition-all hover:border-orange-300/80 sm:p-7.5">
            <span
              className={`pointer-events-none absolute -right-5 -top-6 hidden select-none font-serif text-[120px] leading-none sm:block ${t.glyph}`}
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
                {config.toc.map((it) => (
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

      {/* ── Why ── */}
      {s(doc, "significance") ? (
        <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-orange-50/15 via-white to-amber-50/10 py-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <DPSection id="significance" eyebrow="Why it matters" title={config.copy.significanceTitle}>
            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              <Reveal>
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-white via-orange-50/20 to-orange-100/10 p-6 transition-shadow hover:shadow-md sm:p-8">
                  <p className="text-[15px] font-medium leading-relaxed text-[#4a3223] sm:text-[15.5px]">
                    {s(doc, "significance")}
                  </p>
                  <div className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-bold shadow-xs ${t.badge}`}>
                    <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${t.badgeDot}`} />
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
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md ${t.comeForChip}`}>
                      <Star size={20} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-650">{config.copy.comeForLabel}</p>
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
        <DPSection id="reach" eyebrow="Getting there" title={config.copy.reachTitle}>
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

      {/* ── Spoke cluster (CMS-driven) ── */}
      {ordered.length ? (
        <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-[#F2F7FB]/40 via-white to-orange-50/15 py-4">
          <DPSection id="cluster" eyebrow={config.copy.clusterEyebrow} title={config.copy.clusterTitle}>
            <Reveal>
              <div className={`mb-6 flex flex-wrap items-center gap-3.5 rounded-2xl border bg-gradient-to-br to-white px-5 py-4.5 shadow-inner ${t.bannerBox}`}>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md ${t.bannerChip}`}>
                  <BannerIcon size={18} />
                </span>
                <p className="text-xs font-bold leading-relaxed text-[#4a3223] sm:text-[14px]">
                  {config.copy.clusterBanner}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ordered.map((spoke, i) => {
                const Icon = config.spokeIcons[String(spoke.slug)] ?? config.spokeFallbackIcon;
                return (
                  <Reveal key={String(spoke.slug)} delay={(i % 3) * 0.08}>
                    <Link
                      href={`${path}${spoke.slug}/`}
                      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 ${t.spokeHover}`}
                    >
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-108 ${t.spokeIcon}`}>
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-5 text-base font-black leading-snug text-[#2D1B10]">{h1Of(spoke)}</h3>
                      {s(spoke, "meta_description") ? (
                        <p className="mt-2 flex-1 text-xs font-semibold leading-relaxed text-[#6b4c38] sm:text-[13px]">
                          {s(spoke, "meta_description")}
                        </p>
                      ) : null}
                      <span className={`mt-5 inline-flex items-center gap-1.5 border-t border-orange-50/40 pt-3 text-[11.5px] font-extrabold uppercase tracking-wider ${t.spokeCta}`}>
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

      {/* ── Places ── */}
      {places.length ? (
        <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-orange-50/15 via-white to-[#FAF6EE] py-4">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <DPSection id="places" eyebrow={config.copy.placesEyebrow} title={config.copy.placesTitle}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((p, i) => (
                <Reveal key={String(p.slug)} delay={(i % 3) * 0.08}>
                  <Link
                    href={`${path}places/${p.slug}/`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100/80 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-355 hover:shadow-[0_24px_55px_rgba(234,88,12,0.12)]"
                  >
                    <span className={`pointer-events-none absolute -right-2.5 -top-4 select-none font-mono text-7xl font-black leading-none transition-transform duration-500 group-hover:-translate-x-2 group-hover:scale-108 ${t.numberWatermark}`}>
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
                  {config.copy.distancesBanner}
                </p>
              </div>

              <div className="rounded-2xl border border-orange-100/60 bg-white/70 p-4 shadow-[0_12px_36px_rgba(234,88,12,0.03)] backdrop-blur-md sm:p-6">
                <DataTable
                  columns={["From", "To", "Distance", "Time"]}
                  rows={distances.map((d) => [d.from, d.to, d.distance ?? "—", d.duration ?? "—"])}
                  verify={{ key: `${config.slug}-distances`, label: "Distances", value: "", verify: false }}
                />
              </div>
            </Reveal>
          </DPSection>
        </div>
      ) : null}

      {/* ── Ways to visit ── */}
      <div className="relative w-full border-b border-orange-100/20 bg-gradient-to-b from-[#F6FAFD] via-white to-orange-50/15 py-4">
        <DPSection id="journeys" eyebrow="Book it" title={config.copy.journeysTitle}>
          <div className="grid gap-6 sm:grid-cols-2">
            {config.journeys.map((j, i) => (
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

          {config.overnight ? (
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm font-semibold text-[#6b4c38]">
                Staying overnight?{" "}
                <Link href={config.overnight.href} className="font-bold text-orange-700 hover:underline">
                  {config.overnight.label} →
                </Link>
              </p>
            </Reveal>
          ) : null}
        </DPSection>
      </div>

      {/* ── Map ── */}
      {s(doc, "map_query") ? (
        <div className="relative w-full bg-gradient-to-b from-orange-50/15 via-white to-[#FFFDFC] py-4">
          <DPSection id="map" eyebrow="Find it" title={config.copy.mapTitle}>
            <Reveal className="overflow-hidden rounded-3xl border border-orange-100/60 [&_div]:my-0 [&_div]:rounded-3xl [&_div]:shadow-[0_18px_50px_rgba(234,88,12,0.10)]">
              <MapEmbed query={s(doc, "map_query")} title={config.copy.mapTitle} />
            </Reveal>
          </DPSection>
        </div>
      ) : null}

      {faqOf(doc).length ? <Faq items={faqOf(doc)} heading={config.copy.faqHeading} /> : null}

      <CtaBand
        context={config.copy.ctaContext}
        title={config.copy.ctaTitle}
        subtitle={config.copy.ctaSubtitle}
      />
      <RelatedLinks links={related} />

      {/* PageShell already emits the BreadcrumbList for these crumbs. */}
      <JsonLd data={webPageSchema({ name: h1, description: answerFirst || h1, path })} />
      <JsonLd data={placeSchema({ name: config.placeName, description: answerFirst || h1, path })} />
    </PageShell>
  );
}
