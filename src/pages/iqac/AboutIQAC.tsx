import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Target,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  BarChart3,
  Users,
  Search,
  GraduationCap,
  Database,
  FileCheck2,
  Compass,
  Lightbulb,
  Building2,
  Cpu,
  TrendingUp,
  Share2
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useIqacAboutContent } from "../../hooks/useIqacAboutContent";

/**
 * The icons a card may carry. The panel offers these names; anything else
 * draws nothing, so the two lists are the contract between the apps.
 */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Award,
  Layers,
  GraduationCap,
  Users,
  Share2,
  BookOpen,
  FileText,
  ShieldCheck,
  Database,
  Search,
  FileCheck2,
  BarChart3,
  Target,
  Compass,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  Building2,
  Cpu,
  TrendingUp,
};

/** The two colours the banner's cards come in. */
const TONES: Record<string, string> = {
  emerald: "bg-emerald-500/20 text-emerald-400",
  amber: "bg-amber-500/20 text-amber-400",
};

export default function AboutIQAC() {
  const content = useIqacAboutContent();
  const { overview, vision, objectives, functions, banner } = content;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="iqac"
      activeItemLabel="About IQAC"
    >
      <div className="space-y-12 max-w-6xl mx-auto">
        
        {/* Top Hero & Overview Card with Campus Imagery */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 p-7 sm:p-9 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#1a5d2e]" />
                  <span>{overview.badge}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  {overview.heading}
                </h2>

                <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed">
                  {overview.body}
                </p>
              </div>

              {/* Quality Key Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                {overview.facts.map((fact, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl bg-slate-50 border border-slate-100${
                      i === overview.facts.length - 1 && overview.facts.length % 2 === 1
                        ? " col-span-2 sm:col-span-1"
                        : ""
                    }`}
                  >
                    <span className="text-[11px] font-mono text-slate-400 block font-semibold">{fact.label}</span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-slate-800">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[360px] bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
              <img
                src={overview.photo.src}
                alt={overview.photo.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 mb-1">
                  <Building2 size={14} />
                  <span>{overview.photo.badge}</span>
                </div>
                <p className="text-xs font-sans text-slate-200 font-medium">
                  {overview.photo.caption}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* IQAC Vision Section */}
        <div className="bg-gradient-to-br from-[#1a5d2e] via-[#1e6f37] to-[#144723] rounded-3xl p-7 sm:p-9 text-white shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs font-mono font-bold uppercase tracking-wider text-emerald-100">
              <Sparkles size={14} className="text-amber-300" />
              <span>{vision.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {vision.heading}
            </h3>

            <blockquote className="text-base sm:text-lg lg:text-xl font-serif font-normal text-emerald-50 leading-relaxed italic border-l-3 border-amber-400 pl-4 py-1">
              {vision.quote}
            </blockquote>
          </div>
        </div>

        {/* Objectives Section with Image Card */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                <Target size={22} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  {objectives.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {objectives.heading}
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-center">
              {objectives.countLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Image Showcase Card */}
            <div className="lg:col-span-4 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
              <div className="relative h-56 sm:h-64 lg:h-72 w-full bg-slate-100">
                <img
                  src={objectives.showcase.src}
                  alt={objectives.showcase.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                    {objectives.showcase.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 bg-gradient-to-b from-white to-slate-50 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                    {objectives.showcase.title}
                  </h4>
                  <p className="text-xs font-sans text-slate-600 leading-relaxed">
                    {objectives.showcase.body}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs font-sans text-[#1a5d2e] font-semibold">
                  <CheckCircle2 size={15} />
                  <span>{objectives.showcase.footnote}</span>
                </div>
              </div>
            </div>

            {/* Right Objectives Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {objectives.items.map((obj) => (
                <div
                  key={obj.number}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 space-y-2.5 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#1a5d2e] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        Objective {obj.number}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-[#1a5d2e]/40 group-hover:bg-[#1a5d2e] transition-colors" />
                    </div>

                    <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                      {obj.title}
                    </h4>

                    <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed font-normal">
                      {obj.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-sans text-slate-400">
                    <CheckCircle2 size={12} className="text-[#1a5d2e]" />
                    <span>{objectives.footnote}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Functions Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-bold">
                <Layers size={22} className="text-amber-800" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider block">
                  {functions.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {functions.heading}
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 self-start sm:self-center">
              {functions.countLabel}
            </span>
          </div>

          {/* Functions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {functions.items.map((func) => {
              const Icon = ICONS[func.icon];
              return (
                <div
                  key={func.number}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-700 group-hover:text-[#1a5d2e] border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center transition-colors">
                        {Icon && <Icon size={18} />}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#1a5d2e] transition-colors">
                        #{func.number}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-serif font-bold text-slate-900 text-base group-hover:text-[#1a5d2e] transition-colors">
                        {func.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed font-normal">
                        {func.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-sans text-slate-400">
                    <Sparkles size={12} className="text-amber-500" />
                    <span>{functions.footnote}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Laboratory & Research Infrastructure Supporting Quality Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 overflow-hidden relative border border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-mono font-bold border border-white/15 uppercase">
                <Cpu size={14} />
                <span>{banner.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {banner.heading}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed max-w-2xl">
                {banner.body}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              {banner.cards.map((card, i) => {
                const Icon = ICONS[card.icon];
                return (
                  <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${TONES[card.tone] ?? TONES.emerald} flex items-center justify-center shrink-0`}>
                      {Icon && <Icon size={18} />}
                    </div>
                    <div className="text-xs font-sans">
                      <strong className="text-white block font-semibold">{card.title}</strong>
                      <span className="text-slate-400">{card.description}</span>
                    </div>
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
