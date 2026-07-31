// Site-wide constants used by prerendering, metadata, and the mod content
// loader. Centralized so a future change (site URL, image CDN cutover,
// current inZOI build number) is a one-line edit instead of a repo-wide find
// and replace.

export const SITE_URL = "https://moostyles.com";

// Root every mod image path is resolved against. Empty string means images
// are served from the app origin (current behavior). Set this to a CDN
// origin (for example "https://cdn.moostyles.com") to move media off the
// app origin without touching every content file.
export const IMAGE_BASE_URL = "";

export const resolveImagePath = (path) => {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${IMAGE_BASE_URL}${path}`;
};

// Current inZOI build the catalog is being tracked against. Shown on
// /status alongside each mod's compatibility state.
export const CURRENT_GAME_VERSION = "inZOI";

// Outbound domains the /redirector route will forward to. Anything else is
// rejected. Keep in sync with src/lib/redirect.js.
export const OUTBOUND_ALLOWLIST = [
  "curseforge.com",
  "www.curseforge.com",
  "patreon.com",
  "www.patreon.com",
  "moostyles.com",
  "instagram.com",
  "www.instagram.com",
  "pin.it",
  "discord.gg",
];
