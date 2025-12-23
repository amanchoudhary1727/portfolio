import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const experience = [
  {
    title: 'B.Tech in Computer Science & Engineering',
    company: 'Presidency University, Bangalore',
    period: '2022 – 2026',
    description: 'Full-stack development, algorithms, and software engineering fundamentals.',
  },
];

const certifications = [
  'The Complete Database and Algorithms in Python - Udemy',
  'SQL for Data Science - Udemy',
  'Data Structures & Algorithms - CodeChef',
  'GDG Code to Commit - Certificate of Participation',
  'Build with India: Top 5,000 rank out of 25,000 teams (Google Office Finale)',
];

const Resume = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <section id="resume" className="relative py-24 md:py-32 px-6 md:px-12 bg-card/30 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className={`mb-20 fade-in-up ${isVisible ? 'animate-in slide-in-from-top duration-1000' : ''}`}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-xs font-light tracking-widest uppercase text-muted-foreground/70 mono inline-flex items-center gap-4">
                <span className="w-24 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                04 — Resume
                <span className="w-24 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              </span>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
                Experience & Education
              </h2>
            </div>
            <a
              href="/Resume_Aman_Choudhary.pdf"
              download
              className="group relative inline-flex items-center gap-3 px-8 py-4 border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl text-sm font-medium tracking-wider hover:border-foreground/40 hover:bg-card hover:shadow-2xl hover:shadow-white/25 transition-all duration-500 overflow-hidden"
            >
              <Download size={18} className="text-muted-foreground group-hover:text-foreground transition-all duration-500" />
              <span>Download PDF</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm -z-10" />
            </a>
          </div>
        </div>

        {/* Education Cards */}
        <div className={`space-y-8 ${isVisible ? 'animate-in fade-in duration-1000 delay-400' : ''}`}>
          {experience.map((item, index) => (
            <div 
              key={item.title}
              className="group relative p-8 border border-border/30 rounded-2xl bg-card/30 backdrop-blur-sm hover:border-foreground/40 hover:bg-card/60 hover:shadow-2xl transition-all duration-700 overflow-hidden max-w-3xl mx-auto"
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <h4 className="text-2xl font-semibold text-foreground group-hover:text-foreground/90 transition-colors duration-700">
                    {item.title}
                  </h4>
                  <span className="text-sm font-mono text-muted-foreground/70 tracking-wider px-4 py-2 bg-card/50 border border-border/50 rounded-full whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
                
                <div className="h-[2px] w-0 bg-gradient-to-r from-transparent via-foreground/40 to-transparent group-hover:w-full transition-all duration-700 origin-left" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                  <div>
                    <p className="text-lg font-medium text-foreground/90">{item.company}</p>
                  </div>
                  <p className="text-base text-muted-foreground/80 leading-relaxed lg:text-right group-hover:text-muted-foreground transition-colors duration-700">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className={`mt-24 pt-16 border-t border-border/20 relative ${isVisible ? 'animate-in slide-in-from-bottom duration-1000 delay-1000' : ''}`}>
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-sm font-light tracking-widest uppercase text-muted-foreground/70 mono flex-1">
              Certifications & Achievements
            </h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-all lg:hidden px-4 py-2 border border-border/50 rounded-lg"
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {isExpanded ? 'Less' : 'More'}
            </button>
          </div>

          <div className={`${isExpanded ? 'max-h-none' : 'max-h-32 lg:max-h-none'} overflow-hidden transition-all duration-700`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-4 p-6 border border-border/40 rounded-xl bg-card/40 backdrop-blur-sm hover:border-foreground/50 hover:bg-card/70 hover:shadow-xl transition-all duration-500 overflow-hidden"
                  style={{ animationDelay: `${1200 + index * 100}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/60 group-hover:bg-foreground/80 group-hover:scale-125 transition-all duration-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground/90 group-hover:text-foreground leading-tight line-clamp-2">
                      {cert}
                    </p>
                  </div>
                  <div className="h-px w-0 bg-foreground/30 group-hover:w-20 transition-all duration-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
