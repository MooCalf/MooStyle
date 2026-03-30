import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { getAllArchives } from "@/lib/archive";
import { getAllProducts } from "@/lib/shoppingData";

const CARD_WIDTH = 164;
const CARD_GAP = 30;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
const SCROLL_SPEED = 72;
const REPEAT_COUNT = 3;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeCarouselItems = () => {
  return [...getAllProducts(), ...getAllArchives()]
    .map((item) => {
      const image = item.image || item.images?.[0] || "";

      if (!image) {
        return null;
      }

      return {
        id: item.id,
        title: item.name || item.title || "Untitled Mod",
        image,
        href: `/product/${item.id}`,
      };
    })
    .filter(Boolean);
};

export const PremiumModsCarousel = () => {
  const items = useMemo(() => normalizeCarouselItems(), []);
  const repeatedItems = useMemo(
    () =>
      Array.from({ length: REPEAT_COUNT }, (_, repeatIndex) =>
        items.map((item) => ({
          ...item,
          carouselKey: `${repeatIndex}-${item.id}`,
        }))
      ).flat(),
    [items]
  );
  const prefersReducedMotion = useReducedMotion();
  const trackX = useMotionValue(0);
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const cycleWidth = items.length * CARD_STRIDE;

  useEffect(() => {
    trackX.set(0);
  }, [cycleWidth, trackX]);

  useEffect(() => {
    const node = viewportRef.current;

    if (!node) {
      return undefined;
    }

    const updateViewportWidth = () => {
      setViewportWidth(node.offsetWidth || 0);
    };

    updateViewportWidth();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => updateViewportWidth());

    resizeObserver?.observe(node);
    window.addEventListener("resize", updateViewportWidth);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || items.length <= 1 || cycleWidth <= 0) {
      return;
    }

    const nextX = trackX.get() - SCROLL_SPEED * (delta / 1000);
    trackX.set(nextX <= -cycleWidth ? nextX + cycleWidth : nextX);
  });

  if (!items.length) {
    return null;
  }

  return (
    <div className="premium-carousel-shell">
      <div className="premium-carousel-fade premium-carousel-fade-left" aria-hidden="true" />
      <div className="premium-carousel-fade premium-carousel-fade-right" aria-hidden="true" />

      <div ref={viewportRef} className="premium-carousel-viewport">
        <div className="premium-carousel-track" aria-label="Featured InZOI and archive mods">
          {repeatedItems.map((item, index) => (
            <CarouselCard
              key={item.carouselKey}
              item={item}
              index={index}
              trackX={trackX}
              viewportWidth={viewportWidth}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselCard = ({ item, index, trackX, viewportWidth }) => {
  const x = useTransform(trackX, (latest) => index * CARD_STRIDE + latest);
  const scale = useTransform(trackX, (latest) => {
    const width = viewportWidth || 960;
    const cardCenter = index * CARD_STRIDE + latest + CARD_WIDTH / 2;
    const distance = Math.abs(cardCenter - width / 2);
    const ratio = clamp(distance / Math.max(width * 0.58, CARD_STRIDE * 2.2), 0, 1);

    return 1.14 - ratio * 0.36;
  });
  const opacity = useTransform(trackX, (latest) => {
    const width = viewportWidth || 960;
    const cardCenter = index * CARD_STRIDE + latest + CARD_WIDTH / 2;
    const distance = Math.abs(cardCenter - width / 2);
    const ratio = clamp(distance / Math.max(width * 0.58, CARD_STRIDE * 2.2), 0, 1);

    return 1 - ratio * 0.75;
  });
  const y = useTransform(trackX, (latest) => {
    const width = viewportWidth || 960;
    const cardCenter = index * CARD_STRIDE + latest + CARD_WIDTH / 2;
    const distance = Math.abs(cardCenter - width / 2);
    const ratio = clamp(distance / Math.max(width * 0.58, CARD_STRIDE * 2.2), 0, 1);

    return ratio * 18;
  });
  const filter = useTransform(trackX, (latest) => {
    const width = viewportWidth || 960;
    const cardCenter = index * CARD_STRIDE + latest + CARD_WIDTH / 2;
    const distance = Math.abs(cardCenter - width / 2);
    const ratio = clamp(distance / Math.max(width * 0.58, CARD_STRIDE * 2.2), 0, 1);

    return `blur(${(ratio * 1.8).toFixed(2)}px) saturate(${(1.2 - ratio * 0.28).toFixed(2)})`;
  });

  return (
    <motion.div
      className="premium-carousel-card-wrap"
      style={{ x, y, scale, opacity, filter, width: CARD_WIDTH }}
    >
      <motion.div
        whileHover={{ y: -10, rotateX: -3, rotateY: 5, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="premium-carousel-card-frame"
      >
        <Link to={item.href} className="premium-carousel-card" aria-label={item.title}>
          <img className="premium-carousel-card-image" src={item.image} alt={item.title} loading="lazy" />
          <div className="premium-carousel-card-overlay" aria-hidden="true" />
          <div className="premium-carousel-card-content">
            <span className="premium-carousel-card-title">{item.title}</span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PremiumModsCarousel;