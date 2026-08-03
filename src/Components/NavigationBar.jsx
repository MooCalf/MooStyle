import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchQuery from "@/Components/SearchQuery";
import { getGlobalSearchData } from "@/lib/globalSearchData";
import { NavMenuPanel } from "@/Components/Navbar/NavMenuPanel";

const MotionLink = motion.create(Link);
const TAP_TRANSITION = { type: "spring", stiffness: 400, damping: 17 };

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSearchSelect = (result) => {
    window.location.href = result?.url || "/";
  };

  return (
    <nav className="site-nav">
      <div className="site-nav__bar">
        <MotionLink
          to="/"
          className="nav-icon-button site-nav__home"
          aria-label="MOOSTYLES home"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={TAP_TRANSITION}
        >
          <img
            src="/projects/Website Branding/MOOSTYLES LOGO - BLACK COLOR.png"
            alt=""
            className="site-nav__home-logo"
          />
        </MotionLink>

        <div className="site-nav__actions">
          <SearchQuery
            iconOnly
            placeholder="Search mods, collections, pages..."
            searchData={getGlobalSearchData()}
            onSearchSelect={handleSearchSelect}
            resultLimit={20}
          />

          <motion.button
            type="button"
            className="nav-icon-button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={TAP_TRANSITION}
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && [
          <motion.button
            key="backdrop"
            type="button"
            className="site-nav__backdrop"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />,
          <motion.div
            key="panel"
            className="site-nav__panel"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <NavMenuPanel onNavigate={() => setIsOpen(false)} />
          </motion.div>,
        ]}
      </AnimatePresence>
    </nav>
  );
};
