import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_HOME_COURSES, useHomeCoursesContent } from "../hooks/useHomeCoursesContent";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { RichText } from "../utils/RichText";

// --- Types ---
interface AccordionItemData {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  imageUrl: string;
  duration?: string;
  intake?: string;
  eligibility?: string;
  highlights?: string[];
  link?: string;
}

interface AccordionItemProps {
  key?: number;
  item: AccordionItemData;
  isActive: boolean;
  onSelect: () => void;
}

// --- Desktop Accordion Item Component ---
const AccordionItem = ({ item, isActive, onSelect }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer md:shrink-0
        transition-all duration-700 ease-in-out
        ${isActive
          ? "md:h-[450px] md:w-[220px] lg:w-[320px] xl:w-[400px]"
          : "md:h-[450px] md:w-[60px] lg:w-[70px] xl:w-[80px]"
        }
      `}
      onMouseEnter={onSelect}
      onClick={onSelect}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src =
            "/media/unsplash/photo-1517694712202-14dd9538aa97-3b3f9c.jpg";
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-base md:text-lg font-semibold whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${isActive
            ? "bottom-6 left-6 rotate-0 translate-x-0 translate-y-0"
            : "md:rotate-90 md:bottom-24 md:left-1/2 md:-translate-x-1/2 md:translate-y-0"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main Courses Component ---
export default function Courses() {
  // Edited under Homepage, Courses in the admin panel.
  const content = useHomeCoursesContent();
  const accordionItems: AccordionItemData[] = content.items.map((item, i) => ({
    id: i + 1,
    title: item.title,
    subtitle: item.subtitle,
    desc: item.description,
    imageUrl: item.image,
    duration: item.duration,
  }));
  const [activeIndex, setActiveIndex] = useState(0); // For desktop view (default B.Pharm/D.Pharm)
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(0); // For mobile view accordion

  const navigate = useNavigate();

  // An address set in the panel opens that page (another site in a new tab);
  // without one the button scrolls down to the admissions band.
  const onApply = () => {
    const href = content.buttonHref;
    if (href) {
      if (href.startsWith("/")) navigate(href);
      else window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    const el = document.getElementById("admissions");
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.start();
        (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const activeItem = accordionItems[activeIndex] || accordionItems[0];

  return (
    <div className="bg-white font-sans" id="courses">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Left Side: Text Content */}
          <div className="w-full md:w-[45%] text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#112815]/5 text-[#112815] text-xs font-bold uppercase tracking-widest rounded-full mb-4 md:mb-6">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              {content.eyebrow}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#112815] font-bold leading-tight mb-4 md:mb-8">
              {content.heading}
            </h2>

            {/* Phone-only instruction for using the tiles. It is part of the
                layout, not content, so it is fixed here rather than edited in the
                panel, where it read as a box of its own. */}
            <p className="text-slate-600 text-sm leading-relaxed mb-6 md:hidden">
              {DEFAULT_HOME_COURSES.mobileHint}
            </p>

            {/* Dynamic Card for Active Course - DESKTOP ONLY */}
            <div className="hidden md:flex min-h-[160px] flex-col justify-start transition-all duration-500 ease-in-out">
              <h3 className="text-2xl md:text-3xl font-serif text-[#1C592F] font-bold mb-3 transition-colors duration-300">
                {activeItem.title} - <span className="text-[#112815]">{activeItem.subtitle}</span>
              </h3>
              <p className="text-[#112815]/80 leading-relaxed font-sans text-sm md:text-base font-medium transition-opacity duration-300">
                <RichText text={activeItem.desc} />
              </p>
            </div>

            {/* Desktop Apply Button */}
            <div className="hidden md:block mt-8">
              <button
                onClick={onApply}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#112815] text-[#112815] hover:text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-xl shadow-[#D4AF37]/25 cursor-pointer select-none active:scale-95"
              >
                {content.buttonLabel}
              </button>
            </div>
          </div>

          {/* Right Side: Courses Presentation */}
          <div className="w-full md:w-[55%] flex justify-center">
            {/* --- DESKTOP VIEW: Horizontal Image Accordion --- */}
            <div className="hidden md:flex flex-row items-center justify-center gap-4 p-4 w-full">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onSelect={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* --- MOBILE VIEW: Vertical Course Boxes with Information Directly Below --- */}
            <div className="flex flex-col gap-3.5 w-full md:hidden">
              {accordionItems.map((item, index) => {
                const isExpanded = activeMobileIndex === index;

                return (
                  <div key={item.id} className="w-full flex flex-col">
                    {/* Clickable Course Box Header */}
                    <div
                      onClick={() => {
                        setActiveMobileIndex((prev) => (prev === index ? null : index));
                        setActiveIndex(index);
                      }}
                      className={`
                        relative w-full rounded-2xl overflow-hidden cursor-pointer
                        transition-all duration-300 select-none
                        ${isExpanded
                          ? "ring-2 ring-[#1a5d2e] shadow-md"
                          : "border border-slate-200/90 shadow-xs hover:border-[#1a5d2e]/40"
                        }
                      `}
                    >
                      <div className="relative h-[90px] sm:h-[105px] w-full">
                        {/* Background Image */}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "/media/unsplash/photo-1517694712202-14dd9538aa97-3b3f9c.jpg";
                          }}
                        />

                        {/* Dark Gradient Overlay */}
                        <div
                          className={`absolute inset-0 transition-colors duration-300 ${isExpanded ? "bg-[#112815]/80" : "bg-black/60 hover:bg-black/50"
                            }`}
                        />

                        {/* Text & Icon in Box Header */}
                        <div className="absolute inset-0 p-4 flex items-center justify-between">
                          <div className="space-y-1 pr-2 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-white text-lg sm:text-xl font-serif font-bold tracking-tight">
                                {item.title}
                              </span>
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs border border-white/20 whitespace-nowrap">
                                {item.duration.split(" ")[0]} {item.duration.split(" ")[1] || ""}
                              </span>
                            </div>
                            <p className="text-slate-200 text-xs font-sans font-medium line-clamp-1 truncate">
                              {item.subtitle}
                            </p>
                          </div>

                          {/* Expansion Chevron Indicator */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded
                                ? "bg-[#D4AF37] text-[#112815] rotate-180 shadow-xs"
                                : "bg-white/20 text-white backdrop-blur-xs"
                                }`}
                            >
                              <ChevronDown size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Information Appearing Directly Below the Clicked Box (Mobile View Only) */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key={`course-info-${item.id}`}
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            y: 0,
                            transition: {
                              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.25, delay: 0.05, ease: "easeOut" },
                              y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                            }
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            y: -6,
                            transition: {
                              height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.15, ease: "easeIn" },
                              y: { duration: 0.2, ease: "easeIn" }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-1">
                            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-start text-left">
                              <h3 className="text-xl sm:text-2xl font-serif text-[#1C592F] font-bold mb-3 leading-snug">
                                {item.title} - <span className="text-[#112815]">{item.subtitle}</span>
                              </h3>
                              <p className="text-[#112815]/80 leading-relaxed font-sans text-sm sm:text-base font-medium mb-6">
                                <RichText text={item.desc} />
                              </p>
                              <div>
                                <button
                                  onClick={onApply}
                                  className="w-full sm:w-auto px-7 py-3.5 bg-[#D4AF37] hover:bg-[#112815] text-[#112815] hover:text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md shadow-[#D4AF37]/25 cursor-pointer select-none active:scale-95 text-center flex items-center justify-center"
                                >
                                  {content.buttonLabel}
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

