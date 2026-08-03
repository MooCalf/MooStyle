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

export const useSafeMode = () => {
  const [safeMode, setSafeMode] = useState(readStored);

  useEffect(() => {
    document.documentElement.dataset.safeMode = String(safeMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(safeMode));
    } catch {
      void 0;
    }
  }, [safeMode]);

  const toggleSafeMode = useCallback(() => setSafeMode((prev) => !prev), []);

  return [safeMode, toggleSafeMode, setSafeMode];
};
