import Navbar from "@/src/utils/Navbar";
import SiteFooter from "./SiteFooter";
import JsonLd from "@/src/components/seo/JsonLd";
import Breadcrumb from "./Breadcrumb";
import { breadcrumbSchema, type Crumb } from "@/src/lib/seo";

/**
 * Standard page frame: the site's floating pill Navbar (shared with the
 * homepage — same component, same nav items, so the whole site has one
 * consistent header), a visible BreadcrumbList (nav) plus its matching
 * JSON-LD, main landmark (skip-link target), footer. Every template uses this
 * so heading order, landmarks and structured breadcrumbs are consistent
 * (SOP §4, §5 DoD, §10).
 *
 * Navbar is `position: fixed` and floats above the page, so it doesn't push
 * content down on its own — the pt-24/pt-28 wrapper below reserves that space.
 * The pill ends 88px down (top-6 + h-16), so 24 leaves just enough breathing
 * room on a phone without the dead band a full pt-28 left there.
 *
 * The visible breadcrumb shows on every page (skipped only for a lone "Home"
 * crumb). On full-bleed hero pages (`flushHero`) the hero bleeds up under the
 * navbar, so the breadcrumb is rendered as a light overlay pinned just below
 * the navbar instead of an inline strip — that keeps the hero flush (no white
 * gap) while the crumb stays visible. The matching JSON-LD always renders.
 */
export default function PageShell({
  crumbs,
  children,
  noPaddingTop = false,
  flushHero = false,
  // Grey by default so the crumb stays visible on light-hero pages. Destination
  // templates with a dark image hero pass `lightCrumb` explicitly to keep white.
  lightCrumb = false,
  centerCrumb = false,
}: {
  crumbs: Crumb[];
  children: React.ReactNode;
  noPaddingTop?: boolean;
  flushHero?: boolean;
  lightCrumb?: boolean;
  /** Centres the breadcrumb, for templates with a centred hero. */
  centerCrumb?: boolean;
}) {
  const renderCrumb = (crumbs?.length ?? 0) > 1;
  return (
    <>
      <Navbar />
      <div className={`relative ${noPaddingTop ? "" : "pt-24 sm:pt-28"}`}>
        {crumbs?.length ? (
          <JsonLd data={breadcrumbSchema(crumbs)} />
        ) : null}
        {renderCrumb ? (
          flushHero ? (
            <div className="pointer-events-none absolute inset-x-0 top-24 z-30">
              <div className="pointer-events-auto">
                <Breadcrumb crumbs={crumbs} light={lightCrumb} center={centerCrumb} />
              </div>
            </div>
          ) : (
            <Breadcrumb crumbs={crumbs} />
          )
        ) : null}
        <main id="main-content" className="pb-24">
          {children}
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
