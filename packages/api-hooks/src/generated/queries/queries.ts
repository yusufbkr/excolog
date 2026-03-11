// generated with @7nohe/openapi-react-query-codegen@2.0.0

import { type Options } from "@hey-api/client-fetch";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteOrganizationBySlug,
  deleteOrganizationBySlugMemberById,
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
  patchOrganizationBySlug,
  patchUser,
  postOrganization,
  postOrganizationBySlugExchangeRateUpdate,
  postOrganizationBySlugExchangeRateUpdateFromApi,
  postOrganizationBySlugMember,
} from "../requests/services.gen";
import {
  DeleteOrganizationBySlugData,
  DeleteOrganizationBySlugError,
  DeleteOrganizationBySlugMemberByIdData,
  DeleteOrganizationBySlugMemberByIdError,
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
  PatchOrganizationBySlugData,
  PatchOrganizationBySlugError,
  PatchUserData,
  PatchUserError,
  PostOrganizationBySlugExchangeRateUpdateData,
  PostOrganizationBySlugExchangeRateUpdateError,
  PostOrganizationBySlugExchangeRateUpdateFromApiData,
  PostOrganizationBySlugExchangeRateUpdateFromApiError,
  PostOrganizationBySlugMemberData,
  PostOrganizationBySlugMemberError,
  PostOrganizationData,
  PostOrganizationError,
} from "../requests/types.gen";
import * as Common from "./common";
export const useGetPublicOrganizationBySlug = <
  TData = Common.GetPublicOrganizationBySlugDefaultResponse,
  TError = GetPublicOrganizationBySlugError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetPublicOrganizationBySlugData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
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
export const useGetAssetsAvatar = <
  TData = Common.GetAssetsAvatarDefaultResponse,
  TError = GetAssetsAvatarError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetAssetsAvatarData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetAssetsAvatarKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getAssetsAvatar({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetAssetsAsset = <
  TData = Common.GetAssetsAssetDefaultResponse,
  TError = GetAssetsAssetError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetAssetsAssetData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetAssetsAssetKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getAssetsAsset({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUser = <
  TData = Common.GetUserDefaultResponse,
  TError = GetUserError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<unknown, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetUserKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUser({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUserList = <
  TData = Common.GetUserListDefaultResponse,
  TError = GetUserListError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetUserListData, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetUserListKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUserList({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUploadAvatar = <
  TData = Common.GetUploadAvatarDefaultResponse,
  TError = GetUploadAvatarError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetUploadAvatarData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetUploadAvatarKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUploadAvatar({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetUploadAsset = <
  TData = Common.GetUploadAssetDefaultResponse,
  TError = GetUploadAssetError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetUploadAssetData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetUploadAssetKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getUploadAsset({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetOrganizationList = <
  TData = Common.GetOrganizationListDefaultResponse,
  TError = GetOrganizationListError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<unknown, true> = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetOrganizationListKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getOrganizationList({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetOrganizationBySlug = <
  TData = Common.GetOrganizationBySlugDefaultResponse,
  TError = GetOrganizationBySlugError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetOrganizationBySlugData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseGetOrganizationBySlugKeyFn(clientOptions, queryKey),
    queryFn: () =>
      getOrganizationBySlug({ ...clientOptions }).then(
        (response) => response.data as TData,
      ) as TData,
    ...options,
  });
export const useGetOrganizationBySlugMemberList = <
  TData = Common.GetOrganizationBySlugMemberListDefaultResponse,
  TError = GetOrganizationBySlugMemberListError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetOrganizationBySlugMemberListData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
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
export const useGetOrganizationBySlugExchangeRate = <
  TData = Common.GetOrganizationBySlugExchangeRateDefaultResponse,
  TError = GetOrganizationBySlugExchangeRateError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  clientOptions: Options<GetOrganizationBySlugExchangeRateData, true>,
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) =>
  useQuery<TData, TError>({
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
export const usePostOrganization = <
  TData = Common.PostOrganizationMutationResult,
  TError = PostOrganizationError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<PostOrganizationData, true>,
      TContext
    >,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<TData, TError, Options<PostOrganizationData, true>, TContext>({
    mutationKey: Common.UsePostOrganizationKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      postOrganization(clientOptions) as unknown as Promise<TData>,
    ...options,
  });
export const usePostOrganizationBySlugMember = <
  TData = Common.PostOrganizationBySlugMemberMutationResult,
  TError = PostOrganizationBySlugMemberError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<PostOrganizationBySlugMemberData, true>,
      TContext
    >,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    Options<PostOrganizationBySlugMemberData, true>,
    TContext
  >({
    mutationKey: Common.UsePostOrganizationBySlugMemberKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      postOrganizationBySlugMember(clientOptions) as unknown as Promise<TData>,
    ...options,
  });
export const usePostOrganizationBySlugExchangeRateUpdate = <
  TData = Common.PostOrganizationBySlugExchangeRateUpdateMutationResult,
  TError = PostOrganizationBySlugExchangeRateUpdateError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<PostOrganizationBySlugExchangeRateUpdateData, true>,
      TContext
    >,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    Options<PostOrganizationBySlugExchangeRateUpdateData, true>,
    TContext
  >({
    mutationKey:
      Common.UsePostOrganizationBySlugExchangeRateUpdateKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      postOrganizationBySlugExchangeRateUpdate(
        clientOptions,
      ) as unknown as Promise<TData>,
    ...options,
  });
export const usePostOrganizationBySlugExchangeRateUpdateFromApi = <
  TData = Common.PostOrganizationBySlugExchangeRateUpdateFromApiMutationResult,
  TError = PostOrganizationBySlugExchangeRateUpdateFromApiError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<PostOrganizationBySlugExchangeRateUpdateFromApiData, true>,
      TContext
    >,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    Options<PostOrganizationBySlugExchangeRateUpdateFromApiData, true>,
    TContext
  >({
    mutationKey:
      Common.UsePostOrganizationBySlugExchangeRateUpdateFromApiKeyFn(
        mutationKey,
      ),
    mutationFn: (clientOptions) =>
      postOrganizationBySlugExchangeRateUpdateFromApi(
        clientOptions,
      ) as unknown as Promise<TData>,
    ...options,
  });
export const usePatchUser = <
  TData = Common.PatchUserMutationResult,
  TError = PatchUserError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<TData, TError, Options<PatchUserData, true>, TContext>,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<TData, TError, Options<PatchUserData, true>, TContext>({
    mutationKey: Common.UsePatchUserKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      patchUser(clientOptions) as unknown as Promise<TData>,
    ...options,
  });
export const usePatchOrganizationBySlug = <
  TData = Common.PatchOrganizationBySlugMutationResult,
  TError = PatchOrganizationBySlugError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<PatchOrganizationBySlugData, true>,
      TContext
    >,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    Options<PatchOrganizationBySlugData, true>,
    TContext
  >({
    mutationKey: Common.UsePatchOrganizationBySlugKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      patchOrganizationBySlug(clientOptions) as unknown as Promise<TData>,
    ...options,
  });
export const useDeleteOrganizationBySlug = <
  TData = Common.DeleteOrganizationBySlugMutationResult,
  TError = DeleteOrganizationBySlugError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<DeleteOrganizationBySlugData, true>,
      TContext
    >,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    Options<DeleteOrganizationBySlugData, true>,
    TContext
  >({
    mutationKey: Common.UseDeleteOrganizationBySlugKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      deleteOrganizationBySlug(clientOptions) as unknown as Promise<TData>,
    ...options,
  });
export const useDeleteOrganizationBySlugMemberById = <
  TData = Common.DeleteOrganizationBySlugMemberByIdMutationResult,
  TError = DeleteOrganizationBySlugMemberByIdError,
  TQueryKey extends Array<unknown> = unknown[],
  TContext = unknown,
>(
  mutationKey?: TQueryKey,
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      Options<DeleteOrganizationBySlugMemberByIdData, true>,
      TContext
    >,
    "mutationKey" | "mutationFn"
  >,
) =>
  useMutation<
    TData,
    TError,
    Options<DeleteOrganizationBySlugMemberByIdData, true>,
    TContext
  >({
    mutationKey: Common.UseDeleteOrganizationBySlugMemberByIdKeyFn(mutationKey),
    mutationFn: (clientOptions) =>
      deleteOrganizationBySlugMemberById(
        clientOptions,
      ) as unknown as Promise<TData>,
    ...options,
  });
