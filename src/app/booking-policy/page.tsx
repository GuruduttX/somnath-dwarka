import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { BOOKING_POLICY_PAGE } from "./content";

const PATH = BOOKING_POLICY_PAGE.path;

/* Copy lives in ./content.ts and is editable through the CMS; a save refreshes this page at once. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(BOOKING_POLICY_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

export default async function BookingPolicyPage() {
  const c = await getPageContent(BOOKING_POLICY_PAGE);
  return <PolicyPage title={c.title} path={PATH} intro={c.intro} sections={c.sections} />;
}
