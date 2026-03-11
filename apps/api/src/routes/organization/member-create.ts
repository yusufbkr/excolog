import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import type { AppRouteHandler } from "@/app/types";
import { OrganizationMembershipSchema } from "@excolog/database";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { clearAllMembershipCache } from "@/middlewares/organization";
import {
  createOrganizationMembership,
  getOrganizationMembership,
} from "@/kysely/organization";

export const route = createRoute({
  summary: "Add member to organization",
  path: routes.organization.member.path,
  method: "post",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.member.params,
    body: jsonContentRequired(
      z.object({
        userId: z.string(),
      }),
      "The member to add",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrganizationMembershipSchema,
      "The created membership",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(OrganizationMembershipSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      z.object({ message: z.string() }),
      "Member already exists",
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const { slug } = c.req.valid("param");
  const { userId } = c.req.valid("json");

  const existing = await getOrganizationMembership(userId, slug);

  if (existing) {
    return c.json(
      { message: "Member already exists" },
      HttpStatusCodes.CONFLICT,
    );
  }

  const membership = await createOrganizationMembership({
    organizationSlug: slug,
    userId,
  });

  if (!membership) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: "CREATION_FAILED",
              path: ["membership"],
              message: "Failed to create membership",
            },
          ],
          name: "ValidationError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  clearAllMembershipCache(userId);

  return c.json(membership, HttpStatusCodes.OK);
};
