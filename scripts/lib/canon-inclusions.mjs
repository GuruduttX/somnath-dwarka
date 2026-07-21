/**
 * Canonical inclusions and exclusions, client-supplied. One list for every
 * package in the money silo so the promise never differs page to page.
 *
 * The only permitted variation is the flight-inclusive origins (Bangalore,
 * Hyderabad): those pages sell the return flight inside the price, so the
 * "travel to reach the circuit" exclusion is replaced by the airline's own
 * extras. Applying the standard list there would contradict the page copy and
 * the all-in price matrix, which is a booking dispute waiting to happen.
 */

export const INCLUSIONS = [
  "Hotel at your chosen star tier, on twin sharing",
  "Daily breakfast at the hotel",
  "Private vehicle with driver for the whole itinerary",
  "All road tolls, parking and fuel",
  "The driver’s food and stay",
  "All pickups and drops set out in the itinerary",
  "GST",
];

export const EXCLUSIONS = [
  "Lunch and dinner",
  "Arrival and departure travel, your train, bus or flight tickets to reach the circuit",
  "Personal pooja, seva and abhishek at the temples",
  "The Somnath sound and light show ticket",
  "Entry tickets and permits at any attraction",
  "Camera and cloakroom charges",
  "Tips and personal spending",
  "Anything not listed under inclusions",
];

/** Origin spokes whose price already carries the return airfare. */
export const FLIGHT_INCLUSIVE = new Set(["from-bangalore", "from-hyderabad"]);

const flightInclusions = (city) => [
  `Return flight from ${city}, booked by us`,
  ...INCLUSIONS,
];

const flightExclusions = [
  "Lunch and dinner",
  "In-flight meals, seat selection and excess baggage charged by the airline",
  "Personal pooja, seva and abhishek at the temples",
  "The Somnath sound and light show ticket",
  "Entry tickets and permits at any attraction",
  "Camera and cloakroom charges",
  "Tips and personal spending",
  "Anything not listed under inclusions",
];

/** The right pair for a slug. `city` is only used by the flight variant. */
export function canonFor(slug, city = "your city") {
  return FLIGHT_INCLUSIVE.has(slug)
    ? { inclusions: flightInclusions(city), exclusions: flightExclusions }
    : { inclusions: INCLUSIONS, exclusions: EXCLUSIONS };
}
