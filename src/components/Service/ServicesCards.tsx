"use client";

import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";
import {
  Car,
  Church,
  Hotel,
  Flame,
  UserCheck,
  Camera,
  Map,
  Waves,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceItem {
  number:   string;
  icon:     LucideIcon;
  title:    string;
  desc:     string;
  features: string[];
  tag:      string;
  href:     string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    number:   "01",
    icon:     Car,
    title:    "Pilgrimage Transport",
    desc:     "Comfortable AC vehicles for the full Somnath–Dwarka circuit and beyond.",
    features: ["Chauffeur-driven comfort", "Airport & railway pickups", "Local sightseeing routes"],
    tag:      "Transport",
    href:     "/services/transport",
  },
  {
    number:   "02",
    icon:     Church,
    title:    "Darshan Booking",
    desc:     "Skip the queue with pre-booked darshan slots at Somnath & Dwarkadhish.",
    features: ["VIP darshan passes", "Evening aarti seats", "Puja samagri included"],
    tag:      "Darshan",
    href:     "/services/darshan",
  },
  {
    number:   "03",
    icon:     Hotel,
    title:    "Hotel & Stay",
    desc:     "Curated stays near the temple — from budget dharamshalas to premium hotels.",
    features: ["Temple-view rooms", "Satvik meal options", "Early check-in support"],
    tag:      "Stay",
    href:     "/services/hotels",
  },
  {
    number:   "04",
    icon:     Flame,
    title:    "Pooja & Aarti",
    desc:     "Personalised puja ceremonies arranged by experienced pandits at both temples.",
    features: ["Rudrabhishek pooja", "Sandhya aarti booking", "Prasad & flowers"],
    tag:      "Ritual",
    href:     "/services/pooja",
  },
  {
    number:   "05",
    icon:     UserCheck,
    title:    "Local Guide",
    desc:     "Knowledgeable guides who bring the history and mythology of Gujarat alive.",
    features: ["Certified local experts", "Multilingual support", "Mythology storytelling"],
    tag:      "Guided",
    href:     "/services/guides",
  },
  {
    number:   "06",
    icon:     Camera,
    title:    "Photography",
    desc:     "Professional shoots capturing your sacred moments at Somnath & the coast.",
    features: ["Sunrise temple shoots", "Traditional attire shoots", "Same-day delivery"],
    tag:      "Photography",
    href:     "/services/photography",
  },
  {
    number:   "07",
    icon:     Map,
    title:    "Customised Packages",
    desc:     "Fully tailored yatra itineraries for families, seniors, and group pilgrimages.",
    features: ["5-day to 10-day plans", "Group & family pricing", "24/7 travel support"],
    tag:      "Packages",
    href:     "/services/packages",
  },
  {
    number:   "08",
    icon:     Waves,
    title:    "Coastal Excursions",
    desc:     "Sunset boat rides, Nageshwar Jyotirlinga visit, and Beyt Dwarka ferry trips.",
    features: ["Beyt Dwarka ferry", "Sunset sea visit", "Nageshwar temple stop"],
    tag:      "Excursion",
    href:     "/services/excursions",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface ServicesCardsProps {
  services?: ServiceItem[];
  title?:    string;
  highlight?: string;
  subtitle?:  string;
}

export default function ServicesCards({
  services  = DEFAULT_SERVICES,
  title     = "Everything you need for your",
  highlight = "sacred Gujarat yatra",
  subtitle  = "Handpicked pilgrimage services — designed with care, every step of the way.",
}: ServicesCardsProps) {
  return (
    <section id="services" className="w-full py-10 md:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-[12px] font-medium text-orange-800 mb-4">
            <Sparkles className="w-3 h-3" />
            Our services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            {title}{" "}
            <span className="text-orange-500">{highlight}</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {services.map((svc) => (
            <ServiceCard key={svc.number} svc={svc} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Single service card ──────────────────────────────────────────────────────

function ServiceCard({ svc }: { svc: ServiceItem }) {
  const Icon = svc.icon;

  return (
    <Link href={svc.href} className="group block">

      {/* ── DESKTOP card — vertical layout ── */}
      <div className="hidden sm:flex flex-col gap-4 h-full bg-white border border-orange-100 rounded-2xl p-5 relative overflow-hidden hover:border-orange-300 transition-colors duration-200">

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange-400 rounded-t-2xl" />

        {/* Header row */}
        <div className="flex items-start justify-between pt-1">
          <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-[11px] font-medium text-orange-200 tracking-wider">{svc.number}</span>
        </div>

        {/* Title + desc */}
        <div>
          <p className="text-[15px] font-semibold text-gray-900 leading-snug mb-1.5">{svc.title}</p>
          <p className="text-[13px] text-gray-500 leading-relaxed">{svc.desc}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-1.5 flex-1">
          {svc.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[13px] text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-orange-50 pt-3 mt-auto">
          <span className="text-[11px] bg-orange-50 text-orange-800 rounded-full px-3 py-1 font-medium">
            {svc.tag}
          </span>
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* ── MOBILE card — horizontal layout ── */}
      <div className="flex sm:hidden items-start gap-0 bg-white border border-orange-100 rounded-2xl overflow-hidden hover:border-orange-300 transition-colors duration-200">

        {/* Left orange accent bar */}
        <div className="w-[3px] bg-orange-400 self-stretch flex-shrink-0" />

        <div className="flex items-start gap-3 p-4 flex-1 min-w-0">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="w-4.5 h-4.5 text-orange-500" style={{ width: 18, height: 18 }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-[15px] font-semibold text-gray-900 leading-tight">{svc.title}</p>
              <span className="text-[10px] bg-orange-50 text-orange-700 rounded-full px-2.5 py-0.5 font-medium flex-shrink-0 border border-orange-100">
                {svc.tag}
              </span>
            </div>

            <p className="text-[13px] text-gray-500 leading-relaxed mb-2.5">{svc.desc}</p>

            {/* Features — horizontal pills on mobile */}
            <div className="flex flex-wrap gap-1.5">
              {svc.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-600 transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}