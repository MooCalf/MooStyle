import { Link } from "react-router-dom";
import { NavigationBar } from "@/Components/NavigationBar";
import { Footer } from "@/Components/Footer";
import { WebsiteBackground } from "@/Components/WebsiteBackground";
import { Metadata } from "@/Components/Metadata.jsx";
import { StatusBadge } from "@/Components/mods/StatusBadge";
import { getAllMods } from "@/lib/mods";
import { CURRENT_GAME_VERSION } from "@/lib/config";

// Current inZOI build number and per-mod compatibility state. MOOSTYLES has
// never tracked a specific numbered build before this redesign, so
// CURRENT_GAME_VERSION is honestly just "inZOI" rather than a fabricated
// version string like "1.2.3" -- update src/lib/config.js once real build
// tracking exists.
export const Status = () => {
  const mods = getAllMods();

  return (
    <div className="min-h-screen">
      <Metadata
        pageTitle="Mod Status | MOOSTYLES"
        pageDescription="Current tracked game version and per-mod compatibility status."
        canonical="/status"
      />
      <WebsiteBackground />
      <NavigationBar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mod-detail__title newdesign-heading newdesign-brand-label">Mod Status</h1>
        <p className="mod-detail__description">Tracked game version: {CURRENT_GAME_VERSION}</p>
        <ul className="status-page__list">
          {mods.map((mod) => (
            <li key={mod.slug} className="status-page__row">
              <Link to={`/mods/${mod.slug}`} className="status-page__name">
                {mod.name}
              </Link>
              <StatusBadge state={mod.status.compatibility} gameVersion={mod.status.gameVersion} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};
