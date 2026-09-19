import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Briefcase, 
  Award, 
  Building2, 
  GraduationCap, 
  Target, 
  CheckCircle2, 
  Layers,
  Search,
  BookOpen,
  Filter
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface MemberItem {
  id: number;
  role: string;
  name: string;
  designation: string;
  category: "Management & Governance" | "Institutional Leadership" | "Faculty Representatives" | "Industry Experts";
  badgeColor: "emerald" | "blue" | "purple" | "amber";
}

const membersData: MemberItem[] = [
  {
    id: 1,
    role: "Senior administrator",
    name: "Shri Rameshchandra A. Mistry",
    designation: "Trustee / Secretary",
    category: "Management & Governance",
    badgeColor: "emerald"
  },
  {
    id: 2,
    role: "Member from management",
    name: "Shri Birenbhai M. Pithawalla",
    designation: "Trustee",
    category: "Management & Governance",
    badgeColor: "emerald"
  },
  {
    id: 3,
    role: "Principal/Director of the concerned Technical Institution",
    name: "Dr. Dhiren P Shah",
    designation: "Principal",
    category: "Institutional Leadership",
    badgeColor: "blue"
  },
  {
    id: 4,
    role: "Senior teacher as coordinator",
    name: "Dr. Bhumikaben Desai",
    designation: "Associate Professor",
    category: "Institutional Leadership",
    badgeColor: "blue"
  },
  {
    id: 5,
    role: "Teacher Representative",
    name: "Dr. Vinod Ramani",
    designation: "Associate Professor",
    category: "Faculty Representatives",
    badgeColor: "purple"
  },
  {
    id: 6,
    role: "Teacher Representative",
    name: "Mr. Dipayan Tarafdar",
    designation: "Assistant Professor",
    category: "Faculty Representatives",
    badgeColor: "purple"
  },
  {
    id: 7,
    role: "Teacher Representative",
    name: "Mr. Yahya A Moolla",
    designation: "Assistant Professor",
    category: "Faculty Representatives",
    badgeColor: "purple"
  },
  {
    id: 8,
    role: "Teacher Representative",
    name: "Mrs. Prakruti Jadav",
    designation: "Assistant Professor",
    category: "Faculty Representatives",
    badgeColor: "purple"
  },
  {
    id: 9,
    role: "External Industrial expert 1",
    name: "Mr. Kamlesh Zota",
    designation: "Director, Zota healthcare Ltd.",
    category: "Industry Experts",
    badgeColor: "amber"
  },
  {
    id: 10,
    role: "External Industrial expert 2",
    name: "Dr. Bhanubhai Vaghasiya",
    designation: "Director,Globela Pharma. Pvt. Ltd.",
    category: "Industry Experts",
    badgeColor: "amber"
  }
];

export default function IQACComposition() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Members", count: membersData.length },
    { id: "Management & Governance", label: "Trust & Management", count: 2 },
    { id: "Institutional Leadership", label: "Leadership & Coordinator", count: 2 },
    { id: "Faculty Representatives", label: "Faculty Representatives", count: 4 },
    { id: "Industry Experts", label: "External Industry Experts", count: 2 }
  ];

  const filteredMembers = membersData.filter((member) => {
    const matchesFilter = selectedFilter === "all" || member.category === selectedFilter;
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SubPageLayout
      title="IQAC Composition"
      subtitle="Constituted Committee for Institutional Quality Assurance (QA) & Quality Enhancement (QE)"
      category="iqac"
      activeItemLabel="IQAC Composition"
    >
      <div className="space-y-10 max-w-6xl mx-auto">
        
        {/* Mandate & Core Mechanism Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <ShieldCheck size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  NAAC Quality Framework
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  IQAC Committee Composition
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                10 Constituted Members
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                QA & QE Mechanism
              </span>
            </div>
          </div>

          {/* Statement Provided by User */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-slate-50 to-white border border-emerald-200/70 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Sparkles size={14} className="text-[#1a5d2e]" />
              <span>Core Mechanism & Objectives</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              IQAC is conceived as a mechanism to build and ensure a quality culture at the institutional level. The IQAC is meant for planning, guiding and maintaining Quality Assurance (QA) and Quality Enhancement (QE) activities of the institution.
            </p>
          </div>

          {/* Summary Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#1a5d2e] flex items-center justify-center shrink-0">
                <Building2 size={16} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Trustee Governance</strong>
                <span className="text-slate-500">2 Senior Management</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Target size={16} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Leadership & Head</strong>
                <span className="text-slate-500">Principal & Coordinator</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <GraduationCap size={16} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Faculty Voice</strong>
                <span className="text-slate-500">4 Teacher Representatives</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Award size={16} />
              </div>
              <div className="text-xs">
                <strong className="text-slate-900 block font-semibold">Industry Advisory</strong>
                <span className="text-slate-500">2 Pharma Directors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedFilter === cat.id
                      ? "bg-[#1a5d2e] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    selectedFilter === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search member, role, designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/20 focus:border-[#1a5d2e] transition-all"
              />
            </div>
          </div>

          {/* Members Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMembers.map((member) => {
              const isManagement = member.category === "Management & Governance";
              const isLeadership = member.category === "Institutional Leadership";
              const isIndustry = member.category === "Industry Experts";

              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all duration-300 ${
                    isManagement
                      ? "bg-gradient-to-br from-emerald-50/60 to-white border-emerald-200/90 shadow-xs hover:shadow-md hover:border-emerald-300"
                      : isLeadership
                      ? "bg-gradient-to-br from-blue-50/50 to-white border-blue-200/90 shadow-xs hover:shadow-md hover:border-blue-300"
                      : isIndustry
                      ? "bg-gradient-to-br from-amber-50/50 to-white border-amber-200/90 shadow-xs hover:shadow-md hover:border-amber-300"
                      : "bg-white border-slate-200 hover:border-[#1a5d2e]/40 shadow-xs hover:shadow-md"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Card Top: Number & Category Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                        isManagement
                          ? "bg-emerald-100 text-[#1a5d2e] border-emerald-200"
                          : isLeadership
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : isIndustry
                          ? "bg-amber-100 text-amber-900 border-amber-200"
                          : "bg-purple-100 text-purple-800 border-purple-200"
                      }`}>
                        {member.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        #{member.id < 10 ? `0${member.id}` : member.id}
                      </span>
                    </div>

                    {/* Member Name */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 leading-snug">
                        {member.name}
                      </h3>
                    </div>

                    {/* Role Tag & Details */}
                    <div className="space-y-2.5 pt-1">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                          Role in IQAC
                        </span>
                        <div className="inline-flex items-start gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100 w-full">
                          <CheckCircle2 size={14} className="text-[#1a5d2e] shrink-0 mt-0.5" />
                          <p className="text-xs font-sans font-bold text-slate-800 leading-snug">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                          Designation
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-sans font-medium text-slate-700">
                          <Briefcase size={13} className="text-[#1a5d2e] shrink-0" />
                          <span>{member.designation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>C.K.P.I.P.S.R. IQAC</span>
                    <span className="font-semibold text-slate-500">Member #{member.id}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredMembers.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Users size={32} className="mx-auto text-slate-300" />
              <h4 className="text-base font-serif font-bold text-slate-800">No Members Found</h4>
              <p className="text-xs text-slate-500">No committee members matched your search query.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedFilter("all"); }}
                className="text-xs font-mono font-bold text-[#1a5d2e] hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </SubPageLayout>
  );
}
