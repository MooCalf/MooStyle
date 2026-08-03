import { useRef } from "react";
import { motion } from "framer-motion";

export const SectionTabs = ({ tabs, activeLabel, onSelect }) => {
  const tabRefs = useRef([]);
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.label === activeLabel)
  );

  const selectTab = (index) => {
    const clamped = (index + tabs.length) % tabs.length;
    onSelect(tabs[clamped].label);
    tabRefs.current[clamped]?.focus();
  };

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        selectTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        selectTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        selectTab(0);
        break;
      case "End":
        event.preventDefault();
        selectTab(tabs.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="section-tabs">
      <span className="section-tabs__label">Menu :</span>
      <div className="section-tabs__list" role="tablist" aria-label="Mod detail sections">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.label}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`section-tab-${tab.label}`}
            aria-selected={index === activeIndex}
            aria-controls={`section-tabpanel-${tab.label}`}
            tabIndex={index === activeIndex ? 0 : -1}
            className={`section-tabs__tab${index === activeIndex ? " section-tabs__tab--active" : ""}`}
            onClick={() => selectTab(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
