import crypto from "node:crypto";
import { ensureAuthSchema, getPool, publicUser } from "../_db.js";
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
    const { rows } = await getPool().query(
      `insert into rajatlas_users (id, name, email, password_hash)
       values ($1, $2, $3, $4)
       returning id, name, email, created_at, updated_at`,
      [id, name, email, passwordHash],
    );

    await createSession(res, id);
    return sendJson(res, 201, { user: publicUser(rows[0]) });
  } catch (error) {
    if (error?.code === "23505") {
      return sendJson(res, 409, { error: "An account already exists for this email." });
    }
    return handleApiError(res, error);
  }
}
