"use client";

import { INTEREST_IMAGE_FALLBACK } from "@/src/config/interestHubs";

/**
 * The card photo, isolated as a client component purely so it can carry an
 * `onError` guard: a dead image URL swaps to the fallback instead of leaving a
 * broken-image icon on the card, which is how a 404'd stand-in first showed up.
 */
export default function InterestCardImage({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="h-full w-full bg-orange-50 object-cover transition-transform duration-500 group-hover:scale-105"
      onError={(e) => {
        const el = e.currentTarget;
        if (el.src !== INTEREST_IMAGE_FALLBACK) el.src = INTEREST_IMAGE_FALLBACK;
      }}
    />
  );
}
