import { MongoClient } from "mongodb";

let schemaReady;
const MONGO_URI_ERROR = "MONGODB_URI is not configured.";

export async function getDb() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;
  if (!uri || !uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(MONGO_URI_ERROR);
  }

  if (!globalThis.__rajatlasMongoClientPromise) {
    const client = new MongoClient(uri, {
      appName: "RajAtlas",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: Number(process.env.MONGODB_TIMEOUT_MS || 8000),
    });
    globalThis.__rajatlasMongoClientPromise = client.connect().catch((error) => {
      globalThis.__rajatlasMongoClientPromise = null;
      throw error;
    });
  }

  const client = await globalThis.__rajatlasMongoClientPromise;
  return client.db(process.env.MONGODB_DB || process.env.MONGODB_DATABASE || "rajatlas");
}

export async function ensureAuthSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = await getDb();
      const existingCollections = await db
        .listCollections({}, { nameOnly: true })
        .toArray();
      const names = new Set(existingCollections.map((collection) => collection.name));

      if (!names.has("users")) {
        await db.createCollection("users");
      }
      if (!names.has("sessions")) {
        await db.createCollection("sessions");
      }

      await db.collection("users").createIndexes([
        { key: { email: 1 }, unique: true, name: "users_email_unique" },
      ]);
      await db.collection("sessions").createIndexes([
        { key: { userId: 1 }, name: "sessions_user_id" },
        { key: { tokenHash: 1 }, name: "sessions_token_hash" },
        { key: { expiresAt: 1 }, expireAfterSeconds: 0, name: "sessions_expiry_ttl" },
      ]);
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }

  return schemaReady;
}

export function publicUser(row) {
  if (!row) return null;

  return {
    id: row._id,
    name: row.name,
    email: row.email,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
