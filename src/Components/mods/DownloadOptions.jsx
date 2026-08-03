import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);
const TAP_TRANSITION = { type: "spring", stiffness: 400, damping: 17 };

export const DownloadOptions = ({ patreonUrl, curseforgeUrl, fileTypes = [] }) => {
  return (
    <div className="download-options">
      <div className="download-options__buttons">
        {patreonUrl ? (
          <MotionLink
            className="download-options__button download-options__button--patreon"
            to={`/redirector?to=${encodeURIComponent(patreonUrl)}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={TAP_TRANSITION}
          >
            Patreon
          </MotionLink>
        ) : (
          <button
            type="button"
            className="download-options__button download-options__button--patreon"
            disabled
            aria-disabled="true"
          >
            Patreon
          </button>
        )}

        {curseforgeUrl ? (
          <MotionLink
            className="download-options__button download-options__button--curseforge"
            to={`/redirector?to=${encodeURIComponent(curseforgeUrl)}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={TAP_TRANSITION}
          >
            CurseForge
          </MotionLink>
        ) : (
          <button
            type="button"
            className="download-options__button download-options__button--curseforge"
            disabled
            aria-disabled="true"
          >
            CurseForge
          </button>
        )}
      </div>

      {fileTypes.length > 0 && (
        <p className="download-options__file-types">
          Compatible File Types: {fileTypes.join(", ")}
        </p>
      )}

      <p className="download-options__tou">
        By clicking Download, you are agreeing to MOOSTYLES's{" "}
        <Link to="/terms-of-service">Term of Use</Link>.{" "}
        <Link to="/terms-of-service">Read More</Link>
      </p>
    </div>
  );
};
