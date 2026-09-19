import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function CkpcmcLogo({ className = 'h-12 w-auto', showText = true }: LogoProps) {
  const [useFallback, setUseFallback] = useState(false);

  const logoNode = !useFallback ? (
    <img
      src="/images/logo.png"
      className={`${className} object-contain rounded-full transition-transform duration-300`}
      alt="CKPIPSR Logo"
      onError={() => {
        setUseFallback(true);
      }}
    />
  ) : (
    /* High-fidelity Vector SVG replica of the CKPIPSR logo */
    <svg
      className={`${className} hover:scale-105 transition-transform duration-500`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CKPIPSR Logo"
    >
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="46" stroke="#112815" strokeWidth="3" fill="#EAEFEA" />
      <circle cx="50" cy="50" r="41" stroke="#1C592F" strokeWidth="1" strokeDasharray="2 2" />
      
      {/* Circular teeth representing precision & research */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        return (
          <line
            key={i}
            x1="50"
            y1="4"
            x2="50"
            y2="7"
            transform={`rotate(${angle} 50 50)`}
            stroke="#1C592F"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Inner circle border */}
      <circle cx="50" cy="50" r="28" stroke="#112815" strokeWidth="2" fill="#D9E4D8" />
      
      {/* Mortar & Pestle + Pharmaceutical symbol */}
      <path
        d="M32 50 C32 64, 68 64, 68 50 L36 50 Z"
        fill="#112815"
      />
      <path
        d="M45 32 L58 46 L62 42 L49 28 Z"
        fill="#D4AF37"
      />
      <path
        d="M50 38 C44 42, 45 56, 50 62 C55 56, 56 42, 50 38 Z"
        fill="#1C592F"
        opacity="0.9"
      />

      {/* Tiny stars surrounding content */}
      <circle cx="28" cy="35" r="1.5" fill="#D4AF37" />
      <circle cx="72" cy="35" r="1.5" fill="#D4AF37" />
      <circle cx="28" cy="65" r="1.5" fill="#1C592F" />
      <circle cx="72" cy="65" r="1.5" fill="#1C592F" />
    </svg>
  );

  if (!showText) {
    return logoNode;
  }

  return (
    <div className="flex items-center gap-3 select-none">
      {logoNode}
      <div className="flex flex-col text-left font-sans tracking-tight leading-none">
        <span className="text-[14px] md:text-[16px] font-bold text-white tracking-widest uppercase">
          CKPIPSR
        </span>
        <span className="text-[8px] md:text-[9.5px] font-bold text-white/80 tracking-tight mt-0.5 uppercase">
          Pithawalla Inst. of Pharm. Sci. & Res.
        </span>
      </div>
    </div>
  );
}
