import Link from "next/link";
import { ArrowUpRight, Clock, Star, Route, Sparkles, MapPinned, CalendarHeart } from "lucide-react";
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
import DestinationHero from "./destination/DestinationHero";
import Reveal from "./destination/Reveal";
import { ICONS } from "./destination/icons";

export function destinationMetadata(slug: string) {
  const d = findSeedDestination(slug);
  if (!d) return {};
  return buildMetadata({ title: d.title, description: d.answer_first, path: `/${slug}/` });
}

/** Section frame with an eyebrow + h2 so heading order stays h1 → h2 → h3. */
function DPSection({
  id,
  eyebrow,
  title,
  children,
  wide = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${wide ? "max-w-7xl" : "max-w-6xl"} mx-auto scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8`}
      aria-labelledby={`${id}-h`}
    >
      <Reveal className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
          <Sparkles size={12} />
          {eyebrow}
        </span>
        <h2 id={`${id}-h`} className="mt-3 flex items-center gap-3 text-2xl font-black tracking-tight text-[#2a1a10] sm:text-[1.9rem]">
          <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

export default function DestinationPillar({ slug }: { slug: string }) {
  const d = findSeedDestination(slug);
  const meta = findDestinationMeta(slug);
  if (!d || !meta) return null;

  const temples = SEED_TEMPLE_INFO.filter((t) => t.destination === slug);
  const other = slug === "somnath" ? "Dwarka" : "Somnath";

  const related = buildRelatedLinks({
    self: `/${slug}/`,
    money: "packages",
    siblings: [
      { target: slug === "somnath" ? "/dwarka/" : "/somnath/", anchor: slug === "somnath" ? "Dwarka travel guide" : "Somnath travel guide", type: "pillar" },
      { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "how many days you need", type: "sibling" },
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab", type: "money" },
    ],
  });

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: d.destination, path: `/${slug}/` }]} flushHero>
      <DestinationHero meta={meta} destination={d.destination} h1={d.h1} answerFirst={d.answer_first} />

      {/* Answer-first intro card */}
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_18px_50px_rgba(234,88,12,0.10)] sm:p-8">
            <span className="pointer-events-none absolute -right-6 -top-8 select-none font-serif text-[120px] leading-none text-orange-500/[0.05]">
              {meta.glyph}
            </span>
            <div className="mb-3"><FactTag type="verified" /></div>
            <p className="relative text-[15.5px] leading-[1.85] text-[#4a3527] sm:text-base">{d.answer_first}</p>
          </div>
        </Reveal>
      </div>

      <Toc
        items={[
          { id: "significance", label: "Significance" },
          { id: "reach", label: "How to reach" },
          { id: "temple", label: "Temple timings" },
          { id: "places", label: "Places to visit" },
          { id: "distances", label: "Key distances" },
          { id: "map", label: "Map" },
        ]}
      />

      {/* ── Significance ── */}
      <DPSection id="significance" eyebrow="Why it matters" title="Spiritual significance">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div
              className="relative h-full overflow-hidden rounded-3xl border p-6 sm:p-7"
              style={{ borderColor: `${meta.accent}22`, background: `linear-gradient(135deg,#FFF8F1 0%, ${meta.accent}0a 100%)` }}
            >
              <div className="mb-3"><FactTag type="faith" /></div>
              <p className="text-[15.5px] leading-[1.85] text-[#4a3527]">{d.significance}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-orange-700 shadow-sm">
                <span className="h-2 w-2 rounded-full" style={{ background: meta.accent }} />
                {meta.deity}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-4 rounded-3xl border border-amber-100 bg-[linear-gradient(160deg,#FFFDF9,#FFF3E4)] p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                  <CalendarHeart size={20} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-orange-500">Best time to visit</p>
                  <p className="text-[15px] font-bold text-[#2a1a10]">{d.best_time}</p>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-orange-200/60 to-transparent" />
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                  <Star size={20} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-orange-500">Devotion</p>
                  <p className="text-[15px] font-bold text-[#2a1a10]">{meta.deityShort}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </DPSection>

      {/* ── How to reach ── */}
      <DPSection id="reach" eyebrow="Getting there" title="How to reach">
        <div className="grid gap-5 sm:grid-cols-3">
          {meta.reach.map((r, i) => {
            const Icon = ICONS[r.icon];
            return (
              <Reveal key={r.mode} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)]">
                  <span className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-orange-50 transition-transform duration-300 group-hover:scale-125" />
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                    <Icon size={22} />
                  </span>
                  <p className="relative mt-4 text-lg font-black text-[#2a1a10]">{r.mode}</p>
                  <p className="relative mt-1 text-[13.5px] leading-relaxed text-[#6b4c38]">{r.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/50 px-5 py-4 text-[14px] leading-relaxed text-[#6b4c38]">
            {d.how_to_reach}
          </p>
        </Reveal>
      </DPSection>

      {/* ── Temple timings ── */}
      {temples.length ? (
        <DPSection id="temple" eyebrow="Darshan & aarti" title="Temple timings & darshan">
          <div className="grid gap-5 sm:grid-cols-2">
            {temples.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.08}>
                <Link
                  href={`/${slug}/${t.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)]"
                >
                  <div className="flex items-center justify-between bg-[linear-gradient(120deg,#FFF3E4,#FFE7CE)] px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                        <Clock size={20} />
                      </span>
                      <span className="font-black text-[#2a1a10]">{t.h1}</span>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 text-orange-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="p-6">
                    <ul className="flex flex-col gap-2">
                      {t.timings.slice(0, 4).map((tm) => (
                        <li key={tm.label} className="flex items-center justify-between gap-3 text-[13.5px]">
                          <span className="text-[#6b4c38]">{tm.label}</span>
                          <span className="rounded-lg bg-orange-50 px-2.5 py-1 font-bold text-orange-700">
                            {tm.open}
                            {tm.close && tm.close !== "—" ? ` – ${tm.close}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[12.5px] font-semibold text-orange-600">Timings, aarti &amp; darshan details →</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </DPSection>
      ) : null}

      {/* ── Places to visit ── */}
      <DPSection id="places" eyebrow="Things to do" title="Places to visit" wide>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.top_places.map((p, i) => {
            const Icon = ICONS[meta.placeIcon];
            return (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/${slug}/places/${p.slug}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-[0_24px_55px_rgba(234,88,12,0.15)]"
                >
                  <span className="pointer-events-none absolute -right-3 -top-4 select-none text-[64px] font-black leading-none text-orange-500/[0.07]">
                    {i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={22} />
                  </span>
                  <p className="mt-4 text-lg font-black text-[#2a1a10]">{p.name}</p>
                  <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-[#6b4c38]">{p.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-orange-600">
                    <MapPinned size={14} /> Explore
                    <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </DPSection>

      {/* ── Key distances ── */}
      <DPSection id="distances" eyebrow="Plan the drive" title="Key distances">
        <Reveal>
          <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-orange-100 bg-[linear-gradient(120deg,#FFF8F1,#FFF3E4)] px-5 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
              <Route size={18} />
            </span>
            <p className="text-[14px] font-semibold text-[#4a3527]">
              {d.destination} sits on the Somnath–{other} pilgrimage circuit — most travellers pair both temples over 3–5 days.
            </p>
          </div>
          <DataTable
            columns={["From", "To", "Distance", "Time"]}
            rows={d.key_distances.map((k) => [k.from, k.to, k.distance, k.duration])}
            verify={{ key: "dist", label: "Distances", value: "", verify: false }}
          />
        </Reveal>
      </DPSection>

      {/* ── Map ── */}
      <DPSection id="map" eyebrow="Find it" title={`${d.destination} on the map`}>
        <Reveal className="[&_div]:my-0 [&_div]:rounded-3xl [&_div]:shadow-[0_18px_50px_rgba(234,88,12,0.10)]">
          <MapEmbed query={d.map_query} title={`Map of ${d.destination}`} />
        </Reveal>
      </DPSection>

      <Faq items={d.faq} heading={`${d.destination} FAQs`} />
      <CtaBand context={`${d.destination} trip`} />
      <RelatedLinks links={related} />

      <JsonLd
        data={placeSchema({
          name: d.destination,
          description: d.answer_first,
          path: `/${slug}/`,
        })}
      />
    </PageShell>
  );
}
