import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { z } from "zod";

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: "Required",
  EXPECTED_NUMBER: "Expected number, received nan",
  NO_UPDATES: "No updates provided",
};

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: "invalid_updates",
};

export const UNAUTHORIZED_MESSAGE =
  "No permission to perform this action on this team.";

/** Export endpoint'lerinde kullanılan maksimum kayıt sayısı (pagination yok) */
export const EXPORT_LIMIT = 10_000;

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND,
);

export const unauthorizedSchema =
  createMessageObjectSchema(UNAUTHORIZED_MESSAGE);

export const tags = {
  user: "User",
  auth: "Auth",
  organization: "Organization",
  asset: "Asset",
};

/** Paginated list response: data + total + nextPage (body'de sadece page; useInfiniteQuery codegen için) */
export function createPaginatedResponseSchema<T extends z.ZodType>(
  itemSchema: T,
) {
  return z.object({
    data: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    /** Sonraki sayfa numarası (1-based), yoksa null */
    nextPage: z.number().int().positive().nullable(),
  });
}

export const IdParamsSchema = z.object({
  id: z.string(),
});

export const SlugParamsSchema = z.object({
  slug: z.string(),
});

export const SlugAndIdParamsSchema = SlugParamsSchema.extend({
  id: z.string(),
});

export const routes = (() => {
  const slug = "{slug}";
  const id = "{id}";

  const user = "/user";
  const organization = "/organization";
  const organizationWithSlug = `${organization}/${slug}`;

  return {
    public: {
      organization: {
        bySlug: {
          path: `/p/${slug}/organization`,
          params: SlugParamsSchema,
        },
      },
    },
    user: {
      default: user,
      list: `${user}/list`,
    },
    organization: {
      default: organization,
      list: `${organization}/list`,
      organizationBySlug: {
        path: `${organizationWithSlug}`,
        params: SlugParamsSchema,
      },
      invitations: {
        path: `${organizationWithSlug}/invitations`,
        params: SlugParamsSchema,
      },
      members: {
        path: `${organizationWithSlug}/member/list`,
        params: SlugParamsSchema,
      },
      member: {
        path: `${organizationWithSlug}/member`,
        params: SlugParamsSchema,
      },
      memberById: {
        path: `${organizationWithSlug}/member/${id}`,
        params: SlugAndIdParamsSchema,
      },
      exchangeRates: {
        list: {
          path: `${organizationWithSlug}/exchange-rate`,
          params: SlugParamsSchema,
        },
        update: {
          path: `${organizationWithSlug}/exchange-rate/update`,
          params: SlugParamsSchema,
        },
        updateFromApi: {
          path: `${organizationWithSlug}/exchange-rate/update-from-api`,
          params: SlugParamsSchema,
        },
      },
    },
  };
})();

export const noOrganizationSlugRoutes = [
  routes.user.default,
  routes.organization.default,
  routes.organization.list,
];

export const noNeedMemberShipCheckRoutes = [];

export const productionPublicRouteTags: string[] = [];
