"use client";

import Image from "next/image";
import { useState } from "react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

/**
 * Full-width promo banner that sits above the tour-package showcase.
 * The artwork carries all the copy, so the markup stays a single image — but the
 * whole banner is a button that opens the enquiry form on click.
 */
export default function JourneyBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <div className="mx-auto w-full px-2 pt-0 pb-6 sm:px-8 sm:pb-14 lg:px-16 xl:px-24">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Enquire about a Somnath &amp; Dwarka journey"
          className="group block w-full cursor-pointer overflow-hidden rounded-xl shadow-sm ring-1 ring-orange-100 transition-all duration-300 hover:shadow-lg hover:ring-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:rounded-2xl"
        >
          {/* Reduced height: a shallow, wide crop keeps the banner compact on
              every viewport while still showing the artwork's focal centre. */}
          <Image
            src="/images/home/somnath-dwarka-banner.webp"
            alt="A sacred journey to Somnath &amp; Dwarka — where faith meets eternity. Two divine destinations, one blessed journey."
            width={2000}
            height={973}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="aspect-[2/1] w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] sm:aspect-[10/3]"
            priority={false}
          />
        </button>
      </div>
    </>
  );
}
