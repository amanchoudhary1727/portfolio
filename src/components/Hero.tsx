import React, { Suspense, useState, useRef, useEffect } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const DESKTOP_SCENE =
  'https://prod.spline.design/S7L3ayl-9-VFSU7C/scene.splinecode';

const MOBILE_SCENE =
  'https://prod.spline.design/d66hl3Fv4xOCKidb/scene.splinecode';

const Hero: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-zinc-950 flex flex-col justify-between p-6 md:p-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ===================== */}
      {/* 3D Background */}
      {/* ===================== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Suspense fallback={<div className="w-full h-full bg-zinc-950 animate-pulse" />}>
          {isVisible && (
            <>
              {/* Desktop / Laptop Spline */}
              <div className="hidden md:block w-full h-full">
                <div
                  className={`w-full h-full transition-transform duration-1000 ease-out ${
                    isHovering ? 'scale-105' : 'scale-100'
                  }`}
                >
                  <Spline scene={DESKTOP_SCENE} />
                </div>
              </div>

              {/* Mobile / Small Screen Spline */}
              <div className="block md:hidden w-full h-full">
                <Spline loading-anim-type="spinner-small-dark" scene={MOBILE_SCENE} />
                
              </div>
            </>
          )}
        </Suspense>
      </div>

      {/* ===================== */}
      {/* 🔒 Mobile Interaction Blocker */}
      {/* ===================== */}
      <div className="absolute inset-0 z-10 bg-transparent md:hidden" />

      {/* ===================== */}
      {/* Visual Overlays */}
      {/* ===================== */}
      <div className="absolute inset-0 z-15 pointer-events-none opacity-30 md:opacity-100 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.8)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-1/3 z-15 pointer-events-none bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent transition-all duration-700" />

      {/* ===================== */}
      {/* Top Text Overlay */}
      {/* ===================== */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase drop-shadow-sm leading-[0.85] md:leading-none">
            <span className="block md:inline">Aman</span>
            <span className="block md:inline md:ml-4">Choudhary</span>
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-400 md:text-zinc-500 pt-2 md:pt-0">
            Python Developer & AI Enthusiast
          </p>
        </div>
      </div>

      {/* ===================== */}
      {/* Bottom Text Overlay */}
      {/* ===================== */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-xs space-y-4">
          <p className="text-sm leading-relaxed text-zinc-100 md:text-zinc-400 font-light drop-shadow-md md:drop-shadow-none">
            Specializing in high-performance backends, sophisticated data pipelines,
            and responsive digital interfaces.
          </p>
        </div>

        <div className="hidden md:block">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 text-right">
            Based in Bangalore, India
            <br />
            Current: Presidency University
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hero);
