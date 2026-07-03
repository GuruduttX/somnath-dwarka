import Link from "next/link";
import { ArrowUpRight, Compass, Map, Building2, Calendar } from "lucide-react";

export type RelatedLink = {
  target: string;
  anchor: string;
  type?: "pillar" | "money" | "sibling" | "spoke";
};

// Icon + short label per link type, so the cards read as a wayfinding grid.
const TYPE_META: Record<
  NonNullable<RelatedLink["type"]>,
  { icon: typeof Compass; label: string }
> = {
  pillar: { icon: Compass, label: "Travel guide" },
  money: { icon: Building2, label: "Book & compare" },
  sibling: { icon: Map, label: "Plan your trip" },
  spoke: { icon: Calendar, label: "Read more" },
};

/**
 * Related-links module (SOP §8). Enforces the per-page minimum at build/QA
 * time via lib/links.ts (up-to-pillar + into-money + ≥2 siblings). Renders
 * real <a href> links with rotated anchors.
 */
export default function RelatedLinks({
  links,
  heading = "Related pages",
}: {
  links: RelatedLink[];
  heading?: string;
}) {
  if (!links?.length) return null;
  return (
    <nav
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby="related-heading"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />
        <h2 id="related-heading" className="text-2xl font-bold text-gray-900">
          {heading}
        </h2>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => {
          const meta = TYPE_META[l.type ?? "spoke"];
          const Icon = meta.icon;
          return (
            <li key={l.target + l.anchor}>
              <Link
                href={l.target}
                className="group flex h-full items-center gap-4 rounded-2xl border border-orange-100/80 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_16px_50px_rgba(234,88,12,0.10)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500 transition-colors duration-200 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={20} strokeWidth={2.1} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-400">
                    {meta.label}
                  </span>
                  <span className="mt-0.5 block font-semibold capitalize leading-snug text-gray-800">
                    {l.anchor}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-500"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
