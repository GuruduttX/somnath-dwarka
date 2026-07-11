import Link from "next/link";
import { Scale, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { SEED_COMPARISONS } from "@/src/lib/seed/destinations";

/**
 * "Compare & decide" section for the plan hub. Lists every /compare/ page as a
 * card so travellers weighing an option (which package, how many days, which
 * transport) can reach the honest side-by-side pages from one place.
 *
 * Reads SEED_COMPARISONS, so a new comparison appears here the moment it is
 * added to the seed — no second list to keep in sync.
 */
export default function CompareSection() {
  if (!SEED_COMPARISONS.length) return null;

  return (
    <div className="bg-gradient-to-b from-white via-orange-50/20 to-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
            <Scale size={14} />
            Compare &amp; decide
          </span>
          <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
            Weighing your <span className="text-orange-500">options?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
            Honest, side-by-side comparisons — which package, how many days, and how to get around —
            so you can decide before you book.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEED_COMPARISONS.map((c) => {
            const options = [c.optionA, c.optionB, c.optionC].filter(Boolean) as string[];
            return (
              <li key={c.slug}>
                <Link
                  href={`/compare/${c.slug}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)]"
                >
                  {/* corner glow */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.16)_0%,transparent_70%)] transition-transform duration-500 group-hover:scale-150"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                      <Scale size={18} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-gray-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-600"
                    />
                  </div>

                  {/* option-vs-option pills */}
                  <div className="relative mt-5 flex flex-wrap items-center gap-1.5">
                    {options.map((opt, i) => (
                      <span key={opt} className="inline-flex items-center gap-1.5">
                        {i > 0 ? (
                          <span className="text-[11px] font-black uppercase text-orange-400">vs</span>
                        ) : null}
                        <span className="rounded-lg border border-orange-100 bg-orange-50/60 px-2.5 py-1 text-[12px] font-bold text-[#2a1a10]">
                          {opt}
                        </span>
                      </span>
                    ))}
                  </div>

                  <p className="relative mt-4 flex-1 text-[13px] leading-relaxed text-gray-500 line-clamp-3">
                    {c.verdict}
                  </p>

                  <span className="relative mt-5 inline-flex items-center gap-1.5 border-t border-orange-50 pt-3 text-[11.5px] font-extrabold uppercase tracking-wider text-orange-600">
                    Read the comparison
                    <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/compare/"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md"
          >
            <Sparkles size={15} className="text-orange-500" />
            See all comparisons
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
