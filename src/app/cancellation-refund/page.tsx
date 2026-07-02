import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/cancellation-refund/";
export const metadata: Metadata = buildMetadata({
  title: "Cancellation & Refund — Somnath Dwarka Tour Package",
  description: "Our cancellation and refund terms for Somnath–Dwarka tour packages and cab bookings.",
  path: PATH,
});

export default function CancellationRefundPage() {
  return (
    <PolicyPage
      title="Cancellation & refund"
      path={PATH}
      intro="This page outlines how cancellations and refunds are handled. Specific timelines and charges are confirmed in your booking confirmation."
      sections={[
        { heading: "Cancellation by you", body: ["Cancellation charges depend on how far in advance you cancel and any non-refundable components (such as pre-booked hotels during peak festival dates). Exact terms are in your confirmation."] },
        { heading: "Refunds", body: ["Eligible refunds are processed to the original payment method within the timeline stated in your confirmation."] },
        { heading: "Changes & force majeure", body: ["Itineraries may change due to temple schedules, weather or circumstances beyond our control. We will offer suitable alternatives where possible."] },
      ]}
    />
  );
}
