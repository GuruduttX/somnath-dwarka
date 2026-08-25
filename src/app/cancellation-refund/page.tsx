import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/cancellation-refund/";
export const metadata: Metadata = buildMetadata({
  title: "Cancellation Policy & Refund Terms — Somnath Dwarka Tour Package",
  description: "Detailed cancellation fee slabs, refund processing timelines, festival reservation rules, and force majeure policies for Gujarat pilgrimage bookings.",
  path: PATH,
});

export default function CancellationRefundPage() {
  return (
    <PolicyPage
      title="Cancellation Policy & Refund Process"
      path={PATH}
      intro="We understand that travel plans and pilgrimage schedules can change due to unforeseen circumstances. Our cancellation and refund framework is transparent, fair, and structured around the advance commitments made to hotels and transport fleets."
      sections={[
        {
          heading: "1. Standard Cancellation Slabs (Regular Season)",
          body: [
            "Cancellation requests must be submitted in writing via email or through your verified WhatsApp communication thread with our reservations desk.",
            "More than 15 Days prior to Departure Date: Full refund of the advance deposit minus a nominal administrative and banking charge of ₹1,000 per booking.",
            "8 to 14 Days prior to Departure Date: 25% of the total package cost is retained as cancellation fee; the remaining balance of the advance is refunded.",
            "3 to 7 Days prior to Departure Date: 50% of the total package cost is retained, covering non-refundable vehicle reservations and guaranteed hotel holding fees.",
            "Less than 72 Hours / No-Show on Date of Travel: 100% of the advance amount is forfeited as hotels and chauffeurs are fully committed and cannot be reassigned."
          ],
        },
        {
          heading: "2. Peak Festival & High-Demand Season Bookings",
          body: [
            "During peak religious festivals and holiday rushes—including Janmashtami (Dwarka), Mahashivratri (Somnath / Bhavnath Fair), Diwali & Gujarati New Year week, Kartika Purnima, and Christmas / New Year week—hotels in Dwarka and Somnath enforce strict non-refundable reservation policies.",
            "For bookings scheduled during these designated peak festival windows, advance payments are strictly non-refundable once hotel booking vouchers have been issued, unless an alternative guest substitution is provided by the client."
          ],
        },
        {
          heading: "3. Refund Processing Timelines & Disbursement",
          body: [
            "Once a written cancellation request is verified and approved by our accounts department, refunds are processed within 3 to 7 working days.",
            "Refunds are credited directly to the original payment source (the bank account or UPI ID used during the initial transaction). Cash refunds are not issued.",
            "You will receive an official digital credit note and banking transaction reference ID as soon as the refund transfer is executed."
          ],
        },
        {
          heading: "4. Force Majeure, Weather Disruptions & Temple Closures",
          body: [
            "In the rare event of extreme meteorological conditions (such as Arabian Sea cyclonic advisories impacting Saurashtra coastlines, severe coastal flooding, or Okha jetty boat suspensions), road blockages, or unannounced governmental / temple trust restrictions, we prioritize passenger safety.",
            "If a tour is interrupted due to force majeure events before travel commences, travellers can reschedule their trip within 6 months without date-change penalties, subject to seasonal hotel rate parity.",
            "If disruptions occur mid-journey, unutilized portions of hotel stays and transport will be calculated and refunded subject to third-party vendor reconciliation."
          ],
        },
        {
          heading: "5. Partial Cancellation & Group Size Adjustments",
          body: [
            "If individual members of a group booking cancel while the rest of the group proceeds, the overall package cost will be recalculated based on the updated vehicle occupancy and room sharing configuration.",
            "Individual room cancellations within a larger family group are subject to the standard time slabs outlined above."
          ],
        },
        {
          heading: "6. How to Submit a Cancellation Request",
          body: [
            "To initiate a cancellation, please email our support desk at contact@somnathdwarkatourpackage.com or message your assigned Trip Coordinator on WhatsApp with your Booking Reference Number, registered mobile number, and reason for cancellation.",
            "Our team will confirm receipt within 4 business hours and guide you through the refund assessment process."
          ],
        },
      ]}
    />
  );
}

