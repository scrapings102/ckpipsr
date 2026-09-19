import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Maximize2, Sparkles, Camera } from "lucide-react";
import { useModalScrollLock } from "../hooks/useModalScrollLock";

export interface LeafTileGalleryProps {
  photos?: string[];
  title?: string;
  subtitle?: string;
  facilityName?: string;
}

export const LeafTileGallery: React.FC<LeafTileGalleryProps> = ({
  photos = [],
  title = "Campus Facility Gallery",
  subtitle = "Visual highlights of the infrastructure, dedicated spaces, and campus amenities.",
  facilityName
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  useModalScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : 0
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, photos.length]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
            <Camera size={11} className="text-[#D4AF37]" />
            <span>Photo Archive</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        <div className="text-xs font-semibold text-slate-400 font-mono self-start sm:self-auto bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shrink-0">
          {photos.length} {photos.length === 1 ? "Photograph" : "Photographs"}
        </div>
      </div>

      {/* Leaf-Tile Grid */}
      <div
        className={`grid gap-4 sm:gap-5 ${
          photos.length === 1
            ? "grid-cols-1 max-w-lg mx-auto"
            : photos.length === 2
            ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
            : photos.length === 3
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {photos.map((photoUrl, idx) => {
          // Leaf-Tile geometry: alternating asymmetric organic rounded corners
          // Even index: top-left & bottom-right large curves
          // Odd index: top-right & bottom-left large curves
          const leafShapeClass =
            idx % 2 === 0
              ? "rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md"
              : "rounded-tr-[2rem] rounded-bl-[2rem] rounded-tl-md rounded-br-md";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(idx * 0.04, 0.4), duration: 0.4 }}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer border-2 border-white shadow-md hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-500 ${leafShapeClass}`}
            >
              <img
                src={photoUrl}
                alt={`${facilityName || title} - Photo ${idx + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />

              {/* Botanical gradient overlay with zoom badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411]/80 via-[#0c2411]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
                <div className="self-end">
                  <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-md">
                    <Maximize2 size={13} className="text-[#D4AF37]" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-white">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-white/90">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-[#07130a]/92 backdrop-blur-xl z-[120] flex flex-col justify-between p-4 sm:p-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Lightbox Top Bar */}
            <div
              className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2">
                  <Sparkles size={12} className="text-[#D4AF37]" />
                  <span className="truncate max-w-[200px] sm:max-w-md">
                    {facilityName || title}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#D4AF37] bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {lightboxIndex + 1} / {photos.length}
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Stage */}
            <div
              className="relative flex-1 flex items-center justify-center my-2 max-w-6xl w-full mx-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : 0
                    );
                  }}
                  className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-2xl"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="w-full h-full flex items-center justify-center p-2"
                >
                  <img
                    src={activePhoto}
                    alt={`${facilityName || title} - Preview ${lightboxIndex + 1}`}
                    className="max-h-[72vh] max-w-[88vw] object-contain rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-2 border-white/20"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

              {photos.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) =>
                      prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : 0
                    );
                  }}
                  className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-2xl"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {photos.length > 1 && (
              <div
                className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-14 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === lightboxIndex
                        ? "border-[#D4AF37] scale-105 shadow-md"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={p}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LeafTileGallery;
