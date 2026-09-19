import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisContext } from '../context/LenisContext';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address bar height triggers from causing ScrollTrigger recalculation jank
if (typeof window !== 'undefined') {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Ultra-smooth Lenis configuration for premium butter-smooth inertia scrolling
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard smooth
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenis(lenisInstance);
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenisInstance;
    }

    lenisInstance.on('scroll', ScrollTrigger.update);

    // Synchronize Lenis with GSAP's native ticker for buttery smooth rendering
    const updateLenis = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
