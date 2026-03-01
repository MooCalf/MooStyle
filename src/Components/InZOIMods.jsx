import React from "react";
import { Link } from "react-router-dom";

// Image card used on the InZOI page.
// - `item` props: { id, title, image, href }
// - shows title only on hover (bottom-left)
const InZOIMods = ({ item, href, onClick }) => {
  const imageSrc = item?.image || item?.images?.[0] || item?.src || '/projects/Brand Medias/Recommend Category/placeholder.png';

  const CardInner = (
    <div
      className="relative rounded-lg overflow-hidden bg-gray-100 group cursor-pointer select-none"
      aria-label={item?.title || 'InZOI mod'}
    >
      <div className="w-full aspect-[4/3] bg-gray-200">
        <img
          src={imageSrc}
          alt={item?.title || 'InZOI mod image'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Dark gradient on hover to improve title contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Title - bottom-left, visible on hover */}
      <div className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span 
          className="text-lg font-semibold drop-shadow"
          style={{ color: item?.nameColor || '#ffffff' }}
        >
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

