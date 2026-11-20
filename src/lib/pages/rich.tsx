import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

/*
  Inline markup for CMS-editable copy. Kept deliberately small so it reads well
  in a JSON field and can be typed by an editor or by Claude:
    [anchor text](/path)   a link (site path, #anchor or full https URL)
    **bold text**          bold
  Everything else is plain text. Paragraphs are separate strings, never HTML.
*/

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*/g;

export type RichLink = ComponentType<{ href: string; children: ReactNode }>;
export type RichBold = ComponentType<{ children: ReactNode }>;

const DefaultLink: RichLink = ({ href, children }) => <Link href={href}>{children}</Link>;
const DefaultBold: RichBold = ({ children }) => <strong>{children}</strong>;

/** The text as React nodes, with its links and bold rendered by the given components. */
export function rich(text: string | null | undefined, link: RichLink = DefaultLink, bold: RichBold = DefaultBold): ReactNode {
  if (!text) return null;
  const L = link;
  const B = bold;
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (m[1] !== undefined) out.push(<L key={key++} href={m[2]}>{m[1]}</L>);
    else out.push(<B key={key++}>{m[3]}</B>);
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : <>{out}</>;
}

/** The same text with the markup removed: for meta tags, JSON-LD and alt text. */
export function plain(text: string | null | undefined): string {
  return String(text ?? "").replace(TOKEN, (_m, label?: string, _href?: string, bold?: string) => label ?? bold ?? "");
}
