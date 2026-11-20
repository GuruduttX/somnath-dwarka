import { connectDB } from "@/src/lib/mongodb";
import TourPackageModel from "@/src/models/packageModel";
import { fillTokens } from "@/src/lib/pages/content";
import { getSiteSettings, settingsTokens } from "@/src/lib/pages/siteSettings";
import { mapAdminPackagesToTourCards, type AdminPackageRecord, type TourCardData } from "@/src/utils/TourData";
import type { CustomPage } from "@/src/lib/customPages";

/* What the public custom page and the admin preview both need before CustomPageView renders. */

/** Only what TourCard shows; full package documents are large. */
const CARD_FIELDS =
  "title slug duration category price rating reviews days nights destination routes heroImage childImages inclusions status " +
  "isTransferIncluded isStayIncluded isBreakfastIncluded isSightseeingIncluded";

/**
 * The page with its site tokens ({{whatsapp}}, ...) filled in, and the
 * published packages its packages sections name, as TourCard data keyed by slug.
 */
export async function prepareCustomPage(page: CustomPage): Promise<{ page: CustomPage; packages: Record<string, TourCardData> }> {
  const filled = fillTokens(page, settingsTokens(await getSiteSettings()));
  const packages: Record<string, TourCardData> = {};
  const slugs = filled.sections.flatMap((s) => (s.type === "packages" ? s.packageSlugs : []));
  if (slugs.length) {
    try {
      await connectDB();
      const rows = await TourPackageModel.find({ slug: { $in: slugs }, status: "published" }, CARD_FIELDS).lean();
      // Plain JSON for the client card component (no ObjectId or Date instances).
      const plainRows = JSON.parse(JSON.stringify(rows)) as AdminPackageRecord[];
      for (const card of mapAdminPackagesToTourCards(plainRows)) {
        if (card.slug) {
          packages[card.slug] = {
            id: card.id,
            title: card.title,
            location: card.location,
            groupType: card.groupType,
            days: card.days,
            price: card.price,
            inclusions: card.inclusions,
            images: card.images,
            href: card.href,
            badge: card.badge,
            rating: card.rating,
            reviews: card.reviews,
          };
        }
      }
    } catch (error) {
      console.error("Custom page: packages", error);
    }
  }
  return { page: filled, packages };
}
