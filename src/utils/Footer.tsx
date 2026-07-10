"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import CommonEnquiryForm from "./CommanEnquiryForm";


const tourPackages = [
  { label: "4 Days 3 Nights", href: "/somnath-dwarka-tour-package/4-days-3-nights/" },
  { label: "3 Days 2 Nights", href: "/somnath-dwarka-tour-package/3-days-2-nights/" },
  { label: "5 Days 4 Nights", href: "/somnath-dwarka-tour-package/5-days-4-nights/" },
  { label: "From Ahmedabad", href: "/somnath-dwarka-tour-package/from-ahmedabad/" },
  { label: "From Rajkot", href: "/somnath-dwarka-tour-package/from-rajkot/" },
  { label: "From Mumbai", href: "/somnath-dwarka-tour-package/from-mumbai/" },
  { label: "Family Yatra", href: "/somnath-dwarka-tour-package/for-family/" },
];

/**
 * Every package hub, the cab hub and both vertical hubs — the v6 footer spec.
 * Hubs created in admin resolve here; later waves (Palitana, Saputara, Diu,
 * Ahmedabad, Porbandar) are added to this list as their records are authored.
 */
const quickLinks = [
  { label: "All Packages", href: "/somnath-dwarka-tour-package/" },
  { label: "Somnath Dwarka Gir", href: "/somnath-dwarka-gir-tour-package/" },
  { label: "Gujarat Tour Packages", href: "/gujarat-tour-packages/" },
  { label: "Gir Tour Package", href: "/gir-tour-package/" },
  { label: "Kutch Tour Package", href: "/kutch-tour-package/" },
  { label: "Statue of Unity", href: "/statue-of-unity-tour-package/" },
  { label: "Ambaji Tour Package", href: "/ambaji-tour-package/" },
  { label: "Heritage Tours", href: "/heritage-tours-gujarat/" },
  { label: "Wildlife & Nature", href: "/wildlife-nature-tours/" },
  { label: "Temples of Gujarat", href: "/temples/" },
  { label: "Taxi Service", href: "/somnath-dwarka-taxi-service/" },
  { label: "Travel Guides", href: "/guides/" },
  { label: "Festival Calendar", href: "/festivals/" },
  { label: "About Us", href: "/about/" },
];

// Round trig-derived coords to a fixed precision so server and client emit
// identical SVG attribute strings (avoids React hydration mismatch).
const f = (n: number) => Number(n.toFixed(3));

function MandalaSvg() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="mg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#C2410C" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="155" fill="url(#mg)" />
      {[30, 55, 80, 108, 138].map((r, i) => (
        <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="#F97316" strokeOpacity={0.12 + i * 0.03} strokeWidth="0.8" />
      ))}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x = 160 + 90 * Math.cos(rad);
        const y = 160 + 90 * Math.sin(rad);
        const ex = f((160 + x) / 2); const ey = f((160 + y) / 2);
        return (
          <ellipse key={i} cx={ex} cy={ey} rx="32" ry="10"
            fill="none" stroke="#F97316" strokeOpacity="0.2" strokeWidth="0.7"
            transform={`rotate(${angle}, ${ex}, ${ey})`} />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const x1 = f(160 + 60 * Math.cos(a)); const y1 = f(160 + 60 * Math.sin(a));
        const x2 = f(160 + 130 * Math.cos(a + (22.5 * Math.PI) / 180));
        const y2 = f(160 + 130 * Math.sin(a + (22.5 * Math.PI) / 180));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#EA580C" strokeOpacity="0.15" strokeWidth="0.6" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = f(160 + 55 * Math.cos(angle)); const cy = f(160 + 55 * Math.sin(angle));
        return <ellipse key={i} cx={cx} cy={cy} rx="18" ry="7" fill="none" stroke="#F97316" strokeOpacity="0.22" strokeWidth="0.7" transform={`rotate(${i * 45}, ${cx}, ${cy})`} />;
      })}
      <circle cx="160" cy="160" r="5" fill="#F97316" fillOpacity="0.35" />
      <circle cx="160" cy="160" r="2.5" fill="#F97316" fillOpacity="0.6" />
    </svg>
  );
}

function DiyaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <ellipse cx="14" cy="7" rx="3.5" ry="6" fill="#FDBA74" opacity="0.9" />
      <ellipse cx="14" cy="9" rx="2" ry="4" fill="#FED7AA" opacity="0.7" />
      <line x1="14" y1="12" x2="14" y2="15" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 16 Q14 24 22 16" fill="none" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 16 Q14 27 23 16 L22.5 18 Q14 28.5 5.5 18 Z" fill="#EA580C" opacity="0.85" />
      <ellipse cx="14" cy="16" rx="9" ry="2.5" fill="#F97316" opacity="0.5" />
    </svg>
  );
}

const sectionLabel = (text: string) => (
  <p className="text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: "#F97316", fontFamily: "sans-serif" }}>
    ◈ &nbsp;{text}
  </p>
);

export default function Footer() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <footer className="relative overflow-hidden font-[Georgia,serif]">
      <CommonEnquiryForm open={isFormOpen} onClose={() => setIsFormOpen(false)} defaultService="Tour Package" />

      <div className="relative" style={{ background: "linear-gradient(180deg, #1C0A00 0%, #2D0F00 40%, #1A0800 100%)" }}>

        {/* Bg effects */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(249,115,22,0.06) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(194,65,12,0.08) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 60%)
          `,
        }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #F97316 0px, #F97316 1px, transparent 1px, transparent 40px)" }} />

        {/* ─── CTA BAND ─── */}
        <div className="relative border-b border-orange-900/40">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-60">
            <MandalaSvg />
          </div>

          <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-orange-300 text-[11px] tracking-[0.28em] uppercase mb-1" style={{ fontFamily: "sans-serif" }}>
                ॐ नमः शिवाय · जय द्वारकाधीश
              </p>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight"
                style={{ color: "#FED7AA", textShadow: "0 0 40px rgba(249,115,22,0.4)", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Dwarka Somnath Yatra
              </h2>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3 text-[13.5px] font-semibold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
                boxShadow: "0 0 20px rgba(234,88,12,0.4), 0 4px 15px rgba(0,0,0,0.3)",
                color: "#FFF7ED", fontFamily: "sans-serif",
              }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
              Plan Your Yatra
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* ─── MAIN GRID ─── */}
        <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-8 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">

            {/* COL 1 — Contact (full width on mobile) */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              {sectionLabel("Reach Us")}

              {/* Contact items — 2-col grid on mobile */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 mb-5">
                {[
                  { Icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
                  { Icon: Phone, text: "+91 73022 65809", href: "tel:+917302265809" },
                  { Icon: MapPin, text: "Dwarka, Saurashtra\nGujarat — 361335", href: "#" },
                  { Icon: Mail, text: "yatra@divinetrails.in", href: "mailto:yatra@divinetrails.in" },
                ].map(({ Icon, text, href }) => (
                  <a key={text} href={href} className="flex items-start gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                      style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
                      <Icon size={13} style={{ color: "#F97316" }} />
                    </div>
                    <span className="text-[12px] leading-snug whitespace-pre-line mt-1 transition-colors duration-200 group-hover:text-orange-300"
                      style={{ color: "#D6B899", fontFamily: "sans-serif" }}>
                      {text}
                    </span>
                  </a>
                ))}
              </div>

              {/* Socials + WhatsApp — side by side on mobile */}
              <div className="flex flex-col sm:flex-col gap-3">
                {/* Socials */}
                <div className="flex items-center gap-2">
                  {[
                    { Icon: FaInstagram, href: "#", label: "Instagram" },
                    { Icon: FaYoutube, href: "#", label: "YouTube" },
                    { Icon: FaXTwitter, href: "#", label: "Twitter" },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} aria-label={label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.22)", color: "#C2793A" }}>
                      <Icon size={15} />
                    </a>
                  ))}
                </div>

                {/* WhatsApp — full width on mobile */}
                <a href="https://wa.me/917302265809" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-semibold transition-all duration-200 hover:scale-[1.02] w-full sm:w-auto"
                  style={{ background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.3)", color: "#86EFAC", fontFamily: "sans-serif" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* COL 2 — Tour Packages */}
            <div className="col-span-1">
              {sectionLabel("Sacred Yatras")}
              <ul className="flex flex-col gap-2.5">
                {tourPackages.map((p) => (
                  <li key={p.label}>
                    <Link href={p.href} className="group flex items-center gap-2 text-[12px] transition-colors duration-200" style={{ color: "#C4A882", fontFamily: "sans-serif" }}>
                      <span className="text-[8px] transition-all duration-200 group-hover:text-orange-400 flex-shrink-0" style={{ color: "rgba(249,115,22,0.4)" }}>✦</span>
                      <span className="group-hover:text-orange-300 transition-colors duration-200 leading-snug">{p.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 3 — Quick Links */}
            <div className="col-span-1">
              {sectionLabel("Explore")}
              <ul className="flex flex-col gap-2.5 mb-6">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="group flex items-center gap-2 text-[12px] transition-colors duration-200" style={{ color: "#C4A882", fontFamily: "sans-serif" }}>
                      <span className="text-[8px] transition-all duration-200 group-hover:text-orange-400 flex-shrink-0" style={{ color: "rgba(249,115,22,0.4)" }}>✦</span>
                      <span className="group-hover:text-orange-300 transition-colors duration-200">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 4 — Stats + Blessing (full width on mobile) */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              {sectionLabel("Our Seva")}

              {/* Stats — 4-col on mobile, 2-col on lg */}
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 mb-4">
                {[
                  { value: "4,800+", label: "Happy Yatris" },
                  { value: "4.9 ★", label: "Avg Rating" },
                  { value: "12+", label: "Yrs of Seva" },
                  { value: "50+", label: "Temples" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl px-2 py-3 text-center"
                    style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)" }}>
                    <p className="text-[15px] sm:text-[18px] font-bold leading-none mb-1"
                      style={{ color: "#FDBA74", textShadow: "0 0 12px rgba(249,115,22,0.3)", fontFamily: "Georgia, serif" }}>
                      {s.value}
                    </p>
                    <p className="text-[9px] sm:text-[10.5px] leading-tight" style={{ color: "#9A7B5A", fontFamily: "sans-serif" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Blessing card */}
              <div className="rounded-2xl px-4 py-4 text-center"
                style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)" }}>
                <p className="text-[17px] leading-relaxed mb-1"
                  style={{ color: "#FDBA74", textShadow: "0 0 20px rgba(249,115,22,0.2)", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  ॐ द्वारकाधीशाय नमः
                </p>
                <p className="text-[11px]" style={{ color: "#7A5C3A", fontFamily: "sans-serif" }}>
                  May your yatra be blessed
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ─── DIYA DIVIDER ─── */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 mt-4">
          <div className="relative flex items-center gap-0">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)" }} />
            <div className="flex items-end gap-3 px-4">
              {[0, 1, 2].map((i) => (
                <DiyaIcon key={i} className={`w-5 h-6 ${i === 1 ? "w-6 h-7 -mb-0.5" : ""}`} />
              ))}
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)" }} />
          </div>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11.5px] text-center sm:text-left" style={{ color: "#6B4C2A", fontFamily: "sans-serif" }}>
            © {new Date().getFullYear()} Divine Trails · Sacred Gujarat Tours · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Privacy Policy", href: "/privacy/" },
              { label: "Terms", href: "/terms/" },
              { label: "Refund Policy", href: "/cancellation-refund/" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-[11px] sm:text-[11.5px] transition-colors duration-200 hover:text-orange-400 whitespace-nowrap"
                style={{ color: "#6B4C2A", fontFamily: "sans-serif" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}