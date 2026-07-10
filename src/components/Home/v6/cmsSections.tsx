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

function PersonaCard({ href, title, blurb, slug }: { href: string; title: string; blurb?: string; slug: string }) {
  let borderGradient = "from-orange-300/35 to-amber-300/35 group-hover:from-orange-400 group-hover:to-amber-400";
  let bgGradient = "from-amber-50/25 to-stone-50/20";

  if (slug === "for-family") {
    borderGradient = "from-rose-400/35 to-orange-400/35 group-hover:from-rose-500 group-hover:to-orange-400";
    bgGradient = "from-rose-50/25 to-stone-50/20";
  } else if (slug === "for-senior-citizens") {
    borderGradient = "from-teal-400/35 to-emerald-400/35 group-hover:from-teal-500 group-hover:to-emerald-500";
    bgGradient = "from-teal-50/25 to-stone-50/20";
  } else if (slug === "group") {
    borderGradient = "from-amber-400/35 to-orange-400/35 group-hover:from-amber-500 group-hover:to-orange-500";
    bgGradient = "from-amber-50/25 to-stone-50/20";
  } else if (slug === "for-nri-international") {
    borderGradient = "from-cyan-400/35 to-indigo-400/35 group-hover:from-cyan-500 group-hover:to-indigo-500";
    bgGradient = "from-cyan-50/25 to-stone-50/20";
  }

  return (
    <li>
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
          className="relative h-full rounded-[14px] bg-white p-5 flex items-center justify-between gap-4 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
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

          {/* Right Icon */}
          <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-stone-50 rounded-xl border border-stone-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:border-orange-100">
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
    <Section id="plan-by-traveller-type" title="Plan by traveller type" wide>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <PersonaCard
            key={t.slug}
            slug={t.slug}
            href={`/somnath-dwarka-tour-package/${t.slug}/`}
            title={t.label}
            blurb={t.blurb}
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

export async function FestivalsTeaser() {
  const festivals = (await getPublishedFestivals()) as Array<Record<string, unknown>>;

  return (
    <Section id="festivals" title="Festivals & yatra calendar" wide>
      {festivals.length ? (
        <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.slice(0, 3).map((f) => (
            <Card
              key={String(f.slug)}
              href={`/festivals/${f.slug}/`}
              title={s(f, "title") || String(f.slug)}
              blurb={s(f, "date_this_year") || undefined}
              type="festival"
            />
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5.5 max-w-3xl">
          <div className="flex gap-4.5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-amber-950 text-sm leading-tight">Yatra Calendar Insights</h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-amber-800/90">
                Janmashtami at Dwarka, Maha Shivratri at Somnath, and the Girnar parikrama shape when the temples are busiest. Planning around these events guarantees smoother darshan availability.
              </p>
            </div>
          </div>
        </div>
      )}
      <p className="mt-6 text-sm">
        <Link href="/festivals/" className="font-semibold text-orange-700 hover:underline">
          See the festival calendar →
        </Link>
      </p>
    </Section>
  );
}

/**
 * §12 — first-party research. Data pages stay noindex until they carry a
 * methodology and a last-updated date, but they are still linkable from here.
 */
export async function DataAndResearch() {
  const pages = await getPublishedDataPages();
  if (!pages.length) return null;

  return (
    <Section id="data" title="Our data & research" wide>
      <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((d) => (
          <Card
            key={String(d.slug)}
            href={`/data/${d.slug}/`}
            title={s(d, "title") || String(d.slug)}
            blurb={s(d, "dataset_name") || undefined}
            type="data"
          />
        ))}
      </ul>
    </Section>
  );
}
