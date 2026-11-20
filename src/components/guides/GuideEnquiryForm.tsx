import { getPageContent } from "@/src/lib/pages/getPageContent";
import { GUIDE_BLOCKS_PAGE } from "@/src/app/guides/content";
import GuideEnquiryFormClient from "./GuideEnquiryFormClient";

/**
 * The guide-detail sidebar enquiry form. A server wrapper so its placeholders
 * and button texts can come from the CMS (the `enquiry` copy of the
 * "guide-page-blocks" page, src/app/guides/content.ts); the form itself is
 * the client component next to it.
 */
export default async function GuideEnquiryForm({ context }: { context: string }) {
  const copy = (await getPageContent(GUIDE_BLOCKS_PAGE)).enquiry;
  return <GuideEnquiryFormClient context={context} copy={copy} />;
}
