import Link from "next/link";
import { FOOTER_NAV } from "@/src/config/routes";
import { BRAND } from "@/src/config/site";

/** Global footer (SOP §8 — money hubs in footer, ≤2 clicks from home). */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 bg-[#2C1A0E] text-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FOOTER_NAV.map((col) => (
          <div key={col.heading}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-200 mb-3">
              {col.heading}
            </h2>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-orange-100/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-orange-100/60 flex flex-wrap gap-3 justify-between">
          <span>
            © {year} {BRAND.name}. Prices &amp; timings shown are indicative until confirmed.
          </span>
          <Link href="/sitemap/" className="hover:text-white">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
