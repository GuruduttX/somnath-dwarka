import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PolicyPage from "@/src/components/templates/PolicyPage";

const PATH = "/terms/";
export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions — Somnath Dwarka Tour Package",
  description: "Terms of service governing tour packages, cab rentals, hotel bookings, vehicle duty hours, and legal agreements for Gujarat pilgrimages.",
  path: PATH,
});

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of Service & Tour Booking Conditions"
      path={PATH}
      intro="These Terms and Conditions govern all travel reservations, dedicated cab hires, hotel arrangements, and pilgrimage services provided by Somnath Dwarka Tour Package. By accessing this website or confirming a booking with us, you agree to comply with these terms."
      sections={[
        {
          heading: "1. Scope of Tour & Travel Services",
          body: [
            "We operate as an authorized pilgrimage tour aggregator and transport facilitator, curating complete travel packages that include dedicated private AC vehicles, vetted hotel accommodations, custom day-wise itineraries, and local ground assistance across Saurashtra.",
            "All itineraries, distance calculations, and road transit schedules are crafted based on optimal driving conditions and standard temple darshan windows. Timings are subject to local traffic conditions, VIP convoy movements, and temple trust darshan queue regulations."
          ],
        },
        {
          heading: "2. Pricing, Inclusions & Billing Transparency",
          body: [
            "Quoted package rates are all-inclusive regarding the specified vehicle type, fuel expenses, highway toll plaza charges, designated temple parking fees, driver night allowances, and hotel room charges with specified meal plans.",
            "Personal expenses—including temple special VIP darshan tickets, personal pooja ritual charges (such as Dhwajarohan, Abhishek, or Chappan Bhog), laundry, room service, camera entry tickets, and voluntary tips/gratuities—are not included in the base package price.",
            "All pricing quotes are valid for 7 calendar days from the date of issuance or until the specified booking deadline during festival seasons."
          ],
        },
        {
          heading: "3. Vehicle Duty Hours & Chauffeur Safety Regulations",
          body: [
            "To uphold passenger safety and comply with commercial motor vehicle regulations in Gujarat, our chauffeurs operate on a standard duty window between 6:00 AM and 9:00 PM for sightseeing and highway transfers.",
            "Night highway driving (between 10:00 PM and 5:00 AM) is restricted unless pre-arranged specifically for early morning airport departures or unavoidable train connections.",
            "In the rare event of mechanical breakdown or tire puncture, our 24/7 fleet management desk provides an on-spot repair or replacement vehicle at no extra expense to the guest."
          ],
        },
        {
          heading: "4. Guest Conduct & Temple Dress Code Decorum",
          body: [
            "Both Dwarkadhish Temple and Somnath Jyotirlinga enforce strict security and traditional dress decorum. Electronic devices (mobile phones, smartwatches, cameras), leather items (belts, wallets), and large bags are prohibited inside main temple sanctums.",
            "Guests are expected to dress modestly (traditional Indian attire is recommended) and adhere to temple trust regulations regarding photography and footwear disposal at designated cloakrooms."
          ],
        },
        {
          heading: "5. Luggage Limitations & Valuable Possessions",
          body: [
            "Vehicle boot space varies by model: Sedan cars (Dzire/Etios) accommodate up to 2 medium suitcases plus hand baggage; SUV vehicles (Ertiga/Innova) accommodate 3 to 4 suitcases. Guests are advised to pack accordingly.",
            "While our chauffeurs are background-verified and trustworthy, guests are solely responsible for their personal valuables, jewelry, cash, and electronic equipment. Please do not leave cash or expensive jewelry unattended in vehicles."
          ],
        },
        {
          heading: "6. Limitation of Liability & Third-Party Service Providers",
          body: [
            "We maintain strict quality control over our partner hotels, transport fleets, and safari operators. However, we are not directly liable for personal injuries, illnesses, property damages, or unexpected flight/train delays caused by third-party transport carriers.",
            "Travellers are strongly advised to secure comprehensive domestic travel and medical insurance prior to commencing their journey."
          ],
        },
        {
          heading: "7. Governing Law & Legal Jurisdiction",
          body: [
            "Any disputes, claims, or controversies arising out of or relating to our services or website usage shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Rajkot / Veraval, Gujarat."
          ],
        },
      ]}
    />
  );
}

