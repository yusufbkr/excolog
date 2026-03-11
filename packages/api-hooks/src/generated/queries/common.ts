// generated with @7nohe/openapi-react-query-codegen@2.0.0

import { type Options } from "@hey-api/client-fetch";
import { UseQueryResult } from "@tanstack/react-query";
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
  GetAssetsAssetData,
  GetAssetsAvatarData,
  GetOrganizationBySlugData,
  GetOrganizationBySlugExchangeRateData,
  GetOrganizationBySlugMemberListData,
  GetPublicOrganizationBySlugData,
  GetUploadAssetData,
  GetUploadAvatarData,
  GetUserListData,
} from "../requests/types.gen";
export type GetPublicOrganizationBySlugDefaultResponse = Awaited<
  ReturnType<typeof getPublicOrganizationBySlug>
>["data"];
export type GetPublicOrganizationBySlugQueryResult<
  TData = GetPublicOrganizationBySlugDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetPublicOrganizationBySlugKey = "GetPublicOrganizationBySlug";
export const UseGetPublicOrganizationBySlugKeyFn = (
  clientOptions: Options<GetPublicOrganizationBySlugData, true>,
  queryKey?: Array<unknown>,
) => [useGetPublicOrganizationBySlugKey, ...(queryKey ?? [clientOptions])];
export type GetAssetsAvatarDefaultResponse = Awaited<
  ReturnType<typeof getAssetsAvatar>
>["data"];
export type GetAssetsAvatarQueryResult<
  TData = GetAssetsAvatarDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetAssetsAvatarKey = "GetAssetsAvatar";
export const UseGetAssetsAvatarKeyFn = (
  clientOptions: Options<GetAssetsAvatarData, true>,
  queryKey?: Array<unknown>,
) => [useGetAssetsAvatarKey, ...(queryKey ?? [clientOptions])];
export type GetAssetsAssetDefaultResponse = Awaited<
  ReturnType<typeof getAssetsAsset>
>["data"];
export type GetAssetsAssetQueryResult<
  TData = GetAssetsAssetDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetAssetsAssetKey = "GetAssetsAsset";
export const UseGetAssetsAssetKeyFn = (
  clientOptions: Options<GetAssetsAssetData, true>,
  queryKey?: Array<unknown>,
) => [useGetAssetsAssetKey, ...(queryKey ?? [clientOptions])];
export type GetUserDefaultResponse = Awaited<
  ReturnType<typeof getUser>
>["data"];
export type GetUserQueryResult<
  TData = GetUserDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetUserKey = "GetUser";
export const UseGetUserKeyFn = (
  clientOptions: Options<unknown, true> = {},
  queryKey?: Array<unknown>,
) => [useGetUserKey, ...(queryKey ?? [clientOptions])];
export type GetUserListDefaultResponse = Awaited<
  ReturnType<typeof getUserList>
>["data"];
export type GetUserListQueryResult<
  TData = GetUserListDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetUserListKey = "GetUserList";
export const UseGetUserListKeyFn = (
  clientOptions: Options<GetUserListData, true> = {},
  queryKey?: Array<unknown>,
) => [useGetUserListKey, ...(queryKey ?? [clientOptions])];
export type GetUploadAvatarDefaultResponse = Awaited<
  ReturnType<typeof getUploadAvatar>
>["data"];
export type GetUploadAvatarQueryResult<
  TData = GetUploadAvatarDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetUploadAvatarKey = "GetUploadAvatar";
export const UseGetUploadAvatarKeyFn = (
  clientOptions: Options<GetUploadAvatarData, true>,
  queryKey?: Array<unknown>,
) => [useGetUploadAvatarKey, ...(queryKey ?? [clientOptions])];
export type GetUploadAssetDefaultResponse = Awaited<
  ReturnType<typeof getUploadAsset>
>["data"];
export type GetUploadAssetQueryResult<
  TData = GetUploadAssetDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetUploadAssetKey = "GetUploadAsset";
export const UseGetUploadAssetKeyFn = (
  clientOptions: Options<GetUploadAssetData, true>,
  queryKey?: Array<unknown>,
) => [useGetUploadAssetKey, ...(queryKey ?? [clientOptions])];
export type GetOrganizationListDefaultResponse = Awaited<
  ReturnType<typeof getOrganizationList>
>["data"];
export type GetOrganizationListQueryResult<
  TData = GetOrganizationListDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetOrganizationListKey = "GetOrganizationList";
export const UseGetOrganizationListKeyFn = (
  clientOptions: Options<unknown, true> = {},
  queryKey?: Array<unknown>,
) => [useGetOrganizationListKey, ...(queryKey ?? [clientOptions])];
export type GetOrganizationBySlugDefaultResponse = Awaited<
  ReturnType<typeof getOrganizationBySlug>
>["data"];
export type GetOrganizationBySlugQueryResult<
  TData = GetOrganizationBySlugDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetOrganizationBySlugKey = "GetOrganizationBySlug";
export const UseGetOrganizationBySlugKeyFn = (
  clientOptions: Options<GetOrganizationBySlugData, true>,
  queryKey?: Array<unknown>,
) => [useGetOrganizationBySlugKey, ...(queryKey ?? [clientOptions])];
export type GetOrganizationBySlugMemberListDefaultResponse = Awaited<
  ReturnType<typeof getOrganizationBySlugMemberList>
>["data"];
export type GetOrganizationBySlugMemberListQueryResult<
  TData = GetOrganizationBySlugMemberListDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetOrganizationBySlugMemberListKey =
  "GetOrganizationBySlugMemberList";
export const UseGetOrganizationBySlugMemberListKeyFn = (
  clientOptions: Options<GetOrganizationBySlugMemberListData, true>,
  queryKey?: Array<unknown>,
) => [useGetOrganizationBySlugMemberListKey, ...(queryKey ?? [clientOptions])];
export type GetOrganizationBySlugExchangeRateDefaultResponse = Awaited<
  ReturnType<typeof getOrganizationBySlugExchangeRate>
>["data"];
export type GetOrganizationBySlugExchangeRateQueryResult<
  TData = GetOrganizationBySlugExchangeRateDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useGetOrganizationBySlugExchangeRateKey =
  "GetOrganizationBySlugExchangeRate";
export const UseGetOrganizationBySlugExchangeRateKeyFn = (
  clientOptions: Options<GetOrganizationBySlugExchangeRateData, true>,
  queryKey?: Array<unknown>,
) => [
  useGetOrganizationBySlugExchangeRateKey,
  ...(queryKey ?? [clientOptions]),
];
export type PostOrganizationMutationResult = Awaited<
  ReturnType<typeof postOrganization>
>;
export const usePostOrganizationKey = "PostOrganization";
export const UsePostOrganizationKeyFn = (mutationKey?: Array<unknown>) => [
  usePostOrganizationKey,
  ...(mutationKey ?? []),
];
export type PostOrganizationBySlugMemberMutationResult = Awaited<
  ReturnType<typeof postOrganizationBySlugMember>
>;
export const usePostOrganizationBySlugMemberKey =
  "PostOrganizationBySlugMember";
export const UsePostOrganizationBySlugMemberKeyFn = (
  mutationKey?: Array<unknown>,
) => [usePostOrganizationBySlugMemberKey, ...(mutationKey ?? [])];
export type PostOrganizationBySlugExchangeRateUpdateMutationResult = Awaited<
  ReturnType<typeof postOrganizationBySlugExchangeRateUpdate>
>;
export const usePostOrganizationBySlugExchangeRateUpdateKey =
  "PostOrganizationBySlugExchangeRateUpdate";
export const UsePostOrganizationBySlugExchangeRateUpdateKeyFn = (
  mutationKey?: Array<unknown>,
) => [usePostOrganizationBySlugExchangeRateUpdateKey, ...(mutationKey ?? [])];
export type PostOrganizationBySlugExchangeRateUpdateFromApiMutationResult =
  Awaited<ReturnType<typeof postOrganizationBySlugExchangeRateUpdateFromApi>>;
export const usePostOrganizationBySlugExchangeRateUpdateFromApiKey =
  "PostOrganizationBySlugExchangeRateUpdateFromApi";
export const UsePostOrganizationBySlugExchangeRateUpdateFromApiKeyFn = (
  mutationKey?: Array<unknown>,
) => [
  usePostOrganizationBySlugExchangeRateUpdateFromApiKey,
  ...(mutationKey ?? []),
];
export type PatchUserMutationResult = Awaited<ReturnType<typeof patchUser>>;
export const usePatchUserKey = "PatchUser";
export const UsePatchUserKeyFn = (mutationKey?: Array<unknown>) => [
  usePatchUserKey,
  ...(mutationKey ?? []),
];
export type PatchOrganizationBySlugMutationResult = Awaited<
  ReturnType<typeof patchOrganizationBySlug>
>;
export const usePatchOrganizationBySlugKey = "PatchOrganizationBySlug";
export const UsePatchOrganizationBySlugKeyFn = (
  mutationKey?: Array<unknown>,
) => [usePatchOrganizationBySlugKey, ...(mutationKey ?? [])];
export type DeleteOrganizationBySlugMutationResult = Awaited<
  ReturnType<typeof deleteOrganizationBySlug>
>;
export const useDeleteOrganizationBySlugKey = "DeleteOrganizationBySlug";
export const UseDeleteOrganizationBySlugKeyFn = (
  mutationKey?: Array<unknown>,
) => [useDeleteOrganizationBySlugKey, ...(mutationKey ?? [])];
export type DeleteOrganizationBySlugMemberByIdMutationResult = Awaited<
  ReturnType<typeof deleteOrganizationBySlugMemberById>
>;
export const useDeleteOrganizationBySlugMemberByIdKey =
  "DeleteOrganizationBySlugMemberById";
export const UseDeleteOrganizationBySlugMemberByIdKeyFn = (
  mutationKey?: Array<unknown>,
) => [useDeleteOrganizationBySlugMemberByIdKey, ...(mutationKey ?? [])];
