import { CachedUser } from "@/cache/user-cache";
import { getSupabaseUser } from "@/supabase/safe-user";
import { createClient } from "@supabase/supabase-js";
import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

declare module "hono" {
  interface ContextVariableMap {
    user: CachedUser;
    organizationSlug?: string;
  }
}

const authMiddleware: MiddlewareHandler = async (c, next) => {
  const user = c.get("user");

  if (user) {
    await next();
    return;
  }

  // Get Authorization header
  const authHeader = c.req.header("authorization");

  if (!authHeader) {
    throw new HTTPException(401, { message: "Authentication required" });
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader
    .trim()
    .replace(/^Bearer\s+/i, "")
    .trim();
  if (!token) {
    throw new HTTPException(401, { message: "Authentication required" });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new HTTPException(500, { message: "Server configuration error" });
    }

    // Create Supabase client with authorization header
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader.trim(),
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Get user with cache optimization, pass token directly
    const { user, error: userError } = await getSupabaseUser(
      supabaseClient,
      token,
    );

    if (userError || !user) {
      throw new HTTPException(401, { message: "Authentication required" });
    }

    c.set("user", user);

    await next();
    return;
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    console.error("[Auth Middleware] Unexpected error:", error);
    throw new HTTPException(401, { message: "Authentication required" });
  }
};

export default authMiddleware;
