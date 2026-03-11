import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import type { AppRouteHandler } from "@/app/types";
import { UserSchema } from "@excolog/database";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { listUsersSearch } from "@/kysely/user";

const UserListResponseSchema = z.array(
  UserSchema.pick({ id: true, name: true, username: true, avatarUrl: true }),
);

export const route = createRoute({
  summary: "List users (super admin only)",
  path: routes.user.list,
  method: "get",
  tags: [tags.user],
  security: [{ bearer: [] }],
  request: {
    query: z.object({
      search: z.string().optional(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserListResponseSchema,
      "The users matching search",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const user = c.get("user");

  if (!user.profile?.isSuperAdmin) {
    return c.json({ message: UNAUTHORIZED_MESSAGE }, HttpStatusCodes.FORBIDDEN);
  }

  const { search } = c.req.valid("query");
  const users = await listUsersSearch(search);

  return c.json(users, HttpStatusCodes.OK);
};
