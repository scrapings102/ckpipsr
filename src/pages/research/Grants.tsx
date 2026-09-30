import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Calendar, 
  Building2, 
  User, 
  IndianRupee, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  Tag, 
  Landmark,
  BadgeCheck,
  Layers,
  Clock
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useResearchGrants, type GrantTone } from "../../hooks/useResearchGrants";

/** The card badge colours a filter can choose from. */
const TONE_CLASSES: Record<GrantTone, string> = {
  emerald: "bg-emerald-50 text-[#1a5d2e] border border-emerald-200",
  purple: "bg-purple-50 text-purple-800 border border-purple-200",
  blue: "bg-blue-50 text-blue-800 border border-blue-200",
  amber: "bg-amber-50 text-amber-800 border border-amber-200",
};

export default function Grants() {
  const content = useResearchGrants();
  // "" is the button that clears the filter; the rest are filter ids.
  const [filter, setFilter] = useState("");

  const filteredGrants = filter
    ? content.grants.filter((item) => item.filterId === filter)
    : content.grants;

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="Research - Grants"
    >
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Header Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Landmark size={26} />
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

            {content.intro.badgeSuffix && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                  <BadgeCheck size={14} />
                  <span>
                    {content.total} {content.intro.badgeSuffix}
                  </span>
                </span>
              </div>
            )}
          </div>

          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            {content.intro.body}
          </p>

          {/* Filter Pills — the panel decides which buttons these are. */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {content.intro.filterLabel && (
              <span className="text-xs font-mono font-semibold text-slate-400 mr-2">
                {content.intro.filterLabel}
              </span>
            )}
            <button
              onClick={() => setFilter("")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                filter === ""
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {content.intro.allLabel} ({content.total})
            </button>
            {content.filters.map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                  filter === item.id
                    ? "bg-[#1a5d2e] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grants Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrants.map((item, index) => {
            const tone = content.filters.find((f) => f.id === item.filterId)?.tone ?? "emerald";
            const hasAmount = !!item.amount;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Top Header: Badge & Sr No */}
                  <div className="flex items-center justify-between gap-2">
                    {item.badge && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${TONE_CLASSES[tone]}`}
                      >
                        <Tag size={12} />
                        <span>{item.badge}</span>
                      </span>
                    )}

                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Program Title */}
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider mb-1">
                      Program Title
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#1a5d2e] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  {/* Program Details List */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs sm:text-sm font-sans">
                    
                    {/* Date */}
                    <div className="flex items-start gap-2.5 text-slate-700">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Date / Duration</span>
                        <span className="font-semibold text-slate-800 font-mono text-xs">{item.date}</span>
                      </div>
                    </div>

                    {/* Sponsoring Agency */}
                    <div className="flex items-start gap-2.5 text-slate-700">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Sponsoring Agency</span>
                        <span className="font-semibold text-slate-900">{item.agency}</span>
                      </div>
                    </div>

                    {/* Amount Sanctioned */}
                    <div className="flex items-start gap-2.5 text-slate-700">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        hasAmount ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        <IndianRupee size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Amount Sanctioned</span>
                        {hasAmount ? (
                          <span className="font-bold text-[#1a5d2e] font-mono text-sm">
                            ₹ {item.amount}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium italic">
                            {content.noAmountText}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer: Coordinator */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold text-xs border border-emerald-200">
                      <User size={15} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Co-ordinator</span>
                      <span className="text-xs font-bold text-slate-900 font-sans">{item.coordinator}</span>
                    </div>
                  </div>

                  {item.status && (
                    <span className="text-[11px] font-mono text-emerald-700 font-bold px-2 py-0.5 rounded-md bg-emerald-50">
                      {item.status}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
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
