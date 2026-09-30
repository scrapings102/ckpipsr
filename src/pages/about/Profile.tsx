import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  BookOpen,
  Building,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Leaf,
  Microscope,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useProfileContent } from "../../hooks/useProfileContent";

/**
 * The icons an editor can choose from — the other half of PROFILE_ICONS in the
 * API's schema. The panel only offers these names and the API refuses anything
 * else, so an unknown value should be impossible; Award is the fallback because
 * a missing icon should be a wrong picture rather than a crash.
 */
const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  GraduationCap,
  Building,
  Award,
  FlaskConical,
  BookOpen,
  Microscope,
  Users,
  ShieldCheck,
  Leaf,
  Sparkles,
};

/** The two colourways the highlight cards alternate between. */
const TONES: Record<string, string> = {
  dark: "bg-[#123a1a] text-[#D4AF37]",
  gold: "bg-[#D4AF37] text-[#123a1a]",
};

export default function Profile() {
  const content = useProfileContent();
  const { slides, rotationMs } = content.showcase;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slides.length);
    }, rotationMs);
    return () => clearInterval(timer);
  }, [isPaused, slides.length, rotationMs]);

  // The fetched list can be shorter than the fallback, which would otherwise
  // leave the index past its end and render nothing.
  useEffect(() => {
    setCurrentImageIndex((prev) => (prev < slides.length ? prev : 0));
  }, [slides.length]);

  const handlePrev = () =>
    setCurrentImageIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrentImageIndex((prev) => (prev + 1) % slides.length);

  const slide = slides[currentImageIndex] ?? slides[0];

  // The opening paragraph is set with its first letter as a drop cap. Splitting
  // it here keeps the whole sentence editable as one field, rather than asking
  // an editor to supply the letter and the rest separately.
  const [lead = "", ...restOfBody] = content.body;
  const dropCap = lead.slice(0, 1);
  const leadRest = lead.slice(1);

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="Profile"
    >
      <div className="space-y-20">
        {/* EDITORIAL INTRODUCTION SECTION */}
        <section className="relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-black uppercase tracking-[0.2em] border border-[#123a1a]/10">
                {content.eyebrow}
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight tracking-tight">
                {content.headingLead} <br />
                <span className="text-[#123a1a]">{content.headingAccent}</span>
              </h2>
              <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full" />

              <div className="text-slate-600 leading-relaxed font-medium text-lg space-y-6">
                <p>
                  <span className="float-left text-7xl font-serif font-bold text-[#D4AF37] mr-4 mt-2 leading-[0.6]">
                    {dropCap}
                  </span>
                  {leadRest}
                </p>
                {restOfBody.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Auto-scrolling Campus Image Showcase - Refined Bento Style */}
            <div className="lg:sticky lg:top-24">
              <section
                className="relative rounded-[3rem] overflow-hidden border border-slate-200 group shadow-2xl bg-[#FAF8F3] transform hover:scale-[1.02] transition-all duration-700"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={slide.url}
                      alt={slide.title}
                      initial={{ opacity: 0, scale: 1.15 }}
                      animate={{ opacity: 1, scale: 1.0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2411] via-[#0c2411]/20 to-transparent pointer-events-none" />

                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <span className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-xl text-[10px] font-black tracking-widest text-[#D4AF37] uppercase border border-white/20 shadow-2xl">
                      Showcase {currentImageIndex + 1} / {slides.length}
                    </span>

                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-9 h-9 rounded-full bg-black/30 hover:bg-[#D4AF37] backdrop-blur-xl text-white hover:text-[#123a1a] transition-all border border-white/20 flex items-center justify-center shadow-2xl cursor-pointer"
                      aria-label={isPaused ? "Play showcase" : "Pause showcase"}
                    >
                      {isPaused ? <Play size={14} /> : <Pause size={14} />}
                    </button>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-1"
                      >
                        <h3 className="text-2xl font-serif font-bold text-white drop-shadow-2xl">
                          {slide.title}
                        </h3>
                        <p className="text-sm text-[#D4AF37] font-bold uppercase tracking-widest">
                          {slide.subtitle}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="absolute bottom-8 right-8 flex gap-2">
                    <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-black/30 hover:bg-[#D4AF37] backdrop-blur-xl text-white hover:text-[#123a1a] transition-all border border-white/20 flex items-center justify-center shadow-2xl cursor-pointer"><ChevronLeft size={20} /></button>
                    <button onClick={handleNext} className="w-10 h-10 rounded-full bg-black/30 hover:bg-[#D4AF37] backdrop-blur-xl text-white hover:text-[#123a1a] transition-all border border-white/20 flex items-center justify-center shadow-2xl cursor-pointer"><ChevronRight size={20} /></button>
                  </div>
                </div>

                <div className="p-6 text-xs font-black uppercase tracking-widest text-[#123a1a] bg-white border-t border-slate-100 flex items-center justify-between">
                  <span>{content.showcase.captionLeft}</span>
                  <span className="text-[#D4AF37]">{content.showcase.captionRight}</span>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* KEY HIGHLIGHTS SECTION */}
        <section className="grid md:grid-cols-2 gap-8">
          {content.highlights.map((feature, fIdx) => {
            const Icon = ICONS[feature.icon] ?? Award;
            return (
              <motion.div
                key={fIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: fIdx * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6 ${
                      TONES[feature.tone] ?? TONES.dark
                    }`}
                  >
                    <Icon size={28} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed font-medium italic">
                      "{feature.description}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* MILESTONES TIMELINE - REFINED */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                {content.milestonesHeading.title}
              </h3>
              <p className="text-slate-500 font-medium">{content.milestonesHeading.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-slate-100 uppercase tracking-tighter">
                {content.milestonesHeading.watermark}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative p-8 rounded-3xl bg-[#FAF8F3] border border-[#D4AF37]/20 flex flex-col gap-6 group hover:bg-[#123a1a] transition-all duration-500"
              >
                <div className="space-y-1">
                  <span className="text-4xl font-black font-serif text-[#D4AF37] group-hover:text-white transition-colors">
                    {item.year}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                  {item.description}
                </p>
                <div className="h-1.5 w-12 bg-[#D4AF37] rounded-full group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
