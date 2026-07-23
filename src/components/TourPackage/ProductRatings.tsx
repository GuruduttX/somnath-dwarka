"use client";

import { Heart, Star, PhoneCall, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "3 Million+",
    desc: "Happy travelers from 70+ countries.",
  },
  {
    icon: Star,
    title: "4.8 / 5",
    desc: "Top-rated experiences on Google & TripAdvisor.",
  },
  {
    icon: Heart,
    title: "Curated with Care",
    desc: "Thoughtfully designed spiritual journeys.",
  },
  {
    icon: PhoneCall,
    title: "24/7 Support",
    desc: "Assistance before, during & after travel.",
  },
];

export default function ProductRatings() {
  return (
    <section id="ratings" className="w-full py-8 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Separate tiles in a 2-up grid rather than one horizontally scrolled
            strip: on a phone the carousel showed a single stat at a time and
            hid the other three behind a swipe. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl border border-orange-100/80 bg-white p-4 text-center shadow-sm shadow-orange-100/60 sm:p-6 lg:p-8"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 sm:mb-5 sm:h-12 sm:w-12">
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>

                <h3 className="mb-1 text-lg font-bold tracking-tight text-gray-900 sm:mb-2 sm:text-2xl sm:font-semibold">
                  {item.title}
                </h3>

                <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}