import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import {
  UNAUTHORIZED_MESSAGE,
  notFoundSchema,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import type { AppRouteHandler } from "@/app/types";

import { getOrganizationBySlug } from "@/kysely/organization";
import { OrganizationSchema } from "@excolog/database";

export const route = createRoute({
  summary: "Get organization by slug",
  path: routes.organization.organizationBySlug.path,
  method: "get",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.organizationBySlug.params,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(OrganizationSchema, "The organization"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Organization not found",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const { slug } = c.req.valid("param");

  const organization = await getOrganizationBySlug(slug);

  if (!organization) {
    return c.json(
      { message: "Organization not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(organization, HttpStatusCodes.OK);
};
