import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import type { AppRouteHandler } from "@/app/types";
import {
  OrganizationSchema,
  OrganizationMembership,
  OrganizationMembershipSchema,
  User,
  UserSchema,
} from "@excolog/database";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { db } from "@excolog/database";
import { listOrganizationMembers } from "@/kysely/organization";

export const route = createRoute({
  summary: "Get all organizations",
  path: routes.organization.list,
  method: "get",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        OrganizationSchema.extend({
          memberships: z.array(
            OrganizationMembershipSchema.extend({
              user: UserSchema,
            }),
          ),
        }),
      ),
      "The organizations",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const user = c.get("user");

  // Check if user is super admin
  const isSuperAdmin = user.profile?.isSuperAdmin ?? false;

  // Get organizations - all if super admin, otherwise only where user is a member
  const organizations = isSuperAdmin
    ? await db.selectFrom("Organization").selectAll("Organization").execute()
    : await db
        .selectFrom("Organization")
        .innerJoin(
          "OrganizationMembership",
          "OrganizationMembership.organizationSlug",
          "Organization.slug",
        )
        .selectAll("Organization")
        .where("OrganizationMembership.userId", "=", user.id)
        .execute();

  if (!organizations.length) {
    return c.json([], HttpStatusCodes.OK);
  }

  // Get organization slugs for fetching memberships
  const organizationSlugs = organizations
    .map((org) => org.slug)
    .filter((slug): slug is string => slug !== null);

  // Get memberships for all organizations using helper
  const allMemberships = await Promise.all(
    organizationSlugs.map((slug) => listOrganizationMembers(slug)),
  );

  // Group memberships by organization slug
  const groupedMemberships: Record<
    string,
    Array<OrganizationMembership & { user: User }>
  > = {};

  for (const memberships of allMemberships) {
    for (const membership of memberships) {
      const slug = membership.organizationSlug;
      if (!slug || !membership.user) continue;
      if (!groupedMemberships[slug]) {
        groupedMemberships[slug] = [];
      }
      groupedMemberships[slug].push({
        ...membership,
        user: {
          ...membership.user,
          createdAt: new Date(membership.user.createdAt),
          updatedAt: new Date(membership.user.updatedAt),
        },
      });
    }
  }

  // Combine organizations with their memberships
  const organizationsWithMemberships = organizations.map((org) => {
    return {
      ...org,
      memberships: (groupedMemberships[org.slug || ""] || []).map((m) => ({
        ...m,
        user: m.user,
      })),
    };
  });

  return c.json(organizationsWithMemberships, HttpStatusCodes.OK);
};
