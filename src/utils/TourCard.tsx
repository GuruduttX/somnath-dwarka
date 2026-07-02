"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowUpRight,
} from "lucide-react";
import type { TourPackage } from "./TourData";
import CommonEnquiryForm from "./CommanEnquiryForm";
import Link from "next/link";

// ─── Lightbox ────────────────────────────────────────────────────────────────
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        className="absolute left-5 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
        onClick={(e) => { e.stopPropagation(); prev(); }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Main image */}
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

      {/* Next */}
      <button
        className="absolute right-5 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
        onClick={(e) => { e.stopPropagation(); next(); }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Thumbnails */}
      <div
        className="mt-5 flex gap-2.5 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`
              h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200
              ${i === current ? "border-orange-400 opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-80"}
            `}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Tour Card ───────────────────────────────────────────────────────────────
export default function TourCard({ pkg }: { pkg: TourPackage }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const packageUrl = pkg.href;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // images[0] = big left, images[1..4] = 2×2 grid right
  const [main, ...thumbs] = pkg.images;

  return (
    <>
     <CommonEnquiryForm open={open} onClose={()=>setOpen(false)}/>
      
      {lightboxOpen && (
        <Lightbox
          images={pkg.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div className="group overflow-hidden rounded-[28px] border border-orange-100/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]">

        {/* ── IMAGE GRID ── */}
        <div className="relative p-3">

          {/* Big left image */}
          <div
            className="relative h-[200px] cursor-pointer overflow-hidden rounded-[22px] bg-gray-100 sm:h-[220px]"
            onClick={() => openLightbox(0)}
          >
            <img
              src={main}
              alt={pkg.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=70";
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/15" />
            {/* Days badge */}
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-gray-900 shadow-sm backdrop-blur-sm">
              {pkg.days} {pkg.days === 1 ? "Day" : "Days"}
            </span>
            {pkg.badge && (
              <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-sm">
                {pkg.badge}
              </span>
            )}

            {pkg.rating ? (
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-gray-900 shadow-sm backdrop-blur-sm">
                <Star size={13} className="fill-orange-400 text-orange-400" />
                {pkg.rating.toFixed(1)}
                {pkg.reviews ? <span className="font-semibold text-gray-500">({pkg.reviews})</span> : null}
              </span>
            ) : null}
          </div>

          {/* Compact thumbnails */}
          <div className="absolute bottom-5 right-5 hidden gap-2 sm:flex">
            {thumbs.slice(0, 3).map((img, i) => (
              <button
                key={i}
                className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-xl border-2 border-white bg-gray-100 shadow-lg"
                onClick={() => openLightbox(i + 1)}
                aria-label={`Open ${pkg.title} image ${i + 2}`}
              >
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=300&q=70";
                  }}
                />
                {i === 2 && (
                  <span className="absolute inset-0 grid place-items-center bg-black/45 text-[11px] font-bold text-white">
                    More
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── CARD BODY ── */}
        <Link href={packageUrl} className="block">
        <div className="px-5 pb-5 pt-1">

          {/* Title */}
          <h3 className="text-[19px] font-bold leading-snug text-gray-950 sm:text-[20px]">
            {pkg.title}
          </h3>

          {/* Meta row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[12.5px] font-semibold text-gray-600">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={2.2} className="text-orange-500" />
              {pkg.location}
            </span>
            <span className="h-1 w-1 rounded-full bg-orange-300" />
            <span className="flex items-center gap-1.5">
              <Clock size={14} strokeWidth={2.2} className="text-orange-500" />
              {pkg.duration}
            </span>
            <span className="h-1 w-1 rounded-full bg-orange-300" />
            <span className="flex items-center gap-1.5">
              <Users size={14} strokeWidth={2.2} className="text-orange-500" />
              {pkg.groupType}
            </span>
          </div>

          {pkg.overview ? (
            <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-gray-500">
              {pkg.overview}
            </p>
          ) : null}

          {/* Divider */}
          <div className="my-3 h-px bg-gray-100" />

          {/* Inclusions */}
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {(pkg.inclusions.length ? pkg.inclusions : ["Private trip planning", "Flexible itinerary"]).map((item) => (
              <div key={item} className="flex min-w-0 items-center gap-2 text-[13px] font-medium text-gray-700">
                <CheckCircle2
                  size={16}
                  strokeWidth={2}
                  className="flex-shrink-0 text-emerald-500"
                />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gray-100" />

          {/* Price + CTA */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              Starts from
            </span>
            <span className="text-[23px] font-extrabold text-gray-950">
              {pkg.price ? `₹${pkg.price.toLocaleString("en-IN")}` : "Custom"}
            </span>
          </div>
          <div className="flex gap-2">
          <div
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-orange-500 px-5 text-center text-[14px] font-bold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg active:translate-y-0"
          >
            View
            <ArrowUpRight size={16} />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
            className="h-11 min-w-[112px] cursor-pointer rounded-full border border-orange-200 bg-white px-5 text-[14px] font-bold text-orange-600 transition-all duration-200 hover:bg-orange-50"
          >
            Enquire
          </button>
          </div>
        </div>
        </div>
        </Link>
      </div>
    </>
  );
}
