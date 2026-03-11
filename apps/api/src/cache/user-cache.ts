import type { User as DBUser } from "@excolog/database";
import type { User } from "@supabase/supabase-js";
import { sanitizeUserId } from "./utils";

export type CachedUser = User & {
  profile: DBUser | null;
};

const CACHE_TTL = Number.parseInt(process.env.USER_CACHE_TTL || "600") * 1000; // Default 10 minutes (600 seconds)
const USER_CACHE_PREFIX = "user-cache";

const userMemoryCache = new Map<
  string,
  { user: CachedUser; expires: number }
>();

/**
 * Get cache key for user (User)
 */
function getUserCacheKey(userId: string): string {
  return `${USER_CACHE_PREFIX}:${sanitizeUserId(userId)}`;
}

/**
 * Get cached User by ID
 */
export async function getCachedUser(
  userId: string,
): Promise<CachedUser | null> {
  const cacheKey = getUserCacheKey(userId);
  const memoryCache = userMemoryCache.get(cacheKey);

  if (!memoryCache) {
    return null;
  }

  if (memoryCache.expires <= Date.now()) {
    userMemoryCache.delete(cacheKey);
    return null;
  }

  return memoryCache.user;
}

/**
 * Set cached Supabase User by ID
 */
export async function setCachedUser(user: CachedUser): Promise<void> {
  if (!user.id) {
    return;
  }

  const cacheKey = getUserCacheKey(user.id);

  userMemoryCache.set(cacheKey, {
    user,
    expires: Date.now() + CACHE_TTL,
  });
}

/**
 * Clear user cache by ID
 */
export async function clearUserCache(userId: string): Promise<void> {
  if (!userId) {
    return;
  }

  const userKey = getUserCacheKey(userId);
  userMemoryCache.delete(userKey);
}
