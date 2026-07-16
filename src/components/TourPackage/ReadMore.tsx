"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Collapses long content behind a "Read more" toggle with a soft fade.
 *
 * The children always stay in the DOM and are only clipped visually, so the
 * copy remains crawlable and extractable — important on money pages where the
 * long-form argument is the thing that ranks. The toggle only appears when the
 * content is actually taller than `collapsedHeight`, so short sections render
 * untouched with no button.
 */
export default function ReadMore({
  children,
  collapsedHeight = 340,
  moreLabel = "Read more",
  lessLabel = "Show less",
}: {
  children: React.ReactNode;
  collapsedHeight?: number;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  // Measure once mounted, and again if the viewport reflows the text.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setFull(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Until measured, render open so no-JS and first paint show everything.
  const overflows = full !== null && full > collapsedHeight + 48;
  const maxHeight = !overflows ? undefined : open ? full : collapsedHeight;

  return (
    <div>
      <div
        ref={ref}
        style={{ maxHeight }}
        className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          overflows && !open ? "[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" : ""
        }`}
      >
        {children}
      </div>

      {overflows ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group mt-4 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/60 px-4 py-2 text-sm font-semibold text-orange-700 transition-colors hover:border-orange-300 hover:bg-orange-100/70"
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${open ? "rotate-180" : "group-hover:translate-y-0.5"}`}
          />
        </button>
      ) : null}
    </div>
  );
}
