import React, { useState } from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Maximize2, X, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  key?: string;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Outer Project Card - Elegant Case study style */}
      <div 
        className="group relative flex flex-col bg-[#121212] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 h-full hover:border-[#00FFFF]/40 hover:shadow-[0_12px_30px_rgba(0,255,255,0.04)]"
      >
        {/* Project Image */}
        <div className="relative h-56 w-full overflow-hidden shrink-0 border-b border-white/5 bg-neutral-900">
          <img 
            src={project.image} 
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-[1.02] group-hover:brightness-100 transition-all duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        </div>

        {/* Card Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Tech tag list */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <span 
                  key={tech} 
                  className="text-[11px] font-mono font-medium text-[#B3B3B3] bg-white/5 border border-white/10 rounded-md px-2.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[#FFFFFF] tracking-tight group-hover:text-[#00FFFF] transition-colors duration-250">
              {project.title}
            </h3>

            <p className="text-sm text-[#B3B3B3] leading-relaxed font-sans">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-white/5 pt-5 mt-5">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-[#B3B3B3] hover:text-[#FFFFFF] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-[#050505] bg-[#00FFFF] hover:bg-[#00FFFF]/80 rounded-lg transition-colors cursor-pointer font-bold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Detail Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 transition-all">
          <div 
            className="w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-black/40 select-none">
              <span className="text-xs font-mono text-[#808080] uppercase tracking-widest">Case study detail</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-[#B3B3B3] hover:text-[#FFFFFF] cursor-pointer transition-colors"
                title="Close case study details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Cover Banner */}
              <div className="relative h-48 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-inner">
                <img 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <h4 className="absolute bottom-4 left-6 text-xl md:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                  {project.title}
                </h4>
              </div>

              {/* High level description */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-mono text-[#00FFFF] uppercase tracking-wider font-semibold">Overview</h5>
                <p className="text-sm leading-relaxed text-[#B3B3B3]">
                  {project.summary}
                </p>
              </div>

              {/* Technologies list */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-mono text-[#00FFFF] uppercase tracking-wider font-semibold">Technology Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono bg-white/5 border border-white/10 text-[#B3B3B3] rounded-md px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feature bullets */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <h5 className="text-[11px] font-mono text-[#00FFFF] uppercase tracking-wider font-semibold">Key Implementations & Milestones</h5>
                <ul className="grid grid-cols-1 gap-3">
                  {project.details.map((bullet, index) => (
                    <li key={index} className="text-xs md:text-sm leading-relaxed text-[#B3B3B3] flex items-start gap-3">
                      <span className="text-[#00FFFF] font-serif font-bold text-xs shrink-0 select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between bg-black/40">
              <span className="text-xs font-mono text-[#808080] select-none">ID: {project.id}</span>
              <div className="flex items-center gap-3">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#FFFFFF] text-black hover:bg-neutral-200 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2 font-mono uppercase font-bold"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 hover:bg-white/5 border border-white/10 rounded-lg text-xs text-[#B3B3B3] hover:text-[#FFFFFF] cursor-pointer select-none font-mono uppercase font-bold"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
