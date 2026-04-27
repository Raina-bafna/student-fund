"use client";

import { remove } from "@/lib/storage";
import { deals } from "@/lib/deals";

/**
 * "Restart simulation" — clears every vote, every memo, and the
 * revealed-outcomes flag, putting the user back at a clean slate.
 *
 * Wraps `window.confirm()` so a stray click can't wipe their work.
 * After clearing, dispatches `vote-changed` so the tally, outcomes
 * panel, and outcome badges all re-read storage and re-render.
 */
export default function RestartButton() {
  function handleRestart() {
    const ok = window.confirm(
      "Reset all your votes, memos, and revealed outcomes? This can't be undone.",
    );
    if (!ok) return;

    for (const deal of deals) {
      remove(`vote:${deal.id}`);
      remove(`memo:${deal.id}`);
    }
    remove("outcomes:revealed");

    // Same generic "storage changed" event the rest of the app listens to.
    window.dispatchEvent(new Event("vote-changed"));
  }

  return (
    <div className="mt-4 flex items-center justify-end">
      <button
        type="button"
        onClick={handleRestart}
        className="text-xs text-zinc-500 underline-offset-2 hover:text-red-700 hover:underline dark:text-zinc-400 dark:hover:text-red-400"
      >
        Restart simulation
      </button>
    </div>
  );
}
