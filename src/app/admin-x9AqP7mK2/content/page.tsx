import Link from "next/link";
import { CONTENT_TYPES } from "@/src/lib/contentRegistry";

export const dynamic = "force-dynamic";

export default function ContentHubPage() {
  const types = Object.values(CONTENT_TYPES);
  return (
    <div className="p-6 text-pink-100">
      <h1 className="text-2xl font-bold mb-1">Content</h1>
      <p className="text-pink-300/70 mb-6 text-sm">
        Add and edit SOP content types. Each entry becomes a live, SEO-complete page.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((t) => (
          <Link
            key={t.key}
            href={`/admin-x9AqP7mK2/content/${t.key}`}
            className="block p-4 rounded-xl border border-pink-900/40 bg-pink-950/20 hover:border-pink-600/60 transition"
          >
            <span className="block font-semibold">{t.label}</span>
            <span className="block text-xs text-pink-300/60 mt-1">{t.pathHint}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
