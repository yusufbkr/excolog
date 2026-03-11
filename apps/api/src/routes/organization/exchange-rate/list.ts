import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import type { AppRouteHandler } from "@/app/types";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { listExchangeRates } from "@/kysely/exchange-rate";
import { ExchangeRateSchema } from "@excolog/database";

export const route = createRoute({
  summary: "List exchange rates",
  path: routes.organization.exchangeRates.list.path,
  method: "get",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.exchangeRates.list.params,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(ExchangeRateSchema),
      "Exchange rates",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const rates = await listExchangeRates();

  return c.json(
    rates
      .filter((r) => r.currency === "EUR" || r.currency === "USD")
      .map((r) => ({
        ...r,
        currency: r.currency as "EUR" | "USD",
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })),
    HttpStatusCodes.OK,
  );
};
