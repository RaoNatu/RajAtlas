import { ensureAuthSchema, getPool, publicUser } from "../_db.js";
import {
  createSession,
  handleApiError,
  methodNotAllowed,
  normalizeEmail,
  readJson,
  sendJson,
  verifyPassword,
} from "../_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);

  try {
    await ensureAuthSchema();
    const body = await readJson(req);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");

    const { rows } = await getPool().query(
      `select id, name, email, password_hash, created_at, updated_at
       from rajatlas_users
       where email = $1
       limit 1`,
      [email],
    );
    const user = rows[0];
    const valid = user ? await verifyPassword(password, user.password_hash) : false;

    if (!valid) {
      return sendJson(res, 401, { error: "Email or password is incorrect." });
    }

    await createSession(res, user.id);
    return sendJson(res, 200, { user: publicUser(user) });
  } catch (error) {
    return handleApiError(res, error);
  }
}
