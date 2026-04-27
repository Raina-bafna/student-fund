"use client";

import { useEffect, useRef, useState } from "react";
import { load, save } from "@/lib/storage";

/**
 * Investment memo: free-form reasoning the user writes about a deal.
 *
 * - Loads any saved memo on mount.
 * - Saves on every keystroke (localStorage writes are cheap, and a memo
 *   is short — no need for debouncing yet).
 * - Shows a small "Saved" indicator that briefly turns green after a save.
 */
export default function DealMemo({ dealId }: { dealId: string }) {
  const storageKey = `memo:${dealId}`;
  const [text, setText] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved memo (if any) once we're on the client.
  useEffect(() => {
    setText(load<string>(storageKey, ""));
  }, [storageKey]);

  // Clear any pending flash timer when the component unmounts so it
  // doesn't fire on a destroyed component.
  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setText(value);
    save(storageKey, value);

    // Show "Saved" for ~1 second.
    setSavedFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setSavedFlash(false), 1000);
  }

  return (
    <div className="mt-8 border-t border-black/[.05] pt-6 dark:border-white/[.08]">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={`memo-${dealId}`}
          className="text-sm font-medium text-black dark:text-zinc-50"
        >
          Investment memo
        </label>
        <span
          className={
            "text-xs transition-opacity " +
            (savedFlash
              ? "text-green-700 opacity-100 dark:text-green-400"
              : "text-zinc-400 opacity-70")
          }
        >
          {savedFlash ? "Saved" : `${text.length} chars`}
        </span>
      </div>
      <textarea
        id={`memo-${dealId}`}
        value={text}
        onChange={handleChange}
        rows={6}
        placeholder="Why should the fund invest? What are the risks? What's your thesis?"
        className="mt-2 w-full rounded-xl border border-black/[.08] bg-white px-4 py-3 text-sm leading-6 text-black placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600"
      />
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Saved locally to this browser. Visible only to you for now.
      </p>
    </div>
  );
}
