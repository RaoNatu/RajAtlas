import {
  destroyCurrentSession,
  handleApiError,
  methodNotAllowed,
  sendJson,
} from "../_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res);

  try {
    await destroyCurrentSession(req, res);
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return handleApiError(res, error);
  }
}
