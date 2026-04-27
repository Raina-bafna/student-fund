"use client";

import { useEffect, useState } from "react";
import { load, save } from "@/lib/storage";
import { deals, formatMoney, outcomeMultiple } from "@/lib/deals";

type Vote = "invest" | "pass" | null;

type Performance = {
  invested: number;     // total dollars you committed (sum of asks for "invest" votes)
  returned: number;     // total dollars those investments returned (ask × multiple)
  missedUpside: number; // dollars you would have made on "pass" votes that exited
};

/**
 * Walk every deal, look up the user's vote, and compute the fund's
 * realized performance assuming the outcomes have happened.
 */
function computePerformance(): Performance {
  let invested = 0;
  let returned = 0;
  let missedUpside = 0;

  for (const deal of deals) {
    const vote = load<Vote>(`vote:${deal.id}`, null);
    const multiple = outcomeMultiple(deal.outcome);

    if (vote === "invest") {
      invested += deal.askAmount;
      returned += deal.askAmount * multiple;
    } else if (vote === "pass" && deal.outcome.status === "exited") {
      // Profit you missed by passing — only count the *gain*, not the principal.
      missedUpside += deal.askAmount * (deal.outcome.multiple - 1);
    }
  }

  return { invested, returned, missedUpside };
}

/**
 * Combined "Reveal outcomes" toggle + performance summary.
 *
 * Until the user reveals, only the toggle button is shown. After reveal,
 * we render the full summary (invested, returned, multiple, missed).
 */
export default function OutcomesPanel() {
  const [revealed, setRevealed] = useState(false);
  const [perf, setPerf] = useState<Performance>({
    invested: 0,
    returned: 0,
    missedUpside: 0,
  });

  useEffect(() => {
    const recompute = () => {
      setRevealed(load<boolean>("outcomes:revealed", false));
      setPerf(computePerformance());
    };
    recompute();
    window.addEventListener("vote-changed", recompute);
    window.addEventListener("storage", recompute);
    return () => {
      window.removeEventListener("vote-changed", recompute);
      window.removeEventListener("storage", recompute);
    };
  }, []);

  function handleToggle() {
    const next = !revealed;
    setRevealed(next);
    save("outcomes:revealed", next);
    // Reuse the same event so OutcomeBadge components also re-render.
    window.dispatchEvent(new Event("vote-changed"));
  }

  const multiple =
    perf.invested > 0 ? perf.returned / perf.invested : 0;

  return (
    <div className="mt-4 rounded-2xl border border-black/[.08] bg-white p-4 dark:border-white/[.145] dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-black dark:text-zinc-50">
            {revealed ? "Outcomes revealed" : "Outcomes hidden"}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {revealed
              ? "Each deal now shows what eventually happened."
              : "Cast all your votes first, then reveal to see how you did."}
          </p>
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className="flex h-9 items-center rounded-full border border-black/[.08] px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-300 dark:hover:bg-white/[.04]"
        >
          {revealed ? "Hide outcomes" : "Reveal outcomes"}
        </button>
      </div>

      {revealed && (
        <div className="mt-5 grid gap-4 border-t border-black/[.05] pt-4 sm:grid-cols-3 dark:border-white/[.08]">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              You invested
            </p>
            <p className="mt-1 text-lg font-semibold text-black dark:text-zinc-50">
              {formatMoney(perf.invested)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Returned
            </p>
            <p className="mt-1 text-lg font-semibold text-black dark:text-zinc-50">
              {formatMoney(perf.returned)}
              <span
                className={
                  "ml-2 text-sm font-medium " +
                  (multiple >= 1
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400")
                }
              >
                ({multiple.toFixed(2)}×)
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Missed upside
            </p>
            <p className="mt-1 text-lg font-semibold text-black dark:text-zinc-50">
              {formatMoney(perf.missedUpside)}
            </p>
            <p className="text-xs text-zinc-500">deals you passed on that exited</p>
          </div>
        </div>
      )}
    </div>
  );
}
