"use client";
import React from 'react';

const ShimmerEffect = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-800 ${className}`}>
      <div 
        className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800"
        style={{ 
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%'
        }}
      />
    </div>
  );
};

export default ShimmerEffect; 