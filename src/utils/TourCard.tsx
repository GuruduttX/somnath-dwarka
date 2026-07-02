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

  const packageUrl = `/tour-packages/${pkg.duration}/${pkg?.slug}`;

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

      <div className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">

        {/* ── IMAGE GRID ── */}
        <div className="flex h-[240px] gap-1.5 p-2">

          {/* Big left image */}
          <div
            className="relative flex-[1.7] cursor-pointer overflow-hidden rounded-2xl"
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
            {/* Days badge */}
            <span className="absolute left-3 top-3 rounded-xl bg-white/90 px-3 py-1 text-[12px] font-bold text-gray-800 shadow-sm backdrop-blur-sm">
              {pkg.days} Days
            </span>
            {pkg.badge && (
              <span className="absolute right-3 top-3 rounded-xl bg-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                {pkg.badge}
              </span>
            )}
          </div>

          {/* 2×2 right grid */}
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            {thumbs.map((img, i) => {
              const isLast = i === 3;
              return (
                <div
                  key={i}
                  className="relative cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => openLightbox(i + 1)}
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
                  {isLast && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold text-[13px] hover:bg-black/60 transition-colors"
                    >
                      More +
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CARD BODY ── */}
        <Link href={packageUrl} className="block">
        <div className="px-5 pb-5 pt-4">

          {/* Title */}
          <h3 className="text-[19px] font-bold text-orange-500 leading-snug">
            {pkg.title}
          </h3>

          {/* Meta row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[13px] text-orange-400 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={2} />
              {pkg.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} strokeWidth={2} />
              {pkg.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} strokeWidth={2} />
              {pkg.groupType}
            </span>
          </div>

          {/* Divider */}
          <div className="my-3.5 h-px bg-gray-100" />

          {/* Inclusions */}
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-3">
            {pkg.inclusions.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13.5px] text-gray-700">
                <CheckCircle2
                  size={16}
                  strokeWidth={2}
                  className="flex-shrink-0 text-orange-400"
                />
                {item}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gray-100" />

          {/* Price + CTA */}
        <div className="mt-4 flex gap-3">
          <div
            className="flex-1 rounded-2xl cursor-pointer bg-orange-500 px-6 py-3 text-center text-[14.5px] font-bold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 active:translate-y-0"
          >
            View More
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
            className="min-w-[140px] cursor-pointer rounded-2xl border border-orange-200 bg-white px-6 py-3 text-[14px] font-bold text-orange-500 transition-all duration-200 hover:bg-orange-50"
          >
            Enquire
          </button>
        </div>
        </div>
        </Link>
      </div>
    </>
  );
}