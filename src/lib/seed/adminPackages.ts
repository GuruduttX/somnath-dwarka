import type { AdminPackageRecord } from "@/src/utils/TourData";

const item = (description: string) => ({ id: description.toLowerCase().replace(/\W+/g, "-"), description });

export const ADMIN_DEMO_PACKAGES: AdminPackageRecord[] = [
  {
    slug: "4-days-3-nights",
    title: "Somnath Dwarka Classic Pilgrimage",
    category: "Family Pilgrimage",
    price: 13999,
    rating: 4.8,
    reviews: 126,
    duration: "4 Days / 3 Nights",
    status: "published",
    days: 4,
    nights: 3,
    destination: "Dwarka, Bet Dwarka, Somnath",
    overview:
      "A balanced private tour covering Dwarkadhish Temple, Nageshwar Jyotirlinga, Bet Dwarka and Somnath aarti without rushing the core darshan circuit.",
    heroImage: {
      image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1100&q=80&auto=format&fit=crop",
      alt: "Temple architecture for Somnath Dwarka pilgrimage package",
    },
    childImages: [
      {
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75&auto=format&fit=crop",
        alt: "Gujarat coastline",
      },
      {
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75&auto=format&fit=crop",
        alt: "Sunset landscape",
      },
      {
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=75&auto=format&fit=crop",
        alt: "Sea shore",
      },
      {
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=75&auto=format&fit=crop",
        alt: "Green hills",
      },
    ],
    inclusions: [item("Private AC cab"), item("3 nights hotel"), item("Daily breakfast"), item("Darshan route planning")],
    routes: { source: "Dwarka", destination: "Somnath" },
    isTransferIncluded: true,
    isStayIncluded: true,
    isBreakfastIncluded: true,
    isSightseeingIncluded: true,
  },
  {
    slug: "3-days-2-nights",
    title: "Express Somnath Dwarka Darshan",
    category: "Quick Darshan",
    price: 10999,
    rating: 4.7,
    reviews: 84,
    duration: "3 Days / 2 Nights",
    status: "published",
    days: 3,
    nights: 2,
    destination: "Dwarka and Somnath",
    overview:
      "A compact plan for travellers short on time, focused on Dwarkadhish, Nageshwar and Somnath Temple with private transfer support.",
    heroImage: {
      image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=1100&q=80&auto=format&fit=crop",
      alt: "Pilgrimage road journey",
    },
    childImages: [
      {
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75&auto=format&fit=crop",
        alt: "Mountain sunrise",
      },
      {
        image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=600&q=75&auto=format&fit=crop",
        alt: "Lake view",
      },
      {
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=75&auto=format&fit=crop",
        alt: "Road trip view",
      },
      {
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=75&auto=format&fit=crop",
        alt: "Comfort stay",
      },
    ],
    inclusions: [item("Private transfer"), item("2 nights hotel"), item("Temple stop planning"), item("Pickup and drop")],
    routes: { source: "Rajkot", destination: "Somnath" },
    isTransferIncluded: true,
    isStayIncluded: true,
    isBreakfastIncluded: false,
    isSightseeingIncluded: true,
  },
  {
    slug: "from-ahmedabad",
    title: "Somnath Dwarka Tour from Ahmedabad",
    category: "Best Value",
    price: 14999,
    rating: 4.9,
    reviews: 152,
    duration: "5 Days / 4 Nights",
    status: "published",
    days: 5,
    nights: 4,
    destination: "Ahmedabad to Dwarka and Somnath",
    overview:
      "A comfortable round trip from Ahmedabad with private cab, hotels, Dwarka sightseeing, Bet Dwarka ferry point and Somnath aarti sequencing.",
    heroImage: {
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1100&q=80&auto=format&fit=crop",
      alt: "Somnath Dwarka tour from Ahmedabad",
    },
    childImages: [
      {
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=75&auto=format&fit=crop",
        alt: "Gujarat landmark",
      },
      {
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=75&auto=format&fit=crop",
        alt: "Indian architecture",
      },
      {
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=75&auto=format&fit=crop",
        alt: "Desert road",
      },
      {
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=75&auto=format&fit=crop",
        alt: "Travel landscape",
      },
    ],
    inclusions: [item("Ahmedabad pickup"), item("Private AC vehicle"), item("4 nights hotel"), item("Breakfast included")],
    routes: { source: "Ahmedabad", destination: "Somnath" },
    isTransferIncluded: true,
    isStayIncluded: true,
    isBreakfastIncluded: true,
    isSightseeingIncluded: true,
  },
];
