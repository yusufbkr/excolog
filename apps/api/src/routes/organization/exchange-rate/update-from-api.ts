import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import type { AppRouteHandler } from "@/app/types";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { updateExchangeRatesFromAPI } from "@/kysely/exchange-rate";

const UpdateExchangeRatesResponseSchema = z.object({
  success: z.boolean(),
  rates: z
    .object({
      EUR: z.number(),
      USD: z.number(),
    })
    .optional(),
  error: z.string().optional(),
});

export const route = createRoute({
  summary: "Update exchange rates from API",
  description:
    "Fetches latest exchange rates from free API and updates the database",
  path: routes.organization.exchangeRates.updateFromApi.path,
  method: "post",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.exchangeRates.updateFromApi.params,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UpdateExchangeRatesResponseSchema,
      "Exchange rates updated successfully",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("Failed to update exchange rates"),
      "Update failed",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const result = await updateExchangeRatesFromAPI();

  if (!result.success) {
    return c.json(
      { message: result.error ?? "Failed to update exchange rates" },
      HttpStatusCodes.BAD_REQUEST,
    );
  }

  return c.json(result, HttpStatusCodes.OK);
};
