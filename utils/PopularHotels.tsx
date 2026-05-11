"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { MapPin, Star, Heart, ChevronLeft, ChevronRight, ArrowRight, Wifi, Coffee, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const hotels = [
  {
    name: "Radha Palace Hotel",
    location: "Near Prem Mandir",
    price: "₹1,299",
    rating: "4.6",
    reviews: "128",
    badge: "Popular",
    badgeColor: "bg-orange-500",
    amenities: ["Wifi", "Breakfast", "AC"],
    image: "/images/Home/hotel.webp",
  },
  {
    name: "Vrindavan Residency",
    location: "Banke Bihari Temple Road",
    price: "₹1,099",
    rating: "4.4",
    reviews: "94",
    badge: "Best Price",
    badgeColor: "bg-green-500",
    amenities: ["Wifi", "AC"],
    image: "/images/Home/hotel.webp",
  },
  {
    name: "Divine Stay Vrindavan",
    location: "Iskcon Temple Area",
    price: "₹1,499",
    rating: "4.7",
    reviews: "210",
    badge: "Luxury",
    badgeColor: "bg-amber-500",
    amenities: ["Wifi", "Breakfast", "AC"],
    image: "/images/Home/hotel.webp",
  },
  {
    name: "Temple View Hotel",
    location: "Govardhan Road",
    price: "₹999",
    rating: "4.3",
    reviews: "76",
    badge: "Budget",
    badgeColor: "bg-blue-500",
    amenities: ["Wifi", "AC"],
    image: "/images/Home/hotel.webp",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={11} />,
  Breakfast: <Coffee size={11} />,
  AC: <Shield size={11} />,
};

export default function PopularHotels() {
  const controls = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const startAnim = () =>
    controls.start({
      x: ["0%", "-50%"],
      transition: { ease: "linear", duration: 32, repeat: Infinity },
    });

  useEffect(() => {
    startAnim();
  }, []);

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 360, behavior: "smooth" });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40">
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-300/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              <span className="w-full text-center md:text-start">✦ Trusted Stays</span>
            </div>
            <h2 className="text-3xl text-center md:text-start md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Popular Hotels
            </h2>

            {/* SVG Divider */}
            <div className="flex items-center gap-3 mt-3">
              <div className="hidden md:block">
                <svg width="90" height="12" viewBox="0 0 90 12" fill="none">
                  <line
                    x1="0"
                    y1="6"
                    x2="30"
                    y2="6"
                    stroke="#fdba74"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="38" cy="6" r="3" fill="#f97316" />
                  <circle cx="47" cy="6" r="2" fill="#fbbf24" />
                  <circle cx="54" cy="6" r="1.5" fill="#fde68a" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm w-full text-center">
                Comfortable stays near Vrindavan temples
              </p>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-xl bg-white border border-amber-100 shadow-sm flex items-center justify-center text-gray-500 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-xl bg-white border border-amber-100 shadow-sm flex items-center justify-center text-gray-500 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="overflow-hidden"
          onMouseEnter={() => {
            setIsPaused(true);
            controls.stop();
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            startAnim();
          }}
        >
          <motion.div
            className="flex gap-5 cursor-grab active:cursor-grabbing"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -800, right: 0 }}
          >
            {[...hotels, ...hotels].map((hotel, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[300px] flex-shrink-0 group"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden border border-amber-100/80 shadow-md shadow-amber-100/50 hover:shadow-xl hover:shadow-amber-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    {/* Badge */}
                    <div
                      className={`absolute top-3 left-3 ${hotel.badgeColor} text-white px-2.5 py-1 rounded-lg text-xs font-bold`}
                    >
                      {hotel.badge}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/25 px-2 py-1 rounded-lg">
                      <Star
                        size={11}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-white text-xs font-bold">
                        {hotel.rating}
                      </span>
                      <span className="text-white/60 text-xs">
                        ({hotel.reviews})
                      </span>
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={() => toggleFavorite(index)}
                      className="absolute bottom-3 right-3 w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors"
                    >
                      <Heart
                        size={14}
                        className={
                          favorites.includes(index)
                            ? "text-red-400 fill-red-400"
                            : "text-white"
                        }
                      />
                    </button>

                    {/* Location */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs font-medium">
                      <MapPin size={11} />
                      {hotel.location}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2.5">
                      {hotel.name}
                    </h3>

                    {/* Amenity pills */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {hotel.amenities.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 text-xs font-medium"
                        >
                          {amenityIcons[a]}
                          {a}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-amber-100 via-orange-200 to-amber-100 mb-4" />

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                          Per night
                        </div>
                        <div className="text-amber-600 font-extrabold text-lg leading-tight">
                          {hotel.price}
                        </div>
                      </div>
                      <Link
                        href="/"
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-semibold text-xs shadow-md shadow-amber-200/60 hover:shadow-lg hover:shadow-amber-300/60 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        View Hotel
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border-2 border-amber-400 text-amber-600 font-semibold text-sm hover:bg-amber-50 transition-colors duration-200"
          >
            View All Hotels
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}