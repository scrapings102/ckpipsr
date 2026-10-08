import React from "react";
import { motion } from "motion/react";
import {
  FileText,
  ExternalLink,
  Download,
  ShieldCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  Eye
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useIqacMomsContent, type MomTone } from "../../hooks/useIqacMomsContent";

/** The icons a summary tile can carry; the panel offers these same names. */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Calendar,
  ShieldCheck,
  FileText,
  FileCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
};

/** A tile's colour. */
const TILE: Record<MomTone, string> = {
  emerald: "bg-emerald-100 text-[#1a5d2e]",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  amber: "bg-amber-100 text-amber-800",
  rose: "bg-rose-100 text-rose-700",
};

export default function MoMsAndATR() {
  const content = useIqacMomsContent();
  const { intro, archive, quick, empty } = content;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="iqac"
      activeItemLabel="MoMs and ATR"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <FileCheck size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  {intro.kicker}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  {intro.heading}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                {intro.countLabel}
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                {intro.badge}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
            {intro.body}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {intro.stats.map((stat, i) => {
              const Icon = ICONS[stat.icon];
              return (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                >
                  <div className={`w-9 h-9 rounded-lg ${TILE[stat.tone]} flex items-center justify-center shrink-0`}>
                    {Icon && <Icon size={18} />}
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-semibold">{stat.title}</strong>
                    <span className="text-slate-500">{stat.note}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Five Interactive Buttons / Cards Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                {archive.kicker}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {archive.heading}
              </h3>
            </div>
            <span className="text-xs font-sans text-slate-500 hidden sm:block">
              {archive.hint}
            </span>
          </div>

          {content.records.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <FileCheck size={32} className="mx-auto text-slate-300" />
              <h4 className="text-base font-serif font-bold text-slate-800">{empty.title}</h4>
              <p className="text-xs text-slate-500">{empty.body}</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 gap-4">
            {content.records.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="group relative bg-white hover:bg-gradient-to-r hover:from-emerald-50/40 hover:via-white hover:to-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/50 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#1a5d2e] group-hover:bg-[#1a5d2e] group-hover:text-white border border-slate-200 group-hover:border-[#1a5d2e] flex items-center justify-center shrink-0 transition-colors duration-300 shadow-2xs">
                      <FileText size={22} />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors">
                          {doc.title}
                        </h4>
                        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                          {doc.academicYear}
                        </span>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {archive.fileLabel}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed max-w-2xl">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Button / Action */}
                  <div className="flex items-center gap-2 shrink-0 sm:self-center">
                    {doc.hasFile ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1a5d2e] hover:bg-[#154a24] text-white text-xs font-mono font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
                      >
                        <Eye size={15} />
                        <span>{doc.openLabel}</span>
                        <ExternalLink size={13} className="opacity-80" />
                      </a>
                    ) : (
                      <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 text-xs font-mono font-bold select-none">
                        <Clock size={15} />
                        <span>{archive.missingLabel}</span>
                      </span>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>

        {/* Quick Direct Buttons Row — only worth showing once something links somewhere. */}
        {content.fileCount > 0 && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-bold text-slate-900">
              {quick.title}
            </h4>
            <p className="text-xs text-slate-600">
              {quick.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {content.records.filter((doc) => doc.hasFile).map((doc) => (
              <a
                key={`quick-${doc.id}`}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-[#1a5d2e] border border-slate-200 hover:border-emerald-300 text-xs font-mono font-bold transition-all shadow-2xs cursor-pointer group"
              >
                <FileText size={14} className="text-[#1a5d2e]" />
                <span>{doc.title}</span>
                <ExternalLink size={12} className="text-slate-400 group-hover:text-[#1a5d2e]" />
              </a>
            ))}
          </div>
        </div>
        )}

      </div>
    </SubPageLayout>
  );
}
