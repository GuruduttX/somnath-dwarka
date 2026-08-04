import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/src/lib/seo";

/**
 * Thank-you page (SOP §11, §13) — noindex,follow. It still declares a
 * canonical and OG tags: the URL gets shared and pasted into chat apps after a
 * booking, and noindex governs the index, not what a link preview shows.
 */
export const metadata: Metadata = buildMetadata({
  title: "Thank you — your enquiry is in",
  description:
    "Thanks for your enquiry. Our team will call you back shortly to plan your Somnath–Dwarka trip. For anything urgent, message us on WhatsApp.",
  path: "/thank-you/",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-4" aria-hidden="true">
        🙏
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank you — we&apos;ve got your enquiry</h1>
      <p className="text-gray-600 mb-8">
        Our team will call you back shortly to plan your Somnath–Dwarka trip. For anything
        urgent, message us on WhatsApp using the button below.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full bg-[#E87722] text-white font-semibold"
      >
        Back to home
      </Link>
    </main>
  );
}
