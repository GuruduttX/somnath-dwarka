"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { destinationCardHref } from "@/src/lib/links";

const PACKAGES = [
  {
    id: 1,
    title: "Gir Lion Safari",
    slug: "gir-lion-safari",
    duration: "3 days · 2 nights",
    originalPrice: "₹19,999",
    price: "₹15,999",
    tag: "Wildlife",
    tagColor: "rgba(217,119,6,0.88)",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop",
    layout: "tall",
  },
  {
    id: 2,
    title: "Rann of Kutch White Desert",
    slug: "rann-of-kutch-white-desert",
    duration: "4 days · 3 nights",
    originalPrice: "₹29,999",
    price: "₹23,999",
    tag: "Seasonal",
    tagColor: "rgba(180,120,20,0.88)",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=700&auto=format&fit=crop",
    layout: "wide",
  },
  {
    id: 3,
    title: "Ahmedabad Old City Walk",
    slug: "ahmedabad-old-city-walk",
    duration: "2 days · 1 night",
    originalPrice: "₹9,999",
    price: "₹7,499",
    tag: "Heritage",
    tagColor: "rgba(99,102,241,0.88)",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=700&auto=format&fit=crop",
    layout: "wide",
  },
  {
    id: 4,
    title: "Statue of Unity Escape",
    slug: "statue-of-unity-escape",
    duration: "3 days · 2 nights",
    originalPrice: "₹18,999",
    price: "₹14,499",
    tag: "Bestseller",
    tagColor: "rgba(249,115,22,0.88)",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?w=500&auto=format&fit=crop",
    layout: "square",
  },
  {
    id: 5,
    title: "Saputara Hill Retreat",
    slug: "saputara-hill-retreat",
    duration: "3 days · 2 nights",
    originalPrice: "₹15,499",
    price: "₹11,999",
    tag: "Nature",
    tagColor: "rgba(16,185,129,0.88)",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop",
    layout: "square",
  },
  {
    id: 6,
    title: "Dwarka Coastal Trail",
    slug: "dwarka-coastal-trail",
    duration: "3 days · 2 nights",
    originalPrice: "₹16,999",
    price: "₹12,999",
    tag: "Coastal",
    tagColor: "rgba(14,165,233,0.88)",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&auto=format&fit=crop",
    layout: "tall",
  },
  {
    id: 7,
    title: "Desert Camp Under the Stars",
    slug: "desert-camp-under-the-stars",
    duration: "2 days · 1 night",
    originalPrice: "₹12,499",
    price: "₹9,999",
    tag: "Camp",
    tagColor: "rgba(168,85,247,0.88)",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&auto=format&fit=crop",
    layout: "banner",
  },
  {
    id: 8,
    title: "Polo Forest Tribal Walk",
    slug: "polo-forest-tribal-walk",
    duration: "2 days · 1 night",
    originalPrice: "₹8,999",
    price: "₹6,999",
    tag: "Forest",
    tagColor: "rgba(34,197,94,0.88)",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&auto=format&fit=crop",
    layout: "banner",
  },
];

type Layout = "tall" | "wide" | "square" | "banner";

// Column height is fixed at 430px so every column lines up top AND bottom with
// no ragged gap. Single-card columns fill the full height; two-card columns each
// take (430 − 16px gap) / 2 = 207px so they sum to the same total.
const CARD_SIZES: Record<Layout, { width: number; height: number }> = {
  tall:   { width: 250, height: 430 },
  wide:   { width: 300, height: 207 },
  square: { width: 250, height: 207 },
  banner: { width: 320, height: 207 },
};

// Group packages into columns: [tall], [wide, wide], [sq, sq], [tall], [banner, banner]
const COLUMNS: (typeof PACKAGES[number])[][] = [
  [PACKAGES[0]],
  [PACKAGES[1], PACKAGES[2]],
  [PACKAGES[3], PACKAGES[4]],
  [PACKAGES[5]],
  [PACKAGES[6], PACKAGES[7]],
];

export default function BeyondTemples() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);

  useEffect(() => {
    const node = headRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setHeadVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Start scroll position in the middle set once scrollWidth is populated
    requestAnimationFrame(() => {
      if (el) el.scrollLeft = el.scrollWidth / 3;
    });

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    let last = 0;
    const SPEED = 38;
    const tick = (now: number) => {
      const dt = Math.min(last ? (now - last) / 1000 : 0, 0.05);
      last = now;
      if (!isDragging.current) {
        if (!prefersReduced && !isPaused.current) {
          el.scrollLeft += SPEED * dt;
        }
      }

      const sWidth = el.scrollWidth / 3;
      if (sWidth > 0) {
        if (el.scrollLeft >= sWidth * 2) {
          el.scrollLeft -= sWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += sWidth;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch/pen devices scroll the track natively (touch-action: auto),
    // so JS drag is limited to mouse to avoid hijacking native momentum.
    if (e.pointerType !== "mouse") return;
    if (e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    isPaused.current = true;
    dragStartX.current = e.clientX;
    dragScrollStart.current = el.scrollLeft;
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!isDragging.current || !el) return;
    el.scrollLeft = dragScrollStart.current + (dragStartX.current - e.clientX);
  };

  const stopDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (e && el?.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture?.(e.pointerId);
    isDragging.current = false;
    isPaused.current = false;
  };

  return (
    <>
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Tour Package"
      />
    <section id="beyond-temples" className="bg-white pt-10 pb-5 lg:pt-14 lg:pb-8 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        <div ref={headRef}>
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-2.5 mb-3 transition-all duration-700 ${
              headVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            <div className="h-px w-7 bg-orange-500" />
            <span className="text-orange-600 text-[0.62rem] font-semibold tracking-[0.26em] uppercase">
              Beyond Temples
            </span>
            <div className="h-px w-7 bg-orange-500" />
          </div>

          {/* Title */}
          <h2
            className={`font-bold text-slate-900 leading-tight transition-all duration-700 delay-100 ${
              headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}
          >
            Gujarat&apos;s{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #EA580C 0%, #F97316 50%, #FB923C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Untold Escapes
            </span>
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={trackRef}
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto cursor-grab active:cursor-grabbing select-none touch-auto"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onPointerLeave={stopDrag}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          <div className="flex gap-4 w-max pb-4 pl-6 lg:pl-12 pr-6 items-start">
            {Array.from({ length: 3 }).flatMap((_, loopIdx) =>
              COLUMNS.map((col, ci) => (
                <div key={`${loopIdx}-${ci}`} className="flex flex-col gap-4">
                  {col.map((pkg) => (
                    <PackageCard
                      key={`${loopIdx}-${pkg.id}`}
                      pkg={pkg}
                      onEnquire={() => setIsFormOpen(true)}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10 text-center">
        <Link
          href="/somnath-dwarka-tour-package/"
          className="inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(120deg, #EA580C 0%, #F97316 100%)",
            boxShadow: "0 4px 20px rgba(249,115,22,0.32)",
          }}
        >
          View All Packages
          <span>→</span>
        </Link>
      </div>
    </section>
    </>
  );
}

function PackageCard({
  pkg,
  onEnquire,
}: {
  pkg: (typeof PACKAGES)[number];
  onEnquire: () => void;
}) {
  const { width, height } = CARD_SIZES[pkg.layout as Layout];

  return (
    <Link href={destinationCardHref(pkg.slug)}>
      <article
        className="group relative shrink-0 rounded-[20px] overflow-hidden cursor-pointer ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1"
        style={{
          width,
          height,
          boxShadow: "0 6px 18px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
      <Image
        src={pkg.image}
        alt={pkg.title}
        fill
        unoptimized
        sizes={`${width}px`}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />

      {/* Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="text-white text-[0.6rem] font-semibold tracking-wide px-2.5 py-1 rounded-full ring-1 ring-white/25"
          style={{
            background: pkg.tagColor,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {pkg.tag}
        </span>
      </div>

      {/* Info */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-3.5 pb-3 pt-2">
        <h3 className="text-white font-bold text-[0.9rem] leading-tight truncate">
          {pkg.title}
        </h3>
        <p className="text-white/55 text-[0.65rem] mt-0.5 mb-1.5">{pkg.duration}</p>

        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex items-baseline gap-1.5">
            <span className="text-white font-extrabold text-[1.1rem] leading-none">
              {pkg.price}
            </span>
            <span className="text-white/40 text-[0.6rem] line-through leading-none">
              {pkg.originalPrice}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEnquire();
            }}
            className="shrink-0 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.65rem] font-bold text-slate-900 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md active:scale-95 cursor-pointer"
          >
            Quote
          </button>
        </div>
      </div>
      </article>
    </Link>
  );
}