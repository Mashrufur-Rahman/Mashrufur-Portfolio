import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function NetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [ambientGlowPos, setAmbientGlowPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Smoothly update the ambient glow coordinate state
      setAmbientGlowPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const fillParticles = (width: number, height: number) => {
      particles = [];
      const density = Math.min(60, Math.floor((width * height) / 18000));
      for (let i = 0; i < density; i++) {
        const isCyan = Math.random() > 0.4;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: isCyan ? 'rgba(6, 182, 212, ' : 'rgba(59, 130, 246, ', // cyan-500 : blue-500
        });
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // set matching backing store scale
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        fillParticles(width, height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const drawGrid = (width: number, height: number) => {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawCircuitLines = (width: number, height: number, time: number) => {
      // Draw subtle futuristic cyber lines moving across
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)'; // purple-500
      ctx.lineWidth = 1.5;
      
      const speed = 0.0005;
      const offset = (time * speed) % 1;

      // Draw a few pre-defined traces with angular runs
      const paths = [
        [
          { x: width * 0.1, y: height * 0.2 },
          { x: width * 0.2, y: height * 0.2 },
          { x: width * 0.25, y: height * 0.25 },
          { x: width * 0.25, y: height * 0.4 },
        ],
        [
          { x: width * 0.8, y: height * 0.7 },
          { x: width * 0.7, y: height * 0.7 },
          { x: width * 0.65, y: height * 0.75 },
          { x: width * 0.65, y: height * 0.9 },
        ]
      ];

      paths.forEach((points) => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Animate a glowing signal dot on the line
        const dotIndex = Math.floor(offset * (points.length - 1));
        const nextIndex = dotIndex + 1;
        if (nextIndex < points.length) {
          const p1 = points[dotIndex];
          const p2 = points[nextIndex];
          const segmentProgress = (offset * (points.length - 1)) % 1;
          const dotX = p1.x + (p2.x - p1.x) * segmentProgress;
          const dotY = p1.y + (p2.y - p1.y) * segmentProgress;

          ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
          ctx.fill();
          // Reset shadow for next drawings
          ctx.shadowBlur = 0;
        }
      });
    };

    const animate = (time: number) => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw tech lattice grid
      drawGrid(width, height);

      // 2. Draw circuit tracks
      drawCircuitLines(width, height, time);

      // 3. Render and transition particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with mouse
        let alphaCoeff = 1;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            alphaCoeff = (1 - dist / 150) * 2 + 1;
            // nudge slightly closer in gravity
            p.x += (dx / dist) * 0.15;
            p.y += (dy / dist) * 0.15;
          }
        }

        ctx.fillStyle = `${p.color}${Math.min(0.6, 0.25 * alphaCoeff)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Interconnect nodes nicely
      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.15;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background Deep Canvas */}
      <canvas ref={canvasRef} className="block absolute inset-0 opacity-80" />

      {/* Cyberpunk Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.9)_90%)]" 
        style={{ pointerEvents: 'none' }}
      />

      {/* Futuristic Neo Glow spotlight tracking cursor */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px] opacity-25 mix-blend-screen transition-all duration-300 ease-out"
        style={{
          left: `${ambientGlowPos.x}px`,
          top: `${ambientGlowPos.y}px`,
          background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(59,130,246,0.06) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}
