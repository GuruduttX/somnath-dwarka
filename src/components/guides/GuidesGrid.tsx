"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Sparkles, Compass } from "lucide-react";

export interface GuideItem {
  slug: string;
  title: string;
  subContent?: string;
  image?: string;
  alt?: string;
}

const FALLBACK = "/images/home/DwarikaLongImage.webp";

function GuideImage({ src, alt, sizes }: { src?: string; alt: string; sizes: string }) {
  return (
    <>
      <Image src={src || FALLBACK} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-[600ms] group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </>
  );
}

export function GuidesGrid({ guides }: { guides: GuideItem[] }) {
  if (guides.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-orange-200 bg-orange-50/40 p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500 ring-1 ring-orange-100">
          <BookOpen size={24} />
        </span>
        <h3 className="mt-4 text-xl font-black text-[#3a2416]">Fresh guides on the way</h3>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-[#6b4c38]">
          We&apos;re writing new Somnath–Dwarka travel guides. In the meantime, our{" "}
          <Link href="/plan/" className="font-semibold text-orange-700 underline-offset-2 hover:underline">planning guides</Link>{" "}
          cover distances, trip length and day-wise itineraries.
        </p>
        <Link
          href="/plan/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C,#FB923C)] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(234,88,12,0.3)] transition hover:-translate-y-0.5"
        >
          <Compass size={15} />
          Explore trip planning
        </Link>
      </div>
    );
  }

  const [featured, ...rest] = guides;

  return (
    <div className="space-y-8">
      {/* Featured */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        <Link
          href={`/guides/${featured.slug}/`}
          className="group grid overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_12px_34px_rgba(234,88,12,0.08)] transition-all duration-300 hover:border-orange-300 hover:shadow-[0_26px_60px_rgba(234,88,12,0.16)] md:grid-cols-2"
        >
          <div className="relative h-56 overflow-hidden md:h-full md:min-h-[300px]">
            <GuideImage src={featured.image} alt={featured.alt || featured.title} sizes="(max-width:768px) 100vw, 50vw" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#EA580C,#FB923C)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
              <Sparkles size={12} /> Featured
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-600">Latest guide</span>
            <h3 className="mt-2 text-2xl font-black leading-tight text-[#3a2416] transition-colors group-hover:text-[#E87722] sm:text-[1.7rem]">
              {featured.title}
            </h3>
            {featured.subContent && (
              <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#6b4c38]">{featured.subContent}</p>
            )}
            <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-[13px] font-bold text-orange-700 transition-all group-hover:border-orange-400 group-hover:bg-orange-50">
              Read guide
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Rest */}
      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((g, idx) => (
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.06 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/guides/${g.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_24px_55px_rgba(234,88,12,0.15)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <GuideImage src={g.image} alt={g.alt || g.title} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700 shadow-sm backdrop-blur-sm">
                    <BookOpen size={11} /> Guide
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[16px] font-black leading-snug text-[#3a2416] transition-colors group-hover:text-[#E87722]">
                    {g.title}
                  </h3>
                  {g.subContent && (
                    <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-[#6b4c38]">{g.subContent}</p>
                  )}
                  <div className="mt-4 flex items-center gap-1.5 border-t border-orange-50 pt-3 text-[12.5px] font-bold text-orange-700">
                    Read guide
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
