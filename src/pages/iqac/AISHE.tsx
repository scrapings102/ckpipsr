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
  GraduationCap,
  Award
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface AISHECertificate {
  id: number;
  title: string;
  year: string;
  url: string;
  surveyYear: string;
  description: string;
}

const aisheList: AISHECertificate[] = [
  {
    id: 1,
    title: "AISHE 2024-25",
    year: "2024-25",
    surveyYear: "AY 2024-2025",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/68f072aa648f6.pdf",
    description: "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2024-25."
  },
  {
    id: 2,
    title: "AISHE 2023-24",
    year: "2023-24",
    surveyYear: "AY 2023-2024",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/68f07292237b3.pdf",
    description: "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2023-24."
  },
  {
    id: 3,
    title: "AISHE 2022-23",
    year: "2022-23",
    surveyYear: "AY 2022-2023",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e4082ea3964.pdf",
    description: "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2022-23."
  },
  {
    id: 4,
    title: "AISHE 2021-22",
    year: "2021-22",
    surveyYear: "AY 2021-2022",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/642680143b2b4.pdf",
    description: "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2021-22."
  },
  {
    id: 5,
    title: "AISHE 2020-21",
    year: "2020-21",
    surveyYear: "AY 2020-2021",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64267ff401721.pdf",
    description: "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2020-21."
  },
  {
    id: 6,
    title: "AISHE 2019-20",
    year: "2019-20",
    surveyYear: "AY 2019-2020",
    url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/64267fd8890a9.pdf",
    description: "Official All India Survey on Higher Education (AISHE) certificate and compliance data submission for the Academic Year 2019-20."
  }
];

export default function AISHE() {
  return (
    <SubPageLayout
      title="AISHE"
      subtitle="All India Survey on Higher Education (AISHE) Official Certificates & Survey Compliance"
      category="iqac"
      activeItemLabel="AISHE"
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <Building2 size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Ministry of Education, Govt. of India
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  AISHE Certificates & Compliance
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                6 Annual Reports
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                MoE Verified
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-normal">
            The All India Survey on Higher Education (AISHE) is conducted by the Ministry of Education, Government of India, to portray the status of higher education in the country. C.K. Pithawalla Institute of Pharmaceutical Science and Research consistently submits complete institutional data and maintains annual compliance certificates.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">2019 – 2025 Data</strong>
                <span className="text-slate-500">6 Consecutive Years</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">MoE Certified</strong>
                <span className="text-slate-500">National Database</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <FileCheck size={18} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Direct Access</strong>
                <span className="text-slate-500">Official PDF Reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Six AISHE Buttons / Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                Certificate Repository
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Annual AISHE Certificates
              </h3>
            </div>
            <span className="text-xs font-sans text-slate-500 hidden sm:block">
              Click to view and download the official PDF certificate
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {aisheList.map((doc, idx) => (
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
                          {doc.surveyYear}
                        </span>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          Official Certificate
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
              Tap any year below to immediately open the AISHE certificate in a new tab:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {aisheList.map((doc) => (
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
