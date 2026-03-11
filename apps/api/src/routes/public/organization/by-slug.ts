import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import type { AppRouteHandler } from "@/app/types";
import { OrganizationSchema } from "@excolog/database";

import { notFoundSchema, routes, tags } from "@/app/constants";
import { getOrganizationPublicBySlug } from "@/kysely/organization";

const PublicOrganizationResponseSchema = OrganizationSchema.pick({
  avatarUrl: true,
  name: true,
  slug: true,
});

export const route = createRoute({
  summary: "Get public organization by slug (avatar, name, slug)",
  path: routes.public.organization.bySlug.path,
  method: "get",
  tags: [tags.organization],
  request: {
    params: routes.public.organization.bySlug.params,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      PublicOrganizationResponseSchema,
      "The organization (avatar, name, slug)",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Organization not found",
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const { slug } = c.req.valid("param");

  const organization = await getOrganizationPublicBySlug(slug);

  if (!organization) {
    return c.json(
      { message: "Organization not found" },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(organization, HttpStatusCodes.OK);
};
