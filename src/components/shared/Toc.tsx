/**
 * Table of contents jump-links (SOP §6). Real in-page anchors — crawlable,
 * keyboard-accessible, no JS.
 */
export default function Toc({ items }: { items: { id: string; label: string }[] }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="On this page" className="max-w-5xl mx-auto px-4 py-4">
      <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#B85C10] mb-2">
          On this page
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className="text-gray-600 hover:text-[#E87722]">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
