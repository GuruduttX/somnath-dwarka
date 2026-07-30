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

/** Hero image per circuit card. A hub's CMS hero_image wins when present; these
 *  are the editorial fallbacks so every circuit card ships with real artwork. */
const CIRCUIT_IMAGE: Record<string, string> = {
  "somnath-dwarka-tour-package": "/images/CTA.webp",
  "somnath-dwarka-gir-tour-package": "/images/gir/gir-hero.jpg",
  "gujarat-tour-packages": "/images/home/StatueOfUnity.webp",
};
const CIRCUIT_IMAGE_FALLBACK = "/images/CTA.webp";

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
  image,
}: {
  href: string;
  title: string;
  blurb?: string;
  kind: "circuit" | "destination";
  image?: string;
}) {
  const slug = href.replace(/\//g, "");
  const meta = CARD_META[slug] ?? DEFAULT_META[kind];
  const displayTitle = meta.title || title;
  const displayBlurb = meta.blurb || blurb;
  const cardImage = image || CIRCUIT_IMAGE[slug] || CIRCUIT_IMAGE_FALLBACK;

  return (
    <li className="group">
      <Link
        href={href}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm shadow-orange-500/5 transition-[transform,box-shadow,border-color] duration-500 ease-out will-change-transform group-hover:-translate-y-1.5 group-hover:border-orange-200 group-hover:shadow-2xl group-hover:shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
      >
        {/* ── Image header ── */}
        <div className="relative h-40 overflow-hidden sm:h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cardImage}
            alt={displayTitle}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* legibility gradient */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
          />
          {/* Tag chip */}
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-orange-700 shadow-sm backdrop-blur-sm sm:text-[11px]">
            {meta.tag}
          </span>
          {/* Glyph badge */}
          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-orange-500 shadow-sm backdrop-blur-sm sm:h-10 sm:w-10">
            <CardGlyph glyph={meta.glyph} className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          {/* Title over image */}
          <h4 className="absolute inset-x-0 bottom-0 px-4 pb-3 text-lg font-bold tracking-tight text-white drop-shadow sm:text-xl">
            {displayTitle}
          </h4>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {displayBlurb ? (
            <p className="text-[13px] leading-relaxed text-gray-600 sm:text-[15px]">
              {displayBlurb}
            </p>
          ) : null}

          {/* Footer meta */}
          <div className="mt-auto pt-4 sm:pt-5">
            <div className="flex items-center gap-3 border-t border-orange-100 pt-3 text-[12.5px] font-medium text-gray-800 sm:gap-5 sm:text-[14px]">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <ClockIcon className="h-4 w-4 flex-shrink-0 text-orange-400 sm:h-[18px] sm:w-[18px]" />
                {meta.days}
              </span>
              {meta.stops ? (
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <PinIcon className="h-4 w-4 flex-shrink-0 text-orange-400 sm:h-[18px] sm:w-[18px]" />
                  {meta.stops} stops
                </span>
              ) : null}
              <span className="ml-auto inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-[background-color,color] duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 sm:mb-6">
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

  return (
    <Section id="choose-your-journey" full className="!py-6 sm:!py-8">
      {/* Section header — centered, modern */}
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-4 -mt-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.13em] text-orange-600 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
            <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Ways to travel
        </span>
        <h2
          id="choose-your-journey-h"
          className="text-[clamp(30px,4vw,48px)] font-bold leading-tight tracking-tight text-gray-950"
        >
          <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Choose your
          </span>{" "}
          journey
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-600 sm:text-lg">
          Two ways to travel Gujarat — follow a flagship circuit or handpick a
          single destination and build your own pace.
        </p>
        <span className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
      </div>

      {/* Circuits */}
      <div className="mt-8 sm:mt-14">
        <GroupHeading>Pilgrimage Circuits</GroupHeading>
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
              image={(h.hero_image as { url?: string } | undefined)?.url}
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}

/**
 * Destination rail, split out of ChooseYourJourney so the home page can place it
 * lower down (below "Explore by interest"). Renders nothing when no destination
 * hubs are published.
 */
export async function DestinationPackages() {
  const hubs = await getPublishedHubs();

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

  if (!slides.length) return null;

  return (
    <Section id="destination-packages" full className="!py-6 sm:!py-8">
      <GroupHeading>Destination Packages</GroupHeading>
      <DestinationSlider slides={slides} />
    </Section>
  );
}
