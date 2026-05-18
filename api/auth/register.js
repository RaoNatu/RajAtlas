import crypto from "node:crypto";
import { ensureAuthSchema, getDb, publicUser } from "../_db.js";
import {
  createSession,
  handleApiError,
  hashPassword,
  methodNotAllowed,
  normalizeEmail,
  readJson,
  sendJson,
  validatePassword,
} from "../_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);

  try {
    await ensureAuthSchema();
    const body = await readJson(req);
    const name = String(body.name || "").trim();
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");

    if (!name || name.length < 2) {
      return sendJson(res, 400, { error: "Enter your name." });
    }
    if (!email || !email.includes("@")) {
      return sendJson(res, 400, { error: "Enter a valid email address." });
    }
    if (!validatePassword(password)) {
      return sendJson(res, 400, { error: "Use a password with at least 8 characters." });
    }

    const passwordHash = await hashPassword(password);
    const id = crypto.randomUUID();
    const user = {
      _id: id,
      name,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const db = await getDb();
    await db.collection("users").insertOne(user);

    await createSession(res, id);
    return sendJson(res, 201, { user: publicUser(user) });
  } catch (error) {
    if (error?.code === 11000) {
      return sendJson(res, 409, { error: "An account already exists for this email." });
    }
    return handleApiError(res, error);
  }
}
