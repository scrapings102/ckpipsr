import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lightbulb, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Building2, 
  Award, 
  Briefcase, 
  Network, 
  Rocket, 
  Share2, 
  Layers, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  Compass, 
  ChevronRight,
  Globe2,
  Cpu,
  BookOpen
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

type TabType = "about" | "structure";

interface StructureMember {
  no: number;
  name: string;
  designation: string;
  role: string;
  responsibility: string;
  isExternal?: boolean;
}

const structureMembers: StructureMember[] = [
  {
    no: 1,
    name: "Dr. Dhiren P. Shah",
    designation: "Principal",
    role: "President",
    responsibility: "Govern all activities under IIC",
    isExternal: false
  },
  {
    no: 2,
    name: "Dr. Bhumika C. Desai",
    designation: "Asso. Professor",
    role: "Vice president",
    responsibility: "Govern and coordinate all activities under IIC",
    isExternal: false
  },
  {
    no: 3,
    name: "Dr.Vinod D. Ramani",
    designation: "Assoc. Professor",
    role: "Convener, IPR Activity Co-oridinator",
    responsibility: "1.Communicate all activities under IIC among faculty students, faculty and MIC 2.IPR Activity",
    isExternal: false
  },
  {
    no: 4,
    name: "Mr. Dipayan Tarafder",
    designation: "Asst. Professor",
    role: "Innovation Activity Co-oridinator",
    responsibility: "Innovation Activity",
    isExternal: false
  },
  {
    no: 5,
    name: "Dr. Devendra J. Vaishnav",
    designation: "Asst. Professor",
    role: "Start up activity Co-oridinator",
    responsibility: "Start up activity",
    isExternal: false
  },
  {
    no: 6,
    name: "Mr. Yahya Ali Moolla",
    designation: "Asst. Professor",
    role: "Internship activity Co-oridinator",
    responsibility: "Internship activity",
    isExternal: false
  },
  {
    no: 7,
    name: "Mr. Nirmal T. Mehta",
    designation: "Asst. Professor",
    role: "Social Media coordinator",
    responsibility: "Social media coordination",
    isExternal: false
  },
  {
    no: 8,
    name: "Dr Praful D Bharadia",
    designation: "Professor, L.M. College Of Pharmacy, Coordinator, Student Startup and Innovation Policy (SSIP), LMCP Nodal Centre, Mentor, Atal Incubation Centre, LMCP- AIC Foundation, Ahmedabad College in Ahmedabad, Gujarat",
    role: "Incubation Center (External Member)",
    responsibility: "Provide mentoring, incubation guidance and business network support.",
    isExternal: true
  },
  {
    no: 9,
    name: "Mr Kamlesh Zota",
    designation: "Director, Zota health care limited, Surat",
    role: "Expert from Industry (External Member)",
    responsibility: "As Technical Expert and mentor to the institute students",
    isExternal: true
  },
  {
    no: 10,
    name: "Mr Nirmal Kumar shah",
    designation: "Debt Manager at ICICI Bank, Surat",
    role: "Bank / Investor (External member)",
    responsibility: "Educate students about loan schemes, grant, and investments regarding startup and entrepreneurship",
    isExternal: true
  }
];

export default function IIC() {
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const objectives = [
    "Create and sustain innovation and entrepreneurship culture in campus.",
    "Streamline and strengthen innovation and entrepreneurship ecosystem in campus."
  ];

  const rolesAndResponsibilities = [
    "Establish Synergy and coherency among various departments and units and better mobile resources to support innovation and entrepreneurship.",
    "Plan, develop and support institution in formation and implementation of innovation and entrepreneurship policies at the institute level.",
    "Plan and conduct various time-bounded innovation and entrepreneurship promotion activities round the year to generate awareness on innovation and startup.",
    "Encourage, recognize and reward students, faculty members and staffs for their engagement, involvement and supporting innovation and entrepreneurship achievements.",
    "Facilitate intra-institutional and inter-institutional interactions and partnership to promote interdisciplinary and multi-disciplinary innovations and entrepreneurial teams.",
    "Network, collaborate, and partnership with ecosystem enablers at the regional, state and national level and support system development to provide easy access to resource to innovators and entrepreneurs.",
    "Plan, build, manage and mobilize resources for the pre-incubation and incubation facility and service support creation.",
    "Plan and conduct challenges, competitions, hackathons in the campus and encourage students to participate.",
    "Create innovation repository of ideas, innovations, startups at the Institute level (YUKTI) and provide support to them and connect/linkage with ecosystem enablers for incubation, investment, IP and technology transfer service support.",
    "Nominate faculty members of the IIC to undergo Innovation Ambassador Training and encourage them to perform post-training tasks such as delivering expert talks on innovation and startup, engage in mentoring role etc. as prescribed for the Innovation Ambassadors.",
    "Train and build capacity of faculty members in innovation and entrepreneurship to play a hybrid role as mentor, drive IIC activities, innovator and entrepreneur.",
    "Organize interactions with entrepreneurs, investors, ecosystem enablers and create a pool of experts to mentor student innovators & entrepreneurs.",
    "Extend mentoring support to other IIC institutions and encourage HEIs to join the IIC network."
  ];

  return (
    <SubPageLayout
      title="Institution's Innovation Council (IIC)"
      subtitle="Ministry of Education (MoE) Innovation Cell Initiative at CKPIPSR"
      category="research-and-innovation"
      activeItemLabel="IIC"
    >
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Sub-Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar bg-slate-50/80 p-1.5 gap-1.5 sm:gap-2">
            {[
              { id: "about", label: "About", icon: FileText },
              { id: "structure", label: "Organizational Structure", icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive 
                      ? "text-[#1a5d2e] bg-white shadow-xs border border-slate-200" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[#1a5d2e]" : "text-slate-400"} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeIICTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1a5d2e] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: About (Exact Content from Provided Snapshot) */}
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Objectives */}
                <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-slate-50 to-white border border-emerald-200/80 shadow-xs space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1a5d2e] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Target size={20} />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                          Core Mandate
                        </span>
                        <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight">
                          Objectives
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {objectives.map((obj, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-emerald-100/90 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                            ✓
                          </div>
                          <p className="text-xs sm:text-sm font-sans font-medium text-slate-700 leading-relaxed">
                            {obj}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-emerald-100/80 text-[11px] font-sans text-slate-500 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#1a5d2e]" />
                      <span>MoE's Innovation Cell (MIC) Certified</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Roles & Responsibilities */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0">
                      <Lightbulb size={20} className="text-amber-700" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-amber-900 uppercase tracking-wider block">
                        Operational Framework
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight">
                        Roles & Responsibilities
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {rolesAndResponsibilities.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-4.5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-[#1a5d2e]/30 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5"
                      >
                        <span className="font-mono text-xs font-bold text-[#1a5d2e] bg-emerald-50 border border-emerald-200/70 w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed font-normal">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Tab 2: Organizational Structure */}
          {activeTab === "structure" && (
            <motion.div
              key="structure-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      Council Governance
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      IIC Organizational Structure
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                    Institute ID – IC202217445
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                    10 Council Members
                  </span>
                </div>
              </div>

              {/* Members Grid Cards (Image not required) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {structureMembers.map((member) => {
                  const isPresident = member.role.toLowerCase() === "president";
                  const isVicePresident = member.role.toLowerCase().includes("vice");
                  const isConvener = member.role.toLowerCase().includes("convener");

                  return (
                    <div
                      key={member.no}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                        isPresident
                          ? "bg-gradient-to-br from-emerald-50/70 to-white border-emerald-300/80 shadow-xs hover:shadow-md"
                          : isVicePresident || isConvener
                          ? "bg-gradient-to-br from-blue-50/40 to-white border-blue-200/80 shadow-xs hover:shadow-md"
                          : member.isExternal
                          ? "bg-gradient-to-br from-amber-50/40 to-white border-amber-200/80 shadow-xs hover:shadow-md"
                          : "bg-slate-50/60 hover:bg-white border-slate-200 hover:border-[#1a5d2e]/40 hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                              isPresident
                                ? "bg-[#1a5d2e] text-white border-[#1a5d2e]"
                                : isVicePresident || isConvener
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : member.isExternal
                                ? "bg-amber-100 text-amber-900 border-amber-200"
                                : "bg-slate-200/80 text-slate-700 border-slate-300"
                            }`}
                          >
                            {member.role}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{member.no}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-snug">
                            {member.name}
                          </h4>
                          <div className="flex items-start gap-1.5 text-xs font-sans font-medium text-slate-600">
                            <Briefcase size={13} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{member.designation}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 space-y-1 text-xs font-sans">
                        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                          Responsibility
                        </span>
                        <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                          {member.responsibility}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SubPageLayout>
  );
}
