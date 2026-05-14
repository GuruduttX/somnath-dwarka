"use client";
import Link from "next/link";
import Image from "next/image";

export default function BlogStickyCTA() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-orange-100">
      {/* Top Image */}
      <div className="relative h-44 w-full">
        <Image
          src="/images/dwarka-somnath.webp"
          alt="Dwarka Somnath Tour"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
        <h4 className="absolute bottom-3 left-3 right-3 text-white font-semibold text-base leading-snug">
          Plan Your Dwarka &amp; Somnath Journey
        </h4>
      </div>
      {/* Content */}
      <div className="p-4">
        <p className="text-[13px] text-gray-600 leading-relaxed">
          Book complete Dwarka &amp; Somnath tour packages, trusted hotels,
          comfortable taxis, and sacred pooja services — all arranged with care.
        </p>
        <Link href="/contact">
          <button className="mt-4 w-full rounded-full bg-gradient-to-r from-amber-600 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-md hover:shadow-amber-300/40 hover:opacity-90">
            Send Enquiry
          </button>
        </Link>
      </div>
    </div>
  );
}