"use client";

import { PropsWithChildren, useCallback, useEffect, useRef } from "react";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

import { client } from "@excolog/api-hooks";
import createToastMessages from "@excolog/ui/utils/create-toast-messages";

import { useSession } from "@/components/provider/session-provider";
import getErrorMessages from "@/utils/get-error-messages";

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  throwOnError: true, // If you want to handle errors on `onError` callback of `useQuery` and `useMutation`, set this to `true`
});

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
  const { session, customerSession, setSession } = useSession();

  const newToken = customerSession?.token || session?.token;

  // Stale closure'ı önlemek için ref kullan
  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const requestCallback = useCallback(
    (config: any) => {
      try {
        const headers = new Headers(config.headers);
        // Panel (katılımcı/müşteri) sayfaları kendi token'ını kullanır; Supabase token ekleme
        // Böylece org girişi yapılmış olsa bile panel API istekleri panel token ile gider
        if (newToken && !headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${newToken}`);
        }
        config.headers = headers;
      } catch (err) {
        console.error("Failed to get token for request:", err);
      }
      return config;
    },
    [newToken],
  );

  useEffect(() => {
    client.interceptors.request.eject(requestCallback);

    client.interceptors.request.use(requestCallback);
  }, [requestCallback, newToken]);

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
