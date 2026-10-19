import React from "react";
import { motion } from "motion/react";
import {
  FileText,
  ExternalLink,
  Sparkles,
  Award,
  CheckCircle2,
  Download,
  Building2,
  GraduationCap,
  FlaskConical,
  HeartHandshake,
  Layers,
  Eye,
  ShieldCheck,
  Target
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { useSimplePage } from "../../hooks/useSimplePage";
import { RichText } from "../../utils/RichText";

export default function InstitutionDistinctiveness() {
  const edited = useSimplePage("iqac/institution-distinctiveness");

  const pdfUrl =
    edited?.documents?.[0]?.url ||
    "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64b8d28110b4b.pdf";

  const documentTitle =
    edited?.documents?.[0]?.title ||
    "Institution Distinctiveness Institutional Report (PDF)";

  return (
    <SubPageLayout
      title={edited?.title || "Institution Distinctiveness"}
      subtitle={edited?.subtitle || "Accreditation & Ranking • NAAC Criterion VII (7.3)"}
      category="iqac"
      activeItemLabel="Institution Distinctiveness"
    >
      <div className="space-y-10 w-full text-slate-800">

        {/* ── HEADER INTRODUCTION CARD ── */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Sparkles size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  NAAC Criterion VII • 7.3
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Translating Pharmaceutical Formulation into Community Healthcare
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                Priority Area
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                Institutional Thrust
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
            C. K. Pithawalla Institute of Pharmaceutical Science &amp; Research distinguishes itself through a dedicated institutional thrust: integrating advanced pharmaceutical formulation and computational drug research with community-level health promotion and patient safety awareness across South Gujarat.
          </p>

          {/* Key Strategic Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0">
                <FlaskConical size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Formulation Innovation</strong>
                <span className="text-slate-500">Advanced Pharmaceutics &amp; AI</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <HeartHandshake size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Community Impact</strong>
                <span className="text-slate-500">Free Health Camps &amp; Outreach</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <GraduationCap size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Experiential Learning</strong>
                <span className="text-slate-500">Hands-on Industry Exposure</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── OFFICIAL PDF DOCUMENT CARD & BUTTON ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                Official Institutional Documentation
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Institutional Distinctiveness Document
              </h3>
            </div>
            <span className="text-xs font-sans text-slate-500 hidden sm:block">
              Click the button below to view or download the complete PDF
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
                      {documentTitle}
                    </h4>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                      NAAC Metric 7.3
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      Official PDF
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed max-w-2xl">
                    Comprehensive institutional report detailing the core vision, priorities, thrust areas, societal outreach initiatives, and evidence of success characterizing the institutional distinctiveness of CKPIPSR.
                  </p>
                </div>
              </div>

              {/* Right Action Button: Clicking opens the PDF */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 lg:self-center">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1a5d2e] hover:bg-[#154a24] text-white text-xs sm:text-sm font-mono font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 text-center group/btn"
                >
                  <Eye size={16} />
                  <span>Open Document (PDF)</span>
                  <ExternalLink size={14} className="opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Institution-Distinctiveness-CKPIPSR.pdf"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-mono font-semibold transition-all duration-200 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ── CUSTOM EDITABLE SECTIONS (FROM ADMIN PANEL IF ANY) ── */}
        {edited && edited.sections.length > 0 && (
          <div className="space-y-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs">
            {edited.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                {sec.heading && (
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    {sec.heading}
                  </h3>
                )}
                <div className="text-sm font-sans text-slate-700 leading-relaxed space-y-2">
                  <RichText text={sec.body} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── QUICK DIRECT LINK ACCESS BOX ── */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-bold text-slate-900">
              Direct Quick Access Link
            </h4>
            <p className="text-xs text-slate-600">
              Tap below to immediately open the complete Institution Distinctiveness PDF in a new tab:
            </p>
          </div>
          <div className="pt-1">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] hover:underline"
            >
              <FileText size={14} />
              <span>{pdfUrl}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* ── CAMPUS INFORMATION CHECKLIST ── */}
        <div className="bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
          <h4 className="font-serif font-bold text-lg text-slate-800">Campus Information Checklist</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 font-sans font-medium bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Affiliated to Gujarat Technological University</span>
            </div>
            <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 font-sans font-medium bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Approved by Pharmacy Council of India (PCI)</span>
            </div>
            <div className="flex gap-3 items-start text-xs sm:text-sm text-slate-700 font-sans font-medium bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Managed by Navyug Vidyabhavan Trust</span>
            </div>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
