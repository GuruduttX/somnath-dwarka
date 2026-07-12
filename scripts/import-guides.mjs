/**
 * Import the URL map's Wave C + D2 /guides/ pages into the CMS (Blog collection).
 *
 *   node --env-file=.env.local scripts/import-guides.mjs [--dry]
 *
 * Guides are DB-backed (Blog model), so unlike the seed silos they need real
 * records to resolve. Each is created `status: published` so the page renders,
 * and `noindex: true` so it stays out of the index until an editor expands it.
 *
 * Content here is a concise, honest scaffold: answer-first + a short body and
 * FAQs. Operational specifics (prices, exact timings, PDF availability) are
 * hedged with "confirm/indicative", never invented — per AGENTS.md.
 *
 * Re-running is safe: records are upserted by slug and the authored fields are
 * written only on insert ($setOnInsert), so editor edits are never clobbered.
 */
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const AUTHOR = "Experience My India Team";
const HERO = "/images/home/HomeHero.webp";

/** slug -> guide scaffold. content is HTML (rendered as prose). */
const GUIDES = [
  {
    slug: "12-jyotirlingas",
    category: "Pilgrimage Guides",
    title: "12 Jyotirlingas — The Complete List & Where They Are",
    image: HERO,
    subContent:
      "The 12 Jyotirlingas are the most sacred Shiva shrines in India, each marking where Shiva is worshipped as a lingam of light. Somnath in Gujarat is traditionally listed first. Our local team helps pilgrims plan the Gujarat leg of a wider jyotirlinga yatra.",
    content:
      "<h2>The twelve Jyotirlingas</h2><p>The Jyotirlingas are twelve especially sacred shrines of Lord Shiva, spread across India. They are, by tradition: Somnath (Gujarat), Mallikarjuna (Andhra Pradesh), Mahakaleshwar (Madhya Pradesh), Omkareshwar (Madhya Pradesh), Kedarnath (Uttarakhand), Bhimashankar (Maharashtra), Kashi Vishwanath (Uttar Pradesh), Trimbakeshwar (Maharashtra), Vaidyanath (Jharkhand), Nageshwar (Gujarat, near Dwarka), Rameshwaram (Tamil Nadu) and Grishneshwar (Maharashtra).</p><p>Two of the twelve — Somnath and Nageshwar — lie in Gujarat, which is why the Somnath–Dwarka circuit is central to a jyotirlinga pilgrimage.</p>",
    faqs: [
      { question: "Which Jyotirlinga is in Gujarat?", answer: "Two are traditionally placed in Gujarat: Somnath near Veraval and Nageshwar near Dwarka." },
      { question: "Which Jyotirlinga is first?", answer: "Somnath in Gujarat is traditionally listed as the first of the twelve Jyotirlingas." },
    ],
  },
  {
    slug: "jyotirlingas-in-gujarat",
    category: "Pilgrimage Guides",
    title: "Jyotirlingas in Gujarat — Somnath & Nageshwar",
    image: HERO,
    subContent:
      "Gujarat has two of the twelve Jyotirlingas: Somnath near Veraval, traditionally the first, and Nageshwar near Dwarka. Both sit on the Saurashtra coast and pair naturally with a Dwarka darshan on the Somnath–Dwarka circuit.",
    content:
      "<h2>Somnath and Nageshwar</h2><p>Of the twelve Jyotirlingas, two are in Gujarat. <strong>Somnath</strong>, on the coast near Veraval, is traditionally counted as the first and is famous for its seaside setting and evening aarti. <strong>Nageshwar</strong>, between Dwarka and Bet Dwarka, is the other, marked by a towering Shiva statue.</p><p>Because they are about 230 km apart along the coast, most pilgrims see both on a single Somnath–Dwarka trip, adding Dwarkadhish and Bet Dwarka along the way.</p>",
    faqs: [
      { question: "How many Jyotirlingas are in Gujarat?", answer: "Two — Somnath near Veraval and Nageshwar near Dwarka." },
      { question: "Can I visit both Gujarat Jyotirlingas together?", answer: "Yes. They are about 230 km apart and fit comfortably into a 3–5 day Somnath–Dwarka circuit." },
    ],
  },
  {
    slug: "shakti-peeth-in-gujarat",
    category: "Pilgrimage Guides",
    title: "Shakti Peeths in Gujarat — Ambaji, Pavagadh & More",
    image: HERO,
    subContent:
      "Gujarat's most revered Shakti shrines include Ambaji near the Rajasthan border and Mahakali at Pavagadh, both major pilgrimage centres. They are usually visited on a dedicated Shakti circuit rather than as part of the coastal Somnath–Dwarka trip.",
    content:
      "<h2>Gujarat's Shakti shrines</h2><p><strong>Ambaji</strong>, in the Aravalli hills of north Gujarat, is one of the most important Shakti shrines in western India and draws large crowds on Purnima days. <strong>Mahakali at Pavagadh</strong>, near Champaner, sits atop a hill reached by steps or ropeway and is a UNESCO-listed heritage area.</p><p>Traditions differ on which sites are counted among the classical Shakti Peeths, so confirm the specific shrine and current darshan arrangements before travelling.</p>",
    faqs: [
      { question: "What is the main Shakti temple in Gujarat?", answer: "Ambaji in north Gujarat is the best known, alongside Mahakali at Pavagadh near Champaner." },
      { question: "Is Pavagadh reachable by ropeway?", answer: "Yes, a ropeway supplements the stepped climb to the Mahakali temple at Pavagadh. Confirm current timings and fares locally." },
    ],
  },
  {
    slug: "jain-tirth-in-gujarat",
    category: "Pilgrimage Guides",
    title: "Jain Tirths in Gujarat — Palitana, Girnar & Taranga",
    image: HERO,
    subContent:
      "Gujarat is home to major Jain tirths including Palitana (Shatrunjaya), Girnar near Junagadh and Taranga. Palitana, with hundreds of temples atop Shatrunjaya hill reached by a long stepped climb, is among the holiest Jain pilgrimage sites.",
    content:
      "<h2>Major Jain pilgrimage sites</h2><p><strong>Palitana</strong> is the most famous: the Shatrunjaya hill holds hundreds of intricately carved marble temples, reached by a climb of several thousand steps that pilgrims complete on foot. <strong>Girnar</strong>, near Junagadh, has important Jain temples partway up the hill, shared with Hindu shrines higher up. <strong>Taranga</strong> in north Gujarat is another significant Shvetambara tirth.</p><p>These sites involve significant climbs; plan for an early start and confirm any seasonal or timing restrictions before you go.</p>",
    faqs: [
      { question: "Which is the most important Jain tirth in Gujarat?", answer: "Palitana, on Shatrunjaya hill, is among the holiest Jain pilgrimage sites, with hundreds of hilltop temples." },
      { question: "How do you reach the Palitana temples?", answer: "By climbing several thousand steps up Shatrunjaya hill on foot; dolis (carried chairs) may be available for those who need assistance." },
    ],
  },
  {
    slug: "char-dham-yatra",
    category: "Pilgrimage Guides",
    title: "Char Dham Yatra — Significance & Dwarka's Place in It",
    image: HERO,
    subContent:
      "The Char Dham are four sacred abodes — Badrinath, Puri, Rameswaram and Dwarka — that together represent a pan-India pilgrimage. Dwarka in Gujarat is the western dham, which is why a Dwarka darshan carries such significance for pilgrims.",
    content:
      "<h2>The four dhams</h2><p>The classical Char Dham, as set out in tradition, are <strong>Badrinath</strong> (north), <strong>Puri</strong> (east), <strong>Rameswaram</strong> (south) and <strong>Dwarka</strong> (west). Completing all four is considered a lifetime pilgrimage.</p><p>Dwarka, Lord Krishna's legendary kingdom, is the western dham. Many pilgrims combine their Dwarka visit with Somnath and Bet Dwarka, turning the western dham into a fuller Saurashtra circuit. (Note the separate 'Chota Char Dham' in Uttarakhand is a different set of shrines.)</p>",
    faqs: [
      { question: "Is Dwarka one of the Char Dham?", answer: "Yes. Dwarka is the western dham among the four Char Dham — Badrinath, Puri, Rameswaram and Dwarka." },
      { question: "What is the difference from the Chota Char Dham?", answer: "The Chota Char Dham (Yamunotri, Gangotri, Kedarnath, Badrinath) is a separate Himalayan circuit in Uttarakhand." },
    ],
  },
  {
    slug: "gujarat-yatra-calendar",
    category: "Travel Guides",
    title: "Gujarat Yatra Calendar — Festivals & Best Months",
    image: HERO,
    subContent:
      "A Gujarat yatra calendar maps the year's major pilgrimage and festival dates — Maha Shivratri at Somnath, Janmashtami at Dwarka, Navratri, Kartik Purnima and the Rann Utsav season — against the best travel weather of October to March. Confirm exact dates each year, as most follow the lunar calendar.",
    content:
      "<h2>Key dates through the year</h2><p>Major devotional occasions include <strong>Maha Shivratri</strong> at Somnath (Feb–Mar), <strong>Janmashtami</strong> at Dwarka (Aug–Sep), <strong>Navratri</strong> across Gujarat (Sep–Oct), <strong>Kartik Purnima</strong> at Somnath (Nov) and the <strong>Rann Utsav</strong> season in Kutch (roughly Nov–Feb).</p><p>Most religious dates follow the Hindu lunar calendar, so they shift year to year. Use this as a planning guide and confirm the exact dates for your travel year before booking. A downloadable calendar may be offered separately — check availability rather than assuming it.</p>",
    faqs: [
      { question: "When are the big festivals at Somnath and Dwarka?", answer: "Maha Shivratri at Somnath falls around February–March, and Janmashtami at Dwarka around August–September; both shift yearly with the lunar calendar." },
      { question: "What is the best overall season for a Gujarat yatra?", answer: "October to March offers the most comfortable weather for temple darshan and coastal travel." },
    ],
  },
  {
    slug: "somnath-dwarka-trip-cost",
    category: "Travel Guides",
    title: "Somnath Dwarka Trip Cost — What to Budget",
    image: HERO,
    subContent:
      "A Somnath–Dwarka trip cost depends on days, hotel tier, group size and how you travel. As an indicative guide, a 3–4 day private-cab circuit with mid-range hotels typically starts in the low-to-mid five figures per couple. Share your dates for a firm quote — all figures here are indicative, not fixed.",
    content:
      "<h2>What drives the cost</h2><p>The main factors are <strong>trip length</strong> (2 to 6 days), <strong>hotel tier</strong> (value pilgrim lodges to premium stays), <strong>vehicle</strong> (shared, car, or tempo traveller) and <strong>group size</strong>, since fixed costs split across more travellers.</p><p>Getting into Gujarat (flight or train) is usually costed separately from the on-ground circuit. Because rates change with season and demand, treat any figure as indicative and ask for a written quote for your exact dates and preferences.</p>",
    faqs: [
      { question: "How much does a Somnath Dwarka trip cost?", answer: "It varies widely with days, hotel tier and group size, so we provide a firm quote for your dates rather than a fixed number. The figures on this page are indicative only." },
      { question: "Is airfare included in package prices?", answer: "Usually not — travel into Gujarat is typically quoted separately from the on-ground circuit, though it can be added on request." },
    ],
  },
  {
    slug: "what-to-pack-for-gujarat-yatra",
    category: "Travel Guides",
    title: "What to Pack for a Gujarat Yatra — Checklist",
    image: HERO,
    subContent:
      "Pack modest, temple-appropriate clothing, comfortable walking shoes that slip off easily for darshan, sun protection for the coast, and any personal medicines. Gujarat is a dry state, so carry a refillable water bottle rather than expecting alcohol. Adjust for winter nights in Kutch, which can be cold.",
    content:
      "<h2>Packing essentials</h2><ul><li><strong>Clothing:</strong> modest, breathable outfits that cover shoulders and knees for temple entry; a light layer for cool winter evenings, especially in Kutch.</li><li><strong>Footwear:</strong> comfortable shoes you can remove easily, plus socks for hot temple floors.</li><li><strong>Sun & sea:</strong> hat, sunglasses and sunscreen for the coast; a small towel if visiting beaches.</li><li><strong>Health:</strong> personal medicines, a basic first-aid kit and a refillable water bottle.</li><li><strong>Documents:</strong> ID, tickets, and any required permits (for example for the Rann of Kutch).</li></ul><p>Confirm any temple-specific dress or item restrictions before your visit, as these can change on festival days.</p>",
    faqs: [
      { question: "What should I wear for temple darshan in Gujarat?", answer: "Modest clothing covering shoulders and knees, and footwear that slips off easily since shoes are removed before entering." },
      { question: "Can I buy alcohol during a Gujarat yatra?", answer: "Gujarat is a dry state; alcohol requires a permit and availability is limited, so plan accordingly." },
    ],
  },
  {
    slug: "somnath-dwarka-food-guide",
    category: "Travel Guides",
    title: "Somnath & Dwarka Food Guide — Where & What to Eat",
    image: HERO,
    subContent:
      "Food around Somnath and Dwarka is predominantly vegetarian, centred on Gujarati and Kathiawadi thalis, with plenty of pilgrim-friendly options near the temples. Alcohol is not sold as Gujarat is a dry state. Temple prasad and simple thali restaurants are the reliable staples.",
    content:
      "<h2>What to expect</h2><p>Both towns are firmly <strong>vegetarian</strong>, reflecting their status as major pilgrimage centres. The signature meal is the <strong>Gujarati thali</strong> — an unlimited platter of rotli, dal, shaak, rice, farsan and sweets — with the spicier, garlicky <strong>Kathiawadi</strong> style common across Saurashtra.</p><p>Near the temples you'll find simple thali restaurants and snack stalls serving fafda, dhokla, khaman and chaas (buttermilk). Alcohol is not served anywhere, as Gujarat enforces prohibition. For hygiene, favour busy, well-reviewed eateries and freshly cooked food.</p>",
    faqs: [
      { question: "Is non-vegetarian food available in Somnath and Dwarka?", answer: "Both are predominantly vegetarian pilgrimage towns; vegetarian Gujarati and Kathiawadi food dominates." },
      { question: "What is the local specialty to try?", answer: "A full Gujarati or Kathiawadi thali, plus snacks like fafda, dhokla and khaman with buttermilk." },
    ],
  },
  {
    slug: "somnath-dwarka-for-senior-citizens",
    category: "Travel Guides",
    title: "Somnath & Dwarka for Senior Citizens — Comfort & Access",
    image: HERO,
    subContent:
      "Somnath and Dwarka are manageable for senior citizens with a gentle plan: stay in hotels near the temples, keep driving legs short with breaks, and allow rest between darshans. Both temples offer some assistance and ramp access, though older lanes have steps. Confirm current facilities with the temple trusts.",
    content:
      "<h2>Planning a comfortable trip</h2><p>Choose accommodation within walking distance of the temple gates so darshan and the evening aarti don't require long transfers. Keep the itinerary light — the roughly 233 km Dwarka–Somnath drive is best broken with a stop at Porbandar rather than done in one long stretch.</p><p>Both Dwarkadhish and Somnath temples can arrange some assistance and have ramp access in parts, but surrounding lanes and certain areas still have steps. A private vehicle with a helper offers the most control. Confirm wheelchair, assistance and priority-darshan availability with the temple trusts ahead of your visit.</p>",
    faqs: [
      { question: "Are Somnath and Dwarka temples accessible for the elderly?", answer: "Both offer some ramp access and assistance, though older surrounding lanes have steps. Contact the temple trusts to confirm current facilities." },
      { question: "How can seniors make the trip more comfortable?", answer: "Stay near the temples, use a private vehicle with a helper, keep driving legs short with breaks, and allow rest between darshans." },
    ],
  },
  {
    slug: "gir-safari-extension",
    category: "Travel Guides",
    title: "Gir Safari Extension — Adding Lions to Your Yatra",
    image: "/images/gir/gir-hero.jpg",
    subContent:
      "A Gir safari extension adds an Asiatic-lion safari at Sasan Gir to the Somnath–Dwarka circuit, usually as a 1–2 night add-on after Somnath. Safari permits are limited and released on a fixed schedule, and the park closes for the monsoon (roughly mid-June to mid-October). Book permits well ahead.",
    content:
      "<h2>How the extension works</h2><p>Sasan Gir, the last home of the Asiatic lion, sits within reach of Somnath, so most travellers add it at the end of the pilgrimage. Plan one to two nights to allow at least one safari, ideally early morning.</p><p>Two things need care: <strong>permits</strong>, which are limited and released on a fixed online schedule, so book as early as possible; and the <strong>seasonal closure</strong>, roughly mid-June to mid-October for the monsoon. Confirm the current safari zones, timings and permit process before finalising dates.</p>",
    faqs: [
      { question: "When is Gir closed?", answer: "Gir National Park closes for the monsoon, roughly mid-June to mid-October. Confirm the current reopening date before planning." },
      { question: "Do I need to book the Gir safari in advance?", answer: "Yes. Safari permits are limited and released on a fixed schedule, so book as far ahead as you can." },
    ],
  },
  {
    slug: "diu-extension",
    category: "Travel Guides",
    title: "Diu Extension — A Relaxing End to the Yatra",
    image: HERO,
    subContent:
      "A Diu extension adds the beaches and Portuguese-era forts of Diu to the Somnath–Dwarka circuit, usually as a 1–2 night add-on after Somnath. Diu is a Union Territory close to Somnath, offering a calm coastal contrast to the temple towns.",
    content:
      "<h2>Why add Diu</h2><p>Diu, a former Portuguese enclave and now a Union Territory, lies just beyond Somnath, making it an easy relaxing extension. Highlights include <strong>Diu Fort</strong>, the old churches, <strong>Nagoa</strong> and <strong>Ghoghla</strong> beaches, and a laid-back seaside pace.</p><p>Unlike the surrounding dry state, Diu has different local rules on alcohol; respect local norms and beach-safety advice. Allow one to two nights to unwind after the pilgrimage. Confirm monument timings and any entry fees on arrival.</p>",
    faqs: [
      { question: "How far is Diu from Somnath?", answer: "Diu is a short drive from Somnath, which is why it is a popular relaxing add-on after darshan." },
      { question: "What is there to do in Diu?", answer: "Visit Diu Fort and the old churches, and relax at Nagoa and Ghoghla beaches." },
    ],
  },
  {
    slug: "porbandar-sudama-kirti-mandir",
    category: "Travel Guides",
    title: "Porbandar — Sudama Temple & Kirti Mandir",
    image: HERO,
    subContent:
      "Porbandar, on the road between Dwarka and Somnath, is the birthplace of Mahatma Gandhi and home to Kirti Mandir, a memorial beside his ancestral house, and the Sudama Temple. It fits neatly as a stop mid-circuit without extra driving.",
    content:
      "<h2>What to see</h2><p><strong>Kirti Mandir</strong> is the memorial adjoining the house where Mahatma Gandhi was born, with a small museum and the multi-storeyed ancestral home nearby. The <strong>Sudama Temple</strong>, dedicated to Krishna's devoted friend Sudama, is one of the few temples devoted to him and draws pilgrims on the Krishna circuit.</p><p>Because Porbandar sits on the coastal road between Dwarka and Somnath, it slots in as a natural half-day stop. Confirm current opening hours before you arrive.</p>",
    faqs: [
      { question: "Is Porbandar on the Dwarka–Somnath route?", answer: "Yes. Porbandar lies on the coastal road between the two temple towns, making it an easy mid-circuit stop." },
      { question: "Why is Porbandar significant?", answer: "It is the birthplace of Mahatma Gandhi (Kirti Mandir) and home to the Sudama Temple." },
    ],
  },
  {
    slug: "junagadh-girnar-travel-guide",
    category: "Travel Guides",
    title: "Junagadh & Girnar Travel Guide — Temples, Fort & Climb",
    image: "/images/junagadh-girnar/junagadh-girnar-hero.jpg",
    subContent:
      "Junagadh, at the foot of Girnar hill, combines the long temple climb of Girnar with historic sites like Uparkot Fort and the Ashokan rock edicts. The Girnar ascent is a serious climb of thousands of steps, eased in part by a ropeway. Allow a full day and reasonable fitness.",
    content:
      "<h2>Girnar and the city</h2><p><strong>Girnar</strong> is a cluster of Hindu and Jain temples set high on a volcanic hill, reached by a stepped path of several thousand steps; a <strong>ropeway</strong> now covers part of the ascent. Pilgrims often start before dawn to beat the heat.</p><p>In Junagadh town itself, <strong>Uparkot Fort</strong>, the <strong>Ashokan rock edicts</strong> and the Mahabat Maqbara mausoleum are worth time. Girnar is a demanding climb, so plan for a full day, carry water, and confirm current ropeway timings and fares before you go.</p>",
    faqs: [
      { question: "How many steps is the Girnar climb?", answer: "Several thousand steps to the upper temples; a ropeway now covers part of the ascent. Confirm current ropeway timings and fares locally." },
      { question: "What else is there to see in Junagadh?", answer: "Uparkot Fort, the Ashokan rock edicts and the Mahabat Maqbara mausoleum are the main highlights in town." },
    ],
  },
  {
    slug: "scuba-diving-shivrajpur-dwarka",
    category: "Travel Guides",
    title: "Scuba Diving at Shivrajpur, Dwarka — Season & Booking",
    image: HERO,
    subContent:
      "Shivrajpur beach near Dwarka — a Blue Flag–certified beach — is Gujarat's main spot for beginner scuba diving and snorkelling, generally operating in the calmer season of roughly October to March. Sessions are run by licensed operators; confirm current prices, timings and safety certification before booking.",
    content:
      "<h2>Diving off Shivrajpur</h2><p>Shivrajpur, close to Dwarka, holds a <strong>Blue Flag</strong> certification for its clean, well-managed beach and has become Gujarat's go-to for introductory <strong>scuba diving</strong> and snorkelling in the Arabian Sea.</p><p>Diving is weather-dependent and generally runs in the calmer months of roughly <strong>October to March</strong>; the sea is often too rough during and after the monsoon. Book only with licensed operators, confirm that instructors are certified, and check current session prices and timings, which vary by operator and season.</p>",
    faqs: [
      { question: "When can you scuba dive at Shivrajpur?", answer: "Generally in the calmer season of roughly October to March; the monsoon months are usually unsuitable. Confirm current conditions with the operator." },
      { question: "Do I need experience to dive at Shivrajpur?", answer: "No — introductory dives for beginners are offered with a certified instructor. Verify the operator's licensing and safety before booking." },
    ],
  },
  {
    slug: "gujarat-adventure-activities",
    category: "Travel Guides",
    title: "Adventure & Water Sports in Gujarat — Where & When",
    image: HERO,
    subContent:
      "Gujarat's adventure options include scuba diving at Shivrajpur near Dwarka, water sports and activities around the Statue of Unity at Kevadia, paragliding at Saputara, and stargazing in the Rann of Kutch. Most are seasonal — confirm operating months, prices and safety before booking.",
    content:
      "<h2>Where to go</h2><ul><li><strong>Shivrajpur (near Dwarka):</strong> beginner scuba diving and snorkelling at a Blue Flag beach, roughly October to March.</li><li><strong>Statue of Unity, Kevadia:</strong> river activities, cycling and adventure zones around the site.</li><li><strong>Saputara:</strong> Gujarat's hill station, with boating, ropeway and paragliding in season.</li><li><strong>Rann of Kutch:</strong> vast white-desert landscapes and stargazing, best in the Rann Utsav season (roughly Nov–Feb).</li></ul><p>Availability is highly seasonal and weather-dependent. Confirm operating months, current prices and safety credentials with operators before you plan around any single activity.</p>",
    faqs: [
      { question: "What adventure activities can you do in Gujarat?", answer: "Scuba at Shivrajpur, activities around the Statue of Unity, paragliding at Saputara and stargazing in the Rann, among others — most are seasonal." },
      { question: "Is scuba diving in Gujarat suitable for beginners?", answer: "Yes, introductory dives run at Shivrajpur near Dwarka with certified instructors in the calmer October–March window." },
    ],
  },
];

const blogSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    slug: { type: String, required: true, unique: true, index: true },
    author: String,
    meta: { title: String, description: String },
    image: String,
    alt: String,
    subContent: String,
    content: String,
    faqs: [{ question: String, answer: String }],
    status: String,
    noindex: Boolean,
  },
  { timestamps: true, strict: false }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

async function main() {
  let created = 0;
  let refreshed = 0;

  for (const g of GUIDES) {
    if (DRY) {
      console.log(`  guide  ${g.slug}  (${g.category})`);
      continue;
    }
    const res = await Blog.updateOne(
      { slug: g.slug },
      {
        $setOnInsert: {
          slug: g.slug,
          title: g.title,
          category: g.category,
          author: AUTHOR,
          meta: { title: `${g.title} — Somnath Dwarka Tours`, description: g.subContent.slice(0, 158) },
          image: g.image,
          alt: g.title,
          subContent: g.subContent,
          content: g.content,
          faqs: g.faqs,
          status: "published",
          noindex: true,
        },
      },
      { upsert: true }
    );
    if (res.upsertedCount) created++;
    else refreshed++;
  }

  console.log(`\nguides: ${GUIDES.length} planned`);
  if (!DRY) console.log(`created ${created}, refreshed ${refreshed} (all published + noindex until expanded)`);
}

const run = async () => {
  if (!DRY) {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing (use node --env-file=.env.local)");
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  }
  await main();
  if (!DRY) await mongoose.disconnect();
};

run().then(
  () => process.exit(0),
  (e) => {
    console.error(e.message);
    process.exit(1);
  }
);
