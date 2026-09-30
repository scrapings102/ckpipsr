import React from 'react';
import { motion } from 'motion/react';

/**
 * The curved sweep — how the full-screen menu enters on phones.
 *
 * The panel slides in from the right with a bulging curved leading edge that
 * flattens as it lands; closing reverses it. Timing and curve match the
 * curved-menu component the client supplied exactly — in 0.8s, curve 1.0s;
 * out 0.8s, curve 0.8s; ease [0.76, 0, 0.24, 1] (a Next.js component — only
 * its animation is used here; this site is Vite + React).
 *
 * It WRAPS the existing OverlayMenu and changes nothing inside it: search,
 * drill-down sections and everything else stay exactly as they were. The
 * menu's own `position: fixed` resolves against this wrapper while it moves,
 * so the whole menu travels with the sweep.
 *
 * Phones and tablets only (below lg, 1024px). On desktop, and for anyone with
 * reduced-motion enabled, it behaves as before: a plain fade.
 */

const EASE = [0.76, 0, 0.24, 1] as const;

export default function CurvedSweep({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  const isPhone = typeof window !== 'undefined' && window.innerWidth < 1024;
  const reduce =
    typeof window !== 'undefined' &&
    !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!isPhone || reduce) {
    return (
      <motion.div
        className='fixed inset-0 z-[60]'
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {children}
      </motion.div>
    );
  }

  const h = window.innerHeight;
  const bulge = `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;
  const flat = `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  return (
    <motion.div
      className='fixed inset-0 z-[60]'
      initial={{ x: 'calc(100% + 100px)' }}
      animate={{ x: 0, transition: { duration: 0.8, ease: EASE } }}
      exit={{
        x: 'calc(100% + 100px)',
        transition: { duration: 0.8, ease: EASE },
      }}
    >
      {/* a solid backing the same colour as the panel. The menu fades its own
          contents out part-way through closing; without this the panel would
          turn see-through behind a still-solid curved edge. */}
      <div
        className='absolute inset-0'
        style={{ background: color }}
        aria-hidden='true'
      />
      {/* the curved leading edge, just off the panel's left side */}
      <svg
        className='absolute top-0 h-full pointer-events-none'
        style={{ left: -99, width: 100, overflow: 'visible', fill: color }}
        aria-hidden='true'
        focusable='false'
      >
        <motion.path
          initial={{ d: bulge }}
          animate={{ d: flat, transition: { duration: 1, ease: EASE } }}
          exit={{ d: bulge, transition: { duration: 0.8, ease: EASE } }}
        />
      </svg>
      {children}
    </motion.div>
  );
}
