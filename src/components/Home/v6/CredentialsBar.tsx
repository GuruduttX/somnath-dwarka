import { CREDENTIALS } from "@/src/config/site";

/**
 * Home §2 — credentials trust bar (home-page map v6).
 *
 * Renders only credentials the operator genuinely holds (`verify === true` and a
 * value present). With none confirmed, the strip renders nothing rather than
 * showing an empty or invented badge. Flip the flags in config/site.ts as the
 * client confirms each one.
 */
export default function CredentialsBar() {
  const shown = CREDENTIALS.filter((c) => c.verify && c.value);
  if (!shown.length) return null;

  return (
    <section aria-label="Our credentials" className="border-y border-orange-100 bg-orange-50/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3">
        {shown.map((c) => (
          <span key={c.key} className="text-xs font-medium text-gray-700">
            <span className="text-gray-500">{c.label}:</span> {c.value}
          </span>
        ))}
      </div>
    </section>
  );
}
