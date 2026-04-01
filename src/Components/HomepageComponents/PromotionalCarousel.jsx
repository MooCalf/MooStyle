import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/projects/HeroSection/MOOR - Brand Launch.png",
  "/projects/HeroSection/MOOSTYLESBANNER.png",
];

export const PromotionalCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_IMAGES.length);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleScrollDown = () => {
    const duration = 2000;
    const startY = window.scrollY;
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.min(startY + window.innerHeight, maxScrollY);
    const distance = targetY - startY;

    if (distance <= 0) {
      return;
    }

    const startTime = performance.now();

    const easeInOutQuad = (value) => {
      return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      window.scrollTo({
        top: startY + distance * easedProgress,
        behavior: "auto",
      });

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  };

  return (
    <div className="hero-banner-container">
      {/* Full Screen Banner Image */}
      <div className="hero-banner-image-wrapper">
        {HERO_IMAGES.map((imagePath, index) => (
          <img
            key={imagePath}
            src={imagePath}
            alt="MOOSTYLES Banner"
            className={`hero-banner-image ${
              index === activeIndex ? "hero-banner-image-active" : "hero-banner-image-inactive"
            }`}
            onError={(e) => {
              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TW9vU3R5bGUgQmFubmVyPC90ZXh0Pjwvc3ZnPg==";
            }}
          />
        ))}
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
