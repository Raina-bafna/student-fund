/**
 * Sample startup pitches for the fund simulation.
 *
 * For now this is a hardcoded list — every page that needs deal data
 * just imports `deals` from here. Later we'll replace this with a real
 * database, but the rest of the app won't need to change because the
 * shape (the `Deal` type) stays the same.
 */

/**
 * A startup's eventual outcome. Hidden in the UI until the user clicks
 * "Reveal outcomes" — that's the educational point of the simulation.
 *
 * - `exited`: company sold or IPO'd; investors got `multiple`× their money back
 * - `active`: still operating; no realized return yet (treated as 1× for scoring)
 * - `failed`: shut down; investors lost their stake (0× return)
 */
export type Outcome =
  | { status: "exited"; multiple: number }
  | { status: "active" }
  | { status: "failed" };

export type Deal = {
  id: string;          // unique key, used for URLs and React lists
  name: string;        // startup name
  sector: string;      // industry category
  askAmount: number;   // how much they're raising, in dollars
  valuation: number;   // company's pre-money valuation, in dollars
  description: string; // one-sentence pitch
  outcome: Outcome;    // what eventually happened (used for performance scoring)
};

export const deals: Deal[] = [
  {
    id: "freshgrocer",
    name: "FreshGrocer",
    sector: "Consumer / Grocery",
    askAmount: 500_000,
    valuation: 5_000_000,
    description:
      "Direct-to-door fresh produce subscription, sourced from local farms within 24 hours of harvest.",
    outcome: { status: "failed" }, // unit economics never worked
  },
  {
    id: "classpass-ai",
    name: "ClassPass.ai",
    sector: "EdTech",
    askAmount: 1_200_000,
    valuation: 12_000_000,
    description:
      "AI tutor that adapts to each college student's learning style and gives instant, personalized practice problems.",
    outcome: { status: "exited", multiple: 5 }, // acquired by a big EdTech player
  },
  {
    id: "rentready",
    name: "RentReady",
    sector: "PropTech",
    askAmount: 800_000,
    valuation: 6_500_000,
    description:
      "All-in-one rental management for small landlords: tenant screening, rent collection, and maintenance tickets.",
    outcome: { status: "active" }, // boring but profitable
  },
  {
    id: "carbonledger",
    name: "CarbonLedger",
    sector: "ClimateTech",
    askAmount: 2_000_000,
    valuation: 15_000_000,
    description:
      "Carbon accounting software that helps small and mid-sized businesses report emissions for new EU and SEC rules.",
    outcome: { status: "exited", multiple: 3 }, // rode the regulation tailwind
  },
  {
    id: "pulsemed",
    name: "PulseMed",
    sector: "HealthTech",
    askAmount: 1_500_000,
    valuation: 10_000_000,
    description:
      "Wearable sensor and app that helps chronic pain patients track flare-ups and share data with their doctors.",
    outcome: { status: "failed" }, // FDA hurdles took too long
  },
];

/**
 * Format a dollar amount in a human-friendly way.
 * 500_000  → "$500K"
 * 5_000_000 → "$5.0M"
 */
export function formatMoney(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)}K`;
  return `$${amount}`;
}

/**
 * What multiple does an outcome pay back?
 * exited → its `multiple`, active → 1× (capital preserved), failed → 0×.
 */
export function outcomeMultiple(outcome: Outcome): number {
  if (outcome.status === "exited") return outcome.multiple;
  if (outcome.status === "active") return 1;
  return 0;
}

/**
 * Short human label for an outcome, used in badges.
 */
export function outcomeLabel(outcome: Outcome): string {
  if (outcome.status === "exited") return `Exited · ${outcome.multiple}×`;
  if (outcome.status === "active") return "Still active";
  return "Failed";
}
