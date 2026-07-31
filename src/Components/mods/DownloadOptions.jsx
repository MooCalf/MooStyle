import { Link } from "react-router-dom";
import { Info, Unlock } from "lucide-react";
import { formatReleaseDate, isPublicLocked } from "@/lib/downloadOptions";

// Renders the two download buttons (Early Access on Patreon, Public Access)
// per the newdesign-layout mod detail template. earlyAccess is omitted
// (single-button layout) whenever the mod has no tracked early access URL,
// since MOOSTYLES does not currently gate any mod behind a dated Patreon
// early access post.
export const DownloadOptions = ({ modSlug, earlyAccess, publicAccess, fileTypes = [] }) => {
  const locked = isPublicLocked(publicAccess?.date);
  const hasEarlyAccess = Boolean(earlyAccess?.url);

  return (
    <div className="download-options">
      <div className="download-options__buttons">
        {hasEarlyAccess && (
          <Link
            className="download-options__button download-options__button--early-access"
            to={`/redirector?to=${encodeURIComponent(earlyAccess.url)}`}
          >
            <span className="download-options__button-label">Early Access on Patreon</span>
            {earlyAccess.date && (
              <span className="download-options__button-sublabel">
                Release Date: {formatReleaseDate(earlyAccess.date)}
              </span>
            )}
          </Link>
        )}

        {locked ? (
          <button
            type="button"
            className="download-options__button download-options__button--locked"
            disabled
            aria-disabled="true"
          >
            <span className="download-options__button-label">
              Still in Early Access, please come back after {formatReleaseDate(publicAccess.date)}
            </span>
          </button>
        ) : publicAccess?.url ? (
          <Link
            className="download-options__button download-options__button--public"
            to={`/api/mods/${modSlug}/download`}
          >
            <span className="download-options__button-label">Public Access</span>
            <span className="download-options__button-sublabel">Free Download</span>
          </Link>
        ) : (
          <button
            type="button"
            className="download-options__button download-options__button--locked"
            disabled
            aria-disabled="true"
          >
            <span className="download-options__button-label">Currently unavailable</span>
          </button>
        )}
      </div>

      <div className="download-options__explainers">
        <p className="download-options__explainer">
          <Info size={18} aria-hidden="true" />
          <span>
            <strong>Early Access</strong> gives Patreon supporters a chance to download a mod
            before its public release date.
          </span>
        </p>
        <p className="download-options__explainer">
          <Unlock size={18} aria-hidden="true" />
          <span>
            <strong>Public Access</strong> is the free download available to everyone once the
            public release date has passed.
          </span>
        </p>
      </div>

      {fileTypes.length > 0 && (
        <p className="download-options__file-types">
          Compatible File Types: {fileTypes.join(", ")}
        </p>
      )}

      <p className="download-options__utc-note">Release date based on UTC time.</p>

      <p className="download-options__tou">
        By clicking Download, you are agreeing to MOOSTYLES's{" "}
        <Link to="/terms-of-service">Term of Use</Link>.{" "}
        <Link to="/terms-of-service">Read More</Link>
      </p>
    </div>
  );
};
