"use client";

import Image from "next/image";
import { Star, Clock, MapPin, Users, ShieldCheck, Phone } from "lucide-react";
import { useState } from "react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import QuickEnquiry from "@/src/utils/QuickQuery";

export default function PackageHero({ PackageData }: any) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  return (
    <>
     <CommonEnquiryForm
        open={open}
        onClose={() => setOpen(false)}
        defaultService="Taxi Booking"
        phone={form.phone}
        name={form.name}
      />
    <section className="w-full h-full">

       <div className="relaive">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16">

          {/* MOBILE mosaic */}
          <div className="lg:hidden flex flex-col gap-2">
            {/* Hero */}
            <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden">
              <Image
                src={PackageData.heroImage?.image}
                alt={PackageData.heroImage?.alt}
                fill
                priority
                className="object-cover"
              />
              {/* warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/50 via-orange-800/10 to-transparent" />
              {/* duration badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-orange-700 flex items-center gap-1.5 shadow-sm">
                <Clock size={12} />
                {PackageData.duration}
              </div>
              {/* title overlay */}
              <div className="absolute bottom-4 left-4">
                <p className="text-white/70 text-[11px] uppercase tracking-widest font-medium mb-1">
                  {PackageData.category}
                </p>
                <h2 className="text-white text-lg font-semibold leading-tight drop-shadow">
                  {PackageData.destination}
                </h2>
              </div>
            </div>

            {/* 4 child images 2x2 */}
            <div className="grid grid-cols-2 gap-2">
              {PackageData.childImages?.slice(0, 4).map((item: any, i: number) => (
                <div key={i} className="relative h-24 sm:h-28 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP mosaic — hero now spans col 1–3 (3 of 5 cols) */}
          <div className="hidden lg:grid grid-cols-5 gap-3" style={{ gridTemplateRows: "240px 220px" }}>

            {/* Hero — spans 3 cols & 2 rows */}
            <div className="relative col-span-3 row-span-2 rounded-2xl overflow-hidden group">
              <Image
                src={PackageData.heroImage?.image}
                alt={PackageData.heroImage?.alt}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/60 via-orange-800/20 to-transparent" />

              {/* Duration badge */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-orange-700 flex items-center gap-2 shadow-sm">
                <Clock size={14} />
                {PackageData.duration}
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-6 left-6">
                <p className="text-orange-200/80 text-[11px] uppercase tracking-[0.15em] font-medium mb-1.5">
                  {PackageData.category}
                </p>
                <h2 className="text-white text-2xl font-semibold leading-snug">
                  {PackageData.destination}
                </h2>
                <p className="text-white/65 text-sm mt-1">Gujarat's Sacred Coast</p>
              </div>
            </div>

            {/* child 1 — top col 4 */}
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={PackageData.childImages?.[0]?.image}
                alt={PackageData.childImages?.[0]?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-medium tracking-wide drop-shadow">
                {PackageData.childImages?.[0]?.alt}
              </p>
            </div>

            {/* child 2 — top col 5 */}
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={PackageData.childImages?.[1]?.image}
                alt={PackageData.childImages?.[1]?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-medium tracking-wide drop-shadow">
                {PackageData.childImages?.[1]?.alt}
              </p>
            </div>

            {/* child 3 — bottom col 4 */}
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={PackageData.childImages?.[2]?.image}
                alt={PackageData.childImages?.[2]?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* child 4 — bottom col 5 */}
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src={PackageData.childImages?.[3]?.image}
                alt={PackageData.childImages?.[3]?.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>

          </div>

          {/* ── Quick Fact Strip ── */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 divide-x divide-orange-100 border border-orange-100 rounded-2xl overflow-hidden bg-white">
            {[
              { icon: <Clock size={16} />, label: "Duration", value: PackageData.duration },
              { icon: <span className="text-base">✦</span>, label: "Category", value: PackageData.category },
              { icon: <span className="text-base">⊙</span>, label: "Starts from", value: PackageData.routes?.source },
              { icon: <Star size={15} className="fill-orange-400 text-orange-400" />, label: "Rating", value: `${PackageData.rating} · ${PackageData.reviews} reviews` },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 py-3 px-2">
                <span className="text-orange-500 mb-0.5">{f.icon}</span>
                <span className="text-[10px] uppercase tracking-widest text-orange-700 font-medium">{f.label}</span>
                <span className="text-sm font-medium text-gray-800 text-center leading-tight">{f.value}</span>
              </div>
            ))}
          </div>

          {/* ── Info Card ── */}
          <div className="mt-4 bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">

            {/* Title block */}
            <div className="p-5 sm:p-7 border-b border-orange-50">
              {/* Category pill */}
              <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-700 text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                <span>✦</span> {PackageData.category}
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {PackageData.title}
              </h1>
            
            </div>

            {/* Itinerary pills */}
            <div className="px-5 sm:px-7 py-4 border-b border-orange-50">
              <p className="text-[10px] uppercase tracking-widest text-orange-700 font-medium mb-3">Journey overview</p>
              <div className="flex gap-2 flex-wrap">
                {PackageData.itinerary?.map((day: any) => (
                  <div
                    key={day.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-xs text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-700 text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                      {day.day}
                    </span>
                    {day.title}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA block */}
            <div className="p-4 sm:p-7 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white relative overflow-hidden">
              {/* Grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-amber-400/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-400/30 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                {/* Left: trust signals + highlights */}
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-orange-100/80 text-[10px] uppercase tracking-widest font-semibold">
                      Why book with us
                    </p>
                    <p className="text-white text-base font-semibold mt-0.5">
                      Hassle-free travel, guaranteed.
                    </p>
                  </div>

                  {/* Trust badges — 2 columns */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {[
                      { icon: <ShieldCheck size={13} />, text: "100% Customisable" },
                      { icon: <Users size={13} />,       text: "Group & Family Friendly" },
                      { icon: <MapPin size={13} />,      text: "Pickup from Your City" },
                      { icon: <Phone size={13} />,       text: "24/7 Travel Support" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-white/90 text-xs font-medium">
                        <span className="text-amber-200 flex-shrink-0">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile: quick enquiry inline */}
                <div className="w-full md:hidden mt-1">
                  <QuickEnquiry setOpen={setOpen} form={form} setForm={setForm} />
                </div>

                {/* Desktop: CTA group */}
                <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
                  <button
                    onClick={() => setOpen(true)}
                    className="px-8 py-3.5 rounded-xl bg-white text-orange-600 font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Enquire Now →
                  </button>
                  <p className="text-white/70 text-[11px] flex items-center gap-1">
                    <ShieldCheck size={11} className="text-amber-200" />
                    Free consultation · No hidden charges
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
     

     
    </>
  );
}
