import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  Handshake, 
  Building2, 
  Calendar, 
  MapPin, 
  FileText, 
  Sparkles, 
  BadgeCheck, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Hospital, 
  Zap, 
  Search, 
  Award,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Tag
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface MOUItem {
  no: number;
  organization: string;
  location: string;
  purpose: string;
  effectiveFrom: string;
  category: "Academic" | "Pharma Industry" | "Hospital & Healthcare" | "Skill & Innovation" | "Campus Sustainability";
  highlights: string[];
}

const mousData: MOUItem[] = [
  {
    no: 1,
    organization: "C. D. Pachchigar College of Homoeopathic Medicine and Hospital, Surat",
    location: "Surat, Gujarat",
    purpose: "Interdisciplinary academic collaboration and Research",
    effectiveFrom: "06.01.2026",
    category: "Academic",
    highlights: ["Interdisciplinary Research", "Academic Exchange", "Healthcare Synergy"]
  },
  {
    no: 2,
    organization: "Shree Naranjibhai Lalbhai Patel College of Pharmacy, Umrakh",
    location: "Umrakh, Gujarat",
    purpose: "Research Consultancy and Training",
    effectiveFrom: "18.12.2024",
    category: "Academic",
    highlights: ["Faculty & Student Training", "Joint Research", "Consultancy"]
  },
  {
    no: 3,
    organization: "ASG HOSPITAL PVT. LTD., JODHPUR, RAJASTHAN",
    location: "Jodhpur, Rajasthan",
    purpose: "For Rendering Medical Facilities For Ophthalmology",
    effectiveFrom: "29.07.2023",
    category: "Hospital & Healthcare",
    highlights: ["Ophthalmology Facilities", "Clinical Services", "Medical Support"]
  },
  {
    no: 4,
    organization: "ELEKTROPOD TECHNOLOGIES, BANGALORE",
    location: "Bangalore, Karnataka",
    purpose: "Providing Electric vehicle Recharge facility",
    effectiveFrom: "10.04.2023",
    category: "Campus Sustainability",
    highlights: ["EV Green Infrastructure", "Campus Sustainability", "Clean Energy"]
  },
  {
    no: 5,
    organization: "MVUE HOSPITAL, VESU, SURAT",
    location: "Vesu, Surat, Gujarat",
    purpose: "Scientific Exchange, Hospital Services, Training and Collaborative Research Projects.",
    effectiveFrom: "20.03.2023",
    category: "Hospital & Healthcare",
    highlights: ["Scientific Exchange", "Hospital Services", "Collaborative Projects"]
  },
  {
    no: 6,
    organization: "YOUTH DEVELOPMENT PHARMACEUTICAL ASSOCIATION (YDPA), AHMEDABAD",
    location: "Ahmedabad, Gujarat",
    purpose: "Promotion of Entrepreneurship activities among students",
    effectiveFrom: "30.09.2022",
    category: "Skill & Innovation",
    highlights: ["Student Entrepreneurship", "SSIP Incubation", "Leadership Bootcamps"]
  },
  {
    no: 7,
    organization: "PURE CHEM PRIVATE LIMITED, ANKLESHWAR",
    location: "Ankleshwar, Gujarat",
    purpose: "Research, Consultancy and Training.",
    effectiveFrom: "18.02.2022",
    category: "Pharma Industry",
    highlights: ["Chemical Synthesis", "Industrial Training", "R&D Consultancy"]
  },
  {
    no: 8,
    organization: "OJAS CHARITABLE TRUST, SURAT",
    location: "Surat, Gujarat",
    purpose: "Providing medical facility to students",
    effectiveFrom: "15.09.2020",
    category: "Hospital & Healthcare",
    highlights: ["Student Healthcare", "Medical Checkups", "Community Welfare"]
  },
  {
    no: 9,
    organization: "CONCEPT MEDICA INC., SURAT",
    location: "Surat, Gujarat",
    purpose: "Promotion of advance skill based training, internship, research and development, placement, industry expert sessions",
    effectiveFrom: "22.07.2019",
    category: "Pharma Industry",
    highlights: ["Skill Training", "Internships", "Placements & Expert Sessions"]
  },
  {
    no: 10,
    organization: "FIDES BIOCARE AD UNITED FIDES PHARMACEUTICAL PVT. LTD, KAMREJ, SURAT",
    location: "Kamrej, Surat, Gujarat",
    purpose: "Training and Consultancy Projects",
    effectiveFrom: "18.02.2019",
    category: "Pharma Industry",
    highlights: ["Formulation Consultancy", "Industrial Exposure", "Hands-on Training"]
  },
  {
    no: 11,
    organization: "GLOBELA PHARMA PVT. LTD, SURAT",
    location: "Surat, Gujarat",
    purpose: "Research, Consultancy and Training",
    effectiveFrom: "18.02.2018",
    category: "Pharma Industry",
    highlights: ["Pharma Manufacturing", "Quality Assurance", "R&D Projects"]
  },
  {
    no: 12,
    organization: "CUBIC ANALYTICAL SOLUTION, ANKLESHWAR",
    location: "Ankleshwar, Gujarat",
    purpose: "Research, Consultancy and Training",
    effectiveFrom: "18.02.2018",
    category: "Pharma Industry",
    highlights: ["Analytical Testing", "Instrumentation", "Method Validation"]
  },
  {
    no: 13,
    organization: "BIOGEN PHARMACEUTICAL CO., SURAT",
    location: "Surat, Gujarat",
    purpose: "Training and Consultancy Projects",
    effectiveFrom: "18.02.2018",
    category: "Pharma Industry",
    highlights: ["Pharmaceutical Production", "Industrial Internships", "Consultancy"]
  }
];

export default function MOUs() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMOUs = useMemo(() => {
    return mousData.filter((item) => {
      const matchesCategory = 
        selectedCategory === "ALL" || item.category === selectedCategory;
      const matchesSearch = 
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.effectiveFrom.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (category: MOUItem["category"]) => {
    switch (category) {
      case "Academic":
        return <GraduationCap size={18} />;
      case "Pharma Industry":
        return <Building2 size={18} />;
      case "Hospital & Healthcare":
        return <Hospital size={18} />;
      case "Skill & Innovation":
        return <Sparkles size={18} />;
      case "Campus Sustainability":
        return <Zap size={18} />;
      default:
        return <Handshake size={18} />;
    }
  };

  const getCategoryTheme = (category: MOUItem["category"]) => {
    switch (category) {
      case "Academic":
        return {
          badge: "bg-blue-50 text-blue-700 border-blue-200",
          iconBg: "bg-blue-50 text-blue-700",
          borderHover: "hover:border-blue-500/50"
        };
      case "Pharma Industry":
        return {
          badge: "bg-emerald-50 text-[#1a5d2e] border-emerald-200",
          iconBg: "bg-emerald-50 text-[#1a5d2e]",
          borderHover: "hover:border-[#1a5d2e]/50"
        };
      case "Hospital & Healthcare":
        return {
          badge: "bg-rose-50 text-rose-700 border-rose-200",
          iconBg: "bg-rose-50 text-rose-700",
          borderHover: "hover:border-rose-500/50"
        };
      case "Skill & Innovation":
        return {
          badge: "bg-amber-50 text-amber-800 border-amber-200",
          iconBg: "bg-amber-50 text-amber-700",
          borderHover: "hover:border-amber-500/50"
        };
      case "Campus Sustainability":
        return {
          badge: "bg-teal-50 text-teal-800 border-teal-200",
          iconBg: "bg-teal-50 text-teal-700",
          borderHover: "hover:border-teal-500/50"
        };
      default:
        return {
          badge: "bg-slate-50 text-slate-700 border-slate-200",
          iconBg: "bg-slate-50 text-slate-700",
          borderHover: "hover:border-slate-400"
        };
    }
  };

  return (
    <SubPageLayout
      title="Memorandums of Understanding (MOUs)"
      subtitle="Strategic Partnerships with Leading Pharmaceutical Industries, Healthcare Institutions & Academic Centers"
      category="research-and-innovation"
      activeItemLabel="Research - MOUs"
    >
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Header Overview Card */}
        <motion.div
          id="mou-header-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Handshake size={26} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  Industry-Academia Linkages & Collaborations
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
                  Institutional MOUs & Alliances
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] text-xs font-mono font-bold">
                <BadgeCheck size={14} />
                <span>13 Active MOUs</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold block">Pharma Industries</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-[#1a5d2e] mt-0.5">06</p>
              <span className="text-[11px] font-sans text-emerald-700">R&D & Training Partners</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100">
              <span className="text-[11px] font-mono uppercase text-rose-800 font-bold block">Hospitals & Medical</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-rose-950 mt-0.5">03</p>
              <span className="text-[11px] font-sans text-rose-700">Clinical & Health Services</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
              <span className="text-[11px] font-mono uppercase text-blue-800 font-bold block">Academic Colleges</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-blue-950 mt-0.5">02</p>
              <span className="text-[11px] font-sans text-blue-700">Interdisciplinary Collabs</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
              <span className="text-[11px] font-mono uppercase text-amber-800 font-bold block">Innovation & Campus</span>
              <p className="text-xl sm:text-2xl font-serif font-bold text-amber-950 mt-0.5">02</p>
              <span className="text-[11px] font-sans text-amber-800">SSIP & Green Tech EV</span>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search organization, purpose, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#1a5d2e] focus:ring-2 focus:ring-emerald-100 bg-slate-50/50 font-sans"
                />
              </div>

              {/* Counter status */}
              <span className="text-xs font-mono text-slate-500">
                Showing <strong className="text-slate-800">{filteredMOUs.length}</strong> of {mousData.length} MOUs
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-mono font-semibold text-slate-400 mr-1.5">Sector:</span>
              {[
                { label: "All Sectors", value: "ALL", count: mousData.length },
                { label: "Pharma Industry", value: "Pharma Industry", count: 6 },
                { label: "Hospital & Healthcare", value: "Hospital & Healthcare", count: 3 },
                { label: "Academic", value: "Academic", count: 2 },
                { label: "Skill & Innovation", value: "Skill & Innovation", count: 1 },
                { label: "Campus Sustainability", value: "Campus Sustainability", count: 1 }
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setSelectedCategory(btn.value)}
                  className={`px-3 py-1 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === btn.value
                      ? "bg-[#1a5d2e] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {btn.label} ({btn.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMOUs.map((item, index) => {
            const theme = getCategoryTheme(item.category);

            return (
              <motion.div
                key={item.no}
                id={`mou-card-${item.no}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`bg-white rounded-3xl border border-slate-200/90 ${theme.borderHover} hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 space-y-5 group`}
              >
                <div className="space-y-4">
                  {/* Top Header: Badge & Number */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${theme.badge}`}
                    >
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </span>

                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                      #{item.no}
                    </span>
                  </div>

                  {/* Organization Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                      Partner Organization / Company
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#1a5d2e] transition-colors leading-snug">
                      {item.organization}
                    </h4>
                  </div>

                  {/* Location Pin */}
                  <div className="flex items-center gap-1.5 text-xs font-sans text-slate-500">
                    <MapPin size={13} className="text-slate-400 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  {/* Purpose Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#1a5d2e] flex items-center gap-1 tracking-wider">
                      <FileText size={11} />
                      <span>Scope & Purpose of MOU</span>
                    </span>
                    <p className="text-xs sm:text-sm font-sans font-medium text-slate-800 leading-relaxed">
                      {item.purpose}
                    </p>
                  </div>

                  {/* Highlight Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.highlights.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Effective Date */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0">
                      <Calendar size={13} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Effective From</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{item.effectiveFrom}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-700 font-bold px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                    Active Partner
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredMOUs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Handshake size={36} className="mx-auto text-slate-300" />
            <h4 className="font-serif font-bold text-slate-800 text-lg">No MOUs Found</h4>
            <p className="text-sm font-sans text-slate-500">
              No memorandums matched your query "{searchQuery}". Try searching with different terms.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); }}
              className="mt-2 px-4 py-2 bg-[#1a5d2e] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Institutional Verification Footer */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-slate-600">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#1a5d2e] shrink-0" />
            <span>All Memorandums of Understanding are executed with legal endorsement and managed under the Industry-Institute Interaction (III) Cell.</span>
          </div>
          <span className="font-mono text-slate-400">CKPIPSR R&D Cell</span>
        </div>

      </div>
    </SubPageLayout>
  );
}
