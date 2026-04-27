"use client";

import { useEffect, useState } from "react";
import { load, save } from "@/lib/storage";

/**
 * A vote on a deal: "invest", "pass", or `null` for no vote yet.
 */
type Vote = "invest" | "pass" | null;

/**
 * Voting buttons for a single deal card.
 *
 * Each deal gets its own localStorage key (`vote:<dealId>`), so votes
 * are tracked independently. No accounts yet — every browser remembers
 * its own votes. Later, when we add user accounts, we'll just swap the
 * storage backend and the UI here won't need to change.
 */
export default function VoteButtons({ dealId }: { dealId: string }) {
  const storageKey = `vote:${dealId}`;

  // Start as `null` so the server-rendered HTML matches what the client
  // shows on the very first paint. We then load the real value below.
  const [vote, setVote] = useState<Vote>(null);

  // After mount, read the saved vote (if any) from localStorage.
  useEffect(() => {
    setVote(load<Vote>(storageKey, null));
  }, [storageKey]);

  function handleVote(choice: "invest" | "pass") {
    // Clicking the same choice again clears the vote (undo).
    const next: Vote = vote === choice ? null : choice;
    setVote(next);
    save(storageKey, next);
  }

  // Tailwind classes pulled out for readability.
  const base =
    "flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors";
  const inactive =
    "border-black/[.08] text-zinc-700 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-white/[.04]";
  const investActive =
    "border-green-600 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-950 dark:text-green-200";
  const passActive =
    "border-red-600 bg-red-50 text-red-800 dark:border-red-500 dark:bg-red-950 dark:text-red-200";

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-black/[.05] pt-4 dark:border-white/[.08]">
      <button
        type="button"
        onClick={() => handleVote("invest")}
        className={`${base} ${vote === "invest" ? investActive : inactive}`}
      >
        👍 Invest
      </button>
      <button
        type="button"
        onClick={() => handleVote("pass")}
        className={`${base} ${vote === "pass" ? passActive : inactive}`}
      >
        👎 Pass
      </button>
      {vote && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Voted: {vote === "invest" ? "Invest" : "Pass"} · click again to undo
        </span>
      )}
    </div>
  );
}
