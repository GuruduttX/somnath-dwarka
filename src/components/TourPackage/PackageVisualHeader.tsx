"use client";

import { useState } from "react";
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

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors cursor-pointer"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Prev Button */}
      <button
        className="absolute left-5 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors cursor-pointer"
        onClick={(e) => { e.stopPropagation(); prev(); }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Main Image */}
      <div
        className="relative mx-auto max-h-[70vh] max-w-[780px] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt={`Image ${current + 1}`}
          className="h-full w-full max-h-[70vh] rounded-2xl object-cover shadow-2xl"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          {current + 1}/{images.length}
        </div>
      </div>

      {/* Next Button */}
      <button
        className="absolute right-5 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors cursor-pointer"
        onClick={(e) => { e.stopPropagation(); next(); }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Thumbnails */}
      <div
        className="mt-5 flex gap-2.5 px-4 overflow-x-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`
              h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer
              ${i === current ? "border-orange-500 opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-80"}
            `}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
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
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-100 ring-1 ring-white/20 backdrop-blur-md">
                <Sparkles size={13} />
                Curated Package
              </div>
              <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white drop-shadow-sm sm:text-[2.25rem]">
                {pkg.h1}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-white/82 sm:text-base">
                <MapPin size={17} />
                Dwarka, Somnath and sacred Gujarat coast
              </p>
            </div>
          </div>

          {/* Sidebar Grid Tiles */}
          <div className="grid grid-cols-2 gap-3 lg:grid-rows-2">
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
        <div className="mt-4 grid overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm sm:grid-cols-3">
          {[
            { icon: <Clock size={17} />, label: "Duration", value: pkg.duration },
            { icon: <ShieldCheck size={17} />, label: "Private trip", value: "Cab + hotel assistance" },
            { icon: <Star size={17} className="fill-orange-400 text-orange-400" />, label: "Included", value: "Hotel, breakfast & vehicle" },
          ].map((fact, index) => (
            <div
              key={fact.label}
              className={`flex items-center gap-3 px-5 py-4 ${
                index ? "border-t border-orange-100 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-[#E85D04]">
                {fact.icon}
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#C24A0A]">
                  {fact.label}
                </span>
                <span className="block text-sm font-semibold text-slate-800 sm:text-base">{fact.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
