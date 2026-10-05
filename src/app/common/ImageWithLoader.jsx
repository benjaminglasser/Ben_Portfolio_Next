"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const ImageWithLoader = ({ src, alt, width, height, className, wrapperClassName, borderOverlayClassName, unoptimized, onImageReady, children, loading: imageLoading }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  // A cached image can finish loading before React attaches its onLoad
  // handler, so the event never fires and the shimmer stays up. Check the
  // underlying img's complete flag on mount as a fallback.
  useEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setLoading(false);
      onImageReady?.(imgEl);
    }
  }, [src, onImageReady]);

  // Check if the src is a GIF by looking at the src string or the default property
  const isGif = typeof src === 'string' 
    ? src.includes('.gif')
    : src?.default?.includes('.gif') || src?.src?.includes('.gif');

  const handleLoad = (event) => {
    setLoading(false);
    onImageReady?.(event.currentTarget);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${wrapperClassName || ""}`}
      style={{
        backgroundColor: '#0d0d0d'
      }}
    >
      {loading && (
        <div className="img-loader absolute inset-0 z-10 overflow-hidden" aria-hidden="true" />
      )}
      {error ? (
        <div className="w-full h-full flex justify-center items-center bg-gray-100">
          <p className="text-gray-500">Failed to load image</p>
        </div>
      ) : (
        <div style={{ opacity: loading ? 0 : 1 }} className="w-full h-full">
          <Image
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover ${className}`}
            unoptimized={unoptimized || isGif}
            loading={imageLoading}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}
      {children}
      {borderOverlayClassName && (
        <div
          className={`absolute inset-0 z-20 pointer-events-none ${borderOverlayClassName}`}
        />
      )}
    </div>
  );
};

export default ImageWithLoader; 