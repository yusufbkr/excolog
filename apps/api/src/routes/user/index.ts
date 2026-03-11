import { createRouter } from "@/app/create-app";

import * as userList from "./list";
import * as userUpdate from "./update";
import * as user from "./user";

const router = createRouter();

router.openapi(user.route, user.handle);
router.openapi(userList.route, userList.handle);
router.openapi(userUpdate.route, userUpdate.handle);

export default router;
