import type { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Navigation,
} from "lucide-react";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
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

// Hero image composition (local temple photography).
const HERO_SOMNATH = "/images/home/SomnathLongImage.webp";
const HERO_DWARKA = "/images/home/DwarikaLongImage.webp";
const HERO_MOBILE = "/images/CTA.webp";

// The three arched "temple gateway" cards in the hero.
const HERO_GATES = [
  { img: HERO_SOMNATH, name: "Somnath", place: "Veraval", tag: "Jyotirlinga" },
  { img: HERO_MOBILE, name: "Nageshwar", place: "Bet Dwarka", tag: "Darshan" },
  { img: HERO_DWARKA, name: "Dwarkadhish", place: "Dwarka", tag: "Char Dham" },
] as const;

// Small temple dome finial (kalash) that sits atop each arch.
function Kalash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 34" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="kalash-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <path d="M12 30c-5 0-8-2.4-8-5.5S8 20 12 20s8 1.4 8 4.5S17 30 12 30Z" fill="url(#kalash-g)" />
      <rect x="9.5" y="10" width="5" height="12" rx="1.4" fill="url(#kalash-g)" />
      <circle cx="12" cy="7.5" r="3.4" fill="url(#kalash-g)" />
      <path d="M12 0.5c1 1.6 1 3.2 0 4.8-1-1.6-1-3.2 0-4.8Z" fill="url(#kalash-g)" />
    </svg>
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

  let schemaData: any = touristTripSchema({
    name: "Somnath Dwarka Tour Package",
    description:
      "Pilgrimage tour packages covering Somnath and Dwarka temples with private transport and hotels.",
    path: PATH,
  });

  if (hub?.schema_overrides) {
    try {
      schemaData = JSON.parse(hub.schema_overrides as string);
    } catch {}
  }

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tour packages", path: PATH },
      ]}
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

          @keyframes windBlow {
            0%, 100% { transform: scaleX(1) skewY(0deg); }
            50% { transform: scaleX(0.88) skewY(-2.5deg); }
          }
          .pkg-flag-wave {
            transform-origin: left center;
            transform-box: fill-box;
            animation: windBlow 2.5s ease-in-out infinite;
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

          @keyframes pkgShine { 0%{ background-position: -140% 0 } 60%,100%{ background-position: 240% 0 } }
          .pkg-headline-grad {
            background: linear-gradient(100deg,#EA580C 0%,#F97316 30%,#F59E0B 55%,#EA580C 80%);
            background-size: 200% auto;
            -webkit-background-clip: text; background-clip: text;
            color: transparent;
          }
          .pkg-btn-shine::after{
            content:""; position:absolute; inset:0;
            background: linear-gradient(110deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%);
            background-size: 200% 100%; animation: pkgShine 3.4s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .pkg-anim, .pkg-flame, .pkg-btn-shine::after, .pkg-aura, .pkg-flag-wave, .pkg-sparkle {
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



        {/* ── HERO INNER ── */}
        <div className="relative z-[2] mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-5 pt-34 pb-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-14 lg:pt-[8.5rem] lg:pb-[3.25rem] xl:px-20">

          {/* ══ LEFT ══ */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Mobile rounded rectangle image box */}
            <div className="pkg-anim pkg-d1 relative mt-2 lg:hidden w-full flex justify-center">
              <div className="relative w-full max-w-[440px] [aspect-ratio:16/11] overflow-hidden rounded-[26px] border-4 border-white shadow-[0_20px_50px_rgba(234,88,12,0.25)]">
                <img src={HERO_MOBILE} alt="Somnath and Dwarka temples" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5 pt-8 text-left text-white">
                  <p className="font-playfair text-base font-bold">Somnath &amp; Dwarka</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/85"><MapPin size={10} /> Gujarat, India</p>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-playfair pkg-anim pkg-d1 mt-6 text-4xl font-black leading-[1.15] tracking-[-0.03em] text-[#3a2416] sm:text-5xl lg:mt-0 lg:text-[3rem]">
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
            <p className="pkg-anim pkg-d2 mt-3 max-w-[560px] text-[12px] leading-[1.55] text-[#6b4c38] sm:text-[13px] sm:leading-[1.6] lg:text-sm">
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

          {/* ══ RIGHT — Animated Temple & Solar Aura (desktop) ══ */}
          <div className="relative hidden h-[500px] w-full items-center justify-center lg:flex overflow-visible">
            
            {/* Divine spinning solar chakra / aura */}
            <svg
              className="pkg-aura pointer-events-none absolute h-[460px] w-[460px] text-[#C2410C]/[0.08]"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="3 6" />
              <circle cx="100" cy="100" r="75" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="60" strokeWidth="0.8" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="30" strokeWidth="1.2" />

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

            {/* Glowing Golden Temple Silhouette SVG */}
            <svg
              className="pointer-events-none relative z-[2] h-[480px] w-[400px]"
              viewBox="0 0 220 280"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="temple-outline-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF4E6" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#FFE4C4" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#FFD8A8" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="temple-stroke-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="60%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#C2410C" />
                </linearGradient>
              </defs>

              {/* Spire outlines with the warm gradients */}
              <g fill="url(#temple-outline-grad)" stroke="url(#temple-stroke-grad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                {/* Kalash + amalaka on central spire */}
                <circle cx="110" cy="44" r="6" />
                <ellipse cx="110" cy="55" rx="13" ry="5" />
                {/* Central shikhara (spire spire) with vertical ribs */}
                <path d="M110 57 C 90 100, 88 150, 82 196 L 138 196 C 132 150, 130 100, 110 57 Z" />
                
                {/* Side shikharas */}
                <circle cx="64" cy="120" r="4" />
                <path d="M64 124 C 54 148, 53 174, 50 196 L 78 196 C 75 174, 74 148, 64 124 Z" />
                <circle cx="156" cy="120" r="4" />
                <path d="M156 124 C 146 148, 145 174, 142 196 L 170 196 C 167 174, 166 148, 156 124 Z" />
                
                {/* Entablature */}
                <rect x="44" y="196" width="132" height="12" rx="2" />
                {/* Mandapa pillars (gaps read as arch openings) */}
                <rect x="52" y="208" width="10" height="48" rx="2" />
                <rect x="82" y="208" width="10" height="48" rx="2" />
                <rect x="128" y="208" width="10" height="48" rx="2" />
                <rect x="158" y="208" width="10" height="48" rx="2" />
                {/* Central doorway arch */}
                <path d="M100 256 L100 224 Q110 214 120 224 L120 256 Z" />
                {/* Steps */}
                <rect x="46" y="256" width="128" height="7" rx="2" />
                <rect x="38" y="263" width="144" height="7" rx="2" />
                <rect x="30" y="270" width="160" height="8" rx="2" />
              </g>

              {/* Rib highlights */}
              <g stroke="#FFF" strokeOpacity="0.45" strokeWidth="1.5" fill="none">
                <path d="M110 70 L110 196" />
                <path d="M98 110 L94 196" />
                <path d="M122 110 L126 196" />
              </g>

              {/* Flag pole (static) */}
              <rect x="108.5" y="10" width="3" height="30" rx="1.5" fill="url(#temple-stroke-grad)" />
              {/* Waving saffron flag (animated) */}
              <path className="pkg-flag-wave" d="M111.5 12 L138 20 L111.5 28 Z" fill="#EA580C" />
            </svg>

            {/* Rising diya lamps */}
            <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
              {[
                { l: "15%", b: "10%", c: "pkg-diya1" },
                { l: "32%", b: "26%", c: "pkg-diya2" },
                { l: "50%", b: "5%", c: "pkg-diya3" },
                { l: "68%", b: "26%", c: "pkg-diya4" },
                { l: "85%", b: "10%", c: "pkg-diya5" },
              ].map((d, i) => (
                <div key={i} className={`pkg-diya ${d.c} absolute`} style={{ left: d.l, bottom: d.b }}>
                  <svg width="15" height="21" viewBox="0 0 14 20" fill="none">
                    <path className="pkg-flame" d="M7 0C8.5 3 10 4.4 10 7a3 3 0 1 1-6 0c0-1.4.6-2.4 1.4-3.4C6 4.6 6.6 5.4 7 6c.5-.7.6-1.6 0-3-.3-.9-.4-2 0-3Z" fill="#FB923C" />
                    <ellipse cx="7" cy="15.5" rx="6" ry="3" fill="#EA580C" />
                    <ellipse cx="7" cy="14.4" rx="6" ry="2.4" fill="#F59E0B" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Floating Sparkles (Divine Particles) */}
            <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
              {[
                { l: "20%", d: "0.2s", t: "4.5s", s: "0.6" },
                { l: "36%", d: "1.5s", t: "5.5s", s: "0.85" },
                { l: "50%", d: "0.8s", t: "4.8s", s: "0.5" },
                { l: "64%", d: "2.3s", t: "6.0s", s: "1.0" },
                { l: "80%", d: "1.1s", t: "5.2s", s: "0.75" },
              ].map((p, idx) => (
                <svg
                  key={`sp-${idx}`}
                  className="pkg-sparkle absolute"
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
                  <path
                    d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"
                    fill="#FBBF24"
                  />
                </svg>
              ))}
            </div>

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
