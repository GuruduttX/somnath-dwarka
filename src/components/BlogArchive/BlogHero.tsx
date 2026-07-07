"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, BookOpen, Compass, MapPin , Home, ChevronRight} from "lucide-react";

const CATEGORIES = [
  { label: "Dwarka",             href: "/blog/category/dwarka"            },
  { label: "Somnath",            href: "/blog/category/somnath"           },
  { label: "Gujarat Travel",     href: "/blog/category/gujarat-travel"    },
  { label: "Temple Guide",       href: "/blog/category/temple-guide"      },
  { label: "Pilgrimage Tips",    href: "/blog/category/pilgrimage-tips"   },
  { label: "Spiritual Journeys", href: "/blog/category/spiritual-journeys"},
] as const;

// Featured article shown on the right card
const FEATURED = {
  category: "Temple Guide",
  title:    "Dwarkadhish: The City Where Krishna Reigned",
  excerpt:  "Explore the ancient coastal city, its sacred rituals, and the timeless devotion that draws pilgrims from every corner of India.",
  readTime: "8 min read",
  date:     "May 2025",
  image:    "/images/home/HomeHero.webp",
};

export default function BlogArchiveHero() {
  const [query, setQuery]   = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <>
      <style>{`
       
        .hero-editorial { font-family: 'DM Sans', sans-serif; }
        .font-display   { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* Grain texture overlay */
        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
          border-radius: inherit;
        }

        /* Shimmer on search focus */
        .search-luxury:focus-within {
          box-shadow: 0 0 0 2px #d97706, 0 8px 24px rgba(180,120,30,0.12);
        }

        @keyframes driftUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .drift { animation: driftUp 0.8s ease-out forwards; }
        .drift-1 { animation-delay: 0.05s; }
        .drift-2 { animation-delay: 0.18s; }
        .drift-3 { animation-delay: 0.30s; }
        .drift-4 { animation-delay: 0.42s; }
        .drift-5 { animation-delay: 0.54s; }
        .drift-6 { animation-delay: 0.66s; }

        @media (prefers-reduced-motion: reduce) {
          .drift { animation: none; opacity: 1; }
        }
      `}</style>
      {/* bg-[#FDFAF5] */}

 <section id="blog-hero" className="hero-editorial relative overflow-hidden py-14">

    {/* ───────────────── BREADCRUMB ───────────────── */}
  <div className="relative z-20 mx-auto max-w-7xl px-5 pt-5 sm:px-10 lg:px-16 xl:px-24">

    <nav
      className="
        flex w-fit items-center gap-2
        rounded-2xl
        border border-white/[0.08]
        bg-white/[0.04]
        px-1 py-0.5
        backdrop-blur-xl mb-4 md:-mb-22 mt-4 
      "
    >
      <Link
        href="/"
        className="
          flex items-center gap-2
          rounded-xl
          px-3 py-2
          text-sm font-medium
          text-white/60
          transition-all duration-200
          hover:bg-white/[0.06]
          hover:text-[#FFD2A4]
        "
      >
        <Home size={14} />
        Home
      </Link>

      <ChevronRight size={14} className="text-white/25" />

      <div
        className="
          rounded-xl
          bg-[rgba(255,140,40,0.12)]
          px-4 py-2
          text-sm font-semibold
          text-[#FFD2A4]
        "
      >
        Blog
      </div>
    </nav>
  </div>

  {/* ───────────────── CINEMATIC BACKGROUND ───────────────── */}
  <div className="absolute inset-0 z-0">

    {/* Main cinematic gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at 18% 35%, rgba(255,120,20,.24), transparent 32%),
          radial-gradient(circle at 82% 75%, rgba(30,60,180,.16), transparent 30%),
          radial-gradient(circle at 50% 50%, rgba(255,140,40,.06), transparent 45%),
          linear-gradient(
            135deg,
            #6b2408 0%,
            #4a1502 28%,
            #241006 58%,
            #0b1020 100%
          )
        `,
      }}
    />

    {/* cinematic vignette */}
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.12)_0%,transparent_28%,transparent_60%,rgba(0,0,0,0.72)_100%)]" />

    {/* orange glow */}
    <div className="pointer-events-none absolute -left-[10%] -top-[12%] h-[420px] w-[420px] rounded-full bg-[#ff7a1a]/10 blur-[120px]" />

    {/* blue glow */}
    <div className="pointer-events-none absolute bottom-[-12%] right-[-6%] h-[380px] w-[380px] rounded-full bg-[#244cff]/10 blur-[120px]" />

    {/* subtle dots */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    />
  </div>

  {/* ───────────────── MAIN CONTENT ───────────────── */}
  <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5  sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:pb-20 lg:pt-16 xl:px-24">

    {/* ═════════════ LEFT SIDE ═════════════ */}
    <div className="flex flex-col">

      {/* badge */}
      <div className="opacity-0 drift drift-1 mb-6">
        <span
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-[rgba(255,180,120,0.14)]
            bg-[rgba(255,120,20,0.08)]
            px-4 py-2
            text-[10.5px]
            font-semibold uppercase tracking-[0.18em]
            text-[#FFD5A8]
            backdrop-blur-md
          "
        >
          <BookOpen size={10} strokeWidth={2} />
          Sacred Travel Journal
        </span>
      </div>

      {/* heading */}
      <div className="opacity-0 drift drift-2 mb-5">
        <h1
          className="
            font-display
            text-[clamp(40px,2vw,68px)]
            font-semibold
            leading-[1.02]
            tracking-[-0.03em]
            text-white
          "
        >
          Stories, Pilgrimages
          <br />
          <span className="italic text-[#FF9A45]">
            & Sacred Gujarat
          </span>
        </h1>
      </div>

      {/* divider */}
      <div className="opacity-0 drift drift-2 mb-6 flex items-center gap-3">
        <div className="h-px w-10 bg-[#FF9A45]/60" />
        <span className="font-serif text-base text-[#FFB067] opacity-80">
          ॐ
        </span>
        <div className="h-px w-10 bg-[#FF9A45]/60" />
      </div>

      {/* description */}
      <div className="opacity-0 drift drift-3 mb-8">
        <p className="max-w-[520px] text-[15px] font-light leading-[2] text-white/60">
          Immerse yourself in curated travel narratives,
          temple guides, and spiritual experiences from the sacred
          shores of{" "}
          <span className="font-medium text-[#FFD2A4]">
            Dwarka
          </span>{" "}
          and the timeless sanctum of{" "}
          <span className="font-medium text-[#FFD2A4]">
            Somnath
          </span>{" "}
          — written for pilgrims, seekers, and travelers exploring
          the divine heritage of Gujarat.
        </p>
      </div>

      {/* category pills */}
      <div className="opacity-0 drift drift-5 mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="
              rounded-full
              border border-white/[0.08]
              bg-white/[0.04]
              px-4 py-2
              text-[12px]
              font-medium
              text-white/55
              backdrop-blur-md
              transition-all duration-200
              hover:border-[#FF9A45]/30
              hover:bg-[#FF9A45]/10
              hover:text-[#FFD2A4]
            "
          >
            {label}
          </Link>
        ))}
      </div>

      {/* buttons */}
      <div className="opacity-0 drift drift-6 flex items-center gap-4">

        <Link
          href="/blog"
          className="
            group inline-flex items-center gap-2.5
            rounded-2xl
            bg-[linear-gradient(135deg,#FF6B1A,#FF9A45)]
            px-7 py-3.5
            text-[13.5px]
            font-medium
            text-white
            shadow-[0_12px_35px_rgba(255,100,20,0.35)]
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_18px_45px_rgba(255,100,20,0.45)]
          "
        >
          Explore Articles

          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="/blog/category/pilgrimage-tips"
          className="
            inline-flex items-center gap-2
            rounded-2xl
            border border-white/[0.08]
            bg-white/[0.04]
            px-6 py-3.5
            text-[13px]
            font-medium
            text-white/65
            backdrop-blur-md
            transition-all duration-200
            hover:bg-white/[0.07]
            hover:text-[#FFD2A4]
          "
        >
          <Compass size={13} strokeWidth={1.8} />
          Pilgrimage Guides
        </Link>
      </div>
    </div>

    {/* ═════════════ RIGHT SIDE ═════════════ */}
    <div
      className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-200 ease-out ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8"
      }`}
    >

      {/* main card */}
      <div
        className="
          relative w-full max-w-sm overflow-hidden
          rounded-[30px]
          border border-white/[0.08]
          bg-[rgba(255,255,255,0.04)]
          shadow-[0_20px_70px_rgba(0,0,0,0.28)]
          backdrop-blur-xl
          lg:w-[440px]
        "
      >

        {/* image */}
        <div className="relative h-[280px] overflow-hidden sm:h-[320px]">
          <Image
            src={FEATURED.image}
            alt={FEATURED.title}
            fill
            priority
            quality={90}
            className="object-cover object-center transition-transform duration-[8000ms] ease-out hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* tag */}
          <div className="absolute left-4 top-4">
            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full
                border border-white/[0.08]
                bg-[rgba(255,255,255,0.14)]
                px-3 py-1.5
                text-[10px]
                font-semibold uppercase tracking-[0.16em]
                text-[#FFE0BC]
                backdrop-blur-md
              "
            >
              <MapPin size={9} />
              {FEATURED.category}
            </span>
          </div>

          {/* om */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-5 select-none font-serif text-5xl leading-none text-white/20"
          >
            ॐ
          </span>
        </div>

        {/* body */}
        <div className="p-6">

          {/* meta */}
          <div className="mb-3 flex items-center gap-3 text-[11px] font-medium text-white/35">
            <span>{FEATURED.date}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{FEATURED.readTime}</span>
          </div>

          {/* title */}
          <h2
            className="
              font-display mb-3
              text-[24px]
              font-semibold
              leading-[1.2]
              tracking-[-0.02em]
              text-white
            "
          >
            {FEATURED.title}
          </h2>

          {/* excerpt */}
          <p className="mb-6 text-[13px] leading-[1.9] text-white/50">
            {FEATURED.excerpt}
          </p>

          {/* footer */}
          <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">

            <Link
              href="/blog/dwarkadhish-krishna-city"
              className="
                group inline-flex items-center gap-2
                text-[12.5px]
                font-semibold
                text-[#FFB067]
                transition-colors duration-150
                hover:text-[#FFD2A4]
              "
            >
              Read Full Story

              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <span className="text-[11px] text-white/25">
              Featured
            </span>
          </div>
        </div>
      </div>

      {/* floating pill */}
      <div
        className="
          absolute -bottom-4 left-0 right-0 mx-auto
          flex w-fit items-center gap-2
          rounded-2xl
          border border-white/[0.08]
          bg-[rgba(255,255,255,0.06)]
          px-5 py-3
          backdrop-blur-xl
          shadow-[0_12px_35px_rgba(0,0,0,0.22)]
          lg:left-auto lg:right-6
        "
      >
        <div className="flex -space-x-1.5 mr-2">
          {[
            "bg-amber-400",
            "bg-orange-400",
            "bg-[#FF9A45]",
          ].map((c, i) => (
            <div
              key={i}
              className={`h-5 w-5 rounded-full border-2 border-[#1A0A04] ${c}`}
            />
          ))}
        </div>

        <span className="text-[11.5px] font-medium text-white/60">
          <span className="font-semibold text-[#FFD2A4]">
            2,400+ pilgrims
          </span>{" "}
          read our guides
        </span>
      </div>
    </div>
  </div>
</section>
    </>
  );
}