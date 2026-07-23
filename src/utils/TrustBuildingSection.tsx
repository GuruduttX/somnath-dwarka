"use client";

import {
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Car,
  Users,
  PhoneCall,
  Flower2,
} from "lucide-react";

const trustCards = [
  {
    title: "Born in Devbhumi Dwarka",
    desc: "We are locals of Somnath & Dwarka. Every coastal route and sacred temple is known to us.",
    icon: MapPin,
  },
  {
    title: "Yatra, Not Just a Tour",
    desc: "Planned around darshan, aartis and parikrama — never rushed.",
    icon: Flower2,
  },
  {
    title: "100% Transparent Pricing",
    desc: "No hidden charges. No last-minute surprises.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Vehicles & Drivers",
    desc: "Clean vehicles with pilgrim-experienced drivers.",
    icon: Car,
  },
  {
    title: "Elder & Family Friendly",
    desc: "Slow pace journeys with proper breaks.",
    icon: Users,
  },
  {
    title: "Real Human Support",
    desc: "Real people before, during and after your yatra.",
    icon: PhoneCall,
  },
];

export default function TrustBuildingSection() {
  return (
    <section id="trust-building" className="relative py-12 sm:py-20 overflow-hidden">
      {/* Soft Background Glow
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-200/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/20 blur-3xl rounded-full" /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Built on Faith. Backed by Experience.
          </h2>

          <p className="mt-3 sm:mt-6 text-gray-600 text-sm md:text-lg leading-relaxed">
            We don't just plan trips — we guide sacred journeys across Somnath &
            Dwarka with integrity and devotion.
          </p>

          <div className="mt-4 sm:mt-6 h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-full" />
        </div>

        {/* TRUST CARDS */}
        {/* 2-up grid on mobile — the swipe carousel put one card on screen and
            left the other five undiscovered. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {trustCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="
                  group relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl
                  bg-white/70 backdrop-blur-md
                  border border-amber-100/80
                  shadow-sm sm:shadow-lg shadow-amber-100/60
                  transition-all duration-300
                  hover:-translate-y-1 sm:hover:-translate-y-3
                  hover:shadow-2xl hover:shadow-amber-200/50
                  hover:border-amber-200
                "
              >
                {/* Glow Effect on Hover */}
                <div
                  className="
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-br from-amber-200/20 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                  "
                />

                {/* Icon */}
                <div
                  className="
                  relative z-10
                  h-10 w-10 mb-3 sm:h-14 sm:w-14 sm:mb-5
                  flex items-center justify-center
                  rounded-xl sm:rounded-2xl
                  bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400
                  text-white
                  shadow-md shadow-amber-200/60
                  transition-transform duration-300
                  group-hover:scale-110
                "
                >
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={24} className="hidden sm:block" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-[15px] sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-3 leading-snug">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-600 leading-relaxed text-xs sm:text-sm">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
