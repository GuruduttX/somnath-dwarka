import Link from "next/link";
import { ArrowUpRight, Clock, Star, Route, Sparkles, MapPinned, CalendarHeart, ArrowRight, ShieldCheck, Camera, Video } from "lucide-react";
import { buildMetadata, placeSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Toc from "@/src/components/shared/Toc";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import FactTag from "@/src/components/shared/FactTag";
import MapEmbed from "@/src/components/shared/MapEmbed";
import JsonLd from "@/src/components/seo/JsonLd";
import { findSeedDestination, SEED_TEMPLE_INFO } from "@/src/lib/seed/destinations";
import { findDestinationMeta } from "@/src/lib/seed/destinationMeta";
import { buildRelatedLinks } from "@/src/lib/links";
import { destinationPath, destinationPlacePath, destinationTopicPath } from "@/src/lib/destinationRoutes";
import DestinationHero from "./destination/DestinationHero";
import DPSection from "./destination/DPSection";
import Reveal from "./destination/Reveal";
import { ICONS } from "./destination/icons";

export function destinationMetadata(slug: string) {
  const d = findSeedDestination(slug);
  if (!d) return {};
  return buildMetadata({ title: d.title, description: d.answer_first, path: destinationPath(slug) });
}

export default function DestinationPillar({ slug }: { slug: string }) {
  const d = findSeedDestination(slug);
  const meta = findDestinationMeta(slug);
  if (!d || !meta) return null;

  const temples = SEED_TEMPLE_INFO.filter((t) => t.destination === slug);
  const other = slug === "somnath" ? "Dwarka" : "Somnath";
  const selfPath = destinationPath(slug);
  const otherPath = slug === "somnath" ? destinationPath("dwarka") : destinationPath("somnath");

  const related = buildRelatedLinks({
    self: selfPath,
    money: "packages",
    siblings: [
      { target: otherPath, anchor: slug === "somnath" ? "Dwarka travel guide" : "Somnath travel guide", type: "pillar" },
      { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "how many days you need", type: "sibling" },
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab", type: "money" },
    ],
  });

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: d.destination, path: selfPath }]} flushHero lightCrumb>
      <DestinationHero meta={meta} destination={d.destination} h1={d.h1} answerFirst={d.answer_first} />

      {/* Answer-first intro & TOC merged into one section (orange theme light) */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-28 lg:px-10 xl:px-12">
        <Reveal>
          <div 
            className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-white via-orange-50/30 to-orange-100/10 p-6 sm:p-7.5 shadow-[0_16px_40px_rgba(234,88,12,0.06)] backdrop-blur-md transition-all hover:border-orange-300/80"
          >
            {/* Ambient decorative watermark glyph */}
            <span 
              className="pointer-events-none absolute -right-5 -top-6 select-none font-serif text-[120px] leading-none text-orange-500/[0.03] animate-spin-slow hidden sm:block"
              style={{ animationDuration: '100s' }}
            >
              {meta.glyph}
            </span>
            
            <div className="mb-3.5"><FactTag type="verified" /></div>
            
            <p className="relative text-[14.5px] sm:text-[15px] leading-relaxed text-[#4a3223] font-medium">
              {d.answer_first}
            </p>

            {/* Subtle Divider Line */}
            <div className="my-5 border-t border-orange-100/50" />

            {/* In-page navigation jump links (sleek orange theme) */}
            <nav aria-label="On this page" className="relative flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <span className="font-extrabold uppercase tracking-wider text-orange-650 flex items-center gap-1.5">
                <Sparkles size={11} className="text-orange-500" />
                <span>On this page</span>
              </span>
              <span className="hidden sm:inline text-orange-200">|</span>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-bold text-[#6b4c38] tracking-wide">
                {[
                  { id: "significance", label: "Significance" },
                  { id: "reach", label: "How to reach" },
                  { id: "temple", label: "Temple timings" },
                  { id: "places", label: "Places to visit" },
                  { id: "distances", label: "Key distances" },
                  { id: "map", label: "Map" },
                ].map((it) => (
                  <li key={it.id}>
                    <a href={`#${it.id}`} className="hover:text-orange-650 transition-colors">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>
      </div>

      {/* ── Significance ── */}
      <div className="w-full bg-gradient-to-b from-orange-50/15 via-white to-amber-50/10 border-b border-orange-100/20 py-4 relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <DPSection id="significance" eyebrow="Why it matters" title="Spiritual significance">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <Reveal>
              <div
                className="relative h-full overflow-hidden rounded-3xl border border-orange-200 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow bg-gradient-to-br from-white via-orange-50/20 to-orange-100/10 [&_.fact-tag--faith]:bg-orange-50 [&_.fact-tag--faith]:text-orange-750 [&_.fact-tag--faith]:border-orange-200/60"
              >
                <div>
                  <div className="mb-4"><FactTag type="faith" /></div>
                  <p className="text-[15px] sm:text-[15.5px] leading-relaxed text-[#4a3223] font-medium">{d.significance}</p>
                </div>
                <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white border border-orange-200 px-4 py-2 text-xs font-bold text-orange-850 shadow-xs">
                  <span className="h-2.5 w-2.5 rounded-full animate-pulse bg-orange-500 shadow-[0_0_8px_#f97316]" />
                  {meta.deity}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-orange-200 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF3E4] p-6 shadow-sm sm:p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                    <CalendarHeart size={20} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-650">Best time to visit</p>
                    <p className="text-base font-extrabold text-[#2a1a10] mt-0.5">{d.best_time}</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-orange-200/50 to-transparent" />
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                    <Star size={20} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-650">Devotion Target</p>
                    <p className="text-base font-extrabold text-[#2a1a10] mt-0.5">{meta.deityShort}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </DPSection>
      </div>

      {/* ── How to reach ── */}
      <div className="w-full bg-gradient-to-b from-amber-50/10 via-white to-[#F2F7FB]/40 border-b border-orange-100/20 py-4 relative">
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <DPSection id="reach" eyebrow="Getting there" title="How to reach">
          <div className="grid gap-6 sm:grid-cols-3">
            {meta.reach.map((r, i) => {
              const Icon = ICONS[r.icon];
              return (
                <Reveal key={r.mode} delay={i * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-350 hover:shadow-[0_22px_50px_rgba(234,88,12,0.12)]">
                    <span className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-orange-50/60 transition-transform duration-300 group-hover:scale-130" />
                    <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md group-hover:scale-108 transition-transform">
                      <Icon size={22} />
                    </span>
                    <h3 className="relative mt-5 text-lg font-black text-[#2D1B10]">{r.mode}</h3>
                    <p className="relative mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#6b4c38] font-semibold">{r.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-6 rounded-2xl border border-orange-100/80 bg-orange-50/40 p-4 sm:p-5 flex items-start gap-3.5 shadow-inner">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <ShieldCheck size={15} />
              </span>
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#6b4c38] font-medium">
                {d.how_to_reach}
              </p>
            </div>
          </Reveal>
        </DPSection>
      </div>

      {/* ── Temple timings ── */}
      {temples.length ? (
        <div className="w-full bg-gradient-to-b from-[#F2F7FB]/40 via-white to-orange-50/15 border-b border-orange-100/20 py-4 relative">
          <DPSection id="temple" eyebrow="Darshan & aarti" title="Temple timings & darshan">
            {(() => {
              const mainTemple = temples.find((t) => t.topic === "timings") || temples[0];
              const subTemples = temples.filter((t) => t.slug !== mainTemple.slug);

              return (
                <div className="mt-6 space-y-6">

                  {/* Primary Timings Card (full width) */}
                  <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(234,88,12,0.06)] flex flex-col">
                      {/* Ambient Watermark Spire */}
                      <div className="absolute right-0 bottom-4 pointer-events-none opacity-[0.03] translate-x-4 translate-y-4">
                        <svg viewBox="0 0 200 220" className="w-44 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="100" cy="95" r="45" fill="url(#sunGlow-left)" opacity="0.18" />
                          <circle cx="100" cy="95" r="42" stroke="url(#templeOrange-left)" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.45" />
                          <path d="M100 18 L100 36 M100 18 L116 25 L100 32" stroke="url(#templeOrange-left)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M96 36 C96 33, 104 33, 104 36 C104 39, 96 39, 96 36 Z" fill="url(#templeOrange-left)" />
                          <path d="M98 40 C98 38, 102 38, 102 40" stroke="url(#templeOrange-left)" strokeWidth="1.5" />
                          <path d="M92 48 L100 40 L108 48 Z" stroke="url(#templeOrange-left)" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M86 60 L100 50 L114 60 Z" stroke="url(#templeOrange-left)" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M80 74 L100 62 L120 74 Z" stroke="url(#templeOrange-left)" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M74 90 L100 76 L126 90 Z" stroke="url(#templeOrange-left)" strokeWidth="1.8" strokeLinejoin="round" />
                          <path d="M68 110 L100 92 L132 110 Z" stroke="url(#templeOrange-left)" strokeWidth="1.8" strokeLinejoin="round" />
                          <rect x="62" y="110" width="76" height="38" rx="2" stroke="url(#templeOrange-left)" strokeWidth="1.8" />
                          <path d="M82 148 C82 132, 118 132, 118 148" stroke="url(#templeOrange-left)" strokeWidth="1.5" />
                          <path d="M38 148 C38 120, 62 120, 62 148" stroke="url(#templeOrange-left)" strokeWidth="1.5" />
                          <path d="M138 148 C138 120, 162 120, 162 148" stroke="url(#templeOrange-left)" strokeWidth="1.5" />
                          <rect x="25" y="148" width="150" height="8" rx="1.5" fill="url(#templeOrange-left)" opacity="0.8" />
                          <rect x="15" y="156" width="170" height="8" rx="1.5" fill="url(#templeOrange-left)" />
                          <rect x="5" y="164" width="190" height="6" rx="1" fill="url(#templeOrange-left)" opacity="0.6" />
                          <defs>
                            <radialGradient id="sunGlow-left" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#EA580C" />
                              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="templeOrange-left" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#F59E0B" />
                              <stop offset="50%" stopColor="#EA580C" />
                              <stop offset="100%" stopColor="#B85C10" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-orange-100/60">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-sm">
                            <Clock size={18} />
                          </span>
                          <div>
                            <span className="font-extrabold text-[#2a1a10] text-base sm:text-lg">{mainTemple.h1}</span>
                            <p className="text-[10px] text-orange-655 font-bold uppercase tracking-[0.08em] mt-0.5">Primary Daily Schedule</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[13.5px] leading-relaxed text-[#6b4c38] font-medium mb-5">
                          {mainTemple.answer_first}
                        </p>

                        {/* Timings Rows */}
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {mainTemple.timings.map((tm) => (
                            <div key={tm.label} className="flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold py-2.5 px-3.5 rounded-2xl bg-orange-50/20 border border-orange-100/30 hover:border-orange-200 transition-colors">
                              <span className="text-[#6b4c38]">{tm.label}</span>
                              <span className="rounded-lg bg-orange-50 border border-orange-150 px-2.5 py-0.5 font-extrabold text-orange-700">
                                {tm.open}
                                {tm.close && tm.close !== "—" ? ` – ${tm.close}` : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rules Callouts (Dress Code & Photography) */}
                      <div className="relative z-10 mt-6 pt-5 border-t border-orange-100/50">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {mainTemple.dress_code && (
                            <div className="rounded-2xl bg-stone-50/80 border border-stone-200/50 p-3 flex items-start gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100/60">
                                <ShieldCheck size={16} />
                              </span>
                              <div className="leading-tight">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Dress Code</p>
                                <p className="mt-1 text-[11px] leading-normal text-stone-600 font-medium">{mainTemple.dress_code}</p>
                              </div>
                            </div>
                          )}
                          {mainTemple.photography_rule && (
                            <div className="rounded-2xl bg-stone-50/80 border border-stone-200/50 p-3 flex items-start gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100/60">
                                <Camera size={16} />
                              </span>
                              <div className="leading-tight">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Photography</p>
                                <p className="mt-1 text-[11px] leading-normal text-stone-600 font-medium">{mainTemple.photography_rule}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Detailed page CTA */}
                        <div className="mt-5 flex justify-end">
                          <Link 
                            href={destinationTopicPath(slug, mainTemple.slug)}
                            className="group/btn inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-655 hover:text-orange-755 transition-colors"
                          >
                            <span>Detailed Darshan & Aarti Schedule</span>
                            <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Secondary Quick-Guides Cards */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {subTemples.map((sub, i) => {
                      const getIcon = (topic: string) => {
                        switch (topic) {
                          case "aarti":
                            return <CalendarHeart size={16} />;
                          case "darshan":
                            return <Star size={16} />;
                          case "live-darshan":
                            return <Video size={16} />;
                          default:
                            return <Clock size={16} />;
                        }
                      };

                      const getCtaLabel = (topic: string) => {
                        switch (topic) {
                          case "aarti": return "View Aarti Timings";
                          case "live-darshan": return "Watch Live Stream";
                          case "darshan":
                          case "vip-darshan": return "Read Darshan Guide";
                          case "history": return "Read History";
                          case "jyotirlinga":
                          case "char-dham": return "Read Guide";
                          case "dress-code": return "View Dress Code";
                          case "best-time": return "See Best Time";
                          case "how-to-reach": return "See Route Guide";
                          case "pooja-booking": return "Booking Details";
                          case "light-and-sound-show": return "Show Details";
                          case "dhwaja-ceremony": return "Read More";
                          default: return "Read Full Guide";
                        }
                      };

                      return (
                        <Reveal key={sub.slug} delay={(i + 1) * 0.08} className="h-full">
                          <div className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_4px_20px_rgba(234,88,12,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_16px_40px_rgba(234,88,12,0.08)] h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-3 mb-2.5">
                              <div className="flex items-center gap-2.5">
                                <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-50 text-orange-650 ring-1 ring-orange-100/60 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                                  {getIcon(sub.topic)}
                                </span>
                                <span className="font-extrabold text-[#2a1a10] text-sm sm:text-base">{sub.h1}</span>
                              </div>
                            </div>
                            
                            <p className="text-[12.5px] leading-relaxed text-[#6b4c38] font-medium line-clamp-2">
                              {sub.answer_first}
                            </p>
                            
                            <Link
                              href={destinationTopicPath(slug, sub.slug)}
                              className="mt-4 flex items-center justify-between border-t border-orange-50/50 pt-3"
                            >
                              <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-orange-655 transition-colors group-hover:text-[#E87722]">
                                {getCtaLabel(sub.topic)}
                              </span>
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                              </span>
                            </Link>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>

                </div>
              );
            })()}
          </DPSection>
        </div>
      ) : null}

      {/* ── Places to visit ── */}
      <div className="w-full bg-gradient-to-b from-orange-50/15 via-white to-[#FAF6EE] border-b border-orange-100/20 py-4 relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <DPSection id="places" eyebrow="Things to do" title="Places to visit">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.top_places.map((p, i) => {
              const Icon = ICONS[meta.placeIcon];
              return (
                <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                  <Link
                    href={destinationPlacePath(slug, p.slug)}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100/80 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-355 hover:shadow-[0_24px_55px_rgba(234,88,12,0.12)]"
                  >
                    {/* Outline number watermark */}
                    <span className="pointer-events-none absolute -right-2.5 -top-4 select-none text-7xl font-black leading-none text-orange-500/[0.06] transition-transform duration-500 group-hover:-translate-x-2 group-hover:scale-108 font-mono">
                      0{i + 1}
                    </span>
                    
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md transition-all duration-305 group-hover:scale-108 group-hover:rotate-3">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 text-lg font-black text-[#2D1B10]">{p.name}</h3>
                    <p className="mt-2 flex-1 text-xs sm:text-[13px] leading-relaxed text-[#6b4c38] font-semibold">{p.blurb}</p>
                    
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 group-hover:text-orange-700 pt-2 border-t border-orange-50/30">
                      <MapPinned size={13} className="text-orange-500" />
                      <span>Explore Route Guide</span>
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </DPSection>
      </div>

      {/* ── Key distances ── */}
      <div className="w-full bg-gradient-to-b from-[#FAF6EE] via-white to-[#F6FAFD] border-b border-orange-100/20 py-4 relative">
        <DPSection id="distances" eyebrow="Plan the drive" title="Key distances">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3.5 rounded-2xl border border-orange-100/80 bg-gradient-to-br from-orange-50/40 to-amber-50/30 px-5 py-4.5 shadow-inner">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                <Route size={18} />
              </span>
              <p className="text-xs sm:text-[14px] font-bold text-[#4a3223] leading-relaxed">
                {d.destination} sits on the Somnath–{other} pilgrimage circuit — most travellers pair both temples over 3–5 days.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-orange-100/60 shadow-[0_12px_36px_rgba(234,88,12,0.03)]">
              <DataTable
                columns={["From", "To", "Distance", "Time"]}
                rows={d.key_distances.map((k) => [k.from, k.to, k.distance, k.duration])}
                verify={{ key: "dist", label: "Distances", value: "", verify: false }}
              />
            </div>
          </Reveal>
        </DPSection>
      </div>

      {/* ── Map ── */}
      <div className="w-full bg-gradient-to-b from-[#F6FAFD] via-white to-[#FFFDFC] py-4 relative">
        <DPSection id="map" eyebrow="Find it" title={`${d.destination} on the map`}>
          <Reveal className="[&_div]:my-0 [&_div]:rounded-3xl overflow-hidden [&_div]:shadow-[0_18px_50px_rgba(234,88,12,0.10)] border border-orange-100/60 rounded-3xl">
            <MapEmbed query={d.map_query} title={`Map of ${d.destination}`} />
          </Reveal>
        </DPSection>
      </div>

      <Faq items={d.faq} heading={`${d.destination} FAQs`} />
      <CtaBand context={`${d.destination} trip`} />
      <RelatedLinks links={related} />

      <JsonLd
        data={placeSchema({
          name: d.destination,
          description: d.answer_first,
          path: selfPath,
        })}
      />
    </PageShell>
  );
}
