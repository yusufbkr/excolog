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
export const prefetchUseGetPublicOrganizationBySlug = (
  queryClient: QueryClient,
  clientOptions: Options<GetPublicOrganizationBySlugData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetPublicOrganizationBySlugKeyFn(clientOptions),
    queryFn: () =>
      getPublicOrganizationBySlug({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const prefetchUseGetAssetsAvatar = (
  queryClient: QueryClient,
  clientOptions: Options<GetAssetsAvatarData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetAssetsAvatarKeyFn(clientOptions),
    queryFn: () =>
      getAssetsAvatar({ ...clientOptions }).then((response) => response.data),
  });
export const prefetchUseGetAssetsAsset = (
  queryClient: QueryClient,
  clientOptions: Options<GetAssetsAssetData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetAssetsAssetKeyFn(clientOptions),
    queryFn: () =>
      getAssetsAsset({ ...clientOptions }).then((response) => response.data),
  });
export const prefetchUseGetUser = (
  queryClient: QueryClient,
  clientOptions: Options<unknown, true> = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetUserKeyFn(clientOptions),
    queryFn: () =>
      getUser({ ...clientOptions }).then((response) => response.data),
  });
export const prefetchUseGetUserList = (
  queryClient: QueryClient,
  clientOptions: Options<GetUserListData, true> = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetUserListKeyFn(clientOptions),
    queryFn: () =>
      getUserList({ ...clientOptions }).then((response) => response.data),
  });
export const prefetchUseGetUploadAvatar = (
  queryClient: QueryClient,
  clientOptions: Options<GetUploadAvatarData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetUploadAvatarKeyFn(clientOptions),
    queryFn: () =>
      getUploadAvatar({ ...clientOptions }).then((response) => response.data),
  });
export const prefetchUseGetUploadAsset = (
  queryClient: QueryClient,
  clientOptions: Options<GetUploadAssetData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetUploadAssetKeyFn(clientOptions),
    queryFn: () =>
      getUploadAsset({ ...clientOptions }).then((response) => response.data),
  });
export const prefetchUseGetOrganizationList = (
  queryClient: QueryClient,
  clientOptions: Options<unknown, true> = {},
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetOrganizationListKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationList({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const prefetchUseGetOrganizationBySlug = (
  queryClient: QueryClient,
  clientOptions: Options<GetOrganizationBySlugData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetOrganizationBySlugKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationBySlug({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const prefetchUseGetOrganizationBySlugMemberList = (
  queryClient: QueryClient,
  clientOptions: Options<GetOrganizationBySlugMemberListData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetOrganizationBySlugMemberListKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationBySlugMemberList({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
export const prefetchUseGetOrganizationBySlugExchangeRate = (
  queryClient: QueryClient,
  clientOptions: Options<GetOrganizationBySlugExchangeRateData, true>,
) =>
  queryClient.prefetchQuery({
    queryKey: Common.UseGetOrganizationBySlugExchangeRateKeyFn(clientOptions),
    queryFn: () =>
      getOrganizationBySlugExchangeRate({ ...clientOptions }).then(
        (response) => response.data,
      ),
  });
