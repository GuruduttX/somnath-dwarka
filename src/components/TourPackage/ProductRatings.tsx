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
    <section id="ratings" className="w-full py-8 md:py-20 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl border border-orange-100/80 bg-white shadow-sm shadow-orange-100/60 overflow-hidden">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {features.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className={`
                p-8 text-center shrink-0 w-full snap-center md:w-auto
                ${
                  i !== features.length - 1
                    ? "border-r md:border-r-0 md:border-b lg:border-b-0 lg:border-r border-orange-100/80"
                    : ""
                }
              `}
                >
                  {/* Icon */}
                  <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Icon size={22} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}