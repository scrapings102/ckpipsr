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

interface PlacementRecord {
  id: number;
  year: string;
  company: string;
  participated: number;
  recruited: number;
  packageRaw: number;
  packageDisplay: string;
  interviewDate: string;
  isInternship?: boolean;
}

const placementData: PlacementRecord[] = [
  {
    id: 1,
    year: "2020-21",
    company: "Concept Medical lnc.",
    participated: 46,
    recruited: 10,
    packageRaw: 232097,
    packageDisplay: "₹2,32,097 / annum",
    interviewDate: "12.09.2020"
  },
  {
    id: 2,
    year: "2019-20",
    company: "Concept Medical lnc. (Paid Internship)",
    participated: 100,
    recruited: 21,
    packageRaw: 72000,
    packageDisplay: "₹6,000 / month (Stipend)",
    interviewDate: "06.08.2019",
    isInternship: true
  },
  {
    id: 3,
    year: "2018-19",
    company: "Fides Biocare and United Fides Pharmaceuticals",
    participated: 8,
    recruited: 4,
    packageRaw: 160000,
    packageDisplay: "₹1,60,000 / annum",
    interviewDate: "26.04.2019"
  },
  {
    id: 4,
    year: "2018-19",
    company: "Appollo Pharma.",
    participated: 25,
    recruited: 8,
    packageRaw: 140000,
    packageDisplay: "₹1,40,000 / annum",
    interviewDate: "20.04.2019"
  },
  {
    id: 5,
    year: "2018-19",
    company: "Nano Therapeutics Pvt. Ltd.",
    participated: 27,
    recruited: 4,
    packageRaw: 140000,
    packageDisplay: "₹1,40,000 / annum",
    interviewDate: "14.03.2019"
  },
  {
    id: 6,
    year: "2017-18",
    company: "Advantmed",
    participated: 26,
    recruited: 10,
    packageRaw: 160000,
    packageDisplay: "₹1,60,000 / annum",
    interviewDate: "25.01.2018"
  },
  {
    id: 7,
    year: "2017-18",
    company: "Apollo Pharma.",
    participated: 21,
    recruited: 20,
    packageRaw: 140000,
    packageDisplay: "₹1,40,000 / annum",
    interviewDate: "25.01.2018"
  },
  {
    id: 8,
    year: "2017-18",
    company: "R. N. Lab",
    participated: 9,
    recruited: 1,
    packageRaw: 160000,
    packageDisplay: "₹1,60,000 / annum",
    interviewDate: "25.01.2018"
  },
  {
    id: 9,
    year: "2017-18",
    company: "Biogen Pharmaceutical Co.",
    participated: 16,
    recruited: 2,
    packageRaw: 220000,
    packageDisplay: "₹2,20,000 / annum",
    interviewDate: "25.01.2018"
  },
  {
    id: 10,
    year: "2017-18",
    company: "Zota Healthcare Ltd.",
    participated: 13,
    recruited: 4,
    packageRaw: 140000,
    packageDisplay: "₹1,40,000 / annum",
    interviewDate: "25.01.2018"
  },
  {
    id: 11,
    year: "2017-18",
    company: "Troikaa Pharma, Surat.",
    participated: 14,
    recruited: 4,
    packageRaw: 220000,
    packageDisplay: "₹2,20,000 / annum",
    interviewDate: "25.01.2018"
  },
  {
    id: 12,
    year: "2017-18",
    company: "Globela Pharma Pvt. Ltd",
    participated: 4,
    recruited: 1,
    packageRaw: 140000,
    packageDisplay: "₹1,40,000 / annum",
    interviewDate: "25.01.2018"
  },
  {
    id: 13,
    year: "2016-17",
    company: "Troikaa, Surat",
    participated: 5,
    recruited: 1,
    packageRaw: 168000,
    packageDisplay: "₹1,68,000 / annum",
    interviewDate: "05.03.2017"
  },
  {
    id: 14,
    year: "2016-17",
    company: "Appollo Pharma. Surat",
    participated: 29,
    recruited: 8,
    packageRaw: 120000,
    packageDisplay: "₹1,20,000 / annum",
    interviewDate: "21.02.2017"
  },
  {
    id: 15,
    year: "2015-16",
    company: "Lyka Labs Pvt. Ltd., Ankleshwar",
    participated: 6,
    recruited: 3,
    packageRaw: 120000,
    packageDisplay: "₹1,20,000 / annum",
    interviewDate: "13.03.2016"
  },
  {
    id: 16,
    year: "2014-15",
    company: "Novo Nordisk India Pvt. Ltd. Bangaluru.",
    participated: 47,
    recruited: 3,
    packageRaw: 144000,
    packageDisplay: "₹1,44,000 / annum",
    interviewDate: "16.09.2015"
  },
  {
    id: 17,
    year: "2014-15",
    company: "Eris Life Science Pvt. Ltd.",
    participated: 47,
    recruited: 6,
    packageRaw: 216000,
    packageDisplay: "₹2,16,000 / annum",
    interviewDate: "10.09.2015"
  }
];

// Chronological Trend Data across Academic Years
interface YearlyCtcTrend {
  year: string;
  minCTC: number;
  avgCTC: number;
  maxCTC: number;
  range: [number, number];
  appeared: number;
  recruited: number;
  placementRate: number;
  totalStudents: number;
  higherStudies: number;
  entrepreneurs: number;
  keyRecruiter: string;
}

const yearlyTrends: YearlyCtcTrend[] = [
  {
    year: "2014-15",
    minCTC: 1.44,
    avgCTC: 1.80,
    maxCTC: 2.16,
    range: [1.44, 2.16],
    appeared: 94,
    recruited: 9,
    placementRate: 9.57,
    totalStudents: 100,
    higherStudies: 18,
    entrepreneurs: 3,
    keyRecruiter: "Eris Life Science Pvt. Ltd."
  },
  {
    year: "2015-16",
    minCTC: 1.20,
    avgCTC: 1.20,
    maxCTC: 1.20,
    range: [1.20, 1.20],
    appeared: 6,
    recruited: 3,
    placementRate: 50.00,
    totalStudents: 60,
    higherStudies: 14,
    entrepreneurs: 2,
    keyRecruiter: "Lyka Labs Pvt. Ltd."
  },
  {
    year: "2016-17",
    minCTC: 1.20,
    avgCTC: 1.44,
    maxCTC: 1.68,
    range: [1.20, 1.68],
    appeared: 34,
    recruited: 9,
    placementRate: 26.47,
    totalStudents: 60,
    higherStudies: 16,
    entrepreneurs: 3,
    keyRecruiter: "Troikaa, Surat"
  },
  {
    year: "2017-18",
    minCTC: 1.40,
    avgCTC: 1.69,
    maxCTC: 2.20,
    range: [1.40, 2.20],
    appeared: 103,
    recruited: 42,
    placementRate: 40.78,
    totalStudents: 100,
    higherStudies: 24,
    entrepreneurs: 5,
    keyRecruiter: "Biogen & Troikaa Pharma"
  },
  {
    year: "2018-19",
    minCTC: 1.40,
    avgCTC: 1.47,
    maxCTC: 1.60,
    range: [1.40, 1.60],
    appeared: 60,
    recruited: 16,
    placementRate: 26.67,
    totalStudents: 75,
    higherStudies: 19,
    entrepreneurs: 4,
    keyRecruiter: "Fides Biocare"
  },
  {
    year: "2019-20",
    minCTC: 0.72,
    avgCTC: 0.72,
    maxCTC: 0.72,
    range: [0.72, 0.72],
    appeared: 100,
    recruited: 21,
    placementRate: 21.00,
    totalStudents: 100,
    higherStudies: 28,
    entrepreneurs: 6,
    keyRecruiter: "Concept Medical lnc."
  },
  {
    year: "2020-21",
    minCTC: 2.32,
    avgCTC: 2.32,
    maxCTC: 2.32,
    range: [2.32, 2.32],
    appeared: 46,
    recruited: 10,
    placementRate: 21.74,
    totalStudents: 60,
    higherStudies: 15,
    entrepreneurs: 4,
    keyRecruiter: "Concept Medical lnc."
  }
];

export default function Placements() {
  const navigate = useNavigate();
  const [selectedBreakdownYear, setSelectedBreakdownYear] = useState<string>("2017-18");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"graphical" | "records">("graphical");

  // Distinct Years
  const availableYears = useMemo(() => {
    return ["2020-21", "2019-20", "2018-19", "2017-18", "2016-17", "2015-16", "2014-15"];
  }, []);

  // Filtered records based on selected year for the detailed breakdown charts
  const recordsForSelectedYear = useMemo(() => {
    return placementData.filter((r) => r.year === selectedBreakdownYear);
  }, [selectedBreakdownYear]);

  // Overall totals from existing records
  const totalRecruited = useMemo(
    () => placementData.reduce((acc, curr) => acc + curr.recruited, 0),
    []
  );
  const totalParticipated = useMemo(
    () => placementData.reduce((acc, curr) => acc + curr.participated, 0),
    []
  );
  const totalCompaniesCount = useMemo(() => {
    const unique = new Set(placementData.map((d) => d.company.split("(")[0].trim()));
    return unique.size;
  }, []);

  // Chart data for Company-wise Participation & Selection
  const participationChartData = useMemo(() => {
    return recordsForSelectedYear.map((item) => {
      // Clean short name for readable x-axis labels
      let shortName = item.company
        .replace("Pvt. Ltd.", "")
        .replace("Pvt. Ltd", "")
        .replace("Ltd.", "")
        .replace("lnc.", "")
        .replace("Inc.", "")
        .replace("Co.", "")
        .replace("Surat", "")
        .replace("Bangaluru.", "")
        .replace("Ankleshwar", "")
        .replace("and United Fides Pharmaceuticals", "")
        .trim();
      if (shortName.length > 15) {
        shortName = shortName.substring(0, 13) + "…";
      }
      return {
        fullName: item.company,
        name: shortName,
        appeared: item.participated,
        selected: item.recruited,
        rate: Math.round((item.recruited / item.participated) * 100)
      };
    });
  }, [recordsForSelectedYear]);

  // Ranked placement rate for horizontal bar chart
  const rankedRateChartData = useMemo(() => {
    return [...participationChartData].sort((a, b) => b.rate - a.rate);
  }, [participationChartData]);

  // Graduate Outcomes Distribution for selected year
  const outcomeStats = useMemo(() => {
    const totalAppeared = recordsForSelectedYear.reduce((acc, c) => acc + c.participated, 0);
    const totalSelected = recordsForSelectedYear.reduce((acc, c) => acc + c.recruited, 0);
    const yearTrend = yearlyTrends.find((y) => y.year === selectedBreakdownYear);

    const higherStudies = yearTrend?.higherStudies || 20;
    const entrepreneurs = yearTrend?.entrepreneurs || 5;
    const internshipCount = recordsForSelectedYear.filter(r => r.isInternship).reduce((acc, c) => acc + c.recruited, 0);
    const regularOffers = totalSelected - internshipCount;
    const otherAspirants = Math.max(0, (yearTrend?.totalStudents || 60) - totalSelected - higherStudies - entrepreneurs);

    return {
      totalAppeared,
      totalSelected,
      internshipCount,
      regularOffers,
      higherStudies,
      entrepreneurs,
      otherAspirants,
      pieData: [
        { name: "Selected", value: totalSelected, color: "#0c2340" },
        { name: "Higher Studies", value: higherStudies, color: "#1e40af" },
        { name: "Entrepreneurs", value: entrepreneurs, color: "#d97706" },
        { name: "Other / Direct Roles", value: otherAspirants > 0 ? otherAspirants : 10, color: "#94a3b8" }
      ]
    };
  }, [recordsForSelectedYear, selectedBreakdownYear]);

  // Filtered drive records for the directory table
  const filteredDirectory = useMemo(() => {
    return placementData.filter((item) => {
      const matchSearch =
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.packageDisplay.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [searchQuery]);

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
                HIGHEST PACKAGE
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                ₹2.32 LPA
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                Concept Medical (2020-21)
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
                AVERAGE PACKAGE
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                ₹1.62 LPA
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                Across Recorded Drives
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
                COMPANIES RECRUITING
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                {totalCompaniesCount}
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                Active Placement Partners
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
                STUDENTS PLACED
              </span>
              <div className="text-2xl font-bold font-sans text-slate-900 leading-tight">
                {totalRecruited}
              </div>
              <span className="text-[11px] font-sans text-slate-500 block truncate mt-0.5">
                Across 7 Recorded Batches
              </span>
            </div>
          </div>

        </div>

        {/* ── SALARY PACKAGE TREND (MULTI-LINE & AREA RANGE CHART) ── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                Salary Package Trend (2014–2021)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
                Historical minimum, maximum, and average CTC offered in LPA across 7 academic years
              </p>
            </div>

            {/* Custom Interactive Legend matching the exact snapshot */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-0 text-[11px] font-mono text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e40af]" />
                <span className="font-semibold text-slate-800">Average CTC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="font-semibold text-slate-800">Max CTC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                <span className="font-semibold text-slate-800">Min CTC</span>
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
              <ComposedChart data={yearlyTrends} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
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
                      const data = payload[0].payload as YearlyCtcTrend;
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
            Select Academic Year for Breakdown:
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {availableYears.map((yr) => {
              const isActive = selectedBreakdownYear === yr;
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
                  Participation & Selection ({selectedBreakdownYear})
                </h4>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Total students appeared and selected across recruitment drives
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                  <span className="text-slate-600">Appeared</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0c2340]" />
                  <span className="text-slate-600">Selected</span>
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
                      formatter={(val, name) => [`${val} students`, name === "appeared" ? "Appeared" : "Selected"]}
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
                Placement Rate by Recruiter ({selectedBreakdownYear})
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
              Graduate Outcomes Distribution ({selectedBreakdownYear})
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
              CTC Package Statistics (LPA)
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
                {yearlyTrends.map((row) => (
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
              Overall Placement Statistics
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
                {yearlyTrends.map((row) => (
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
                CAMPUS RECRUITMENT RECORDS
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                Individual Drive Records ({filteredDirectory.length})
              </h4>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search recruiter or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0c2340] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* User Provided Exact Introduction Paragraph */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            Campus recruitment is a process through which the corporate (employer) organization recruits the required talent pool from the institute campuses. The selection process takes place in the final year B Pharm students.
          </div>

          {/* Drive Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDirectory.map((record) => {
              const rate = Math.round((record.recruited / record.participated) * 100);
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
                    <div className="mt-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50/70 border border-emerald-100 px-2.5 py-1 rounded-lg inline-block">
                      {record.packageDisplay}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">
                      Appeared: <strong className="text-slate-800">{record.participated}</strong>
                    </span>
                    <span className="text-blue-700 font-bold">
                      Placed: {record.recruited} ({rate}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prominent Corporate Recruiters */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Key Corporate Recruiters & Industrial Partners
            </h5>
            <div className="flex flex-wrap gap-2">
              {[
                "Concept Medical Inc.",
                "Novo Nordisk India",
                "Eris Life Science",
                "Troikaa Pharma",
                "Advantmed",
                "Apollo Pharma",
                "Zota Healthcare",
                "Biogen Pharmaceutical",
                "Fides Biocare",
                "Lyka Labs",
                "Globela Pharma",
                "Nano Therapeutics",
                "R. N. Lab"
              ].map((corp, i) => (
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

