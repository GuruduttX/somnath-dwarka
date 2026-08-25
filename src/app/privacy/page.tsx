import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/privacy/";
export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy & Data Protection — Somnath Dwarka Tour Package",
  description: "Read our comprehensive Privacy Policy detailing personal information protection, WhatsApp communications, booking security, and DPDP Act compliance.",
  path: PATH,
});

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy & Data Protection Notice"
      path={PATH}
      intro="Somnath Dwarka Tour Package ('we', 'us', or 'our') is committed to safeguarding the privacy, personal data, and confidentiality of our website visitors and pilgrims. This Privacy Policy details the types of personal data we collect, why we collect it, how it is secured, and your rights under the Digital Personal Data Protection Act (DPDP Act) and the Information Technology Act, 2000."
      sections={[
        {
          heading: "1. Information We Collect from You",
          body: [
            "We collect only the essential personal details required to provide accurate tour consultations, dedicated cab dispatch, and confirmed hotel accommodations.",
            "Contact & Communication Data: When you submit an enquiry form or message us via WhatsApp, we collect your full name, mobile telephone number, WhatsApp contact identifier, optional email address, and city of residence.",
            "Pilgrimage Itinerary Specifics: Travel dates, duration of stay, number of travelling adults/children/infants, preferred hotel tier, vehicle preference (Sedan, SUV, or Tempo Traveller), and special assistance requirements (such as ground-floor rooms or wheelchair accessibility).",
            "Identity Documents: For confirmed bookings, copies of government photo IDs (Aadhaar Card, Voter ID, Passport) are collected solely to facilitate mandatory guest check-in at verified hotels and temple trust security checkpoints.",
            "Payment Information: When making an advance deposit via bank transfer or UPI, transactions are processed directly through verified banking networks. We do not capture, process, or store credit card numbers, debit card PINs, or CVV credentials on our website servers."
          ],
        },
        {
          heading: "2. How and Why We Use Your Information",
          body: [
            "Providing Tour Quotations & Travel Vouchers: To create tailored day-wise pilgrimage itineraries, compute transparent quotes, and issue official travel confirmation vouchers.",
            "Customer Communication: To provide real-time updates regarding cab pickup points, chauffeur phone numbers, hotel check-in assistance, and temple darshan guidelines via phone call, SMS, or WhatsApp.",
            "Ground Coordination: Sharing guest name lists and vehicle requirement specifications with our local chauffeurs and hotel partners across Somnath, Dwarka, Junagadh, Porbandar, and Sasan Gir.",
            "We do not sell, rent, trade, or monetize your personal contact information to third-party telemarketers or external advertisers under any circumstances."
          ],
        },
        {
          heading: "3. Third-Party Service Providers & Data Disclosures",
          body: [
            "We engage trusted enterprise infrastructure partners to operate our digital and travel services:",
            "Travel CRM & Trip Operations (Sembark): Used to manage trip inquiries, driver allocations, and customer support history securely.",
            "Transactional Communications (WhatsApp & Resend): Used to dispatch booking confirmation emails, instant quotation messages, and driver contact cards.",
            "Law Enforcement & Statutory Disclosures: We may disclose guest information if required by court orders, local police directives during high-security temple festivals, or regulatory compliance mandates."
          ],
        },
        {
          heading: "4. Cookies & Analytical Technologies",
          body: [
            "Our website utilizes minimal, privacy-centric cookies to maintain session states, remember your preferred travel selections, and analyze anonymized site traffic trends.",
            "You can choose to disable cookies through your browser settings without affecting your ability to browse our travel guides and tour package details."
          ],
        },
        {
          heading: "5. Data Retention & Information Security",
          body: [
            "We enforce robust administrative, technical, and physical security safeguards to protect your personal data against unauthorized access, loss, alteration, or disclosure.",
            "Personal data associated with completed journeys is retained only as long as necessary to satisfy accounting audits, GST taxation records, and resolving any post-trip customer support queries."
          ],
        },
        {
          heading: "6. Your Rights & Data Choices",
          body: [
            "Under Indian data protection regulations, you have the right to request access to the personal data we hold about you, request corrections to inaccurate contact information, or request the deletion of your inquiry data from our marketing contact lists.",
            "To exercise any of these rights, please contact our Data Grievance Desk at privacy@somnathdwarkatourpackage.com with your registered phone number."
          ],
        },
      ]}
    />
  );
}

