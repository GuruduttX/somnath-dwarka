/**
 * Section wrapper with an anchor id (SOP §6 TOC jump-links) and a consistent
 * h2 so heading order stays h1 → h2 → h3 with no skips (SOP §4).
 */
export default function Section({
  id,
  title,
  children,
  className = "",
  wide = false,
  full = false,
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  /** Widen the content column from max-w-5xl to max-w-7xl (e.g. multi-card grids). */
  wide?: boolean;
  /** Drop the max-width cap entirely and use the wider gutters the package showcase uses. */
  full?: boolean;
}) {
  const width = full
    ? "w-full px-4 sm:px-8 lg:px-16 xl:px-24"
    : `${wide ? "max-w-7xl" : "max-w-5xl"} px-4 sm:px-6 lg:px-8`;

  return (
    <section
      id={id}
      className={`${width} mx-auto py-8 scroll-mt-24 ${className}`}
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
