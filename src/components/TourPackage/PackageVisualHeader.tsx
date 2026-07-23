"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Clock, Sparkles, MapPin, X, ChevronLeft, ChevronRight, ShieldCheck, Star } from "lucide-react";

type PackageImage = { image: string; alt: string };

const FALLBACK_GALLERY: PackageImage[] = [
  {
    image: "/images/home/HomeHero.webp",
    alt: "Somnath Dwarka pilgrimage aarti experience",
  },
  {
    image: "/images/home/DwarikaLongImage.webp",
    alt: "Dwarkadhish Temple in Dwarka",
  },
  {
    image: "/images/home/SomnathLongImage.webp",
    alt: "Somnath Temple on the Gujarat coast",
  },
  {
    image: "/images/CTA.webp",
    alt: "Somnath Dwarka temple tour",
  },
  {
    image: "/images/home/HomeHero.webp",
    alt: "Sacred Gujarat travel experience",
  },
];

function getGalleryImages(pkg: {
  heroImage?: PackageImage | null;
  childImages?: PackageImage[];
  h1: string;
}) {
  const images = [pkg.heroImage, ...(pkg.childImages ?? [])].filter(
    (image): image is PackageImage => Boolean(image?.image),
  );

  const gallery = images.length ? images : FALLBACK_GALLERY;
  return Array.from({ length: 5 }, (_, index) => ({
    ...gallery[index % gallery.length],
    alt: gallery[index % gallery.length].alt || pkg.h1,
  }));
}

// ─── Lightbox Component ───
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Lock page scroll behind the overlay and wire up keyboard control.
  useEffect(() => {
    const { documentElement: html, body } = document;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  // Horizontal swipe to page through images on touch devices. A vertical drag
  // is ignored so the gesture doesn't fight a scroll attempt.
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) next();
    else prev();
  };

  // Rendered into <body>: an ancestor with a transform would otherwise become
  // the containing block and the "fixed" overlay would only cover that section.
  // Safe without a mount guard — the lightbox only ever renders after a click.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col bg-black/95"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors cursor-pointer sm:right-5 sm:top-5"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Stage */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pt-16 pb-3 sm:px-20 sm:pt-20"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Arrows sit outside the image on desktop; mobile pages by swipe. */}
        <button
          aria-label="Previous image"
          className="absolute left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors cursor-pointer sm:flex"
          onClick={(e) => { e.stopPropagation(); prev(); }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Fixed-size frame: the box never resizes between images, so portrait
            and landscape shots letterbox inside it instead of making the
            arrows and counter jump around. */}
        <div className="relative h-full w-full max-w-[900px] overflow-hidden rounded-2xl bg-white/5 shadow-2xl">
          <img
            key={images[current]}
            src={images[current]}
            alt={`Image ${current + 1}`}
            className="absolute inset-0 h-full w-full object-contain select-none"
            draggable={false}
          />
        </div>

        <button
          aria-label="Next image"
          className="absolute right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors cursor-pointer sm:flex"
          onClick={(e) => { e.stopPropagation(); next(); }}
        >
          <ChevronRight size={24} />
        </button>

        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          {current + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="flex shrink-0 justify-start gap-2.5 overflow-x-auto px-4 pb-5 hide-scrollbar sm:justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            aria-label={`Show image ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`
              h-12 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer sm:h-14 sm:w-20
              ${i === current ? "border-orange-500 opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-80"}
            `}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>,
    document.body,
  );
}

// ─── Main PackageVisualHeader Component ───
export default function PackageVisualHeader({
  pkg,
}: {
  pkg: {
    h1: string;
    duration: string;
    price_from: number;
    price_verified: boolean;
    heroImage?: PackageImage | null;
    childImages?: PackageImage[];
  };
}) {
  const gallery = getGalleryImages(pkg);
  const [hero, ...tiles] = gallery;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const imageUrls = gallery.map((item) => item.image);

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          images={imageUrls}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr]">
          
          {/* Main Hero Image Tile */}
          <div 
            className="relative min-h-[330px] overflow-hidden rounded-[20px] bg-stone-100 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:min-h-[430px] lg:min-h-[540px] cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={hero.image}
              alt={hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3 sm:left-7 sm:right-7 sm:top-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-xs font-bold text-[#C24A0A] shadow-sm backdrop-blur-md sm:text-sm">
                <Clock size={15} />
                {pkg.duration}
              </span>
              {pkg.price_from ? (
                <span className="inline-flex rounded-full bg-black/35 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
                  from ₹{pkg.price_from.toLocaleString("en-IN")}
                </span>
              ) : null}
            </div>
            <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              {/* Badge and location line are desktop-only — on a phone the tile
                  is small enough that the heading alone reads best. */}
              <div className="mb-3 hidden items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-100 ring-1 ring-white/20 backdrop-blur-md lg:inline-flex">
                <Sparkles size={13} />
                Curated Package
              </div>
              <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white drop-shadow-sm sm:text-[2.25rem]">
                {pkg.h1}
              </h1>
              <p className="mt-3 hidden items-center gap-2 text-sm font-medium text-white/82 sm:text-base lg:flex">
                <MapPin size={17} />
                Dwarka, Somnath and sacred Gujarat coast
              </p>
            </div>
          </div>

          {/* Sidebar Grid Tiles — desktop only; on mobile the hero tile is the
              single entry point and the rest live in the lightbox. */}
          <div className="hidden gap-3 lg:grid lg:grid-cols-2 lg:grid-rows-2">
            {tiles.slice(0, 4).map((tile, index) => (
              <div
                key={`${tile.image}-${index}`}
                className="group relative min-h-[150px] overflow-hidden rounded-[14px] bg-stone-100 shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:min-h-[190px] lg:min-h-0 cursor-pointer"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 21vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/5 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold leading-snug text-white drop-shadow">
                  {tile.alt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Column Facts Strip */}
        <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
          {[
            { icon: <Clock size={17} />, label: "Duration", value: pkg.duration, shortValue: pkg.duration },
            { icon: <ShieldCheck size={17} />, label: "Private trip", value: "Cab + hotel assistance", shortValue: "Cab + hotel" },
            { icon: <Star size={17} className="fill-orange-400 text-orange-400" />, label: "Included", value: "Hotel, breakfast & vehicle", shortValue: "Stay + meals" },
          ].map((fact, index) => (
            /* Three across at every width — on a phone the icon stacks above the
               text so the columns stay legible instead of squeezing sideways. */
            <div
              key={fact.label}
              className={`flex flex-col items-center gap-1.5 px-2 py-3.5 text-center sm:flex-row sm:gap-3 sm:px-5 sm:py-4 sm:text-left ${
                index ? "border-l border-orange-100" : ""
              }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-50 text-[#E85D04] sm:h-10 sm:w-10">
                {fact.icon}
              </span>
              <span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#C24A0A] sm:text-[10px] sm:tracking-[0.16em]">
                  {fact.label}
                </span>
                {/* Shortened copy keeps each column to a single line on a phone. */}
                <span className="block text-xs font-semibold leading-snug text-slate-800 sm:hidden">
                  {fact.shortValue}
                </span>
                <span className="hidden text-base font-semibold leading-snug text-slate-800 sm:block">
                  {fact.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
