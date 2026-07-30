import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export type RelatedLink = {
  target: string;
  anchor: string;
  type?: "pillar" | "money" | "sibling" | "spoke";
};

// Short label per link type, so the cards read as a wayfinding grid.
const TYPE_LABEL: Record<NonNullable<RelatedLink["type"]>, string> = {
  pillar: "Travel guide",
  money: "Book & compare",
  sibling: "Plan your trip",
  spoke: "Read more",
};

/**
 * Resolve a real, in-repo image for a link target from keywords in its path.
 * Every branch points at a file that exists in /public, so the thumbnails
 * always load (no broken images, no external calls).
 */
function linkImage(target: string): string {
  const t = target.toLowerCase();
  if (t.includes("taxi") || t.includes("cab")) return "/images/taxi/sedan.jpg";
  if (t.includes("statue") || t.includes("unity")) return "/images/home/StatueOfUnity.webp";
  if (t.includes("gir")) return "/images/gir/gir-hero.jpg";
  if (t.includes("junagadh") || t.includes("girnar")) return "/images/junagadh-girnar/junagadh-girnar-hero.jpg";
  if (t.includes("festival")) return "/images/festivals/hero.jpg";
  if (t.includes("hotel")) return "/images/hotels/hero.jpg";
  if (t.includes("somnath") && t.includes("dwarka")) return "/images/CTA.webp";
  if (t.includes("somnath")) return "/images/home/SomnathLongImage.webp";
  if (t.includes("dwarka")) return "/images/home/DwarikaLongImage.webp";
  return "/images/CTA.webp";
}

/**
 * Related-links module (SOP §8). Enforces the per-page minimum at build/QA
 * time via lib/links.ts (up-to-pillar + into-money + ≥2 siblings). Renders
 * real <a href> links with rotated anchors and a photo thumbnail per card.
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
          const label = TYPE_LABEL[l.type ?? "spoke"];
          return (
            <li key={l.target + l.anchor} className="group">
              <Link
                href={l.target}
                className="flex h-full items-stretch gap-4 overflow-hidden rounded-2xl border border-orange-100/80 bg-white p-3 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-orange-200 group-hover:shadow-[0_16px_50px_rgba(234,88,12,0.10)]"
              >
                {/* Photo thumbnail */}
                <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-orange-50">
                  <Image
                    src={linkImage(l.target)}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </span>

                <span className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-400">
                    {label}
                  </span>
                  <span className="mt-0.5 block font-semibold capitalize leading-snug text-gray-800">
                    {l.anchor}
                  </span>
                </span>

                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 self-start text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-500"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
