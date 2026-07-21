import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, MapPin, Navigation, BookOpen, Ticket } from "lucide-react";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks, { type RelatedLink } from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import CustomPackageCTA from "@/src/components/shared/CustomPackageCTA";
import { breadcrumbSchema, webPageSchema, type Crumb } from "@/src/lib/seo";
import { waLink } from "@/src/config/site";
import {
  interestThemeFor,
  INTEREST_SPOKE_IMAGES,
  INTEREST_FALLBACK_IMAGES,
} from "@/src/config/interestHubs";
import InterestCardImage from "./InterestCardImage";

/** A spoke of an interest hub, as read from the CMS. */
export type InterestEntry = {
  slug: string;
  title: string;
  /** The spoke's own h1 — its em-dash tail becomes the card's descriptor. */
  h1: string;
  /** "money" spokes are ticketed places to visit; "info" spokes are guides. */
  kind: string;
};

/** Split "Rani ki Vav, Patan — UNESCO Stepwell Timings & Guide" into both halves. */
function splitHeadline(h1: string): { title: string; tail: string } {
  const [title, ...rest] = h1.split(/\s+[—–]\s+/);
  return { title: title.trim(), tail: rest.join(" — ").trim() };
}

function imageFor(slug: string, index: number): string {
  return (
    INTEREST_SPOKE_IMAGES[slug] ??
    INTEREST_FALLBACK_IMAGES[index % INTEREST_FALLBACK_IMAGES.length]
  );
}

/**
 * Give "Gujarat" the warm gradient the package hubs use on "Tour Package".
 * Styled inline so the hero does not depend on another component's <style>.
 */
function highlightHeadline(text: string) {
  return text.split(/(gujarat)/i).map((part, i) =>
    /^gujarat$/i.test(part) ? (
      <span
        key={i}
        className="inline-block pr-[0.06em] pb-[0.06em]"
        style={{
          backgroundImage:
            "linear-gradient(100deg,#EA580C 0%,#F97316 30%,#F59E0B 55%,#EA580C 80%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/**
 * Decorative hero art, keyed to the hub's subject: a grassland skyline with
 * birds for wildlife, an arcade of stepwell arches for heritage. Line-drawn in
 * the warm palette so they read as texture behind the headline rather than as
 * illustration competing with it. Purely ornamental — aria-hidden throughout.
 */
function HeroArt({ slug }: { slug: string }) {
  if (slug === "wildlife-nature-tours") {
    return (
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] w-full sm:h-[190px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wl-hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#FDBA74" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wl-hill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Far and near grassland ridges */}
        <path d="M0,150 C160,104 300,150 460,132 C640,112 760,150 920,136 C1080,122 1240,152 1440,124 L1440,220 L0,220 Z" fill="url(#wl-hill2)" />
        <path d="M0,178 C180,146 320,182 500,166 C700,148 820,182 1000,170 C1180,158 1300,184 1440,168 L1440,220 L0,220 Z" fill="url(#wl-hill)" />

        {/* Acacia silhouettes, the shape of dry-forest country */}
        <g fill="none" stroke="#C2410C" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round">
          <path d="M214 186 L214 150 M214 158 L198 146 M214 160 L232 148" />
          <path d="M196 142 Q214 126 232 142 Q214 134 196 142 Z" fill="#C2410C" fillOpacity="0.16" stroke="none" />
          <path d="M1108 188 L1108 154 M1108 162 L1094 152 M1108 164 L1124 154" />
          <path d="M1092 148 Q1108 134 1124 148 Q1108 141 1092 148 Z" fill="#C2410C" fillOpacity="0.16" stroke="none" />
        </g>

        {/* Birds */}
        <g fill="none" stroke="#B45309" strokeOpacity="0.4" strokeWidth="2.2" strokeLinecap="round">
          <path d="M980 62 q10 -9 20 0 q10 -9 20 0" />
          <path d="M1046 40 q7 -6 14 0 q7 -6 14 0" />
          <path d="M912 34 q6 -5 12 0 q6 -5 12 0" />
          <path d="M330 52 q9 -8 18 0 q9 -8 18 0" />
          <path d="M268 30 q6 -5 12 0 q6 -5 12 0" />
        </g>
      </svg>
    );
  }

  if (slug === "heritage-tours-gujarat") {
    return (
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] w-full sm:h-[190px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hr-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* An arcade of cusped arches, descending like a stepwell's storeys */}
        <g stroke="url(#hr-stone)" strokeWidth="2.4" fill="none" strokeLinecap="round">
          {[80, 300, 520, 740, 960, 1180, 1360].map((x, i) => {
            const h = 96 + (i % 3) * 22;
            return (
              <g key={x}>
                <path d={`M${x} 220 L${x} ${220 - h} Q${x + 44} ${220 - h - 52} ${x + 88} ${220 - h} L${x + 88} 220`} />
                <path d={`M${x + 16} 220 L${x + 16} ${220 - h + 14} Q${x + 44} ${220 - h - 24} ${x + 72} ${220 - h + 14} L${x + 72} 220`} strokeOpacity="0.55" />
                <circle cx={x + 44} cy={220 - h - 16} r="3.5" fill="#EA580C" fillOpacity="0.30" stroke="none" />
              </g>
            );
          })}
        </g>

        {/* Plinth the arcade stands on */}
        <rect x="0" y="206" width="1440" height="3" fill="#EA580C" fillOpacity="0.20" />
        <rect x="0" y="214" width="1440" height="2" fill="#EA580C" fillOpacity="0.12" />
      </svg>
    );
  }

  return null;
}


/**
 * Flanking hero art. Sits in the gutters either side of the centred copy, so
 * it only renders from `lg` up — on narrower screens the column fills the width
 * and there is no gutter to decorate. Ornamental, aria-hidden.
 */
function HeroSideArt({ slug }: { slug: string }) {
  const wildlife = slug === "wildlife-nature-tours";

  const Left = wildlife ? (
    /* Reed and grass cluster */
    <svg viewBox="0 0 120 300" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke="#C2410C" strokeOpacity="0.26" strokeWidth="2.2" strokeLinecap="round">
        <path d="M30 300 C26 230 34 176 22 118" />
        <path d="M52 300 C50 222 60 160 48 96" />
        <path d="M74 300 C72 236 84 186 76 136" />
        <path d="M96 300 C94 246 100 206 92 168" />
      </g>
      <g fill="#EA580C" fillOpacity="0.16">
        <ellipse cx="22" cy="110" rx="6" ry="20" transform="rotate(-10 22 110)" />
        <ellipse cx="48" cy="88" rx="6" ry="22" transform="rotate(-6 48 88)" />
        <ellipse cx="76" cy="128" rx="5.5" ry="18" transform="rotate(-14 76 128)" />
        <ellipse cx="92" cy="160" rx="5" ry="16" transform="rotate(-8 92 160)" />
      </g>
    </svg>
  ) : (
    /* Carved column, the kind that lines a stepwell storey */
    <svg viewBox="0 0 120 300" className="h-full w-full" aria-hidden="true">
      <g stroke="#EA580C" strokeOpacity="0.26" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M44 300 L44 96 M84 300 L84 96" />
        <path d="M36 96 L92 96 M32 84 L96 84" />
        <path d="M44 96 Q64 58 84 96" />
        <path d="M52 96 Q64 72 76 96" strokeOpacity="0.5" />
        <path d="M38 300 L38 262 L90 262 L90 300" />
        <path d="M44 214 L84 214 M44 166 L84 166" strokeOpacity="0.45" />
      </g>
      <circle cx="64" cy="70" r="4" fill="#EA580C" fillOpacity="0.24" />
      <circle cx="64" cy="240" r="3" fill="#EA580C" fillOpacity="0.18" />
    </svg>
  );

  const Right = wildlife ? (
    /* Leafy frond */
    <svg viewBox="0 0 120 300" className="h-full w-full" aria-hidden="true">
      <path d="M84 300 C88 214 76 150 58 74" fill="none" stroke="#C2410C" strokeOpacity="0.26" strokeWidth="2.4" strokeLinecap="round" />
      <g fill="#EA580C" fillOpacity="0.14">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 96 + i * 32;
          const w = 30 - i * 3;
          return (
            <g key={i}>
              <ellipse cx={78 - i * 2 - w / 2} cy={y} rx={w / 2} ry="8" transform={`rotate(-24 ${78 - i * 2 - w / 2} ${y})`} />
              <ellipse cx={82 - i * 2 + w / 2} cy={y + 12} rx={w / 2} ry="8" transform={`rotate(24 ${82 - i * 2 + w / 2} ${y + 12})`} />
            </g>
          );
        })}
      </g>
    </svg>
  ) : (
    /* Jharokha — the bracketed balcony window */
    <svg viewBox="0 0 120 300" className="h-full w-full" aria-hidden="true">
      <g stroke="#EA580C" strokeOpacity="0.26" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M30 300 L30 128 Q60 84 90 128 L90 300" />
        <path d="M42 300 L42 140 Q60 110 78 140 L78 300" strokeOpacity="0.5" />
        <path d="M22 128 L98 128 M26 118 L94 118" />
        <path d="M18 196 L102 196 M18 206 L102 206" strokeOpacity="0.4" />
        <path d="M30 128 L18 112 M90 128 L102 112" />
      </g>
      <circle cx="60" cy="104" r="4.5" fill="#EA580C" fillOpacity="0.22" />
      <path d="M60 96 L60 84" stroke="#EA580C" strokeOpacity="0.26" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );

  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-[2%] hidden h-[300px] w-[120px] lg:block xl:left-[5%]">
        {Left}
      </div>
      <div className="pointer-events-none absolute bottom-0 right-[2%] hidden h-[300px] w-[120px] lg:block xl:right-[5%]">
        {Right}
      </div>
    </>
  );
}

const defaultFaq = (name: string) => [
  {
    question: `Can these be combined into one trip?`,
    answer:
      "Yes — most sit within a few hours of each other and slot into a wider Gujarat route. Tell us which ones matter to you and we will sequence them around the drives and opening times rather than the map.",
  },
  {
    question: "Are entry tickets and permits included?",
    answer:
      "Entry tickets, safari permits and guide fees are charged at actuals and, where they can be booked ahead, we book them and share the confirmation. What a package covers is the vehicle, the stays and the planning.",
  },
  {
    question: `When is the best time for ${name} in Gujarat?`,
    answer:
      "October to March suits almost everything here: the parks are open, the light is good and the days are walkable. The exceptions run the other way — the Dangs waterfalls need the monsoon, and the national parks close through it.",
  },
  {
    question: "Do you arrange guides at the sites?",
    answer:
      "Where a site has an official guide service or a booked walk, we arrange it with your ticket. Elsewhere your driver knows the ground and we brief you on what is worth the time before you go.",
  },
];

/**
 * The shared template for the interest hubs — /wildlife-nature-tours/ and
 * /heritage-tours-gujarat/.
 *
 * These hubs do not sell packages, so they deliberately do not borrow the
 * package explorer: there is no price, duration or inclusion list to filter on,
 * and a card promising "Custom" under a national park would be nonsense. What
 * they have instead is a set of places and guides, so each one gets a picture,
 * the editor's own subtitle from the spoke h1, and a label saying whether it is
 * somewhere to visit or something to read.
 */
export default function InterestHubTemplate({
  slug,
  h1,
  crumbs,
  path,
  answerFirst,
  body,
  entries,
  faq,
  related,
  extraSchema,
}: {
  slug: string;
  h1: string;
  crumbs: Crumb[];
  path: string;
  answerFirst?: string;
  body?: string;
  entries: InterestEntry[];
  faq: { question: string; answer: string }[];
  related: RelatedLink[];
  extraSchema?: Record<string, unknown> | null;
}) {
  const theme = interestThemeFor(slug);
  const { title, tail } = splitHeadline(h1);
  const subtitleChips = tail
    ? tail.split(/,|\s+&\s+/).map((c) => c.trim()).filter(Boolean)
    : [];

  const keywords = (t: string) =>
    t.toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 5);
  const chipWords = new Set(subtitleChips.flatMap(keywords));
  const chips = [
    ...subtitleChips,
    ...theme.highlights.filter((h) => !keywords(h).some((w) => chipWords.has(w))),
  ].slice(0, 3);

  // Split the headline at the configured word so the wrap is intentional.
  const breakAt = theme.headlineBreakBefore
    ? title.indexOf(theme.headlineBreakBefore)
    : -1;
  const headlineLines =
    breakAt > 0
      ? [title.slice(0, breakAt).trim(), title.slice(breakAt).trim()]
      : [title];

  const paragraphs = (body ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const [lead, ...rest] = entries;

  return (
    <PageShell crumbs={crumbs} flushHero centerCrumb>
      {/* ── HERO ── */}
      <section className="relative -mt-28 overflow-hidden pt-40 pb-10 sm:pt-42 lg:pt-44 lg:pb-14">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFF4E8_55%,#FFFFFF_100%)]" />
          <div className="absolute left-[10%] top-[8%] h-[55%] w-[45%] bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.16)_0%,transparent_65%)]" />
          <div className="absolute -right-[6%] bottom-[6%] h-[50%] w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.14)_0%,transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <HeroArt slug={slug} />
          <HeroSideArt slug={slug} />
        </div>

        <div className="relative z-[2] mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700 backdrop-blur-sm">
            <Compass size={12} /> {theme.eyebrow}
          </p>

          <h1 className="font-playfair mt-7 text-4xl font-black leading-[1.08] tracking-[-0.03em] text-[#3a2416] sm:text-5xl lg:text-[3.5rem]">
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {highlightHeadline(line)}
              </span>
            ))}
          </h1>

          {chips.length ? (
            <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
              {chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-orange-200/70 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#7a4a2b] shadow-sm"
                >
                  {c}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mx-auto mt-7 max-w-2xl text-[13px] leading-[1.75] text-[#6b4c38] sm:text-sm">
            {answerFirst || theme.standfirst}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#explore"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore {entries.length} place{entries.length === 1 ? "" : "s"}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink(`Hi, I'd like to plan a ${theme.name} trip in Gujarat`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white"
            >
              <Navigation size={15} />
              Plan this with us
            </a>
          </div>
        </div>
      </section>

      {/* ── CARD GRID ── */}
      <section id="explore" className="scroll-mt-28 bg-white pb-16 pt-4 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600">
                {entries.length} to explore
              </p>
              <h2 className="font-playfair mt-2 text-3xl font-black tracking-[-0.02em] text-slate-900 sm:text-4xl">
                {theme.gridHeading}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-500">{theme.gridBlurb}</p>
          </div>

          {entries.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* The first entry runs wide, as the way in. */}
              <InterestCard entry={lead} hub={slug} index={0} featured />
              {rest.map((e, i) => (
                <InterestCard key={e.slug} entry={e} hub={slug} index={i + 1} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-slate-500">
              Guides for this section are being written — tell us what you want to see and we will
              plan around it.
            </p>
          )}
        </div>
      </section>

      {/* ── Editor prose, where the CMS doc carries any ── */}
      {paragraphs.length ? (
        <section className="bg-white pb-8">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-7 text-gray-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CustomPackageCTA />

      <Faq
        items={faq.length ? faq : defaultFaq(theme.name)}
        heading="Planning around these — your questions answered"
        subheading="Combining sites into one trip, what tickets cost and when to come."
      />

      <CtaBand context={theme.name} title="Plan this trip" />
      <RelatedLinks links={related} />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ name: h1, description: answerFirst ?? h1, path })} />
      {extraSchema ? <JsonLd data={extraSchema} /> : null}
    </PageShell>
  );
}

function InterestCard({
  entry,
  hub,
  index,
  featured = false,
}: {
  entry: InterestEntry;
  hub: string;
  index: number;
  featured?: boolean;
}) {
  const { title, tail } = splitHeadline(entry.h1);
  const isGuide = entry.kind === "info";

  return (
    <Link
      href={`/${hub}/${entry.slug}/`}
      className={`group flex flex-col overflow-hidden rounded-[26px] border border-orange-100/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_26px_70px_rgba(234,88,12,0.14)] ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-56 sm:h-64" : "h-48"}`}>
        <InterestCardImage src={imageFor(entry.slug, index)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Whether this is a place to visit or a guide to read. */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#7a4a2b] shadow-sm backdrop-blur-sm">
          {isGuide ? <BookOpen size={12} /> : <Ticket size={12} />}
          {isGuide ? "Guide" : "Visit"}
        </span>

        <h3
          className={`font-playfair absolute inset-x-0 bottom-0 px-5 pb-4 font-bold leading-tight text-white ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        {tail ? (
          <p className="flex items-start gap-2 text-[13.5px] leading-relaxed text-slate-600">
            <MapPin size={14} className="mt-0.5 shrink-0 text-orange-500" />
            {tail}
          </p>
        ) : (
          <p className="text-[13.5px] leading-relaxed text-slate-600">{entry.title}</p>
        )}
        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-orange-600">
          {isGuide ? "Read the guide" : "See timings & access"}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
