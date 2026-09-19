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
  UserCheck,
  Globe,
  Scale,
  BookOpen,
  Info,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

export default function RTI() {
  const rtiPortalUrl = "https://rtionline.gov.in/";

  return (
    <SubPageLayout
      title="RTI"
      subtitle="Right to Information (RTI) Act, 2005 – Statutory Public Authority Obligations & Mandatory Disclosures"
      category="iqac"
      activeItemLabel="RTI"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Scale size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Government of India Statutory Act
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Right to Information (RTI)
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                Act 2005
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                Section 4(1)(b)
              </span>
            </div>
          </div>

          {/* Core Act Paragraph */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/50 via-slate-50 to-white border border-emerald-200/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Info size={16} />
              <span>Statutory Enactment & Purpose</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              The Right to Information Act, 2005 and obligations of public authorities [under Section 4(1)(b)] has been enacted by the Govt. of India and has come into force from 15 June, 2005. This Act provides access to information under the control of public authorities in order to promote transparency and accountability in the working of every public authority.
            </p>
          </div>

          {/* PCI & GTU Disclosure Statement */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              <CheckCircle2 size={16} className="text-[#1a5d2e]" />
              <span>Mandatory Disclosure & Compliance</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
              All relevant statutory information and mandatory disclosure of college pertaining to PCI and GTU has been uploaded on the institute website from time to time.
            </p>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">15 June, 2005</strong>
                <span className="text-slate-500">Date of Enactment</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">PCI & GTU Aligned</strong>
                <span className="text-slate-500">Mandatory Disclosures</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Globe size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Govt. RTI Portal</strong>
                <span className="text-slate-500">rtionline.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Office In-charge Card */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              Authority Contact
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Office In-charge Details
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-white hover:bg-gradient-to-r hover:from-emerald-50/30 hover:via-white hover:to-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#1a5d2e] border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <UserCheck size={28} />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                    Office In-charge Details
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Dr. Dhiren P Shah
                  </h4>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-100 p-2 rounded-lg mt-1">
                    Office In-charge: Dr. Dhiren P Shah
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600">
                    Principal,
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    C.K Pithawalla Institute Of Pharmaceutical Science & Research
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-emerald-50 text-[#1a5d2e] border border-emerald-200 self-start sm:self-auto">
                  Statutory Officer
                </span>
                <span className="text-xs text-slate-500">
                  Surat-Dumas Road, Surat, Gujarat
                </span>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Official RTI Portal Callout Card with Button */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
              National Online Portal
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Online RTI Application & Information
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="bg-gradient-to-br from-[#1a5d2e] to-[#12421f] text-white rounded-3xl p-6 sm:p-9 shadow-md space-y-6 relative overflow-hidden"
          >
            {/* Background Decorative Pattern */}
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/15 text-emerald-200 border border-white/20">
                    Govt. of India Portal
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  For More Details Visit RTI Online
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Citizens can file RTI applications, submit first appeals, and track status online through the Government of India RTI Online portal.
                </p>
                <div className="pt-1 text-xs font-mono text-emerald-200">
                  Portal URL: <span className="underline font-bold">https://rtionline.gov.in/</span>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={rtiPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#1a5d2e] text-xs sm:text-sm font-mono font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 text-center"
                >
                  <Globe size={16} />
                  <span>Visit rtionline.gov.in</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Direct Link Access Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-serif font-bold text-slate-900">
              Direct Quick Access Link
            </h4>
            <p className="text-xs text-slate-600">
              Tap below to open the official Government of India RTI Online portal in a new tab:
            </p>
          </div>

          <div>
            <a
              href={rtiPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-900 hover:text-[#1a5d2e] border border-slate-200 hover:border-emerald-300 text-xs sm:text-sm font-mono font-bold transition-all shadow-2xs cursor-pointer group"
            >
              <Scale size={16} className="text-[#1a5d2e]" />
              <span>https://rtionline.gov.in/</span>
              <ExternalLink size={13} className="text-slate-400 group-hover:text-[#1a5d2e]" />
            </a>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
