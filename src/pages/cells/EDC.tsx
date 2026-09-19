import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Phone, 
  Mail, 
  Check, 
  Copy, 
  Search, 
  Lightbulb, 
  Sparkles,
  Target,
  Rocket,
  Compass,
  CheckCircle2
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface EDCMember {
  role: string;
  name: string;
  designation: string;
  contact: string;
  email: string;
  category: "Leadership" | "Faculty";
}

const edcMembers: EDCMember[] = [
  {
    role: "Convener",
    name: "Dr. Dhiren P. Shah",
    designation: "Principal",
    contact: "9427474602",
    email: "dhiren.shah@ckpipsr.ac.in",
    category: "Leadership"
  },
  {
    role: "Coordinator",
    name: "Dr. Vinod D. Ramani",
    designation: "Associate Professor",
    contact: "9913792913",
    email: "vinod.ramani@ckpipsr.ac.in",
    category: "Leadership"
  },
  {
    role: "Member",
    name: "Mr. Naishadh I. Solanki",
    designation: "Assistant Professor",
    contact: "9825809165",
    email: "Naishadh.solanki@ckpipsr.ac.in",
    category: "Faculty"
  },
  {
    role: "Member",
    name: "Mr. Dhaval B. Joshi",
    designation: "Assistant Professor",
    contact: "9537482224",
    email: "dhaval.joshi@ckpipsr.ac.in",
    category: "Faculty"
  }
];

const objectives = [
  "To develop entrepreneurship awareness amongst students and faculties",
  "To organize Entrepreneurship Motivation Programs",
  "To organize Skill development programs",
  "To promote innovation and multiple skills in students"
];

export default function EDC() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(text);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const filteredMembers = edcMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact.includes(searchQuery) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Leadership", "Faculty"];

  return (
    <SubPageLayout
      title="Entrepreneurship Development Cell (EDC)"
      subtitle="Fostering Innovation, Entrepreneurial Mindset & Professional Skill Development"
      category="cells"
      activeItemLabel="EDC"
    >
      <div className="space-y-8">
        
        {/* Objectives Section Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6 relative overflow-hidden">
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1a5d2e] border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-2xs">
              <Rocket size={24} />
            </div>
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#1a5d2e] text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles size={13} className="text-[#1a5d2e]" />
                <span>Cell Mission & Vision</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Objectives
              </h3>
              
              {/* Objectives List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                {objectives.map((objective, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100/70 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={15} />
                    </div>
                    <p className="text-xs sm:text-sm font-sans font-medium text-slate-700 leading-relaxed">
                      {objective}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Committee Members Cards Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold shadow-2xs">
                <Users size={22} />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  Committee Roster
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  EDC Committee Members
                </h3>
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, role, contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#1a5d2e] focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1a5d2e] text-white shadow-2xs"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Committee Members Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
            {filteredMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5 space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Top: Role Tag & Category Indicator */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[#1a5d2e] font-mono text-[11px] font-bold tracking-tight">
                      {member.role}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                      {member.category}
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
                  setSelectedCategory("All");
                }}
                className="text-xs text-[#1a5d2e] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

      </div>
    </SubPageLayout>
  );
}
