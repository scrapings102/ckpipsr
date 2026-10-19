import React, { useState } from 'react';
import { motion } from 'motion/react';

/**
 * SubpageShutter: A clean, plain shutter transition that plays
 * when opening any subpage. It covers the screen and rolls up
 * quickly and smoothly from bottom to top, revealing the subpage beneath it.
 * Upon completion, it notifies the app so the bottom navbar can appear.
 */
interface SubpageShutterProps {
  onComplete?: () => void;
}

export default function SubpageShutter({ onComplete }: SubpageShutterProps = {}) {
  const [done, setDone] = useState(false);

  // If the animation has completed, unmount cleanly from DOM
  if (done) return null;

  return (
    <motion.div
      initial={{ y: '0%' }}
      animate={{ y: '-100%' }}
      transition={{
        duration: 0.55, // Smooth, balanced shutter opening speed
        ease: [0.65, 0, 0.35, 1],
      }}
      onAnimationComplete={() => {
        setDone(true);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('ckp:shutter-done'));
        }
        onComplete?.();
      }}
      className="fixed inset-0 z-[80] pointer-events-none select-none will-change-transform bg-[#123a1a]"
    />
  );
}
