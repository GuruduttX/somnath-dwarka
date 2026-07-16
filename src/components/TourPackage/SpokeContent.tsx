import { Check, X } from "lucide-react";
import ReadMore from "./ReadMore";

type Decision = { title: string; intro: string; headers: string[]; rows: string[][]; note: string };
type WhyChoose = { title: string; points: string[] };
type NotForYou = { title: string; items: string[] };

type ProseSection = { h2: string; body: string[] };
type PriceMatrix = { headers: string[]; rows: string[][] };

export type SpokeExtras = {
  decision: Decision | null;
  sections: ProseSection[];
  priceMatrix: PriceMatrix | null;
  whyChoose: WhyChoose | null;
  notForYou: NotForYou | null;
  priceNotes: string[];
  finalCta: string;
};

/** The origin pages' long-form argument sections (the 02:57 problem, etc.). */
export function ProseSections({ sections }: { sections: ProseSection[] }) {
  if (!sections.length) return null;
  return (
    <div className={card}>
      <ReadMore collapsedHeight={380} moreLabel="Read the full breakdown">
        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h3 className={h3}>{bar}{s.h2}</h3>
              <div className="space-y-3">
                {s.body.map((p, j) => (
                  <p key={j} className="text-slate-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </ReadMore>
    </div>
  );
}

/** Full price matrix (tier by nights) for the origin pages. */
export function PriceMatrixTable({ matrix }: { matrix: PriceMatrix }) {
  return (
    <div className={card}>
      <h3 className={h3}>{bar}Price by tier and nights</h3>
      <p className="mb-5 text-sm text-slate-500">
        Per person. Hotel, breakfast and your vehicle with a driver are inside every number.
      </p>
      <div className="overflow-x-auto rounded-xl border border-orange-100">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-orange-50 text-[#7a4a2b]">
            <tr>
              {matrix.headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-50">
            {matrix.rows.map((r, i) => (
              <tr key={i} className="align-top hover:bg-orange-50/40">
                {r.map((c, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 ${j === 0 ? "font-bold text-slate-900" : j === r.length - 1 ? "text-slate-600" : "font-semibold text-[#B85C10]"}`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const card = "overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]";
const h3 = "text-xl font-bold text-slate-950 mb-4 flex items-center gap-2";
const bar = <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />;

/** The "decision" block — renders above the itinerary. */
export function DecisionBlock({ decision }: { decision: Decision }) {
  return (
    <div className={card}>
      <h3 className={h3}>{bar}{decision.title}</h3>
      {decision.intro ? <p className="text-slate-600 leading-relaxed mb-4">{decision.intro}</p> : null}
      {decision.rows.length ? (
        <div className="overflow-x-auto rounded-xl border border-orange-100">
          <table className="w-full min-w-[520px] text-left text-sm">
            {decision.headers.length ? (
              <thead className="bg-orange-50 text-[#7a4a2b]">
                <tr>
                  {decision.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody className="divide-y divide-orange-50">
              {decision.rows.map((r, i) => (
                <tr key={i} className="align-top hover:bg-orange-50/40">
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "font-semibold text-slate-900" : "text-slate-600"}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {decision.note ? <p className="mt-4 text-sm text-slate-500 leading-relaxed">{decision.note}</p> : null}
    </div>
  );
}

/** Why-choose + not-for-you + price notes — render below the itinerary/price. */
export default function SpokeContent({ extras }: { extras: SpokeExtras }) {
  const { whyChoose, notForYou, priceNotes } = extras;
  if (!whyChoose && !notForYou && !priceNotes.length) return null;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 pb-4">
      {priceNotes.length ? (
        <div className={card}>
          <h3 className={h3}>{bar}Good to know on price</h3>
          <div className="space-y-3">
            {priceNotes.map((n, i) => (
              <p key={i} className="text-sm text-slate-600 leading-relaxed">{n}</p>
            ))}
          </div>
        </div>
      ) : null}

      {whyChoose ? (
        <div className={card}>
          <h3 className={h3}>{bar}{whyChoose.title}</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyChoose.points.map((p, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-orange-100/40 bg-orange-50/20 p-3.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100/60 text-orange-600">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-[13.5px] text-slate-700 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {notForYou ? (
        <div className={card}>
          <h3 className={h3}>{bar}{notForYou.title}</h3>
          <ul className="space-y-3">
            {notForYou.items.map((it, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-rose-100/50 bg-rose-50/15 p-3.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100/60 text-rose-600">
                  <X size={12} strokeWidth={3} />
                </span>
                <span className="text-[13.5px] text-slate-700 leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
