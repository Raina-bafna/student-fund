/**
 * Sample startup pitches for the fund simulation.
 *
 * For now this is a hardcoded list — every page that needs deal data
 * just imports `deals` from here. Later we'll replace this with a real
 * database, but the rest of the app won't need to change because the
 * shape (the `Deal` type) stays the same.
 */

export type Deal = {
  id: string;          // unique key, used for URLs and React lists
  name: string;        // startup name
  sector: string;      // industry category
  askAmount: number;   // how much they're raising, in dollars
  valuation: number;   // company's pre-money valuation, in dollars
  description: string; // one-sentence pitch
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
  },
  {
    id: "classpass-ai",
    name: "ClassPass.ai",
    sector: "EdTech",
    askAmount: 1_200_000,
    valuation: 12_000_000,
    description:
      "AI tutor that adapts to each college student's learning style and gives instant, personalized practice problems.",
  },
  {
    id: "rentready",
    name: "RentReady",
    sector: "PropTech",
    askAmount: 800_000,
    valuation: 6_500_000,
    description:
      "All-in-one rental management for small landlords: tenant screening, rent collection, and maintenance tickets.",
  },
  {
    id: "carbonledger",
    name: "CarbonLedger",
    sector: "ClimateTech",
    askAmount: 2_000_000,
    valuation: 15_000_000,
    description:
      "Carbon accounting software that helps small and mid-sized businesses report emissions for new EU and SEC rules.",
  },
  {
    id: "pulsemed",
    name: "PulseMed",
    sector: "HealthTech",
    askAmount: 1_500_000,
    valuation: 10_000_000,
    description:
      "Wearable sensor and app that helps chronic pain patients track flare-ups and share data with their doctors.",
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
