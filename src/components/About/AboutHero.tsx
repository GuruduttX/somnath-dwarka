"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Shield,
  Car,
  Hotel,
  UserCheck,
  Star,
  ArrowRight,
  MessageCircle,
  MapPin,
  Sparkles,
  Phone,
  ChevronRight,
  Home
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  { Icon: Shield,    label: "VIP Darshan",     desc: "Priority queue & guided darshan" },
  { Icon: Car,       label: "Private Cab",      desc: "AC vehicle, door-to-door pickup" },
  { Icon: Hotel,     label: "Premium Hotels",   desc: "Handpicked, clean & comfortable" },
  { Icon: UserCheck, label: "Expert Guide",     desc: "Local guides for every temple" },
] as const;

const STATS = [
  { value: "4,800+", label: "Happy Pilgrims" },
  { value: "12 Yrs", label: "Experience"     },
  { value: "4.9★",   label: "Average Rating" },
] as const;

export default function AboutHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <section id="about-hero" className="relative overflow-hidden">

  {/* ───────────────── BACKGROUND ───────────────── */}
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
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.12)_0%,transparent_28%,transparent_60%,rgba(0,0,0,0.68)_100%)]" />

    {/* saffron glow */}
    <div className="pointer-events-none absolute -left-[10%] -top-[12%] h-[420px] w-[420px] rounded-full bg-[#ff7a1a]/10 blur-[120px]" />

    {/* blue glow */}
    <div className="pointer-events-none absolute bottom-[-12%] right-[-6%] h-[380px] w-[380px] rounded-full bg-[#244cff]/10 blur-[120px]" />

    {/* subtle dot texture */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    />
  </div>

  {/* ───────────────── BREADCRUMB ───────────────── */}
  <nav
    className="
      relative z-20
      mx-5 -mb-8 mt-24
      flex w-fit flex-wrap items-center gap-2
      rounded-2xl
      ml-22
      backdrop-blur-xl
      sm:mx-10
      lg:mx-14
    "
  >
    <Link
      href="/"
      className="
        flex items-center gap-2
        rounded-xl
        px-3 py-2
        text-sm font-medium
        text-white/70
        transition-all duration-300
        hover:bg-white/10
        hover:text-[#FFB067]
      "
    >
      <Home size={15} />
      Home
    </Link>

    <ChevronRight size={15} className="text-white/30" />

    <div
      className="
        rounded-xl
        bg-[rgba(255,140,40,0.14)]
        px-4 py-2
        text-sm font-semibold
        text-[#FFD2A4]
      "
    >
      About Us
    </div>
  </nav>

  {/* ───────────────── MAIN GRID ───────────────── */}
  <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:pb-24 lg:pt-16 xl:px-20">

    {/* ═════════════════ LEFT ═════════════════ */}
    <div className="flex flex-col">

      {/* Badge */}
      <div className={fadeUp("delay-[40ms]")}>
        <span
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-[rgba(255,170,90,0.22)]
            bg-[rgba(255,120,20,0.08)]
            px-4 py-2
            text-xs font-semibold uppercase tracking-[0.16em]
            text-[#FFD5A8]
            backdrop-blur-md
          "
        >
          <Sparkles size={12} className="text-[#FFB067]" />
          Sacred Gujarat Pilgrimage
        </span>
      </div>

      {/* Headline */}
      <div className={`mt-6 ${fadeUp("delay-[120ms]")}`}>
        <h1 className="pb-2 text-3xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          About Somnath &
          <span className="block italic text-[#FF9A45]">
            Dwarka Tours
          </span>
        </h1>
      </div>

      {/* Description */}
      <p
        className="
          mt-5 max-w-xl
          text-[15px] leading-[2]
          text-white/60
          sm:text-base
        "
      >
        A trusted pilgrimage platform by{" "}
        <a
          href="https://experiencemyindia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            font-semibold
            text-[#FFD2A4]
            underline
            decoration-[#FF9A45]/40
            underline-offset-4
            transition
            hover:text-[#FFB067]
          "
        >
          Experience My India
        </a>
        , built with local expertise, spiritual understanding,
        and years of guiding devotees across the sacred temples
        of Somnath, Dwarka, and Gujarat.
      </p>

      {/* Feature cards */}
      <div
        className={`mt-8 grid grid-cols-2 gap-3 ${fadeUp(
          "delay-[280ms]"
        )}`}
      >
        {FEATURES.map(({ Icon, label, desc }) => (
          <div
            key={label}
            className="
              relative overflow-hidden
              rounded-2xl
              border border-white/[0.08]
              bg-[linear-gradient(135deg,rgba(255,120,20,0.12)_0%,rgba(255,255,255,0.03)_100%)]
              p-4
              backdrop-blur-xl
              shadow-[0_10px_35px_rgba(0,0,0,0.16)]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-[rgba(255,170,90,0.18)]
            "
          >
            <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#ff8c38]/10 blur-2xl" />

            <div className="relative z-10 flex items-center gap-2 text-[#FFB067]">
              <Icon size={17} strokeWidth={2} />
              <span className="text-sm font-semibold text-white">
                {label}
              </span>
            </div>

            <p className="relative z-10 mt-2 text-xs leading-relaxed text-white/45">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div
        className={`mt-8 flex flex-col gap-3 sm:flex-row ${fadeUp(
          "delay-[360ms]"
        )}`}
      >
        <button
          className="
            group inline-flex w-full items-center justify-center gap-2.5
            rounded-2xl
            bg-[linear-gradient(135deg,#FF6B1A,#FF9A45)]
            px-7 py-3.5
            text-sm font-semibold text-white
            shadow-[0_10px_30px_rgba(255,100,20,0.35)]
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_15px_40px_rgba(255,100,20,0.45)]
            sm:w-auto
          "
        >
          Explore Packages

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

        <button
          className="
            inline-flex w-full items-center justify-center gap-2.5
            rounded-2xl
            border border-white/[0.10]
            bg-white/[0.05]
            px-7 py-3.5
            text-sm font-medium text-white/75
            backdrop-blur-xl
            transition-all duration-300
            hover:bg-white/[0.08]
            hover:text-white
            sm:w-auto
          "
        >
          <Phone size={15} className="text-[#FFB067]" />
          Talk to Expert
        </button>
      </div>

      {/* Stats */}
      <div
        className={`mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 ${fadeUp(
          "delay-[440ms]"
        )}`}
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="
              relative overflow-hidden
              rounded-2xl
              border border-[rgba(255,180,120,0.12)]
              bg-[linear-gradient(135deg,rgba(255,120,20,0.14)_0%,rgba(255,160,60,0.06)_45%,rgba(255,255,255,0.03)_100%)]
              px-5 py-5
              backdrop-blur-xl
              shadow-[0_10px_35px_rgba(0,0,0,0.18)]
            "
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ff8c38]/10 blur-2xl" />

            <p className="text-2xl font-bold text-[#FFD3A4] sm:text-3xl">
              {value}
            </p>

            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>

        {/* ════════════════════════════════════════════════════════════
            RIGHT — Image composition
        ═════════════════════════════════════════════════════════════*/}
        <div
          className={`relative transition-all duration-1000 delay-200 ease-out ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >

          {/* ── MAIN IMAGE ── */}
          <div className="relative overflow-hidden rounded-[28px] border border-orange-100 shadow-2xl">
            <Image
              src="/images/home/HomeHero.webp"
              alt="Somnath Temple"
              width={800}
              height={960}
              priority
              quality={90}
              className="h-[520px] w-full object-cover object-center lg:h-[600px]"
            />
            {/* Subtle bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            {/* Bottom floating card */}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Somnath Temple</h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-gray-400">
                    <MapPin size={13} className="text-orange-500" />
                    <span className="text-xs sm:text-sm">Veraval, Gujarat</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-xl bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700">
                  Sacred Tour
                </span>
              </div>

              {/* Mini stars */}
              <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs text-gray-400">4.9 · 2,400+ reviews</span>
              </div>
            </div>
          </div>

          {/* ── SMALL FLOATING IMAGE — Dwarka ── */}
          <div
            className="float-a absolute -left-5 bottom-28 hidden overflow-hidden rounded-[22px] border-4 border-white shadow-2xl md:block lg:-left-10"
          >
            <div className="relative h-[200px] w-[170px] lg:h-[230px] lg:w-[195px]">
              <Image
                src="/images/home/DwarikaLongImage.webp"
                alt="Dwarkadhish Temple"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-xs font-semibold text-white">Dwarkadhish</p>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/60">
                  <MapPin size={8} /> Dwarka, Gujarat
                </p>
              </div>
            </div>
          </div>

          {/* ── PRICE BADGE — top right ── */}
          <div
            className="float-b absolute -top-4 right-4 rounded-2xl border border-orange-100 bg-white px-4 py-3.5 shadow-xl sm:right-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                <Sparkles size={18} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Starting From</p>
                <p className="text-xl font-bold text-gray-900">₹4,999</p>
              </div>
            </div>
          </div>

          {/* ── SOMNATH chip — left, mid ── */}
          <div
            className="float-a absolute -right-3 top-1/3 hidden -translate-y-1/2 overflow-hidden rounded-[18px] border-4 border-white shadow-2xl xl:block"
            style={{ animationDelay: "-2s" }}
          >
            <div className="relative h-[160px] w-[140px]">
              <Image
                src="/images/home/SomnathLongImage.webp"
                alt="Somnath Temple"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <p className="text-[11px] font-semibold text-white">Somnath</p>
                <p className="mt-0.5 flex items-center gap-0.5 text-[9px] text-white/60">
                  <MapPin size={7} /> Veraval
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp floating pill */}
          <div
            className="float-b absolute -bottom-4 right-6 flex items-center gap-2.5 rounded-full border border-orange-100 bg-white px-4 py-2.5 shadow-lg sm:right-10"
            style={{ animationDelay: "-4s" }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
              <MessageCircle size={13} className="text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700">Chat on WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
}
