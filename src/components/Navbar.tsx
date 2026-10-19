import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import './ckpipsr-navbar-shape.css';
import CurvedSweep from './CurvedSweep.tsx';
import MobileIsland from './MobileIsland.tsx';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  LayoutGroup,
} from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Home,
  Mail,
  MapPin,
  BookOpen,
  Cpu,
  Info,
  Library,
  GraduationCap,
  Users,
  HeartHandshake,
  Briefcase,
  FileText,
  Settings,
  Trophy,
  Sparkles,
  Network,
  ArrowRight,
  Palette,
  Calendar,
  Target,
  FolderClosed,
  Shield,
  UserCheck,
  Home as HomeIcon,
  Coffee,
  Laptop,
  Image,
  Newspaper,
  Award,
  Search,
  Building2,
  Compass,
  Scale,
  ShieldCheck,
  Rocket,
  FlaskConical,
  Landmark,
  Headset,
} from 'lucide-react';
import CkpcmcLogo from './CkpcmcLogo';
import { useLenis } from '../context/LenisContext';
import { previewToken, withPreview } from '../hooks/previewToken';
import { useFooterContent } from '../hooks/useFooterContent';
import { useAdmissionsContent } from '../hooks/useAdmissionsContent';
import {
  NAV_DOCK_IDS,
  NAV_MENU_IDS,
  type NavMenu,
  type NavMenuChild,
  type NavMenuLink,
  type NavMenusContent,
} from '../hooks/useNavMenusContent';
import { navPages, overlayName, useSiteNav } from '../utils/navMenus';
import { iconFor } from '../utils/iconFor';

/**
 * The enquiry phone and email in the top bars: the first of each on the Contact
 * Us page, which the footer already fetches, so they are typed once.
 */
function useEnquiryContact() {
  const contact = useFooterContent().contact;
  const phone = contact?.phones[0] ?? '+91 63550 65636';
  const email = contact?.emails[0] ?? 'ckpipsr@gmail.com';
  return { phone, email, tel: `tel:${phone.replace(/[^\d+]/g, '')}` };
}

function useSmoothScrollTo() {
  const lenis = useLenis();

  const navigate = useNavigate();
  const location = useLocation();

  return (targetId: string) => {
    let normalizedId = targetId;
    if (normalizedId === 'staff') normalizedId = 'faculty';
    if (
      normalizedId === 'activities' ||
      normalizedId === 'news' ||
      normalizedId === 'events'
    )
      normalizedId = 'university-gazette';
    if (normalizedId === 'blogs') normalizedId = 'blogs-magazine';
    if (normalizedId === 'principal' || normalizedId === 'principal-message')
      normalizedId = 'principal-message';
    if (normalizedId === 'committees' || normalizedId === 'iqac')
      normalizedId = 'about';
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
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(normalizedId);
      if (el) {
        if (lenis) {
          lenis.start();
          lenis.resize();
          lenis.scrollTo(el, {
            offset: -80,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          const rect = el.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({
            top: rect.top + scrollTop - 80,
            behavior: 'smooth',
          });
        }
      }
    }
  };
}

const bottomNavItems = [
  { name: 'About Us', id: 'about-us' },
  { name: 'Academics', id: 'academics' },
  { name: 'Students Corner', id: 'students-corner' },
  { name: 'Cells', id: 'cells' },
  { name: 'Research & Innovation', id: 'research-and-innovation' },
  { name: 'Accreditation & Ranking', id: 'iqac' },
  { name: 'T&P', id: 'training-and-placement' },
  { name: 'Activities', id: 'activities' },
];

/** The icon on each homepage dock pill, by the part of the homepage it scrolls to. */
const DOCK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  about: Info,
  'university-gazette': Newspaper,
  'principal-message': FileText,
  courses: BookOpen,
  'campus-life': Building2,
  'blogs-magazine': Sparkles,
  admissions: UserCheck,
};

/** The icons this file already imports; any other Lucide name is loaded by iconFor. */
const NAV_ICONS = {
  Info, Target, HeartHandshake, Award, Users, FileText, Compass, Phone, BookOpen,
  Sparkles, Building2, Shield, Cpu, Library, Trophy, Coffee, Laptop, Calendar,
  GraduationCap, FlaskConical, Landmark, Briefcase, Rocket, Headset, Scale,
  ShieldCheck, UserCheck, Palette, Image, Newspaper,
};

interface NavItemDesktopProps {
  key?: string;
  item: NavMenu;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onToggle: () => void;
}

/**
 * Navigation-menu transition, as on IPSR (shadcn/Radix navigation menu):
 *  - moving from one menu to another does NOT fade the panel out and back in —
 *    the panel stays, and smoothly resizes from the old menu's height to the new;
 *  - its contents slide in from the side you moved towards, the old slide out
 *    the other way;
 *  - a fresh open and a final close keep the gentle fade and rise.
 * Every panel sits in the same centred spot, so one panel appears to morph.
 * Built on the existing motion library — no new packages.
 */
/** Long section names sit on two short lines ("Research &" / "Innovation"),
 *  which frees room for CET's spacing between menus. */
function navLines(barName: string): [string, string] | null {
  if (barName.length <= 12 || !barName.includes(' ')) return null;
  const mid = barName.length / 2;
  let at = -1;
  for (let i = 0; i < barName.length; i++)
    if (
      barName[i] === ' ' &&
      (at === -1 || Math.abs(i - mid) < Math.abs(at - mid))
    )
      at = i;
  return [barName.slice(0, at), barName.slice(at + 1)];
}

/** One block in a dropdown column: a plain link, or a heading with the links under it there. */
type ColumnEntry =
  | { kind: 'link'; link: NavMenuLink }
  | { kind: 'group'; link: NavMenuLink; children: NavMenuChild[] };

/**
 * What one column of a desktop dropdown lists, in the menu's order. A heading
 * shows in every column that holds one of its links, so Research's links can
 * run over two columns. A link pointing past the last column sits in the last.
 */
function columnEntries(menu: NavMenu, column: number): ColumnEntry[] {
  const last = menu.columns.length;
  const inColumn = (l: NavMenuChild) => Math.min(Math.max(l.column, 1), last) === column;
  const entries: ColumnEntry[] = [];
  for (const link of menu.links) {
    if (link.children.length > 0) {
      const children = link.children.filter(inColumn);
      if (children.length > 0) entries.push({ kind: 'group', link, children });
    } else if (inColumn(link)) entries.push({ kind: 'link', link });
  }
  return entries;
}

const navMorph = { switching: false, dir: 1, fromHeight: 0, lastIndex: -1 };
const MORPH_EASE = [0.16, 1, 0.3, 1] as const;

function NavItemDesktop({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onToggle,
}: NavItemDesktopProps) {
  // remember this panel's height while it's open, so the next menu can morph from it
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = frameRef.current;
    if (!isActive || !el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      navMorph.fromHeight = el.offsetHeight;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isActive]);

  const { featured } = item;
  const config = {
    columns: item.columns.map((col, i) => ({ title: col.title, entries: columnEntries(item, i + 1) })),
    accentText: featured.accentText,
    images: {
      tall1: { url: featured.tall1.image, caption: featured.tall1.caption },
      tall2: { url: featured.tall2.image, caption: featured.tall2.caption },
      landscape: {
        url: featured.landscape.image,
        caption: featured.landscape.caption,
        tag: featured.landscape.tag,
      },
    },
  };
  const navigate = useNavigate();

  return (
    <div
      className='group h-full flex items-center static'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isActive}
        className={`flex items-center gap-1 text-[11px] min-[1360px]:text-[11.5px] 2xl:text-[12.5px] font-sans font-bold py-2 px-0.5 min-[1400px]:px-1 2xl:px-1.5 transition-all duration-200 relative whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0 bg-transparent ${isActive ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
      >
        {(() => {
          const barName = item.barLabel || item.label;
          const lines = navLines(barName);
          return lines ? (
            <span className='leading-[1.1] text-left'>
              {lines[0]}
              <br />
              {lines[1]}
            </span>
          ) : (
            <span>{barName}</span>
          );
        })()}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${isActive ? 'rotate-180' : 'opacity-60'}`}
        />
      </button>

      {item.links.length > 0 && (
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={{
                // on a switch between menus the panel is already on screen: no fade, no rise
                hidden: () =>
                  navMorph.switching
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 10, scale: 0.985 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.28, ease: MORPH_EASE },
                },
                exit: () =>
                  navMorph.switching
                    ? { opacity: 0, transition: { duration: 0.12 } }
                    : {
                      opacity: 0,
                      y: 10,
                      scale: 0.985,
                      transition: { duration: 0.18, ease: MORPH_EASE },
                    },
              }}
              className='absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 pointer-events-auto'
            >
              <motion.div
                ref={frameRef}
                initial={
                  navMorph.switching && navMorph.fromHeight
                    ? { height: navMorph.fromHeight }
                    : false
                }
                animate={{
                  height: 'auto',
                  transition: { duration: 0.32, ease: MORPH_EASE },
                }}
                className='w-[92vw] max-w-[1020px] max-h-[82vh] overflow-y-auto overscroll-contain touch-pan-y border border-[#50C878]/30 rounded-[2rem] shadow-[0_35px_80px_rgba(0,0,0,0.55)] p-6 md:p-8 bg-[#123a1a]/95 backdrop-blur-2xl text-left relative'
                data-lenis-prevent='true'
              >
                {/* Invisible mouse hover bridge */}
                <div className='absolute inset-x-0 -top-8 h-10 bg-transparent' />

                <motion.div
                  className='grid grid-cols-12 gap-8 items-stretch'
                  initial={
                    navMorph.switching
                      ? { opacity: 0, x: navMorph.dir * 52 }
                      : false
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.3, ease: MORPH_EASE },
                  }}
                >
                  {/* Left side: Link Columns */}
                  <div
                    className={`${config.images ? 'col-span-12 lg:col-span-7' : 'col-span-12'} flex flex-col justify-between`}
                  >
                    <div
                      className={`grid gap-x-6 gap-y-4 ${config.columns.length === 3 ? 'grid-cols-3' : config.columns.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
                    >
                      {config.columns.map((col, colIndex) => (
                        // Keyed by place too: a long Cells menu has two "Quick Links" columns.
                        <div key={`${col.title}-${colIndex}`} className='flex flex-col'>
                          <div className='mb-3 flex items-center justify-between border-b border-white/15 pb-2'>
                            <span className='text-[10px] font-sans tracking-[0.2em] text-[#D4AF37] uppercase font-bold'>
                              {col.title}
                            </span>
                          </div>
                          <div className='flex flex-col gap-1.5'>
                            {col.entries.map((entry, entryIndex) => {
                              if (entry.kind === 'group') {
                                const heading = entry.link;
                                const isDuplicateHeader =
                                  heading.label.toLowerCase() ===
                                  col.title.toLowerCase();
                                return (
                                  <div
                                    key={entryIndex}
                                    className={`flex flex-col gap-1.5 ${isDuplicateHeader ? '' : 'mt-2'}`}
                                  >
                                    {!isDuplicateHeader &&
                                      (heading.href ? (
                                        <button
                                          onClick={() => {
                                            onMouseLeave();
                                            navigate(heading.href);
                                          }}
                                          className='text-left font-sans font-bold text-[11px] tracking-wider uppercase text-[#D4AF37] hover:text-[#50C878] transition-colors'
                                        >
                                          {heading.label}
                                        </button>
                                      ) : (
                                        <span className='text-left font-sans font-bold text-[11px] tracking-wider uppercase text-[#D4AF37]/80 select-none'>
                                          {heading.label}
                                        </span>
                                      ))}

                                    <div className='flex flex-col gap-1.5 pl-3 border-l border-white/10 ml-0.5'>
                                      {entry.children.map((child, childIndex) => (
                                        <button
                                          key={childIndex}
                                          onClick={() => {
                                            onMouseLeave();
                                            navigate(child.href);
                                          }}
                                          className='group/menu-item text-left flex flex-col gap-0.5 py-1 px-2.5 -mx-2.5 rounded-lg hover:bg-[#50C878]/15 border border-transparent hover:border-[#50C878]/30 transition-all duration-200 w-full cursor-pointer'
                                        >
                                          <span className='font-sans font-bold text-[12px] text-white/90 group-hover/menu-item:text-[#50C878] transition-colors flex items-center gap-1.5'>
                                            <span>{child.label}</span>
                                            <ArrowRight
                                              size={10}
                                              className='opacity-0 -translate-x-1 group-hover/menu-item:opacity-100 group-hover/menu-item:translate-x-0 transition-all duration-200 text-[#50C878]'
                                            />
                                          </span>
                                          {child.description && (
                                            <span className='font-sans text-[10.5px] text-white/60 group-hover/menu-item:text-white/85 transition-colors leading-tight font-medium'>
                                              {child.description}
                                            </span>
                                          )}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                              const { link } = entry;
                              return (
                                <button
                                  key={entryIndex}
                                  onClick={() => {
                                    onMouseLeave();
                                    if (link.href) navigate(link.href);
                                  }}
                                  className='group/menu-item text-left flex flex-col gap-0.5 py-1.5 px-3 -mx-3 rounded-xl hover:bg-[#50C878]/15 border border-transparent hover:border-[#50C878]/30 transition-all duration-200 w-full cursor-pointer'
                                >
                                  <span className='font-sans font-bold text-[13px] text-white group-hover/menu-item:text-[#50C878] transition-colors flex items-center gap-1.5'>
                                    <span>{link.label}</span>
                                    <ArrowRight
                                      size={11}
                                      className='opacity-0 -translate-x-1 group-hover/menu-item:opacity-100 group-hover/menu-item:translate-x-0 transition-all duration-200 text-[#50C878]'
                                    />
                                  </span>
                                  <span className='font-sans text-[11px] text-white/70 group-hover/menu-item:text-white/90 transition-colors leading-tight font-medium'>
                                    {link.description}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {config.accentText && (
                      <div className='pt-4 border-t border-white/15 flex items-center gap-2 text-white/60 font-sans text-xs font-semibold mt-4'>
                        <Sparkles size={13} className='text-[#D4AF37]' />
                        <span>{config.accentText}</span>
                      </div>
                    )}
                  </div>

                  {/* Right side: Image collage */}
                  {config.images && (
                    <div className='hidden lg:flex col-span-5 gap-3 h-[220px] items-stretch pl-4 border-l border-white/10'>
                      <div className='w-[90px] h-full rounded-[1.25rem] overflow-hidden shadow-sm relative group/item-img shrink-0 border border-white/10'>
                        <img
                          src={config.images.tall1.url}
                          alt={config.images.tall1.caption}
                          className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item-img:scale-105'
                          loading='lazy'
                          decoding='async'
                          referrerPolicy='no-referrer'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2'>
                          <span className='text-[9.5px] font-bold text-white leading-tight font-sans'>
                            {config.images.tall1.caption}
                          </span>
                        </div>
                      </div>

                      <div className='w-[90px] h-full rounded-[1.25rem] overflow-hidden shadow-sm relative group/item-img shrink-0 border border-white/10'>
                        <img
                          src={config.images.tall2.url}
                          alt={config.images.tall2.caption}
                          className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item-img:scale-105'
                          loading='lazy'
                          decoding='async'
                          referrerPolicy='no-referrer'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2'>
                          <span className='text-[9.5px] font-bold text-white leading-tight font-sans'>
                            {config.images.tall2.caption}
                          </span>
                        </div>
                      </div>

                      <div className='flex-1 h-full rounded-[1.25rem] overflow-hidden shadow-md relative group/item-img border border-white/10'>
                        <img
                          src={config.images.landscape.url}
                          alt={config.images.landscape.caption}
                          className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover/item-img:scale-105'
                          loading='lazy'
                          decoding='async'
                          referrerPolicy='no-referrer'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3'>
                          <span className='text-[8.5px] font-sans font-bold uppercase tracking-widest text-[#D4AF37] mb-0.5'>
                            {config.images.landscape.tag}
                          </span>
                          <h4 className='text-white text-[11px] font-bold leading-tight font-sans'>
                            {config.images.landscape.caption}
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

const CKP_WAVE = {
  span: 2.16, // half-span of the whole wave
  dip: 0.435, // depth of the valley floor
  floorA: 1.25, // valley floor starts here
  floorB: 1.05, // valley floor ends here
  peak: 0.46, // how far the crest lifts above the flat top
  f1: 0.55,
  f2: 0.42, // descent handles
  g1: 0.14,
  g2: 0.34, // rise handles
};
const CKP_MOBILE_BREAKPOINT = 1360;

/** Bar silhouette. */
/* The card's corner radius. NOT h/2 — that makes the bar a pill, which
   cannot line up with the strip's rounded-t-[26px] above it. */
const CKP_CARD_R = 26;

/* `strip`: whether the info strip is visible under the bar. The bottom
   corners are square only when it is, so the two meet as one card. */
function ckpBuildPath(
  w: number,
  h: number,
  t: number,
  wave: boolean,
  strip: boolean = true,
): string {
  const r = Math.min(CKP_CARD_R, h / 2);
  const b = t + h;
  const d: string[] = [];

  if (!wave) {
    d.push('M ' + r + ' ' + t, 'L ' + (w - r) + ' ' + t);
  } else {
    const cx = w / 2;
    const W = CKP_WAVE;
    // never eat more than 30% of the bar
    const S = Math.min(W.span, (w * 0.3) / h);
    const U = (u: number) => cx + u * h;
    const V = (v: number) => t + v * h;
    const D = W.dip;
    const P = W.peak;

    d.push('M ' + r + ' ' + t);
    d.push('L ' + U(-S) + ' ' + t);
    // long gentle descent, arriving flat on the valley floor
    d.push(
      'C ' +
      U(-S + W.f1) +
      ' ' +
      V(0) +
      ' ' +
      U(-W.floorA - W.f2) +
      ' ' +
      V(D) +
      ' ' +
      U(-W.floorA) +
      ' ' +
      V(D),
    );
    // flat valley floor
    d.push('L ' + U(-W.floorB) + ' ' + V(D));
    // short steep rise into the crest
    d.push(
      'C ' +
      U(-W.floorB + W.g1) +
      ' ' +
      V(D) +
      ' ' +
      U(-W.g2) +
      ' ' +
      V(-P * 0.55) +
      ' ' +
      U(0) +
      ' ' +
      V(-P),
    );
    // mirrored right half
    d.push(
      'C ' +
      U(W.g2) +
      ' ' +
      V(-P * 0.55) +
      ' ' +
      U(W.floorB - W.g1) +
      ' ' +
      V(D) +
      ' ' +
      U(W.floorB) +
      ' ' +
      V(D),
    );
    d.push('L ' + U(W.floorA) + ' ' + V(D));
    d.push(
      'C ' +
      U(W.floorA + W.f2) +
      ' ' +
      V(D) +
      ' ' +
      U(S - W.f1) +
      ' ' +
      V(0) +
      ' ' +
      U(S) +
      ' ' +
      t,
    );
    d.push('L ' + (w - r) + ' ' + t);
  }

  // Top corners always round. The BOTTOM corners are square when the
  // strip is there to meet it (`wave` is true exactly when the bar is
  // unscrolled on desktop, which is when the strip is visible), and
  // rounded when it is not — otherwise a square edge hangs in mid-air
  // once the strip collapses on scroll.
  d.push('L ' + (w - r) + ' ' + t);
  d.push('A ' + r + ' ' + r + ' 0 0 1 ' + w + ' ' + (t + r));
  if (wave && strip) {
    d.push('L ' + w + ' ' + b);
    d.push('L 0 ' + b);
  } else {
    d.push('L ' + w + ' ' + (b - r));
    d.push('A ' + r + ' ' + r + ' 0 0 1 ' + (w - r) + ' ' + b);
    d.push('L ' + r + ' ' + b);
    d.push('A ' + r + ' ' + r + ' 0 0 1 0 ' + (b - r));
  }
  d.push('L 0 ' + (t + r));
  d.push('A ' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + t);
  d.push('Z');
  return d.join(' ');
}

/** Paints the wave as a clip-path at the bar's real pixel width. */
function useCkpWave(navRef: React.RefObject<HTMLDivElement | null>) {
  const paint = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const bar = nav.querySelector('.ckp-bar') as HTMLElement | null;
    const glass = nav.querySelector('.ckp-bar__glass') as HTMLElement | null;
    const sheen = nav.querySelector('.ckp-bar__sheen') as HTMLElement | null;
    const echo = nav.querySelector('.ckp-bar__echo') as HTMLElement | null;
    const rim = nav.querySelector('.ckp-bar__rim') as SVGSVGElement | null;
    if (!bar || !glass) return;

    const cs = getComputedStyle(nav);
    const barH = parseFloat(cs.getPropertyValue('--ckp-bar-h')) || 88;
    const overhang = parseFloat(cs.getPropertyValue('--ckp-overhang')) || 0;
    const w = bar.clientWidth;
    if (!w) return;

    const wave = window.innerWidth > CKP_MOBILE_BREAKPOINT && overhang > 0;
    // square bottom only while the info strip is really showing beneath the
    // bar — inside pages have none, so the corners must round there
    const stripEl = nav
      .closest('nav')
      ?.querySelector('.ckp-strip-edge') as HTMLElement | null;
    const strip = !!stripEl && stripEl.getBoundingClientRect().height > 2;
    const innerPath = ckpBuildPath(w, barH, 0, wave, strip);
    glass.style.clipPath = `path("${innerPath}")`;
    (glass.style as any).webkitClipPath = `path("${innerPath}")`;
    if (sheen) {
      sheen.style.clipPath = `path("${innerPath}")`;
      (sheen.style as any).webkitClipPath = `path("${innerPath}")`;
    }
    // echo: same silhouette, shifted down, clipped inside the bar
    if (echo) {
      const eo = parseFloat(cs.getPropertyValue('--ckp-echo-offset')) || 0.38;
      echo.style.clipPath = `path("${innerPath}")`;
      (echo.style as any).webkitClipPath = `path("${innerPath}")`;
      const shifted = ckpBuildPath(w, barH, barH * eo, wave, strip);
      const el = echo.firstElementChild as HTMLElement | null;
      if (el) {
        el.style.clipPath = `path("${shifted}")`;
        (el.style as any).webkitClipPath = `path("${shifted}")`;
      }
    }
    if (rim) {
      const rimPath = ckpBuildPath(w, barH, overhang, wave, strip);
      rim.setAttribute('viewBox', '0 0 ' + w + ' ' + (barH + overhang));
      const path = rim.querySelector('path');
      if (path) path.setAttribute('d', rimPath);
    }
    nav.classList.toggle('is-waved', wave);
  }, [navRef]);

  useEffect(() => {
    paint();
    window.addEventListener('resize', paint);
    let ro: ResizeObserver | undefined;
    const bar = navRef.current?.querySelector('.ckp-bar');
    if (bar && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => paint());
      ro.observe(bar);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(paint).catch(() => { });
    }
    return () => {
      window.removeEventListener('resize', paint);
      ro?.disconnect();
    };
  }, [paint, navRef]);
}

function NavContent({
  menuOpen,
  setMenuOpen,
  setInitialCategory,
  isScrolled,
  activeMegaMenu,
  setActiveMegaMenu,
  subpage = false,
  menus,
  enquiryButton,
}: {
  menuOpen: boolean;
  setMenuOpen: any;
  setInitialCategory: (name: string | null) => void;
  isScrolled: boolean;
  activeMegaMenu: string | null;
  setActiveMegaMenu: (name: string | null) => void;
  subpage?: boolean;
  /** The menus with the committees and courses merged in. */
  menus: NavMenu[];
  /** The gold enquiry button: its words and the page it opens. */
  enquiryButton: NavMenusContent['enquiry'];
}) {
  // The enquiry buttons open the page set in the panel, keeping a preview link.
  const goToEnquiry = useNavigate();
  const ckpNavRef = useRef<HTMLDivElement | null>(null);

  /* Grace period between a trigger and its panel. Without it the menu
     closes the moment the pointer leaves the label, then reopens when
     it reaches the panel — which reads as a flicker. Any re-entry
     inside the window cancels the close. */
  const ckpMegaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ckpCancelClose = () => {
    if (ckpMegaTimer.current) {
      clearTimeout(ckpMegaTimer.current);
      ckpMegaTimer.current = null;
    }
  };
  const ckpScheduleClose = () => {
    ckpCancelClose();
    ckpMegaTimer.current = setTimeout(() => setActiveMegaMenu(null), 140);
  };
  useEffect(() => () => ckpCancelClose(), []);
  useCkpWave(ckpNavRef);
  const scrollToId = useSmoothScrollTo();
  const enquiry = useEnquiryContact();
  // Split menu around the centred brand: exactly 4 items on left and 4 on right
  const half = 4;
  const ipsrLeft = menus.slice(0, half),
    ipsrRight = menus.slice(half);

  return (
    <>
      {/* ── DESKTOP: logo-left / links-center / actions-right (Code 1 layout) ── */}
      <div
        ref={ckpNavRef}
        className={`ckp-nav hidden ${subpage ? '' : 'lg:block'} w-full relative z-30${isScrolled ? ' is-scrolled' : ''}`}
        style={{
          // IPSR: 58px (CET/CMC 64px) so the two-line institute name sits inside the
          // bar instead of over the strip below; everything scales from this value
          ['--ckp-bar-h' as any]: isScrolled ? '56px' : '62px',
          ['--ckp-overhang' as any]: isScrolled ? '0px' : '54px',
        }}
      >
        <div className='ckp-bar'>
          <div className='ckp-bar__glass' />
          <div className='ckp-bar__sheen' />
          <div className='ckp-bar__echo' aria-hidden='true'>
            <i />
          </div>
          <svg
            className='ckp-bar__rim'
            preserveAspectRatio='none'
            aria-hidden='true'
          >
            <defs>
              <linearGradient id='ckpRim' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0' stopColor='rgba(255,255,255,.78)' />
                <stop offset='.38' stopColor='rgba(255,255,255,.16)' />
                <stop offset='1' stopColor='rgba(255,255,255,.40)' />
              </linearGradient>
            </defs>
            <path d='' />
          </svg>

          <div className='ckp-bar__inner'>
            {/* left half of the menu */}
            <div className='ckp-menu ckp-menu--left'>
              {ipsrLeft.map((item) => (
                <NavItemDesktop
                  key={item.id}
                  item={item}
                  isActive={activeMegaMenu === item.id}
                  onMouseEnter={() => {
                    ckpCancelClose();
                    setActiveMegaMenu(item.id);
                  }}
                  onMouseLeave={ckpScheduleClose}
                  onToggle={() =>
                    setActiveMegaMenu(
                      activeMegaMenu === item.id ? null : item.id,
                    )
                  }
                />
              ))}
            </div>

            {/* centred brand, rising into the wave notch */}
            <button
              type='button'
              className='ckp-brand select-none cursor-pointer group/logo'
              onClick={() => scrollToId('home')}
            >
              <span className='ckp-brand__crest'>
                <CkpcmcLogo className='w-full h-full' showText={false} />
              </span>
              <span className='ckp-brand__name font-sans text-white'>
                C. K. PITHAWALLA
              </span>
              <span className='ckp-brand__sub font-sans text-[#D4AF37]'>
                Institute of Pharmaceutical
                <br />
                Science &amp; Research
              </span>
            </button>

            {/* right half of the menu + actions */}
            <div className='ckp-bar__side'>
              <div className='ckp-menu ckp-menu--right'>
                {ipsrRight.map((item) => (
                  <NavItemDesktop
                    key={item.id}
                    item={item}
                    isActive={activeMegaMenu === item.id}
                    onMouseEnter={() => {
                      ckpCancelClose();
                      setActiveMegaMenu(item.id);
                    }}
                    onMouseLeave={ckpScheduleClose}
                    onToggle={() =>
                      setActiveMegaMenu(
                        activeMegaMenu === item.id ? null : item.id,
                      )
                    }
                  />
                ))}
              </div>

              <div className='ckp-actions'>
                <button
                  onClick={() => goToEnquiry(withPreview(enquiryButton.href))}
                  className='group/btn flex items-center gap-1.5 px-2.5 lg:px-4 py-1.5 rounded-full text-[9px] lg:text-[9.5px] font-bold uppercase tracking-wider transition-all duration-300 bg-[#D4AF37] hover:bg-[#E5C158] text-[#123a1a] hover:shadow-[0_4px_18px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 shadow-md cursor-pointer whitespace-nowrap select-none'
                >
                  <span>{enquiryButton.label}</span>
                  <ArrowRight
                    size={10}
                    className='transition-transform duration-300 group-hover/btn:translate-x-0.5 stroke-[3]'
                  />
                </button>

                <button
                  onClick={() => {
                    setInitialCategory(null);
                    setMenuOpen(!menuOpen);
                  }}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  className='flex items-center justify-center p-2 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/18 border border-white/18 hover:border-white/30 text-white active:scale-95 cursor-pointer whitespace-nowrap select-none'
                >
                  <Menu size={16} className='shrink-0 stroke-[2.5]' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── INSIDE PAGES (desktop): white top band, menu strip, seal straddling both ── */}
      {subpage && (
        <div className='ckp-sph hidden lg:block w-full'>
          <div className='ckp-sph__top'>
            <div className='ckp-sph__tl'>
              <span className='ckp-sph__trust'>
                <span className='ckp-sph__dot' />
                NAVYUG VIDYABHAVAN TRUST
              </span>
              <span className='ckp-sph__sep'>|</span>
              <span className='ckp-sph__aff'>
                Affiliated to GTU | Approved by PCI & QCI
              </span>
            </div>
            <div className='ckp-sph__tr'>
              <span className='ckp-sph__enq'>
                Inquiries: <a href={enquiry.tel}>{enquiry.phone}</a>
              </span>
              <span className='ckp-sph__sep'>|</span>
              <a className='ckp-sph__mail' href={`mailto:${enquiry.email}`}>
                {enquiry.email}
              </a>
              <button
                type='button'
                onClick={() => goToEnquiry(withPreview(enquiryButton.href))}
                className='ckp-sph__apply'
              >
                <span className='uppercase'>{enquiryButton.label}</span>
                <ArrowRight size={11} className='stroke-[3]' />
              </button>
            </div>
          </div>
          <div className='ckp-sph__strip'>
            <div className='ckp-sph__L'>
              {ipsrLeft.map((item) => (
                <NavItemDesktop
                  key={item.id}
                  item={item}
                  isActive={activeMegaMenu === item.id}
                  onMouseEnter={() => {
                    ckpCancelClose();
                    setActiveMegaMenu(item.id);
                  }}
                  onMouseLeave={ckpScheduleClose}
                  onToggle={() =>
                    setActiveMegaMenu(
                      activeMegaMenu === item.id ? null : item.id,
                    )
                  }
                />
              ))}
            </div>
            <div aria-hidden='true' />
            <div className='ckp-sph__R'>
              {ipsrRight.map((item) => (
                <NavItemDesktop
                  key={item.id}
                  item={item}
                  isActive={activeMegaMenu === item.id}
                  onMouseEnter={() => {
                    ckpCancelClose();
                    setActiveMegaMenu(item.id);
                  }}
                  onMouseLeave={ckpScheduleClose}
                  onToggle={() =>
                    setActiveMegaMenu(
                      activeMegaMenu === item.id ? null : item.id,
                    )
                  }
                />
              ))}
              <span className='ckp-sph__sp' />
              <button
                type='button'
                onClick={() => {
                  setInitialCategory(null);
                  setMenuOpen(!menuOpen);
                }}
                className='ckp-sph__menu'
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <Menu size={16} className='shrink-0 stroke-[2.5]' />
              </button>
            </div>
            <button
              type='button'
              onClick={() => scrollToId('home')}
              className='ckp-sph__seal'
              aria-label='Home'
            >
              <CkpcmcLogo className='w-full h-full' showText={false} />
            </button>
          </div>
        </div>
      )}

      {/* ── MOBILE / TABLET header — the twisted ribbon, below lg (1024px) ── */}
      <div className={subpage ? 'contents' : 'lg:hidden w-full pt-1'}>
        <MobileIsland
          theme={{
            body1: '#1a4a25',
            body2: '#123a1a',
            edge: 'rgba(212,175,55,.28)',
            ring: '#D4AF37',
            cord: 'linear-gradient(#f5ecd0, #d4af37)',
            clasp: 'linear-gradient(#fbf6e6, #d4af37)',
            status: '#D4AF37',
            button: '#D4AF37',
            buttonIcon: '#123a1a',
            buttonGlow: 'rgba(212,175,55,.6)',
          }}
          title='C. K. PITHAWALLA'
          subtitle='Institute of Pharmaceutical Science & Research'
          logo={<CkpcmcLogo className='w-full h-full' showText={false} />}
          menuOpen={menuOpen}
          onMenu={() => {
            setInitialCategory(null);
            setMenuOpen(!menuOpen);
          }}
          compact={subpage}
          onLogo={() => scrollToId('home')}
        />
      </div>
    </>
  );
}

function getSlugGroup(slug: string): string {
  const s = slug.toLowerCase().trim();
  if (
    [
      'principal',
      'the-principal',
      'principal-message',
      'principals-message',
      'principal-s-message',
    ].includes(s)
  ) {
    return 'principal';
  }
  if (['founder', 'the-founder'].includes(s)) {
    return 'founder';
  }
  if (['trust', 'the-trust', 'about-trust'].includes(s)) {
    return 'trust';
  }
  if (['vision-mission', 'vision-and-mission'].includes(s)) {
    return 'vision-mission';
  }
  if (['po-peos', 'po-and-peos'].includes(s)) {
    return 'po-peos';
  }
  if (
    ['deans-faculty', 'deans-and-faculty', 'deans-and-faculty-in-charges'].includes(
      s,
    )
  ) {
    return 'deans-faculty';
  }
  if (['courses', 'course-syllabus', 'syllabus'].includes(s)) {
    return 'syllabus';
  }
  if (['timetables', 'timetable'].includes(s)) {
    return 'timetables';
  }
  if (['scholarships', 'scholorships'].includes(s)) {
    return 'scholarships';
  }
  if (['alumni', 'alumni-association'].includes(s)) {
    return 'alumni';
  }
  if (['student-help-desk', 'help-desk'].includes(s)) {
    return 'help-desk';
  }
  return s;
}

export function isPathMatching(
  currentPath: string,
  targetPath: string,
): boolean {
  if (!currentPath || !targetPath) return false;
  if (currentPath === targetPath) return true;

  const cleanCurrent = currentPath
    .split('?')[0]
    .split('#')[0]
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();
  const cleanTarget = targetPath
    .split('?')[0]
    .split('#')[0]
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();

  if (cleanCurrent === cleanTarget) return true;

  const currentSegments = cleanCurrent.split('/');
  const targetSegments = cleanTarget.split('/');

  const currentLast = currentSegments[currentSegments.length - 1];
  const targetLast = targetSegments[targetSegments.length - 1];

  if (
    currentLast &&
    targetLast &&
    getSlugGroup(currentLast) === getSlugGroup(targetLast) &&
    (currentSegments.length === 1 || targetSegments.length === 1 || currentSegments[0] === targetSegments[0])
  ) {
    return true;
  }

  // Only consider sub-path match if there is a strict slash delimiter boundary ('/')
  // to avoid 'courses-offered-b-pharm' falsely prefix-matching 'courses-offered'
  if (cleanTarget !== '' && cleanCurrent.startsWith(cleanTarget + '/')) {
    return true;
  }

  return false;
}

/** The menu whose pages the inside-page bar lists for this address. */
function getActiveCategory(pathname: string, menus: NavMenu[]): string {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!cleanPath) return 'about-us';

  const firstSegment = cleanPath.split('/')[0];

  if (firstSegment === 'about' || firstSegment === 'about-us')
    return 'about-us';
  if (firstSegment === 'academics' || firstSegment === 'courses')
    return 'academics';
  if (
    firstSegment === 'students' ||
    firstSegment === 'students-corner' ||
    firstSegment === 'student-corner'
  )
    return 'students-corner';
  if (firstSegment === 'cells' || firstSegment === 'committees') return 'cells';
  if (
    firstSegment === 'rni' ||
    firstSegment === 'research-and-innovation' ||
    firstSegment === 'research'
  )
    return 'research-and-innovation';
  if (firstSegment === 'iqac') return 'iqac';
  if (
    firstSegment === 'tnp' ||
    firstSegment === 'training-and-placement' ||
    firstSegment === 'placement' ||
    firstSegment === 'placements'
  )
    return 'training-and-placement';
  if (firstSegment === 'activities' || firstSegment === 'events')
    return 'activities';

  for (const menu of menus) {
    if (
      navPages(menu.links).some((page) => {
        const itemClean = page.href.replace(/^\/+|\/+$/g, '').toLowerCase();
        return isPathMatching(cleanPath, itemClean);
      })
    ) {
      return menu.id;
    }
  }

  if (menus.some((menu) => menu.id === firstSegment)) return firstSegment;
  return 'about-us';
}

// ─── Apple Liquid Glass Dock Track ──────────
const GlassDock = ({
  children,
  activeValue,
}: {
  children: React.ReactNode;
  activeValue?: string | boolean;
}) => {
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
      return {
        left: htmlEl.offsetLeft,
        width: htmlEl.offsetWidth,
        value: htmlEl.getAttribute('data-value') || '',
      };
    });
    tabsRef.current = tabs;

    let activeIdx = pills.findIndex(
      (el) => el.getAttribute('data-active') === 'true',
    );
    if (activeIdx === -1 && activeValue) {
      const activeStr = String(activeValue);
      activeIdx = tabs.findIndex(
        (t) => t.value === activeStr || isPathMatching(activeStr, t.value),
      );
    }
    if (activeIdx === -1) activeIdx = 0;
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
    const timer = setTimeout(measureAndSync, 40);
    const ro = new ResizeObserver(measureAndSync);
    if (flexRef.current) ro.observe(flexRef.current);
    window.addEventListener('resize', measureAndSync);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', measureAndSync);
    };
  }, [measureAndSync]);

  useEffect(() => {
    const container = shellRef.current;
    if (!container) return;

    const scrollToActive = () => {
      const activeBtn = container.querySelector(
        '[data-active="true"]',
      ) as HTMLElement;
      if (activeBtn && container.scrollWidth > container.clientWidth) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const scrollLeft =
          container.scrollLeft +
          (btnRect.left - containerRect.left) -
          container.clientWidth / 2 +
          btnRect.width / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth',
        });
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
        velocityXRef.current = (velocityXRef.current + springX) * 0.7;
        currentXRef.current += velocityXRef.current;

        const springW = (targetWRef.current - currentWRef.current) * 0.28;
        velocityWRef.current = (velocityWRef.current + springW) * 0.7;
        currentWRef.current += velocityWRef.current;
      } else {
        const dragSpringX = (targetXRef.current - currentXRef.current) * 0.55;
        velocityXRef.current = dragSpringX;
        currentXRef.current += dragSpringX;
      }

      const speed = Math.abs(velocityXRef.current);
      const targetStretch = isDraggingRef.current
        ? Math.min(speed * 0.014 + 0.06, 0.28)
        : Math.min(speed * 0.01, 0.2);
      fluidStretchRef.current +=
        (targetStretch - fluidStretchRef.current) * 0.16;

      const scaleX = 1 + fluidStretchRef.current;
      const scaleY = 1 - fluidStretchRef.current * 0.42;

      if (capsuleRef.current) {
        capsuleRef.current.style.width = `${currentWRef.current}px`;
        capsuleRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
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
    const maxX =
      tabs.length > 0
        ? tabs[tabs.length - 1].left +
        tabs[tabs.length - 1].width -
        currentWRef.current
        : 0;

    if (newX < 0) newX = newX * 0.22;
    if (newX > maxX) newX = maxX + (newX - maxX) * 0.22;

    targetXRef.current = newX;

    if (
      shellRef.current &&
      shellRef.current.scrollWidth > shellRef.current.clientWidth
    ) {
      const scrollLeft = shellRef.current.scrollLeft;
      const clientWidth = shellRef.current.clientWidth;
      const capsuleRight = newX + currentWRef.current;
      if (newX < scrollLeft + 20) {
        shellRef.current.scrollLeft = Math.max(0, newX - 20);
      } else if (capsuleRight > scrollLeft + clientWidth - 20) {
        shellRef.current.scrollLeft = Math.min(
          shellRef.current.scrollWidth - clientWidth,
          capsuleRight - clientWidth + 20,
        );
      }
    }
  };

  const releasePointer = (e?: any) => {
    if (!isDraggingRef.current) return;
    const wasDragging = didDragRef.current;
    if (e && e.currentTarget && e.pointerId !== undefined) {
      try {
        if (
          e.currentTarget.hasPointerCapture &&
          e.currentTarget.hasPointerCapture(e.pointerId)
        ) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (err) { }
    }
    isDraggingRef.current = false;

    const tabs = tabsRef.current;
    if (tabs.length && wasDragging) {
      const currentCenter = currentXRef.current + currentWRef.current / 2;
      let nearestIdx = 0,
        minDist = Infinity;
      tabs.forEach((tab, i) => {
        const dist = Math.abs(tab.left + tab.width / 2 - currentCenter);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = i;
        }
      });
      const w = tabs[nearestIdx].width * 1.1;
      const xOffset = (w - tabs[nearestIdx].width) / 2;
      targetXRef.current = tabs[nearestIdx].left - xOffset;
      targetWRef.current = w;

      didDragRef.current = false;
      const btn = flexRef.current?.querySelectorAll('[data-pill]')[
        nearestIdx
      ] as HTMLElement;
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
    if (didDragRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className='relative group/dock max-w-full w-full min-w-0'>
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
        <div className='pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,transparent_45%)] z-10' />
        <div className='pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_55%)] z-10' />

        <div
          ref={flexRef}
          className='relative flex items-center flex-nowrap gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 shrink-0 z-20 px-1 sm:px-2 m-auto min-w-max'
        >
          {children}

          <div
            ref={capsuleRef}
            className='absolute top-0 left-0 z-[15] pointer-events-none will-change-transform rounded-[999px] overflow-hidden'
            style={{
              height: '100%',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter:
                'blur(25px) saturate(250%) contrast(110%) brightness(115%) hue-rotate(5deg)',
              WebkitBackdropFilter:
                'blur(25px) saturate(250%) contrast(110%) brightness(115%) hue-rotate(5deg)',
              boxShadow: `
                0 8px 24px -4px rgba(0,0,0,0.4),
                0 0 20px rgba(255,255,255,0.2),
                inset 0 1px 1.5px rgba(255,255,255,0.8),
                inset 0 -1px 1.5px rgba(0,0,0,0.25)
              `,
            }}
          >
            <div
              className='absolute inset-0 rounded-[inherit] pointer-events-none z-10'
              style={{
                padding: '1.5px',
                background:
                  'linear-gradient(170deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 45%, transparent 70%)',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div
              className='absolute inset-0 rounded-[inherit] pointer-events-none z-10'
              style={{
                padding: '1.5px',
                background:
                  'linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.4) 60%, rgba(210,180,255,0.25) 82%, rgba(160,210,255,0.3) 100%)',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <div className='hidden md:block absolute bottom-[3px] left-3.5 md:left-3 lg:left-4 xl:left-5 right-3.5 md:right-3 lg:right-4 xl:right-5 h-[2.5px] rounded-full bg-[#50C878] shadow-[0_0_12px_rgba(80,200,120,1),0_0_4px_rgba(255,255,255,0.6)]' />
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
      type='button'
      data-pill
      data-value={value}
      data-active={isActive ? 'true' : 'false'}
      onClick={onClick}
      title={label}
      className={[
        'relative z-20 flex items-center gap-1 sm:gap-1.5',
        'px-2 sm:px-3 md:px-3.5 py-1.5 sm:py-2',
        'rounded-[999px]',
        'text-[9.5px] sm:text-[10px] md:text-[10.5px] font-bold uppercase tracking-wider',
        'transition-colors duration-200 cursor-pointer select-none shrink-0',
        'active:scale-95',
        isActive
          ? 'text-white font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]'
          : 'text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]',
      ].join(' ')}
    >
      {Icon && (
        <span
          className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-[#EFBF04] drop-shadow-[0_0_10px_rgba(239,191,4,0.8)]' : 'text-white/80'}`}
        >
          <Icon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
        </span>
      )}
      <span
        className={`relative z-10 whitespace-nowrap text-[9.5px] sm:text-[10px] md:text-[10.5px] ${isActive ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] font-bold' : 'font-medium'} ${Icon ? 'hidden md:inline' : 'inline'}`}
      >
        {label}
      </span>
    </button>
  );
}

interface NavProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onItemClick?: (id: string) => void;
  nav: NavMenusContent;
}

function BottomScrollNav({
  activeSection,
  setActiveSection,
  onItemClick,
  nav,
}: NavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubPage = location.pathname !== '/';
  const activeCategory = getActiveCategory(location.pathname, nav.menus);
  const menu = nav.menus.find((m) => m.id === activeCategory);
  let subPageItems = isSubPage && menu ? navPages(menu.links) : [];
  let dockGroup = 'top';

  // Academics: resource pages list their facility group; Courses Offered,
  // individual courses, Approvals, and Faculties are available together in the bottom dock.
  if (activeCategory === 'academics' && isSubPage && menu) {
    const isResourcePath = location.pathname.includes('resources');
    const resourceGroup = menu.links.find((l) =>
      l.children.some((c) => isPathMatching(location.pathname, c.href)),
    );

    if (isResourcePath && resourceGroup) {
      dockGroup = 'resources';
      subPageItems = navPages([resourceGroup]);
    } else {
      dockGroup = 'academic-courses';
      const coursesGroup = menu.links.find((l) => l.holdsCourses);
      const topLevelLinks = menu.links.filter((l) => !l.holdsCourses && l.href);
      const combined = [
        ...(coursesGroup ? [coursesGroup] : []),
        ...topLevelLinks.map((l) => ({ ...l, children: [] })),
      ];
      subPageItems = navPages(combined);
    }
  }

  return (
    <div className='flex items-center justify-center w-full max-w-full mx-auto'>
      <AnimatePresence mode='wait' initial={false}>
        {isSubPage ? (
          <motion.div
            key={`subpage-dock-${activeCategory}-${dockGroup}`}
            className='w-full max-w-full flex justify-center'
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1] },
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.97,
              transition: { duration: 0.16, ease: [0.7, 0, 0.84, 0] },
            }}
          >
            <GlassDock activeValue={location.pathname}>
              <button
                type='button'
                onClick={() => navigate('/')}
                className='flex items-center gap-1.5 px-2 sm:px-3 md:px-3.5 py-1.5 sm:py-2 rounded-[999px] text-[9.5px] sm:text-[10px] md:text-[10.5px] font-bold uppercase tracking-wider text-white hover:text-[#EFBF04] hover:bg-white/10 transition-all duration-200 cursor-pointer shrink-0 active:scale-95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'
                title='Back to Landing Page'
              >
                <HomeIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EFBF04] md:text-white' />
                <span className='hidden md:inline font-bold'>{nav.wording.dockHome}</span>
              </button>

              <span className='text-white/20 font-thin select-none shrink-0 text-sm px-0.5'>
                |
              </span>

              <LayoutGroup id='subpage-nav'>
                {subPageItems.map((item) => {
                  const isActive = isPathMatching(
                    location.pathname,
                    item.href,
                  );
                  const SubIcon = iconFor(item.icon, NAV_ICONS, Sparkles);
                  return (
                    <GlassPillBtn
                      key={item.href}
                      label={item.shortLabel}
                      value={item.href}
                      icon={SubIcon}
                      isActive={isActive}
                      layoutPrefix='subpage'
                      onClick={() => {
                        navigate(item.href);
                      }}
                    />
                  );
                })}
              </LayoutGroup>
            </GlassDock>
          </motion.div>
        ) : (
          <motion.div
            key='landing-dock'
            className='w-full max-w-full flex justify-center'
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.22, ease: [0.25, 1, 0.5, 1] },
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.97,
              transition: { duration: 0.16, ease: [0.7, 0, 0.84, 0] },
            }}
          >
            <GlassDock activeValue={activeSection}>
              <LayoutGroup id='landing-nav'>
                {nav.dock.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <GlassPillBtn
                      key={item.id}
                      label={item.label}
                      value={item.id}
                      icon={DOCK_ICONS[item.id]}
                      isActive={isActive}
                      layoutPrefix='landing'
                      onClick={() => {
                        if (onItemClick) onItemClick(item.id);
                        else setActiveSection(item.id);
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

export default function Navbar({
  isReady = true,
  onOpenAdmissions,
}: NavbarProps) {
  const scrollToId = useSmoothScrollTo();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isSubPage = location.pathname !== '/';
  // Navigation menus in the admin panel, with the committees and courses merged in.
  const nav = useSiteNav();
  const enquiry = useEnquiryContact();
  // The session is edited with the homepage Admissions band, so the year is typed once.
  const admissions = useAdmissionsContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(() => {
    if (isSubPage) return false;
    return typeof window !== 'undefined' ? window.scrollY <= 450 : true;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  // keeps the pinned header on top for the whole menu sweep-out
  const [ckpMenuLayer, setCkpMenuLayer] = useState(false);
  useEffect(() => {
    if (menuOpen) setCkpMenuLayer(true);
  }, [menuOpen]);
  // the breadcrumb's menu button (inside pages, phones) opens the menu
  useEffect(() => {
    const onToggle = () => setMenuOpen((v: boolean) => !v);
    window.addEventListener('ckp:menu-toggle', onToggle);
    return () => window.removeEventListener('ckp:menu-toggle', onToggle);
  }, []);
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
        setInitialCategory('about-us');
      }
      setMenuOpen(true);
    };

    const handleCloseMainMenu = () => {
      setMenuOpen(false);
      setInitialCategory(null);
    };

    const handleToggleMainMenu = () => {
      setInitialCategory(null);
      setMenuOpen((prev) => !prev);
    };

    window.addEventListener('openMainMenu', handleOpenMainMenu);
    window.addEventListener(
      'openMenuCategory',
      handleOpenMenuCategory as EventListener,
    );
    window.addEventListener('closeMainMenu', handleCloseMainMenu);
    window.addEventListener('toggleMainMenu', handleToggleMainMenu);

    return () => {
      window.removeEventListener('openMainMenu', handleOpenMainMenu);
      window.removeEventListener(
        'openMenuCategory',
        handleOpenMenuCategory as EventListener,
      );
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
      setActiveSection(NAV_DOCK_IDS[0]);
    }
  }, [location.pathname]);

  const [activeMegaMenu, setActiveMegaMenuRaw] = useState<string | null>(null);
  // Every open, close and switch goes through here: switch = morph + slide.
  const ckpMegaNow = useRef<string | null>(null);
  const setActiveMegaMenu = useCallback((name: string | null) => {
    const prev = ckpMegaNow.current;
    navMorph.switching = prev !== null && name !== null && prev !== name;
    if (navMorph.switching) {
      const order: readonly string[] = NAV_MENU_IDS;
      const a = order.indexOf(prev as string),
        b = order.indexOf(name as string);
      navMorph.dir = a === -1 || b === -1 ? 1 : b > a ? 1 : -1;
    }
    ckpMegaNow.current = name;
    setActiveMegaMenuRaw(name);
  }, []);
  // after a page change, hover can't reopen a menu while its exit plays
  const ckpNavGuard = useRef(0);
  useEffect(() => {
    ckpNavGuard.current = Date.now() + 500;
    setActiveMegaMenu(null);
  }, [location.pathname, setActiveMegaMenu]);
  const ckpGuardedSetMega = (name: string | null) => {
    if (name !== null && Date.now() < ckpNavGuard.current) return;
    setActiveMegaMenu(name);
  };
  const [timeStr, setTimeStr] = useState<string>('');
  // The id of the homepage part the dock marks as current.
  const [activeSection, setActiveSection] = useState<string>(NAV_DOCK_IDS[0]);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    typeof window !== 'undefined' && window.innerWidth < 1280,
  );

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
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
              top: rect.top + scrollTop - 80,
              behavior: 'smooth',
            });
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
    else if (path.startsWith('/courses/') || path.startsWith('/academics/'))
      setActiveSection('Courses Offered');
    else if (path.startsWith('/committees/')) setActiveSection('Committees');
    else if (path.startsWith('/iqac/'))
      setActiveSection('Accreditation & Ranking');
    else if (path.startsWith('/staff/')) setActiveSection('Staff');
    else if (path.startsWith('/campus-life/')) setActiveSection('Campus Life');
    else if (path.startsWith('/student-corner/'))
      setActiveSection('Student Corner');
    else if (path.startsWith('/activities/')) setActiveSection('Activities');
  }, [location.pathname]);

  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    isScrollingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    scrollToId(id);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1400);
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

  // Bottom navbar appears strictly after the shutter finishes opening on subpages
  const [shutterReady, setShutterReady] = useState(!isSubPage);
  useEffect(() => {
    if (!isSubPage) {
      setShutterReady(true);
      return;
    }
    setShutterReady(false);
    const handleShutterDone = () => setShutterReady(true);
    window.addEventListener('ckp:shutter-done', handleShutterDone);
    const fallbackTimer = setTimeout(() => setShutterReady(true), 650);

    return () => {
      window.removeEventListener('ckp:shutter-done', handleShutterDone);
      clearTimeout(fallbackTimer);
    };
  }, [isSubPage, location.pathname]);

  const lastScrollYRef = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );
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
    const HIDE_THRESHOLD = 150; // announcement bar collapse point
    const HERO_FALLBACK_THRESHOLD = 450; // used only if #home isn't found in DOM
    const FOOTER_REVEAL_FRACTION = 0.85; // footer counts as "reached" once its top enters viewport
    const HERO_EL_ID = 'home';
    const FOOTER_EL_ID = 'footer';

    const getClampedScrollY = () => {
      const raw = window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
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
        if (rect.top <= window.innerHeight * FOOTER_REVEAL_FRACTION)
          return 'footer';
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
        const targetItems = isSubPage
          ? bottomNavItems
          : NAV_DOCK_IDS.map((id) => ({ id }));
        const sections = targetItems
          .map((item) => ({
            name: item.id,
            el: document.getElementById(item.id),
          }))
          .filter((s) => s.el);
        if (sections.length > 0) {
          if (scrollYVal < 120) {
            setActiveSection(targetItems[0].id);
          } else {
            const isAtBottom =
              window.innerHeight + scrollYVal >=
              document.documentElement.scrollHeight - 60;
            if (isAtBottom) {
              setActiveSection(targetItems[targetItems.length - 1].id);
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
                    const distance = Math.min(
                      Math.abs(rect.top - targetY),
                      Math.abs(rect.bottom - targetY),
                    );
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
    window.addEventListener('orientationchange', handleResize, {
      passive: true,
    });

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
    const updateTime = () =>
      setTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* ── Mega-menu full-page backdrop blur (Code 1 behavior, closes on hover-out) ── */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div
            key='mega-menu-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='fixed inset-0 bg-black/45 backdrop-blur-md z-40 pointer-events-auto'
            onMouseEnter={() => setActiveMegaMenu(null)}
            onClick={() => setActiveMegaMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* ── TOP NAV — the wave on the homepage; the white band on inside pages ── */}
      <div className={isSubPage ? 'ckp-subnav w-full relative z-50' : 'contents'}>
        <motion.nav
          key='top-nav'
          initial={{ y: -130 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`${
            isSubPage
              ? 'relative mx-auto w-full z-50'
              : 'absolute left-1/2 -translate-x-1/2 w-[98%] max-w-[1720px] z-50 top-4 sm:top-5 lg:top-14 xl:top-16 min-[1361px]:top-[68px]'
          }${menuOpen ? ' pointer-events-none' : ''}`}
        >
          <div className='w-full rounded-[26px] sm:rounded-[32px] bg-transparent flex flex-col relative overflow-visible'>
            {/* Main nav row */}
            <div className='bg-transparent w-full relative z-50 overflow-visible'>
              <NavContent
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                setInitialCategory={setInitialCategory}
                isScrolled={false}
                subpage={isSubPage}
                menus={nav.menus}
                enquiryButton={nav.enquiry}
                activeMegaMenu={activeMegaMenu}
                setActiveMegaMenu={ckpGuardedSetMega}
              />
            </div>
            {/* Announcement bar (homepage) — below the bar, so the crest has headroom */}
            {!isSubPage && (
              <div
                className='bg-gradient-to-r from-[#0C1E03] via-[#163807] to-[#0C1E03] border-b-2 border-[#D4AF37] border-t border-[#D4AF37]/35 text-white/90 hidden xl:block relative z-10 w-full overflow-hidden transition-all duration-300 rounded-b-[26px] sm:rounded-b-[32px] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.6)] ckp-strip-edge min-h-[32px] py-1 px-4 sm:px-6 lg:px-8 xl:px-10 opacity-100'
              >
                {/* three columns, as on CET: the admissions chip sits on the strip's true
                  centre — directly under the logo — whatever the two sides contain */}
                <div className='w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-4 font-sans text-[10px] xl:text-[11px] font-bold text-white/95 leading-normal select-none relative whitespace-nowrap'>
                  <div className='flex items-center gap-x-3.5 min-w-0 overflow-hidden'>
                    <div className='flex items-center gap-1.5 font-bold text-white tracking-wide shrink-0'>
                      <span className='w-1.5 h-1.5 rounded-full bg-white animate-pulse' />
                      <span>NAVYUG VIDYABHAVAN TRUST</span>
                    </div>
                    <span className='text-white/20'>|</span>
                    <span className='text-white/80 font-medium min-w-0 truncate'>
                      Affiliated to GTU | Approved by PCI & QCI
                    </span>
                  </div>

                  {/* Shown only while admissions are open; otherwise an empty
                      middle cell keeps the bar's three columns in place. */}
                  {admissions.isOpen ? (
                    <button
                      onClick={onOpenAdmissions}
                      className='justify-self-center shrink-0 font-bold text-[10px] uppercase text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/30 px-2.5 py-0.5 rounded-full select-none tracking-wider cursor-pointer transition-all flex items-center gap-1'
                    >
                      <span className='w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse' />
                      <span>Admissions Open {admissions.session}</span>
                    </button>
                  ) : (
                    <span aria-hidden />
                  )}

                  <div className='justify-self-end flex items-center gap-x-3 xl:gap-x-3.5 min-w-0'>
                    <a
                      href={enquiry.tel}
                      className='flex items-center gap-1 hover:text-emerald-200 transition-colors text-white/90'
                    >
                      <Phone size={11} className='text-white' />
                      <span>Inquiries: {enquiry.phone}</span>
                    </a>
                    <span className='text-white/20'>|</span>
                    <a
                      href={`mailto:${enquiry.email}`}
                      className='flex items-center gap-1 hover:text-emerald-200 transition-colors text-white/90'
                    >
                      <Mail size={11} className='text-white' />
                      <span>{enquiry.email}</span>
                    </a>
                    <span className='text-white/20'>|</span>
                    <button
                      id='student-help-desk-btn'
                      onClick={() => navigate('/student-help-desk')}
                      className='inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#D4AF37] bg-black/35 hover:bg-[#D4AF37]/20 text-[#D4AF37] hover:text-[#FFE58F] text-[10px] xl:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer active:scale-95 group'
                      title={nav.fullScreen.helpDesk.label}
                    >
                      <Headset
                        size={12}
                        className='text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform'
                      />
                      <span>{nav.fullScreen.helpDesk.label}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.nav>
      </div>
      {/* ── BOTTOM FLOATING NAV — Appears strictly when reaching footer section ── */}
      <AnimatePresence>
        {showBottomNav && !isModalOpen && !isHelpDeskPage && !menuOpen && shutterReady && (
          <motion.nav
            key='bottom-nav'
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            // Lifted while previewing, so the preview line at the very bottom stays clear.
            className={`fixed ${previewToken() ? 'mb-12' : ''} bottom-3 sm:bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[95vw] sm:w-[92vw] md:w-[90vw] max-w-6xl flex justify-center items-center pointer-events-auto select-none px-1 sm:px-2`}
          >
            <div className='w-full max-w-full'>
              <BottomScrollNav
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onItemClick={handleItemClick}
                nav={nav}
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── OVERLAY MENU — enters with the curved sweep ── */}
      <AnimatePresence onExitComplete={() => setCkpMenuLayer(false)}>
        {menuOpen && (
          <CurvedSweep key='menu-sweep' color='#FFFFFF'>
            <OverlayMenu
              setMenuOpen={setMenuOpen}
              navigate={navigate}
              scrollToId={scrollToId}
              timeStr={timeStr}
              initialCategory={initialCategory}
              onClose={() => setInitialCategory(null)}
              nav={nav}
            />
          </CurvedSweep>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OVERLAY MENU — unchanged from Code 2
═══════════════════════════════════════════════════════════════ */
const PROSPECTUS_IMG =
  '/media/unsplash/photo-1576086213369-97a306d36557-779194.jpg';

function OverlayMenu({
  setMenuOpen,
  navigate,
  scrollToId,
  timeStr,
  initialCategory,
  onClose,
  nav,
}: {
  setMenuOpen: (v: boolean) => void;
  navigate: (path: string) => void;
  scrollToId: (id: string) => void;
  timeStr: string;
  /** The id of the menu to open at, from a page's Back or menu button. */
  initialCategory?: string | null;
  onClose?: () => void;
  nav: NavMenusContent;
}) {
  const { fullScreen, wording } = nav;
  const [stack, setStack] = useState<string[]>(() =>
    initialCategory ? [initialCategory] : [],
  );
  const [query, setQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const admissions = useAdmissionsContent();
  const [note, setNote] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  // stack[0] is a menu id, stack[1] the name of a heading opened inside it.
  const current = stack[stack.length - 1] ?? null;
  const openMenu = nav.menus.find((m) => m.id === stack[0]);

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

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768,
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
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
    if (q.length < 3) {
      setNote(q ? wording.keepTyping : '');
      return;
    }
    setNote(wording.searching);
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
  const goSub = (href: string) => {
    handleClose();
    if (href) navigate(href);
  };

  const panelLeftVariants: any = {
    hidden: {
      x: isMobile ? 0 : '-102%',
      y: isMobile ? '102%' : 0,
      opacity: isMobile ? 0 : 1,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        ease: isMobile ? 'easeInOut' : [0.25, 1, 0.5, 1],
        duration: isMobile ? 0.5 : 0.65,
        delay: isMobile ? 0.01 : 0.05,
      },
    },
    exit: {
      x: isMobile ? 0 : '-102%',
      y: isMobile ? '102%' : 0,
      opacity: isMobile ? 0 : 1,
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: isMobile ? 0.4 : 0.5,
        delay: 0.06,
      },
    },
  };
  const panelCtaVariants: any = {
    hidden: {
      x: isMobile ? 0 : '-102%',
      y: isMobile ? '102%' : 0,
      opacity: isMobile ? 0 : 1,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        ease: isMobile ? 'easeInOut' : [0.25, 1, 0.5, 1],
        duration: isMobile ? 0.5 : 0.65,
        delay: isMobile ? 0.04 : 0.12,
      },
    },
    exit: {
      x: isMobile ? 0 : '-102%',
      y: isMobile ? '102%' : 0,
      opacity: isMobile ? 0 : 1,
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: isMobile ? 0.4 : 0.5,
        delay: 0,
      },
    },
  };
  const panelRightVariants: any = {
    hidden: {
      x: isMobile ? 0 : '102%',
      y: isMobile ? '102%' : 0,
      opacity: isMobile ? 0 : 1,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        ease: isMobile ? 'easeInOut' : [0.25, 1, 0.5, 1],
        duration: isMobile ? 0.5 : 0.65,
        delay: isMobile ? 0.02 : 0.02,
      },
    },
    exit: {
      x: isMobile ? 0 : '102%',
      y: isMobile ? '102%' : 0,
      opacity: isMobile ? 0 : 1,
      transition: {
        ease: [0.7, 0, 0.84, 0],
        duration: isMobile ? 0.4 : 0.5,
        delay: 0.12,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: isMobile ? 0.12 : 0.22,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 22, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, damping: 20, stiffness: 170 },
    },
  };
  const sublistVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: 0.06 },
    },
  };
  const subitemVariants = {
    hidden: { x: 18, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring' as const, damping: 18, stiffness: 190 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }}
      exit={{
        opacity: 0,
        transition: { duration: 0.25, ease: 'easeIn', delay: 0.35 },
      }}
      className='fixed inset-0 z-[120] flex flex-col md:flex-row bg-[#081406] overflow-y-auto md:overflow-hidden pointer-events-auto'
      role='dialog'
      aria-modal='true'
      aria-label='Menu and search'
    >
      <div className='absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0' />

      <motion.button
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={handleClose}
        aria-label='Close menu'
        className='flex absolute top-4 right-4 md:top-6 md:right-6 z-[130] items-center gap-2 px-4 py-2.5 rounded-full bg-[#112815] text-white hover:bg-[#D4AF37] hover:text-[#112815] border border-[#D4AF37]/50 hover:border-transparent transition-all duration-300 active:scale-95 cursor-pointer group/close shadow-[0_4px_25px_rgba(0,0,0,0.3)] backdrop-blur-md'
      >
        <span className='font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 text-white group-hover/close:text-[#112815]'>
          {wording.close}
        </span>
        <X
          size={15}
          className='stroke-[3] transition-all duration-300 group-hover/close:rotate-90 text-[#D4AF37] group-hover/close:text-[#112815]'
        />
      </motion.button>

      <div className='order-2 md:order-1 hidden md:flex flex-col w-full md:w-2/5 relative z-10 h-full overflow-y-auto no-scrollbar'>
        <motion.section
          variants={panelLeftVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='relative bg-white text-[#112815] overflow-hidden md:h-1/2 md:min-h-0 md:border-b-[10px] border-[#112815] p-4 md:p-12 flex flex-col justify-center shrink-0'
        >
          <div
            aria-hidden
            className='absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#D4AF37]/25 pointer-events-none'
          />
          <div className='relative z-10 max-w-xl'>
            <label
              htmlFor='ckp-search'
              className='block font-sans font-bold text-xl md:text-3xl mb-2 md:mb-4'
            >
              {wording.search}
            </label>
            <div className='flex items-center border-b-[3px] border-[#112815]'>
              <input
                id='ckp-search'
                ref={searchRef}
                type='text'
                value={query}
                onChange={(e) => runAuto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submit();
                }}
                placeholder={wording.searchPlaceholder}
                autoComplete='off'
                className='flex-1 bg-transparent outline-none py-1.5 md:py-3 text-base md:text-xl placeholder:text-[#112815]/40'
              />
              <button
                onClick={submit}
                aria-label='Search'
                className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#112815] hover:text-[#C19A20] transition-colors cursor-pointer shrink-0'
              >
                <Search size={20} className='stroke-[2.5]' />
              </button>
            </div>
            <div className='mt-2 font-sans text-[10px] md:text-[11px] text-[#112815]/50 min-h-[16px]'>
              {note}
            </div>
            <div className='mt-3 md:mt-6'>
              <h4 className='font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#112815]/50 font-bold mb-2 md:mb-3'>
                {fullScreen.popularHeading}
              </h4>
              <div className='flex flex-wrap gap-x-3 md:gap-x-5 gap-y-1.5 md:gap-y-2'>
                {fullScreen.popularTerms.map((term) => (
                  <button
                    key={term.label}
                    onClick={() => {
                      // With an address set in the panel the term opens that
                      // page; without one it searches the site for its words.
                      if (term.href) {
                        handleClose();
                        navigate(withPreview(term.href));
                        return;
                      }
                      setQuery(term.label);
                      runAuto(term.label);
                      searchRef.current?.focus();
                    }}
                    className="relative font-sans font-semibold text-xs md:text-[15px] text-[#112815] cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-0.5 after:bg-[#C19A20] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {term.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={panelCtaVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='relative hidden md:flex bg-[#112815] text-white overflow-hidden md:h-1/2 md:min-h-0 p-4 sm:p-6 md:p-8 flex-col items-center justify-center shrink-0 text-center select-none'
        >
          {/* Background Image of students & campus with rich overlay */}
          <div className='absolute inset-0 z-0 overflow-hidden select-none pointer-events-none'>
            <img
              src={fullScreen.photo.image}
              alt={fullScreen.photo.alt}
              className='w-full h-full object-cover opacity-50 transition-all duration-700 hover:scale-105'
              loading='lazy'
              decoding='async'
              referrerPolicy='no-referrer'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#0D2104]/95 via-[#0D2104]/80 to-[#0D2104]/65' />
          </div>

          <div
            aria-hidden
            className='absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#D4AF37]/10 pointer-events-none'
          />

          <div className='relative z-10 flex-1 min-w-0 max-w-md flex flex-col items-center justify-center text-center gap-2 md:gap-3.5 my-auto'>
            <div className='space-y-1 lg:space-y-1.5 text-center'>
              {/* The first year of the session ("2026" of "2026-27"), shown only while admissions are open. */}
              {admissions.isOpen && (
                <span className='font-sans text-[8px] md:text-[9.5px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold block text-center'>
                  {admissions.session.split('-')[0]} Admissions open
                </span>
              )}
              <h3 className='font-sans text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight text-center'>
                {fullScreen.photo.heading}
              </h3>
              <p className='text-[10px] md:text-xs text-white/70 leading-relaxed font-medium text-center line-clamp-2 md:line-clamp-none max-w-sm'>
                {fullScreen.photo.text}
              </p>
            </div>
            <button
              onClick={() => {
                handleClose();
                navigate(withPreview(fullScreen.photo.buttonHref));
              }}
              className='bg-[#D4AF37] hover:bg-[#C19A20] text-[#112815] font-sans font-bold text-[10px] md:text-[11px] lg:text-[12px] tracking-wider uppercase py-2 px-5 md:py-2.5 md:px-6 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_10px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:scale-[1.02] mx-auto rounded-md'
            >
              {fullScreen.photo.buttonLabel} <ArrowRight size={13} className='stroke-[3] shrink-0' />
            </button>
          </div>
        </motion.section>
      </div>

      <motion.section
        variants={panelRightVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='order-1 md:order-2 relative flex-1 bg-white text-[#112815] overflow-hidden md:border-l-[10px] border-[#112815] min-h-[50vh] md:min-h-0'
      >
        <div
          aria-hidden
          className='absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/12 pointer-events-none'
        />
        <div className='relative z-10 h-full w-full overflow-hidden'>
          <AnimatePresence initial={false} mode='popLayout'>
            {current === null ? (
              <motion.nav
                key='root'
                variants={listVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='relative h-full w-full max-h-full min-h-[400px] md:absolute md:inset-0 overflow-y-auto overscroll-contain touch-pan-y no-scrollbar px-5 sm:px-8 md:px-12 pt-20 md:pt-24 pb-14'
                data-lenis-prevent='true'
              >
                <motion.div
                  variants={itemVariants}
                  className='flex items-center justify-between border-b-2 border-[#112815] pb-3 mb-4 min-h-[36px]'
                >
                  {showMobileSearch ? (
                    <div className='flex items-center w-full gap-2 text-[#112815]'>
                      <Search
                        size={14}
                        className='stroke-[2.5] text-[#112815]/60'
                      />
                      <input
                        type='text'
                        value={query}
                        onChange={(e) => runAuto(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') submit();
                        }}
                        placeholder={wording.phoneSearchPlaceholder}
                        className='flex-1 bg-transparent text-sm font-sans font-semibold outline-none text-[#112815] placeholder:text-[#112815]/40 py-0.5'
                        autoFocus
                      />
                      {query && (
                        <button
                          onClick={() => setQuery('')}
                          className='p-1 text-[#112815]/40 hover:text-[#112815] cursor-pointer'
                        >
                          <X size={14} className='stroke-[2.5]' />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setShowMobileSearch(false);
                          setQuery('');
                        }}
                        className='text-[#112815]/60 hover:text-[#112815] p-1 cursor-pointer'
                        aria-label='Close search'
                      >
                        <X size={15} className='stroke-[2.5]' />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className='font-sans text-[10px] tracking-[0.28em] uppercase text-[#112815]/45 font-bold'>
                        {wording.mainMenu}
                      </span>
                      <button
                        onClick={() => setShowMobileSearch(true)}
                        className='md:hidden text-[#112815]/60 hover:text-[#C19A20] transition-colors p-1 -mr-1 cursor-pointer'
                        aria-label='Search website'
                      >
                        <Search size={15} className='stroke-[2.5]' />
                      </button>
                    </>
                  )}
                </motion.div>
                {nav.menus.map((item, i) => {
                  return (
                    <motion.button
                      variants={itemVariants}
                      key={item.id}
                      onClick={() => setStack([item.id])}
                      className='group/row w-full flex items-center justify-between gap-4 py-4 border-b border-[#112815]/12 text-left cursor-pointer'
                    >
                      <span className='flex items-center gap-4'>
                        <span className='font-sans text-[10px] font-bold text-[#C19A20] bg-[#D4AF37]/12 rounded px-2 py-0.5'>
                          0{i + 1}
                        </span>
                        <span className="relative font-sans font-semibold text-[22px] md:text-[26px] uppercase tracking-tight after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-[#C19A20] after:origin-left after:scale-x-0 group-hover/row:after:scale-x-100 after:transition-transform after:duration-300 group-hover/row:text-[#C19A20] transition-colors">
                          {item.label}
                        </span>
                      </span>
                      <span className='w-9 h-9 shrink-0 rounded-full bg-[#112815] text-white flex items-center justify-center transition-all duration-300 group-hover/row:bg-[#D4AF37] group-hover/row:text-[#112815] group-hover/row:translate-x-1'>
                        <ArrowRight size={16} className='stroke-[2.5]' />
                      </span>
                    </motion.button>
                  );
                })}
                <motion.button
                  variants={itemVariants}
                  onClick={() => {
                    handleClose();
                    scrollToId('admissions');
                  }}
                  className='group/row w-full flex items-center justify-between gap-4 py-4 border-b border-[#112815]/12 text-left cursor-pointer'
                >
                  <span className='font-sans font-semibold text-[22px] md:text-[26px] uppercase tracking-tight group-hover/row:text-[#C19A20] transition-colors'>
                    Contact &amp; Apply
                  </span>
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={() => {
                    handleClose();
                    navigate('/student-help-desk');
                  }}
                  className='group/row w-full flex items-center justify-between gap-4 py-4 border-b border-[#112815]/12 text-left cursor-pointer'
                >
                  <span className='flex items-center gap-3'>
                    <span className='w-8 h-8 rounded-full bg-[#112815] text-[#D4AF37] flex items-center justify-center'>
                      <Headset size={16} />
                    </span>
                    <span className='font-sans font-semibold text-[20px] md:text-[22px] uppercase tracking-tight text-[#112815] group-hover/row:text-[#C19A20] transition-colors'>
                      {fullScreen.helpDesk.label}
                    </span>
                  </span>
                  <span className='text-[10px] font-sans font-bold uppercase tracking-wider text-[#C19A20] border border-[#C19A20]/40 px-2.5 py-0.5 rounded-full'>
                    {fullScreen.helpDesk.badge}
                  </span>
                </motion.button>
              </motion.nav>
            ) : (
              <motion.div
                key='sub'
                variants={sublistVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='relative h-full w-full max-h-full min-h-[400px] md:absolute md:inset-0 overflow-y-auto overscroll-contain touch-pan-y px-5 sm:px-8 md:px-10 lg:px-14 pt-20 md:pt-24 pb-16 flex flex-col pointer-events-auto'
                data-lenis-prevent='true'
              >
                <motion.button
                  variants={subitemVariants}
                  onClick={() => setStack((s) => s.slice(0, -1))}
                  className='group/back flex items-center gap-3 mb-5 cursor-pointer'
                >
                  <span className='w-9 h-9 rounded-full bg-[#112815] text-white flex items-center justify-center transition-all duration-300 group-hover/back:bg-[#D4AF37] group-hover/back:text-[#112815] group-hover/back:-translate-x-1'>
                    <ArrowRight size={16} className='stroke-[2.5] rotate-180' />
                  </span>
                  <span className='font-sans font-bold text-[15px]'>{wording.back}</span>
                </motion.button>
                <motion.div
                  variants={subitemVariants}
                  className='font-sans font-bold text-[26px] md:text-[30px] uppercase tracking-tight border-b-2 border-[#112815] pb-3 mb-3 text-[#112815]'
                >
                  {stack.length === 1 ? (openMenu?.label ?? stack[0]) : stack[stack.length - 1]}
                </motion.div>
                {(() => {
                  if (!openMenu) return null;

                  if (stack.length === 1) {
                    return openMenu.links.map((link, linkIndex) => {
                      const label = overlayName(link);
                      const isParent = link.children.length > 0;
                      return (
                        <motion.button
                          variants={subitemVariants}
                          key={linkIndex}
                          onClick={() => {
                            if (isParent) {
                              setStack([...stack, label]);
                            } else {
                              goSub(link.href);
                            }
                          }}
                          className='group/sub w-full flex items-center gap-3 py-3.5 border-b border-[#112815]/10 text-left cursor-pointer hover:bg-[#50C878]/10 rounded-xl px-2 transition-colors'
                        >
                          <span className='flex flex-col'>
                            <span className='font-sans font-bold text-[16px] group-hover/sub:text-[#50C878] transition-colors leading-tight flex items-center gap-2'>
                              <span className='w-2 h-2 rounded-full bg-[#50C878] shrink-0' />
                              {label}
                            </span>
                            {link.description && (
                              <span className='font-sans text-[11px] text-[#112815]/60 mt-0.5 leading-snug pl-4'>
                                {link.description}
                              </span>
                            )}
                          </span>
                          {isParent ? (
                            <ChevronDown
                              size={14}
                              className='ml-auto text-[#50C878] -rotate-90 stroke-[2.5]'
                            />
                          ) : (
                            <ArrowRight
                              size={13}
                              className='ml-auto text-[#50C878] opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all shrink-0'
                            />
                          )}
                        </motion.button>
                      );
                    });
                  } else {
                    const parentItem = openMenu.links.find(
                      (l) => overlayName(l) === stack[1],
                    );
                    const childrenToRender = parentItem?.children || [];
                    return childrenToRender.map((child, childIndex) => {
                      return (
                        <motion.button
                          variants={subitemVariants}
                          key={childIndex}
                          onClick={() => goSub(child.href)}
                          className='group/sub w-full flex items-center gap-3 py-3.5 border-b border-[#112815]/10 text-left cursor-pointer hover:bg-[#50C878]/10 rounded-xl px-2 transition-colors'
                        >
                          <span className='flex flex-col'>
                            <span className='font-sans font-bold text-[16px] group-hover/sub:text-[#50C878] transition-colors leading-tight flex items-center gap-2'>
                              <span className='w-2 h-2 rounded-full bg-[#50C878] shrink-0' />
                              {overlayName(child)}
                            </span>
                            {child.description && (
                              <span className='font-sans text-[11px] text-[#112815]/60 mt-0.5 leading-snug pl-4'>
                                {child.description}
                              </span>
                            )}
                          </span>
                          <ArrowRight
                            size={13}
                            className='ml-auto text-[#50C878] opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all shrink-0'
                          />
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
