import Link from "next/link";

export type RelatedLink = {
  target: string;
  anchor: string;
  type?: "pillar" | "money" | "sibling" | "spoke";
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
    <nav className="max-w-5xl mx-auto px-4 py-8" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-xl font-bold text-gray-900 mb-4">
        {heading}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.target + l.anchor}>
            <Link
              href={l.target}
              className="block px-4 py-3 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition text-gray-700"
            >
              {l.anchor}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
