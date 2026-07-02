import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Breadcrumb from "./Breadcrumb";
import JsonLd from "@/src/components/seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/src/lib/seo";

/**
 * Standard page frame: header, breadcrumb (+ BreadcrumbList JSON-LD), main
 * landmark (skip-link target), footer. Every template uses this so heading
 * order, landmarks and breadcrumbs are consistent (SOP §4, §5 DoD, §10).
 */
export default function PageShell({
  crumbs,
  children,
}: {
  crumbs: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {crumbs?.length ? (
        <>
          <Breadcrumb crumbs={crumbs} />
          <JsonLd data={breadcrumbSchema(crumbs)} />
        </>
      ) : null}
      <main id="main-content" className="pb-24">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
