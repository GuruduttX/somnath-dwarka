"use client";

import { usePathname } from "next/navigation";
import Footer from "@/src/utils/Footer";
import StickyContactBar from "@/src/components/shared/StickyContactBar";
import { isAdminSurface } from "@/src/config/routes";

/**
 * The traveller-facing chrome: site footer plus the sticky call/WhatsApp bar.
 *
 * These used to be rendered straight from the root layout, which meant they
 * also appeared over the admin dashboard — the sticky bar floating above the
 * editor's controls and a full marketing footer under the CMS. The root layout
 * wraps every route, including /admin-x9AqP7mK2, so the only way to keep both
 * out of the dashboard without moving every public page into a route group is
 * to check the path at render time.
 *
 * A client component is required for that: `usePathname` is a client hook. It
 * renders nothing but two server-safe children, so the cost is one tiny client
 * boundary rather than pulling the footer itself into the browser bundle.
 */
export default function PublicChrome() {
  const pathname = usePathname();
  if (isAdminSurface(pathname)) return null;

  return (
    <>
      <Footer />
      <StickyContactBar />
    </>
  );
}
