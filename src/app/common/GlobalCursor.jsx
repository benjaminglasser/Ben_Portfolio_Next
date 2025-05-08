"use client";
import React, { useEffect, useState, useRef } from "react";

const GlobalCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);
  const wasVisibleRef = useRef(true);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add global style to hide all cursor types
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Get the element under the cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      // Check if the element is interactive
      const isInteractive = element?.matches('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), [class*="cursor-pointer"], [class*="hover:text-pink"], [class*="navbar"] a, [class*="navbar"] h3') ||
                           element?.closest('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), [class*="cursor-pointer"], [class*="hover:text-pink"], [class*="navbar"] a, [class*="navbar"] h3');
      
      // Additional check for navbar elements
      const isNavbarElement = element?.closest('.navbar') && 
                            (element?.matches('a, h3') || 
                             element?.closest('a, h3'));
      
      setIsHovering(isInteractive || isNavbarElement);
    };

    const handleVideoPlayerHover = (e) => {
      const newVisibility = !e.detail;
      
      // If we're transitioning from hidden to visible (leaving VideoPlayerHome)
      if (!wasVisibleRef.current && newVisibility) {
        setShouldBounce(true);
        // Reset bounce state after animation
        setTimeout(() => setShouldBounce(false), 500);
      }
      
      wasVisibleRef.current = newVisibility;
      setIsVisible(newVisibility);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("videoPlayerHover", handleVideoPlayerHover);

    return () => {
      // Restore default cursor on cleanup
      document.body.style.cursor = 'auto';
      // Remove the global style
      style.remove();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("videoPlayerHover", handleVideoPlayerHover);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    >
      <div
        className="rounded-full border-[#A9232C]"
        style={{
          width: isHovering ? '2rem' : '1rem',
          height: isHovering ? '2rem' : '1rem',
          borderWidth: '1.5px',
          transition: 'width 0.3s ease-out, height 0.3s ease-out',
          animation: shouldBounce ? 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
        }}
      />
      <style jsx global>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default GlobalCursor; 