import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";

import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import type { AppBindings, AppOpenAPI } from "./types";

export function createRouter() {
	const app = new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook,
	});

	return app;
}

export default function createApp() {
	const app = createRouter();
	app.use(serveEmojiFavicon("📝"));
	app
		.use(
			cors({
				origin: "*",
			}),
		)
		.use(prettyJSON())
		.use(secureHeaders())
		.use(timing())
		.use(logger());

	app.notFound(notFound);
	app.onError(onError);
	return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
	return createApp().route("/", router);
}
