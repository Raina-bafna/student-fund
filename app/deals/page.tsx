import Link from "next/link";
import { deals, formatMoney } from "@/lib/deals";
import VoteButtons from "./vote-buttons";
import VoteTally from "./vote-tally";
import OutcomesPanel from "./outcomes-panel";
import OutcomeBadge from "./outcome-badge";
import RestartButton from "./restart-button";

/**
 * The "Deals" page — lists every startup pitch open for review.
 *
 * This is a Server Component (the default in the App Router): it runs
 * on the server, generates HTML, and ships zero JavaScript for itself.
 * Fast and simple.
 */
export default function DealsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Open Deals
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Review the startup pitches below and cast your vote on each.
        </p>

        <VoteTally />
        <OutcomesPanel />

        <ul className="mt-10 grid gap-6">
          {deals.map((deal) => (
            <li
              key={deal.id}
              className="rounded-2xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-zinc-950"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                  <Link
                    href={`/deals/${deal.id}`}
                    className="hover:underline"
                  >
                    {deal.name}
                  </Link>
                </h2>
                <div className="flex items-center gap-2">
                  <OutcomeBadge deal={deal} />
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {deal.sector}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {deal.description}
              </p>

              <dl className="mt-5 flex gap-8 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">
                    Asking
                  </dt>
                  <dd className="font-medium text-black dark:text-zinc-50">
                    {formatMoney(deal.askAmount)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-zinc-500">
                    Valuation
                  </dt>
                  <dd className="font-medium text-black dark:text-zinc-50">
                    {formatMoney(deal.valuation)}
                  </dd>
                </div>
              </dl>

              <VoteButtons dealId={deal.id} />
            </li>
          ))}
        </ul>

        <RestartButton />
      </div>
    </main>
  );
}
