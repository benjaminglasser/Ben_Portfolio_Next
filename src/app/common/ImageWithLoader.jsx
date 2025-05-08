"use client";
import Image from "next/image";
import { useState } from "react";
import { PuffLoader } from "react-spinners";

const ImageWithLoader = ({ src, alt, width, height, className, unoptimized }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isGif = typeof src === 'string' && src.includes('.gif');

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-10">
          <PuffLoader
            color="#A9232C"
            loading
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {error ? (
        <div className="w-full h-full flex justify-center items-center bg-gray-100">
          <p className="text-gray-500">Failed to load image</p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          unoptimized={unoptimized || isGif}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageWithLoader; 