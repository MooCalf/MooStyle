import { OUTBOUND_ALLOWLIST } from "@/lib/config";

// Single allowlist + logging point for every outbound link on the site
// (/redirector and /api/mods/:id/download both use this). Keep the domain
// list in sync with src/lib/config.js.
export const isAllowedRedirectTarget = (url) => {
  if (!url) return false;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
  return OUTBOUND_ALLOWLIST.some(
    (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
  );
};

// Swap point for real analytics later (behind the downloadCounter feature
// flag); logs to the console for now since there is no backend to record a
// hit against.
export const logRedirect = (url) => {
  console.info(`[redirect] -> ${url}`);
};
