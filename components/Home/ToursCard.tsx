"use client";

import { TOUR_PACKAGES } from "@/utils/TourData";
import TourCard from "@/utils/TourCard";

export default function TourCards() {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
      {TOUR_PACKAGES.map((pkg : any) => (
        <TourCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}