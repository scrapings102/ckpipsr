import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { useLenis } from "../context/LenisContext";
import { useModalScrollLock } from "../hooks/useModalScrollLock";

interface AdmissionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMISSION_IMG = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80";

export default function AdmissionsPopup({ isOpen, onClose }: AdmissionsPopupProps) {
  const lenis = useLenis();
  useModalScrollLock(isOpen);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent="true" className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto pointer-events-auto">
          {/* Backdrop Overlay with premium blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-[6px]"
            id="admissions-popup-backdrop"
          />

          {/* Modal Container: Single image-centered card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="relative my-auto w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] aspect-[4/5] max-h-[78vh] sm:max-h-[480px] min-h-[300px] bg-[#0c2411]/85 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2rem] border border-[#D4AF37]/40 overflow-hidden shadow-[0_25px_60px_rgba(12,36,17,0.3)] z-10 flex flex-col justify-end pointer-events-auto"
            id="admissions-popup-card"
          >
            {/* Elegant Floating Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/60 text-white border border-white/10 hover:bg-[#D4AF37] hover:text-[#0c2411] transition-all duration-300 cursor-pointer hover:rotate-90 active:scale-95"
              aria-label="Close Admissions Portal"
              id="close-popup-btn"
            >
              <X size={15} className="stroke-[2.5]" />
            </button>

            {/* FULL BACKGROUND IMAGE */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={ADMISSION_IMG}
                alt="Admissions 2026-27"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800";
                }}
              />
              {/* Premium dark gradient overlay from bottom to top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10 pointer-events-none" />
            </div>

            {/* Floating content: Apply Now Button & minimal text info */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col items-center justify-end z-10 text-center">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4 sm:mb-5">
                Admissions Open 2026-27
              </span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide hidden">
                C.K. Pithawalla Institute
              </h3>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="w-full bg-[#D4AF37] text-[#0c2411] hover:bg-white hover:text-[#0c2411] py-3 sm:py-3.5 px-5 rounded-xl text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-[0_12px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_16px_35px_rgba(255,255,255,0.3)] active:scale-95 hover:scale-[1.02]"
              >
                <span>Apply Now</span>
                <ExternalLink size={12} className="stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
