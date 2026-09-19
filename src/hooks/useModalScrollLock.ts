import { useEffect } from 'react';
import { useLenis } from '../context/LenisContext';

export function useModalScrollLock(isOpen: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!isOpen) return;

    const lenisInstance = lenis || (typeof window !== 'undefined' ? (window as any).lenis : null);

    // Save previous styles
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverscroll = document.body.style.overscrollBehavior;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    if (lenisInstance) {
      lenisInstance.stop();
    }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      const currentLenis = lenis || (typeof window !== 'undefined' ? (window as any).lenis : null);
      if (currentLenis) {
        currentLenis.start();
      }
      document.body.style.overflow = prevBodyOverflow || '';
      document.documentElement.style.overflow = prevHtmlOverflow || '';
      document.body.style.overscrollBehavior = prevBodyOverscroll || '';
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll || '';
    };
  }, [isOpen, lenis]);
}
