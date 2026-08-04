import type { Metadata } from "next";

/**
 * The login page is a client component, so its noindex lives in this layout.
 * robots.txt disallows the path, but a disallowed URL can still be indexed from
 * an inbound link — the tag is what actually keeps it out.
 */
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false, nocache: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
