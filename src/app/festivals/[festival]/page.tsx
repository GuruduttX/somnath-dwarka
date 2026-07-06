import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Flame, CalendarDays, Users, MapPin, Sparkles, Check, CalendarClock, BedDouble, Clock, ShieldCheck } from "lucide-react";
import { buildMetadata, eventSchema, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import FactTag from "@/src/components/shared/FactTag";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_FESTIVALS, findSeedFestival } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";
import FestivalDetailHero from "@/src/components/festivals/FestivalDetailHero";
import Reveal from "@/src/components/templates/destination/Reveal";

export const revalidate = 3600;
type Params = { params: Promise<{ festival: string }> };

export function generateStaticParams() {
  return SEED_FESTIVALS.map((f) => ({ festival: f.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { festival } = await params;
  const f = findSeedFestival(festival);
  if (!f) return {};
  return buildMetadata({ title: f.title, description: f.answer_first, path: `/festivals/${festival}/` });
}

/** Eyebrow + heading used across the festival detail sections. */
function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
        <Sparkles size={12} />
        {eyebrow}
      </span>
      <h2 className="mt-3 flex items-center gap-3 text-2xl font-black tracking-tight text-[#2a1a10] sm:text-[1.9rem]">
        <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />
        {title}
      </h2>
      {sub ? <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-[#6b4c38]">{sub}</p> : null}
    </Reveal>
  );
}

export default async function FestivalPage({ params }: Params) {
  const { festival } = await params;
  const f = findSeedFestival(festival);
  if (!f) notFound();

  const related = buildRelatedLinks({
    self: `/festivals/${festival}/`,
    pillar: { target: "/festivals/", anchor: "all festivals" },
    money: "packages",
    siblings: [
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab for the festival", type: "money" },
      { target: "/hotels/", anchor: "find a place to stay", type: "money" },
    ],
  });

  const glance = [
    { icon: Flame, label: "Deity", value: f.deity },
    { icon: CalendarDays, label: "Season", value: f.season },
    { icon: Users, label: "Crowd", value: `${f.crowd}` },
    { icon: MapPin, label: "Venue", value: f.event_venue },
  ];

  const tips = [
    { icon: CalendarClock, title: "Book 6–10 weeks ahead", text: "Stays and cabs fill fast and tariffs climb during peak festival days." },
    { icon: Clock, title: "Time your darshan", text: "Plan queues around the aarti timings to avoid the heaviest crush." },
    { icon: BedDouble, title: "We handle logistics", text: "Hotels, transport and a festival-ready itinerary arranged in one place." },
  ];

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Festivals", path: "/festivals/" },
        { name: f.festival, path: `/festivals/${festival}/` },
      ]}
    >
      <FestivalDetailHero
        image={f.image}
        festival={f.festival}
        h1={f.h1}
        answerFirst={f.answer_first}
        deity={f.deity}
        city={f.city}
        season={f.season}
        crowd={f.crowd}
        eventVenue={f.event_venue}
        dateThisYear={f.date_this_year}
      />

      {/* ── At a glance ── */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {glance.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.06}>
              <div className="group h-full rounded-3xl border border-orange-100 bg-white p-5 text-center shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_20px_45px_rgba(234,88,12,0.12)]">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <g.icon size={22} />
                </span>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-orange-400">{g.label}</p>
                <p className="mt-1 text-[14.5px] font-bold leading-snug text-[#2a1a10]">{g.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Rituals ── */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Head eyebrow="Traditions" title="Rituals & observances" />
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-[linear-gradient(135deg,#FFF8F1_0%,#FFEEDD_100%)] p-6 shadow-[0_16px_44px_rgba(234,88,12,0.08)] sm:p-8">
            <span className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[120px] leading-none text-orange-500/[0.06]">ॐ</span>
            <div className="mb-3"><FactTag type="faith" /></div>
            <p className="relative max-w-3xl text-[15.5px] leading-[1.9] text-[#4a3527]">{f.rituals}</p>
          </div>
        </Reveal>
      </section>

      {/* ── Highlights ── */}
      {f.highlights?.length ? (
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Head eyebrow="What to expect" title="Festival highlights" />
          <div className="grid gap-4 sm:grid-cols-2">
            {f.highlights.map((h, i) => (
              <Reveal key={h} delay={(i % 2) * 0.08}>
                <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_14px_34px_rgba(234,88,12,0.10)]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600">
                    <Check size={18} strokeWidth={2.6} />
                  </span>
                  <span className="text-[14.5px] font-semibold text-[#3a2416]">{h}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Travel & booking advice ── */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Head eyebrow="Plan smart" title="Travel & booking advice" sub={f.travel_advice} />
        <div className="grid gap-4 sm:grid-cols-3">
          {tips.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)]">
                <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-orange-50 transition-transform duration-300 group-hover:scale-125" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                  <t.icon size={22} />
                </span>
                <p className="relative mt-4 text-[15.5px] font-black text-[#2a1a10]">{t.title}</p>
                <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-[#6b4c38]">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* honesty note about dates */}
        <Reveal delay={0.1}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/60 px-5 py-4">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-[13.5px] leading-relaxed text-[#7a5a2f]">
              Exact festival dates change each year with the Hindu calendar. We confirm{" "}
              <strong className="font-semibold">{f.festival}</strong> dates before the season rather than publishing an unverified one.
            </p>
          </div>
        </Reveal>
      </section>

      <Faq items={f.faq} heading={`${f.festival} FAQs`} />
      <CtaBand context={`${f.festival} at ${f.event_venue}`} />
      <RelatedLinks links={related} />

      {/* Event schema is gated: only renders when a real date is set (SOP §12) */}
      <JsonLd
        data={[
          eventSchema({
            name: f.h1,
            path: `/festivals/${festival}/`,
            startDate: f.date_this_year || undefined,
            location: f.event_venue,
          }),
          faqSchema(f.faq),
        ]}
      />
    </PageShell>
  );
}
