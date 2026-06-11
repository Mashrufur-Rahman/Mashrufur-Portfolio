import { useEffect, useRef } from 'react';

export default function NetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#050505]">
      {/* Static Tech Lattice Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Cyberpunk Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.9)_90%)] pointer-events-none" 
      />
    </div>
  );
}

