import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import type { AppRouteHandler } from "@/app/types";
import { OrganizationSchema } from "@excolog/database";

import {
  UNAUTHORIZED_MESSAGE,
  notFoundSchema,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import {
  getOrganizationBySlug,
  updateOrganization,
} from "@/kysely/organization";

export const route = createRoute({
  summary: "Update organization",
  path: routes.organization.organizationBySlug.path,
  method: "patch",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.organizationBySlug.params,
    body: jsonContentRequired(
      OrganizationSchema.partial().pick({
        name: true,
        slug: true,
        avatarUrl: true,
      }),
      "The organization to update",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrganizationSchema,
      "The updated organization",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Organization not found",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(OrganizationSchema),
      "The validation error(s)",
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const { slug } = c.req.valid("param");
  const body = c.req.valid("json");

  const existingOrg = await getOrganizationBySlug(slug);

  if (!existingOrg) {
    return c.json(
      { message: "Organization not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const updated = await updateOrganization({
    id: existingOrg.id,
    name: body.name ?? undefined,
    slug: body.slug ?? undefined,
    avatarUrl: body.avatarUrl ?? undefined,
  });

  if (!updated) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: "UPDATE_FAILED",
              path: ["organization"],
              message: "Failed to update organization",
            },
          ],
          name: "ValidationError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};
