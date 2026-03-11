import { createRouter } from "@/app/create-app";
import * as create from "./create";
import * as getBySlug from "./get-by-slug";
import * as list from "./list";
import * as memberCreate from "./member-create";
import * as memberDelete from "./member-delete";
import * as members from "./members";
import * as update from "./update";

import * as exchangeRateList from "./exchange-rate/list";
import * as exchangeRateUpdate from "./exchange-rate/update";
import * as exchangeRateUpdateFromApi from "./exchange-rate/update-from-api";

import * as deleteOrganization from "./delete";

const router = createRouter();

// Organization
router.openapi(list.route, list.handle);
router.openapi(deleteOrganization.route, deleteOrganization.handle);
router.openapi(create.route, create.handle);
router.openapi(getBySlug.route, getBySlug.handle);
router.openapi(update.route, update.handle);
router.openapi(members.route, members.handle);
router.openapi(memberCreate.route, memberCreate.handle);
router.openapi(memberDelete.route, memberDelete.handle);

// Exchange Rate
router.openapi(exchangeRateList.route, exchangeRateList.handle);
router.openapi(exchangeRateUpdate.route, exchangeRateUpdate.handle);
router.openapi(
  exchangeRateUpdateFromApi.route,
  exchangeRateUpdateFromApi.handle,
);

export default router;
