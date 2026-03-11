// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AssetService, OrganizationService, UserService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseOrganizationServiceGetPBySlugOrganizationData = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseOrganizationServiceGetPBySlugOrganizationKeyFn({ slug }), queryFn: () => OrganizationService.getPBySlugOrganization({ slug }) });
export const ensureUseOrganizationServiceGetOrganizationListData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseOrganizationServiceGetOrganizationListKeyFn(), queryFn: () => OrganizationService.getOrganizationList() });
export const ensureUseOrganizationServiceGetOrganizationBySlugData = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugKeyFn({ slug }), queryFn: () => OrganizationService.getOrganizationBySlug({ slug }) });
export const ensureUseOrganizationServiceGetOrganizationBySlugMemberListData = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugMemberListKeyFn({ slug }), queryFn: () => OrganizationService.getOrganizationBySlugMemberList({ slug }) });
export const ensureUseOrganizationServiceGetOrganizationBySlugExchangeRateData = (queryClient: QueryClient, { slug }: {
  slug: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseOrganizationServiceGetOrganizationBySlugExchangeRateKeyFn({ slug }), queryFn: () => OrganizationService.getOrganizationBySlugExchangeRate({ slug }) });
export const ensureUseAssetServiceGetAssetsAvatarData = (queryClient: QueryClient, { path }: {
  path: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAssetServiceGetAssetsAvatarKeyFn({ path }), queryFn: () => AssetService.getAssetsAvatar({ path }) });
export const ensureUseAssetServiceGetAssetsAssetData = (queryClient: QueryClient, { path }: {
  path: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAssetServiceGetAssetsAssetKeyFn({ path }), queryFn: () => AssetService.getAssetsAsset({ path }) });
export const ensureUseAssetServiceGetUploadAvatarData = (queryClient: QueryClient, { filename }: {
  filename: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAssetServiceGetUploadAvatarKeyFn({ filename }), queryFn: () => AssetService.getUploadAvatar({ filename }) });
export const ensureUseAssetServiceGetUploadAssetData = (queryClient: QueryClient, { filename }: {
  filename: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseAssetServiceGetUploadAssetKeyFn({ filename }), queryFn: () => AssetService.getUploadAsset({ filename }) });
export const ensureUseUserServiceGetUserData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUserServiceGetUserKeyFn(), queryFn: () => UserService.getUser() });
export const ensureUseUserServiceGetUserListData = (queryClient: QueryClient, { search }: {
  search?: string;
} = {}) => queryClient.ensureQueryData({ queryKey: Common.UseUserServiceGetUserListKeyFn({ search }), queryFn: () => UserService.getUserList({ search }) });
