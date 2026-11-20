import { isIP } from "node:net";
import sharp, { type OutputInfo } from "sharp";
import { SiteError } from "./types";

// One encoder thread: on Hostinger every thread counts against the account's process limit.
sharp.concurrency(1);

/** Largest file the server reads, before conversion. */
export const MAX_SOURCE_BYTES = 25 * 1024 * 1024;
/** Longest side after conversion; bigger photos are scaled down, smaller ones kept as they are. */
const MAX_SIDE = 2400;
/** The site's upload limit (kept under 10 MB). */
const MAX_WEBP_BYTES = 10 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 30_000;

export interface PreparedImage {
  bytes: Buffer<ArrayBuffer>;
  fileName: string;
  width: number;
  height: number;
}

/** "Somnath Temple (night).JPG" → "somnath-temple-night". */
function baseName(name: string): string {
  const stem = name.replace(/\.[a-z0-9]{2,5}$/i, "");
  return (
    stem
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "image"
  );
}

/**
 * Every site image is WebP. Any common format (JPG, PNG, WebP, AVIF, GIF,
 * TIFF, SVG) is turned upright, scaled to fit MAX_SIDE and saved as WebP.
 */
export async function toWebp(input: Uint8Array, name: string): Promise<PreparedImage> {
  let out: { data: Buffer<ArrayBuffer>; info: OutputInfo };
  try {
    out = (await sharp(input, { limitInputPixels: 100_000_000, autoOrient: true })
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true })) as { data: Buffer<ArrayBuffer>; info: OutputInfo };
  } catch {
    throw new SiteError(415, "This file is not an image the site can read. Use JPG, PNG, WebP, AVIF, GIF, TIFF or SVG.");
  }
  if (out.data.length > MAX_WEBP_BYTES) {
    throw new SiteError(413, "The image is still over 10 MB after conversion to WebP. Use a smaller image.");
  }
  return { bytes: out.data, fileName: `${baseName(name)}.webp`, width: out.info.width, height: out.info.height };
}

/** Hosts on the server's own machine or network, which a download must never reach. */
function isPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal") || host.endsWith(".local")) return true;
  const kind = isIP(host);
  if (kind === 4) {
    const [a, b] = host.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
  }
  if (kind === 6) {
    return host === "::1" || host === "::" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80") || host.startsWith("::ffff:");
  }
  return false;
}

/** Downloads an image from a public http(s) URL, refusing anything over MAX_SOURCE_BYTES. */
export async function downloadImage(raw: string): Promise<{ bytes: Uint8Array; name: string }> {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new SiteError(400, "imageUrl is not a valid URL.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new SiteError(400, "imageUrl must start with https:// or http://.");
  if (isPrivateHost(url.hostname)) throw new SiteError(400, "imageUrl must be a public address.");

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { accept: "image/*", "user-agent": "somnath-dwarka-cms-mcp/1.0" },
      signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
    });
  } catch {
    throw new SiteError(502, `Could not download ${url.host}: the server did not answer.`);
  }
  if (isPrivateHost(new URL(res.url).hostname)) throw new SiteError(400, "imageUrl redirected to a private address.");
  if (!res.ok) throw new SiteError(502, `Could not download the image (HTTP ${res.status} from ${url.host}).`);
  const type = res.headers.get("content-type") ?? "";
  if (type && !type.startsWith("image/") && !type.startsWith("application/octet-stream")) {
    throw new SiteError(415, `That URL is a ${type.split(";")[0]} page, not an image. Use the image's own address (right-click → Copy image address).`);
  }
  if (Number(res.headers.get("content-length") ?? 0) > MAX_SOURCE_BYTES) throw new SiteError(413, "The image is larger than 25 MB.");

  const chunks: Uint8Array[] = [];
  let size = 0;
  const reader = res.body?.getReader();
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > MAX_SOURCE_BYTES) {
      await reader.cancel();
      throw new SiteError(413, "The image is larger than 25 MB.");
    }
    chunks.push(value);
  }
  let name = url.pathname.split("/").pop() ?? "";
  try {
    name = decodeURIComponent(name);
  } catch {
    // Keep the raw name; it is only a hint for the file name.
  }
  return { bytes: Buffer.concat(chunks), name: name || "image" };
}
