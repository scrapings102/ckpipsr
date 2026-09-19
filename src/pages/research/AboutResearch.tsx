import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  FlaskConical, 
  Target, 
  Lightbulb, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ArrowRight, 
  FileText, 
  Layers, 
  Coins, 
  Briefcase, 
  Share2, 
  Award,
  BookOpen,
  Eye,
  Check,
  ChevronRight,
  TrendingUp,
  Cpu,
  Phone,
  Mail,
  Copy,
  Search,
  Users,
  Shield,
  BadgeCheck,
  Hash
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface RDCMember {
  no: number;
  name: string;
  designation: string;
  role: string;
  responsibility: string;
  contact: string;
  email: string;
}

const rdcMembers: RDCMember[] = [
  {
    no: 1,
    name: "Dr. Dhiren P. Shah",
    designation: "Principal",
    role: "Chairperson",
    responsibility: "Convenor",
    contact: "9427474602",
    email: "dhiren.shah@ckpipsr.ac.in"
  },
  {
    no: 2,
    name: "Dr. Vinod D. Ramani",
    designation: "Associate Professor",
    role: "Coordinator",
    responsibility: "Product Development Monitoring & Commercialization",
    contact: "9913792913",
    email: "vinod.ramani@ckpipsr.ac.in"
  },
  {
    no: 3,
    name: "Mr. Naishadh Solanki",
    designation: "Associate Professor",
    role: "Member",
    responsibility: "Finance and infrastructure",
    contact: "9099063116",
    email: "bhumika.desai@ckpipsr.ac.in"
  },
  {
    no: 4,
    name: "Dr. Devendra Vaishnav",
    designation: "Assistant Professor",
    role: "Member",
    responsibility: "Research Program & Policy Development",
    contact: "8320813998",
    email: "devendra.vaishnav@ckpipsr.ac.in"
  },
  {
    no: 5,
    name: "Mr. Jitesh P. Jariwala",
    designation: "Assistant Professor",
    role: "Member",
    responsibility: "Collaboration & Community",
    contact: "9327588060",
    email: "dipayan.tarafdar@ckpipsr.ac.in"
  },
  {
    no: 6,
    name: "Dr. Suchi Desai",
    designation: "Assistant Professor",
    role: "Member",
    responsibility: "Product Development Monitoring & Commercialization",
    contact: "8733826684",
    email: "suchi.desai@ckpipsr.ac.in"
  },
  {
    no: 7,
    name: "Dr. Monika Kakadia",
    designation: "Assistant Professor",
    role: "Member",
    responsibility: "Product Development Monitoring & Commercialization",
    contact: "9409164609",
    email: "monika.kakadiya@ckpipsr.ac.in"
  },
  {
    no: 8,
    name: "Mr. Dhaval B. Joshi",
    designation: "Assistant Professor",
    role: "Member",
    responsibility: "IPR Legal & Ethical Matters",
    contact: "953748224",
    email: "dhaval.joshi@ckpipsr.ac.in"
  }
];

export default function AboutResearch() {
  const [activeTab, setActiveTab] = useState<"about" | "structure" | "objectives" | "action-plans">("about");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(text);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const filteredMembers = rdcMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.responsibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact.includes(searchQuery) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      selectedRole === "All" ||
      (selectedRole === "Chairperson" && m.role.toLowerCase().includes("chairperson")) ||
      (selectedRole === "Coordinator" && m.role.toLowerCase().includes("coordinator")) ||
      (selectedRole === "Member" && m.role.toLowerCase().includes("member"));

    return matchesSearch && matchesRole;
  });

  const tabs = [
    { id: "about", label: "About", icon: FlaskConical },
    { id: "structure", label: "Organizational Structure", icon: Layers },
    { id: "objectives", label: "Objectives", icon: Target },
    { id: "action-plans", label: "Action Plans", icon: TrendingUp }
  ];

  return (
    <SubPageLayout
      title="About Research"
      subtitle="Fostering Innovation, Discovery & Translational Pharmaceutical Research (NEP-2020 Aligned)"
      category="research-and-innovation"
      activeItemLabel="Research - About"
    >
      <div className="space-y-8">
        
        {/* Interactive Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1a5d2e] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Icon size={16} className={isActive ? "text-white" : "text-slate-500"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: About (Exact Content from Snapshot with Professional Visuals & Imagery) */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Top Showcase Banner with Image & Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs overflow-hidden">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#1a5d2e] text-xs font-mono font-bold tracking-wider uppercase">
                    <Sparkles size={13} className="text-[#1a5d2e]" />
                    <span>Research & Development Cell (RDC)</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                    Empowering Next-Generation Pharmaceutical Discoveries
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                    C. K. Pithawalla Institute of Pharmaceutical Science & Research is committed to cultivating an ecosystem of cutting-edge research, scientific inquiry, and technological translation in accordance with the national priorities articulated in the National Education Policy (NEP-2020).
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-lg sm:text-xl font-serif font-bold text-[#1a5d2e]">NEP-2020</div>
                    <div className="text-[11px] font-sans text-slate-500">Aligned Guidelines</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-lg sm:text-xl font-serif font-bold text-[#1a5d2e]">5 Pillars</div>
                    <div className="text-[11px] font-sans text-slate-500">RDC Committees</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 col-span-2 sm:col-span-1">
                    <div className="text-lg sm:text-xl font-serif font-bold text-[#1a5d2e]">100%</div>
                    <div className="text-[11px] font-sans text-slate-500">Ethical Compliance</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[280px] group shadow-inner border border-slate-100">
                <img
                  src="/images/hero/pharmacy_lab.jpg"
                  alt="CKPIPSR Advanced Pharmaceutical Research Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[11px] font-mono font-semibold uppercase text-emerald-300 tracking-wider">
                    CKPIPSR Laboratories
                  </span>
                  <p className="text-white text-sm font-sans font-medium">
                    State-of-the-Art Pharmaceutical Formulation & Analytical Instrumentation
                  </p>
                </div>
              </div>
            </div>

            {/* Vision & Mission Row (2 Column Layout as per Snapshot) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Vision & Mission */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Vision Box */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] border border-emerald-100 flex items-center justify-center font-bold">
                      <Eye size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                        Guiding Light
                      </span>
                      <h4 className="text-xl font-serif font-bold text-slate-900">
                        Vision
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60">
                    To put in place a robust mechanism for developing and strengthening the research ecosystem within HEIs, aligned with the provisions of NEP-2020.
                  </p>
                </div>

                {/* Mission Box */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] border border-emerald-100 flex items-center justify-center font-bold">
                      <Target size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                        Core Objectives
                      </span>
                      <h4 className="text-xl font-serif font-bold text-slate-900">
                        Mission
                      </h4>
                    </div>
                  </div>

                  <ul className="space-y-3.5 pt-1">
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                      <span>To create a conducive environment for enhanced research productivity.</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                      <span>To encourage collaboration across industry, government, community-based organizations, and agencies at the local, national, and international levels.</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">✓</span>
                      <span>To facilitate greater access to research through mobilization of resources and funding.</span>
                    </li>
                  </ul>
                </div>

                {/* Additional Research Visual Card */}
                <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs overflow-hidden">
                  <div className="relative rounded-2xl overflow-hidden h-48 group">
                    <img
                      src="/images/hero/students_learning.jpg"
                      alt="Research scholars collaborating"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                      <p className="text-white text-xs font-sans font-medium">
                        Scholars engaging in pharmaceutical research projects
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Responsibilities (5 Committees) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase font-bold text-[#1a5d2e] tracking-wider">
                        Operational Framework
                      </span>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                        Responsibilities
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-6">
                    
                    {/* 1. Finance and infrastructure */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Coins size={18} className="text-[#1a5d2e] shrink-0" />
                        <h5 className="font-serif font-bold text-base text-slate-900">
                          Finance and infrastructure
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        The Finance and Infrastructure Committee provides an assurance on the development and delivery of key elements to facilitate research. It is responsible for overseeing the development and implementation of the financial, estates and digital infrastructure objectives of the RDC. Its aim is to ensure that the RDC is operating in line with strategic objectives of the Institute.
                      </p>
                    </div>

                    {/* 2. Research Program & Policy Development */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <FileText size={18} className="text-[#1a5d2e] shrink-0" />
                        <h5 className="font-serif font-bold text-base text-slate-900">
                          Research Program & Policy Development
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        This committee provides impetus to the research and development activities and to provide guidance, directions to the research community within the Institute. It has representation from all departments. The committee is a vibrant entity to discuss and propose R&D policy issues. The members highlight shortcomings in procedural matters and thus sharpen the performance of the RDC.
                      </p>
                    </div>

                    {/* 3. Collaboration & Community */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Share2 size={18} className="text-[#1a5d2e] shrink-0" />
                        <h5 className="font-serif font-bold text-base text-slate-900">
                          Collaboration & Community
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        The main responsibility of this committee is to establish collaboration with other universities, public and private sectors and identify R&D projects including consultancy services which could be undertaken at the institution. This committee will foster collaborations for mutual benefits and to maximize industrial connectivity.
                      </p>
                    </div>

                    {/* 4. Product Development, Monitoring & Commercialization */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Cpu size={18} className="text-[#1a5d2e] shrink-0" />
                        <h5 className="font-serif font-bold text-base text-slate-900">
                          Product Development, Monitoring & Commercialization
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        The committee is a hub for strategic partnerships/ collaborations, industry-institute interface, sponsored or contract research, new knowledge generation, technology transfer, and commercialization of research to facilitate innovation, incubation, entrepreneurship and start-up ventures.
                      </p>
                    </div>

                    {/* 5. IPR, Legal & Ethical Matters */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Scale size={18} className="text-[#1a5d2e] shrink-0" />
                        <h5 className="font-serif font-bold text-base text-slate-900">
                          IPR, Legal & Ethical Matters
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        This committee will function with the prime focus of enabling researchers to identify, generate and protect their intellectual property (IP) through filing procedures for rights like patents, copyrights, trademarks, designs, etc. This committee envision creating an environment for acquiring new knowledge through innovation, developing an attitude of prudent IP management practices and promoting an IPR culture compatible with the educational mission of the academic institution. This committee also provide advice and guidance to the academic community on all matters pertaining to academic research ethics.
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Tab 2: Organizational Structure */}
        {activeTab === "structure" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Institute ID & Header Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                    <Layers size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                        Governance & Leadership
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#1a5d2e] text-[11px] font-mono font-bold">
                        <Hash size={12} />
                        <span>Institute ID: IC202217445</span>
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      R&D Cell Organizational Structure
                    </h3>
                  </div>
                </div>

                {/* Quick Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, role, responsibility..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#1a5d2e] focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Role Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["All", "Chairperson", "Coordinator", "Member"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedRole === role
                        ? "bg-[#1a5d2e] text-white shadow-2xs"
                        : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* 8 Committee Members Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMembers.map((member) => (
                  <div
                    key={member.no}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5 space-y-4"
                  >
                    <div className="space-y-3.5">
                      {/* Top: Serial No Badge & Role Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">
                          #{member.no}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md font-mono text-[11px] font-bold tracking-tight ${
                            member.role === "Chairperson"
                              ? "bg-emerald-100 text-[#1a5d2e] border border-emerald-200"
                              : member.role === "Coordinator"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>

                      {/* Member Info: Name & Designation */}
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-slate-900 text-base leading-snug group-hover:text-[#1a5d2e] transition-colors">
                          {member.name}
                        </h4>
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">
                          {member.designation}
                        </p>
                      </div>

                      {/* Responsibility Box */}
                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs font-sans space-y-1">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                          Responsibility
                        </span>
                        <p className="font-medium text-slate-800 leading-snug">
                          {member.responsibility}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Direct Contact Actions */}
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-sans">
                      {/* Phone */}
                      <div className="flex items-center justify-between text-slate-700">
                        <div className="flex items-center gap-2 min-w-0">
                          <Phone size={13} className="text-[#1a5d2e] shrink-0" />
                          {member.contact && member.contact !== "-" ? (
                            <a
                              href={`tel:${member.contact.replace(/[^0-9]/g, "")}`}
                              className="font-mono font-medium hover:text-[#1a5d2e] hover:underline truncate"
                            >
                              {member.contact}
                            </a>
                          ) : (
                            <span className="text-slate-400 font-mono">Not Available</span>
                          )}
                        </div>

                        {member.contact && member.contact !== "-" && (
                          <button
                            onClick={() => handleCopy(member.contact)}
                            title="Copy number"
                            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                          >
                            {copiedContact === member.contact ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail size={13} className="text-[#1a5d2e] shrink-0" />
                        {member.email && member.email !== "-" ? (
                          <a
                            href={`mailto:${member.email}`}
                            className="font-mono text-[11.5px] hover:text-[#1a5d2e] hover:underline truncate block"
                            title={member.email}
                          >
                            {member.email}
                          </a>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11.5px]">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12 text-slate-500 font-sans space-y-2">
                  <Users size={32} className="mx-auto text-slate-300" />
                  <p className="text-sm font-medium">No committee members matched your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedRole("All");
                    }}
                    className="text-xs text-[#1a5d2e] font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Objectives */}
        {activeTab === "objectives" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                  <Target size={24} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    Institutional Goals & Mandate
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Objectives of Research & Development Cell
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Objective 1 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    01
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To create an organizational structure with role-based functions of RDC, formulate Research Policy for the HEIs, identify thrust areas of research, and form related cluster groups/frontline teams/consortia of researchers.
                  </p>
                </div>

                {/* Objective 2 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    02
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To create enabling provisions in Research Policies for recruitment of research personnel, procurement of equipment, and financial management with adequate autonomy to the Principal Investigator(s) and disseminate research outcomes to stakeholders and the public at large.
                  </p>
                </div>

                {/* Objective 3 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    03
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To establish a special purpose vehicle to promote researchers and innovators, identify potential collaborators from industry, research organizations, academic institutions & other stakeholders for cooperation and synergistic partnerships.
                  </p>
                </div>

                {/* Objective 4 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    04
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To act as a liaison between researchers & relevant research funding agencies, extend guidance in preparation & submission of project proposals and post-sanctioning of the grants to oversee adherence to timelines.
                  </p>
                </div>

                {/* Objective 5 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    05
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To have better coordination among other cells/centers dealing with institute-Industry Inter Linkage, Incubation, Innovation and Entrepreneurship Development and Intellectual Property Rights (IPR).
                  </p>
                </div>

                {/* Objective 6 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    06
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To develop an Institutional Research Information System for sharing the status of ongoing/ completed research projects/Programmes, expertise & resources, etc., making effective use of Information & Communication Technology (ICT) for preparing the database of in-house experts to provide industrial consultancy and services.
                  </p>
                </div>

                {/* Objective 7 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    07
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To engage & utilize the services of superannuated active faculty/scientists in research capacity building of talented young minds and promote mobility of researchers across institutions and R&D Labs.
                  </p>
                </div>

                {/* Objective 8 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 flex items-start gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0 font-bold font-mono text-sm group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                    08
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-0.5">
                    To serve as nodal center for ideation and conceptualization of research topics/themes by organizing workshops and training programs and ensuring the integrity and ethical practices in research activities including clearance of bioethical committee wherever required.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Action Plans */}
        {activeTab === "action-plans" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-8">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    Execution Framework & Initiatives
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Action Plans of Research & Development Cell
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Action Plan 1 */}
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 space-y-5 flex flex-col justify-between hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] font-mono font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                        01
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        To sensitize faculty and students regarding project work based on market needs
                      </h4>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans pt-1">
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Organize guest lectures of entrepreneurship by intrapreneurs</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Organize round table discussion with different industrialists to gage about current market demands and industrial problems</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Organize workshop on market analysis for product viability</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Organize workshop and seminars for product development and product life cycles</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Organize Ideathon, Hackathon for current industrial challenges</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Plan 2 */}
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 space-y-5 flex flex-col justify-between hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] font-mono font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                        02
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        To create inhouse facility for product development in diverse technical filed
                      </h4>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans pt-1">
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To make aware about available facility in our campus</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To collect project-based facility requirement form students and faculty members</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To propose collaboration between various institutes and laboratories to share their lab facility and expertise</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To propose centralized facility for R&D work</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Plan 3 */}
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 space-y-5 flex flex-col justify-between hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] font-mono font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                        03
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        To schedule and monitor progress of ongoing project work in our institute
                      </h4>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans pt-1">
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To list out department wise ongoing project works</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To review progress of ongoing project work</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To address the challenges and huddles faced by researchers in their current work</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To establish reward and recognition mechanism for accomplishment of each research work</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Plan 4 */}
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 space-y-5 flex flex-col justify-between hover:border-emerald-200 hover:bg-emerald-50/20 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1a5d2e] font-mono font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#1a5d2e] group-hover:text-white transition-colors shadow-2xs">
                        04
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        To organize meeting between researcher and investor/industry for commercialization of developed technology
                      </h4>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans pt-1">
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Advertise about currently developed product or services to appropriate industry/investors.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Schedule a regular meeting with our industrial collaborators</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To arrange invited talks of investors from divers filed of technology</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">To monitor progress and renumeration of sold/leased technology</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

      </div>
    </SubPageLayout>
  );
}
