import Image from "@/src/components/shared/Img";
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
import { buildRelatedLinks } from "@/src/lib/links";
import { destinationPath, destinationPlacePath, destinationTopicPath } from "@/src/lib/destinationRoutes";
import { getDataset, getDatasetItem } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import type { PageDef } from "@/src/lib/pages/types";
import { HEROES_DATASET, PILLARS_DATASET, TEMPLE_TOPICS_DATASET } from "@/src/lib/cms-groups/destinations";
import DestinationHero from "./destination/DestinationHero";
import DPSection from "./destination/DPSection";
import Reveal from "./destination/Reveal";
import { ICONS } from "./destination/icons";
import { heroMeta } from "./destination/data";
import { DWARKA_PILLAR_PAGE, SOMNATH_PILLAR_PAGE, type PillarCopy } from "./destination/content";
import { fillVars, toLinks } from "./copy";

/*
  /somnath/ and /dwarka/. Everything on the page is editable through the CMS:
  the facts are the site_destination_pillars item, the hero the
  site_destination_heroes item, the temple cards the site_temple_topics items,
  and the headings/labels the "somnath-pillar" / "dwarka-pillar" page copy.
*/

const PILLAR_PAGES: Record<string, PageDef<PillarCopy>> = {
  somnath: SOMNATH_PILLAR_PAGE,
  dwarka: DWARKA_PILLAR_PAGE,
};

export async function destinationMetadata(slug: string) {
  const d = await getDatasetItem(PILLARS_DATASET, slug);
  if (!d) return {};
  return buildMetadata({ title: d.title, description: d.answer_first, path: destinationPath(slug) });
}

export default async function DestinationPillar({ slug }: { slug: string }) {
  const def = PILLAR_PAGES[slug];
  if (!def) return null;
  const [d, hero, topics, c] = await Promise.all([
    getDatasetItem(PILLARS_DATASET, slug),
    getDatasetItem(HEROES_DATASET, slug),
    getDataset(TEMPLE_TOPICS_DATASET),
    getPageContent(def),
  ]);
  if (!d || !hero) return null;
  const meta = heroMeta(hero);

  const temples = topics.filter((t) => t.destination === slug);
  const selfPath = destinationPath(slug);
  const v = { destination: d.destination };
  const topicCta = (topic: string) => c.temple.topicCtas.find((x) => x.topic === topic)?.label || c.temple.defaultCta;

  const related = buildRelatedLinks({
    self: selfPath,
    money: "packages",
    siblings: toLinks(c.related),
  });

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: d.destination, path: selfPath }]} flushHero lightCrumb>
      <DestinationHero
        meta={meta}
        destination={d.destination}
        h1={d.h1}
        answerFirst={d.answer_first}
        labels={{
          titleSuffix: c.hero.titleSuffix,
          ctaLabel: fillVars(c.hero.ctaLabel, v),
          imageAlt: fillVars(c.hero.imageAlt, v),
          enquiryService: fillVars(c.hero.enquiryService, v),
        }}
      />

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
                <span>{c.tocHeading}</span>
              </span>
              <span className="hidden sm:inline text-orange-200">|</span>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-bold text-[#6b4c38] tracking-wide">
                {c.toc.map((it) => (
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
        <DPSection id="significance" eyebrow={c.significance.eyebrow} title={c.significance.title}>
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
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-650">{c.significance.bestTimeLabel}</p>
                    <p className="text-base font-extrabold text-[#2a1a10] mt-0.5">{d.best_time}</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-orange-200/50 to-transparent" />
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                    <Star size={20} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-650">{c.significance.deityLabel}</p>
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
        <DPSection id="reach" eyebrow={c.reach.eyebrow} title={c.reach.title}>
          <div className="grid gap-6 sm:grid-cols-3">
            {meta.reach.map((r, i) => {
              const Icon = ICONS[r.icon];
              const src = hero.reach[i]?.photo;
              const photo = src ? { src, alt: hero.reach[i].photo_alt } : null;
              return (
                <Reveal key={r.mode} delay={i * 0.08} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-350 hover:shadow-[0_22px_50px_rgba(234,88,12,0.12)]">
                    {/* Mode photo — the icon chip rides the bottom edge so the card
                        still reads at a glance when the image is slow to load. */}
                    {photo && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-orange-50">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#2D1B10]/45 via-transparent to-transparent" />
                      </div>
                    )}
                    <div className="relative p-6 pt-5">
                      <span className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md transition-transform group-hover:scale-108 ${photo ? "-mt-11 mb-1 ring-4 ring-white" : ""}`}>
                        <Icon size={22} />
                      </span>
                      <h3 className="relative mt-4 text-lg font-black text-[#2D1B10]">{r.mode}</h3>
                      <p className="relative mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#6b4c38] font-semibold">{r.detail}</p>
                    </div>
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
          <DPSection id="temple" eyebrow={c.temple.eyebrow} title={c.temple.title}>
            {(() => {
              const mainTemple = temples.find((t) => t.topic === "timings") || temples[0];
              const subTemples = temples.filter((t) => t.slug !== mainTemple.slug);
              const templePhoto = hero.templePhoto ? { src: hero.templePhoto, alt: hero.templePhotoAlt } : null;

              return (
                <div className="mt-6 space-y-6">

                  {/* Primary Timings Card (full width) */}
                  <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-[0_16px_40px_rgba(234,88,12,0.06)] lg:flex lg:items-stretch">
                    {/* Temple photo — a banner above the schedule on small screens,
                        a full-height panel beside it from lg up. */}
                    {templePhoto && (
                      <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-orange-50 sm:aspect-[24/7] lg:aspect-auto lg:w-[260px] xl:w-[300px]">
                        <Image
                          src={templePhoto.src}
                          alt={templePhoto.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 340px"
                          className="object-cover object-center"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#2D1B10]/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/25" />
                      </div>
                    )}
                    <div className="relative flex min-w-0 flex-1 flex-col p-5 sm:p-6">
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
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-orange-100/60">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-sm">
                            <Clock size={18} />
                          </span>
                          <div>
                            <span className="font-extrabold text-[#2a1a10] text-base sm:text-lg">{mainTemple.h1}</span>
                            <p className="text-[10px] text-orange-655 font-bold uppercase tracking-[0.08em] mt-0.5">{c.temple.mainKicker}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[13px] leading-relaxed text-[#6b4c38] font-medium mb-4">
                          {mainTemple.answer_first}
                        </p>

                        {/* Timings Rows */}
                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                          {mainTemple.timings.map((tm) => (
                            <div key={tm.label} className="flex items-center justify-between gap-3 text-xs sm:text-[13px] font-semibold py-2 px-3 rounded-xl bg-orange-50/20 border border-orange-100/30 hover:border-orange-200 transition-colors">
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
                      <div className="relative z-10 mt-5 pt-4 border-t border-orange-100/50">
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {mainTemple.dress_code && (
                            <div className="rounded-2xl bg-stone-50/80 border border-stone-200/50 p-3 flex items-start gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100/60">
                                <ShieldCheck size={16} />
                              </span>
                              <div className="leading-tight">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{c.temple.dressCodeLabel}</p>
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
                                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{c.temple.photographyLabel}</p>
                                <p className="mt-1 text-[11px] leading-normal text-stone-600 font-medium">{mainTemple.photography_rule}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Detailed page CTA */}
                        <div className="mt-4 flex justify-end">
                          <Link 
                            href={destinationTopicPath(slug, mainTemple.slug)}
                            className="group/btn inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-655 hover:text-orange-755 transition-colors"
                          >
                            <span>{c.temple.mainCta}</span>
                            <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                        </div>
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
                                {topicCta(sub.topic)}
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
        <DPSection id="places" eyebrow={c.places.eyebrow} title={c.places.title}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.top_places.map((p, i) => {
              const Icon = ICONS[meta.placeIcon];
              const photo = p.image ? { src: p.image, alt: p.image_alt || p.name } : null;
              return (
                <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={destinationPlacePath(slug, p.slug)}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100/80 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-355 hover:shadow-[0_24px_55px_rgba(234,88,12,0.12)]"
                  >
                    {/* Every card gets the same band so the grid stays even.
                        Places still awaiting a photo get a tinted panel carrying
                        the glyph rather than an empty white block. */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-orange-50">
                      {photo ? (
                        <>
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-[#2D1B10]/50 via-[#2D1B10]/5 to-transparent" />
                        </>
                      ) : (
                        <span
                          aria-hidden
                          className="absolute inset-0 grid place-items-center bg-gradient-to-br from-orange-100/70 via-amber-50 to-orange-50 text-6xl font-black text-orange-500/25 transition-transform duration-500 group-hover:scale-105"
                          style={{ fontFamily: "var(--font-mono, monospace)" }}
                        >
                          {meta.glyph}
                        </span>
                      )}
                      <span className={`pointer-events-none absolute right-3 top-2 select-none font-mono text-5xl font-black leading-none ${photo ? "text-white/25" : "text-orange-500/15"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col p-6 pt-5">
                      <span className="-mt-11 mb-1 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md ring-4 ring-white transition-all duration-305 group-hover:scale-108 group-hover:rotate-3">
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-4 text-lg font-black text-[#2D1B10]">{p.name}</h3>
                      <p className="mt-2 flex-1 text-xs sm:text-[13px] leading-relaxed text-[#6b4c38] font-semibold">{p.blurb}</p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 group-hover:text-orange-700 pt-2 border-t border-orange-50/30">
                        <MapPinned size={13} className="text-orange-500" />
                        <span>{c.places.cardCta}</span>
                        <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </DPSection>
      </div>

      {/* ── Key distances ── */}
      <div className="w-full bg-gradient-to-b from-[#FAF6EE] via-white to-[#F6FAFD] border-b border-orange-100/20 py-4 relative">
        <DPSection id="distances" eyebrow={c.distances.eyebrow} title={c.distances.title}>
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3.5 rounded-2xl border border-orange-100/80 bg-gradient-to-br from-orange-50/40 to-amber-50/30 px-5 py-4.5 shadow-inner">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                <Route size={18} />
              </span>
              <p className="text-xs sm:text-[14px] font-bold text-[#4a3223] leading-relaxed">
                {fillVars(c.distances.banner, v)}
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-orange-100/60 shadow-[0_12px_36px_rgba(234,88,12,0.03)]">
              <DataTable
                columns={c.distances.columns}
                rows={d.key_distances.map((k) => [k.from, k.to, k.distance, k.duration])}
                verify={{ key: "dist", label: c.distances.verifyLabel, value: "", verify: false }}
              />
            </div>
          </Reveal>
        </DPSection>
      </div>

      {/* ── Map ── */}
      <div className="w-full bg-gradient-to-b from-[#F6FAFD] via-white to-[#FFFDFC] py-4 relative">
        <DPSection id="map" eyebrow={c.map.eyebrow} title={fillVars(c.map.title, v)}>
          <Reveal className="[&_div]:my-0 [&_div]:rounded-3xl overflow-hidden [&_div]:shadow-[0_18px_50px_rgba(234,88,12,0.10)] border border-orange-100/60 rounded-3xl">
            <MapEmbed query={d.map_query} title={fillVars(c.map.embedTitle, v)} />
          </Reveal>
        </DPSection>
      </div>

      <Faq items={d.faq} heading={fillVars(c.faqHeading, v)} />
      <CtaBand context={fillVars(c.ctaContext, v)} />

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
