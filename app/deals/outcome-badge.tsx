"use client";

import { useEffect, useState } from "react";
import { load } from "@/lib/storage";
import { type Deal, outcomeLabel } from "@/lib/deals";

/**
 * Small inline badge that reveals a deal's eventual outcome — but only
 * after the user has clicked "Reveal outcomes" (a flag stored in
 * localStorage at `outcomes:revealed`).
 *
 * Listens for the same `vote-changed` event used elsewhere as a generic
 * "storage might have changed" signal.
 */
export default function OutcomeBadge({ deal }: { deal: Deal }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const recompute = () =>
      setRevealed(load<boolean>("outcomes:revealed", false));
    recompute();
    window.addEventListener("vote-changed", recompute); // shared signal
    window.addEventListener("storage", recompute);
    return () => {
      window.removeEventListener("vote-changed", recompute);
      window.removeEventListener("storage", recompute);
    };
  }, []);

  if (!revealed) return null;

  const tone =
    deal.outcome.status === "exited"
      ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
      : deal.outcome.status === "active"
        ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";

  return (
    <span
      className={
        "rounded-full px-3 py-1 text-xs font-medium " + tone
      }
    >
      {outcomeLabel(deal.outcome)}
    </span>
  );
}
