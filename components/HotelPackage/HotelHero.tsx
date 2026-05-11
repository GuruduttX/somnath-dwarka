"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Wifi,
  Coffee,
  Car,
  MapPin,
  LucideIcon,
  ChevronRight,
  Home,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
import QuickQuery from "@/utils/QuickQuery";

export default function HotelDetailsHero({ HotelData }: { HotelData: any }) {
   const [open, setOpen] = useState(false);
   const [form, setForm] = useState({ name: "", phone: "" });


  const inclusionConfig: Record<string, { Icon: LucideIcon; label: string }> = {
    freeWifi: { Icon: Wifi, label: "Free WiFi" },
    breakfast: { Icon: Coffee, label: "Breakfast" },
    parking: { Icon: Car, label: "Parking" },
  };

  return (
    <>
       <CommonEnquiryForm
        open={open}
        onClose={() => setOpen(false)}
        defaultService="Hotel Booking"
        name = {form.name}
        phone = {form.phone}
      />
      <section className="relative overflow-hidden pt-30 pb-15 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 px-2 sm:px-12 md:px-30">
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-20"
          >
            <path
              d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* decorative glow */}
        <div className="absolute top-0 left-0 w-96 h-96 z-1 bg-orange-200 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-yellow-200 rounded-full blur-[120px] opacity-40"></div>

        <div className="mx-auto px-4 max-w-7xl">
          {/* breadcrumb */}
          <nav className="mb-4 md:mb-6">
            <ol className="flex items-center justify-center lg:justify-start gap-1 text-sm flex-nowrap overflow-hidden">
              <li className="flex-shrink-0">
                <Link
                  href="/"
                  className="flex items-center gap-1 text-gray-400 hover:text-amber-600 transition-colors duration-200 z-20"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>

              <li className="text-gray-300 flex-shrink-0">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>

              <li className="flex-shrink-0">
                <Link
                  href="/hotels"
                  className="text-gray-400 hover:text-amber-600 transition-colors duration-200"
                >
                  Hotels
                </Link>
              </li>

              <li className="text-gray-300 flex-shrink-0">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>

              <li className="flex items-center gap-1.5 min-w-0">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100/80 truncate block"
                  title={HotelData?.title}
                >
                  {HotelData?.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[28px] overflow-hidden shadow-2xl group"
          >
            <Image
              src={HotelData?.image}
              alt={HotelData?.alt}
              width={1400}
              height={600}
              className="w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

            {/* floating rating */}
            <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-xl px-5 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold">
              <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
              {HotelData?.rating} Rating
            </div>

            {/* location badge */}
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-lg text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <MapPin size={16} />
              {HotelData?.category}
            </div>
          </motion.div>

          {/* INFO SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-8 grid lg:grid-cols-[1fr_auto] gap-6 md:gap-8 items-start"
          >
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                {HotelData?.title}
              </h1>

              <p className="text-gray-500 mt-2 md:mt-3 text-base md:text-lg">
                {HotelData?.subcontent}
              </p>

              {/* rating row */}
              <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 mt-4 md:mt-5">
                <span className="flex items-center text-amber-600 text-lg font-bold">
                  ⭐ {HotelData?.rating}
                </span>

                <span className="text-gray-400 text-sm font-medium">
                  ({HotelData?.reviews} Reviews)
                </span>

                <span className="bg-green-100 text-green-600 px-3 py-1 text-xs rounded-full font-semibold">
                  Top Rated
                </span>
              </div>

              {/* amenities */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mt-6 md:mt-8">
                {Object.entries(HotelData?.quickInclusions).map(
                  ([key, isIncluded]) => {
                    if (!isIncluded || !inclusionConfig[key]) return null;

                    const { Icon, label } = inclusionConfig[key];

                    return (
                      <div
                        key={key}
                        className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-full border border-gray-100 hover:shadow-md transition"
                      >
                        <Icon size={16} className="text-orange-500" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            {/* BOOKING CARD */}
            <div className="hidden lg:block">
              <div className="bg-white/70 backdrop-blur-xl border border-orange-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-3xl px-10 py-7 flex items-center justify-between gap-10">
                {/* LEFT CONTENT */}
                <div className="flex flex-col">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Flexible Pricing
                  </p>

                  <h3 className="text-3xl font-bold text-orange-600 mt-1">
                    Get Price →
                  </h3>

                  <span className="mt-3 w-fit text-xs bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium">
                    No Hidden Charges
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => setOpen(true)}
                  className="whitespace-nowrap cursor-pointer px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold text-lg shadow-[0_10px_25px_rgba(255,115,0,0.4)] hover:shadow-[0_15px_35px_rgba(255,115,0,0.5)] hover:scale-[1.03] transition-all duration-300"
                >
                  Check Availability →
                </button>
              </div>
            </div>

            {/* mobile enquiry */}
            <div className="md:hidden">
                            <QuickQuery setOpen={setOpen} form={form} setForm={setForm}/>
            </div>
          </motion.div>
        </div>
      </section>

     
    </>
  );
}
