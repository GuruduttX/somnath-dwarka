import type { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Navigation,
} from "lucide-react";
import {
  buildMetadata,
  sanitizeSchemaOverride,
  touristTripSchema,
  webPageSchema,
} from "@/src/lib/seo";
import { CORE_FACTS, waLink } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { getPublishedPackages, packagePath, getHubBySlug } from "@/src/lib/content";
import { SEED_PACKAGES, type SeedPackage } from "@/src/lib/seed/packages";
import { isAuthorisedPackage, packageBucket, type PackageBucket } from "@/src/config/packageSpokes";
import { buildRelatedLinks } from "@/src/lib/links";
import { mapAdminPackagesToTourCards, type TourPackage } from "@/src/utils/TourData";
import PackageExplorer from "@/src/components/TourArchive/PackageExplorer";
import TourArchiveCTA from "@/src/components/TourArchive/TourArchiveCTA";
import CustomPackageCTA from "@/src/components/shared/CustomPackageCTA";
import HangingDiyas from "@/src/components/TourArchive/HangingDiyas";
import HubContent from "@/src/components/hub/HubContent";
import { faqOf, s, bool, verifiedValue, h1Of, titleOf } from "@/src/lib/cms";

const PATH = "/somnath-dwarka-tour-package/";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getHubBySlug("somnath-dwarka-tour-package");
  if (!hub) {
    return buildMetadata({
      title: "Somnath Dwarka Tour Package",
      description:
        "Somnath Dwarka tour packages with day-wise itinerary, inclusions, indicative prices and cab + hotel help. Choose by duration, starting city or budget.",
      path: PATH,
    });
  }
  return buildMetadata({
    title: titleOf(hub) || "Somnath Dwarka Tour Package",
    description: s(hub || {}, "meta_description"),
    path: PATH,
    noindex: bool(hub || {}, "noindex"),
    canonicalOverride: s(hub || {}, "canonical_override") || undefined,
  });
}

// Hero image composition (local temple photography). Four tiles flank the
// headline on desktop — two down the left rail, two down the right — while
// mobile keeps a single wide Somnath–Dwarka card above the headline.
type HeroTile = { img: string; name: string; place: string; tag: string };

const HERO_MOBILE = "/images/CTA.webp";

const HERO_TILES_LEFT: HeroTile[] = [
  { img: "/images/places/somnath/somnath-temple.webp", name: "Somnath Temple", place: "Prabhas Patan", tag: "Jyotirlinga" },
  { img: "/images/places/somnath/somnath-beach.webp", name: "Somnath Beach", place: "Veraval", tag: "Sunset" },
];

const HERO_TILES_RIGHT: HeroTile[] = [
  { img: "/images/places/dwarka/nageshwar-jyotirlinga.webp", name: "Nageshwar", place: "Bet Dwarka road", tag: "Darshan" },
  { img: "/images/places/dwarka/dwarkadhish-temple.webp", name: "Dwarkadhish", place: "Dwarka", tag: "Char Dham" },
];

// One photo tile in the hero rails: rounded, white-edged, captioned, and
// drifting slowly so the rails feel alive next to the animated diyas.
function HeroPhoto({
  tile,
  className = "",
  floatClass = "",
  eager = false,
}: {
  tile: HeroTile;
  className?: string;
  floatClass?: string;
  eager?: boolean;
}) {
  return (
    <figure
      className={`pkg-tile group relative overflow-hidden rounded-[24px] border-[3px] border-white bg-orange-50 shadow-[0_22px_45px_-20px_rgba(124,45,18,0.55)] ${floatClass} ${className}`}
    >
      <img
        src={tile.img}
        alt={tile.name}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(58,26,6,0)_38%,rgba(58,26,6,0.78)_100%)]" />
      <span className="absolute left-2.5 top-2.5 rounded-full bg-white/85 px-2 py-[3px] text-[8.5px] font-bold uppercase tracking-[0.09em] text-orange-700 backdrop-blur-sm">
        {tile.tag}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 px-3 pb-2.5 pt-6 text-left text-white">
        <p className="font-playfair text-[13px] font-bold leading-tight">{tile.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[9.5px] text-white/85">
          <MapPin size={9} /> {tile.place}
        </p>
      </figcaption>
    </figure>
  );
}

// Rotating pool of temple/coastal imagery for seed variants that have no CMS photos yet.
const FALLBACK_CARD_IMAGES = [
  "/images/home/SomnathLongImage.webp",
  "/images/home/DwarikaLongImage.webp",
  "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=75&auto=format&fit=crop",
];

// Wraps the "Tour Package" phrase in the CMS-authored H1 with the warm orange
// gradient, case-insensitively, leaving the rest of the headline as-is.
function highlightHeadline(text: string) {
  const parts = text.split(/(tour package)/i);
  return parts.map((part, i) =>
    /^tour package$/i.test(part) ? (
      <span key={i} className="pkg-headline-grad inline-block pr-[0.12em] pb-[0.05em] italic">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function seedToTourPackage(seed: SeedPackage, index: number): TourPackage {
  const days = Number(seed.duration.match(/(\d+)/)?.[1] ?? 4);
  const rotated = [
    ...FALLBACK_CARD_IMAGES.slice(index % FALLBACK_CARD_IMAGES.length),
    ...FALLBACK_CARD_IMAGES.slice(0, index % FALLBACK_CARD_IMAGES.length),
  ];

  const location =
    seed.facet === "from-city"
      ? `${seed.h1.replace(/^Somnath Dwarka Tour Package from /i, "")} to Dwarka & Somnath`
      : "Dwarka, Bet Dwarka, Somnath";

  const groupType =
    seed.facet === "traveller" ? (seed.slug === "budget" ? "Budget Trip" : "Family Trip") : "Private Trip";

  const badge =
    seed.facet === "from-city"
      ? "Starts from your city"
      : seed.facet === "traveller"
      ? seed.slug === "budget"
        ? "Budget Pick"
        : "Family Friendly"
      : index === 0
      ? "Popular"
      : "Curated";

  return {
    id: seed.slug,
    slug: seed.slug,
    title: seed.h1,
    location,
    duration: seed.duration,
    groupType,
    days,
    price: seed.price_from,
    // No invented "was" price: a strikethrough must reflect a real former rate.
    originalPrice: 0,
    inclusions: seed.inclusions.slice(0, 4),
    images: rotated.slice(0, 5),
    href: packagePath(seed.slug),
    badge,
    popular: index === 0,
  };
}

export default async function PackagePillarPage() {
  const hub = await getHubBySlug("somnath-dwarka-tour-package");
  // h1Of strips the URL map's "— Itinerary, Price & Booking" keyword tail.
  const heroHeadline = hub ? h1Of(hub) : "";
  const cms = await getPublishedPackages();
  const cmsTourPackages = mapAdminPackagesToTourCards(cms);
  const cmsSlugs = new Set(cmsTourPackages.map((p) => p.slug));

  const seedTourPackages = SEED_PACKAGES.filter((s) => !cmsSlugs.has(s.slug)).map(seedToTourPackage);

  // Only variants the URL map authorises are listed. A record outside the map is
  // not part of the planned architecture, so it never reaches the money page.
  const variants: TourPackage[] = [...cmsTourPackages, ...seedTourPackages].filter((v) =>
    isAuthorisedPackage(v.slug),
  );

  // Bucket from the map, not from the slug's shape. The old test required a
  // plural "days", so 1-day-somnath and 1-day-dwarka matched no group and were
  // silently dropped from the explorer.
  const inBucket = (bucket: PackageBucket) =>
    variants.filter((v) => packageBucket(v.slug) === bucket);

  const byDuration = inBucket("duration");
  const byCity = inBucket("city");
  const byType = inBucket("traveller");
  const byRoute = inBucket("route");
  const byTransport = inBucket("transport");

  const prices = variants.map((v) => v.price).filter((p) => p > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const priceValueStr = hub ? verifiedValue(hub, "price_from") : null;

  const related = buildRelatedLinks({
    self: PATH,
    money: "taxi",
    siblings: [
      { target: "/somnath/", anchor: "Somnath travel guide", type: "pillar" },
      { target: "/dwarka/", anchor: "Dwarka travel guide", type: "pillar" },
      { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "how many days you need", type: "sibling" },
      { target: "/hotels/", anchor: "hotels near the temples", type: "money" },
    ],
  });

  const dbFaq = hub ? faqOf(hub) : [];
  const pillarFaq = dbFaq.length > 0
    ? dbFaq
    : [
        {
          question: "What does a Somnath Dwarka tour package include?",
          answer:
            "Most packages include hotel stays, a private vehicle with driver, daily breakfast and a temple-sequenced itinerary. Air/train fare and lunch/dinner are usually excluded. Exact inclusions are listed on each variant.",
        },
        {
          question: "How much does a Somnath Dwarka tour package cost?",
          answer:
            "Prices shown are indicative starting points pending confirmation and vary by duration, starting city, hotel tier and group size. Share your dates for a firm quote.",
        },
        {
          question: "How many days are ideal for Somnath and Dwarka?",
          answer:
            "Three days is the minimum to cover both temples; four to five days is more comfortable and adds Nageshwar, Bet Dwarka and Porbandar.",
        },
        {
          question: "Can I customise the itinerary and starting city?",
          answer:
            "Yes — every package is a starting point. We can adjust the number of days, add pickup from your city, include extra stops like Porbandar or Bhalka Tirth, and tune the hotel tier to your budget. Share your dates and preferences for a tailored plan.",
        },
      ];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tour packages", path: PATH },
  ];

  const description =
    "Pilgrimage tour packages covering Somnath and Dwarka temples with private transport and hotels.";

  /**
   * The page entity. The CMS override's TouristTrip points `isPartOf` at this
   * node's @id, so without it that reference dangled.
   */
  const pageNode = webPageSchema({
    name: "Somnath Dwarka Tour Package",
    description,
    path: PATH,
    type: "CollectionPage",
    crumbs,
    speakable: true,
  });

  const fallbackTrip = touristTripSchema({
    name: "Somnath Dwarka Tour Package",
    description,
    path: PATH,
  });

  // An editor's pasted graph wins, minus the nodes this page already emits.
  const override = hub?.schema_overrides
    ? sanitizeSchemaOverride(hub.schema_overrides as string)
    : null;
  const schemaData = [pageNode, ...(override ?? [fallbackTrip])];

  return (
    <PageShell
      crumbs={crumbs}
      flushHero
    >
      {/* ── HERO ── */}
      <section id="hero" className="font-dm relative -mt-28 flex flex-col overflow-hidden">
        <style>{`
          @keyframes pkgHeroUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          .pkg-anim { opacity:0; animation: pkgHeroUp .8s cubic-bezier(.22,.7,0,1) forwards; }
          .pkg-d0{animation-delay:.05s}.pkg-d1{animation-delay:.15s}.pkg-d2{animation-delay:.27s}
          .pkg-d3{animation-delay:.39s}.pkg-d4{animation-delay:.51s}.pkg-d5{animation-delay:.63s}

          @keyframes pkgSpin { to { transform: rotate(360deg); } }
          .pkg-aura {
            animation: pkgSpin 65s linear infinite;
            transform-box: fill-box;
            transform-origin: center;
          }

          @keyframes pkgFloatUp {
            0% { transform: translateY(40px) scale(0.5); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-260px) scale(1.25); opacity: 0; }
          }
          .pkg-sparkle {
            animation: pkgFloatUp ease-in-out infinite;
          }

          @keyframes pkgDiyaRise {
            0% { transform: translateY(14px) scale(.85); opacity:0; }
            18% { opacity:.95; }
            82% { opacity:.95; }
            100% { transform: translateY(-64px) scale(1.05); opacity:0; }
          }
          .pkg-diya { animation: pkgDiyaRise 5s ease-in-out infinite; }
          .pkg-diya1{ animation-delay:0s }.pkg-diya2{ animation-delay:1.4s }.pkg-diya3{ animation-delay:2.7s }
          .pkg-diya4{ animation-delay:.8s }.pkg-diya5{ animation-delay:3.4s }

          @keyframes pkgFlicker { 0%,100%{ transform: scaleY(1); opacity:.95 } 45%{ transform: scaleY(1.18) scaleX(.94); opacity:1 } }
          .pkg-flame { animation: pkgFlicker 1.1s ease-in-out infinite; transform-origin: bottom center; }

          @keyframes pkgShine { 0%{ transform: translateX(-160%) skewX(-18deg) } 42%,100%{ transform: translateX(340%) skewX(-18deg) } }
          .pkg-headline-grad {
            background: linear-gradient(100deg,#EA580C 0%,#F97316 30%,#F59E0B 55%,#EA580C 80%);
            background-size: 200% auto;
            -webkit-background-clip: text; background-clip: text;
            color: transparent;
          }
          .pkg-btn-shine::after{
            content:""; position:absolute; top:0; bottom:0; left:0; width:45%;
            background: linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);
            transform: translateX(-160%) skewX(-18deg);
            animation: pkgShine 3.6s linear infinite;
            will-change: transform; pointer-events:none;
          }

          @keyframes pkgDrift {
            0%, 100% { transform: translateY(0) rotate(var(--tilt, 0deg)); }
            50% { transform: translateY(-12px) rotate(var(--tilt, 0deg)); }
          }
          .pkg-tile { transform: rotate(var(--tilt, 0deg)); transition: box-shadow .35s ease; }
          .pkg-tile:hover { box-shadow: 0 30px 60px -22px rgba(124,45,18,.6); }
          .pkg-float { animation: pkgDrift 7s ease-in-out infinite; }
          .pkg-float-a { animation-delay: 0s }
          .pkg-float-b { animation-delay: -1.8s }
          .pkg-float-c { animation-delay: -3.4s }
          .pkg-float-d { animation-delay: -5.1s }

          @media (prefers-reduced-motion: reduce) {
            .pkg-anim, .pkg-flame, .pkg-btn-shine::after, .pkg-aura, .pkg-sparkle, .pkg-float {
              animation: none !important; opacity: 1 !important;
            }
          }
        `}</style>

        {/* Background wash */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEFE0_45%,#FFF6EC_100%)]" />
          <div className="absolute left-1/2 top-[14%] h-[60%] w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.26)_0%,transparent_62%)]" />
          <div className="absolute -left-[6%] bottom-[4%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.20)_0%,transparent_64%)]" />
          <div className="absolute -right-[6%] top-[20%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.12)_0%,transparent_64%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }}
          />
        </div>



        {/* Ambient chakra, rising diyas and sparkles behind the whole hero */}
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
          {/* Divine spinning solar chakra / aura */}
          <svg
            className="pkg-aura absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 text-[#C2410C]/[0.07] lg:h-[720px] lg:w-[720px]"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="100" cy="100" r="60" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Rays / spokes */}
            {Array.from({ length: 32 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2="100"
                y2="15"
                strokeWidth="1"
                transform={`rotate(${i * 11.25} 100 100)`}
                strokeOpacity={i % 2 === 0 ? "0.4" : "0.15"}
              />
            ))}

            {/* Intricate flame petals on the outer rim */}
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={`p-${i}`}
                d="M100 10 C105 18 95 18 100 10"
                fill="currentColor"
                fillOpacity="0.25"
                transform={`rotate(${i * 22.5} 100 100)`}
              />
            ))}
          </svg>

          {/* Rising diya lamps along the base of the hero */}
          {[
            { l: "8%", b: "14%", c: "pkg-diya1" },
            { l: "24%", b: "6%", c: "pkg-diya2" },
            { l: "50%", b: "10%", c: "pkg-diya3" },
            { l: "74%", b: "6%", c: "pkg-diya4" },
            { l: "91%", b: "14%", c: "pkg-diya5" },
          ].map((d, i) => (
            <div key={i} className={`pkg-diya ${d.c} absolute hidden lg:block`} style={{ left: d.l, bottom: d.b }}>
              <svg width="15" height="21" viewBox="0 0 14 20" fill="none">
                <path className="pkg-flame" d="M7 0C8.5 3 10 4.4 10 7a3 3 0 1 1-6 0c0-1.4.6-2.4 1.4-3.4C6 4.6 6.6 5.4 7 6c.5-.7.6-1.6 0-3-.3-.9-.4-2 0-3Z" fill="#FB923C" />
                <ellipse cx="7" cy="15.5" rx="6" ry="3" fill="#EA580C" />
                <ellipse cx="7" cy="14.4" rx="6" ry="2.4" fill="#F59E0B" />
              </svg>
            </div>
          ))}

          {/* Floating sparkles (divine particles) */}
          {[
            { l: "14%", d: "0.2s", t: "4.5s", s: "0.6" },
            { l: "33%", d: "1.5s", t: "5.5s", s: "0.85" },
            { l: "50%", d: "0.8s", t: "4.8s", s: "0.5" },
            { l: "67%", d: "2.3s", t: "6.0s", s: "1.0" },
            { l: "86%", d: "1.1s", t: "5.2s", s: "0.75" },
          ].map((p, idx) => (
            <svg
              key={`sp-${idx}`}
              className="pkg-sparkle absolute hidden lg:block"
              style={{
                left: p.l,
                bottom: "10%",
                animationDelay: p.d,
                animationDuration: p.t,
                transform: `scale(${p.s})`,
              }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" fill="#FBBF24" />
            </svg>
          ))}
        </div>

        {/* ── HERO INNER — photo rail · headline · photo rail ── */}
        <div className="relative z-[2] mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-7 px-5 pt-36 pb-8 sm:px-8 lg:px-10 lg:pt-[9.25rem] lg:pb-[4.5rem] xl:grid-cols-[minmax(0,0.66fr)_minmax(0,1.6fr)_minmax(0,0.66fr)] xl:gap-8 xl:px-14 2xl:gap-10 2xl:px-20">

          {/* ══ LEFT PHOTO RAIL (desktop) ══ */}
          <div className="pkg-anim pkg-d2 hidden flex-col gap-24 xl:flex">
            <HeroPhoto
              tile={HERO_TILES_LEFT[0]}
              eager
              floatClass="pkg-float pkg-float-a"
              className="[--tilt:-2.2deg] aspect-[5/4] w-[92%]"
            />
            <HeroPhoto
              tile={HERO_TILES_LEFT[1]}
              floatClass="pkg-float pkg-float-b"
              className="[--tilt:1.8deg] ml-auto aspect-[5/4] w-[92%]"
            />
          </div>

          {/* ══ CENTER ══ */}
          <div className="flex flex-col items-center text-center">

            {/* Mobile / tablet rounded rectangle image box */}
            <div className="pkg-anim pkg-d1 relative mt-2 flex w-full justify-center xl:hidden">
              <div className="relative w-full max-w-[440px] [aspect-ratio:16/11] overflow-hidden rounded-[26px] border-4 border-white shadow-[0_20px_50px_rgba(234,88,12,0.25)]">
                <img src={HERO_MOBILE} alt="Somnath and Dwarka temples" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5 pt-8 text-left text-white">
                  <p className="font-playfair text-base font-bold">Somnath &amp; Dwarka</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/85"><MapPin size={10} /> Gujarat, India</p>
                </div>
              </div>
            </div>

            {/* Eyebrow (desktop only — mobile leads with the image card) */}
            <span className="pkg-anim pkg-d1 hidden items-center gap-1.5 rounded-full border border-orange-200/70 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-700 shadow-sm backdrop-blur-sm xl:inline-flex">
              <Sparkles size={12} /> Jyotirlinga &amp; Char Dham circuit
            </span>

            {/* Headline */}
            <h1 className="font-playfair pkg-anim pkg-d1 mt-6 text-4xl xl:mt-3.5 font-black leading-[1.12] tracking-[-0.03em] text-[#3a2416] sm:text-5xl xl:text-[3.35rem]">
              {heroHeadline ? (
                highlightHeadline(heroHeadline)
              ) : (
                <>
                  Tour{" "}
                  <span className="pkg-headline-grad inline-block pr-[0.12em] pb-[0.1em] italic">Packages</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="pkg-anim pkg-d2 mx-auto mt-3.5 max-w-[600px] text-[12px] leading-[1.6] text-[#6b4c38] sm:text-[13px] sm:leading-[1.7] lg:text-[15px]">
              {s(hub || {}, "answer_first") || (
                <>
                  Our Somnath Dwarka tour packages cover{" "}
                  <strong className="font-semibold text-orange-700">Dwarkadhish Temple</strong>, Nageshwar Jyotirlinga,
                  Bet Dwarka and{" "}
                  <strong className="font-semibold text-orange-700">Somnath Temple</strong> with the evening aarti, using private transport and
                  hand-picked hotels. Choose by duration, starting city or budget below — every plan
                  is sequenced around darshan timings, and prices shown are indicative until confirmed.
                </>
              )}
            </p>

            {/* CTAs */}
            <div className="pkg-anim pkg-d3 mt-5 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <a
                href="#by-duration"
                className="pkg-btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-6 py-2.5 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-semibold text-white shadow-[0_12px_30px_rgba(234,88,12,0.4)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles size={14} className="relative z-[1]" />
                <span className="relative z-[1]">Browse Packages</span>
                <ArrowRight size={14} className="relative z-[1] transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={waLink("Hi, I'd like a Somnath Dwarka tour package quote")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-6 py-2.5 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white"
              >
                <Navigation size={14} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Stats strip */}
            <div className="pkg-anim pkg-d4 mt-6 sm:mt-12 flex flex-row items-center justify-between gap-2 rounded-2xl border border-orange-200/40 bg-white/45 p-3 sm:p-4 shadow-sm backdrop-blur-xs w-full sm:w-auto">
              <div className="flex-1 text-center px-2">
                <div className="font-playfair text-xl font-black leading-none text-orange-600 sm:text-3xl">{variants.length}+</div>
                <div className="mt-1.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.08em] text-[#8c5e40] whitespace-nowrap">Curated plans</div>
              </div>
              <div className="w-px h-8 sm:h-10 bg-orange-200/50 shrink-0" />
              <div className="flex-1 text-center px-2">
                <div className="font-playfair text-xl font-black leading-none text-orange-600 sm:text-3xl">
                  {priceValueStr
                    ? `₹${Number(priceValueStr).toLocaleString("en-IN")}`
                    : (minPrice ? `₹${minPrice.toLocaleString("en-IN")}` : "Custom")}
                </div>
                <div className="mt-1.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.08em] text-[#8c5e40] whitespace-nowrap">Starts from*</div>
              </div>
              <div className="w-px h-8 sm:h-10 bg-orange-200/50 shrink-0" />
              <div className="flex-1 text-center px-2">
                <div className="font-playfair text-xl font-black leading-none text-orange-600 sm:text-3xl">4–5</div>
                <div className="mt-1.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.08em] text-[#8c5e40] whitespace-nowrap">Days circuit</div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT PHOTO RAIL (desktop) ══ */}
          <div className="pkg-anim pkg-d3 hidden flex-col gap-24 xl:flex">
            <HeroPhoto
              tile={HERO_TILES_RIGHT[0]}
              floatClass="pkg-float pkg-float-c"
              className="[--tilt:2deg] ml-auto aspect-[5/4] w-[92%]"
            />
            <HeroPhoto
              tile={HERO_TILES_RIGHT[1]}
              eager
              floatClass="pkg-float pkg-float-d"
              className="[--tilt:-1.6deg] mr-auto aspect-[5/4] w-[92%]"
            />
          </div>
        </div>

        {/* Wave to white */}
        <div className="relative z-10 -mb-px w-full" aria-hidden="true">
          <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-[60px] w-full sm:h-[80px] lg:h-[100px]">
            <path d="M0,20 C180,80 360,0 540,40 C720,80 900,10 1080,50 C1200,75 1340,30 1440,45 L1440,110 L0,110 Z" fill="rgba(234,88,12,0.10)" />
            <path d="M0,45 C120,10 300,70 480,48 C660,26 840,72 1020,52 C1160,36 1320,65 1440,55 L1440,110 L0,110 Z" fill="rgba(251,146,60,0.10)" />
            <path d="M0,65 C200,30 380,88 560,68 C740,48 920,85 1100,70 C1240,58 1360,75 1440,68 L1440,110 L0,110 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── PACKAGE GRIDS ── */}
      <div className="relative bg-white">
        <HangingDiyas />

        {/* Section intro */}
        <div className="relative z-20 mx-auto max-w-3xl px-4 pt-14 text-center sm:pt-16">
        
          <h2 className="font-playfair mt-20 text-4xl font-black leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            <span className="text-orange-500">Somnath &amp; Dwarka</span>
            <span className="mt-1 block text-[#111827]">Tour Packages</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Handcrafted spiritual journeys with VIP darshan, comfortable stays, and expert
            guides — made for families, pilgrims, and couples.
          </p>
        </div>

        <PackageExplorer
          duration={byDuration}
          city={byCity}
          traveller={byType}
          route={byRoute}
          transport={byTransport}
        />
      </div>

      {/* ── Long-form, admin-driven hub content (chooser tables, the clock,
          hour-by-hour itinerary, price sheet, why-choose, honest fit,
          practical notes). Renders only the blocks the CMS doc carries. ── */}
      {hub ? <HubContent hub={hub} /> : null}

      <CustomPackageCTA />

      <Faq
        items={pillarFaq}
        heading="Everything About Your Divine Gujarat Journey"
        subheading="Find answers to the most common questions about Dwarka Somnath tours, spiritual journeys, temple darshan and Gujarat pilgrimage experiences."
      />

      <TourArchiveCTA />

      <RelatedLinks links={related} />

      <JsonLd data={schemaData} />
    </PageShell>
  );
}
