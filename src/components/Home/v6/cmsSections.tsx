import Link from "next/link";
import Section from "@/src/components/shared/Section";
import {
  getPublishedDataPages,
  getPublishedFestivals,
  getPublishedGuides,
  getPublishedPackages,
} from "@/src/lib/content";
import { s } from "@/src/lib/cms";
import { SEED_PACKAGES } from "@/src/lib/seed/packages";
import { DynamicIcon } from "./AnimatedIcons";

/**
 * CMS-backed home sections: §5 persona routing, §10 guides teaser,
 * §11 festivals, §12 data & research.
 *
 * Each reads what actually exists and renders nothing when it finds nothing.
 * A tile never links to a page that has not been created yet — the v6 map's
 * honesty gate for §5 is "only where an operable persona page exists".
 */

function Card({ href, title, blurb, type }: { href: string; title: string; blurb?: string; type?: "festival" | "data" | "guide" }) {
  const isFestival = type === "festival";
  const isData = type === "data";

  // Default Compass / Guide icon
  let icon = (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-600 transition-transform duration-300 group-hover:scale-110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" className="text-orange-500/20" />
    </svg>
  );

  if (isFestival) {
    icon = (
      // Sparkly festival lantern/star icon
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-600" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v1M12 20v1M4 12H3M20 12h1m-3-7l-1 1M7 17l-1 1m0-13l1 1m10 10l1 1" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" fill="currentColor" className="text-amber-500/20" />
      </svg>
    );
  } else if (isData) {
    icon = (
      // Database list/statistics icon
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-sky-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }

  // Color box background selector
  let iconBgClass = "bg-orange-50 border-orange-100 group-hover:bg-orange-100/50";
  if (isFestival) iconBgClass = "bg-amber-50 border-amber-100 group-hover:bg-amber-100/50";
  if (isData) iconBgClass = "bg-sky-50 border-sky-100 group-hover:bg-sky-100/50";

  return (
    <li>
      <Link
        href={href}
        className="group relative block h-full rounded-2xl border border-stone-200 bg-white p-4.5 transition-all duration-300 hover:border-orange-300 hover:-translate-y-1 hover:shadow-md"
      >
        <div className="flex items-start gap-3.5">
          {/* Icon box */}
          <div className={`flex-shrink-0 w-9.5 h-9.5 rounded-xl border flex items-center justify-center transition-colors duration-300 ${iconBgClass}`}>
            {icon}
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <span className="block font-semibold text-gray-800 text-[14px] leading-snug group-hover:text-orange-700 transition-colors duration-200">
              {title}
            </span>
            {blurb ? (
              <span className="mt-1 block text-[12px] text-slate-500 leading-normal">
                {blurb}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}

function PersonaCard({ href, title, blurb, slug, className = "" }: { href: string; title: string; blurb?: string; slug: string; className?: string }) {
  // One orange scheme for every tile — no per-persona accent colours.
  const borderGradient =
    "from-orange-300/35 to-amber-300/35 group-hover:from-orange-400 group-hover:to-amber-400";

  return (
    <li className={className}>
      <Link
        href={href}
        className="group relative block h-full rounded-2xl p-[2px] bg-transparent"
      >
        {/* Glow border wrapper */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${borderGradient} transition-all duration-300 group-hover:-translate-y-1`}
        />

        {/* Card Body */}
        <div
          className="relative h-full rounded-[14px] bg-white p-4 sm:p-5 flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
        >
          {/* Subtle background spotlight */}
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-orange-500/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          {/* Left Text */}
          <div className="flex-1 min-w-0">
            <span className="block font-bold text-gray-900 text-[15px] md:text-base leading-snug tracking-tight group-hover:text-orange-700 transition-colors duration-200">
              {title}
            </span>
            {blurb ? (
              <span className="mt-1.5 block text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                {blurb}
              </span>
            ) : null}
          </div>

          {/* Right Icon — tinted orange so every tile reads as one palette (the source SVGs
              carry their own multi-colour gradients). */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-orange-50 rounded-xl border border-orange-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:border-orange-200 [&_svg]:[filter:grayscale(1)_sepia(1)_saturate(6)_hue-rotate(-12deg)]">
            <DynamicIcon slug={slug} defaultType="persona" className="group-hover:scale-110" />
          </div>
        </div>
      </Link>
    </li>
  );
}

/** Persona -> package variant slug. Tiles appear as the variants are authored. */
const PERSONAS = [
  { slug: "for-family", label: "Families", blurb: "Pace and stops that suit children and elders" },
  { slug: "for-senior-citizens", label: "Senior citizens", blurb: "Accessibility, shorter days, wheelchair help" },
  { slug: "group", label: "Groups & satsang mandals", blurb: "Coaches, group darshan, bulk stays" },
  { slug: "for-nri-international", label: "NRI & international", blurb: "Airport transfers, longer circuits" },
];

export async function PersonaRouting() {
  const cms = await getPublishedPackages();
  const available = new Set<string>([
    ...SEED_PACKAGES.map((p) => p.slug),
    ...(cms as Array<Record<string, unknown>>).map((p) => String(p.slug)),
  ]);

  const tiles = PERSONAS.filter((p) => available.has(p.slug));
  if (!tiles.length) return null;

  return (
    <Section id="plan-by-traveller-type" title="Plan by traveller type" full className="!py-6 sm:!py-8">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t, i) => (
          <PersonaCard
            key={t.slug}
            slug={t.slug}
            href={`/somnath-dwarka-tour-package/${t.slug}/`}
            title={t.label}
            blurb={t.blurb}
            className={i === tiles.length - 1 && tiles.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""}
          />
        ))}
      </ul>
    </Section>
  );
}


export async function GuidesTeaser() {
  const guides = (await getPublishedGuides()) as Array<Record<string, unknown>>;
  if (!guides.length) return null;

  return (
    <Section id="guides" title="Travel guides & resources" wide>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guides.slice(0, 6).map((g) => (
          <Card
            key={String(g.slug)}
            href={`/guides/${g.slug}/`}
            title={s(g, "title") || String(g.slug)}
            blurb={s(g, "meta_description") || undefined}
          />
        ))}
      </ul>
      <p className="mt-6 text-sm">
        <Link href="/guides/" className="font-semibold text-orange-700 hover:underline">
          All travel guides →
        </Link>
      </p>
    </Section>
  );
}

/** Same full-width gutters as the other home sections. */
const FULL_WIDTH = "w-full px-4 sm:px-8 lg:px-16 xl:px-24";

function SectionHeader({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro: React.ReactNode }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">{eyebrow}</p>
        <h2 id={`${id}-h`} className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="text-[15px] leading-relaxed text-slate-600">{intro}</div>
    </div>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/** "2026-08-16" → "16 Aug 2026"; anything unparseable is shown as given. */
function formatDate(value: string) {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** The three events the calendar note names, shown until festivals are published. */
const KEY_FESTIVALS = [
  { name: "Janmashtami", place: "Dwarka" },
  { name: "Maha Shivratri", place: "Somnath" },
  { name: "Girnar parikrama", place: "Junagadh" },
];

export async function FestivalsTeaser() {
  const festivals = (await getPublishedFestivals()) as Array<Record<string, unknown>>;

  return (
    <section id="festivals" aria-labelledby="festivals-h" className={`scroll-mt-24 ${FULL_WIDTH}`}>
      <SectionHeader
        id="festivals"
        eyebrow="When to plan"
        title="Festivals & yatra calendar"
        intro="Janmashtami at Dwarka, Maha Shivratri at Somnath, and the Girnar parikrama shape when the temples are busiest. Planning around these events makes darshan far smoother."
      />

      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {festivals.length
          ? festivals.slice(0, 3).map((f) => {
              const date = s(f, "date_this_year");
              const where = s(f, "city") || s(f, "event_venue");
              return (
                <li key={String(f.slug)}>
                  <Link
                    href={`/festivals/${f.slug}/`}
                    className="group flex h-full flex-col rounded-2xl border border-orange-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange-300"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                      <CalendarIcon />
                    </span>
                    <span className="mt-4 text-[16px] font-bold text-[#2D1B10] group-hover:text-orange-700">
                      {s(f, "title") || String(f.slug)}
                    </span>
                    {where ? <span className="mt-0.5 text-[13px] text-slate-500">{where}</span> : null}
                    {date ? (
                      <span className="mt-auto pt-4 text-[12.5px] font-semibold text-orange-700">{formatDate(date)}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })
          : KEY_FESTIVALS.map((f) => (
              <li key={f.name} className="flex items-center gap-3.5 rounded-2xl border border-orange-100 bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <CalendarIcon />
                </span>
                <span>
                  <span className="block text-[16px] font-bold text-[#2D1B10]">{f.name}</span>
                  <span className="block text-[13px] text-slate-500">{f.place} · busiest days at the temple</span>
                </span>
              </li>
            ))}

        <li>
          <Link
            href="/festivals/"
            className="group flex h-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-[#2D1B10] to-[#4a2a17] p-5 text-white transition hover:-translate-y-0.5"
          >
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-orange-300">Full calendar</span>
              <span className="mt-1 block text-[16px] font-bold">See every festival date</span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-orange-300 transition group-hover:translate-x-0.5 group-hover:bg-white/15">
              →
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

/**
 * §12 — first-party research. Data pages stay noindex until they carry a
 * methodology and a last-updated date, but they are still linkable from here.
 */
export async function DataAndResearch() {
  const pages = (await getPublishedDataPages()) as Array<Record<string, unknown>>;
  if (!pages.length) return null;

  return (
    <section id="data" aria-labelledby="data-h" className={`scroll-mt-24 ${FULL_WIDTH}`}>
      <SectionHeader
        id="data"
        eyebrow="First-party research"
        title="Our data & research"
        intro="Datasets we keep for this route, from crowd patterns to fares and temple timings, so your plans rest on more than guesswork."
      />

      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {pages.map((d) => {
          const title = s(d, "title") || String(d.slug);
          const dataset = s(d, "dataset_name");
          const updated = s(d, "last_updated");
          // Rows only count once the dataset is cited (methodology + date), as on the page itself.
          const rows = s(d, "methodology") && updated && Array.isArray(d.rows) ? d.rows.length : 0;
          return (
            <li key={String(d.slug)}>
              <Link
                href={`/data/${d.slug}/`}
                className="group flex h-full items-center gap-4 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/70 to-white p-4 transition hover:-translate-y-0.5 hover:border-sky-300 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 ring-1 ring-sky-100">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-bold leading-snug text-[#2D1B10] group-hover:text-sky-800">{title}</span>
                  {dataset && dataset !== title ? <span className="mt-0.5 block text-[13px] text-slate-500">{dataset}</span> : null}
                  {updated || rows ? (
                    <span className="mt-1 flex flex-wrap gap-x-3 text-[12px] font-medium text-sky-800">
                      {rows ? <span>{rows} data points</span> : null}
                      {updated ? <span>Updated {formatDate(updated)}</span> : null}
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 text-[18px] text-sky-400 transition group-hover:translate-x-0.5 group-hover:text-sky-600" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
