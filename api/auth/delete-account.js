import { getDb } from "../_db.js";
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
    const db = await getDb();
    const current = await db.collection("users").findOne({ _id: user.id });
    const valid = current ? await verifyPassword(password, current.passwordHash) : false;

    if (!valid) {
      return sendJson(res, 401, { error: "Current password is incorrect." });
    }

    await db.collection("users").deleteOne({ _id: user.id });
    await db.collection("sessions").deleteMany({ userId: user.id });
    await destroyCurrentSession(req, res);
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return handleApiError(res, error);
  }
}
