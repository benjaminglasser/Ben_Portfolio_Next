"use client";
import Image from "next/image";
import { useState } from "react";

const ImageWithLoader = ({ src, alt, width, height, className, unoptimized }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Check if the src is a GIF by looking at the src string or the default property
  const isGif = typeof src === 'string' 
    ? src.includes('.gif')
    : src?.default?.includes('.gif') || src?.src?.includes('.gif');

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: '#1f2937'
      }}
    >
      {loading && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, #1f2937 0%, #374151 50%, #1f2937 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite ease-in-out'
            }}
          />
        </div>
      )}
      {error ? (
        <div className="w-full h-full flex justify-center items-center bg-gray-100">
          <p className="text-gray-500">Failed to load image</p>
        </div>
      ) : (
        <div style={{ opacity: loading ? 0 : 1 }} className="w-full h-full">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover ${className}`}
            unoptimized={unoptimized || isGif}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}
    </div>
  );
};

export default ImageWithLoader; 