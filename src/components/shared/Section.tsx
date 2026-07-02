/**
 * Section wrapper with an anchor id (SOP §6 TOC jump-links) and a consistent
 * h2 so heading order stays h1 → h2 → h3 with no skips (SOP §4).
 */
export default function Section({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`max-w-5xl mx-auto px-4 py-8 scroll-mt-24 ${className}`}
      aria-labelledby={id ? `${id}-h` : undefined}
    >
      {title ? (
        <h2 id={id ? `${id}-h` : undefined} className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
