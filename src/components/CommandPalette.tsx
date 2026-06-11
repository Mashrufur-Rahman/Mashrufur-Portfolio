import { useEffect, useState, useRef } from 'react';
import { Search, Hash, Star, Zap, Terminal, Globe, Calendar, Compass, Sparkles } from 'lucide-react';

interface CommandPaletteProps {
  onTriggerAction: (action: string) => void;
  onOpenTerminal: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CommandPalette({ onTriggerAction, onOpenTerminal, isOpen, setIsOpen }: CommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const items = [
    { id: 'sec-hero', name: 'Navigate: System Launch (Hero)', category: 'Navigation', icon: Globe, action: () => onTriggerAction('hero') },
    { id: 'sec-about', name: 'Navigate: Biography Story (About Me)', category: 'Navigation', icon: Star, action: () => onTriggerAction('about') },
    { id: 'sec-timeline', name: 'Navigate: Education Timeline', category: 'Navigation', icon: Calendar, action: () => onTriggerAction('timeline') },
    { id: 'sec-skills', name: 'Navigate: Skills Ecosystem', category: 'Navigation', icon: Zap, action: () => onTriggerAction('skills') },
    { id: 'sec-projects', name: 'Navigate: Featured Engineering Projects', category: 'Navigation', icon: Compass, action: () => onTriggerAction('projects') },
    { id: 'sec-certifications', name: 'Navigate: Credentials & Onramps', category: 'Navigation', icon: Hash, action: () => onTriggerAction('certifications') },
    { id: 'sec-vision', name: 'Navigate: Strategic Future Vision', category: 'Navigation', icon: Sparkles, action: () => onTriggerAction('vision') },
    { id: 'sec-contact', name: 'Navigate: Recruiter Contact Hub', category: 'Navigation', icon: Terminal, action: () => onTriggerAction('contact') },
    { id: 'sys-terminal', name: 'System Shell: Launch Command Panel', category: 'Developer Tools', icon: Terminal, action: () => { onOpenTerminal(); setIsOpen(false); } },
    { id: 'easter-egg', name: 'Security Override: Inject Overload Hack', category: 'System Diagnostics', icon: Sparkles, action: () => { onTriggerAction('hack'); setIsOpen(false); } },
  ];

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 backdrop-blur-md bg-black/60 transition-all duration-300"
      onClick={(e) => {
        if (e.target === overlayRef.current) setIsOpen(false);
      }}
    >
      <div className="w-full max-w-xl bg-[#090b11]/95 border border-cyan-500/40 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] transform scale-100 transition-all duration-300">
        
        {/* Search header container */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyan-500/20 bg-[#05060b]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-cyan-200 border-none outline-none focus:ring-0 text-md font-mono placeholder:text-cyan-600/60"
            placeholder="Type a directory, section or diagnostic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center gap-1.5 text-[10px] text-cyan-500/60 font-mono bg-[#0c111c] px-2 py-1 rounded border border-cyan-500/20 select-none shrink-0">
            <span>ESC</span>
          </div>
        </div>

        {/* Command list menu */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-cyan-500/20">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 group transition-all duration-150 cursor-pointer text-sm font-mono text-gray-300 hover:text-cyan-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#0c121e] border border-cyan-500/10 flex items-center justify-center group-hover:border-cyan-500/30 text-cyan-500 group-hover:text-cyan-400 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">{item.name}</div>
                      <div className="text-[10px] text-gray-500 group-hover:text-cyan-500/60 transition-colors uppercase">{item.category}</div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 text-xs text-cyan-400 translate-x-2 group-hover:translate-x-0 transition-all font-mono">
                    EXECUTE ↵
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-400 font-mono">
              <span className="text-red-400">No core routines match search parameters.</span>
              <p className="text-xs text-gray-600 mt-1">Try typing "navigate", "terminal" or "hack"</p>
            </div>
          )}
        </div>

        {/* Quick info footer */}
        <div className="px-4 py-2 bg-[#05060b] border-t border-cyan-500/10 text-[11px] text-cyan-500/50 flex justify-between select-none font-mono font-medium">
          <span>↑↓ to travel</span>
          <span>⏎ to launch</span>
        </div>
      </div>
    </div>
  );
}
