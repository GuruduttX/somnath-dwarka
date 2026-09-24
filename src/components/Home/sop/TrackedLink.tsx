"use client";

import { track, type EventName } from "@/src/lib/events";

/**
 * A plain <a> that also fires a GA4 event on click. Kept as the only client
 * piece of otherwise server-rendered home sections, so a CTA can be measured
 * without pulling the whole section into the browser bundle. The href works
 * with JS disabled; the event is a best-effort extra.
 */
export default function TrackedLink({
  href,
  event,
  label,
  className,
  children,
  external = false,
  ariaLabel,
}: {
  href: string;
  event: EventName;
  /** Which CTA this is, e.g. "home_hero" — sent as the event's cta param. */
  label: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track(event, { cta: label, page_cluster: "home" })}
    >
      {children}
    </a>
  );
}
