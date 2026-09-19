import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/all";

gsap.registerPlugin(Flip);

// Cinematic pace control: 1.0 = snappier, 1.4 = slower/calmer
const SPEED = 1.15;

const images = [
  "/images/hero/646efc827452b.webp",
  "/images/hero/65efea4943a49.webp",
  "/images/hero/65efeac7d49a3.webp",
  "/images/hero/65efeaeece007.webp"
];

interface PreloaderProps {
  onExitStart: () => void;
  onComplete: () => void;
}

export default function Preloader({ onExitStart, onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [count, setCount] = useState(1);
  const [dismissed, setDismissed] = useState(false);

  const play = () => {
    const root = rootRef.current;
    if (!root) return;

    ctxRef.current?.revert();
    setDismissed(false);
    setCount(1);

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".image-wrapper");
      const imgs = gsap.utils.toArray<HTMLElement>(".image-wrapper img");
      const gridCols = gsap.utils.toArray<HTMLElement>(".grid-column");
      const counter = counterRef.current!;

      gsap.set(wrappers, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(imgs, { scale: 1.1 });
      gsap.set(imgs[imgs.length - 1], { scale: 1 }); // final image: no Ken Burns, so it only zooms ONCE (the fullscreen Flip)
      gsap.set(gridCols, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set([".header-left", ".header-middle", ".header-right"], { autoAlpha: 0, y: -14 });
      gsap.set(counter, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      const reveal = 0.72 * SPEED;
      const step = 0.58 * SPEED;
      
      // Animate slideshow
      wrappers.forEach((w, i) => {
        const at = i * step;
        tl.to(w, { clipPath: "inset(0% 0% 0% 0%)", duration: reveal }, at);
        // Ken Burns settle on every image EXCEPT the last (the last one only zooms via the fullscreen Flip)
        if (i !== wrappers.length - 1) {
          tl.to(imgs[i], { scale: 1, duration: reveal + step, ease: "power2.out" }, at);
        }
        tl.call(() => setCount(i + 1), [], at + 0.04);
      });

      // Show grid and headers quickly in parallel
      tl.to(gridCols, { scaleY: 1, duration: 0.6 * SPEED, stagger: 0.03 * SPEED, ease: "power2.out" }, 0.2);
      tl.to(
        [".header-left", ".header-middle", ".header-right"],
        { autoAlpha: 1, y: 0, duration: 0.6 * SPEED, stagger: 0.08 * SPEED },
        0.3
      );

      // Start the transition/exit to Hero section automatically after slideshow finishes
      const zoomStart = wrappers.length * step + 0.3 * SPEED;

      // 1. Flip final image to fullscreen smoothly with GPU compositing
      tl.call(
        () => {
          const finalImage = root.querySelector<HTMLElement>("#final-image");
          if (finalImage && typeof Flip !== 'undefined' && Flip.getState) {
            const state = Flip.getState(finalImage);
            finalImage.classList.add("is-fullscreen");
            if (Flip.from) {
              Flip.from(state, { 
                duration: 1.05 * SPEED, 
                ease: "power3.out", 
                absolute: false,
                nested: false,
                onStart: () => {
                  gsap.set(finalImage, { willChange: "transform" });
                },
                onComplete: () => {
                  gsap.set(finalImage, { willChange: "auto" });
                }
              });
            }
          }
        },
        [],
        zoomStart
      );

      // 2. Hide counter and fade out noise right as the zoom starts for 0ms composite stalls
      tl.to(
        counter,
        { opacity: 0, duration: 0.4 * SPEED, ease: "power2.inOut", pointerEvents: "none" },
        zoomStart
      );
      tl.to(
        ".noise",
        { opacity: 0, duration: 0.4 * SPEED, ease: "power2.out" },
        zoomStart
      );

      // 3. Fade out other preloader layout elements during the zoom
      tl.to(
        [".preloader-header", ".grid-overlay"],
        { 
          opacity: 0, 
          y: -16, 
          duration: 0.6 * SPEED, 
          stagger: 0.04,
          ease: "power2.inOut" 
        },
        zoomStart + 0.05
      );

      // 4. Trigger the Hero's entrance animation seamlessly during the zoom
      tl.call(() => {
        setDismissed(true);
        onExitStart();
      }, [], zoomStart + 0.4 * SPEED);

      // 5. Fade out the entire preloader backdrop to reveal the fully interactive Hero section
      tl.to(rootRef.current, {
        opacity: 0,
        duration: 0.65 * SPEED,
        ease: "power2.out",
        onComplete: () => {
          onComplete();
        }
      }, zoomStart + 0.95 * SPEED);

    }, rootRef);

    ctxRef.current = ctx;
  };

  // Skip or fast-forward preloader on manual user interaction
  useEffect(() => {
    const handleDismiss = () => {
      if (dismissed) return;
      setDismissed(true);

      // Trigger Hero's animation immediately and fade out preloader
      onExitStart();
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          onComplete();
        }
      });
    };

    window.addEventListener("wheel", handleDismiss, { passive: true });
    window.addEventListener("touchmove", handleDismiss, { passive: true });
    window.addEventListener("click", handleDismiss);
    window.addEventListener("keydown", handleDismiss);

    return () => {
      window.removeEventListener("wheel", handleDismiss);
      window.removeEventListener("touchmove", handleDismiss);
      window.removeEventListener("click", handleDismiss);
      window.removeEventListener("keydown", handleDismiss);
    };
  }, [dismissed, onExitStart, onComplete]);

  useEffect(() => {
    play();
    return () => ctxRef.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      ref={rootRef} 
      className="preloader-root fixed inset-0 z-[9999] bg-[#FFFFFF] select-none text-charcoal overflow-hidden flex items-center justify-center font-sans antialiased"
    >
      <style>{CSS}</style>

      {/* Retro premium layout grid lines */}
      <div className="grid-overlay">
        <div className="grid-overlay-inner">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="grid-column" key={i} />
          ))}
        </div>
      </div>

      <header className="preloader-header">
        <div className="header-inner flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6 w-full text-center sm:text-left">
          <div className="header-left font-bold text-[#4CBB17] text-[11px] sm:text-[12px] tracking-widest">ESTD. 2005</div>
          <div className="header-middle flex justify-center text-center">
            <span className="font-sans font-bold text-[11.5px] sm:text-[14px] md:text-[16px] tracking-[0.05em] text-[#123005] leading-snug text-center uppercase">
              C.K. Pithawalla Institute of Pharmaceutical Science and Research
            </span>
          </div>
          <div className="header-right hidden sm:block w-[80px]" />
        </div>
      </header>

      {/* Main sliding image container */}
      <div className="preloader-container shadow-2xl">
        {images.map((src, i) => (
          <div
            className="image-wrapper"
            id={i === images.length - 1 ? "final-image" : undefined}
            key={src}
          >
            <img 
              src={src} 
              alt="" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        <span ref={counterRef} className="counter font-mono font-bold text-[#4CBB17]">
          {String(count).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {/* Film grain noise effect */}
      <div className="noise" aria-hidden />
    </div>
  );
}

const CSS = `
.preloader-root {
  box-sizing: border-box;
}
.preloader-root * { box-sizing: border-box; }

.preloader-header { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  padding: 2rem 2.5rem; 
  z-index: 20; 
  pointer-events: none; 
}
@media (max-width: 640px) {
  .preloader-header {
    padding: 1.25rem 1rem;
  }
}
.header-inner { display: flex; align-items: center; justify-content: space-between; }
.header-left { font-size: 0.75rem; letter-spacing: 0.24em; text-transform: uppercase; }

.preloader-container { 
  position: relative; 
  width: 440px; 
  height: 310px; 
  z-index: 6; 
  border-radius: 4px;
  overflow: visible;
}
@media (max-width: 640px) {
  .preloader-container {
    width: 280px;
    height: 200px;
  }
}

.image-wrapper { 
  position: absolute; 
  inset: 0; 
  overflow: hidden; 
  will-change: clip-path; 
  border-radius: 4px;
}
.image-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Fullscreen end-frame matches Hero EXACTLY (110vw/110vh, centered, scale 1.05)
   so the crossfade into the Hero background has no zoom "jump" / ghost.
   Negative insets (not translate) keep it Flip-friendly. */
.image-wrapper.is-fullscreen { 
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh; 
  transform-origin: center center;
  z-index: 1; 
  border-radius: 0;
  overflow: hidden;
}
/* Must match HERO_IMAGES[0].position in Hero.tsx — the preloader's final
   image and the hero's first image are the same file, and the crossfade
   only looks seamless if both crop it identically. Changing one requires
   changing the other. */
.image-wrapper.is-fullscreen img {
  border-radius: 0;
  object-fit: cover;
  object-position: center 15%;
}

.counter { 
  position: absolute; 
  bottom: -2.75rem; 
  left: 50%; 
  transform: translateX(-50%);
  font-size: 0.8rem; 
  letter-spacing: 0.25em; 
}

.grid-overlay { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
.grid-overlay-inner { display: flex; width: 100%; height: 100%; }
.grid-column { flex: 1; border-left: 1px solid rgba(18,48,5,0.06); }
.grid-column:last-child { border-right: 1px solid rgba(18,48,5,0.06); }

.noise { 
  position: absolute; 
  inset: -50%; 
  width: 200%; 
  height: 200%; 
  z-index: 30; 
  pointer-events: none;
  opacity: 0.055; 
  background-image: url("https://assets.iceable.com/img/noise-transparent.png");
  background-repeat: repeat; 
  animation: noise-animation-preloader 0.4s steps(2) infinite; 
}
@keyframes noise-animation-preloader {
  0% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); }
  20% { transform: translate(-4%,2%); } 30% { transform: translate(2%,-4%); }
  40% { transform: translate(-2%,5%); } 50% { transform: translate(-4%,2%); }
  60% { transform: translate(3%,0); } 70% { transform: translate(0,3%); }
  80% { transform: translate(-3%,0); } 90% { transform: translate(2%,2%); }
  100% { transform: translate(1%,0); }
}
`;
