import { useCallback, useMemo, useState } from "react";

import {
  type FileError,
  type FileRejection,
  useDropzone,
} from "react-dropzone";

import { getUploadAsset } from "@excolog/api-hooks";

interface FileWithPreview extends File {
  preview?: string;
  errors: readonly FileError[];
}

export type GetUploadUrlResult = { url: string; path: string };

type UseSupabaseUploadOptions = {
  /**
   * Allowed MIME types for each file upload (e.g `image/png`, `text/html`, etc). Wildcards are also supported (e.g `image/*`).
   *
   * Defaults to allowing uploading of all MIME types.
   */
  allowedMimeTypes?: string[];
  /**
   * Maximum upload size of each file allowed in bytes. (e.g 1000 bytes = 1 KB)
   */
  maxFileSize?: number;
  /**
   * Maximum number of files allowed per upload.
   */
  maxFiles?: number;
  /**
   * When provided, used instead of AssetService.getApiUploadAsset (e.g. for panel upload).
   */
  getUploadUrl?: (filename: string) => Promise<GetUploadUrlResult | null>;
};

type UseSupabaseUploadReturn = ReturnType<typeof useSupabaseUpload>;

export type UseSupabaseUploadSuccess = {
  name?: string;
  data?: { id: string; path: string; fullPath: string };
  message?: string;
  url?: string;
};

const useSupabaseUpload = (options: UseSupabaseUploadOptions) => {
  const {
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    getUploadUrl,
  } = options;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);
  const [successes, setSuccesses] = useState<UseSupabaseUploadSuccess[]>([]);

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false;
    }
    if (
      errors.length === 0 &&
      successes.length === files.length &&
      successes.length > 0
    ) {
      return true;
    }
    return false;
  }, [errors.length, successes.length, files.length]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x) => x.name === file.name))
        .map((file) => {
          (file as FileWithPreview).preview = URL.createObjectURL(file);
          (file as FileWithPreview).errors = [];
          return file as FileWithPreview;
        });

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        (file as FileWithPreview).preview = URL.createObjectURL(file);
        (file as FileWithPreview).errors = errors;
        return file as FileWithPreview;
      });

      let newFiles = [...files, ...validFiles, ...invalidFiles];

      if (newFiles.length <= maxFiles) {
        newFiles = newFiles.map((file) => {
          if (file.errors.some((e) => e.code === "too-many-files")) {
            return {
              ...file,
              errors: file.errors.filter((e) => e.code !== "too-many-files"),
            };
          }
          return file;
        });
      }

      setFiles(newFiles);
    },
    [files, setFiles, maxFiles],
  );

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce(
      (acc: Record<string, string[]>, type) => ({
        ...(acc || {}),
        [type]: [],
      }),
      {} as Record<string, string[]>,
    ),
    maxSize: maxFileSize,
    maxFiles: maxFiles || 0,
    multiple: maxFiles > 1,
  });

  const onUpload = useCallback(async () => {
    setLoading(true);

    const filesWithErrors = errors.map((x) => x.name);
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f) => filesWithErrors.includes(f.name)),
            ...files.filter((f) => !successes.some((s) => s?.name === f?.name)),
          ]
        : files;

    const responses = await Promise.all(
      filesToUpload.map(async (file) => {
        try {
          let uploadData: GetUploadUrlResult | null | undefined;

          if (getUploadUrl) {
            uploadData = await getUploadUrl(file.name);
          } else {
            const { data } = await getUploadAsset({
              query: {
                filename: file.name,
              },
            });
            uploadData = data;
          }

          if (!uploadData?.url) {
            return {
              name: file.name,
              data: undefined,
              message: "Failed to get upload URL",
            };
          }

          // Upload file to signed URL
          const uploadResponse = await fetch(uploadData.url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          if (!uploadResponse.ok) {
            return {
              name: file.name,
              data: undefined,
              message: "Failed to upload file",
            };
          }

          return {
            name: file.name,
            data: undefined,
            message: undefined,
            url: uploadData.path ?? uploadData.url,
          };
        } catch (error) {
          return {
            name: file.name,
            data: undefined,
            message: error instanceof Error ? error.message : "Upload failed",
          };
        }
      }),
    );

    const responseErrors = responses.filter((x) => x.message !== undefined);
    setErrors(responseErrors);

    const responseSuccesses = responses.filter((x) => x.message === undefined);
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses]),
    );
    setSuccesses(newSuccesses);

    setLoading(false);
  }, [
    files,
    errors,
    successes,
    getUploadUrl,
    setLoading,
    setErrors,
    setSuccesses,
  ]);

  const onReset = useCallback(() => {
    setFiles([]);
    setSuccesses([]);
    setErrors([]);
    setLoading(false);
  }, [setFiles, setSuccesses, setErrors, setLoading]);

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    onReset,
    maxFileSize,
    maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  };
};

export {
  useSupabaseUpload,
  type UseSupabaseUploadOptions,
  type UseSupabaseUploadReturn,
};
