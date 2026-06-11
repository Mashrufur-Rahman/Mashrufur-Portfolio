import React, { useState, useEffect } from 'react';
import { 
  Award, ArrowUpRight, Calendar, MapPin, Sparkles, 
  ExternalLink, Sliders, Volume2, VolumeX, Search,
  Download, ArrowLeft, Send, Check, Copy, Mail, Phone, Linkedin, Github,
  X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

// Core interactive components
import SkillsGrid from './components/SkillsGrid';
import ProjectCard from './components/ProjectCard';
import Timeline from './components/Timeline';
import ContactHub from './components/ContactHub';
import NetworkBackground from './components/NetworkBackground';
import Terminal from './components/Terminal';

// Data imports
import { 
  PROJECTS_DATA, 
  CERTIFICATIONS_DATA, 
  ACHIEVEMENTS_DATA, 
  VOLUNTEERING_DATA, 
  LANGUAGES
} from './data';

import { Certification } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'certificates' | 'shell'>('home');
  const [isMuted, setIsMuted] = useState(false); // Enable premium tactile audio by default
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  // Sound synthesis engine using standard Web Audio API
  const playCustomBeep = (freq = 800, duration = 0.05, type: OscillatorType = 'sine') => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.type = type;
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Browsers safely block autoplay until interactive click
    }
  };

  // Safe navigation scroll jumps
  const handleSectionJump = (id: string) => {
    playCustomBeep(600, 0.06);
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTerminalNavigate = (view: 'home' | 'certificates', sectionId?: string) => {
    setActiveView(view);
    if (sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadCertificate = (cert: Certification) => {
    const link = document.createElement('a');
    link.href = cert.image;
    link.target = '_blank';
    link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF CV data matrix generator
  const generateMockResume = () => {
    playCustomBeep(880, 0.1, 'triangle');
    const content = `===========================================
K M MASHRUFUR RAHMAN - DATA SUITE RESUME
===========================================
Professional Identity: Future AI & Robotics Engineer
Supporting Tagline: Building Intelligent Systems Through Software, Electronics & Automation
Location: Lippstadt, Germany | Origin: Bangladesh

ACADEMIC FEATS:
- Electronic Engineering (B.Eng.)
  Hamm-Lippstadt University of Applied Sciences, Germany (2024 - Present)
- Computer Science & Engineering (CSE Track - 79 credits, CGPA 3.60)
  Green University of Bangladesh

ACCOMPLISHED CREDENTIALS & ONRAMPS:
- Vice Chancellor Award for Academic Excellence
- Machine Learning Onramp (MathWorks Approved)
- Simulink Onramp (MathWorks Approved)
- Circuit Simulation Onramp (MathWorks Approved)
- Python Masterclass (Udemy)
- AI Essentials: Introduction to Artificial Intelligence (Udemy)

TECHNICAL SUITE:
- Programmed Languages: Java, Python, JavaScript, C, SQL
- Circuitry & Hardware: MATLAB, Simulink, AutoCAD, Gate-Level Logic Simulation
- Fundamental Concepts: Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), digital circuit gates

COORDINATED COMMITMENTS (VOLUNTEERING):
- International Buddy Programme Mentor (HSHL Lippstadt Campus)
- Humanitarian Blood Drive Coordinator (Bangladesh Blood Club)
- Academic Educator (Home School Initiative)
===========================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'K_M_Mashrufur_Rahman_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const techCerts = CERTIFICATIONS_DATA.filter(c => ['technical', 'ai_ml', 'engineering'].includes(c.category));
  const volunteerCerts = CERTIFICATIONS_DATA.filter(c => ['volunteering', 'leadership'].includes(c.category));
  const awardsAndLanguageCerts = CERTIFICATIONS_DATA.filter(c => ['awards', 'language'].includes(c.category));

  const filteredCerts = CERTIFICATIONS_DATA.filter((cert) => {
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.date.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') {
      return matchesSearch;
    }
    return cert.category === activeFilter && matchesSearch;
  });

  // Keyboard navigation support for interactive modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCertIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedCertIndex(null);
        setZoomScale(1);
      } else if (e.key === 'ArrowLeft') {
        setSelectedCertIndex(idx => (idx !== null ? (idx === 0 ? CERTIFICATIONS_DATA.length - 1 : idx - 1) : null));
        setZoomScale(1);
      } else if (e.key === 'ArrowRight') {
        setSelectedCertIndex(idx => (idx !== null ? (idx === CERTIFICATIONS_DATA.length - 1 ? 0 : idx + 1) : null));
        setZoomScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCertIndex]);

  return (
    <div className="min-h-screen relative flex flex-col font-sans bg-[#050505] text-[#FFFFFF] selection:bg-[#00FFFF]/20 selection:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* Exquisite cyber grid spotlight backdrop constraint */}
      <div className="absolute inset-0 opacity-25 pointer-events-none elegant-dark-grid z-0"></div>
      
      {/* Single accent neon cyan spotlights */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#00FFFF]/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#00FFFF]/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Subtle particle framework mesh background */}
      <NetworkBackground />

      {/* 2. Sleek Luxury Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050505]  border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo brand symbol */}
          <div 
            className="flex items-center gap-3 select-none cursor-pointer group" 
            onClick={() => { playCustomBeep(450, 0.08); setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-8 h-8 border-2 border-[#00FFFF] rotate-45 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <span className="text-[#00FFFF] font-sans font-black -rotate-45 text-xs tracking-tighter">KM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white leading-none">K M Mashrufur Rahman</span>
              <span className="text-[9px] text-[#00FFFF] uppercase tracking-widest font-semibold mt-1">AI & Robotics Engineer</span>
            </div>
          </div>

          {/* Luxury Editorial Navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-widest font-semibold uppercase">
            <button 
              onClick={() => { playCustomBeep(600, 0.05); setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`transition-colors cursor-pointer ${activeView === 'home' ? 'text-[#00FFFF]' : 'text-[#B3B3B3] hover:text-[#00FFFF]'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleSectionJump('sec-about')}
              className="text-[#B3B3B3] hover:text-[#00FFFF] transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => handleSectionJump('sec-projects')}
              className="text-[#B3B3B3] hover:text-[#00FFFF] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button 
              onClick={() => { playCustomBeep(600, 0.05); setActiveView('certificates'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`transition-colors cursor-pointer ${activeView === 'certificates' ? 'text-[#00FFFF]' : 'text-[#B3B3B3] hover:text-[#00FFFF]'}`}
            >
              Certificates
            </button>
            <button 
              onClick={() => { playCustomBeep(600, 0.05); setActiveView('shell'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`transition-colors cursor-pointer ${activeView === 'shell' ? 'text-[#00FFFF]' : 'text-[#B3B3B3] hover:text-[#00FFFF]'}`}
            >
              Shell
            </button>
            <button 
              onClick={() => handleSectionJump('sec-contact')}
              className="text-[#B3B3B3] hover:text-[#00FFFF] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Minimalist interactive audio feedback level */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setIsMuted(!isMuted); playCustomBeep(900, 0.06); }}
              className={`w-9 h-9 border rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isMuted 
                  ? 'border-white/5 text-[#808080] bg-transparent' 
                  : 'border-[#00FFFF]/20 text-[#00FFFF] bg-[#00FFFF]/5 shadow-[0_0_8px_rgba(0,255,255,0.06)]'
              }`}
              title={isMuted ? "Enable Interactive Audio Synthesis" : "Mute Sound Synthesizer"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* 3. Global Information Context strip */}
      <div className="bg-[#050505] border-b border-white/5 py-3 select-none">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase text-[#B3B3B3]">
            <span className="w-2 h-2 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF] "></span>
            <span>Local Node: Lippstadt, Germany</span>
          </div>
          <div className="text-[10px] font-mono text-[#808080]">
            <span>HSHL Mentor & Scholar // Vice Chancellor Award Distinction</span>
          </div>
        </div>
      </div>

      {/* 4. Core views routing */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-8 py-12 md:py-20 z-10 relative">
        
        {activeView === 'home' ? (
          /* HOMEPAGE VIEW AREA */
          <div className="space-y-36 md:space-y-48 ">
            
            {/* HERO SECTION MODULE */}
            <motion.section 
              id="sec-hero" 
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[55vh] scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <span className="text-[#00FFFF] text-xs font-mono uppercase tracking-[0.3em] font-bold block">
                    Future AI & Robotics Engineer
                  </span>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans tracking-tight font-black leading-none text-white uppercase select-none">
                    LET'S BUILD <br />
                    <span className="text-stroke-white opacity-90 block my-2 text-[#00FFFF]">WORLDS</span>
                    TOGETHER
                  </h1>
                </div>

                <p className="text-base md:text-lg text-[#B3B3B3] leading-relaxed max-w-xl font-normal font-sans">
                  Building Intelligent Systems Through Software, Electronics & Automation. Fusing computer science methodologies with real-world electronics engineering.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 select-none">
                  <button 
                    onClick={() => handleSectionJump('sec-projects')}
                    className="px-6 py-4 bg-[#FFFFFF] text-black hover:bg-[#00FFFF] hover:text-black font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 font-bold"
                  >
                    <span>View Projects</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={generateMockResume}
                    className="px-6 py-4 border border-white/20 hover:border-[#00FFFF]/40 text-white hover:bg-white/5 font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 font-bold"
                  >
                    <Download className="w-4 h-4 text-[#B3B3B3]" />
                    <span>Download Resume</span>
                  </button>
                  <button 
                    onClick={() => handleSectionJump('sec-contact')}
                    className="px-6 py-4 text-[#B3B3B3] hover:text-[#FFFFFF] hover:underline font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-200 cursor-pointer text-center font-bold"
                  >
                    Contact Me
                  </button>
                </div>
              </div>

              {/* High-quality profile portrait showcase */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFFF] to-[#00FFFF]/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-[#00FFFF]/40 shadow-2xl bg-[#050505] transition-colors duration-500">
                    <img 
                      src="/src/assets/images/engineer_avatar_1781183311943.png" 
                      alt="K M Mashrufur Rahman" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0  transition-all duration-750 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#050505] border border-[#00FFFF]/30 rounded-xl flex items-center justify-center shadow-2xl select-none">
                    <span className="text-[#00FFFF] text-xs font-mono font-bold">DE</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* PROFILE ABOUT SUMMARY */}
            <motion.section id="sec-about" className="space-y-12 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#808080] uppercase tracking-widest block">01 // Architecture Synopsis</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase flex items-center gap-3 select-none">
                  THE SYSTEM ARCHITECT
                </h2>
                <div className="h-[2px] w-12 bg-[#00FFFF]" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-base text-[#B3B3B3] leading-relaxed font-sans">
                    I am an engineering student originally from Bangladesh, seeking to bridge software development pipelines with electric hardware architectures. Having completed <strong className="text-white font-semibold">79 ECTS credits</strong> toward a Bachelor in Computer Science & Engineering (scoring a stellar <strong className="text-[#00FFFF]">CGPA of 3.60</strong>), I chose to expand into hardware circuit execution and digital physical interfaces by embarking on a <strong className="text-white font-semibold">Bachelor of Electronic Engineering</strong> at Hamm-Lippstadt University of Applied Sciences in North Rhine-Westphalia, Germany.
                  </p>
                  <p className="text-base text-[#B3B3B3] leading-relaxed font-sans">
                    Whether diagnosing signal processing anomalies inside electronic circuit parameters or debugging Java flight controllers and relational databases, my design focus remains the same: crafting technologies that generate tangible human benefit.
                  </p>

                  {/* Skills summary checklist tags */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 select-none">
                    {[
                      { name: 'AI Modeling', level: 'Python Frameworks' },
                      { name: 'Circuit Validation', level: 'IC Gate Logic' },
                      { name: 'Sensors / I/O', level: 'Embedded Actuators' },
                      { name: 'Autocalibration', level: 'MATLAB / Simulink' },
                      { name: 'Databases', level: 'Relational SQL' },
                      { name: 'Team Leadership', level: 'Buddy Track Mentor' },
                    ].map(item => (
                      <div 
                        key={item.name} 
                        className="p-4 rounded-xl border border-white/5 hover:border-[#00FFFF]/20 bg-[#121212] transition-all duration-200 flex flex-col justify-between"
                      >
                        <span className="text-xs font-bold text-white font-sans">{item.name}</span>
                        <span className="text-[10px] text-[#808080] font-mono mt-1">{item.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Indicators Sidebar */}
                <div className="lg:col-span-5 space-y-8 border border-white/5 rounded-2xl bg-[#121212] p-8 relative shadow-xl">
                  <div className="absolute right-6 top-6">
                    <Sliders className="w-5 h-5 text-[#00FFFF]/30 " />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-[#00FFFF] font-bold uppercase tracking-widest mb-1">Diagnostic Benchmarks</h4>
                    <span className="text-xs text-[#808080]">Documented Academic and Communication Merits</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-white">79</div>
                      <div className="text-[10px] text-[#808080] font-mono uppercase font-semibold">CSE Credits</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-white">3.60</div>
                      <div className="text-[10px] text-[#808080] font-mono uppercase font-semibold">CSE CGPA Score</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-[#00FFFF]">A+</div>
                      <div className="text-[10px] text-[#808080] font-mono uppercase font-semibold">HSC GPA 5.0</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-black text-white">6.5</div>
                      <div className="text-[10px] text-[#808080] font-mono uppercase font-semibold">English IELTS</div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6 select-all font-mono text-[11px] text-[#808080]">
                    <span>* German Electronic Engineering candidate at Lippstadt Campus, NRW.</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ACADEMIC TIMELINE MAP */}
            <motion.section id="sec-timeline" className="space-y-12 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#808080] uppercase tracking-widest block">02 // Intellectual Timeline</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase select-none">
                  ACADEMIC TIMELINE
                </h2>
                <div className="h-[2px] w-12 bg-[#00FFFF]" />
              </div>

              <Timeline />
            </motion.section>

            {/* SKILLS MULTI-GRID SYSTEM */}
            <motion.section id="sec-skills" className="space-y-12 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#808080] uppercase tracking-widest block">03 // Competence matrix</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase select-none">
                  SKILLS ECOSYSTEM
                </h2>
                <div className="h-[2px] w-12 bg-[#00FFFF]" />
              </div>

              <SkillsGrid />
            </motion.section>

            {/* REPOSITORIES GRID DISPLAY */}
            <motion.section id="sec-projects" className="space-y-12 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3 col-span-full">
                <span className="text-[11px] font-mono text-[#808080] uppercase tracking-widest block">04 // Inventions & Repositories</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase select-none">
                  SELECTED PROJECTS
                </h2>
                <div className="h-[2px] w-12 bg-[#00FFFF]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
                {PROJECTS_DATA.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            </motion.section>

            {/* ORGANIZATIONAL COMMITMENTS (VOLUNTEERING) */}
            <motion.section id="sec-leadership" className="space-y-12 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#808080] uppercase tracking-widest block">05 // Humanist Commitments</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase select-none">
                  LEADERSHIP & MENTORING
                </h2>
                <div className="h-[2px] w-12 bg-[#00FFFF]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {VOLUNTEERING_DATA.map((vol) => (
                  <div 
                    key={vol.id}
                    className="group relative border border-white/5 hover:border-[#00FFFF]/30 rounded-xl p-6 bg-[#121212] transition-colors duration-300 shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 select-none">
                        <span className="font-mono text-[10px] text-[#00FFFF] bg-[#00FFFF]/5 border border-[#00FFFF]/10 px-2.5 py-1 rounded font-semibold">{vol.period}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#00FFFF] transition-colors leading-tight">
                          {vol.role}
                        </h3>
                        <p className="text-xs font-mono text-[#808080] mt-1">{vol.organization}</p>
                      </div>
                      <p className="text-sm text-[#B3B3B3] leading-relaxed font-sans">
                        {vol.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* DEDICATED COMMUNITY IMPACT & VOLUNTEERING (CERTIFICATIONS) SECTION */}
            <motion.section id="sec-volunteering-certs" className="space-y-12 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#808080] uppercase tracking-widest block">05.5 // Humanitarian Credentials</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase select-none">
                  Community Impact & Volunteering
                </h2>
                <div className="h-[2px] w-12 bg-[#00FFFF]" />
                <p className="text-sm text-[#B3B3B3] leading-relaxed max-w-4xl pt-2 font-sans">
                  Beyond academics and engineering, I actively contribute to community development, student engagement, cross-cultural collaboration, and educational support initiatives. These experiences have strengthened my leadership, communication, and teamwork skills while creating meaningful impact for others.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {volunteerCerts.map((cert) => {
                  const globalIdx = CERTIFICATIONS_DATA.findIndex(c => c.id === cert.id);
                  return (
                    <div 
                      key={cert.id}
                      onClick={() => { playCustomBeep(550, 0.05); setSelectedCertIndex(globalIdx); }}
                      className="group relative border border-white/10 hover:border-[#00FFFF]/30 rounded-xl overflow-hidden bg-[#121212]  flex flex-col h-full cursor-pointer hover:shadow-[0_4px_20px_rgba(0,255,255,0.02)]"
                    >
                      <div className="relative h-44 w-full bg-[#050505] overflow-hidden shrink-0 border-b border-white/5">
                        <img 
                          src={cert.image} 
                          alt={cert.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0  "
                        />
                        <div className="absolute top-3 right-3 bg-[#050505]/95  border border-white/10 rounded-md px-2 py-0.5 text-[9px] font-mono font-semibold uppercase text-[#00FFFF] tracking-wider">
                          {cert.date}
                        </div>
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {cert.badge && (
                              <span className="bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded">
                                {cert.badge}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-[#808080] uppercase tracking-wider font-semibold">
                              {cert.category === 'ai_ml' ? 'AI & Machine Learning' : cert.category.replace('_', ' ')}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#00FFFF] transition-colors font-sans">
                            {cert.title}
                          </h4>
                          <p className="text-xs font-mono text-[#808080]">{cert.issuer}</p>
                          <p className="text-xs text-[#B3B3B3] leading-relaxed line-clamp-2 pt-1 font-sans">
                            {cert.summary || cert.description}
                          </p>
                        </div>
                        
                        <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[11px] font-mono text-[#808080]">
                          <span className="group-hover:text-[#00FFFF] transition-colors font-bold uppercase text-[9px]">Explore Credential</span>
                          <Award className="w-4 h-4 text-[#00FFFF]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* DIRECT CONNECT COMMUNICATION HUBS */}
            <motion.section id="sec-contact" className="space-y-12 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#808080] uppercase tracking-widest block">06 // Communication pipeline</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase select-none">
                  GET IN TOUCH
                </h2>
                <div className="h-[2px] w-12 bg-[#00FFFF]" />
              </div>

              <ContactHub />
            </motion.section>

          </div>
        ) : activeView === 'certificates' ? (
          /* DEDICATED CERTIFICATIONS VIEW PAGE */
          <div className="space-y-12 ">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-8 select-none">
              <div>
                <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest font-bold block">Credentials Showcase</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-tight text-white uppercase mt-1">
                  CERTIFICATIONS & ONRAMPS
                </h2>
              </div>
              <button 
                onClick={() => { playCustomBeep(400, 0.08); setActiveView('home'); }}
                className="self-start sm:self-center flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-[#00FFFF]/40 rounded-lg text-xs font-mono text-[#B3B3B3] hover:text-[#00FFFF] transition-all cursor-pointer font-bold uppercase"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>

            <p className="text-sm text-[#B3B3B3] leading-relaxed max-w-3xl">
              Academic merits and industry onramps verifying proficiency in high-end simulation platforms, digital circuit design frameworks, and programming paradigms.
            </p>

            {/* Search and Filters Hub */}
            <div className="space-y-6 bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 md:p-8 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Search input field */}
                <div className="lg:col-span-4 relative flex items-center">
                  <Search className="absolute left-4 w-4 h-4 text-[#808080]" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search credentials, issuers..."
                    className="w-full bg-[#050505] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-[#FFFFFF] placeholder-[#808080] outline-none focus:border-[#00FFFF]/50 font-mono transition-all animate-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 text-xs font-mono text-[#808080] hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter buttons selector */}
                <div className="lg:col-span-8 flex flex-wrap gap-2">
                  {[
                    { label: 'All', value: 'all' },
                    { label: 'Technical', value: 'technical' },
                    { label: 'AI & Machine Learning', value: 'ai_ml' },
                    { label: 'Engineering', value: 'engineering' },
                    { label: 'Volunteering', value: 'volunteering' },
                    { label: 'Leadership', value: 'leadership' },
                    { label: 'Awards', value: 'awards' },
                    { label: 'Language', value: 'language' }
                  ].map((f) => (
                    <button
                      key={f.value}
                      onClick={() => { playCustomBeep(700, 0.04); setActiveFilter(f.value); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeFilter === f.value
                          ? 'bg-[#00FFFF] text-black shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                          : 'bg-white/5 border border-white/10 text-[#B3B3B3] hover:border-white/20'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery showing filtered items or categorized view */}
            {(activeFilter !== 'all' || searchQuery !== '') ? (
              <div className="space-y-6">
                <span className="text-xs font-mono text-[#808080] uppercase tracking-widest block">
                  Found {filteredCerts.length} matching item(s)
                </span>
                {filteredCerts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCerts.map((cert) => {
                      const globalIdx = CERTIFICATIONS_DATA.findIndex(c => c.id === cert.id);
                      return (
                        <div 
                          key={cert.id}
                          onClick={() => { playCustomBeep(550, 0.05); setSelectedCertIndex(globalIdx); }}
                          className="group relative border border-white/10 hover:border-[#00FFFF]/30 rounded-xl overflow-hidden bg-[#121212]  flex flex-col h-full cursor-pointer hover:shadow-[0_4px_20px_rgba(0,255,255,0.02)]"
                        >
                          <div className="relative h-44 w-full bg-[#050505] overflow-hidden shrink-0 border-b border-white/5">
                            <img 
                              src={cert.image} 
                              alt={cert.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0  "
                            />
                            <div className="absolute top-3 right-3 bg-[#050505]/95  border border-white/10 rounded-md px-2 py-0.5 text-[9px] font-mono font-semibold uppercase text-[#00FFFF] tracking-wider">
                              {cert.date}
                            </div>
                          </div>
                          
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {cert.badge && (
                                  <span className="bg-[#00FFFF]/10 border border-[#00FFFF]/20 text-[#00FFFF] text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded">
                                    {cert.badge}
                                  </span>
                                )}
                                <span className="text-[10px] font-mono text-[#808080] uppercase tracking-wider font-semibold">
                                  {cert.category === 'ai_ml' ? 'AI & Machine Learning' : cert.category.replace('_', ' ')}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#00FFFF] transition-colors font-sans">
                                {cert.title}
                              </h4>
                              <p className="text-xs font-mono text-[#808080]">{cert.issuer}</p>
                              <p className="text-xs text-[#B3B3B3] leading-relaxed line-clamp-2 pt-1 font-sans">
                                {cert.summary || cert.description}
                              </p>
                            </div>
                            
                            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[11px] font-mono text-[#808080]">
                              <span className="group-hover:text-[#00FFFF] transition-colors font-bold uppercase text-[9px]">Explore Credential</span>
                              <Award className="w-4 h-4 text-[#00FFFF]" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border border-white/10 rounded-2xl p-12 text-center bg-[#0c0c0c]">
                    <p className="text-sm text-[#808080] font-mono">No matching credentials found in system registry.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-20">
                
                {/* 1. TECHNICAL AND AI/MACHINE LEARNING CORE */}
                <div id="cat-tech" className="space-y-6">
                  <div className="space-y-2 select-none">
                    <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-[0.2em] font-extrabold block">Registry Suite 01</span>
                    <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-tight">
                      Technical & Engineering Credentials
                    </h3>
                    <div className="h-[2px] w-8 bg-[#00FFFF]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techCerts.map((cert) => {
                      const globalIdx = CERTIFICATIONS_DATA.findIndex(c => c.id === cert.id);
                      return (
                        <div 
                          key={cert.id}
                          onClick={() => { playCustomBeep(550, 0.05); setSelectedCertIndex(globalIdx); }}
                          className="group relative border border-white/10 hover:border-[#00FFFF]/30 rounded-xl overflow-hidden bg-[#121212]  flex flex-col h-full cursor-pointer hover:shadow-[0_4px_20px_rgba(0,255,255,0.02)]"
                        >
                          <div className="relative h-44 w-full bg-[#050505] overflow-hidden shrink-0 border-b border-white/5">
                            <img 
                              src={cert.image} 
                              alt={cert.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0  "
                            />
                            <div className="absolute top-3 right-3 bg-[#050505]/95  border border-white/10 rounded-md px-2 py-0.5 text-[9px] font-mono font-semibold uppercase text-[#00FFFF] tracking-wider">
                              {cert.date}
                            </div>
                          </div>
                          
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {cert.badge && (
                                  <span className="bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded">
                                    {cert.badge}
                                  </span>
                                )}
                                <span className="text-[10px] font-mono text-[#808080] uppercase tracking-wider font-semibold">
                                  {cert.category === 'ai_ml' ? 'AI & Machine Learning' : cert.category}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#00FFFF] transition-colors font-sans font-bold">
                                {cert.title}
                              </h4>
                              <p className="text-xs font-mono text-[#808080]">{cert.issuer}</p>
                              <p className="text-xs text-[#B3B3B3] leading-relaxed line-clamp-2 pt-1 font-sans">
                                {cert.summary || cert.description}
                              </p>
                            </div>
                            
                            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[11px] font-mono text-[#808080]">
                              <span className="group-hover:text-[#00FFFF] transition-colors font-bold uppercase text-[9px]">Explore Credential</span>
                              <Award className="w-4 h-4 text-[#00FFFF]" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. DEDICATED COMMUNITY IMPACT & VOLUNTEERING SECTION */}
                <div id="cat-volunteering" className="space-y-6 border-t border-white/5 pt-12">
                  <div className="space-y-2 select-none">
                    <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-[0.2em] font-extrabold block">Registry Suite 02</span>
                    <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-tight">
                      Community Impact & Volunteering
                    </h3>
                    <div className="h-[2px] w-8 bg-[#00FFFF]" />
                    <p className="text-sm text-[#B3B3B3] leading-relaxed max-w-4xl pt-2 font-sans">
                      Beyond academics and engineering, I actively contribute to community development, student engagement, cross-cultural collaboration, and educational support initiatives. These experiences have strengthened my leadership, communication, and teamwork skills while creating meaningful impact for others.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {volunteerCerts.map((cert) => {
                      const globalIdx = CERTIFICATIONS_DATA.findIndex(c => c.id === cert.id);
                      return (
                        <div 
                          key={cert.id}
                          onClick={() => { playCustomBeep(550, 0.05); setSelectedCertIndex(globalIdx); }}
                          className="group relative border border-white/10 hover:border-[#00FFFF]/30 rounded-xl overflow-hidden bg-[#121212]  flex flex-col h-full cursor-pointer hover:shadow-[0_4px_20px_rgba(0,255,255,0.02)]"
                        >
                          <div className="relative h-44 w-full bg-[#050505] overflow-hidden shrink-0 border-b border-white/5">
                            <img 
                              src={cert.image} 
                              alt={cert.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0  "
                            />
                            <div className="absolute top-3 right-3 bg-[#050505]/95  border border-white/10 rounded-md px-2 py-0.5 text-[9px] font-mono font-semibold uppercase text-[#00FFFF] tracking-wider">
                              {cert.date}
                            </div>
                          </div>
                          
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {cert.badge && (
                                  <span className="bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded">
                                    {cert.badge}
                                  </span>
                                )}
                                <span className="text-[10px] font-mono text-[#808080] uppercase tracking-wider font-semibold">
                                  {cert.category}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#00FFFF] transition-colors font-sans">
                                {cert.title}
                              </h4>
                              <p className="text-xs font-mono text-[#808080]">{cert.issuer}</p>
                              <p className="text-xs text-[#B3B3B3] leading-relaxed line-clamp-2 pt-1 font-sans">
                                {cert.summary || cert.description}
                              </p>
                            </div>
                            
                            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[11px] font-mono text-[#808080]">
                              <span className="group-hover:text-[#00FFFF] transition-colors font-bold uppercase text-[9px]">Explore Credential</span>
                              <Award className="w-4 h-4 text-[#00FFFF]" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. ACADEMIC AWARDS AND LANGUAGE SKILLS */}
                <div id="cat-academic" className="space-y-6 border-t border-white/5 pt-12">
                  <div className="space-y-2 select-none">
                    <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-[0.2em] font-extrabold block">Registry Suite 03</span>
                    <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-tight">
                      Academia & Specialized Proficiencies
                    </h3>
                    <div className="h-[2px] w-8 bg-[#00FFFF]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {awardsAndLanguageCerts.map((cert) => {
                      const globalIdx = CERTIFICATIONS_DATA.findIndex(c => c.id === cert.id);
                      return (
                        <div 
                          key={cert.id}
                          onClick={() => { playCustomBeep(550, 0.05); setSelectedCertIndex(globalIdx); }}
                          className="group relative border border-white/10 hover:border-[#00FFFF]/30 rounded-xl overflow-hidden bg-[#121212]  flex flex-col h-full cursor-pointer hover:shadow-[0_4px_20px_rgba(0,255,255,0.02)]"
                        >
                          <div className="relative h-44 w-full bg-[#050505] overflow-hidden shrink-0 border-b border-white/5">
                            <img 
                              src={cert.image} 
                              alt={cert.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0  "
                            />
                            <div className="absolute top-3 right-3 bg-[#050505]/95  border border-white/10 rounded-md px-2 py-0.5 text-[9px] font-mono font-semibold uppercase text-[#00FFFF] tracking-wider">
                              {cert.date}
                            </div>
                          </div>
                          
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {cert.badge && (
                                  <span className="bg-[#00FFFF]/10 border border-[#00FFFF]/40 text-[#00FFFF] text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded">
                                    {cert.badge}
                                  </span>
                                )}
                                <span className="text-[10px] font-mono text-[#808080] uppercase tracking-wider font-semibold">
                                  {cert.category}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#00FFFF] transition-colors font-sans">
                                {cert.title}
                              </h4>
                              <p className="text-xs font-mono text-[#808080]">{cert.issuer}</p>
                              <p className="text-xs text-[#B3B3B3] leading-relaxed line-clamp-2 pt-1 font-sans">
                                {cert.summary || cert.description}
                              </p>
                            </div>
                            
                            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[11px] font-mono text-[#808080]">
                              <span className="group-hover:text-[#00FFFF] transition-colors font-bold uppercase text-[9px]">Explore Credential</span>
                              <Award className="w-4 h-4 text-[#00FFFF]" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* Achievements & Academic Honors segment embedded for outstanding completeness */}
            <div className="pt-12 space-y-8 border-t border-white/5">
              <h3 className="text-xl font-bold tracking-tight text-white uppercase font-sans border-b border-white/5 pb-4 select-none">
                ACADEMIC HONORS & ACCOMPLISHMENTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ACHIEVEMENTS_DATA.map((ach) => (
                  <div 
                    key={ach.id}
                    className="p-6 rounded-xl border border-white/5 bg-[#121212] flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-[#00FFFF] font-bold uppercase tracking-wide bg-[#00FFFF]/5 px-2.5 py-0.5 rounded-md border border-[#00FFFF]/10 font-sans">
                          {ach.badge}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight font-sans">{ach.title}</h4>
                      <p className="text-xs text-[#B3B3B3] leading-relaxed mt-2 font-sans">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* DEDICATED CONSOLE TERMINAL SHELL VIEW */
          <div className="space-y-12 ">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-8 select-none">
              <div>
                <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest font-bold block">Console Workspace</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-tight text-white uppercase mt-1">
                  INTERACTIVE SYSTEM SHELL
                </h2>
              </div>
              <button 
                onClick={() => { playCustomBeep(400, 0.08); setActiveView('home'); }}
                className="self-start sm:self-center flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-[#00FFFF]/40 rounded-lg text-xs font-mono text-[#B3B3B3] hover:text-[#00FFFF] transition-all cursor-pointer font-bold uppercase"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>

            <p className="text-sm text-[#B3B3B3] leading-relaxed max-w-3xl">
              Execute system routines to query academic logs, diagnostic benchmarks, selected design repositories, and operational pathways.
            </p>

            <Terminal onNavigate={handleTerminalNavigate} />
          </div>
        )}

      </main>

      {/* 5. Minimalist Professional Footer */}
      <footer className="bg-[#050505] border-t border-white/10 py-12 mt-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 select-none">
            <div className="w-8 h-8 rounded-lg bg-[#121212] border border-white/10 flex items-center justify-center">
              <span className="text-[11px] text-[#00FFFF] font-extrabold font-sans">KM</span>
            </div>
            <div>
              <span className="text-xs font-mono text-[#B3B3B3] block font-semibold uppercase tracking-wider">Let's Build Worlds Together</span>
              <span className="text-[10px] font-mono text-[#808080] block mt-0.5 uppercase tracking-tight">K M MASHRUFUR RAHMAN // LIPPSTADT, DE</span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono text-[#808080] select-none">
            <a href="https://github.com/Mashrufur-Rahman" target="_blank" rel="noreferrer" className="hover:text-[#00FFFF] transition-colors cursor-pointer font-bold">GitHub</a>
            <a href="https://www.linkedin.com/in/mashrufurrahman/" target="_blank" rel="noreferrer" className="hover:text-[#00FFFF] transition-colors cursor-pointer font-bold">LinkedIn</a>
          </div>

          <div className="text-xs font-mono text-[#808080] select-none">
            © {new Date().getFullYear()} K M Mashrufur Rahman.
          </div>
        </div>
      </footer>

      {/* FULLSCREEN CERTIFICATE INTERACTIVE GALLERY MODAL */}
      {selectedCertIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-[#050505]   select-none">
          {/* Top Control Rail */}
          <div className="w-full max-w-6xl flex items-center justify-between py-4 border-b border-white/5 font-mono text-xs text-[#808080]">
            <div>
              <span className="text-[#00FFFF] font-bold">REGISTRY ENGINE</span> // {selectedCertIndex + 1} OF {CERTIFICATIONS_DATA.length}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { playCustomBeep(600, 0.05); setZoomScale(s => Math.max(1, s - 0.5)); }}
                className="hover:text-[#00FFFF] border border-white/5 hover:border-[#00FFFF]/30 bg-white/5 rounded px-2.5 py-1 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                Zoom Out
              </button>
              <span className="text-white font-bold">{zoomScale * 100}%</span>
              <button 
                onClick={() => { playCustomBeep(600, 0.05); setZoomScale(s => Math.min(3, s + 0.5)); }}
                className="hover:text-[#00FFFF] border border-white/5 hover:border-[#00FFFF]/30 bg-white/5 rounded px-2.5 py-1 transition-colors cursor-pointer"
                title="Zoom In"
              >
                Zoom In
              </button>
              <button 
                onClick={() => { playCustomBeep(700, 0.06); handleDownloadCertificate(CERTIFICATIONS_DATA[selectedCertIndex]); }}
                className="text-[#00FFFF] border border-[#00FFFF]/25 hover:border-[#00FFFF]/50 bg-[#00FFFF]/5 rounded px-3 py-1 transition-all cursor-pointer font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 " />
                <span>Download</span>
              </button>
              <button 
                onClick={() => { playCustomBeep(350, 0.08); setSelectedCertIndex(null); setZoomScale(1); }}
                className="text-white hover:text-[#00FFFF] font-extrabold hover:scale-105 transition-all cursor-pointer px-2"
                title="Close Modal"
              >
                Close (ESC)
              </button>
            </div>
          </div>

          {/* Interactive Viewer Stage */}
          <div className="flex-1 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6 min-h-0">
            
            {/* Prev navigation button */}
            <div className="col-span-1 flex justify-center">
              <button 
                onClick={() => { 
                  playCustomBeep(500, 0.05); 
                  setSelectedCertIndex(idx => (idx !== null ? (idx === 0 ? CERTIFICATIONS_DATA.length - 1 : idx - 1) : null)); 
                  setZoomScale(1);
                }}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#00FFFF]/40 bg-white/5 flex items-center justify-center text-white hover:text-[#00FFFF] transition-all cursor-pointer group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Display Canvas with zoom transition */}
            <div className="col-span-12 md:col-span-8 flex items-center justify-center overflow-auto max-h-[55vh] md:max-h-[65vh] relative border border-white/5 bg-neutral-950/65 rounded-2xl p-4 min-h-[300px]">
              <img 
                  src={CERTIFICATIONS_DATA[selectedCertIndex].image} 
                  alt={CERTIFICATIONS_DATA[selectedCertIndex].title}
                  referrerPolicy="no-referrer"
                  style={{ transform: `scale(${zoomScale})` }}
                  className="max-w-full max-h-[50vh] object-contain rounded-lg transition-transform duration-300"
                />
            </div>

            {/* Next navigation button */}
            <div className="col-span-1 flex justify-center order-last md:order-none">
              <button 
                onClick={() => { 
                  playCustomBeep(500, 0.05); 
                  setSelectedCertIndex(idx => (idx !== null ? (idx === CERTIFICATIONS_DATA.length - 1 ? 0 : idx + 1) : null)); 
                  setZoomScale(1);
                }}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-[#00FFFF]/40 bg-white/5 flex items-center justify-center text-white hover:text-[#00FFFF] transition-all cursor-pointer group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Explanatory Details Card sidepanel */}
            <div className="col-span-12 md:col-span-2 flex flex-col justify-center space-y-4 text-left border-l border-white/5 pl-0 md:pl-6">
              {CERTIFICATIONS_DATA[selectedCertIndex].badge && (
                <div>
                  <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest block font-bold">Accreditation Badge</span>
                  <span className="inline-block bg-[#00FFFF]/10 border border-[#00FFFF]/20 text-[#00FFFF] text-[9px] font-mono font-bold uppercase px-2 py-0.5 mt-1 rounded">
                    {CERTIFICATIONS_DATA[selectedCertIndex].badge}
                  </span>
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest block">Verified Issuer</span>
                <span className="text-white font-bold block">{CERTIFICATIONS_DATA[selectedCertIndex].issuer}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest block">Merit Title</span>
                <span className="text-white font-mono text-sm block font-bold leading-tight">{CERTIFICATIONS_DATA[selectedCertIndex].title}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest block">Issue Date</span>
                <span className="text-white font-mono text-xs block">{CERTIFICATIONS_DATA[selectedCertIndex].date}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest block font-bold">Metadata</span>
                <p className="text-xs text-[#B3B3B3] leading-relaxed mt-1 font-sans">{CERTIFICATIONS_DATA[selectedCertIndex].description}</p>
              </div>
            </div>

          </div>

          {/* Micro status notification bar */}
          <div className="w-full max-w-6xl py-3 border-t border-white/5 text-center text-[10px] font-mono text-[#808080] uppercase tracking-tight select-none">
            Registry Identification Hash: OK_SYSTEM_VERIFIED // SECURE STORAGE STACK 03
          </div>
        </div>
      )}
    </div>
  );
}
