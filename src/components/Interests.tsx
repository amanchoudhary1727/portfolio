import { Brain, Server, Smartphone, Globe, Code, Database } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const interests = [
  {
    icon: Brain,
    label: 'AI & Large Language Models',
    description: 'Exploring the frontier of generative AI',
  },
  {
    icon: Server,
    label: 'Backend Development',
    description: 'Building scalable APIs with FastAPI & Python',
  },
  {
    icon: Smartphone,
    label: 'Mobile App Development',
    description: 'Cross-platform apps with Flutter & Dart',
  },
  {
    icon: Globe,
    label: 'Web Scraping',
    description: 'Advanced data extraction techniques',
  },
  {
    icon: Code,
    label: 'Problem Solving',
    description: 'Algorithm design & optimization',
  },
  {
    icon: Database,
    label: 'Database Design',
    description: 'MongoDB & SQL data modeling',
  },
];

const Interests = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="interests" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-grid-white/[0.1]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className={`mb-16 fade-in-up ${isVisible ? 'animate-in slide-in-from-top duration-1000' : ''}`}>
          <span className="text-xs font-light tracking-widest uppercase text-muted-foreground/60 mono inline-flex items-center gap-4 mb-6">
            <span className="w-24 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            03 — Interests
            <span className="w-24 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight">
            What drives me
          </h2>
        </div>
        
        {/* Interests Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 ${isVisible ? 'animate-in fade-in duration-1000 delay-300' : ''}`}>
          {interests.map((interest, index) => {
            const IconComponent = interest.icon;
            return (
              <div
                key={interest.label}
                className="group relative p-8 border border-border/30 rounded-2xl bg-card/20 backdrop-blur-sm hover:border-foreground/30 hover:bg-card/50 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-[2deg] overflow-hidden h-[220px] flex flex-col justify-between fade-in-up"
                style={{ 
                  animationDelay: `${600 + index * 120}ms`,
                  '--tw-ring-color': '#ffffff20' 
                } as React.CSSProperties}
              >
                {/* Floating Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:animate-border-float transition-all duration-1000 -z-10" />
                
                {/* Icon + Title Container */}
                <div className="relative flex-shrink-0 space-y-4">
                  <div className="group-hover:scale-110 transition-all duration-700 p-6 bg-card/50 border border-border/50 rounded-2xl group-hover:border-foreground/30 group-hover:bg-foreground/5">
                    <div className="flex items-center gap-4 mb-3">
                      <IconComponent 
                        size={28} 
                        className="text-muted-foreground/70 group-hover:text-foreground shrink-0 transition-all duration-700" 
                      />
                      <div className="h-px w-0 bg-foreground/30 group-hover:w-16 transition-all duration-700" />
                    </div>
                    <h3 className="text-xl font-medium group-hover:text-foreground transition-all duration-700 leading-tight">
                      {interest.label}
                    </h3>
                  </div>
                </div>
                
                <div className="relative z-10 flex-1">
                  <p className="text-sm text-muted-foreground/70 leading-relaxed group-hover:text-muted-foreground transition-all duration-700 line-clamp-3">
                    {interest.description}
                  </p>
                </div>
                
                {/* Expanding Underline */}
                <div className="h-[2px] w-0 bg-gradient-to-r from-transparent via-foreground/30 to-transparent group-hover:w-full transition-all duration-700 origin-left" />
              </div>
            );
          })}
        </div>
        
        {/* Refined Skills Section */}
        <div className={`mt-24 pt-16 border-t border-border/20 relative ${isVisible ? 'animate-in slide-in-from-bottom duration-1000 delay-1200' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/2 via-transparent to-foreground/2 h-[1px] -top-1" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <p className="text-xs font-light tracking-widest uppercase text-muted-foreground/60 mono">
              Technical Skills
            </p>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent hidden sm:block" />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {['Python', 'Dart', 'JavaScript', 'React.js', 'Flutter', 'FastAPI', 'Selenium', 'BeautifulSoup', 'MongoDB', 'SQL', 'Git'].map((skill, index) => (
              <span
                key={skill}
                className="group relative px-6 py-3 text-sm font-light text-foreground bg-card/60 border border-foreground/40 rounded-full shadow-lg scale-[1.05] overflow-hidden inline-block backdrop-blur-sm"
                style={{ animationDelay: `${1400 + index * 80}ms` }}
              >
                <span className="relative z-10">{skill}</span>
                {/* Always Active Glow - Animated */}
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent rounded-full -skew-x-12 transform animate-shine" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes border-float {
          0% { clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); border-color: #ffffff20; }
          25% { clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%); border-color: #ffffff30; }
          50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); border-color: #ffffff40; }
          75% { clip-path: polygon(0 0, 100% 0, 100% 50%, 50% 50%); border-color: #ffffff30; }
          100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); border-color: #ffffff20; }
        }
        
        .animate-border-float {
          animation: border-float 3s ease-in-out infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shine {
          animation: shine 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Interests;
