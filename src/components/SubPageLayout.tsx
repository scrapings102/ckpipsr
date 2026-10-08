import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import SEO from './SEO';
import {
  Menu,
  Home,
  ArrowLeft
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SubPageLayoutProps {
  title: string;
  subtitle?: string;
  category: string;
  activeItemLabel: string;
  children: React.ReactNode;
  hideDefaultBackBar?: boolean;
}

const CATEGORY_NAMES: Record<string, string> = {
  about: 'About Us',
  'about-us': 'About Us',
  academics: 'Academics',
  courses: 'Academics',
  committees: 'Cells',
  cells: 'Cells',
  iqac: 'Accreditation & Ranking',
  staff: 'Academics',
  'campus-life': 'Academics',
  'student-corner': 'Students Corner',
  'students-corner': 'Students Corner',
  'research-and-innovation': 'Research & Innovation',
  'training-and-placement': 'T&P',
  activities: 'Activities',
};

const CATEGORY_TO_MENU_KEY: Record<string, string> = {
  about: 'About Us',
  'about-us': 'About Us',
  academics: 'Academics',
  courses: 'Academics',
  committees: 'Cells',
  cells: 'Cells',
  iqac: 'Accreditation & Ranking',
  staff: 'Academics',
  'campus-life': 'Academics',
  'student-corner': 'Students Corner',
  'students-corner': 'Students Corner',
  'research-and-innovation': 'Research & Innovation',
  'training-and-placement': 'T&P',
  activities: 'Activities',
};

const LOCAL_WEBP_IMAGES = [
  '/images/hero/646efc827452b.webp',
  '/images/hero/65efea4943a49.webp',
  '/images/hero/65efeac7d49a3.webp',
  '/images/hero/65efeaeece007.webp',
  '/images/hero/66e151f0d6a90.webp',
  '/images/hero/66e1522d09fc0.webp',
  '/images/hero/66e15283951b9.webp',
  '/images/hero/66e153e687221.webp',
  '/images/hero/66e154b724ef6.webp',
  '/images/hero/66e154b724ef6 (1).webp',
  '/images/hero/college_campus.jpg',
  '/images/hero/pharmacy_lab.jpg',
  '/images/hero/students_learning.jpg',
];

const PAGE_IMAGES: Record<string, string> = {
  // About Category
  'About Us': '/images/hero/66e151f0d6a90.webp',
  'Profile': '/images/hero/646efc827452b.webp',
  'Vision and Mission': '/images/hero/65efea4943a49.webp',
  'Founder': '/images/hero/646efc827452b.webp',
  'The Founder': '/images/hero/646efc827452b.webp',
  'About Trust': '/images/hero/66e151f0d6a90.webp',
  'The Trust': '/images/hero/66e151f0d6a90.webp',
  "Principal's Message": '/images/hero/66e1522d09fc0.webp',
  'Principal': '/images/hero/66e1522d09fc0.webp',
  'The Principal': '/images/hero/66e1522d09fc0.webp',
  'Campus Map': '/images/hero/college_campus.jpg',

  // Courses
  'Courses Offered': '/images/hero/pharmacy_lab.jpg',
  'B.Pharm': '/images/hero/pharmacy_lab.jpg',
  'M.Pharm': '/images/hero/65efeaeece007.webp',
  'Pharm.D': '/images/hero/65efeaeece007.webp',
  'Courses Offered - B.Pharm': '/images/hero/pharmacy_lab.jpg',
  'Courses Offered - M.Pharm': '/images/hero/65efeaeece007.webp',
  'Courses Offered - Short Term Certificate': '/images/hero/students_learning.jpg',
  'Approvals': '/images/hero/646efc827452b.webp',

  // Committees & Cells
  'Anti-Ragging Committee': '/images/hero/66e153e687221.webp',
  'ST-SC Cell': '/images/hero/66e153e687221.webp',
  'SC-ST Cell': '/images/hero/66e153e687221.webp',
  'Sexual Harassment Committee': '/images/hero/66e153e687221.webp',
  'ARC': '/images/hero/66e153e687221.webp',
  'WDC': '/images/hero/66e153e687221.webp',
  'GRC': '/images/hero/66e153e687221.webp',
  'ADC': '/images/hero/66e153e687221.webp',
  'EDC': '/images/hero/66e153e687221.webp',
  'GSC': '/images/hero/66e153e687221.webp',

  // IQAC
  'About IQAC': '/images/hero/66e154b724ef6.webp',
  'IQAC Objectives': '/images/hero/66e154b724ef6.webp',
  'Minutes & ATR': '/images/hero/66e154b724ef6.webp',
  'IQAC Composition': '/images/hero/66e154b724ef6.webp',
  'IQAC Initiatives and Activities': '/images/hero/66e154b724ef6.webp',
  'MoMs and ATR': '/images/hero/66e154b724ef6.webp',
  'Institution Distinctiveness': '/images/hero/66e154b724ef6.webp',
  'Best Practices': '/images/hero/66e154b724ef6.webp',
  'NIRF': '/images/hero/66e154b724ef6.webp',
  'AISHE': '/images/hero/66e154b724ef6.webp',
  'IIQA': '/images/hero/66e154b724ef6.webp',
  'IDP': '/images/hero/66e154b724ef6.webp',
  'RTI': '/images/hero/66e154b724ef6.webp',

  // Staff
  'Teaching Staff': '/images/hero/66e15283951b9.webp',
  'Non-Teaching Staff': '/images/hero/66e15283951b9.webp',
  'Faculties': '/images/hero/66e15283951b9.webp',
  'Deans and Faculty In-charges': '/images/hero/66e15283951b9.webp',

  // Campus Life & Resources
  'Hostel': '/images/hero/66e154b724ef6 (1).webp',
  'Canteen': '/images/hero/66e154b724ef6 (1).webp',
  'Cafeteria': '/images/hero/66e154b724ef6 (1).webp',
  'Classrooms': '/images/hero/students_learning.jpg',
  'Library': '/images/hero/66e154b724ef6.webp',
  'Central Facilities': '/images/hero/college_campus.jpg',
  'EV Charging Station': '/images/hero/college_campus.jpg',
  'Medicinal Garden': '/images/hero/66e151f0d6a90.webp',
  'Laboratories': '/images/hero/pharmacy_lab.jpg',
  'Medical': '/images/hero/pharmacy_lab.jpg',
  'Seminar Hall': '/images/hero/66e15283951b9.webp',
  'Transportation': '/images/hero/college_campus.jpg',

  // Student Corner
  'Sports': '/images/hero/66e154b724ef6 (1).webp',
  'Inter-College Achievements': '/images/hero/646efc827452b.webp',
  'Competitions': '/images/hero/65efea4943a49.webp',
  'Gallery': '/images/hero/66e15283951b9.webp',
  'Media Appreciation': '/images/hero/646efc827452b.webp',
  'Timetables': '/images/hero/66e154b724ef6.webp',
  'Courses': '/images/hero/students_learning.jpg',
  'Course Syllabus': '/images/hero/students_learning.jpg',
  'Scholorships': '/images/hero/646efc827452b.webp',
  'Alumni': '/images/hero/66e15283951b9.webp',

  // Activities & News
  'News': '/images/hero/646efc827452b.webp',
  'Achievements': '/images/hero/65efea4943a49.webp',
  'Events': '/images/hero/66e1522d09fc0.webp',

  // T&P
  'Activity': '/images/hero/66e15283951b9.webp',
  'Committee': '/images/hero/66e153e687221.webp',
  'Placements': '/images/hero/66e15283951b9.webp',
  'Training': '/images/hero/students_learning.jpg',
  'Visits': '/images/hero/646efc827452b.webp',

  // Research & Innovation
  'Research - About': '/images/hero/pharmacy_lab.jpg',
  'Research - Books': '/images/hero/66e154b724ef6.webp',
  'Research - Consultancy': '/images/hero/65efeaeece007.webp',
  'Research - Doctoral Studies': '/images/hero/pharmacy_lab.jpg',
  'Research - Ethics': '/images/hero/66e153e687221.webp',
  'Research - Grants': '/images/hero/65efeaeece007.webp',
  'Research - MOUs': '/images/hero/646efc827452b.webp',
  'Research - Patents': '/images/hero/65efeaeece007.webp',
  'Research - PG Projects': '/images/hero/students_learning.jpg',
  'Research - Publications': '/images/hero/66e154b724ef6.webp',
  'SSIP - About': '/images/hero/646efc827452b.webp',
  'SSIP - Apply': '/images/hero/66e15283951b9.webp',
  'SSIP - Mentors': '/images/hero/66e15283951b9.webp',
  'SSIP - Updates': '/images/hero/646efc827452b.webp',
  'IIC': '/images/hero/646efc827452b.webp',
  'Contact Us': '/images/hero/646efc827452b.webp',
  'PO and PEOs': '/images/hero/65efeac7d49a3.webp',
};

function getImageForPage(activeItemLabel: string): string {
  if (PAGE_IMAGES[activeItemLabel]) return PAGE_IMAGES[activeItemLabel];

  // Deterministic fallback based on label string hash to keep it consistent
  let hash = 0;
  for (let i = 0; i < activeItemLabel.length; i++) {
    hash = activeItemLabel.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % LOCAL_WEBP_IMAGES.length;
  return LOCAL_WEBP_IMAGES[index];
}

export default function SubPageLayout({
  title,
  subtitle,
  category,
  activeItemLabel,
  children,
  hideDefaultBackBar,
}: SubPageLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Just scroll to top on route change smoothly
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  const imageUrl = getImageForPage(activeItemLabel);
  const categoryDisplayName = CATEGORY_NAMES[category] || category;
  const menuCategoryKey = CATEGORY_TO_MENU_KEY[category] || categoryDisplayName || 'Academics';

  const handleOpenMenuCategory = () => {
    window.dispatchEvent(new CustomEvent('openMenuCategory', { detail: { category: menuCategoryKey } }));
  };

  // Back, as on CET and CMC: on desktop it goes home; on phones — where the menu
  // is the way around — it reopens the menu at this page's section.
  const [isPhone, setIsPhone] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsPhone(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const handleBackButtonClick = () => {
    if (isPhone) {
      window.dispatchEvent(new CustomEvent('openMenuCategory', { detail: { category: menuCategoryKey } }));
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen text-[#3B3131] font-sans pb-24 pt-0">
      <SEO
        title={title}
        subtitle={subtitle}
        category={category}
        activeItemLabel={activeItemLabel}
        image={imageUrl}
      />
      {/* ── BREADCRUMBS & TOP NAVIGATION SECTION WITH INTEGRATED RESPONSIVE MENU BUTTON ── */}
      <div className="bg-[#0c2411]/95 backdrop-blur-md text-white/50 text-[10px] sm:text-xs py-2 sm:py-2.5 border-b border-[#D4AF37]/20 relative z-30 sticky top-0 shadow-md">
        <div className="w-full max-w-[1580px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-3">
          {/* Left Breadcrumb path */}
          <div className="flex items-center gap-1.5 sm:gap-2 select-none font-mono tracking-wider min-w-0 flex-1 overflow-hidden">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1 text-white/70 hover:text-[#D4AF37] transition-colors shrink-0 cursor-pointer"
              title="Home"
              aria-label="Home"
            >
              <Home size={12} className="text-[#D4AF37]" />
              <span className="hidden sm:inline">HOME</span>
            </button>
            <span className="text-white/30 shrink-0">/</span>
            <button
              onClick={handleOpenMenuCategory}
              className="text-[#D4AF37] font-bold uppercase shrink-0 truncate max-w-[90px] sm:max-w-[160px] md:max-w-none hover:underline cursor-pointer"
              title={`Open ${categoryDisplayName} in Menu`}
            >
              {categoryDisplayName}
            </button>
            <span className="text-white/30 shrink-0">/</span>
            <span className="text-white font-bold uppercase truncate max-w-[110px] sm:max-w-[220px] md:max-w-none">{activeItemLabel}</span>
          </div>

          {/* Menu button — phones and tablets only, as on CET and CMC: on desktop
              the header strip right above already has MENU */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('ckp:menu-toggle'))}
            aria-label="Open menu"
            className="lg:hidden ml-3 -mr-1 -my-1.5 text-[#D4AF37] shrink-0 flex items-center justify-center w-8 h-8 rounded-md text-white/70 hover:text-white active:scale-95 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── CLASSIC HEADER BANNER WITH WEBP BACKDROP ── */}
      <div className="relative text-white py-12 md:py-20 border-b border-[#D4AF37]/25 overflow-hidden bg-[#0c2411]">
        {/* Background Image with absolute positioning */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center filter brightness-[0.22] saturate-[0.8] transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Deep green to dark transparent gradient overlay to ensure outstanding contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2411] via-[#0c2411]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#D4AF37] uppercase font-bold mb-3 block animate-pulse">
            {categoryDisplayName}
          </span>
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/85 font-sans text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12 lg:py-16">
        <main className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-8 md:p-10 lg:p-12 min-h-[380px] sm:min-h-[500px] shadow-sm overflow-visible relative">
          <AnimatePresence mode="wait">
            <motion.div
              ref={containerRef}
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              {/* Back Link above subpage content */}
              {!hideDefaultBackBar && (
                <div className="mb-8 flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <button
                    onClick={handleBackButtonClick}
                    className="group flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-[#B8933E] hover:text-[#123a1a] transition-colors cursor-pointer"
                    title={isPhone ? `Back to ${categoryDisplayName}` : 'Back to Home'}
                  >
                    <ArrowLeft size={14} className="stroke-[3] transition-transform group-hover:-translate-x-1" />
                    <span>{isPhone ? `Back to ${categoryDisplayName}` : 'Back to Home'}</span>
                  </button>
                  <button
                    onClick={handleOpenMenuCategory}
                    className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-slate-500 hover:text-[#123a1a] uppercase tracking-wider py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    title={`Open ${categoryDisplayName} menu`}
                  >
                    <Menu size={14} className="text-[#D4AF37]" />
                    <span>{categoryDisplayName} / {activeItemLabel}</span>
                  </button>
                </div>
              )}
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}