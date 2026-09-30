import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroContent } from "../hooks/useHeroContent";
import { usePreloaderContent } from "../hooks/usePreloaderContent";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  loaded?: boolean;
  onQuotesComplete?: () => void;
  onAnimationComplete?: () => void;
  isSubPage?: boolean;
  onOpenAdmissions?: () => void;
}

// The images, tagline, timing and overlay are edited in the admin panel and
// come from `useHeroContent`, which falls back to the values this file used to
// hold if the API is unreachable.

// Tablet and mobile band — covers all touch/mobile/tablet screens.
const TABLET_MEDIA_QUERY = "(max-width: 1024px)";

/**
 * Splits an element's text content into individual word <span>s for
 * GSAP word-by-word stagger animation, while keeping it accessible:
 * the original text is preserved via aria-label on the parent, and each
 * word span is aria-hidden so screen readers read the real sentence,
 * not individual fragments.
 */
function splitToWords(el: HTMLElement | null): HTMLSpanElement[] {
  if (!el) return [];
  const text = el.textContent || "";
  el.setAttribute("aria-label", text);
  el.innerHTML = "";

  const words = text.split(/\s+/).filter(Boolean);
  const spans: HTMLSpanElement[] = [];

  words.forEach((word, index) => {
    // Word span
    const span = document.createElement("span");
    span.className = "word-span inline-block px-[1.5px] py-[0.5px] whitespace-nowrap";
    span.textContent = word;
    span.setAttribute("aria-hidden", "true");
    el.appendChild(span);
    spans.push(span);

    // Spacer span (so that words wrap normally on mobile)
    if (index < words.length - 1) {
      const spacer = document.createElement("span");
      spacer.className = "inline-block";
      spacer.textContent = "\u00A0"; // non-breaking space
      spacer.setAttribute("aria-hidden", "true");
      el.appendChild(spacer);
    }
  });

  return spans;
}

export default function Hero({ loaded = true, onQuotesComplete, onAnimationComplete, isSubPage, onOpenAdmissions }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const hero = useHeroContent();
  const { images: HERO_IMAGES } = hero;

  /**
   * Which image the carousel should be showing when the loader hands over.
   *
   * The loader's final photo zooms to fullscreen and the hero takes its place,
   * so the hero has to already be on that same photo or the zoom lands on one
   * picture and the homepage shows another. Starting there — rather than always
   * at index 0 — means any loader selection is seamless, instead of only the
   * one that happens to end on the hero's first image.
   *
   * Falls back to 0 when the loader is off, or ends on an image the hero no
   * longer has.
   */
  const { content: loaderContent } = usePreloaderContent();
  const seamIndex = useMemo(() => {
    if (!loaderContent.enabled || loaderContent.images.length === 0) return 0;
    const last = loaderContent.images[loaderContent.images.length - 1];
    const found = HERO_IMAGES.findIndex((image) => image.src === last);
    return found === -1 ? 0 : found;
  }, [loaderContent, HERO_IMAGES]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If we're rendering directly on a college subpage (e.g. after a
  // reload), skip waiting for the full hero intro animation and let
  // the subpage overlay show immediately.
  useEffect(() => {
    if (isSubPage) {
      onAnimationComplete?.();
      onQuotesComplete?.();
    }
  }, [isSubPage]);

  // Preloading is unconditional: the images should already be in memory by the
  // time the carousel starts, whatever the loader is doing.
  useEffect(() => {
    HERO_IMAGES.forEach((imgObj) => {
      const img = new Image();
      img.src = imgObj.src;
    });
  }, [HERO_IMAGES]);

  useEffect(() => {
    // Nothing rotates while the loader is still on screen.
    //
    // The hero mounts underneath the loader and used to start its timer there,
    // so on a long or slow intro it had already advanced by the time the
    // loader's final image zoomed to fullscreen — the zoom finished on one
    // photo and the hero was showing another. Holding on the first frame is
    // what makes that hand-off seamless, and the timer only has meaning once
    // the hero is actually visible.
    if (!loaded) {
      setCurrentImageIndex(seamIndex);
      return;
    }

    // Reset rather than wrap: the fetched list can be shorter than the
    // fallback, which would otherwise leave the index past its end.
    setCurrentImageIndex((prev) => (prev < HERO_IMAGES.length ? prev : 0));

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, hero.rotationMs);

    return () => clearInterval(interval);
  }, [loaded, seamIndex, HERO_IMAGES, hero.rotationMs]);

  // ---------- Seamless entrance reveal when preloader exits ----------
  useEffect(() => {
    if (!loaded) return;
    if (isSubPage) return; // Skip the intro animation entirely on subpages
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const quoteWords = splitToWords(quoteTextRef.current);

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          onAnimationComplete?.();
          onQuotesComplete?.();
        },
      });

      // 1. Atmosphere overlays fade in smoothly with zero clip-path reflow
      tl.fromTo(
        overlayRef.current,
        { opacity: 0.85 },
        { opacity: 0.6, duration: 0.9, ease: "power2.out" },
        0
      ).fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 0.25, duration: 1.0, ease: "power2.out" },
        0.1
      );

      // 2. Tagline card & words slide up gracefully
      const card = quoteRef.current?.querySelector(".hero-card");

      tl.fromTo(
        quoteRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.2
      );

      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" },
          0.2
        );
      }

      if (quoteWords.length) {
        tl.fromTo(
          quoteWords,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.015,
          },
          0.4
        );
      }

      // 3. Scroll indicator floats in smoothly
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loaded, isSubPage]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-black"
    >
      {/* Main Hero Background Stack */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center bg-black"
      >
        {HERO_IMAGES.map((imgObj, index) => (
          <img
            key={imgObj.src}
            ref={(el) => { imagesRef.current[index] = el; }}
            src={imgObj.src}
            alt={imgObj.alt || `Hero Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: imgObj.position }}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ))}
        {/* Translucent overlay */}
        {/* Inline rather than a Tailwind class: the value is editable, and an
            interpolated class name is not in the stylesheet Tailwind builds. */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${hero.overlayOpacity / 100})` }}
        />

        {/* Tech Grid Overlay */}
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6">
        <div className="flex-[14_14_0%]" />

        {/* Brand Tagline sitting elegantly at the bottom */}
        <div
          ref={quoteRef}
          className="w-full max-w-4xl mx-auto flex flex-col items-center select-none pointer-events-none mb-2 sm:mb-4"
        >
          {/* Premium compact styled Tagline container */}
          <div className="hero-card relative w-full max-w-[76vw] sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-7 py-2 sm:py-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/8 shadow-[0_12px_40px_rgba(0,0,0,0.55)] opacity-0">
            {/* Elegant luxury gold corner accents */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#D4AF37]/45" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#D4AF37]/45" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#D4AF37]/45" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#D4AF37]/45" />

            {/* Quote Marks */}
            <span className="absolute -top-2.5 left-2 text-lg sm:text-xl md:text-2xl font-serif text-[#D4AF37]/30 pointer-events-none">“</span>
            <span className="absolute -bottom-4 right-2 text-lg sm:text-xl md:text-2xl font-serif text-[#D4AF37]/30 pointer-events-none">”</span>

            <p
              ref={quoteTextRef}
              className="text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] md:text-[13px] font-sans font-medium text-white/95 italic leading-relaxed tracking-wide text-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] px-1"
            >
              {hero.tagline}
            </p>
          </div>
        </div>

        <div className="w-full mt-auto flex flex-col items-center">
          <div
            ref={scrollIndicatorRef}
            className="flex flex-col items-center gap-1 sm:gap-1.5 pointer-events-none select-none mt-1 animate-premium-float"
          >
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-sans font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {hero.scrollLabel}
            </span>
            <div className="w-[1px] h-6 sm:h-10 md:h-12 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}