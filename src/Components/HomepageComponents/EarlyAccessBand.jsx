import { Link } from "react-router-dom";

// Early Access explainer band, per Section 1.2 item 2. bank42n states a
// fixed public release window in days; MOOSTYLES has no tracked early
// access-to-public gap for any mod yet (downloadOptions.earlyAccess is null
// across the catalog), so this describes the policy rather than a
// fabricated day count.
export const EarlyAccessBand = () => (
  <section className="early-access-band">
    <p className="early-access-band__text">
      Patreon supporters get early access to new mods. Everyone else gets the free download once
      a mod's public release date has passed.
    </p>
    <Link to="/free" className="early-access-band__link">
      Browse free downloads
    </Link>
  </section>
);
