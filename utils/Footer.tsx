"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Star,
 
} from "lucide-react";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Instagram = FaInstagram;
const Twitter = FaXTwitter;
const Youtube = FaYoutube;





const tourPackages = [
  { label: "Dwarka Divine Escape", href: "/tour-packages/dwarka-divine-escape" },
  { label: "Somnath Jyotirlinga Tour", href: "/tour-packages/somnath-jyotirlinga" },
  { label: "Dwarka Somnath Premium Yatra", href: "/tour-packages/dwarka-somnath-yatra" },
  { label: "Bet Dwarka Spiritual Journey", href: "/tour-packages/bet-dwarka" },
  { label: "Gujarat Spiritual Circuit", href: "/tour-packages/gujarat-spiritual-circuit" },
  { label: "Nageshwar Jyotirlinga Tour", href: "/tour-packages/nageshwar" },
  { label: "Somnath Coastal Retreat", href: "/tour-packages/somnath-coastal" },
];

const quickLinks = [
  { label: "All Packages", href: "/tour-packages" },
  { label: "Custom Yatra", href: "/custom-yatra" },
  { label: "Taxi Services", href: "/taxi" },
  { label: "Hotels", href: "/hotels" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { value: "4,800+", label: "Happy Yatris" },
  { value: "4.9★", label: "Average Rating" },
  { value: "12+", label: "Years of Service" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* ── TOP STRIP ── */}
      <div className="relative bg-orange-500 px-5 md:px-10 py-4 overflow-hidden">

        {/* Strip background texture — diagonal lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)",
          }}
        />

        {/* Soft right glow */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-64 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at right center, #fff 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
              Dwarka Somnath Yatra
            </h2>
            <p
              className="text-orange-100 text-[14px] mt-0.5"
              style={{ fontFamily: "serif" }}
            >
              ॐ नमः शिवाय · जय द्वारकाधीश
            </p>
          </div>

          <Link
            href="/tour-packages"
            className="inline-flex items-center gap-2 rounded-full bg-white text-orange-600 font-bold text-[13.5px] px-6 py-3 hover:bg-orange-50 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 flex-shrink-0"
          >
            Plan Your Yatra
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── BODY ── */}
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(135deg, #FDF6ED 0%, #FAF0E3 40%, #FDF3E7 100%)",
        }}
      >
        {/* Very subtle warm dot pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(194,97,14,0.09) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Soft decorative circle — bottom right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #EA580C 0%, transparent 70%)",
            transform: "translate(30%, 30%)",
          }}
        />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-8 pb-4">

          {/* ── GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* COL 1 — Get in Touch */}
            <div>
              <p className="text-[10.5px] font-black uppercase tracking-[0.16em] text-orange-600 mb-3">
                Get in Touch
              </p>

              <div className="flex flex-col gap-2 mb-4">
                {[
                  {
                    Icon: Phone,
                    text: "+91 98765 43210",
                    href: "tel:+919876543210",
                  },
                  {
                    Icon: MapPin,
                    text: "Dwarka, Saurashtra,\nGujarat — 361335",
                    href: "#",
                  },
                  {
                    Icon: Mail,
                    text: "yatra@divinetrails.in",
                    href: "mailto:yatra@divinetrails.in",
                  },
                ].map(({ Icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-orange-100 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-orange-300 group-hover:bg-orange-50 transition-all duration-200">
                      <Icon size={13} className="text-orange-500" />
                    </div>
                    <span className="text-[13px] text-stone-600 group-hover:text-orange-600 transition-colors duration-200 leading-snug whitespace-pre-line mt-1">
                      {text}
                    </span>
                  </a>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2 mb-4">
                {[
                  { Icon: Instagram, href: "#", label: "Instagram" },
                  { Icon: Youtube, href: "#", label: "YouTube" },
                  { Icon: Twitter, href: "#", label: "Twitter" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-stone-400 hover:text-orange-500 hover:border-orange-300 shadow-sm transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white text-green-700 hover:bg-green-50 px-4 py-2 text-[12px] font-semibold transition-all duration-200 shadow-sm"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* COL 2 — Tour Packages */}
            <div>
              <p className="text-[10.5px] font-black uppercase tracking-[0.16em] text-orange-600 mb-3">
                Tour Packages
              </p>
              <ul className="flex flex-col gap-2.5">
                {tourPackages.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
                      className="group flex items-center gap-2 text-[13px] text-stone-600 hover:text-orange-600 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-300 group-hover:bg-orange-500 flex-shrink-0 transition-colors duration-200" />
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 3 — Quick Links */}
            <div>
              <p className="text-[10.5px] font-black uppercase tracking-[0.16em] text-orange-600 mb-3">
                Quick Links
              </p>
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group flex items-center gap-2 text-[13px] text-stone-600 hover:text-orange-600 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-300 group-hover:bg-orange-500 flex-shrink-0 transition-colors duration-200" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 4 — Stats */}
            <div>
              <p className="text-[10.5px] font-black uppercase tracking-[0.16em] text-orange-600 mb-3">
                Our Journey
              </p>

              {/* Stat cards */}
              <div className="flex flex-col gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-white border border-orange-100 px-5 py-4 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[22px] font-extrabold text-orange-500 leading-none">
                        {s.value}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1 font-medium">
                        {s.label}
                      </p>
                    </div>
                    <Star
                      size={22}
                      className="fill-orange-100 text-orange-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="mt-10 pt-6 border-t border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <MapPin size={11} className="text-white" />
              </div>
              <p className="text-[12px] text-stone-400">
                © {new Date().getFullYear()} Divine Trails · Sacred Gujarat Tours · All rights reserved
              </p>
            </div>

            <div className="flex items-center gap-5">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Refund Policy", href: "/refund" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[12px] text-stone-400 hover:text-orange-500 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}