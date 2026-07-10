"use client";

import { useState } from "react";
import Link from "next/link";
import { DynamicIcon } from "./AnimatedIcons";

interface HubCardProps {
  href: string;
  title: string;
  blurb?: string;
  kind: "circuit" | "destination";
  isFlagship?: boolean;
}

function HubCard({ href, title, blurb, kind, isFlagship = false }: HubCardProps) {
  const borderGradient = isFlagship
    ? "from-orange-500/35 to-amber-500/35 group-hover:from-orange-500 group-hover:to-amber-500"
    : kind === "circuit"
    ? "from-orange-300/35 to-amber-300/35 group-hover:from-orange-400 group-hover:to-amber-400"
    : "from-orange-300/35 to-red-300/35 group-hover:from-orange-400 group-hover:to-red-400";

  const slug = href.replace(/\//g, "");

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
            {isFlagship ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-orange-100 text-orange-850 mb-2">
                Flagship Yatra
              </span>
            ) : null}
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
            <DynamicIcon slug={slug} defaultType={kind} className="group-hover:scale-110" />
          </div>
        </div>
      </Link>
    </li>
  );
}

interface InterestCardProps {
  href: string;
  title: string;
  blurb?: string;
}

function InterestCard({ href, title, blurb }: InterestCardProps) {
  const normHref = href.toLowerCase();
  
  let borderGradient = "from-orange-300/35 to-amber-300/35 group-hover:from-orange-400 group-hover:to-amber-400";
  let bgGradient = "from-amber-50/25 to-stone-50/20";
  
  if (normHref.includes("heritage")) {
    borderGradient = "from-stone-400/35 to-amber-400/35 group-hover:from-stone-500 group-hover:to-amber-500";
    bgGradient = "from-stone-50/30 to-amber-50/15";
  } else if (normHref.includes("wildlife") || normHref.includes("nature")) {
    borderGradient = "from-emerald-400/35 to-teal-400/35 group-hover:from-emerald-500 group-hover:to-teal-500";
    bgGradient = "from-emerald-50/25 to-stone-50/20";
  } else if (normHref.includes("temples") || normHref.includes("temple")) {
    borderGradient = "from-orange-400/35 to-amber-400/35 group-hover:from-orange-500 group-hover:to-amber-500";
    bgGradient = "from-orange-50/25 to-amber-50/20";
  } else if (normHref.includes("taxi") || normHref.includes("cab") || normHref.includes("service")) {
    borderGradient = "from-sky-400/35 to-indigo-400/35 group-hover:from-sky-500 group-hover:to-indigo-500";
    bgGradient = "from-sky-50/25 to-stone-50/20";
  }

  const slug = href.replace(/\//g, "");

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
            <DynamicIcon slug={slug} defaultType="interest" className="group-hover:scale-110" />
          </div>
        </div>
      </Link>
    </li>
  );
}

interface PersonaCardProps {
  href: string;
  title: string;
  blurb?: string;
  slug: string;
}

function PersonaCard({ href, title, blurb, slug }: PersonaCardProps) {
  let borderGradient = "from-orange-300/35 to-amber-300/35 group-hover:from-orange-400 group-hover:to-amber-400";

  if (slug === "for-family") {
    borderGradient = "from-rose-400/35 to-orange-400/35 group-hover:from-rose-500 group-hover:to-orange-400";
  } else if (slug === "for-senior-citizens") {
    borderGradient = "from-teal-400/35 to-emerald-400/35 group-hover:from-teal-500 group-hover:to-emerald-500";
  } else if (slug === "group") {
    borderGradient = "from-amber-400/35 to-orange-400/35 group-hover:from-amber-500 group-hover:to-orange-500";
  } else if (slug === "for-nri-international") {
    borderGradient = "from-cyan-400/35 to-indigo-400/35 group-hover:from-cyan-500 group-hover:to-indigo-500";
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

interface TravelTabsProps {
  circuits: Array<{ slug: string; title: string; blurb?: string }>;
  destinations: Array<{ slug: string; title: string; blurb?: string }>;
  personas: Array<{ slug: string; label: string; blurb?: string }>;
}

export default function TravelTabs({ circuits, destinations, personas }: TravelTabsProps) {
  const [activeTab, setActiveTab] = useState<"journey" | "interest" | "traveller">("journey");

  const interests = [
    { href: "/heritage-tours-gujarat/", title: "Heritage tours", blurb: "UNESCO sites, Rani ki Vav, Dholavira" },
    { href: "/wildlife-nature-tours/", title: "Wildlife & nature", blurb: "Gir lions, Devalia, Velavadar" },
    { href: "/temples/", title: "Temples of Gujarat", blurb: "Dakor, Virpur, Salangpur, Chotila" },
    { href: "/somnath-dwarka-taxi-service/", title: "Private cabs", blurb: "Fixed fares, verified routes" },
  ];

  const FLAGSHIP = {
    slug: "somnath-dwarka-tour-package",
    title: "Somnath Dwarka Tour Package",
    blurb: "The flagship pilgrimage circuit — 1 to 5 days.",
  };

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Title & Subheading */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Plan Your Sacred Journey
        </h2>
        <p className="mt-3 text-base sm:text-lg text-stone-600 font-medium">
          Customize your pilgrimage. Explore by travel routes, personal interests, or traveller preferences.
        </p>
      </div>

      {/* Tabs Switcher Controls */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <div className="inline-flex p-1 bg-stone-100 rounded-full shadow-inner">
          {/* Tab Button 1: Journey */}
          <button
            onClick={() => setActiveTab("journey")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeTab === "journey"
                ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md"
                : "text-stone-600 hover:text-orange-600 hover:bg-stone-50/50"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            Choose Journey
          </button>

          {/* Tab Button 2: Interest */}
          <button
            onClick={() => setActiveTab("interest")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeTab === "interest"
                ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md"
                : "text-stone-600 hover:text-orange-600 hover:bg-stone-50/50"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Explore by Interest
          </button>

          {/* Tab Button 3: Traveller Type */}
          <button
            onClick={() => setActiveTab("traveller")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeTab === "traveller"
                ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md"
                : "text-stone-600 hover:text-orange-600 hover:bg-stone-50/50"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Traveller Type
          </button>
        </div>
      </div>

      {/* Tab Panels Contents */}
      <div className="w-full min-h-[550px] sm:min-h-[480px] lg:min-h-[400px]">
        {/* Tab 1 Content: Journey */}
        {activeTab === "journey" && (
          <div className="transition-opacity duration-355 ease-in-out opacity-100">
            {/* Circuits Grid */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-5 bg-gradient-to-b from-orange-600 to-amber-500 rounded-full" />
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-855">
                Pilgrimage circuits
              </h3>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              <HubCard
                href={`/${FLAGSHIP.slug}/`}
                title={FLAGSHIP.title}
                blurb={FLAGSHIP.blurb}
                kind="circuit"
                isFlagship
              />
              {circuits.map((h) => (
                <HubCard
                  key={h.slug}
                  href={`/${h.slug}/`}
                  title={h.title}
                  blurb={h.blurb}
                  kind="circuit"
                />
              ))}
            </ul>

            {/* Destinations Grid */}
            {destinations.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
                  <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-855">
                    Destination packages
                  </h3>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {destinations.map((h) => (
                    <HubCard
                      key={h.slug}
                      href={`/${h.slug}/`}
                      title={h.title}
                      blurb={h.blurb}
                      kind="destination"
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Tab 2 Content: Interest */}
        {activeTab === "interest" && (
          <div className="transition-opacity duration-355 ease-in-out opacity-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-855">
                Theme-Based Travel
              </h3>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {interests.map((t) => (
                <InterestCard key={t.href} {...t} />
              ))}
            </ul>
          </div>
        )}

        {/* Tab 3 Content: Traveller Type */}
        {activeTab === "traveller" && (
          <div className="transition-opacity duration-355 ease-in-out opacity-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-5 bg-gradient-to-b from-orange-500 to-indigo-500 rounded-full" />
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-855">
                Tailored for your companion group
              </h3>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {personas.map((t) => (
                <PersonaCard
                  key={t.slug}
                  slug={t.slug}
                  href={`/somnath-dwarka-tour-package/${t.slug}/`}
                  title={t.label}
                  blurb={t.blurb}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
