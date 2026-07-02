/**
 * Four-tag badge (SOP §2 four-tag enforcement).
 * Every factual statement carries one of: verified · faith-legend · local · opinion.
 * Faith/opinion must be visibly distinct from verified facts.
 */
export type FactTagType = "verified" | "faith" | "local" | "opinion";

const LABEL: Record<FactTagType, string> = {
  verified: "Verified",
  faith: "Faith / legend",
  local: "Local tip",
  opinion: "Opinion",
};

export default function FactTag({ type }: { type: FactTagType }) {
  return (
    <span className={`fact-tag fact-tag--${type}`} title={LABEL[type]}>
      {LABEL[type]}
    </span>
  );
}
