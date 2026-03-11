import { createRoute, z } from "@hono/zod-openapi";
import { createClient } from "@supabase/supabase-js";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import {
  UNAUTHORIZED_MESSAGE,
  tags,
  unauthorizedSchema,
} from "@/app/constants";
import type { AppRouteHandler } from "@/app/types";

export const route = createRoute({
  summary: "Get Avatar File",
  path: "/avatar",
  method: "get",
  tags: [tags.asset],
  request: {
    query: z.object({
      path: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "The avatar file",
      content: {
        "image/*": {
          schema: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "The error message",
    ),
  },
});

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const rawPath = c.req.valid("query").path;

  if (!rawPath) {
    return c.json({ message: UNAUTHORIZED_MESSAGE }, HttpStatusCodes.FORBIDDEN);
  }

  const path = decodeURIComponent(rawPath);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SERVICE_ROLE;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return c.json(
      { message: "Server configuration error" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    const expiresIn = 3600;
    const { data: signed, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(path, expiresIn);

    if (error || !signed?.signedUrl) {
      return c.json(
        { message: error?.message ?? "File not found" },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return c.redirect(signed.signedUrl, 302);
  } catch (error) {
    console.error(error);
    return c.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};
