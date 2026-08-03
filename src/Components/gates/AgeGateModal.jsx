import { motion } from "framer-motion";

const TAP_TRANSITION = { type: "spring", stiffness: 400, damping: 17 };

export const AgeGateModal = ({ onAnswer }) => (
  <motion.div
    className="site-gate"
    role="dialog"
    aria-modal="true"
    aria-labelledby="age-gate-title"
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
      <h2 id="age-gate-title" className="site-gate__title">
        Before You Continue
      </h2>
      <p className="site-gate__body">
        MOOSTYLES may have some 18+ content not suitable for younger audiences. Please confirm
        your age to continue -- if you're under 18, we'll switch SafeMode on to keep anything
        mature hidden while you browse.
      </p>
      <div className="gate-actions">
        <motion.button
          type="button"
          className="gate-button gate-button--primary"
          onClick={() => onAnswer(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={TAP_TRANSITION}
        >
          I'm 18 or Older
        </motion.button>
        <motion.button
          type="button"
          className="gate-button gate-button--secondary"
          onClick={() => onAnswer(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={TAP_TRANSITION}
        >
          I'm Under 18
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);
