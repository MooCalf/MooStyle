import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchQuery from "@/Components/SearchQuery";
import { getGlobalSearchData } from "@/lib/globalSearchData";
import { NavMenuPanel } from "@/Components/Navbar/NavMenuPanel";

// Site-wide nav bar: a home logo button top left, a search icon and a menu
// trigger top right (trigger is the outermost/rightmost icon). Everything
// else (brand, primary links, SafeMode, socials) lives inside the dropdown
// panel this trigger opens, per the newdesign-layout Stage 1 nav redesign.
// Modular by construction: NavigationBar is the only thing pages import, so
// changing the panel's contents (NavMenuPanel) or the icon button style
// (NavIconButton, used inside it) updates every page at once.
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

  // Every search result already carries a resolved `url`.
  const handleSearchSelect = (result) => {
    window.location.href = result?.url || "/";
  };

  return (
    <nav className="site-nav">
      <div className="site-nav__bar">
        <Link to="/" className="nav-icon-button site-nav__home" aria-label="MOOSTYLES home">
          <img
            src="/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png"
            alt=""
            className="site-nav__home-logo"
          />
        </Link>

        <div className="site-nav__actions">
          {/* DOM order left-to-right here still reads visually right-to-left:
              search sits left of the menu trigger, so the trigger is the
              outermost/rightmost icon. */}
          <SearchQuery
            iconOnly
            placeholder="Search mods, collections, pages..."
            searchData={getGlobalSearchData()}
            onSearchSelect={handleSearchSelect}
            showFilters
            searchFields={["title", "description", "content", "tags", "category", "subcategory", "author", "brand"]}
            resultLimit={20}
          />

          <button
            type="button"
            className="nav-icon-button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            className="site-nav__backdrop"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div className="site-nav__panel">
            <NavMenuPanel onNavigate={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </nav>
  );
};
