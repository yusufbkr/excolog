import { noOrganizationSlugRoutes } from "@/app/constants";
import { db } from "@excolog/database";
import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

// Memory cache for user memberships
interface CacheEntry {
  data: Array<string>;
  expiresAt: number;
}

const userMembershipsCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000;

const organizationMiddleware: MiddlewareHandler = async (c, next) => {
  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, { message: "Authentication required" });
  }

  if (noOrganizationSlugRoutes.includes(c.req.path)) {
    await next();
    return;
  }

  const organizationSlug = c.req.param("slug");

  if (organizationSlug) {
    // Check if user is super admin from cached profile
    const isSuperAdmin = user.profile?.isSuperAdmin ?? false;

    // Super admin has access to all organizations
    if (isSuperAdmin) {
      await next();
      return;
    }

    // For non-super admin users, check membership cache
    const cacheEntry = userMembershipsCache.get(user.id);
    const now = Date.now();

    let userMemberships: Array<string> | null = null;
    if (cacheEntry && cacheEntry.expiresAt > now) {
      userMemberships = cacheEntry.data;
    }

    if (!userMemberships?.length) {
      userMemberships = await getUserMemberships(user.id);
      userMembershipsCache.set(user.id, {
        data: Array.from(userMemberships),
        expiresAt: now + CACHE_TTL,
      });
    }

    const isMember = userMemberships.includes(organizationSlug);

    if (!isMember) {
      throw new HTTPException(401, {
        message: "Unauthorized access to organization",
      });
    }

    await next();
    return;
  }

  throw new HTTPException(401, { message: "Authentication required" });
};

/**
 * Fetch all organization memberships for a user
 * Note: Super admin check is now done in middleware using cached profile
 */
async function getUserMemberships(userId: string): Promise<Array<string>> {
  const result = await db
    .selectFrom("OrganizationMembership")
    .select(["organizationSlug"])
    .where("userId", "=", userId)
    .execute();

  // Collect all organization slugs
  const organizationSlugs = result
    .map((row) => row.organizationSlug)
    .filter((slug): slug is string => slug !== null);

  return organizationSlugs;
}

export function clearAllMembershipCache(userId: string) {
  userMembershipsCache.delete(userId);
}

// Cleanup expired cache entries
export function cleanupExpiredCache() {
  const now = Date.now();
  for (const [userId, entry] of userMembershipsCache.entries()) {
    if (entry.expiresAt <= now) {
      userMembershipsCache.delete(userId);
    }
  }
}

export default organizationMiddleware;
