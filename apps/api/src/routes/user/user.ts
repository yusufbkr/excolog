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
import { db } from "@excolog/database";
import { listUserMemberships } from "@/kysely/organization";

export const route = createRoute({
  summary: "Get user profile",
  path: routes.user.default,
  method: "get",
  tags: [tags.user],
  security: [{ bearer: [] }],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserSchema.extend({
        memberships: OrganizationMembershipSchema.array(),
      }),
      "The user profile",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({ message: z.string() }),
      "Internal server error",
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const user = c.get("user");

  // Get user profile
  const userProfile = await db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", user.id)
    .executeTakeFirst();

  if (!userProfile) {
    // Create new user profile
    const newUserProfile = await db
      .insertInto("User")
      .values({
        id: user.id,
        email: user.email,
        name: user?.user_metadata?.name || null,
        updatedAt: new Date(),
      })
      .returningAll()
      .executeTakeFirst();

    if (!newUserProfile) {
      return c.json(
        { message: "Failed to create user profile" },
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    const memberships = await listUserMemberships(newUserProfile.id);

    return c.json({ ...newUserProfile, memberships }, HttpStatusCodes.OK);
  }

  // Get user memberships
  const memberships = await listUserMemberships(userProfile.id);

  return c.json({ ...userProfile, memberships }, HttpStatusCodes.OK);
};
