import React, { useRef, useState, useEffect } from 'react';
import { useLenis } from "../context/LenisContext";
import { useModalScrollLock } from "../hooks/useModalScrollLock";
import { Footprints, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PILLARS, ARCHIVE_ITEMS, GALLERY_ITEMS } from './campus-life/campusLifeData';
import PillarCard from './campus-life/PillarCard';
import CinematicGalleryModal from './campus-life/CinematicGalleryModal';
import GalleryColumn from './campus-life/GalleryColumn';

gsap.registerPlugin(ScrollTrigger);

type TrailPt = { x: number; y: number };
type GapMarker = { x: number; y: number; index: number };
type MobileSegment = { d: string; gStart: number; gEnd: number };

export default function CampusLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillarsWrapRef = useRef<HTMLDivElement>(null);

  // Desktop / tablet trail (>=768px)
  const svgRef = useRef<SVGSVGElement>(null);
  const guidePathRef = useRef<SVGPathElement>(null);
  const drawnPathRef = useRef<SVGPathElement>(null);

  // Mobile trail (<768px)
  const mobileSvgRef = useRef<SVGSVGElement>(null);
  const mobileGuidePathRef = useRef<SVGPathElement>(null);
  const mobileHaloPathRef = useRef<SVGPathElement>(null);
  const mobileSegmentRefs = useRef<(SVGPathElement | null)[]>([]);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const archiveHeadingRef = useRef<HTMLHeadingElement>(null);

  // Cinematic gallery modal state
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  useModalScrollLock(activeGalleryIndex !== null);

  const openGalleryWithImage = (url: string) => {
    const foundIdx = GALLERY_ITEMS.findIndex(item => item.url.split('?')[0] === url.split('?')[0]);
    setActiveGalleryIndex(foundIdx !== -1 ? foundIdx : 0);
  };

  useEffect(() => {
    const handleClose = () => setActiveGalleryIndex(null);
    window.addEventListener('closeAllModals', handleClose);
    return () => window.removeEventListener('closeAllModals', handleClose);
  }, []);

  const [containerWidth, setContainerWidth] = useState(1200);
  const [activeTrailPoint, setActiveTrailPoint] = useState(1);
  const [pathPts, setPathPts] = useState<TrailPt[]>([]);
  const [trailEnds, setTrailEnds] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  const [mobileMarkers, setMobileMarkers] = useState<GapMarker[]>([]);
  const [mobileEnds, setMobileEnds] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [mobileSegments, setMobileSegments] = useState<MobileSegment[]>([]);
  const mobileLengthsRef = useRef<number[]>([]);

  const registerStepRef = (i: number) => (el: HTMLDivElement | null) => { stepRefs.current[i] = el; };
  const registerMobileSegmentRef = (i: number) => (el: SVGPathElement | null) => { mobileSegmentRefs.current[i] = el; };

  // ---------------- GEOMETRY & SCROLL PASS ----------------
  useEffect(() => {
    const lastWidthRef = { current: 0 };

    const build = () => {
      mobileLengthsRef.current = [];
      const section = sectionRef.current;
      const container = pillarsWrapRef.current;
      const svgEl = svgRef.current;
      const guideEl = guidePathRef.current;
      const drawnEl = drawnPathRef.current;
      const underlineEl = underlineRef.current;
      const archiveEl = archiveHeadingRef.current;
      const mobileSvgEl = mobileSvgRef.current;
      const mobileGuideEl = mobileGuidePathRef.current;
      const mobileHaloEl = mobileHaloPathRef.current;
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!section || !container || !svgEl || !guideEl || !drawnEl || !underlineEl || !archiveEl ||
          !mobileSvgEl || !mobileGuideEl || !mobileHaloEl || steps.length === 0) return;

      const scrollY = window.scrollY;
      const sectionRect = section.getBoundingClientRect();
      const sectionAbsTop = sectionRect.top + scrollY;
      const W = container.getBoundingClientRect().width;
      setContainerWidth(W);

      const isStackedLayout = W < 768;

      const cardTops = steps.map(s => (s.getBoundingClientRect().top + scrollY) - sectionAbsTop);
      const cardBottoms = steps.map(s => (s.getBoundingClientRect().bottom + scrollY) - sectionAbsTop);
      const startY = (underlineEl.getBoundingClientRect().bottom + scrollY) - sectionAbsTop + 26;
      const endY = (archiveEl.getBoundingClientRect().top + scrollY) - sectionAbsTop - 24;

      // ---------------- DESKTOP / TABLET TRAIL (>=768px) ----------------
      if (isStackedLayout) {
        svgEl.style.display = 'none';
        setPathPts([]);
        gsap.killTweensOf(drawnEl);
        ScrollTrigger.getById('campusJourneyTrigger')?.kill();
      } else {
        svgEl.style.display = 'block';

        const pts = steps.map((step, i) => {
          const r = step.getBoundingClientRect();
          const y = (r.top + scrollY) - sectionAbsTop + r.height / 2;
          const x = i % 2 === 0 ? W * 0.68 : W * 0.32;
          return { x, y };
        });

        const H = Math.max(endY, pts[pts.length - 1].y + 60);
        const cx = W / 2;

        let d = `M ${cx} ${startY}`;
        pts.forEach((pt, i) => {
          if (i === 0) {
            const pull = (pt.y - startY) * 0.4;
            d += ` C ${cx} ${startY + pull}, ${pt.x} ${pt.y - pull}, ${pt.x} ${pt.y}`;
          } else {
            const prev = pts[i - 1];
            const pull = (pt.y - prev.y) * 0.4;
            d += ` C ${prev.x} ${prev.y + pull}, ${pt.x} ${pt.y - pull}, ${pt.x} ${pt.y}`;
          }
        });
        const last = pts[pts.length - 1];
        const tailPull = (H - last.y) * 0.5;
        d += ` C ${last.x} ${last.y + tailPull}, ${cx} ${H - tailPull * 0.4}, ${cx} ${H}`;

        svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
        svgEl.style.height = `${H}px`;
        guideEl.setAttribute('d', d);
        drawnEl.setAttribute('d', d);

        setPathPts(prev => {
          if (prev.length === pts.length && prev.every((p, i) => Math.abs(p.x - pts[i].x) < 2 && Math.abs(p.y - pts[i].y) < 2)) return prev;
          return pts;
        });
        setTrailEnds(prev => {
          if (Math.abs(prev.startX - cx) < 2 && Math.abs(prev.startY - startY) < 2 && Math.abs(prev.endX - cx) < 2 && Math.abs(prev.endY - H) < 2) return prev;
          return { startX: cx, startY, endX: cx, endY: H };
        });

        const pathLen = drawnEl.getTotalLength();
        drawnEl.setAttribute('stroke-dasharray', `${pathLen}`);
        drawnEl.setAttribute('stroke-dashoffset', `${pathLen}`);

        gsap.killTweensOf(drawnEl);
        ScrollTrigger.getById('campusJourneyTrigger')?.kill();
        gsap.to(drawnEl, {
          attr: { 'stroke-dashoffset': 0 },
          ease: 'none',
          scrollTrigger: {
            id: 'campusJourneyTrigger',
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const point = Math.min(PILLARS.length, Math.max(1, Math.ceil(self.progress * PILLARS.length) || 1));
              setActiveTrailPoint((prev) => (prev !== point ? point : prev));
            }
          }
        });
      }

      // ---------------- MOBILE TRAIL (<768px) ----------------
      if (isStackedLayout) {
        mobileSvgEl.style.display = 'block';

        const cx = W / 2;
        const amp = Math.min(70, W * 0.22);
        const n = PILLARS.length;
        const gapStarts = [startY, ...cardBottoms];
        const gapEnds = [...cardTops, endY];

        const segments: MobileSegment[] = [];
        const markers: GapMarker[] = [];
        let combinedGuideD = '';

        gapStarts.forEach((gStart, i) => {
          const gEnd = gapEnds[i];
          const gMid = (gStart + gEnd) / 2;
          const side = i % 2 === 0 ? 1 : -1;
          const peakX = cx + side * amp;

          const segD = `M ${cx} ${gStart} C ${cx} ${gStart + (gMid - gStart) * 0.5}, ${peakX} ${gMid - (gMid - gStart) * 0.5}, ${peakX} ${gMid} C ${peakX} ${gMid + (gEnd - gMid) * 0.5}, ${cx} ${gEnd - (gEnd - gMid) * 0.5}, ${cx} ${gEnd}`;

          segments.push({ d: segD, gStart, gEnd });
          combinedGuideD += ` ${segD}`;

          if (i < n) markers.push({ x: peakX, y: gMid, index: i });
        });

        const H = Math.max(endY, gapEnds[gapEnds.length - 1] + 40);
        mobileSvgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
        mobileSvgEl.style.height = `${H}px`;
        mobileGuideEl.setAttribute('d', combinedGuideD.trim());
        mobileHaloEl.setAttribute('d', combinedGuideD.trim());

        setMobileMarkers(prev => {
          if (prev.length === markers.length && prev.every((m, i) => Math.abs(m.x - markers[i].x) < 2 && Math.abs(m.y - markers[i].y) < 2)) return prev;
          return markers;
        });
        setMobileEnds(prev => {
          if (Math.abs(prev.startX - cx) < 2 && Math.abs(prev.startY - startY) < 2) return prev;
          return { startX: cx, startY, endX: cx, endY: gapEnds[gapEnds.length - 1] };
        });
        setMobileSegments(prev => {
          if (prev.length === segments.length && prev.every((s, i) => s.d === segments[i].d)) return prev;
          return segments;
        });

        const totalSpan = Math.max(1, gapEnds[gapEnds.length - 1] - startY);

        const updateMobileDraw = (progress: number) => {
          segments.forEach((seg, i) => {
            const el = mobileSegmentRefs.current[i];
            if (!el) return;
            let len = mobileLengthsRef.current[i];
            if (!len) {
              len = el.getTotalLength();
              mobileLengthsRef.current[i] = len;
            }
            if (!len) return;
            el.setAttribute('stroke-dasharray', `${len}`);
            const pStart = Math.max(0, (seg.gStart - startY) / totalSpan);
            const pEnd = Math.min(1, (seg.gEnd - startY) / totalSpan);
            let frac = 0;
            if (progress >= pEnd) frac = 1;
            else if (progress <= pStart) frac = 0;
            else frac = (progress - pStart) / Math.max(0.001, pEnd - pStart);
            el.setAttribute('stroke-dashoffset', `${len * (1 - frac)}`);
          });
        };

        ScrollTrigger.getById('mobileCampusJourneyTrigger')?.kill();
        updateMobileDraw(0);

        ScrollTrigger.create({
          id: 'mobileCampusJourneyTrigger',
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateMobileDraw(self.progress);
            const point = Math.min(PILLARS.length, Math.max(1, Math.ceil(self.progress * PILLARS.length) || 1));
            setActiveTrailPoint((prev) => (prev !== point ? point : prev));
          },
          onRefresh: (self) => {
            updateMobileDraw(self.progress);
          }
        });

        // Pre-cache path lengths safely right after rendering
        requestAnimationFrame(() => {
          segments.forEach((seg, i) => {
            const el = mobileSegmentRefs.current[i];
            if (el) {
              mobileLengthsRef.current[i] = el.getTotalLength();
            }
          });
        });
      } else {
        mobileSvgEl.style.display = 'none';
        setMobileMarkers([]);
        setMobileSegments([]);
        ScrollTrigger.getById('mobileCampusJourneyTrigger')?.kill();
      }
    };

    let timeoutId: number;
    const scheduledBuild = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(build, 100);
    };

    scheduledBuild();

    const imgs = pillarsWrapRef.current?.querySelectorAll('img') ?? [];
    imgs.forEach((img) => { if (!(img as HTMLImageElement).complete) img.addEventListener('load', scheduledBuild, { once: true }); });

    window.addEventListener('load', scheduledBuild);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (Math.abs(width - lastWidthRef.current) > 2) {
          lastWidthRef.current = width;
          scheduledBuild();
        }
      }
    });

    if (pillarsWrapRef.current) {
      lastWidthRef.current = pillarsWrapRef.current.getBoundingClientRect().width;
      ro.observe(pillarsWrapRef.current);
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('load', scheduledBuild);
      ro.disconnect();
      ScrollTrigger.getById('campusJourneyTrigger')?.kill();
      ScrollTrigger.getById('mobileCampusJourneyTrigger')?.kill();
    };
  }, []);

  useEffect(() => {
    const trigger = ScrollTrigger.getById('mobileCampusJourneyTrigger');
    if (trigger) {
      trigger.refresh();
    }
  }, [mobileSegments]);

  return (
    <section id="campus-life" ref={sectionRef} className="py-24 bg-[#FCFAF6] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2D2424]" />
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2D2424] flex items-center gap-2">
                <span>The Living Ecosystem</span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1 font-bold"><Footprints className="w-3.5 h-3.5" /> Interactive Campus Trail</span>
              </div>
            </div>
            <h2 className="font-bold text-4xl sm:text-6xl uppercase tracking-tight leading-[1.05] text-[#2D2424]">
              Life Outside <br />
              <span className="relative inline-block text-[#2D2424] pb-3">
                The Classroom
                <span
                  ref={underlineRef}
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-1 h-3.5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 14'%3E%3Cpath d='M0 7 Q10 -1 20 7 T40 7' stroke='%232D2424' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '40px 14px',
                  }}
                />
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Desktop / tablet scroll-drawn spine */}
      <div className="hidden md:block absolute top-0 left-0 right-0 pointer-events-none z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <svg ref={svgRef} className="w-full absolute top-0 left-0 overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mapTrailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="55%" stopColor="#B8933E" />
                <stop offset="100%" stopColor="#2D2424" />
              </linearGradient>
            </defs>

            <path ref={guidePathRef} stroke="#A88B74" strokeWidth="2.5" strokeDasharray="8 8" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path stroke="#2D2424" strokeWidth="13" strokeOpacity="0.15" fill="none" vectorEffect="non-scaling-stroke" />
            <path ref={drawnPathRef} stroke="#2D2424" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" vectorEffect="non-scaling-stroke" />

            {pathPts.map((pt, i) => {
              const isActive = activeTrailPoint === i + 1;
              const pillar = PILLARS[i];
              const accentColor = pillar?.accent || "#D4AF37";
              const isRightSide = i % 2 === 0;
              const tagWidth = 110;
              const tagX = isRightSide ? 0 : -tagWidth;
              const tagOffset = isRightSide ? 32 : -32;

              return (
                <g key={i} transform={`translate(${pt.x}, ${pt.y})`} className="transition-all duration-300">
                  {isActive && (
                    <>
                      <circle r="28" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.5" className="animate-ping" />
                      <circle r="22" fill={accentColor} opacity="0.18" />
                    </>
                  )}
                  <circle
                    r={isActive ? "20" : "16"}
                    stroke={isActive ? accentColor : "#A88B74"}
                    strokeWidth={isActive ? "3" : "2"}
                    strokeDasharray={isActive ? "none" : "4 2"}
                    fill="#FCFAF6"
                    vectorEffect="non-scaling-stroke"
                    className="transition-all duration-300 shadow-md"
                  />
                  <circle r={isActive ? "12" : "8"} fill={isActive ? accentColor : "#2D2424"} className="transition-all duration-300" />
                  <text x="0" y="3.5" textAnchor="middle" fill="#ffffff" fontSize={isActive ? "10" : "8"} fontWeight="700" fontFamily="monospace" className="pointer-events-none select-none transition-all duration-300">
                    0{i + 1}
                  </text>
                  <g transform={`translate(${tagOffset}, 0)`}>
                    <rect x={tagX} y="-13" width={tagWidth} height="26" rx="13" fill={isActive ? "#2D2424" : "#ffffff"} stroke={isActive ? accentColor : "#E2E8F0"} strokeWidth="1.5" className="shadow-lg transition-all duration-300" />
                    <text x={isRightSide ? tagWidth / 2 : -tagWidth / 2} y="4" textAnchor="middle" fill={isActive ? "#ffffff" : "#2D2424"} fontSize="9.5" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.06em" className="pointer-events-none select-none uppercase tracking-wider">
                      {pillar?.category.split(' ')[0] || `Stop 0${i + 1}`}
                    </text>
                  </g>
                </g>
              );
            })}

            {trailEnds.startY > 0 && (
              <>
                <text x={trailEnds.startX} y={trailEnds.startY - 6} fontSize="26" textAnchor="middle" className="pointer-events-none select-none">🌟</text>
                <text x={trailEnds.endX} y={trailEnds.endY + 25} fontSize="26" textAnchor="middle" className="pointer-events-none select-none">🎉</text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Mobile scroll-drawn spine */}
      <div className="md:hidden absolute top-0 left-0 right-0 pointer-events-none z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <svg ref={mobileSvgRef} className="w-full absolute top-0 left-0 overflow-visible" preserveAspectRatio="none">
            <path ref={mobileGuidePathRef} stroke="#A88B74" strokeWidth="2" strokeDasharray="7 7" strokeOpacity="0.25" fill="none" vectorEffect="non-scaling-stroke" />
            <path ref={mobileHaloPathRef} stroke="#2D2424" strokeWidth="10" strokeOpacity="0.15" fill="none" vectorEffect="non-scaling-stroke" />

            {mobileSegments.map((seg, i) => (
              <path
                key={i}
                ref={registerMobileSegmentRef(i)}
                d={seg.d}
                stroke="#2D2424"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {mobileMarkers.map((m) => {
              const isActive = activeTrailPoint === m.index + 1;
              const pillar = PILLARS[m.index];
              const accentColor = pillar?.accent || "#D4AF37";
              return (
                <g key={m.index} transform={`translate(${m.x}, ${m.y})`} className="transition-all duration-300">
                  {isActive && (
                    <>
                      <circle r="16" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.5" className="animate-ping" />
                      <circle r="11" fill={accentColor} opacity="0.18" />
                    </>
                  )}
                  <circle
                    r={isActive ? "11" : "8"}
                    stroke={isActive ? accentColor : "#A88B74"}
                    strokeWidth={isActive ? "2.5" : "2"}
                    strokeDasharray={isActive ? "none" : "3 2"}
                    fill="#FCFAF6"
                    vectorEffect="non-scaling-stroke"
                    className="transition-all duration-300"
                  />
                  <circle r={isActive ? "6" : "4"} fill={isActive ? accentColor : "#2D2424"} className="transition-all duration-300" />
                  <text x="0" y={isActive ? "2.5" : "2"} textAnchor="middle" fill="#ffffff" fontSize={isActive ? "6.5" : "5.5"} fontWeight="700" fontFamily="monospace" className="pointer-events-none select-none transition-all duration-300">
                    0{m.index + 1}
                  </text>
                </g>
              );
            })}

            {mobileEnds.startY > 0 && (
              <>
                <text x={mobileEnds.startX} y={mobileEnds.startY - 4} fontSize="18" textAnchor="middle" className="pointer-events-none select-none">🌟</text>
                <text x={mobileEnds.endX} y={mobileEnds.endY + 16} fontSize="18" textAnchor="middle" className="pointer-events-none select-none">🎉</text>
              </>
            )}
          </svg>
        </div>
      </div>

      <div ref={pillarsWrapRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 mb-32 relative z-10">
        {PILLARS.map((p, i) => (
          <PillarCard key={p.id} pillar={p} index={i} registerRef={registerStepRef(i)} onOpenGallery={openGalleryWithImage} />
        ))}
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 select-none flex flex-col items-center">
            <h3 ref={archiveHeadingRef} className="font-montserrat text-3xl sm:text-4xl font-bold text-[#2D2424] tracking-tight uppercase">
              Campus Memory Archive
            </h3>
            <p className="font-montserrat text-sm text-slate-500 font-medium max-w-xl mx-auto mt-2">
              Real moments, real friendships, and unforgettable memories captured throughout our vibrant campus life.
            </p>
            <button
              onClick={() => setActiveGalleryIndex(0)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D2424] hover:bg-[#D4AF37] text-white hover:text-[#2D2424] text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Open Interactive Gallery
            </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes gc-scroll {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(0, -33.333%, 0); }
          }
          @keyframes gc-scroll-rev {
            from { transform: translate3d(0, -33.333%, 0); }
            to { transform: translate3d(0, 0, 0); }
          }
          .gc-stage {
            width: calc(100% - 2rem);
            max-width: 1280px;
            margin: 0 auto;
            padding: 1.25rem;
            height: 115vh;
            overflow: hidden;
            position: relative;
            border-radius: 1.5rem;
            background: #ffffff;
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
            display: flex;
            gap: 1.25rem;
            box-sizing: border-box;
          }
          @media (min-width: 768px) {
            .gc-stage {
              height: 135vh;
              padding: 1.5rem;
              gap: 1.5rem;
            }
          }
          .gc-stage::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 55px;
            background: linear-gradient(to bottom, #ffffff 25%, rgba(255, 255, 255, 0));
            z-index: 10;
            pointer-events: none;
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
          }
          .gc-stage::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 55px;
            background: linear-gradient(to top, #ffffff 25%, rgba(255, 255, 255, 0));
            z-index: 10;
            pointer-events: none;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
          }
          .gc-col {
            height: 100%;
            overflow: hidden;
            position: relative;
            user-select: none;
            flex: 1 1 0%;
            min-width: 0;
            width: auto;
            padding: 4px 2px;
            box-sizing: border-box;
          }
          .gc-col-c, .gc-col-d {
            display: none;
          }
          @media (min-width: 640px) {
            .gc-col-c {
              display: block;
            }
          }
          @media (min-width: 768px) {
            .gc-col-d {
              display: block;
            }
          }
          .gc-track {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            flex-shrink: 0;
            padding: 8px 4px;
            cursor: grab;
            will-change: transform;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            box-sizing: border-box;
          }
          .gc-track:active {
            cursor: grabbing;
          }
          .gc-track.gc-anim {
            animation: gc-scroll linear infinite;
          }
          .gc-track.gc-anim-rev {
            animation: gc-scroll-rev linear infinite;
          }
          .gc-track.gc-anim:hover,
          .gc-track.gc-anim-rev:hover {
            animation-play-state: paused;
          }
          .gc-card {
            width: 100%;
            box-sizing: border-box;
            border-radius: 0.85rem;
            background: #ffffff;
            padding: 0.5rem;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(15, 23, 42, 0.08);
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            cursor: pointer;
            overflow: hidden;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .gc-card:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.09);
          }
          .gc-imgwrap {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 3.2;
            overflow: hidden;
            border-radius: 0.6rem;
            background: #f1f5f9;
          }
          .gc-tag {
            position: absolute;
            top: 0.4rem;
            left: 0.4rem;
            z-index: 2;
            background: rgba(26, 32, 44, 0.9);
            color: #fff;
            font-family: Inter, sans-serif;
            font-weight: 800;
            font-size: 0.46rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 0.25rem 0.45rem;
            border-radius: 5px;
            line-height: 1;
          }
          .gc-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
            transition: transform 0.75s ease;
          }
          .gc-card:hover .gc-img {
            transform: scale(1.05);
          }
          .gc-info {
            padding: 0 0.2rem 0.05rem;
            text-align: left;
          }
          .gc-info h4 {
            font-family: Inter, sans-serif;
            font-size: 0.68rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.25;
            letter-spacing: -0.01em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            word-break: break-word;
          }
          .gc-snap {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            margin-top: 0.35rem;
          }
          .gc-star {
            color: #D4AF37;
            font-size: 0.55rem;
            line-height: 1;
          }
          .gc-snap span:last-child {
            font-family: monospace;
            font-size: 0.54rem;
            color: #D4AF37;
            letter-spacing: 0.04em;
          }
          @media (max-width: 640px) {
            .gc-stage {
              width: calc(100% - 1.5rem);
              padding: 0.75rem;
              gap: 0.75rem;
              border-radius: 1.25rem;
              height: 105vh;
            }
            .gc-track {
              gap: 0.75rem;
              padding: 6px 2px;
            }
            .gc-card {
              padding: 0.4rem;
            }
          }
        ` }} />

        {/* Reverted vertical-scrolling columns archive stage */}
        <div className="gc-stage mt-6">
          <GalleryColumn
            items={[ARCHIVE_ITEMS[0], ARCHIVE_ITEMS[4], ARCHIVE_ITEMS[8]]}
            duration={32}
            className="gc-col-a"
            onSelect={openGalleryWithImage}
          />
          <GalleryColumn
            items={[ARCHIVE_ITEMS[1], ARCHIVE_ITEMS[5], ARCHIVE_ITEMS[9]]}
            duration={28}
            reverse
            className="gc-col-b"
            onSelect={openGalleryWithImage}
          />
          <GalleryColumn
            items={[ARCHIVE_ITEMS[2], ARCHIVE_ITEMS[6], ARCHIVE_ITEMS[10]]}
            duration={36}
            className="gc-col-c"
            onSelect={openGalleryWithImage}
          />
          <GalleryColumn
            items={[ARCHIVE_ITEMS[3], ARCHIVE_ITEMS[7], ARCHIVE_ITEMS[11]]}
            duration={30}
            reverse
            className="gc-col-d"
            onSelect={openGalleryWithImage}
          />
        </div>
      </div>

      {/* CINEMATIC GALLERY MODAL */}
      <CinematicGalleryModal
        activeIndex={activeGalleryIndex}
        onClose={() => setActiveGalleryIndex(null)}
        setActiveIndex={setActiveGalleryIndex}
      />

    </section>
  );
}
