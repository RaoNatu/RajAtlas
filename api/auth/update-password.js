import { getPool } from "../_db.js";
import {
  handleApiError,
  hashPassword,
  methodNotAllowed,
  readJson,
  requireUser,
  sendJson,
  validatePassword,
  verifyPassword,
} from "../_auth.js";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return methodNotAllowed(res);

  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const body = await readJson(req);
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");

    if (!validatePassword(newPassword)) {
      return sendJson(res, 400, { error: "Use a new password with at least 8 characters." });
    }

    const { rows } = await getPool().query(
      `select password_hash from rajatlas_users where id = $1 limit 1`,
      [user.id],
    );
    const valid = rows[0]
      ? await verifyPassword(currentPassword, rows[0].password_hash)
      : false;

    if (!valid) {
      return sendJson(res, 401, { error: "Current password is incorrect." });
    }

    await getPool().query(
      `update rajatlas_users
       set password_hash = $1, updated_at = now()
       where id = $2`,
      [await hashPassword(newPassword), user.id],
    );

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return handleApiError(res, error);
  }
}
