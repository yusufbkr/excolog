import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import type { AppRouteHandler } from "@/app/types";

import {
  UNAUTHORIZED_MESSAGE,
  notFoundSchema,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { deleteOrganization, getOrganizationBySlug } from "@/kysely";

export const route = createRoute({
  summary: "Delete organization",
  path: routes.organization.organizationBySlug.path,
  method: "delete",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.organizationBySlug.params,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Organization deleted",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Organization not found",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ message: z.string() }),
      "Failed to delete organization",
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const { slug } = c.req.valid("param");

  const user = c.get("user");

  if (!user.profile?.isSuperAdmin) {
    return c.json(
      { message: "No permission to perform this action on this organization" },
      HttpStatusCodes.FORBIDDEN,
    );
  }

  const organization = await getOrganizationBySlug(slug);
  if (!organization) {
    return c.json(
      { message: "Organization not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  try {
    await deleteOrganization(slug);

    return c.json(
      { message: "Organization deleted successfully" },
      HttpStatusCodes.OK,
    );
  } catch (error) {
    console.error(error);
    return c.json(
      { message: "Failed to delete organization" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};
