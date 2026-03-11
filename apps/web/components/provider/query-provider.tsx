"use client";

import { PropsWithChildren } from "react";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

import { OpenAPI } from "@excolog/api-hooks";
import createToastMessages from "@excolog/ui/utils/create-toast-messages";

import getErrorMessages from "@/utils/get-error-messages";

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

function onError(error: Error) {
  const errorMessage =
    error instanceof Error ? error.message : "Bir hata oluştu";
  const messages = getErrorMessages(
    "messages" in error && Array.isArray(error.messages)
      ? error.messages
      : [errorMessage],
  );
  createToastMessages({ messages });
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError }),
    mutationCache: new MutationCache({ onError }),
    defaultOptions: {
      queries: {
        throwOnError: false,
        staleTime: 60 * 1000,
        retry: 3,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools buttonPosition="top-left" />
      )}
    </QueryClientProvider>
  );
}
export default QueryProvider;
