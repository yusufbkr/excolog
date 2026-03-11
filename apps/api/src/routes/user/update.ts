import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import type { AppRouteHandler } from "@/app/types";
import { listUserMemberships } from "@/kysely/organization";
import { updateUser } from "@/kysely/user";
import { OrganizationMembershipSchema, UserSchema } from "@excolog/database";

const UpdateUserSchema = UserSchema.pick({
  name: true,
  username: true,
  language: true,
  avatarUrl: true,
  address: true,
  city: true,
  country: true,
  postalCode: true,
}).partial();

export const route = createRoute({
  summary: "Update user profile",
  path: routes.user.default,
  method: "patch",
  tags: [tags.user],
  security: [{ bearer: [] }],
  request: {
    body: jsonContentRequired(UpdateUserSchema, "The user profile to update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      UserSchema.extend({
        memberships: z.array(OrganizationMembershipSchema),
      }),
      "The updated profile",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(UpdateUserSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const user = c.get("user");

  const {
    name,
    username,
    language,
    avatarUrl,
    address,
    city,
    country,
    postalCode,
  } = c.req.valid("json");

  if (!user) {
    return c.json({ message: UNAUTHORIZED_MESSAGE }, HttpStatusCodes.FORBIDDEN);
  }

  const updated = await updateUser({
    id: user.id,
    name: name ?? null,
    username: username ?? null,
    language: language ?? undefined,
    avatarUrl: avatarUrl ?? null,
    address: address ?? null,
    city: city ?? null,
    country: country ?? null,
    postalCode: postalCode ?? null,
  });

  if (!updated) {
    return c.json({ message: UNAUTHORIZED_MESSAGE }, HttpStatusCodes.FORBIDDEN);
  }

  const memberships = await listUserMemberships(user.id);

  return c.json({ ...updated, memberships }, HttpStatusCodes.OK);
};
