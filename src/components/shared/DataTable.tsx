import type { VerifiedFact } from "@/src/config/site";
import VerifyStamp from "./VerifyStamp";

/**
 * Generic responsive table (SOP §6) — backs price / timings / fare-by-vehicle /
 * distance-mode tables. Renders in raw HTML, horizontally scrolls on mobile,
 * and can carry a verify-stamp caption when the data is a `verify` datum.
 */
export default function DataTable({
  caption,
  columns,
  rows,
  verify,
}: {
  caption?: string;
  columns: string[];
  rows: (string | number)[][];
  verify?: VerifiedFact;
}) {
  if (!rows?.length) return null;
  return (
    <figure className="my-4">
      {caption ? (
        <figcaption className="mb-3 text-xs font-bold uppercase tracking-wider text-orange-700">{caption}</figcaption>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-orange-200 bg-white shadow-[0_4px_24px_rgba(234,88,12,0.02)]">
        <table className="w-full text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-orange-50/90 via-amber-50/60 to-orange-50/90 text-[#2D1B10] border-b border-orange-200/80 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
              {columns.map((c) => (
                <th key={c} className="px-5 py-3.5 text-left whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr 
                key={ri} 
                className={`transition-colors hover:bg-orange-50/25 ${ri % 2 ? "bg-orange-50/10" : "bg-white"}`}
              >
                {r.map((cell, ci) => (
                  <td key={ci} className="px-5 py-3 text-slate-700 font-medium border-b border-orange-100/40">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {verify ? (
        <div className="mt-2">
          <VerifyStamp fact={verify} />
        </div>
      ) : null}
    </figure>
  );
}
