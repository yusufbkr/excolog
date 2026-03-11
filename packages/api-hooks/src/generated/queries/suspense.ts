// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AssetService, OrganizationService, UserService } from "../requests/services.gen";
import * as Common from "./common";
export const useOrganizationServiceGetPBySlugOrganizationSuspense = <TData = Common.OrganizationServiceGetPBySlugOrganizationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetPBySlugOrganizationKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getPBySlugOrganization({ slug }) as TData, ...options });
export const useOrganizationServiceGetOrganizationListSuspense = <TData = Common.OrganizationServiceGetOrganizationListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationListKeyFn(queryKey), queryFn: () => OrganizationService.getOrganizationList() as TData, ...options });
export const useOrganizationServiceGetOrganizationBySlugSuspense = <TData = Common.OrganizationServiceGetOrganizationBySlugDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getOrganizationBySlug({ slug }) as TData, ...options });
export const useOrganizationServiceGetOrganizationBySlugMemberListSuspense = <TData = Common.OrganizationServiceGetOrganizationBySlugMemberListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugMemberListKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getOrganizationBySlugMemberList({ slug }) as TData, ...options });
export const useOrganizationServiceGetOrganizationBySlugExchangeRateSuspense = <TData = Common.OrganizationServiceGetOrganizationBySlugExchangeRateDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugExchangeRateKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getOrganizationBySlugExchangeRate({ slug }) as TData, ...options });
export const useAssetServiceGetAssetsAvatarSuspense = <TData = Common.AssetServiceGetAssetsAvatarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ path }: {
  path: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetAssetsAvatarKeyFn({ path }, queryKey), queryFn: () => AssetService.getAssetsAvatar({ path }) as TData, ...options });
export const useAssetServiceGetAssetsAssetSuspense = <TData = Common.AssetServiceGetAssetsAssetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ path }: {
  path: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetAssetsAssetKeyFn({ path }, queryKey), queryFn: () => AssetService.getAssetsAsset({ path }) as TData, ...options });
export const useAssetServiceGetUploadAvatarSuspense = <TData = Common.AssetServiceGetUploadAvatarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ filename }: {
  filename: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetUploadAvatarKeyFn({ filename }, queryKey), queryFn: () => AssetService.getUploadAvatar({ filename }) as TData, ...options });
export const useAssetServiceGetUploadAssetSuspense = <TData = Common.AssetServiceGetUploadAssetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ filename }: {
  filename: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetUploadAssetKeyFn({ filename }, queryKey), queryFn: () => AssetService.getUploadAsset({ filename }) as TData, ...options });
export const useUserServiceGetUserSuspense = <TData = Common.UserServiceGetUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceGetUserKeyFn(queryKey), queryFn: () => UserService.getUser() as TData, ...options });
export const useUserServiceGetUserListSuspense = <TData = Common.UserServiceGetUserListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ search }: {
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceGetUserListKeyFn({ search }, queryKey), queryFn: () => UserService.getUserList({ search }) as TData, ...options });
