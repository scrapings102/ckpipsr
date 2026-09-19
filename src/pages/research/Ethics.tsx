import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Building2, 
  UserCheck, 
  FileCheck2, 
  CheckCircle2, 
  Sparkles, 
  BadgeCheck, 
  HeartHandshake, 
  Scale, 
  AlertTriangle, 
  Share2, 
  FlaskConical, 
  Eye, 
  BookOpen, 
  GraduationCap, 
  FileText,
  Lock,
  Layers,
  Heart,
  Leaf,
  ShieldCheck
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface OrgPrinciple {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ResearcherGuideline {
  id: number;
  title: string;
  description: string;
  additionalNote?: string;
  category: "Integrity" | "Accountability" | "Animal Welfare" | "Compliance & Publishing";
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const orgPrinciples: OrgPrinciple[] = [
  {
    id: 1,
    title: "Quality & Academic Excellence",
    description: "Shall strive to disseminate work of the highest quality and excellence while conducting research.",
    icon: Sparkles
  },
  {
    id: 2,
    title: "Dignity, Rights & Safety Assurance",
    description: "Shall ensure the dignity, rights, safety and wellbeing of all involved in research and avoid unreasonable risk or harm to research subjects, patients, participants, researchers and others.",
    icon: HeartHandshake
  },
  {
    id: 3,
    title: "Health & Safety Compliance",
    description: "Should ensure that all research is carried out keeping in mind the health, safety legislation and good laboratory practice (GLP).",
    icon: Shield
  },
  {
    id: 4,
    title: "Integral Good Practice Standards",
    description: "Shall ensure that good practice forms an important and integral part of all institutional research endeavors.",
    icon: BadgeCheck
  },
  {
    id: 5,
    title: "Clear Policies & Dissemination",
    description: "Shall establish clear policies and procedures that cover the principles of good practice in research and make researchers fully aware of these policies and procedures.",
    icon: FileCheck2
  }
];

const researcherGuidelines: ResearcherGuideline[] = [
  {
    id: 1,
    title: "Open Knowledge Exchange",
    description: "Shall promote the open exchange of ideas, research methods, data and results across the scientific community.",
    category: "Integrity",
    icon: Share2
  },
  {
    id: 2,
    title: "Zero Tolerance for Misconduct & Fraud",
    description: "Misconduct in academic research such as plagiarism, piracy, abuse of intellectual property and research resource, defamation, misinterpretation, fabrication and fraud must be avoided in carrying out research.",
    category: "Integrity",
    icon: AlertTriangle
  },
  {
    id: 3,
    title: "Collegiality & Experimental Integrity",
    description: "Shall not try to sabotage others from completing their work by either damaging or disrupting data or experiments of others; or wilfully failing to observe their terms and conditions.",
    category: "Integrity",
    icon: Lock
  },
  {
    id: 4,
    title: "Public Accountability & Ethics Review",
    description: "Shall realize that by their work they are accountable to the general public and should act accordingly.",
    additionalNote: "Researcher must comply with all legal and ethical requirements and other guidelines that apply to their research and must submit research proposals for review before ethics committee where appropriate and abide by the outcome of that review.",
    category: "Accountability",
    icon: Scale
  },
  {
    id: 5,
    title: "Protection of Subjects & Risk Mitigation",
    description: "Shall not expose the animals or subjects to unnecessary harm when conducting studies and must try to anticipate any risks that the proposed research might produce to them.",
    category: "Animal Welfare",
    icon: Heart
  },
  {
    id: 6,
    title: "Transparent Peer Review & Editorial Disclosure",
    description: "Shall make research designs available to peer reviewers and journal editors when submitting research reports for publication.",
    category: "Compliance & Publishing",
    icon: Eye
  },
  {
    id: 7,
    title: "Conflict of Interest Declaration",
    description: "Shall try to identify conflict of interest, and must be declared and addressed in order to avoid poor practice in research.",
    category: "Integrity",
    icon: UserCheck
  },
  {
    id: 8,
    title: "3Rs Principle (Reduction, Replacement, Refinement)",
    description: "Shall consider the opportunities for reduction, replacement and refinement of involving animals in research projects.",
    category: "Animal Welfare",
    icon: Leaf
  },
  {
    id: 9,
    title: "Grant Terms & Regulatory Adherence",
    description: "Researchers should ensure that the terms and conditions of any grant or contract related to the research are strictly adhered to.",
    category: "Compliance & Publishing",
    icon: FileText
  }
];

export default function Ethics() {
  const [activeTab, setActiveTab] = useState<"ALL" | "ORGANIZATION" | "RESEARCHER">("ALL");

  return (
    <SubPageLayout
      title="Research Ethics"
      subtitle="Institutional Code of Ethics for Research, Organizational Commitments & Guidelines for Scientific Researchers"
      category="research-and-innovation"
      activeItemLabel="Research - Ethics"
    >
      <div className="space-y-10 max-w-6xl mx-auto">
        
        {/* Core Banner / Philosophy Card */}
        <motion.div
          id="ethics-intro-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Shield size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  Academic Integrity & Regulatory Standards
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  Code of Ethics for Research
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                <BadgeCheck size={14} />
                <span>PCI & GTU Compliant</span>
              </span>
            </div>
          </div>

          <div className="bg-emerald-50/40 rounded-2xl border border-emerald-100 p-5 text-slate-700 font-sans text-sm sm:text-base leading-relaxed flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5">
              <FileCheck2 size={18} />
            </div>
            <p>
              Following code of Ethics for Research provides major benefits to research organisations, researcher and general public. It helps to conduct research of the highest quality and standards.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-mono font-semibold text-slate-400 mr-2">Display Mode:</span>
            <button
              id="filter-all"
              onClick={() => setActiveTab("ALL")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                activeTab === "ALL"
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Code of Ethics (14 Directives)
            </button>
            <button
              id="filter-org"
              onClick={() => setActiveTab("ORGANIZATION")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                activeTab === "ORGANIZATION"
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Code for Organization (5)
            </button>
            <button
              id="filter-researcher"
              onClick={() => setActiveTab("RESEARCHER")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                activeTab === "RESEARCHER"
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Code for Researcher (9)
            </button>
          </div>
        </motion.div>

        {/* SECTION 1: Code of Ethics for Organization */}
        {(activeTab === "ALL" || activeTab === "ORGANIZATION") && (
          <motion.div
            id="organization-ethics-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                  <Building2 size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-lg sm:text-xl">
                    Code of Ethics for Organization
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    Institutional governance mandates & infrastructure assurances
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                5 Directives
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {orgPrinciples.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    id={`org-principle-${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <IconComponent size={20} />
                        </div>
                        <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                          {item.id}
                        </span>
                      </div>

                      <h5 className="font-serif font-bold text-slate-900 text-base group-hover:text-[#1a5d2e] transition-colors leading-snug">
                        {item.title}
                      </h5>

                      <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-[#1a5d2e] font-bold">
                      <CheckCircle2 size={13} />
                      <span>Institutional Commitment</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* SECTION 2: Code of Ethics for Researcher */}
        {(activeTab === "ALL" || activeTab === "RESEARCHER") && (
          <motion.div
            id="researcher-ethics-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <UserCheck size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-lg sm:text-xl">
                    Code of Ethics for Researcher
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    Faculty, Ph.D. scholars, and student researcher conduct protocols
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                9 Directives
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {researcherGuidelines.map((item, idx) => {
                const IconComponent = item.icon;
                const isHighlight = item.id === 2 || item.id === 4;

                return (
                  <motion.div
                    key={item.id}
                    id={`researcher-guideline-${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`bg-white rounded-3xl border ${
                      isHighlight ? "border-amber-200/90 shadow-xs" : "border-slate-200/90"
                    } hover:border-[#1a5d2e]/50 hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-4 group`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-2xl ${
                          isHighlight ? "bg-amber-50 text-amber-800" : "bg-blue-50 text-blue-700"
                        } flex items-center justify-center group-hover:scale-105 transition-transform`}>
                          <IconComponent size={20} />
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] font-semibold">
                          {item.category}
                        </span>
                      </div>

                      <h5 className="font-serif font-bold text-slate-900 text-base group-hover:text-[#1a5d2e] transition-colors leading-snug">
                        {item.title}
                      </h5>

                      <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {item.additionalNote && (
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-sans leading-relaxed mt-2">
                          <span className="font-bold text-slate-900 block mb-0.5">Procedural Directive:</span>
                          {item.additionalNote}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
                      <CheckCircle2 size={13} className="text-[#1a5d2e]" />
                      <span>Code Directive #{item.id}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Highlight Banner: 3Rs Principle and IAEC / Institutional Review */}
        <div id="ethics-3rs-card" className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center border border-white/10">
                <Leaf size={22} />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block font-bold">
                  Animal Welfare & Bio-Ethics Principle
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
                  The 3Rs Framework (Replacement, Reduction & Refinement)
                </h4>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-emerald-200 border border-white/10">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>CCSEA / CPCSEA Guidelines</span>
            </span>
          </div>

          <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
            All preclinical protocols, animal testing investigations, and pharmacological assays conducted at CKPIPSR strictly follow the ethical principles of Replacement (alternative models), Reduction (minimal animal subject count), and Refinement (humane housing and analgesia) monitored under the Institutional Animal Ethics Committee (IAEC).
          </p>
        </div>

        {/* Institutional Verification Footer */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#1a5d2e] shrink-0" />
            <span>Formally approved by the Academic Council, Research Committee, and Institutional Ethics Advisory Body at CKPIPSR.</span>
          </div>
          <span className="font-mono text-slate-400">CKPIPSR Research Ethics Office</span>
        </div>

      </div>
    </SubPageLayout>
  );
}
