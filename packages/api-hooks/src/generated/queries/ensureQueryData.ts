// generated with @7nohe/openapi-react-query-codegen@2.0.0

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
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
  GetAssetsAvatarData,
  GetOrganizationBySlugData,
  GetOrganizationBySlugExchangeRateData,
  GetOrganizationBySlugMemberListData,
  GetPublicOrganizationBySlugData,
  GetUploadAssetData,
  GetUploadAvatarData,
  GetUserListData,
} from "../requests/types.gen";
import * as Common from "./common";
export const ensureUseGetPublicOrganizationBySlugData = (
  queryClient: QueryClient,
  clientOptions: Options<GetPublicOrganizationBySlugData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetPublicOrganizationBySlugKeyFn(clientOptions),
    queryFn: () =>
      getPublicOrganizationBySlug({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const ensureUseGetAssetsAvatarData = (
  queryClient: QueryClient,
  clientOptions: Options<GetAssetsAvatarData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetAssetsAvatarKeyFn(clientOptions),
    queryFn: () =>
      getAssetsAvatar({ ...clientOptions }).then((response) => response.data),
  });
export const ensureUseGetAssetsAssetData = (
  queryClient: QueryClient,
  clientOptions: Options<GetAssetsAssetData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetAssetsAssetKeyFn(clientOptions),
    queryFn: () =>
      getAssetsAsset({ ...clientOptions }).then((response) => response.data),
  });
export const ensureUseGetUserData = (
  queryClient: QueryClient,
  clientOptions: Options<unknown, true> = {},
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetUserKeyFn(clientOptions),
    queryFn: () =>
      getUser({ ...clientOptions }).then((response) => response.data),
  });
export const ensureUseGetUserListData = (
  queryClient: QueryClient,
  clientOptions: Options<GetUserListData, true> = {},
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetUserListKeyFn(clientOptions),
    queryFn: () =>
      getUserList({ ...clientOptions }).then((response) => response.data),
  });
export const ensureUseGetUploadAvatarData = (
  queryClient: QueryClient,
  clientOptions: Options<GetUploadAvatarData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetUploadAvatarKeyFn(clientOptions),
    queryFn: () =>
      getUploadAvatar({ ...clientOptions }).then((response) => response.data),
  });
export const ensureUseGetUploadAssetData = (
  queryClient: QueryClient,
  clientOptions: Options<GetUploadAssetData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetUploadAssetKeyFn(clientOptions),
    queryFn: () =>
      getUploadAsset({ ...clientOptions }).then((response) => response.data),
  });
export const ensureUseGetOrganizationListData = (
  queryClient: QueryClient,
  clientOptions: Options<unknown, true> = {},
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetOrganizationListKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationList({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const ensureUseGetOrganizationBySlugData = (
  queryClient: QueryClient,
  clientOptions: Options<GetOrganizationBySlugData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetOrganizationBySlugKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationBySlug({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const ensureUseGetOrganizationBySlugMemberListData = (
  queryClient: QueryClient,
  clientOptions: Options<GetOrganizationBySlugMemberListData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetOrganizationBySlugMemberListKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationBySlugMemberList({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const ensureUseGetOrganizationBySlugExchangeRateData = (
  queryClient: QueryClient,
  clientOptions: Options<GetOrganizationBySlugExchangeRateData, true>,
) =>
  queryClient.ensureQueryData({
    queryKey: Common.UseGetOrganizationBySlugExchangeRateKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationBySlugExchangeRate({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
