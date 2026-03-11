// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AssetService, OrganizationService, UserService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseOrganizationServiceGetPBySlugOrganization = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseOrganizationServiceGetPBySlugOrganizationKeyFn({ slug }), queryFn: () => OrganizationService.getPBySlugOrganization({ slug }) });
export const prefetchUseOrganizationServiceGetOrganizationList = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseOrganizationServiceGetOrganizationListKeyFn(), queryFn: () => OrganizationService.getOrganizationList() });
export const prefetchUseOrganizationServiceGetOrganizationBySlug = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugKeyFn({ slug }), queryFn: () => OrganizationService.getOrganizationBySlug({ slug }) });
export const prefetchUseOrganizationServiceGetOrganizationBySlugMemberList = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugMemberListKeyFn({ slug }), queryFn: () => OrganizationService.getOrganizationBySlugMemberList({ slug }) });
export const prefetchUseOrganizationServiceGetOrganizationBySlugExchangeRate = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugExchangeRateKeyFn({ slug }), queryFn: () => OrganizationService.getOrganizationBySlugExchangeRate({ slug }) });
export const prefetchUseAssetServiceGetAssetsAvatar = (queryClient: QueryClient, { path }: {
  path: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAssetServiceGetAssetsAvatarKeyFn({ path }), queryFn: () => AssetService.getAssetsAvatar({ path }) });
export const prefetchUseAssetServiceGetAssetsAsset = (queryClient: QueryClient, { path }: {
  path: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAssetServiceGetAssetsAssetKeyFn({ path }), queryFn: () => AssetService.getAssetsAsset({ path }) });
export const prefetchUseAssetServiceGetUploadAvatar = (queryClient: QueryClient, { filename }: {
  filename: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAssetServiceGetUploadAvatarKeyFn({ filename }), queryFn: () => AssetService.getUploadAvatar({ filename }) });
export const prefetchUseAssetServiceGetUploadAsset = (queryClient: QueryClient, { filename }: {
  filename: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAssetServiceGetUploadAssetKeyFn({ filename }), queryFn: () => AssetService.getUploadAsset({ filename }) });
export const prefetchUseUserServiceGetUser = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUserServiceGetUserKeyFn(), queryFn: () => UserService.getUser() });
export const prefetchUseUserServiceGetUserList = (queryClient: QueryClient, { search }: {
  search?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UseUserServiceGetUserListKeyFn({ search }), queryFn: () => UserService.getUserList({ search }) });
