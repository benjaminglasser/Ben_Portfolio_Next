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
  const breatheAnimationRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

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

  // Effect to handle breathing animation
  useEffect(() => {
    if (!isHovering) {
      setMaskSize(0);
      if (breatheAnimationRef.current) {
        cancelAnimationFrame(breatheAnimationRef.current);
      }
      return;
    }

    let startTime = null;
    const baseSize = 140;
    const maxSize = 155;
    const duration = 12000; // 6 seconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) % duration;
      const phase = progress / duration;

      // Use sine wave for smooth breathing
      const size = baseSize + (maxSize - baseSize) * Math.sin(phase * Math.PI * 2);
      setMaskSize(size);

      breatheAnimationRef.current = requestAnimationFrame(animate);
    };

    breatheAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (breatheAnimationRef.current) {
        cancelAnimationFrame(breatheAnimationRef.current);
      }
    };
  }, [isHovering]);

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
      </div>
    </div>
  );
};

export default VideoPlayerHome;