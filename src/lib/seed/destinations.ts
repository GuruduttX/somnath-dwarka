/**
 * Seed content for destination pillars, temple-info, journeys, hotels,
 * festivals, comparisons, tools and author (SOP §5 #8–16). Placeholders carry
 * verify=false; faith/legend content is tagged, never asserted as verified fact.
 */

export type SeedDestination = {
  slug: string; // somnath | dwarka
  destination: string;
  title: string;
  h1: string;
  answer_first: string;
  significance: string; // faith-tagged
  best_time: string;
  how_to_reach: string;
  top_places: { name: string; slug: string; blurb: string }[];
  key_distances: { from: string; to: string; distance: string; duration: string }[];
  map_query: string;
  faq: { question: string; answer: string }[];
};

export const SEED_DESTINATIONS: SeedDestination[] = [
  {
    slug: "somnath",
    destination: "Somnath",
    title: "Somnath Travel Guide — Temple, Timings & Things to Do",
    h1: "Somnath Travel Guide",
    answer_first:
      "Somnath, on Gujarat's Saurashtra coast, is home to the Somnath Temple — revered in tradition as the first of the twelve jyotirlingas. Plan around the aarti and the evening light-and-sound show, and pair it with Triveni Sangam and Bhalka Tirth nearby.",
    significance:
      "In faith and legend, Somnath is counted as the first among the twelve jyotirlingas of Shiva and is associated with the moon god Soma.",
    best_time: "October to March for pleasant coastal weather.",
    how_to_reach:
      "Nearest airports are Diu (~85 km) and Rajkot (~190 km); Veraval is the closest railhead (~7 km). Most visitors arrive by road from Dwarka, Rajkot or Ahmedabad.",
    top_places: [
      { name: "Somnath Temple", slug: "somnath-temple", blurb: "The main jyotirlinga temple and evening aarti." },
      { name: "Triveni Sangam", slug: "triveni-sangam", blurb: "Confluence of three rivers meeting the sea." },
      { name: "Bhalka Tirth", slug: "bhalka-tirth", blurb: "Associated with the final days of Lord Krishna." },
      { name: "Gita Mandir", slug: "gita-mandir", blurb: "Riverside temple inscribed with verses of the Bhagavad Gita, near Triveni Sangam." },
      { name: "Prabhas Patan Museum", slug: "prabhas-patan-museum", blurb: "Archaeological museum with sculptures and remains from the older Somnath temples." },
      { name: "Somnath Beach", slug: "somnath-beach", blurb: "The shore beside the temple, popular for sunsets and the evening sea breeze." },
      { name: "Panchpandav Gufa", slug: "panchpandav-gufa", blurb: "A cave shrine linked to the Pandavas, close to the temple complex." },
      { name: "Old Somnath (Ahilyabai Temple)", slug: "old-somnath-ahilyabai-temple", blurb: "The older Somnath temple built by Ahilyabai Holkar, beside the main shrine." },
      { name: "Dehotsarg Tirth", slug: "dehotsarg-tirth", blurb: "The tirth on the Hiran river marking Lord Krishna's final departure." },
    ],
    key_distances: [
      { from: "Somnath", to: "Dwarka", distance: "≈ 233 km", duration: "~ 4.5–5 hr" },
      { from: "Somnath", to: "Veraval station", distance: "≈ 7 km", duration: "~ 15 min" },
      { from: "Somnath", to: "Diu", distance: "≈ 85 km", duration: "~ 2 hr" },
    ],
    map_query: "Somnath Temple, Gujarat",
    faq: [
      { question: "What is Somnath famous for?", answer: "Somnath is best known for the Somnath Temple, traditionally regarded as the first jyotirlinga, and its seaside setting with a popular evening light-and-sound show." },
      { question: "How many days do you need for Somnath?", answer: "One full day covers the temple, aarti, Triveni Sangam and Bhalka Tirth. Most travellers combine it with Dwarka over 3–5 days." },
    ],
  },
  {
    slug: "dwarka",
    destination: "Dwarka",
    title: "Dwarka Travel Guide — Temple, Timings & Things to Do",
    h1: "Dwarka Travel Guide",
    answer_first:
      "Dwarka, on Gujarat's western tip, is one of the Char Dham and home to the Dwarkadhish Temple dedicated to Lord Krishna. A typical visit covers Dwarkadhish darshan, Nageshwar Jyotirlinga, Bet Dwarka by ferry, and Rukmini Devi Temple.",
    significance:
      "In faith and tradition, Dwarka is revered as Lord Krishna's ancient kingdom and is one of the four Char Dham pilgrimage sites.",
    best_time: "October to March; avoid peak monsoon for ferry crossings to Bet Dwarka.",
    how_to_reach:
      "Nearest airport is Jamnagar (~130 km); Dwarka has its own railway station on the Ahmedabad–Okha line. Road access is easy from Rajkot, Jamnagar and Somnath.",
    top_places: [
      { name: "Dwarkadhish Temple", slug: "dwarkadhish-temple", blurb: "The main Krishna temple and aarti." },
      { name: "Nageshwar Jyotirlinga", slug: "nageshwar-jyotirlinga", blurb: "One of the twelve jyotirlingas, near Dwarka." },
      { name: "Bet Dwarka", slug: "bet-dwarka", blurb: "Island reached by ferry, linked to Krishna's life." },
      { name: "Rukmini Temple", slug: "rukmini-temple", blurb: "Temple dedicated to Rukmini, Krishna's consort, a short drive from Dwarka town." },
      { name: "Gomti Ghat", slug: "gomti-ghat", blurb: "Steps on the Gomti creek where pilgrims bathe before Dwarkadhish darshan." },
      { name: "Sudama Setu", slug: "sudama-setu", blurb: "A pedestrian suspension bridge across the Gomti to the far-bank shrines." },
      { name: "Gopi Talav", slug: "gopi-talav", blurb: "A sacred pond linked to the gopis' devotion, on the road towards Bet Dwarka." },
      { name: "Shivrajpur Beach", slug: "shivrajpur-beach", blurb: "A Blue Flag–certified beach near Dwarka, known for clear water and water sports." },
      { name: "Sudarshan Setu", slug: "sudarshan-setu", blurb: "India's longest cable-stayed bridge, linking Okha with Bet Dwarka." },
      { name: "Dwarka Lighthouse", slug: "dwarka-lighthouse", blurb: "The seafront lighthouse offering coastal views near the temple town." },
      { name: "Hanuman Dandi", slug: "hanuman-dandi", blurb: "A Hanuman temple on Bet Dwarka, revered for its father-and-son Hanuman idols." },
      { name: "ISKCON Dwarka", slug: "iskcon-dwarka", blurb: "The ISKCON Krishna temple in Dwarka with daily aarti and bhajans." },
      { name: "Okha Port", slug: "okha-port", blurb: "The port town and jetty from which ferries and the bridge reach Bet Dwarka." },
    ],
    key_distances: [
      { from: "Dwarka", to: "Somnath", distance: "≈ 233 km", duration: "~ 4.5–5 hr" },
      { from: "Dwarka", to: "Nageshwar", distance: "≈ 17 km", duration: "~ 30 min" },
      { from: "Dwarka", to: "Okha (Bet Dwarka jetty)", distance: "≈ 30 km", duration: "~ 45 min" },
    ],
    map_query: "Dwarkadhish Temple, Dwarka, Gujarat",
    faq: [
      { question: "What is Dwarka famous for?", answer: "Dwarka is famous as one of the Char Dham and the site of the Dwarkadhish Temple dedicated to Lord Krishna, along with nearby Nageshwar Jyotirlinga and Bet Dwarka." },
      { question: "How do you reach Bet Dwarka?", answer: "Bet Dwarka is an island reached by a short ferry from Okha jetty, about 30 km from Dwarka town." },
    ],
  },
];

export type SeedTempleInfo = {
  slug: string;
  destination: string;
  topic: string;
  title: string;
  h1: string;
  answer_first: string;
  timings: { label: string; open: string; close: string }[];
  verified: boolean;
  official_source_url: string;
  dress_code: string;
  photography_rule: string;
  faq: { question: string; answer: string }[];
};

/**
 * Topic spokes under the Somnath and Dwarka pillars. Slugs match the URL map
 * (gujarat-360-url-map-v5): /somnath/somnath-temple-timings/ etc. `live-darshan`
 * repeats across both pillars — findSeedTempleInfo keys on destination + slug.
 *
 * Every timing here is indicative and carries verified: false. The darshan and
 * live-darshan pages ship with no timings table at all rather than an invented
 * one; official streams are linked, never embedded.
 */
export const SEED_TEMPLE_INFO: SeedTempleInfo[] = [
  {
    slug: "somnath-temple-timings",
    destination: "somnath",
    topic: "timings",
    title: "Somnath Temple Timings & Aarti — Darshan Schedule",
    h1: "Somnath Temple Timings & Aarti",
    answer_first:
      "Somnath Temple is generally open for darshan from early morning to night, with aartis through the day and a light-and-sound show in the evening. The indicative schedule below is pending confirmation against the official source before you travel.",
    timings: [
      { label: "Temple darshan", open: "06:00", close: "21:30" },
      { label: "Morning aarti", open: "07:00", close: "—" },
      { label: "Noon aarti", open: "12:00", close: "—" },
      { label: "Evening aarti", open: "19:00", close: "—" },
      { label: "Light & sound show", open: "20:00", close: "21:00" },
    ],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "What are Somnath Temple aarti timings?", answer: "Aartis are held morning, noon and evening (indicatively 07:00, 12:00 and 19:00). Confirm against the official site as festival days differ." },
      { question: "Is there a light and sound show at Somnath?", answer: "Yes, an evening light-and-sound show runs near the temple; timings vary seasonally." },
    ],
  },
  {
    slug: "somnath-aarti-timings",
    destination: "somnath",
    topic: "aarti",
    title: "Somnath Aarti Timings — Morning, Noon & Evening",
    h1: "Somnath Aarti Timings",
    answer_first:
      "Somnath holds three aartis a day — morning, noon and evening — and the evening aarti is the one most visitors plan around. The indicative times below are pending confirmation against the official source, and they shift on festival days.",
    timings: [
      { label: "Morning aarti", open: "07:00", close: "—" },
      { label: "Noon aarti", open: "12:00", close: "—" },
      { label: "Evening aarti", open: "19:00", close: "—" },
    ],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "Which Somnath aarti should I attend?", answer: "The evening aarti draws the largest crowd and is usually followed by the light-and-sound show. Arrive well before the indicative start time." },
      { question: "Do aarti timings change?", answer: "Yes. Timings shift seasonally and on festival days. Confirm against the official temple source before you travel." },
    ],
  },
  {
    slug: "somnath-darshan",
    destination: "somnath",
    topic: "darshan",
    title: "Somnath Darshan & VIP Darshan — A Local Team's Guide",
    h1: "Somnath Darshan & VIP Darshan",
    answer_first:
      "Darshan at Somnath is open to all visitors, with separate queues at peak hours and around the aartis. Any special or VIP darshan arrangement, and whether a fee applies, is set by the temple trust — we confirm the current position with the trust rather than quote a figure here.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "Is there a VIP darshan at Somnath?", answer: "Arrangements and any associated fee are decided by the temple trust and change from time to time. Ask us and we will confirm the current position with the trust before you travel." },
      { question: "When is the queue shortest?", answer: "Early morning, outside the aarti windows, is generally quietest. Festival days and weekends are busiest." },
    ],
  },
  {
    slug: "live-darshan",
    destination: "somnath",
    topic: "live-darshan",
    title: "Somnath Live Darshan — Official Stream & Aarti Times",
    h1: "Somnath Live Darshan Today",
    answer_first:
      "Somnath Temple's live darshan is streamed by the temple trust on its own official channel. We link to that stream rather than re-hosting it, so you always watch the authentic feed at the source.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "",
    photography_rule: "",
    faq: [
      { question: "Where can I watch Somnath live darshan?", answer: "On the temple trust's own official channel. We link to it directly; we do not re-host or embed the stream." },
      { question: "Is the live stream running all day?", answer: "The feed generally follows the temple's darshan and aarti windows. Check the official channel for the current schedule." },
    ],
  },
  {
    slug: "dwarkadhish-temple-timings",
    destination: "dwarka",
    topic: "timings",
    title: "Dwarkadhish Temple Timings — Darshan & Aarti Schedule",
    h1: "Dwarkadhish Temple Timings",
    answer_first:
      "Dwarkadhish Temple opens in the early morning and closes late at night, with a midday break, mangla aarti at dawn and multiple darshan windows. The indicative schedule below is pending confirmation against the official source before you travel.",
    timings: [
      { label: "Mangla aarti", open: "06:30", close: "—" },
      { label: "Morning darshan", open: "07:00", close: "13:00" },
      { label: "Evening darshan", open: "17:00", close: "21:30" },
    ],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Traditional/modest attire; footwear removed before entry.",
    photography_rule: "Photography is usually not allowed inside the temple.",
    faq: [
      { question: "What are Dwarkadhish darshan timings?", answer: "Darshan is typically in the morning and evening with a midday break; mangla aarti is around dawn. Confirm exact times against the official temple source." },
    ],
  },
  {
    slug: "dwarka-aarti-timings",
    destination: "dwarka",
    topic: "aarti",
    title: "Dwarka Aarti & Dhwaja Timings — Mangla to Shayan",
    h1: "Dwarka Aarti & Dhwaja Timings",
    answer_first:
      "The day at Dwarkadhish begins with mangla aarti around dawn, and the temple's flag — the dhwaja — is changed several times a day by families who book the honour in advance. The indicative time below is pending confirmation against the official source.",
    timings: [{ label: "Mangla aarti", open: "06:30", close: "—" }],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Traditional/modest attire; footwear removed before entry.",
    photography_rule: "Photography is usually not allowed inside the temple.",
    faq: [
      { question: "How often is the Dwarka dhwaja changed?", answer: "The flag is changed several times each day. The exact number of changes and how to book the honour are set by the temple; confirm against the official source." },
      { question: "What time is mangla aarti?", answer: "Indicatively around dawn. Times shift seasonally, so confirm before you travel." },
    ],
  },
  {
    slug: "dwarkadhish-darshan",
    destination: "dwarka",
    topic: "darshan",
    title: "Dwarkadhish Darshan & VIP Darshan — A Local Team's Guide",
    h1: "Dwarkadhish Darshan & VIP Darshan",
    answer_first:
      "Darshan at Dwarkadhish runs in a morning and an evening window with a midday break. Any special or VIP darshan arrangement, and whether a fee applies, is set by the temple — we confirm the current position rather than quote a figure here.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Traditional/modest attire; footwear removed before entry.",
    photography_rule: "Photography is usually not allowed inside the temple.",
    faq: [
      { question: "Is there a VIP darshan at Dwarkadhish?", answer: "Arrangements and any associated fee are decided by the temple and change from time to time. Ask us and we will confirm the current position before you travel." },
      { question: "How long does darshan take?", answer: "Outside festival days a queue of thirty to sixty minutes is typical, but this varies sharply with the season and the aarti windows." },
    ],
  },
  {
    slug: "live-darshan",
    destination: "dwarka",
    topic: "live-darshan",
    title: "Dwarka Live Darshan — Official Stream & Aarti Times",
    h1: "Dwarkadhish Live Darshan Today",
    answer_first:
      "Dwarkadhish Temple's live darshan is streamed on the temple's own official channel. We link to that stream rather than re-hosting it, so you always watch the authentic feed at the source.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "",
    photography_rule: "",
    faq: [
      { question: "Where can I watch Dwarka live darshan?", answer: "On the temple's own official channel. We link to it directly; we do not re-host or embed the stream." },
      { question: "Does the stream cover mangla aarti?", answer: "The feed generally follows the temple's darshan and aarti windows. Check the official channel for the current schedule." },
    ],
  },

  // ---- Somnath topic spokes ----
  {
    slug: "somnath-temple-history",
    destination: "somnath",
    topic: "history",
    title: "Somnath Temple History — Rebuilt Through the Ages",
    h1: "Somnath Temple History",
    answer_first:
      "Somnath Temple is one of India's most storied shrines, traditionally regarded as the first of the twelve jyotirlingas. It was destroyed and rebuilt many times over the centuries; the present temple was reconstructed after independence and completed in 1951 in the Chalukya style.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "Why was Somnath Temple rebuilt so many times?", answer: "The temple was raided and demolished repeatedly through history and rebuilt each time; the current structure was reconstructed after independence and completed in 1951." },
      { question: "Who rebuilt the present Somnath Temple?", answer: "The modern reconstruction was driven after independence, associated with Sardar Vallabhbhai Patel's initiative, and completed in 1951." },
    ],
  },
  {
    slug: "somnath-jyotirlinga",
    destination: "somnath",
    topic: "jyotirlinga",
    title: "Somnath Jyotirlinga — The First of the Twelve",
    h1: "Somnath Jyotirlinga",
    answer_first:
      "Somnath is traditionally counted as the first of the twelve jyotirlingas, the most sacred shrines of Lord Shiva. Pilgrims come for darshan of the jyotirlinga and the evening aarti in the temple's dramatic seaside setting on the Arabian Sea.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "Is Somnath the first jyotirlinga?", answer: "Yes, Somnath is traditionally listed as the first of the twelve jyotirlingas of Lord Shiva." },
      { question: "What makes the Somnath jyotirlinga special?", answer: "Beyond its status as the first jyotirlinga, its seaside location and the resilience of a temple rebuilt many times give it deep significance for pilgrims." },
    ],
  },
  {
    slug: "somnath-temple-dress-code",
    destination: "somnath",
    topic: "dress-code",
    title: "Somnath Temple Dress Code — What to Wear",
    h1: "Somnath Temple Dress Code",
    answer_first:
      "Somnath Temple expects modest, respectful attire covering the shoulders and knees. Footwear is removed before entering, and phones and cameras are generally restricted inside. Dress comfortably for the sea breeze and the walk to the temple.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest clothing covering shoulders and knees; footwear removed before entry.",
    photography_rule: "Phones and cameras are generally not allowed inside; deposit them as directed.",
    faq: [
      { question: "Is there a strict dress code at Somnath?", answer: "There is no uniform requirement, but modest attire covering shoulders and knees is expected out of respect. Footwear is removed before entering." },
      { question: "Can I carry my phone into Somnath Temple?", answer: "Phones and cameras are generally restricted inside; there are usually deposit facilities near the entrance. Confirm the current rule on site." },
    ],
  },
  {
    slug: "somnath-rudrabhishek-pooja-booking",
    destination: "somnath",
    topic: "pooja-booking",
    title: "Somnath Rudrabhishek Pooja Booking — How It Works",
    h1: "Somnath Rudrabhishek Pooja Booking",
    answer_first:
      "Rudrabhishek and other poojas at Somnath are arranged through the temple trust, which sets the procedure and any dakshina. The trust is the official channel for booking; we help you understand the process and timing, and confirm the current position with the trust rather than quote a figure here.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "How do I book a Rudrabhishek at Somnath?", answer: "Poojas are arranged through the Shree Somnath Trust, the official channel. We help with the process and timing and confirm the current arrangement with the trust." },
      { question: "What does the Rudrabhishek pooja cost?", answer: "Any dakshina or fee is set by the temple trust and revised from time to time, so we confirm the current figure with the trust rather than print a stale number." },
    ],
  },
  {
    slug: "somnath-light-and-sound-show",
    destination: "somnath",
    topic: "light-and-sound-show",
    title: "Somnath Light & Sound Show — Timing & What to Expect",
    h1: "Somnath Light & Sound Show",
    answer_first:
      "The Somnath light-and-sound show is an evening spectacle staged near the temple, narrating the shrine's history against the backdrop of the sea. It usually runs after the evening aarti; exact timings vary by season, so confirm on the day. The indicative timing below is pending confirmation.",
    timings: [
      { label: "Light & sound show (indicative)", open: "20:00", close: "21:00" },
    ],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering the temple.",
    photography_rule: "Photography of the show may be restricted; follow the on-site instructions.",
    faq: [
      { question: "What time is the Somnath light and sound show?", answer: "It typically runs in the evening after the aarti, indicatively around 20:00, but timings change seasonally. Confirm on the day or with the official source." },
      { question: "Do I need a separate ticket for the show?", answer: "The show is usually ticketed separately from temple entry. Confirm the current arrangement and price on site." },
    ],
  },
  {
    slug: "how-to-reach-somnath",
    destination: "somnath",
    topic: "how-to-reach",
    title: "How to Reach Somnath — Airport, Train & Road",
    h1: "How to Reach Somnath",
    answer_first:
      "Somnath is reached via Veraval, its nearest railhead about 7 km away, or Diu Airport (~85 km); Rajkot and Ahmedabad airports are the larger gateways further out. By road it is roughly 233 km from Dwarka and 400 km from Ahmedabad. A private cab is the most flexible option for pilgrims.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "Which is the nearest railway station to Somnath?", answer: "Veraval, about 7 km from the temple, is the nearest railhead. A short taxi ride completes the journey." },
      { question: "Which is the nearest airport to Somnath?", answer: "Diu Airport (~85 km) is closest, with Rajkot and Ahmedabad as larger gateways further away, each followed by a road transfer." },
    ],
  },
  {
    slug: "best-time-to-visit-somnath",
    destination: "somnath",
    topic: "best-time",
    title: "Best Time to Visit Somnath — Season Guide",
    h1: "Best Time to Visit Somnath",
    answer_first:
      "The best time to visit Somnath is October to March, when the coastal weather is pleasant for darshan, the seafront and the evening light-and-sound show. Summers (April to June) are hot and humid, and the monsoon brings rain but keeps crowds lighter. Maha Shivratri is the biggest festival draw.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "When is the best season to visit Somnath?", answer: "October to March offers the most comfortable coastal weather for temple visits and the seafront. Maha Shivratri (Feb–Mar) is the biggest festival occasion." },
      { question: "Is Somnath good to visit in the monsoon?", answer: "The temple stays open and the sea is dramatic, but expect rain. Crowds are lighter than in peak winter." },
    ],
  },

  // ---- Dwarka topic spokes ----
  {
    slug: "dhwaja-flag-ceremony",
    destination: "dwarka",
    topic: "dhwaja-ceremony",
    title: "Dwarkadhish Dhwaja (Flag) Ceremony — What to Know",
    h1: "Dwarkadhish Dhwaja Flag Ceremony",
    answer_first:
      "The dhwaja ceremony at Dwarkadhish Temple is the changing of the temple's flag atop the shikhara, performed several times a day by sponsoring families as a cherished offering. The flag is visible from afar and the ritual draws devotees; sponsoring a dhwaja is arranged through the temple.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography is generally restricted inside the sanctum; follow on-site rules.",
    faq: [
      { question: "How often is the Dwarkadhish flag changed?", answer: "The dhwaja is changed several times a day by sponsoring families. The exact number and timings are set by the temple; confirm on site." },
      { question: "Can I sponsor the dhwaja ceremony?", answer: "Yes, families sponsor the flag as an offering; it is arranged through the temple. We can help you understand the process and confirm the current arrangement." },
    ],
  },
  {
    slug: "dwarkadhish-vip-darshan",
    destination: "dwarka",
    topic: "vip-darshan",
    title: "Dwarkadhish VIP Darshan — How It Works",
    h1: "Dwarkadhish VIP Darshan",
    answer_first:
      "Any special or VIP darshan arrangement at Dwarkadhish Temple, and whether a fee applies, is decided by the temple administration. Darshan is open to all, with separate queues at peak hours and around the aartis. We confirm the current position with the temple rather than quote a figure here.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography is generally restricted inside the sanctum; follow on-site rules.",
    faq: [
      { question: "Is there a VIP darshan at Dwarkadhish Temple?", answer: "Any special-darshan arrangement and associated fee are set by the temple administration and change from time to time. We confirm the current position before you travel." },
      { question: "When is the Dwarkadhish queue shortest?", answer: "Early morning around mangla aarti and outside peak aarti windows is generally quietest. Festival days and weekends are busiest." },
    ],
  },
  {
    slug: "dwarkadhish-history",
    destination: "dwarka",
    topic: "history",
    title: "Dwarkadhish Temple History — Krishna's Kingdom",
    h1: "Dwarkadhish Temple History",
    answer_first:
      "The Dwarkadhish Temple, also called Jagat Mandir, honours Lord Krishna as the king of Dwarka. Tradition attributes its origins to Krishna's great-grandson Vajranabha, with the present five-storey structure dating largely to later centuries, built on the site of Krishna's legendary city on the Arabian Sea.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography is generally restricted inside the sanctum; follow on-site rules.",
    faq: [
      { question: "How old is the Dwarkadhish Temple?", answer: "Tradition traces its origins to Krishna's great-grandson Vajranabha; the present multi-storey structure dates largely to later centuries on the ancient Dwarka site." },
      { question: "Why is it called Jagat Mandir?", answer: "Jagat Mandir means 'temple of the universe', another name for the Dwarkadhish Temple dedicated to Lord Krishna." },
    ],
  },
  {
    slug: "char-dham-significance",
    destination: "dwarka",
    topic: "char-dham",
    title: "Dwarka's Char Dham Significance — The Western Abode",
    h1: "Dwarka's Char Dham Significance",
    answer_first:
      "Dwarka is the western dham among the four Char Dham — Badrinath, Puri, Rameswaram and Dwarka — that together form a pan-India pilgrimage. As Lord Krishna's legendary kingdom, a Dwarka darshan carries special significance and is often combined with Somnath and Bet Dwarka.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography is generally restricted inside the sanctum; follow on-site rules.",
    faq: [
      { question: "Why is Dwarka one of the Char Dham?", answer: "Dwarka is the western abode of the four Char Dham, revered as Lord Krishna's kingdom, alongside Badrinath, Puri and Rameswaram." },
      { question: "Is Dwarka part of the Chota Char Dham?", answer: "No — the Chota Char Dham (Yamunotri, Gangotri, Kedarnath, Badrinath) is a separate Himalayan circuit. Dwarka belongs to the main Char Dham." },
    ],
  },
  {
    slug: "dwarkadhish-temple-dress-code",
    destination: "dwarka",
    topic: "dress-code",
    title: "Dwarkadhish Temple Dress Code — What to Wear",
    h1: "Dwarkadhish Temple Dress Code",
    answer_first:
      "Dwarkadhish Temple expects modest, respectful attire covering the shoulders and knees. Footwear is removed before entering and phones and cameras are generally restricted inside. Dress comfortably for the queues and the walk from the Gomti ghat side.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Modest clothing covering shoulders and knees; footwear removed before entry.",
    photography_rule: "Phones and cameras are generally not allowed inside; deposit them as directed.",
    faq: [
      { question: "Is there a dress code at Dwarkadhish Temple?", answer: "There is no uniform, but modest attire covering shoulders and knees is expected. Footwear is removed before entering." },
      { question: "Can I take my phone inside Dwarkadhish Temple?", answer: "Phones and cameras are generally restricted inside; deposit facilities are usually available near the entrance. Confirm the current rule on site." },
    ],
  },
  {
    slug: "how-to-reach-dwarka",
    destination: "dwarka",
    topic: "how-to-reach",
    title: "How to Reach Dwarka — Airport, Train & Road",
    h1: "How to Reach Dwarka",
    answer_first:
      "Dwarka has its own railway station on the Western Railway with direct trains, and Jamnagar Airport (~130 km) is the nearest airport, with Rajkot and Ahmedabad as larger gateways. By road it is roughly 233 km from Somnath and 440 km from Ahmedabad. A private cab is the most flexible option.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography is generally restricted inside the sanctum; follow on-site rules.",
    faq: [
      { question: "Does Dwarka have a railway station?", answer: "Yes, Dwarka is on the Western Railway with direct trains, making rail a convenient way to arrive." },
      { question: "Which is the nearest airport to Dwarka?", answer: "Jamnagar Airport (~130 km) is nearest, with Rajkot and Ahmedabad as larger gateways, each followed by a road transfer." },
    ],
  },
  {
    slug: "best-time-to-visit-dwarka",
    destination: "dwarka",
    topic: "best-time",
    title: "Best Time to Visit Dwarka — Season Guide",
    h1: "Best Time to Visit Dwarka",
    answer_first:
      "The best time to visit Dwarka is October to March, when the coastal weather is pleasant for darshan, Bet Dwarka and the seafront. Summers (April to June) are hot and humid, and the monsoon can disrupt the Bet Dwarka ferry in rough weather. Janmashtami is the biggest festival draw.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography is generally restricted inside the sanctum; follow on-site rules.",
    faq: [
      { question: "When is the best season to visit Dwarka?", answer: "October to March offers the most comfortable coastal weather for the temple, Bet Dwarka and the seafront. Janmashtami (Aug–Sep) is the biggest festival occasion." },
      { question: "Can I visit Bet Dwarka in the monsoon?", answer: "The temples stay open, but the Bet Dwarka ferry can be suspended in rough weather, so check conditions before planning that leg." },
    ],
  },
];

export type SeedJourney = {
  slug: string;
  title: string;
  h1: string;
  question: string;
  direct_answer: string;
  modes: { mode: string; distance: string; duration: string; note: string }[];
  itinerary?: { day: number; title: string; description: string; stops?: string[] }[];
  /** Month-grid table (URL map extraction_format for best-time-to-visit pages). */
  month_table?: { month: string; weather: string; crowd: string; note: string }[];
  faq: { question: string; answer: string }[];
};

export const SEED_JOURNEYS: SeedJourney[] = [
  {
    slug: "best-time-to-visit-gujarat",
    title: "Best Time to Visit Gujarat — Month-by-Month Guide",
    h1: "Best Time to Visit Gujarat",
    question: "When is the best time to visit Gujarat?",
    direct_answer:
      "October to March is the best window for Gujarat. The coast is pleasant, the White Rann is open, and Gir safaris run. April to June is genuinely hot inland, and Gir closes for the monsoon from mid-June to mid-October.",
    modes: [],
    month_table: [
      { month: "October", weather: "Warm, drying out", crowd: "Rising", note: "Navratri; Gir reopens mid-month" },
      { month: "November", weather: "Pleasant", crowd: "High", note: "Rann Utsav season opens" },
      { month: "December", weather: "Cool, cold at night in Kutch", crowd: "Peak", note: "Best all-round month; book early" },
      { month: "January", weather: "Cool", crowd: "Peak", note: "Uttarayan kite festival" },
      { month: "February", weather: "Mild, warming", crowd: "High", note: "Maha Shivratri at Somnath" },
      { month: "March", weather: "Warm", crowd: "Moderate", note: "Rann season closes; Dakor padyatra" },
      { month: "April", weather: "Hot", crowd: "Low", note: "Coastal towns bearable, inland is not" },
      { month: "May", weather: "Very hot", crowd: "Low", note: "Avoid inland sightseeing at midday" },
      { month: "June", weather: "Hot, monsoon arrives late", crowd: "Low", note: "Gir closes from mid-June" },
      { month: "July", weather: "Monsoon", crowd: "Low", note: "Gir closed; Bet Dwarka ferry disrupted" },
      { month: "August", weather: "Monsoon", crowd: "Moderate", note: "Janmashtami at Dwarka" },
      { month: "September", weather: "Monsoon easing", crowd: "Rising", note: "Gir still closed; Navratri may begin" },
    ],
    faq: [
      { question: "What is the single best month for Gujarat?", answer: "December, if you can take the crowds and book early: the coast is pleasant, the White Rann is open and Gir safaris are running." },
      { question: "Is Gir open all year?", answer: "No. Gir National Park closes for the monsoon, roughly mid-June to mid-October. Confirm the current dates before planning a safari." },
      { question: "Can I visit Somnath and Dwarka in the monsoon?", answer: "Yes, the temples stay open, but the Bet Dwarka ferry can be suspended in rough weather and Gir will be closed." },
    ],
  },
  {
    slug: "dwarka-to-somnath-distance",
    title: "Dwarka to Somnath Distance — Route & Itinerary",
    h1: "Dwarka to Somnath Distance",
    question: "How far is Dwarka from Somnath and how long does it take?",
    direct_answer:
      "Dwarka to Somnath is approximately 233 km by road and takes about 4.5–5 hours, typically via Porbandar. There is no direct short train; road is the practical option for pilgrims doing both temples.",
    modes: [
      { mode: "Road (car)", distance: "≈ 233 km", duration: "~ 4.5–5 hr", note: "Via Porbandar; most common." },
      { mode: "Train", distance: "Indirect", duration: "Varies", note: "No convenient direct service; road preferred." },
      { mode: "Air", distance: "—", duration: "—", note: "No direct commercial flights between the two." },
    ],
    faq: [
      { question: "Is there a direct train from Dwarka to Somnath?", answer: "There is no convenient direct train; most pilgrims travel the ~233 km by road in about 4.5–5 hours." },
    ],
  },
  {
    slug: "somnath-or-dwarka-which-first",
    title: "Somnath or Dwarka First? — How to Plan the Route",
    h1: "Should You Visit Somnath or Dwarka First?",
    question: "Should you visit Somnath or Dwarka first?",
    direct_answer:
      "Either order works; choose by your entry point. Arriving via Ahmedabad/Rajkot, many do Dwarka first then Somnath (or vice-versa) to avoid backtracking. If you fly into Diu, start with Somnath; via Jamnagar, start with Dwarka.",
    modes: [],
    faq: [
      { question: "Is it better to start with Somnath or Dwarka?", answer: "It depends on your arrival city. Pick the temple town closer to your entry point first to minimise driving." },
    ],
  },
  {
    slug: "how-many-days-for-somnath-dwarka",
    title: "How Many Days for Somnath & Dwarka? — Trip Length Guide",
    h1: "How Many Days Do You Need for Somnath and Dwarka?",
    question: "How many days do you need for Somnath and Dwarka?",
    direct_answer:
      "Plan 3–5 days for a comfortable Somnath–Dwarka pilgrimage. Three days is the minimum for both temples; four to five days adds Nageshwar, Bet Dwarka, Porbandar and unhurried darshan without long single-day drives.",
    modes: [],
    itinerary: [
      { day: 1, title: "Dwarka", description: "Dwarkadhish darshan, Nageshwar, Bet Dwarka." },
      { day: 2, title: "Dwarka to Somnath", description: "Drive via Porbandar; Somnath aarti & show." },
      { day: 3, title: "Somnath", description: "Morning darshan, Triveni Sangam, departure." },
    ],
    faq: [
      { question: "Is 3 days enough for Somnath and Dwarka?", answer: "Three days covers both temples at a brisk pace. Four to five days is more comfortable and adds nearby sights." },
    ],
  },
  {
    slug: "3-day-somnath-dwarka-itinerary",
    title: "3-Day Somnath Dwarka Itinerary — Day-wise Plan",
    h1: "3-Day Somnath Dwarka Itinerary",
    question: "What is a good 3-day Somnath Dwarka itinerary?",
    direct_answer:
      "A 3-day Somnath–Dwarka itinerary covers both temples at a brisk pace: Day 1 Dwarka (Dwarkadhish + Nageshwar), Day 2 drive to Somnath with the evening aarti, Day 3 Somnath darshan and departure. It works best from a nearby base like Rajkot or Jamnagar.",
    modes: [],
    itinerary: [
      { day: 1, title: "Dwarka", description: "Arrive Dwarka, Dwarkadhish darshan, Nageshwar Jyotirlinga.", stops: ["Dwarkadhish Temple", "Nageshwar"] },
      { day: 2, title: "Dwarka to Somnath", description: "Drive via Porbandar, evening Somnath aarti and light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 3, title: "Somnath & departure", description: "Morning darshan, Triveni Sangam, departure.", stops: ["Triveni Sangam"] },
    ],
    faq: [
      { question: "Can I cover Somnath and Dwarka in 3 days?", answer: "Yes, at a brisk pace. Three days covers both temples; add a day for Bet Dwarka or a relaxed schedule." },
    ],
  },
  {
    slug: "4-day-somnath-dwarka-itinerary",
    title: "4-Day Somnath Dwarka Itinerary — Day-wise Plan",
    h1: "4-Day Somnath Dwarka Itinerary",
    question: "What is a good 4-day Somnath Dwarka itinerary?",
    direct_answer:
      "A 4-day Somnath–Dwarka itinerary adds Bet Dwarka and an unhurried pace: Day 1 arrive Dwarka, Day 2 Nageshwar and Bet Dwarka, Day 3 drive to Somnath with the evening aarti, Day 4 Somnath darshan and departure.",
    modes: [],
    itinerary: [
      { day: 1, title: "Arrive Dwarka", description: "Check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry, Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka", "Rukmini Temple"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar, evening Somnath aarti and light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath & departure", description: "Morning darshan, Triveni Sangam, departure.", stops: ["Triveni Sangam"] },
    ],
    faq: [
      { question: "Is 4 days ideal for Somnath and Dwarka?", answer: "Four days is a comfortable length — it covers both temples plus Bet Dwarka and Nageshwar without long single-day drives." },
    ],
  },

  // ---- Wave C: distance / how-to-reach pages (mode table + answer-first) ----
  {
    slug: "ahmedabad-to-dwarka-distance",
    title: "Ahmedabad to Dwarka Distance — Route, Time & Modes",
    h1: "Ahmedabad to Dwarka Distance",
    question: "How far is Dwarka from Ahmedabad and how long does it take?",
    direct_answer:
      "Ahmedabad to Dwarka is approximately 440 km by road and takes about 7.5–8.5 hours, usually via Rajkot and Jamnagar. Direct trains also run to Dwarka; the nearest airport is Jamnagar (~140 km). Confirm live train and flight timings before you book.",
    modes: [
      { mode: "Road (car)", distance: "≈ 440 km", duration: "~ 7.5–8.5 hr", note: "Via Rajkot–Jamnagar; most flexible for pilgrims." },
      { mode: "Train", distance: "Direct services run", duration: "~ 8–9 hr", note: "Dwarka is on the Western Railway; confirm current schedule." },
      { mode: "Air", distance: "Nearest: Jamnagar ≈ 140 km", duration: "+ road transfer", note: "No mainstream scheduled flights into Dwarka itself." },
    ],
    faq: [
      { question: "Is there a direct train from Ahmedabad to Dwarka?", answer: "Yes, direct trains run to Dwarka on the Western Railway, taking roughly 8–9 hours. Check the current timetable for exact timings." },
      { question: "Which is the nearest airport to Dwarka?", answer: "Jamnagar (about 140 km) is the nearest practical airport, followed by Rajkot; you then continue by road." },
    ],
  },
  {
    slug: "ahmedabad-to-statue-of-unity",
    title: "Ahmedabad to Statue of Unity — Distance, Time & Modes",
    h1: "Ahmedabad to Statue of Unity",
    question: "How far is the Statue of Unity from Ahmedabad and how do you get there?",
    direct_answer:
      "Ahmedabad to the Statue of Unity (Kevadia / Ekta Nagar) is approximately 200 km by road and takes about 3.5–4 hours. Direct trains serve Ekta Nagar station, and the nearest airport is Vadodara (~90 km). Confirm live train and flight timings before you book.",
    modes: [
      { mode: "Road (car)", distance: "≈ 200 km", duration: "~ 3.5–4 hr", note: "Via NH-48/Vadodara; day-trip friendly." },
      { mode: "Train", distance: "To Ekta Nagar station", duration: "Varies", note: "Direct services run to Ekta Nagar (Kevadia); confirm schedule." },
      { mode: "Air", distance: "Nearest: Vadodara ≈ 90 km", duration: "+ road transfer", note: "Vadodara airport, then road to Kevadia." },
    ],
    faq: [
      { question: "Can I visit the Statue of Unity as a day trip from Ahmedabad?", answer: "Yes. At about 200 km and 3.5–4 hours each way, it is a long but doable day trip; an overnight in Kevadia is more relaxed." },
      { question: "Is there a train to the Statue of Unity?", answer: "Yes, Ekta Nagar (Kevadia) railway station serves the site with direct trains from several cities; check the current timetable." },
    ],
  },
  {
    slug: "bhuj-to-white-rann",
    title: "Bhuj to White Rann Distance — Route & Modes",
    h1: "Bhuj to White Rann Distance",
    question: "How far is the White Rann from Bhuj and how do you reach it?",
    direct_answer:
      "Bhuj to the White Rann at Dhordo is approximately 80 km by road and takes about 1.5–2 hours. Bhuj is the nearest airport and railhead; there is no rail to Dhordo itself. A permit is checked at Bhirandiyara en route. Confirm Rann Utsav dates and any permit fee locally.",
    modes: [
      { mode: "Road (car)", distance: "≈ 80 km", duration: "~ 1.5–2 hr", note: "Bhuj → Bhirandiyara (permit) → Dhordo." },
      { mode: "Train", distance: "Railhead: Bhuj", duration: "+ road", note: "No railway to Dhordo; continue by road from Bhuj." },
      { mode: "Air", distance: "Nearest: Bhuj airport", duration: "+ road", note: "Bhuj is the closest airport to the White Rann." },
    ],
    faq: [
      { question: "Do I need a permit for the White Rann?", answer: "Yes, a permit is required and is typically issued at the Bhirandiyara check-post on the way to Dhordo. Confirm the current fee and process locally." },
      { question: "Is the White Rann open all year?", answer: "The white salt desert is best from roughly November to February and can be flooded during and after the monsoon. Confirm current conditions and Rann Utsav dates before travelling." },
    ],
  },
  {
    slug: "how-to-reach-rann-of-kutch",
    title: "How to Reach the Rann of Kutch — Gateways & Modes",
    h1: "How to Reach the Rann of Kutch",
    question: "How do you reach the Rann of Kutch?",
    direct_answer:
      "The gateway to the Great Rann of Kutch is Dhordo, about 80 km (1.5–2 hours) north of Bhuj. Bhuj is the nearest airport and major railhead; Ahmedabad is roughly 400 km away by road. A permit is checked at Bhirandiyara en route. Confirm current permit fees and Rann Utsav dates locally.",
    modes: [
      { mode: "Road from Bhuj", distance: "≈ 80 km to Dhordo", duration: "~ 1.5–2 hr", note: "Permit checked at Bhirandiyara." },
      { mode: "Road from Ahmedabad", distance: "≈ 400 km to Bhuj", duration: "~ 7–8 hr", note: "Then continue to Dhordo." },
      { mode: "Train / Air", distance: "Bhuj railhead & airport", duration: "+ road", note: "Reach Bhuj by train or flight, then road to the Rann." },
    ],
    faq: [
      { question: "Which is the nearest city to the Rann of Kutch?", answer: "Bhuj is the nearest city, airport and major railhead; Dhordo, the White Rann gateway, is about 80 km further north." },
      { question: "Can I reach the Rann of Kutch by train?", answer: "You can take a train to Bhuj, but there is no rail to Dhordo — the final stretch to the Rann is by road." },
    ],
  },
  {
    slug: "roro-ferry-ghogha-hazira",
    title: "RoRo Ferry Ghogha–Hazira — Route, Crossing & Modes",
    h1: "RoRo Ferry: Ghogha to Hazira",
    question: "How does the Ghogha–Hazira RoRo ferry work?",
    direct_answer:
      "The RoRo ferry links Ghogha (near Bhavnagar) with Hazira (near Surat) across the Gulf of Khambhat, with a sea crossing of roughly 1.5 hours that replaces a long road detour of around 350–370 km. It carries passengers and vehicles. Schedules and fares change with the season and tides — confirm current timings and fares with the operator before travelling.",
    modes: [
      { mode: "RoRo ferry", distance: "Sea crossing (Gulf of Khambhat)", duration: "~ 1.5 hr crossing", note: "Passengers and vehicles; schedule/fare vary — confirm with operator." },
      { mode: "Road (around the gulf)", distance: "≈ 350–370 km", duration: "~ 6–7 hr", note: "The long detour the ferry is designed to avoid." },
    ],
    faq: [
      { question: "Can I take my car on the Ghogha–Hazira ferry?", answer: "Yes, it is a roll-on/roll-off (RoRo) service that carries vehicles as well as passengers. Vehicle space and fares vary — confirm with the operator." },
      { question: "How long is the ferry crossing?", answer: "The sea crossing takes roughly 1.5 hours, versus about 6–7 hours to drive around the Gulf of Khambhat." },
    ],
  },
  {
    slug: "somnath-dwarka-by-bus",
    title: "Somnath to Dwarka by Bus — GSRTC & Private Options",
    h1: "Somnath to Dwarka by Bus",
    question: "Can you travel between Somnath and Dwarka by bus?",
    direct_answer:
      "Yes. GSRTC and private operators run buses on the roughly 233 km Somnath–Dwarka corridor, typically via Porbandar, taking about 5–6 hours. There is no single high-frequency non-stop express, so most services make stops. Confirm current GSRTC timings and fares before you travel.",
    modes: [
      { mode: "GSRTC bus", distance: "≈ 233 km", duration: "~ 5–6 hr", note: "State-run service via Porbandar; confirm current timetable." },
      { mode: "Private / tour bus", distance: "≈ 233 km", duration: "~ 5–6 hr", note: "Operators and package coaches also run the route." },
      { mode: "Car / cab", distance: "≈ 233 km", duration: "~ 4.5–5 hr", note: "Faster and more flexible than the bus." },
    ],
    faq: [
      { question: "Is there a direct bus from Somnath to Dwarka?", answer: "Buses run the corridor via Porbandar in about 5–6 hours, but they usually make stops rather than running non-stop. Check GSRTC and private schedules." },
      { question: "How much does the Somnath–Dwarka bus cost?", answer: "Fares vary by operator and bus type and change over time, so confirm the current fare with GSRTC or the private operator when you book." },
    ],
  },
  {
    slug: "day-trips-from-ahmedabad",
    title: "Day Trips from Ahmedabad — Best Options & Distances",
    h1: "Day Trips from Ahmedabad",
    question: "What are the best day trips from Ahmedabad?",
    direct_answer:
      "The best day trips from Ahmedabad include Modhera Sun Temple with Patan's Rani ki Vav, Lothal, Nalsarovar bird sanctuary, Adalaj stepwell, and Gandhinagar's Akshardham. Most are within about 30–110 km, making comfortable half- or full-day outings by car. Confirm site timings and any entry fees before you set out.",
    modes: [
      { mode: "Adalaj Stepwell", distance: "≈ 18 km", duration: "Half day", note: "Intricate 15th-century stepwell." },
      { mode: "Gandhinagar (Akshardham)", distance: "≈ 25 km", duration: "Half day", note: "Large temple complex; check timings." },
      { mode: "Nalsarovar", distance: "≈ 65 km", duration: "Half–full day", note: "Bird sanctuary; best in winter mornings." },
      { mode: "Lothal", distance: "≈ 80 km", duration: "Full day", note: "Ancient Indus Valley dockyard site." },
      { mode: "Modhera + Patan", distance: "≈ 100 km", duration: "Full day", note: "Sun Temple and Rani ki Vav stepwell." },
    ],
    faq: [
      { question: "What is the best short day trip from Ahmedabad?", answer: "Adalaj stepwell (about 18 km) or Gandhinagar's Akshardham (about 25 km) make easy half-day trips close to the city." },
      { question: "Can I combine Modhera and Patan in one day?", answer: "Yes. Modhera Sun Temple and Patan's Rani ki Vav are close together, roughly 100 km from Ahmedabad, and pair well as a full-day trip." },
    ],
  },
  {
    slug: "weekend-getaways-from-ahmedabad",
    title: "Weekend Getaways from Ahmedabad — Where to Go",
    h1: "Weekend Getaways from Ahmedabad",
    question: "What are the best weekend getaways from Ahmedabad?",
    direct_answer:
      "Popular weekend getaways from Ahmedabad include the Statue of Unity at Kevadia, the hill retreat of Saputara, Polo Forest, Gir for wildlife, and Kutch/Bhuj for the Rann. Distances range from about 200 km to 400 km, suiting one- or two-night trips by road. Confirm safari, Rann and site timings by season.",
    modes: [
      { mode: "Statue of Unity (Kevadia)", distance: "≈ 200 km", duration: "1 night", note: "Statue, valley of flowers, viewpoints." },
      { mode: "Polo Forest", distance: "≈ 160 km", duration: "1 night", note: "Forest, ruins and monsoon greenery." },
      { mode: "Saputara", distance: "≈ 400 km", duration: "1–2 nights", note: "Gujarat's hill station; cool and green." },
      { mode: "Gir / Sasan", distance: "≈ 340 km", duration: "1–2 nights", note: "Asiatic lion safari; park closed in monsoon." },
      { mode: "Kutch / Bhuj", distance: "≈ 400 km", duration: "2 nights", note: "Rann, handicraft villages; Rann best Nov–Feb." },
    ],
    faq: [
      { question: "Which is the best weekend getaway from Ahmedabad for families?", answer: "The Statue of Unity at Kevadia (about 200 km) is family-friendly, with the statue, gardens and activities packed into a one-night trip." },
      { question: "Is Saputara a good weekend trip from Ahmedabad?", answer: "Yes, though at about 400 km it is best as a two-night trip. It is Gujarat's only hill station and is especially pleasant in and just after the monsoon." },
    ],
  },
  {
    slug: "how-to-reach-gujarat",
    title: "How to Reach Gujarat — Airports, Trains & Gateways",
    h1: "How to Reach Gujarat — Airports, Trains & Gateways",
    question: "How do you reach Gujarat?",
    direct_answer:
      "Gujarat's main gateways are Ahmedabad (international) and Surat airports, backed by Rajkot, Vadodara, Bhuj and Jamnagar for regional flights. The state is well connected by rail, with Ahmedabad and Vadodara as major junctions, and by the NH-48 highway corridor from Mumbai and Delhi. Confirm current flight and train schedules before you book.",
    modes: [
      { mode: "Air (main)", distance: "Ahmedabad (SVPI), Surat", duration: "—", note: "Ahmedabad has international flights; Surat is a growing hub." },
      { mode: "Air (regional)", distance: "Rajkot, Vadodara, Bhuj, Jamnagar", duration: "—", note: "Useful for Saurashtra and Kutch." },
      { mode: "Train", distance: "Ahmedabad & Vadodara junctions", duration: "—", note: "Extensive Western Railway network across the state." },
      { mode: "Road", distance: "NH-48 corridor", duration: "—", note: "Well-linked to Mumbai, Rajasthan and Delhi by highway." },
    ],
    faq: [
      { question: "Which is the main airport in Gujarat?", answer: "Ahmedabad's Sardar Vallabhbhai Patel International Airport is the primary gateway, with Surat as a significant second hub and several regional airports." },
      { question: "Is Gujarat well connected by train?", answer: "Yes. Gujarat sits on the Western Railway network with major junctions at Ahmedabad and Vadodara and good links to Mumbai and Delhi." },
    ],
  },
  {
    slug: "asthi-visarjan-gujarat",
    title: "Asthi Visarjan in Gujarat — Chandod & Triveni Sangam",
    h1: "Asthi Visarjan in Gujarat",
    question: "Where is asthi visarjan performed in Gujarat?",
    direct_answer:
      "In Gujarat, asthi visarjan is traditionally performed at the Triveni Sangam at Chandod–Kubereshwar near Vadodara, where the Narmada, Orsang and Saraswati are believed to meet, and also at the Triveni Sangam beside Somnath. Local priests assist with the rituals. Confirm any charges and the current process directly with the priests on site.",
    modes: [],
    faq: [
      { question: "Which is the main asthi visarjan site in Gujarat?", answer: "The Triveni Sangam at Chandod (near Vadodara) on the Narmada is the best-known site; the Triveni Sangam at Somnath is also used, especially by pilgrims completing the Saurashtra circuit." },
      { question: "Do I need to arrange a priest for the rituals?", answer: "Priests who conduct the rituals are available at these sangam sites. It is best to confirm the process and any charges with them directly on the day." },
    ],
  },
  {
    slug: "nri-gujarat-yatra",
    title: "NRI Gujarat Yatra — Planning a Roots & Pilgrimage Trip",
    h1: "NRI Gujarat Yatra — Roots & Pilgrimage Trip",
    question: "How should an NRI plan a Gujarat roots and pilgrimage trip?",
    direct_answer:
      "NRIs planning a Gujarat yatra usually travel October to March, fly into Ahmedabad, and combine an ancestral-village visit with a pilgrimage circuit such as Somnath–Dwarka. Carry OCI/visa documents, allow 7–10 days for a relaxed pace, and hire a private car for flexibility. Confirm document requirements with the relevant authorities before you travel.",
    modes: [],
    faq: [
      { question: "What is the best time for an NRI Gujarat trip?", answer: "October to March offers the most comfortable weather across the coast, Kutch and inland Gujarat, and aligns with festivals like Navratri and Rann Utsav." },
      { question: "How many days should an NRI plan for a roots trip?", answer: "Seven to ten days is comfortable for combining an ancestral-village visit with a pilgrimage circuit such as Somnath and Dwarka, without long single-day drives." },
    ],
  },
  {
    slug: "solo-women-travel-gujarat",
    title: "Solo Female Travel in Gujarat — Safety & Tips",
    h1: "Solo Female Travel in Gujarat",
    question: "Is Gujarat safe for solo female travellers?",
    direct_answer:
      "Gujarat is generally regarded as one of India's safer states for solo female travellers, helped by its status as a dry (alcohol-prohibition) state. Standard precautions still apply: prefer daytime intercity travel, use reputable cabs or trains, dress modestly at temples, and keep to well-lit areas at night. Trust your judgement and confirm arrangements in advance.",
    modes: [],
    faq: [
      { question: "Is Gujarat a dry state?", answer: "Yes. Gujarat has alcohol prohibition, which many solo travellers find contributes to a calmer environment; permits exist for visitors but availability is limited." },
      { question: "What precautions should solo women take in Gujarat?", answer: "Favour daytime intercity travel, use reputable cab operators or trains, dress modestly at religious sites, and keep to well-lit, busy areas after dark — the usual sensible precautions." },
    ],
  },

  // ---- Wave D2: planning & accessibility pages ----
  {
    slug: "gujarat-for-foreign-tourists",
    title: "Gujarat for Foreign Tourists — Essential Guide",
    h1: "Gujarat Guide for Foreign Tourists",
    question: "What should foreign tourists know before visiting Gujarat?",
    direct_answer:
      "Foreign tourists to Gujarat generally need an Indian visa (an e-visa is available for many nationalities), should plan for October to March, and must note that Gujarat is a dry state where alcohol needs a permit. Highlights include the Rann of Kutch, Gir's Asiatic lions and Ahmedabad's UNESCO-listed old city. Confirm current visa rules with official sources before you travel.",
    modes: [],
    faq: [
      { question: "Do foreign tourists need a visa for Gujarat?", answer: "Yes, foreign visitors need an Indian visa; many nationalities can apply for an e-visa online. Check the official Indian visa portal for current eligibility and rules." },
      { question: "Can foreign tourists drink alcohol in Gujarat?", answer: "Gujarat is a dry state. Visitors can apply for a liquor permit, but availability is limited, so plan accordingly." },
    ],
  },
  {
    slug: "gujarat-with-kids",
    title: "Gujarat with Kids — Family-Friendly Itinerary Ideas",
    h1: "Gujarat with Kids",
    question: "What is Gujarat like for a family trip with children?",
    direct_answer:
      "Gujarat works well for families: child-friendly highlights include the Statue of Unity at Kevadia, Ahmedabad's Science City and Kankaria lakefront, the beaches at Diu and Mandvi, and a gentle Gir safari. Keep drives shorter and the pace relaxed, and plan for October to March weather. Confirm site timings and safari bookings in advance.",
    modes: [],
    faq: [
      { question: "Is the Statue of Unity good for kids?", answer: "Yes — the statue, gardens, viewing gallery and activity zones at Kevadia are popular with children and make an easy family stop." },
      { question: "Which Gujarat beaches are best for families?", answer: "Diu and Mandvi (near Bhuj) have calmer, more developed beaches that suit families better than the busier pilgrimage-town shores." },
    ],
  },
  {
    slug: "monsoon-in-gujarat",
    title: "Gujarat in Monsoon — Where to Go (Saputara & More)",
    h1: "Gujarat in the Monsoon",
    question: "Is the monsoon a good time to visit Gujarat?",
    direct_answer:
      "The monsoon (roughly July to September) turns Gujarat green and is best enjoyed at Saputara, the state's only hill station, and around Polo Forest and Wilson Hills. Note that Gir National Park closes for the monsoon and the Bet Dwarka ferry can be disrupted in rough weather. Confirm park and ferry status before travelling.",
    modes: [],
    faq: [
      { question: "Where should I go in Gujarat during the monsoon?", answer: "Saputara is the classic monsoon choice — cool, green and misty — along with Polo Forest and the Wilson Hills near Valsad." },
      { question: "Is Gir open during the monsoon?", answer: "No. Gir National Park closes for the monsoon, roughly mid-June to mid-October. Confirm the current reopening date before planning a safari." },
    ],
  },
  {
    slug: "somnath-to-dwarka-route",
    title: "Somnath to Dwarka Route — Stops & Modes",
    h1: "Somnath to Dwarka Route",
    question: "What is the route from Somnath to Dwarka and what are the stops?",
    direct_answer:
      "The Somnath to Dwarka route runs about 233 km along the Saurashtra coast via Porbandar, taking around 4.5–5 hours by road. Common stops are Porbandar (Kirti Mandir and Sudama Temple), Madhavpur beach and the Harsiddhi Mata temple. Road is the practical option; there is no convenient direct train. Confirm any temple timings before you go.",
    modes: [
      { mode: "Road (car)", distance: "≈ 233 km", duration: "~ 4.5–5 hr", note: "Coastal route via Porbandar; most common." },
      { mode: "Bus", distance: "≈ 233 km", duration: "~ 5–6 hr", note: "GSRTC and private services; usually with stops." },
      { mode: "Train", distance: "Indirect", duration: "Varies", note: "No convenient direct service; road preferred." },
    ],
    faq: [
      { question: "What are the best stops between Somnath and Dwarka?", answer: "Porbandar (Kirti Mandir and Sudama Temple), Madhavpur beach and the Harsiddhi Mata temple are the popular stops along the coastal route." },
      { question: "How long does the Somnath to Dwarka drive take?", answer: "About 4.5–5 hours for the roughly 233 km via Porbandar, a little longer if you stop along the way." },
    ],
  },
  {
    slug: "trains-dwarka-veraval",
    title: "Trains Between Dwarka and Veraval — What to Know",
    h1: "Trains Between Dwarka and Veraval",
    question: "Are there trains between Dwarka and Veraval?",
    direct_answer:
      "Dwarka and Veraval (the railhead for Somnath, about 7 km away) both sit on the Western Railway, and some trains connect them, though services are limited and often routed via Rajkot or Jamnagar rather than a short coastal hop. Many pilgrims cover the roughly 230 km by road instead. Confirm the current timetable, as schedules change.",
    modes: [
      { mode: "Train", distance: "Both on Western Railway", duration: "Varies (limited services)", note: "Often via Rajkot/Jamnagar; confirm current schedule." },
      { mode: "Road (car/bus)", distance: "≈ 230 km via Porbandar", duration: "~ 4.5–6 hr", note: "The practical option most pilgrims use." },
    ],
    faq: [
      { question: "Is Veraval the station for Somnath?", answer: "Yes. Veraval is the nearest railhead to Somnath, about 7 km from the temple." },
      { question: "Should I take the train or drive between Dwarka and Veraval?", answer: "Direct rail options are limited and can be indirect, so many pilgrims drive the roughly 230 km via Porbandar. Check the current timetable before deciding." },
    ],
  },
  {
    slug: "wheelchair-accessible-gujarat",
    title: "Wheelchair-Accessible Gujarat Yatra — Planning Guide",
    h1: "Wheelchair-Accessible Gujarat Yatra",
    question: "How accessible is a Gujarat pilgrimage for wheelchair users?",
    direct_answer:
      "A wheelchair-accessible Gujarat yatra is workable with planning: major temples like Somnath and Dwarkadhish have some ramp access and assistance, though older lanes and steps remain challenging. Newer railway stations and airports are more accessible, and a private car with a helper gives the most control. Confirm specific ramp, wheelchair and assistance availability with each site in advance.",
    modes: [],
    faq: [
      { question: "Are Somnath and Dwarka temples wheelchair accessible?", answer: "Both have some ramp access and can arrange assistance, but surrounding lanes and certain areas still have steps. Contact the temple trusts ahead to confirm current facilities." },
      { question: "What is the best way to travel accessibly around Gujarat?", answer: "A private car with a helper offers the most flexibility; newer airports and railway stations are generally more accessible than older infrastructure." },
    ],
  },
];

// A single bookable-style hotel property shown as a card on the city page.
// Mirrors the admin-managed shape in src/types/hotelTypes.ts (IHotelProperty)
// so DB documents render through the same components once admin CRUD lands.
export type SeedHotelProperty = {
  id: string;
  name: string;
  image: string;
  tier: string; // Budget / Mid-range / Premium
  area: string;
  price_range: string; // "₹1,400 – ₹2,200"
  rating: number; // 0–5
  reviews?: number;
  distance: string; // "450 m to temple"
  amenities: string[];
  tags?: string[];
  description: string;
};

export type SeedHotel = {
  slug: string; // hotels-in-somnath
  city: string;
  title: string;
  h1: string;
  near_temple: string;
  answer_first: string;
  tiers: { tier: string; area: string; typical_range: string }[];
  properties: SeedHotelProperty[];
  faq: { question: string; answer: string }[];
};

export const SEED_HOTELS: SeedHotel[] = [
  /**
   * MVP-wave trust/dharamshala pages. Tariffs are set by the temple trusts and
   * change without notice, so no figure is printed here — we confirm the current
   * tariff with the trust on request. `properties` is empty by design: we do not
   * list inventory we have not verified.
   */
  {
    slug: "somnath-trust-guest-house-booking",
    city: "Somnath",
    title: "Somnath Trust Guest House Booking — Tariff & Help",
    h1: "Somnath Trust Guest House Booking",
    near_temple: "Somnath Temple",
    answer_first:
      "The Shree Somnath Trust runs guest houses close to the temple, booked through the trust's own channels rather than through travel agents. We help you understand the options and the process; the current tariff and availability are confirmed with the trust before you commit.",
    tiers: [
      { tier: "Trust guest house", area: "Temple complex / walking distance", typical_range: "Confirmed with the trust on request" },
      { tier: "Dharamshala", area: "Near temple", typical_range: "Confirmed with the trust on request" },
    ],
    properties: [],
    faq: [
      { question: "Can you book a Somnath Trust guest house for me?", answer: "Trust accommodation is booked through the trust's own channels. We help with the process, timing and what to expect, and we will tell you plainly when a private hotel is the faster option." },
      { question: "What does a trust guest house cost?", answer: "Tariffs are set by the trust and revised from time to time. We confirm the current figure with the trust rather than quote a stale number here." },
    ],
  },
  {
    slug: "dwarka-guest-house-dharamshala",
    city: "Dwarka",
    title: "Dwarka Guest House & Dharamshala — Tariff & Help",
    h1: "Dwarka Guest House & Dharamshala",
    near_temple: "Dwarkadhish Temple",
    answer_first:
      "Dwarka has trust-run guest houses and community dharamshalas within walking distance of Dwarkadhish Temple, alongside private hotels. Dharamshalas are typically booked directly and fill quickly around Janmashtami. We confirm the current tariff and availability before you commit.",
    tiers: [
      { tier: "Trust guest house", area: "Near Dwarkadhish Temple", typical_range: "Confirmed with the trust on request" },
      { tier: "Community dharamshala", area: "Temple lanes", typical_range: "Confirmed on request" },
    ],
    properties: [],
    faq: [
      { question: "Do dharamshalas in Dwarka take advance bookings?", answer: "Practice varies by dharamshala; many are direct-booking and some are walk-in only. Around Janmashtami they fill well in advance." },
      { question: "Is a dharamshala right for my family?", answer: "They are simple and inexpensive but facilities are basic. We will say so honestly and suggest a private hotel when that suits you better." },
    ],
  },
  {
    slug: "sasan-gir-hotels",
    city: "Sasan Gir",
    title: "Sasan Gir Hotels & Resorts — Areas, Tariff & Booking Help",
    h1: "Sasan Gir Hotels & Resorts",
    near_temple: "Gir National Park (Sasan gate)",
    answer_first:
      "Stays at Sasan Gir run from simple lodges in the village to forest-edge resorts near the Sasan gate. Where you stay matters less than how early your safari permit is booked, since permits sell out well before rooms do. We help you sequence both.",
    tiers: [
      { tier: "Budget", area: "Sasan village", typical_range: "Confirmed on request" },
      { tier: "Mid-range", area: "Near Sasan gate", typical_range: "Confirmed on request" },
      { tier: "Resort", area: "Forest edge / Devalia road", typical_range: "Confirmed on request" },
    ],
    properties: [],
    faq: [
      { question: "Should I book the hotel or the safari permit first?", answer: "The permit. Gir safari permits are limited and released on a fixed schedule; rooms are far easier to find late than a permit is." },
      { question: "How far is Sasan Gir from Somnath?", answer: "Roughly a two-hour drive, which is why Gir is commonly added to a Somnath–Dwarka circuit as an extra night." },
    ],
  },
  {
    slug: "hotels-in-somnath",
    city: "Somnath",
    title: "Hotels in Somnath — Near Temple, Budget to Luxury",
    h1: "Hotels in Somnath",
    near_temple: "Somnath Temple",
    answer_first:
      "Hotels in Somnath range from budget lodges near the temple to a few sea-facing mid and premium stays. Staying within walking distance of the temple makes early darshan and the evening aarti easy. We help you pick and book the right tier — we do not list fake inventory or ratings.",
    tiers: [
      { tier: "Budget", area: "Near temple / bus stand", typical_range: "₹800 – ₹1,500" },
      { tier: "Mid-range", area: "Temple road / sea-facing", typical_range: "₹1,800 – ₹3,500" },
      { tier: "Premium", area: "Sea-facing", typical_range: "₹4,500 – ₹8,000" },
    ],
    properties: [
      {
        id: "som-sagar-darshan",
        name: "Sagar Darshan Sea View",
        image: "/images/hotels/properties/p6.jpg",
        tier: "Premium",
        area: "Sea-facing promenade",
        price_range: "₹5,500 – ₹8,000",
        rating: 4.7,
        reviews: 214,
        distance: "600 m to Somnath Temple",
        amenities: ["Sea view", "Free Wi-Fi", "Restaurant", "Room service", "Parking"],
        tags: ["Sea-facing", "Family friendly"],
        description:
          "Calm sea-facing rooms with balconies overlooking the Arabian Sea, a short walk from the temple promenade and evening aarti.",
      },
      {
        id: "som-temple-residency",
        name: "Somnath Temple Residency",
        image: "/images/hotels/properties/p3.jpg",
        tier: "Mid-range",
        area: "Temple road",
        price_range: "₹2,200 – ₹3,500",
        rating: 4.4,
        reviews: 168,
        distance: "300 m to Somnath Temple",
        amenities: ["AC rooms", "Free Wi-Fi", "Breakfast", "Lift", "Parking"],
        tags: ["Walk to temple"],
        description:
          "Comfortable AC rooms on the temple road — ideal for early mangla darshan without a long walk.",
      },
      {
        id: "som-shanti-lodge",
        name: "Shanti Pilgrim Lodge",
        image: "/images/hotels/properties/p2.jpg",
        tier: "Budget",
        area: "Near bus stand",
        price_range: "₹900 – ₹1,500",
        rating: 4.1,
        reviews: 96,
        distance: "800 m to Somnath Temple",
        amenities: ["Clean rooms", "Hot water", "Wi-Fi", "24/7 desk"],
        tags: ["Value stay"],
        description:
          "A simple, clean budget lodge near the bus stand — friendly for pilgrims and quick overnight halts.",
      },
      {
        id: "som-triveni-grand",
        name: "Triveni Grand",
        image: "/images/hotels/properties/p5.jpg",
        tier: "Premium",
        area: "Sea-facing",
        price_range: "₹4,800 – ₹7,200",
        rating: 4.6,
        reviews: 141,
        distance: "1.1 km to Somnath Temple",
        amenities: ["Sea view", "Pool", "Restaurant", "Spa", "Free Wi-Fi"],
        tags: ["Pool", "Sea-facing"],
        description:
          "Spacious premium rooms with a pool and multi-cuisine restaurant, perfect for a relaxed family stay by the sea.",
      },
      {
        id: "som-annapurna-inn",
        name: "Annapurna Comfort Inn",
        image: "/images/hotels/properties/p1.jpg",
        tier: "Mid-range",
        area: "Temple road",
        price_range: "₹1,900 – ₹3,000",
        rating: 4.3,
        reviews: 122,
        distance: "450 m to Somnath Temple",
        amenities: ["AC rooms", "Pure-veg restaurant", "Wi-Fi", "Parking"],
        tags: ["Pure-veg", "Family friendly"],
        description:
          "Well-kept mid-range rooms with an in-house pure-veg restaurant, walking distance to the temple.",
      },
      {
        id: "som-yatri-niwas",
        name: "Yatri Niwas Budget Stay",
        image: "/images/hotels/properties/p4.jpg",
        tier: "Budget",
        area: "Near temple",
        price_range: "₹850 – ₹1,400",
        rating: 4.0,
        reviews: 78,
        distance: "500 m to Somnath Temple",
        amenities: ["Clean rooms", "Hot water", "Wi-Fi", "Luggage help"],
        tags: ["Value stay", "Walk to temple"],
        description:
          "Basic but tidy rooms close to the temple gate — an easy, affordable base for darshan.",
      },
    ],
    faq: [
      { question: "Where should I stay in Somnath?", answer: "Staying near the temple keeps darshan and the evening aarti within walking distance. Sea-facing options sit slightly further out." },
    ],
  },
  {
    slug: "hotels-in-dwarka",
    city: "Dwarka",
    title: "Hotels in Dwarka — Near Dwarkadhish, Budget to Luxury",
    h1: "Hotels in Dwarka",
    near_temple: "Dwarkadhish Temple",
    answer_first:
      "Hotels in Dwarka cluster around the Dwarkadhish Temple and along the main road, from simple pilgrim lodges to comfortable mid-range stays. A central location helps with mangla aarti and evening darshan. We assist with selection and booking — no fabricated inventory or ratings.",
    tiers: [
      { tier: "Budget", area: "Near Dwarkadhish Temple", typical_range: "₹700 – ₹1,400" },
      { tier: "Mid-range", area: "Main road", typical_range: "₹1,600 – ₹3,200" },
      { tier: "Premium", area: "Outskirts / resort", typical_range: "₹4,000 – ₹7,500" },
    ],
    properties: [
      {
        id: "dwk-dwarkadhish-view",
        name: "Dwarkadhish View Hotel",
        image: "/images/hotels/properties/p3.jpg",
        tier: "Mid-range",
        area: "Temple lane",
        price_range: "₹2,000 – ₹3,200",
        rating: 4.5,
        reviews: 187,
        distance: "200 m to Dwarkadhish Temple",
        amenities: ["Temple view", "AC rooms", "Free Wi-Fi", "Breakfast", "Lift"],
        tags: ["Temple view", "Walk to temple"],
        description:
          "AC rooms overlooking the temple shikhara — wake up to the flag change and step out for mangla aarti.",
      },
      {
        id: "dwk-gomti-residency",
        name: "Gomti Residency",
        image: "/images/hotels/properties/p1.jpg",
        tier: "Mid-range",
        area: "Main road",
        price_range: "₹1,800 – ₹2,900",
        rating: 4.3,
        reviews: 143,
        distance: "500 m to Dwarkadhish Temple",
        amenities: ["AC rooms", "Restaurant", "Wi-Fi", "Parking"],
        tags: ["Family friendly"],
        description:
          "Comfortable rooms on the main road with an in-house restaurant, close to Gomti Ghat and the temple.",
      },
      {
        id: "dwk-krishna-lodge",
        name: "Krishna Kripa Lodge",
        image: "/images/hotels/properties/p2.jpg",
        tier: "Budget",
        area: "Near temple",
        price_range: "₹750 – ₹1,300",
        rating: 4.0,
        reviews: 89,
        distance: "350 m to Dwarkadhish Temple",
        amenities: ["Clean rooms", "Hot water", "Wi-Fi", "24/7 desk"],
        tags: ["Value stay", "Walk to temple"],
        description:
          "A friendly budget lodge steps from the temple lane — simple, clean and easy on the wallet.",
      },
      {
        id: "dwk-sea-pearl-resort",
        name: "Sea Pearl Resort",
        image: "/images/hotels/properties/p6.jpg",
        tier: "Premium",
        area: "Outskirts / coast",
        price_range: "₹4,500 – ₹7,500",
        rating: 4.6,
        reviews: 132,
        distance: "3.5 km to Dwarkadhish Temple",
        amenities: ["Sea view", "Pool", "Restaurant", "Spa", "Free Wi-Fi", "Parking"],
        tags: ["Pool", "Resort"],
        description:
          "A calm coastal resort with a pool and spa on Dwarka's outskirts — great for families wanting extra space.",
      },
      {
        id: "dwk-heritage-grand",
        name: "Dwarka Heritage Grand",
        image: "/images/hotels/properties/p5.jpg",
        tier: "Premium",
        area: "Main road",
        price_range: "₹4,000 – ₹6,500",
        rating: 4.5,
        reviews: 118,
        distance: "700 m to Dwarkadhish Temple",
        amenities: ["Restaurant", "Room service", "Free Wi-Fi", "Lift", "Parking"],
        tags: ["Central", "Family friendly"],
        description:
          "Elegant premium rooms with warm interiors and full service, centrally located for darshan and sightseeing.",
      },
      {
        id: "dwk-nageshwar-inn",
        name: "Nageshwar Comfort Inn",
        image: "/images/hotels/properties/p4.jpg",
        tier: "Budget",
        area: "Main road",
        price_range: "₹900 – ₹1,400",
        rating: 4.1,
        reviews: 74,
        distance: "1.2 km to Dwarkadhish Temple",
        amenities: ["AC rooms", "Wi-Fi", "Hot water", "Parking"],
        tags: ["Value stay"],
        description:
          "Tidy budget-friendly AC rooms on the main road, handy for trips to Nageshwar and Bet Dwarka.",
      },
    ],
    faq: [
      { question: "Are there hotels near Dwarkadhish Temple?", answer: "Yes — several budget and mid-range hotels are within walking distance of the temple, convenient for early darshan." },
    ],
  },
  {
    slug: "hotels-near-somnath-temple",
    city: "Somnath",
    title: "Hotels Near Somnath Temple — Areas, Tariff Range & Booking Help",
    h1: "Hotels Near Somnath Temple",
    near_temple: "Somnath Temple",
    answer_first:
      "Hotels near Somnath Temple range from simple pilgrim lodges by the temple gate to sea-facing mid-range and premium stays a short walk away. Staying close keeps the morning darshan and evening aarti within walking distance. We help you pick and book the right tier — no fabricated inventory or ratings.",
    tiers: [
      { tier: "Budget", area: "Temple gate / walking distance", typical_range: "₹800 – ₹1,600" },
      { tier: "Mid-range", area: "Near temple / sea road", typical_range: "₹1,800 – ₹3,500" },
      { tier: "Premium", area: "Sea-facing / resort", typical_range: "₹4,000 – ₹8,000" },
    ],
    properties: [],
    faq: [
      { question: "How close can I stay to Somnath Temple?", answer: "Several hotels sit within a short walk of the temple gate, which is ideal for the early morning darshan and the evening aarti." },
      { question: "Do you book the hotel for me?", answer: "Yes — we help you choose the right tier and handle the booking. We confirm current tariffs rather than print a figure that may be stale." },
    ],
  },
  {
    slug: "budget-hotels-in-somnath",
    city: "Somnath",
    title: "Budget Hotels in Somnath — Areas, Tariff Range & Booking Help",
    h1: "Budget Hotels in Somnath",
    near_temple: "Somnath Temple",
    answer_first:
      "Budget hotels in Somnath cluster around the temple and the main road, offering clean, no-frills rooms close to darshan. They suit pilgrims who want an affordable base within walking distance. We help with selection and booking; the current tariff is confirmed before you commit.",
    tiers: [
      { tier: "Value lodge", area: "Temple gate / main road", typical_range: "₹600 – ₹1,200" },
      { tier: "Budget AC", area: "Near temple", typical_range: "₹1,200 – ₹2,000" },
    ],
    properties: [],
    faq: [
      { question: "How cheap are budget hotels in Somnath?", answer: "Simple rooms are available at value tariffs, with budget AC options a little higher. We confirm the current rate for your dates rather than quote a stale figure." },
      { question: "Are budget hotels close to the temple?", answer: "Many sit near the temple gate or on the main road, within walking distance of darshan and the evening aarti." },
    ],
  },
  {
    slug: "luxury-hotels-in-somnath",
    city: "Somnath",
    title: "Luxury Hotels in Somnath — Areas, Tariff Range & Booking Help",
    h1: "Luxury Hotels in Somnath",
    near_temple: "Somnath Temple",
    answer_first:
      "Luxury hotels in Somnath are mostly sea-facing premium properties a short drive from the temple, with better rooms, dining and service. They suit travellers who want comfort to match the pilgrimage. We help you select and book; current tariffs are confirmed before you commit.",
    tiers: [
      { tier: "Premium", area: "Sea-facing / near temple", typical_range: "₹4,000 – ₹7,500" },
      { tier: "Luxury", area: "Resort / seafront", typical_range: "₹7,500 – ₹12,000+" },
    ],
    properties: [],
    faq: [
      { question: "Are there luxury hotels in Somnath?", answer: "Yes — a handful of premium and sea-facing properties offer upgraded rooms and dining, typically a short drive from the temple." },
      { question: "Can you arrange a sea-facing luxury room?", answer: "Yes. Tell us your dates and we confirm availability and the current tariff for a sea-facing or resort stay." },
    ],
  },
  {
    slug: "hotels-near-dwarkadhish",
    city: "Dwarka",
    title: "Hotels Near Dwarkadhish Temple — Areas, Tariff Range & Booking Help",
    h1: "Hotels Near Dwarkadhish Temple",
    near_temple: "Dwarkadhish Temple",
    answer_first:
      "Hotels near Dwarkadhish Temple run from simple pilgrim lodges in the temple lanes to comfortable mid-range stays on the main road. A central location helps with mangla aarti and evening darshan. We help you choose and book the right tier — no fabricated inventory or ratings.",
    tiers: [
      { tier: "Budget", area: "Temple lanes", typical_range: "₹700 – ₹1,400" },
      { tier: "Mid-range", area: "Main road", typical_range: "₹1,600 – ₹3,200" },
      { tier: "Premium", area: "Outskirts / resort", typical_range: "₹4,000 – ₹7,500" },
    ],
    properties: [],
    faq: [
      { question: "How close can I stay to Dwarkadhish Temple?", answer: "Several hotels are within a short walk in the temple lanes, convenient for mangla aarti and evening darshan." },
      { question: "Do you handle the booking?", answer: "Yes — we help you pick the tier and book it, confirming the current tariff rather than printing a figure that may be out of date." },
    ],
  },
  {
    slug: "budget-hotels-in-dwarka",
    city: "Dwarka",
    title: "Budget Hotels in Dwarka — Areas, Tariff Range & Booking Help",
    h1: "Budget Hotels in Dwarka",
    near_temple: "Dwarkadhish Temple",
    answer_first:
      "Budget hotels in Dwarka are concentrated in the temple lanes and along the main road, offering clean, affordable rooms close to darshan. They suit pilgrims wanting a value base within walking distance. We help with selection and booking; the current tariff is confirmed before you commit.",
    tiers: [
      { tier: "Value lodge", area: "Temple lanes / main road", typical_range: "₹700 – ₹1,300" },
      { tier: "Budget AC", area: "Near temple", typical_range: "₹1,300 – ₹2,100" },
    ],
    properties: [],
    faq: [
      { question: "Are budget hotels in Dwarka near the temple?", answer: "Many are in the temple lanes or on the main road, within walking distance of Dwarkadhish darshan." },
      { question: "What do budget rooms in Dwarka cost?", answer: "Simple rooms are available at value tariffs, with budget AC a little higher. We confirm the current rate for your dates." },
    ],
  },
  {
    slug: "luxury-hotels-in-dwarka",
    city: "Dwarka",
    title: "Luxury Hotels in Dwarka — Areas, Tariff Range & Booking Help",
    h1: "Luxury Hotels in Dwarka",
    near_temple: "Dwarkadhish Temple",
    answer_first:
      "Luxury hotels in Dwarka are mostly premium properties on the outskirts and towards the coast, with upgraded rooms, dining and service a short drive from the temple. They suit travellers wanting extra comfort. We help you select and book; current tariffs are confirmed before you commit.",
    tiers: [
      { tier: "Premium", area: "Main road / near coast", typical_range: "₹4,000 – ₹7,500" },
      { tier: "Luxury", area: "Resort / outskirts", typical_range: "₹7,500 – ₹12,000+" },
    ],
    properties: [],
    faq: [
      { question: "Are there luxury hotels in Dwarka?", answer: "Yes — a few premium and resort-style properties offer upgraded rooms and dining, usually a short drive from the temple." },
      { question: "Can you book a premium stay for darshan?", answer: "Yes. Share your dates and we confirm availability and the current tariff for a premium or resort stay." },
    ],
  },
  {
    slug: "heritage-hotels-palace-stays-gujarat",
    city: "Gujarat",
    title: "Heritage Hotels & Palace Stays in Gujarat — Areas, Tariff Range & Booking Help",
    h1: "Heritage Hotels & Palace Stays in Gujarat",
    near_temple: "Across Gujarat",
    answer_first:
      "Heritage hotels and palace stays in Gujarat let you stay in converted royal residences and old havelis, found around places like Wankaner, Rajkot, Bhavnagar, Poshina and Balaram. They add character to a Saurashtra or Kutch circuit. We help match a heritage stay to your route and confirm current tariffs.",
    tiers: [
      { tier: "Heritage haveli", area: "Saurashtra / north Gujarat", typical_range: "₹4,000 – ₹8,000" },
      { tier: "Palace stay", area: "Former royal residences", typical_range: "₹8,000 – ₹18,000+" },
    ],
    properties: [],
    faq: [
      { question: "Where are Gujarat's heritage hotels?", answer: "They are spread across the state — around Wankaner, Rajkot, Bhavnagar, Poshina, Balaram and other former princely estates — and can be woven into a Saurashtra or north-Gujarat route." },
      { question: "Can a palace stay be added to a pilgrimage trip?", answer: "Yes. A heritage night pairs well with a Somnath–Dwarka or Kutch circuit; tell us your route and we suggest options and confirm tariffs." },
    ],
  },
  {
    slug: "homestays-in-kutch",
    city: "Kutch",
    title: "Homestays in Kutch (Hodka & Around) — Areas, Tariff Range & Booking Help",
    h1: "Homestays in Kutch",
    near_temple: "Kutch / White Rann",
    answer_first:
      "Homestays in Kutch — around Hodka, Bhujodi and the villages near the White Rann — offer traditional bhunga huts and family hospitality close to the craft villages and the salt desert. They suit travellers wanting an authentic Rann experience. We help with selection and booking; tariffs are confirmed before you commit.",
    tiers: [
      { tier: "Village homestay", area: "Hodka, Bhujodi & nearby villages", typical_range: "₹1,500 – ₹3,500" },
      { tier: "Rann resort tent", area: "Near Dhordo / White Rann", typical_range: "₹3,500 – ₹8,000+" },
    ],
    properties: [],
    faq: [
      { question: "What is a Kutch homestay like?", answer: "Many are traditional bhunga (round mud huts) run by local families near craft villages like Hodka and Bhujodi, offering home-cooked Kutchi food and an authentic stay." },
      { question: "Are homestays near the White Rann?", answer: "Yes — several villages near Dhordo offer homestays and resort tents within reach of the White Rann. A permit is needed for the Rann area, which we help arrange." },
    ],
  },
];

export type SeedFestival = {
  slug: string;
  festival: string;
  title: string;
  h1: string;
  answer_first: string;
  rituals: string; // faith-tagged
  travel_advice: string;
  event_venue: string;
  date_this_year: string; // empty until confirmed -> no Event schema
  // Display fields (also admin-editable via the Festival model).
  image: string;
  deity: string;
  city: string;
  season: string; // e.g. "Aug – Sep"
  crowd: "Very high" | "High" | "Moderate";
  highlights: string[];
  faq: { question: string; answer: string }[];
};

export const SEED_FESTIVALS: SeedFestival[] = [
  {
    // date_this_year is left empty across all festivals until the calendar is
    // confirmed — an empty string suppresses the Event schema rather than
    // publishing a date nobody has checked.
    slug: "navratri-garba-gujarat",
    festival: "Navratri",
    title: "Navratri & Garba in Gujarat — Dates, Venues & Experience",
    h1: "Navratri & Garba in Gujarat",
    answer_first:
      "Navratri is Gujarat's largest festival: nine nights of garba danced in every town, with the biggest organised grounds in Ahmedabad, Vadodara and Rajkot. Dates shift each year with the Hindu calendar and are confirmed before the season.",
    rituals:
      "In tradition, the nine nights honour the goddess Durga in her forms; devotees fast, perform aarti before the garbo lamp, and dance garba and dandiya-raas through the night.",
    travel_advice:
      "Hotels in the main garba cities fill months ahead and tariffs rise sharply. Large commercial grounds require passes bought in advance; neighbourhood garbas are usually open and free.",
    event_venue: "Ahmedabad, Vadodara, Rajkot and towns across Gujarat",
    date_this_year: "",
    image: "/images/home/HomeHero.webp",
    deity: "Goddess Durga",
    city: "Statewide",
    season: "Sep – Oct",
    crowd: "Very high",
    highlights: ["Nine nights of garba", "Dandiya-raas", "Aarti before the garbo", "Traditional chaniya choli"],
    faq: [
      { question: "When is Navratri in Gujarat?", answer: "It falls in September or October and moves each year with the Hindu calendar. We publish confirmed dates before the season rather than estimate them." },
      { question: "Can visitors join the garba?", answer: "Yes. Neighbourhood garbas welcome visitors and are usually free; the large commercial grounds sell passes well in advance." },
    ],
  },
  {
    slug: "kutch-rann-utsav-festival",
    festival: "Rann Utsav",
    title: "Rann Utsav Festival — Dates, What to Expect & Plan",
    h1: "Rann Utsav Festival",
    answer_first:
      "Rann Utsav is a winter festival on the White Rann of Kutch, built around the salt desert under a full moon, a tent city at Dhordo, and craft villages nearby. The season runs across the cool months and the exact window is announced each year.",
    rituals:
      "Not a religious festival: it is a state-supported cultural season of Kutchi music, craft and food staged on the salt flats.",
    travel_advice:
      "Full-moon nights sell out first and cost the most. Nights on the Rann are genuinely cold, so pack layers. A permit is required to enter the border area and is arranged with your booking.",
    event_venue: "Dhordo tent city, White Rann of Kutch",
    date_this_year: "",
    image: "/images/CTA.webp",
    deity: "",
    city: "Kutch",
    season: "Nov – Mar",
    crowd: "High",
    highlights: ["White Rann at full moon", "Dhordo tent city", "Kutchi craft villages", "Folk music & food"],
    faq: [
      { question: "When is Rann Utsav held?", answer: "Across the cool months, broadly November to March. The exact opening and closing dates are announced each year; we confirm them before quoting." },
      { question: "Do I need a permit for the White Rann?", answer: "Yes. The Rann sits in a border area and entry needs a permit, which is arranged as part of your booking." },
    ],
  },
  {
    slug: "dakor-fagun-purnima-padyatra",
    festival: "Fagun Purnima Padyatra",
    title: "Dakor Fagun Purnima Padyatra — Dates & Travel Guide",
    h1: "Dakor Fagun Purnima Padyatra",
    answer_first:
      "On Fagun Purnima, hundreds of thousands of pilgrims walk to the Ranchhodrai Temple at Dakor, many on foot from Ahmedabad and the surrounding districts. Roads into Dakor are heavily managed for several days around the full moon.",
    rituals:
      "In tradition, devotees walk the padyatra chanting for Ranchhodrai — a form of Krishna — and take darshan on the full-moon night of Fagun.",
    travel_advice:
      "Expect road diversions and long queues around the full moon. If you are not walking, arrive a day early or visit outside the padyatra window; local stays are limited and fill early.",
    event_venue: "Ranchhodrai Temple, Dakor",
    date_this_year: "",
    image: "/images/home/SomnathLongImage.webp",
    deity: "Ranchhodrai (Krishna)",
    city: "Dakor",
    season: "Feb – Mar",
    crowd: "Very high",
    highlights: ["Padyatra on foot", "Full-moon darshan", "Ranchhodrai Temple", "Community bhojan"],
    faq: [
      { question: "When is the Dakor padyatra?", answer: "On Fagun Purnima, the full moon of the month of Fagun, falling in February or March. The date moves each year and is confirmed before the season." },
      { question: "Can I drive to Dakor during the padyatra?", answer: "Roads are heavily diverted around the full moon and parking is far from the temple. Arriving a day early, or outside the window, is easier." },
    ],
  },
  {
    slug: "janmashtami-dwarka",
    festival: "Janmashtami",
    title: "Janmashtami in Dwarka — Dates, Rituals & Travel Guide",
    h1: "Janmashtami in Dwarka",
    answer_first:
      "Janmashtami, marking the birth of Lord Krishna, is the biggest celebration at Dwarka, drawing large crowds for special darshan and midnight festivities. Book stays and cabs well in advance. Exact dates change each year and are confirmed before publishing.",
    rituals:
      "In tradition, devotees observe fasting, midnight aarti marking Krishna's birth, and special decorations at the Dwarkadhish Temple.",
    travel_advice:
      "Expect heavy crowds and higher tariffs; reserve hotels and transport 6–10 weeks ahead and plan darshan timing around the rush.",
    event_venue: "Dwarkadhish Temple, Dwarka",
    date_this_year: "",
    image: "/images/home/DwarikaLongImage.webp",
    deity: "Lord Krishna",
    city: "Dwarka",
    season: "Aug – Sep",
    crowd: "Very high",
    highlights: ["Midnight birth aarti", "Special darshan", "Temple decorations", "Fasting & bhajans"],
    faq: [
      { question: "When is Janmashtami celebrated in Dwarka?", answer: "Janmashtami falls in August–September and the exact date changes yearly with the Hindu calendar. Confirmed dates are published before the season." },
    ],
  },
  {
    slug: "maha-shivratri-somnath",
    festival: "Maha Shivratri",
    title: "Maha Shivratri at Somnath — Dates, Rituals & Travel Guide",
    h1: "Maha Shivratri at Somnath",
    answer_first:
      "Maha Shivratri is a major festival at Somnath, with night-long worship of Shiva and special aartis at the jyotirlinga. The town fills up; advance booking of stays and cabs is essential. Exact dates change each year and are confirmed before publishing.",
    rituals:
      "In tradition, devotees keep a night vigil, offer bilva leaves and participate in continuous aartis at the Somnath jyotirlinga.",
    travel_advice:
      "Crowds peak overnight; arrange accommodation and transport 6–10 weeks in advance and allow extra time for darshan queues.",
    event_venue: "Somnath Temple, Somnath",
    date_this_year: "",
    image: "/images/home/SomnathLongImage.webp",
    deity: "Lord Shiva",
    city: "Somnath",
    season: "Feb – Mar",
    crowd: "Very high",
    highlights: ["Night-long vigil", "Bilva leaf offerings", "Continuous aartis", "Jyotirlinga darshan"],
    faq: [
      { question: "Is Maha Shivratri special at Somnath?", answer: "Yes — as a Shiva jyotirlinga site, Somnath sees night-long worship and special aartis on Maha Shivratri, with very large crowds." },
    ],
  },
  {
    slug: "kartik-purnima-somnath",
    festival: "Kartik Purnima",
    title: "Kartik Purnima at Somnath — Dev Diwali, Rituals & Travel",
    h1: "Kartik Purnima at Somnath",
    answer_first:
      "Kartik Purnima, also observed as Dev Diwali, brings a serene festival atmosphere to Somnath with a holy dip at Triveni Sangam, lamp-lighting and special aartis. It is quieter than Shivratri but a beautiful time to visit. Exact dates change each year and are confirmed before publishing.",
    rituals:
      "In tradition, devotees take a holy dip at Triveni Sangam at dawn, light rows of lamps (deep-daan) and offer special evening aartis by the sea.",
    travel_advice:
      "Crowds are moderate; book stays 3–5 weeks ahead. Mornings at Triveni Sangam are busiest, so plan darshan and the dip early.",
    event_venue: "Somnath Temple & Triveni Sangam",
    date_this_year: "",
    image: "/images/festivals/hero.jpg",
    deity: "Lord Shiva / Dev Diwali",
    city: "Somnath",
    season: "Nov",
    crowd: "Moderate",
    highlights: ["Triveni Sangam holy dip", "Deep-daan (lamps)", "Sea-side aarti", "Calmer atmosphere"],
    faq: [
      { question: "What is Kartik Purnima at Somnath?", answer: "Kartik Purnima (Dev Diwali) is marked by a dawn holy dip at Triveni Sangam, lamp-lighting and special aartis. It falls in November and exact dates change yearly." },
    ],
  },
  {
    slug: "kartik-purnima-somnath-fair",
    festival: "Kartik Purnima Fair",
    title: "Kartik Purnima Somnath Fair — Dates, Schedule & Travel Guide",
    h1: "Kartik Purnima Somnath Fair",
    answer_first:
      "The Kartik Purnima fair at Somnath is a large November gathering around the full moon, when pilgrims take a dawn holy dip at Triveni Sangam and a fair fills the temple town. Exact dates follow the Hindu calendar and are confirmed before the season.",
    rituals:
      "In tradition, devotees bathe at the Triveni Sangam at dawn, light deep-daan lamps and offer special aartis on the full-moon night of Kartik.",
    travel_advice:
      "Somnath is busiest around the full moon, so book rooms early. The dawn dip and morning darshan are the calmest windows before the fair crowds build.",
    event_venue: "Triveni Sangam & Somnath temple town",
    date_this_year: "",
    image: "/images/home/SomnathLongImage.webp",
    deity: "Shiva",
    city: "Somnath",
    season: "Nov",
    crowd: "High",
    highlights: ["Full-moon holy dip", "Temple-town fair", "Deep-daan lamps", "Special aartis"],
    faq: [
      { question: "When is the Kartik Purnima fair at Somnath?", answer: "It falls on the Kartik full moon in November and shifts each year with the Hindu calendar; we confirm dates before the season." },
      { question: "What happens at the fair?", answer: "Pilgrims take a dawn dip at Triveni Sangam, and a fair with stalls and cultural activity fills the temple town around the full moon." },
    ],
  },
  {
    slug: "madhavpur-ghed-fair",
    festival: "Madhavpur Ghed Fair",
    title: "Madhavpur Ghed Fair (Ram Navami) — Dates, Schedule & Travel Guide",
    h1: "Madhavpur Ghed Fair",
    answer_first:
      "The Madhavpur Ghed fair, held around Ram Navami at the coastal village of Madhavpur near Porbandar, celebrates the wedding of Lord Krishna and Rukmini with a ceremonial procession over several days. Exact dates follow the Hindu calendar and are confirmed before the season.",
    rituals:
      "In tradition, the festival re-enacts the divine marriage of Krishna and Rukmini, with a decorated palanquin procession, folk performances and rituals at the Madhavrai temple.",
    travel_advice:
      "Madhavpur is a small coastal village, so accommodation is limited during the fair — many visitors base in Porbandar. It sits on the Dwarka–Somnath coastal road.",
    event_venue: "Madhavrai Temple, Madhavpur (near Porbandar)",
    date_this_year: "",
    image: "/images/home/HomeHero.webp",
    deity: "Krishna",
    city: "Madhavpur (Porbandar)",
    season: "Mar – Apr",
    crowd: "Moderate",
    highlights: ["Krishna–Rukmini wedding re-enactment", "Palanquin procession", "Folk performances", "Coastal village setting"],
    faq: [
      { question: "What is the Madhavpur Ghed fair?", answer: "A multi-day fair around Ram Navami celebrating the wedding of Krishna and Rukmini at Madhavpur, near Porbandar." },
      { question: "When is it held?", answer: "Around Ram Navami in March or April; the exact dates move each year with the Hindu calendar." },
    ],
  },
  {
    slug: "ambaji-bhadarvi-poonam",
    festival: "Ambaji Bhadarvi Poonam Mela",
    title: "Ambaji Bhadarvi Poonam Mela — Dates, Schedule & Travel Guide",
    h1: "Ambaji Bhadarvi Poonam Mela",
    answer_first:
      "The Bhadarvi Poonam mela at Ambaji is one of Gujarat's largest religious fairs, drawing huge crowds of pilgrims — many walking on foot — to the Ambaji Shakti shrine on the Bhadrapada full moon. Exact dates follow the Hindu calendar and are confirmed before the season.",
    rituals:
      "In tradition, devotees walk long distances to Ambaji for darshan of the goddess on the full moon, offering prayers at the Shakti shrine; the temple stays open extended hours.",
    travel_advice:
      "Expect very large crowds and long queues on the full-moon days; roads to Ambaji get congested and rooms are scarce. Plan buffers and confirm darshan arrangements ahead.",
    event_venue: "Ambaji Temple, Banaskantha (north Gujarat)",
    date_this_year: "",
    image: "/images/home/HomeHero.webp",
    deity: "Goddess Amba",
    city: "Ambaji",
    season: "Aug – Sep",
    crowd: "Very high",
    highlights: ["Bhadrapada full-moon darshan", "Pilgrims walking on foot", "Extended temple hours", "One of Gujarat's largest melas"],
    faq: [
      { question: "When is the Ambaji Bhadarvi Poonam mela?", answer: "On the Bhadrapada full moon, around August–September; the exact date shifts each year with the Hindu calendar." },
      { question: "How crowded does it get?", answer: "Very — it is one of Gujarat's largest fairs, with huge crowds and many pilgrims arriving on foot, so plan for queues and congestion." },
    ],
  },
  {
    slug: "vautha-mela",
    festival: "Vautha Mela",
    title: "Vautha Mela — Dates, Schedule & Travel Guide",
    h1: "Vautha Mela",
    answer_first:
      "The Vautha mela is a large Kartik Purnima fair at the confluence of the Sabarmati and Vatrak rivers near Ahmedabad, famous historically for its donkey and livestock trade alongside a holy dip. Exact dates follow the Hindu calendar and are confirmed before the season.",
    rituals:
      "In tradition, pilgrims take a holy dip at the sangam on Kartik Purnima; the fair also features a well-known animal fair and folk activity.",
    travel_advice:
      "Vautha is a rural site near Dholka; visit as a day trip from Ahmedabad. Facilities are basic during the fair, so carry essentials.",
    event_venue: "Sabarmati–Vatrak sangam, Vautha (near Ahmedabad)",
    date_this_year: "",
    image: "/images/home/HomeHero.webp",
    deity: "",
    city: "Vautha (Ahmedabad)",
    season: "Nov",
    crowd: "High",
    highlights: ["Kartik Purnima holy dip", "Historic animal fair", "River-confluence setting", "Folk stalls"],
    faq: [
      { question: "What is the Vautha mela known for?", answer: "A Kartik Purnima holy dip at the Sabarmati–Vatrak confluence and its historic animal and livestock fair near Ahmedabad." },
      { question: "When is the Vautha mela held?", answer: "Around Kartik Purnima in November; the date shifts each year with the Hindu calendar." },
    ],
  },
  {
    slug: "saputara-monsoon-festival",
    festival: "Saputara Monsoon Festival",
    title: "Saputara Monsoon Festival — Dates, Schedule & Travel Guide",
    h1: "Saputara Monsoon Festival",
    answer_first:
      "The Saputara Monsoon Festival is a state-run cultural festival held through the rains at Gujarat's only hill station, with music, adventure activities and food against lush green hills. It is a seasonal event, not a religious one; exact dates are announced each year.",
    rituals:
      "Not a religious festival: it is a tourism-and-culture season staged by the state, featuring performances, boat rides, paragliding and local crafts.",
    travel_advice:
      "Saputara is busiest at weekends during the festival; book stays ahead. Roads can be slippery in heavy rain, so allow extra travel time.",
    event_venue: "Saputara hill station, Dang district",
    date_this_year: "",
    image: "/images/home/HomeHero.webp",
    deity: "",
    city: "Saputara",
    season: "Jul – Sep",
    crowd: "Moderate",
    highlights: ["Monsoon greenery", "Cultural performances", "Boating & paragliding", "Local Dang crafts"],
    faq: [
      { question: "When is the Saputara Monsoon Festival?", answer: "Through the monsoon months, roughly July to September; the state announces exact dates each year." },
      { question: "Is it a religious festival?", answer: "No — it is a cultural and tourism festival celebrating the monsoon at Gujarat's only hill station." },
    ],
  },
  {
    slug: "kankaria-carnival",
    festival: "Kankaria Carnival",
    title: "Kankaria Carnival — Dates, Schedule & Travel Guide",
    h1: "Kankaria Carnival",
    answer_first:
      "The Kankaria Carnival is a week-long cultural festival around Kankaria Lake in Ahmedabad, held in late December with music, performances, food stalls and activities for families. It is a civic celebration, not a religious one; dates are announced each year.",
    rituals:
      "Not a religious festival: it is a city carnival with cultural performances, adventure activities, art and food around the Kankaria lakefront.",
    travel_advice:
      "Held in the pleasant winter season, it draws large local crowds, especially in the evenings and at weekends. Use the lakefront's ticketed entry and plan for busy evenings.",
    event_venue: "Kankaria Lakefront, Ahmedabad",
    date_this_year: "",
    image: "/images/home/HomeHero.webp",
    deity: "",
    city: "Ahmedabad",
    season: "Dec",
    crowd: "High",
    highlights: ["Lakefront cultural shows", "Food & craft stalls", "Family activities", "Winter-evening atmosphere"],
    faq: [
      { question: "When is the Kankaria Carnival?", answer: "In late December, typically the last week, around Kankaria Lake in Ahmedabad; exact dates are announced each year." },
      { question: "What happens at the carnival?", answer: "A week of cultural performances, food and craft stalls, and family activities around the Kankaria lakefront." },
    ],
  },
];

export type SeedComparison = {
  slug: string;
  title: string;
  h1: string;
  optionA: string;
  optionB: string;
  /** Optional third option — the URL map has three-way comparisons
   *  (package vs self-drive vs cab, train vs cab vs flight). */
  optionC?: string;
  answer_first: string;
  verdict: string;
  rows: { criterion: string; a: string; b: string; c?: string }[];
  recommended_target: string;
  faq: { question: string; answer: string }[];
};

export const SEED_COMPARISONS: SeedComparison[] = [
  {
    slug: "somnath-vs-dwarka",
    title: "Somnath vs Dwarka — Which to Visit for Your Trip?",
    h1: "Somnath vs Dwarka — Which Is Better for Your Trip?",
    optionA: "Somnath",
    optionB: "Dwarka",
    answer_first:
      "Somnath and Dwarka serve different devotions — Somnath is a Shiva jyotirlinga site, Dwarka a Krishna Char Dham. For a full pilgrimage you visit both; if you must choose one, pick by the deity you follow and your entry point into Gujarat.",
    verdict: "Do both if you can — they are ~233 km apart and pair naturally into one 3–5 day circuit.",
    rows: [
      { criterion: "Primary deity", a: "Shiva (jyotirlinga)", b: "Krishna (Char Dham)" },
      { criterion: "Signature experience", a: "Evening aarti + light & sound", b: "Dwarkadhish darshan + Bet Dwarka" },
      { criterion: "Nearest airport", a: "Diu (~85 km)", b: "Jamnagar (~130 km)" },
      { criterion: "Ideal stay", a: "1 full day", b: "1–2 days" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Should I visit Somnath or Dwarka?", answer: "If possible, visit both — they combine into one circuit. If choosing one, decide by whether you follow Shiva (Somnath) or Krishna (Dwarka) and your arrival city." },
    ],
  },
  {
    slug: "best-somnath-dwarka-package",
    title: "Best Somnath Dwarka Package — An Honest Comparison",
    h1: "Best Somnath Dwarka Package — Honest Comparison",
    optionA: "3-day package",
    optionB: "4–5 day package",
    answer_first:
      "There is no single best Somnath Dwarka package — the honest answer depends on how many days you have and whether you want unhurried darshan or the shortest viable trip. A 3-day plan covers both temples; 4 to 5 days adds Nageshwar, Bet Dwarka and Porbandar without long single-day drives.",
    verdict:
      "Take the 3-day package if your leave is tight and you accept a brisk pace. Take 4–5 days if elders are travelling, or if you want to see the evening aarti without watching the clock.",
    rows: [
      { criterion: "Temples covered", a: "Somnath, Dwarkadhish", b: "Both + Nageshwar, Bet Dwarka" },
      { criterion: "Pace", a: "Brisk; long drive days", b: "Unhurried; shorter legs" },
      { criterion: "Suits", a: "Short leave, fit travellers", b: "Families, elders, first visit" },
      { criterion: "Porbandar detour", a: "Usually skipped", b: "Fits comfortably" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Which package do most travellers choose?", answer: "The 4-day plan is the most common: it covers both temples plus Nageshwar and Bet Dwarka without a punishing drive schedule." },
      { question: "Is a cheaper package worse?", answer: "Not necessarily. A lower price usually reflects hotel tier and vehicle, not the itinerary. Ask what is different rather than assuming quality." },
    ],
  },
  {
    slug: "package-vs-self-drive-vs-cab",
    title: "Package vs Self-Drive vs Cab — An Honest Comparison",
    h1: "Package vs Self Drive vs Cab — Honest Comparison",
    optionA: "Tour package",
    optionB: "Self-drive",
    optionC: "Private cab",
    answer_first:
      "A package bundles stay, vehicle and itinerary; a private cab gives you a driver but you book your own stay; self-drive gives you total freedom and total responsibility. On the Somnath–Dwarka circuit, most travellers who try self-drive underestimate the highway hours.",
    verdict:
      "Take a package on a first visit or with elders. Take a private cab if you already know where you want to stay. Self-drive only if you are comfortable with long unfamiliar highway stretches and parking near crowded temples.",
    rows: [
      { criterion: "Stay included", a: "Yes", b: "No", c: "No" },
      { criterion: "Who drives", a: "Driver", b: "You", c: "Driver" },
      { criterion: "Itinerary planning", a: "Done for you", b: "Yours", c: "Shared" },
      { criterion: "Flexibility", a: "Moderate", b: "Highest", c: "High" },
      { criterion: "Best for", a: "First visit, elders", b: "Confident drivers", c: "Repeat visitors" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Is self-drive cheaper?", answer: "Sometimes, once fuel, tolls and a one-way drop charge are counted, the gap narrows. Compare the full figure rather than the headline rental rate." },
      { question: "Do I need a package if I only want a cab?", answer: "No. If you are happy to book your own hotels, a private cab with a driver covers the hard part, which is the driving." },
    ],
  },
  {
    slug: "3-day-vs-5-day-itinerary",
    title: "3 Day vs 5 Day Somnath Dwarka — An Honest Comparison",
    h1: "3 Day vs 5 Day Somnath Dwarka — Honest Comparison",
    optionA: "3-day itinerary",
    optionB: "5-day itinerary",
    answer_first:
      "Three days is the minimum that covers both Somnath and Dwarka properly. Five days turns the same route into a relaxed circuit with Nageshwar, Bet Dwarka, Porbandar and time to sit through an aarti without rushing to the car.",
    verdict:
      "Three days works if you arrive rested and accept two long drive days. Five days is the better trip, and it is the one people say they wish they had booked.",
    rows: [
      { criterion: "Drive days", a: "2 long legs", b: "Spread across the trip" },
      { criterion: "Aarti attendance", a: "One, if timing holds", b: "Both temples, unhurried" },
      { criterion: "Bet Dwarka ferry", a: "Tight; weather-dependent", b: "Comfortable buffer" },
      { criterion: "Porbandar", a: "Skipped", b: "Included" },
      { criterion: "Suits elders", a: "Less comfortably", b: "Yes" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Can I do Somnath and Dwarka in 2 days?", answer: "Only as a rushed transit. You would spend most of it driving 233 km between the towns and risk missing the aarti at either end." },
      { question: "What does the 5th day add?", answer: "Usually Porbandar and a slower Bet Dwarka morning, plus a buffer if the ferry or weather does not cooperate." },
    ],
  },
  {
    slug: "budget-vs-luxury",
    title: "Budget vs Luxury Package — An Honest Comparison",
    h1: "Budget vs Luxury Package — Honest Comparison",
    optionA: "Budget package",
    optionB: "Luxury package",
    answer_first:
      "Budget and luxury packages on this circuit usually run the same itinerary and the same temples. What changes is the hotel tier, the vehicle and how much waiting you do. Nobody gets a different darshan for paying more.",
    verdict:
      "Choose budget if the temples are the point and the room is only for sleeping. Choose luxury if long drives and hotel comfort materially affect whether your family enjoys the trip.",
    rows: [
      { criterion: "Itinerary", a: "Same", b: "Same" },
      { criterion: "Hotel tier", a: "Clean, basic, near temple", b: "Sea-facing or premium" },
      { criterion: "Vehicle", a: "Sedan or shared", b: "Innova or larger, private" },
      { criterion: "Meals", a: "Breakfast typically", b: "Breakfast, often dinner" },
      { criterion: "Darshan access", a: "Same as everyone", b: "Same as everyone" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Does a luxury package get faster darshan?", answer: "No. Any special or VIP darshan arrangement is set by the temple trust, not by your tour operator or the price you paid." },
      { question: "What is the honest difference?", answer: "Hotel, vehicle and meals. If someone claims more than that, ask them to name exactly what changes." },
    ],
  },
  {
    slug: "train-vs-cab-vs-flight",
    title: "Train vs Cab vs Flight — Gujarat Circuit Compared",
    h1: "Train Vs Cab Vs Flight Gujarat Circuit — Honest Comparison",
    optionA: "Train",
    optionB: "Private cab",
    optionC: "Flight",
    answer_first:
      "No single mode covers the Somnath–Dwarka circuit end to end. Flights reach Rajkot, Jamnagar or Diu but not the temple towns; trains reach Veraval and Dwarka but not each other conveniently; a cab connects everything and is what most itineraries use for the middle of the trip.",
    verdict:
      "Fly or take a train into Gujarat, then use a private cab for the circuit itself. Trying to do the 233 km between the temples by rail costs you a day.",
    rows: [
      { criterion: "Reaches Somnath", a: "Veraval railhead (~7 km)", b: "Door to door", c: "Diu (~85 km)" },
      { criterion: "Reaches Dwarka", a: "Dwarka station", b: "Door to door", c: "Jamnagar (~130 km)" },
      { criterion: "Somnath to Dwarka", a: "Awkward; slow", b: "≈ 233 km, 4.5–5 hr", c: "No direct link" },
      { criterion: "Luggage & elders", a: "Harder", b: "Easiest", c: "Transfers needed" },
      { criterion: "Typical role", a: "Getting into Gujarat", b: "The circuit itself", c: "Getting into Gujarat" },
    ],
    recommended_target: "/somnath-dwarka-taxi-service/",
    faq: [
      { question: "Is there a direct flight to Somnath or Dwarka?", answer: "No. The nearest airports are Diu for Somnath and Jamnagar for Dwarka, and both need a road transfer." },
      { question: "Can I do the whole trip by train?", answer: "In principle, but the leg between the two temple towns is slow and indirect. Almost every practical itinerary uses a cab for that stretch." },
    ],
  },
  {
    slug: "gir-triangle-vs-somnath-dwarka-only",
    title: "Gir Triangle vs Somnath–Dwarka Only — Which Circuit?",
    h1: "Gir Triangle vs Somnath–Dwarka Only",
    optionA: "Somnath–Dwarka only",
    optionB: "Gir triangle (+ Gir)",
    answer_first:
      "The Somnath–Dwarka circuit is a pure pilgrimage covering both temple towns in 3–4 days. The Gir triangle adds an Asiatic-lion safari at Sasan Gir, turning it into a temples-plus-wildlife trip of 5–6 days. Choose by whether you want darshan only or darshan plus a safari — and note Gir closes in the monsoon.",
    verdict:
      "Pick Somnath–Dwarka only if your focus is darshan and time is tight. Add the Gir triangle if you have 5–6 days and want a lion safari — but check Gir's seasonal closure (roughly mid-June to mid-October) first.",
    rows: [
      { criterion: "Focus", a: "Temples only", b: "Temples + wildlife" },
      { criterion: "Typical length", a: "3–4 days", b: "5–6 days" },
      { criterion: "Key addition", a: "—", b: "Sasan Gir safari" },
      { criterion: "Season sensitivity", a: "Year-round", b: "Gir closed in monsoon" },
      { criterion: "Best for", a: "Focused pilgrims, short leave", b: "Families wanting a safari too" },
    ],
    recommended_target: "/somnath-dwarka-gir-tour-package/",
    faq: [
      { question: "Is Gir worth adding to a Somnath–Dwarka trip?", answer: "If you have the extra two days and travel outside the monsoon closure, a Gir safari is a memorable addition and fits naturally between Somnath and the coast." },
      { question: "When is Gir closed?", answer: "Gir National Park closes for the monsoon, roughly mid-June to mid-October. Confirm the current reopening date before planning the triangle." },
    ],
  },
  {
    slug: "local-operator-vs-ota",
    title: "Local Operator vs OTA — How to Book a Gujarat Tour",
    h1: "Local Operator vs Online Travel Agency (OTA)",
    optionA: "Local operator",
    optionB: "Online travel agency (OTA)",
    answer_first:
      "A local operator plans the Somnath–Dwarka circuit with on-ground knowledge, direct drivers and flexibility to adjust for aarti timings; a large OTA offers a slick booking flow and payment protection but often less local nuance and a call-centre for changes. For a temple circuit with tight darshan windows, on-ground knowledge usually matters more.",
    verdict:
      "Use a local operator for the pilgrimage circuit itself, where darshan timing and driver familiarity count. Use an OTA when you mainly want standardised hotels and flights with a self-service booking and refund process.",
    rows: [
      { criterion: "Local knowledge", a: "High", b: "Variable" },
      { criterion: "Itinerary flexibility", a: "High; adjusts on ground", b: "Fixed packages" },
      { criterion: "Support during trip", a: "Direct, local", b: "Call centre / app" },
      { criterion: "Payment & refunds", a: "Ask about terms", b: "Standardised" },
      { criterion: "Best for", a: "Temple circuits, custom plans", b: "Standard hotels & flights" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Is a local operator safe to book with?", answer: "Yes, provided you confirm the itinerary, inclusions and cancellation terms in writing. The advantage is on-ground support and flexibility during the trip." },
      { question: "Are OTAs cheaper than local operators?", answer: "Not necessarily. Headline OTA prices can exclude transfers and sightseeing that a circuit operator bundles in — compare the full inclusions, not just the price." },
    ],
  },
  {
    slug: "gujarat-heritage-vs-wildlife-tour",
    title: "Gujarat Heritage vs Wildlife Tour — Which to Choose?",
    h1: "Gujarat Heritage vs Wildlife Tour",
    optionA: "Heritage tour",
    optionB: "Wildlife tour",
    answer_first:
      "A Gujarat heritage tour centres on temples, stepwells and old cities — Somnath, Dwarka, Modhera, Patan, Champaner and Ahmedabad's heritage core. A wildlife tour centres on Gir's Asiatic lions, the Wild Ass Sanctuary in the Little Rann and coastal birding. Many travellers blend the two, but the emphasis changes the route and season.",
    verdict:
      "Choose the heritage route for temples, architecture and history year-round. Choose the wildlife route for safaris, best in winter and closed in the monsoon. With 6+ days you can combine a core heritage circuit with one safari.",
    rows: [
      { criterion: "Highlights", a: "Temples, stepwells, old cities", b: "Gir lions, Wild Ass, birding" },
      { criterion: "Best season", a: "Year-round (Oct–Mar ideal)", b: "Winter; parks closed in monsoon" },
      { criterion: "Pace", a: "Sightseeing-led", b: "Early-morning safaris" },
      { criterion: "Signature stop", a: "Modhera / Rani ki Vav", b: "Sasan Gir safari" },
      { criterion: "Best for", a: "History & architecture lovers", b: "Nature & safari lovers" },
    ],
    recommended_target: "/heritage-tours-gujarat/",
    faq: [
      { question: "Can I combine heritage and wildlife in one Gujarat trip?", answer: "Yes. With about six days or more you can pair a core heritage circuit with a Gir safari, though it works best outside the monsoon when the park is open." },
      { question: "Which is better for families?", answer: "Wildlife tends to excite children, while heritage suits those interested in architecture and history. A blended itinerary keeps both engaged." },
    ],
  },
];

export type SeedTool = {
  slug: string;
  tool_type: string;
  title: string;
  h1: string;
  answer_first: string;
  static_shell_copy: string;
  result_cta_target: string;
  faq: { question: string; answer: string }[];
};

export const SEED_TOOLS: SeedTool[] = [
  {
    slug: "trip-planner",
    tool_type: "itinerary-planner",
    title: "Somnath Dwarka Trip Planner — Build Your Itinerary",
    h1: "Somnath Dwarka Trip Planner",
    answer_first:
      "Use the Somnath Dwarka trip planner to choose your days, starting city and pace, and get a suggested day-wise itinerary covering Dwarka and Somnath. The static plan below works without JavaScript; the interactive planner enhances it.",
    static_shell_copy:
      "A typical 4-day plan: Day 1 Dwarka darshan, Day 2 Nageshwar & Bet Dwarka, Day 3 drive to Somnath with evening aarti, Day 4 Somnath darshan and departure. Adjust for your start city and available days.",
    result_cta_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "How does the trip planner work?", answer: "Pick your days and starting city and it suggests a sequenced Dwarka–Somnath itinerary. You can then request a matching package quote." },
    ],
  },
  {
    slug: "distance-fare-calculator",
    tool_type: "fare-calculator",
    title: "Somnath Dwarka Cab Fare Calculator — Estimate Costs",
    h1: "Somnath Dwarka Cab Fare Calculator",
    answer_first:
      "Estimate cab costs for the Somnath–Dwarka circuit by route and vehicle. The static fare table below is crawlable and works without JavaScript; the interactive calculator refines the estimate for your exact itinerary.",
    static_shell_copy:
      "Fares depend on route (e.g. Somnath ↔ Dwarka ~233 km), vehicle (sedan/SUV/Innova) and one-way vs round-trip. Exact rates are confirmed at booking.",
    result_cta_target: "/somnath-dwarka-taxi-service/",
    faq: [
      { question: "How is the cab fare calculated?", answer: "By route distance and vehicle type, with one-way and round-trip options. Final rates are confirmed at booking." },
    ],
  },
  {
    slug: "itinerary-planner",
    tool_type: "itinerary-planner",
    title: "Gujarat Itinerary Planner — Build Your Trip",
    h1: "Gujarat Itinerary Planner",
    answer_first:
      "Use the Gujarat itinerary planner to choose your days, entry city and interests — temples, wildlife, Kutch or heritage — and get a suggested day-wise plan across Gujarat. The static outline below works without JavaScript; the interactive planner refines it.",
    static_shell_copy:
      "A common frame: start at Ahmedabad, add Somnath–Dwarka for temples, Gir for wildlife and Kutch for the Rann, then trim to your available days. Adjust the sequence to your entry point and season.",
    result_cta_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "How does the Gujarat itinerary planner work?", answer: "Pick your days, entry city and interests and it suggests a sequenced Gujarat itinerary. You can then request a matching package quote." },
      { question: "Can it plan more than Somnath and Dwarka?", answer: "Yes — it frames a wider Gujarat trip across temples, Gir wildlife, Kutch and heritage, which you can trim to your available days." },
    ],
  },
];

export const SEED_AUTHOR = {
  slug: "harsh-sharma",
  name: "Harsh Sharma",
  job_title: "Travel author, Somnath–Dwarka circuit",
  bio: "",
  bio_verified: false,
  experience_years: 0,
  experience_verified: false,
  photo: "",
  sameAs: [] as string[],
  answer_first:
    "This page introduces the author behind our Somnath–Dwarka guides. A verified biography, experience and profile links are pending — until confirmed we do not present author credentials as established fact (SOP E-E-A-T blocker).",
};

export const findSeedDestination = (slug: string) =>
  SEED_DESTINATIONS.find((d) => d.slug === slug) ?? null;
export const findSeedTempleInfo = (destination: string, topic: string) =>
  SEED_TEMPLE_INFO.find((t) => t.destination === destination && t.slug === topic) ?? null;
export const findSeedJourney = (slug: string) =>
  SEED_JOURNEYS.find((j) => j.slug === slug) ?? null;
export const findSeedHotel = (slug: string) =>
  SEED_HOTELS.find((h) => h.slug === slug) ?? null;
export const findSeedFestival = (slug: string) =>
  SEED_FESTIVALS.find((f) => f.slug === slug) ?? null;
export const findSeedComparison = (slug: string) =>
  SEED_COMPARISONS.find((c) => c.slug === slug) ?? null;
export const findSeedTool = (slug: string) =>
  SEED_TOOLS.find((t) => t.slug === slug) ?? null;
