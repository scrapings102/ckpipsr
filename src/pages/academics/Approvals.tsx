import React from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  FileText,
  Download,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  Award,
  Landmark,
  GraduationCap,
  Zap,
  type LucideIcon
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useApprovalsContent } from "../../hooks/useApprovalsContent";

/** Card colours, by the name the panel stores. */
const COLORS: Record<string, { tile: string; icon: string }> = {
  blue: { tile: "bg-blue-500", icon: "text-blue-500" },
  emerald: { tile: "bg-emerald-500", icon: "text-emerald-500" },
  orange: { tile: "bg-orange-500", icon: "text-orange-500" },
  purple: { tile: "bg-purple-500", icon: "text-purple-500" },
  rose: { tile: "bg-rose-500", icon: "text-rose-500" },
  cyan: { tile: "bg-cyan-500", icon: "text-cyan-500" },
  slate: { tile: "bg-slate-500", icon: "text-slate-500" }
};

/** Compliance-box icons, by the name the panel stores. */
const STAT_ICONS: Record<string, LucideIcon> = {
  Building2,
  Award,
  Sparkles,
  Zap,
  ShieldCheck,
  FileText,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Landmark
};

export default function Approvals() {
  const content = useApprovalsContent();

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="academics"
      activeItemLabel="Approvals"
    >
      <div className="space-y-10">
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -left-10 top-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
              {content.intro.badge}
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2411] tracking-tight">
              {content.intro.heading}
            </h2>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-sm leading-relaxed font-medium">
              {content.intro.body}
            </p>
          </div>
        </section>

        {/* Approvals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.approvals.map((approval, idx) => {
            const color = COLORS[approval.color] ?? COLORS.slate;
            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${color.tile} bg-opacity-10 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform`}>
                   <ShieldCheck className={color.icon} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">{approval.status}</span>
                </div>
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                 <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">
                    {approval.body}
                 </h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
                    {approval.description}
                 </p>
                 <div className="flex items-center gap-1.5 pt-1">
                    <Calendar size={12} className="text-[#D4AF37]" />
                    <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">Validity: {approval.validity}</span>
                 </div>
              </div>

              {approval.letters.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                   {approval.letters.map((letter, lIdx) => {
                     const row = (
                       <>
                         <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
                               <FileText size={14} />
                            </div>
                            <div className="min-w-0">
                               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Public Notice</p>
                               <p className="text-xs font-bold text-slate-800 truncate">{letter.name}</p>
                            </div>
                         </div>
                         <Download size={14} className="text-slate-300 group-hover/link:text-[#D4AF37] transition-colors shrink-0" />
                       </>
                     );

                     // A letter with no file yet is still listed, but nothing to open.
                     return letter.url ? (
                       <a
                         key={lIdx}
                         href={letter.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-amber-50/20 border border-slate-100 hover:border-[#D4AF37]/30 rounded-xl transition-all group/link"
                       >
                         {row}
                       </a>
                     ) : (
                       <div
                         key={lIdx}
                         title="This letter is not published yet."
                         className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl opacity-60"
                       >
                         {row}
                       </div>
                     );
                   })}
                </div>
              )}
            </motion.div>
            );
          })}
        </div>

        {/* Global Compliance Stats */}
        <div className="bg-[#123a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl">
           <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <img src="/images/hero/college_campus.jpg" className="w-full h-full object-cover" />
           </div>

           <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">{content.compliance.title}</h3>
                <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
                   {content.compliance.body}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                 {content.compliance.stats.map((stat, sIdx) => {
                   const Icon = STAT_ICONS[stat.icon] ?? ShieldCheck;
                   return (
                   <div key={sIdx} className="bg-white/5 backdrop-blur-md px-4 py-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-all">
                      <Icon className="mx-auto mb-2 text-[#D4AF37]" size={20} />
                      <span className="block text-lg font-serif font-bold text-white mb-0.5">{stat.value}</span>
                      <span className="text-[8.5px] text-slate-400 uppercase font-black tracking-wider">{stat.label}</span>
                   </div>
                   );
                 })}
              </div>
           </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
