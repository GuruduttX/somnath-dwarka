import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/booking-policy/";
export const metadata: Metadata = buildMetadata({
  title: "Booking Policy — Somnath Dwarka Tour Package",
  description: "How bookings, confirmations and payments work for our Somnath–Dwarka tours and cab services.",
  path: PATH,
});

export default function BookingPolicyPage() {
  return (
    <PolicyPage
      title="Booking policy"
      path={PATH}
      intro="This booking policy explains how reservations, confirmations and payments are handled. Final terms are shared in your booking confirmation."
      sections={[
        { heading: "Enquiry & quote", body: ["Share your dates, group size and starting city to receive a tailored itinerary and quote. Quotes are indicative until a booking is confirmed."] },
        { heading: "Confirmation", body: ["A booking is confirmed once we share written confirmation of the itinerary, inclusions and price. Please review all details before travel."] },
        { heading: "Payments", body: ["Payment terms (advance and balance) are stated in your confirmation. We do not store card details on this website."] },
      ]}
    />
  );
}
