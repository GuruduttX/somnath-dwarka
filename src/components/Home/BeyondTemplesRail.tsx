"use client";

import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const CommonEnquiryForm = dynamic(() => import("@/src/utils/CommanEnquiryForm"), { ssr: false });

/** Pointer travel (px) that separates a click on a card from a drag of the rail. */
const DRAG_SLOP = 5;

export type Layout = "tall" | "wide" | "square" | "banner";

export type RailCard = {
  id: string;
  title: string;
  href: string;
  duration: string;
  price: string;
  tag: string;
  tagColor: string;
  image: string;
  layout: Layout;
};

// Column height is fixed at 430px so every column lines up top AND bottom with
// no ragged gap. Single-card columns fill the full height; two-card columns each
// take (430 − 16px gap) / 2 = 207px so they sum to the same total.
const CARD_SIZES: Record<Layout, { width: number; height: number }> = {
  tall:   { width: 250, height: 430 },
  wide:   { width: 300, height: 207 },
  square: { width: 250, height: 207 },
  banner: { width: 320, height: 207 },
};

/** Groups the flat card list back into the marquee's column rhythm:
 *  [tall], [wide, wide], [square, square], [tall], [banner, banner]. */
function toColumns(cards: RailCard[]): RailCard[][] {
  const cols: RailCard[][] = [];
  let i = 0;
  while (i < cards.length) {
    const take = cards[i].layout === "tall" ? 1 : 2;
    cols.push(cards.slice(i, i + take));
    i += take;
  }
  return cols;
}

export default function BeyondTemplesRail({ cards }: { cards: RailCard[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isPaused = useRef(false);
  const isPointerDown = useRef(false);
  const isDragging = useRef(false);
  const suppressClick = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);

  const columns = toColumns(cards);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

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

    // Defer the initial centering and the auto-scroll loop until the rail is
    // on-screen. Setting scrollLeft emits a `scroll` event, and the browser
    // finalizes LCP on the first scroll of *any* scroller — so this off-screen
    // marquee scrolling during load was destroying the page's LCP candidate
    // (Lighthouse/PSI reported NO_LCP). Gating on visibility also stops the rAF
    // loop from running while the rail is off-screen.
    let positioned = false;
    const startAnim = () => {
      if (!positioned) {
        el.scrollLeft = el.scrollWidth / 3; // center on the middle set, once
        positioned = true;
      }
      cancelAnimationFrame(rafRef.current);
      last = 0;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stopAnim = () => cancelAnimationFrame(rafRef.current);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startAnim() : stopAnim()),
      { threshold: 0 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch/pen devices scroll the track natively (touch-action: auto),
    // so JS drag is limited to mouse to avoid hijacking native momentum.
    if (e.pointerType !== "mouse") return;
    if (e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    // Arm a possible drag, but do NOT capture the pointer yet: capturing here
    // retargets the eventual `click` to this container, which would swallow
    // every card link. Capture only once the pointer actually moves (below).
    isPointerDown.current = true;
    isDragging.current = false;
    // A drag that ended off-track may have left this set with no click to spend
    // it on; clearing per interaction stops that from eating the next click.
    suppressClick.current = false;
    isPaused.current = true;
    dragStartX.current = e.clientX;
    dragScrollStart.current = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!isPointerDown.current || !el) return;

    const dx = dragStartX.current - e.clientX;
    // Past the slop threshold this is a drag, not a click: take the pointer so
    // the gesture keeps working outside the track, and remember to suppress the
    // trailing click so a drag never navigates.
    if (!isDragging.current) {
      if (Math.abs(dx) < DRAG_SLOP) return;
      isDragging.current = true;
      suppressClick.current = true;
      el.setPointerCapture?.(e.pointerId);
    }
    el.scrollLeft = dragScrollStart.current + dx;
  };

  const stopDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (e && el?.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture?.(e.pointerId);
    isPointerDown.current = false;
    isDragging.current = false;
    isPaused.current = false;
  };

  // Runs before the link's own handler, so a click that ended a drag is
  // cancelled while a plain click passes straight through to the card.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Tour Package"
      />

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
          onClickCapture={onClickCapture}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          <div className="flex gap-4 w-max pb-4 pl-6 lg:pl-12 pr-6 items-start">
            {Array.from({ length: 3 }).flatMap((_, loopIdx) =>
              columns.map((col, ci) => (
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
    </>
  );
}

function PackageCard({
  pkg,
  onEnquire,
}: {
  pkg: RailCard;
  onEnquire: () => void;
}) {
  const { width, height } = CARD_SIZES[pkg.layout];

  return (
    <Link href={pkg.href}>
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
          <div className="min-w-0 flex items-baseline gap-1">
            <span className="text-white/50 text-[0.6rem] leading-none">from</span>
            <span className="text-white font-extrabold text-[1.1rem] leading-none">
              {pkg.price}
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
