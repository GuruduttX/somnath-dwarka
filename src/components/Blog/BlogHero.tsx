"use client";

import Link from "next/link";
import { ChevronRight , Home} from "lucide-react";

interface BlogHeroProps {
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

export default function BlogHero({
  title,
  category,
  date,
  author,
  image,
}: BlogHeroProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="relative overflow-hidden pt-16"
      style={{
        background:
          "radial-gradient(ellipse at 30% 40%, #8b3a0a 0%, #5c1f05 40%, #2e0e02 100%)",
      }}
    >
      {/* Mandala watermark */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/4 opacity-[0.04]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[95, 75, 55, 35].map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              stroke="#f5b942"
              strokeWidth="1.2"
            />
          ))}

          <line
            x1="100"
            y1="5"
            x2="100"
            y2="195"
            stroke="#f5b942"
            strokeWidth="0.8"
          />

          <line
            x1="5"
            y1="100"
            x2="195"
            y2="100"
            stroke="#f5b942"
            strokeWidth="0.8"
          />

          <line
            x1="33"
            y1="33"
            x2="167"
            y2="167"
            stroke="#f5b942"
            strokeWidth="0.8"
          />

          <line
            x1="167"
            y1="33"
            x2="33"
            y2="167"
            stroke="#f5b942"
            strokeWidth="0.8"
          />
        </svg>
      </div>

       {/* ───────────────── BREADCRUMB ───────────────── */}
         {/* ───────────────── BREADCRUMB ───────────────── */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 pt-5 sm:px-10 lg:px-16 xl:px-24">

        <nav
          className="
            flex w-fit items-center gap-2
            rounded-2xl
            border border-white/[0.08]
            bg-white/[0.04]
            px-1 py-0.5
            backdrop-blur-xl mb-4 md:-mb-20 mt-6 
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

      {/* MAIN GRID */}
      <div className="grid min-h-[340px] grid-cols-1 md:grid-cols-2">
        
        {/* LEFT */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-16">
          
          {/* CATEGORY BADGE */}
          <span
            className="
              mb-4 inline-flex w-fit items-center gap-2
              rounded-full
              border border-amber-500/30
              bg-amber-500/10
              px-3.5 py-1.5
              text-[11px]
              font-semibold
              uppercase
              tracking-widest
              text-amber-300
              backdrop-blur-sm
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            {category}
          </span>

          {/* TITLE */}
          <h1
            className="
              font-serif
              text-3xl
              font-bold
              leading-[1.15]
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-[2.6rem]
            "
          >
            {title.split("—")[0]}

            {title.includes("—") && (
              <>
                <span className="text-amber-400"> —</span>

                <br />

                <em className="font-serif font-normal italic text-orange-300">
                  {title.split("—")[1]}
                </em>
              </>
            )}
          </h1>

          {/* GOLD RULE */}
          <div className="my-4 h-[2px] w-10 rounded-full bg-amber-500" />

          {/* DESCRIPTION */}
          <p className="mb-6 max-w-sm text-[14px] leading-relaxed text-white/65">
            Discover the divine shores of Lord Krishna's kingdom
            and the eternal Jyotirlinga — complete with darshan
            timings, aarti schedules and trusted travel tips.
          </p>

          {/* AUTHOR */}
          <div className="mb-6 flex items-center gap-3">
            
            <div
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full
                bg-amber-400
                text-[13px]
                font-bold
                text-amber-900
              "
            >
              {author.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-[13px] font-semibold text-white">
                {author}
              </p>

              <p className="text-[11px] text-white/45">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap items-center gap-3">
            
            <Link href="/somnath-dwarka-tour-package/">
              <button
                className="
                  rounded-full
                  bg-orange-400
                  px-6 py-2.5
                  text-[13px]
                  font-bold
                  tracking-wide
                  text-amber-950
                  transition-all duration-300
                  hover:bg-amber-300
                  active:scale-95
                  cursor-pointer
                "
              >
                Plan Your Visit
              </button>
            </Link>

            <button
              className="
                flex items-center gap-1
                text-[13px]
                text-white/55
                transition-all duration-300
                hover:text-white
                cursor-pointer
              "
            >
              Read More →
            </button>
          </div>
        </div>

        {/* RIGHT — image (always visible, stacks below on mobile) */}
        <div className="relative md:mt-10 min-h-[200px] md:min-h-[200px] md:max-h-[420px]">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center rounded-2xl"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            {/* Darshan Open Badge */}
            <div
              className="
                absolute right-3 top-3 flex items-center gap-2
                rounded-full
                border border-white/10
                bg-black/45
                px-3 py-1.5
                backdrop-blur-sm
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute inline-flex h-full w-full
                    animate-ping
                    rounded-full
                    bg-green-400
                    opacity-75
                  "
                />

                <span
                  className="
                    relative inline-flex h-2 w-2
                    rounded-full
                    bg-green-500
                  "
                />
              </span>

              <span className="text-[11px] font-semibold text-orange-300">
                Darshan Open
              </span>
            </div>

            {/* LOCATION */}
            <div
              className="
                absolute bottom-3 left-3
                rounded-xl
                border border-white/10
                bg-black/45
                px-3 py-2
                backdrop-blur-sm
              "
            >
              <p className="text-[10px] uppercase tracking-widest text-white/40">
                Destination
              </p>

              <p className="text-[13px] font-semibold text-white">
                Gujarat, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="border-t border-amber-500/10 bg-black/20">
        
        <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
          {[
            { value: "2", label: "Sacred Sites" },
            { value: "5000+", label: "Yrs of History" },
            { value: "365", label: "Days Open" },
          ].map((s) => (
            <div
              key={s.label}
              className="py-4 text-center"
            >
              <p
                className="
                  font-serif
                  text-xl
                  font-bold
                  text-amber-400
                "
              >
                {s.value}
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  uppercase
                  tracking-widest
                  text-white/35
                "
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM WAVE */}
      <div className="pointer-events-none overflow-hidden leading-none">
        
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-10 w-full sm:h-12 md:h-14"
        >
          <path
            d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z"
            fill="white"
          />
        </svg>
      </div>
    </header>
  );
}