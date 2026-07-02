import Link from "next/link";
import { PRIMARY_NAV } from "@/src/config/routes";
import { BRAND } from "@/src/config/site";

/**
 * Global header (SOP §8 — money hubs reachable ≤2 clicks from home). Server-
 * rendered real <a> links; a checkbox toggles the mobile menu with no JS.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-[#B85C10]">
          {BRAND.shortName}
        </Link>
        <input type="checkbox" id="nav-toggle" className="peer hidden" aria-hidden="true" />
        <label
          htmlFor="nav-toggle"
          className="md:hidden cursor-pointer text-2xl text-gray-700"
          aria-label="Toggle menu"
        >
          ☰
        </label>
        <nav
          aria-label="Primary"
          className="hidden peer-checked:block absolute top-16 left-0 right-0 bg-white border-b border-orange-100 md:static md:block md:border-0"
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-1 md:gap-5 p-4 md:p-0 text-sm font-medium text-gray-700">
            {PRIMARY_NAV.map((n) => (
              <li key={n.path}>
                <Link href={n.path} className="block py-1 hover:text-[#E87722]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
