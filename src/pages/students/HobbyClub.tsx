import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Palette,
  Camera,
  Heart,
  Sparkles,
  FileText,
  ShieldCheck,
  Users,
  Award,
  Compass,
  Target,
  Layers,
  HeartHandshake,
  Lightbulb,
  Music,
  Smile,
  ArrowRight,
  Cpu,
  BookOpen,
  Trophy,
  Mic,
  Brush,
  Leaf,
  Globe
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useHobbyClubContent } from "../../hooks/useHobbyClubContent";

type IconType = React.ComponentType<{ size?: number; className?: string }>;

/** The icons the panel offers, by name. */
const ICONS: Record<string, IconType> = {
  Target,
  Sparkles,
  Compass,
  Lightbulb,
  HeartHandshake,
  Layers,
  Smile,
  Users,
  Award,
  Cpu,
  Palette,
  Camera,
  Heart,
  Music,
  ShieldCheck,
  FileText,
  BookOpen,
  Trophy,
  Mic,
  Brush,
  Leaf,
  Globe
};

export default function HobbyClub() {
  const [activeTab, setActiveTab] = useState<"about" | "clubs" | "rules">("about");
  const content = useHobbyClubContent();

  const aimsAndObjectives = content.about.aims.items;
  const variousClubsData = content.clubs.items;
  const rulesAndRegulations = content.rules.items;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="students-corner"
      activeItemLabel="Hobby Club"
    >
      <div className="space-y-8 max-w-7xl mx-auto py-2">
        {/* ── TOP THREE-TAB NAVIGATOR ── */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="inline-flex gap-6 sm:gap-12">
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "about"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>{content.tabs.about}</span>
              {activeTab === "about" && (
                <motion.div
                  layoutId="hobbyTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("clubs")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "clubs"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{content.tabs.clubs}</span>
                {/* Counted from the clubs themselves, never typed beside them. */}
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#1a5d2e] text-[11px] font-mono font-bold">
                  {content.clubCount}
                </span>
              </div>
              {activeTab === "clubs" && (
                <motion.div
                  layoutId="hobbyTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("rules")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "rules"
                  ? "text-[#1a5d2e]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>{content.tabs.rules}</span>
              {activeTab === "rules" && (
                <motion.div
                  layoutId="hobbyTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* ── TAB 1: ABOUT ── */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Primary Overview Box */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-9 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Compass size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      {content.about.kicker}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {content.about.heading}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-sans bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-100">
                  {content.about.intro}
                </p>

                {/* Aims and Objectives Section */}
                <div className="pt-4 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-6 bg-[#1a5d2e] rounded-full" />
                      <h4 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                        {content.about.aims.heading}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {content.about.aims.countLabel}
                    </span>
                  </div>

                  {/* The numbered points, in a professional bento grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                    {aimsAndObjectives.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all group flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* The number follows the order in the panel. */}
                          <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#1a5d2e] group-hover:text-white text-slate-700 font-mono font-bold text-sm flex items-center justify-center shrink-0 transition-colors">
                            {index + 1}
                          </span>
                          <div className="space-y-1">
                            <span className="text-[10.5px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                              {item.highlight}
                            </span>
                            <p className="text-xs sm:text-[13.5px] font-medium text-slate-800 leading-snug group-hover:text-slate-900">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-[#0c2411] to-[#1a5d2e] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-[#D4AF37]/30">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#D4AF37] text-xs font-mono uppercase font-bold">
                  {content.about.banner.badge}
                </span>
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {content.about.banner.heading}
                </h4>
                <p className="text-white/80 text-xs sm:text-sm max-w-xl">
                  {content.about.banner.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("clubs")}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-slate-950 text-xs sm:text-sm font-sans font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{content.about.banner.exploreLabel}</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("rules")}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-sans font-bold border border-white/20 transition-colors cursor-pointer"
                >
                  {content.about.banner.rulesLabel}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: VARIOUS CLUBS DIRECTORY ── */}
        {activeTab === "clubs" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* 2-Column Professional Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {variousClubsData.map((club) => {
                const IconComp = ICONS[club.icon] ?? Sparkles;
                return (
                  <div
                    key={club.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#1a5d2e]/30 transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Card Header with Title, Icon & Badge */}
                    <div className="p-6 sm:p-7 pb-4 flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1a5d2e] shadow-2xs group-hover:scale-105 transition-transform">
                          <IconComp size={22} />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#1a5d2e] transition-colors">
                            {club.title}
                          </h4>
                          {content.clubs.cardKicker && (
                            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                              {content.clubs.cardKicker}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-semibold shrink-0">
                        {club.badge}
                      </span>
                    </div>

                    {/* Card Body with Framed Image and Description */}
                    <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col">
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950/5 border border-slate-200 shadow-inner">
                        <img
                          src={club.image}
                          alt={club.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/20">
                          {club.title}
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm leading-relaxed font-sans text-justify md:text-left flex-1">
                        {club.description}
                      </p>
                    </div>

                    {/* Bottom Status Ribbon */}
                    <div className="px-6 sm:px-7 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
                      <div className="flex items-center gap-1.5 text-[#1a5d2e] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{content.clubs.ribbon.left}</span>
                      </div>
                      <span className="text-slate-500">{content.clubs.ribbon.right}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: RULES AND REGULATIONS ── */}
        {activeTab === "rules" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    {content.rules.kicker}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    {content.rules.heading}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rulesAndRegulations.map((item, index) => {
                  const IconComponent = ICONS[item.icon] ?? ShieldCheck;
                  return (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#1a5d2e] text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 font-mono font-bold text-sm transition-colors shadow-2xs">
                        {index + 1}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                            {item.highlight}
                          </span>
                          <IconComponent size={15} className="text-slate-400 group-hover:text-[#1a5d2e] transition-colors" />
                        </div>
                        <p className="text-xs sm:text-[13.5px] text-slate-800 leading-relaxed font-sans font-medium">
                          {item.rule}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Support Desk Box */}
            <div className="bg-[#fbf9f4] border border-[#d4af37]/40 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a5d2e] text-[#d4af37] flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-sm text-slate-900">
                    {content.rules.support.title}
                  </h5>
                  <p className="text-xs text-slate-600 font-sans">
                    {content.rules.support.body}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-[#1a5d2e] shrink-0 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                Email: {content.rules.support.email}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </SubPageLayout>
  );
}
