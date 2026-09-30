import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ExternalLink,
  Search,
  Filter,
  Copy,
  Check,
  Info,
  RotateCcw
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useScholarshipsContent } from "../../hooks/useScholarshipsContent";

export default function Scholarships() {
  const content = useScholarshipsContent();
  const [activeTab, setActiveTab] = useState<"organizations" | "awarded">("organizations");

  // Organizations Tab State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Awarded Tab State
  const [awardedSearch, setAwardedSearch] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedScheme, setSelectedScheme] = useState<string>("ALL");
  const [selectedClass, setSelectedClass] = useState<string>("ALL");

  const orgs = content.organizations;
  const awarded = content.awarded;

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredOrgs = useMemo(() => {
    return orgs.items.filter((org) => {
      const matchesCat = selectedCategory === "ALL" || org.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        org.organization.toLowerCase().includes(q) ||
        org.name.toLowerCase().includes(q) ||
        org.website.toLowerCase().includes(q) ||
        org.degreeApplicable.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [orgs.items, searchQuery, selectedCategory]);

  const filteredAwardedStudents = useMemo(() => {
    return awarded.items.filter((item) => {
      const matchesYear = selectedYear === "ALL" || item.academicYear === selectedYear;
      const matchesScheme = selectedScheme === "ALL" || item.category === selectedScheme;
      const matchesClass = selectedClass === "ALL" || item.classLevel.trim() === selectedClass;

      const q = awardedSearch.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.studentName.toLowerCase().includes(q) ||
        item.academicYear.toLowerCase().includes(q) ||
        item.classLevel.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.scholarshipAgency.toLowerCase().includes(q) ||
        item.amount.toString().includes(q);

      return matchesYear && matchesScheme && matchesClass && matchesSearch;
    });
  }, [awarded.items, awardedSearch, selectedYear, selectedScheme, selectedClass]);

  // What the filters currently add up to. The registry's own total arrives
  // already worked out; this one moves with the filters.
  const totalAmountFiltered = useMemo(() => {
    return filteredAwardedStudents.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredAwardedStudents]);

  const resetAwardedFilters = () => {
    setAwardedSearch("");
    setSelectedYear("ALL");
    setSelectedScheme("ALL");
    setSelectedClass("ALL");
  };

  return (
    <SubPageLayout
      title={content.pageTitle}
      subtitle={content.pageSubtitle}
      category="students-corner"
      activeItemLabel="Scholorships"
    >
      <div className="space-y-8 max-w-7xl mx-auto py-2">
        {/* ── TOP INTERACTIVE TAB BAR ── */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="inline-flex gap-8 sm:gap-12">
            <button
              type="button"
              onClick={() => setActiveTab("organizations")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${activeTab === "organizations"
                ? "text-[#1a5d2e]"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span>{content.tabs.organizations}</span>
              {activeTab === "organizations" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("awarded")}
              className={`relative pb-3 text-sm sm:text-base font-sans font-semibold transition-all cursor-pointer ${activeTab === "awarded"
                ? "text-[#1a5d2e]"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <div className="flex items-center gap-2">
                <span>{content.tabs.awarded}</span>
                {/* Counted from the register, never typed beside it. */}
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#1a5d2e] text-[11px] font-mono font-bold">
                  {content.awardedCount}
                </span>
              </div>
              {activeTab === "awarded" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d2e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* ── TAB 1: SCHOLARSHIP ORGANIZATIONS TABLE ── */}
        {activeTab === "organizations" && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="relative flex-1 min-w-[260px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={orgs.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 border border-slate-200 focus:border-[#1a5d2e] focus:ring-2 focus:ring-[#1a5d2e]/20 outline-hidden transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-1 flex items-center gap-1">
                  <Filter size={12} />
                  <span>{orgs.filterLabel}</span>
                </span>
                {/* The chips are the filters the panel keeps, plus the one that clears them. */}
                {["ALL", ...orgs.categories].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${selectedCategory === cat
                      ? "bg-[#1a5d2e] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {cat === "ALL" ? orgs.allLabel : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Organizations Table Container */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-700 text-xs sm:text-[13px] font-sans font-bold">
                      <th className="py-4 px-5 sm:px-6 w-[28%]">Organization</th>
                      <th className="py-4 px-5 sm:px-6 w-[36%]">Name of Scholarship</th>
                      <th className="py-4 px-5 sm:px-6 w-[36%]">Website</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-sans">
                    {filteredOrgs.map((org, index) => (
                      <tr
                        key={org.id}
                        className={`hover:bg-emerald-50/40 transition-colors group ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                          }`}
                      >
                        {/* Organization */}
                        <td className="py-4 px-5 sm:px-6 align-top">
                          <div className="font-semibold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                            {org.organization}
                          </div>
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10.5px] font-mono font-medium border border-slate-200/60">
                            {org.category}
                          </span>
                        </td>

                        {/* Name of Scholarship */}
                        <td className="py-4 px-5 sm:px-6 align-top">
                          <div className="text-slate-800 font-medium leading-relaxed">
                            {org.name}
                          </div>
                          {org.degreeApplicable && (
                            <div className="text-[11px] text-slate-500 font-sans mt-1">
                              Applicable for: <span className="font-medium text-slate-700">{org.degreeApplicable}</span>
                            </div>
                          )}
                        </td>

                        {/* Website URL */}
                        <td className="py-4 px-5 sm:px-6 align-top">
                          <div className="flex items-start justify-between gap-2">
                            <a
                              href={org.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2b6cb0] hover:text-[#1a4f8a] hover:underline font-mono text-xs sm:text-[12.5px] break-all leading-relaxed flex items-center gap-1 group/link"
                            >
                              <span>{org.website}</span>
                              <ExternalLink size={12} className="shrink-0 opacity-70 group-hover/link:opacity-100 transition-opacity" />
                            </a>

                            <button
                              type="button"
                              onClick={() => copyUrl(org.id, org.website)}
                              title="Copy URL"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
                            >
                              {copiedId === org.id ? (
                                <Check size={13} className="text-emerald-600" />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredOrgs.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center py-12 text-slate-500 text-sm">
                          {orgs.emptyMessage.replaceAll("{query}", searchQuery)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── HELPFUL NOTICE & INSTRUCTIONS ── */}
            {(orgs.notice.heading || orgs.notice.cards.length > 0) && (
              <div className="rounded-2xl bg-[#fbf9f4] border border-[#d4af37]/30 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-[#d4af37]/20 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a5d2e] text-[#d4af37] flex items-center justify-center shrink-0">
                    <Info size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-slate-900">
                      {orgs.notice.heading}
                    </h4>
                    <p className="text-xs text-slate-600 font-sans">
                      {orgs.notice.blurb}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
                  {orgs.notice.cards.map((card, index) => (
                    <div key={index} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-800 font-mono text-[11px] text-[#1a5d2e]">
                        • {card.title}
                      </div>
                      <p>{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: SCHOLARSHIP AWARDED SECTION ── */}
        {activeTab === "awarded" && (
          <div className="space-y-6">
            {/* Top Overview KPI Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0c2411] via-[#12361a] to-[#1a4b24] p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-[#D4AF37]/30">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider">
                        {awarded.kicker}
                      </span>
                      {/* The span of the register, worked out from the years in it. */}
                      {awarded.range && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                          {awarded.range}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white">
                      {awarded.heading}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                      {awarded.blurb}
                    </p>
                  </div>
                </div>

                {/* Quick Academic Years Pills */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-white/60 mr-1">{awarded.yearFilterLabel}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedYear("ALL")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${selectedYear === "ALL"
                      ? "bg-[#D4AF37] text-slate-950 shadow-xs"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                  >
                    {awarded.allYearsLabel.replaceAll("{count}", String(content.awardedCount))}
                  </button>
                  {awarded.years.map((yr) => (
                    <button
                      key={yr.value}
                      type="button"
                      onClick={() => setSelectedYear(yr.value)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${selectedYear === yr.value
                        ? "bg-[#D4AF37] text-slate-950 shadow-xs"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                        }`}
                    >
                      {yr.value} ({yr.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter and Search Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search */}
                <div className="relative md:col-span-4">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={awardedSearch}
                    onChange={(e) => setAwardedSearch(e.target.value)}
                    placeholder={awarded.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 border border-slate-200 focus:border-[#1a5d2e] focus:ring-2 focus:ring-[#1a5d2e]/20 outline-hidden transition-all"
                  />
                </div>

                {/* Scheme Filter */}
                <div className="md:col-span-4">
                  <select
                    value={selectedScheme}
                    onChange={(e) => setSelectedScheme(e.target.value)}
                    aria-label="Filter by scholarship scheme"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 text-slate-700 border border-slate-200 focus:border-[#1a5d2e] focus:ring-2 focus:ring-[#1a5d2e]/20 outline-hidden transition-all cursor-pointer"
                  >
                    <option value="ALL">
                      {awarded.allSchemesLabel.replaceAll("{count}", String(awarded.schemes.length))}
                    </option>
                    {awarded.schemes.map((sch) => (
                      <option key={sch.value} value={sch.value}>
                        {sch.value}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Class Filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    aria-label="Filter by class level"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 text-slate-700 border border-slate-200 focus:border-[#1a5d2e] focus:ring-2 focus:ring-[#1a5d2e]/20 outline-hidden transition-all cursor-pointer"
                  >
                    <option value="ALL">{awarded.allClassesLabel}</option>
                    {awarded.classes.map((cls) => (
                      <option key={cls.value} value={cls.value}>
                        {cls.value}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset Filters */}
                <div className="md:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={resetAwardedFilters}
                    title="Reset Filters"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer w-full flex items-center justify-center"
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-100 gap-2">
                <div>
                  {awarded.showingLabel
                    .replaceAll("{count}", String(filteredAwardedStudents.length))
                    .replaceAll("{total}", String(content.awardedCount))}
                  {selectedYear !== "ALL" && <span> • Year: <strong className="text-[#1a5d2e]">{selectedYear}</strong></span>}
                  {selectedScheme !== "ALL" && <span> • Scheme: <strong className="text-[#1a5d2e]">{selectedScheme}</strong></span>}
                </div>
                <div>
                  {awarded.sumLabel}{" "}
                  <strong className="text-[#1a5d2e] font-bold">₹{totalAmountFiltered.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>

            {/* Official Table */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider">
                      <th className="py-4 px-4 sm:px-5 w-[11%]">Academic Year</th>
                      <th className="py-4 px-4 sm:px-5 w-[24%]">Name of the Students</th>
                      <th className="py-4 px-4 sm:px-5 w-[14%]">Class</th>
                      <th className="py-4 px-4 sm:px-5 w-[25%]">Category / Scheme</th>
                      <th className="py-4 px-4 sm:px-5 w-[12%] text-right">Amount</th>
                      <th className="py-4 px-4 sm:px-5 w-[14%]">Scholarship Agency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px] font-sans">
                    {filteredAwardedStudents.map((item, index) => {
                      const isHighAmount = item.amount >= awarded.highAmountFrom;
                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-emerald-50/50 transition-colors group ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                            }`}
                        >
                          {/* Academic Year */}
                          <td className="py-3.5 px-4 sm:px-5 align-top">
                            <span className="inline-block px-2 py-0.5 rounded bg-slate-100 group-hover:bg-[#1a5d2e] group-hover:text-white font-mono text-[11px] font-bold text-slate-700 transition-colors">
                              {item.academicYear}
                            </span>
                          </td>

                          {/* Name of the Students */}
                          <td className="py-3.5 px-4 sm:px-5 align-top">
                            <div className="font-semibold text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                              {item.studentName}
                            </div>
                          </td>

                          {/* Class */}
                          <td className="py-3.5 px-4 sm:px-5 align-top">
                            <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {item.classLevel}
                            </span>
                          </td>

                          {/* Category / Scheme */}
                          <td className="py-3.5 px-4 sm:px-5 align-top">
                            <div className="text-slate-800 font-medium leading-snug">
                              {item.category}
                            </div>
                          </td>

                          {/* Amount, formatted by the API */}
                          <td className="py-3.5 px-4 sm:px-5 align-top text-right">
                            <span
                              className={`font-mono font-bold text-xs sm:text-[13px] px-2 py-0.5 rounded ${isHighAmount
                                ? "bg-emerald-100 text-[#1a5d2e]"
                                : "bg-slate-100 text-slate-800"
                                }`}
                            >
                              {item.amountFormatted}
                            </span>
                          </td>

                          {/* Scholarship Agency */}
                          <td className="py-3.5 px-4 sm:px-5 align-top">
                            <div className="text-xs text-slate-600 leading-snug">
                              {item.scholarshipAgency}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredAwardedStudents.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-16 text-slate-500 text-sm">
                          <p className="font-medium">{awarded.emptyMessage}</p>
                          <button
                            type="button"
                            onClick={resetAwardedFilters}
                            className="mt-2 text-xs font-mono font-bold text-[#1a5d2e] hover:underline cursor-pointer"
                          >
                            {awarded.resetLabel}
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}
