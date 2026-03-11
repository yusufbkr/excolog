import dotenv from "dotenv";
import { expand } from "dotenv-expand";

const envResult = dotenv.config();
expand(envResult);

if (process.env.NODE_ENV === "development") {
  console.log("📁 .env loaded:", envResult.parsed ? "Yes" : "No");
  console.log("🔗 DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "Undefined");
}
