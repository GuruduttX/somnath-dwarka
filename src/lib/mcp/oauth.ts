import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from "crypto";
import { connectDB } from "@/src/lib/mongodb";

/*
  OAuth 2.1 for the /mcp/ connector (what claude.ai needs to add a custom
  connector): dynamic client registration, the authorization-code flow with
  PKCE (S256) and rotating refresh tokens. Signing in uses the admin panel's
  own username and password (ADMIN_USERNAME, ADMIN_PASSWORD); every code and
  token is stored only as an HMAC under MCP_AUTH_SECRET (JWT_SECRET when that
  is not set), so a database dump holds no live credential. Nothing here needs
  an environment variable the site lacks. Same design as the Vrindavan site.

  The site runs with `trailingSlash: true`. The connector itself answers at
  /mcp (src/proxy.ts exempts it, since MCP clients drop the slash and do not
  follow redirects) and /mcp/ alike; the OAuth endpoints are advertised with
  their trailing slash (/mcp/oauth/token/, ...), so no client is ever sent
  through a redirect. /.well-known/ paths are exempt from the slash rule.
*/

async function getDb() {
  const conn = await connectDB();
  const db = conn.connection.db;
  if (!db) throw new OAuthError("server_error", "The database is not connected.", 500);
  return db;
}

/** The value without the quotes some dotenv parsers leave around it (same as the admin login route). */
const readEnv = (key: string) => (process.env[key] ?? "").replace(/^(['"])(.*)\1$/, "$2");

const ACCESS_TTL = 60 * 60; // 1 hour
const REFRESH_TTL = 30 * 24 * 60 * 60; // 30 days
const PENDING_TTL = 10 * 60;
const CODE_TTL = 5 * 60;
const ALLOWED_REDIRECT_HOSTS = ["claude.ai", "claude.com", "localhost", "127.0.0.1"];

export class OAuthError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status = 400
  ) {
    super(message);
  }
}

export interface Client {
  client_id: string;
  client_secret_hash?: string;
  client_name?: string;
  redirect_uris: string[];
  grant_types: string[];
  response_types: string[];
  token_endpoint_auth_method: string;
  client_id_issued_at: number;
  createdAt: Date;
}
interface Pending {
  hash: string;
  clientId: string;
  clientName: string;
  redirectUri: string;
  codeChallenge: string;
  state?: string;
  scopes: string[];
  resource: string;
  expiresAt: Date;
}
type Code = Omit<Pending, "clientName" | "state">;
interface Token {
  hash: string;
  type: "access" | "refresh";
  clientId: string;
  scopes: string[];
  resource: string;
  expiresAt: Date;
  createdAt: Date;
}

/* ── Configuration ───────────────────────────────────────────────── */

/** MCP_ENABLED=false switches the connector off without a code change. */
export const mcpEnabled = () => (process.env.MCP_ENABLED ?? "true").trim().toLowerCase() !== "false";

/**
 * The public origin the connector is reached at. MCP_PUBLIC_URL wins when set;
 * otherwise it is read from the request (the proxy's forwarded host/proto).
 */
export function publicOrigin(req: Request): string {
  const fixed = process.env.MCP_PUBLIC_URL?.trim().replace(/\/+$/, "");
  if (fixed) return fixed;
  const url = new URL(req.url);
  const host = req.headers.get("x-forwarded-host")?.split(",")[0].trim() || req.headers.get("host") || url.host;
  const proto = req.headers.get("x-forwarded-proto")?.split(",")[0].trim() || url.protocol.replace(":", "");
  return `${proto}://${host}`;
}

/** The connector's URL, the one to paste into claude.ai (/mcp/ works too). */
export const resourceUrl = (origin: string) => `${origin}/mcp`;
/** An OAuth endpoint under /mcp/oauth/, with the site's trailing slash. */
export const oauthUrl = (origin: string, name: "authorize" | "token" | "register" | "revoke" | "login") => `${origin}/mcp/oauth/${name}/`;

function secret(): string {
  const s = readEnv("MCP_AUTH_SECRET") || readEnv("JWT_SECRET");
  if (!s || s.length < 16) throw new OAuthError("server_error", "MCP_AUTH_SECRET (or JWT_SECRET) must be set to at least 16 characters.", 500);
  return s;
}

export const randomToken = () => randomBytes(32).toString("base64url");
export const tokenHash = (token: string) => createHmac("sha256", secret()).update(`mcp:${token}`).digest("hex");
const sha256 = (s: string) => createHash("sha256").update(s).digest();
const safeEqual = (a: string, b: string) => timingSafeEqual(sha256(a), sha256(b));
const inSeconds = (s: number) => new Date(Date.now() + s * 1000);

/* ── Storage ─────────────────────────────────────────────────────── */

let indexes: Promise<unknown> | undefined;
async function collections() {
  const db = await getDb();
  const c = {
    clients: db.collection<Client>("mcp_oauth_clients"),
    pending: db.collection<Pending>("mcp_oauth_pending"),
    codes: db.collection<Code>("mcp_oauth_codes"),
    tokens: db.collection<Token>("mcp_oauth_tokens"),
  };
  indexes ??= Promise.all([
    c.clients.createIndex({ client_id: 1 }, { unique: true }),
    c.pending.createIndex({ hash: 1 }, { unique: true }),
    c.pending.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    c.codes.createIndex({ hash: 1 }, { unique: true }),
    c.codes.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    c.tokens.createIndex({ hash: 1 }, { unique: true }),
    c.tokens.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]).catch((err: unknown) => {
    indexes = undefined;
    throw err;
  });
  await indexes;
  return c;
}

/* ── Admin sign-in (same credentials as the admin panel) ────────── */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; first: number }>();

export function checkAdmin(ip: string, username: unknown, password: unknown): "ok" | "invalid" | "locked" | "unconfigured" {
  const adminUsername = readEnv("ADMIN_USERNAME");
  const adminPassword = readEnv("ADMIN_PASSWORD");
  if (!adminUsername || !adminPassword) return "unconfigured";
  const now = Date.now();
  const record = failures.get(ip);
  if (record && now - record.first < WINDOW_MS && record.count >= MAX_ATTEMPTS) return "locked";
  const u = typeof username === "string" ? username.trim() : "";
  const p = typeof password === "string" ? password : "";
  // Evaluate both so a wrong username takes as long as a wrong password.
  const ok = [safeEqual(u, adminUsername.trim()), safeEqual(p, adminPassword)].every(Boolean);
  if (ok) {
    failures.delete(ip);
    return "ok";
  }
  if (!record || now - record.first >= WINDOW_MS) failures.set(ip, { count: 1, first: now });
  else record.count += 1;
  return "invalid";
}

export const clientIp = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

/* ── Client registration (RFC 7591) ──────────────────────────────── */

function checkRedirect(raw: unknown): string {
  if (typeof raw !== "string") throw new OAuthError("invalid_redirect_uri", "Each redirect_uri must be a string.");
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new OAuthError("invalid_redirect_uri", `Invalid redirect_uri: ${raw}`);
  }
  const host = url.hostname.toLowerCase();
  const loopback = host === "localhost" || host === "127.0.0.1";
  if (!ALLOWED_REDIRECT_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) {
    throw new OAuthError("invalid_redirect_uri", `redirect_uri host is not allowed: ${host}`);
  }
  if (url.protocol !== "https:" && !(loopback && url.protocol === "http:")) throw new OAuthError("invalid_redirect_uri", "redirect_uri must use https.");
  return raw;
}

export async function registerClient(body: Record<string, unknown>) {
  const uris = Array.isArray(body.redirect_uris) ? body.redirect_uris.map(checkRedirect) : [];
  if (!uris.length) throw new OAuthError("invalid_redirect_uri", "At least one redirect_uri is required.");
  const method = typeof body.token_endpoint_auth_method === "string" ? body.token_endpoint_auth_method : "client_secret_basic";
  if (!["none", "client_secret_post", "client_secret_basic"].includes(method)) {
    throw new OAuthError("invalid_client_metadata", `Unsupported token_endpoint_auth_method: ${method}`);
  }
  const clientSecret = method === "none" ? undefined : randomToken();
  const client: Client = {
    client_id: randomUUID(),
    ...(clientSecret ? { client_secret_hash: tokenHash(clientSecret) } : {}),
    client_name: typeof body.client_name === "string" ? body.client_name.slice(0, 200) : undefined,
    redirect_uris: uris,
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    token_endpoint_auth_method: method,
    client_id_issued_at: Math.floor(Date.now() / 1000),
    createdAt: new Date(),
  };
  await (await collections()).clients.insertOne({ ...client });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { client_secret_hash: _h, createdAt: _c, ...publicInfo } = client;
  return { ...publicInfo, ...(clientSecret ? { client_secret: clientSecret, client_secret_expires_at: 0 } : {}) };
}

export async function getClient(clientId: string) {
  return (await collections()).clients.findOne({ client_id: clientId }, { projection: { _id: 0 } });
}

/** Checks the client's credentials at the token and revoke endpoints. */
export async function authenticateClient(clientId: unknown, clientSecret: unknown): Promise<Client> {
  if (typeof clientId !== "string" || !clientId) throw new OAuthError("invalid_client", "client_id is required.", 401);
  const client = await getClient(clientId);
  if (!client) throw new OAuthError("invalid_client", "Unknown client.", 401);
  if (client.client_secret_hash) {
    if (typeof clientSecret !== "string" || !safeEqual(tokenHash(clientSecret), client.client_secret_hash)) {
      throw new OAuthError("invalid_client", "Invalid client secret.", 401);
    }
  }
  return client;
}

/* ── Authorization ───────────────────────────────────────────────── */

/** Only this site's /mcp endpoint gets tokens; a client may name it (with or without the slash) or the bare origin. */
export function canonicalResource(resource: string | null, origin: string): string {
  if (!resource) return resourceUrl(origin);
  const trim = (u: string) => u.replace(/#.*$/, "").replace(/\/+$/, "");
  if (![trim(resourceUrl(origin)), trim(origin)].includes(trim(resource))) {
    throw new OAuthError("invalid_target", `This server only issues tokens for ${resourceUrl(origin)}`);
  }
  return resourceUrl(origin);
}

export async function startLogin(p: Omit<Pending, "hash" | "expiresAt">): Promise<string> {
  const pendingId = randomToken();
  await (await collections()).pending.insertOne({ ...p, hash: tokenHash(pendingId), expiresAt: inSeconds(PENDING_TTL) });
  return pendingId;
}

export async function findPending(pendingId: string) {
  if (!pendingId) return null;
  return (await collections()).pending.findOne({ hash: tokenHash(pendingId), expiresAt: { $gt: new Date() } });
}

export async function dropPending(hash: string) {
  await (await collections()).pending.deleteOne({ hash });
}

/** Turns a signed-in pending login into a one-time authorization code. */
export async function issueCode(login: Pending): Promise<string> {
  const { pending, codes } = await collections();
  await pending.deleteOne({ hash: login.hash });
  const code = randomToken();
  await codes.insertOne({
    hash: tokenHash(code),
    clientId: login.clientId,
    redirectUri: login.redirectUri,
    codeChallenge: login.codeChallenge,
    scopes: login.scopes,
    resource: login.resource,
    expiresAt: inSeconds(CODE_TTL),
  });
  return code;
}

/* ── Tokens ──────────────────────────────────────────────────────── */

async function issueTokens(clientId: string, scopes: string[], resource: string) {
  const access = randomToken();
  const refresh = randomToken();
  const now = new Date();
  await (await collections()).tokens.insertMany([
    { hash: tokenHash(access), type: "access", clientId, scopes, resource, createdAt: now, expiresAt: inSeconds(ACCESS_TTL) },
    { hash: tokenHash(refresh), type: "refresh", clientId, scopes, resource, createdAt: now, expiresAt: inSeconds(REFRESH_TTL) },
  ]);
  return {
    access_token: access,
    token_type: "Bearer",
    expires_in: ACCESS_TTL,
    refresh_token: refresh,
    ...(scopes.length ? { scope: scopes.join(" ") } : {}),
  };
}

const s256 = (verifier: string) => createHash("sha256").update(verifier).digest("base64url");

export async function exchangeCode(
  client: Client,
  code: string,
  verifier: string,
  redirectUri: string | undefined,
  resource: string | null,
  origin: string
) {
  if (!code || !verifier) throw new OAuthError("invalid_request", "code and code_verifier are required.");
  // Deleting on read makes every code single-use.
  const found = await (await collections()).codes.findOneAndDelete({
    hash: tokenHash(code),
    clientId: client.client_id,
    expiresAt: { $gt: new Date() },
  });
  if (!found) throw new OAuthError("invalid_grant", "Invalid or expired authorization code.");
  if (redirectUri && redirectUri !== found.redirectUri) throw new OAuthError("invalid_grant", "redirect_uri does not match.");
  if (!safeEqual(s256(verifier), found.codeChallenge)) throw new OAuthError("invalid_grant", "PKCE verification failed.");
  if (resource && canonicalResource(resource, origin) !== found.resource) throw new OAuthError("invalid_target", "resource does not match.");
  return issueTokens(client.client_id, found.scopes, found.resource);
}

export async function exchangeRefresh(client: Client, refreshToken: string, resource: string | null, origin: string) {
  if (!refreshToken) throw new OAuthError("invalid_request", "refresh_token is required.");
  // Rotation: the old refresh token dies the moment it is used.
  const old = await (await collections()).tokens.findOneAndDelete({
    hash: tokenHash(refreshToken),
    type: "refresh",
    clientId: client.client_id,
    expiresAt: { $gt: new Date() },
  });
  if (!old) throw new OAuthError("invalid_grant", "Invalid or expired refresh token.");
  if (resource && canonicalResource(resource, origin) !== old.resource) throw new OAuthError("invalid_target", "resource does not match.");
  return issueTokens(client.client_id, old.scopes, old.resource);
}

export async function revokeToken(client: Client, token: string) {
  if (token) await (await collections()).tokens.deleteOne({ hash: tokenHash(token), clientId: client.client_id });
}

/** The live access token's record, or null. Only tokens issued for this origin's /mcp/ count. */
export async function verifyAccessToken(token: string, origin: string) {
  if (!token) return null;
  const stored = await (await collections()).tokens.findOne({ hash: tokenHash(token), type: "access", expiresAt: { $gt: new Date() } });
  return stored && stored.resource === resourceUrl(origin) ? stored : null;
}
