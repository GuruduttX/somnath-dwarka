import { CONTACT, waLink, telLink } from "@/src/config/site";

/**
 * Sticky WhatsApp + Call bar on all pages/viewports (SOP §6, §13).
 * Real <a> deep links (tel: + wa.me) — works with JS disabled.
 */
export default function StickyContactBar() {
  return (
    <nav className="sticky-contact-bar" aria-label="Contact us">
      <a className="scb-call" href={telLink()} aria-label="Call us">
        <span aria-hidden="true">📞</span> Call
      </a>
      <a
        className="scb-wa"
        href={waLink("Hi, I'd like to plan a Somnath–Dwarka trip.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${CONTACT.phoneDisplay}`}
      >
        <span aria-hidden="true">💬</span> WhatsApp
      </a>
    </nav>
  );
}
