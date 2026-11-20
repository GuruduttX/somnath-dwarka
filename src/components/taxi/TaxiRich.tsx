import Link from "next/link";
import type { ReactNode } from "react";
import { rich, type RichLink } from "@/src/lib/pages/rich";

/*
  CMS-editable taxi copy may carry [anchor](/path/) links and **bold**
  (src/lib/pages/rich.tsx). Links render in the orange underline style the
  taxi pages already use for their inline links. Server-side only.
*/

const TaxiLink: RichLink = ({ href, children }) => (
  <Link href={href} className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800">
    {children}
  </Link>
);

export function taxiRich(text: string | null | undefined): ReactNode {
  return rich(text, TaxiLink);
}

/** Fills {name} placeholders in a template heading, e.g. "{origin} to {destination} taxi FAQs". */
export function fillSlots(text: string, slots: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (m, name: string) => (name in slots ? String(slots[name]) : m));
}
