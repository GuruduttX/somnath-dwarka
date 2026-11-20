"use client";

import dynamic from "next/dynamic";

import { useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  RefreshCw,
  Headphones,
  BadgeCheck,
  Flame,
} from "lucide-react";
const CommonEnquiryForm = dynamic(() => import("@/src/utils/CommanEnquiryForm"), { ssr: false });
import { BRAND, CONTACT, telLink } from "@/src/config/site";
import { YATRA_BANNER_COPY, type YatraBannerCopy } from "./copy";

/** Icons for the trust chips, in order (repeating if more chips are added). */
const TRUST_ICONS = [ShieldCheck, RefreshCw, Headphones, BadgeCheck] as const;

/**
 * "Begin Your Sacred Dwarka & Somnath Yatra" conversion banner — a self
 * contained card with the two primary actions, social-proof stats, trust chips
 * and the NAP footer. Sits inside the package explorer above the traveller
 * section as a mid-page CTA.
 *
 * The words come from `copy` (the hub's CMS-editable PageDef passes it down);
 * the phone, email and brand name stay with site config.
 */
export default function YatraBanner({ copy = YATRA_BANNER_COPY }: { copy?: YatraBannerCopy }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <section
        aria-labelledby="yatra-banner-h"
        className="font-dm relative overflow-hidden rounded-[28px] border border-orange-100/90 bg-white shadow-[0_24px_70px_rgba(234,88,12,0.12)]"
      >
        {/* top accent bar */}
        <div className="h-1.5 w-full bg-[linear-gradient(90deg,#EA580C_0%,#F97316_50%,#FBBF24_100%)]" />

        {/* soft background wash */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.18)_0%,transparent_68%)]" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_68%)]" />
        </div>

        <div className="relative p-6 sm:p-9 lg:p-11">
          {/* ── TOP: headline + CTAs ── */}
          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange-700">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                {copy.badge}
              </span>

              <h2
                id="yatra-banner-h"
                className="font-playfair mt-5 text-4xl font-black leading-[1.08] tracking-[-0.02em] text-[#111827] sm:text-5xl"
              >
                {copy.headingLead}{" "}
                <span className="text-orange-500">{copy.headingHighlight}</span>
                {copy.headingTail ? ` ${copy.headingTail}` : null}
              </h2>

              <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-gray-500 sm:text-lg">
                {copy.text}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_55%,#FB923C_100%)] px-8 py-4 text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(234,88,12,0.34)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Flame size={17} />
                {copy.bookLabel}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={telLink()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-8 py-4 text-[15px] font-bold text-[#111827] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50"
              >
                <Phone size={16} className="text-orange-500" />
                {copy.callLabel}
              </a>
            </div>
          </div>

          {/* divider */}
          <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-orange-100 to-transparent" />

          {/* ── STATS + TRUST ── */}
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            {/* stats */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 sm:gap-x-9">
              {copy.stats.map((s, i) => (
                <div key={`${s.label}-${i}`} className="flex items-center gap-7 sm:gap-9">
                  {i > 0 && <span className="hidden h-9 w-px bg-orange-100 sm:block" />}
                  <div>
                    <div className="font-playfair text-2xl font-extrabold leading-none text-orange-600 sm:text-[27px]">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* trust chips */}
            <div className="flex flex-wrap gap-2.5">
              {copy.trust.map((text, i) => {
                const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
                return (
                  <span
                    key={`${text}-${i}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-[13px] font-semibold text-gray-600"
                  >
                    <Icon size={15} className="text-orange-500" />
                    {text}
                  </span>
                );
              })}
            </div>
          </div>

          {/* divider */}
          <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-orange-100 to-transparent" />

          {/* ── NAP FOOTER ── */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={telLink()} className="flex items-center gap-3 group">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-orange-50 text-orange-500">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    {copy.callUsLabel}
                  </span>
                  <span className="block text-[15px] font-bold text-[#111827] group-hover:text-orange-600">
                    {CONTACT.phoneDisplay}
                  </span>
                </span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 group">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-orange-50 text-orange-500">
                  <Mail size={17} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    {copy.emailLabel}
                  </span>
                  <span className="block text-[15px] font-bold text-[#111827] group-hover:text-orange-600">
                    {CONTACT.email}
                  </span>
                </span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-200">
                <MapPin size={18} />
              </span>
              <span className="text-right">
                <span className="block font-playfair text-[17px] font-bold text-[#111827]">
                  {BRAND.shortName}
                </span>
                <span className="block text-[12px] font-medium text-gray-400">
                  {copy.brandTagline}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
