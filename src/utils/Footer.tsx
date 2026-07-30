"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
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

const sectionLabel = (text: string) => (
  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">
    {text}
  </p>
);

const linkClass =
  "group inline-flex items-center gap-2 text-[13.5px] leading-snug text-gray-600 transition-colors duration-200 hover:text-orange-600";
const bullet = (
  <span className="text-[9px] text-orange-300 transition-colors duration-200 group-hover:text-orange-500">
    ✦
  </span>
);

export default function Footer() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <footer className="relative border-t border-orange-100 bg-gradient-to-b from-orange-50/70 via-white to-white">
      <CommonEnquiryForm open={isFormOpen} onClose={() => setIsFormOpen(false)} defaultService="Tour Package" />

      {/* ─── CTA BAND ─── */}
      <div className="border-b border-orange-100/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row md:px-10">
          <div className="text-center sm:text-left">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
              ॐ नमः शिवाय · जय द्वारकाधीश
            </p>
            <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              Dwarka Somnath Yatra
            </h2>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-[14px] font-semibold text-white shadow-md shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 sm:w-auto"
          >
            Plan Your Yatra
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* ─── MAIN GRID ─── */}
      <div className="mx-auto max-w-7xl px-5 py-9 md:px-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">

          {/* COL 1 — Contact */}
          <div>
            {sectionLabel("Reach Us")}
            <div className="mb-5 flex flex-col gap-3">
              {[
                { Icon: Phone, text: "+91 73006 20809", href: "tel:+917300620809" },
                { Icon: MapPin, text: "Dwarka, Saurashtra, Gujarat — 361335", href: "#" },
                { Icon: Mail, text: "info@experiencemyindia.com", href: "mailto:info@experiencemyindia.com" },
              ].map(({ Icon, text, href }) => (
                <a key={text} href={href} className="group flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition-colors duration-200 group-hover:bg-orange-200">
                    <Icon size={14} />
                  </span>
                  <span className="mt-1 text-[13px] leading-snug text-gray-600 transition-colors duration-200 group-hover:text-orange-600">
                    {text}
                  </span>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="mb-3 flex items-center gap-2">
              {[
                { Icon: FaInstagram, href: "https://www.instagram.com/experiencemyindia", label: "Instagram" },
                { Icon: FaYoutube, href: "https://www.youtube.com/@experiencemyindia", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-200 bg-white text-orange-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white">
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/917300620809" target="_blank" rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2.5 text-[13px] font-semibold text-green-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-100 sm:w-auto">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* COL 2 — Sacred Yatras */}
          <div>
            {sectionLabel("Sacred Yatras")}
            <ul className="flex flex-col gap-2.5">
              {tourPackages.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className={linkClass}>
                    {bullet}
                    <span>{p.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3+4 — Explore (two columns) */}
          <div className="sm:col-span-2">
            {sectionLabel("Explore")}
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 xs:grid-cols-2 sm:grid-cols-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {bullet}
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-orange-100/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row md:px-10">
          <p className="text-center text-[12.5px] text-gray-500 sm:text-left">
            © {new Date().getFullYear()} Divine Trails · Sacred Gujarat Tours · All rights reserved
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy/" },
              { label: "Terms", href: "/terms/" },
              { label: "Refund Policy", href: "/cancellation-refund/" },
            ].map((l) => (
              <Link key={l.label} href={l.href}
                className="whitespace-nowrap text-[12.5px] text-gray-500 transition-colors duration-200 hover:text-orange-600">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
