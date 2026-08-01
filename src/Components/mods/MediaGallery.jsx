import { useState } from "react";

const isVideo = (src) => typeof src === "string" && /\.mp4(\?|$)/i.test(src);

const Thumb = ({ src, isActive, onSelect }) => (
  <button
    type="button"
    role="listitem"
    className={`media-gallery__thumb${isActive ? " media-gallery__thumb--active" : ""}`}
    aria-current={isActive}
    onClick={() => onSelect(src)}
  >
    {isVideo(src) ? (
      <video className="media-gallery__thumb-media" src={src} muted loading="lazy" />
    ) : (
      <img className="media-gallery__thumb-media" src={src} alt="" loading="lazy" />
    )}
  </button>
);

// Banner + a single vertical list of the extra images (previews and
// screenshots combined), positioned to the left of the main image.
// Thumbnail buttons are native <button> elements, so they are keyboard
// reachable and swap the main image on Enter/Space for free.
export const MediaGallery = ({ banner, previews = [], screenshots = [] }) => {
  const [selected, setSelected] = useState(banner);
  const extras = [...previews, ...screenshots];

  return (
    <div className="media-gallery">
      {extras.length > 0 && (
        <div className="media-gallery__thumbs" role="list" aria-label="Additional images">
          {extras.map((src, index) => (
            <Thumb key={`extra-${index}`} src={src} isActive={src === selected} onSelect={setSelected} />
          ))}
        </div>
      )}

      <div className="media-gallery__main">
        {isVideo(selected) ? (
          <video
            key={selected}
            className="media-gallery__main-media"
            src={selected}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            key={selected}
            className="media-gallery__main-media"
            src={selected}
            alt=""
            loading="eager"
          />
        )}
      </div>
    </div>
  );
};
