/**
 * JSON for inside a <script> element. Plain JSON.stringify leaves "<" as-is, so
 * a CMS string containing "</script>" would close the tag and inject markup.
 * Escaping "<", ">" and "&" as unicode keeps the JSON identical to parsers.
 */
const toScriptJson = (v: unknown) =>
  JSON.stringify(v)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

/**
 * Renders one or more JSON-LD blocks server-side (SOP §12 — JSON-LD must be
 * in the raw HTML). Nulls are filtered so gated schema (Offer/Event/etc.)
 * simply doesn't render when its data gate isn't met.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown> | null> | null;
}) {
  const blocks = (Array.isArray(data) ? data : [data]).filter(Boolean) as Record<
    string,
    unknown
  >[];
  if (!blocks.length) return null;
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toScriptJson(block) }}
        />
      ))}
    </>
  );
}
