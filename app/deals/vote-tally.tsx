"use client";

import { useEffect, useState } from "react";
import { deals } from "@/lib/deals";
import { load } from "@/lib/storage";

type Tally = {
  invest: number; // how many deals you've voted "invest" on
  pass: number;   // how many you've passed on
  total: number;  // how many open deals exist in total
};

/**
 * Walk through every deal, look up its saved vote, and tally the totals.
 * Returns zeroes during server rendering (no localStorage there).
 */
function computeTally(): Tally {
  let invest = 0;
  let pass = 0;
  for (const deal of deals) {
    const vote = load<"invest" | "pass" | null>(`vote:${deal.id}`, null);
    if (vote === "invest") invest++;
    else if (vote === "pass") pass++;
  }
  return { invest, pass, total: deals.length };
}

/**
 * Live-updating banner above the deals list.
 *
 * Listens for a custom "vote-changed" event that VoteButtons fires after
 * each save. Also listens for browser "storage" events so two tabs stay
 * in sync. Both call the same recompute function — simple and reliable.
 */
export default function VoteTally() {
  const [tally, setTally] = useState<Tally>({
    invest: 0,
    pass: 0,
    total: deals.length,
  });

  useEffect(() => {
    // Initial read — happens once after mount, in the browser.
    setTally(computeTally());

    const handler = () => setTally(computeTally());
    window.addEventListener("vote-changed", handler);   // same-tab updates
    window.addEventListener("storage", handler);        // cross-tab updates
    return () => {
      window.removeEventListener("vote-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const voted = tally.invest + tally.pass;

  return (
    <div className="mt-6 rounded-2xl border border-black/[.08] bg-white p-4 text-sm dark:border-white/[.145] dark:bg-zinc-950">
      <p className="font-medium text-black dark:text-zinc-50">
        You&apos;ve voted on {voted} of {tally.total} deals
      </p>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        <span className="text-green-700 dark:text-green-400">
          {tally.invest} invest
        </span>
        {" · "}
        <span className="text-red-700 dark:text-red-400">
          {tally.pass} pass
        </span>
        {voted < tally.total && (
          <span> · {tally.total - voted} not yet voted</span>
        )}
      </p>
    </div>
  );
}
