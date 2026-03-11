// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryResult } from "@tanstack/react-query";
import { AssetService, OrganizationService, UserService } from "../requests/services.gen";
export type OrganizationServiceGetPBySlugOrganizationDefaultResponse = Awaited<ReturnType<typeof OrganizationService.getPBySlugOrganization>>;
export type OrganizationServiceGetPBySlugOrganizationQueryResult<TData = OrganizationServiceGetPBySlugOrganizationDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useOrganizationServiceGetPBySlugOrganizationKey = "OrganizationServiceGetPBySlugOrganization";
export const UseOrganizationServiceGetPBySlugOrganizationKeyFn = ({ slug }: {
  slug: string;
}, queryKey?: Array<unknown>) => [useOrganizationServiceGetPBySlugOrganizationKey, ...(queryKey ?? [{ slug }])];
export type OrganizationServiceGetOrganizationListDefaultResponse = Awaited<ReturnType<typeof OrganizationService.getOrganizationList>>;
export type OrganizationServiceGetOrganizationListQueryResult<TData = OrganizationServiceGetOrganizationListDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useOrganizationServiceGetOrganizationListKey = "OrganizationServiceGetOrganizationList";
export const UseOrganizationServiceGetOrganizationListKeyFn = (queryKey?: Array<unknown>) => [useOrganizationServiceGetOrganizationListKey, ...(queryKey ?? [])];
export type OrganizationServiceGetOrganizationBySlugDefaultResponse = Awaited<ReturnType<typeof OrganizationService.getOrganizationBySlug>>;
export type OrganizationServiceGetOrganizationBySlugQueryResult<TData = OrganizationServiceGetOrganizationBySlugDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useOrganizationServiceGetOrganizationBySlugKey = "OrganizationServiceGetOrganizationBySlug";
export const UseOrganizationServiceGetOrganizationBySlugKeyFn = ({ slug }: {
  slug: string;
}, queryKey?: Array<unknown>) => [useOrganizationServiceGetOrganizationBySlugKey, ...(queryKey ?? [{ slug }])];
export type OrganizationServiceGetOrganizationBySlugMemberListDefaultResponse = Awaited<ReturnType<typeof OrganizationService.getOrganizationBySlugMemberList>>;
export type OrganizationServiceGetOrganizationBySlugMemberListQueryResult<TData = OrganizationServiceGetOrganizationBySlugMemberListDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useOrganizationServiceGetOrganizationBySlugMemberListKey = "OrganizationServiceGetOrganizationBySlugMemberList";
export const UseOrganizationServiceGetOrganizationBySlugMemberListKeyFn = ({ slug }: {
  slug: string;
}, queryKey?: Array<unknown>) => [useOrganizationServiceGetOrganizationBySlugMemberListKey, ...(queryKey ?? [{ slug }])];
export type OrganizationServiceGetOrganizationBySlugExchangeRateDefaultResponse = Awaited<ReturnType<typeof OrganizationService.getOrganizationBySlugExchangeRate>>;
export type OrganizationServiceGetOrganizationBySlugExchangeRateQueryResult<TData = OrganizationServiceGetOrganizationBySlugExchangeRateDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useOrganizationServiceGetOrganizationBySlugExchangeRateKey = "OrganizationServiceGetOrganizationBySlugExchangeRate";
export const UseOrganizationServiceGetOrganizationBySlugExchangeRateKeyFn = ({ slug }: {
  slug: string;
}, queryKey?: Array<unknown>) => [useOrganizationServiceGetOrganizationBySlugExchangeRateKey, ...(queryKey ?? [{ slug }])];
export type AssetServiceGetAssetsAvatarDefaultResponse = Awaited<ReturnType<typeof AssetService.getAssetsAvatar>>;
export type AssetServiceGetAssetsAvatarQueryResult<TData = AssetServiceGetAssetsAvatarDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAssetServiceGetAssetsAvatarKey = "AssetServiceGetAssetsAvatar";
export const UseAssetServiceGetAssetsAvatarKeyFn = ({ path }: {
  path: string;
}, queryKey?: Array<unknown>) => [useAssetServiceGetAssetsAvatarKey, ...(queryKey ?? [{ path }])];
export type AssetServiceGetAssetsAssetDefaultResponse = Awaited<ReturnType<typeof AssetService.getAssetsAsset>>;
export type AssetServiceGetAssetsAssetQueryResult<TData = AssetServiceGetAssetsAssetDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAssetServiceGetAssetsAssetKey = "AssetServiceGetAssetsAsset";
export const UseAssetServiceGetAssetsAssetKeyFn = ({ path }: {
  path: string;
}, queryKey?: Array<unknown>) => [useAssetServiceGetAssetsAssetKey, ...(queryKey ?? [{ path }])];
export type AssetServiceGetUploadAvatarDefaultResponse = Awaited<ReturnType<typeof AssetService.getUploadAvatar>>;
export type AssetServiceGetUploadAvatarQueryResult<TData = AssetServiceGetUploadAvatarDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAssetServiceGetUploadAvatarKey = "AssetServiceGetUploadAvatar";
export const UseAssetServiceGetUploadAvatarKeyFn = ({ filename }: {
  filename: string;
}, queryKey?: Array<unknown>) => [useAssetServiceGetUploadAvatarKey, ...(queryKey ?? [{ filename }])];
export type AssetServiceGetUploadAssetDefaultResponse = Awaited<ReturnType<typeof AssetService.getUploadAsset>>;
export type AssetServiceGetUploadAssetQueryResult<TData = AssetServiceGetUploadAssetDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAssetServiceGetUploadAssetKey = "AssetServiceGetUploadAsset";
export const UseAssetServiceGetUploadAssetKeyFn = ({ filename }: {
  filename: string;
}, queryKey?: Array<unknown>) => [useAssetServiceGetUploadAssetKey, ...(queryKey ?? [{ filename }])];
export type UserServiceGetUserDefaultResponse = Awaited<ReturnType<typeof UserService.getUser>>;
export type UserServiceGetUserQueryResult<TData = UserServiceGetUserDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceGetUserKey = "UserServiceGetUser";
export const UseUserServiceGetUserKeyFn = (queryKey?: Array<unknown>) => [useUserServiceGetUserKey, ...(queryKey ?? [])];
export type UserServiceGetUserListDefaultResponse = Awaited<ReturnType<typeof UserService.getUserList>>;
export type UserServiceGetUserListQueryResult<TData = UserServiceGetUserListDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceGetUserListKey = "UserServiceGetUserList";
export const UseUserServiceGetUserListKeyFn = ({ search }: {
  search?: string;
} = {}, queryKey?: Array<unknown>) => [useUserServiceGetUserListKey, ...(queryKey ?? [{ search }])];
export type OrganizationServicePostOrganizationMutationResult = Awaited<ReturnType<typeof OrganizationService.postOrganization>>;
export type OrganizationServicePostOrganizationBySlugMemberMutationResult = Awaited<ReturnType<typeof OrganizationService.postOrganizationBySlugMember>>;
export type OrganizationServicePostOrganizationBySlugExchangeRateUpdateMutationResult = Awaited<ReturnType<typeof OrganizationService.postOrganizationBySlugExchangeRateUpdate>>;
export type OrganizationServicePostOrganizationBySlugExchangeRateUpdateFromApiMutationResult = Awaited<ReturnType<typeof OrganizationService.postOrganizationBySlugExchangeRateUpdateFromApi>>;
export type OrganizationServicePatchOrganizationBySlugMutationResult = Awaited<ReturnType<typeof OrganizationService.patchOrganizationBySlug>>;
export type UserServicePatchUserMutationResult = Awaited<ReturnType<typeof UserService.patchUser>>;
export type OrganizationServiceDeleteOrganizationBySlugMutationResult = Awaited<ReturnType<typeof OrganizationService.deleteOrganizationBySlug>>;
export type OrganizationServiceDeleteOrganizationBySlugMemberByIdMutationResult = Awaited<ReturnType<typeof OrganizationService.deleteOrganizationBySlugMemberById>>;
