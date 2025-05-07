"use client";
import React, { useRef, useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

const VideoPlayerHome = ({ video1, video2, className, centered }) => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [maskSize, setMaskSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const animationFrameRef = useRef(null);
  const breatheAnimationRef = useRef(null);
  const entranceAnimationRef = useRef(null);

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
    setMaskSize(0);
    if (breatheAnimationRef.current) {
      cancelAnimationFrame(breatheAnimationRef.current);
    }
    if (entranceAnimationRef.current) {
      cancelAnimationFrame(entranceAnimationRef.current);
    }
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
        x: prevPos.x + (mousePosition.x - prevPos.x) * 0.15,
        y: prevPos.y + (mousePosition.y - prevPos.y) * 0.15
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

  // Effect to handle entrance animation
  useEffect(() => {
    if (!isHovering) return;

    const startTime = performance.now();
    const duration = 1000;
    const startSize = 100;
    const endSize = 180;

    const animateEntrance = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const bounce = (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
          ? 0
          : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      };
      
      const currentSize = startSize + (endSize - startSize) * bounce(progress);
      
      setMaskSize(currentSize);

      if (progress < 1) {
        entranceAnimationRef.current = requestAnimationFrame(animateEntrance);
      } else {
        startBreathingAnimation();
      }
    };

    entranceAnimationRef.current = requestAnimationFrame(animateEntrance);

    return () => {
      if (entranceAnimationRef.current) {
        cancelAnimationFrame(entranceAnimationRef.current);
      }
    };
  }, [isHovering]);

  // Function to start breathing animation
  const startBreathingAnimation = () => {
    let startTime = null;
    const baseSize = 180;
    const maxSize = 190;
    const duration = 10000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) % duration;
      const phase = progress / duration;

      const size = baseSize + (maxSize - baseSize) * Math.sin(phase * Math.PI * 2);
      setMaskSize(size);

      breatheAnimationRef.current = requestAnimationFrame(animate);
    };

    breatheAnimationRef.current = requestAnimationFrame(animate);
  };

  // Initialize videos with synchronization
  useEffect(() => {
    if (video1Ref.current && video2Ref.current) {
      const loadVideos = async () => {
        try {
          // Reset both videos to start
          video1Ref.current.currentTime = 0;
          video2Ref.current.currentTime = 0;

          // Set both videos to be invisible initially
          video1Ref.current.style.opacity = '0';
          video2Ref.current.style.opacity = '0';

          // Load both videos
          await Promise.all([
            video1Ref.current.load(),
            video2Ref.current.load()
          ]);

          // Start both videos simultaneously
          const playPromises = [
            video1Ref.current.play(),
            video2Ref.current.play()
          ];

          await Promise.all(playPromises);

          // Once both videos are playing, fade them in
          setLoading(false);
          setTimeout(() => {
            setFadeIn(true);
          }, 100); // Small delay to ensure smooth transition
        } catch (error) {
          console.error('Error loading videos:', error);
          setError(true);
          setLoading(false);
        }
      };
      loadVideos();
    }
  }, []);

  return (
    <div className={`${centered ? "flex justify-center items-center" : "block"}`}>
      <div
        ref={containerRef}
        className={`${className} w-full overflow-hidden flex justify-center h-[500px] md:h-[70vh] relative
                    ${centered ? "mt-10 w-full px-5 md:w-3/5" : "md:w-full"}`}
      >
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/50 z-20">
            <PuffLoader
              color="#ff477b"
              loading
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        
        {error ? (
          <div className="w-full h-full flex justify-center items-center bg-gray-100">
            <p className="text-gray-500">Failed to load video</p>
          </div>
        ) : (
          <>
            {/* Video 2 (Wireframe) - Always visible underneath */}
            <video
              ref={video2Ref}
              className="object-cover w-full h-[500px] md:h-[70vh] absolute"
              style={{
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity 1s ease-in-out'
              }}
              autoPlay
              loop
              playsInline
              muted
              loading="lazy"
            >
              <source src={video2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video 1 (Main) - On top with mask */}
            <video
              ref={video1Ref}
              className="object-cover w-full h-[500px] md:h-[70vh] absolute"
              style={{
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                maskImage: isHovering ? `radial-gradient(circle ${maskSize}px at ${maskPosition.x}px ${maskPosition.y}px, transparent 99%, black 100%)` : 'none',
                WebkitMaskImage: isHovering ? `radial-gradient(circle ${maskSize}px at ${maskPosition.x}px ${maskPosition.y}px, transparent 99%, black 100%)` : 'none',
                transition: 'opacity 1s ease-in-out, mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              autoPlay
              loop
              playsInline
              muted
              loading="lazy"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )}

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