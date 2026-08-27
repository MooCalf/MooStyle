// GitHub OAuth provider for the Sveltia/Decap CMS "github" backend.
// Cloudflare Pages has no built-in Git Gateway (unlike Netlify), so the CMS
// needs a tiny server that does the OAuth code<->token exchange on GitHub's
// behalf. This worker is that server. It never sees or stores mod content —
// it only brokers a login and hands the resulting GitHub token to the admin
// page via postMessage.

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const STATE_COOKIE = "cms_oauth_state";

const randomState = () => crypto.randomUUID();

const readCookie = (request, name) => {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
};

const htmlResponse = (body) =>
  new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });

// Makes a JSON string safe to embed inside a double-quoted JS string literal:
// escape backslashes and quotes (or the token payload breaks out of the
// string), plus < (script-tag breakout) and the two JS line terminators that
// are illegal unescaped inside a plain string literal.
const escapeForJsString = (value) =>
  value
    .split("\\").join("\\\\")
    .split('"').join('\\"')
    .split("<").join("\\u003c")
    .split(String.fromCharCode(0x2028)).join("\\u2028")
    .split(String.fromCharCode(0x2029)).join("\\u2029");

// Handshake protocol expected by Decap/Sveltia CMS's github backend:
// the popup pings the opener with "authorizing:github", the opener echoes it
// back, and only then does the popup send the final message with the token.
const renderCallbackPage = (status, payload) => {
  const payloadJson = escapeForJsString(JSON.stringify(payload));
  return `<!doctype html>
<html><body>
<script>
  (function () {
    function receiveMessage(e) {
      window.removeEventListener("message", receiveMessage, false);
      e.source.postMessage(
        "authorization:github:${status}:${payloadJson}",
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body></html>`;
};

async function handleAuth(request, env) {
  const state = randomState();
  const url = new URL(GITHUB_AUTHORIZE_URL);
  url.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  url.searchParams.set("redirect_uri", `${new URL(request.url).origin}/callback`);
  url.searchParams.set("scope", "repo,user");
  url.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Set-Cookie": `${STATE_COOKIE}=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = readCookie(request, STATE_COOKIE);

  if (!code || !state || !expectedState || state !== expectedState) {
    return htmlResponse(renderCallbackPage("error", { message: "Invalid or expired login attempt." }));
  }

  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });

  const tokenData = await tokenResponse.json();
  console.log("token exchange", { ok: tokenResponse.ok, hasToken: !!tokenData.access_token, error: tokenData.error });

  if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
    return htmlResponse(
      renderCallbackPage("error", { message: tokenData.error_description || "GitHub token exchange failed." })
    );
  }

  return htmlResponse(renderCallbackPage("success", { token: tokenData.access_token, provider: "github" }));
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/auth") return handleAuth(request, env);
    if (pathname === "/callback") return handleCallback(request, env);
    return new Response("MooStyle CMS auth provider is running.", { status: 200 });
  },
};
