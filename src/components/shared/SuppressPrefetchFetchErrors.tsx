"use client";

import { useEffect } from "react";

/**
 * Next.js prefetches route RSC payloads for <Link>s in the viewport. Some
 * browser extensions monkey-patch window.fetch and make those requests reject
 * with `TypeError: Failed to fetch`. The router already handles this gracefully
 * (it falls back to a full browser navigation), but it leaves behind two pieces
 * of noise:
 *   1. an *unhandled* promise rejection (trips the dev error overlay), and
 *   2. a `console.error("Failed to fetch RSC payload for …")` from the router.
 *
 * The rejection originates in the extension's own JS realm, so the reason is a
 * cross-realm TypeError — `reason instanceof TypeError` is false here. We match
 * on the message text instead (duck-typing) and only swallow this one specific,
 * non-fatal case so real errors still surface.
 */
function isFailedFetch(value: unknown): boolean {
  const msg =
    typeof value === "string"
      ? value
      : value && typeof (value as { message?: unknown }).message === "string"
      ? (value as { message: string }).message
      : "";
  return /failed to fetch/i.test(msg);
}

export default function SuppressPrefetchFetchErrors() {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      if (isFailedFetch(event.reason)) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", onRejection);

    // Filter the router's non-fatal "Failed to fetch RSC payload" console noise
    // without hiding anything else.
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const first = args[0];
      const text = typeof first === "string" ? first : "";
      if (
        /failed to fetch rsc payload/i.test(text) ||
        args.some((a) => isFailedFetch(a))
      ) {
        return;
      }
      originalError.apply(console, args as []);
    };

    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      console.error = originalError;
    };
  }, []);

  return null;
}
