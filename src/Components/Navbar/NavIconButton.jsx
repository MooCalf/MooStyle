import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const TAP_TRANSITION = { type: "spring", stiffness: 400, damping: 17 };

export const NavIconButton = ({ icon, label, onClick, to, size = 20 }) => {
  const Icon = icon;
  const className = "nav-icon-button";

  if (to) {
    return (
      <MotionLink
        to={to}
        className={className}
        aria-label={label}
        title={label}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.95 }}
        transition={TAP_TRANSITION}
      >
        <Icon size={size} aria-hidden="true" />
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={label}
      title={label}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={TAP_TRANSITION}
    >
      <Icon size={size} aria-hidden="true" />
    </motion.button>
  );
};
