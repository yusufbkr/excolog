import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import type { AppRouteHandler } from "@/app/types";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { upsertExchangeRate } from "@/kysely/exchange-rate";

const UpdateExchangeRateBodySchema = z.object({
  currency: z.enum(["EUR", "USD"]),
  rate: z.number().positive(),
});

const ExchangeRateSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  currency: z.enum(["EUR", "USD"]),
  rate: z.number(),
  source: z.string().nullable(),
});

export const route = createRoute({
  summary: "Update exchange rate manually",
  path: routes.organization.exchangeRates.update.path,
  method: "post",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.exchangeRates.update.params,
    body: jsonContentRequired(
      UpdateExchangeRateBodySchema,
      "Exchange rate to update",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      ExchangeRateSchema,
      "Exchange rate updated",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({ message: z.string() }),
      "Failed to update exchange rate",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const body = c.req.valid("json");

  const updated = await upsertExchangeRate(body.currency, body.rate, "manual");

  if (!updated) {
    return c.json(
      { message: "Failed to update exchange rate" },
      HttpStatusCodes.BAD_REQUEST,
    );
  }

  return c.json(
    {
      ...updated,
      currency: updated.currency as "EUR" | "USD",
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    },
    HttpStatusCodes.OK,
  );
};
