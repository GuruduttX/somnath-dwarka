import Navbar from "@/src/utils/Navbar";
import SiteFooter from "./SiteFooter";
import JsonLd from "@/src/components/seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/src/lib/seo";

/**
 * Standard page frame: the site's floating pill Navbar (shared with the
 * homepage — same component, same nav items, so the whole site has one
 * consistent header), BreadcrumbList JSON-LD, main landmark
 * (skip-link target), footer. Every template uses this so heading order,
 * landmarks and structured breadcrumbs are consistent (SOP §4, §5 DoD, §10).
 *
 * Navbar is `position: fixed` and floats above the page, so it doesn't push
 * content down on its own — the pt-28 wrapper below reserves that space.
 */
export default function PageShell({
  crumbs,
  children,
  noPaddingTop = false,
}: {
  crumbs: Crumb[];
  children: React.ReactNode;
  noPaddingTop?: boolean;
}) {
  return (
    <>
      <Navbar />
      <div className={noPaddingTop ? "" : "pt-28"}>
        {crumbs?.length ? (
          <JsonLd data={breadcrumbSchema(crumbs)} />
        ) : null}
        <main id="main-content" className="pb-24">
          {children}
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
