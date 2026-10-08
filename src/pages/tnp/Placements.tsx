import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Building2,
  Users,
  UserCheck,
  Calendar,
  IndianRupee,
  Briefcase,
  Award,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Layers,
  FileSpreadsheet
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import SubPageLayout from "../../components/SubPageLayout";
import {
  usePlacementsContent,
  type PlacementYear
} from "../../hooks/usePlacementsContent";
export default function Placements() {
  const content = usePlacementsContent();
  const { kpis, trend, charts, directory, recruiters } = content;
  const drives = content.drives;
  const years = content.years;
  const availableYears = content.availableYears;

  const navigate = useNavigate();
  const [selectedBreakdownYear, setSelectedBreakdownYear] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"graphical" | "records">("graphical");

  // The pills come from the data, so the chosen year follows them: whichever
  // is first stays selected until someone picks another, and a year that is
  // removed no longer leaves the charts empty.
  const activeYear =
    selectedBreakdownYear && availableYears.includes(selectedBreakdownYear)
      ? selectedBreakdownYear
      : (availableYears[0] ?? "");

  const recordsForSelectedYear = useMemo(
    () => drives.filter((r) => r.year === activeYear),
    [drives, activeYear]
  );

  // Chart data for Company-wise Participation & Selection. The short name and
  // the rate are both worked out on the server.
  const participationChartData = useMemo(
    () =>
      recordsForSelectedYear.map((item) => ({
        fullName: item.company,
        name: item.shortName,
        appeared: item.participated,
        selected: item.recruited,
        rate: item.rate
      })),
    [recordsForSelectedYear]
  );

  // Ranked placement rate for horizontal bar chart
  const rankedRateChartData = useMemo(
    () => [...participationChartData].sort((a, b) => b.rate - a.rate),
    [participationChartData]
  );

  // Graduate Outcomes Distribution for selected year
  const outcomeStats = useMemo(() => {
    const yearTrend = years.find((y) => y.year === activeYear);
    const totalAppeared = yearTrend?.appeared ?? 0;
    const totalSelected = yearTrend?.recruited ?? 0;
    const higherStudies = yearTrend?.higherStudies ?? 0;
    const entrepreneurs = yearTrend?.entrepreneurs ?? 0;
    const internshipCount = recordsForSelectedYear
      .filter((r) => r.isInternship)
      .reduce((acc, c) => acc + c.recruited, 0);

    return {
      totalAppeared,
      totalSelected,
      internshipCount,
      regularOffers: totalSelected - internshipCount,
      higherStudies,
      entrepreneurs,
      otherAspirants: yearTrend?.otherAspirants ?? 0,
      pieData: [
        { name: "Selected", value: totalSelected, color: "#0c2340" },
        { name: "Higher Studies", value: higherStudies, color: "#1e40af" },
        { name: "Entrepreneurs", value: entrepreneurs, color: "#d97706" },
        { name: "Other / Direct Roles", value: yearTrend?.otherAspirants ?? 0, color: "#94a3b8" }
      ].filter((slice) => slice.value > 0)
    };
  }, [recordsForSelectedYear, activeYear, years]);

  // Filtered drive records for the directory table
  const filteredDirectory = useMemo(
    () =>
      drives.filter(
        (item) =>
          item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.packageDisplay.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [drives, searchQuery]
  );

  return (
    <SubPageLayout
      title="Placements"
      subtitle="Training & Placement Cell – Campus Recruitment Drives & Career Opportunities"
      category="training-and-placement"
      activeItemLabel="Placements"
      hideDefaultBackBar={true}
    >
      <div className="space-y-8 max-w-6xl mx-auto">

        {/* ── TOP HEADER SUB-BAR (MATCHING ATTACHED DESIGN) ── */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-5 gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 hover:text-blue-900 tracking-wider uppercase transition-colors"
          >
            <ArrowLeft size={14} className="stroke-[2.5]" />
            <span>BACK TO HOME</span>
          </Link>
          <div className="text-[11px] font-mono font-medium tracking-widest text-slate-400 uppercase">
            TRAINING-AND-PLACEMENT / C.K.PITHAWALA COLLEGE
          </div>
        </div>

        {/* ── TOP 4 KPI CARDS (MATCHING EXACT ICONS & METRIC FORMAT) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 1: Highest Package */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
              <Award size={24} className="stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 block mb-0.5">
                {kpis.highestLabel}
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                {kpis.highestValue}
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                {kpis.highestNote}
              </span>
            </div>
          </div>

          {/* Card 2: Average Package */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
              <TrendingUp size={24} className="stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 block mb-0.5">
                {kpis.averageLabel}
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                {kpis.averageValue}
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                {kpis.averageNote}
              </span>
            </div>
          </div>

          {/* Card 3: Companies Recruiting */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <Building2 size={24} className="stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 block mb-0.5">
                {kpis.companiesLabel}
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                {kpis.companiesValue}
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                {kpis.companiesNote}
              </span>
            </div>
          </div>

          {/* Card 4: Students Placed */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200/60">
              <Users size={24} className="stroke-[2]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400 block mb-0.5">
                {kpis.placedLabel}
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                {kpis.placedValue}
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                {kpis.placedNote}
              </span>
            </div>
          </div>

        </div>

        {/* ── SALARY PACKAGE TREND (MULTI-LINE & AREA RANGE CHART) ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                {trend.heading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
                {trend.blurb}
              </p>
            </div>

            {/* Custom Interactive Legend matching the exact snapshot */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-0 text-[11px] font-mono text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e40af]" />
                <span className="font-semibold text-slate-800">{trend.avgLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="font-semibold text-slate-800">{trend.maxLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                <span className="font-semibold text-slate-800">{trend.minLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-2 rounded-xs bg-[#10b981]/20 border border-[#10b981]/40" />
                <span className="font-semibold text-slate-800">Min – Max Range</span>
              </div>
            </div>
          </div>

          {/* Graphical Recharts Multi-line & Area Chart */}
          <div className="w-full h-72 sm:h-80 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={years} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="ctcRangeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  stroke="#94a3b8"
                  fontSize={11}
                  fontFamily="monospace"
                  dy={6}
                />
                <YAxis
                  domain={[0, 3]}
                  tickFormatter={(val) => `${val} LPA`}
                  tickLine={false}
                  stroke="#94a3b8"
                  fontSize={11}
                  fontFamily="monospace"
                  dx={-4}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as PlacementYear;
                      return (
                        <div className="bg-[#0c2340] text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs font-sans space-y-1.5">
                          <div className="font-mono font-bold text-amber-400 border-b border-slate-700 pb-1 flex items-center justify-between gap-4">
                            <span>Academic Year: {label}</span>
                            <span className="text-[10px] text-slate-300">{data.keyRecruiter}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                            <div>
                              <span className="text-slate-400 block text-[9.5px]">Max CTC</span>
                              <span className="font-bold text-emerald-400">₹{data.maxCTC} LPA</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px]">Avg CTC</span>
                              <span className="font-bold text-sky-400">₹{data.avgCTC} LPA</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px]">Min CTC</span>
                              <span className="font-bold text-slate-300">₹{data.minCTC} LPA</span>
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-700 flex justify-between">
                            <span>Selections: {data.recruited} / {data.appeared}</span>
                            <span className="text-emerald-400 font-bold">{data.placementRate}% Placed</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {/* Range Area */}
                <Area
                  type="monotone"
                  dataKey="maxCTC"
                  fill="url(#ctcRangeGradient)"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  name="Max CTC"
                  dot={{ r: 4, fill: "#10b981", strokeWidth: 1, stroke: "#ffffff" }}
                  activeDot={{ r: 6 }}
                />
                {/* Average CTC Line */}
                <Line
                  type="monotone"
                  dataKey="avgCTC"
                  stroke="#1e40af"
                  strokeWidth={2.5}
                  name="Average CTC"
                  dot={{ r: 4, fill: "#1e40af", strokeWidth: 1, stroke: "#ffffff" }}
                  activeDot={{ r: 6 }}
                />
                {/* Minimum CTC Line */}
                <Line
                  type="monotone"
                  dataKey="minCTC"
                  stroke="#94a3b8"
                  strokeWidth={1.8}
                  strokeDasharray="4 4"
                  name="Min CTC"
                  dot={{ r: 3, fill: "#94a3b8" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── SELECT ACADEMIC YEAR FOR BREAKDOWN (PILL BUTTONS) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="text-sm sm:text-base font-serif font-bold text-slate-900">
            {charts.pickerLabel}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {availableYears.map((yr) => {
              const isActive = activeYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedBreakdownYear(yr)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${isActive
                    ? "bg-[#0c2340] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TWO COLUMN CHARTS (PARTICIPATION & RANKED PLACEMENT RATE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Chart: Branch/Company-wise Participation & Selection */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug">
                  {charts.participationTitle.replace("{year}", activeYear)}
                </h4>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Total students appeared and selected across recruitment drives
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                  <span className="text-slate-600">{charts.appearedLabel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0c2340]" />
                  <span className="text-slate-600">{charts.selectedLabel}</span>
                </div>
              </div>
            </div>

            <div className="w-full h-64 pt-2">
              {participationChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={participationChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      stroke="#94a3b8"
                      fontSize={10}
                      fontFamily="sans-serif"
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis
                      tickLine={false}
                      stroke="#94a3b8"
                      fontSize={11}
                      fontFamily="monospace"
                    />
                    <Tooltip
                      formatter={(val, name) => [`${val} students`, name === "appeared" ? charts.appearedLabel : charts.selectedLabel]}
                      labelFormatter={(label) => `Company: ${label}`}
                      contentStyle={{ backgroundColor: "#0c2340", borderRadius: "10px", color: "#fff", border: "none", fontSize: "11px" }}
                    />
                    <Bar dataKey="appeared" fill="#60a5fa" radius={[4, 4, 0, 0]} maxBarSize={32} />
                    <Bar dataKey="selected" fill="#0c2340" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  No records found for this year
                </div>
              )}
            </div>
          </div>

          {/* Right Chart: Placement Rate by Branch/Company (Horizontal ranked bars) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-snug">
                {charts.rateTitle.replace("{year}", activeYear)}
              </h4>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Percentage of appeared students placed (ranked descending)
              </p>
            </div>

            <div className="w-full h-64 pt-2">
              {rankedRateChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={rankedRateChartData}
                    margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                      tickLine={false}
                      stroke="#94a3b8"
                      fontSize={10}
                      fontFamily="monospace"
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tickLine={false}
                      stroke="#475569"
                      fontSize={10}
                      fontFamily="sans-serif"
                      width={90}
                    />
                    <Tooltip
                      formatter={(val) => [`${val}% Selection Rate`, "Rate"]}
                      labelFormatter={(label) => `Recruiter: ${label}`}
                      contentStyle={{ backgroundColor: "#0c2340", borderRadius: "10px", color: "#fff", border: "none", fontSize: "11px" }}
                    />
                    <Bar
                      dataKey="rate"
                      fill="#0c2340"
                      radius={[0, 4, 4, 0]}
                      maxBarSize={20}
                      label={{
                        position: "right",
                        fill: "#0c2340",
                        fontSize: 10,
                        fontWeight: 600,
                        formatter: (val: any) => `${val}%`
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  No records found for this year
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── GRADUATE OUTCOMES / SELECTION DISTRIBUTION CARD ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-5">
          <div>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 leading-snug">
              {charts.outcomesTitle.replace("{year}", activeYear)}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
              Breakdown among Placements, Higher Studies, Entrepreneurship, and Other career trajectories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

            {/* Left Donut Chart */}
            <div className="md:col-span-5 flex items-center justify-center h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={outcomeStats.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {outcomeStats.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name) => [`${val} students`, name]}
                    contentStyle={{ backgroundColor: "#0c2340", borderRadius: "10px", color: "#fff", border: "none", fontSize: "11px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Right Metric Stack */}
            <div className="md:col-span-7 space-y-2.5">

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#0c2340]" />
                  <span className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
                    Selected
                  </span>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                  {outcomeStats.totalSelected} students
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#1e40af]" />
                  <span className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
                    Higher Studies
                  </span>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                  {outcomeStats.higherStudies} students
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#d97706]" />
                  <span className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
                    Entrepreneurs
                  </span>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                  {outcomeStats.entrepreneurs} students
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#94a3b8]" />
                  <span className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
                    Other / Not recorded
                  </span>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                  {outcomeStats.otherAspirants} students
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* ── CTC PACKAGE STATISTICS (LPA) TABLE (MATCHING ATTACHED DESIGN) ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
              {charts.ctcTableHeading}
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0c2340] text-white text-[11px] font-mono uppercase tracking-wider">
                  <th className="py-3.5 px-5 font-semibold">Year</th>
                  <th className="py-3.5 px-5 font-semibold">Minimum CTC</th>
                  <th className="py-3.5 px-5 font-semibold">Average CTC</th>
                  <th className="py-3.5 px-5 font-semibold">Maximum CTC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-mono">
                {years.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">{row.year}</td>
                    <td className="py-3.5 px-5 text-slate-700">₹{row.minCTC.toFixed(2)} LPA</td>
                    <td className="py-3.5 px-5 font-bold text-blue-700">₹{row.avgCTC.toFixed(2)} LPA</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-700">₹{row.maxCTC.toFixed(2)} LPA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── OVERALL PLACEMENT STATISTICS TABLE (MATCHING ATTACHED DESIGN) ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
              {charts.statsTableHeading}
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0c2340] text-white text-[11px] font-mono uppercase tracking-wider">
                  <th className="py-3.5 px-5 font-semibold">Academic Year</th>
                  <th className="py-3.5 px-5 font-semibold">Total Students</th>
                  <th className="py-3.5 px-5 font-semibold">Appeared</th>
                  <th className="py-3.5 px-5 font-semibold">Selected</th>
                  <th className="py-3.5 px-5 font-semibold">% Selected</th>
                  <th className="py-3.5 px-5 font-semibold">Higher Studies</th>
                  <th className="py-3.5 px-5 font-semibold">Entrepreneurs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-mono">
                {years.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">{row.year}</td>
                    <td className="py-3.5 px-5 text-slate-600">{row.totalStudents}</td>
                    <td className="py-3.5 px-5 text-slate-700">{row.appeared}</td>
                    <td className="py-3.5 px-5 font-bold text-blue-700">{row.recruited}</td>
                    <td className="py-3.5 px-5 font-bold text-emerald-700">{row.placementRate.toFixed(2)}%</td>
                    <td className="py-3.5 px-5 text-slate-600">{row.higherStudies}</td>
                    <td className="py-3.5 px-5 text-slate-600">{row.entrepreneurs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── EXISTING RECRUITMENT DRIVES & CORPORATE PARTNERS ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-700 block">
                {directory.kicker}
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                {directory.heading.replace("{count}", String(filteredDirectory.length))}
              </h4>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={directory.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0c2340] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* User Provided Exact Introduction Paragraph */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {directory.intro}
          </div>

          {/* Drive Records Grid */}
          {filteredDirectory.length === 0 ? (
            <div className="p-12 text-center bg-slate-50/60 rounded-2xl border border-slate-200 space-y-2">
              <Search size={28} className="mx-auto text-slate-300" />
              <h5 className="text-sm font-serif font-bold text-slate-800">{directory.emptyTitle}</h5>
              <p className="text-xs text-slate-500">{directory.emptyBody}</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDirectory.map((record) => {
              const rate = record.rate;
              return (
                <div
                  key={record.id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-700 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#0c2340]/10 text-[#0c2340]">
                        {record.year}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Calendar size={11} /> {record.interviewDate}
                      </span>
                    </div>
                    <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {record.company}
                    </h5>
                    {record.isInternship && (
                      <span className="mt-1.5 inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                        {directory.internshipLabel}
                      </span>
                    )}
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50/70 border border-emerald-100 px-2.5 py-1 rounded-lg inline-block">
                      {record.packageDisplay}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">
                      {charts.appearedLabel}:{' '}
                      <strong className="text-slate-800">{record.participated}</strong>
                    </span>
                    <span className="text-blue-700 font-bold">
                      {charts.selectedLabel}: {record.recruited} ({rate}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          )}

          {/* Prominent Corporate Recruiters */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              {recruiters.heading}
            </h5>
            <div className="flex flex-wrap gap-2">
              {recruiters.names.map((corp, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200 text-xs font-medium"
                >
                  <Building2 size={12} className="text-[#0c2340]" />
                  <span>{corp}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </SubPageLayout>
  );
}

