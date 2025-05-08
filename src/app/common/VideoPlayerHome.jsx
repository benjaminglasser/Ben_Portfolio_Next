"use client";
import React, { useRef, useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

const VideoPlayerHome = ({ video1, video2, className, centered }) => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const containerRef = useRef(null);
  const syncCheckInterval = useRef(null);
  const lastSyncTime = useRef(0);
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
  const loadingTimeoutRef = useRef(null);
  const [isBouncing, setIsBouncing] = useState(false);
  const bounceTimeoutRef = useRef(null);
  const bounceStartTime = useRef(Date.now());

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    // Update mask position immediately when mouse moves
    setMaskPosition({ x, y });

    // Only apply proximity scaling if we're already hovering
    if (isHovering) {
      // Calculate distance from edges
      const edgeThreshold = 100; // Distance from edge to start shrinking
      const minSize = 16; // Minimum size at edge (matches GlobalCursor default size)
      const maxSize = 180; // Maximum size in center
      
      // Calculate distances from each edge
      const distanceFromLeft = x;
      const distanceFromRight = rect.width - x;
      const distanceFromTop = y;
      const distanceFromBottom = rect.height - y;
      
      // Find the minimum distance to any edge
      const minDistance = Math.min(
        distanceFromLeft,
        distanceFromRight,
        distanceFromTop,
        distanceFromBottom
      );
      
      // Calculate size based on proximity to edges
      let newSize;
      if (minDistance < edgeThreshold) {
        // Linear interpolation between maxSize and minSize
        const scale = minDistance / edgeThreshold;
        newSize = minSize + (maxSize - minSize) * scale;
        setIsBouncing(false);
      } else {
        // If we just crossed the threshold, trigger bounce
        if (!isBouncing) {
          setIsBouncing(true);
          // Clear any existing timeout
          if (bounceTimeoutRef.current) {
            clearTimeout(bounceTimeoutRef.current);
          }
          // Set a timeout to reset the bounce state
          bounceTimeoutRef.current = setTimeout(() => {
            setIsBouncing(false);
          }, 1000); // Adjust this value to control bounce duration
        }
        
        // Apply elastic bounce effect
        if (isBouncing) {
          const bounce = (t) => {
            const c4 = (2 * Math.PI) / 3;
            return t === 0
              ? 0
              : t === 1
              ? 1
              : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
          };
          
          // Calculate bounce progress
          const bounceProgress = Math.min(1, (Date.now() - bounceStartTime.current) / 1000);
          const bounceScale = bounce(bounceProgress);
          
          // Overshoot by 20% and then settle back to maxSize
          newSize = maxSize + (maxSize * 0.2 * (1 - bounceScale));
        } else {
          newSize = maxSize;
        }
      }
      
      setMaskSize(newSize);
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovering(true);
    bounceStartTime.current = Date.now();
    // Set initial mask position to current mouse position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMaskPosition({ x, y });

      // Calculate initial size based on position
      const edgeThreshold = 100;
      const minSize = 16; // Minimum size at edge (matches GlobalCursor default size)
      const maxSize = 180;
      
      // Calculate distances from each edge
      const distanceFromLeft = x;
      const distanceFromRight = rect.width - x;
      const distanceFromTop = y;
      const distanceFromBottom = rect.height - y;
      
      // Find the minimum distance to any edge
      const minDistance = Math.min(
        distanceFromLeft,
        distanceFromRight,
        distanceFromTop,
        distanceFromBottom
      );
      
      // Calculate initial size based on proximity to edges
      let initialSize;
      if (minDistance < edgeThreshold) {
        const scale = minDistance / edgeThreshold;
        initialSize = minSize + (maxSize - minSize) * scale;
      } else {
        initialSize = maxSize;
      }
      
      setMaskSize(initialSize);
    }
    // Dispatch custom event when hovering
    window.dispatchEvent(new CustomEvent('videoPlayerHover', { detail: true }));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsBouncing(false);
    setMaskSize(0);
    // Dispatch custom event when leaving
    window.dispatchEvent(new CustomEvent('videoPlayerHover', { detail: false }));
    if (bounceTimeoutRef.current) {
      clearTimeout(bounceTimeoutRef.current);
    }
  };

  // Comment out entrance animation effect
  // useEffect(() => {
  //   if (!isHovering) return;
  //   const startTime = performance.now();
  //   const duration = 1000;
  //   const startSize = 100;
  //   const endSize = 180;
  //   const animateEntrance = (currentTime) => {
  //     const elapsed = currentTime - startTime;
  //     const progress = Math.min(elapsed / duration, 1);
  //     const bounce = (t) => {
  //       const c4 = (2 * Math.PI) / 3;
  //       return t === 0
  //         ? 0
  //         : t === 1
  //         ? 1
  //         : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  //     };
  //     const currentSize = startSize + (endSize - startSize) * bounce(progress);
  //     setMaskSize(currentSize);
  //     if (progress < 1) {
  //       entranceAnimationRef.current = requestAnimationFrame(animateEntrance);
  //     } else {
  //       startBreathingAnimation();
  //     }
  //   };
  //   entranceAnimationRef.current = requestAnimationFrame(animateEntrance);
  //   return () => {
  //     if (entranceAnimationRef.current) {
  //       cancelAnimationFrame(entranceAnimationRef.current);
  //     }
  //   };
  // }, [isHovering]);

  // Function to check and maintain video synchronization
  const checkVideoSync = () => {
    if (!video1Ref.current || !video2Ref.current) return;

    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    // If either video is paused, pause the other
    if (video1.paused !== video2.paused) {
      if (video1.paused) {
        video2.pause();
      } else {
        video1.pause();
      }
      return;
    }

    // Check if videos are out of sync (more than 0.1 seconds difference)
    const timeDiff = Math.abs(video1.currentTime - video2.currentTime);
    if (timeDiff > 0.1) {
      // If out of sync, sync to the video that's further ahead
      const targetTime = Math.max(video1.currentTime, video2.currentTime);
      video1.currentTime = targetTime;
      video2.currentTime = targetTime;
    }

    // If either video has ended, restart both
    if (video1.ended || video2.ended) {
      video1.currentTime = 0;
      video2.currentTime = 0;
      video1.play();
      video2.play();
    }
  };

  // Function to handle video errors and attempt recovery
  const handleVideoError = (videoRef, error) => {
    console.error('Video error:', error);
    if (videoRef.current) {
      // Try to reload the video
      videoRef.current.load();
      videoRef.current.play().catch(console.error);
    }
  };

  // Initialize videos with synchronization
  useEffect(() => {
    if (video1Ref.current && video2Ref.current) {
      const loadVideos = async () => {
        try {
          // Set a longer timeout for loading (30 seconds)
          loadingTimeoutRef.current = setTimeout(() => {
            if (loading) {
              console.warn('Video loading timed out');
              setLoading(false);
              setError(true);
            }
          }, 30000); // 30 second timeout

          // Reset both videos to start
          video1Ref.current.currentTime = 0;
          video2Ref.current.currentTime = 0;

          // Set both videos to be invisible initially
          video1Ref.current.style.opacity = '0';
          video2Ref.current.style.opacity = '0';

          // Preload both videos
          video1Ref.current.preload = 'auto';
          video2Ref.current.preload = 'auto';

          // Add error handlers
          const handleVideoError = (e) => {
            console.error('Video error:', e);
            setError(true);
            setLoading(false);
          };

          video1Ref.current.addEventListener('error', handleVideoError);
          video2Ref.current.addEventListener('error', handleVideoError);

          // Wait for both videos to be loaded
          await Promise.all([
            new Promise((resolve, reject) => {
              const onLoadedData = () => {
                video1Ref.current.removeEventListener('loadeddata', onLoadedData);
                resolve();
              };
              video1Ref.current.addEventListener('loadeddata', onLoadedData);
              video1Ref.current.load();
            }),
            new Promise((resolve, reject) => {
              const onLoadedData = () => {
                video2Ref.current.removeEventListener('loadeddata', onLoadedData);
                resolve();
              };
              video2Ref.current.addEventListener('loadeddata', onLoadedData);
              video2Ref.current.load();
            })
          ]);

          // Start playing both videos
          const playPromises = [
            video1Ref.current.play().catch(error => {
              console.error('Error playing video1:', error);
              return Promise.reject(error);
            }),
            video2Ref.current.play().catch(error => {
              console.error('Error playing video2:', error);
              return Promise.reject(error);
            })
          ];

          await Promise.all(playPromises);

          // Set up synchronization check interval
          syncCheckInterval.current = setInterval(checkVideoSync, 100);

          // Fade in videos
          video1Ref.current.style.transition = 'opacity 1s ease-in-out';
          video2Ref.current.style.transition = 'opacity 1s ease-in-out';
          video1Ref.current.style.opacity = '1';
          video2Ref.current.style.opacity = '1';

          setLoading(false);
          setFadeIn(true);
        } catch (error) {
          console.error('Error loading videos:', error);
          setError(true);
          setLoading(false);
        } finally {
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
          }
        }
      };

      loadVideos();

      return () => {
        if (syncCheckInterval.current) {
          clearInterval(syncCheckInterval.current);
        }
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }
        if (video1Ref.current) {
          video1Ref.current.removeEventListener('error', handleVideoError);
        }
        if (video2Ref.current) {
          video2Ref.current.removeEventListener('error', handleVideoError);
        }
      };
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
          <div className="absolute inset-0 flex justify-center items-center z-20">
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