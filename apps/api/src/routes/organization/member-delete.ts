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
import { clearAllMembershipCache } from "@/middlewares/organization";
import { deleteOrganizationMembership } from "@/kysely/organization";

export const route = createRoute({
  summary: "Remove member from organization",
  path: routes.organization.memberById.path,
  method: "delete",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    params: routes.organization.memberById.params,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Member removed",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Member not found",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const { slug, id } = c.req.valid("param");

  const result = await deleteOrganizationMembership(id, slug);

  if (!result) {
    return c.json({ message: "Member not found" }, HttpStatusCodes.NOT_FOUND);
  }

  clearAllMembershipCache(id);

  return c.json({ message: "Member removed successfully" }, HttpStatusCodes.OK);
};
