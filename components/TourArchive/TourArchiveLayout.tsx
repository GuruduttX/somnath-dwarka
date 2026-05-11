"use client";

import { TourFilterProvider } from "@/context/TourFilterContext";


interface TourArchiveLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function TourArchiveLayout({
  sidebar,
  children,
}: TourArchiveLayoutProps) {
  return (
    <TourFilterProvider>
      <section
        id="tours"
        className="bg-white py-10 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-20"
      >
        <div className="max-w-350 mx-auto flex flex-col gap-8 md:gap-12">
          <div className="w-full">{sidebar}</div>
          <div className="w-full">{children}</div>
        </div>
      </section>
    </TourFilterProvider>
  );
}