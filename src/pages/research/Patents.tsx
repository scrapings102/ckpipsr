import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Lightbulb, 
  Search, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Award, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Copy, 
  Check, 
  Hash,
  Filter
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface PatentItem {
  id: number;
  facultyStudent: string;
  title: string;
  applicationNumber: string;
  dateOfFiling: string;
  publishedDate: string;
  status: "Granted" | "Published" | "Filed";
}

const patentData: PatentItem[] = [
  {
    id: 1,
    facultyStudent: "DR. SHAH DHIREN PRAFULKUMAR",
    title: "A MOUTH DISSOLVING FILM OF GRANISETRON HYDROCHLORIDE",
    applicationNumber: "202021042061",
    dateOfFiling: "28/09/2020",
    publishedDate: "30/01/2023",
    status: "Granted"
  },
  {
    id: 2,
    facultyStudent: "DR.VINODKUMAR D. RAMANI",
    title: "ULTRACENTRIFUGE LABORATORY APPARATUS FOR SEPARATION OF ANOPARTICLES",
    applicationNumber: "385428-001",
    dateOfFiling: "02/05/2023",
    publishedDate: "12/09/2023",
    status: "Granted"
  },
  {
    id: 3,
    facultyStudent: "DR.VINODKUMAR D. RAMANI",
    title: "LABORATORY ROTARY EVAPORATOR FOR EXTRACTION OF HERBAL DRUGS",
    applicationNumber: "384767-001",
    dateOfFiling: "25/04/2023",
    publishedDate: "10/08/2023",
    status: "Granted"
  },
  {
    id: 4,
    facultyStudent: "MR. JITESH JARIWALA",
    title: "LABORATORY ROTARY EVAPORATOR FOR EXTRACTION OF HERBAL DRUGS",
    applicationNumber: "384767-001",
    dateOfFiling: "25/04/2023",
    publishedDate: "10/08/2023",
    status: "Granted"
  },
  {
    id: 5,
    facultyStudent: "DR. VAISHNAV DEVENDRA JAYANTILAL",
    title: "HPTLC METHOD FOR DETECTION OF PHTHALATE METABOLITES IN BIOLOGICAL MATERIAL",
    applicationNumber: "202021024529",
    dateOfFiling: "11/06/2020",
    publishedDate: "21/09/2023",
    status: "Granted"
  },
  {
    id: 6,
    facultyStudent: "MR. NAISHADH SOLANKI",
    title: "PORTABLE TOPICAL DEVICE FOR ESTIMATION OF ULCERS IN STOMACH",
    applicationNumber: "394980-001",
    dateOfFiling: "13/09/2023",
    publishedDate: "30/10/2023",
    status: "Granted"
  }
];

export default function Patents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [copiedAppNo, setCopiedAppNo] = useState<string | null>(null);

  const uniqueInventors = ["All", ...Array.from(new Set(patentData.map((p) => p.facultyStudent)))];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAppNo(text);
    setTimeout(() => setCopiedAppNo(null), 2000);
  };

  const filteredPatents = patentData.filter((patent) => {
    const matchesSearch =
      patent.facultyStudent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.dateOfFiling.includes(searchQuery) ||
      patent.publishedDate.includes(searchQuery);

    const matchesFaculty =
      selectedFaculty === "All" || patent.facultyStudent === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  return (
    <SubPageLayout
      title="Patents"
      subtitle="Intellectual Property Rights, Patented Inventions & Pharmaceutical Technology Innovations"
      category="research-and-innovation"
      activeItemLabel="Research - Patents"
    >
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Header Introduction & Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Lightbulb size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    Intellectual Property Rights
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#1a5d2e] text-[11px] font-mono font-bold">
                    <Award size={12} />
                    <span>6 Granted Patents</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  Patents Granted to Faculty & Researchers
                </h3>
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search patent title, inventor, app no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#1a5d2e] focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Filter Pills by Faculty / Inventor */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-mono font-semibold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter size={13} />
              <span>Inventor:</span>
            </span>
            {uniqueInventors.map((faculty) => (
              <button
                key={faculty}
                onClick={() => setSelectedFaculty(faculty)}
                className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFaculty === faculty
                    ? "bg-[#1a5d2e] text-white shadow-2xs"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {faculty === "All" ? "All Inventors" : faculty}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Patents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatents.map((patent, index) => (
            <motion.div
              key={patent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#1a5d2e]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-6 space-y-5"
            >
              <div className="space-y-4">
                {/* Header: Serial No & Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">
                    0{patent.id}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-bold shadow-2xs">
                    <ShieldCheck size={14} className="text-[#1a5d2e]" />
                    <span>{patent.status}</span>
                  </span>
                </div>

                {/* Patent Title */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                    Title of Patent
                  </span>
                  <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#1a5d2e] transition-colors">
                    {patent.title}
                  </h4>
                </div>

                {/* Name of Faculty / Student */}
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1 tracking-wider">
                    <User size={11} className="text-[#1a5d2e]" />
                    <span>Name of Faculty / Student</span>
                  </span>
                  <p className="font-sans font-bold text-slate-900 text-xs sm:text-sm">
                    {patent.facultyStudent}
                  </p>
                </div>
              </div>

              {/* Patent Application Details & Dates */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs font-sans">
                {/* Patent App No */}
                <div className="flex items-center justify-between bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <Hash size={13} className="text-[#1a5d2e] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Application No</span>
                      <span className="font-mono font-bold text-slate-800 text-xs truncate block">{patent.applicationNumber}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(patent.applicationNumber)}
                    title="Copy Application Number"
                    className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-slate-200"
                  >
                    {copiedAppNo === patent.applicationNumber ? (
                      <Check size={13} className="text-emerald-600" />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>

                {/* Filing and Published Dates */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-50/60 border border-slate-100">
                    <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                      <Calendar size={10} className="text-slate-400" />
                      <span>Date of Filing</span>
                    </span>
                    <p className="font-mono font-semibold text-slate-700 text-xs mt-0.5">
                      {patent.dateOfFiling}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-50/40 border border-emerald-100/60">
                    <span className="text-[10px] font-mono uppercase text-[#1a5d2e] flex items-center gap-1 font-bold">
                      <CheckCircle2 size={10} className="text-[#1a5d2e]" />
                      <span>Published Date</span>
                    </span>
                    <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">
                      {patent.publishedDate}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredPatents.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 font-sans space-y-3">
            <Lightbulb size={36} className="mx-auto text-slate-300" />
            <p className="text-sm font-medium">No patent records match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFaculty("All");
              }}
              className="text-xs text-[#1a5d2e] font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </SubPageLayout>
  );
}
