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
    // Check if the current device is primarily a touch/mobile device
    const isTouch = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );

    // On mobile touch devices, disable touch hijacking (touchMultiplier: 0, syncTouch: false)
    // so native 120Hz/60Hz compositor momentum scrolling is 100% preserved with zero input lag.
    // Desktop mouse wheel continues to enjoy luxurious, buttery smooth inertia scrolling.
    const lenisInstance = new Lenis({
      duration: isTouch ? 0.9 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Disable touch hijacking: use native mobile compositor
      syncTouch: false,
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

    // Stop Lenis ticker when tab is backgrounded to eliminate CPU/battery drain on mobile
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenisInstance.stop();
      } else {
        lenisInstance.start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
