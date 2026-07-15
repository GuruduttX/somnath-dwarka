"use client";

import Image from "next/image";
import Link from "next/link";
import type { CarouselCard } from "@/src/utils/TourData";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CloudSun,
  ArrowUpRight,
  BedDouble,
  Coffee,
  Eye,
  Car,
} from "lucide-react";
import { useRef, useState } from "react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";


const inclusions = [
  { key: "isStayIncluded", label: "Stay", Icon: BedDouble },
  { key: "isBreakfastIncluded", label: "Breakfast", Icon: Coffee },
  { key: "isSightseeingIncluded", label: "Sightseeing", Icon: Eye },
  { key: "isTransferIncluded", label: "Transfer", Icon: Car },
] as const;

export default function SomnathTourPackage({ packages }: { packages: CarouselCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.2;
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <>
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Tour Package"
      />
    <section id="somnath-packages" className="relative bg-white pt-8 pb-6 md:pt-10 md:pb-20 overflow-hidden">

      <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24">

        {/* HEADER */}
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700 shadow-sm">
              <MapPin size={13} />
              Sacred Somnath Tours
            </div>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.05]">
              Popular Somnath
              <br />
              <span className="text-orange-500">Tour Packages</span>
            </h2>

            <p className="mt-5 max-w-2xl text-[15px] md:text-[17px] leading-8 text-slate-600">
              Discover divine temples, sacred coastlines and premium
              spiritual experiences across Somnath with our handpicked journeys.
            </p>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              className="h-12 w-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-slate-700 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-all duration-300 shadow-[0_10px_30px_rgba(249,115,22,0.25)]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* SCROLL TRACK */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className={`flex gap-5 overflow-x-auto scroll-smooth  hide-scrollbar snap-x snap-mandatory pb-4 no-scrollbar select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {packages.map((pkg) => {
            const [firstWord, ...restWords] = pkg.title.split(" ");
            const restTitle = restWords.join(" ");
            return (
              <Link
                key={pkg.id}
                href={pkg.href}
                draggable={false}
                className="group relative shrink-0 w-[320px] md:w-[360px] rounded-[26px] overflow-hidden bg-white border border-stone-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(234,88,12,0.14)] snap-start"
              >
                {/* IMAGE */}
                <div className="p-2.5">
                  <div className="relative h-[200px] overflow-hidden rounded-[20px]">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-[1800ms] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

                    {/* LOCATION PILL */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-white text-[12.5px] font-semibold shadow-md"
                        style={{ background: "linear-gradient(105deg, #F97316 0%, #FB923C 100%)" }}
                      >
                        <MapPin size={13} strokeWidth={2.5} />
                        {pkg.destination}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="px-4 pt-1.5 pb-3 flex flex-col gap-3.5 flex-1">

                  {/* TITLE */}
                  <h3 className="text-[22px] font-extrabold leading-tight tracking-tight min-h-[2.5em] line-clamp-2">
                    <span className="text-slate-900">{firstWord} </span>
                    <span className="text-orange-500">{restTitle}</span>
                  </h3>

                  {/* CATEGORY + DURATION */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] font-semibold px-3.5 py-2 rounded-xl text-orange-500 border border-orange-200">
                      {pkg.category}
                    </span>
                    <div className="flex items-center gap-2 text-slate-700 text-[14px] font-semibold">
                      <CloudSun size={20} className="text-orange-400" />
                      {pkg.days}days / {pkg.nights} nights
                    </div>
                  </div>

                  {/* INCLUSIONS */}
                  <div className="flex items-center gap-2 px-3 py-3 rounded-2xl border border-orange-100 bg-orange-50/40">
                    {inclusions.map(({ key, label, Icon }) => {
                      const active = Boolean(pkg[key as keyof CarouselCard]);
                      return (
                        <div
                          key={key}
                          className={`flex flex-col items-center gap-1.5 flex-1 transition-colors ${
                            active ? "text-orange-500" : "text-stone-300"
                          }`}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                          <span className={`text-[11.5px] font-medium ${active ? "text-slate-700" : "text-stone-300"}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-stretch mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsFormOpen(true);
                    }}
                    className="flex-1 py-4 text-[15px] font-semibold text-slate-800 bg-orange-50/60 hover:bg-orange-100/70 transition-all duration-200 cursor-pointer"
                  >
                    Enquire now
                  </button>
                  <div
                    className="flex-1 py-4 text-white text-[15px] font-bold text-center flex items-center justify-center gap-1.5 transition-all duration-200"
                    style={{ background: "linear-gradient(105deg, #F97316 0%, #FBBF24 100%)" }}
                  >
                    View Tour
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* MOBILE BUTTONS */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-4">
          <button
            onClick={() => scroll("left")}
            className="h-11 w-11 rounded-full bg-white border border-stone-200 flex items-center justify-center text-slate-700 shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-11 w-11 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(249,115,22,0.3)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
    </>
  );
}