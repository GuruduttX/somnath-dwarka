/**
 * Lazy map embed (SOP §6). Uses native loading="lazy" iframe with an explicit
 * title + fixed aspect ratio (no CLS). Query is a place name string.
 */
export default function MapEmbed({ query, title }: { query: string; title: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-orange-100" style={{ aspectRatio: "16 / 9" }}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
      />
    </div>
  );
}
