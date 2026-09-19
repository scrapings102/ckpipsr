import React from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  FileText, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Building2, 
  Calendar,
  Sparkles,
  Award,
  Zap
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

const APPROVALS = [
  {
    body: "Pharmacy Council of India (PCI), New Delhi",
    status: "Approved",
    validity: "2024-25",
    color: "bg-blue-500",
    description: "Statutory body regulated by the Government of India for the regulation of Pharmacy Education in the country.",
    letters: [
      { name: "Latest Approval Letter", url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/63f5f6fb749d2.pdf" }
    ]
  },
  {
    body: "Gujarat Technological University (GTU), Gandhinagar",
    status: "Affiliated",
    validity: "Continuous",
    color: "bg-emerald-500",
    description: "Affiliating university for technical and professional programs in Gujarat.",
    letters: [
      { name: "GTU Affiliation Letter", url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e2c74f855a9.pdf" }
    ]
  },
  {
    body: "AICTE, New Delhi",
    status: "Approved",
    validity: "2022-23",
    color: "bg-orange-500",
    description: "National-level council for technical education, under the Department of Higher Education.",
    letters: [
      { name: "AICTE EOA Letter", url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/66e2c80a7a232.pdf" }
    ]
  },
  {
    body: "Fee Regulatory Committee (FRC), Gujarat",
    status: "Sanctioned",
    validity: "2026-27 to 2028-29",
    color: "bg-purple-500",
    description: "Regulatory body ensuring transparent and reasonable fee structures for professional technical courses.",
    letters: [
      { name: "FRC Order Letter", url: "https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/69d87ef327173.pdf" }
    ]
  }
];

export default function Approvals() {
  return (
    <SubPageLayout
      title="Regulatory Approvals"
      subtitle="Ensuring global standards through national and state-level accreditation."
      category="academics"
      activeItemLabel="Approvals"
    >
      <div className="space-y-10">
        {/* Intro Section */}
        <section className="relative">
          <div className="absolute -left-10 top-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123a1a]/5 text-[#123a1a] text-[9px] font-bold uppercase tracking-wider border border-[#123a1a]/10">
              Quality Assurance
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0c2411] tracking-tight">
              Accreditations & Affiliations
            </h2>
            <div className="h-1 w-16 bg-[#D4AF37] rounded-full" />
            <p className="text-slate-600 max-w-3xl text-sm leading-relaxed font-medium">
              CKPIPSR is committed to providing pharmaceutical education that meets the highest 
              statutory and academic benchmarks. Our programs are approved by the leading 
              regulatory bodies of India.
            </p>
          </div>
        </section>

        {/* Approvals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {APPROVALS.map((approval, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${approval.color} bg-opacity-10 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform`}>
                   <ShieldCheck className={approval.color.replace('bg-', 'text-')} size={20} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">{approval.status}</span>
                </div>
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                 <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">
                    {approval.body}
                 </h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
                    {approval.description}
                 </p>
                 <div className="flex items-center gap-1.5 pt-1">
                    <Calendar size={12} className="text-[#D4AF37]" />
                    <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">Validity: {approval.validity}</span>
                 </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                 {approval.letters.map((letter, lIdx) => (
                   <a 
                     key={lIdx}
                     href={letter.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-amber-50/20 border border-slate-100 hover:border-[#D4AF37]/30 rounded-xl transition-all group/link"
                   >
                     <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
                           <FileText size={14} />
                        </div>
                        <div className="min-w-0">
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Public Notice</p>
                           <p className="text-xs font-bold text-slate-800 truncate">{letter.name}</p>
                        </div>
                     </div>
                     <Download size={14} className="text-slate-300 group-hover/link:text-[#D4AF37] transition-colors shrink-0" />
                   </a>
                 ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Compliance Stats */}
        <div className="bg-[#123a1a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl">
           <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <img src="/images/hero/college_campus.jpg" className="w-full h-full object-cover" />
           </div>
           
           <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Committed to Compliance</h3>
                <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
                   Our institution maintains 100% transparency with all regulatory requirements, 
                   regularly undergoing audits and inspections to ensure the highest academic standards.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                 {[
                   { icon: Building2, val: "GTU", label: "Affiliated" },
                   { icon: Award, val: "PCI", label: "Approved" },
                   { icon: Sparkles, val: "AISHE", label: "Registered" },
                   { icon: Zap, val: "FRC", label: "Sanctioned" }
                 ].map((stat, sIdx) => (
                   <div key={sIdx} className="bg-white/5 backdrop-blur-md px-4 py-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-all">
                      <stat.icon className="mx-auto mb-2 text-[#D4AF37]" size={20} />
                      <span className="block text-lg font-serif font-bold text-white mb-0.5">{stat.val}</span>
                      <span className="text-[8.5px] text-slate-400 uppercase font-black tracking-wider">{stat.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
