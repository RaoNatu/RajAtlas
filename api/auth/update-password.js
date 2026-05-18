import { getDb } from "../_db.js";
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

    const db = await getDb();
    const current = await db.collection("users").findOne({ _id: user.id });
    const valid = current
      ? await verifyPassword(currentPassword, current.passwordHash)
      : false;

    if (!valid) {
      return sendJson(res, 401, { error: "Current password is incorrect." });
    }

    await db.collection("users").updateOne(
      { _id: user.id },
      {
        $set: {
          passwordHash: await hashPassword(newPassword),
          updatedAt: new Date(),
        },
      },
    );

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return handleApiError(res, error);
  }
}
