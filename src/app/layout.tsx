import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL, BRAND, IS_STAGING } from "@/src/config/site";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import StickyContactBar from "@/src/components/shared/StickyContactBar";
import Analytics from "@/src/components/seo/Analytics";
import SuppressPrefetchFetchErrors from "@/src/components/shared/SuppressPrefetchFetchErrors";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/**
 * Sitewide defaults. Staging is noindex sitewide (SOP §15); production is
 * index,follow by default — per-page noindex comes from each page's metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | Itinerary, Cab & Hotel`,
    template: `%s — ${BRAND.shortName}`,
  },
  description: BRAND.tagline,
  robots: IS_STAGING
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        <JsonLd
          data={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SuppressPrefetchFetchErrors />
        {children}
        <StickyContactBar />
        <Analytics />
      </body>
    </html>
  );
}
