import React from "react";
import { Link } from "react-router-dom";

// Image card used on the Mod List. Title sits in an always-visible rounded
// badge inset into the bottom of the image (not a hover-only reveal), per
// the same "title under/on the image" treatment as the gallery teaser.
// - `item` props: { id, title, image, href }
const InZOIMods = ({ item, href, onClick }) => {
  const imageSrc = item?.image || item?.images?.[0] || item?.src || '/projects/Brand Medias/Recommend Category/placeholder.png';

  const CardInner = (
    <div
      className="relative rounded-lg overflow-hidden group cursor-pointer select-none"
      aria-label={item?.title || 'InZOI mod'}
    >
      <div className="w-full aspect-[4/3]">
        <img
          src={imageSrc}
          alt={item?.title || 'InZOI mod image'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title badge: always visible, rounded background inset into the
          bottom of the image so the label stays legible over any photo. */}
      <div className="absolute inset-x-2 bottom-2 rounded-md bg-black/70 px-2 py-1.5">
        <span className="block truncate text-sm font-semibold text-white">
          {item?.name || item?.title}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block" aria-label={item?.title}>
        {CardInner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="block w-full text-left" aria-label={item?.title}>
      {CardInner}
    </button>
  );
};

export default InZOIMods;
