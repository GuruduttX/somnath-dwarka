"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Users,
  BedDouble,
  Coffee,
  Eye,
  Car,
} from "lucide-react";
import { useRef, useState } from "react";

const packages = [
  {
    id: 1,
    title: "Dwarka Divine Escape",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1600&auto=format&fit=crop",
    destination: "Dwarka, Gujarat",
    days: 4,
    nights: 3,
    rating: 4.9,
    reviews: 128,
    price: "₹12,999",
    originalPrice: 15999,
    priceNum: 12999,
    category: "Spiritual",
    slug: "dwarka-divine-escape",
    isStayIncluded: true,
    isBreakfastIncluded: true,
    isSightseeingIncluded: true,
    isTransferIncluded: false,
  },
  {
    id: 2,
    title: "Dwarkadhish Temple Yatra",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1600&auto=format&fit=crop",
    destination: "Dwarka, Gujarat",
    days: 3,
    nights: 2,
    rating: 4.8,
    reviews: 96,
    price: "₹10,499",
    originalPrice: 13999,
    priceNum: 10499,
    category: "Pilgrimage",
    slug: "dwarkadhish-temple-yatra",
    isStayIncluded: true,
    isBreakfastIncluded: false,
    isSightseeingIncluded: true,
    isTransferIncluded: true,
  },
  {
    id: 3,
    title: "Dwarka Premium Sacred Tour",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    destination: "Dwarka, Gujarat",
    days: 6,
    nights: 5,
    rating: 5.0,
    reviews: 214,
    price: "₹18,999",
    originalPrice: 24999,
    priceNum: 18999,
    category: "Premium",
    slug: "dwarka-premium-sacred-tour",
    isStayIncluded: true,
    isBreakfastIncluded: true,
    isSightseeingIncluded: true,
    isTransferIncluded: true,
  },
  {
    id: 4,
    title: "Bet Dwarka Spiritual Journey",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop",
    destination: "Bet Dwarka, Gujarat",
    days: 2,
    nights: 1,
    rating: 4.7,
    reviews: 73,
    price: "₹7,999",
    originalPrice: 9999,
    priceNum: 7999,
    category: "Weekend",
    slug: "bet-dwarka-spiritual-journey",
    isStayIncluded: true,
    isBreakfastIncluded: false,
    isSightseeingIncluded: true,
    isTransferIncluded: true,
  },
  {
    id: 5,
    title: "Dwarka Coastal Darshan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
    destination: "Dwarka, Gujarat",
    days: 5,
    nights: 4,
    rating: 4.9,
    reviews: 157,
    price: "₹15,499",
    originalPrice: 19999,
    priceNum: 15499,
    category: "Spiritual",
    slug: "dwarka-coastal-darshan",
    isStayIncluded: true,
    isBreakfastIncluded: true,
    isSightseeingIncluded: true,
    isTransferIncluded: false,
  },
];

const inclusions = [
  { key: "isStayIncluded", label: "Stay", Icon: BedDouble },
  { key: "isBreakfastIncluded", label: "Breakfast", Icon: Coffee },
  { key: "isSightseeingIncluded", label: "Sightseeing", Icon: Eye },
  { key: "isTransferIncluded", label: "Transfer", Icon: Car },
] as const;

export default function DwarkaTourPackage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">

        {/* HEADER */}
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700 shadow-sm">
              <MapPin size={13} />
              Sacred Dwarka Tours
            </div>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.05]">
              Popular Dwarka
              <br />
              <span className="text-orange-500">Tour Packages</span>
            </h2>

            <p className="mt-5 max-w-2xl text-[15px] md:text-[17px] leading-8 text-slate-600">
              Discover divine temples, sacred coastlines and premium
              spiritual experiences across Dwarka with our handpicked journeys.
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
            const discount = Math.round(
              ((pkg.originalPrice - pkg.priceNum) / pkg.originalPrice) * 100
            );

            return (
              <Link
                key={pkg.id}
                href={`/tour-packages/${pkg.days}/${pkg.slug}`}
                draggable={false}
                className="group relative shrink-0 w-[300px] md:w-[340px] rounded-[22px] overflow-hidden bg-white border border-stone-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(234,88,12,0.13)] snap-start"
              >
                {/* IMAGE */}
                <div className="relative h-[210px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-[1800ms] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  {/* DISCOUNT BADGE */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-orange-600 text-white shadow-md">
                      {discount}% OFF
                    </span>
                  </div>

                  {/* RATING */}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-[12px] font-bold text-slate-800">{pkg.rating}</span>
                    </div>
                  </div>

                  {/* BOTTOM INFO */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-1.5 text-white/75 text-[12px] mb-2">
                      <MapPin size={12} />
                      {pkg.destination}
                    </div>
                    <h3 className="text-[20px] font-bold text-white leading-tight tracking-tight">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-5 flex flex-col gap-3 flex-1">

                  {/* CATEGORY + DURATION */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 border border-orange-100 uppercase tracking-wide">
                      {pkg.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-600 text-[12px] font-medium">
                      <Clock size={12} className="text-orange-500" />
                      {pkg.days} Days / {pkg.nights} Nights
                    </div>
                  </div>

                  {/* INCLUSIONS */}
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-orange-50 rounded-xl border border-orange-100">
                    {inclusions.map(({ key, label, Icon }) => {
                      const active = pkg[key as keyof typeof pkg] as boolean;
                      return (
                        <div
                          key={key}
                          className={`flex flex-col items-center gap-1 flex-1 transition-colors ${
                            active ? "text-orange-600" : "text-stone-300"
                          }`}
                        >
                          <Icon size={14} strokeWidth={1.6} />
                          <span className={`text-[9px] font-700 uppercase tracking-wide ${active ? "text-orange-800" : "text-stone-300"}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-stone-100 mt-auto" />

                  {/* RATING ROW */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="text-[13px] font-semibold text-slate-800">{pkg.rating}</span>
                      <span className="text-[11px] text-stone-400">({pkg.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-400">
                      <Users size={12} strokeWidth={1.5} />
                      Groups &amp; Couples
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex border-t border-stone-100">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="flex-1 py-3 text-[13px] font-semibold text-slate-600 border-r border-stone-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                  >
                    Enquire Now
                  </button>
                  <div className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold text-center flex items-center justify-center gap-1.5 transition-all duration-200">
                    View Tour
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* MOBILE BUTTONS */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-8">
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
  );
}