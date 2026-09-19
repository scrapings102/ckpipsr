import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from './campusLifeData';

interface CinematicGalleryModalProps {
  activeIndex: number | null;
  onClose: () => void;
  setActiveIndex: (index: number) => void;
}

export default function CinematicGalleryModal({
  activeIndex,
  onClose,
  setActiveIndex
}: CinematicGalleryModalProps) {
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveIndex(activeIndex === GALLERY_ITEMS.length - 1 ? 0 : activeIndex + 1);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex(activeIndex === 0 ? GALLERY_ITEMS.length - 1 : activeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, onClose, setActiveIndex]);

  if (activeIndex === null) return null;

  const currentItem = GALLERY_ITEMS[activeIndex] || GALLERY_ITEMS[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-6 select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[94vh] rounded-[2rem] flex flex-col justify-between overflow-hidden gap-3"
          style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%), radial-gradient(circle at 10% 10%, rgba(212, 175, 55, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(24, 47, 29, 0.3) 0%, transparent 45%)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between z-10 shrink-0 pb-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-wider uppercase border border-white/20">
                <Sparkles size={12} className="text-[#D4AF37]" />
                <span>Memory Archive</span>
              </span>
              <span className="text-white/60 font-mono text-xs">
                {activeIndex + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
              title="Close Gallery"
              aria-label="Close Gallery"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Visual Stage */}
          <div className="relative flex-1 flex items-center justify-center min-h-[280px] sm:min-h-[420px] max-h-[62vh] overflow-hidden my-1">
            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex === 0 ? GALLERY_ITEMS.length - 1 : activeIndex - 1);
              }}
              className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-xl"
              title="Previous Image"
              aria-label="Previous Image"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Current Image & Title */}
            <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
              <div className="mb-3 text-center w-full">
                <h3 className="font-serif text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {currentItem.title}
                </h3>
              </div>
              <img
                key={currentItem.url}
                src={currentItem.url}
                alt={currentItem.title}
                className="max-w-full max-h-[46vh] sm:max-h-[50vh] w-auto h-auto object-contain rounded-2xl shadow-2xl transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex === GALLERY_ITEMS.length - 1 ? 0 : activeIndex + 1);
              }}
              className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-xl"
              title="Next Image"
              aria-label="Next Image"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="w-full flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto py-2 no-scrollbar shrink-0 z-10">
            {GALLERY_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer border-2 ${
                    isActive
                      ? 'border-[#D4AF37] scale-105 shadow-[0_0_15px_rgba(212,175,55,0.5)] opacity-100 ring-2 ring-[#D4AF37]/50'
                      : 'border-transparent opacity-50 hover:opacity-90 hover:scale-102'
                  }`}
                  title={item.title}
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
