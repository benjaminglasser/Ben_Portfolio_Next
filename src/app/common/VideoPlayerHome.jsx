"use client";
import React, { useRef, useState, useEffect } from "react";

const VideoPlayerHome = ({ video1, video2, className, centered }) => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [maskSize, setMaskSize] = useState(0);
  const animationFrameRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    console.log('Mouse Enter - Setting isHovering to true');
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    console.log('Mouse Leave - Setting isHovering to false');
    setIsHovering(false);
  };

  // Effect to handle mask size animation
  useEffect(() => {
    if (isHovering) {
      console.log('Starting mask animation to 150px');
      setMaskSize(150);
    } else {
      console.log('Resetting mask size to 0px');
      setMaskSize(0);
    }
  }, [isHovering]);

  // Effect to handle mask position animation
  useEffect(() => {
    if (!isHovering) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const updateMaskPosition = () => {
      setMaskPosition(prevPos => ({
        x: prevPos.x + (mousePosition.x - prevPos.x) * 0.1,
        y: prevPos.y + (mousePosition.y - prevPos.y) * 0.1
      }));
      animationFrameRef.current = requestAnimationFrame(updateMaskPosition);
    };

    animationFrameRef.current = requestAnimationFrame(updateMaskPosition);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isHovering]);

  // Initialize videos
  useEffect(() => {
    if (video1Ref.current && video2Ref.current) {
      video1Ref.current.currentTime = 0;
      video2Ref.current.currentTime = 0;
      video1Ref.current.play().catch(console.error);
      video2Ref.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className={`${centered ? "flex justify-center items-center" : "block"}`}>
      <style jsx>{`
        @keyframes breathe {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
      <div
        ref={containerRef}
        className={`${className} w-full overflow-hidden flex justify-center h-[500px] md:h-[70vh] relative
                    ${centered ? "mt-10 w-full px-5 md:w-3/5" : "md:w-full"}`}
      >
        {/* Video 2 (Wireframe) - Always visible underneath */}
        <video
          ref={video2Ref}
          className="object-cover w-full h-[500px] md:h-[70vh] absolute"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video 1 (Main) - On top with mask */}
        <video
          ref={video1Ref}
          className="object-cover w-full h-[500px] md:h-[70vh] absolute"
          style={{
            maskImage: isHovering ? `radial-gradient(circle ${maskSize}px at ${maskPosition.x}px ${maskPosition.y}px, transparent 99%, black 100%)` : 'none',
            WebkitMaskImage: isHovering ? `radial-gradient(circle ${maskSize}px at ${maskPosition.x}px ${maskPosition.y}px, transparent 99%, black 100%)` : 'none',
            transition: 'mask-image 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), -webkit-mask-image 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            animation: isHovering ? 'breathe 6s cubic-bezier(0.4, 0, 0.2, 1) infinite' : 'none',
            transformOrigin: `${maskPosition.x}px ${maskPosition.y}px`,
          }}
          autoPlay
          loop
          playsInline
          muted
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Invisible overlay to capture mouse events */}
        <div
          className="absolute inset-0 z-30 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Debug text */}
        <div className="absolute top-4 left-4 z-50 text-white bg-black p-2 pointer-events-none">
          {`Hover: ${isHovering ? 'Yes' : 'No'}, Size: ${maskSize}px`}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerHome;