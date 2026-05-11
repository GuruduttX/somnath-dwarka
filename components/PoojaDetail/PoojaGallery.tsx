"use client";

import { useState } from "react";

const images = [
  { src: "/images/pooja/hero1.webp", label: "Morning Aarti", span: "row-span-2" },
  { src: "/images/pooja/hero2.webp", label: "Havan Ceremony", span: "" },
  { src: "/images/pooja/hero3.webp", label: "Sacred Offerings", span: "" },
  { src: "/images/pooja/hero4.webp", label: "Temple Rituals", span: "" },
  { src: "/images/pooja/hero5.webp", label: "Prasad Blessing", span: "row-span-2" },
  { src: "/images/pooja/hero6.webp", label: "Divine Darshan", span: "" },
];

export default function PoojaGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-5 md:py-24 px-0 bg-white relative overflow-hidden">

      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#fdf2f8_0%,_transparent_65%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-amber-600 text-xs font-semibold uppercase tracking-widest">Sacred Moments</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Pooja{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Gallery
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 mb-5">
            <div className="h-px w-10 bg-amber-200 rounded-full" />
            <div className="h-0.5 w-16 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
            <div className="h-px w-10 bg-amber-200 rounded-full" />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] leading-relaxed">
            Glimpses of sacred pooja ceremonies and spiritual moments
            from Mathura and Vrindavan temples.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-[200px_200px_200px] gap-2 auto-rows-[200px]">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group
                border-2 border-transparent hover:border-amber-300
                shadow-sm hover:shadow-xl hover:shadow-amber-100
                transition-all duration-300
                ${img.span}`}
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Default gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 via-transparent to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/60 to-orange-600/50
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                  bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold tracking-wide">
                  🌸 {img.label}
                </span>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
                border border-white/30 flex items-center justify-center text-white text-sm
                opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                transition-all duration-300">
                ⤢
              </div>

              {/* Index badge */}
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full
                bg-gradient-to-br from-amber-500 to-orange-500 text-white
                flex items-center justify-center text-[11px] font-bold shadow-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* View all strip */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[160px] bg-gradient-to-r from-transparent to-amber-200" />
          <button className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
            bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold text-sm
            shadow-[0_4px_20px_rgba(236,72,153,0.35)]
            hover:shadow-[0_6px_28px_rgba(236,72,153,0.5)] hover:scale-[1.03]
            active:scale-95 transition-all duration-200 cursor-pointer">
            View Full Gallery
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">→</span>
          </button>
          <div className="h-px flex-1 max-w-[160px] bg-gradient-to-l from-transparent to-amber-200" />
        </div>

      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-3xl w-full cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm
                flex items-center gap-1.5 cursor-pointer transition-colors duration-150"
            >
              <span className="text-lg leading-none">✕</span> Close
            </button>

            <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img
                src={images[active].src}
                alt={images[active].label}
                className="w-full max-h-[75vh] object-cover"
              />
              {/* Caption bar */}
              <div className="bg-gradient-to-r from-amber-700 to-orange-600 px-6 py-3 flex items-center justify-between">
                <span className="text-white font-semibold text-sm tracking-wide">
                  🌸 {images[active].label}
                </span>
                <span className="text-white/60 text-xs">{active + 1} / {images.length}</span>
              </div>
            </div>

            {/* Prev / Next */}
            <div className="flex justify-between mt-4 gap-4">
              <button
                onClick={() => setActive((active - 1 + images.length) % images.length)}
                className="flex-1 py-2.5 rounded-xl border border-white/20 text-white/70
                  hover:bg-white/10 hover:text-white text-sm font-medium
                  transition-all duration-150 cursor-pointer"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActive((active + 1) % images.length)}
                className="flex-1 py-2.5 rounded-xl border border-white/20 text-white/70
                  hover:bg-white/10 hover:text-white text-sm font-medium
                  transition-all duration-150 cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}