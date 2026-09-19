import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, LayoutGroup } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, Phone, Home, Mail, MapPin,
  BookOpen, Cpu, Info, Library, GraduationCap, Users, HeartHandshake,
  Briefcase, FileText, Settings, Trophy, Sparkles, Network, ArrowRight,
  Palette, Calendar, Target, FolderClosed, Shield, UserCheck, Home as HomeIcon,
  Coffee, Laptop, Image, Newspaper, Award, Search, Building2, Compass, Scale, ShieldCheck, Rocket, FlaskConical, Landmark,
  Headset
} from 'lucide-react';
import CkpcmcLogo from './CkpcmcLogo';
import { useLenis } from '../context/LenisContext';
import { ckpipsrNavigation, categoryUrlPrefixes, categoryDisplayNames, slugify } from '../data/ckpipsrContent';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from './ui/navigation-menu';

const navItems = Object.keys(ckpipsrNavigation).map(categoryLabel => {
  const jsonKey = Object.keys(categoryDisplayNames).find(k => categoryDisplayNames[k] === categoryLabel) || '';
  const urlPrefix = categoryUrlPrefixes[jsonKey] || slugify(categoryLabel);
  return {
    name: categoryLabel,
    id: urlPrefix,
    dropdown: ckpipsrNavigation[categoryLabel].map(item => item.label),
    align: 'left' as const
  };
});

export interface GroupedNavItem {
  isParent: boolean;
  label: string;
  path?: string;
  children?: { label: string; fullLabel: string; path: string }[];
}

export function groupNavItems(items: { label: string; path: string }[]): GroupedNavItem[] {
  const result: GroupedNavItem[] = [];
  const processed = new Set<string>();

  const parentCandidates = new Set<string>();
  items.forEach(item => {
    const idx = item.label.indexOf(" - ");
    if (idx !== -1) {
      const parentName = item.label.substring(0, idx).trim();
      parentCandidates.add(parentName);
    }
  });

  items.forEach(item => {
    if (processed.has(item.label)) return;

    const idx = item.label.indexOf(" - ");
    if (idx !== -1) {
      const parentName = item.label.substring(0, idx).trim();
      if (!processed.has(parentName)) {
        processed.add(parentName);
        const children = items
          .filter(i => i.label.startsWith(parentName + " - "))
          .map(i => {
            processed.add(i.label);
            const childLabel = i.label.substring(parentName.length + 3).trim();
            return {
              label: childLabel,
              fullLabel: i.label,
              path: i.path
            };
          });

        const parentItem = items.find(i => i.label === parentName);

        result.push({
          isParent: true,
          label: parentName,
          path: parentItem?.path,
          children
        });
      }
    } else {
      if (parentCandidates.has(item.label)) {
        if (!processed.has(item.label)) {
          processed.add(item.label);
          const children = items
            .filter(i => i.label.startsWith(item.label + " - "))
            .map(i => {
              processed.add(i.label);
              const childLabel = i.label.substring(item.label.length + 3).trim();
              return {
                label: childLabel,
                fullLabel: i.label,
                path: i.path
              };
            });

          result.push({
            isParent: true,
            label: item.label,
            path: item.path,
            children
          });
        }
      } else {
        processed.add(item.label);
        result.push({
          isParent: false,
          label: item.label,
          path: item.path
        });
      }
    }
  });

  return result;
}


function useSmoothScrollTo() {
  const lenis = useLenis();

  const navigate = useNavigate();
  const location = useLocation();

  return (targetId: string) => {
    let normalizedId = targetId;
    if (normalizedId === 'staff') normalizedId = 'faculty';
    if (normalizedId === 'activities' || normalizedId === 'news' || normalizedId === 'events') normalizedId = 'university-gazette';
    if (normalizedId === 'blogs') normalizedId = 'blogs-magazine';
    if (normalizedId === 'principal' || normalizedId === 'principal-message') normalizedId = 'principal-message';
    if (normalizedId === 'committees' || normalizedId === 'iqac') normalizedId = 'about';
    if (normalizedId === 'student-corner') normalizedId = 'campus-life';

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: normalizedId } });
      return;
    }

    window.dispatchEvent(new Event('closeAllModals'));
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.overscrollBehavior = '';
    document.documentElement.style.overscrollBehavior = '';

    if (normalizedId === 'home') {
      if (lenis) {
        lenis.start();
        lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(normalizedId);
      if (el) {
        if (lenis) {
          lenis.start();
          lenis.resize();
          lenis.scrollTo(el, { offset: -80, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: rect.top + scrollTop - 80, behavior: 'smooth' });
        }
      }
    }
  };
}

const resolveNavItemPath = (category: string, subItemName: string): string | undefined => {
  const navItem = ckpipsrNavigation[category]?.find(ni => ni.label === subItemName);
  if (navItem?.path) return navItem.path;

  const jsonKey = Object.keys(categoryDisplayNames).find(k => categoryDisplayNames[k] === category);
  const prefix = jsonKey ? categoryUrlPrefixes[jsonKey] : slugify(category);
  return `/${prefix}/${slugify(subItemName)}`;
};

const bottomNavItems = [
  { name: 'About Us', id: 'about-us' },
  { name: 'Academics', id: 'academics' },
  { name: 'Students Corner', id: 'students-corner' },
  { name: 'Cells', id: 'cells' },
  { name: 'Research & Innovation', id: 'research-and-innovation' },
  { name: 'IQAC', id: 'iqac' },
  { name: 'T&P', id: 'training-and-placement' },
  { name: 'Activities', id: 'activities' },
];

const landingNavItems = [
  { name: 'Home', id: 'home', icon: HomeIcon },
  { name: 'About Us', id: 'about', icon: Info },
  { name: 'News & Gazette', id: 'university-gazette', icon: Newspaper },
  { name: 'Principal\'s Message', id: 'principal-message', icon: FileText },
  { name: 'Courses Offered', id: 'courses', icon: BookOpen },
  { name: 'Campus Life', id: 'campus-life', icon: Building2 },
  { name: 'Faculty', id: 'faculty', icon: Users },
  { name: 'Blogs & Magazine', id: 'blogs-magazine', icon: Sparkles },
  { name: 'Admissions', id: 'admissions', icon: UserCheck },
];

const dropdownDetails: Record<string, { desc: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  'About Us': { desc: 'Milestones and legacy of CKPIPSR', icon: Info },
  'Profile': { desc: 'Overview and background of CKPIPSR', icon: Info },
  'Vision and Mission': { desc: 'Our foundational pillars and goals', icon: Target },
  'PO and PEOs': { desc: 'Program outcomes and educational objectives', icon: Target },
  'About Trust': { desc: 'Navyug Vidyabhavan Trust history', icon: HeartHandshake },
  'The Founder': { desc: 'Honoring Shri Chhotubhai Pithawalla', icon: Award },
  'Governing Body': { desc: 'Distinguished members of the governing council', icon: Users },
  'Principal': { desc: 'Leadership message and vision from Dr. Dhiren Shah', icon: FileText },
  'Deans and Faculty In-charges': { desc: 'Academic council and department heads', icon: Users },
  'Campus Map': { desc: 'Interactive campus layout, blocks, and directions', icon: Compass },
  'Contact Us': { desc: 'Location, timings, and contact details', icon: Phone },
  'Courses Offered': { desc: 'D.Pharm, B.Pharm, and M.Pharm programs', icon: BookOpen },
  'Courses Offered - D.Pharm': { desc: 'Diploma in Pharmacy (2 Years)', icon: BookOpen },
  'Courses Offered - B.Pharm': { desc: 'Bachelor of Pharmacy (4 Years)', icon: BookOpen },
  'Courses Offered - M.Pharm': { desc: 'Master of Pharmacy (2 Years)', icon: Sparkles },
  'Courses Offered - Short Term Certificate': { desc: 'Online dossier & skill program', icon: Award },
  'Faculties': { desc: 'Our qualified academic guides and researchers', icon: Users },
  'Resources': { desc: 'Campus infrastructure and central facilities', icon: Building2 },
  'Anti-Ragging Committee': { desc: 'Zero-tolerance safety protocols & vigilance', icon: Shield },
  'ARC': { desc: 'Anti-Ragging Committee, Squad & Reporting', icon: Shield },
  'WDC': { desc: 'Women Development Cell & Gender Equality', icon: HeartHandshake },
  'Women Cell': { desc: 'Women Development Cell & Gender Equality', icon: HeartHandshake },
  'ST-SC Cell': { desc: 'Equal opportunities & welfare resources', icon: UserCheck },
  'SC-ST Cell': { desc: 'Equal opportunities, empowerment & welfare resources', icon: UserCheck },
  'GRC': { desc: 'Grievance Redressal Cell & fair student resolution', icon: Scale },
  'Grievance': { desc: 'Grievance Redressal Cell & fair student resolution', icon: Scale },
  'ADC': { desc: 'Anti-Discrimination Cell & Equal Opportunity', icon: ShieldCheck },
  'Anti-Discrimination Cell': { desc: 'Anti-Discrimination Cell & Equal Opportunity', icon: ShieldCheck },
  'EDC': { desc: 'Entrepreneurship Development Cell & Innovation', icon: Rocket },
  'Entrepreneurship Development Cell': { desc: 'Entrepreneurship Development Cell & Innovation', icon: Rocket },
  'GSC': { desc: 'Gender Sensitization Cell & Equality Promotion', icon: HeartHandshake },
  'Gender Sensitization Cell': { desc: 'Gender Sensitization Cell & Equality Promotion', icon: HeartHandshake },
  'Research - About': { desc: 'Research & Development Cell, Vision, Mission & Policy', icon: FlaskConical },
  'About Research': { desc: 'Research & Development Cell, Vision, Mission & Policy', icon: FlaskConical },
  'Research - Publications': { desc: 'Annual research journals & publications', icon: FileText },
  'Publications': { desc: 'Annual research journals & publications', icon: FileText },
  'Research Publications': { desc: 'Annual research journals & publications', icon: FileText },
  'Research - Patents': { desc: 'Granted patents & innovative technology filings', icon: Award },
  'Patents': { desc: 'Granted patents & innovative technology filings', icon: Award },
  'Research - Books': { desc: 'Authored textbooks, monographs & book chapters', icon: BookOpen },
  'Books': { desc: 'Authored textbooks, monographs & book chapters', icon: BookOpen },
  'Books & Chapters': { desc: 'Authored textbooks, monographs & book chapters', icon: BookOpen },
  'Research - Doctoral Studies': { desc: 'Ph.D. research scholars, approved GTU guides & theses', icon: GraduationCap },
  'Doctoral Studies': { desc: 'Ph.D. research scholars, approved GTU guides & theses', icon: GraduationCap },
  'Ph.D. Studies': { desc: 'Ph.D. research scholars, approved GTU guides & theses', icon: GraduationCap },
  'Research - PG Projects': { desc: 'Post graduate dissertation projects & publications', icon: FlaskConical },
  'PG Projects': { desc: 'Post graduate dissertation projects & publications', icon: FlaskConical },
  'Research - Grants': { desc: 'Sponsored seminars, refresher courses & research funding', icon: Landmark },
  'Grants': { desc: 'Sponsored seminars, refresher courses & research funding', icon: Landmark },
  'Research - Consultancy': { desc: 'Funded minor research projects & investigator consultancies', icon: Briefcase },
  'Consultancy': { desc: 'Funded minor research projects & investigator consultancies', icon: Briefcase },
  'Research - Ethics': { desc: 'Code of ethics for research, organization & scientific investigators', icon: Shield },
  'Research Ethics': { desc: 'Code of ethics for research, organization & scientific investigators', icon: Shield },
  'Ethics': { desc: 'Code of ethics for research, organization & scientific investigators', icon: Shield },
  'Research - MOUs': { desc: 'Industrial partnerships, hospital linkages & academic MOUs', icon: HeartHandshake },
  'MOUs & Collaborations': { desc: 'Industrial partnerships, hospital linkages & academic MOUs', icon: HeartHandshake },
  'MOUs': { desc: 'Industrial partnerships, hospital linkages & academic MOUs', icon: HeartHandshake },
  'SSIP - About': { desc: 'Student Start-up & Innovation Policy, IPIES ecosystem & pre-incubation', icon: Rocket },
  'About SSIP': { desc: 'Student Start-up & Innovation Policy, IPIES ecosystem & pre-incubation', icon: Rocket },
  'SSIP Cell': { desc: 'Student Start-up & Innovation Policy, IPIES ecosystem & pre-incubation', icon: Rocket },
  'SSIP': { desc: 'Student Start-up & Innovation Policy, IPIES ecosystem & pre-incubation', icon: Rocket },
  'Animal Ethics Committee (IAEC)': { desc: 'Institutional Animal Ethics Committee', icon: Shield },
  'Sexual Harassment Committee': { desc: 'POSH compliance & women cell', icon: Shield },
  'About IQAC': { desc: 'Quality assurance cell overview', icon: Shield },
  'IQAC Objectives': { desc: 'Quality assurance standards', icon: Shield },
  'Minutes & ATR': { desc: 'Meetings and action audits', icon: FileText },
  'Teaching Staff': { desc: 'Our qualified academic guides', icon: Users },
  'Non-Teaching Staff': { desc: 'Lab assistants and library admins', icon: Users },
  'Central Library': { desc: 'Central collection of medical & pharmacy journals', icon: BookOpen },
  'Instrument Room': { desc: 'HPLC, UV Spectrophotometer & High-tech testing', icon: Cpu },
  'Herbal Garden': { desc: 'Botanical collection of medicinal plants', icon: Sparkles },
  'Sports': { desc: 'Indoor-outdoor games & gymkhana', icon: Trophy },
  'Hostel': { desc: 'Secure residential boarding facilities', icon: Building2 },
  'Canteen': { desc: 'Hygienic vegetarian cafeteria', icon: Coffee },
  'Classrooms': { desc: 'Digitized smart lecture theaters', icon: Laptop },
  'Library': { desc: 'Central collection of books and journals', icon: BookOpen },
  'Inter-College Achievements': { desc: 'Championship representation records', icon: Trophy },
  'Competitions': { desc: 'Pharma quizzes, poster contests & fests', icon: Palette },
  'Gallery': { desc: 'Moments of convocations & campus life', icon: Image },
  'Media Appreciation': { desc: 'Official press releases & clippings', icon: Newspaper },
  'News': { desc: 'Live notices and campus bulletins', icon: Newspaper },
  'Achievements': { desc: 'Celebrations of rankers & medalists', icon: Trophy },
  'Events': { desc: 'National conferences, webinars & workshops', icon: Calendar },
  'Scholarships': { desc: 'Government schemes, corporate foundations & awards', icon: Award },
  'Scholorships': { desc: 'Government schemes, corporate foundations & awards', icon: Award },
  'Timetables': { desc: 'Academic routine and semester class schedules', icon: Calendar },
  'Hobby Club': { desc: 'Creative, cultural, sports & student hobby activities', icon: Compass },
  'Alumni': { desc: 'CKPIPSRAA network, committee & alumni registration', icon: GraduationCap },
  'Student Help Desk': { desc: 'Raise tickets, check status, FAQs & student support', icon: Headset },
};

const megaMenuDisplayNames: Record<string, string> = {
  "Courses Offered - D.Pharm": "D.Pharm",
  "Courses Offered - B.Pharm": "B.Pharm",
  "Courses Offered - M.Pharm": "M.Pharm",
  "Courses Offered - Short Term Certificate": "Short-Term Certificate",
  "Resources - Laboratories": "Laboratories",
  "Resources - Library": "Central Library",
  "Resources - Sports": "Sports Facilities",
  "Resources - Hostel": "Residential Hostels",
  "Resources - Medical": "Medical Center",
  "Resources - Transportation": "Transportation & Parking",
  "Resources - Seminar Hall": "Seminar Hall",
  "Resources - Cafeteria": "Cafeteria & Dining",
  "Resources - Central Facilities": "Central Facilities",
  "Resources - EV Charging Station": "EV Charging Station",
  "Resources - Medicinal Garden": "Medicinal Garden",
  "Research - About": "About Research",
  "Research - Publications": "Publications",
  "Research - Patents": "Patents",
  "Research - Books": "Books",
  "Research - Doctoral Studies": "Doctoral Studies",
  "Research - PG Projects": "PG Projects",
  "Research - Grants": "Grants",
  "Research - Consultancy": "Consultancy",
  "Research - Ethics": "Ethics",
  "Ethics": "Ethics",
  "Research Ethics": "Research Ethics",
  "Research - MOUs": "MOUs",
  "MOUs": "MOUs",
  "MOUs & Collaborations": "MOUs",
  "SSIP - About": "About SSIP",
  "SSIP - Mentors": "SSIP Mentors",
  "SSIP - Updates": "SSIP Updates",
  "SSIP - Apply": "Apply to SSIP",
  "ARC": "Anti-Ragging Committee (ARC)",
  "WDC": "Women Development Cell (WDC)",
  "SC-ST Cell": "SC-ST Cell (Empowerment)",
  "GRC": "Grievance Redressal Cell (GRC)",
  "ADC": "Anti-Discrimination Cell (ADC)",
  "EDC": "Entrepreneurship Development Cell (EDC)",
  "GSC": "Gender Sensitization Cell (GSC)"
};

const menuSubmaps: Record<string, string[]> = {};
Object.keys(ckpipsrNavigation).forEach(categoryLabel => {
  menuSubmaps[categoryLabel] = ckpipsrNavigation[categoryLabel].map(item => item.label);
});

/* ═══════════════════════════════════════════════════════════════
   MEGA MENU CONFIG — Code 1's big two-column + image-collage style,
   rebuilt to cover all 8 of Code 2's nav categories.
   Item descriptions/icons are pulled from dropdownDetails above,
   so there's only one source of truth for that text.
═══════════════════════════════════════════════════════════════ */
interface MegaMenuColumn {
  title: string;
  items: string[];
}

interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  images: {
    tall1: { url: string; caption: string };
    tall2: { url: string; caption: string };
    landscape: { url: string; caption: string; tag: string };
  };
  accentText: string;
}

const megaMenuConfigs: Record<string, MegaMenuConfig> = {
  'About Us': {
    columns: [
      { title: "Who We Are", items: ["Profile", "Vision and Mission", "PO and PEOs", "About Trust"] },
      { title: "Governance & Campus", items: ["The Founder", "Governing Body", "Principal", "Deans and Faculty In-charges", "Campus Map", "Contact Us"] }
    ],
    images: {
      tall1: { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop", caption: "Vision & Goals" },
      tall2: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", caption: "Principal's Message" },
      landscape: { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", caption: "C.K. Pithawalla Institute of Pharmaceutical Science & Research", tag: "Est. 2005" }
    },
    accentText: "A Legacy of Quality in Pharmaceutical Education & Scientific Research"
  },
  'Academics': {
    columns: [
      { title: "Pharmacy Programs", items: ["Courses Offered", "Courses Offered - D.Pharm", "Courses Offered - B.Pharm", "Courses Offered - M.Pharm", "Courses Offered - Short Term Certificate"] },
      { title: "Academics", items: ["Approvals", "Faculties"] },
      { title: "Resources", items: ["Resources - Laboratories", "Resources - Library", "Resources - Sports", "Resources - Hostel", "Resources - Medical", "Resources - Transportation", "Resources - Seminar Hall", "Resources - Cafeteria", "Resources - Central Facilities", "Resources - EV Charging Station", "Resources - Medicinal Garden"] }
    ],
    images: {
      tall1: { url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=400&auto=format&fit=crop", caption: "Formulation Lab" },
      tall2: { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400&auto=format&fit=crop", caption: "Library Hub" },
      landscape: { url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop", caption: "Advanced Research Instrumentation & Resources", tag: "PCI & GTU Approved" }
    },
    accentText: "Nurturing Competent, Ethical & Innovative Pharmacy Professionals"
  }
};

/* ═══════════════════════════════════════════════════════════════
   DESKTOP NAV ITEM — Code 1's mega-menu visual, wired to Code 2's
   router-based navigation. Open/close state is lifted to Navbar
   (activeMegaMenu) so the full-page backdrop blur can react to it.
═══════════════════════════════════════════════════════════════ */
interface NavItemDesktopProps {
  key?: string;
  item: {
    name: string;
    id: string;
    dropdown: string[];
    align: string;
  };
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onToggle: () => void;
}

function NavItemDesktop({ item, isActive, onMouseEnter, onMouseLeave, onToggle }: NavItemDesktopProps) {
  const getDynamicMegaMenuConfig = (categoryLabel: string): MegaMenuConfig => {
    if (megaMenuConfigs[categoryLabel]) return megaMenuConfigs[categoryLabel];

    const items = ckpipsrNavigation[categoryLabel]?.map(i => i.label) || [];
    const columns: MegaMenuColumn[] = [];
    if (items.length <= 8) {
      columns.push({ title: "Quick Links", items });
    } else {
      const half = Math.ceil(items.length / 2);
      columns.push({ title: "Resources & Programs", items: items.slice(0, half) });
      columns.push({ title: "General Information", items: items.slice(half) });
    }

    const defaultImages = {
      tall1: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop",
      tall2: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=400&auto=format&fit=crop",
      landscape: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
    };

    return {
      columns,
      images: {
        tall1: { url: defaultImages.tall1, caption: "College Campus" },
        tall2: { url: defaultImages.tall2, caption: "Study & Research" },
        landscape: { url: defaultImages.landscape, caption: `Explore our ${categoryLabel} section`, tag: "CKPIPSR" }
      },
      accentText: `Welcome to the ${categoryLabel} section of CKPIPSR`
    };
  };

  const config = getDynamicMegaMenuConfig(item.name);
  const navigate = useNavigate();

  return (
    <NavigationMenuItem value={item.name} className="static">
      <NavigationMenuTrigger className="flex items-center gap-1 text-[10px] min-[1320px]:text-[11px] min-[1400px]:text-[12.5px] 2xl:text-[14.5px] font-sans font-bold py-2 px-0.5 min-[1320px]:px-1 min-[1400px]:px-2 transition-all duration-200 relative whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0 text-white hover:text-[#D4AF37] data-[state=open]:text-[#D4AF37] bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
        <span>{item.name}</span>
      </NavigationMenuTrigger>

      {item.dropdown.length > 0 && config && (
        <NavigationMenuContent className="w-[92vw] max-w-[1020px] max-h-[82vh] overflow-y-auto overscroll-contain touch-pan-y border border-[#50C878]/30 rounded-[2rem] shadow-[0_35px_80px_rgba(0,0,0,0.55)] p-6 md:p-8 bg-[#123a1a]/95 backdrop-blur-2xl text-left relative" data-lenis-prevent="true">
          {/* Invisible mouse hover bridge */}
          <div className="absolute inset-x-0 -top-8 h-10 bg-transparent" />

          <div className="grid grid-cols-12 gap-8 items-stretch">
                  {/* Left side: Link Columns */}
                  <div className={`${config.images ? 'col-span-12 lg:col-span-7' : 'col-span-12'} flex flex-col justify-between`}>
                    <div className={`grid gap-x-6 gap-y-4 ${config.columns.length === 3 ? 'grid-cols-3' : config.columns.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {config.columns.map((col) => (
                        <div key={col.title} className="flex flex-col">
                          <div className="mb-3 flex items-center justify-between border-b border-white/15 pb-2">
                            <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                              {col.title}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {(() => {
                              const allNavItems = ckpipsrNavigation[item.name] || [];
                              const itemsToGroup = col.items.map(lbl => {
                                const found = allNavItems.find(ni => ni.label === lbl);
                                return {
                                  label: lbl,
                                  path: found?.path || ''
                                };
                              });
                              const groupedColItems = groupNavItems(itemsToGroup);

                              return groupedColItems.map((groupedItem) => {
                                if (groupedItem.isParent) {
                                  const isDuplicateHeader = groupedItem.label.toLowerCase() === col.title.toLowerCase();
                                  return (
                                    <div key={groupedItem.label} className={`flex flex-col gap-1.5 ${isDuplicateHeader ? "" : "mt-2"}`}>
                                      {!isDuplicateHeader && (
                                        groupedItem.path ? (
                                          <button
                                            onClick={() => {
                                              onMouseLeave();
                                              if (groupedItem.path) navigate(groupedItem.path);
                                            }}
                                            className="text-left font-sans font-bold text-[11px] tracking-wider uppercase text-[#D4AF37] hover:text-[#50C878] transition-colors"
                                          >
                                            {groupedItem.label}
                                          </button>
                                        ) : (
                                          <span className="text-left font-sans font-bold text-[11px] tracking-wider uppercase text-[#D4AF37]/80 select-none">
                                            {groupedItem.label}
                                          </span>
                                        )
                                      )}

                                      <div className="flex flex-col gap-1.5 pl-3 border-l border-white/10 ml-0.5">
                                        {groupedItem.children?.map((child) => {
                                          const childDetail = dropdownDetails[child.fullLabel] || dropdownDetails[child.label] || { desc: '', icon: Sparkles };
                                          return (
                                            <button
                                              key={child.fullLabel}
                                              onClick={() => {
                                                onMouseLeave();
                                                const navItemPath = resolveNavItemPath(item.name, child.fullLabel);
                                                if (navItemPath) navigate(navItemPath);
                                              }}
                                              className="group/menu-item text-left flex flex-col gap-0.5 py-1 px-2.5 -mx-2.5 rounded-lg hover:bg-[#50C878]/15 border border-transparent hover:border-[#50C878]/30 transition-all duration-200 w-full cursor-pointer"
                                            >
                                              <span className="font-sans font-bold text-[12px] text-white/90 group-hover/menu-item:text-[#50C878] transition-colors flex items-center gap-1.5">
                                                <span>{megaMenuDisplayNames[child.fullLabel] || child.label}</span>
                                                <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover/menu-item:opacity-100 group-hover/menu-item:translate-x-0 transition-all duration-200 text-[#50C878]" />
                                              </span>
                                              {childDetail.desc && (
                                                <span className="font-sans text-[10.5px] text-white/60 group-hover/menu-item:text-white/85 transition-colors leading-tight font-medium">
                                                  {childDetail.desc}
                                                </span>
                                              )}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                } else {
                                  const detail = dropdownDetails[groupedItem.label] || { desc: '', icon: Sparkles };
                                  return (
                                    <button
                                      key={groupedItem.label}
                                      onClick={() => {
                                        onMouseLeave();
                                        const navItemPath = resolveNavItemPath(item.name, groupedItem.label);
                                        if (navItemPath) navigate(navItemPath);
                                      }}
                                      className="group/menu-item text-left flex flex-col gap-0.5 py-1.5 px-3 -mx-3 rounded-xl hover:bg-[#50C878]/15 border border-transparent hover:border-[#50C878]/30 transition-all duration-200 w-full cursor-pointer"
                                    >
                                      <span className="font-sans font-bold text-[13px] text-white group-hover/menu-item:text-[#50C878] transition-colors flex items-center gap-1.5">
                                        <span>{megaMenuDisplayNames[groupedItem.label] || groupedItem.label}</span>
                                        <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover/menu-item:opacity-100 group-hover/menu-item:translate-x-0 transition-all duration-200 text-[#50C878]" />
                                      </span>
                                      <span className="font-sans text-[11px] text-white/70 group-hover/menu-item:text-white/90 transition-colors leading-tight font-medium">
                                        {detail.desc}
                                      </span>
                                    </button>
                                  );
                                }
                              });
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {config.accentText && (
                      <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-white/60 font-sans text-xs font-semibold mt-4">
                        <Sparkles size={13} className="text-[#D4AF37]" />
                        <span>{config.accentText}</span>
                      </div>
                    )}
                  </div>

                  {/* Right side: Image collage */}
                  {config.images && (
                    <div className="hidden lg:flex col-span-5 gap-3 h-[220px] items-stretch pl-4 border-l border-white/10">
                      <div className="w-[90px] h-full rounded-[1.25rem] overflow-hidden shadow-sm relative group/item-img shrink-0 border border-white/10">
                        <img
                          src={config.images.tall1.url}
                          alt={config.images.tall1.caption}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item-img:scale-105"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[9.5px] font-bold text-white leading-tight font-sans">
                            {config.images.tall1.caption}
                          </span>
                        </div>
                      </div>

                      <div className="w-[90px] h-full rounded-[1.25rem] overflow-hidden shadow-sm relative group/item-img shrink-0 border border-white/10">
                        <img
                          src={config.images.tall2.url}
                          alt={config.images.tall2.caption}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item-img:scale-105"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[9.5px] font-bold text-white leading-tight font-sans">
                            {config.images.tall2.caption}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 h-full rounded-[1.25rem] overflow-hidden shadow-md relative group/item-img border border-white/10">
                        <img
                          src={config.images.landscape.url}
                          alt={config.images.landscape.caption}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item-img:scale-105"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
                          <span className="text-[8.5px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-0.5">
                            {config.images.landscape.tag}
                          </span>
                          <h4 className="text-white text-[11px] font-bold leading-tight font-sans">
                            {config.images.landscape.caption}
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  );
}

function NavContent({
  menuOpen,
  setMenuOpen,
  setInitialCategory,
  isScrolled,
  activeMegaMenu,
  setActiveMegaMenu
}: {
  menuOpen: boolean;
  setMenuOpen: any;
  setInitialCategory: (name: string | null) => void;
  isScrolled: boolean;
  activeMegaMenu: string | null;
  setActiveMegaMenu: (name: string | null) => void;
}) {
  const scrollToId = useSmoothScrollTo();

  return (
    <>
      {/* ── DESKTOP: logo-left / links-center / actions-right (Code 1 layout) ── */}
      <div className={`hidden xl:flex items-center justify-between w-full px-3 sm:px-5 lg:px-6 2xl:px-9 transition-all duration-300 relative z-30 ${isScrolled ? 'h-[43px]' : 'h-[54px]'}`}>
        {/* Left: Logo + Title */}
        <div
          className="flex items-center gap-2 cursor-pointer group/logo select-none shrink-0"
          onClick={() => scrollToId('home')}
        >
          <div className={`rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center p-0.5 shadow-md transition-all duration-300 group-hover/logo:scale-[1.06] shrink-0 ${isScrolled ? 'w-7.5 h-7.5 2xl:w-8.5 2xl:h-8.5' : 'w-9.5 h-9.5 2xl:w-[42px] 2xl:h-[42px]'}`}>
            <CkpcmcLogo className="w-full h-full" showText={false} />
          </div>
          <div className="flex flex-col text-left justify-center">
            <span className="font-sans font-bold tracking-[0.04em] text-white leading-none text-[10.5px] xl:text-[12px] 2xl:text-[13.5px] uppercase">
              C.K. PITHAWALLA INSTITUTE
            </span>
            <span className="tracking-[0.03em] uppercase text-[#D4AF37] font-sans font-bold text-[7.5px] xl:text-[8.5px] 2xl:text-[9.8px] leading-none mt-0.5 opacity-95 whitespace-nowrap">
              OF PHARMACEUTICAL SCIENCE AND RESEARCH
            </span>
          </div>
        </div>

        {/* Center: Nav items */}
        <NavigationMenu
          value={activeMegaMenu || ""}
          onValueChange={(val) => setActiveMegaMenu(val || null)}
          className="flex-1 flex items-center justify-center max-w-none static"
        >
          <NavigationMenuList className="flex items-center justify-center gap-x-0 min-[1320px]:gap-x-1 min-[1400px]:gap-x-2.5 2xl:gap-x-4 min-w-0 mx-1 overflow-visible list-none">
            {navItems.map((item) => (
              <NavItemDesktop
                key={item.name}
                item={item}
                isActive={activeMegaMenu === item.name}
                onMouseEnter={() => setActiveMegaMenu(item.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
                onToggle={() => setActiveMegaMenu(activeMegaMenu === item.name ? null : item.name)}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: Actions */}
        <div className="flex items-center gap-x-1.5 shrink-0">
          <button
            onClick={() => scrollToId('admissions')}
            className="group/btn flex items-center gap-1.5 px-2.5 lg:px-4 py-1.5 rounded-full text-[9px] lg:text-[9.5px] font-bold uppercase tracking-wider transition-all duration-300 bg-[#D4AF37] hover:bg-[#C9A227] text-[#1a1208] hover:shadow-[0_4px_18px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 shadow-md cursor-pointer whitespace-nowrap select-none"
          >
            <span>APPLY NOW</span>
            <ArrowRight size={10} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 stroke-[3]" />
          </button>

          <button
            onClick={() => {
              setInitialCategory(null);
              setMenuOpen(!menuOpen);
            }}
            className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 rounded-full text-[9px] lg:text-[9.5px] font-bold uppercase tracking-wider transition-all duration-300 bg-white/10 hover:bg-white/18 border border-white/18 hover:border-white/30 text-white active:scale-95 cursor-pointer whitespace-nowrap select-none"
          >
            <Menu size={12} className="shrink-0 stroke-[2.5]" />
            <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
          </button>
        </div>
      </div>

      {/* ── MOBILE / TABLET header — optimized for small viewports & zero overlap ── */}
      <div className={`xl:hidden flex items-center justify-between w-full px-2 min-[360px]:px-3 min-[380px]:px-4 py-1 sm:px-5 transition-all duration-300 ${isScrolled ? 'h-[44px] sm:h-[48px]' : 'h-[52px] sm:h-[58px]'}`}>
        <div
          className="flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-3 shrink-0 cursor-pointer group/logo justify-start select-none min-w-0 max-w-[58%] min-[360px]:max-w-[62%] sm:max-w-none"
          onClick={() => scrollToId('home')}
        >
          <div className={`rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center p-0.5 shadow-md transition-all duration-300 group-hover/logo:scale-[1.05] active:scale-95 shrink-0 ${isScrolled ? 'w-7 h-7 sm:w-9 sm:h-9' : 'w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 min-[380px]:w-[38px] min-[380px]:h-[38px] sm:w-[44px] sm:h-[44px]'
            }`}>
            <CkpcmcLogo className="w-full h-full" showText={false} />
          </div>
          <div className="flex flex-col text-left justify-center select-none min-w-0">
            <span className={`font-sans font-bold tracking-[0.02em] text-white leading-none whitespace-nowrap ${isScrolled
              ? 'text-[8.5px] min-[360px]:text-[9.2px] min-[390px]:text-[10px] sm:text-[12px]'
              : 'text-[9.5px] min-[360px]:text-[10.2px] min-[390px]:text-[11.2px] sm:text-[13.5px]'
              }`}>
              C.K. PITHAWALLA INSTITUTE
            </span>
            <div className={`tracking-[0.02em] uppercase text-[#D4AF37] font-sans font-bold leading-[1.12] mt-0.5 flex flex-col ${isScrolled
              ? 'text-[4.8px] min-[360px]:text-[5.2px] min-[390px]:text-[5.8px] sm:text-[6.8px]'
              : 'text-[5.2px] min-[360px]:text-[5.8px] min-[390px]:text-[6.5px] sm:text-[7.5px]'
              }`}>
              <span className="whitespace-nowrap">OF PHARMACEUTICAL SCIENCE</span>
              <span className="whitespace-nowrap">AND RESEARCH</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => scrollToId('admissions')}
            className="px-2 min-[360px]:px-2.5 min-[380px]:px-3 sm:px-4 py-1.5 rounded-full text-[8.5px] min-[360px]:text-[9px] min-[380px]:text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#D4AF37] hover:bg-[#C19A20] text-[#1a1208] transition-all duration-300 active:scale-95 shadow-md cursor-pointer select-none min-h-[26px] min-[360px]:min-h-[28px] sm:min-h-[32px] flex items-center justify-center shrink-0 whitespace-nowrap"
          >
            <span>APPLY</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="text-white p-1.5 min-[380px]:px-2.5 sm:px-3.5 py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/10 rounded-full border border-white/20 transition-all duration-300 flex items-center gap-1 text-[8.5px] min-[360px]:text-[9px] min-[380px]:text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider cursor-pointer select-none min-h-[26px] min-[360px]:min-h-[28px] sm:min-h-[32px] shrink-0 whitespace-nowrap"
            onClick={() => {
              setInitialCategory(null);
              setMenuOpen(!menuOpen);
            }}
          >
            <Menu size={11} className="text-white shrink-0 stroke-[2.5] sm:w-[13px] sm:h-[13px]" />
            <span className="hidden min-[380px]:inline">{menuOpen ? 'CLOSE' : 'MENU'}</span>
          </motion.button>
        </div>
      </div>
    </>
  );
}

function BottomNavItem({
  item,
  isActive,
  onItemClick
}: {
  key?: string;
  item: { name: string; id: string };
  isActive: boolean;
  onItemClick: (name: string, id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  const navigate = useNavigate();
  const subItems = menuSubmaps[item.name] || [];
  const rawItems = ckpipsrNavigation[item.name] || [];
  const groupedItems = groupNavItems(rawItems);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => { setIsOpen(false); setExpandedParent(null); }}
    >
      <button
        onClick={() => {
          if (subItems.length === 0) onItemClick(item.name, item.id);
          else setIsOpen(!isOpen);
        }}
        className="relative px-4 sm:px-5 py-2.5 mx-0.5 text-[9.5px] sm:text-[11px] xl:text-[12px] uppercase tracking-wider font-bold transition-all duration-300 rounded-2xl overflow-visible hover:scale-105 active:scale-95 cursor-pointer select-none flex items-center gap-1 text-white"
      >
        {isActive && (
          <motion.div
            layoutId="bottomNavIndicator"
            className="absolute inset-0 bg-[#123a1a] rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
            transition={{ type: "spring", stiffness: 700, damping: 35, mass: 0.6 }}
          />
        )}
        <span className="relative z-10 whitespace-nowrap">{item.name}</span>
        {subItems.length > 0 && (
          <ChevronDown size={11} className="relative z-10 text-white rotate-180 transition-transform duration-200" />
        )}
      </button>

      {subItems.length > 0 && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 min-w-[240px] max-h-[70vh] overflow-y-auto overscroll-contain touch-pan-y bg-[#123a1a]/95 backdrop-blur-3xl border border-[#50C878]/35 rounded-2xl p-2 shadow-[0_-15px_40px_rgba(0,0,0,0.45)] z-50 flex flex-col gap-0.5"
              data-lenis-prevent="true"
            >
              <div className="absolute w-full h-4 bg-transparent left-0 bottom-[-16px]" />
              <div className="px-2.5 py-1.5 border-b border-white/15 mb-1 flex items-center justify-between">
                <span className="text-[8.5px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase font-bold">Explore {item.name}</span>
                <div className="w-1 h-1 rounded-full bg-[#D4AF37] animate-pulse" />
              </div>
              {groupedItems.map((groupedItem) => {
                if (groupedItem.isParent) {
                  const isExpanded = expandedParent === groupedItem.label;
                  return (
                    <div key={groupedItem.label} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedParent(isExpanded ? null : groupedItem.label);
                        }}
                        onMouseEnter={() => {
                          setExpandedParent(groupedItem.label);
                        }}
                        className="group/item flex items-center justify-between px-3 py-2 rounded-xl text-left text-white/90 hover:bg-[#50C878]/15 border border-transparent hover:border-[#50C878]/30 transition-all duration-200 cursor-pointer w-full"
                      >
                        <span className="font-sans font-bold text-[12px] text-white group-hover/item:text-[#50C878] transition-colors whitespace-nowrap">
                          {groupedItem.label}
                        </span>
                        <ChevronDown size={11} className={`text-white/65 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#50C878]' : '-rotate-90'}`} />
                      </button>

                      {isExpanded && (
                        <div className="flex flex-col pl-3 border-l border-[#50C878]/30 ml-3.5 my-1 gap-0.5">
                          {groupedItem.children?.map((child) => {
                            return (
                              <button
                                key={child.fullLabel}
                                onClick={() => {
                                  const navItemPath = resolveNavItemPath(item.name, child.fullLabel);
                                  if (navItemPath) { navigate(navItemPath); setIsOpen(false); }
                                }}
                                className="group/subitem flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-white/80 hover:bg-[#50C878]/10 border border-transparent hover:border-[#50C878]/20 transition-all duration-150 cursor-pointer w-full"
                              >
                                <span className="font-sans font-semibold text-[11px] text-white/85 group-hover/subitem:text-[#50C878] transition-colors font-medium">
                                  {child.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <button
                      key={groupedItem.label}
                      onClick={() => {
                        const navItemPath = resolveNavItemPath(item.name, groupedItem.label);
                        if (navItemPath) { navigate(navItemPath); setIsOpen(false); }
                      }}
                      className="group/item flex items-center justify-between px-3 py-2 rounded-xl text-left text-white/90 hover:bg-[#50C878]/15 border border-transparent hover:border-[#50C878]/30 transition-all duration-200 cursor-pointer w-full hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="font-sans font-bold text-[12px] text-white group-hover/item:text-[#50C878] transition-colors whitespace-nowrap">
                        {groupedItem.label}
                      </span>
                    </button>
                  );
                }
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function getActiveCategory(pathname: string): string {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (!cleanPath) return "About Us";

  const firstSegment = cleanPath.split("/")[0];

  if (firstSegment === "about" || firstSegment === "about-us") return "About Us";
  if (firstSegment === "academics" || firstSegment === "courses") return "Academics";
  if (firstSegment === "students" || firstSegment === "students-corner" || firstSegment === "student-corner") return "Students Corner";
  if (firstSegment === "cells" || firstSegment === "committees") return "Cells";
  if (firstSegment === "rni" || firstSegment === "research-and-innovation" || firstSegment === "research") return "Research & Innovation";
  if (firstSegment === "iqac") return "IQAC";
  if (firstSegment === "tnp" || firstSegment === "training-and-placement" || firstSegment === "placement" || firstSegment === "placements") return "T&P";
  if (firstSegment === "activities" || firstSegment === "events") return "Activities";

  for (const [category, items] of Object.entries(ckpipsrNavigation)) {
    if (items.some(item => {
      const itemClean = item.path.replace(/^\/+|\/+$/g, "").toLowerCase();
      return itemClean === cleanPath || cleanPath.startsWith(itemClean);
    })) {
      return category;
    }
  }

  const jsonKey = Object.keys(categoryUrlPrefixes).find(
    key => categoryUrlPrefixes[key] === firstSegment
  );
  if (jsonKey) {
    return categoryDisplayNames[jsonKey];
  }
  return "About Us";
}

const getShortName = (name: string): string => {
  const shortNames: Record<string, string> = {
    'Home': 'Home',
    'About Us': 'About',
    'Principal\'s Message': 'Principal',
    'Courses Offered': 'Courses',
    'Courses Offered - D.Pharm': 'D.Pharm',
    'Courses Offered - B.Pharm': 'B.Pharm',
    'Courses Offered - M.Pharm': 'M.Pharm',
    'Courses Offered - Short Term Certificate': 'Certificate',
    'Approvals': 'Approvals',
    'Faculties': 'Faculties',
    'Resources': 'Resources',
    'Resources - Laboratories': 'Labs',
    'Resources - Library': 'Library',
    'Resources - Sports': 'Sports',
    'Resources - Hostel': 'Hostel',
    'Resources - Medical': 'Medical',
    'Resources - Transportation': 'Transport',
    'Resources - Seminar Hall': 'Seminar Hall',
    'Resources - Cafeteria': 'Cafeteria',
    'Resources - Central Facilities': 'Central Fac',
    'Resources - EV Charging Station': 'EV Station',
    'Resources - Medicinal Garden': 'Garden',
    'Campus Life': 'Campus',
    'Faculty': 'Faculty',
    'News & Events': 'News',
    'News & Gazette': 'News',
    'Admissions': 'Admissions',
    'Vision and Mission': 'Vision',
    'PO and PEOs': 'PO & PEO',
    'The Trust': 'Trust',
    'About Trust': 'Trust',
    'The Founder': 'Founder',
    'Governing Body': 'Governing Body',
    'Principal': 'Principal',
    'Deans and Faculty In-charges': 'Deans & Faculty',
    'Campus Map': 'Campus Map',
    'Contact Us': 'Contact',
    'Timetables': 'Timetables',
    'Courses': 'Courses',
    'Scholorships': 'Scholarships',
    'E-Library': 'E-Library',
    'Educational Videos': 'Videos',
    'Hobby Club': 'Hobby Club',
    'Alumni': 'Alumni',
    'Student Help Desk': 'Help Desk',
    'ARC': 'Anti-Ragging',
    'WDC': 'Women Cell',
    'SC-ST Cell': 'SC-ST Cell',
    'GRC': 'Grievance',
    'ADC': 'Discipline',
    'EDC': 'Equal Opp',
    'GSC': 'Gender Cell',
    'Research - About': 'Research',
    'Research - Publications': 'Publications',
    'Research - Patents': 'Patents',
    'Research - Books': 'Books',
    'Research - Doctoral Studies': 'Ph.D. Studies',
    'Research - PG Projects': 'PG Projects',
    'Research - Grants': 'Grants',
    'Research - Consultancy': 'Consultancy',
    'Research - Ethics': 'Ethics',
    'Research - MOUs': 'MOUs',
    'SSIP - About': 'SSIP Cell',
    'SSIP - Mentors': 'SSIP Mentors',
    'SSIP - Updates': 'SSIP Updates',
    'SSIP - Apply': 'SSIP Apply',
    'IIC': 'IIC Cell',
    'About IQAC': 'About IQAC',
    'IQAC Composition': 'Composition',
    'IQAC Initiatives and Activities': 'Initiatives',
    'MoMs and ATR': 'Minutes & ATR',
    'Institution Distinctiveness': 'Distinctiveness',
    'Best Practices': 'Best Practices',
    'NIRF': 'NIRF',
    'AISHE': 'AISHE',
    'IIQA': 'IIQA',
    'IDP': 'IDP',
    'RTI': 'RTI',
    'Placements': 'Placements',
    'Training': 'Training',
    'Activity': 'Activities',
    'Visits': 'Visits',
    'Committee': 'Committee',
    'Events': 'Events',
    'Achievements': 'Achievements'
  };
  return shortNames[name] || name;
};

// ─── Apple Liquid Glass Dock Track ──────────
const GlassDock = ({ children, activeValue }: { children: React.ReactNode; activeValue?: string | boolean }) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);

  const tabsRef = useRef<{ left: number; width: number; value: string }[]>([]);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const currentWRef = useRef(0);
  const targetWRef = useRef(0);
  const velocityXRef = useRef(0);
  const velocityWRef = useRef(0);
  const fluidStretchRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const capsuleStartXRef = useRef(0);
  const didDragRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const measureAndSync = useCallback(() => {
    if (!flexRef.current) return;
    const pills = Array.from(flexRef.current.querySelectorAll('[data-pill]'));
    const tabs = pills.map((el) => {
      const htmlEl = el as HTMLElement;
      return { left: htmlEl.offsetLeft, width: htmlEl.offsetWidth, value: htmlEl.getAttribute('data-value') || '' };
    });
    tabsRef.current = tabs;

    const idx = tabs.findIndex((t) => t.value === String(activeValue));
    const activeIdx = idx >= 0 ? idx : 0;
    if (tabs[activeIdx] && !isDraggingRef.current) {
      const w = tabs[activeIdx].width * 1.1;
      const xOffset = (w - tabs[activeIdx].width) / 2;
      const tx = tabs[activeIdx].left - xOffset;
      targetXRef.current = tx;
      targetWRef.current = w;
      if (currentWRef.current === 0) {
        currentXRef.current = tx;
        currentWRef.current = w;
      }
    }
  }, [activeValue]);

  useEffect(() => {
    measureAndSync();
    const ro = new ResizeObserver(measureAndSync);
    if (flexRef.current) ro.observe(flexRef.current);
    window.addEventListener('resize', measureAndSync);
    return () => { ro.disconnect(); window.removeEventListener('resize', measureAndSync); };
  }, [measureAndSync]);

  useEffect(() => {
    const container = shellRef.current;
    if (!container) return;

    const scrollToActive = () => {
      const activeBtn = container.querySelector('[data-active="true"]') as HTMLElement;
      if (activeBtn && container.scrollWidth > container.clientWidth) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const scrollLeft = container.scrollLeft + (btnRect.left - containerRect.left) - (container.clientWidth / 2) + (btnRect.width / 2);
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
      }
    };

    scrollToActive();
    const timer = setTimeout(scrollToActive, 120);
    return () => clearTimeout(timer);
  }, [activeValue]);

  useEffect(() => {
    const loop = () => {
      if (!isDraggingRef.current) {
        const springX = (targetXRef.current - currentXRef.current) * 0.28;
        velocityXRef.current = (velocityXRef.current + springX) * 0.70;
        currentXRef.current += velocityXRef.current;

        const springW = (targetWRef.current - currentWRef.current) * 0.28;
        velocityWRef.current = (velocityWRef.current + springW) * 0.70;
        currentWRef.current += velocityWRef.current;
      } else {
        const dragSpringX = (targetXRef.current - currentXRef.current) * 0.55;
        velocityXRef.current = dragSpringX;
        currentXRef.current += dragSpringX;
      }

      const speed = Math.abs(velocityXRef.current);
      const targetStretch = isDraggingRef.current
        ? Math.min(speed * 0.014 + 0.06, 0.28)
        : Math.min(speed * 0.010, 0.20);
      fluidStretchRef.current += (targetStretch - fluidStretchRef.current) * 0.16;

      const scaleX = 1 + fluidStretchRef.current;
      const scaleY = 1 - fluidStretchRef.current * 0.42;

      if (capsuleRef.current) {
        capsuleRef.current.style.width = `${currentWRef.current}px`;
        capsuleRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const getLocalX = (clientX: number) => {
    if (!flexRef.current) return 0;
    const rect = flexRef.current.getBoundingClientRect();
    return clientX - rect.left;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = getLocalX(e.clientX);
    capsuleStartXRef.current = currentXRef.current;
    targetXRef.current = currentXRef.current;
    velocityXRef.current = 0;
    velocityWRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const localX = getLocalX(e.clientX);
    const dx = localX - dragStartXRef.current;
    if (Math.abs(dx) > 6) {
      if (!didDragRef.current) {
        didDragRef.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) { }
      }
    }

    if (!didDragRef.current) return;

    let newX = capsuleStartXRef.current + dx;
    const tabs = tabsRef.current;
    const maxX = tabs.length > 0 ? tabs[tabs.length - 1].left + tabs[tabs.length - 1].width - currentWRef.current : 0;

    if (newX < 0) newX = newX * 0.22;
    if (newX > maxX) newX = maxX + (newX - maxX) * 0.22;

    targetXRef.current = newX;

    if (shellRef.current && shellRef.current.scrollWidth > shellRef.current.clientWidth) {
      const scrollLeft = shellRef.current.scrollLeft;
      const clientWidth = shellRef.current.clientWidth;
      const capsuleRight = newX + currentWRef.current;
      if (newX < scrollLeft + 20) {
        shellRef.current.scrollLeft = Math.max(0, newX - 20);
      } else if (capsuleRight > scrollLeft + clientWidth - 20) {
        shellRef.current.scrollLeft = Math.min(
          shellRef.current.scrollWidth - clientWidth,
          capsuleRight - clientWidth + 20
        );
      }
    }
  };

  const releasePointer = (e?: any) => {
    if (!isDraggingRef.current) return;
    const wasDragging = didDragRef.current;
    if (e && e.currentTarget && e.pointerId !== undefined) {
      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (err) { }
    }
    isDraggingRef.current = false;

    const tabs = tabsRef.current;
    if (tabs.length && wasDragging) {
      const currentCenter = currentXRef.current + currentWRef.current / 2;
      let nearestIdx = 0, minDist = Infinity;
      tabs.forEach((tab, i) => {
        const dist = Math.abs(tab.left + tab.width / 2 - currentCenter);
        if (dist < minDist) { minDist = dist; nearestIdx = i; }
      });
      const w = tabs[nearestIdx].width * 1.1;
      const xOffset = (w - tabs[nearestIdx].width) / 2;
      targetXRef.current = tabs[nearestIdx].left - xOffset;
      targetWRef.current = w;

      didDragRef.current = false;
      const btn = flexRef.current?.querySelectorAll('[data-pill]')[nearestIdx] as HTMLElement;
      if (btn) {
        btn.click();
      }
    } else {
      setTimeout(() => {
        didDragRef.current = false;
      }, 100);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!shellRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta) shellRef.current.scrollLeft += delta * 0.6;
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) { e.stopPropagation(); e.preventDefault(); }
  };

  return (
    <div className="relative group/dock max-w-full w-full min-w-0">
      <div
        ref={shellRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        onWheel={handleWheel}
        onClickCapture={handleClickCapture}
        style={{ touchAction: 'pan-x' }}
        className={[
          'relative flex items-center w-full max-w-full overflow-x-auto no-scrollbar',
          'bg-black/30 backdrop-blur-3xl saturate-150',
          'px-2 sm:px-3 md:px-3.5 py-1.5 sm:py-2 md:py-2.5 rounded-[999px]',
          'border border-white/20 border-t-white/35 border-b-black/40',
          'shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7),0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]',
          'touch-pan-x select-none cursor-grab active:cursor-grabbing',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,transparent_45%)] z-10" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_55%)] z-10" />

        <div ref={flexRef} className="relative flex items-center flex-nowrap gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 shrink-0 z-20 px-1 sm:px-2 m-auto min-w-max">
          {children}

          <div
            ref={capsuleRef}
            className="absolute top-0 left-0 z-[15] pointer-events-none will-change-transform rounded-[999px] overflow-hidden"
            style={{
              height: '100%',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(25px) saturate(250%) contrast(110%) brightness(115%) hue-rotate(5deg)',
              WebkitBackdropFilter: 'blur(25px) saturate(250%) contrast(110%) brightness(115%) hue-rotate(5deg)',
              boxShadow: `
                0 8px 24px -4px rgba(0,0,0,0.4),
                0 0 20px rgba(255,255,255,0.2),
                inset 0 1px 1.5px rgba(255,255,255,0.8),
                inset 0 -1px 1.5px rgba(0,0,0,0.25)
              `,
            }}
          >
            <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
              style={{
                padding: '1.5px',
                background: 'linear-gradient(170deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 45%, transparent 70%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor', maskComposite: 'exclude',
              }} />
            <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
              style={{
                padding: '1.5px',
                background: 'linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.4) 60%, rgba(210,180,255,0.25) 82%, rgba(160,210,255,0.3) 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor', maskComposite: 'exclude',
              }} />
            <div className="hidden md:block absolute bottom-[3px] left-3.5 md:left-3 lg:left-4 xl:left-5 right-3.5 md:right-3 lg:right-4 xl:right-5 h-[2.5px] rounded-full bg-[#50C878] shadow-[0_0_12px_rgba(80,200,120,1),0_0_4px_rgba(255,255,255,0.6)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Liquid Glass Pill Button ──────
function GlassPillBtn({
  label,
  value,
  icon: Icon,
  isActive,
  layoutPrefix,
  onClick,
}: {
  key?: string;
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }> | any;
  isActive: boolean;
  layoutPrefix: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-pill
      data-value={value}
      data-active={isActive ? "true" : "false"}
      onClick={onClick}
      title={label}
      className={[
        'relative z-20 flex items-center gap-1 sm:gap-1.5',
        'px-2 sm:px-3 md:px-3.5 py-1.5 sm:py-2',
        'rounded-[999px]',
        'text-[9.5px] sm:text-[10px] md:text-[10.5px] font-bold uppercase tracking-wider',
        'transition-colors duration-200 cursor-pointer select-none shrink-0',
        'active:scale-95',
        isActive ? 'text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]' : 'text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]',
      ].join(' ')}
    >
      {Icon && (
        <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-[#EFBF04] drop-shadow-[0_0_10px_rgba(239,191,4,0.8)]' : 'text-white/80'}`}>
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </span>
      )}
      <span className={`relative z-10 whitespace-nowrap text-[9.5px] sm:text-[10px] md:text-[10.5px] ${isActive ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] font-bold' : 'font-medium'} ${Icon ? 'hidden md:inline' : 'inline'}`}>
        {label}
      </span>
    </button>
  );
}

interface NavProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onItemClick?: (name: string, id: string) => void;
}

function BottomScrollNav({ activeSection, setActiveSection, onItemClick }: NavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubPage = location.pathname !== '/';
  const activeCategory = getActiveCategory(location.pathname);
  let subPageItems = isSubPage ? (ckpipsrNavigation[activeCategory] || []) : [];

  if (activeCategory === "Academics" && isSubPage) {
    const isResourcesPath = location.pathname.includes("resources");
    const isCoursesPath = location.pathname.includes("courses-offered") ||
      location.pathname.includes("b-pharm") ||
      location.pathname.includes("d-pharm") ||
      location.pathname.includes("m-pharm") ||
      location.pathname.includes("short-term");

    if (isResourcesPath) {
      subPageItems = subPageItems.filter(item =>
        item.label === "Resources" || item.label.startsWith("Resources - ")
      );
    } else if (isCoursesPath) {
      subPageItems = subPageItems.filter(item =>
        item.label.startsWith("Courses Offered")
      );
    } else {
      subPageItems = subPageItems.filter(item =>
        item.label === "Courses Offered" ||
        item.label === "Approvals" ||
        item.label === "Faculties" ||
        item.label === "Resources"
      );
    }
  }

  const getIconForLabel = (label: string) => {
    if (dropdownDetails[label]?.icon) return dropdownDetails[label].icon;

    const suffix = label.includes(' - ') ? label.split(' - ')[1] : label;
    if (dropdownDetails[suffix]?.icon) return dropdownDetails[suffix].icon;

    const lower = suffix.toLowerCase();
    if (lower.includes('lab')) return Cpu;
    if (lower.includes('lib')) return Library;
    if (lower.includes('sport')) return Trophy;
    if (lower.includes('hostel')) return Building2;
    if (lower.includes('medic') || lower.includes('health')) return Shield;
    if (lower.includes('transport') || lower.includes('bus') || lower.includes('park')) return Building2;
    if (lower.includes('seminar')) return Laptop;
    if (lower.includes('cafe') || lower.includes('canteen') || lower.includes('din')) return Coffee;
    if (lower.includes('garden')) return Sparkles;
    if (lower.includes('ev ') || lower.includes('charging')) return Cpu;
    if (lower.includes('facilit')) return Building2;

    return Sparkles;
  };

  return (
    <div className="flex items-center justify-center w-full max-w-full mx-auto">
      <AnimatePresence mode="wait" initial={false}>
        {isSubPage ? (
          <motion.div
            key={`subpage-dock-${activeCategory}`}
            className="w-full max-w-full flex justify-center"
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1] } }}
            exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.16, ease: [0.7, 0, 0.84, 0] } }}
          >
            <GlassDock activeValue={location.pathname}>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 px-2 sm:px-3 md:px-3.5 py-1.5 sm:py-2 rounded-[999px] text-[9.5px] sm:text-[10px] md:text-[10.5px] font-bold uppercase tracking-wider text-white hover:text-[#EFBF04] hover:bg-white/10 transition-all duration-200 cursor-pointer shrink-0 active:scale-95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
                title="Back to Landing Page"
              >
                <HomeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFBF04] md:text-white" />
                <span className="hidden md:inline font-bold">Home</span>
              </button>

              <span className="text-white/20 font-thin select-none shrink-0 text-sm px-0.5">|</span>

              <LayoutGroup id="subpage-nav">
                {subPageItems.map((item) => {
                  const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
                  const SubIcon = getIconForLabel(item.label);
                  return (
                    <GlassPillBtn
                      key={item.label}
                      label={getShortName(item.label)}
                      value={item.path}
                      icon={SubIcon}
                      isActive={isActive}
                      layoutPrefix="subpage"
                      onClick={() => { navigate(item.path); }}
                    />
                  );
                })}
              </LayoutGroup>
            </GlassDock>
          </motion.div>
        ) : (
          <motion.div
            key="landing-dock"
            className="w-full max-w-full flex justify-center"
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1] } }}
            exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.16, ease: [0.7, 0, 0.84, 0] } }}
          >
            <GlassDock activeValue={activeSection}>
              <LayoutGroup id="landing-nav">
                {landingNavItems.map((item) => {
                  const isActive = activeSection === item.name;
                  return (
                    <GlassPillBtn
                      key={item.name}
                      label={getShortName(item.name)}
                      value={item.name}
                      icon={item.icon}
                      isActive={isActive}
                      layoutPrefix="landing"
                      onClick={() => {
                        if (onItemClick) onItemClick(item.name, item.id);
                        else setActiveSection(item.name);
                      }}
                    />
                  );
                })}
              </LayoutGroup>
            </GlassDock>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NavbarProps {
  isReady?: boolean;
  onOpenAdmissions?: () => void;
}

export default function Navbar({ isReady = true, onOpenAdmissions }: NavbarProps) {
  const scrollToId = useSmoothScrollTo();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isSubPage = location.pathname !== '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(() => {
    if (isSubPage) return false;
    return typeof window !== 'undefined' ? window.scrollY <= 450 : true;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);

  // Listen for global openMainMenu and openMenuCategory events
  useEffect(() => {
    const handleOpenMainMenu = () => {
      setInitialCategory(null);
      setMenuOpen(true);
    };

    const handleOpenMenuCategory = (e: Event) => {
      const customEv = e as CustomEvent<{ category?: string }>;
      if (customEv?.detail?.category) {
        setInitialCategory(customEv.detail.category);
      } else {
        setInitialCategory('About Us');
      }
      setMenuOpen(true);
    };

    const handleCloseMainMenu = () => {
      setMenuOpen(false);
      setInitialCategory(null);
    };

    const handleToggleMainMenu = () => {
      setInitialCategory(null);
      setMenuOpen(prev => !prev);
    };

    window.addEventListener('openMainMenu', handleOpenMainMenu);
    window.addEventListener('openMenuCategory', handleOpenMenuCategory as EventListener);
    window.addEventListener('closeMainMenu', handleCloseMainMenu);
    window.addEventListener('toggleMainMenu', handleToggleMainMenu);

    return () => {
      window.removeEventListener('openMainMenu', handleOpenMainMenu);
      window.removeEventListener('openMenuCategory', handleOpenMenuCategory as EventListener);
      window.removeEventListener('closeMainMenu', handleCloseMainMenu);
      window.removeEventListener('toggleMainMenu', handleToggleMainMenu);
    };
  }, []);

  // ── Reset all menu states completely fresh on route change (especially returning to home) ──
  useEffect(() => {
    setMenuOpen(false);
    setInitialCategory(null);
    setActiveMegaMenu(null);
    if (location.pathname === '/') {
      setActiveSection(landingNavItems[0].name);
    }
  }, [location.pathname]);


  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>('');
  const [activeSection, setActiveSection] = useState(landingNavItems[0].name);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(typeof window !== 'undefined' && window.innerWidth < 1280);

  // ── Sync mobile/tablet viewport flag ──
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lenis = useLenis();

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [menuOpen, lenis]);

  // ── Smooth cross-page navigation scroll handling ──
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      window.history.replaceState({}, document.title);

      let attempts = 0;
      const tryScroll = () => {
        if (targetId === 'home') {
          if (lenis) {
            lenis.start();
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
          return;
        }

        const el = document.getElementById(targetId);
        if (el) {
          if (lenis) {
            lenis.start();
            lenis.resize();
            lenis.scrollTo(el, { offset: -80, duration: 1.2 });
          } else {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({ top: rect.top + scrollTop - 80, behavior: 'smooth' });
          }
        } else if (attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 60);
        }
      };

      const timer = setTimeout(tryScroll, 50);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.state, lenis]);

  // ── sync active section from URL ──
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') return;
    if (path.startsWith('/about/')) setActiveSection('About Us');
    else if (path.startsWith('/courses/') || path.startsWith('/academics/')) setActiveSection('Courses Offered');
    else if (path.startsWith('/committees/')) setActiveSection('Committees');
    else if (path.startsWith('/iqac/')) setActiveSection('IQAC');
    else if (path.startsWith('/staff/')) setActiveSection('Staff');
    else if (path.startsWith('/campus-life/')) setActiveSection('Campus Life');
    else if (path.startsWith('/student-corner/')) setActiveSection('Student Corner');
    else if (path.startsWith('/activities/')) setActiveSection('Activities');
  }, [location.pathname]);

  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleItemClick = (name: string, id: string) => {
    setActiveSection(name);
    isScrollingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    scrollToId(id);
    timeoutRef.current = setTimeout(() => { isScrollingRef.current = false; }, 1400);
  };

  const isHelpDeskPage = location.pathname.toLowerCase().includes('help');

  const [showBottomNav, setShowBottomNav] = useState(() => {
    if (isSubPage) return !isHelpDeskPage;
    return typeof window !== 'undefined' ? window.scrollY > 450 : false;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const checkModal = () => {
      const hasOverflowHidden = document.body.style.overflow === 'hidden';
      setIsModalOpen(hasOverflowHidden);
    };

    checkModal();

    const observer = new MutationObserver(() => {
      checkModal();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  // Subpages: header never shows, bottom nav always shows except on Student Help Desk.
  useEffect(() => {
    if (isSubPage) {
      setVisible(false);
      setShowBottomNav(!isHelpDeskPage);
    }
  }, [isSubPage, location.pathname, isHelpDeskPage]);

  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // ── Unified scroll handler — ZONE-based (position only, no direction/delta math).
  // This is what makes the behavior identical and reliable across desktop, mobile,
  // and tablet: instead of guessing "did the user scroll up or down" from noisy
  // frame-to-frame deltas (which break under tablet momentum/rubber-band scrolling),
  // every frame simply asks "where is the hero, where is the footer, right now" and
  // derives visibility purely from that. There is nothing left to desync.
  useEffect(() => {
    let rafId: number | null = null;
    const HIDE_THRESHOLD = 150;          // announcement bar collapse point
    const HERO_FALLBACK_THRESHOLD = 450; // used only if #home isn't found in DOM
    const FOOTER_REVEAL_FRACTION = 0.85; // footer counts as "reached" once its top enters viewport
    const HERO_EL_ID = 'home';
    const FOOTER_EL_ID = 'footer';

    const getClampedScrollY = () => {
      const raw = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return Math.max(0, Math.min(raw, maxScroll));
    };

    // Three mutually exclusive zones. Exactly one visibility outcome per zone,
    // so both navbars being visible at once is structurally impossible.
    const computeZone = (scrollYVal: number): 'hero' | 'footer' | 'body' => {
      const heroEl = document.getElementById(HERO_EL_ID);
      const inHero = heroEl
        ? heroEl.getBoundingClientRect().bottom > window.innerHeight * 0.3
        : scrollYVal <= HERO_FALLBACK_THRESHOLD;

      if (inHero) return 'hero';

      const footerEl = document.getElementById(FOOTER_EL_ID);
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * FOOTER_REVEAL_FRACTION) return 'footer';
      }

      return 'body';
    };

    const handleAllScroll = () => {
      const scrollYVal = getClampedScrollY();

      // Announcement bar collapse styling
      setIsScrolled(scrollYVal > HIDE_THRESHOLD);

      if (isSubPage) {
        // Subpages: header never shows, bottom nav shows except on Student Help Desk.
        setVisible(false);
        setShowBottomNav(!isHelpDeskPage);
      } else {
        const zone = computeZone(scrollYVal);
        if (zone === 'hero') {
          // Hero visible: header only.
          setVisible(true);
          setShowBottomNav(false);
        } else if (zone === 'footer') {
          // Footer reached on landing page: header hidden, bottom nav hidden.
          setVisible(false);
          setShowBottomNav(false);
        } else {
          // Everywhere else in body: bottom nav only.
          setVisible(false);
          setShowBottomNav(true);
        }
      }

      lastScrollYRef.current = scrollYVal;

      // ── Active-section highlight (unchanged — already purely position-based) ──
      if (!isScrollingRef.current) {
        const targetItems = isSubPage ? bottomNavItems : landingNavItems;
        const sections = targetItems.map(item => ({ name: item.name, el: document.getElementById(item.id) })).filter(s => s.el);
        if (sections.length > 0) {
          if (scrollYVal < 120) {
            setActiveSection(targetItems[0].name);
          } else {
            const isAtBottom = (window.innerHeight + scrollYVal) >= document.documentElement.scrollHeight - 60;
            if (isAtBottom) {
              setActiveSection(targetItems[targetItems.length - 1].name);
            } else {
              const targetY = window.innerHeight * 0.38;
              let foundActive = false;
              for (const section of sections) {
                if (section.el) {
                  const rect = section.el.getBoundingClientRect();
                  if (rect.top <= targetY && rect.bottom >= targetY) {
                    setActiveSection(section.name);
                    foundActive = true;
                    break;
                  }
                }
              }
              if (!foundActive) {
                let closestSection = activeSectionRef.current;
                let minDistance = Infinity;
                for (const section of sections) {
                  if (section.el) {
                    const rect = section.el.getBoundingClientRect();
                    const distance = Math.min(Math.abs(rect.top - targetY), Math.abs(rect.bottom - targetY));
                    if (distance < minDistance) {
                      minDistance = distance;
                      closestSection = section.name;
                    }
                  }
                }
                setActiveSection(closestSection);
              }
            }
          }
        }
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleAllScroll();
        rafId = null;
      });
    };

    const handleResize = () => {
      handleScroll();
    };

    handleAllScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Lenis intercepts real scrolling (often via transform), so on some
    // touch/tablet + iframe-preview combinations the native window 'scroll'
    // event can fire late or not at all. Lenis' own scroll event is the
    // authoritative "the page actually moved" signal — listen to it too.
    lenis?.on('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      lenis?.off('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isSubPage, location.pathname, lenis]);

  // ── clock ──
  useEffect(() => {
    const updateTime = () => setTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => { clearInterval(interval); if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <>
      {/* ── Mega-menu full-page backdrop blur (Code 1 behavior, closes on hover-out) ── */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            key="mega-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/45 backdrop-blur-md z-40 pointer-events-auto"
            onMouseEnter={() => setActiveMegaMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* ── TOP NAV — Floating iPhone notch style ── */}
      {!isSubPage && (
        <motion.nav
          key="top-nav"
          initial={{ y: -130 }}
          animate={{ y: (visible || menuOpen) ? 0 : -220 }}
          transition={
            (visible || menuOpen)
              ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.1, ease: "easeIn" }
          }
          className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-[1720px] pointer-events-auto"
        >
          <div className="w-full rounded-[26px] sm:rounded-[32px] bg-[#123a1a]/90 backdrop-blur-2xl border border-[#50C878]/35 shadow-[0_20px_50px_rgba(12,36,17,0.45)] flex flex-col relative overflow-visible">
            {/* Announcement bar — collapses on scroll */}
            <div className={`bg-gradient-to-r from-[#0C1E03] via-[#163807] to-[#0C1E03] border-t-2 border-[#D4AF37] border-b border-[#D4AF37]/35 text-white/90 hidden xl:block relative z-10 w-full overflow-hidden transition-all duration-300 rounded-t-[26px] sm:rounded-t-[32px] ${isScrolled ? 'h-0 py-0 opacity-0 border-t-0 border-b-0' : 'min-h-[32px] py-1 px-4 sm:px-6 lg:px-8 xl:px-10 opacity-100'
              }`}>
              <div className="w-full flex items-center justify-between font-sans text-[10px] xl:text-[11px] font-bold text-white/95 leading-normal select-none relative">
                <div className="flex items-center gap-x-3.5">
                  <div className="flex items-center gap-1.5 font-bold text-white tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>NAVYUG VIDYABHAVAN TRUST</span>
                  </div>
                  <span className="text-white/20">|</span>
                  <span className="text-white/80 font-medium">Affiliated to Gujarat Technological University (GTU) | Approved by PCI</span>
                </div>
                <div className="flex items-center gap-x-3 xl:gap-x-3.5">
                  <button
                    onClick={onOpenAdmissions}
                    className="font-bold text-[10px] uppercase text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/30 px-2.5 py-0.5 rounded-md select-none tracking-wider cursor-pointer transition-all flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span>Admissions Open 2026-27</span>
                  </button>
                  <span className="text-white/20">|</span>
                  <a href="tel:+916355065636 " className="flex items-center gap-1 hover:text-emerald-200 transition-colors text-white/90">
                    <Phone size={11} className="text-white" />
                    <span>Enquiries: +91 6355065636</span>
                  </a>
                  <span className="text-white/20">|</span>
                  <a href="mailto:ckpipsr@gmail.com" className="flex items-center gap-1 hover:text-emerald-200 transition-colors text-white/90">
                    <Mail size={11} className="text-white" />
                    <span>ckpipsr@gmail.com</span>
                  </a>
                  <span className="text-white/20">|</span>
                  <button
                    id="student-help-desk-btn"
                    onClick={() => navigate('/student-help-desk')}
                    className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#D4AF37] bg-black/35 hover:bg-[#D4AF37]/20 text-[#D4AF37] hover:text-[#FFE58F] text-[10px] xl:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer active:scale-95 group"
                    title="Student Help Desk"
                  >
                    <Headset size={12} className="text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>STUDENT HELP DESK</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main nav row */}
            <div className="bg-transparent w-full relative z-30 overflow-visible">
              <NavContent
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                setInitialCategory={setInitialCategory}
                isScrolled={isScrolled}
                activeMegaMenu={activeMegaMenu}
                setActiveMegaMenu={setActiveMegaMenu}
              />
            </div>
          </div>
        </motion.nav>
      )}

      {/* ── BOTTOM FLOATING NAV — Appears strictly when reaching footer section ── */}
      <AnimatePresence>
        {showBottomNav && !isModalOpen && !isHelpDeskPage && (
          <motion.nav
            key="bottom-nav"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-3 sm:bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[95vw] sm:w-[92vw] md:w-[90vw] max-w-6xl flex justify-center items-center pointer-events-auto select-none px-1 sm:px-2"
          >
            <div className="w-full max-w-full">
              <BottomScrollNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onItemClick={handleItemClick}
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── OVERLAY MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <OverlayMenu
            setMenuOpen={setMenuOpen}
            navigate={navigate}
            scrollToId={scrollToId}
            timeStr={timeStr}
            initialCategory={initialCategory}
            onClose={() => setInitialCategory(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OVERLAY MENU — unchanged from Code 2
═══════════════════════════════════════════════════════════════ */
const OVERLAY_TREE = Object.keys(ckpipsrNavigation).map(categoryLabel => ({
  key: categoryLabel,
  label: categoryLabel
}));

const overlaySectionMap: Record<string, string> = {};
Object.keys(ckpipsrNavigation).forEach(categoryLabel => {
  const jsonKey = Object.keys(categoryDisplayNames).find(k => categoryDisplayNames[k] === categoryLabel) || '';
  overlaySectionMap[categoryLabel] = categoryUrlPrefixes[jsonKey] || slugify(categoryLabel);
});

const POPULAR_TERMS = ['Admissions', 'B.Pharm', 'M.Pharm', 'D.Pharm', 'Hostel', 'Gallery'];
const PROSPECTUS_IMG = 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80';

function OverlayMenu({
  setMenuOpen,
  navigate,
  scrollToId,
  timeStr,
  initialCategory,
  onClose,
}: {
  setMenuOpen: (v: boolean) => void;
  navigate: (path: string) => void;
  scrollToId: (id: string) => void;
  timeStr: string;
  initialCategory?: string | null;
  onClose?: () => void;
}) {
  const [stack, setStack] = useState<string[]>(() => (initialCategory ? [initialCategory] : []));
  const [query, setQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [note, setNote] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const current = stack[stack.length - 1] ?? null;

  // Whenever initialCategory changes or menu opens fresh, sync stack and clean search
  useEffect(() => {
    if (initialCategory) {
      setStack([initialCategory]);
    } else {
      setStack([]);
    }
    setQuery('');
    setNote('');
    setShowMobileSearch(false);
  }, [initialCategory]);

  const handleClose = useCallback(() => {
    setMenuOpen(false);
    if (onClose) onClose();
  }, [setMenuOpen, onClose]);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => searchRef.current?.focus(), 420);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [handleClose]);

  const runAuto = (val: string) => {
    setQuery(val);
    if (autoTimer.current) clearTimeout(autoTimer.current);
    const q = val.trim();
    if (q.length < 3) { setNote(q ? 'Keep typing…' : ''); return; }
    setNote('Searching…');
    autoTimer.current = setTimeout(() => {
      handleClose();
      navigate(`/search?query=${encodeURIComponent(q)}`);
    }, 550);
  };
  const submit = () => {
    const q = query.trim();
    if (!q) return;
    if (autoTimer.current) clearTimeout(autoTimer.current);
    handleClose();
    navigate(`/search?query=${encodeURIComponent(q)}`);
  };
  const goSub = (subItem: string) => {
    const rootCategory = stack[0];
    if (!rootCategory) return;
    const navItemPath = resolveNavItemPath(rootCategory, subItem);
    handleClose();
    if (navItemPath) navigate(navItemPath);
  };

  const panelLeftVariants: any = {
    hidden: { x: isMobile ? 0 : '-102%', y: isMobile ? '102%' : 0, opacity: isMobile ? 0 : 1 },
    visible: { x: 0, y: 0, opacity: 1, transition: { ease: isMobile ? 'easeInOut' : [0.25, 1, 0.5, 1], duration: isMobile ? 0.5 : 0.65, delay: isMobile ? 0.01 : 0.05 } },
    exit: { x: isMobile ? 0 : '-102%', y: isMobile ? '102%' : 0, opacity: isMobile ? 0 : 1, transition: { ease: [0.7, 0, 0.84, 0], duration: isMobile ? 0.4 : 0.5, delay: 0.06 } }
  };
  const panelCtaVariants: any = {
    hidden: { x: isMobile ? 0 : '-102%', y: isMobile ? '102%' : 0, opacity: isMobile ? 0 : 1 },
    visible: { x: 0, y: 0, opacity: 1, transition: { ease: isMobile ? 'easeInOut' : [0.25, 1, 0.5, 1], duration: isMobile ? 0.5 : 0.65, delay: isMobile ? 0.04 : 0.12 } },
    exit: { x: isMobile ? 0 : '-102%', y: isMobile ? '102%' : 0, opacity: isMobile ? 0 : 1, transition: { ease: [0.7, 0, 0.84, 0], duration: isMobile ? 0.4 : 0.5, delay: 0 } }
  };
  const panelRightVariants: any = {
    hidden: { x: isMobile ? 0 : '102%', y: isMobile ? '102%' : 0, opacity: isMobile ? 0 : 1 },
    visible: { x: 0, y: 0, opacity: 1, transition: { ease: isMobile ? 'easeInOut' : [0.25, 1, 0.5, 1], duration: isMobile ? 0.5 : 0.65, delay: isMobile ? 0.02 : 0.02 } },
    exit: { x: isMobile ? 0 : '102%', y: isMobile ? '102%' : 0, opacity: isMobile ? 0 : 1, transition: { ease: [0.7, 0, 0.84, 0], duration: isMobile ? 0.4 : 0.5, delay: 0.12 } }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.045, delayChildren: isMobile ? 0.12 : 0.22 } }
  };
  const itemVariants = {
    hidden: { y: 22, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, damping: 20, stiffness: 170 } }
  };
  const sublistVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.035, delayChildren: 0.06 } }
  };
  const subitemVariants = {
    hidden: { x: 18, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring' as const, damping: 18, stiffness: 190 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeIn', delay: 0.35 } }}
      className="fixed inset-0 z-[60] flex flex-col md:flex-row bg-[#081406] overflow-y-auto md:overflow-hidden pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Menu and search"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <motion.button
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={handleClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-[80] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#112815] text-white hover:bg-[#D4AF37] hover:text-[#112815] border border-[#D4AF37]/50 hover:border-transparent transition-all duration-300 active:scale-95 cursor-pointer group/close shadow-[0_4px_25px_rgba(0,0,0,0.3)] backdrop-blur-md"
      >
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 text-white group-hover/close:text-[#112815]">Close</span>
        <X size={15} className="stroke-[3] transition-all duration-300 group-hover/close:rotate-90 text-[#D4AF37] group-hover/close:text-[#112815]" />
      </motion.button>

      <div className="order-2 md:order-1 hidden md:flex flex-col w-full md:w-2/5 relative z-10 h-full overflow-y-auto no-scrollbar">
        <motion.section
          variants={panelLeftVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white text-[#112815] overflow-hidden md:h-1/2 md:min-h-0 md:border-b-[10px] border-[#112815] p-4 md:p-12 flex flex-col justify-center shrink-0"
        >
          <div aria-hidden className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#D4AF37]/25 pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <label htmlFor="ckp-search" className="block font-serif font-bold text-xl md:text-3xl mb-2 md:mb-4">Search</label>
            <div className="flex items-center border-b-[3px] border-[#112815]">
              <input
                id="ckp-search"
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => runAuto(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                placeholder="Please enter a search term"
                autoComplete="off"
                className="flex-1 bg-transparent outline-none py-1.5 md:py-3 text-base md:text-xl placeholder:text-[#112815]/40"
              />
              <button onClick={submit} aria-label="Search" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#112815] hover:text-[#C19A20] transition-colors cursor-pointer shrink-0">
                <Search size={20} className="stroke-[2.5]" />
              </button>
            </div>
            <div className="mt-2 font-mono text-[10px] md:text-[11px] text-[#112815]/50 min-h-[16px]">{note}</div>
            <div className="mt-3 md:mt-6">
              <h4 className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#112815]/50 font-bold mb-2 md:mb-3">Popular search terms</h4>
              <div className="flex flex-wrap gap-x-3 md:gap-x-5 gap-y-1.5 md:gap-y-2">
                {POPULAR_TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQuery(term); runAuto(term); searchRef.current?.focus(); }}
                    className="relative font-sans font-semibold text-xs md:text-[15px] text-[#112815] cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-0.5 after:bg-[#C19A20] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={panelCtaVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative hidden md:flex bg-[#112815] text-white overflow-hidden md:h-1/2 md:min-h-0 p-4 sm:p-6 md:p-8 flex-col items-center justify-center shrink-0 text-center select-none"
        >
          {/* Background Image of students & campus with rich overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
              alt="Campus & Admissions"
              className="w-full h-full object-cover opacity-50 transition-all duration-700 hover:scale-105"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2104]/95 via-[#0D2104]/80 to-[#0D2104]/65" />
          </div>

          <div aria-hidden className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#D4AF37]/10 pointer-events-none" />

          <div className="relative z-10 flex-1 min-w-0 max-w-md flex flex-col items-center justify-center text-center gap-2 md:gap-3.5 my-auto">
            <div className="space-y-1 lg:space-y-1.5 text-center">
              <span className="font-mono text-[8px] md:text-[9.5px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold block text-center">2026 Admissions open</span>
              <h3 className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight text-center">Embark on Your Academic Journey</h3>
              <p className="text-[10px] md:text-xs text-white/70 leading-relaxed font-medium text-center line-clamp-2 md:line-clamp-none max-w-sm">Join Surat's premier institution for pharmaceutical education, research, and healthcare innovation. Apply online today.</p>
            </div>
            <button
              onClick={() => { handleClose(); scrollToId('admissions'); }}
              className="bg-[#D4AF37] hover:bg-[#C19A20] text-[#112815] font-sans font-bold text-[10px] md:text-[11px] lg:text-[12px] tracking-wider uppercase py-2 px-5 md:py-2.5 md:px-6 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_10px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:scale-[1.02] mx-auto rounded-md"
            >
              Apply Now <ArrowRight size={13} className="stroke-[3] shrink-0" />
            </button>
          </div>
        </motion.section>
      </div>

      <motion.section
        variants={panelRightVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="order-1 md:order-2 relative flex-1 bg-white text-[#112815] overflow-hidden md:border-l-[10px] border-[#112815] min-h-[50vh] md:min-h-0"
      >
        <div aria-hidden className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/12 pointer-events-none" />
        <div className="relative z-10 h-full w-full overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {current === null ? (
              <motion.nav
                key="root"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative h-full w-full max-h-full min-h-[400px] md:absolute md:inset-0 overflow-y-auto overscroll-contain touch-pan-y no-scrollbar px-5 sm:px-8 md:px-12 pt-20 md:pt-24 pb-14"
                data-lenis-prevent="true"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between border-b-2 border-[#112815] pb-3 mb-4 min-h-[36px]"
                >
                  {showMobileSearch ? (
                    <div className="flex items-center w-full gap-2 text-[#112815]">
                      <Search size={14} className="stroke-[2.5] text-[#112815]/60" />
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => runAuto(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                        placeholder="Search website..."
                        className="flex-1 bg-transparent text-sm font-sans font-semibold outline-none text-[#112815] placeholder:text-[#112815]/40 py-0.5"
                        autoFocus
                      />
                      {query && (
                        <button onClick={() => setQuery('')} className="p-1 text-[#112815]/40 hover:text-[#112815] cursor-pointer">
                          <X size={14} className="stroke-[2.5]" />
                        </button>
                      )}
                      <button
                        onClick={() => { setShowMobileSearch(false); setQuery(''); }}
                        className="text-[#112815]/60 hover:text-[#112815] p-1 cursor-pointer"
                        aria-label="Close search"
                      >
                        <X size={15} className="stroke-[2.5]" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#112815]/45 font-bold">Main menu</span>
                      <button
                        onClick={() => setShowMobileSearch(true)}
                        className="md:hidden text-[#112815]/60 hover:text-[#C19A20] transition-colors p-1 -mr-1 cursor-pointer"
                        aria-label="Search website"
                      >
                        <Search size={15} className="stroke-[2.5]" />
                      </button>
                    </>
                  )}
                </motion.div>
                {OVERLAY_TREE.map((item, i) => {
                  return (
                    <motion.button
                      variants={itemVariants}
                      key={item.key}
                      onClick={() => setStack([item.key])}
                      className="group/row w-full flex items-center justify-between gap-4 py-4 border-b border-[#112815]/12 text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-[10px] font-bold text-[#C19A20] bg-[#D4AF37]/12 rounded px-2 py-0.5">0{i + 1}</span>
                        <span className="relative font-serif font-semibold text-[22px] md:text-[26px] uppercase tracking-tight after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-[#C19A20] after:origin-left after:scale-x-0 group-hover/row:after:scale-x-100 after:transition-transform after:duration-300 group-hover/row:text-[#C19A20] transition-colors">
                          {item.label}
                        </span>
                      </span>
                      <span className="w-9 h-9 shrink-0 rounded-full bg-[#112815] text-white flex items-center justify-center transition-all duration-300 group-hover/row:bg-[#D4AF37] group-hover/row:text-[#112815] group-hover/row:translate-x-1">
                        <ArrowRight size={16} className="stroke-[2.5]" />
                      </span>
                    </motion.button>
                  );
                })}
                <motion.button
                  variants={itemVariants}
                  onClick={() => { handleClose(); scrollToId('admissions'); }}
                  className="group/row w-full flex items-center justify-between gap-4 py-4 border-b border-[#112815]/12 text-left cursor-pointer"
                >
                  <span className="font-serif font-semibold text-[22px] md:text-[26px] uppercase tracking-tight group-hover/row:text-[#C19A20] transition-colors">Contact &amp; Apply</span>
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={() => { handleClose(); navigate('/student-help-desk'); }}
                  className="group/row w-full flex items-center justify-between gap-4 py-4 border-b border-[#112815]/12 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#112815] text-[#D4AF37] flex items-center justify-center">
                      <Headset size={16} />
                    </span>
                    <span className="font-serif font-semibold text-[20px] md:text-[22px] uppercase tracking-tight text-[#112815] group-hover/row:text-[#C19A20] transition-colors">Student Help Desk</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C19A20] border border-[#C19A20]/40 px-2.5 py-0.5 rounded-full">Portal</span>
                </motion.button>
              </motion.nav>
            ) : (
              <motion.div
                key="sub"
                variants={sublistVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative h-full w-full max-h-full min-h-[400px] md:absolute md:inset-0 overflow-y-auto overscroll-contain touch-pan-y px-5 sm:px-8 md:px-10 lg:px-14 pt-20 md:pt-24 pb-16 flex flex-col pointer-events-auto"
                data-lenis-prevent="true"
              >
                <motion.button
                  variants={subitemVariants}
                  onClick={() => setStack((s) => s.slice(0, -1))}
                  className="group/back flex items-center gap-3 mb-5 cursor-pointer"
                >
                  <span className="w-9 h-9 rounded-full bg-[#112815] text-white flex items-center justify-center transition-all duration-300 group-hover/back:bg-[#D4AF37] group-hover/back:text-[#112815] group-hover/back:-translate-x-1">
                    <ArrowRight size={16} className="stroke-[2.5] rotate-180" />
                  </span>
                  <span className="font-sans font-bold text-[15px]">Back</span>
                </motion.button>
                <motion.div variants={subitemVariants} className="font-serif font-bold text-[26px] md:text-[30px] uppercase tracking-tight border-b-2 border-[#112815] pb-3 mb-3 text-[#112815]">
                  {stack[stack.length - 1]}
                </motion.div>
                {(() => {
                  const rootCategory = stack[0];
                  if (!rootCategory) return null;

                  const rawItems = ckpipsrNavigation[rootCategory] || [];
                  const groupedItems = groupNavItems(rawItems);

                  if (stack.length === 1) {
                    return groupedItems.map((groupedItem) => {
                      const label = groupedItem.label;
                      const detail = dropdownDetails[label] || { desc: '', icon: Sparkles };
                      return (
                        <motion.button
                          variants={subitemVariants}
                          key={label}
                          onClick={() => {
                            if (groupedItem.isParent) {
                              setStack([...stack, label]);
                            } else {
                              goSub(label);
                            }
                          }}
                          className="group/sub w-full flex items-center gap-3 py-3.5 border-b border-[#112815]/10 text-left cursor-pointer hover:bg-[#50C878]/10 rounded-xl px-2 transition-colors"
                        >
                          <span className="flex flex-col">
                            <span className="font-sans font-bold text-[16px] group-hover/sub:text-[#50C878] transition-colors leading-tight">{label}</span>
                            {detail.desc && <span className="font-sans text-[11px] text-[#112815]/60 mt-0.5 leading-snug">{detail.desc}</span>}
                          </span>
                          {groupedItem.isParent ? (
                            <ChevronDown size={14} className="ml-auto text-[#50C878] -rotate-90 stroke-[2.5]" />
                          ) : (
                            <ArrowRight size={13} className="ml-auto text-[#50C878] opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all shrink-0" />
                          )}
                        </motion.button>
                      );
                    });
                  } else {
                    const parentItem = groupedItems.find(g => g.label === stack[1]);
                    const childrenToRender = parentItem?.children || [];
                    return childrenToRender.map((child) => {
                      const detail = dropdownDetails[child.fullLabel] || dropdownDetails[child.label] || { desc: '', icon: Sparkles };
                      return (
                        <motion.button
                          variants={subitemVariants}
                          key={child.fullLabel}
                          onClick={() => goSub(child.fullLabel)}
                          className="group/sub w-full flex items-center gap-3 py-3.5 border-b border-[#112815]/10 text-left cursor-pointer hover:bg-[#50C878]/10 rounded-xl px-2 transition-colors"
                        >
                          <span className="flex flex-col">
                            <span className="font-sans font-bold text-[16px] group-hover/sub:text-[#50C878] transition-colors leading-tight">{child.label}</span>
                            {detail.desc && <span className="font-sans text-[11px] text-[#112815]/60 mt-0.5 leading-snug">{detail.desc}</span>}
                          </span>
                          <ArrowRight size={13} className="ml-auto text-[#50C878] opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all shrink-0" />
                        </motion.button>
                      );
                    });
                  }
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </motion.div>
  );
}