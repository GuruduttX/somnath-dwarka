import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One trailing-slash convention; Next 301s the non-slash variant (SOP §3).
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.openai.com",
      },
      {
        protocol: "https",
        hostname: "**.toiimg.com",
      },
      {
        protocol: "https",
        hostname: "i.redd.it",
      },
      {
        protocol: "https",
        hostname: "www.adotrip.com",
      },
      {
        protocol: "https",
        hostname: "www.revv.co.in",
      },
    ],
  },
  async redirects() {
    // 301 legacy paths to the SOP canonical URL scheme (SOP §3).
    return [
      {
        source: "/tour-packages",
        destination: "/somnath-dwarka-tour-package/",
        permanent: true,
      },
      {
        source: "/tour-packages/:duration/:slug",
        destination: "/somnath-dwarka-tour-package/:slug/",
        permanent: true,
      },
      { source: "/blog", destination: "/guides/", permanent: true },
      { source: "/blog/:slug", destination: "/guides/:slug/", permanent: true },
      { source: "/services", destination: "/somnath-dwarka-taxi-service/", permanent: true },
    ];
  },
  async headers() {
    const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === "staging";
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];
    // Staging noindex header (SOP §15) — belt-and-braces with robots.ts.
    if (isStaging) {
      securityHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
