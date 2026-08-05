import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { OPERATOR } from "@/src/config/taxiSpokes";

/**
 * "About the author" card closing every guide body.
 *
 * E-E-A-T attribution, so it only states what the rest of the site already
 * states as fact — who maintains the routes, since when, and where to reach
 * him. No years-of-experience or credential claims: those stay behind the
 * verification gate on /author/harsh-rawat/ (see SEED_AUTHOR.bio_verified).
 */
const AUTHOR = {
  name: OPERATOR.founder,
  role: "Somnath–Dwarka circuit planning",
  photo: "/images/Harsh-Rawat.webp",
  path: "/author/harsh-rawat/",
  bio: `${OPERATOR.founder} runs ${OPERATOR.localUnit} on the ground in Gujarat, part of ${OPERATOR.parent}. Since ${OPERATOR.foundingDate} he has been planning and driving the Somnath–Dwarka circuit — the darshan timings, the road hours between temples and the stops worth adding — and the routes, fares and timings published across this site are the ones he maintains.`,
};

export default function GuideAuthorBio() {
  return (
    <section aria-labelledby="guide-author" className="mt-12">
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_10px_40px_rgba(234,88,12,0.07)]">
        {/* Banner — the avatar overlaps its lower edge */}
        <div className="relative h-14 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400">
          <div className="absolute -right-6 -top-10 h-24 w-24 rounded-full bg-white/10" aria-hidden />
          <div className="absolute right-16 top-2 h-8 w-8 rounded-full bg-white/10" aria-hidden />
          <p
            id="guide-author"
            className="px-5 pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 sm:px-7"
          >
            About the author
          </p>
        </div>

        {/* `relative` keeps this block painting above the positioned banner, so
            the avatar's negative margin overlaps without clipping the name. */}
        <div className="relative px-5 pb-6 sm:px-7">
          <div className="-mt-4 flex flex-wrap items-end gap-4">
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border-4 border-white bg-orange-100 shadow-md">
              <Image
                src={AUTHOR.photo}
                alt={AUTHOR.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <h3 className="text-lg font-bold leading-tight tracking-tight text-gray-900">
                {AUTHOR.name}
              </h3>
              <p className="mt-0.5 text-[13px] font-semibold text-orange-600">{AUTHOR.role}</p>
            </div>
          </div>

          <p className="mt-4 text-[14.5px] leading-7 text-gray-600">{AUTHOR.bio}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[12px] font-semibold text-amber-800">
              <MapPin size={13} className="text-orange-500" />
              Somnath · Dwarka · Gujarat
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[12px] font-semibold text-amber-800">
              Travelling since {OPERATOR.foundingDate}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-orange-100 pt-4 text-[13px] font-semibold">
            <Link
              href={AUTHOR.path}
              className="inline-flex items-center gap-1.5 text-orange-600 transition hover:text-orange-700"
            >
              More about {AUTHOR.name.split(" ")[0]}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
