import NavbarClient from "./NavbarClient";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { SITE_CHROME } from "@/src/lib/cms-groups/site";

/**
 * The site's floating pill Navbar. A server wrapper so the menu can be edited
 * through the CMS (page "site-chrome"); the interactive bar itself is
 * NavbarClient. Import this from server components only.
 */
export default async function Navbar() {
  const chrome = await getPageContent(SITE_CHROME);
  return <NavbarClient nav={chrome.nav} />;
}
