import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import type { AppRouteHandler } from "@/app/types";
import { OrganizationMembershipSchema, UserSchema } from "@excolog/database";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { listOrganizationMembers } from "@/kysely/organization";

export const route = createRoute({
  summary: "List organization members",
  path: routes.organization.members.path,
  method: "get",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.members.params,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        OrganizationMembershipSchema.extend({
          user: UserSchema.nullable(),
        }),
      ),
      "The organization members",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const { slug } = c.req.valid("param");

  const members = await listOrganizationMembers(slug);

  return c.json(
    members.filter((member) => member.user && member.user.username !== "admin"),
    HttpStatusCodes.OK,
  );
};
