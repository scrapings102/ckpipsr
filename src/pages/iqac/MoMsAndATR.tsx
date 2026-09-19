import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileCheck,
  ChevronRight,
  Eye
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface DocItem {
  id: number;
  title: string;
  quarter: string;
  year: string;
  academicYear: string;
  url: string;
  dateTag: string;
  description: string;
}

const momDocs: DocItem[] = [
  {
    id: 1,
    title: "IQAC Q1-2024",
    quarter: "Quarter 1",
    year: "2024",
    academicYear: "AY 2024-25",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e407764acd8.pdf",
    dateTag: "Quarter 1, 2024",
    description: "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 1, 2024 session covering curriculum reviews, research seed initiatives, and academic progress."
  },
  {
    id: 2,
    title: "IQAC Q1-2023",
    quarter: "Quarter 1",
    year: "2023",
    academicYear: "AY 2023-24",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/646ef7ec109b6.pdf",
    dateTag: "Quarter 1, 2023",
    description: "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 1, 2023 session focusing on semester planning, student mentoring reviews, and teaching innovations."
  },
  {
    id: 3,
    title: "IQAC Q2-2023",
    quarter: "Quarter 2",
    year: "2023",
    academicYear: "AY 2023-24",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e40799d1de9.pdf",
    dateTag: "Quarter 2, 2023",
    description: "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 2, 2023 session detailing mid-semester assessment analysis, industry collaborations, and faculty development."
  },
  {
    id: 4,
    title: "IQAC Q4-2022",
    quarter: "Quarter 4",
    year: "2022",
    academicYear: "AY 2022-23",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/646ef7b70c5ee.pdf",
    dateTag: "Quarter 4, 2022",
    description: "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 4, 2022 session outlining annual academic audits, infrastructure enhancements, and stakeholder feedback actions."
  },
  {
    id: 5,
    title: "IQAC Q3-2022",
    quarter: "Quarter 3",
    year: "2022",
    academicYear: "AY 2022-23",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/646ef7999475f.pdf",
    dateTag: "Quarter 3, 2022",
    description: "Minutes of IQAC Meeting and Action Taken Report (ATR) - Quarter 3, 2022 session addressing course attainment metrics, library resource expansions, and eco-campus programs."
  }
];

export default function MoMsAndATR() {
  const [activeDocUrl, setActiveDocUrl] = useState<string | null>(null);

  const handleOpenPdf = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <SubPageLayout
      title="MoMs and ATR"
      subtitle="Minutes of Meetings (MoM) & Action Taken Reports (ATR) of the Internal Quality Assurance Cell"
      category="iqac"
      activeItemLabel="MoMs and ATR"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <FileCheck size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Institutional Records & Audits
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Minutes of Meetings & Action Taken Reports
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                5 Official Documents
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                Verified Reports
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
            Access the official proceedings, resolutions, and corresponding Action Taken Reports (ATR) from the periodic sessions of the Internal Quality Assurance Cell (IQAC) at C.K. Pithawalla Institute of Pharmaceutical Science and Research.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">2022 – 2024 Records</strong>
                <span className="text-slate-500">Quarterly Audits</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">NAAC Compliance</strong>
                <span className="text-slate-500">AQAR Documentation</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <FileText size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Authorized PDFs</strong>
                <span className="text-slate-500">Official Institutional AWS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Five Interactive Buttons / Cards Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                Official Archives
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Available MoMs & ATR Reports
              </h3>
            </div>
            <span className="text-xs font-sans text-slate-500 hidden sm:block">
              Click on any button to open and view the PDF report
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {momDocs.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
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
                          PDF Document
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

        {/* Quick Direct Buttons Row (Full Screen Viewers) */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-bold text-slate-900">
              Direct Quick Links
            </h4>
            <p className="text-xs text-slate-600">
              Tap below to immediately open the corresponding meeting report in a new tab:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {momDocs.map((doc) => (
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
