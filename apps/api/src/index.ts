import "./env";
import { serve } from "@hono/node-server";
import { createConfiguredApp } from "./app/index";

const app = createConfiguredApp();

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
