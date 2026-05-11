"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CAROUSEL_PACKAGES = [
  {
    id: 1,
    title: "Statue of Unity Escape",
    duration: "3 days & 2 nights",
    originalPrice: "₹18,999",
    price: "₹14,499",
    tag: "Bestseller",
    tagBg: "rgba(249,115,22,0.92)",
    image:
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Gir National Park Safari",
    duration: "3 days & 2 nights",
    originalPrice: "₹19,999",
    price: "₹15,999",
    tag: "Wildlife",
    tagBg: "rgba(217,119,6,0.92)",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Rann of Kutch Experience",
    duration: "4 days & 3 nights",
    originalPrice: "₹29,999",
    price: "₹23,999",
    tag: "Seasonal",
    tagBg: "rgba(253,186,116,0.92)",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Saputara Hill Retreat",
    duration: "3 days & 2 nights",
    originalPrice: "₹15,499",
    price: "₹11,999",
    tag: "Nature",
    tagBg: "rgba(16,185,129,0.92)",
    image:
      "https://images.unsplash.com/photo-1590050752117-23a9d7fc2af7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Heritage Ahmedabad Tour",
    duration: "2 days & 1 night",
    originalPrice: "₹9,999",
    price: "₹7,499",
    tag: "Heritage",
    tagBg: "rgba(99,102,241,0.92)",
    image:
      "https://images.unsplash.com/photo-1605368361254-21015f8a0058?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function BeyondTemples() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStart = useRef(0);

  useEffect(() => {
    const node = headRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHeadVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Time-based auto-scroll (frame-rate independent)
    let last = 0;
    const SPEED = 40; // px/s
    const tick = (now: number) => {
      const rawDt = last ? (now - last) / 1000 : 0;
      const dt = Math.min(rawDt, 0.05); // clamp to avoid jumps after tab-switch
      last = now;

      if (!prefersReducedMotion && !isPaused.current) el.scrollLeft += SPEED * dt;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Pointer drag handlers (mouse + touch) ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;

    isDragging.current = true;
    isPaused.current = true;
    dragStartX.current = e.clientX;
    dragStart.current = el.scrollLeft;

    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!isDragging.current || !el) return;
    el.scrollLeft = dragStart.current + (dragStartX.current - e.clientX);
  };

  const stopDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (e && el?.hasPointerCapture?.(e.pointerId)) {
      el.releasePointerCapture?.(e.pointerId);
    }
    isDragging.current = false;
    isPaused.current = false;
  };

  return (
    <section
      id="packages"
      className="pt-28 pb-5 lg:pt-36 lg:pb-8 overflow-hidden "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div
          ref={headRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
        >
          <div>
            <div
              className={`flex items-center gap-2.5 mb-3 transition-all duration-700 ${
                headVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
              }`}
            >
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-600 text-[0.68rem] font-semibold tracking-[0.28em] uppercase">
                Beyond the Divine
              </span>
              <div className="h-px w-8 bg-orange-500" />
            </div>

            <h2
              className={`font-bold text-slate-900 leading-tight transition-all duration-700 delay-100 ${
                headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)" }}
            >
              Our Signature{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #EA580C 0%, #F97316 45%, #FDBA74 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Gujarat Experiences
              </span>
            </h2>
          </div>

          <p
            className={`text-slate-500 text-sm leading-relaxed sm:max-w-[260px] sm:text-right transition-all duration-700 delay-200 ${
              headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Explore Gujarat's majestic wildlife, pristine hill stations, and
            world-class heritage landmarks beyond the temple trails.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-linear-to-r from-orange-50 to-transparent" />
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-linear-to-l from-orange-50 to-transparent" />

        <div
          ref={trackRef}
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onPointerLeave={stopDrag}
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
        >
          <div className="flex gap-6 w-max pb-4 pl-6 lg:pl-12 pr-6">
            {CAROUSEL_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 text-center">
        <Link
          href="/tour-packages"
          className="inline-flex items-center gap-2.5 rounded-full px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(120deg, #EA580C 0%, #F97316 100%)",
            boxShadow: "0 4px 22px rgba(249,115,22,0.35)",
          }}
        >
          View All Packages
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
}: {
  pkg: (typeof CAROUSEL_PACKAGES)[number];
}) {
  return (
    <article
      className="group relative shrink-0 rounded-3xl overflow-hidden cursor-pointer"
      style={{
        width: "340px",
        height: "500px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
      }}
    >
      <Image
        src={pkg.image}
        alt={pkg.title}
        fill
        unoptimized
        sizes="340px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute top-4 left-4 z-10">
        <span
          className="text-white text-[0.62rem] font-semibold px-3 py-1 rounded-full"
          style={{
            background: pkg.tagBg,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {pkg.tag}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <h3 className="text-white font-bold text-[1.02rem] leading-snug mb-0.5 truncate">
          {pkg.title}
        </h3>
        <p className="text-white/55 text-[0.7rem] mb-3">{pkg.duration}</p>

        <div className="mb-3 h-px bg-white/15" />

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-white/45 text-[0.65rem] line-through block leading-none">
              {pkg.originalPrice}
            </span>
            <span className="text-white font-bold text-[1.22rem] leading-tight">
              {pkg.price}
            </span>
          </div>

          <button className="shrink-0 rounded-full bg-white px-4 py-2 text-[0.72rem] font-semibold text-slate-900 transition-all duration-200 hover:bg-orange-50 hover:shadow-md">
            Get Quotes
          </button>
        </div>
      </div>
    </article>
  );
}
