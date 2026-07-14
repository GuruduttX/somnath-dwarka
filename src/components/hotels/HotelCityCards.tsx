"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Wallet, Building2, Crown, Star } from "lucide-react";

interface Tier {
  tier: string;
  area: string;
  typical_range?: string;
}

interface HotelCity {
  slug: string;
  city: string;
  near_temple: string;
  tiers?: Tier[];
  h1?: string;
}

const SLUG_IMAGE: Record<string, string> = {
  "somnath-trust-guest-house-booking": "/images/hotels/somnath.jpg",
  "dwarka-guest-house-dharamshala": "/images/hotels/dwarka.jpg",
  "hotels-in-somnath": "/images/hotels/properties/p6.jpg",
  "hotels-in-dwarka": "/images/hotels/properties/p3.jpg",
};

function getCtaText(slug: string, city: string) {
  if (slug.includes("trust")) return `Explore trust stays in ${city}`;
  if (slug.includes("dharamshala")) return `Explore dharamshalas in ${city}`;
  return `Explore hotels in ${city}`;
}

// Icon + accent per comfort tier.
function tierMeta(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes("budget")) return { Icon: Wallet, cls: "text-emerald-600 bg-emerald-50 ring-emerald-100" };
  if (t.includes("premium") || t.includes("luxury")) return { Icon: Crown, cls: "text-orange-600 bg-orange-50 ring-orange-100" };
  return { Icon: Building2, cls: "text-amber-600 bg-amber-50 ring-amber-100" };
}

export function HotelCityCards({ hotels }: { hotels: HotelCity[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {hotels.map((h, idx) => (
        <motion.div
          key={h.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/hotels/${h.slug}/`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/50 shadow-[0_10px_30px_rgba(234,88,12,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white/70 hover:shadow-[0_24px_55px_rgba(234,88,12,0.18)]"
          >
            {/* Image banner */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={SLUG_IMAGE[h.slug] ?? "/images/hotels/hero.jpg"}
                alt={h.h1 || `Hotels in ${h.city} near ${h.near_temple}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent mix-blend-multiply" />

              {/* rating pill */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
                <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-[11px] font-bold text-[#3a2416]">Handpicked</span>
              </div>

              {/* title over image */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-lg font-black text-white drop-shadow-sm leading-tight">{h.h1 || `Hotels in ${h.city}`}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-orange-100">
                  <MapPin size={13} />
                  Near {h.near_temple}
                </p>
              </div>
            </div>

            {/* Tier details */}
            <div className="flex flex-1 flex-col p-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a7358]">Choose your comfort tier</span>

              <div className="mt-2.5 space-y-2">
                {(h.tiers ?? []).slice(0, 2).map(({ tier, area }) => {
                  const { Icon, cls } = tierMeta(tier);
                  return (
                    <div key={tier} className="flex items-center gap-2.5 rounded-xl border border-white/70 bg-white/40 p-2 backdrop-blur-sm">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${cls}`}>
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0 leading-tight">
                        <p className="text-[13px] font-bold text-[#3a2416]">{tier}</p>
                        <p className="truncate text-[11.5px] text-[#6b4c38]">{area}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA row */}
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/60 pt-3">
                <span className="text-[13px] font-bold text-orange-700 transition-colors group-hover:text-[#E87722]">
                  {getCtaText(h.slug, h.city)}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
