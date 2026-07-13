/**
 * One-off: populate answer-first + supporting content on the wave-C/D pillar and
 * pillar-spoke scaffolds that the URL-map importer created empty (destinations +
 * templeinfos collections). Content is concise and hedged per AGENTS.md — no
 * invented ticket prices/timings/dates; operational specifics say "confirm
 * current…". Records stay noindex until an editor verifies and flips them.
 *
 *   node --env-file=.env.local scripts/populate-pillars.mjs
 *
 * Re-running is safe: only the listed content fields are $set.
 */
import mongoose from "mongoose";

const PILLARS = [
  {
    slug: "ahmedabad",
    answer_first:
      "Ahmedabad, Gujarat's largest city, pairs a UNESCO-listed walled old city with modern draws like the Sabarmati riverfront and Science City. Highlights include Sabarmati Ashram, Adalaj stepwell and a famous street-food scene. It is the main gateway for a wider Gujarat trip.",
    best_time: "October to March",
    how_to_reach:
      "Sardar Vallabhbhai Patel International Airport connects Ahmedabad widely; it is also a major railway junction and sits on the NH-48 corridor from Mumbai and Delhi.",
    faq: [
      { question: "What is Ahmedabad known for?", answer: "Its UNESCO-listed old city, Sabarmati Ashram, textile and food culture, and its role as Gujarat's main travel gateway." },
      { question: "How many days do you need for Ahmedabad?", answer: "One to two days covers the old city, Sabarmati Ashram and the riverfront; add a day for nearby Adalaj, Modhera or the Statue of Unity." },
    ],
  },
  {
    slug: "kutch-rann",
    answer_first:
      "The Great Rann of Kutch is a vast white salt desert best seen in winter, when the Rann Utsav tent city at Dhordo, craft villages and Kalo Dungar viewpoint come alive. Bhuj is the gateway town. A permit is checked before entering the Rann.",
    best_time: "November to February (Rann Utsav season)",
    how_to_reach:
      "Bhuj is the nearest airport and major railhead; Dhordo (the White Rann gateway) is about 80 km further by road, with a permit check at Bhirandiyara.",
    faq: [
      { question: "When is the best time to visit the Rann of Kutch?", answer: "Roughly November to February, during the cool, dry Rann Utsav season when the salt flats are firm and full-moon nights are popular. Confirm exact festival dates each year." },
      { question: "Do I need a permit for the White Rann?", answer: "Yes, a permit is required and is typically issued at the Bhirandiyara check-post en route to Dhordo. Confirm the current fee locally." },
    ],
  },
  {
    slug: "statue-of-unity",
    answer_first:
      "The Statue of Unity at Kevadia (Ekta Nagar) is the world's tallest statue, honouring Sardar Vallabhbhai Patel beside the Sardar Sarovar Dam. Around it are a viewing gallery, Valley of Flowers, jungle safari park and river activities. It makes a full day out from Vadodara or Ahmedabad.",
    best_time: "October to March",
    how_to_reach:
      "Vadodara airport (~90 km) is nearest; Ekta Nagar (Kevadia) railway station serves the site directly, and it is about 200 km by road from Ahmedabad.",
    faq: [
      { question: "How tall is the Statue of Unity?", answer: "It is the world's tallest statue, standing at 182 metres, dedicated to Sardar Vallabhbhai Patel." },
      { question: "What else is there to do at Kevadia?", answer: "The viewing gallery, Valley of Flowers, jungle safari park, Ekta cruise and river rafting, among others. Confirm current tickets and timings before visiting." },
    ],
  },
  {
    slug: "palitana",
    answer_first:
      "Palitana is one of the holiest Jain pilgrimage sites, famed for the hundreds of marble temples crowning Shatrunjaya hill. Pilgrims climb several thousand steps on foot to reach them. It lies near Bhavnagar in Saurashtra and is best visited outside the summer heat.",
    best_time: "October to March",
    how_to_reach:
      "Bhavnagar (about 50 km) is the nearest airport and railhead; Palitana town is reached by road, and the temples are a stepped climb up Shatrunjaya hill.",
    faq: [
      { question: "Why is Palitana famous?", answer: "For the cluster of hundreds of Jain temples atop Shatrunjaya hill, among the most sacred Jain pilgrimage sites in India." },
      { question: "How do you reach the Palitana temples?", answer: "By climbing several thousand steps on foot; dolis (carried chairs) may be available for those who need assistance. Start early to avoid the heat." },
    ],
  },
  {
    slug: "ambaji",
    answer_first:
      "Ambaji, in the Aravalli hills of north Gujarat, is one of western India's most revered Shakti shrines. It draws huge crowds during the Bhadarvi Poonam mela, and the nearby Gabbar hill is linked to the goddess. It pairs well with a north-Gujarat or Mount Abu itinerary.",
    best_time: "October to March",
    how_to_reach:
      "Abu Road (about 20 km) is the nearest railhead; Ambaji is reached by road from Ahmedabad (~180 km) or Mount Abu, with buses and taxis available.",
    faq: [
      { question: "What is Ambaji known for?", answer: "It is a major Shakti shrine dedicated to the goddess Amba, and one of Gujarat's most visited pilgrimage centres, especially at the Bhadarvi Poonam mela." },
      { question: "When is the Ambaji mela?", answer: "The Bhadarvi Poonam mela falls on the Bhadrapada full moon, around August–September, and draws very large crowds. Confirm the exact date each year." },
    ],
  },
  {
    slug: "pavagadh-champaner",
    answer_first:
      "Champaner-Pavagadh is a UNESCO World Heritage site combining the hilltop Mahakali (Kalika Mata) temple at Pavagadh — reached by steps or ropeway — with the historic mosques, stepwells and monuments of Champaner below. It sits near Vadodara and blends pilgrimage with heritage.",
    best_time: "October to March",
    how_to_reach:
      "Vadodara (about 45 km) is the nearest airport and railhead; Champaner-Pavagadh is reached by road, with a ropeway covering part of the Pavagadh climb.",
    faq: [
      { question: "What is special about Champaner-Pavagadh?", answer: "It is a UNESCO World Heritage site pairing the Mahakali temple atop Pavagadh hill with the well-preserved Islamic and Hindu monuments of Champaner." },
      { question: "Is there a ropeway at Pavagadh?", answer: "Yes, a ropeway covers part of the climb to the Mahakali temple. Confirm current timings and fares locally." },
    ],
  },
  {
    slug: "porbandar",
    answer_first:
      "Porbandar, a coastal town on the road between Dwarka and Somnath, is the birthplace of Mahatma Gandhi. Its highlights are Kirti Mandir beside his ancestral home and the Sudama Temple. It slots naturally into a Saurashtra coastal circuit without extra driving.",
    best_time: "October to March",
    how_to_reach:
      "Porbandar has its own airport and railway station; by road it sits midway on the Dwarka–Somnath coastal route.",
    faq: [
      { question: "Why is Porbandar significant?", answer: "It is the birthplace of Mahatma Gandhi (marked by Kirti Mandir) and home to the Sudama Temple, on the Dwarka–Somnath coast." },
      { question: "Is Porbandar on the Dwarka–Somnath route?", answer: "Yes, it lies on the coastal road between the two temple towns, making it an easy mid-circuit stop." },
    ],
  },
  {
    slug: "diu",
    answer_first:
      "Diu, a Union Territory just beyond Somnath, offers a relaxed coastal contrast to the temple towns, with Portuguese-era forts and churches and calm beaches like Nagoa and Ghoghla. It is an easy one-to-two-night extension after a Somnath–Dwarka pilgrimage.",
    best_time: "October to March",
    how_to_reach:
      "Diu has a small airport; by road it is a short drive from Somnath, and Veraval is the nearest major railhead.",
    faq: [
      { question: "What is there to do in Diu?", answer: "Visit Diu Fort and the old churches, and relax at Nagoa and Ghoghla beaches. It is a popular unwind stop after Somnath." },
      { question: "How far is Diu from Somnath?", answer: "It is a short drive from Somnath, which is why it is a common relaxing add-on to the pilgrimage." },
    ],
  },
  {
    slug: "modhera",
    answer_first:
      "Modhera is famed for its 11th-century Sun Temple, with an ornate stepped tank (Surya Kund) and intricately carved halls. It pairs naturally with nearby Patan, home to the UNESCO-listed Rani ki Vav stepwell and the Patola weaving tradition, as a heritage day out from Ahmedabad.",
    best_time: "October to March",
    how_to_reach:
      "Modhera is about 100 km from Ahmedabad by road, reached via Mehsana; it is usually visited as a day trip combined with Patan.",
    faq: [
      { question: "What is Modhera known for?", answer: "Its 11th-century Sun Temple, one of Gujarat's finest examples of temple architecture, with the Surya Kund stepped tank." },
      { question: "Can I combine Modhera with Patan?", answer: "Yes — Patan, with the UNESCO-listed Rani ki Vav and Patola weaving, is close by and pairs well as a full-day heritage trip." },
    ],
  },
  {
    slug: "vadodara",
    answer_first:
      "Vadodara (Baroda) is a cultural city known for the grand Laxmi Vilas Palace and its museums and gardens. It is the closest big city to the Statue of Unity and Champaner-Pavagadh, making it a convenient base for eastern Gujarat's heritage and monuments.",
    best_time: "October to March",
    how_to_reach:
      "Vadodara has an airport and is a major railway junction on the Mumbai–Delhi line; it is well linked by the NH-48 highway.",
    faq: [
      { question: "What is Vadodara famous for?", answer: "The grand Laxmi Vilas Palace, its museums and academic institutions, and its position as a gateway to the Statue of Unity and Champaner." },
      { question: "Is Vadodara a good base for the Statue of Unity?", answer: "Yes — it is the nearest large city, about 90 km away, with the best flight and rail connections for reaching Kevadia." },
    ],
  },
  {
    slug: "surat",
    answer_first:
      "Surat, a bustling diamond and textile city on the Tapi river, has a layered trading history reflected in its old fort and Dutch and Portuguese cemeteries. It is also a terminus of the Ghogha–Hazira RoRo ferry across the Gulf of Khambhat and a growing air hub.",
    best_time: "October to March",
    how_to_reach:
      "Surat has an airport and is a major railway station on the Mumbai–Ahmedabad line; the Hazira RoRo ferry terminal links it to Ghogha near Bhavnagar.",
    faq: [
      { question: "What is Surat known for?", answer: "Its diamond-cutting and textile industries, riverside heritage, and as a terminus of the Ghogha–Hazira RoRo ferry." },
      { question: "Does the RoRo ferry run from Surat?", answer: "The Ghogha–Hazira RoRo ferry operates from Hazira near Surat across the Gulf of Khambhat. Confirm current timings and fares with the operator." },
    ],
  },
  {
    slug: "rajkot",
    answer_first:
      "Rajkot, the largest city in Saurashtra, is closely tied to Mahatma Gandhi's schooling — preserved at Kaba Gandhi no Delo — and serves as a practical base and gateway for Gir, Dwarka and the wider Saurashtra circuit. It has a growing airport and good rail links.",
    best_time: "October to March",
    how_to_reach:
      "Rajkot has an airport with domestic flights and is a major Saurashtra railway junction, well connected by road across the region.",
    faq: [
      { question: "What is Rajkot known for?", answer: "Its links to Mahatma Gandhi's early schooling (Kaba Gandhi no Delo) and its role as the commercial hub and travel gateway of Saurashtra." },
      { question: "Is Rajkot a good base for a Saurashtra trip?", answer: "Yes — its central location and transport links make it a convenient starting point for Gir, Dwarka, Somnath and Kutch." },
    ],
  },
  {
    slug: "bhavnagar",
    answer_first:
      "Bhavnagar, a coastal city in Saurashtra, is the gateway to the Jain pilgrimage of Palitana and the Velavadar blackbuck sanctuary. In town, the Takhteshwar temple offers city and sea views. Nearby Ghogha is a terminus of the RoRo ferry across the Gulf of Khambhat.",
    best_time: "October to March",
    how_to_reach:
      "Bhavnagar has an airport with domestic flights and a railway station; Palitana is about 50 km away and Velavadar within easy reach by road.",
    faq: [
      { question: "What is Bhavnagar the gateway to?", answer: "The Jain temples of Palitana (Shatrunjaya) and the Velavadar Blackbuck National Park, both within easy reach by road." },
      { question: "Does the RoRo ferry run from Bhavnagar?", answer: "The Ghogha–Hazira RoRo ferry operates from Ghogha near Bhavnagar. Confirm the current schedule and fare with the operator." },
    ],
  },
];

const SPOKES = [
  // Statue of Unity
  {
    destination: "statue-of-unity",
    slug: "viewing-gallery",
    answer_first:
      "The Statue of Unity's viewing gallery sits high inside the statue, around 135 metres up, offering panoramic views of the Sardar Sarovar Dam, the Narmada river and the Satpura and Vindhya ranges. A high-speed lift takes visitors up. Confirm current ticket types and timings before you go.",
    faq: [
      { question: "How high is the Statue of Unity viewing gallery?", answer: "It is located at around 135 metres, at the chest level of the statue, reached by a high-speed lift." },
      { question: "Do I need a separate ticket for the viewing gallery?", answer: "The viewing gallery usually requires a specific ticket, often more limited than general entry. Confirm current ticket types, prices and timings before visiting." },
    ],
  },
  {
    destination: "statue-of-unity",
    slug: "jungle-safari-park",
    answer_first:
      "The Jungle Safari at Kevadia is a large multi-level zoological and botanical park near the Statue of Unity, home to a wide range of birds and animals across themed enclosures. It is a popular family add-on. Confirm current timings, tickets and any weekly closure before visiting.",
    faq: [
      { question: "What is the Jungle Safari near the Statue of Unity?", answer: "A large zoological park at Kevadia with birds, animals and walk-through aviaries, designed as a family attraction beside the statue." },
      { question: "Is the Jungle Safari included in the statue ticket?", answer: "It is usually a separate attraction with its own ticket. Combined passes may be available — confirm current options and timings." },
    ],
  },
  {
    destination: "statue-of-unity",
    slug: "valley-of-flowers",
    answer_first:
      "The Valley of Flowers (Bharat Van and adjoining gardens) is a landscaped stretch of seasonal blooms along the Narmada near the Statue of Unity, popular for gentle walks and photography. Flowering is best in the cooler months. Confirm current access and timings on site.",
    faq: [
      { question: "What is the Valley of Flowers at Kevadia?", answer: "Landscaped riverside flower gardens near the Statue of Unity, at their colourful best in the cooler winter months." },
      { question: "When is the best time to see the flowers?", answer: "Roughly October to March, when the weather is cool and the seasonal planting is in bloom." },
    ],
  },
  {
    destination: "statue-of-unity",
    slug: "ekta-cruise-river-rafting",
    answer_first:
      "Kevadia offers a boat cruise on the Narmada with views of the Statue of Unity, alongside river rafting for those wanting an adventure activity. Both are weather- and water-level dependent and seasonal. Confirm current operating times, prices and booking before you plan around them.",
    faq: [
      { question: "Can you do a boat cruise near the Statue of Unity?", answer: "Yes, the Ekta cruise runs on the Narmada with views of the statue. Operating times vary with season and water levels — confirm current schedules." },
      { question: "Is river rafting available at Kevadia?", answer: "River rafting is offered as a seasonal adventure activity near the statue. Availability depends on conditions, so confirm booking and timings in advance." },
    ],
  },
  {
    destination: "statue-of-unity",
    slug: "tickets-timings-guide",
    answer_first:
      "Visiting the Statue of Unity involves choosing between general entry and viewing-gallery tickets, plus optional attractions like the Jungle Safari, Valley of Flowers and cruise. The site is typically closed one day a week for maintenance. Prices and timings change, so confirm the current details on the official channel before you book.",
    faq: [
      { question: "Is the Statue of Unity open every day?", answer: "It is generally closed one day a week (commonly Monday) for maintenance. Confirm the current weekly closure and timings before visiting." },
      { question: "What ticket options are there?", answer: "Typically general entry, viewing-gallery entry, and combo passes covering nearby attractions. Prices and combinations change, so check the official source for current rates." },
    ],
  },
  // Kutch & the Rann
  {
    destination: "kutch-rann",
    slug: "rann-utsav-tent-city",
    answer_first:
      "The Rann Utsav tent city at Dhordo is a seasonal resort of furnished tents set up for the winter festival on the White Rann, with cultural programmes, craft stalls and Rann excursions. It runs across the cool months and books out on full-moon dates. Confirm the current season dates and packages before booking.",
    faq: [
      { question: "When does the Rann Utsav tent city operate?", answer: "Across the cool winter season, broadly November to February or March. The exact opening and closing dates are announced each year — confirm before booking." },
      { question: "What is included in a tent city stay?", answer: "Typically furnished tent accommodation, meals, cultural programmes and Rann visits, sold as packages. Full-moon nights are the most in demand." },
    ],
  },
  {
    destination: "kutch-rann",
    slug: "dhordo-white-rann",
    answer_first:
      "Dhordo is the gateway village to the White Rann, the vast salt desert that stretches to the horizon and is especially striking at sunset and under a full moon. A permit is checked at Bhirandiyara en route. The Rann is best from roughly November to February and can be flooded after the monsoon.",
    faq: [
      { question: "What is Dhordo?", answer: "The gateway village to the White Rann of Kutch, and the base for the Rann Utsav tent city and salt-desert excursions." },
      { question: "When is the White Rann at its best?", answer: "Roughly November to February, when the salt flats are firm and dry; sunset and full-moon nights are the most popular times." },
    ],
  },
  {
    destination: "kutch-rann",
    slug: "kutch-craft-villages",
    answer_first:
      "Kutch's craft villages — including Hodka, Bhujodi, Nirona and Ajrakhpur — are renowned for embroidery, Ajrakh block-printing, Rogan art and copper-bell making. Visiting the artisans is a highlight of any Kutch trip. Many can be combined in a day out from Bhuj; confirm workshop timings locally.",
    faq: [
      { question: "Which craft villages should I visit in Kutch?", answer: "Bhujodi (weaving), Nirona (Rogan art and bell-making), Ajrakhpur (Ajrakh printing) and Hodka (embroidery) are among the best known." },
      { question: "Can I buy crafts directly from the artisans?", answer: "Yes, most villages welcome visitors and sell directly. Combining several in a day from Bhuj works well; confirm timings before you set out." },
    ],
  },
  {
    destination: "kutch-rann",
    slug: "kalo-dungar-black-hill",
    answer_first:
      "Kalo Dungar (Black Hill) is the highest point in Kutch, offering sweeping views over the White Rann and a well-known sunset vantage. At its top is a Dattatreya temple. It is reached by road from Bhuj or the Rann area; allow time for the winding drive and confirm access before evening visits.",
    faq: [
      { question: "What is Kalo Dungar known for?", answer: "As the highest point in Kutch, with panoramic views across the White Rann and a popular sunset viewpoint, plus a Dattatreya temple at the top." },
      { question: "How do you reach Kalo Dungar?", answer: "By road from Bhuj or the Dhordo/Rann area via a winding hill route. Confirm access and timings, especially for sunset visits." },
    ],
  },
  // Ahmedabad
  {
    destination: "ahmedabad",
    slug: "sabarmati-ashram",
    answer_first:
      "Sabarmati Ashram, on the banks of the Sabarmati in Ahmedabad, was Mahatma Gandhi's home for years and the starting point of the 1930 Dandi Salt March. Today it is a museum and memorial with his preserved quarters and exhibits. Confirm current timings and any entry arrangement before visiting.",
    faq: [
      { question: "What is Sabarmati Ashram?", answer: "Mahatma Gandhi's former residence in Ahmedabad and the starting point of the Dandi March, now a museum and memorial." },
      { question: "Is there an entry fee for Sabarmati Ashram?", answer: "Entry has traditionally been free, but arrangements can change — confirm current timings and any requirements before your visit." },
    ],
  },
  {
    destination: "ahmedabad",
    slug: "sabarmati-riverfront-atal-bridge",
    answer_first:
      "The Sabarmati Riverfront is a landscaped promenade through central Ahmedabad, and the Atal Bridge is a striking pedestrian bridge linking its two banks, popular for evening walks and river views. Confirm current bridge timings and any ticket before you go.",
    faq: [
      { question: "What is the Atal Bridge?", answer: "A colourful pedestrian bridge over the Sabarmati connecting the two riverfront promenades in Ahmedabad, popular in the evenings." },
      { question: "Is there a ticket for the Atal Bridge?", answer: "A small entry ticket has applied for the bridge; confirm the current fee and timings before visiting." },
    ],
  },
  {
    destination: "ahmedabad",
    slug: "adalaj-stepwell",
    answer_first:
      "Adalaj Stepwell, about 18 km from Ahmedabad, is an intricately carved five-storey stepwell built in the late 15th century, blending Hindu and Islamic motifs. Cool and atmospheric, it is an easy half-day trip from the city. Confirm current opening hours before visiting.",
    faq: [
      { question: "How old is the Adalaj Stepwell?", answer: "It dates to the late 15th century and is celebrated for its five storeys of detailed carving blending Hindu and Islamic styles." },
      { question: "How far is Adalaj from Ahmedabad?", answer: "About 18 km, making it an easy half-day trip by road from the city." },
    ],
  },
  {
    destination: "ahmedabad",
    slug: "science-city-ahmedabad",
    answer_first:
      "Gujarat Science City in Ahmedabad is a large science-education complex with an aquatics gallery, robotics gallery, IMAX theatre and hands-on exhibits, popular with families and school groups. Attractions are individually ticketed. Confirm current timings, tickets and any weekly closure before visiting.",
    faq: [
      { question: "What is there at Gujarat Science City?", answer: "An aquarium, robotics gallery, IMAX theatre, nature park and interactive science exhibits across a large campus." },
      { question: "Do I need separate tickets for each attraction?", answer: "Yes, the major galleries are usually ticketed individually, sometimes with combo options. Confirm current prices and timings before visiting." },
    ],
  },
  // Modhera
  {
    destination: "modhera",
    slug: "sun-temple-guide",
    answer_first:
      "The Modhera Sun Temple, built in the early 11th century, is one of Gujarat's architectural masterpieces, with a carved sabha mandapa and the stepped Surya Kund tank. An evening sound-and-light show narrates its story. Confirm current timings, tickets and show schedule before visiting.",
    faq: [
      { question: "How old is the Modhera Sun Temple?", answer: "It was built in the early 11th century, dedicated to the Sun god Surya, and is renowned for its carvings and the Surya Kund stepped tank." },
      { question: "Is there a sound-and-light show at Modhera?", answer: "Yes, an evening sound-and-light show is held at the temple. Confirm the current schedule and ticket before planning an evening visit." },
    ],
  },
  {
    destination: "modhera",
    slug: "patan-patola-heritage",
    answer_first:
      "Patan, near Modhera, is home to the UNESCO-listed Rani ki Vav — an extraordinarily carved stepwell — and to the double-ikat Patola weaving tradition, one of India's most intricate and prized textiles. The two pair naturally as a heritage day out. Confirm site timings and any workshop visits locally.",
    faq: [
      { question: "What is Rani ki Vav?", answer: "A UNESCO World Heritage stepwell in Patan, celebrated for its elaborate sculptural panels; it features on the Indian 100-rupee note." },
      { question: "What is Patan Patola?", answer: "A rare double-ikat silk weaving tradition from Patan, where both warp and weft are resist-dyed before weaving, making it highly intricate and prized." },
    ],
  },
];

const destSchema = new mongoose.Schema({ slug: String }, { strict: false, autoIndex: false });
const Dest = mongoose.models.Destination || mongoose.model("Destination", destSchema);
const tiSchema = new mongoose.Schema({ slug: String, destination: String }, { strict: false, autoIndex: false });
const TI = mongoose.models.TempleInfo || mongoose.model("TempleInfo", tiSchema);

async function main() {
  const db = mongoose.connection.db;
  let p = 0;
  for (const x of PILLARS) {
    const r = await db.collection("destinations").updateOne(
      { slug: x.slug },
      { $set: { answer_first: x.answer_first, best_time: x.best_time, how_to_reach: x.how_to_reach, faq: x.faq, updatedAt: new Date() } }
    );
    if (r.matchedCount) p++; else console.log("  MISSING pillar:", x.slug);
  }
  let s = 0;
  for (const x of SPOKES) {
    const r = await db.collection("templeinfos").updateOne(
      { destination: x.destination, slug: x.slug },
      { $set: { answer_first: x.answer_first, faq: x.faq, updatedAt: new Date() } }
    );
    if (r.matchedCount) s++; else console.log("  MISSING spoke:", x.destination + "/" + x.slug);
  }
  console.log(`pillars updated: ${p}/${PILLARS.length}`);
  console.log(`spokes updated:  ${s}/${SPOKES.length}`);
}

await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
await main();
await mongoose.disconnect();
