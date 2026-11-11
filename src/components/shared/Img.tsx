import Image, { type ImageProps } from "next/image";
import { isDirectImage } from "@/src/lib/imageHost";

/**
 * The site's <Image>. Same props as next/image; the only difference is that
 * photos on Cloudflare R2 skip the optimizer and load straight from Cloudflare
 * (see src/lib/imageHost.ts). Files in /public, Cloudinary and Unsplash images
 * are optimized exactly as before.
 */
export default function Img(props: ImageProps) {
  const { alt, loader, unoptimized, src } = props;
  if (!loader && !unoptimized && isDirectImage(src)) {
    return <Image {...props} alt={alt} unoptimized />;
  }
  return <Image {...props} alt={alt} />;
}
