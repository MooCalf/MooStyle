import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export const PromotionalCarousel = () => {
  const handleScrollDown = () => {
    // Scroll to the next section below the banner
    const nextSection = document.querySelector('#contact');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="hero-banner-container">
      {/* Full Screen Banner Image */}
      <div className="hero-banner-image-wrapper">
        <img
          src="/projects/Website Branding/MOOSTYLESBANNER.png"
          alt="MooStyle Banner"
          className="hero-banner-image"
          onError={(e) => {
            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TW9vU3R5bGUgQmFubmVyPC90ZXh0Pjwvc3ZnPg==";
          }}
        />
      </div>

      {/* Scroll Button */}
      <motion.button
        className="hero-scroll-button"
        onClick={handleScrollDown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Scroll to next section"
      >
        <span className="hero-scroll-text">Scroll</span>
        <ChevronDown size={20} className="hero-scroll-icon" />
      </motion.button>
    </div>
  );
};
