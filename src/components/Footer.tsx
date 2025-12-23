import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const socialLinks = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:aman.1727.2706@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aman-choudhary-5656a72a1',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/amanchoudhary1727',
  },
  {
    icon: Phone,
    label: 'Phone',
    href: '#',
  },
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Play animation every time it comes into view
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border/50 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/30" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 lg:gap-32 items-start">
          {/* Left - Contact */}
          <div className={`space-y-8 fade-in-up ${isVisible ? 'animate-in slide-in-from-bottom duration-1000 delay-200' : ''}`}>
            <div>
              <span className="text-xs font-light tracking-widest uppercase text-muted-foreground/70 mono inline-flex items-center gap-2">
                <span className="w-24 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
                06 — Contact
                <span className="w-24 h-[1px] bg-gradient-to-r from-transparent to-border via-border" />
              </span>
            </div>
            <div className="space-y-6 max-w-md">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
                Let's connect
              </h2>
              <p className="text-foreground/70 font-light leading-relaxed">
                Available for freelance projects, collaborations, or just a friendly chat about 
                technology and development.
              </p>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground/80 font-mono tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Bangalore, India • Available Immediately
                </p>
              </div>
            </div>
          </div>
          
          {/* Right - Links */}
          <div className={`fade-in-up ${isVisible ? 'animate-in slide-in-from-right duration-1000 delay-600' : ''}`}>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative flex items-center gap-4 p-6 border border-border/30 rounded-2xl hover:border-foreground/30 hover:bg-gradient-to-r hover:from-foreground/5 hover:to-blue-500/5 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[1deg] overflow-hidden"
                    style={{
                      animationDelay: `${400 + index * 150}ms`
                    }}
                  >
                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-white/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 animate-shimmer" />
                    
                    {/* Icon Container */}
                    <div className="relative z-10 p-3 bg-card/50 border border-border/50 rounded-xl group-hover:bg-foreground/10 group-hover:border-foreground/30 transition-all duration-500 group-hover:scale-110">
                      <IconComponent size={20} className="text-muted-foreground group-hover:text-foreground transition-all duration-500" />
                    </div>
                    
                    <div className="relative z-10 min-w-0 flex-1">
                      <span className="text-sm font-medium group-hover:text-foreground transition-all duration-500">
                        {link.label}
                      </span>
                      <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-foreground/50 to-transparent mt-2 group-hover:w-full transition-all duration-500" />
                    </div>
                    
                    {/* Hover Arrow */}
                    <span className="text-xs text-muted-foreground/50 group-hover:text-foreground/80 transition-all duration-500 ml-auto">
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Bottom - Clean */}
        <div className={`mt-24 pt-12 border-t border-border/20 relative ${isVisible ? 'animate-in fade-in duration-1000 delay-1200' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-transparent to-blue-500/3 rounded-3xl -mx-6 blur-xl" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <p className="text-xs text-muted-foreground/70 font-light tracking-wide backdrop-blur-sm">
              © {new Date().getFullYear()} Aman Choudhary. All rights reserved.
            </p>
            <div className="h-[1px] w-full md:w-24 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            <p className="text-xs text-muted-foreground/50 font-mono tracking-widest px-4 py-2 bg-card/30 border border-border/30 rounded-full backdrop-blur-sm">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
