import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Sparkles,
  Target,
  BookOpen,
  GraduationCap,
  Users,
  Search,
  CheckCircle2,
  Award,
  Layers,
  Briefcase,
  Building2,
  BarChart3,
  Leaf,
  Zap,
  Globe2,
  MessageSquare,
  FileText,
  Trophy,
  HeartHandshake,
  Calendar,
  Compass,
  TrendingUp,
  Cpu,
  Clock
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import {
  useIqacInitiativesContent,
  type InitiativeTone,
} from "../../hooks/useIqacInitiativesContent";

/** The icons a card can carry; the panel offers these same names. */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  FileText,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Layers,
  Leaf,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
};

/** A heading's colour, which its cards' icon and tag both follow. */
const ICON_TONE: Record<InitiativeTone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  amber: "bg-amber-50 text-amber-800 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  emerald: "bg-emerald-50 text-[#1a5d2e] border-emerald-200",
};

const TAG_TONE: Record<InitiativeTone, string> = {
  blue: "bg-blue-50/60 text-blue-700 border-blue-100",
  purple: "bg-purple-50/60 text-purple-700 border-purple-100",
  amber: "bg-amber-50/60 text-amber-800 border-amber-100",
  rose: "bg-rose-50/60 text-rose-700 border-rose-100",
  emerald: "bg-emerald-50/60 text-[#1a5d2e] border-emerald-100",
};

export default function IQACInitiatives() {
  const content = useIqacInitiativesContent();
  const { intro, filters, empty, banner } = content;

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const query = searchQuery.toLowerCase();
  const filteredInitiatives = content.initiatives.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesCategory && item.text.toLowerCase().includes(query);
  });

  // The first pill shows everything; the rest arrive already counted.
  const pills = [
    { id: "All", label: filters.allLabel, count: content.initiativeCount },
    ...filters.categories.map((c) => ({ id: c.id, label: c.filterLabel, count: c.count })),
  ];

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="iqac"
      activeItemLabel="IQAC Initiatives and Activities"
    >
      <div className="space-y-10 max-w-6xl mx-auto">
        
        {/* Top Hero & Scope Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <ShieldCheck size={26} />
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

          {/* Scope Narrative Provided by User */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-slate-50 to-white border border-emerald-200/70 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Sparkles size={14} className="text-[#1a5d2e]" />
              <span>{intro.overview.kicker}</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              {intro.overview.body}
            </p>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {intro.stats.map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <span className="text-xs font-mono text-slate-500 font-medium">{stat.label}</span>
                <span className="text-base font-serif font-bold text-slate-900 mt-1">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header with Search and Category Filters */}
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                {filters.kicker}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {filters.heading}
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={filters.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/20 focus:border-[#1a5d2e] transition-all"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {pills.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-[#1a5d2e] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Initiatives Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence>
              {filteredInitiatives.map((item) => {
                const Icon = ICONS[item.icon];

                return (
                  <motion.div
                    key={item.number}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* Card Header: Icon & ID */}
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${ICON_TONE[item.tone]}`}>
                          {Icon && <Icon size={18} />}
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#1a5d2e] transition-colors">
                          #{item.number}
                        </span>
                      </div>

                      {/* Initiative Description */}
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-sans font-medium text-slate-800 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Category Tag */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${TAG_TONE[item.tone]}`}>
                        {item.categoryName}
                      </span>
                      <CheckCircle2 size={13} className="text-[#1a5d2e]/70" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredInitiatives.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Search size={32} className="mx-auto text-slate-300" />
              <h4 className="text-base font-serif font-bold text-slate-800">{empty.title}</h4>
              <p className="text-xs text-slate-500">{empty.body}</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-xs font-mono font-bold text-[#1a5d2e] hover:underline cursor-pointer"
              >
                {empty.resetLabel}
              </button>
            </div>
          )}
        </div>

        {/* Quality Assurance Assurance Banner */}
        <div className="bg-gradient-to-br from-[#1a5d2e] via-[#1e6f37] to-[#144723] rounded-3xl p-6 sm:p-8 text-white shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                <Sparkles size={14} />
                <span>{banner.kicker}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {banner.heading}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-emerald-100 leading-relaxed">
                {banner.body}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {banner.stats.map((stat, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center"
                >
                  <span className="block text-2xl font-serif font-bold text-white">{stat.value}</span>
                  <span className="text-[11px] font-mono text-emerald-200 uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
