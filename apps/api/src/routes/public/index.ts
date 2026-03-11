import { createRouter } from "@/app/create-app";
import * as organization from "./organization/by-slug";

const router = createRouter();

// PUBLIC ORGANIZATION
router.openapi(organization.route, organization.handle);

export default router;
