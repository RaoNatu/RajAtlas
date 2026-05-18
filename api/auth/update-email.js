import { getDb, publicUser } from "../_db.js";
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

    const db = await getDb();
    const current = await db.collection("users").findOne({ _id: user.id });
    const valid = current ? await verifyPassword(password, current.passwordHash) : false;
    if (!valid) {
      return sendJson(res, 401, { error: "Current password is incorrect." });
    }

    await db.collection("users").updateOne(
      { _id: user.id },
      { $set: { email, updatedAt: new Date() } },
    );
    const updatedUser = await db.collection("users").findOne({ _id: user.id });

    return sendJson(res, 200, { user: publicUser(updatedUser) });
  } catch (error) {
    if (error?.code === 11000) {
      return sendJson(res, 409, { error: "This email is already in use." });
    }
    return handleApiError(res, error);
  }
}
