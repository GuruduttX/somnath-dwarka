/**
 * Seed / update the /somnath-dwarka-tour-package/ money hub with the full
 * client-supplied HUB content (docx copy + JSON schema, 15 July 2026 canon).
 *
 *   node --env-file=.env.local scripts/seed-somnath-dwarka-hub.mjs [--dry]
 *
 * The record is upserted by slug and published so the page renders it. Every
 * field written here is admin-editable (hubModel + contentSchemas), so this is
 * just the first load of the content — editors own it from here.
 *
 * The JSON-LD @graph is taken from scripts/data/somnath-dwarka-hub.json with the
 * `https://SITE` placeholder resolved to the canonical origin.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const here = path.dirname(fileURLToPath(import.meta.url));
const SLUG = "somnath-dwarka-tour-package";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://somnathdwarkatourpackage.com").replace(/\/$/, "");

/* JSON-LD graph, placeholder resolved to the live origin. */
const rawJson = JSON.parse(readFileSync(path.join(here, "data", "somnath-dwarka-hub.json"), "utf8"));
const schemaOverrides = JSON.stringify(rawJson.schema_jsonld).replaceAll("https://SITE", SITE_URL);

const doc = {
  slug: SLUG,
  status: "published",
  noindex: false,

  /* SEO head */
  title: "Somnath Dwarka Tour Package",
  title_tag: "Somnath Dwarka Tour Package from Rs.5,000: Real Timings",
  meta_description:
    "Compare Somnath Dwarka packages by days, start city and tier. From Rs.5,000 pp per night with 3 star, breakfast and vehicle. Verified timings, no ferry.",
  h1: "Somnath Dwarka Tour Package: Itinerary, Timings and Booking",
  answer_first:
    "A Somnath Dwarka tour package covers the first Jyotirlinga at Prabhas Patan and Lord Krishna's Jagat Mandir at Dwarka, usually in 3 to 4 days, joined by a 233 km coastal run on NH51 that takes 5 to 6 hours. Rates run from Rs. 5,000 per person per night at the 3 star tier, so the four day plan most families book is Rs. 15,000 per person with hotel, breakfast and your vehicle included. Choose your version below by days, start city, who is travelling and tier.",

  /* Hub taxonomy */
  hub_kind: "circuit",
  head_term: "somnath dwarka tour package",
  pillar_path: "/somnath/",
  sibling_hubs: ["/dwarka/", "/somnath-dwarka-taxi-service/"],
  breadcrumb_parent: "/",
  price_from: { value: "5000", verified: true, verified_at: "2026-07-15", source_url: "" },
  inclusions: ["hotel at chosen tier", "breakfast", "vehicle with driver for the full itinerary"],
  exclusions: [
    "Lunch and dinner",
    "Temple pooja, seva and abhishek bookings",
    "The Somnath sound and light show ticket",
    "Gir safari permits unless your plan names them",
    "Camera and cloakroom charges",
    "Tips",
    "Anything you buy for yourself in the market",
  ],
  serp_feature_target: "AI Overview (commercial), Sitelinks, Product/TouristTrip snippet, PAA",
  schema_overrides: schemaOverrides,

  /* ── Chooser ── */
  chooser_intro:
    "Every option below is a separate plan with its own routing, its own clock and its own price. Pick the row that matches your trip.",
  duration_matrix: [
    { plan: "2 days 1 night", nights: "1", price_3star: "Rs. 5,000", price_4star: "Rs. 10,000", price_5star: "Rs. 12,500", best_for: "Travellers already in Saurashtra", slug: "2-days-1-night" },
    { plan: "3 days 2 nights", nights: "2", price_3star: "Rs. 10,000", price_4star: "Rs. 20,000", price_5star: "Rs. 25,000", best_for: "The shortest honest version of both temples", slug: "3-days-2-nights" },
    { plan: "4 days 3 nights", nights: "3", price_3star: "Rs. 15,000", price_4star: "Rs. 30,000", price_5star: "Rs. 37,500", best_for: "Most families, first time visitors", slug: "4-days-3-nights" },
    { plan: "5 days 4 nights", nights: "4", price_3star: "Rs. 20,000", price_4star: "Rs. 40,000", price_5star: "Rs. 50,000", best_for: "Pilgrimage plus one break day", slug: "5-days-4-nights" },
    { plan: "6 days 5 nights", nights: "5", price_3star: "Rs. 25,000", price_4star: "Rs. 50,000", price_5star: "Rs. 62,500", best_for: "Groups travelling once, wanting everything", slug: "6-days-5-nights" },
  ],
  start_cities: [
    { city: "Ahmedabad", road_reality: "440 to 450 km to Dwarka, 8 to 9 hours driving", slug: "from-ahmedabad" },
    { city: "Rajkot", road_reality: "Closest major start, shortest first driving day", slug: "from-rajkot" },
    { city: "Mumbai", road_reality: "Fly or train to Rajkot or Jamnagar, then drive", slug: "from-mumbai" },
    { city: "Jamnagar", road_reality: "Nearest airport to Dwarka", slug: "from-jamnagar" },
    { city: "Vadodara, Surat, Delhi, Pune, Bangalore, Hyderabad", road_reality: "Rail and flight combinations, different first days", slug: "" },
  ],
  chooser_note:
    "Every rate above is per person, and it is the nightly rate multiplied by the nights. Hotel, breakfast and your vehicle with a driver are inside it. Route shapes: the 2 night plan is Dwarka and Somnath only, the 3 night adds Bet Dwarka and Porbandar, the 4 night adds Gir or Diu, and the 5 night is the full Saurashtra sweep. Only visiting one town, or need a vehicle only with no hotels? Send us your dates and group size on +91 7302265809 and we will return the day-wise plan for your version.",

  /* ── The clock ── */
  constraint_intro:
    "This is the section other package pages leave out, and it is the reason itineraries fall apart on the ground. Nothing here is our opinion. It is what the temples and the road actually do.",
  constraint_table: [
    { constraint: "Dwarkadhish Temple afternoon closure", time: "Open from about 6:30 am, shut around 1:00 pm, reopens around 5:00 pm, evening darshan to about 9:30 pm", forces: "An afternoon arrival in Dwarka gets you a locked gate. Either arrive before 12:30 pm or plan the temple for the evening." },
    { constraint: "Somnath aarti", time: "7:00 am, 12:00 pm, 7:00 pm", forces: "The 7:00 pm aarti and the 7:45 pm show sit back to back. Both in one evening only if you are already inside the complex." },
    { constraint: "Jay Somnath sound and light show", time: "7:45 pm to 8:45 pm per the Shree Somnath Trust", forces: "Most pages say 8:00 pm to 9:00 pm. If you plan a 7:30 pm dinner you miss the opening." },
    { constraint: "Ahmedabad to Dwarka", time: "440 to 450 km, 8 to 9 hours with breaks", forces: "A 9:00 am departure cannot reach Dwarka for evening darshan comfortably. This is why our Ahmedabad starts leave before sunrise." },
    { constraint: "Dwarka to Somnath", time: "233 km on NH51, 5 to 6 hours via Porbandar and Veraval", forces: "This is a driving day, not a morning transfer. Anyone selling you Dwarka darshan and Somnath aarti on the same day is selling you a car seat." },
    { constraint: "Ahmedabad to Somnath", time: "About 410 km, 7 to 8 hours", forces: "Going Somnath first and Dwarka second reverses the whole clock. Both directions work. They are not the same trip." },
    { constraint: "Bet Dwarka access", time: "Sudarshan Setu, the 2.32 km cable stayed bridge opened on 25 February 2024", forces: "You drive across. There is no ferry queue and no tide wait. Pages still promising a boat ride to Bet Dwarka were written before the bridge or copied from pages that were." },
  ],
  constraint_footnote:
    "Timings verified July 2026. Temple schedules change on festival days, in Shravan and at Janmashtami and Mahashivratri. We reconfirm before every departure.",

  /* ── Hour by hour ── */
  itinerary_intro:
    "This is our 4 days 3 nights plan from Ahmedabad, the version most families book. The full day-wise page with stay details is at 4 days 3 nights. Shorter and longer versions change the clock, not the logic.",
  hourly_itinerary: [
    {
      day: "Day 1: Ahmedabad to Dwarka",
      steps: [
        { time: "05:30", activity: "Pickup in Ahmedabad. Early is not us being difficult. It is the only way 450 km ends before the temple reopens." },
        { time: "08:00", activity: "Breakfast stop on the Rajkot highway. Kathiawadi thali country." },
        { time: "13:30", activity: "Lunch near Jamnagar." },
        { time: "16:30", activity: "Dwarka hotel check in." },
        { time: "17:30", activity: "Dwarkadhish darshan in the evening session, then Gomti Ghat." },
        { time: "20:00", activity: "Dinner. Early night. Tomorrow starts at six." },
      ],
    },
    {
      day: "Day 2: Dwarka, Bet Dwarka, Nageshwar",
      steps: [
        { time: "06:30", activity: "Mangala Aarti at Dwarkadhish. The queue is shortest here and the temple is at its quietest all day." },
        { time: "09:00", activity: "Drive to Okha and across Sudarshan Setu to Bet Dwarka. The footpath carries verses from the Bhagavad Gita." },
        { time: "12:00", activity: "Bet Dwarka darshan, then back across the bridge." },
        { time: "14:00", activity: "Nageshwar Jyotirlinga, which sits on the Dwarka to Okha road, so it costs you no detour on the return leg." },
        { time: "16:00", activity: "Rukmini Devi Temple, Gopi Talav and Bhadkeshwar Mahadev as time allows." },
        { time: "19:00", activity: "Free evening in Dwarka." },
      ],
    },
    {
      day: "Day 3: Dwarka to Somnath via Porbandar",
      steps: [
        { time: "07:00", activity: "Leave Dwarka after breakfast. The coastal NH51 run begins." },
        { time: "09:30", activity: "Porbandar. Kirti Mandir and the Sudama connection." },
        { time: "13:00", activity: "Lunch on the road, Madhavpur or Veraval side." },
        { time: "15:00", activity: "Somnath hotel check in." },
        { time: "18:30", activity: "Walk into the Somnath complex. Vallabhghat for sunset over the Arabian Sea." },
        { time: "19:00", activity: "Sandhya Aarti." },
        { time: "19:45", activity: "Jay Somnath sound and light show, one hour, on the temple's own schedule." },
      ],
    },
    {
      day: "Day 4: Somnath to Ahmedabad",
      steps: [
        { time: "07:00", activity: "Mangala Aarti and unhurried darshan at the Jyotirlinga." },
        { time: "09:00", activity: "Bhalka Tirth, Triveni Sangam, Geeta Mandir and the Ahalyabai temple built by the queen mother in 1782." },
        { time: "11:00", activity: "Depart for Ahmedabad, about 410 km." },
        { time: "19:00", activity: "Drop at Ahmedabad airport, station or home." },
      ],
    },
  ],
  itinerary_footnote:
    "Reverse the order and Somnath comes first. Both work. Which one suits you depends on your inbound flight or train, and that is a conversation, not a template.",

  /* ── Price sheet ── */
  price_intro:
    "Both temples are free. That surprises people. General darshan at Somnath costs nothing and general entry at Dwarkadhish costs nothing. What you are buying from us is the hotel, the breakfast, the vehicle with a driver for the whole route, and the planning that keeps you on the right side of a closed gate. Three tiers. The tier is the hotel, and the rate is per person per night.",
  price_tiers: [
    { tier: "3 star", price: "Rs. 5,000", hotels: "Lords Inn", included: "Hotel, breakfast, vehicle with driver" },
    { tier: "4 star", price: "Rs. 10,000", hotels: "The Fern, Fortune Landmark", included: "Hotel, breakfast, vehicle with driver" },
    { tier: "5 star", price: "Rs. 12,500", hotels: "The Fern Sattva Resort at Dwarka, the best property in town at Somnath", included: "Hotel, breakfast, vehicle with driver" },
  ],
  price_tier_note:
    "No five star Taj or ITC property operates in Dwarka or in Somnath. The Taj group reaches Dwarka only through Ginger, its lean luxe brand, which is a comfortable hotel and is not a five star. In Dwarka the top tier puts you in The Fern Sattva Resort. At Somnath it buys the best room in the town, and your quote names the property before you pay, because the honest truth is that Somnath's best belongs to the four star class and we would rather tell you now than at check in. Taj and ITC enter your plan on the legs that reach them: Taj Skyline in Ahmedabad, Taj Gandhinagar Resort and Spa, Welcomhotel by ITC at Alkapuri in Vadodara, and Gir Serai on the Gir side. This is why the five star tier makes most sense on the longer circuits. If another operator offers you a five star Taj in Dwarka, ask them for the property name.",
  vehicle_note: "The vehicle is included in every tier. Group size picks it, not preference. Camps and tents are used where the route needs them, which on the Gujarat map means the Rann side rather than this circuit.",
  vehicle_table: [
    { travellers: "Up to 4", vehicle: "Sedan" },
    { travellers: "Up to 6", vehicle: "Ertiga SUV or Innova Crysta" },
    { travellers: "Up to 9", vehicle: "Tempo Traveller" },
    { travellers: "Up to 12", vehicle: "Maharaja or Urbania" },
    { travellers: "Up to 26", vehicle: "26 seater Tempo Traveller" },
  ],
  exclusions_note:
    "So a 4 days 3 nights plan at the 3 star tier is three nights at Rs. 5,000, which is Rs. 15,000 per person, vehicle included. Multiply the nightly rate by your nights. No arithmetic hidden behind an enquiry form. We put the exclusion list on the page instead of in an email after you have paid. Read the cancellation and refund policy before you book.",
  fraud_advisory:
    "The Shree Somnath Trust has publicly advised that its room bookings, pooja vidhi and donations are accepted only through its official website, and that it never asks anyone to pay through private numbers, WhatsApp chats or UPI transfers. Fraud attempts using those channels have been reported. If you want a seva at Somnath, book it on somnath.org yourself or ask us and we will point you at the official page. We will never take temple donation money on your behalf.",

  /* ── Why choose ── */
  why_choose_intro: "",
  why_choose: [
    { heading: "We plan around the closures, not around a template.", text: "The 1:00 pm Dwarkadhish shutter and the 7:45 pm Somnath show are on this page because they decide your day. Most operators find out about them from your complaint." },
    { heading: "We publish the constraint, not the adjective.", text: "Every timing and distance here was checked against the temple trusts and the road in July 2026, and we reconfirm before your departure because festival schedules move." },
    { heading: "One number, answered by the people who plan the route.", text: "+91 7302265809 on call and WhatsApp. Not a form that disappears into a queue." },
    { heading: "The price on this page is the price.", text: "Three tiers, the hotel brand named in each, the vehicle included, and the exclusion list printed above the booking button rather than mailed to you afterwards." },
    { heading: "The Sudarshan Setu example is the whole point.", text: "The bridge opened in February 2024. Pages published in 2026 still sell you a boat to Bet Dwarka. If a page cannot keep up with a 2.32 km bridge, it cannot keep up with your trip." },
    { heading: "We say no.", text: "If your dates and your must-see list do not fit, we tell you before you pay, not on day two. We also tell you when a hotel tier does not exist in a town, which is why the 5 star note above says what it says." },
  ],

  /* ── Not for you ── */
  not_for_you: [
    { heading: "You want Dwarka and Somnath in one day.", text: "It is 233 km and 5 to 6 hours of driving between them, and both temples close in the afternoon. It cannot be done well. We will not sell it." },
    { heading: "You cannot start early.", text: "The clock on this circuit is set by temple hours and by long highway days. A 9:00 am start costs you a darshan, every time." },
    { heading: "You want a five star bed every single night.", text: "See the tier note above. Two of the towns on this circuit do not have one, and no amount of budget conjures a Taj into Dwarka." },
    { heading: "You are booking Janmashtami or Mahashivratri at short notice.", text: "Rooms and darshan queues at those dates are a different sport. Two to three months of lead time or pick another week." },
    { heading: "You want the Gir add-on to promise you a lion.", text: "No operator can honestly do that. Gir is a wild forest and the lions have not agreed to a schedule. Anyone who promises otherwise is selling you a story." },
  ],

  /* ── Practical notes ── */
  practical_notes: [
    { label: "Dress code", text: "Modest, covered shoulders and knees at both temples. Traditional dress is welcome and never wrong." },
    { label: "Photography", text: "Not permitted inside the sanctums. Assume cameras and phones go into the cloakroom." },
    { label: "Best window", text: "October to March. April to June crosses 40 degrees on the Saurashtra coast and the monsoon can disrupt the Somnath show, which runs weather permitting." },
    { label: "Rail", text: "Veraval is the working railhead for Somnath and Somnath station serves the town directly. Dwarka has its own station on the Okha line." },
    { label: "Air", text: "Jamnagar is the closest civil airport to Dwarka. Diu, Keshod and Rajkot serve the Somnath side." },
    { label: "Accessibility", text: "Somnath complex has wheelchair support and a lift inside the temple. Ask us before you book if this matters, and we will confirm what is working for your dates rather than repeat what a blog said in 2019." },
  ],

  final_cta_note:
    "The Somnath Dwarka circuit is two temples, 233 km of coast, and a clock set by afternoon closures and a 7:45 pm show. Pick your version above, send us your dates and group size on +91 7302265809, and you get the day-wise plan and the final quote for your tier.",

  /* ── FAQ (renders FAQPage schema + on-page accordion) ── */
  faq: [
    { question: "How many days do you need for Somnath and Dwarka?", answer: "Three days is the honest minimum for both temples with one night in each town and the 233 km coastal drive between them. Four days is what most families book, because it adds Bet Dwarka and Porbandar without turning any day into a nine hour drive. Two days works only if you are already in Saurashtra.", fact_tag: "verified" },
    { question: "How much does a Somnath Dwarka tour package cost?", answer: "Rs. 5,000 per person per night at the 3 star tier, Rs. 10,000 at 4 star and Rs. 12,500 at 5 star. Multiply by your nights: the four day, three night plan is Rs. 15,000 per person at 3 star. Hotel, breakfast and your vehicle with a driver are included in all three. Lunch, dinner, temple sevas and the sound and light show ticket are not.", fact_tag: "verified" },
    { question: "Can Somnath and Dwarka be covered in one day?", answer: "No. They are 233 km apart on NH51, which is 5 to 6 hours of driving, and both temples close in the afternoon. A single day means you see the road and miss at least one darshan.", fact_tag: "verified" },
    { question: "What is the distance between Dwarka and Somnath?", answer: "About 233 km via NH51, taking 5 to 6 hours by road through Porbandar and Veraval. The coastal route is the one worth driving, with the sea beside you for long stretches.", fact_tag: "verified" },
    { question: "Do you still need a boat to reach Bet Dwarka?", answer: "No. Sudarshan Setu, a 2.32 km cable stayed bridge between Okha and Bet Dwarka, was inaugurated on 25 February 2024 and pilgrims now drive across. Before it, boats were the only way over.", fact_tag: "verified" },
    { question: "What time is the Somnath light and sound show?", answer: "The Shree Somnath Trust lists the Jay Somnath sound and light show at 7:45 pm to 8:45 pm every night, weather permitting. Many travel pages still print 8:00 pm to 9:00 pm, which is why people arrive fifteen minutes late.", fact_tag: "verified" },
    { question: "Is there an entry fee at Somnath or Dwarkadhish?", answer: "General darshan is free at both. Personal pooja, seva and the sound and light show carry their own charges, paid at the temple or on the temple's own official website.", fact_tag: "verified" },
    { question: "When is Dwarkadhish Temple closed?", answer: "It shuts for the afternoon, roughly 1:00 pm to 5:00 pm, and opens from about 6:30 am with Mangala Aarti and again in the evening until about 9:30 pm. Timings change on festival days.", fact_tag: "verified" },
    { question: "What is the best time of year for a Somnath Dwarka tour?", answer: "October to March. The coast is pleasant, both temples run their full schedule and driving days are comfortable. Summer crosses 40 degrees and the monsoon can cancel the Somnath show.", fact_tag: "verified" },
    { question: "Can we book a pooja at Somnath through you?", answer: "We will point you to the official channel. The Shree Somnath Trust has warned that bookings and donations are accepted only through its own website and never through private numbers or UPI. We will not take that money on your behalf, and neither should anyone else.", fact_tag: "verified" },
    { question: "Do you run fixed departures or private tours?", answer: "Tell us your dates and group and we build the plan around them. The vehicle is assigned by group size and it is included in every tier.", fact_tag: "verified" },
  ],

  related_links: [
    { target: "/somnath/", anchor: "Somnath destination guide", type: "pillar" },
    { target: "/dwarka/", anchor: "Dwarka destination guide", type: "pillar" },
    { target: "/somnath-dwarka-taxi-service/", anchor: "Somnath Dwarka taxi service", type: "money" },
    { target: "/temples/somnath-temple-timings/", anchor: "Somnath temple timings", type: "sibling" },
    { target: "/temples/dwarkadhish-temple-timings/", anchor: "Dwarkadhish temple timings", type: "sibling" },
  ],
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (use --env-file=.env.local)");

  if (DRY) {
    console.log("DRY RUN — would upsert hub:", SLUG);
    console.log("fields:", Object.keys(doc).length, "| faq:", doc.faq.length, "| itinerary days:", doc.hourly_itinerary.length);
    console.log("schema_overrides bytes:", schemaOverrides.length);
    return;
  }

  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("hubs");
  const now = new Date();
  const res = await col.updateOne(
    { slug: SLUG },
    { $set: { ...doc, updatedAt: now }, $setOnInsert: { createdAt: now } },
    { upsert: true }
  );
  console.log(
    res.upsertedCount ? `Inserted hub ${SLUG} (${res.upsertedId?._id})` : `Updated hub ${SLUG} (matched ${res.matchedCount})`
  );
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("SEED FAILED:", e.message);
  process.exit(1);
});
