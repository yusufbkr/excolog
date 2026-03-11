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
  summary: "Get Asset File",
  path: "/asset",
  method: "get",
  tags: [tags.asset],
  request: {
    query: z.object({
      path: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "The asset file",
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
  const { path } = c.req.valid("query");

  if (!path) {
    return c.json({ message: UNAUTHORIZED_MESSAGE }, HttpStatusCodes.FORBIDDEN);
  }

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
    // Private bucket: create signed URL and redirect (download() can return 400 for some bucket configs)
    const expiresIn = 3600; // 1 hour
    const { data: signed, error } = await supabase.storage
      .from("assets")
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
