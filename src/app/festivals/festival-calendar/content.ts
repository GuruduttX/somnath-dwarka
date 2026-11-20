import type { PageDef } from "@/src/lib/pages/types";

/*
  /festivals/festival-calendar/: the calendar entries (the site_festival_calendar
  dataset, src/lib/cms-groups/catalog.ts, defaults CALENDAR_EVENTS below) and
  the page's own copy (page id "festival-calendar"). A published Festival CMS
  item with the same slug as an entry overrides its venue, deity, crowd,
  rituals and travel advice, and its date when the date is marked verified.
*/

export type CalendarEvent = {
  slug: string;
  name: string;
  deity: string;
  location: string;
  city: string;
  date2026: string;
  date2027: string;
  tithi: string;
  crowdLevel: string;
  bookingWindow: string;
  rituals: string;
  travelAdvice: string;
  highlights: string[];
  filterMonth: string;
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    slug: "maha-shivratri-somnath",
    name: "Maha Shivratri",
    deity: "Lord Shiva (Somnath Jyotirlinga)",
    location: "Somnath Temple",
    city: "Somnath",
    date2026: "February 15, 2026",
    date2027: "March 6, 2027",
    tithi: "Falgun Krishna Chaturdashi",
    crowdLevel: "Very High",
    bookingWindow: "6-10 weeks prior",
    rituals: "Night-long Shiva worship, Bilva leaf offerings, continuous four-phase aartis (Char Prahar Pooja), and beach-side light-and-sound show.",
    travelAdvice: "Darshan queues inside the temple can stretch up to 4-6 hours. Stays along the Somnath Promenade and Triveni Road are completely booked months in advance. Cab rates increase slightly during this peak period.",
    highlights: ["Maha Prahar Puja", "Trishul Shobha Yatra", "Somnath Temple night lighting"],
    filterMonth: "Feb – Mar",
  },
  {
    slug: "holi-dhuleti-dwarka",
    name: "Holi & Dhuleti (Phool Dol Utsav)",
    deity: "Lord Krishna (Ranchhodrai / Dwarkadhish)",
    location: "Dwarka & Dakor Temples",
    city: "Dwarka",
    date2026: "March 3-4, 2026",
    date2027: "March 22-23, 2027",
    tithi: "Falgun Purnima",
    crowdLevel: "High",
    bookingWindow: "4-6 weeks prior",
    rituals: "Splashing of dry organic gulal colors, special decorated flower swings (Dol), and massive groups of foot pilgrims (padyatris) arriving at Dakor and Dwarka.",
    travelAdvice: "Dakor Ranchhodrai Temple sees unprecedented crowds of 500,000+ devotees. If traveling to Dakor, arrive early morning. In Dwarka, booking a hotel near the temple is recommended as city traffic is restricted.",
    highlights: ["Phool Dol Darshan", "Devotional dance", "Padyatri reception"],
    filterMonth: "Feb – Mar",
  },
  {
    slug: "ram-navami-dwarka",
    name: "Ram Navami",
    deity: "Lord Rama (Krishna Incarnation)",
    location: "Dwarkadhish Temple, Dwarka",
    city: "Dwarka",
    date2026: "March 27, 2026",
    date2027: "April 15, 2027",
    tithi: "Chaitra Shukla Navami",
    crowdLevel: "Moderate",
    bookingWindow: "2-4 weeks prior",
    rituals: "Grand midday celebration at 12:00 PM marking Rama's birth, special customized flag changes (Dhwaja Arohan), and distribution of panchamrit prasad.",
    travelAdvice: "A very auspicious day to visit Dwarkadhish. The midday temple hall becomes heavily packed. Stays are manageable, but booking cabs in advance is advised.",
    highlights: ["Midday birth Aarti", "Special Shringar Darshan", "Bhajans"],
    filterMonth: "Apr – May",
  },
  {
    slug: "hanuman-jayanti-salangpur",
    name: "Hanuman Jayanti",
    deity: "Lord Hanuman (Kashtbhanjan Dev)",
    location: "Salangpur Hanuman Temple",
    city: "Salangpur",
    date2026: "April 2, 2026",
    date2027: "April 21, 2027",
    tithi: "Chaitra Purnima",
    crowdLevel: "Very High",
    bookingWindow: "4-6 weeks prior",
    rituals: "Special tail-oil abhishek, continuous chanting of Hanuman Chalisa, Maruti yagna (sacrificial fire), and grand distribution of Boondi prasad.",
    travelAdvice: "Salangpur Hanuman Temple receives over 200,000 pilgrims on Hanuman Jayanti. Ensure you start from Ahmedabad or Rajkot by 5:00 AM to beat the highway traffic jam.",
    highlights: ["Maruti Yagna", "Continuous Hanuman Chalisa", "Swaminarayan Saints assembly"],
    filterMonth: "Apr – May",
  },
  {
    slug: "shravan-maas-somnath",
    name: "Shravan Maas Mondays",
    deity: "Lord Shiva (Somnath Mahadev)",
    location: "Somnath Temple",
    city: "Somnath",
    date2026: "August 10, 17, 24, 31, 2026",
    date2027: "July 30, Aug 6, 13, 20, 27, 2027",
    tithi: "Holy Month of Shravan",
    crowdLevel: "High",
    bookingWindow: "4-6 weeks prior",
    rituals: "Jal-abhishek (water offerings), special theme shringars (ornamental decoration of the Shivlinga), and chanting of Shiv Tandav Stotra.",
    travelAdvice: "Every Monday of Shravan is highly crowded. VIP Darshan passes are recommended for families with elderly members. Plan to stay overnight Sunday to attend the early morning 6:00 AM darshan.",
    highlights: ["Linga decorations", "Special Monday Aarti", "Somnath Promenade security"],
    filterMonth: "Aug – Sep",
  },
  {
    slug: "janmashtami-dwarka-calendar",
    name: "Krishna Janmashtami",
    deity: "Lord Krishna (Dwarkadhish)",
    location: "Dwarkadhish Temple, Dwarka",
    city: "Dwarka",
    date2026: "September 4, 2026",
    date2027: "September 23, 2027",
    tithi: "Shravan Vad Ashtami",
    crowdLevel: "Very High",
    bookingWindow: "8-12 weeks prior",
    rituals: "Midnight birth celebrations with conch blowing, grand Panchamrit bathing of the deity (Abhishek), and raising the sacred flag (Dhwaja).",
    travelAdvice: "This is the single largest event in Dwarka. Stays near the temple charge premium tariffs. Traffic is completely diverted. Plan to walk 1-2 km to reach the temple steps.",
    highlights: ["Midnight Abhishek", "Dhwaja changes", "Janmashtami Yatra"],
    filterMonth: "Aug – Sep",
  },
  {
    slug: "navratri-mata-no-madh",
    name: "Sharad Navratri (9 Nights)",
    deity: "Ashapura Mata & Chamunda Mata",
    location: "Mata No Madh (Kutch) & Chotila",
    city: "Kutch",
    date2026: "October 12 – 21, 2026",
    date2027: "September 30 – October 9, 2027",
    tithi: "Ashwin Shukla Pratipada to Navami",
    crowdLevel: "Very High",
    bookingWindow: "6-8 weeks prior",
    rituals: "Nine nights of traditional Garba devotion, special Maha Havan on Ashtami night, and offering coconuts and red chunris to the mother goddesses.",
    travelAdvice: "Millions of padyatris walk to Mata No Madh from all across India. Highway traffic around Bhuj-Mata No Madh is packed. Book Kutch taxis weeks in advance.",
    highlights: ["Ashtami Havan", "Garba devotion", "Foot pilgrimage queues"],
    filterMonth: "Oct – Nov",
  },
  {
    slug: "dev-diwali-somnath",
    name: "Dev Diwali & Kartik Purnima",
    deity: "Lord Shiva (Somnath) & Lord Krishna (Dwarka)",
    location: "Somnath Temple & Triveni Sangam",
    city: "Somnath",
    date2026: "November 24, 2026",
    date2027: "November 14, 2027",
    tithi: "Kartik Purnima",
    crowdLevel: "Moderate",
    bookingWindow: "3-5 weeks prior",
    rituals: "Auspicious holy bathing dip at Triveni Sangam during sunrise, lighting thousands of clay lamps (deep-daan), and the Somnath Mahadev Mela.",
    travelAdvice: "A very scenic and peaceful spiritual time. Crowds are moderate. Perfect for families looking for quiet darshan paired with holy baths.",
    highlights: ["Triveni Sangam dip", "Lamps offering (Deep Daan)", "Somnath Mela"],
    filterMonth: "Oct – Nov",
  }
];

export const CALENDAR_PAGE_DEFAULTS = {
  meta: {
    title: "Somnath Dwarka Festival Calendar — 2026 & 2027 Dates & Guide",
    description:
      "Complete month-wise festival calendar for Somnath, Dwarka, Dakor, and Salangpur. Find auspicious tithis, exact dates for Janmashtami & Shivratri, and crowd advisory guides.",
  },
  badge: "Pilgrimage Calendar",
  h1Start: "Gujarat",
  h1Highlight: "Festival Calendar",
  h1End: "2026 & 2027",
  intro:
    "Explore the exact lunar tithis, verified calendar dates, crowd advisory metrics, and local logistics tips to plan your yatra safely.",
  searchPlaceholder: "Search festivals by name, deity, or rituals...",
  clearLabel: "Clear",
  monthLabel: "By Month:",
  cityLabel: "By City:",
  allLabel: "All",
  allCitiesLabel: "All Cities",
  months: ["Feb – Mar", "Apr – May", "Aug – Sep", "Oct – Nov"],
  cities: ["Somnath", "Dwarka", "Salangpur", "Kutch"],
  foundLabel: "Found {count} festivals",
  empty: { title: "No Festivals Match Your Filters", text: "Try adjusting the month, city, or search text." },
  labels: {
    date2026: "2026 Calendar Date",
    date2027: "2027 Calendar Date",
    tithi: "Hindu Lunar Tithi",
    rituals: "Rituals & Celebrations",
    travel: "Logistics & Travel Advice",
    bookingWindow: "Booking window:",
    crowd: "Crowd:",
    planCta: "Plan Trip Around This Festival",
  },
  callout: {
    title: "Booking Stays and Cabs for Peak Festivals?",
    text: "During Janmashtami and Maha Shivratri, tariffs near Dwarkadhish and Somnath increase significantly. We secure direct local inventory for rooms and cabs, keeping tariffs locked and transparent.",
    button: "Submit Festival Query",
  },
  schema: {
    name: "Somnath Dwarka Festival Calendar",
    description: "Month-wise festival calendar for Somnath, Dwarka, Dakor and Salangpur, with dates and crowd advisories.",
  },
};

export type CalendarCopy = typeof CALENDAR_PAGE_DEFAULTS;

export const CALENDAR_PAGE: PageDef<CalendarCopy> = {
  id: "festival-calendar",
  title: "Festival calendar page",
  group: "Festivals",
  path: "/festivals/festival-calendar/",
  notes:
    "The /festivals/festival-calendar/ page copy; the entries are the site_festival_calendar dataset. meta {title, description}; badge; " +
    "h1Start + h1Highlight (coloured) + h1End; intro; searchPlaceholder, clearLabel; monthLabel/cityLabel and months[]/cities[]: the filter " +
    "buttons (a month or city filter matches an entry's filterMonth / city exactly, so keep them in step with the entries); allLabel, " +
    "allCitiesLabel; foundLabel ({count} = the number shown); empty {title, text}: no matches; labels: the field labels on each entry card; " +
    "callout {title, text, button}: the box at the bottom; schema {name, description}: CollectionPage JSON-LD. Plain text.",
  defaults: CALENDAR_PAGE_DEFAULTS,
};
