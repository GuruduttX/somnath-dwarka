export interface TourPackage {
  id: number;
  title: string;
  location: string;
  duration: string;
  groupType: string;
  days: number;
  price: number;
  originalPrice: number;
  inclusions: string[];
  images: string[]; // always exactly 5
  badge?: string;
  popular?: boolean;
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 1,
    title: "Somnath Jyotirlinga Darshan",
    location: "Somnath",
    duration: "2-days",
    groupType: "Families",
    days: 2,
    price: 8999,
    originalPrice: 14000,
    popular: true,
    badge: "Most Popular",
    inclusions: ["AC Cab", "VIP Darshan Pass", "Local Guide", "Hotel Stay"],
    images: [
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=75&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Dwarka Dwarkadhish Yatra",
    location: "Dwarka",
    duration: "3-days",
    groupType: "Pilgrims",
    days: 3,
    price: 11499,
    originalPrice: 18000,
    badge: "Best Value",
    inclusions: ["AC Cab", "Temple Darshan", "Expert Guide", "Pickup & Drop"],
    images: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=400&q=75&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Somnath & Dwarka Grand Tour",
    location: "Somnath · Dwarka",
    duration: "5-days",
    groupType: "All Groups",
    days: 5,
    price: 18999,
    originalPrice: 28000,
    popular: true,
    badge: "Best Combo",
    inclusions: ["AC Cab", "VIP Darshan Pass", "Premium Hotel", "Expert Guide"],
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=75&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    title: "Nageshwar & Beyt Dwarka",
    location: "Dwarka · Beyt",
    duration: "4-days",
    groupType: "Families",
    days: 4,
    price: 14499,
    originalPrice: 22000,
    inclusions: ["AC Cab", "Boat Ride", "Local Guide", "Pickup & Drop"],
    images: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1439853949212-36589f9f8a87?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=75&auto=format&fit=crop",
    ],
  },
  {
    id: 5,
    title: "Somnath Seashore Retreat",
    location: "Somnath",
    duration: "3-days",
    groupType: "Couples",
    days: 3,
    price: 12999,
    originalPrice: 19500,
    inclusions: ["AC Cab", "Beachside Hotel", "Aarti Experience", "Guide"],
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484821582734-6692f2b3e9ca?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=75&auto=format&fit=crop",
    ],
  },
  {
    id: 6,
    title: "Gujarat Pilgrimage Circuit",
    location: "Gujarat Full Circuit",
    duration: "7-days",
    groupType: "Groups",
    days: 7,
    price: 24999,
    originalPrice: 38000,
    badge: "Premium",
    inclusions: ["Luxury AC Bus", "VIP Darshan", "5★ Hotels", "Expert Guide"],
    images: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&q=75&auto=format&fit=crop",
    ],
  },
];