import { db } from "@excolog/database";
import type { MiddlewareHandler } from "hono";

const allowedOrigins = (
  process.env.ALLOWED_PUBLIC_ORIGINS ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "http://localhost:3000"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true;
  return allowedOrigins.some(
    (allowed) =>
      allowed === origin || origin.startsWith(allowed.replace(/\/$/, "")),
  );
}

const publicCorsMiddleware: MiddlewareHandler = async (c, next) => {
  const origin = c.req.header("Origin");
  const method = c.req.method;
  const slug = c.req.param("slug");
  const path = c.req.path;

  // Allow same-app frontend (Origin in allowed list) or direct access (no Origin)
  if (origin && !isOriginAllowed(origin)) {
    return c.json({ error: "CORS: External requests not allowed" }, 403);
  }

  if (origin && isOriginAllowed(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Credentials", "true");
    c.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (method === "OPTIONS") {
    return c.json({}, 200);
  }

  // For public project routes, ensure slug is present (except panel and participant routes)
  if (
    path.includes("/p/") &&
    !path.includes("/p/panel/") &&
    !path.includes("/p/participant/") &&
    !slug
  ) {
    return c.json({ error: "CORS: Origin and slug required" }, 403);
  }

  // If slug is present for public project route, ensure organization exists (panel and participant routes skip this)
  if (
    path.includes("/p/") &&
    slug &&
    !path.includes("/p/panel/") &&
    !path.includes("/p/participant/")
  ) {
    try {
      const organization = await db
        .selectFrom("Organization")
        .select("id")
        .where("slug", "=", slug)
        .executeTakeFirst();

      if (!organization) {
        return c.json({ error: "Public project not found" }, 404);
      }
    } catch (error) {
      console.error("Public CORS organization check error:", error);
      return c.json({ error: "CORS: Organization validation failed" }, 500);
    }
  }

  // Allow direct URL access (no origin header)
  await next();
  return;
};

export default publicCorsMiddleware;
