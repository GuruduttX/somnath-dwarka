"use client";
import { Star, BadgeCheck } from "lucide-react";

export default function PackageTestimonials({ PackageData }: any) {
  const testimonials = [
    ...(PackageData?.testimonials || []),
    ...(PackageData?.testimonials || []),
  ];
  console.log(PackageData)
  return (
    <section className="py-7 md:py-14 lg:py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* LEFT – SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14">
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-sm font-semibold text-orange-600 tracking-wide">
              Guest Reviews
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Trusted by Hundreds of Devotees
            </h2>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-5xl font-bold text-gray-900">
                {PackageData.rating}
              </span>
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: PackageData.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-orange-500 fill-orange-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Based on {PackageData.reviews}+ journeys
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT – SCROLL */}
          <div className="lg:col-span-2 relative">
            <div className="overflow-hidden">
              <div className="flex gap-4 sm:gap-6 infinite-scroll">
                {testimonials.map((t: any, index: number) => (
                  <div
                    key={index}
                    className="min-w-[260px] sm:min-w-[300px] max-w-[260px] sm:max-w-[300px] bg-white border border-orange-100/80 rounded-3xl p-5 shadow-sm shadow-orange-100/60 hover:shadow-md hover:shadow-orange-200/50 transition shrink-0"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold text-sm shrink-0">
                        {t.name?.charAt(0) || "G"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {t.name || "Guest"}
                          </p>
                          <BadgeCheck className="w-4 h-4 text-orange-600 shrink-0" />
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {t.location || "India"}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-orange-500 fill-orange-500"
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                      "
                      {t.description ||
                        "Very peaceful and well-managed spiritual experience."}
                      "
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Fade Edges */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-10 sm:w-16 bg-gradient-to-r from-orange-50 to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-10 sm:w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}