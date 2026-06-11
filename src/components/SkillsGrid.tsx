import { useState } from 'react';
import { SKILLS_DATA } from '../data';
import { Skill } from '../types';
import { Code2, Cpu, Globe2, BookOpen, Sparkles, Sliders } from 'lucide-react';

export default function SkillsGrid() {
  const [activeTab, setActiveTab] = useState<'all' | 'programming' | 'web' | 'engineering' | 'core' | 'professional'>('all');

  const filteredSkills = activeTab === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(skill => skill.category === activeTab);

  const categories = [
    { id: 'all', name: 'All Skills', icon: Sliders },
    { id: 'programming', name: 'Languages', icon: Code2 },
    { id: 'web', name: 'Web Dev', icon: Globe2 },
    { id: 'engineering', name: 'Engineering', icon: Cpu },
    { id: 'core', name: 'Core Theory', icon: BookOpen },
    { id: 'professional', name: 'Leadership & Collab', icon: Sparkles },
  ];

  return (
    <div className="w-full font-sans">
      {/* Editorial Category Pill Selection */}
      <div className="flex flex-wrap gap-2.5 mb-8 border-b border-white/5 pb-4 select-none justify-center lg:justify-start">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-white text-black border-white font-semibold' 
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Exquisite Minimalist Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSkills.map((sk) => {
          return (
            <div
              key={sk.name}
              className="group relative border border-white/5 rounded-xl p-5 bg-[#121212] hover:border-white/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3 select-none">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{sk.category}</span>
                <span className="font-mono text-xs text-[#00f2ff] font-medium">
                  {sk.level}%
                </span>
              </div>

              <h4 className="text-base font-semibold text-white tracking-tight group-hover:text-[#00f2ff] transition-colors duration-200">
                {sk.name}
              </h4>

              {/* Progress Bar Visual Grid */}
              <div className="w-full h-[3px] bg-neutral-950 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500 group-hover:bg-[#00f2ff]"
                  style={{ width: `${sk.level}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Baseline Description */}
      <div className="mt-8 select-none text-center lg:text-left">
        <p className="text-xs font-mono text-neutral-500 max-w-2xl">
          * Integrating software engineering design systems with electronic circuits and computer architecture.
        </p>
      </div>
    </div>
  );
}
