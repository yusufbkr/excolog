import configureOpenAPI from "@/app/configure-open-api";
import createApp from "@/app/create-app";
import { rateLimit } from "@/middlewares/rate-limit";

import authMiddleware from "@/middlewares/auth";
import organizationMiddleware from "@/middlewares/organization";
import publicCorsMiddleware from "@/middlewares/public-cors";

import userRoutes from "@/routes/user";

import organizationRoutes from "@/routes/organization";
import publicRoutes from "@/routes/public";

import assets from "@/routes/assets";
import upload from "@/routes/upload";

export function createConfiguredApp() {
  const app = createApp();

  app.get("/healthz", (c) => {
    c.status(200);
    return c.text("healthy");
  });

  configureOpenAPI(app);

  app
    .use(rateLimit.standard)

    .use("/p/:slug/*", publicCorsMiddleware)
    .route("/", publicRoutes)
    .route("/assets", assets)

    .use(authMiddleware)
    .route("/", userRoutes)
    .route("/upload", upload)

    .use("/organization/:slug/*", organizationMiddleware)
    .route("/", organizationRoutes);

  return app;
}
