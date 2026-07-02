import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/terms/";
export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions — Somnath Dwarka Tour Package",
  description: "Terms and conditions governing the use of this website and our tour and cab services.",
  path: PATH,
});

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & conditions"
      path={PATH}
      intro="By using this website and booking our services, you agree to the following terms. These may be updated from time to time."
      sections={[
        { heading: "Information accuracy", body: ["Prices, timings, distances and fares shown on this site are indicative and are confirmed at the time of booking. Temple timings and festival dates are subject to change by the respective authorities."] },
        { heading: "Services", body: ["We provide tour planning, cab arrangements and hotel assistance for the Somnath–Dwarka circuit. Third-party services (hotels, transport) are subject to their own terms."] },
        { heading: "Liability", body: ["We are not liable for delays or changes caused by weather, temple schedules, traffic or other circumstances beyond our reasonable control."] },
      ]}
    />
  );
}
