"use client";

import { Heart, Star, PhoneCall, Users } from "lucide-react";
import { PRODUCT_RATING_TILES, type RatingTile } from "./copy";

/** Icons for the tiles, in order (repeating if more tiles are added). */
const ICONS = [Users, Star, Heart, PhoneCall] as const;

/** The words come from `items` (the variant pages' CMS-editable copy); code defaults when omitted. */
export default function ProductRatings({ items = PRODUCT_RATING_TILES }: { items?: RatingTile[] }) {
  const features = items.map((t, i) => ({ ...t, icon: ICONS[i % ICONS.length] }));
  if (!features.length) return null;
  return (
    <section id="ratings" className="w-full py-8 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Separate tiles in a 2-up grid rather than one horizontally scrolled
            strip: on a phone the carousel showed a single stat at a time and
            hid the other three behind a swipe. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl border border-orange-100/80 bg-white p-4 text-center shadow-sm shadow-orange-100/60 sm:p-6 lg:p-8"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 sm:mb-5 sm:h-12 sm:w-12">
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>

                <h3 className="mb-1 text-lg font-bold tracking-tight text-gray-900 sm:mb-2 sm:text-2xl sm:font-semibold">
                  {item.title}
                </h3>

                <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}