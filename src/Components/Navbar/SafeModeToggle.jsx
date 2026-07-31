import { useSafeMode } from "@/lib/useSafeMode";

export const SafeModeToggle = () => {
  const [safeMode, toggleSafeMode] = useSafeMode();

  return (
    <div className="nav-menu__safe-mode">
      <span className="nav-menu__safe-mode-label">SafeMode</span>
      <button
        type="button"
        role="switch"
        aria-checked={safeMode}
        aria-label="Toggle SafeMode"
        className={`nav-menu__safe-mode-switch${safeMode ? " nav-menu__safe-mode-switch--on" : ""}`}
        onClick={toggleSafeMode}
      >
        <span className="nav-menu__safe-mode-thumb" />
      </button>
    </div>
  );
};
