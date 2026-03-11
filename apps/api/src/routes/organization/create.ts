import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";

import type { AppRouteHandler } from "@/app/types";
import {
  OrganizationMembershipSchema,
  OrganizationSchema,
  UserSchema,
} from "@excolog/database";

import {
  UNAUTHORIZED_MESSAGE,
  routes,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import { clearAllMembershipCache } from "@/middlewares/organization";
import { db } from "@excolog/database";
import {
  createOrganization,
  createOrganizationMembership,
  getOrganizationBySlug,
} from "@/kysely/organization";

export const route = createRoute({
  summary: "Create an organization",
  path: routes.organization.default,
  method: "post",
  tags: [tags.organization],
  security: [{ bearer: [] }],
  request: {
    body: jsonContentRequired(
      OrganizationSchema.pick({
        name: true,
        slug: true,
      }).extend({
        avatarUrl: z.string().nullable().optional(),
        fairDescription: z.string().nullable().optional(),
        fairLocation: z.string().nullable().optional(),
        fairStartDate: z.string().datetime().nullable().optional(),
        fairEndDate: z.string().datetime().nullable().optional(),
      }),
      "The organization to create",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrganizationSchema.extend({
        memberships: z.array(
          OrganizationMembershipSchema.extend({
            user: UserSchema,
          }),
        ),
      }),
      "The created organization",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(OrganizationSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("The slug already exists"),
      "The slug already exists",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createMessageObjectSchema("The slug is required"),
      "The slug is required",
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const user = c.get("user");
  const {
    name,
    slug: slugBody,
    avatarUrl,
    fairDescription,
    fairLocation,
    fairStartDate,
    fairEndDate,
  } = c.req.valid("json");

  if (slugBody === "auth") {
    return c.json({ message: UNAUTHORIZED_MESSAGE }, HttpStatusCodes.FORBIDDEN);
  }

  if (!slugBody) {
    return c.json({ message: "Slug is required" }, HttpStatusCodes.BAD_REQUEST);
  }

  // Slug'ın zaten var olup olmadığını kontrol et
  const existingOrganization = await getOrganizationBySlug(slugBody);

  if (existingOrganization) {
    return c.json({ message: "Slug already exists" }, HttpStatusCodes.CONFLICT);
  }

  try {
    // Organization'ı oluştur
    const organization = await createOrganization({
      name,
      slug: slugBody,
      createdByUserId: user.id,
      ownerUserId: user.id,
      avatarUrl: avatarUrl ?? null,
    });

    if (!organization) {
      return c.json(
        {
          success: false,
          error: {
            issues: [
              {
                code: "CREATION_FAILED",
                path: ["organization"],
                message: "Failed to create organization",
              },
            ],
            name: "ValidationError",
          },
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    // Membership oluştur
    const membership = await createOrganizationMembership({
      organizationSlug: slugBody,
      userId: user.id,
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

    // Get user data
    const userData = await db
      .selectFrom("User")
      .selectAll()
      .where("id", "=", user.id)
      .executeTakeFirst();

    clearAllMembershipCache(user.id);

    return c.json(
      {
        id: organization.id,
        createdAt: organization.createdAt.toISOString(),
        updatedAt: organization.updatedAt.toISOString(),
        name: organization.name,
        slug: organization.slug,
        createdByUserId: organization.createdByUserId,
        ownerUserId: organization.ownerUserId,
        avatarUrl: organization.avatarUrl,
        memberships: [
          {
            id: membership.id,
            createdAt: membership.createdAt.toISOString(),
            updatedAt: membership.updatedAt.toISOString(),
            organizationSlug: membership.organizationSlug,
            userId: membership.userId,
            user: userData
              ? {
                  id: userData.id,
                  createdAt: userData.createdAt.toISOString(),
                  updatedAt: userData.updatedAt.toISOString(),
                  name: userData.name,
                  username: userData.username,
                  email: userData.email,
                  isSuperAdmin: userData.isSuperAdmin,
                  language: userData.language,
                  avatarUrl: userData.avatarUrl,
                  address: userData.address,
                  city: userData.city,
                  country: userData.country,
                  postalCode: userData.postalCode,
                }
              : {
                  id: user.id,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  name: null,
                  username: null,
                  email: null,
                  isSuperAdmin: false,
                  language: "tr",
                  avatarUrl: null,
                  address: null,
                  city: null,
                  country: null,
                  postalCode: null,
                },
          },
        ],
      },
      HttpStatusCodes.OK,
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: "CREATION_FAILED",
              path: ["organization"],
              message: "Failed to create organization",
            },
          ],
          name: "ValidationError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }
};
