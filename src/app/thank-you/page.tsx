import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/src/lib/seo";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { THANK_YOU_PAGE } from "./content";

/**
 * Thank-you page (SOP §11, §13) — noindex,follow. It still declares a
 * canonical and OG tags: the URL gets shared and pasted into chat apps after a
 * booking, and noindex governs the index, not what a link preview shows.
 */
/* Copy: ./content.ts (CMS page "thank-you"). */
export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(THANK_YOU_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: "/thank-you/", noindex: true });
}

export default async function ThankYouPage() {
  const c = await getPageContent(THANK_YOU_PAGE);
  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-4" aria-hidden="true">
        🙏
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{c.h1}</h1>
      <p className="text-gray-600 mb-8">
        {c.text}
      </p>
      <Link
        href={c.button.href}
        className="inline-block px-6 py-3 rounded-full bg-[#E87722] text-white font-semibold"
      >
        {c.button.label}
      </Link>
    </main>
  );
}
