import React, { Suspense, lazy, useState, useRef, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  isVisible: boolean;
}

const SplineScene = React.memo(({ isVisible }: SplineSceneProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only render Spline when visible and on non-mobile devices
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    // Check if device is likely mobile/low-powered
    const isMobile = window.innerWidth < 768;
    setShouldRender(isVisible && !isMobile);
  }, [isVisible]);

  if (!shouldRender) {
    // Static fallback for mobile or when not visible
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-radial from-muted/20 to-transparent opacity-50" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Suspense 
        fallback={
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-radial from-muted/20 to-transparent animate-pulse" />
        }
      >
        <div 
          className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            filter: isHovered ? 'none' : 'grayscale(20%)',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'filter 0.5s ease, transform 0.5s ease',
          }}
        >
          <Spline
            scene="https://prod.spline.design/S7L3ayl-9-VFSU7C/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </Suspense>
    </div>
  );
});

SplineScene.displayName = 'SplineScene';

export default SplineScene;
