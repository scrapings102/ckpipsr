import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Building2, 
  BookOpen, 
  Coffee, 
  Home, 
  Bus, 
  Train, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Compass,
  Car,
  Plane,
  Trees,
  FlaskConical,
  Maximize2,
  ZoomIn,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useModalScrollLock } from "../../hooks/useModalScrollLock";

/** The icons a zone or a route can name in the admin panel. Keep in step with CAMPUS_MAP_ICONS there. */
const CAMPUS_MAP_ICONS: Record<string, LucideIcon> = {
  Building2, BookOpen, Coffee, Home, Train, Bus, Car, Plane, Trees, FlaskConical,
};
import SubPageLayout from "../../components/SubPageLayout";
import { useCampusMapContent } from "../../hooks/useCampusMapContent";
import { cdn } from "../../utils/image";
import { iconFor } from "../../utils/iconFor";
import { RichText } from "../../utils/RichText";
import campusMapImage from "../../assets/images/campus_map.jpg";

export default function CampusMap() {
  // Edited under About Us, Campus Map in the admin panel. The map, phone
  // number and visiting hours come from the Contact Us page.
  const content = useCampusMapContent();
  // The filter tab chosen: "all", or a zone's position in the list.
  const [activeZone, setActiveZone] = useState<"all" | number>("all");
  const [isEnlarged, setIsEnlarged] = useState(false);

  useModalScrollLock(isEnlarged);

  // Close modal on Escape key
  useEffect(() => {
    if (!isEnlarged) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsEnlarged(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEnlarged]);

  const isRelativeSrcPath =
    content.layout.image?.startsWith("./") ||
    content.layout.image?.startsWith("../") ||
    content.layout.image?.includes("campus_m");

  const mapImageUrl =
    content.layout.image &&
    content.layout.image !== "/images/hero/college_campus.jpg" &&
    !isRelativeSrcPath
      ? content.layout.image
      : campusMapImage;
  const zoneTabs = [
    { id: "all" as const, label: content.zones.allLabel },
    ...content.zones.items.map((zone, i) => ({ id: i, label: zone.tab })),
  ];
  const filteredZones = activeZone === "all"
    ? content.zones.items
    : content.zones.items.filter((_, i) => i === activeZone);

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="Campus Map"
    >
      <div className="space-y-12 text-[#3B3131]">
        
        {/* Banner Card */}
        <div className="bg-[#182f1d] text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            {content.intro.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
                <Compass size={14} />
                <span>{content.intro.badge}</span>
              </div>
            )}
            
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              {content.intro.heading}
            </h2>
            
            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl">
              <RichText text={content.intro.body} />
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={content.intro.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/30 hover:bg-black/45 text-white border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <Navigation size={14} />
                <span>{content.intro.mapsLabel}</span>
                <ExternalLink size={14} className="opacity-80" />
              </a>

              {content.intro.addressLine && (
                <div className="flex items-center gap-2 text-xs text-white/90 bg-white/15 px-3.5 py-2 rounded-xl border border-white/20">
                  <MapPin size={14} className="text-white" />
                  <span>{content.intro.addressLine}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Campus Map Image Section */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900">{content.layout.title}</h3>
              {content.layout.text && (
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{content.layout.text}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsEnlarged(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-[#1a5d2e] hover:bg-emerald-100 border border-emerald-200/70 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <Maximize2 size={14} />
                <span>Enlarge Map</span>
              </button>
              <a
                href={mapImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold transition-all"
              >
                <span>{content.layout.buttonLabel}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Full natural aspect ratio with horizontal pan on small devices to prevent text clipping */}
          <div
            onClick={() => setIsEnlarged(true)}
            className="group relative rounded-2xl border border-slate-200 bg-[#fbf0d9]/25 p-1 sm:p-3 overflow-x-auto cursor-zoom-in transition-all hover:border-[#1a5d2e]/40 hover:shadow-md"
            title="Click to view full layout"
          >
            <img
              src={mapImageUrl}
              alt={content.layout.title}
              className="w-full h-auto min-w-[650px] md:min-w-0 object-contain block mx-auto select-none"
              decoding="async"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = campusMapImage;
              }}
            />
            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              <ZoomIn size={14} />
              <span>Click to enlarge</span>
            </div>
          </div>
        </div>

        {/* Interactive Google Map Embed */}
        <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">{content.satellite.title}</h3>
              {content.satellite.text && (
                <p className="text-xs text-slate-500 mt-0.5">{content.satellite.text}</p>
              )}
            </div>
            {content.satellite.badge && (
              <span className="text-xs font-semibold text-[#00509d] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
                {content.satellite.badge}
              </span>
            )}
          </div>
          <div className="w-full h-[420px] bg-slate-100 relative">
            <iframe
              title={`Map: ${content.satellite.title}`}
              src={content.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Key Campus Zones Breakdown */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">{content.zones.title}</h3>
              {content.zones.text && <p className="text-xs sm:text-sm text-slate-600">{content.zones.text}</p>}
            </div>

            {/* Zone filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {zoneTabs.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveZone(btn.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeZone === btn.id
                      ? "bg-[#00509d] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredZones.map((zone) => {
              const ZoneIcon = iconFor(zone.icon, CAMPUS_MAP_ICONS, Building2);
              return (
                <div 
                  key={zone.title}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#00509d] flex items-center justify-center font-bold">
                        <ZoneIcon size={20} />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-slate-900">{zone.title}</h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <RichText text={zone.description} />
                    </p>

                    <div className="pt-2 grid sm:grid-cols-2 gap-2">
                      {zone.facilities.map((fac, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-[#00509d] shrink-0 mt-0.5" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Reach / Connectivity Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">{content.travel.title}</h3>
            {content.travel.text && <p className="text-xs sm:text-sm text-slate-600">{content.travel.text}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {content.travel.items.map((guide, idx) => {
              const GuideIcon = iconFor(guide.icon, CAMPUS_MAP_ICONS, Bus);
              return (
                <div key={idx} className="bg-[#182f1d] text-white rounded-2xl p-6 space-y-3 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
                      <GuideIcon size={20} />
                    </div>
                    <h4 className="font-bold text-base text-white">{guide.mode}</h4>
                    {guide.time && (
                      <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-white bg-black/20 px-2.5 py-0.5 rounded-md border border-white/20">
                        {guide.time}
                      </span>
                    )}
                    <p className="text-xs text-white/90 leading-relaxed pt-1">
                      <RichText text={guide.detail} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visitor Information & Gate Timings */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            {content.visitor.badge && (
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00509d]">
                <Clock size={16} />
                <span>{content.visitor.badge}</span>
              </div>
            )}
            <h4 className="font-serif font-bold text-lg text-slate-900">
              {content.visitor.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <RichText text={content.visitor.body} />
            </p>
          </div>

          {content.phone && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={`tel:${content.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#00509d] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#003d7a] transition-all shadow-sm"
            >
              <ShieldCheck size={16} />
              <span>{content.visitor.buttonLabel}</span>
            </a>
          </div>
          )}
        </div>

      </div>

      {/* ── FULLSCREEN MAP LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsEnlarged(false)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-3 sm:p-6"
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 text-white max-w-7xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white truncate">
                  {content.layout.title}
                </h3>
                <p className="text-xs text-white/60 hidden sm:block">
                  Complete Educational Complex Blueprint • Press Esc or click outside to close
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={mapImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsEnlarged(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition cursor-pointer border border-white/20"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Body with smooth view */}
            <div
              className="flex-1 w-full max-w-7xl mx-auto overflow-auto flex items-center justify-center py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={mapImageUrl}
                alt={content.layout.title}
                className="max-h-[85vh] max-w-full w-auto h-auto object-contain shadow-2xl rounded-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SubPageLayout>
  );
}