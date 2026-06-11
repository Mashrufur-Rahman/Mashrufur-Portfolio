import { useState, FormEvent } from 'react';
import { Mail, Phone, Linkedin, Github, Copy, Check, Send, Download } from 'lucide-react';

export default function ContactHub() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contacts = [
    { label: 'Primary Email', value: 'rahman.mashrufur@gmail.com', type: 'email' },
    { label: 'Backup Email', value: 'mash.abir36@gmail.com', type: 'email' },
    { label: 'Phone', value: '+49 15210822323', type: 'phone' },
    { label: 'LinkedIn', value: 'linkedin.com/in/mashrufurrahman', type: 'link', url: 'https://www.linkedin.com/in/mashrufurrahman/' },
    { label: 'GitHub', value: 'github.com/Mashrufur-Rahman', type: 'link', url: 'https://github.com/Mashrufur-Rahman' }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 1800);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1200);
  };

  const generateMockResume = () => {
    const content = `=========================================
K M MASHRUFUR RAHMAN - RESUME DATA EXPORT
=========================================
Future AI & Robotics Engineer
Germany | Bangladesh
Email: rahman.mashrufur@gmail.com
LinkedIn: linkedin.com/in/mashrufurrahman/
GitHub: github.com/Mashrufur-Rahman

ACADEMIC EXPEDITIONS:
- Electronic Engineering (B.Eng.) at Hamm-Lippstadt University of Applied Sciences, Germany (2024 - Present)
- Computer Science & Engineering at Green University of Bangladesh (CSE Track - 79 credits, CGPA 3.60)

ACCOMPLISHED CREDENTIALS:
- Vice Chancellor Award for Scholar Excellence
- Machine Learning Onramp (MathWorks)
- Simulink Onramp (MathWorks)
- Circuit Simulation Onramp (MathWorks)
- Python Masterclass & AI Essentials

TECHNICAL SUITE:
- Languages: Java, Python, JavaScript, C, SQL
- Hardware: Circuit Simulation, MATLAB, Simulink, AutoCAD
- Concepts: OOP, Data Structures, Algorithms, digital logic gates

COORDINATED COMMITMENTS:
- Coordinated buddy tracks inside HSHL International Buddy Programme.
- Administered donor programs with Bangladesh Blood Club.
- Instructed poor kids within Home School Initiative.
=========================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'K_M_Mashrufur_Rahman_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 font-sans">
      
      {/* Left Column: Direct info */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            DIRECT PORTALS
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Reach out via verified direct lines, or download my printable text resume matrix directly into your files.
          </p>
        </div>

        {/* Channels Cards */}
        <div className="space-y-3.5 my-6">
          {contacts.map((ch) => {
            const isCopied = copiedValue === ch.value;
            return (
              <div 
                key={ch.value}
                className="group flex items-center justify-between p-4 border border-white/5 rounded-xl bg-[#121212] hover:border-white/20 transition-all duration-200"
              >
                <div className="flex items-center gap-3 w-full min-w-0">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#00f2ff] transition-all">
                    {ch.type === 'email' ? <Mail className="w-4 h-4" /> : ch.type === 'phone' ? <Phone className="w-4 h-4" /> : ch.value.includes('linkedin') ? <Linkedin className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-semibold">{ch.label}</div>
                    {ch.url ? (
                      <a 
                        href={ch.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs md:text-sm font-semibold text-gray-200 hover:text-[#00f2ff] transition-colors cursor-pointer break-all"
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <span className="text-xs md:text-sm font-semibold text-gray-300 break-all">{ch.value}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(ch.value)}
                  className="w-8 h-8 rounded-lg bg-[#0e0e0e] hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer border border-white/5 active:scale-95 transition-all"
                  title="Copy Contact Coordinates"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={generateMockResume}
          className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl border border-dashed border-white/10 hover:border-white/30 text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer font-mono text-xs uppercase font-semibold tracking-wider"
        >
          <Download className="w-4 h-4 text-gray-400" />
          <span>Download CV Data Matrix</span>
        </button>
      </div>

      {/* Right Column: Premium Contact Form */}
      <div className="lg:col-span-7 border border-white/10 bg-[#121212] rounded-2xl p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#00f2ff] uppercase tracking-widest font-semibold block">Contact Form</span>
          <h4 className="text-lg md:text-xl font-bold text-white tracking-tight">ENGAGE SECURE HANDSHAKE</h4>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-medium">Your Name</label>
              <input 
                type="text" 
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/30 focus:bg-black transition-all"
                placeholder="Name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-medium">Your Email</label>
              <input 
                type="email" 
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/30 focus:bg-black transition-all"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-medium">Subject</label>
            <input 
              type="text" 
              required
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/30 focus:bg-black transition-all"
              placeholder="Subject Topic"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-medium">Message Payload</label>
            <textarea 
              rows={4}
              required
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white outline-none focus:border-white/30 focus:bg-black transition-all resize-none"
              placeholder="Write your email payload detail context..."
            />
          </div>

          {submitStatus === 'success' && (
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-950/20 font-mono text-xs text-emerald-400 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>TRANSMISSION PIPELINE ESTABLISHED SUCCESSFULLY. MESSAGE SENT.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 px-5 py-4 rounded-lg font-mono text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
              isSubmitting 
                ? 'bg-neutral-800 text-neutral-500 border border-white/5 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Transmission</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
