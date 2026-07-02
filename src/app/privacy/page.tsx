import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/privacy/";
export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — Somnath Dwarka Tour Package",
  description: "How we collect, use and protect your personal information when you enquire or book with us.",
  path: PATH,
});

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      path={PATH}
      intro="This policy explains what personal data we collect through enquiries and how we use it. We collect only what we need to respond to your enquiry."
      sections={[
        { heading: "What we collect", body: ["When you submit an enquiry we collect your name, phone/WhatsApp, optional email and trip details. We do not store payment card details on this website."] },
        { heading: "How we use it", body: ["We use your details only to respond to your enquiry, prepare a quote and arrange your trip. We do not sell your data."] },
        { heading: "Your choices", body: ["You can ask us to update or delete your enquiry data at any time by contacting us. Analytics, where enabled, are used in aggregate to improve the site."] },
      ]}
    />
  );
}
