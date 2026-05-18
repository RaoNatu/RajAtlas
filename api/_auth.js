import crypto from "node:crypto";
import { ensureAuthSchema, getPool, publicUser } from "./_db.js";

const SESSION_COOKIE = "rajatlas_session";
const SESSION_DAYS = 30;
const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;

export async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

export function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

export function methodNotAllowed(res) {
  sendJson(res, 405, { error: "Method not allowed." });
}

export function handleApiError(res, error) {
  if (error?.message === "DATABASE_URL is not configured.") {
    sendJson(res, 503, {
      error: "Authentication database is not configured.",
    });
    return;
  }

  console.error(error);
  sendJson(res, 500, { error: "Something went wrong. Please try again." });
}

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function validatePassword(password) {
  return typeof password === "string" && password.length >= 8;
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await scrypt(password, salt);
  return `scrypt:${salt}:${hash}`;
}

export async function verifyPassword(password, storedHash) {
  const [algorithm, salt, hash] = String(storedHash || "").split(":");
  if (algorithm !== "scrypt" || !salt || !hash) return false;
  const candidate = await scrypt(password, salt);
  const candidateBuffer = Buffer.from(candidate, "hex");
  const hashBuffer = Buffer.from(hash, "hex");
  return (
    candidateBuffer.length === hashBuffer.length &&
    crypto.timingSafeEqual(candidateBuffer, hashBuffer)
  );
}

export async function createSession(res, userId) {
  await ensureAuthSchema();

  const pool = getPool();
  const id = crypto.randomUUID();
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

  await pool.query(
    `insert into rajatlas_sessions (id, user_id, token_hash, expires_at)
     values ($1, $2, $3, $4)`,
    [id, userId, tokenHash, expiresAt],
  );

  res.setHeader("Set-Cookie", buildCookie(`${id}.${token}`, SESSION_MAX_AGE));
}

export async function getCurrentUser(req) {
  await ensureAuthSchema();

  const sessionValue = parseCookies(req.headers.cookie || "")[SESSION_COOKIE];
  if (!sessionValue) return null;

  const [sessionId, token] = sessionValue.split(".");
  if (!sessionId || !token) return null;

  const { rows } = await getPool().query(
    `select u.*
     from rajatlas_sessions s
     join rajatlas_users u on u.id = s.user_id
     where s.id = $1
       and s.expires_at > now()
       and s.token_hash = $2
     limit 1`,
    [sessionId, hashSessionToken(token)],
  );

  return publicUser(rows[0]);
}

export async function requireUser(req, res) {
  const user = await getCurrentUser(req);
  if (!user) {
    sendJson(res, 401, { error: "Please sign in to continue." });
    return null;
  }
  return user;
}

export async function destroyCurrentSession(req, res) {
  await ensureAuthSchema();

  const sessionValue = parseCookies(req.headers.cookie || "")[SESSION_COOKIE];
  const [sessionId] = String(sessionValue || "").split(".");
  if (sessionId) {
    await getPool().query("delete from rajatlas_sessions where id = $1", [sessionId]);
  }

  res.setHeader("Set-Cookie", buildCookie("", 0));
}

function scrypt(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey.toString("hex"));
    });
  });
}

function hashSessionToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function parseCookies(cookieHeader) {
  return cookieHeader.split(";").reduce((cookies, item) => {
    const [key, ...valueParts] = item.trim().split("=");
    if (!key) return cookies;
    cookies[key] = decodeURIComponent(valueParts.join("="));
    return cookies;
  }, {});
}

function buildCookie(value, maxAge) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(value)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`;
}
