import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Lightbulb, 
  Target, 
  CheckCircle2, 
  Compass, 
  Users, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Building2, 
  ArrowRight, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  Clock,
  Layers,
  ChevronRight,
  HelpCircle,
  Cpu
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

type TabType = "about" | "core-committee" | "scrutiny-committee" | "contact";

interface CoreCommitteeMember {
  no: number;
  role: string;
  name: string;
  designation: string;
  responsibility: string;
}

interface ScrutinyCommitteeMember {
  no: number;
  role: string;
  name: string;
  designation: string;
  responsibility: string;
}

const coreCommitteeMembers: CoreCommitteeMember[] = [
  {
    no: 1,
    role: "Chairperson",
    name: "Dr. Dhiren P. Shah",
    designation: "Principal",
    responsibility: "-"
  },
  {
    no: 2,
    role: "Co-Ordinator",
    name: "Dr. Vinod D. Ramani",
    designation: "Assoc. Professor",
    responsibility: "-"
  },
  {
    no: 3,
    role: "Member",
    name: "Dr. Bhumika C. Desai",
    designation: "Assoc. Professor",
    responsibility: "-"
  },
  {
    no: 4,
    role: "Member",
    name: "Mr. Dipayan Tarafder",
    designation: "Assis. Professor",
    responsibility: "-"
  },
  {
    no: 5,
    role: "Member",
    name: "Mr. Yahya Moolla",
    designation: "Assis. Professor",
    responsibility: "-"
  }
];

const scrutinyCommitteeMembers: ScrutinyCommitteeMember[] = [
  {
    no: 1,
    role: "Chairperson",
    name: "Dr. Dhiren P. Shah",
    designation: "Educational Institutions Head",
    responsibility: "-"
  },
  {
    no: 2,
    role: "Member",
    name: "Mr. Kamlesh Zota",
    designation: "Industry Expert (Industrialist/ innovator/ Investor)",
    responsibility: "-"
  },
  {
    no: 3,
    role: "Member",
    name: "Mr. Haresh H. Korat",
    designation: "Industry Expert/ Alumni (having own Startup/Patent/ Innovation/ Industry)",
    responsibility: "-"
  },
  {
    no: 4,
    role: "Member",
    name: "Mr. Kamal Chapaneria",
    designation: "Finance Expert (CA/CS)",
    responsibility: "-"
  },
  {
    no: 5,
    role: "Member",
    name: "Dr. Vineet C. Jain",
    designation: "Academic Expert-1-Invited",
    responsibility: "-"
  },
  {
    no: 6,
    role: "Member",
    name: "Dr. Hitesh Dalvadi",
    designation: "Academic Expert-2-Invited",
    responsibility: "-"
  },
  {
    no: 7,
    role: "Member",
    name: "Dr. Anish Gandhi",
    designation: "Technical Expert/ IPR Expert",
    responsibility: "-"
  },
  {
    no: 8,
    role: "Member",
    name: "Mr. Tejas Patel",
    designation: "IPR Expert",
    responsibility: "-"
  },
  {
    no: 9,
    role: "Member",
    name: "Mr. Kalp Bhatt",
    designation: "Startup ecosystem expert",
    responsibility: "-"
  },
  {
    no: 10,
    role: "Member Secretory",
    name: "Dr. Vinodkumar D. Ramani",
    designation: "Institutions SSIP Coordinator",
    responsibility: "-"
  }
];

interface SSIPContactPerson {
  name: string;
  designation: string;
  institution: string;
  officeNumber: string;
  mobileNo: string;
}

const ssipContacts: SSIPContactPerson[] = [
  {
    name: "DR. DHIREN P. SHAH",
    designation: "Principal & Professor",
    institution: "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    officeNumber: "63550 65636",
    mobileNo: "9427474602"
  },
  {
    name: "DR. VINODKUMAR D. RAMANI",
    designation: "Associate Professor",
    institution: "C. K. Pithawalla Institute of Pharmaceutical Science and Research, Surat",
    officeNumber: "63550 65636",
    mobileNo: "9913792913"
  }
];

export default function AboutSSIP() {
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const objectivesList = [
    {
      no: "01",
      title: "Facilitate & Pre-Incubate",
      text: "To facilitate and pre-incubate innovative ideas, to go through a stage of proof of concept, prototype, product, testing and trial, redesign, and development of utility.",
      icon: Lightbulb,
      tag: "Proof of Concept & Prototyping",
      color: "from-amber-500/10 to-orange-500/10 text-amber-800 border-amber-200"
    },
    {
      no: "02",
      title: "Nurture Creative Environment",
      text: "To develop an environment for creativity to flourish and an end-to-end support system in educational institutions to allow ample support to innovative ideas for better execution.",
      icon: Compass,
      tag: "End-to-End Support Ecosystem",
      color: "from-blue-500/10 to-cyan-500/10 text-blue-800 border-blue-200"
    },
    {
      no: "03",
      title: "Mind to Market Pathways",
      text: "To create pathways for the mind to market by harnessing and hand-holding projects/research/innovation/ideas of students in Gujarat.",
      icon: TrendingUp,
      tag: "Commercialization & Hand-holding",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-800 border-emerald-200"
    },
    {
      no: "04",
      title: "Common Showcase Platform",
      text: "To create a common platform to showcase, support, and upscale innovations for motivating stakeholders as well as for an opportunity to create value for money and value for many.",
      icon: Award,
      tag: "Upscale & Value Creation",
      color: "from-purple-500/10 to-indigo-500/10 text-purple-800 border-purple-200"
    }
  ];

  return (
    <SubPageLayout
      title="Student Start-up and Innovation (SSIP)"
      subtitle="Government of Gujarat Student Start-up & Innovation Policy Nodal Centre at CKPIPSR"
      category="research-and-innovation"
      activeItemLabel="SSIP - About"
    >
      <div className="space-y-8 max-w-6xl mx-auto">

        {/* Tab Navigation Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar bg-slate-50/80 p-1.5 gap-1.5 sm:gap-2">
            {[
              { id: "about", label: "About SSIP", icon: FileText },
              { id: "core-committee", label: "Core Committee", icon: Users },
              { id: "scrutiny-committee", label: "Scrutiny Committee", icon: ShieldCheck },
              { id: "contact", label: "Contact Us", icon: Mail }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive 
                      ? "text-[#1a5d2e] bg-white shadow-xs border border-slate-200" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[#1a5d2e]" : "text-slate-400"} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeSSIPTabIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1a5d2e] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: About SSIP (Exact Content from Screenshot) */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            
            {/* Top Overview Narrative Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>Innovation and Pre-incubation Ecosystem Support for Students (IPIES)</span>
                </div>

                <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed">
                  The Student Startup & Innovation Policy (SSIP) of the Government of Gujarat is a first-of-its-kind, 
                  integrated, state-wide, university-based innovation policy in the country that shall create a much-needed 
                  <strong> Innovation and Pre-incubation Ecosystem Support for Students (IPIES)</strong> across the state, 
                  adding to the start-up ecosystem of Gujarat. The policy aims to create a culture of innovation and a spirit 
                  of entrepreneurship that the state of Gujarat already possesses.
                </p>
              </div>
            </div>

            {/* Two Column Grid: Theme & Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Our Theme Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                      Guiding Philosophy
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
                      Our Theme
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-medium">
                    Burgeoning start-up eco-system to uplift and support a brand academia-led innovation, pre-incubation, scale-up, and marketing.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-emerald-800">
                  <CheckCircle2 size={15} className="text-[#1a5d2e]" />
                  <span>Academia-Led Innovation & Pre-Incubation</span>
                </div>
              </div>

              {/* Our Focus Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-blue-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Target size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                      Institutional Execution
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
                      Our Focus
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base font-sans text-slate-700 leading-relaxed font-medium">
                    Constitution of Student start-up and innovation Cell, C. K. Pithawalla Institute of Pharmaceutical Science & Research, Surat.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-blue-800">
                  <Building2 size={15} className="text-blue-700" />
                  <span>CKPIPSR Nodal Innovation Cell</span>
                </div>
              </div>

            </div>

            {/* Objectives Section (Exact 4 Points from Screenshot in High-Craft Cards) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <Compass size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                      Strategic Mandates
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Objectives
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-center">
                  4 Core Pillars of SSIP
                </span>
              </div>

              {/* 4 Objectives Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {objectivesList.map((obj) => {
                  const Icon = obj.icon;
                  return (
                    <div
                      key={obj.no}
                      className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50/70 to-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-700">
                            <Icon size={13} className="text-[#1a5d2e]" />
                            <span>{obj.tag}</span>
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{obj.no}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                          {obj.title}
                        </h4>

                        <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
                          {obj.text}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-1.5 text-xs font-sans text-[#1a5d2e] font-semibold">
                        <CheckCircle2 size={14} />
                        <span>Actionable SSIP Outcome</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* SSIP Support Lifecycle Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Student Innovation Workflow
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                    From Idea to Market Hand-Holding
                  </h3>
                </div>
                <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-emerald-300">
                  Government Sponsored Grant Aid
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: "01", title: "Idea Formulation", desc: "Identification of clinical & pharma unmet needs" },
                  { step: "02", title: "PoC & Prototype", desc: "Laboratory testing, formulation trials & validation" },
                  { step: "03", title: "IPR & Patenting", desc: "Prior art search, provisional filing & guidance" },
                  { step: "04", title: "Start-up & Market", desc: "Company incorporation, scaling & commercialization" }
                ].map((st) => (
                  <div key={st.step} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 block">{st.step}. STEP</span>
                    <h5 className="font-serif font-bold text-white text-base">{st.title}</h5>
                    <p className="text-xs font-sans text-slate-300 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* Tab 2: Core Committee */}
        {activeTab === "core-committee" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Users size={26} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      Institutional Governance
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      SSIP Core Committee
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200 self-start sm:self-center">
                  5 Executive Members
                </span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                The SSIP Core Committee guides the policy execution, monitors pre-incubation activities, reviews student innovation milestones, and allocates resources to student startups at CKPIPSR.
              </p>

              {/* Members Grid Cards (Image not required) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {coreCommitteeMembers.map((member) => {
                  const isChairperson = member.role.toLowerCase() === "chairperson";
                  const isCoordinator = member.role.toLowerCase().includes("ordinat");

                  return (
                    <div
                      key={member.no}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 relative ${
                        isChairperson
                          ? "bg-gradient-to-br from-emerald-50/60 to-white border-emerald-300/80 shadow-xs hover:shadow-md hover:border-[#1a5d2e]"
                          : isCoordinator
                          ? "bg-gradient-to-br from-blue-50/40 to-white border-blue-200/80 shadow-xs hover:shadow-md hover:border-blue-500"
                          : "bg-slate-50/60 hover:bg-white border-slate-200 hover:border-[#1a5d2e]/40 hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                              isChairperson
                                ? "bg-[#1a5d2e] text-white border-[#1a5d2e]"
                                : isCoordinator
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {member.role}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{member.no}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                            {member.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs font-sans font-medium text-slate-600">
                            <Briefcase size={13} className="text-[#1a5d2e] shrink-0" />
                            <span>{member.designation}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-sans text-slate-500">
                        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Responsibility</span>
                        <span className="font-mono font-medium text-slate-600">{member.responsibility}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Scrutiny Committee */}
        {activeTab === "scrutiny-committee" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                      Technical & Financial Evaluation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      SSIP Scrutiny Committee
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 self-start sm:self-center">
                  10 Committee Members
                </span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                The Scrutiny Committee assesses all student project applications for Proof of Concept (PoC) grants, 
                prototype fabrication funds, and patent filing subsidies according to Gujarat SSIP government norms.
              </p>

              {/* Committee Members Grid Cards (Image not required) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {scrutinyCommitteeMembers.map((member) => {
                  const isChairperson = member.role.toLowerCase() === "chairperson";
                  const isMemberSecretary = member.role.toLowerCase().includes("secret");

                  return (
                    <div
                      key={member.no}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 relative ${
                        isChairperson
                          ? "bg-gradient-to-br from-emerald-50/60 to-white border-emerald-300/80 shadow-xs hover:shadow-md hover:border-[#1a5d2e]"
                          : isMemberSecretary
                          ? "bg-gradient-to-br from-blue-50/40 to-white border-blue-200/80 shadow-xs hover:shadow-md hover:border-blue-500"
                          : "bg-slate-50/60 hover:bg-white border-slate-200 hover:border-amber-500/40 hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                              isChairperson
                                ? "bg-[#1a5d2e] text-white border-[#1a5d2e]"
                                : isMemberSecretary
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-amber-50 text-amber-900 border-amber-200"
                            }`}
                          >
                            {member.role}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{member.no}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                            {member.name}
                          </h4>
                          <div className="flex items-start gap-1.5 text-xs font-sans font-medium text-slate-600">
                            <Briefcase size={13} className="text-amber-700 shrink-0 mt-0.5" />
                            <span className="leading-snug">{member.designation}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-sans text-slate-500">
                        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Responsibility</span>
                        <span className="font-mono font-medium text-slate-600">{member.responsibility}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Contact Us */}
        {activeTab === "contact" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Mail size={26} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      Direct Communication
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      SSIP Cell Contact Persons
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200 self-start sm:self-center">
                  Official SSIP Helpdesk
                </span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                For student startup mentorship, proof-of-concept grant queries, IPR assistance, and innovation cell coordination, please contact the designated institute officials below.
              </p>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {ssipContacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50/70 to-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#1a5d2e] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wider">
                          {idx === 0 ? "Institutional Head" : "SSIP Coordinator"}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                          {contact.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-sans font-semibold text-[#1a5d2e] mt-0.5">
                          {contact.designation}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 text-xs font-sans text-slate-600 pt-1">
                        <Building2 size={15} className="text-slate-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{contact.institution}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-100/70 border border-slate-200/60">
                        <div className="flex items-center gap-2 text-xs font-sans text-slate-700">
                          <Phone size={14} className="text-[#1a5d2e]" />
                          <span className="font-medium">Office Number:</span>
                        </div>
                        <a
                          href={`tel:${contact.officeNumber.replace(/\s+/g, '')}`}
                          className="font-mono text-xs font-bold text-slate-900 hover:text-[#1a5d2e] hover:underline"
                        >
                          {contact.officeNumber}
                        </a>
                      </div>

                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                        <div className="flex items-center gap-2 text-xs font-sans text-emerald-900">
                          <Phone size={14} className="text-[#1a5d2e]" />
                          <span className="font-medium">Mobile No.:</span>
                        </div>
                        <a
                          href={`tel:${contact.mobileNo}`}
                          className="font-mono text-xs font-bold text-[#1a5d2e] hover:text-[#144723] hover:underline"
                        >
                          +91 {contact.mobileNo}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campus Address Footnote */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start sm:items-center gap-3 text-xs font-sans text-slate-600">
                <MapPin size={16} className="text-[#1a5d2e] shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  <strong>Campus Location:</strong> C. K. Pithawalla Institute of Pharmaceutical Science & Research, Near Malvan Mandir, Surat-Dumas Road, Surat - 395007, Gujarat.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Institutional Affiliation & Policy Footer Note */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-[#1a5d2e] shrink-0" />
            <span>Supported by Education Department, Government of Gujarat under Student Start-up and Innovation Policy.</span>
          </div>
          <span className="font-mono text-slate-400">CKPIPSR SSIP Nodal Centre</span>
        </div>

      </div>
    </SubPageLayout>
  );
}
