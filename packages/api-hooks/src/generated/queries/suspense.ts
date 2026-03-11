// generated with @7nohe/openapi-react-query-codegen@2.0.0

import { type Options } from "@hey-api/client-fetch";
import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAssetsAsset,
  getAssetsAvatar,
  getOrganizationBySlug,
  getOrganizationBySlugExchangeRate,
  getOrganizationBySlugMemberList,
  getOrganizationList,
  getPublicOrganizationBySlug,
  getUploadAsset,
  getUploadAvatar,
  getUser,
  getUserList,
} from "../requests/services.gen";
import {
  GetAssetsAssetData,
  GetAssetsAssetError,
  GetAssetsAvatarData,
  GetAssetsAvatarError,
  GetOrganizationBySlugData,
  GetOrganizationBySlugError,
  GetOrganizationBySlugExchangeRateData,
  GetOrganizationBySlugExchangeRateError,
  GetOrganizationBySlugMemberListData,
  GetOrganizationBySlugMemberListError,
  GetOrganizationListError,
  GetPublicOrganizationBySlugData,
  GetPublicOrganizationBySlugError,
  GetUploadAssetData,
  GetUploadAssetError,
  GetUploadAvatarData,
  GetUploadAvatarError,
  GetUserError,
  GetUserListData,
  GetUserListError,
} from "../requests/types.gen";
import * as Common from "./common";
export const useGetPublicOrganizationBySlugSuspense = <
  TData = NonNullable<Common.GetPublicOrganizationBySlugDefaultResponse>,
  TError = GetPublicOrganizationBySlugError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetPublicOrganizationBySlugData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetPublicOrganizationBySlugKeyFn(
      clientOptions,
      queryKey,
    ),
    queryFn: () =>
      getPublicOrganizationBySlug({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetAssetsAvatarSuspense = <
  TData = NonNullable<Common.GetAssetsAvatarDefaultResponse>,
  TError = GetAssetsAvatarError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetAssetsAvatarData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetAssetsAvatarKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getAssetsAvatar({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetAssetsAssetSuspense = <
  TData = NonNullable<Common.GetAssetsAssetDefaultResponse>,
  TError = GetAssetsAssetError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetAssetsAssetData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetAssetsAssetKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getAssetsAsset({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUserSuspense = <
  TData = NonNullable<Common.GetUserDefaultResponse>,
  TError = GetUserError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<unknown, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetUserKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUser({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUserListSuspense = <
  TData = NonNullable<Common.GetUserListDefaultResponse>,
  TError = GetUserListError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetUserListData, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetUserListKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUserList({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUploadAvatarSuspense = <
  TData = NonNullable<Common.GetUploadAvatarDefaultResponse>,
  TError = GetUploadAvatarError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetUploadAvatarData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetUploadAvatarKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUploadAvatar({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUploadAssetSuspense = <
  TData = NonNullable<Common.GetUploadAssetDefaultResponse>,
  TError = GetUploadAssetError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetUploadAssetData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetUploadAssetKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUploadAsset({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetOrganizationListSuspense = <
  TData = NonNullable<Common.GetOrganizationListDefaultResponse>,
  TError = GetOrganizationListError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<unknown, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetOrganizationListKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getOrganizationList({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetOrganizationBySlugSuspense = <
  TData = NonNullable<Common.GetOrganizationBySlugDefaultResponse>,
  TError = GetOrganizationBySlugError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetOrganizationBySlugData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetOrganizationBySlugKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getOrganizationBySlug({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetOrganizationBySlugMemberListSuspense = <
  TData = NonNullable<Common.GetOrganizationBySlugMemberListDefaultResponse>,
  TError = GetOrganizationBySlugMemberListError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetOrganizationBySlugMemberListData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetOrganizationBySlugMemberListKeyFn(
      clientOptions,
      queryKey,
    ),
    queryFn: () =>
      getOrganizationBySlugMemberList({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetOrganizationBySlugExchangeRateSuspense = <
  TData = NonNullable<Common.GetOrganizationBySlugExchangeRateDefaultResponse>,
  TError = GetOrganizationBySlugExchangeRateError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetOrganizationBySlugExchangeRateData, true>,
  queryKey?: TQueryKey,
  options?: Omit<
    UseSuspenseQueryOptions<TData, TError>,
    "queryKey" | "queryFn"
  >,
) =>
  useSuspenseQuery<TData, TError>({
    queryKey: Common.UseGetOrganizationBySlugExchangeRateKeyFn(
      clientOptions,
      queryKey,
    ),
    queryFn: () =>
      getOrganizationBySlugExchangeRate({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
