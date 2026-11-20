import Img from "@/src/components/shared/Img";
import { isDirectImage } from "@/src/lib/imageHost";

/*
  An image whose address comes from the CMS. Images on the site's R2 host
  (where upload_image and the media uploader put them) and files in /public
  go through the site's <Img> (R2 photos load straight from Cloudflare); any
  other https address is shown as it is, since next/image refuses hosts that
  next.config.ts does not list.
*/

function known(src: string): boolean {
  return (src.startsWith("/") && !src.startsWith("//")) || isDirectImage(src);
}

export default function CmsImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /** The page's main (LCP) image: loaded at once instead of lazily. */
  priority?: boolean;
}) {
  if (known(src)) {
    return <Img src={src} alt={alt} fill sizes={sizes} className={className} priority={priority} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
