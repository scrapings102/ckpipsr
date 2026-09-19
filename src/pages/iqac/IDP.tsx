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
  Compass,
  Target,
  TrendingUp,
  GraduationCap,
  Layers
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

export default function IDP() {
  const pdfUrl = "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/6996e062b372b.pdf";
  const buttonName = "Institutional Development Plan (IDP):2025-2030";

  return (
    <SubPageLayout
      title="IDP"
      subtitle="Institutional Development Plan (IDP) 2025-2030 – Strategic Roadmap for Academic & Institutional Excellence"
      category="iqac"
      activeItemLabel="IDP"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Compass size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Strategic Institutional Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Institutional Development Plan (IDP)
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                Vision 2025–2030
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                Official Document
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
            The Institutional Development Plan (IDP) 2025-2030 outlines the comprehensive strategic roadmap of C.K. Pithawalla Institute of Pharmaceutical Science and Research. It sets key milestones for academic innovation, faculty advancement, state-of-the-art research infrastructure, industry collaborations, and holistic student development over the five-year trajectory.
          </p>

          {/* Key Strategic Focus Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">2025 – 2030 Horizon</strong>
                <span className="text-slate-500">5-Year Strategic Policy</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Target size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Holistic Excellence</strong>
                <span className="text-slate-500">NEP 2020 & NAAC Aligned</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <FileCheck size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Authorized Report</strong>
                <span className="text-slate-500">Full Plan in PDF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Document Card with Requested Button */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                Official Strategic Plan
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Institutional Development Plan Document
              </h3>
            </div>
            <span className="text-xs font-sans text-slate-500 hidden sm:block">
              Click the button below to view the official PDF document
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-white hover:bg-gradient-to-r hover:from-emerald-50/40 hover:via-white hover:to-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Left Info */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-[#1a5d2e] group-hover:bg-[#1a5d2e] group-hover:text-white border border-slate-200 group-hover:border-[#1a5d2e] flex items-center justify-center shrink-0 transition-colors duration-300 shadow-2xs">
                  <FileText size={28} />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-[#1a5d2e] transition-colors">
                      {buttonName}
                    </h4>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                      2025–2030
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      Official IDP PDF
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed max-w-2xl">
                    Comprehensive strategic plan encompassing academic development, institutional governance, resource mobilization, digital learning integration, research promotion, and student welfare initiatives for 2025-2030.
                  </p>
                </div>
              </div>

              {/* Right Action Button */}
              <div className="flex items-center gap-3 shrink-0 lg:self-center">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1a5d2e] hover:bg-[#154a24] text-white text-xs sm:text-sm font-mono font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 text-center"
                >
                  <Eye size={16} />
                  <span>{buttonName}</span>
                  <ExternalLink size={14} className="opacity-80" />
                </a>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Quick Direct Link Section */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-bold text-slate-900">
              Direct Quick Access Link
            </h4>
            <p className="text-xs text-slate-600">
              Tap below to immediately open the complete Institutional Development Plan in a new tab:
            </p>
          </div>

          <div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-900 hover:text-[#1a5d2e] border border-slate-200 hover:border-emerald-300 text-xs sm:text-sm font-mono font-bold transition-all shadow-2xs cursor-pointer group"
            >
              <FileText size={16} className="text-[#1a5d2e]" />
              <span>{buttonName}</span>
              <ExternalLink size={13} className="text-slate-400 group-hover:text-[#1a5d2e]" />
            </a>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
