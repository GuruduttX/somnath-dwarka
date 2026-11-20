"use client";

import Link from "next/link";
import Image from "@/src/components/shared/Img";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import { rich, type RichLink } from "@/src/lib/pages/rich";
import type { GuidesGridCopy } from "@/src/app/guides/content";

export interface GuideItem {
  slug: string;
  title: string;
  subContent?: string;
  image?: string;
  alt?: string;
}

const EmptyLink: RichLink = ({ href, children }) => (
  <Link href={href} className="font-semibold text-orange-700 underline-offset-2 hover:underline">{children}</Link>
);

function GuideImage({ src, fallback, alt, sizes }: { src?: string; fallback: string; alt: string; sizes: string }) {
  return (
    <>
      <Image src={src || fallback} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-[600ms] group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </>
  );
}

/** The guide cards of /guides/; `copy` is the "guides" page's `grid` copy, passed in by the server page. */
export function GuidesGrid({ guides, copy }: { guides: GuideItem[]; copy: GuidesGridCopy }) {
  if (guides.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-orange-200 bg-orange-50/40 p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500 ring-1 ring-orange-100">
          <BookOpen size={24} />
        </span>
        <h3 className="mt-4 text-xl font-black text-[#3a2416]">{copy.emptyTitle}</h3>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-[#6b4c38]">
          {rich(copy.emptyText, EmptyLink)}
        </p>
        <Link
          href={copy.emptyCta.href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C,#FB923C)] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(234,88,12,0.3)] transition hover:-translate-y-0.5"
        >
          <Compass size={15} />
          {copy.emptyCta.label}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {guides.map((g, idx) => (
        <motion.div
          key={g.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: (idx % 4) * 0.05 }}
          viewport={{ once: true }}
          className="h-full"
        >
          <Link
            href={`/guides/${g.slug}/`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_24px_55px_rgba(234,88,12,0.15)]"
          >
            <div className="relative h-48 overflow-hidden">
              <GuideImage src={g.image} fallback={copy.fallbackImage} alt={g.alt || g.title} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700 shadow-sm backdrop-blur-sm">
                <BookOpen size={11} /> {copy.badge}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-[16px] font-black leading-snug text-[#3a2416] transition-colors group-hover:text-[#E87722] line-clamp-2">
                {g.title}
              </h3>
              {g.subContent && (
                <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-[#6b4c38]">{g.subContent}</p>
              )}
              <div className="mt-4 flex items-center gap-1.5 border-t border-orange-50 pt-3 text-[12.5px] font-bold text-orange-700">
                {copy.readMore}

                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
