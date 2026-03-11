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
  summary: "Get Asset Upload URL",
  path: "/asset",
  method: "get",
  tags: [tags.asset],
  security: [{ bearer: [] }],
  request: {
    query: z.object({
      filename: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        url: z.string(),
        path: z.string(),
      }),
      "The uploaded asset",
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      unauthorizedSchema,
      UNAUTHORIZED_MESSAGE,
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "Invalid file type",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      z.object({
        message: z.string(),
      }),
      "The error message",
    ),
  },
});

const ALLOWED_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

export const handle: AppRouteHandler<typeof route> = async (c) => {
  const user = c.get("user");
  const { filename } = c.req.valid("query");

  if (!user || !filename) {
    return c.json({ message: UNAUTHORIZED_MESSAGE }, HttpStatusCodes.FORBIDDEN);
  }

  // Validate file extension
  const fileExtension = filename
    .toLowerCase()
    .substring(filename.lastIndexOf("."));
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)) {
    return c.json(
      {
        message: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`,
      },
      HttpStatusCodes.BAD_REQUEST,
    );
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

  const fileName = `${Date.now()}-${filename}`;
  const filePath = `${user.id}/${fileName}`;

  try {
    // Create signed URL for upload (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage.from("assets").createSignedUploadUrl(filePath, {
        upsert: false,
      });

    if (signedUrlError || !signedUrlData) {
      return c.json(
        {
          message: signedUrlError?.message || "Failed to create upload URL",
        },
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    // Return signed URL for upload and storage path (not public URL)
    return c.json(
      { url: signedUrlData.signedUrl, path: filePath },
      HttpStatusCodes.OK,
    );
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
