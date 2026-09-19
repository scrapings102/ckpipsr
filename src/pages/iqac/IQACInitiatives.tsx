import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  Target, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Search, 
  CheckCircle2, 
  Award, 
  Layers, 
  Briefcase, 
  Building2, 
  BarChart3, 
  Leaf, 
  Zap, 
  Globe2, 
  MessageSquare, 
  FileText, 
  Trophy, 
  HeartHandshake, 
  Calendar,
  Compass,
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface InitiativeItem {
  id: number;
  text: string;
  category: "Academic & Curriculum" | "Student Mentorship & Support" | "Research & Industry" | "Skills, T&P & Staff" | "Governance & Sustainability";
  icon: React.ElementType;
}

const initiativesList: InitiativeItem[] = [
  {
    id: 1,
    text: "Introduction of new Courses and Postgraduate Courses.",
    category: "Academic & Curriculum",
    icon: GraduationCap
  },
  {
    id: 2,
    text: "Introduction of Certificate courses for bridging the gap and skill development.",
    category: "Academic & Curriculum",
    icon: Award
  },
  {
    id: 3,
    text: "Strategic planning and proper implementation of Academic Calendar for Effective delivery of Curriculum.",
    category: "Academic & Curriculum",
    icon: Calendar
  },
  {
    id: 4,
    text: "Semester wise teaching plan and research activities before start of semester.",
    category: "Academic & Curriculum",
    icon: BookOpen
  },
  {
    id: 5,
    text: "Special emphasis on Problem based, pace adjusted, Self-directed learning.",
    category: "Academic & Curriculum",
    icon: Target
  },
  {
    id: 6,
    text: "Mentors for motivating Fast, Average and Slow learners.",
    category: "Student Mentorship & Support",
    icon: Users
  },
  {
    id: 7,
    text: "Review of student’s attendance and performance on Continuous basis.",
    category: "Student Mentorship & Support",
    icon: BarChart3
  },
  {
    id: 8,
    text: "Orientation programme for First Year students.",
    category: "Student Mentorship & Support",
    icon: Compass
  },
  {
    id: 9,
    text: "Strengthening of Mentor Mentee program and ensuring efficient mentoring system.",
    category: "Student Mentorship & Support",
    icon: HeartHandshake
  },
  {
    id: 10,
    text: "Effective Grievance redressal system.",
    category: "Student Mentorship & Support",
    icon: ShieldCheck
  },
  {
    id: 11,
    text: "PO and CO attainment evaluation measures.",
    category: "Academic & Curriculum",
    icon: BarChart3
  },
  {
    id: 12,
    text: "Regular feedback mechanism and students satisfaction focus.",
    category: "Governance & Sustainability",
    icon: MessageSquare
  },
  {
    id: 13,
    text: "Promotion of research culture and innovation ecosystem.",
    category: "Research & Industry",
    icon: Cpu
  },
  {
    id: 14,
    text: "Strengthening industry institute partnership through MoUs.",
    category: "Research & Industry",
    icon: Briefcase
  },
  {
    id: 15,
    text: "Strengthening of Library and its resources on regular basis.",
    category: "Academic & Curriculum",
    icon: BookOpen
  },
  {
    id: 16,
    text: "Continuous motivation for Students representation in committees.",
    category: "Student Mentorship & Support",
    icon: Users
  },
  {
    id: 17,
    text: "Increasing student’s participation in activities.",
    category: "Student Mentorship & Support",
    icon: TrendingUp
  },
  {
    id: 18,
    text: "Strengthening programs for inculcating Soft skills and Employability skills.",
    category: "Skills, T&P & Staff",
    icon: Sparkles
  },
  {
    id: 19,
    text: "Active Training and Placement.",
    category: "Skills, T&P & Staff",
    icon: Briefcase
  },
  {
    id: 20,
    text: "Non-Teaching Staff Training for quality management.",
    category: "Skills, T&P & Staff",
    icon: Users
  },
  {
    id: 21,
    text: "Sports activities.",
    category: "Skills, T&P & Staff",
    icon: Trophy
  },
  {
    id: 22,
    text: "Proactive Alumni Association.",
    category: "Skills, T&P & Staff",
    icon: GraduationCap
  },
  {
    id: 23,
    text: "Hosting Seminars/ Conferences/ Workshops/ Faculty Development Programs on regular basis.",
    category: "Research & Industry",
    icon: Layers
  },
  {
    id: 24,
    text: "Staff and student welfare measures.",
    category: "Governance & Sustainability",
    icon: HeartHandshake
  },
  {
    id: 25,
    text: "Internal and External auditing.",
    category: "Governance & Sustainability",
    icon: FileText
  },
  {
    id: 26,
    text: "Regular meetings of IQAC to discuss various measures related to quality enhancement.",
    category: "Governance & Sustainability",
    icon: ShieldCheck
  },
  {
    id: 27,
    text: "Promotion of environment ecosystem restoration awareness and activities.",
    category: "Governance & Sustainability",
    icon: Leaf
  },
  {
    id: 28,
    text: "Strengthening Energy and Water conservation measures.",
    category: "Governance & Sustainability",
    icon: Zap
  },
  {
    id: 29,
    text: "Celebration of national events/ Days/ Festivals.",
    category: "Governance & Sustainability",
    icon: Globe2
  },
  {
    id: 30,
    text: "Website updation on continuous basis.",
    category: "Governance & Sustainability",
    icon: Globe2
  },
  {
    id: 31,
    text: "Review the online and offline feedback received from the students and stakeholders with necessary action.",
    category: "Governance & Sustainability",
    icon: MessageSquare
  }
];

export default function IQACInitiatives() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: "All Initiatives", count: initiativesList.length },
    { id: "Academic & Curriculum", label: "Academic & Curriculum", count: 6 },
    { id: "Student Mentorship & Support", label: "Student Mentorship", count: 6 },
    { id: "Research & Industry", label: "Research & Industry", count: 3 },
    { id: "Skills, T&P & Staff", label: "Skills, T&P & Staff", count: 5 },
    { id: "Governance & Sustainability", label: "Governance & Green Initiatives", count: 11 }
  ];

  const filteredInitiatives = initiativesList.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SubPageLayout
      title="IQAC Initiatives and Activities"
      subtitle="Strategic Quality Sustenance, Continuous Enhancement, and Institutional Framework"
      category="iqac"
      activeItemLabel="IQAC Initiatives and Activities"
    >
      <div className="space-y-10 max-w-6xl mx-auto">
        
        {/* Top Hero & Scope Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                <ShieldCheck size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                  Quality Assurance & Sustenance
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  IQAC Activities & Action Scope
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#1a5d2e] text-white border border-[#1a5d2e] shadow-xs">
                31 Action Points
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#1a5d2e] border border-emerald-200">
                Institutional Quality
              </span>
            </div>
          </div>

          {/* Scope Narrative Provided by User */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-slate-50 to-white border border-emerald-200/70 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
              <Sparkles size={14} className="text-[#1a5d2e]" />
              <span>Activities Overview</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-800 leading-relaxed font-normal">
              IQAC activities majorly includes periodical meetings, workshops, developing quality benchmarks, academic documentation, obtaining various stakeholder feedback along with analysing and taking action on feedback, training programs for non-teaching staff Members, etc.
            </p>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-xs font-mono text-slate-500 font-medium">Curriculum Delivery</span>
              <span className="text-base font-serif font-bold text-slate-900 mt-1">OBE & PO/CO</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-xs font-mono text-slate-500 font-medium">Student Mentoring</span>
              <span className="text-base font-serif font-bold text-slate-900 mt-1">Paced Learning</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-xs font-mono text-slate-500 font-medium">Audits & Reviews</span>
              <span className="text-base font-serif font-bold text-slate-900 mt-1">AAA & AQAR</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-xs font-mono text-slate-500 font-medium">Green Practices</span>
              <span className="text-base font-serif font-bold text-slate-900 mt-1">Eco-Restoration</span>
            </div>
          </div>
        </div>

        {/* Section Header with Search and Category Filters */}
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider block">
                Comprehensive Action Matrix
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                IQAC Initiatives
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search initiative keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1a5d2e]/20 focus:border-[#1a5d2e] transition-all"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-[#1a5d2e] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Initiatives Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence>
              {filteredInitiatives.map((item) => {
                const Icon = item.icon;
                const isAcademic = item.category === "Academic & Curriculum";
                const isMentorship = item.category === "Student Mentorship & Support";
                const isResearch = item.category === "Research & Industry";
                const isSkills = item.category === "Skills, T&P & Staff";
                const isGovernance = item.category === "Governance & Sustainability";

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* Card Header: Icon & ID */}
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                          isAcademic
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : isMentorship
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : isResearch
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : isSkills
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-emerald-50 text-[#1a5d2e] border-emerald-200"
                        }`}>
                          <Icon size={18} />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#1a5d2e] transition-colors">
                          #{item.id < 10 ? `0${item.id}` : item.id}
                        </span>
                      </div>

                      {/* Initiative Description */}
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-sans font-medium text-slate-800 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Category Tag */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${
                        isAcademic
                          ? "bg-blue-50/60 text-blue-700 border-blue-100"
                          : isMentorship
                          ? "bg-purple-50/60 text-purple-700 border-purple-100"
                          : isResearch
                          ? "bg-amber-50/60 text-amber-800 border-amber-100"
                          : isSkills
                          ? "bg-rose-50/60 text-rose-700 border-rose-100"
                          : "bg-emerald-50/60 text-[#1a5d2e] border-emerald-100"
                      }`}>
                        {item.category}
                      </span>
                      <CheckCircle2 size={13} className="text-[#1a5d2e]/70" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredInitiatives.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Search size={32} className="mx-auto text-slate-300" />
              <h4 className="text-base font-serif font-bold text-slate-800">No Initiatives Found</h4>
              <p className="text-xs text-slate-500">No IQAC initiatives matched your search keywords.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-xs font-mono font-bold text-[#1a5d2e] hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Quality Assurance Assurance Banner */}
        <div className="bg-gradient-to-br from-[#1a5d2e] via-[#1e6f37] to-[#144723] rounded-3xl p-6 sm:p-8 text-white shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Continuous Sustenance Cycle</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Institutional Quality Loop & Action Taken Reports (ATR)
              </h3>
              <p className="text-xs sm:text-sm font-sans text-emerald-100 leading-relaxed">
                Every IQAC initiative is systematically reviewed through periodic meetings, Academic & Administrative Audits (AAA), and formal Action Taken Reports submitted for NAAC AQAR compliance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center">
                <span className="block text-2xl font-serif font-bold text-white">31</span>
                <span className="text-[11px] font-mono text-emerald-200 uppercase">Active Initiatives</span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center">
                <span className="block text-2xl font-serif font-bold text-white">100%</span>
                <span className="text-[11px] font-mono text-emerald-200 uppercase">Quality Focus</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
