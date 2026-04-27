import Link from "next/link";
import { notFound } from "next/navigation";
import { deals, formatMoney } from "@/lib/deals";
import VoteButtons from "../vote-buttons";
import OutcomeBadge from "../outcome-badge";
import DealMemo from "./memo";

/**
 * Detail page for one startup pitch.
 *
 * The folder name `[id]` is a Next.js dynamic route — visiting
 * `/deals/freshgrocer` runs this page with `id === "freshgrocer"`.
 *
 * In this version of Next.js, `params` is a Promise we have to await.
 */
export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deal = deals.find((d) => d.id === id);

  // If the URL doesn't match any known deal, show the 404 page.
  if (!deal) notFound();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/deals"
          className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back to deals
        </Link>

        <div className="mt-6 rounded-2xl border border-black/[.08] bg-white p-8 shadow-sm dark:border-white/[.145] dark:bg-zinc-950">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
              {deal.name}
            </h1>
            <div className="flex items-center gap-2">
              <OutcomeBadge deal={deal} />
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {deal.sector}
              </span>
            </div>
          </div>

          <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {deal.description}
          </p>

          <dl className="mt-6 flex gap-10 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Asking
              </dt>
              <dd className="mt-1 font-medium text-black dark:text-zinc-50">
                {formatMoney(deal.askAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">
                Valuation
              </dt>
              <dd className="mt-1 font-medium text-black dark:text-zinc-50">
                {formatMoney(deal.valuation)}
              </dd>
            </div>
          </dl>

          <VoteButtons dealId={deal.id} />
          <DealMemo dealId={deal.id} />
        </div>
      </div>
    </main>
  );
}
