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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
