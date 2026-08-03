import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

export const Breadcrumb = ({ to, label }) => (
  <MotionLink
    to={to}
    className="mod-breadcrumb"
    whileHover={{ x: -3 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <ChevronLeft size={16} aria-hidden="true" />
    {label}
  </MotionLink>
);
