import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Handshake,
  Building2,
  Calendar,
  MapPin,
  FileText,
  Sparkles,
  BadgeCheck,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Hospital,
  Zap,
  Search,
  Award,
  Layers,
  FlaskConical,
  Leaf,
  Globe,
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useResearchMous, type MouTone } from "../../hooks/useResearchMous";

type IconType = React.ComponentType<{ size?: number; className?: string }>;

/** The icons the panel offers a sector, by name. */
const ICONS: Record<string, IconType> = {
  GraduationCap,
  Building2,
  Hospital,
  Sparkles,
  Zap,
  Handshake,
  Briefcase,
  FlaskConical,
  Award,
  Layers,
  Leaf,
  Globe,
};

/** Each sector colour: the card's pill and the card's hover border. */
const THEMES: Record<MouTone, { badge: string; borderHover: string }> = {
  emerald: { badge: "bg-emerald-50 text-[#1a5d2e] border-emerald-200", borderHover: "hover:border-[#1a5d2e]/50" },
  rose: { badge: "bg-rose-50 text-rose-700 border-rose-200", borderHover: "hover:border-rose-500/50" },
  blue: { badge: "bg-blue-50 text-blue-700 border-blue-200", borderHover: "hover:border-blue-500/50" },
  amber: { badge: "bg-amber-50 text-amber-800 border-amber-200", borderHover: "hover:border-amber-500/50" },
  teal: { badge: "bg-teal-50 text-teal-800 border-teal-200", borderHover: "hover:border-teal-500/50" },
  purple: { badge: "bg-purple-50 text-purple-700 border-purple-200", borderHover: "hover:border-purple-500/50" },
  slate: { badge: "bg-slate-50 text-slate-700 border-slate-200", borderHover: "hover:border-slate-400" },
};

/** The four figure boxes, left to right. */
const STAT_BOXES = [
  { box: "bg-emerald-50/60 border-emerald-100", label: "text-emerald-800", value: "text-[#1a5d2e]", caption: "text-emerald-700" },
  { box: "bg-rose-50/60 border-rose-100", label: "text-rose-800", value: "text-rose-950", caption: "text-rose-700" },
  { box: "bg-blue-50/60 border-blue-100", label: "text-blue-800", value: "text-blue-950", caption: "text-blue-700" },
  { box: "bg-amber-50/60 border-amber-100", label: "text-amber-800", value: "text-amber-950", caption: "text-amber-800" },
];

export default function MOUs() {
  const content = useResearchMous();
  // "" is the button that clears the filter; the rest are sector ids.
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMOUs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return content.mous.filter((item) => {
      const matchesSector = !selectedSector || item.sectorId === selectedSector;
      const matchesSearch =
        item.organization.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.effectiveFrom.includes(searchQuery);
      return matchesSector && matchesSearch;
    });
  }, [content.mous, selectedSector, searchQuery]);

  const sectorOf = (id: string) => content.sectors.find((s) => s.id === id);

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="research-and-innovation"
      activeItemLabel="Research - MOUs"
    >
      <div className="space-y-8 max-w-6xl mx-auto">

        {/* Header Overview Card */}
        <motion.div
          id="mou-header-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Handshake size={26} />
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

          {/* Quick Metrics Bar */}
          {content.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {content.stats.map((stat, i) => {
                const look = STAT_BOXES[i % STAT_BOXES.length];
                return (
                  <div key={i} className={`p-3.5 rounded-2xl border ${look.box}`}>
                    <span className={`text-[11px] font-mono uppercase font-bold block ${look.label}`}>
                      {stat.label}
                    </span>
                    <p className={`text-xl sm:text-2xl font-serif font-bold mt-0.5 ${look.value}`}>{stat.value}</p>
                    {stat.caption && (
                      <span className={`text-[11px] font-sans ${look.caption}`}>{stat.caption}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Search & Sector Filter Controls */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">

              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={content.intro.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#1a5d2e] focus:ring-2 focus:ring-emerald-100 bg-slate-50/50 font-sans"
                />
              </div>

              {/* Counter status */}
              <span className="text-xs font-mono text-slate-500">
                Showing <strong className="text-slate-800">{filteredMOUs.length}</strong> of {content.total} MOUs
              </span>
            </div>

            {/* Filter Pills — the panel decides which sectors these are. */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {content.intro.filterLabel && (
                <span className="text-xs font-mono font-semibold text-slate-400 mr-1.5">
                  {content.intro.filterLabel}
                </span>
              )}
              {[
                { label: content.intro.allLabel, value: "", count: content.total },
                ...content.sectors.map((s) => ({ label: s.label, value: s.id, count: s.count })),
              ].map((btn) => (
                <button
                  key={btn.value || "all"}
                  onClick={() => setSelectedSector(btn.value)}
                  className={`px-3 py-1 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === btn.value
                      ? "bg-[#1a5d2e] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {btn.label} ({btn.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMOUs.map((item, index) => {
            const sector = sectorOf(item.sectorId);
            const theme = THEMES[sector?.tone ?? "slate"] ?? THEMES.slate;
            const SectorIcon = (sector && ICONS[sector.icon]) || Handshake;
            const number = content.mous.indexOf(item) + 1;

            return (
              <motion.div
                key={item.id}
                id={`mou-card-${number}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`bg-white rounded-3xl border border-slate-200/90 ${theme.borderHover} hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 space-y-5 group`}
              >
                <div className="space-y-4">
                  {/* Top Header: Badge & Number */}
                  <div className="flex items-center justify-between gap-2">
                    {sector ? (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${theme.badge}`}
                      >
                        <SectorIcon size={18} />
                        <span>{sector.label}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                      #{number}
                    </span>
                  </div>

                  {/* Organization Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                      Partner Organization / Company
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#1a5d2e] transition-colors leading-snug">
                      {item.organization}
                    </h4>
                  </div>

                  {/* Location Pin */}
                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs font-sans text-slate-500">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {/* Purpose Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#1a5d2e] flex items-center gap-1 tracking-wider">
                      <FileText size={11} />
                      <span>Scope & Purpose of MOU</span>
                    </span>
                    <p className="text-xs sm:text-sm font-sans font-medium text-slate-800 leading-relaxed">
                      {item.purpose}
                    </p>
                  </div>

                  {/* Highlight Chips */}
                  {item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.highlights.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Effective Date */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0">
                      <Calendar size={13} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Effective From</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{item.effectiveFrom}</span>
                    </div>
                  </div>

                  {item.status && (
                    <span className="text-[11px] font-mono text-emerald-700 font-bold px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                      {item.status}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredMOUs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Handshake size={36} className="mx-auto text-slate-300" />
            <h4 className="font-serif font-bold text-slate-800 text-lg">No MOUs Found</h4>
            <p className="text-sm font-sans text-slate-500">
              {searchQuery
                ? `No memorandums matched your query "${searchQuery}". Try searching with different terms.`
                : "No memorandums are listed under this sector yet."}
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedSector(""); }}
              className="mt-2 px-4 py-2 bg-[#1a5d2e] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
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
