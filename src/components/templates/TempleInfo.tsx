import { Sparkles, Shirt, Camera, ExternalLink, BadgeCheck, AlertCircle, Sunrise, Sun, Sunset } from "lucide-react";
import { buildMetadata, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { findSeedTempleInfo, findSeedDestination } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";
import TempleInfoHero from "./temple/TempleInfoHero";
import Reveal from "./destination/Reveal";

export function templeMetadata(destination: string, topic: string) {
  const t = findSeedTempleInfo(destination, topic);
  if (!t) return {};
  return buildMetadata({ title: t.title, description: t.answer_first, path: `/${destination}/${topic}/` });
}

export function templeExists(destination: string, topic: string) {
  return !!findSeedTempleInfo(destination, topic);
}

/** Pick a time-of-day icon for a session label so the timeline reads at a glance. */
function sessionIcon(label: string, open: string) {
  const l = label.toLowerCase();
  const hour = parseInt(open.split(":")[0] || "0", 10);
  if (l.includes("mangla") || l.includes("morning") || hour < 11) return Sunrise;
  if (l.includes("noon") || (hour >= 11 && hour < 16)) return Sun;
  return Sunset;
}

export default function TempleInfo({ destination, topic }: { destination: string; topic: string }) {
  const t = findSeedTempleInfo(destination, topic);
  const parent = findSeedDestination(destination);
  if (!t) return null;

  const kicker = topic === "darshan" ? "Darshan & Aarti Schedule" : "Timings & Aarti Schedule";

  const related = buildRelatedLinks({
    self: `/${destination}/${topic}/`,
    pillar: { target: `/${destination}/`, anchor: `${parent?.destination ?? destination} travel guide` },
    money: "packages",
    siblings: [
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab for darshan", type: "money" },
      { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "plan your days", type: "sibling" },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: parent?.destination ?? destination, path: `/${destination}/` },
        { name: t.h1, path: `/${destination}/${topic}/` },
      ]}
    >
      {/* speakable: answer-first summary lives inside the hero */}
      <div className="speakable">
        <TempleInfoHero
          h1={t.h1}
          answerFirst={t.answer_first}
          destination={parent?.destination ?? destination}
          destinationPath={`/${destination}/`}
          kicker={kicker}
          verified={t.verified}
          sessionCount={t.timings.length}
        />
      </div>

      {/* ── Timings timeline ── */}
      <section id="timings" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="mb-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
            <Sparkles size={12} />
            Daily schedule
          </span>
          <h2 className="mt-3 flex items-center gap-3 text-2xl font-black tracking-tight text-[#2a1a10] sm:text-[1.9rem]">
            <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />
            Darshan &amp; aarti timings
          </h2>
        </Reveal>

        <div className="relative">
          {/* vertical spine */}
          <span className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange-400 via-amber-300 to-transparent sm:left-[31px]" aria-hidden="true" />
          <ul className="flex flex-col gap-4">
            {t.timings.map((r, i) => {
              const Icon = sessionIcon(r.label, r.open);
              return (
                <Reveal key={r.label} delay={i * 0.07}>
                  <li className="relative flex items-center gap-4 pl-0">
                    <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-[0_8px_20px_rgba(234,88,12,0.28)] ring-4 ring-[#FFF8F1]">
                      <Icon size={22} />
                    </span>
                    <div className="flex flex-1 flex-wrap items-center justify-between gap-2 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-[0_8px_26px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_14px_36px_rgba(234,88,12,0.12)]">
                      <span className="text-[15px] font-bold text-[#2a1a10]">{r.label}</span>
                      <span className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(120deg,#FFF3E4,#FFE7CE)] px-3.5 py-1.5 text-[13.5px] font-black tabular-nums text-orange-700">
                        {r.open}
                        {r.close && r.close !== "—" ? <span className="text-orange-400">→</span> : null}
                        {r.close && r.close !== "—" ? r.close : null}
                      </span>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* verify + official source */}
        <Reveal delay={0.1}>
          <div
            className={`mt-7 flex flex-col gap-3 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
              t.verified ? "border-emerald-200 bg-emerald-50/60" : "border-amber-200 bg-amber-50/60"
            }`}
          >
            <span className={`inline-flex items-center gap-2 text-[13.5px] font-semibold ${t.verified ? "text-emerald-700" : "text-amber-700"}`}>
              {t.verified ? <BadgeCheck size={18} /> : <AlertCircle size={18} />}
              {t.verified ? "Verified against the official source." : "Indicative schedule — confirm on the official site before you travel."}
            </span>
            <a
              href={t.official_source_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 transition hover:ring-orange-300"
            >
              Official source
              <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Know before you go ── */}
      <section id="rules" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
        <Reveal className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
            <Sparkles size={12} />
            Before you enter
          </span>
          <h2 className="mt-3 flex items-center gap-3 text-2xl font-black tracking-tight text-[#2a1a10] sm:text-[1.9rem]">
            <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />
            Dress code &amp; photography
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: Shirt, title: "Dress code", text: t.dress_code },
            { icon: Camera, title: "Photography", text: t.photography_rule },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_20px_45px_rgba(234,88,12,0.12)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <c.icon size={22} />
                </span>
                <p className="mt-4 text-[15.5px] font-black text-[#2a1a10]">{c.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#6b4c38]">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq items={t.faq} heading="Timings FAQs" />
      <CtaBand context={`${t.h1}`} title="Plan darshan with us" subtitle="We time the itinerary around aarti and darshan windows." />
      <RelatedLinks links={related} />

      <JsonLd data={faqSchema(t.faq)} />
    </PageShell>
  );
}
