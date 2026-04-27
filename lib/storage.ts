/**
 * Tiny browser localStorage helper.
 *
 * - `save(key, value)` writes any JSON-serializable value under `key`.
 * - `load(key, defaultValue)` reads and parses, or returns the default
 *   if the key isn't there or the data is corrupt.
 *
 * Both functions are safe to call from code that might run on the server
 * (e.g. during Next.js prerendering) — they silently no-op there because
 * `window` doesn't exist.
 */

export function save(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage can throw — quota exceeded, private browsing, disabled
    // by the user, etc. Fail quietly so the app keeps working.
  }
}

export function load<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}
