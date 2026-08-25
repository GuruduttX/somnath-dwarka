import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/booking-policy/";
export const metadata: Metadata = buildMetadata({
  title: "Booking Policy & Payment Terms — Somnath Dwarka Tour Package",
  description: "Comprehensive booking policy, advance payment terms, hotel allocations, vehicle guidelines, and festival reservations for Somnath–Dwarka tour packages.",
  path: PATH,
});

export default function BookingPolicyPage() {
  return (
    <PolicyPage
      title="Booking Policy & Reservation Guidelines"
      path={PATH}
      intro="This policy outlines the complete process for reserving, confirming, and managing your Somnath–Dwarka pilgrimage tours, hotel stays, and private cab services. Please review these terms carefully to ensure a seamless yatra experience."
      sections={[
        {
          heading: "1. Enquiry & Quotation Process",
          body: [
            "Every pilgrimage is unique. When you contact us via our website enquiry forms, direct phone calls, or WhatsApp, our pilgrimage planners review your travel dates, arrival hub (such as Ahmedabad, Rajkot, Jamnagar, or Diu), total passenger count, and preferred hotel category.",
            "We provide an itemized itinerary and quotation detailing vehicle type (Sedan, Ertiga, Innova Crysta, or Tempo Traveller), hotel star tier, meal plans, driver allowances, toll/parking inclusions, and temple darshan alignments.",
            "Initial quotations are indicative and subject to dynamic hotel room availability and seasonal vehicle demand until a formal booking advance is deposited."
          ],
        },
        {
          heading: "2. Booking Confirmation & Payment Milestones",
          body: [
            "To confirm your tour package or dedicated cab booking, a standard token advance (typically 25% to 40% of the total package value) is required upon finalization of the itinerary.",
            "During peak pilgrimage periods (such as Diwali holidays, Janmashtami at Dwarka, Mahashivratri at Somnath, and winter holiday weeks), an advance of 50% may be necessary to guarantee hotel reservations in high-demand temple proximity zones.",
            "The remaining balance amount is payable in scheduled tranches: 50% of the remaining balance upon hotel check-in on Day 1, and the final balance before the start of the final day's sightseeing journey.",
            "Accepted payment modes include UPI (Google Pay, PhonePe, Paytm), NEFT/RTGS direct bank transfers, and verified payment gateway links. We never store debit or credit card credentials on our servers."
          ],
        },
        {
          heading: "3. Accommodation & Room Allocation Standards",
          body: [
            "Hotels included in our tour packages are hand-selected for hygiene, pure vegetarian dining facilities, proximity to temple complexes (Dwarkadhish Temple, Somnath Temple, Nageshwar, and Porbandar), and family-friendly hospitality.",
            "Standard hotel check-in time is typically 12:00 PM or 2:00 PM, and check-out time is 10:00 AM or 11:00 AM. Early check-in or late check-out is subject to room availability on the day of arrival and may incur nominal hotel charges.",
            "Base room categories allocated are Deluxe Air-Conditioned Rooms on double/triple sharing basis. Quad rooms and family suites can be arranged upon prior written request during the enquiry phase."
          ],
        },
        {
          heading: "4. Dedicated Private Transport & Chauffeur Guidelines",
          body: [
            "All cab bookings and tour packages include dedicated, commercial-registered AC vehicles driven by licensed, background-verified chauffeurs with extensive Saurashtra highway and temple route experience.",
            "Package prices are all-inclusive regarding driver daily allowances, highway toll taxes, interstate permits (if crossing into Diu UT), fuel charges, and designated parking fees.",
            "Air conditioning operates during highway transits and city transfers; per standard transport norms in India, AC may be temporarily paused when the vehicle is stationary in long parking queues or ascending steep ghat gradients (such as Girnar foothills)."
          ],
        },
        {
          heading: "5. Mandatory Identification & Government Verification",
          body: [
            "As mandated by the Ministry of Tourism, Gujarat Police, and temple trust security directives, all Indian guests must carry original government-issued photo ID proofs (Aadhaar Card, Voter ID, Passport, or Driving License). PAN cards are not accepted as valid address identification by most hotels.",
            "Foreign nationals and NRI travellers must carry a valid original Passport and Indian Visa / OCI card. Hotel check-in cannot be completed without presenting physical ID documents for every adult guest."
          ],
        },
        {
          heading: "6. Itinerary Adjustments & Schedule Flexibility",
          body: [
            "Our chauffeurs and local ground handlers strive to adhere strictly to your planned itinerary. However, timings may be dynamically adjusted to accommodate official temple darshan queues, special VIP closures, flag-hoisting rituals (Dhwajarohan at Dwarkadhish), or ocean tides for Bet Dwarka boat crossings.",
            "Minor route modifications or addition of en-route spiritual shrines (such as Sudama Mandir, Bhalka Tirth, Mul Dwarka, or Harshad Mata Temple) can be accommodated through coordination with your assigned trip manager."
          ],
        },
        {
          heading: "7. Senior Citizen & Special Assistance Care",
          body: [
            "We prioritize the comfort of elder pilgrims and differently-abled yatris. Upon request, we arrange ground-floor hotel rooms, wheel-chair accessible transport points, battery buggy bookings at Somnath promenade, and advice on VIP darshan passes where permitted by temple trusts."
          ],
        },
      ]}
    />
  );
}

