import React from "react";
import { motion } from "motion/react";
import {
  FileText,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Calendar,
  FileCheck,
  Building2,
  Award,
  UserCheck,
  Globe,
  Scale,
  BookOpen,
  Info,
  CheckCircle2,
  Lock
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useRtiContent, type RtiTone } from "../../hooks/useRtiContent";

/** The icons a tile or a statement can carry; the panel offers these names. */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Scale,
  Info,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Globe,
  UserCheck,
  FileText,
  FileCheck,
  BookOpen,
  Lock,
  Building2,
  Award,
  Sparkles,
};

/** A tile's colour. */
const TILE: Record<RtiTone, string> = {
  emerald: "bg-emerald-100 text-[#1a5d2e]",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  amber: "bg-amber-100 text-amber-800",
  rose: "bg-rose-100 text-rose-700",
};

export default function RTI() {
  const content = useRtiContent();
  const { intro, officer, portal, quick } = content;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="iqac"
      activeItemLabel="RTI"
    >
      <div className="space-y-10 max-w-5xl mx-auto">

        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Scale size={26} />
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
                {intro.badge}
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                {intro.secondBadge}
              </span>
            </div>
          </div>

          {/* The statements under the heading */}
          {intro.notes.map((note, i) => {
            const Icon = ICONS[note.icon];
            return note.highlighted ? (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/50 via-slate-50 to-white border border-emerald-200/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  {Icon && <Icon size={16} />}
                  <span>{note.label}</span>
                </div>
                <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
                  {note.body}
                </p>
              </div>
            ) : (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                  {Icon && <Icon size={16} className="text-[#1a5d2e]" />}
                  <span>{note.label}</span>
                </div>
                <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
                  {note.body}
                </p>
              </div>
            );
          })}

          {/* Key Pillars */}
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

        {/* Office In-charge Card */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              {officer.kicker}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              {officer.heading}
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-white hover:bg-gradient-to-r hover:from-emerald-50/30 hover:via-white hover:to-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#1a5d2e] border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <UserCheck size={28} />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                    {officer.cardKicker}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    {officer.name}
                  </h4>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-100 p-2 rounded-lg mt-1">
                    {officer.line}
                  </div>
                  {officer.designation && (
                    <div className="text-xs sm:text-sm font-medium text-slate-600">
                      {officer.designation}
                      {officer.organisation ? "," : ""}
                    </div>
                  )}
                  {officer.organisation && (
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">
                      {officer.organisation}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                {officer.badge && (
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-emerald-50 text-[#1a5d2e] border border-emerald-200 self-start sm:self-auto">
                    {officer.badge}
                  </span>
                )}
                {officer.address && (
                  <span className="text-xs text-slate-500">
                    {officer.address}
                  </span>
                )}
              </div>

            </div>
          </motion.div>
        </div>

        {/* Official RTI Portal Callout Card with Button */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              {portal.kicker}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              {portal.heading}
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="bg-gradient-to-br from-[#1a5d2e] to-[#12421f] text-white rounded-3xl p-6 sm:p-9 shadow-md space-y-6 relative overflow-hidden"
          >
            {/* Background Decorative Pattern */}
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                {portal.pill && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/15 text-emerald-200 border border-white/20">
                      {portal.pill}
                    </span>
                  </div>
                )}
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {portal.cardHeading}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  {portal.body}
                </p>
                {/* The address itself is underlined wherever it falls in the line. */}
                <div className="pt-1 text-xs font-mono text-emerald-200">
                  {portal.urlLabel.includes(portal.url) ? (
                    <>
                      {portal.urlLabel.slice(0, portal.urlLabel.indexOf(portal.url))}
                      <span className="underline font-bold">{portal.url}</span>
                      {portal.urlLabel.slice(portal.urlLabel.indexOf(portal.url) + portal.url.length)}
                    </>
                  ) : (
                    portal.urlLabel
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#1a5d2e] text-xs sm:text-sm font-mono font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 text-center"
                >
                  <Globe size={16} />
                  <span>{portal.buttonLabel}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Direct Link Access Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-bold text-slate-900">
              {quick.title}
            </h4>
            <p className="text-xs text-slate-600">
              {quick.body}
            </p>
          </div>

          <div>
            <a
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-900 hover:text-[#1a5d2e] border border-slate-200 hover:border-emerald-300 text-xs sm:text-sm font-mono font-bold transition-all shadow-2xs cursor-pointer group"
            >
              <Scale size={16} className="text-[#1a5d2e]" />
              <span>{quick.label}</span>
              <ExternalLink size={13} className="text-slate-400 group-hover:text-[#1a5d2e]" />
            </a>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
