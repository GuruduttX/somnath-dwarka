"use client";

import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CommonEnquiryForm from "./CommanEnquiryForm";
import type { TourPackage } from "./TourData";

export default function PopularTourPackages({ packages }: { packages: TourPackage[] }) {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStart = useRef(0);
  const tripled = [...packages, ...packages, ...packages];

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

    // Start at the middle set so there is room to scroll left AND right
    const setWidth = () => el.scrollWidth / 3;
    el.scrollLeft = setWidth();

    // Seamless boundary reset — fires for both auto-scroll and manual drag/touch
    const onScroll = () => {
      const sw = setWidth();
      if (el.scrollLeft >= sw * 2) el.scrollLeft -= sw;
      else if (el.scrollLeft <= 0) el.scrollLeft += sw;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

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
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ── Pointer drag handlers (mouse only; touch uses native scrolling) ── */
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
    <>
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Tour Package"
      />

      <section
        id="packages"
        className="bg-white pt-6 pb-5 lg:pt-12 lg:pb-8 overflow-hidden "
      >
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 mb-12">
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
                Curated Experiences
              </span>
              <div className="h-px w-8 bg-orange-500" />
            </div>

            <h2
              className={`font-bold text-slate-900 leading-none sm:whitespace-nowrap transition-all duration-700 delay-100 ${
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
                Tour Packages
              </span>
            </h2>
          </div>

          <p
            className={`text-slate-500 text-sm leading-relaxed sm:max-w-[260px] sm:text-right transition-all duration-700 delay-200 ${
              headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            From Dwarka and Somnath to Kevadia and Kutch — journeys built for
            comfort, darshan, and memories.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-linear-to-r from-white to-transparent" />
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-linear-to-l from-white to-transparent" />

        <div
          ref={trackRef}
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto cursor-grab active:cursor-grabbing select-none touch-auto"
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
            {tripled.map((pkg, i) => (
              <PackageCard
                key={`${pkg.id}-${i}`}
                pkg={pkg}
                onGetQuotes={() => setIsFormOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 mt-12 text-center">
        <Link
          href="/somnath-dwarka-tour-package/"
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
    </>
  );
}

function PackageCard({
  pkg,
  onGetQuotes,
}: {
  pkg: TourPackage;
  onGetQuotes: () => void;
}) {
  const nights = Math.max(pkg.days - 1, 0);

  return (
    <Link href={pkg.href}>
    <article
      className="group relative shrink-0 rounded-[24px] cursor-pointer overflow-hidden"
      style={{
        width: "360px",
        height: "440px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[24px]">
        <Image
          src={pkg.images[0]}
          alt={pkg.title}
          fill
          unoptimized
          sizes="360px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Corner ribbon badge */}
        <span
          className="absolute top-0 left-0 z-20 rounded-tl-[24px] rounded-br-[22px] px-6 py-2.5 text-white font-bold text-[1.15rem] leading-none"
          style={{
            background: "linear-gradient(105deg, #F97316 0%, #FBBF24 100%)",
          }}
        >
          {pkg.badge || "Featured"}
        </span>

        {/* Glassmorphic info card */}
        <div
          className="absolute inset-x-3 bottom-3 z-10 rounded-[22px] px-4 py-2.5"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          <h3
            className="text-white font-bold text-[1.2rem] leading-tight mb-1 truncate"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
          >
            {pkg.title}
          </h3>

          <div className="flex items-center gap-4 text-white/90 text-[0.85rem] font-medium mb-2.5">
            <span className="flex items-center gap-1.5">
              <Sun size={16} strokeWidth={2} className="text-white" />
              {pkg.days}days
            </span>
            <span className="flex items-center gap-1.5">
              <Moon size={16} strokeWidth={2} className="text-white" />
              {nights}nights
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span
              className="flex items-baseline gap-1 text-white font-bold text-[1.5rem] leading-none"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
            >
              <span className="text-orange-300">₹</span>
              {pkg.price ? pkg.price.toLocaleString("en-IN") : "—"}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onGetQuotes();
              }}
              className="shrink-0 rounded-full px-5 py-2 text-[0.88rem] font-semibold text-white transition-all duration-200 hover:brightness-105 hover:shadow-lg cursor-pointer"
              style={{
                background: "linear-gradient(105deg, #F59E0B 0%, #FBBF24 100%)",
                boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
              }}
            >
              Enquiry now
            </button>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
}
