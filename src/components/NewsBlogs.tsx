import React, { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { useLenis } from "../context/LenisContext";
import { useActivityEvents } from "../hooks/useActivityEvents";
import { DEFAULT_GAZETTE, onBoard, useGazetteContent, type GazetteItemContent, type GazetteLabels } from "../hooks/useGazetteContent";
import { useModalScrollLock } from "../hooks/useModalScrollLock";
import { RichText, plainText } from "../utils/RichText";
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import {
  X, Calendar, Clock, Share2, Check, ArrowUpRight, Search,
  MapPin, User, AlertCircle, Newspaper, ChevronLeft, ChevronRight
} from 'lucide-react';

/**
 * A formatted paragraph without its first letter, for the drop cap. The cap
 * itself is plainText(text).charAt(0); this takes the same letter out of the
 * markup, stepping over any tags or **bold** in front of it.
 */
function withoutFirstLetter(text: string): string {
  let at = 0;
  for (;;) {
    const rest = text.slice(at);
    const tag = rest.match(/^<[^>]*>/);
    if (tag) {
      at += tag[0].length;
      continue;
    }
    if (/^\*\*(.+?)\*\*/.test(rest)) {
      at += 2;
      continue;
    }
    break;
  }
  const entity = text.slice(at).match(/^&(?:amp|lt|gt|quot|#39|nbsp);/);
  const head = text.slice(0, at);
  const rest = text.slice(at + (entity ? entity[0].length : 1));
  // A one-letter **A** leaves an empty pair behind, which would show as stars.
  if (head.endsWith('**') && rest.startsWith('**')) return head.slice(0, -2) + rest.slice(2);
  return head + rest;
}

/** A line's marker ("## ", "- ") taken off, even when formatting starts before it. */
const withoutMarker = (text: string, marker: string) => {
  const lead = text.match(/^(?:<[^>]*>)*/)?.[0] ?? '';
  return text.slice(lead.length).startsWith(marker) ? lead + text.slice(lead.length + marker.length) : text;
};

interface NewsItem {
  id: string;
  type: 'news';
  title: string;
  date: string;
  image: string;
  imageAlt?: string;
  excerpt: string;
  content: string;
  categoryTag: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  /** The id of the board tab it is filed under. */
  bulletinCategory: string;
}

interface EventItem {
  id: string;
  type: 'event';
  title: string;
  date: string;
  image: string;
  imageAlt?: string;
  excerpt: string;
  content: string;
  categoryTag: string;
  location: string;
  speaker: string;
  /** The id of the board tab it is filed under. */
  bulletinCategory: string;
}

interface NoticeItem {
  id: string;
  type: 'notice';
  title: string;
  description: string;
  month?: string;
  day?: string;
  content: string;
  typeTag: string;
  critical: boolean;
  code: string;
  date: string;
  /** The notice's own banner picture. Without one it opens with no banner. */
  banner?: string;
  imageAlt?: string;
  /** The id of the board tab it is filed under. */
  bulletinCategory: string;
}

type ArticleUnion = NewsItem | EventItem | NoticeItem;

/**
 * An item from the admin panel, in the shape this board was built around.
 * The panel keeps only what the board shows, so the rest stays blank.
 */
function toArticle(item: GazetteItemContent, index: number): ArticleUnion {
  const id = `gazette-${index}`;
  const bulletinCategory = item.tab;
  if (item.kind === 'notice') {
    return { id, type: 'notice', title: item.title, description: item.summary, content: item.content, typeTag: item.tag, critical: item.critical ?? false, code: item.code, date: item.date, banner: item.image ?? '', imageAlt: item.imageAlt, bulletinCategory };
  }
  if (item.kind === 'event') {
    return { id, type: 'event', title: item.title, date: item.date, image: item.image ?? '', imageAlt: item.imageAlt, excerpt: item.summary, content: item.content, categoryTag: item.tag, location: item.venue ?? '', speaker: item.speaker ?? '', bulletinCategory };
  }
  return { id, type: 'news', title: item.title, date: item.date, image: item.image ?? '', imageAlt: item.imageAlt, excerpt: item.summary, content: item.content, categoryTag: item.tag, readTime: '', author: { name: '', role: '', avatar: '' }, bulletinCategory };
}


export default function NewsBlogs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          yPercent: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (headerRef.current) {
        gsap.to(headerRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  const [selectedItem, setSelectedItem] = useState<ArticleUnion | null>(null);
  useModalScrollLock(selectedItem !== null);

  useEffect(() => {
    const handleClose = () => setSelectedItem(null);
    window.addEventListener('closeAllModals', handleClose);
    return () => window.removeEventListener('closeAllModals', handleClose);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [chosenTab, setChosenTab] = useState<string>('');

  const listContainerRef = useRef<HTMLDivElement>(null);
  // The tab row stays on one line. When the tabs are wider than the row it
  // scrolls sideways, and arrows show which way there is more.
  const tabRowRef = useRef<HTMLDivElement>(null);
  const [tabEdges, setTabEdges] = useState({ left: false, right: false });
  const measureTabs = () => {
    const el = tabRowRef.current;
    if (!el) return;
    setTabEdges({ left: el.scrollLeft > 2, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
  };
  const scrollTabs = (dir: -1 | 1) => tabRowRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });

  // Whether the tab's items overflow the fixed-height box. Only then do they
  // loop and scroll on their own; a short tab shows each item once.
  const [loops, setLoops] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Events an editor put on the board, from Activities → Events. Every one is
  // shown at the top of its tab, above the tab's own items.
  const activityEvents = useActivityEvents();
  // Edited under Homepage, Gazette board in the admin panel.
  const gazette = useGazetteContent();
  // Re-measured when the tabs change and when the window is resized.
  useEffect(() => {
    measureTabs();
    window.addEventListener('resize', measureTabs);
    return () => window.removeEventListener('resize', measureTabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gazette.tabs]);
  // The open tab: the one picked, or the first when none is, or when the one
  // picked is not among the tabs that arrived from the panel.
  const bulletinTab = gazette.tabs.some((t) => t.id === chosenTab) ? chosenTab : gazette.tabs[0]?.id ?? '';
  // The board's fixed wording, each falling back to what it said before it could be edited.
  const label = (key: keyof GazetteLabels) => gazette[key] || DEFAULT_GAZETTE[key];
  // Only items filed under a tab and switched on reach the board.
  const ARCHIVE_REGISTRY = useMemo(
    () => gazette.items.map((item, index) => (onBoard(item) ? toArticle(item, index) : null)).filter((a): a is ArticleUnion => a !== null),
    [gazette.items],
  );
  const registry = useMemo(() => {
    const picked = activityEvents.gazette?.[bulletinTab] ?? [];
    if (picked.length === 0) return ARCHIVE_REGISTRY;

    const fromEvents: ArticleUnion[] = picked.map((entry) => ({
      id: entry.id,
      type: 'event',
      title: entry.title,
      date: entry.date,
      image: '',
      excerpt: entry.excerpt,
      content: entry.content,
      categoryTag: entry.categoryTag,
      location: entry.location,
      speaker: '',
      bulletinCategory: bulletinTab,
    }));
    const standing = ARCHIVE_REGISTRY.filter((item) => item.bulletinCategory === bulletinTab);
    const others = ARCHIVE_REGISTRY.filter((item) => item.bulletinCategory !== bulletinTab);
    return [...others, ...fromEvents, ...standing];
  }, [activityEvents.gazette, bulletinTab, ARCHIVE_REGISTRY]);

  // Filter items based on active tab and search query
  const filteredItems = useMemo(() => {
    return registry.filter((item) => {
      // Check active bulletin category
      if (item.bulletinCategory !== bulletinTab) return false;

      // If no query, return true
      if (searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase();
      const titleMatches = item.title.toLowerCase().includes(query);
      const descMatches = plainText(item.type === 'notice' ? item.description : item.excerpt).toLowerCase().includes(query);
      const categoryMatches = (item.type === 'notice' ? item.typeTag : item.categoryTag).toLowerCase().includes(query);

      return titleMatches || descMatches || categoryMatches;
    });
  }, [registry, bulletinTab, searchQuery]);

  const displayItems = useMemo(() => {
    if (filteredItems.length === 0) return [];
    // Repeated 4 times for a seamless loop, but only when one set is taller
    // than the box; otherwise a tab with one item would show it four times.
    return loops ? [...filteredItems, ...filteredItems, ...filteredItems, ...filteredItems] : filteredItems;
  }, [filteredItems, loops]);

  // Measured with a single set on screen, before the browser paints.
  useLayoutEffect(() => {
    setLoops(false);
  }, [filteredItems]);
  useLayoutEffect(() => {
    const el = listContainerRef.current;
    if (!el || loops) return;
    setLoops(el.scrollHeight > el.clientHeight + 1);
  }, [filteredItems, loops]);

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container || filteredItems.length === 0 || !loops) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 32; // pixels per second smooth continuous auto-scroll

    const animateScroll = (time: number) => {
      if (!isHovered && listContainerRef.current) {
        const rawDelta = (time - lastTime) / 1000;
        const delta = Math.min(Math.max(rawDelta, 0), 0.1);
        const el = listContainerRef.current;

        const singleSetHeight = el.scrollHeight / 4;
        el.scrollTop += speed * delta;

        // Seamless loop rollover without visual jump or glitch
        if (el.scrollTop >= singleSetHeight * 2) {
          el.scrollTop -= singleSetHeight;
        }
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, filteredItems, loops]); // depend on items to reset height when tab changes

  const handleShare = (item: ArticleUnion, e: React.MouseEvent) => {
    e.stopPropagation();
    const mockUrl = `${window.location.origin}#view-${item.id}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(mockUrl).catch(() => { });
    }
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to parse dates like "2026-06-18" to a nice 3-letter month
  const getMonthLabel = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const monthNum = parseInt(parts[1], 10);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        if (monthNum >= 1 && monthNum <= 12) {
          return months[monthNum - 1];
        }
      }
    } catch (e) { }
    return 'JUN';
  };

  // Helper to get raw day string "18"
  const getDayLabel = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return parts[2];
      }
    } catch (e) { }
    return '18';
  };

  return (
    <section
      ref={containerRef}
      id="university-gazette"
      className="py-16 sm:py-20 bg-[#FAF8F5] text-[#3B3131] font-sans antialiased border-t border-slate-200/60 relative overflow-hidden"
    >
      {/* Editorial Watermark Background */}
      <div
        ref={bgTextRef}
        className="absolute right-0 top-32 text-[14rem] font-bold text-slate-100/10 leading-none select-none pointer-events-none font-sans tracking-tighter uppercase hidden xl:block"
      >
        {label('watermark')}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Title Block - Perfectly Centered & Compact */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center text-center pb-6 border-b border-slate-200/60 mb-10 w-full"
        >
          <div className="flex items-center gap-1.5 select-none mb-2">
            <span className="font-mono text-[9px] tracking-wider text-[#3B3131] font-bold uppercase">
              ✦ {label('kicker')}
            </span>
            <span className="h-[1px] w-6 bg-[#3B3131]/20" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#3B3131] leading-tight uppercase font-sans">
            {gazette.headingLead}{gazette.headingAccent && <> <span className="text-[#123a1a]">{gazette.headingAccent}</span></>}
          </h2>
          <p className="font-sans text-slate-500 font-medium text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
            <RichText text={gazette.intro} />
          </p>
        </div>

        {/* MODERN MINIMALIST NAV DECK - SYMMETRIC, MOOD FIRST, AND COMPACT */}
        <div className="flex flex-col items-center justify-center gap-6 mb-8 select-none w-full text-center">
          <div className="relative max-w-6xl w-full border-b border-slate-200/50">
          {/* "safe center": centred while the tabs fit, starting at the first
              tab once they do not, so no tab is ever cut off at the start. */}
          <div
            ref={tabRowRef}
            onScroll={measureTabs}
            className="flex items-center justify-start md:[justify-content:safe_center] gap-3 sm:gap-6 md:gap-7 lg:gap-9 pb-3 w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 sm:px-4"
          >
            {gazette.tabs.map((tab) => {
              const isActive = bulletinTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setChosenTab(tab.id);
                  }}
                  className="relative py-2 px-1 sm:px-2 text-[11px] sm:text-xs md:text-sm font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span className={isActive ? 'text-[#1e293b] font-bold' : 'text-slate-500 hover:text-slate-800'}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2563eb]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {tabEdges.left && (
            <button
              type="button"
              aria-label="Earlier tabs"
              onClick={() => scrollTabs(-1)}
              className="absolute left-0 top-0 bottom-3 flex items-center pl-1 pr-6 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent text-slate-500 hover:text-slate-800"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {tabEdges.right && (
            <button
              type="button"
              aria-label="More tabs"
              onClick={() => scrollTabs(1)}
              className="absolute right-0 top-0 bottom-3 flex items-center pr-1 pl-6 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent text-slate-500 hover:text-slate-800"
            >
              <ChevronRight size={18} />
            </button>
          )}
          </div>

          {/* Search Bar - matching exact design in uploaded image */}
          <div className="w-full max-w-xl px-2">
            <div className="relative flex items-center">
              <Search
                size={17}
                className="absolute left-4 text-slate-400 pointer-events-none stroke-[1.75]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={gazette.searchPlaceholder}
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* DYNAMIC PRESENTATION INTERFACES - CENTERED NEWS BULLETINS CONTAINER */}
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-between">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center bg-white border border-slate-100 rounded-3xl shadow-xs px-4">
              <Newspaper className="mx-auto text-slate-300 mb-4 animate-bounce" size={40} />
              <p className="font-sans text-[#3B3131] text-xs font-bold uppercase tracking-widest">
                {searchQuery ? `${label('noResultsHeading')} "${searchQuery}"` : label('emptyHeading')}
              </p>
              <p className="font-sans text-slate-400 text-[11px] mt-1">
                {searchQuery ? label('noResultsMessage') : label('emptyMessage')}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={13} />
                  <span>{label('clearSearchLabel')}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">

              {/* Discrete Feed Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 select-none">
                <span className="font-mono text-[9px] text-[#3B3131] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#123a1a]" />
                  {label('feedHeading')} [{filteredItems.length}]
                </span>
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                  {label('feedOrderLabel')}
                </span>
              </div>

              {/* Minimal List Stack inside Elevator Container */}
              <div
                data-lenis-prevent="true"
                className="relative h-[380px] overflow-y-auto no-scrollbar pr-2 space-y-3"
                ref={listContainerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
              >
                {displayItems.map((item, index) => {
                  const originalIndex = (index % filteredItems.length) + 1;
                  const itemIndex = String(originalIndex).padStart(2, '0');

                  return (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10px" }}
                      onClick={() => setSelectedItem(item)}
                      className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-3.5 sm:px-8 bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-slate-200/80 rounded-2xl transition-all duration-300 cursor-pointer text-left overflow-hidden shadow-xs hover:shadow-sm mx-1 mt-1"
                    >
                      {/* Interactive visual line on left margin */}
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#123a1a] scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-300" />

                      <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                        {/* Elite minimalist serial indicator */}
                        <span className="hidden sm:inline font-mono text-[10px] font-bold text-slate-300 group-hover:text-[#3B3131]/65 transition-colors">
                          {itemIndex}
                        </span>

                        {/* High-end design focused date display */}
                        <div className="flex flex-col text-left shrink-0 select-none min-w-[75px] pt-0.5 sm:pt-0">
                          <span className="font-mono text-[9.5px] uppercase font-bold text-[#3B3131] tracking-wider">
                            {getMonthLabel(item.date)}
                          </span>
                          <span className="font-sans text-base font-bold text-[#3B3131] leading-none mt-0.5">
                            {getDayLabel(item.date)}
                          </span>
                          <span className="font-mono text-[9px] text-slate-400 leading-none mt-1">
                            {item.date.split('-')[0]}
                          </span>
                        </div>

                        {/* Premium custom vertical border divide */}
                        <div className="h-10 w-[1.5px] bg-slate-100 shrink-0 hidden sm:block" />

                        {/* Title and Excerpt Core content */}
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 select-none">
                            <span className={`inline-block font-mono text-[7.5px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border ${item.type === 'notice' && item.critical
                              ? 'bg-rose-50 text-rose-600 border-rose-100/60 animate-pulse'
                              : 'bg-slate-50 text-slate-500 border-slate-200/40'
                              }`}>
                              {item.type === 'notice' ? item.typeTag : (item as any).categoryTag || 'news'}
                            </span>
                            {item.type === 'notice' && (
                              <span className="font-mono text-[8px] text-slate-400 font-medium tracking-wider">
                                {item.code}
                              </span>
                            )}
                          </div>

                          <h4 className="font-sans text-[13px] sm:text-[14.5px] font-bold text-[#3B3131] leading-snug tracking-tight group-hover:text-[#123a1a] transition-colors uppercase line-clamp-1">
                            {item.title}
                          </h4>

                          <p className="font-sans text-[11px] sm:text-[11.5px] text-slate-400 font-medium leading-relaxed line-clamp-1">
                            <RichText text={item.type === 'notice' ? item.description : (item as any).excerpt} />
                          </p>
                        </div>
                      </div>

                      {/* Quiet interaction state trigger on the right */}
                      <div className="flex items-center gap-3 shrink-0 z-10">
                        {/* Copy Link Action Button - small, nice and hidden slightly on desktop unless hovered */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShare(item, e); }}
                          className="p-1 px-2 text-[10px] bg-slate-50 hover:bg-emerald-50 border border-slate-150 rounded text-slate-400 hover:text-[#123a1a] transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer flex items-center gap-1 shrink-0 font-mono"
                          title={label('rowShareTitle')}
                        >
                          {copiedId === item.id ? <Check size={10} className="text-emerald-600 font-bold" /> : <Share2 size={10} />}
                          <span className="text-[9px] uppercase font-bold tracking-tight">{copiedId === item.id ? label('rowCopiedLabel') : label('rowShareLabel')}</span>
                        </button>

                        {/* Hover visual cue circle */}
                        <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#3B3131] group-hover:border-[#3B3131] group-hover:text-white transition-all duration-300">
                          <ArrowUpRight size={11} className="group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px] transition-transform duration-300" />
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ==========================================================
          THE LUXUS NO-AI EDITORIAL MODAL (PREMIUM READING SHEET)
          ========================================================== */}
      <AnimatePresence>
        {selectedItem && (
          <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-20 sm:pb-24">

            {/* Glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#3B3131]/80 backdrop-blur-md cursor-pointer"
            />

            {/* Reading sheet paper overlay */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="bg-white border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative z-20 text-left rounded-3xl"
            >
              {/* Close floating bubble */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-40 w-10 h-10 rounded-xl bg-white hover:bg-slate-50 transition flex items-center justify-center border border-slate-200 text-slate-700 hover:scale-105 shadow-sm cursor-pointer"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>

              <div data-lenis-prevent="true" className="overflow-y-auto flex-1 no-scrollbar">

                {/* Stunning Premium Hero Image (When clicked/inside) */}
                {/* Only an entry with a picture of its own opens with a banner. */}
                {((('image' in selectedItem) && (selectedItem as any).image) || (selectedItem.type === 'notice' && selectedItem.banner)) && (
                  <div className="w-full h-52 sm:h-64 relative overflow-hidden select-none bg-slate-100">
                    <img
                      src={'image' in selectedItem && (selectedItem as any).image ? (selectedItem as any).image : (selectedItem.type === 'notice' && selectedItem.banner) || undefined}
                      alt={selectedItem.imageAlt || selectedItem.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                    <div className="absolute bottom-4 left-6 sm:left-10 z-10 text-left">
                      <span className="font-mono text-[9px] font-bold tracking-widest text-[#3B3131] bg-amber-400 px-3 py-1.5 rounded uppercase border border-amber-500/20 shadow-lg">
                        {'categoryTag' in selectedItem ? (selectedItem as any).categoryTag : label('noticeBannerLabel')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Refined Academic Gazette Header */}
                <div className="bg-gradient-to-br from-[#3B3131]/5 to-[#3B3131]/10 p-8 sm:p-10 border-b border-slate-200 relative">
                  <div className="flex flex-wrap items-center gap-2 mb-3 select-none text-[10px] font-sans font-bold tracking-widest">
                    <span className="bg-[#3B3131] text-amber-400 px-3 py-1.5 rounded uppercase inline-block font-sans font-bold">
                      {'categoryTag' in selectedItem ? (selectedItem as any).categoryTag : label('noticeBadgeLabel')}
                    </span>
                    <span className="text-[#3B3131] uppercase font-mono font-bold">
                      {(selectedItem as any).code ? `• ${label('codeLabel')}: ${(selectedItem as any).code}` : `• ${label('archiveLabel')}`}
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3.5xl font-bold text-[#3B3131] leading-tight tracking-tight uppercase">
                    {selectedItem.title}
                  </h3>
                </div>

                {/* Content block */}
                <div className="p-8 sm:p-12 flex flex-col gap-6 font-sans">

                  {/* Alert panel for critical notices only: Critical is switched on per notice. */}
                  {selectedItem.type === 'notice' && selectedItem.critical && (
                    <div className="bg-amber-50/70 border-l-4 border-amber-500 p-5 rounded-r-2xl space-y-1">
                      <div className="flex items-center gap-2 font-sans text-[11px] font-bold text-amber-800 select-none">
                        <AlertCircle size={14} className="text-amber-500" />
                        <span>{label('importantHeading')}</span>
                      </div>
                      {label('importantMessage') && (
                        <p className="leading-relaxed font-sans text-slate-600 text-[12px] sm:text-[13px] font-medium">
                          {label('importantMessage')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Document date metadata block */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 text-[11px] text-slate-400">
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1.5 font-sans font-bold text-slate-700">
                        <Calendar size={14} className="text-amber-500" />
                        {/* Written as people read a date, like the board's rows, not as stored. */}
                        {/^\d{4}-\d{2}-\d{2}$/.test(selectedItem.date)
                          ? new Date(`${selectedItem.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                          : selectedItem.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-sans font-medium">
                        <Clock size={14} />
                        {label('publishedLabel')}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleShare(selectedItem, e)}
                      className="text-[10px] font-sans font-bold text-[#3B3131] hover:text-[#3B3131] flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      {copiedId === selectedItem.id ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span>{label('copiedLabel')}</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={12} />
                          <span>{label('shareLabel')}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* HTML formatted body text */}
                  <div className="text-slate-700 font-sans leading-relaxed text-sm sm:text-base space-y-6 antialiased font-normal">
                    {selectedItem.content ? (
                      selectedItem.content.trim().split('\n\n').map((paragraph, idx) => {
                        const str = paragraph.trim();
                        // What the reader sees, for the checks below: formatting
                        // around a "## " or "- " does not change what the line is.
                        const shown = plainText(str);
                        if (!shown.trim()) return null;

                        // Headings stay plain text, as headings do everywhere else.
                        if (shown.startsWith('## ')) {
                          return (
                            <h4 key={idx} className="font-sans text-lg sm:text-xl font-bold text-[#3B3131] border-b border-slate-100 pb-2.5 pt-4 tracking-tight uppercase">
                              {shown.replace('## ', '')}
                            </h4>
                          );
                        }
                        if (shown.startsWith('### ')) {
                          return (
                            <h5 key={idx} className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 pt-3 select-none">
                              {shown.replace('### ', '')}
                            </h5>
                          );
                        }
                        if (shown.startsWith('- ')) {
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-2.5 font-sans text-xs sm:text-[13.5px] my-4 text-slate-600 leading-relaxed font-semibold">
                              {str.split('\n').map((li, lIdx) => (
                                <li key={lIdx} className="text-slate-600">
                                  {/* The list is already semibold, so older **bold** in it stays plain, as before. */}
                                  <RichText text={withoutMarker(li, '- ').replace(/\*\*(.*?)\*\*/g, '$1')} />
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        {/* First letter drop-cap for official documents */ }
                        return (
                          <p key={idx} className="text-slate-600 font-sans leading-relaxed text-[13.5px] sm:text-[15px] tracking-wide">
                            {/* A drop cap only suits an opening paragraph long enough to wrap around it. */}
                            {idx === 0 && !('image' in selectedItem) && shown.length >= 160 ? (
                              <>
                                <span className="float-left text-5xl font-sans font-bold text-[#3B3131] mr-2.5 mt-1 leading-none select-none">
                                  {shown.charAt(0)}
                                </span>
                                <RichText text={withoutFirstLetter(str)} strongClassName="font-bold text-slate-800" />
                              </>
                            ) : (
                              <RichText text={str} strongClassName="font-bold text-slate-800" />
                            )}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                        <RichText
                          text={selectedItem.type === 'notice'
                            ? (selectedItem as NoticeItem).description
                            : (selectedItem as NewsItem | EventItem).excerpt}
                        />
                      </p>
                    )}
                  </div>

                  {/* Speaker and location metadata (Events only) */}
                  {selectedItem.type === 'event' && (
                    <div className="bg-[#FAF9F5] p-6 border border-slate-200/60 rounded-2xl mt-5 select-none">
                      <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest block mb-3 px-0.5">
                        {label('briefingHeading')}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
                        <div>
                          <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">{label('speakerLabel')}</p>
                          <p className="font-sans font-bold text-[#3B3131] text-sm mt-1">{(selectedItem as EventItem).speaker}</p>
                        </div>
                        <div>
                          <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">{label('venueLabel')}</p>
                          <p className="font-sans font-bold text-[#3B3131] text-sm mt-1">{(selectedItem as EventItem).location}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Author detail block (News only) */}
                  {selectedItem.type === 'news' && (selectedItem as NewsItem).author && (
                    <div className="bg-[#FAF8F5] p-5 border border-slate-200 flex items-center justify-between gap-4 rounded-2xl mt-5 select-none animate-fade-in">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-[#3B3131]/10 text-[#3B3131] border border-[#3B3131]/15 flex items-center justify-center font-sans text-xs font-bold uppercase">
                          {(selectedItem as NewsItem).author.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="text-left font-sans">
                          <h5 className="text-[13px] font-bold text-slate-700">
                            {(selectedItem as NewsItem).author.name}
                          </h5>
                          <span className="text-[10px] text-slate-450 leading-none inline-block font-sans">
                            {(selectedItem as NewsItem).author.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] text-[#3B3131] font-sans font-bold tracking-widest bg-white border border-slate-200 shadow-xs px-3 py-1.5 rounded uppercase">
                        {label('pressLabel')}
                      </span>
                    </div>
                  )}

                </div>

              </div>

              {/* Seal details footer */}
              <div className="bg-[#FAF9F5] border-t border-slate-200 px-8 py-5 flex items-center justify-between text-[9.5px] font-mono text-slate-400 uppercase tracking-widest select-none">
                <span>{label('footerLeft')}</span>
                <span>{label('footerRight')}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
