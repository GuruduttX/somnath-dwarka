import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress assets using Gzip / Brotli
  compress: true,
  // One trailing-slash convention; Next 301s the non-slash variant (SOP §3).
  trailingSlash: true,
  // Tree-shake icon barrels to their per-icon modules so the home page ships
  // (and hydrates) less JS — Script Evaluation is the top main-thread cost.
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "date-fns"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      { source: "/somnath-tour-package", destination: "/somnath/", permanent: true },
      { source: "/somnath-tour-package/:path*", destination: "/somnath/:path*/", permanent: true },
      { source: "/dwarka-tour-package", destination: "/dwarka/", permanent: true },
      { source: "/dwarka-tour-package/:path*", destination: "/dwarka/:path*/", permanent: true },
      { source: "/blog", destination: "/guides/", permanent: true },
      { source: "/blog/:slug", destination: "/guides/:slug/", permanent: true },
      { source: "/services", destination: "/somnath-dwarka-taxi-service/", permanent: true },
      // Legacy 404 URLs reported in Ubersuggest audit (with :path* to match slash & non-slash variants)
      { source: "/best-places-to-visit-in-dwarka/:path*", destination: "/dwarka/", permanent: true },
      { source: "/best-diu-tourist-attractions-for-nature-history-lovers/:path*", destination: "/diu/", permanent: true },
      { source: "/guides/how-to-reach/:path*", destination: "/guides/how-to-reach-dwarka/", permanent: true },
      { source: "/guides/places-to-visit/:path*", destination: "/guides/places-to-visit-in-somnath/", permanent: true },
      { source: "/somnath/places-to-visit/:path*", destination: "/somnath/", permanent: true },
      { source: "/gujarat/:path*", destination: "/gujarat-tour-packages/", permanent: true },
      { source: "/kutch/:path*", destination: "/kutch-tour-package/", permanent: true },
      { source: "/sasan-gir/:path*", destination: "/gir/", permanent: true },
      { source: "/sasan gir/:path*", destination: "/gir/", permanent: true },
      // Cab routes moved under the taxi hub to match the URL map, which defines
      // no root-level -taxi URL. Old root paths 301 to their nested canonical.
      // [^/]+ is load-bearing: `.*-taxi` would also match the nested path and
      // redirect it onto itself.
      {
        source: "/:route([^/]+-taxi)",
        destination: "/somnath-dwarka-taxi-service/:route/",
        permanent: true,
      },
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
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
