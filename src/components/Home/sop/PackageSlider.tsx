"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, MapPin, Shuffle } from "lucide-react";
import { inr } from "@/src/config/homePage";

export type SliderPackage = {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  href: string;
  badge?: string;
};

/** How many cards the rail shows at once — keeps the home DOM small. */
const SHOWN = 10;

const IMG_FALLBACK = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=70";

function shuffled<T>(list: T[]) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function SlideImage({ src, alt }: { src: string; alt: string }) {
  const [current, setCurrent] = useState(src || IMG_FALLBACK);
  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes="(max-width: 640px) 78vw, 300px"
      loading="lazy"
      className="object-cover transition-transform duration-700 group-hover:scale-110"
      onError={() => current !== IMG_FALLBACK && setCurrent(IMG_FALLBACK)}
    />
  );
}

/**
 * Full-width rail of published packages in a random order.
 *
 * The server renders the first SHOWN packages in their stored order (so the
 * HTML is deterministic and hydration matches); the random pick happens after
 * mount, and again on "Shuffle". The rail only ever moves on a user action —
 * no scroll on mount and no scroll-snap — because a carousel that scrolls
 * during load makes the browser finalise LCP early (PSI "NO_LCP").
 */
export default function PackageSlider({ packages }: { packages: SliderPackage[] }) {
  const [items, setItems] = useState(() => packages.slice(0, SHOWN));
  const railRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState({ start: 0, size: 1, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress({
      start: max > 0 ? (el.scrollLeft / el.scrollWidth) * 100 : 0,
      size: el.scrollWidth ? (el.clientWidth / el.scrollWidth) * 100 : 100,
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
    });
  }, []);

  const reshuffle = useCallback(() => setItems(shuffled(packages).slice(0, SHOWN)), [packages]);

  // Random pick once mounted (deferred a frame so it is not a synchronous
  // state update inside the effect), plus sizing for the progress bar.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      reshuffle();
      measure();
    });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [reshuffle, measure]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const by = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * by * (el.clientWidth > 900 ? 2 : 1), behavior: "smooth" });
  };

  const onShuffle = () => {
    reshuffle();
    const el = railRef.current;
    if (el && el.scrollLeft > 0) el.scrollTo({ left: 0, behavior: "smooth" });
  };

  if (!packages.length) return null;

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-orange-200 bg-white text-orange-700 transition hover:border-orange-400 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section id="more-packages" aria-labelledby="more-packages-h" className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">Handpicked for you</p>
          <h2 id="more-packages-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
            More tour packages to explore
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">
            A fresh mix of our published packages every visit. Shuffle for another set.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShuffle}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-orange-200 bg-white px-4 text-[13.5px] font-semibold text-orange-700 transition hover:border-orange-400 hover:bg-orange-50"
          >
            <Shuffle size={15} aria-hidden="true" /> Shuffle
          </button>
          <button type="button" onClick={() => step(-1)} disabled={progress.atStart} aria-label="Previous packages" className={btn}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={progress.atEnd} aria-label="Next packages" className={btn}>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* The rail bleeds to the screen edges; its padding keeps the first card aligned with the heading. */}
      <ul
        ref={railRef}
        onScroll={measure}
        className="-mx-4 mt-7 flex gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 pt-1 sm:-mx-8 sm:px-8 lg:-mx-16 lg:px-16 xl:-mx-24 xl:px-24 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <li key={p.id} className="w-[78vw] max-w-[290px] shrink-0 sm:w-[290px]">
            <Link
              href={p.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_14px_36px_rgba(234,88,12,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-orange-50">
                <SlideImage src={p.image} alt={p.title} />
                <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                  {p.duration ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11.5px] font-semibold text-[#2D1B10] shadow-sm">
                      <Clock size={12} className="text-orange-600" aria-hidden="true" /> {p.duration}
                    </span>
                  ) : (
                    <span />
                  )}
                  {p.badge ? (
                    <span className="rounded-full bg-orange-600 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-white shadow-sm">
                      {p.badge}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                {p.location ? (
                  <p className="flex items-center gap-1 truncate text-[12px] font-medium text-slate-500">
                    <MapPin size={12} className="shrink-0 text-orange-500" aria-hidden="true" /> {p.location}
                  </p>
                ) : null}
                <h3 className="mb-3 mt-1.5 line-clamp-2 text-[16px] font-bold leading-snug text-[#2D1B10] group-hover:text-orange-700">
                  {p.title}
                </h3>
                <div className="mt-auto flex items-end justify-between border-t border-orange-100 pt-3">
                  {p.price > 0 ? (
                    <span>
                      <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">From</span>
                      <span className="text-[18px] font-extrabold leading-none text-orange-600">Rs {inr(p.price)}</span>
                    </span>
                  ) : (
                    <span className="text-[14px] font-semibold text-orange-700">Ask for price</span>
                  )}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Scroll position indicator. */}
      <div className="relative mt-5 h-1 w-full overflow-hidden rounded-full bg-orange-100" aria-hidden="true">
        <div
          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-[left,width] duration-200"
          style={{ left: `${progress.start}%`, width: `${Math.max(progress.size, 8)}%` }}
        />
      </div>
    </section>
  );
}
