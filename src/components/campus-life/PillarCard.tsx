import React from 'react';
import { MapPin, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Pillar } from './campusLifeData';

interface PillarCardProps {
  pillar: Pillar;
  index: number;
  registerRef: (el: HTMLDivElement | null) => void;
  onOpenGallery: (url: string) => void;
}

export default function PillarCard({
  pillar,
  index,
  registerRef,
  onOpenGallery
}: PillarCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      ref={registerRef}
      id={`pillar-stop-${index + 1}`}
      className="relative scroll-mt-24"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}>
        {/* TEXT CONTENT COLUMN */}
        <div className={`space-y-6 ${
          isEven ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-7'
        }`}>
          {/* Eyebrow & Stop Index */}
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl font-mono text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: pillar.accent || '#182f1d' }}
            >
              {pillar.num}
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                CAMPUS PILLAR 0{index + 1}
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-[#2D2424]">
                {pillar.category}
              </span>
            </div>
          </div>

          {/* Titles & Description */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#2D2424] leading-tight">
              {pillar.title}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-[#182f1d] leading-snug">
              {pillar.headline}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {pillar.description}
            </p>
          </div>

          {/* Location Landmark */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-xs font-medium shadow-xs">
            <MapPin size={14} className="text-[#D4AF37] shrink-0" />
            <span className="truncate">{pillar.locationTag}</span>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            {pillar.stats.map((stat, sIdx) => (
              <div
                key={sIdx}
                className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs"
              >
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  {stat.label}
                </div>
                <div className="text-base sm:text-lg font-bold text-[#2D2424] mt-0.5">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {pillar.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 bg-slate-100/90 text-slate-700 text-[11px] font-medium rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => onOpenGallery(pillar.primaryImage)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D2424] hover:bg-[#182f1d] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer group"
            >
              <Sparkles size={14} className="text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span>Explore Photo Gallery</span>
              <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* VISUAL SHOWCASE COLUMN */}
        <div className={`relative ${
          isEven ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-1'
        }`}>
          <div
            className="relative rounded-3xl overflow-hidden bg-white p-2.5 sm:p-3 shadow-lg border border-slate-200/80 cursor-pointer group transition-all duration-500 hover:shadow-2xl"
            onClick={() => onOpenGallery(pillar.primaryImage)}
          >
            {/* Main Primary Image */}
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={pillar.primaryImage}
                alt={pillar.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Top Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase border border-white/20">
                  {pillar.category}
                </span>
              </div>

              {/* Bottom Quick Action Overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#2D2424] text-xs font-bold shadow-md group-hover:bg-white transition-colors">
                <span>View Fullscreen</span>
                <ArrowUpRight size={13} />
              </div>
            </div>

            {/* Inset Secondary Thumbnail (Floating preview) */}
            {pillar.sideImage && (
              <div
                className={`hidden sm:block absolute -bottom-4 ${
                  isEven ? '-left-4' : '-right-4'
                } w-28 sm:w-36 aspect-[4/3] rounded-2xl overflow-hidden p-1.5 bg-white shadow-xl border border-slate-200/90 z-20 group-hover:-translate-y-1 transition-transform duration-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery(pillar.sideImage);
                }}
              >
                <img
                  src={pillar.sideImage}
                  alt={`${pillar.title} detail`}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
