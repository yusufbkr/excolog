import { CachedUser, getCachedUser, setCachedUser } from "@/cache/user-cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { decodeJwt } from "jose";
import { db } from "@excolog/database";

async function getUserIdFromToken(token: string): Promise<string | null> {
  try {
    // Decode token to get user ID from payload
    // This is fast and doesn't require network calls
    const payload = decodeJwt(token);

    // Extract user ID from payload
    if (!payload?.sub || typeof payload.sub !== "string") {
      return null;
    }

    return payload.sub;
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJwt(token);
    const exp = payload.exp;

    if (!exp || typeof exp !== "number") {
      // If no expiration claim, consider it expired to force refresh
      return true;
    }

    // Check if token is expired or will expire in the next 60 seconds
    // This gives us a buffer to refresh before actual expiration
    const now = Math.floor(Date.now() / 1000);
    return exp <= now + 60;
  } catch (error) {
    console.error("JWT expiration check error:", error);
    // If we can't decode, consider it expired
    return true;
  }
}

async function fetchAndCacheUser(
  supabaseClient: SupabaseClient,
): Promise<{ user: CachedUser | null; error: Error | null }> {
  // Fetch from Supabase
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  if (error || !user?.id) {
    return {
      user: null,
      error: error ? new Error(error.message) : new Error("User not found"),
    };
  }

  // Load profile if enabled
  let profile = null;
  try {
    profile =
      (await db
        .selectFrom("User")
        .selectAll()
        .where("id", "=", user.id)
        .executeTakeFirst()) || null;
  } catch (error) {
    console.warn("Failed to load user profile from database:", error);
  }

  // Cache the user
  const cachedUser = { ...user, profile };
  try {
    await setCachedUser(cachedUser as CachedUser);
  } catch (error) {
    console.error("Error setting cached user:", error);
  }

  return { user: cachedUser as CachedUser, error: null };
}

export async function getSupabaseUser(
  supabaseClient: SupabaseClient,
  token?: string,
): Promise<{ user: CachedUser | null; error: Error | null }> {
  try {
    let accessToken: string | null = token || null;

    if (!accessToken) {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      accessToken = session?.access_token || null;
    }

    if (!accessToken) return { user: null, error: null };

    // Step 1: Check if token is expired
    // If expired, skip cache and fetch from Supabase (which will refresh the token)
    const tokenExpired = isTokenExpired(accessToken);

    if (tokenExpired) {
      // Token is expired, fetch from Supabase to refresh
      return await fetchAndCacheUser(supabaseClient);
    }

    // Step 2: Extract user ID from JWT token (fast, no network call)
    const userId = await getUserIdFromToken(accessToken);

    // Step 3: Check cache first (fast, no network call)
    // Only use cache if token is still valid
    if (userId) {
      try {
        const cachedUser = await getCachedUser(userId);
        if (cachedUser) {
          return { user: cachedUser, error: null };
        }
      } catch (error) {
        console.error("Error getting cached user:", error);
      }
    }

    // Step 4: Cache miss or JWT decode failed - fetch from Supabase (slow, network call)
    return await fetchAndCacheUser(supabaseClient);
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error : new Error("Failed to get user"),
    };
  }
}
