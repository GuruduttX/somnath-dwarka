import TourArchiveCTA from "@/src/components/TourArchive/TourArchiveCTA";
import DestinationRoute from "@/src/components/TourPackage/DestinationRoute";
import InclusionExclusion from "@/src/components/TourPackage/InclusionExclusion";
import ItineraryAccordion from "@/src/components/TourPackage/ItineraryAccordion";
import KnowBeforeYouGo from "@/src/components/TourPackage/KnowBeforeYouGo";
import PackageDurationStrip from "@/src/components/TourPackage/PackageDurationStrip";
import PackageFaqSection from "@/src/components/TourPackage/PackageFaqSection";
import PackageHero from "@/src/components/TourPackage/PackageHero";
import PackageHighlights from "@/src/components/TourPackage/PackageHighlights";
import PackageInclusionsStrip from "@/src/components/TourPackage/PackageInclusionsStrip";
import PackageTestimonials from "@/src/components/TourPackage/PackageTestimonials";
import Policies from "@/src/components/TourPackage/Policies";
import ProductRatings from "@/src/components/TourPackage/ProductRatings";
import SideForm from "@/src/components/TourPackage/SideForm";
import LuxuryFooter from "@/src/utils/Footer";
import Navbar from "@/src/utils/Navbar";
import TrustBuildingSection from "@/src/utils/TrustBuildingSection";
import { DiVisualstudio } from "react-icons/di";
import PackageOverview from "@/src/components/TourPackage/PackageOverview";

const PackageData = {
  title: "Somnath Dwarka Tour Package",
  slug: "somnath-dwarka-tour-package",
  category: "Spiritual Tour",
  price: 14999,
  rating: 4.9,
  reviews: 287,

  duration: "5 Days / 4 Nights",

  days: 5,
  nights: 4,

  durationbreakdown: [
    {
      id: "1",
      days: 1,
      place: "Ahmedabad",
    },
    {
      id: "2",
      days: 2,
      place: "Dwarka",
    },
    {
      id: "3",
      days: 1,
      place: "Somnath",
    },
    {
      id: "4",
      days: 1,
      place: "Ahmedabad Drop",
    },
  ],

  destination: "Dwarka & Somnath",

  overview:
    "Experience the divine beauty of Gujarat with this premium Somnath Dwarka tour package covering sacred temples, coastal beauty, local sightseeing, and comfortable stays.",

  heroImage: {
    image:
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1600&auto=format&fit=crop",
    alt: "Somnath Temple",
  },

  childImages: [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop",
      alt: "Dwarka Temple",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
      alt: "Somnath Temple Evening",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1200&auto=format&fit=crop",
      alt: "Gujarat Coastline",
    },
    {
      id: "3",
      image:
        "https://plus.unsplash.com/premium_photo-1697730334768-6e65fa8fded0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Gujarat Coastline",
    },

    
  ],

  highlights: [
    {
      id: "1",
      description: "VIP Darshan at Somnath Jyotirlinga Temple",
    },
    {
      id: "2",
      description: "Visit sacred Dwarkadhish Temple",
    },
    {
      id: "3",
      description: "Comfortable hotel stay with breakfast",
    },
    {
      id: "4",
      description: "Private AC vehicle for sightseeing",
    },
    {
      id: "5",
      description: "Sunset at Somnath beach",
    },
  ],

  itinerary: [
    {
      id: "1",
      day: 1,
      title: "Arrival at Ahmedabad",
      description:
        "Pickup from Ahmedabad airport or railway station and transfer to hotel. Evening free for local sightseeing and leisure.",
    },
    {
      id: "2",
      day: 2,
      title: "Ahmedabad to Dwarka",
      description:
        "Early morning departure for Dwarka. Check-in at hotel and evening darshan at Dwarkadhish Temple.",
    },
    {
      id: "3",
      day: 3,
      title: "Dwarka Sightseeing",
      description:
        "Visit Bet Dwarka, Nageshwar Jyotirlinga, Rukmini Temple, and Gomti Ghat.",
    },
    {
      id: "4",
      day: 4,
      title: "Dwarka to Somnath",
      description:
        "Drive to Somnath and visit Somnath Temple, Triveni Sangam, and evening light & sound show.",
    },
    {
      id: "5",
      day: 5,
      title: "Departure",
      description:
        "Breakfast at hotel and transfer back to Ahmedabad for onward journey.",
    },
  ],

  inclusions: [
    {
      id: "1",
      description: "Hotel accommodation",
    },
    {
      id: "2",
      description: "Daily breakfast",
    },
    {
      id: "3",
      description: "Private AC transportation",
    },
    {
      id: "4",
      description: "All sightseeing as per itinerary",
    },
  ],

  exclusions: [
    {
      id: "1",
      description: "Flight or train tickets",
    },
    {
      id: "2",
      description: "Personal expenses",
    },
    {
      id: "3",
      description: "Lunch and dinner",
    },
    {
      id: "4",
      description: "Travel insurance",
    },
  ],

  knowBeforeYouGo: [
    {
      id: "1",
      description:
        "Carry valid government ID proof during the tour.",
    },
    {
      id: "2",
      description:
        "Temple timings may vary during festivals.",
    },
    {
      id: "3",
      description:
        "Comfortable footwear is recommended.",
    },
  ],

  faqs: [
    {
      id: "1",
      question: "What is the best time to visit Somnath and Dwarka?",
      answer:
        "October to March is considered the best time due to pleasant weather.",
    },
    {
      id: "2",
      question: "Is pickup included in this package?",
      answer:
        "Yes, pickup and drop from Ahmedabad is included.",
    },
    {
      id: "3",
      question: "Are meals included?",
      answer:
        "Daily breakfast is included in the package.",
    },
  ],

  testimonials: [
    {
      id: "1",
      name: "Rahul Sharma",
      description:
        "Amazing spiritual experience with excellent hotel and transport arrangements.",
      rating: "5",
    },
    {
      id: "2",
      name: "Priya Mehta",
      description:
        "Everything was properly managed and the temples were beautiful.",
      rating: "5",
    },
  ],

  routes: {
    source: "Ahmedabad",
    destination: "Somnath & Dwarka",
    segments: [
      {
        id: "1",
        from: "Ahmedabad",
        to: "Dwarka",
      },
      {
        id: "2",
        from: "Dwarka",
        to: "Somnath",
      },
      {
        id: "3",
        from: "Somnath",
        to: "Ahmedabad",
      },
    ],
  },

  refund:
    "Refunds are processed within 7 working days after cancellation approval.",

  cancel:
    "Cancellation charges may apply depending on the time of cancellation.",

  payment:
    "50% advance payment required for booking confirmation.",

  confirmation:
    "Booking confirmation will be shared via WhatsApp and email.",

  isTransferIncluded: true,
  isStayIncluded: true,
  isBreakfastIncluded: true,
  isSightseeingIncluded: true,
};

export default async function Page() {
  return (
    <>
        <Navbar />

       <div className="py-26">

      <PackageHero PackageData={PackageData} />

      <section className="w-full min-h-screen bg-white">
        <div className="max-w-7xl mx-auto py-6 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            {/* LEFT */}
            <main className="space-y-12">
              <PackageDurationStrip
                duration={PackageData.duration}
                breakdown={PackageData.durationbreakdown}
              />

              <PackageInclusionsStrip
                packageData={{
                  transfer_included:
                    PackageData.isTransferIncluded,

                  stay_included:
                    PackageData.isStayIncluded,

                  breakfast_included:
                    PackageData.isBreakfastIncluded,

                  sightseeing_included:
                    PackageData.isSightseeingIncluded,
                }}
              />

              <DestinationRoute
                routeData={PackageData.routes}
              />
              <PackageOverview
                overview={[
                  "A 5 Days Mathura Vrindavan... first paragraph.",
                  "What makes this journey work well for families..."
                ]}
              />

              <PackageHighlights
                PackageData={{
                  highlights: PackageData.highlights,
                }}
              />

              <ItineraryAccordion
                PackageData={{
                  itinerary: PackageData.itinerary,
                }}
              />

              <InclusionExclusion
                PackageData={{
                  inclusions: PackageData.inclusions,
                  exclusions: PackageData.exclusions,
                }}
              />
            </main>

            {/* RIGHT */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <SideForm />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <TourArchiveCTA />

      <KnowBeforeYouGo
        PackageData={PackageData.knowBeforeYouGo}
      />

      <ProductRatings />

      <PackageTestimonials PackageData={PackageData} />

      <TrustBuildingSection />

      <PackageFaqSection
        PackageData={{
          faqs: PackageData.faqs,
        }}
      />

      <Policies
        PackageData={{
          policies: [
            {
              title: "Refund",
              description: PackageData.refund,
            },
            {
              title: "Cancel",
              description: PackageData.cancel,
            },
            {
              title: "Payment",
              description: PackageData.payment,
            },
            {
              title: "Confirmation",
              description: PackageData.confirmation,
            },
          ],
        }}
      />

     
   

   </div>
         <LuxuryFooter />

    </>
   
  );
}