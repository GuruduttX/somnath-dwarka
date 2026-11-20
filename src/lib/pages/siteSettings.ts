import { CONTACT } from "@/src/config/site";
import { mergeContent } from "./content";
import { readStoredContent } from "./store";
import type { PageDef } from "./types";

/*
  Site-wide facts that page copy can refer to with tokens instead of typing
  them in, so one edit here updates every CMS-edited page and custom page
  that uses them:
    {{whatsapp}}      7300620809
    {{whatsappUrl}}   https://wa.me/917300620809
    {{phone}}         +91 7300620809
    {{phoneUrl}}      tel:+917300620809
    {{email}}         info@experiencemyindia.com
  The Navbar, footer and sticky contact bar still read CONTACT in
  src/config/site.ts (and its NEXT_PUBLIC_* env overrides).
*/

const digitsOf = (v: string) => v.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

export const SITE_SETTINGS_DEFAULTS = {
  /** 10-digit Indian mobile number used for calls and WhatsApp, without +91. */
  whatsappNumber: digitsOf(CONTACT.whatsapp),
  /** Contact email shown on the pages. */
  email: CONTACT.email as string,
};

export type SiteSettings = typeof SITE_SETTINGS_DEFAULTS;

export const SITE_SETTINGS_DEF: PageDef<SiteSettings> = {
  id: "site-settings",
  title: "Site settings (WhatsApp / phone number, email tokens)",
  group: "Site-wide",
  path: "/",
  scope: "layout",
  notes:
    "Values that CMS-edited page copy and custom pages use through tokens: {{whatsapp}} = whatsappNumber, " +
    "{{whatsappUrl}} = https://wa.me/91 + whatsappNumber, {{phone}} = +91 + whatsappNumber, {{phoneUrl}} = tel:+91 + whatsappNumber, " +
    "{{email}} = email. The Navbar, footer and sticky call bar are code and keep the number set in src/config/site.ts.",
  defaults: SITE_SETTINGS_DEFAULTS,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const stored = await readStoredContent(SITE_SETTINGS_DEF.id);
  return stored ? mergeContent(SITE_SETTINGS_DEFAULTS, stored) : SITE_SETTINGS_DEFAULTS;
}

export function settingsTokens(s: SiteSettings): Record<string, string> {
  const digits = digitsOf(s.whatsappNumber);
  return {
    whatsapp: digits,
    whatsappUrl: `https://wa.me/91${digits}`,
    phone: `+91 ${digits}`,
    phoneUrl: `tel:+91${digits}`,
    email: s.email,
  };
}
