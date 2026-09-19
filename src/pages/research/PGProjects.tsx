import React from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  BookOpen, 
  ArrowUpRight, 
  Calendar,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  FlaskConical
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface PGProjectDocument {
  id: string;
  title: string;
  academicYear: string;
  description: string;
  pdfUrl: string;
  tag: string;
  colorTheme: "emerald" | "blue";
}

const pgProjectDocs: PGProjectDocument[] = [
  {
    id: "ay-2024-2025",
    title: "Research Publication AY 2024-2025",
    academicYear: "AY 2024 - 2025",
    description: "Official documentation and compilation of Post Graduate (M.Pharm) dissertation projects, experimental studies, and research publications for the academic year 2024-2025.",
    pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/68c24ee48d6ad.pdf",
    tag: "AY 2024-2025 Report",
    colorTheme: "emerald"
  },
  {
    id: "ay-2025-2026",
    title: "Research Publication AY 2025-2026",
    academicYear: "AY 2025 - 2026",
    description: "Compendium and official repository of ongoing and completed Post Graduate research initiatives, thesis manuscripts, and scientific publications for AY 2025-2026.",
    pdfUrl: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/69e33b71b7b8b.pdf",
    tag: "AY 2025-2026 Report",
    colorTheme: "blue"
  }
];

export default function PGProjects() {
  const handleOpenPdf = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <SubPageLayout
      title="PG Projects"
      subtitle="Post Graduate (M.Pharm) Research Projects, Thesis Dissertations & Academic Reports"
      category="research-and-innovation"
      activeItemLabel="Research - PG Projects"
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <FlaskConical size={24} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  Post Graduate Studies
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  PG Projects & Research Documentation
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-medium">
              <FileCheck size={14} className="text-[#1a5d2e]" />
              <span>Official PDF Records</span>
            </div>
          </div>

          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mt-4">
            Access and download the official academic year reports documenting Post Graduate (M.Pharm) dissertation projects, research findings, and scientific project publications guided by faculty members at C.K. Pithawalla Institute of Pharmaceutical Science & Research.
          </p>
        </motion.div>

        {/* The 2 PG Project Action Buttons / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pgProjectDocs.map((doc, index) => {
            const isEmerald = doc.colorTheme === "emerald";
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group p-6 sm:p-7 space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                      <Calendar size={13} />
                      <span>{doc.academicYear}</span>
                    </span>

                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                        isEmerald
                          ? "bg-emerald-100 text-[#1a5d2e]"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {doc.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                      <FileText size={24} />
                    </div>
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#1a5d2e] transition-colors leading-snug">
                      {doc.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                {/* Primary Button Trigger */}
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenPdf(doc.pdfUrl);
                    }}
                    className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-[#1a5d2e] hover:bg-[#124220] text-white font-sans text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={18} className="text-emerald-200" />
                      <span>{doc.title}</span>
                    </span>
                    <span className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Help & Note */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#1a5d2e] shrink-0" />
            <span>Official Post Graduate project records are preserved in PDF format for academic reference and verification.</span>
          </div>
          <span className="font-mono text-slate-400">CKPIPSR PG Repository</span>
        </div>

      </div>
    </SubPageLayout>
  );
}
