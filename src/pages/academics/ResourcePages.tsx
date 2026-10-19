import React, { useState, useEffect } from "react";
import SubPageLayout from "../../components/SubPageLayout";
import { ResourceDetailLayout } from "../../components/AcademicsLayouts";
import { LeafTileGallery } from "../../components/LeafTileGallery";
import { useLaboratoriesContent } from "../../hooks/useLaboratoriesContent";
import {
  DEFAULT_CAFETERIA,
  DEFAULT_CENTRAL_FACILITIES,
  DEFAULT_EV_CHARGING,
  DEFAULT_HOSTEL,
  DEFAULT_LIBRARY,
  DEFAULT_MEDICAL,
  DEFAULT_MEDICINAL_GARDEN,
  DEFAULT_SEMINAR_HALL,
  DEFAULT_SPORTS,
  DEFAULT_TRANSPORTATION,
  useResourcePageContent,
  type ResourcePageContent,
} from "../../hooks/useResourcePageContent";
import {
  Beaker,
  Sparkles,
  CheckCircle,
  BookOpen,
  BookMarked,
  Monitor,
  Wifi,
  Disc,
  Users,
  Database,
  Share2,
  FileText,
  ArrowRight,
  Camera,
  Image as ImageIcon,
  Maximize2,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Trophy,
  Home,
  HeartPulse,
  Bus,
  Mic2,
  Coffee,
  ShieldCheck,
  Zap,
  Leaf,
  Award,
} from "lucide-react";
import { useModalScrollLock } from "../../hooks/useModalScrollLock";
import { motion, AnimatePresence } from "motion/react";
import { RichText } from "../../utils/RichText";

export const Laboratories = () => {
  const content = useLaboratoriesContent();

  return (
    <SubPageLayout title={content.pageTitle} category="academics" activeItemLabel="Resources - Laboratories">
      <div className="space-y-16">
        {/* Intro Banner */}
        <div className="relative bg-[#123a1a] rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl border border-[#D4AF37]/20">
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-md text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles size={12} className="animate-pulse" />
              <span>{content.banner.badge}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {content.banner.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
              <RichText text={content.banner.body} />
            </p>
          </div>
        </div>

        {/* Lab List Grid */}
        <div className="space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              {content.list.heading}
            </h3>
            {content.list.subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {content.list.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.labs.map((lab, labIdx) => (
              <div
                key={labIdx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Lab Name Header */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#123a1a]/5 text-[#123a1a] rounded-xl shrink-0 border border-[#123a1a]/10">
                      <Beaker size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-tight">
                        {lab.name}
                      </h4>
                      {lab.wing && (
                        <span className="text-[10px] font-mono font-bold text-[#8c6d12] uppercase tracking-wider block mt-1">
                          {lab.wing}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Laboratory Descriptions */}
                  {lab.descriptions.length > 0 && (
                    <div className="space-y-3 pt-2">
                      {lab.descriptions.map((desc, dIdx) => (
                        <p
                          key={dIdx}
                          className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify"
                        >
                          <RichText text={desc} />
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status footer for alignment */}
                <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between text-[11px] text-slate-400 font-mono font-semibold">
                  <span>LAB CONFIGURATION</span>
                  {lab.status && (
                    <span className="text-[#123a1a] flex items-center gap-1 bg-[#123a1a]/5 px-2 py-0.5 rounded-md text-[10px]">
                      <CheckCircle size={10} className="text-[#D4AF37]" />
                      <span>{lab.status}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Laboratory Photo Gallery */}
        {content.gallery.photos.length > 0 && (
          <LeafTileGallery
            photos={content.gallery.photos}
            title={content.gallery.heading}
            subtitle={content.gallery.subtitle}
            facilityName="Laboratory"
          />
        )}
      </div>
    </SubPageLayout>
  );
};

/* =========================================================================
   UNIFIED LUXURY ACADEMIC RESOURCE PAGES DESIGN
   (Applied across Library, Sports, Hostel, Medical, Transportation,
    Seminar Hall, Cafeteria, Central Facilities, EV Charging & Medicinal Garden)
   ========================================================================= */

/** Open Book Line-Art Illustration for the Library Key Infrastructure Details Medallion */
const OpenBookIllustration = () => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-12 text-[#C9A84C]"
    aria-hidden="true"
  >
    {/* Book Cover and Spine */}
    <path
      d="M50 20 C42 14, 22 14, 8 20 C6 20.5, 5 22, 5 24 L5 62 C5 64, 7 65, 9 64.5 C22 59, 42 59, 50 65 C58 59, 78 59, 91 64.5 C93 65, 95 64, 95 62 L95 24 C95 22, 94 20.5, 92 20 C78 14, 58 14, 50 20 Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Center Spine */}
    <path
      d="M50 20 L50 65"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Left Page Contours */}
    <path
      d="M12 28 C24 23, 40 23, 48 27"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 36 C24 31, 40 31, 48 35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 44 C24 39, 40 39, 48 43"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Right Page Contours */}
    <path
      d="M52 27 C60 23, 76 23, 88 28"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M52 35 C60 31, 76 31, 88 36"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M52 43 C60 39, 76 39, 88 44"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/** Section-Specific Medallion Icon */
const SectionMedallion = ({ section }: { section: string }) => {
  const s = section.toLowerCase();
  if (s.includes("library")) {
    return <OpenBookIllustration />;
  }

  let IconComponent = Sparkles;
  if (s.includes("sport")) IconComponent = Trophy;
  else if (s.includes("hostel")) IconComponent = Home;
  else if (s.includes("medical")) IconComponent = HeartPulse;
  else if (s.includes("transport")) IconComponent = Bus;
  else if (s.includes("seminar")) IconComponent = Mic2;
  else if (s.includes("cafeteria")) IconComponent = Coffee;
  else if (s.includes("ev") || s.includes("charg")) IconComponent = Zap;
  else if (s.includes("garden") || s.includes("medicinal")) IconComponent = Leaf;
  else if (s.includes("central")) IconComponent = Sparkles;

  return <IconComponent size={34} className="text-[#C9A84C]" strokeWidth={1.8} />;
};



/** Resource Photo Archive Individual Card */
const ResourcePhotoCard = ({
  photoUrl,
  idx,
  facilityName,
  onClick,
  isMockupActive,
  fallbackImage,
}: {
  photoUrl: string;
  idx: number;
  facilityName: string;
  onClick: () => void;
  isMockupActive?: boolean;
  fallbackImage?: string;
}) => {
  const [currentSrc, setCurrentSrc] = useState(photoUrl);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (fallbackImage && currentSrc !== fallbackImage) {
      setCurrentSrc(fallbackImage);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative aspect-[4/3] rounded-2xl border border-slate-200/90 overflow-hidden bg-[#F6F8F6] p-4 flex flex-col justify-between group cursor-pointer hover:shadow-lg hover:border-[#D4AF37]/40 transition-all duration-300"
    >
      {/* Top Title (only rendered when overlay is not permanently active to prevent duplicate text) */}
      {!isMockupActive && (
        <span className="text-xs font-medium text-slate-600 truncate z-10 select-none">
          {facilityName} - Photo {idx + 1}
        </span>
      )}

      {/* Middle: Real Image or Placeholder Icon */}
      {currentSrc && !hasError ? (
        <img
          src={currentSrc}
          alt={`${facilityName} - Photo ${idx + 1}`}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"
            }`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : null}

      {(!currentSrc || hasError || !isLoaded) && (
        <div className="flex-1 flex items-center justify-center text-slate-300 group-hover:text-slate-400 transition-colors">
          <ImageIcon size={44} strokeWidth={1.2} />
        </div>
      )}

      {/* Hover or Active Overlay (matching Card 4 in the mockup) */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 flex flex-col justify-between p-4 transition-opacity duration-300 z-20 ${isMockupActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
      >
        <div className="flex items-center justify-between text-white/95">
          <span className="text-xs font-medium truncate text-white/90 drop-shadow">
            {facilityName} - Photo {idx + 1}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-800 flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
            <Maximize2 size={13} className="text-slate-900" />
          </div>
        </div>

        <div className="flex items-center justify-between text-white pt-2">
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider drop-shadow">
            #{String(idx + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 drop-shadow">
            <Search size={13} className="text-white" />
            <span>Click to enlarge</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Map features to contextual icons across all facilities
const getFeatureIcon = (feature: string, idx: number, section: string) => {
  const text = feature.toLowerCase();
  const s = section.toLowerCase();

  if (text.includes("book") || text.includes("volume")) return BookOpen;
  if (text.includes("journal") || text.includes("paper")) return BookMarked;
  if (text.includes("digital") || text.includes("retrieval") || text.includes("computer")) return Monitor;
  if (text.includes("delnet") || text.includes("wifi") || text.includes("network") || text.includes("connectivity")) return Wifi;
  if (text.includes("cricket") || text.includes("game") || text.includes("sport") || text.includes("court") || text.includes("tennis") || text.includes("meet")) return Trophy;
  if (text.includes("security") || text.includes("safe") || text.includes("cctv")) return ShieldCheck;
  if (text.includes("room") || text.includes("hostel") || text.includes("wing") || text.includes("bed") || text.includes("residential")) return Home;
  if (text.includes("mess") || text.includes("food") || text.includes("meal") || text.includes("vegetarian") || text.includes("dining") || text.includes("pricing")) return Coffee;
  if (text.includes("clinic") || text.includes("doctor") || text.includes("first aid") || text.includes("hospital") || text.includes("health")) return HeartPulse;
  if (text.includes("bus") || text.includes("brts") || text.includes("airport") || text.includes("parking") || text.includes("route") || text.includes("transport")) return Bus;
  if (text.includes("ac") || text.includes("hall") || text.includes("seat") || text.includes("capacity")) return Users;
  if (text.includes("av") || text.includes("conferencing") || text.includes("lecture") || text.includes("mic")) return Mic2;
  if (text.includes("charge") || text.includes("ev") || text.includes("power") || text.includes("energy")) return Zap;
  if (text.includes("eco") || text.includes("plant") || text.includes("herb") || text.includes("garden") || text.includes("flora") || text.includes("pharmacognosy")) return Leaf;
  if (text.includes("store") || text.includes("stationery") || text.includes("print") || text.includes("photocopy")) return FileText;
  if (text.includes("personality") || text.includes("training") || text.includes("language") || text.includes("lab")) return Award;

  if (s.includes("sport")) return [Trophy, Users, Trophy, Award][idx % 4];
  if (s.includes("hostel")) return [Home, ShieldCheck, Users, Coffee][idx % 4];
  if (s.includes("medical")) return [HeartPulse, ShieldCheck, Users, Award][idx % 4];
  if (s.includes("transport")) return [Bus, Bus, Users, ShieldCheck][idx % 4];
  if (s.includes("seminar")) return [Users, Monitor, Mic2, Award][idx % 4];
  if (s.includes("cafeteria")) return [Coffee, Award, Users, Coffee][idx % 4];
  if (s.includes("central")) return [Award, Users, FileText, Monitor][idx % 4];
  if (s.includes("ev")) return [Leaf, Zap, Users, ShieldCheck][idx % 4];
  if (s.includes("garden")) return [Leaf, Award, FileText, BookOpen][idx % 4];

  const fallbacks = [BookOpen, BookMarked, Monitor, Wifi];
  return fallbacks[idx % fallbacks.length];
};

// Map details to icons and colors
const getDetailMeta = (detail: string, idx: number) => {
  const isFirst = idx === 0;
  const iconBg = isFirst ? "bg-[#FAF3E0] text-[#B8860B]" : "bg-[#EAF3EC] text-[#1B6634]";
  const text = detail.toLowerCase();

  let icon = FileText;
  if (text.includes("book") || text.includes("volume") || text.includes("library") || text.includes("textbook")) icon = BookOpen;
  else if (text.includes("journal") || text.includes("publication")) icon = BookMarked;
  else if (text.includes("digital") || text.includes("system") || text.includes("computer") || text.includes("software")) icon = Monitor;
  else if (text.includes("media") || text.includes("cd") || text.includes("dvd")) icon = Disc;
  else if (text.includes("reading") || text.includes("carrel") || text.includes("student") || text.includes("seating") || text.includes("capacity") || text.includes("common") || text.includes("pedestrian")) icon = Users;
  else if (text.includes("database") || text.includes("server") || text.includes("data")) icon = Database;
  else if (text.includes("network") || text.includes("delnet") || text.includes("loan") || text.includes("wifi") || text.includes("internet") || text.includes("connectivity")) icon = Share2;
  else if (text.includes("cricket") || text.includes("volleyball") || text.includes("kabaddi") || text.includes("badminton") || text.includes("sport") || text.includes("tournament") || text.includes("fitness")) icon = Trophy;
  else if (text.includes("security") || text.includes("cctv") || text.includes("safe") || text.includes("warden") || text.includes("hygiene") || text.includes("backup") || text.includes("discipline")) icon = ShieldCheck;
  else if (text.includes("bus") || text.includes("brts") || text.includes("road") || text.includes("parking") || text.includes("commute") || text.includes("transport") || text.includes("station") || text.includes("airport")) icon = Bus;
  else if (text.includes("clinic") || text.includes("aid") || text.includes("hospital") || text.includes("doctor") || text.includes("check-up") || text.includes("medical") || text.includes("health") || text.includes("emergency")) icon = HeartPulse;
  else if (text.includes("food") || text.includes("meal") || text.includes("diet") || text.includes("snack") || text.includes("mess") || text.includes("cafeteria") || text.includes("dining") || text.includes("water") || text.includes("kitchen")) icon = Coffee;
  else if (text.includes("audio") || text.includes("microphone") || text.includes("speaker") || text.includes("projection") || text.includes("lecture") || text.includes("seminar") || text.includes("workshop") || text.includes("conferencing")) icon = Mic2;
  else if (text.includes("ev") || text.includes("electric") || text.includes("charg") || text.includes("solar") || text.includes("carbon") || text.includes("power") || text.includes("battery")) icon = Zap;
  else if (text.includes("plant") || text.includes("medicinal") || text.includes("garden") || text.includes("flora") || text.includes("herbarium") || text.includes("botanical") || text.includes("green") || text.includes("species")) icon = Leaf;
  else if (text.includes("store") || text.includes("stationery") || text.includes("photocopy") || text.includes("exam") || text.includes("syllabus") || text.includes("paper") || text.includes("file") || text.includes("bank") || text.includes("atm")) icon = FileText;
  else if (text.includes("award") || text.includes("guidance") || text.includes("placement") || text.includes("training") || text.includes("counseling") || text.includes("interview") || text.includes("cell") || text.includes("orientation")) icon = Award;

  return { icon, iconBg };
};

/** A unified luxury resource page layout for Library, Sports, Hostel, Medical, Transportation, etc. */
const EditableResourcePage = ({
  section,
  fallback,
  activeItemLabel,
}: {
  section: string;
  fallback: ResourcePageContent;
  activeItemLabel: string;
}) => {
  const content = useResourcePageContent(section, fallback);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isLightboxOpen = lightboxIndex !== null;
  useModalScrollLock(isLightboxOpen);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? 3 : prev - 1) : 0));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev === 3 ? 0 : prev + 1) : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const title = content.title || fallback.title;
  const pageTitle = content.pageTitle || fallback.pageTitle;
  const badge = content.badge || fallback.badge || "Campus Facility";
  const description = content.description || fallback.description;
  const features = content.features && content.features.length > 0 ? content.features : fallback.features;
  const detailsHeading = content.detailsHeading || fallback.detailsHeading || "Key Infrastructure Details";
  const details = content.details && content.details.length > 0 ? content.details : fallback.details;
  const heroImage = content.image || fallback.image;

  // Gallery photos
  const rawGallery = content.gallery && content.gallery.length > 0 ? content.gallery : fallback.gallery || [];
  const photoGallery = [
    rawGallery[0] || (fallback.gallery?.[0] ?? ""),
    rawGallery[1] || (fallback.gallery?.[1] ?? ""),
    rawGallery[2] || (fallback.gallery?.[2] ?? ""),
    rawGallery[3] || (fallback.gallery?.[3] ?? heroImage),
  ];

  const totalPhotoCount = Math.max(rawGallery.length, fallback.gallery?.length || 0, 4);

  const note = content.note || fallback.note;
  const showNote = !!note && (!!note.heading || !!note.body);

  return (
    <SubPageLayout
      title={pageTitle}
      category="academics"
      activeItemLabel={activeItemLabel}
    >
      <div className="space-y-12 sm:space-y-16">
        {/* =================================================================
            1. HERO SHOWCASE CARD (Matching Mockup Top Section)
            ================================================================= */}
        <div className="relative bg-gradient-to-br from-[#EEF4EC]/80 via-[#F7F9F5]/90 to-[#EBF2EA]/70 border border-[#D4AF37]/20 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm overflow-hidden">
          {/* Subtle Background Dot Grid */}


          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Facility Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#123A1A]/10 text-[#123A1A] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  {badge}
                </span>
              </div>

              {/* Page Title */}
              <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#0c2411] tracking-tight leading-tight">
                {title}
              </h2>

              {/* Quote Description */}
              <p className="italic text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                "<RichText text={description} />"
              </p>

              {/* 2x2 Feature Pills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-2">
                {features.map((feat, fIdx) => {
                  const FeatIcon = getFeatureIcon(feat, fIdx, section);
                  return (
                    <div
                      key={fIdx}
                      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-100 shadow-sm flex items-center gap-3.5 hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-300 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#FAF3E0] text-[#B8860B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <FeatIcon size={20} strokeWidth={2} />
                      </div>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-wider uppercase truncate">
                        {feat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Layered Framed Image */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Offset Golden Accent Tab (Top-Left) */}
              <div className="absolute -top-3 left-4 w-28 h-10 bg-[#C9A84C] rounded-2xl -z-10 shadow-sm" />

              {/* Offset Dark Green Shape (Bottom-Right) */}
              <div className="absolute -bottom-3 right-0 w-20 h-20 bg-[#123A1A] rounded-2xl -z-10 shadow-sm" />

              {/* Dot Grid Matrix Beside Image */}


              {/* Hero Image Container */}
              <div className="relative z-0 aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                <img
                  src={heroImage}
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. KEY INFRASTRUCTURE DETAILS (Matching Mockup Middle Section)
            ================================================================= */}
        <div className="space-y-6">
          {/* Section Header with Accent Bar & Medallion */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="w-10 h-1 bg-[#C9A84C] rounded-full mb-2" />
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {detailsHeading}
              </h3>
            </div>

            {/* Right Medallion & Dot Grid */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FDF8EE] border border-[#EEDDB8] flex items-center justify-center shadow-sm shrink-0">
                <SectionMedallion section={section} />
              </div>
            </div>
          </div>

          {/* 3-Column Bento Grid of Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {details.map((detail, dIdx) => {
              const meta = getDetailMeta(detail, dIdx);
              const DetailIcon = meta.icon;

              return (
                <div
                  key={dIdx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-300 flex items-center justify-between gap-3.5 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${meta.iconBg} group-hover:scale-105 transition-transform`}
                    >
                      <DetailIcon size={20} strokeWidth={2} />
                    </div>
                    <p className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug tracking-wide uppercase line-clamp-3">
                      {detail}
                    </p>
                  </div>


                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================
            3. PHOTO ARCHIVE (Matching Mockup Bottom Section)
            ================================================================= */}
        <div className="space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="w-10 h-1 bg-[#C9A84C] rounded-full mb-3" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123A1A]/10 text-[#123A1A] text-[11px] font-bold uppercase tracking-wider">
                  <Camera size={13} className="text-[#123A1A]" />
                  <span>Photo Archive</span>
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                  {title} Photo Archive
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Photographs of the {title} at CKPIPSR.
              </p>
            </div>

            {/* Total Count Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 shadow-sm self-start sm:self-auto shrink-0">
              <ImageIcon size={14} className="text-slate-500" />
              <span>{totalPhotoCount} Photographs</span>
            </div>
          </div>

          {/* 4 Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {photoGallery.map((photoUrl, idx) => (
              <ResourcePhotoCard
                key={idx}
                photoUrl={photoUrl}
                idx={idx}
                facilityName={title}
                onClick={() => setLightboxIndex(idx)}
                isMockupActive={idx === 3}
                fallbackImage={idx === 3 ? heroImage : undefined}
              />
            ))}
          </div>
        </div>

        {/* Optional Note Card (e.g. Central Facilities Store & Amenities) */}
        {showNote && (
          <div className="bg-[#FAF8F3] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            {note.heading && (
              <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-200 pb-3">
                {note.heading}
              </h4>
            )}
            {note.body && (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans text-justify">
                <RichText text={note.body} />
              </p>
            )}
          </div>
        )}
      </div>

      {/* =================================================================
          FULLSCREEN LIGHTBOX MODAL
          ================================================================= */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#07130a]/95 backdrop-blur-xl z-[120] flex flex-col justify-between p-4 sm:p-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div
              className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2">
                  <Sparkles size={12} className="text-[#D4AF37]" />
                  <span>
                    {title} - Photo {(lightboxIndex ?? 0) + 1}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#D4AF37] bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {(lightboxIndex ?? 0) + 1} / 4
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-md"
              >
                <X size={18} />
              </button>
            </div>

            {/* Center Photo */}
            <div
              className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  src={
                    photoGallery[lightboxIndex ?? 0] ||
                    heroImage
                  }
                  alt={`${title} - Photo ${(lightboxIndex ?? 0) + 1}`}
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              </AnimatePresence>

              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? 3 : prev - 1) : 0))
                }
                aria-label="Previous Photo"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md cursor-pointer shadow-lg"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) => (prev !== null ? (prev === 3 ? 0 : prev + 1) : 0))
                }
                aria-label="Next Photo"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md cursor-pointer shadow-lg"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="w-full max-w-6xl mx-auto flex items-center justify-between text-xs text-white/60 font-mono z-10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Use Arrow keys or buttons to navigate</span>
              <span className="hidden sm:inline">Press ESC to exit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SubPageLayout>
  );
};

export const Library = () => (
  <EditableResourcePage
    section="library"
    fallback={DEFAULT_LIBRARY}
    activeItemLabel="Resources - Library"
  />
);

export const Sports = () => (
  <EditableResourcePage
    section="sports"
    fallback={DEFAULT_SPORTS}
    activeItemLabel="Resources - Sports"
  />
);

export const Hostel = () => (
  <EditableResourcePage
    section="hostel"
    fallback={DEFAULT_HOSTEL}
    activeItemLabel="Resources - Hostel"
  />
);

export const Medical = () => (
  <EditableResourcePage
    section="medical"
    fallback={DEFAULT_MEDICAL}
    activeItemLabel="Resources - Medical"
  />
);

export const Transportation = () => (
  <EditableResourcePage
    section="transportation"
    fallback={DEFAULT_TRANSPORTATION}
    activeItemLabel="Resources - Transportation"
  />
);

export const SeminarHall = () => (
  <EditableResourcePage
    section="seminarHall"
    fallback={DEFAULT_SEMINAR_HALL}
    activeItemLabel="Resources - Seminar Hall"
  />
);

export const Cafeteria = () => (
  <EditableResourcePage
    section="cafeteria"
    fallback={DEFAULT_CAFETERIA}
    activeItemLabel="Resources - Cafeteria"
  />
);

export const CentralFacilities = () => (
  <EditableResourcePage
    section="centralFacilities"
    fallback={DEFAULT_CENTRAL_FACILITIES}
    activeItemLabel="Resources - Central Facilities"
  />
);

export const EVChargingStation = () => (
  <EditableResourcePage
    section="evCharging"
    fallback={DEFAULT_EV_CHARGING}
    activeItemLabel="Resources - EV Charging Station"
  />
);

export const MedicinalGarden = () => (
  <EditableResourcePage
    section="medicinalGarden"
    fallback={DEFAULT_MEDICINAL_GARDEN}
    activeItemLabel="Resources - Medicinal Garden"
  />
);
