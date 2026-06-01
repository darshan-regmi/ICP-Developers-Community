// Lightweight in-memory rate limiter, keyed by IP (or any string).
//
// Lives on the warm serverless instance; cold starts reset the map. This is
// intentional — it's a cheap first line of defence that works alongside
// hCaptcha and Resend's audience dedup. For stronger guarantees swap the
// Map for Vercel KV / Upstash Redis without changing callers.

type Hit = { count: number; resetAt: number };

const HITS = new Map<string, Hit>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const hit = HITS.get(key);

  if (!hit || hit.resetAt < now) {
    HITS.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (hit.count >= MAX_HITS) {
    return {
      ok: false,
      retryAfterSeconds: Math.ceil((hit.resetAt - now) / 1000),
    };
  }

  hit.count += 1;
  return { ok: true };
}
