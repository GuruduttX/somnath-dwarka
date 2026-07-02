import Link from "next/link";
import type { Crumb } from "@/src/lib/seo";

/**
 * Breadcrumb rendered from the breadcrumb_parent chain (SOP §4, §8).
 * Pair with breadcrumbSchema() in JSON-LD on the same page.
 */
export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  if (!crumbs?.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-gray-700 font-medium">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-[#E87722]">
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-gray-300">
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
