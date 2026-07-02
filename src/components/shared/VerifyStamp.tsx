import type { VerifiedFact } from "@/src/config/site";

/**
 * "last verified: {date}" stamp + source link (SOP §2, §5 DoD).
 * When a datum is NOT yet verified, we say so plainly — never render an
 * unverified value as an established fact.
 */
export default function VerifyStamp({ fact }: { fact: VerifiedFact }) {
  if (fact.verify && fact.date) {
    return (
      <span className="verify-stamp">
        <span aria-hidden="true">✓</span>
        Last verified {new Date(fact.date).toLocaleDateString("en-GB")}
        {fact.source ? (
          <>
            {" · "}
            <a
              href={fact.source}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="underline"
            >
              source
            </a>
          </>
        ) : null}
      </span>
    );
  }
  return (
    <span className="verify-stamp verify-stamp--pending">
      <span aria-hidden="true">⧗</span> Awaiting confirmation — treat as indicative only
    </span>
  );
}
