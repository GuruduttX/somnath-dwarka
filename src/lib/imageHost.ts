/**
 * Where CMS images live, and which of them skip Next's image optimizer.
 *
 * New uploads go to Cloudflare R2 (src/services/admin/uploadImageServices.ts)
 * as WebP and are served straight from Cloudflare's CDN. Sending them through
 * /_next/image as well would make the Hostinger server download and re-encode
 * each photo, which is the work moving images to R2 takes off it.
 *
 * Existing Cloudinary photos were copied to R2 by
 * scripts/migrate-cloudinary-to-r2.mjs. Any Cloudinary URL still left in the
 * CMS goes through the optimizer, because that account rejects on-the-fly
 * resizing (HTTP 401).
 */

/**
 * The R2 bucket's custom domain. Site images (blog covers, destination and
 * fleet photos) live there, so it falls back to the real domain rather than ""
 * if the env value is ever missing from a deploy. Keep in step with
 * next.config.ts.
 */
export const R2_PUBLIC_URL = (
  process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://img.somnathdwarkatourpackage.com"
)
  .trim()
  .replace(/\/+$/, "");

/** Public URL of an object in the R2 bucket, e.g. r2Url("somnath-dwarka/fleet/ertiga.webp"). */
export function r2Url(key: string): string {
  return `${R2_PUBLIC_URL}/${key.replace(/^\/+/, "")}`;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

const R2_HOST = R2_PUBLIC_URL ? hostOf(R2_PUBLIC_URL) : "";

/** Origin to dns-prefetch in the document head. */
export const R2_ORIGIN = R2_HOST ? new URL(R2_PUBLIC_URL).origin : "";

/**
 * True for images on R2: the bucket's custom domain, or an r2.dev public URL.
 * These are already WebP, so they are served exactly as stored.
 */
export function isDirectImage(src: unknown): boolean {
  if (typeof src !== "string" || !/^https?:\/\//i.test(src)) return false;
  const host = hostOf(src);
  if (!host) return false;
  return (R2_HOST !== "" && host === R2_HOST) || host.endsWith(".r2.dev");
}
