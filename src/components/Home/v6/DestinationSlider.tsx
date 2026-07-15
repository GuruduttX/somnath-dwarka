"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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

function ChevronIcon({
  dir,
  className = "",
}: {
  dir: "left" | "right";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d={dir === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2"
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
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card
      ? card.getBoundingClientRect().width + 24
      : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        onScroll={syncEdges}
        // overflow-x also clips vertically, so the hover lift + shadow need padding to live in.
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pt-3 pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide) => (
          <li
            key={slide.href}
            className="w-[268px] flex-shrink-0 snap-start sm:w-[300px] lg:w-[calc((100%-72px)/4)]"
          >
            <Link
              href={slide.href}
              className="group relative block h-[380px] overflow-hidden rounded-2xl bg-orange-100 transition-transform duration-500 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 268px, (max-width: 1024px) 300px, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-100 to-orange-100" />
              )}

              {/* Caption bar */}
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 shadow-lg shadow-orange-900/10 transition-all duration-500 ease-out group-hover:from-orange-600 group-hover:to-amber-500">
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-white/90">
                    {slide.eyebrow}
                  </span>
                  <span className="mt-0.5 block truncate text-[15px] font-bold text-white">
                    {slide.title}
                  </span>
                </div>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-orange-500 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Prev / next */}
      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous destinations"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-white text-orange-500 transition-colors duration-300 hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-orange-500"
        >
          <ChevronIcon dir="left" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next destinations"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-white text-orange-500 transition-colors duration-300 hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-orange-500"
        >
          <ChevronIcon dir="right" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
