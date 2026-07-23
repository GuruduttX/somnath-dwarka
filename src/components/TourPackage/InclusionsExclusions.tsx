import { Check, X } from "lucide-react";

/**
 * Inclusions and exclusions for a package.
 *
 * Both the /somnath-dwarka-tour-package route and PackageDetailTemplate render
 * this block, and the markup had drifted into two identical copies — it lives
 * here so a layout change lands on both.
 *
 * The two lists sit in one card split by a rule rather than in nested tinted
 * panels: a card inside a card inside a list row stacked three sets of padding
 * on a phone, which is what made the section feel so airy.
 */
export default function InclusionsExclusions({
  inclusions,
  exclusions,
}: {
  inclusions?: string[];
  exclusions?: string[];
}) {
  if (!inclusions?.length && !exclusions?.length) return null;

  const columns = [
    {
      title: "What is included",
      items: inclusions,
      icon: <Check size={11} strokeWidth={3.2} />,
      headText: "text-emerald-700",
      headBadge: "bg-emerald-100 text-emerald-700",
      itemBadge: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    },
    {
      title: "What is excluded",
      items: exclusions,
      icon: <X size={11} strokeWidth={3.2} />,
      headText: "text-rose-700",
      headBadge: "bg-rose-100 text-rose-700",
      itemBadge: "bg-rose-50 text-rose-500 ring-rose-100",
    },
  ].filter((column) => column.items?.length);

  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 sm:p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-950 sm:text-xl">
        <span className="inline-block h-5 w-1 rounded-full bg-orange-500" />
        Inclusions &amp; exclusions
      </h3>

      <div className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
        {columns.map((column, index) => (
          <div
            key={column.title}
            className={`py-4 first:pt-0 last:pb-0 md:py-0 ${index ? "md:pl-6" : "md:pr-6"}`}
          >
            <h4
              className={`mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] ${column.headText}`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${column.headBadge}`}
              >
                {column.icon}
              </span>
              {column.title}
            </h4>
            <ul className="space-y-2">
              {column.items?.map((item, k) => (
                <li key={k} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-700 sm:text-sm">
                  {/* mt nudges the badge onto the first line of wrapped copy. */}
                  <span
                    className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ring-1 ${column.itemBadge}`}
                  >
                    {column.icon}
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
