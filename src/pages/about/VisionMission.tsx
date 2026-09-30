import React from "react";
import { motion } from "motion/react";
import {
  Award,
  BookOpen,
  Compass,
  Eye,
  Heart,
  Leaf,
  Rocket,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useVisionMissionContent } from "../../hooks/useVisionMissionContent";

/**
 * The icons an editor can choose from for the core values — the other half of
 * VALUE_ICONS in the API's schema. The vision and mission cards keep their own
 * fixed icons: they are the page's two structural halves, not a list.
 */
const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  ShieldCheck,
  Rocket,
  Heart,
  Compass,
  Eye,
  Award,
  Sparkles,
  Target,
  Users,
  Leaf,
  BookOpen,
  Scale,
};

export default function VisionMission() {
  const content = useVisionMissionContent();

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="about-us"
      activeItemLabel="Vision and Mission"
    >
      <div className="space-y-12">
        {/* REFINED VISION & MISSION BENTO GRID */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-lg mx-auto lg:max-w-none w-full">

          {/* Vision Card - Refined */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#123a1a] rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden shadow-lg flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -mr-24 -mt-24 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none" />

            <div className="relative z-10 space-y-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#D4AF37] mx-auto group-hover:scale-105 transition-transform duration-300">
                  <Eye size={22} />
                </div>
                <h2 className="text-xs font-black text-white/50 uppercase tracking-[0.25em] font-mono text-center">
                  {content.vision.label}
                </h2>
              </div>

              <blockquote className="relative px-2 sm:px-4">
                <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-white leading-relaxed tracking-wide text-center uppercase">
                  {content.vision.statement}
                </p>
              </blockquote>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 mt-6 flex items-center justify-center gap-2.5">
               <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#123a1a] shrink-0">
                  <Award size={16} />
               </div>
               <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wider leading-tight text-left">
                 {content.vision.footnoteLead} <br />
                 <span className="text-[#D4AF37]">{content.vision.footnoteAccent}</span>
               </p>
            </div>
          </motion.div>

          {/* Mission Card - Refined */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF8F3] rounded-2xl border border-[#D4AF37]/20 p-5 sm:p-6 md:p-8 shadow-md flex flex-col justify-between group"
          >
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#123a1a] flex items-center justify-center text-[#D4AF37] shadow-md shadow-[#123a1a]/10 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <Rocket size={22} />
                </div>
                <h2 className="text-xs font-black text-[#123a1a]/40 uppercase tracking-[0.25em] font-mono text-center">
                  {content.mission.label}
                </h2>
              </div>

              <div className="space-y-4">
                {content.mission.items.map((mission, mIdx) => (
                  <div key={mIdx} className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-center sm:items-start text-center sm:text-left group/item">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#D4AF37]/30 flex items-center justify-center shrink-0 font-bold font-mono text-[#123a1a] shadow-sm group-hover/item:bg-[#123a1a] group-hover/item:text-[#D4AF37] transition-all duration-300 text-xs">
                      {mIdx + 1}
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 font-serif font-bold leading-relaxed pt-0.5">
                      {mission}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-6 flex items-center justify-center gap-2.5">
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Target size={16} />
               </div>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight text-left">
                 {content.mission.footnoteLead} <br />
                 <span className="text-[#123a1a]">{content.mission.footnoteAccent}</span>
               </p>
            </div>
          </motion.div>
        </div>

        {/* REFINED CORE VALUES */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
              {content.values.eyebrow}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
              {content.values.title}
            </h3>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-lg mx-auto sm:max-w-none w-full">
            {content.values.items.map((val, idx) => {
              const Icon = ICONS[val.icon] ?? Sparkles;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="p-4 rounded-xl bg-white border border-slate-100 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-105 transition-transform pointer-events-none" />

                  <div className="space-y-3 relative z-10">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-[#123a1a] w-10 h-10 flex items-center justify-center group-hover:bg-[#123a1a] group-hover:text-[#D4AF37] transition-all duration-300 shadow-inner shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-slate-900 text-sm group-hover:text-[#123a1a] transition-colors">
                        {val.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* INSPIRATIONAL CTA */}
        <div className="bg-[#FAF8F3] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-10 relative overflow-hidden group text-center max-w-lg mx-auto lg:max-w-none w-full">
           <div className="absolute top-0 left-0 w-[24rem] h-[24rem] bg-[#D4AF37]/5 rounded-full blur-[80px] -ml-20 -mt-20 pointer-events-none" />

           <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <Sparkles className="text-[#D4AF37] w-8 h-8 mx-auto" />
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight tracking-tight">
                {content.cta.headingLead} <br />
                <span className="text-[#123a1a]">{content.cta.headingAccent}</span>
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                {content.cta.body}
              </p>
           </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
