import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useClipReveal(options?: {
  start?: string;
  end?: string;
  scrub?: number | boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = gsap.fromTo(
      el,
      { opacity: 0.85, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, [options?.start]);

  return ref;
}
