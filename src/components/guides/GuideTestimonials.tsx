"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Quote, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/src/config/testimonials";

/**
 * Traveller testimonials for the guide (blog) pages.
 *
 * A guide page is read cold — the visitor arrived from search with no prior
 * relationship — so the job here is social proof next to the enquiry CTA, not
 * another carousel competing with the home page's. It is deliberately a
 * different shape from `Home/TestimonialCard`: a single featured quote with a
 * peek of the next cards on desktop, and a swipeable rail on mobile.
 *
 * No Review or AggregateRating JSON-LD is emitted here. See the note in
 * src/config/testimonials.ts — this project publishes rating schema only for
 * confirmed, attributable reviews, and these have not been through that gate.
 *
 * Renders nothing when the list is empty, so emptying the config removes the
 * section everywhere rather than leaving a headed but blank band.
 */

const AUTO_MS = 5200;
const RESUME_AFTER_MS = 9000;

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < n ? "fill-amber-400 text-amber-400" : "fill-orange-100 text-orange-100"}
        />
      ))}
    </div>
  );
}

function Avatar({ t, size = 44 }: { t: Testimonial; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-bold ring-2 ring-white"
      style={{
        width: size,
        height: size,
        background: t.bg,
        color: t.color,
        fontSize: size * 0.34,
      }}
      aria-hidden
    >
      {t.initials}
    </span>
  );
}

export default function GuideTestimonials({
  items: itemsProp,
  heading = "What travellers say",
  subheading = "Real journeys planned by our team across the Somnath–Dwarka circuit.",
}: {
  /**
   * This guide's own testimonials, from the CMS. When the guide has none, the
   * shared sitewide list is used so the section is never an empty band — pass
   * an empty array explicitly to opt a page out entirely.
   */
  items?: Testimonial[];
  heading?: string;
  subheading?: string;
}) {
  const items = itemsProp?.length ? itemsProp : itemsProp ? [] : TESTIMONIALS;
  const [active, setActive] = useState(0);

  const pausedRef = useRef(false);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number, fromUser = false) => {
      if (!items.length) return;
      setActive(((next % items.length) + items.length) % items.length);
      if (fromUser) {
        pausedRef.current = true;
        if (resumeRef.current) clearTimeout(resumeRef.current);
        resumeRef.current = setTimeout(() => {
          pausedRef.current = false;
        }, RESUME_AFTER_MS);
      }
    },
    [items.length]
  );

  // Auto-advance, paused for a while after any manual interaction. Respects
  // prefers-reduced-motion: an auto-rotating quote is motion the reader did
  // not ask for, so we simply do not start the timer.
  useEffect(() => {
    if (items.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const id = setInterval(() => {
      if (!pausedRef.current) setActive((p) => (p + 1) % items.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [items.length]);

  useEffect(() => () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }, []);

  // Keep the mobile rail in step with the active index without using
  // scrollIntoView, which would also scroll the page vertically.
  useEffect(() => {
    const rail = railRef.current;
    const card = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
  }, [active]);

  if (!items.length) return null;

  const featured = items[active];

  return (
    <section
      aria-labelledby="guide-testimonials-heading"
      className="mx-auto mt-14 w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16"
    >
      <div className="overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-600">
              <Quote size={12} /> Testimonials
            </span>
            <h2
              id="guide-testimonials-heading"
              className="mt-3 text-[22px] font-bold tracking-tight text-gray-900 sm:text-[26px]"
            >
              {heading}
            </h2>
            <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-gray-600">
              {subheading}
            </p>
          </div>

          {items.length > 1 ? (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => go(active - 1, true)}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-orange-200 bg-white text-orange-600 transition hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1, true)}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-orange-200 bg-white text-orange-600 transition hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          ) : null}
        </div>

        {/* ── Featured quote (all viewports) ── */}
        <figure
          key={featured.id}
          className="mt-7 animate-[gtFade_.45s_cubic-bezier(.22,.7,0,1)] rounded-2xl bg-white p-6 shadow-[0_18px_50px_rgba(234,88,12,0.10)] ring-1 ring-orange-100/80 sm:p-7"
        >
          <style>{`@keyframes gtFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
          <Quote size={26} className="text-orange-200" aria-hidden />
          <blockquote className="mt-3 text-[16px] leading-8 text-gray-700 sm:text-[17px]">
            {featured.review}
          </blockquote>
          <figcaption className="mt-5 flex flex-wrap items-center gap-3 border-t border-orange-50 pt-5">
            <Avatar t={featured} />
            <div className="min-w-0">
              <div className="truncate text-[15px] font-bold text-gray-900">{featured.name}</div>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-orange-400" />
                  {featured.location}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden />
                <span className="font-medium text-orange-600">{featured.destination}</span>
              </div>
            </div>
            <div className="ml-auto">
              <Stars n={featured.rating} />
            </div>
          </figcaption>
        </figure>

        {/* ── Swipeable rail of the rest ── */}
        <div
          ref={railRef}
          className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => go(i, true)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === active}
              className={`w-[240px] shrink-0 snap-start rounded-xl border p-4 text-left transition sm:w-[280px] ${
                i === active
                  ? "border-orange-300 bg-white shadow-sm"
                  : "border-orange-100/70 bg-white/60 hover:border-orange-200 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Avatar t={t} size={32} />
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-bold text-gray-900">{t.name}</div>
                  <div className="truncate text-[11.5px] text-gray-500">{t.destination}</div>
                </div>
              </div>
              <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-gray-600">
                {t.review}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-5">
          <Link
            href="/reviews/"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-700"
          >
            Read more traveller reviews
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
