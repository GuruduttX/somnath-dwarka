/**
 * Lazy map embed (SOP §6). Uses native loading="lazy" iframe with an explicit
 * title + fixed aspect ratio (no CLS). Query is a place name string.
 */
export default function MapEmbed({ query, title }: { query: string; title: string }) {
  // Must be the /maps/embed?pb= endpoint: the older `maps.google.com/maps?q=…
  // &output=embed` 301s here and the redirect response sends
  // `X-Frame-Options: SAMEORIGIN`, which browsers enforce mid-chain, blanking
  // the frame. This endpoint sends no XFO and still needs no API key.
  const src = `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${encodeURIComponent(query)}`;
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
