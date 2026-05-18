import { ensureAuthSchema, getDb, publicUser } from "../_db.js";
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

    const db = await getDb();
    const user = await db.collection("users").findOne({ email });
    const valid = user ? await verifyPassword(password, user.passwordHash) : false;

    if (!valid) {
      return sendJson(res, 401, { error: "Email or password is incorrect." });
    }

    await createSession(res, user._id);
    return sendJson(res, 200, { user: publicUser(user) });
  } catch (error) {
    return handleApiError(res, error);
  }
}
