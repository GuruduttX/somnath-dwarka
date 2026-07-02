import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import { CONTACT, waLink, telLink } from "@/src/config/site";

/**
 * Sticky Call + WhatsApp bar on all pages/viewports (SOP §6, §13).
 * Icon-only (Call left, WhatsApp right) with real <a> deep links (tel: + wa.me)
 * — works with JS disabled. aria-labels keep it accessible (SOP §10).
 */
export default function StickyContactBar() {
  return (
    <nav className="sticky-contact-bar" aria-label="Contact us">
      <a className="scb-call" href={telLink()} aria-label={`Call ${CONTACT.phoneDisplay}`}>
        <FaPhone aria-hidden="true" />
      </a>
      <a
        className="scb-wa"
        href={waLink("Hi, I'd like to plan a Somnath–Dwarka trip.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${CONTACT.phoneDisplay}`}
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </nav>
  );
}
