import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  // Get request-specific cache key based on cookies
  const cookieStore = await cookies();

  // Create new client for this request
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Only attempt to set cookies if we're in a context where it's allowed
          // This prevents errors when called from server components
          try {
            // Check if we can access the cookie store without errors
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            // Silently ignore cookie setting errors in server components
            // Cookies will be handled by the client-side auth flow
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "Cookies cannot be set in this context:",
                (error as Error)?.message,
              );
            }
          }
        },
      },
    },
  );
}
