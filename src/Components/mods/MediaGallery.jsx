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

// Banner + previews strip + screenshots strip, per the newdesign-layout mod
// detail template. Thumbnail buttons are native <button> elements, so they
// are keyboard reachable and swap the main image on Enter/Space for free.
export const MediaGallery = ({ banner, previews = [], screenshots = [] }) => {
  const [selected, setSelected] = useState(banner);

  return (
    <div className="media-gallery">
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

      {previews.length > 0 && (
        <div className="media-gallery__strip" role="list" aria-label="Preview images">
          {previews.map((src, index) => (
            <Thumb key={`preview-${index}`} src={src} isActive={src === selected} onSelect={setSelected} />
          ))}
        </div>
      )}

      {screenshots.length > 0 && (
        <div className="media-gallery__strip" role="list" aria-label="In-game screenshots">
          {screenshots.map((src, index) => (
            <Thumb key={`screenshot-${index}`} src={src} isActive={src === selected} onSelect={setSelected} />
          ))}
        </div>
      )}
    </div>
  );
};
