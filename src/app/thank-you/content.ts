import type { PageDef } from "@/src/lib/pages/types";

/* Copy of /thank-you/ (page id "thank-you"), the page enquiry forms land on. */

export const THANK_YOU_DEFAULTS = {
  meta: {
    title: "Thank you — your enquiry is in",
    description:
      "Thanks for your enquiry. Our team will call you back shortly to plan your Somnath–Dwarka trip. For anything urgent, message us on WhatsApp.",
  },
  h1: "Thank you — we've got your enquiry",
  text: "Our team will call you back shortly to plan your Somnath–Dwarka trip. For anything urgent, message us on WhatsApp using the button below.",
  button: { label: "Back to home", href: "/" },
};

export const THANK_YOU_PAGE: PageDef<typeof THANK_YOU_DEFAULTS> = {
  id: "thank-you",
  title: "Thank-you page",
  group: "Small pages",
  path: "/thank-you/",
  notes:
    "The page shown after an enquiry is sent (noindex). meta {title, description} (used for link previews), h1, text, button {label, href}. " +
    "Hiding it breaks the enquiry flow's landing page, so don't. Plain text.",
  defaults: THANK_YOU_DEFAULTS,
};
