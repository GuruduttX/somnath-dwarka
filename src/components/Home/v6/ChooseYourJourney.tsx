import Link from "next/link";
import Section from "@/src/components/shared/Section";
import { getPublishedHubs } from "@/src/lib/content";
import { destinationPath } from "@/src/lib/destinationRoutes";
import { s } from "@/src/lib/cms";
import DestinationSlider, { type DestinationSlide } from "./DestinationSlider";

/**
 * Home §3 — "Choose your journey" (home-page map v6).
 */
const FLAGSHIP = {
  slug: "somnath-dwarka-tour-package",
  title: "Somnath Dwarka",
  blurb:
    "Walk the coastal path of Lord Krishna and the eternal Jyotirlinga — a 5-day pilgrimage circuit crafted for the soul.",
};

const CIRCUIT_KINDS = new Set(["circuit", "triangle", "umbrella"]);

type Glyph = "flame" | "tree" | "clock" | "pin";

/** Card chrome per hub. Tag/days/stops/glyph and the short display copy are editorial, so they live
 *  here rather than being derived from the CMS head_term (which reads as a raw keyword phrase). */
const CARD_META: Record<
  string,
  {
    tag: string;
    days: string;
    stops: number;
    glyph: Glyph;
    title?: string;
    blurb?: string;
  }
> = {
  "somnath-dwarka-tour-package": {
    tag: "The flagship yatra",
    days: "1-6 days",
    stops: 6,
    glyph: "flame",
  },
  "somnath-dwarka-gir-tour-package": {
    tag: "Coast & wilderness",
    days: "4-6 days",
    stops: 6,
    glyph: "tree",
    title: "Somnath Dwarka Gir",
    blurb:
      "Temples by the sea paired with a sunrise safari in Asiatic lion country.",
  },
  "gujarat-tour-packages": {
    tag: "Spiritual sampler",
    days: "7-10 days",
    stops: 6,
    glyph: "clock",
    title: "Grand Gujarat Circuit",
    blurb:
      "A wide-lens religious tour weaving every major shrine of the state.",
  },
};

/** Slide chrome for the destination rail. A hub's own CMS hero_image always wins over `image` here,
 *  so uploading a photo in admin replaces the fallback with no code change.
 *
 *  PLACEHOLDERS: the Unsplash URLs below are stand-ins, not photographs of these places — swap them
 *  out by uploading a real hero_image per hub in the CMS. */
const DEST_META: Record<string, { eyebrow: string; image?: string }> = {
  "ambaji-tour-package": {
    eyebrow: "Shakti Peeth",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=700&auto=format&fit=crop",
  },
  "kutch-tour-package": {
    eyebrow: "White Rann",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&auto=format&fit=crop",
  },
  "statue-of-unity-tour-package": {
    eyebrow: "Monument",
    image: "/images/home/StatueOfUnity.webp",
  },
  "gir-tour-package": {
    eyebrow: "Lion Safari",
    image: "/images/gir/gir-hero.jpg",
  },
  "palitana-tour-package": {
    eyebrow: "Jain Yatra",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&auto=format&fit=crop",
  },
  "saputara-tour-package": {
    eyebrow: "Hill Station",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop",
  },
  "diu-tour-package": {
    eyebrow: "Beach Escape",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop",
  },
  "ahmedabad-tour-package": {
    eyebrow: "Heritage City",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&auto=format&fit=crop",
  },
  "porbandar-tour-package": {
    eyebrow: "Gandhi's Birthplace",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&auto=format&fit=crop",
  },
};

/**
 * Display order for the destination rail. The CMS returns hubs in insertion
 * order, which put Ambaji first; the rail leads with the destinations that
 * carry real photography instead. A hub missing from this list still shows,
 * after the ones listed here.
 */
const DEST_ORDER = [
  "kutch-tour-package",
  "statue-of-unity-tour-package",
  "gir-tour-package",
  "ambaji-tour-package",
  "palitana-tour-package",
  "saputara-tour-package",
  "diu-tour-package",
  "ahmedabad-tour-package",
  "porbandar-tour-package",
];

const DEFAULT_META: Record<
  "circuit" | "destination",
  (typeof CARD_META)[string]
> = {
  circuit: {
    tag: "Pilgrimage circuit",
    days: "Flexible",
    stops: 0,
    glyph: "flame",
  },
  destination: {
    tag: "Destination package",
    days: "Flexible",
    stops: 0,
    glyph: "pin",
  },
};

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 7.2V12l3 1.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function FlameIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M13.4 1.9c.3 2.6-.6 4.4-2.1 6-1.7 1.8-3.9 3.3-4.9 6a7 7 0 0 0 4.2 8.9 3.6 3.6 0 0 1-.9-3.4c.4-1.7 2-2.6 2.5-4.2.6 1 .9 2 .9 3 1.2-.8 1.8-2.1 1.9-3.6 1.6 1.6 2.6 3.6 2.6 5.6a5.6 5.6 0 0 1-1.5 3.7 7 7 0 0 0 4.3-6.6c0-4.7-3.5-7.2-5-9.4-1-1.5-1.5-3.5-2-6Z" />
    </svg>
  );
}

function TreeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2 7.5 9h2.2L6 15h4.1v2.2c0 .5.4.8.9.8h2c.5 0 .9-.3.9-.8V15H18l-3.7-6h2.2L12 2Z" />
      <path d="M10.8 19.4h2.4v2.1a1.2 1.2 0 0 1-2.4 0v-2.1Z" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardGlyph({
  glyph,
  className = "",
}: {
  glyph: Glyph;
  className?: string;
}) {
  if (glyph === "tree") return <TreeIcon className={className} />;
  if (glyph === "clock") return <ClockIcon className={className} />;
  if (glyph === "pin") return <PinIcon className={className} />;
  return <FlameIcon className={className} />;
}

function HubCard({
  href,
  title,
  blurb,
  kind,
}: {
  href: string;
  title: string;
  blurb?: string;
  kind: "circuit" | "destination";
}) {
  const slug = href.replace(/\//g, "");
  const meta = CARD_META[slug] ?? DEFAULT_META[kind];
  const displayTitle = meta.title || title;
  const displayBlurb = meta.blurb || blurb;

  return (
    <li>
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 shadow-sm shadow-orange-500/5 sm:p-6 transition-[transform,box-shadow,border-color,background-color] duration-500 ease-out will-change-transform hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl hover:shadow-orange-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
      >
        {/* Gradient fill that wipes in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        />

        <div className="relative flex h-full flex-col">
          {/* Tag + icon chip */}
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-orange-700 ring-1 ring-orange-100 transition-colors duration-500 ease-out group-hover:bg-white/25 group-hover:text-white group-hover:ring-white/30 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
              {meta.tag}
            </span>
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 ring-1 ring-orange-100 transition-colors duration-500 ease-out group-hover:bg-white group-hover:text-orange-500 group-hover:ring-white sm:h-11 sm:w-11">
              <CardGlyph glyph={meta.glyph} className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>

          {/* Title + blurb */}
          <h4 className="mt-4 text-lg font-bold tracking-tight text-gray-900 sm:mt-6 sm:text-xl transition-colors duration-500 ease-out group-hover:text-white">
            {displayTitle}
          </h4>
          {displayBlurb ? (
            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600 sm:mt-2 sm:text-[15px] transition-colors duration-500 ease-out group-hover:text-white/95">
              {displayBlurb}
            </p>
          ) : null}

          {/* Footer meta */}
          <div className="mt-auto pt-5 sm:pt-8">
            <div className="border-t border-orange-100 pt-3 sm:pt-4 transition-colors duration-500 ease-out group-hover:border-white/35">
              <div className="flex items-center gap-3 text-[12.5px] font-medium text-gray-800 sm:gap-6 sm:text-[15px] transition-colors duration-500 ease-out group-hover:text-white">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
                  <ClockIcon className="h-4 w-4 flex-shrink-0 sm:h-[18px] sm:w-[18px] text-orange-400 transition-colors duration-500 ease-out group-hover:text-white" />
                  {meta.days}
                </span>
                {meta.stops ? (
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap sm:gap-2">
                    <PinIcon className="h-4 w-4 flex-shrink-0 sm:h-[18px] sm:w-[18px] text-orange-400 transition-colors duration-500 ease-out group-hover:text-white" />
                    {meta.stops} sacred stops
                  </span>
                ) : null}
                <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-orange-400 sm:h-5 sm:w-5 transition-[transform,color] duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

function GroupHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-baseline gap-3 sm:mb-6">
      <span className="text-sm font-bold text-orange-400">{number}</span>
      <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        {children}
      </h3>
    </div>
  );
}

export default async function ChooseYourJourney() {
  const hubs = await getPublishedHubs();

  // The flagship circuit is rendered as its own hardcoded card below, so drop
  // it from the mapped circuits or it shows up twice.
  const circuits = hubs.filter(
    (h) => CIRCUIT_KINDS.has(s(h, "hub_kind")) && s(h, "slug") !== FLAGSHIP.slug,
  );
  const rank = (slug: string) => {
    const i = DEST_ORDER.indexOf(slug);
    return i === -1 ? DEST_ORDER.length : i;
  };
  const destinations = hubs
    .filter((h) => s(h, "hub_kind") === "destination")
    .sort((a, b) => rank(String(a.slug)) - rank(String(b.slug)));

  const slides: DestinationSlide[] = destinations.map((h) => {
    const slug = String(h.slug);
    const meta = DEST_META[slug];
    const heroUrl = (h.hero_image as { url?: string } | undefined)?.url;
    return {
      href: destinationPath(slug),
      title: s(h, "title"),
      eyebrow: meta?.eyebrow ?? "Destination",
      image: heroUrl || meta?.image,
    };
  });

  return (
    <Section id="choose-your-journey" full className="!pt-3 sm:!pt-14 !pb-6">
      {/* Section header */}
      <h2
        id="choose-your-journey-h"
        className="text-[clamp(30px,4vw,48px)] font-bold leading-tight tracking-tight text-gray-950"
      >
        <span className="text-orange-500">Choose your</span> journey
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-gray-700 sm:mt-5 sm:text-lg">
        Two ways to travel Gujarat, follow a flagship circuit or
        handpick single destination and build your own pace.
      </p>

      {/* Circuits */}
      <div className="mt-8 sm:mt-14">
        <GroupHeading number="01">Pilgrimage Circuits</GroupHeading>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <HubCard
            href={`/${FLAGSHIP.slug}/`}
            title={FLAGSHIP.title}
            blurb={FLAGSHIP.blurb}
            kind="circuit"
          />
          {circuits.map((h) => (
            <HubCard
              key={String(h.slug)}
              href={`/${h.slug}/`}
              title={s(h, "title")}
              blurb={s(h, "head_term")}
              kind="circuit"
            />
          ))}
        </ul>
      </div>

      {/* Destinations */}
      {slides.length ? (
        <div className="mt-8 sm:mt-14">
          <GroupHeading number="02">Destination Packages</GroupHeading>
          <DestinationSlider slides={slides} />
        </div>
      ) : null}
    </Section>
  );
}
