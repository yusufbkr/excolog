import { sanitizeIp, sanitizeKey } from "@/cache/utils";
import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyGenerator?: (c: {
    get: (k: string) => unknown;
    req: { param: (name: string) => string };
  }) => string;
  keyPrefix?: string; // Prefix for cache key when using keyGenerator
  message?: string;
}

interface RateLimitEntry {
  count: number;
  expiresAt: number;
}

// In-memory cache for rate limiting
const rateLimitCache = new Map<string, RateLimitEntry>();

// Cleanup expired entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let cleanupTimer: NodeJS.Timeout | null = null;

function startCleanupTimer() {
  if (cleanupTimer) {
    return;
  }

  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitCache.entries()) {
      if (entry.expiresAt <= now) {
        rateLimitCache.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
}

// Start cleanup timer on module load
if (typeof globalThis !== "undefined") {
  startCleanupTimer();
}

export function createRateLimit(config: RateLimitConfig): MiddlewareHandler {
  return async (c, next) => {
    // Skip rate limiting in development for better performance
    if (process.env.NODE_ENV === "development") {
      await next();
      return;
    }

    // Check if user is super admin - skip rate limiting for super admins
    try {
      const user = c.get("user");
      if (user?.profile?.isSuperAdmin) {
        await next();
        return;
      }
    } catch {
      // User not in context yet, continue with rate limiting
    }

    const rawKey = config.keyGenerator
      ? config.keyGenerator(c)
      : c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
        c.req.header("x-real-ip") ||
        "unknown";

    const prefix = config.keyGenerator
      ? (config.keyPrefix ?? "rate-limit:")
      : "rate-limit:";
    const key =
      prefix +
      (config.keyGenerator
        ? sanitizeKey(rawKey, 200)
        : sanitizeIp(rawKey, 100));

    const now = Date.now();
    const windowMs = config.windowMs;

    try {
      // Get existing rate limit entry
      let entry = rateLimitCache.get(key);

      // If entry expired or doesn't exist, create new one
      if (!entry || entry.expiresAt <= now) {
        // Delete expired entry if exists
        if (entry) {
          rateLimitCache.delete(key);
        }
        // Create new entry starting at 0, will be incremented to 1 below
        entry = {
          count: 0,
          expiresAt: now + windowMs,
        };
      }

      // Increment count
      entry.count += 1;
      rateLimitCache.set(key, entry);

      const resetAt = entry.expiresAt;

      // Check if limit exceeded
      if (entry.count > config.maxRequests) {
        const retryAfter = Math.ceil((entry.expiresAt - now) / 1000);

        c.header("Retry-After", Math.max(1, retryAfter).toString());

        throw new HTTPException(429, {
          message:
            config.message?.replace(
              "{retryAfter}",
              Math.max(1, retryAfter).toString(),
            ) || "Too many requests.",
        });
      }

      // Add rate limit headers
      c.header("X-RateLimit-Limit", config.maxRequests.toString());
      c.header(
        "X-RateLimit-Remaining",
        Math.max(0, config.maxRequests - entry.count).toString(),
      );
      c.header("X-RateLimit-Reset", new Date(resetAt).toISOString());
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }
      console.error("Rate limit error (continuing without rate limit):", error);
    }

    await next();
  };
}

// Predefined rate limiters
export const rateLimit = {
  // 2000 requests per minute
  standard: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 2000,
    message: "Too many requests, please try again later",
  }),

  // Custom rate limiter
  custom: (windowMs: number, maxRequests: number, message?: string) =>
    createRateLimit({ windowMs, maxRequests, message }),
};

// Clear specific IP
export async function clearRateLimit(ip: string) {
  const key = `rate-limit:${sanitizeIp(ip, 100)}`;

  try {
    rateLimitCache.delete(key);
  } catch (error) {
    console.error("Rate limit clear error:", error);
  }
}
