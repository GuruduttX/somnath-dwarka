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
  "somnath-trust-guest-house-booking": "/images/hotels/somnath.webp",
  "dwarka-guest-house-dharamshala": "/images/hotels/dwarka.webp",
  "hotels-in-somnath": "/images/hotels/properties/p6.webp",
  "hotels-in-dwarka": "/images/hotels/properties/p3.webp",
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eee4dc] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_40px_rgba(234,88,12,0.14)]"
          >
            {/* Image banner */}
            <div className="relative m-2 h-40 overflow-hidden rounded-xl bg-[#f4ede7]">
              <Image
                src={SLUG_IMAGE[h.slug] ?? "/images/hotels/hero.webp"}
                alt={h.h1 || `Hotels in ${h.city} near ${h.near_temple}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
              />

              {/* handpicked pill */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
                <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-[11px] font-bold text-[#3a2416]">Handpicked</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
              <h3 className="text-[17px] font-extrabold leading-snug tracking-[-0.01em] text-[#1f1207]">
                {h.h1 || `Hotels in ${h.city}`}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-[12.5px] font-medium text-[#8a6a54]">
                <MapPin size={13} className="shrink-0 text-orange-500" />
                <span className="truncate">Near {h.near_temple}</span>
              </p>

              <div className="my-3.5 h-px bg-[#f0e7e0]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a7358]">Choose your comfort tier</span>

              <div className="mt-2.5 space-y-1.5">
                {(h.tiers ?? []).slice(0, 2).map(({ tier, area }) => {
                  const { Icon, cls } = tierMeta(tier);
                  return (
                    <div key={tier} className="flex items-center gap-2.5 rounded-xl bg-[#faf7f4] p-2 transition-colors group-hover:bg-[#fdf3ea]">
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
              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
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
