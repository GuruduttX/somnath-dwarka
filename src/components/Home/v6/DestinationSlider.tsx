"use client";

import Image from "next/image";
import Link from "next/link";

export type DestinationSlide = {
  href: string;
  title: string;
  /** Small line above the title, e.g. "Shakti Peeth". */
  eyebrow: string;
  image?: string;
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DestinationSlider({
  slides,
}: {
  slides: DestinationSlide[];
}) {
  return (
    <div className="relative">
      <ul
        // overflow-x also clips vertically, so the hover lift + shadow need padding to live in.
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pt-3 pb-5 sm:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide) => (
          <li
            key={slide.href}
            className="w-[240px] flex-shrink-0 snap-start sm:w-[300px] lg:w-[calc((100%-72px)/4)]"
          >
            <Link
              href={slide.href}
              className="group relative block h-[250px] overflow-hidden rounded-2xl bg-orange-100 transition-transform duration-500 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:h-[320px] lg:h-[380px]"
            >
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-100 to-orange-100" />
              )}

              {/* A scrim reading straight off the photo, rather than the solid
                  orange slab that used to sit on top of it — it costs no card
                  height, which is what let the card shrink on mobile. */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute inset-x-3 bottom-3 flex items-end gap-2.5 sm:inset-x-4 sm:bottom-4">
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-[10px] font-bold uppercase tracking-[0.14em] text-orange-300">
                    {slide.eyebrow}
                  </span>
                  <span className="mt-1 block truncate text-[15px] font-bold leading-snug text-white sm:text-base">
                    {slide.title}
                  </span>
                </div>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition-all duration-500 ease-out group-hover:bg-white group-hover:text-orange-600 sm:h-9 sm:w-9">
                  <ArrowIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
