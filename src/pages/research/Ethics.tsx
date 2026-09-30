import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Shield,
  Building2,
  UserCheck,
  Users,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  BadgeCheck,
  HeartHandshake,
  Scale,
  AlertTriangle,
  Share2,
  FlaskConical,
  Microscope,
  Eye,
  BookOpen,
  GraduationCap,
  FileText,
  Lock,
  Layers,
  Heart,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useResearchEthics, type EthicsTone } from "../../hooks/useResearchEthics";

type IconType = React.ComponentType<{ size?: number; className?: string }>;

/** The icons the panel offers, by name. */
const ICONS: Record<string, IconType> = {
  Shield,
  ShieldCheck,
  Building2,
  UserCheck,
  Users,
  FileCheck2,
  FileText,
  Sparkles,
  BadgeCheck,
  HeartHandshake,
  Heart,
  Scale,
  AlertTriangle,
  Share2,
  FlaskConical,
  Microscope,
  Eye,
  BookOpen,
  GraduationCap,
  Lock,
  Leaf,
  Layers,
};

/** Each code's colours: its heading tile, its count badge, its cards' icon tiles. */
const TONES: Record<EthicsTone, { tile: string; badge: string }> = {
  emerald: {
    tile: "bg-emerald-50 text-[#1a5d2e]",
    badge: "text-emerald-800 bg-emerald-50 border-emerald-200",
  },
  blue: {
    tile: "bg-blue-50 text-blue-700",
    badge: "text-blue-800 bg-blue-50 border-blue-200",
  },
  amber: {
    tile: "bg-amber-50 text-amber-800",
    badge: "text-amber-800 bg-amber-50 border-amber-200",
  },
  purple: {
    tile: "bg-purple-50 text-purple-700",
    badge: "text-purple-800 bg-purple-50 border-purple-200",
  },
};

export default function Ethics() {
  const content = useResearchEthics();
  // "" shows every code; otherwise the id of the one to show.
  const [activeTab, setActiveTab] = useState("");

  const shownGroups = activeTab
    ? content.groups.filter((g) => g.id === activeTab)
    : content.groups;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="Research - Ethics"
    >
      <div className="space-y-10 max-w-6xl mx-auto">

        {/* Core Banner / Philosophy Card */}
        <motion.div
          id="ethics-intro-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Shield size={26} />
              </div>
              <div>
                {content.intro.kicker && (
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    {content.intro.kicker}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  {content.intro.heading}
                </h3>
              </div>
            </div>

            {content.intro.badge && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                  <BadgeCheck size={14} />
                  <span>{content.intro.badge}</span>
                </span>
              </div>
            )}
          </div>

          {content.intro.body && (
            <div className="bg-emerald-50/40 rounded-2xl border border-emerald-100 p-5 text-slate-700 font-sans text-sm sm:text-base leading-relaxed flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5">
                <FileCheck2 size={18} />
              </div>
              <p>{content.intro.body}</p>
            </div>
          )}

          {/* Filter Pills — one per code of ethics, as the panel lists them. */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {content.intro.filterLabel && (
              <span className="text-xs font-mono font-semibold text-slate-400 mr-2">
                {content.intro.filterLabel}
              </span>
            )}
            <button
              id="filter-all"
              onClick={() => setActiveTab("")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                activeTab === ""
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {content.intro.allLabel} ({content.total}
              {content.intro.allSuffix ? ` ${content.intro.allSuffix}` : ""})
            </button>
            {content.groups.map((group) => (
              <button
                key={group.id}
                id={`filter-${group.id}`}
                onClick={() => setActiveTab(group.id)}
                className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                  activeTab === group.id
                    ? "bg-[#1a5d2e] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {group.buttonLabel} ({group.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* One section per code of ethics */}
        {shownGroups.map((group, groupIndex) => {
          const GroupIcon = ICONS[group.icon] ?? Shield;
          const tone = TONES[group.tone] ?? TONES.emerald;

          return (
            <motion.div
              key={group.id}
              id={`${group.id}-ethics-section`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: groupIndex * 0.1 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${tone.tile}`}>
                    <GroupIcon size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-lg sm:text-xl">
                      {group.title}
                    </h4>
                    {group.subtitle && (
                      <span className="text-xs font-mono text-slate-500">
                        {group.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold border px-2.5 py-1 rounded-lg ${tone.badge}`}>
                  {group.count}
                  {group.countSuffix ? ` ${group.countSuffix}` : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.directives.map((item, idx) => {
                  const IconComponent = ICONS[item.icon] ?? Shield;
                  const number = idx + 1;
                  const footer = group.footer.replace(/\{n\}/g, String(number));

                  return (
                    <motion.div
                      key={item.id}
                      id={`${group.id}-directive-${number}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`bg-white rounded-3xl border ${
                        item.highlight ? "border-amber-200/90 shadow-xs" : "border-slate-200/90"
                      } hover:border-[#1a5d2e]/50 hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-4 group`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-2xl ${
                            item.highlight ? TONES.amber.tile : tone.tile
                          } flex items-center justify-center group-hover:scale-105 transition-transform`}>
                            <IconComponent size={20} />
                          </div>
                          {group.corner === "category" ? (
                            item.category && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] font-semibold">
                                {item.category}
                              </span>
                            )
                          ) : (
                            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                              {number}
                            </span>
                          )}
                        </div>

                        <h5 className="font-serif font-bold text-slate-900 text-base group-hover:text-[#1a5d2e] transition-colors leading-snug">
                          {item.title}
                        </h5>

                        <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>

                        {item.note && (
                          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-sans leading-relaxed mt-2">
                            {group.noteLabel && (
                              <span className="font-bold text-slate-900 block mb-0.5">{group.noteLabel}</span>
                            )}
                            {item.note}
                          </div>
                        )}
                      </div>

                      {footer && (
                        <div
                          className={`pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono ${
                            group.tone === "emerald" ? "text-[#1a5d2e] font-bold" : "text-slate-500 font-medium"
                          }`}
                        >
                          <CheckCircle2 size={13} className="text-[#1a5d2e]" />
                          <span>{footer}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Highlight Banner: 3Rs Principle and IAEC / Institutional Review */}
        {content.banner.heading && (
          <div id="ethics-3rs-card" className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center border border-white/10">
                  <Leaf size={22} />
                </div>
                <div>
                  {content.banner.kicker && (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block font-bold">
                      {content.banner.kicker}
                    </span>
                  )}
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
                    {content.banner.heading}
                  </h4>
                </div>
              </div>
              {content.banner.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-emerald-200 border border-white/10">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>{content.banner.badge}</span>
                </span>
              )}
            </div>

            {content.banner.body && (
              <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                {content.banner.body}
              </p>
            )}
          </div>
        )}

        {/* Institutional Verification Footer */}
        {(content.note.text || content.note.tagline) && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
            {content.note.text && (
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#1a5d2e] shrink-0" />
                <span>{content.note.text}</span>
              </div>
            )}
            {content.note.tagline && (
              <span className="font-mono text-slate-400">{content.note.tagline}</span>
            )}
          </div>
        )}

      </div>
    </SubPageLayout>
  );
}
