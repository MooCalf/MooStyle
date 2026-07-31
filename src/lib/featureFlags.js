// Flags for features that are built but not ready to ship live. Flip a
// value here rather than deleting or commenting out the code paths that
// depend on it.

export const FEATURE_FLAGS = {
  // SafeMode blurs or hides mature preview imagery. MOOSTYLES has no
  // mature catalog today, so the toggle exists as an inert stub and
  // defaults off. See Section 6 decision 1 of the newdesign-layout spec.
  safeMode: false,

  // 30 day rolling download counter on the mod detail page. Requires a
  // real backend to count hits; until one exists, /api/mods/:id/download
  // only logs and redirects, so this stays off.
  downloadCounter: false,
};

export const isFeatureEnabled = (flag) => Boolean(FEATURE_FLAGS[flag]);
