import pg from "pg";

const { Pool } = pg;

let schemaReady;

export function getPool() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalThis.__rajatlasPool) {
    globalThis.__rajatlasPool = new Pool({
      connectionString,
      ssl:
        process.env.PGSSL === "false"
          ? false
          : { rejectUnauthorized: false },
    });
  }

  return globalThis.__rajatlasPool;
}

export async function ensureAuthSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const pool = getPool();
      await pool.query(`
        create table if not exists rajatlas_users (
          id text primary key,
          name text not null,
          email text not null unique,
          password_hash text not null,
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        );
      `);
      await pool.query(`
        create table if not exists rajatlas_sessions (
          id text primary key,
          user_id text not null references rajatlas_users(id) on delete cascade,
          token_hash text not null,
          expires_at timestamptz not null,
          created_at timestamptz not null default now()
        );
      `);
      await pool.query(`
        create index if not exists rajatlas_sessions_user_id_idx
        on rajatlas_sessions(user_id);
      `);
    })();
  }

  return schemaReady;
}

export function publicUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
