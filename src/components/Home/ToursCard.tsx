"use client";

import { ADMIN_DEMO_PACKAGES } from "@/src/lib/seed/adminPackages";
import { mapAdminPackagesToTourCards } from "@/src/utils/TourData";
import TourCard from "@/src/utils/TourCard";

export default function TourCards() {
  const packages = mapAdminPackagesToTourCards(ADMIN_DEMO_PACKAGES);

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
      {packages.map((pkg) => (
        <TourCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
