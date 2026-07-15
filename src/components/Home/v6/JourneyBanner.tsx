import Image from "next/image";

/**
 * Full-width promo banner that sits above the tour-package showcase.
 * The artwork carries all the copy and CTAs, so the markup stays a single image
 * with an alt that describes what the banner says.
 */
export default function JourneyBanner() {
  return (
    <div className="mx-auto w-full px-4 pt-0 pb-10 sm:px-8 sm:pb-14 lg:px-16 xl:px-24">
      <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-orange-100">
        <Image
          src="/images/home/somnath-dwarka-banner.webp"
          alt="A sacred journey to Somnath &amp; Dwarka — where faith meets eternity. Two divine destinations, one blessed journey."
          width={2000}
          height={973}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="h-auto w-full"
          priority={false}
        />
      </div>
    </div>
  );
}
