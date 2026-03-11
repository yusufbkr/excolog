import type { DB } from "./generated/kysely/index.js";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

// 🌱 Seed mode kontrolü (--seed flag, SEED_MODE env var, veya seed script dosya adı)
const isSeedMode =
  process.argv.includes("--seed") ||
  process.env.SEED_MODE === "true" ||
  process.argv[1]?.includes("seed") === true;

// 🔁 Tek instance garantisi için global referans (sadece dev modda aktif)
const globalForDb = globalThis as { db?: Kysely<DB> };

// 🧩 Pool config (ortak)
const createPool = () =>
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DATABASE_POOL_MAX ?? 50),
    min: Number(process.env.DATABASE_POOL_MIN ?? 5),
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
    allowExitOnIdle: false,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
  });

// 🧩 Seed Pool config (DIRECT_URL kullanır, PgBouncer'ı bypass eder)
const createSeedPool = () => {
  const connectionString =
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL?.replace(":6543", ":5432").replace(
      "?pgbouncer=true",
      "",
    );

  console.log("🔌 Seed connected");

  return new Pool({
    connectionString,
    max: 5,
    min: 1,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
  });
};

// ⚙️ Pool instance
const pool = createPool();

// 🧱 Kysely instance
const kysely = new Kysely<DB>({
  dialect: new PostgresDialect({ pool }),
});

// 🌱 Seed mode için özel db instance
let seedKysely: Kysely<DB> | null = null;
if (isSeedMode) {
  const seedPool = createSeedPool();
  seedKysely = new Kysely<DB>({
    dialect: new PostgresDialect({ pool: seedPool }),
  });
  console.log("🌱 Using seed PostgreSQL connection (DIRECT_URL)");
}

// 💾 Dev modda tekil instance koruma
if (process.env.NODE_ENV === "development" && !isSeedMode) {
  if (!globalForDb.db) {
    globalForDb.db = kysely;
    console.log("✅ Using new PostgreSQL connection (dev)");
  } else {
    console.log("♻️ Reusing existing PostgreSQL connection (dev)");
  }
}

// 🧹 Graceful shutdown (sadece production'da ve seed mode değilse)
if (process.env.NODE_ENV === "production" && !isSeedMode) {
  const closePool = async (signal: string) => {
    console.log(`Received ${signal}. Closing PostgreSQL pool...`);
    await pool.end();
    process.exit(0);
  };

  process.once("SIGINT", () => closePool("SIGINT"));
  process.once("SIGTERM", () => closePool("SIGTERM"));
}

// ⚠️ Pool error handling
pool.on("error", (err) => {
  console.error("⚠️ Unexpected error on idle PostgreSQL client:", err);
});

// 📊 (Opsiyonel) Bağlantı loglama (yalnızca dev)
if (process.env.NODE_ENV === "development" && !isSeedMode) {
  let lastLog = 0;
  pool.on("connect", () => {
    const now = Date.now();
    if (now - lastLog > 5000) {
      console.log(`🔌 Active connections: ${pool.totalCount}`);
      lastLog = now;
    }
  });
}

// 🚀 Export db instance (seed mode ise seedDb, değilse normal db)
export const db =
  isSeedMode && seedKysely
    ? seedKysely
    : process.env.NODE_ENV === "development" && globalForDb.db
      ? globalForDb.db
      : kysely;
