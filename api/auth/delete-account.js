import { getPool } from "../_db.js";
import {
  destroyCurrentSession,
  handleApiError,
  methodNotAllowed,
  readJson,
  requireUser,
  sendJson,
  verifyPassword,
} from "../_auth.js";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return methodNotAllowed(res);

  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const body = await readJson(req);
    const password = String(body.password || "");
    const { rows } = await getPool().query(
      `select password_hash from rajatlas_users where id = $1 limit 1`,
      [user.id],
    );
    const valid = rows[0] ? await verifyPassword(password, rows[0].password_hash) : false;

    if (!valid) {
      return sendJson(res, 401, { error: "Current password is incorrect." });
    }

    await getPool().query("delete from rajatlas_users where id = $1", [user.id]);
    await destroyCurrentSession(req, res);
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return handleApiError(res, error);
  }
}
