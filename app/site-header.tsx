"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Site-wide header with navigation links.
 *
 * Renders on every page via the root layout. Uses `usePathname()` from
 * Next.js to highlight whichever link matches the current URL.
 */
export default function SiteHeader() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/deals", label: "Deals" },
  ];

  return (
    <header className="border-b border-black/[.08] bg-white/80 backdrop-blur dark:border-white/[.145] dark:bg-black/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-black dark:text-zinc-50"
        >
          Student Fund
        </Link>
        <nav className="flex gap-1 text-sm">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-full px-3 py-1.5 transition-colors " +
                  (active
                    ? "bg-zinc-100 font-medium text-black dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
