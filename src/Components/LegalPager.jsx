import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TAP_TRANSITION = { type: "spring", stiffness: 400, damping: 17 };

export const LegalPager = ({ pages, index, onIndexChange }) => {
  const page = pages[index];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  return (
    <div className="legal-pager">
      <div className="legal-content">
        <p className="legal-pager__meta">
          Section {index + 1} of {pages.length}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h2>{page.title}</h2>
            {page.body}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="legal-pager__nav">
        <motion.button
          type="button"
          className="legal-pager__nav-button"
          onClick={() => onIndexChange(Math.max(0, index - 1))}
          disabled={index === 0}
          aria-label="Previous section"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={TAP_TRANSITION}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </motion.button>

        <span className="legal-pager__nav-label">{page.title}</span>

        <motion.button
          type="button"
          className="legal-pager__nav-button"
          onClick={() => onIndexChange(Math.min(pages.length - 1, index + 1))}
          disabled={index === pages.length - 1}
          aria-label="Next section"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={TAP_TRANSITION}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
};
