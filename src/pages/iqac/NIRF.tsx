import React from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  FileCheck,
  Eye,
  Building2,
  Award,
  BarChart3,
  TrendingUp
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface NIRFDocument {
  id: number;
  title: string;
  year: string;
  academicYear: string;
  url: string;
  description: string;
}

const nirfList: NIRFDocument[] = [
  {
    id: 1,
    title: "NIRF-2026",
    year: "2026",
    academicYear: "AY 2025-2026",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/69afe3a4bfebf.pdf",
    description: "Official National Institutional Ranking Framework (NIRF) 2026 data submission report, pharmacy discipline metrics, faculty profiles, research outputs, and institutional transparency data."
  },
  {
    id: 2,
    title: "NIRF-2025",
    year: "2025",
    academicYear: "AY 2024-2025",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/67931ba18bc48.pdf",
    description: "Official National Institutional Ranking Framework (NIRF) 2025 data submission report, teaching-learning resources, research publications, and graduate outcomes."
  },
  {
    id: 3,
    title: "NIRF-2024",
    year: "2024",
    academicYear: "AY 2023-2024",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/65aa5112ec024.pdf",
    description: "Official National Institutional Ranking Framework (NIRF) 2024 data submission report detailing academic achievements, placement statistics, and infrastructure benchmarks."
  },
  {
    id: 4,
    title: "NIRF-2023",
    year: "2023",
    academicYear: "AY 2022-2023",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64268088bf45f.pdf",
    description: "Official National Institutional Ranking Framework (NIRF) 2023 data submission report encompassing student strength, financial resources, and consultancy projects."
  },
  {
    id: 5,
    title: "NIRF-2022",
    year: "2022",
    academicYear: "AY 2021-2022",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/6426806d3da45.pdf",
    description: "Official National Institutional Ranking Framework (NIRF) 2022 data submission report outlining outreach, peer perception, and executive development metrics."
  },
  {
    id: 6,
    title: "NIRF-2021",
    year: "2021",
    academicYear: "AY 2020-2021",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/642680441c5e4.pdf",
    description: "Official National Institutional Ranking Framework (NIRF) 2021 data submission report covering comprehensive pharmacy institutional parameters and research output."
  }
];

export default function NIRF() {
  return (
    <SubPageLayout
      title="NIRF"
      subtitle="National Institutional Ranking Framework (NIRF) Data Reports & Submissions"
      category="iqac"
      activeItemLabel="NIRF"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <BarChart3 size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Ministry of Education (MoE), Government of India
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  National Institutional Ranking Framework (NIRF)
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                6 Annual Reports
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                MoE Framework
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
            The National Institutional Ranking Framework (NIRF) was approved by the Ministry of Education (MoE) to rank institutions across India based on objective parameters including Teaching, Learning and Resources (TLR), Research and Professional Practices (RP), Graduation Outcomes (GO), Outreach and Inclusivity (OI), and Peer Perception (PR).
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">2021 – 2026 Archive</strong>
                <span className="text-slate-500">6 Consecutive Cycles</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Award size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Pharmacy Discipline</strong>
                <span className="text-slate-500">Institutional Ranking</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <FileCheck size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Verified Data</strong>
                <span className="text-slate-500">Authorized PDF Reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Six NIRF Buttons / Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                Official Submissions
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                NIRF Annual Reports
              </h3>
            </div>
            <span className="text-xs font-sans text-slate-500 hidden sm:block">
              Click to view and inspect the official NIRF data report
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {nirfList.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className="group relative bg-white hover:bg-gradient-to-r hover:from-emerald-50/40 hover:via-white hover:to-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/50 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#1a5d2e] group-hover:bg-[#1a5d2e] group-hover:text-white border border-slate-200 group-hover:border-[#1a5d2e] flex items-center justify-center shrink-0 transition-colors duration-300 shadow-2xs">
                      <FileText size={22} />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors">
                          {doc.title}
                        </h4>
                        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                          {doc.academicYear}
                        </span>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          MoE NIRF Data
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed max-w-2xl">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Button / Action */}
                  <div className="flex items-center gap-2 shrink-0 sm:self-center">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1a5d2e] hover:bg-[#154a24] text-white text-xs font-mono font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
                    >
                      <Eye size={15} />
                      <span>Open {doc.title}</span>
                      <ExternalLink size={13} className="opacity-80" />
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Direct Buttons Row */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-bold text-slate-900">
              Direct Quick Access Links
            </h4>
            <p className="text-xs text-slate-600">
              Tap any year below to immediately open the NIRF report in a new tab:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {nirfList.map((doc) => (
              <a
                key={`quick-${doc.id}`}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-[#1a5d2e] border border-slate-200 hover:border-emerald-300 text-xs font-mono font-bold transition-all shadow-2xs cursor-pointer group"
              >
                <FileText size={14} className="text-[#1a5d2e]" />
                <span>{doc.title}</span>
                <ExternalLink size={12} className="text-slate-400 group-hover:text-[#1a5d2e]" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
