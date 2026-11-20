export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Headers for every HTML page served under /mcp/: no framing, no scripts, no caching. */
export const PAGE_HEADERS: Record<string, string> = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  // form-action is left out on purpose: the login form redirects to claude.ai,
  // and browsers apply form-action to that redirect too.
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
};

export const htmlResponse = (html: string, status = 200) => new Response(html, { status, headers: PAGE_HEADERS });

const STYLE = `
  :root { color-scheme: light dark; --bg:#f6f5f2; --card:#fff; --text:#1d1b18; --muted:#6b665e; --line:#dcd8d0; --accent:#ea580c; --err:#b42318; }
  @media (prefers-color-scheme: dark) { :root { --bg:#161514; --card:#211f1d; --text:#f1eee8; --muted:#a39d93; --line:#3a3734; --accent:#f97316; --err:#f97066; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:16px; background:var(--bg); color:var(--text); font:16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { width:100%; max-width:400px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:28px 24px; }
  h1 { font-size:20px; margin:0 0 8px; }
  p { margin:0 0 16px; color:var(--muted); }
  strong { color:var(--text); }
  label { display:block; font-size:14px; font-weight:600; margin:14px 0 6px; }
  input { width:100%; padding:10px 12px; font:inherit; color:inherit; background:transparent; border:1px solid var(--line); border-radius:8px; }
  input:focus { outline:2px solid var(--accent); outline-offset:1px; }
  .row { display:flex; gap:10px; margin-top:22px; }
  button { flex:1; padding:11px 14px; font:inherit; font-weight:600; border-radius:8px; cursor:pointer; border:1px solid var(--line); background:transparent; color:inherit; }
  button.primary { background:var(--accent); border-color:var(--accent); color:#fff; }
  .error { color:var(--err); font-weight:600; margin:0 0 12px; }
  .small { font-size:13px; margin-top:18px; margin-bottom:0; }
`;

export function page(title: string, body: string, extraStyle = ""): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title><style>${STYLE}${extraStyle}</style></head><body><main>${body}</main></body></html>`;
}

export function renderLoginPage(opts: { pendingId: string; clientName: string; redirectHost: string; error?: string }): string {
  return page(
    "CMS sign in",
    `<h1>Sign in to the Somnath Dwarka Tour Package CMS</h1>
<p><strong>${esc(opts.clientName)}</strong> wants to read and edit this website's content. Sign in with the same username and password as the admin panel.</p>
${opts.error ? `<p class="error" role="alert">${esc(opts.error)}</p>` : ""}
<form method="post" action="/mcp/oauth/login/">
  <input type="hidden" name="pending_id" value="${esc(opts.pendingId)}">
  <label for="username">Username</label>
  <input id="username" name="username" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required autofocus>
  <label for="password">Password</label>
  <input id="password" name="password" type="password" autocomplete="current-password" required>
  <div class="row">
    <button type="submit" name="action" value="deny" formnovalidate>Deny</button>
    <button type="submit" name="action" value="allow" class="primary">Allow</button>
  </div>
</form>
<p class="small">After you allow, you go back to <strong>${esc(opts.redirectHost)}</strong>. If that is not the site you started from, press Deny.</p>`
  );
}

export function renderMessagePage(title: string, message: string): string {
  return page(title, `<h1>${esc(title)}</h1><p>${esc(message)}</p>`);
}
