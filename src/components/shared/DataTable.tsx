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
    <figure className="my-6">
      {caption ? (
        <figcaption className="mb-2 font-semibold text-gray-800">{caption}</figcaption>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-orange-100">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[#E87722] to-[#FF8A2A] text-white">
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className={ri % 2 ? "bg-orange-50/40" : "bg-white"}>
                {r.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-gray-700 border-b border-orange-50">
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
