import { getPool, publicUser } from "../_db.js";
import {
  handleApiError,
  methodNotAllowed,
  normalizeEmail,
  readJson,
  requireUser,
  sendJson,
  verifyPassword,
} from "../_auth.js";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return methodNotAllowed(res);

  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const body = await readJson(req);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");

    if (!email || !email.includes("@")) {
      return sendJson(res, 400, { error: "Enter a valid email address." });
    }

    const current = await getUserWithPassword(user.id);
    const valid = current ? await verifyPassword(password, current.password_hash) : false;
    if (!valid) {
      return sendJson(res, 401, { error: "Current password is incorrect." });
    }

    const { rows } = await getPool().query(
      `update rajatlas_users
       set email = $1, updated_at = now()
       where id = $2
       returning id, name, email, created_at, updated_at`,
      [email, user.id],
    );

    return sendJson(res, 200, { user: publicUser(rows[0]) });
  } catch (error) {
    if (error?.code === "23505") {
      return sendJson(res, 409, { error: "This email is already in use." });
    }
    return handleApiError(res, error);
  }
}

async function getUserWithPassword(userId) {
  const { rows } = await getPool().query(
    `select id, password_hash from rajatlas_users where id = $1 limit 1`,
    [userId],
  );
  return rows[0];
}
