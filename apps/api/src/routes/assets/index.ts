import { createRouter } from "@/app/create-app";

import * as asset from "./asset";
import * as avatar from "./avatar";

const router = createRouter();

router.openapi(avatar.route, avatar.handle);
router.openapi(asset.route, asset.handle);

export default router;
