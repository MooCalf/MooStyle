import { motion } from "framer-motion";
import { useSafeMode } from "@/lib/useSafeMode";

export const SafeModeToggle = () => {
  const [safeMode, toggleSafeMode] = useSafeMode();

  return (
    <div className="nav-menu__safe-mode">
      <span className="nav-menu__safe-mode-label">SafeMode</span>
      <motion.button
        type="button"
        role="switch"
        aria-checked={safeMode}
        aria-label="Toggle SafeMode"
        className={`nav-menu__safe-mode-switch${safeMode ? " nav-menu__safe-mode-switch--on" : ""}`}
        onClick={toggleSafeMode}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.span
          className="nav-menu__safe-mode-thumb"
          animate={{ x: safeMode ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );
};
