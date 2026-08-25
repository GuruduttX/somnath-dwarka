import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL, BRAND, IS_STAGING } from "@/src/config/site";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import Analytics from "@/src/components/seo/Analytics";
import SuppressPrefetchFetchErrors from "@/src/components/shared/SuppressPrefetchFetchErrors";
import PublicChrome from "@/src/components/shared/PublicChrome";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
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
  // Fallback social card. Every public page overrides this via buildMetadata();
  // this is what any route that ships without its own metadata inherits, so a
  // shared link is never a bare URL with no preview.
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: "en_IN",
    url: `${SITE_URL}/`,
    title: `${BRAND.name} | Itinerary, Cab & Hotel`,
    description: BRAND.tagline,
    images: [{ url: BRAND.ogImage, width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Itinerary, Cab & Hotel`,
    description: BRAND.tagline,
    images: [BRAND.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        <JsonLd
          data={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
        />
        <SuppressPrefetchFetchErrors />
        {children}
        {/* Footer + sticky call/WhatsApp bar + lazy lead popup, hidden on the admin surface. */}
        <PublicChrome />
        <Analytics />
      </body>
    </html>
  );
}
