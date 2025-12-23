import React, { useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';

const STIPPLED_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%2309090b'/%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='discrete' tableValues='0 1'/%3E%3CfeFuncG type='discrete' tableValues='0 1'/%3E%3CfeFuncB type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='400' height='500' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  tech: string[];
  link: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'PyPiHot',
    category: 'Web / Full-Stack / DevTools',
    description: 'A full-stack package intelligence platform aggregating PyPI stats, metadata, and GitHub insights into a single interface for faster, informed package decisions.',
    year: '2025',
    tech: ['React', 'TypeScript', 'ShadCN UI', 'FastAPI', 'Vercel'],
    link: 'https://pypihot.vercel.app/',
    image: '/pypihot.png'
  },
  {
    id: '02',
    title: 'SafeMath',
    category: 'Library / Data / Reliability',
    description: 'A production-ready Python library that makes math operations crash-free across Python, NumPy, and Pandas by safely handling division by zero, invalid logs, and other edge cases.',
    year: '2024',
    tech: ['Python', 'NumPy', 'Pandas'],
    link: 'https://pypi.org/project/safemath/',
    image: '/safemath.png'
  },
  {
    id: '03',
    title: 'Crypto Assistant',
    category: 'Web / AI / Finance',
    description: 'An AI-powered crypto dashboard and chatbot that combines live market data with Gemini-powered conversations, charts, comparison tables, and news cards.',
    year: '2024',
    tech: ['React 19', 'Tailwind CSS', 'Recharts', 'CoinGecko API', 'Gemini API'],
    link: 'https://crypto-expert.vercel.app/',
    image: '/cryptoassistant.png'
  },
  {
    id: '04',
    title: 'Falsehoodus Maximus',
    category: 'AI / Security / Experiment',
    description: 'A playful proof-of-concept chatbot using Gemini and FastAPI that intentionally demonstrates prompt injection by generating exaggerated, wrong answers on purpose.',
    year: '2024',
    tech: ['Python', 'FastAPI', 'Gemini API', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://falsehoodus-maximus.onrender.com/',
    image: '/falsehoodusmaximus.png'
  },
  {
    id: '05',
    title: 'Nutriscan',
    category: 'Mobile / AI / Health',
    description: 'A comprehensive mobile nutrition app that scans food barcodes to show detailed nutritional facts, health scores, AI summaries of pros/cons, and healthier alternatives.',
    year: '2025',
    tech: ['Flutter', 'Python', 'MongoDB', 'Gemini API'],
    link: '#',
    image: '/nutriscan.png'
  },
  {
    id: '06',
    title: 'Spotify Random Tracks Player',
    category: 'Web / API / Music',
    description: 'A lightweight Flask web app that plays random tracks from user-specified artists using the Spotify API, without creating playlists or queues.',
    year: '2024',
    tech: ['Flask', 'Spotify API', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/amanchoudhary1727/Spotify-Random-Tracks-Player',
    image: '/spotify.png'
  },
];


const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(PROJECTS.map(p => p.category.split(' / ')[0])));
    return ['All', ...uniqueCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(project => project.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 md:px-12 bg-card/30">
      <div className="max-w-6xl mx-auto">

<svg className="hidden">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
    <feBlend mode="multiply" in="SourceGraphic" in2="noise" result="grainy"/>
  </filter>
</svg>

<style>{`
  .halftone-container::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
      radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px);
    background-size: 4px 4px;
    background-position: 0 0, 2px 2px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 5;
    transition: opacity 0.4s ease;
  }
  .halftone-image {
    filter: url(#grain) contrast(140%) brightness(85%);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .project-card:hover .halftone-image {
    filter: brightness(100%) contrast(100%);
    transform: scale(1.03);
  }
  .project-card:hover .halftone-container::after {
    opacity: 0.3;
  }
`}</style>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12 fade-in-up">
          <div className="space-y-6">
            <span className="text-xs font-light tracking-widest uppercase text-muted-foreground mono">
              02 — Work
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 border-b pb-1 font-semibold ${
                    activeCategory === category 
                      ? 'text-foreground border-foreground' 
                      : 'text-muted-foreground border-transparent hover:text-foreground/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-mono tracking-tighter">
            PROJECTS: {filteredProjects.length.toString().padStart(2, '0')} — {PROJECTS.length.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-24">
          {filteredProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              className="project-card group block space-y-8 fade-in-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="halftone-container aspect-[4/5] bg-card/50 overflow-hidden relative border border-border shadow-2xl transition-all duration-700 group-hover:border-foreground/50">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="halftone-image w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest bg-card/90 px-3 py-1.5 backdrop-blur-md border border-border/50 rounded-full">
                    REF_{project.id}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-medium group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-light">
                      {project.category}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono mt-2 tracking-widest">
                    {project.year}
                  </span>
                </div>
                
                <div className="h-[1px] w-0 group-hover:w-full bg-border/50 transition-all duration-700" />
                
                <p className="text-sm text-muted-foreground font-light leading-relaxed transition-all duration-700 md:opacity-60 group-hover:opacity-100">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-light tracking-wide text-muted-foreground border border-border/50 rounded-full mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
