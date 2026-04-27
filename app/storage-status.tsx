"use client";

import { useEffect, useState } from "react";
import { load, save } from "@/lib/storage";

/**
 * Small client-only indicator that proves the storage helper works
 * end-to-end: on mount, write a probe value, read it back, and show
 * a check mark if the round-trip succeeds.
 */
export default function StorageStatus() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const probeKey = "__storage_probe__";
    save(probeKey, "ok");
    setReady(load<string>(probeKey, "") === "ok");
  }, []);

  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      {ready ? "✓ Storage ready" : "… checking storage"}
    </p>
  );
}
