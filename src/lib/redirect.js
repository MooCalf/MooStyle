import { OUTBOUND_ALLOWLIST } from "@/lib/config";

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

export const logRedirect = (url) => {
  console.info(`[redirect] -> ${url}`);
};
