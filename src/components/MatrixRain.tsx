import { useEffect, useRef } from 'react';
import { X, ShieldAlert, Cpu } from 'lucide-react';

interface MatrixRainProps {
  onClose: () => void;
}

export default function MatrixRain({ onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Falling digital columns
    const columns = Math.floor(canvas.width / 16);
    const drops: number[] = Array(columns).fill(1);

    const chars = '01#$@%&*()_+=[]{}|;:,.<>?✔👾💻🔥🚀🤖⚙⚡';

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'; // Deep decay
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#06b6d4'; // Cyan neon matrix
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col justify-between font-mono animate-in fade-in duration-300">
      <canvas ref={canvasRef} className="absolute inset-0 block opacity-90" />

      {/* Security alert panel */}
      <div className="relative z-10 p-6 md:p-8 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-950/40 border border-red-500/50 flex items-center justify-center text-red-500 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-bold text-red-500 tracking-widest uppercase block animate-pulse">CRITICAL OVERRIDE ACTIVATED!</span>
            <span className="text-xs text-cyan-400 block mt-1">INJECTING COGNITIVE BYPASS SIGNAL ENGINES...</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1.5 tracking-tight font-sans">K_M_MASHRUFUR_RAHMAN CORE MEMORY</h2>
          </div>
        </div>

        {/* Exit emergency override */}
        <button
          onClick={onClose}
          className="px-4 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 cursor-pointer rounded-lg text-xs font-bold uppercase transition-all tracking-wider flex items-center gap-1.5"
          title="Restore Security Shield"
        >
          <X className="w-4 h-4 text-cyan-400" />
          <span>CEASE OVERRIDE_</span>
        </button>
      </div>

      {/* Cyber terminal diagnostics at footer */}
      <div className="relative z-10 p-6 md:p-8 bg-gradient-to-t from-black/90 to-transparent">
        <div className="w-full max-w-xl bg-black/85 border border-cyan-500/30 rounded-xl p-5 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">HACK DICTIONARY CORE CONSOLE</span>
          </div>
          <div className="space-y-1.5 text-xs text-gray-300">
            <div>&gt; BYPASSING ROUTERS: LIPSTADT_NODE_HSHL... <span className="text-green-400">OK</span></div>
            <div>&gt; INGESTING COMPUTER ENGINEERING CREDENTIALS... <span className="text-green-400">100% OK</span></div>
            <div>&gt; RE-LOCATING ORIGIN COMPILERS FOR SOUTH ASIAN SCHOLARS... <span className="text-cyan-400 font-bold">FOUND</span></div>
            <div>&gt; PROPAGATING CORE MANDATE: Let's Build Worlds Together!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
