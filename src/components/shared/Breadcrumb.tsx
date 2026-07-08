import Link from "next/link";
import type { Crumb } from "@/src/lib/seo";

/**
 * Breadcrumb rendered from the breadcrumb_parent chain (SOP §4, §8).
 * Pair with breadcrumbSchema() in JSON-LD on the same page.
 *
 * Plain gray text with no background — used both inline on content pages and
 * as the overlay just below the navbar on full-bleed hero pages (PageShell
 * `flushHero`).
 */
export default function Breadcrumb({ crumbs, light = false }: { crumbs: Crumb[]; light?: boolean }) {
  if (!crumbs?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4">
      <ol className={`flex flex-wrap items-center gap-1 text-sm ${light ? "text-white/70" : "text-gray-500"}`}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className={`font-semibold ${light ? "text-white" : "text-gray-700"}`}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className={`transition-colors ${light ? "hover:text-amber-400 text-white/90" : "hover:text-[#E87722]"}`}>
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className={light ? "text-white/30" : "text-gray-300"}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
