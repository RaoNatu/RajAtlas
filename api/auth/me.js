import { getCurrentUser, handleApiError, methodNotAllowed, sendJson } from "../_auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res);

  try {
    const user = await getCurrentUser(req);
    if (!user) return sendJson(res, 401, { user: null });
    return sendJson(res, 200, { user });
  } catch (error) {
    return handleApiError(res, error);
  }
}
