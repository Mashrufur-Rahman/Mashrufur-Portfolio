import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Terminal as TerminalIcon, ChevronRight, Play } from 'lucide-react';
import { PROJECTS_DATA, EDUCATION_DATA } from '../data';

interface TermLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface TerminalProps {
  onNavigate: (view: 'home' | 'certificates', sectionId?: string) => void;
}

export default function Terminal({ onNavigate }: TerminalProps) {
  const [history, setHistory] = useState<TermLine[]>([
    { text: 'SYSTEM SHELL ENVIRONMENT initialized successfully.', type: 'success' },
    { text: 'USER INITIALIZED: KM_MASHRUFUR_RAHMAN', type: 'success' },
    { text: 'Type "help" to list available commands.', type: 'output' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    if (!command) return;

    const newHistory: TermLine[] = [
      ...history, 
      { text: `mashrufur@terminal ~ % ${inputValue}`, type: 'input' }
    ];

    switch (command) {
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;

      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'success' },
          { text: '  about        - Personal profile introduction', type: 'output' },
          { text: '  skills       - Skills ecosystem and core focus matrix', type: 'output' },
          { text: '  projects     - Selected key repositories and inventions', type: 'output' },
          { text: '  certificates - Certifications, onramps, and leadership awards', type: 'output' },
          { text: '  education    - Complete academic background roadmap', type: 'output' },
          { text: '  vision       - Core philosophy and future automation target', type: 'output' },
          { text: '  contact      - Secure communication hotline linkages', type: 'output' },
          { text: '  clear        - Flush terminal output buffer', type: 'output' }
        );
        break;

      case 'about':
        newHistory.push(
          { text: 'K M Mashrufur Rahman', type: 'success' },
          { text: 'Future AI & Robotics Engineer\n', type: 'output' },
          { text: 'Passionate about software, electronics, embedded systems, automation and artificial intelligence.', type: 'output' },
          { text: 'Currently pursuing Electronic Engineering in Germany.', type: 'output' }
        );
        break;

      case 'skills':
        newHistory.push(
          { text: 'SKILLS ECOSYSTEM DIAGNOSTICS:', type: 'success' },
          { text: '  ▸ AI & Coding: Python, Java, JavaScript, C, SQL, HTML5, CSS3, Tailwind', type: 'output' },
          { text: '  ▸ Automation & Logic: MATLAB, Simulink, IC Gate Logic Simulation, AutoCAD', type: 'output' },
          { text: '  ▸ Concepts: OOP, Data Structures & Algorithms, Network Routing, Digital Logic', type: 'output' },
          { text: '  ▸ Professionalism: Mentorship, Intercultural Coordination, Project Planning', type: 'output' }
        );
        break;

      case 'projects':
        newHistory.push(
          { text: 'SELECTED KEY PROJECTS:', type: 'success' },
          { 
            text: '  * Spotify Clone [WEB MUSIC PLAYER]', 
            type: 'output', 
            action: { label: 'Go to Spotify Clone', onClick: () => onNavigate('home', 'sec-projects') } 
          },
          { 
            text: '  * Airline Management System [JAVA/SQL APPLICATION]', 
            type: 'output', 
            action: { label: 'Go to Airline System', onClick: () => onNavigate('home', 'sec-projects') } 
          },
          { 
            text: '  * Water Level Indicator [DIGITAL CIRCUIT SYSTEM]', 
            type: 'output', 
            action: { label: 'Go to Water Indicator', onClick: () => onNavigate('home', 'sec-projects') } 
          },
          { 
            text: '  * Fastest Finger First [LOCKOUT SYSTEM]', 
            type: 'output', 
            action: { label: 'Go to Fastest Finger Quiz', onClick: () => onNavigate('home', 'sec-projects') } 
          },
          { 
            text: '  * Duplex Home Design [AUTOCAD MODELING]', 
            type: 'output', 
            action: { label: 'Go to Duplex Home Design', onClick: () => onNavigate('home', 'sec-projects') } 
          }
        );
        break;

      case 'certificates':
        newHistory.push(
          { text: 'Technical Certifications', type: 'success' },
          { text: 'Volunteer Certifications', type: 'success' },
          { text: 'Awards & Achievements', type: 'success' },
          { 
            text: '\nType or click the link below to open the dedicated Certificates gallery view:', 
            type: 'output',
            action: { label: 'OPEN CERTIFICATES PAGE', onClick: () => onNavigate('certificates') }
          }
        );
        break;

      case 'education':
        newHistory.push(
          { text: 'ACADEMIC ROADMAP:', type: 'success' },
          ...EDUCATION_DATA.map(edu => ({
            text: `  • [${edu.period}] ${edu.degree}\n    ${edu.school} (${edu.location})${edu.grade ? ` - Grade: ${edu.grade}` : ''}`,
            type: 'output' as const
          }))
        );
        break;

      case 'vision':
        newHistory.push(
          { text: 'CORE PHILOSOPHY & FUTURE STRATEGY:', type: 'success' },
          { text: '"Combustion of computer science standards, gate micro-simulation, and telemetry loops to empower actual autonomous physical systems. Delivering high-quality tangible solutions that optimize resources and uplift communities globally."', type: 'output' }
        );
        break;

      case 'contact':
        newHistory.push(
          { text: 'DIRECT HOTLINE LINKAGES:', type: 'success' },
          { text: '  ▸ Primary Email: rahman.mashrufur@gmail.com', type: 'output' },
          { text: '  ▸ Alternative: mash.abir36@gmail.com', type: 'output' },
          { text: '  ▸ Cellular Line: +49 15210822323', type: 'output' },
          { 
            text: '  ▸ LinkedIn Directory: linkedin.com/in/mashrufurrahman', 
            type: 'output',
            action: { label: 'Open LinkedIn Profile', onClick: () => window.open('https://www.linkedin.com/in/mashrufurrahman/', '_blank', 'noreferrer') }
          },
          { 
            text: '  ▸ GitHub Repositories: github.com/Mashrufur-Rahman', 
            type: 'output',
            action: { label: 'Open GitHub Profile', onClick: () => window.open('https://github.com/Mashrufur-Rahman', '_blank', 'noreferrer') }
          }
        );
        break;

      default:
        newHistory.push({
          text: `Command not recognized: "${command}". Type "help" to query correct nodes.`,
          type: 'error'
        });
    }

    setHistory(newHistory);
    setInputValue('');
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(255,255,255,0.02)] flex flex-col font-mono text-sm h-[500px]"
      onClick={focusInput}
    >
      {/* Sleek Minimalist luxury header */}
      <div className="bg-[#0c0c0c] border-b border-white/5 px-6 py-4 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white/10" />
            <span className="w-3 h-3 rounded-full bg-white/10" />
            <span className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <span className="text-xs text-[#B3B3B3] font-semibold tracking-wider uppercase flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-[#00FFFF]" />
            interactive-shell-emulator
          </span>
        </div>
        <div className="text-[10px] text-[#808080] uppercase tracking-widest font-bold">
          SYSTEM ACTIVE // ENCRYPTED
        </div>
      </div>

      {/* Terminal log workspace */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        {history.map((line, idx) => (
          <div key={idx} className="space-y-1.5 leading-relaxed">
            <div 
              className={`whitespace-pre-wrap ${
                line.type === 'input' 
                  ? 'text-[#FFFFFF] font-semibold' 
                  : line.type === 'error' 
                  ? 'text-red-400 bg-red-950/20 px-3 py-1.5 rounded border border-red-900/10' 
                  : line.type === 'success' 
                  ? 'text-[#00FFFF] font-bold' 
                  : 'text-[#B3B3B3]'
              }`}
            >
              {line.text}
            </div>
            {line.action && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  line.action?.onClick();
                }}
                className="inline-flex items-center gap-1 bg-[#00FFFF]/5 hover:bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer mt-1"
              >
                {line.action.label}
              </button>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Active input panel prompt */}
      <form onSubmit={handleCommand} className="border-t border-white/5 bg-[#0a0a0a] px-6 py-4 flex items-center gap-2 shrink-0">
        <ChevronRight className="w-4 h-4 text-[#00FFFF] shrink-0" />
        <span className="text-[#00FFFF] shrink-0 select-none">mashrufur ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-transparent text-[#FFFFFF] border-none outline-none focus:ring-0 p-0 font-mono text-sm caret-[#00FFFF]"
          autoCapitalize="none"
          autoComplete="off"
          placeholder="type your query..."
        />
        <button 
          type="submit" 
          className="px-3 py-1.5 text-xs border border-white/20 hover:border-[#00FFFF]/40 text-[#B3B3B3] hover:text-[#00FFFF] rounded hover:bg-[#00FFFF]/5 cursor-pointer flex items-center gap-1.5 shrink-0 font-mono font-bold uppercase"
        >
          <Play className="w-3 h-3" />
          <span>Run</span>
        </button>
      </form>
    </div>
  );
}
