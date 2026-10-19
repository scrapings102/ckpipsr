import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Beaker, 
  BookOpen, 
  Trophy, 
  Home, 
  HeartPulse, 
  Bus, 
  Mic2, 
  Coffee, 
  Cpu, 
  Zap, 
  Leaf,
  FlaskConical,
  Microscope,
  Wifi,
  Dumbbell,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { useResourcesOverviewContent } from "../../hooks/useResourcesOverviewContent";
import SubPageLayout from "../../components/SubPageLayout";
import { iconFor } from "../../utils/iconFor";
import { cdn } from "../../utils/image";
import { RichText } from "../../utils/RichText";

/** The icons a tile can name in the admin panel. Keep in step with RESOURCE_ICONS there. */
const RESOURCE_ICONS: Record<string, LucideIcon> = {
  Beaker, BookOpen, Trophy, Home, HeartPulse, Bus, Mic2, Coffee,
  Cpu, Zap, Leaf, Building2, FlaskConical, Microscope, Wifi, Dumbbell,
};

/** Tags in the closing section take these icons in turn. */
const TAG_ICONS: LucideIcon[] = [Building2, CheckCircle2, Sparkles];

export default function Resources() {
  const navigate = useNavigate();
  // Edited under Academics, Resources in the admin panel.
  const content = useResourcesOverviewContent();

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="academics"
      activeItemLabel="Resources"
    >
      <div className="space-y-24">
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -left-10 top-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-6 relative z-10">
            {content.intro.eyebrow && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[10px] font-bold uppercase tracking-widest border border-[#123a1a]/10">
                {content.intro.eyebrow}
              </div>
            )}
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0c2411] tracking-tight">
              {content.intro.heading}
            </h2>
            <div className="h-1.5 w-24 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-lg leading-relaxed font-medium">
              <RichText text={content.intro.body} />
            </p>
          </div>
        </section>

        {/* Resources Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {content.tiles.map((resource, idx) => {
             const Icon = iconFor(resource.icon, RESOURCE_ICONS, Building2);
             return (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.05, duration: 0.5 }}
               onClick={() => navigate(resource.path)}
               className="group cursor-pointer bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/20 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[320px]"
             >
               {/* Background Glow */}
               <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
               
               <div className="space-y-6">
                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={28} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-[#123a1a] transition-colors">{resource.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3 italic">
                       "<RichText text={resource.description} />"
                    </p>
                 </div>
               </div>

               <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#123a1a] uppercase tracking-[0.2em]">
                     <span>{content.tileLinkLabel}</span>
                     <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <Building2 size={16} className="text-slate-200 group-hover:text-[#D4AF37] transition-colors" />
               </div>
             </motion.div>
           );
           })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="bg-[#123a1a] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <img src={cdn(content.cta.image || "/images/hero/college_campus.jpg", 1600, 90)} className="w-full h-full object-cover" />
           </div>
           
           <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">{content.cta.heading}</h3>
                <p className="text-slate-300 max-w-xl mx-auto text-lg leading-relaxed">
                   <RichText text={content.cta.body} />
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                {content.cta.tags.map((label, tIdx) => ({ label, icon: TAG_ICONS[tIdx % TAG_ICONS.length] })).map((tag, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                     <tag.icon size={16} className="text-[#D4AF37]" />
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest">{tag.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                 {[
                   { button: content.cta.primary, className: "px-10 py-5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-950/20 active:scale-95" },
                   { button: content.cta.secondary, className: "px-10 py-5 rounded-2xl bg-[#123a1a] text-[#D4AF37] border border-[#D4AF37]/20 font-bold text-sm hover:bg-[#1a4a25] transition-all shadow-xl shadow-black/30 active:scale-95" },
                 ].map(({ button, className }, bIdx) =>
                   // A button given a link in the panel goes there; one without is left
                   // out, since pressing it would do nothing.
                   !button.url ? null : button.url.startsWith("https://") ? (
                     <a key={bIdx} href={button.url} target="_blank" rel="noopener noreferrer" className={className}>{button.label}</a>
                   ) : (
                     <button key={bIdx} type="button" onClick={() => navigate(button.url)} className={className}>
                       {button.label}
                     </button>
                   ),
                 )}
              </div>
           </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
