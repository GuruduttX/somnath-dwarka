import Image from "next/image";

/**
 * Full-width promo banner that sits above the tour-package showcase.
 * The artwork carries all the copy and CTAs, so the markup stays a single image
 * with an alt that describes what the banner says.
 */
export default function JourneyBanner() {
  return (
    <div className="mx-auto w-full px-2 pt-0 pb-6 sm:px-8 sm:pb-14 lg:px-16 xl:px-24">
      {/* The artwork is a 2:1 landscape and all of its copy sits inside the
          frame, so it can only be made taller on a phone by widening the box
          and taking a shallow crop — anything deeper would clip the wordmark.
          A real jump in height needs a portrait cut of the artwork. */}
      <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-orange-100 sm:rounded-2xl">
        <Image
          src="/images/home/somnath-dwarka-banner.webp"
          alt="A sacred journey to Somnath &amp; Dwarka — where faith meets eternity. Two divine destinations, one blessed journey."
          width={2000}
          height={973}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="aspect-[15/8] w-full object-cover object-center sm:aspect-auto sm:h-auto"
          priority={false}
        />
      </div>
    </div>
  );
}
