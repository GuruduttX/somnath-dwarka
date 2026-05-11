import { Church, Users } from "lucide-react";

interface ImageType {
  image: string;
  alt: string;
}
interface PoojaOverviewProps {
  imageData: ImageType;
  description: string;
}

export default function PoojaOverview({
  imageData,
  description,
}: PoojaOverviewProps) {
  return (
    <section className="py-5 sm:py-24 mb-0 px-5 sm:px-6 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-14 items-center">
        {/* ── Image Side ── */}
        <div className="relative mt-6 sm:mt-0">
          {/* Decorative border frame */}
          <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-amber-200 pointer-events-none" />
          {/* Amber block accent */}
          <div className="absolute -bottom-5 -right-5 w-2/3 h-2/3 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 pointer-events-none" />

          <div className="relative h-[280px] sm:h-[380px] md:h-[440px] w-full rounded-2xl overflow-hidden shadow-xl">
            <img
              src={imageData?.image || ""}
              alt={imageData?.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent" />
          </div>

          {/* Floating — Temples Covered */}
          <div className="absolute -bottom-5 sm:-bottom-6 left-4 sm:left-8 bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-amber-100 px-3.5 sm:px-5 py-2.5 sm:py-3 border border-amber-100 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Church size={18} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider leading-none mb-0.5">
                Temples Covered
              </p>
              <p className="text-gray-900 font-bold text-base sm:text-lg leading-none">
                50+
              </p>
            </div>
          </div>

          {/* Floating — Happy Devotees */}
          <div className="absolute -top-4 sm:-top-5 right-4 sm:right-8 bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-amber-100 px-3.5 sm:px-5 py-2.5 sm:py-3 border border-amber-100 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Users size={18} className="text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider leading-none mb-0.5">
                Happy Devotees
              </p>
              <p className="text-gray-900 font-bold text-base sm:text-lg leading-none">
                10,000+
              </p>
            </div>
          </div>
        </div>

        {/* ── Content Side ── */}
        <div className="flex flex-col gap-5 sm:gap-6 items-center text-center md:text-left md:items-start mt-8 sm:mt-6 md:mt-0">
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-amber-600 text-xs font-semibold uppercase tracking-widest">
              Mathura &amp; Vrindavan
            </span>
          </div>

          {/* Heading — smaller on mobile */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Sacred Pooja Services in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Mathura &amp; Vrindavan
            </span>
          </h2>

          {/* Divider */}
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="h-0.5 w-8 bg-amber-200 rounded-full" />
            <div className="h-0.5 w-20 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
          </div>

          {/* Description */}
          <p className="text-gray-500 leading-relaxed text-sm sm:text-[15px]">
            {description}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {[
              "✦ Certified Pandits",
              "✦ Doorstep Service",
              "✦ All Samagri Included",
              "✦ Vedic Rituals",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs — stacked on mobile, row on sm+ — all centered on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 w-full mt-1">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full
              bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm
              shadow-[0_4px_20px_rgba(251,191,36,0.35)]
              hover:shadow-[0_6px_28px_rgba(248,100,0,0.4)] hover:scale-[1.03]
              active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Explore Pooja Packages
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                →
              </span>
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 text-amber-600 text-sm font-semibold
              hover:text-orange-600 hover:gap-3 transition-all duration-200 cursor-pointer group"
            >
              Talk to a Pandit
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
