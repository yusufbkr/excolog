// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AssetService, OrganizationService, UserService } from "../requests/services.gen";
import * as Common from "./common";
export const useOrganizationServiceGetPBySlugOrganization = <TData = Common.OrganizationServiceGetPBySlugOrganizationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetPBySlugOrganizationKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getPBySlugOrganization({ slug }) as TData, ...options });
export const useOrganizationServiceGetOrganizationList = <TData = Common.OrganizationServiceGetOrganizationListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationListKeyFn(queryKey), queryFn: () => OrganizationService.getOrganizationList() as TData, ...options });
export const useOrganizationServiceGetOrganizationBySlug = <TData = Common.OrganizationServiceGetOrganizationBySlugDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getOrganizationBySlug({ slug }) as TData, ...options });
export const useOrganizationServiceGetOrganizationBySlugMemberList = <TData = Common.OrganizationServiceGetOrganizationBySlugMemberListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugMemberListKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getOrganizationBySlugMemberList({ slug }) as TData, ...options });
export const useOrganizationServiceGetOrganizationBySlugExchangeRate = <TData = Common.OrganizationServiceGetOrganizationBySlugExchangeRateDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ slug }: {
  slug: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugExchangeRateKeyFn({ slug }, queryKey), queryFn: () => OrganizationService.getOrganizationBySlugExchangeRate({ slug }) as TData, ...options });
export const useAssetServiceGetAssetsAvatar = <TData = Common.AssetServiceGetAssetsAvatarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ path }: {
  path: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetAssetsAvatarKeyFn({ path }, queryKey), queryFn: () => AssetService.getAssetsAvatar({ path }) as TData, ...options });
export const useAssetServiceGetAssetsAsset = <TData = Common.AssetServiceGetAssetsAssetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ path }: {
  path: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetAssetsAssetKeyFn({ path }, queryKey), queryFn: () => AssetService.getAssetsAsset({ path }) as TData, ...options });
export const useAssetServiceGetUploadAvatar = <TData = Common.AssetServiceGetUploadAvatarDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ filename }: {
  filename: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetUploadAvatarKeyFn({ filename }, queryKey), queryFn: () => AssetService.getUploadAvatar({ filename }) as TData, ...options });
export const useAssetServiceGetUploadAsset = <TData = Common.AssetServiceGetUploadAssetDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ filename }: {
  filename: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAssetServiceGetUploadAssetKeyFn({ filename }, queryKey), queryFn: () => AssetService.getUploadAsset({ filename }) as TData, ...options });
export const useUserServiceGetUser = <TData = Common.UserServiceGetUserDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserServiceGetUserKeyFn(queryKey), queryFn: () => UserService.getUser() as TData, ...options });
export const useUserServiceGetUserList = <TData = Common.UserServiceGetUserListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ search }: {
  search?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserServiceGetUserListKeyFn({ search }, queryKey), queryFn: () => UserService.getUserList({ search }) as TData, ...options });
export const useOrganizationServicePostOrganization = <TData = Common.OrganizationServicePostOrganizationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { name: string; slug: string; avatarUrl?: string; fairDescription?: string; fairLocation?: string; fairStartDate?: string; fairEndDate?: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { name: string; slug: string; avatarUrl?: string; fairDescription?: string; fairLocation?: string; fairStartDate?: string; fairEndDate?: string; };
}, TContext>({ mutationFn: ({ requestBody }) => OrganizationService.postOrganization({ requestBody }) as unknown as Promise<TData>, ...options });
export const useOrganizationServicePostOrganizationBySlugMember = <TData = Common.OrganizationServicePostOrganizationBySlugMemberMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { userId: string; };
  slug: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { userId: string; };
  slug: string;
}, TContext>({ mutationFn: ({ requestBody, slug }) => OrganizationService.postOrganizationBySlugMember({ requestBody, slug }) as unknown as Promise<TData>, ...options });
export const useOrganizationServicePostOrganizationBySlugExchangeRateUpdate = <TData = Common.OrganizationServicePostOrganizationBySlugExchangeRateUpdateMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { currency: "EUR" | "USD"; rate: number; };
  slug: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { currency: "EUR" | "USD"; rate: number; };
  slug: string;
}, TContext>({ mutationFn: ({ requestBody, slug }) => OrganizationService.postOrganizationBySlugExchangeRateUpdate({ requestBody, slug }) as unknown as Promise<TData>, ...options });
export const useOrganizationServicePostOrganizationBySlugExchangeRateUpdateFromApi = <TData = Common.OrganizationServicePostOrganizationBySlugExchangeRateUpdateFromApiMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  slug: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  slug: string;
}, TContext>({ mutationFn: ({ slug }) => OrganizationService.postOrganizationBySlugExchangeRateUpdateFromApi({ slug }) as unknown as Promise<TData>, ...options });
export const useOrganizationServicePatchOrganizationBySlug = <TData = Common.OrganizationServicePatchOrganizationBySlugMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { name?: string; slug?: string; avatarUrl?: string; };
  slug: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { name?: string; slug?: string; avatarUrl?: string; };
  slug: string;
}, TContext>({ mutationFn: ({ requestBody, slug }) => OrganizationService.patchOrganizationBySlug({ requestBody, slug }) as unknown as Promise<TData>, ...options });
export const useUserServicePatchUser = <TData = Common.UserServicePatchUserMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: { name?: string; username?: string; language?: string; avatarUrl?: string; address?: string; city?: string; country?: string; postalCode?: string; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: { name?: string; username?: string; language?: string; avatarUrl?: string; address?: string; city?: string; country?: string; postalCode?: string; };
}, TContext>({ mutationFn: ({ requestBody }) => UserService.patchUser({ requestBody }) as unknown as Promise<TData>, ...options });
export const useOrganizationServiceDeleteOrganizationBySlug = <TData = Common.OrganizationServiceDeleteOrganizationBySlugMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  slug: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  slug: string;
}, TContext>({ mutationFn: ({ slug }) => OrganizationService.deleteOrganizationBySlug({ slug }) as unknown as Promise<TData>, ...options });
export const useOrganizationServiceDeleteOrganizationBySlugMemberById = <TData = Common.OrganizationServiceDeleteOrganizationBySlugMemberByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: string;
  slug: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: string;
  slug: string;
}, TContext>({ mutationFn: ({ id, slug }) => OrganizationService.deleteOrganizationBySlugMemberById({ id, slug }) as unknown as Promise<TData>, ...options });
