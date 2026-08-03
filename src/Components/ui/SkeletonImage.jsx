import { useEffect, useRef, useState } from "react";

export const SkeletonImage = ({
  src,
  fallbackSrc,
  alt = "",
  className = "",
  imgClassName = "",
  onError,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  const handleError = (event) => {
    setLoaded(true);
    setErrored(true);
    onError?.(event);
  };

  return (
    <span className={`skeleton-image ${className}`}>
      {!loaded && <span className="skeleton-image__placeholder" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={errored && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`skeleton-image__img${loaded ? " skeleton-image__img--loaded" : ""} ${imgClassName}`}
        {...rest}
      />
    </span>
  );
};
