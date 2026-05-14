"use client";

import Link from "next/link";
import {
  Flame,
  ArrowRight,
  Phone,
  ShieldCheck,
  RefreshCw,
  Headphones,
  BadgeCheck,
  Mail,
  MapPin,
} from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { useState } from "react";

const trustStats = [
  { value: "4,800+", label: "Happy Yatris" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "12+", label: "Years of Service" },
  { value: "98%", label: "Recommend Us" },
];

const features = [
  { Icon: ShieldCheck, label: "Secure Booking" },
  { Icon: RefreshCw, label: "Free Cancellation" },
  { Icon: Headphones, label: "24/7 Support" },
  { Icon: BadgeCheck, label: "Expert Guides" },
];

const contacts = [
  {
    Icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "yatra@divinetrails.in",
    href: "mailto:yatra@divinetrails.in",
  },
];

export default function FinalCTA() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <CommonEnquiryForm 
        open={open} 
        onClose={() => setOpen(false)} 
        defaultService="Tour Package" 
      />
      <section className="relative overflow-hidden py-14 md:py-20 ">

      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-orange-200" />

      {/* Light dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(234,88,12,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Warm glow center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #EA580C 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 md:px-8">

        {/* Main card */}
        <div className="relative rounded-3xl bg-white border border-orange-100 shadow-[0_8px_48px_rgba(234,88,12,0.08)] overflow-hidden">

          {/* Orange top stripe */}
          <div className="h-1 w-full bg-orange-500" />

          <div className="px-7 md:px-12 py-10 md:py-14">

            {/* Top row — badge + headline + sub */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14 mb-10">

              {/* Left: text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-700 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block" />
                  Limited Seats This Season
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-3">
                  Begin Your Sacred{" "}
                  <span className="text-orange-500">Dwarka &amp; Somnath</span>{" "}
                  Yatra
                </h2>

                <p className="text-[15px] leading-[1.75] text-slate-500 max-w-lg">
                  Everything arranged, every darshan planned. All you need to
                  carry is your devotion — we handle the rest.
                </p>
              </div>

              {/* Right: CTA buttons */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 text-[14px] font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-[0_6px_24px_rgba(234,88,12,0.28)] hover:shadow-[0_10px_32px_rgba(234,88,12,0.38)] whitespace-nowrap cursor-pointer"
                >
                  <Flame size={16} />
                  Book Your Yatra
                  <ArrowRight size={15} />
                </button>

                <Link
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 hover:border-orange-300 bg-white text-slate-700 hover:text-orange-600 px-7 py-3.5 text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Phone size={15} />
                  Talk to an Expert
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-stone-100 mb-8" />

            {/* Stats + features row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

              {/* Trust stats */}
              <div className="flex items-center gap-6 flex-wrap">
                {trustStats.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-5">
                    <div className="text-center">
                      <p className="text-[18px] font-extrabold text-orange-500 leading-none">
                        {s.value}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-stone-400 mt-1">
                        {s.label}
                      </p>
                    </div>
                    {i < trustStats.length - 1 && (
                      <div className="w-px h-7 bg-stone-200 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>

              {/* Feature pills */}
              <div className="flex items-center gap-3 flex-wrap">
                {features.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1.5"
                  >
                    <Icon size={12} className="text-orange-500" strokeWidth={2} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom contact strip */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div className="flex items-center gap-5 flex-wrap">
                {contacts.map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors duration-200">
                      <Icon size={13} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.1em] text-stone-400 leading-none mb-0.5">
                        {label}
                      </p>
                      <p className="text-[12.5px] font-semibold text-slate-700 group-hover:text-orange-600 transition-colors duration-200">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Brand */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-700 leading-none">
                    Divine Trails
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    Sacred Gujarat Tours
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