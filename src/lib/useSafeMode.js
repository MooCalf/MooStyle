import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "moostyle_safe_mode";

const readStored = () => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

// Persists the visitor's SafeMode preference and stamps it onto <html> as
// data-safe-mode, so any component can react to it later via a
// [data-safe-mode="true"] CSS selector without prop-drilling. MOOSTYLES has
// no mature content today, so toggling this has no visible effect yet, but
// the preference itself is real and persisted, not a fake stub.
export const useSafeMode = () => {
  const [safeMode, setSafeMode] = useState(readStored);

  useEffect(() => {
    document.documentElement.dataset.safeMode = String(safeMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(safeMode));
    } catch {
      // Storage unavailable (private browsing, disabled storage): the
      // preference just won't persist across visits.
    }
  }, [safeMode]);

  const toggleSafeMode = useCallback(() => setSafeMode((prev) => !prev), []);

  return [safeMode, toggleSafeMode];
};
