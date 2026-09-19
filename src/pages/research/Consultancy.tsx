import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Briefcase, 
  User, 
  Calendar, 
  Building2, 
  IndianRupee, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  BadgeCheck, 
  Sparkles, 
  Landmark, 
  ShieldCheck, 
  Layers,
  FlaskConical,
  Compass
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface ConsultancyProject {
  srNo: number;
  principalInvestigator: string;
  designation?: string;
  projectTitle: string;
  status: "Going on" | "Completed";
  grantDate: string;
  startedYear: string;
  fundingAgency: string;
  agencyLocation: string;
  agencyType: "GOVERNMENT" | "PRIVATE" | "INDUSTRY";
  totalCostINR: string;
}

const consultancyProjects: ConsultancyProject[] = [
  {
    srNo: 1,
    principalInvestigator: "Dr. Naishadh I. Solanki",
    designation: "Principal Investigator & Faculty of Pharmacy",
    projectTitle: "Quinoline-Based ULK1 Inhibitors: A Comprehensive Study from Computational Design to In Vitro Anticancer Activity",
    status: "Going on",
    grantDate: "01-04-2025",
    startedYear: "2025",
    fundingAgency: "GTU-ICQC-RPS-MRP",
    agencyLocation: "Gujarat, India",
    agencyType: "GOVERNMENT",
    totalCostINR: "50,000/-"
  },
  {
    srNo: 2,
    principalInvestigator: "Dr. Vinod D. Ramani",
    designation: "Principal Investigator & Associate Professor",
    projectTitle: "Next-Generation Antifungal Emulsions: A Surfactant-Free Approach",
    status: "Completed",
    grantDate: "15-04-2024",
    startedYear: "2024",
    fundingAgency: "GTU-ICQC-RPS-MRP",
    agencyLocation: "Gujarat, India",
    agencyType: "GOVERNMENT",
    totalCostINR: "40,000/-"
  }
];

export default function Consultancy() {
  const [statusFilter, setStatusFilter] = useState<"ALL" | "GOING_ON" | "COMPLETED">("ALL");

  const filteredProjects = consultancyProjects.filter((item) => {
    if (statusFilter === "GOING_ON") return item.status === "Going on";
    if (statusFilter === "COMPLETED") return item.status === "Completed";
    return true;
  });

  return (
    <SubPageLayout
      title="Consultancy & Sponsored Projects"
      subtitle="Funded Research Projects, Principal Investigators, Institutional Grants & Scientific Consultancies"
      category="research-and-innovation"
      activeItemLabel="Research - Consultancy"
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* Header Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Briefcase size={24} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  Sponsored Research & Consultancy
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  Institutional Minor Research Projects (MRP)
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                <BadgeCheck size={14} />
                <span>GTU-ICQC Sanctioned</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold block">Sanctioned Projects</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#1a5d2e] mt-0.5">02</p>
              <span className="text-[11px] font-sans text-emerald-700">RPS-MRP Grants</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
              <span className="text-[11px] font-mono uppercase text-blue-800 font-bold block">Funding Agency</span>
              <p className="text-sm font-serif font-bold text-blue-950 mt-1 truncate">GTU-ICQC-RPS-MRP</p>
              <span className="text-[11px] font-sans text-blue-700">Gujarat Tech. University</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
              <span className="text-[11px] font-mono uppercase text-amber-800 font-bold block">Agency Type</span>
              <p className="text-sm font-serif font-bold text-amber-950 mt-1">Government</p>
              <span className="text-[11px] font-sans text-amber-800">State / Autonomous</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100">
              <span className="text-[11px] font-mono uppercase text-purple-800 font-bold block">Total Outlay</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-purple-950 mt-0.5">₹ 90,000</p>
              <span className="text-[11px] font-sans text-purple-700">Sanctioned Budget</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-mono font-semibold text-slate-400 mr-2">Filter by Status:</span>
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                statusFilter === "ALL"
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Projects (2)
            </button>
            <button
              onClick={() => setStatusFilter("GOING_ON")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                statusFilter === "GOING_ON"
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Going On / Active (1)
            </button>
            <button
              onClick={() => setStatusFilter("COMPLETED")}
              className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                statusFilter === "COMPLETED"
                  ? "bg-[#1a5d2e] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Completed (1)
            </button>
          </div>
        </motion.div>

        {/* Consultancy Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const isGoingOn = project.status === "Going on";

            return (
              <motion.div
                key={project.srNo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 space-y-6 group"
              >
                <div className="space-y-5">
                  {/* Top Status & S.No */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        isGoingOn
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : "bg-emerald-50 text-[#1a5d2e] border border-emerald-200"
                      }`}
                    >
                      {isGoingOn ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                          <span>Status: Going on</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={13} className="text-[#1a5d2e]" />
                          <span>Status: Completed</span>
                        </>
                      )}
                    </span>

                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                      #{project.srNo}
                    </span>
                  </div>

                  {/* Principal Investigator */}
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200/60 font-bold">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                        Name of Principal Investigator
                      </span>
                      <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#1a5d2e] transition-colors">
                        {project.principalInvestigator}
                      </h4>
                      {project.designation && (
                        <p className="text-[11px] font-sans text-slate-500 mt-0.5">
                          {project.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Research Project Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#1a5d2e] flex items-center gap-1 tracking-wider">
                      <FileText size={11} />
                      <span>Title of Research Project</span>
                    </span>
                    <h5 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                      {project.projectTitle}
                    </h5>
                  </div>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs font-sans">
                    
                    {/* Grant Date */}
                    <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <Calendar size={11} />
                        <span>Grant Date</span>
                      </span>
                      <span className="font-semibold text-slate-900 font-mono text-xs block">
                        {project.grantDate}
                      </span>
                      <span className="text-[10px] font-sans text-slate-500">
                        Started: {project.startedYear}
                      </span>
                    </div>

                    {/* Sanctioned Cost / Outlay */}
                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/80 space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-emerald-800 flex items-center gap-1 font-bold">
                        <IndianRupee size={11} />
                        <span>Sanctioned Cost</span>
                      </span>
                      <span className="font-bold text-[#1a5d2e] font-mono text-sm block">
                        ₹ {project.totalCostINR}
                      </span>
                      <span className="text-[10px] font-sans text-emerald-700">
                        Total Project Layout
                      </span>
                    </div>

                    {/* Funding Agency */}
                    <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-0.5 col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <Building2 size={11} />
                        <span>Funding Agency</span>
                      </span>
                      <span className="font-bold text-slate-900 text-xs block">
                        {project.fundingAgency}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold uppercase">
                        Type: {project.agencyType}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-0.5 col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <MapPin size={11} />
                        <span>Agency Location</span>
                      </span>
                      <span className="font-semibold text-slate-900 text-xs block">
                        {project.agencyLocation}
                      </span>
                      <span className="text-[10px] font-sans text-slate-500">
                        State & Country
                      </span>
                    </div>

                  </div>
                </div>

                {/* Card Footer: Agency Verification */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-sans text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Landmark size={13} className="text-[#1a5d2e]" />
                    <span>GTU-ICQC MRP Grant</span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-700">
                    {project.startedYear} Cycle
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Institutional Note */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#1a5d2e] shrink-0" />
            <span>Research Promotion Scheme (RPS) - Minor Research Projects (MRP) approved by Gujarat Technological University (GTU) Innovation & Quality Council (ICQC).</span>
          </div>
          <span className="font-mono text-slate-400">CKPIPSR R&D Cell</span>
        </div>

      </div>
    </SubPageLayout>
  );
}
