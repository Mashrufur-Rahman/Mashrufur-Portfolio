import { useState } from 'react';
import { EDUCATION_DATA } from '../data';
import { Calendar, GraduationCap, Link2, MapPin, Award } from 'lucide-react';

export default function Timeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getEduLink = (id: string) => {
    switch (id) {
      case 'edu-hshl': return 'https://www.hshl.de/en/';
      case 'edu-gub': return 'https://green.edu.bd/';
      default: return null;
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto py-8 font-sans">
      {/* Editorial Vertical Line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-neutral-800 pointer-events-none select-none z-0" />

      <div className="space-y-12">
        {EDUCATION_DATA.map((edu, idx) => {
          const link = getEduLink(edu.id);
          const hovered = hoveredIdx === idx;

          return (
            <div 
              key={edu.id}
              className="relative flex gap-8 md:gap-12 items-start z-10 group"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Left Indicator - Small white or cyan dot on timeline line */}
              <div 
                className="absolute left-6 md:left-8 top-3.5 w-2.5 h-2.5 rounded-full bg-[#050505] border-2 -translate-x-1/2 transition-colors duration-300 z-20 pointer-events-none"
                style={{
                  borderColor: hovered ? '#00FFFF' : '#404040'
                }}
              />

              {/* Timeline content body */}
              <div className="pl-12 w-full">
                <div 
                  className={`border rounded-xl p-6 bg-[#121212] transition-colors duration-300 ${
                    hovered ? 'border-[#00FFFF]/30' : 'border-white/5'
                  }`}
                >
                  {/* Period badge and location */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 select-none">
                    <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#00FFFF] bg-[#00FFFF]/5 border border-[#00FFFF]/10 rounded-md px-2.5 py-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#808080] font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{edu.location}</span>
                    </span>
                  </div>

                  {/* Title / School names */}
                  <h3 className="text-lg md:text-xl font-bold text-[#FFFFFF] tracking-tight group-hover:text-[#00FFFF] transition-colors duration-250">
                    {edu.degree}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-4 select-all">
                    <span className="text-sm text-[#B3B3B3] font-medium">{edu.school}</span>
                    {link && (
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#00FFFF]/70 hover:text-[#00FFFF] transition-colors cursor-pointer"
                        title="Visit Institution Site"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Details paragraph */}
                  <p className="text-sm text-[#B3B3B3] leading-relaxed font-sans max-w-2xl">
                    {edu.details}
                  </p>

                  {/* Merit Grades and credits */}
                  <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-white/5 select-none">
                    {edu.grade && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#00FFFF] bg-[#00FFFF]/5 border border-[#00FFFF]/10 px-2.5 py-1 rounded-md">
                        <Award className="w-3.5 h-3.5 text-[#00FFFF]" />
                        <span>{edu.grade}</span>
                      </div>
                    )}
                    {edu.credits && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#00FFFF] bg-[#00FFFF]/5 border border-[#00FFFF]/10 px-2.5 py-1 rounded-md">
                        <span>{edu.credits}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
