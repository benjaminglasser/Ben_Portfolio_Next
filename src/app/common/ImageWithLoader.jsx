"use client";
import Image from "next/image";
import { useState } from "react";
import { PuffLoader } from "react-spinners";

const ImageWithLoader = ({ src, alt, width, height, className, unoptimized }) => {
  const [loading, setLoading] = useState(true);
  const isGif = typeof src === 'string' && src.includes('.gif');

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-10">
          <PuffLoader
            color="#ff477b"
            loading
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized={unoptimized || isGif}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithLoader; 