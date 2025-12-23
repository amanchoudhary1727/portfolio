import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Code, Database, Smartphone, Bug, Layers } from 'lucide-react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface AboutProps {
  onOpenChat: () => void;
}

const TRAJECTORY = [
  {
    role: 'B.Tech Computer Science & Engineering',
    company: 'Presidency University, Bangalore',
    period: '2022 — 2026'
  },
  {
    role: 'Top 5,000 Finalist',
    company: 'Build with India (Hack with India)',
    period: '2024'
  },
  {
    role: 'Python & Web Scraping Specialist',
    company: 'Self-Driven Projects',
    period: '2022 — Present'
  }
];

const About: React.FC<AboutProps> = ({ onOpenChat }) => {
  const [isImageHovered, setIsImageHovered] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const TECHNICAL_DOMAINS = [
    { 
      name: 'Languages', 
      detail: 'Python / Dart / JS / SQL',
      icon: Code,
      color: 'text-orange-500 group-hover:text-orange-400'
    },
    { 
      name: 'Backend', 
      detail: 'FastAPI / MongoDB',
      icon: Layers,
      color: 'text-blue-500 group-hover:text-blue-400'
    },
    { 
      name: 'Automation', 
      detail: 'Selenium / BeautifulSoup',
      icon: Bug,
      color: 'text-purple-500 group-hover:text-purple-400'
    },
    { 
      name: 'Mobile', 
      detail: 'Flutter / Android Studio',
      icon: Smartphone,
      color: 'text-emerald-500 group-hover:text-emerald-400'
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="space-y-24 lg:space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Identity */}
          <div className="space-y-12 lg:space-y-16" ref={containerRef}>
            <div className="space-y-8">
              <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                Identity
              </h2>
              <div className="space-y-6 lg:space-y-8 max-w-lg">
                <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight lg:leading-snug text-foreground">
                  A Python Developer dedicated to building robust backends and seamless user-centric applications.
                </p>
                
                <p className="text-sm lg:text-base xl:text-lg text-muted-foreground leading-relaxed font-light max-w-md">
                  Based in Bangalore, I specialize in the FastAPI ecosystem, complex web scraping (Selenium/BeautifulSoup), and Flutter mobile development. My focus is on creating tools that gather and process complex datasets into intuitive, high-performance interfaces.
                </p>
                
                <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button 
                    onClick={onOpenChat}
                    className="group flex flex-1 sm:flex-none justify-center sm:justify-between items-center gap-4 px-6 py-4 border border-border/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm text-xs sm:text-sm uppercase tracking-widest font-semibold text-foreground hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 active:scale-[0.97] min-w-[180px]"
                  >
                    <span>Consult AI</span>
                    <span className="text-blue-400 group-hover:text-blue-300 transition-all">→</span>
                  </button>
                  <a 
                    href="/Resume_Aman_Choudhary.pdf" 
                    download="Aman_Choudhary_Resume.pdf"
                    className="group flex flex-1 sm:flex-none justify-center sm:justify-between items-center gap-4 px-6 py-4 border border-border/50 text-xs sm:text-sm uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all duration-300 active:scale-[0.97] min-w-[180px]"
                  >
                    <span>Download Resume</span>
                    <span className="text-muted-foreground/70 group-hover:text-foreground transition-all">↓</span>
                  </a>
                </div>

                {/* Spline 3D Scene with Projects-Style Halftone Effect */}
                <div 
                  className="pt-12 lg:pt-16 profile-image-container relative"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                >
                  <svg className="hidden">
                    <filter id="profile-halftone">
                      <feColorMatrix type="saturate" values="0" />
                      <feComponentTransfer>
                        <feFuncR type="discrete" tableValues="0 1" />
                        <feFuncG type="discrete" tableValues="0 1" />
                        <feFuncB type="discrete" tableValues="0 1" />
                      </feComponentTransfer>
                    </filter>
                  </svg>

                  <div className="halftone-container aspect-[4/5] bg-card/50 overflow-hidden relative border border-border shadow-2xl transition-all duration-700 hover:border-foreground/50 max-w-sm mx-auto lg:mx-0">
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-100 transition-opacity duration-1000">
                      <Suspense fallback={<div className="w-full h-full bg-zinc-950 animate-pulse rounded-xl" />}>
                        {isVisible && (
                          <div className={`w-full h-full transition-transform duration-1000 ease-out ${isImageHovered ? 'scale-105' : 'scale-100'}`}>
                            <Spline 
                              scene="https://prod.spline.design/MoAzfyIx3TUAZHNB/scene.splinecode"
                            />
                          </div>
                        )}
                      </Suspense>
                    </div>
                    
                    <div className="absolute inset-0 bg-card/30 pointer-events-none z-10" />
                    
                    <div className="absolute top-6 left-6 z-20">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest bg-card/90 px-3 py-1.5 backdrop-blur-md border border-border/50 rounded-full">
                        REF_00
                      </span>
                    </div>
                  </div>

                  <style>{`
                    .profile-image-container .halftone-container::after {
                      content: '';
                      position: absolute;
                      inset: 0;
                      background-image: radial-gradient(rgba(0,0,0,0.9) 1px, transparent 0);
                      background-size: 3px 3px;
                      opacity: 0.4;
                      pointer-events: none;
                      z-index: 15;
                      transition: opacity 0.5s ease;
                    }
                    .profile-image-container:hover .halftone-container::after {
                      opacity: 0.2;
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Domains & Experience */}
          <div className="space-y-20 lg:space-y-24">
            <div className="space-y-8">
              <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                Technical Domains
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {TECHNICAL_DOMAINS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={item.name} 
                      className="group border-l border-border/50 pl-6 py-4 lg:py-6 hover:border-foreground/50 hover:pl-8 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 transition-all group-hover:scale-110 duration-300 ${item.color.includes('orange') ? '' : ''}`}>
                          <IconComponent className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground/70 font-medium group-hover:text-muted-foreground">
                          {item.name}
                        </p>
                      </div>
                      <p className="text-sm lg:text-base font-semibold text-foreground leading-tight">
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-12 pt-12 lg:pt-16 border-t border-border/30">
              <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                Trajectory
              </h2>
              <div className="space-y-8 lg:space-y-10">
                {TRAJECTORY.map((exp, i) => (
                  <div 
                    key={i} 
                    className="group flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-4 lg:gap-8 p-6 border border-border/20 rounded-xl hover:border-foreground/30 hover:bg-card/30 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="space-y-2 flex-1">
                      <p className="text-base lg:text-lg xl:text-xl font-semibold uppercase tracking-tight text-foreground group-hover:text-foreground/90 transition-all">
                        {exp.role}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm lg:text-base font-mono text-muted-foreground/70 tracking-wider self-start lg:self-end uppercase whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-12 lg:pt-16 border-t border-border/30">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/70 font-medium mb-8">
                Philosophy
              </p>
              <blockquote className="text-muted-foreground font-light text-sm lg:text-base leading-relaxed italic border-l-4 border-gradient pl-8 py-6 bg-card/20 rounded-xl backdrop-blur-sm">
                "Building robust, user-centric applications through a versatile skill set and deep technical curiosity."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
