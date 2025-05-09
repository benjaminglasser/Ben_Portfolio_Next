"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const GlobalCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const wasVisibleRef = useRef(true);
  const pathname = usePathname();
  const router = useRouter();
  const mountTimeoutRef = useRef(null);
  const loadingTimeoutRef = useRef(null);

  // Debug flag - set to true to force loading state
  const DEBUG_FORCE_LOADING = false;

  useEffect(() => {
    // Handle click events on links
    const handleLinkClick = () => {
      // Clear any existing loading timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      // Add a small delay before showing the loading state
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(true);
      }, 100);
    };

    // Handle page transition completion
    const handleRouteChangeComplete = () => {
      // Clear any existing timeouts
      if (mountTimeoutRef.current) {
        clearTimeout(mountTimeoutRef.current);
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      // Set a small timeout to ensure the page has mounted
      mountTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 50);
    };

    // Add click listeners to all links
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target) {
        // Get the href from the link
        const href = target.getAttribute('href');
        // Only trigger loading if the link points to a different page
        if (href && href !== pathname && !href.startsWith('#')) {
          handleLinkClick();
        }
      }
    });

    // Listen for Next.js route change events
    window.addEventListener('routeChangeStart', (url) => {
      // Only trigger loading if the new URL is different from current pathname
      if (url !== pathname) {
        handleLinkClick();
        // Force cursor to stay hidden during route change
        document.body.style.cursor = 'none';
      }
    });
    window.addEventListener('routeChangeComplete', (url) => {
      handleRouteChangeComplete();
      // Ensure cursor stays hidden after route change
      document.body.style.cursor = 'none';
    });
    window.addEventListener('routeChangeError', (url) => {
      handleRouteChangeComplete();
      // Ensure cursor stays hidden even if route change fails
      document.body.style.cursor = 'none';
    });

    // Also listen for when the page is actually mounted
    const handlePageMount = () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (mountTimeoutRef.current) {
        clearTimeout(mountTimeoutRef.current);
      }
      setIsLoading(false);
      // Ensure cursor stays hidden after page mount
      document.body.style.cursor = 'none';
    };

    document.addEventListener('DOMContentLoaded', handlePageMount);
    window.addEventListener('load', handlePageMount);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('routeChangeStart', handleLinkClick);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('routeChangeError', handleRouteChangeComplete);
      document.removeEventListener('DOMContentLoaded', handlePageMount);
      window.removeEventListener('load', handlePageMount);
      
      // Clear any pending timeouts on cleanup
      if (mountTimeoutRef.current) {
        clearTimeout(mountTimeoutRef.current);
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Force reset loading state when pathname changes
  useEffect(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    if (mountTimeoutRef.current) {
      clearTimeout(mountTimeoutRef.current);
    }
    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Only proceed with cursor setup if not mobile
    if (!isMobile) {
      // Hide default cursor
      document.body.style.cursor = 'none';
      
      // Add global style to hide all cursor types
      const style = document.createElement('style');
      style.innerHTML = `
        html, body {
          cursor: none !important;
        }
        * {
          cursor: none !important;
        }
        *:active {
          cursor: none !important;
        }
        *:focus {
          cursor: none !important;
          outline: none !important;
        }
        *:hover {
          cursor: none !important;
        }
        *:focus-visible {
          outline: none !important;
        }
        *:focus-within {
          cursor: none !important;
        }
        *:active * {
          cursor: none !important;
        }
        *:focus * {
          cursor: none !important;
        }
        *:hover * {
          cursor: none !important;
        }
        a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]) {
          cursor: none !important;
        }
        a:active, button:active, [role="button"]:active, input:active, select:active, textarea:active, [tabindex]:not([tabindex="-1"]):active {
          cursor: none !important;
        }
        a:focus, button:focus, [role="button"]:focus, input:focus, select:focus, textarea:focus, [tabindex]:not([tabindex="-1"]):focus {
          cursor: none !important;
        }
        a:hover, button:hover, [role="button"]:hover, input:hover, select:hover, textarea:hover, [tabindex]:not([tabindex="-1"]):hover {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);

      // Add a MutationObserver to ensure cursor stays hidden
      const observer = new MutationObserver(() => {
        document.body.style.cursor = 'none';
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style']
      });

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

      const handleMouseDown = () => {
        setIsClicking(true);
      };

      const handleMouseUp = () => {
        setIsClicking(false);
      };

      const handleVideoPlayerHover = (e) => {
        const newVisibility = !e.detail;
        wasVisibleRef.current = newVisibility;
        // Only hide the cursor if we're not loading
        if (!isLoading) {
          setIsVisible(newVisibility);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("videoPlayerHover", handleVideoPlayerHover);

      return () => {
        // Restore default cursor on cleanup
        document.body.style.cursor = 'auto';
        // Remove the global style
        style.remove();
        // Disconnect the observer
        observer.disconnect();
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("videoPlayerHover", handleVideoPlayerHover);
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Don't render anything on mobile devices
  if (isMobile || !isVisible) return null;

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
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: isLoading ? 'spin 1s linear infinite' : shouldBounce ? 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
          borderStyle: isLoading ? 'solid' : 'solid',
          borderColor: isLoading ? '#A9232C #A9232C transparent #A9232C' : '#A9232C',
          transform: isClicking ? 'scale(0.75)' : 'scale(1)',
          opacity: isLoading ? 1 : 1,
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

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default GlobalCursor; 