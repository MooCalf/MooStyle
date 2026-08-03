import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TAP_TRANSITION = { type: "spring", stiffness: 400, damping: 17 };

export const ConsentGateModal = ({ onAgree }) => (
  <motion.div
    className="site-gate"
    role="dialog"
    aria-modal="true"
    aria-labelledby="consent-gate-title"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    <motion.div
      className="site-gate__panel"
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <h2 id="consent-gate-title" className="site-gate__title">
        Terms &amp; Privacy
      </h2>
      <p className="site-gate__body">
        By continuing to use MOOSTYLES, you agree to our Terms of Service and Privacy Policy.
      </p>

      <div className="consent-gate__documents">
        <div className="consent-gate__document">
          <h3 className="consent-gate__document-title">Terms of Service</h3>
          <div className="consent-gate__excerpt">
            <p>
              We are MOOSTYLES ("Company," "we," "us," "our"), a company registered in Jamaica.
              We operate the website https://moostyles.com, as well as any other related products
              and services that refer or link to these legal terms (collectively, the "Services").
            </p>
          </div>
          <Link to="/terms-of-service" className="consent-gate__view-more">
            ...view more
          </Link>
        </div>

        <div className="consent-gate__document">
          <h3 className="consent-gate__document-title">Privacy Policy</h3>
          <div className="consent-gate__excerpt">
            <p>
              This Privacy Policy describes Our policies and procedures on the collection, use
              and disclosure of Your information when You use the Service and tells You about
              Your privacy rights and how the law protects You.
            </p>
          </div>
          <Link to="/privacy-policy" className="consent-gate__view-more">
            ...view more
          </Link>
        </div>
      </div>

      <div className="gate-actions">
        <motion.button
          type="button"
          className="gate-button gate-button--primary"
          onClick={onAgree}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={TAP_TRANSITION}
        >
          I Agree &amp; Continue
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);
