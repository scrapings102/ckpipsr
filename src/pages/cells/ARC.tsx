import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  FileText, 
  AlertTriangle, 
  Phone, 
  Mail, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  Send, 
  Upload, 
  Clock, 
  MapPin, 
  Building2, 
  Search, 
  Eye, 
  EyeOff, 
  Check, 
  Copy,
  Info,
  ChevronRight,
  User,
  GraduationCap,
  Sparkles,
  PhoneCall
} from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";

interface CommitteeMember {
  role: string;
  name: string;
  designation: string;
  contact: string;
  email: string;
  category: "Leadership" | "Faculty" | "Staff" | "Counselor" | "Administration" | "Student" | "Parent";
}

const committeeMembers: CommitteeMember[] = [
  {
    role: "Chairman",
    name: "Dr. Dhiren P. Shah",
    designation: "Principal",
    contact: "9427474602",
    email: "dhiren.shah@ckpipsr.ac.in",
    category: "Leadership"
  },
  {
    role: "Member secretary -Faculty",
    name: "Mrs. Prakruti K. Jadav",
    designation: "Asst. Prof. and Vice Chairman",
    contact: "7567684027",
    email: "prakruti.jadav@ckpipsr.ac.in",
    category: "Faculty"
  },
  {
    role: "Member - Non Teaching Staff",
    name: "Mr. Nirav Patel",
    designation: "Laboratory Technician",
    contact: "9427520001",
    email: "rx.neelpatel@gmail.com",
    category: "Staff"
  },
  {
    role: "Member",
    name: "Dr. Mukesh P. Jagiwala",
    designation: "Psychiatrist and Professional counselor",
    contact: "9879221795",
    email: "mukeshjagiwala@yahoo.co.in",
    category: "Counselor"
  },
  {
    role: "Member- Civil Administration",
    name: "Representative of Civil Administration",
    designation: "Civil Administration Official",
    contact: "0261-2665800",
    email: "-",
    category: "Administration"
  },
  {
    role: "Member-Representative of Police Administration",
    name: "Representative of Police administration",
    designation: "Police Administration Official",
    contact: "0261-2251010",
    email: "-",
    category: "Administration"
  },
  {
    role: "Member-Representative of NGO",
    name: "Representative of Non Government organization",
    designation: "Youth & Social Welfare NGO",
    contact: "0261-3917777",
    email: "-",
    category: "Administration"
  },
  {
    role: "Member-Representative Local Media",
    name: "Representative of local media",
    designation: "Press & Media Representative",
    contact: "0261-2465542",
    email: "-",
    category: "Administration"
  },
  {
    role: "Member Student",
    name: "Mr. Sheel Pushtiwala",
    designation: "Student",
    contact: "8733005400",
    email: "sheel27203@gmail.com",
    category: "Student"
  },
  {
    role: "Member Student",
    name: "Mr. Priyam Patel",
    designation: "Student",
    contact: "9054775814",
    email: "priyam201006@gmail.com",
    category: "Student"
  },
  {
    role: "Member - Parent",
    name: "Mr. Kalpak Pustiwala",
    designation: "Parent",
    contact: "9924863286",
    email: "kalpak3080@gmail.com",
    category: "Parent"
  },
  {
    role: "Member - Parent",
    name: "Mr. Vijaykumar Patel",
    designation: "Parent",
    contact: "9898020106",
    email: "vapatel2374@gmail.com",
    category: "Parent"
  }
];

interface SquadMember {
  role: string;
  name: string;
  designation: string;
  contact: string;
  email: string;
}

const squadMembers: SquadMember[] = [
  {
    role: "Squad member",
    name: "Dr. Bhumikaben C. Desai",
    designation: "Associate Professor",
    contact: "9879229825",
    email: "bhumika.desai@ckpipsr.ac.in"
  },
  {
    role: "Squad member",
    name: "Dr. Vinod D. Ramani",
    designation: "Associate Professor",
    contact: "9913792913",
    email: "vinod.ramani@ckpipsr.ac.in"
  },
  {
    role: "Squad member",
    name: "Mrs. Prakruti K. Jadav",
    designation: "Assistant Professor",
    contact: "7567684027",
    email: "prakruti.jadav@ckpipsr.ac.in"
  },
  {
    role: "Squad member",
    name: "Mr. Dipayan Tarafder",
    designation: "Assistant Professor",
    contact: "9909759524",
    email: "dipayan.tarafder@ckpipsr.ac.in"
  },
  {
    role: "Squad member",
    name: "Mr. Yahya Ali Moolla",
    designation: "Assistant Professor",
    contact: "7201932423",
    email: "yahya.moolla @ckpipsr.ac.in"
  }
];

export default function ARC() {
  const [activeTab, setActiveTab] = useState<"committee" | "squad" | "circulars" | "complaint">("committee");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  // Complaint Form State
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [complaintName, setComplaintName] = useState("");
  const [complaintEmail, setComplaintEmail] = useState("");
  const [complaintPhone, setComplaintPhone] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("Campus Premise");
  const [incidentDetails, setIncidentDetails] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(text);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `ARC-CKP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setIsSubmitted(true);
  };

  const filteredMembers = committeeMembers.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact.includes(searchQuery) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Leadership", "Faculty", "Staff", "Counselor", "Administration", "Student", "Parent"];

  return (
    <SubPageLayout
      title="Anti Ragging Committee"
      subtitle="Zero-Tolerance Safety Policy & Institutional Vigilance Mechanism"
      category="cells"
      activeItemLabel="ARC"
    >
      <div className="space-y-8">
        
        {/* Top Emergency SOS Helpline Banner */}
        <div className="bg-gradient-to-r from-red-900 via-[#8a1c1c] to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
            <ShieldAlert size={260} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-white text-xs font-mono font-bold tracking-wider uppercase">
                <AlertTriangle size={14} className="text-amber-300" />
                <span>Zero Tolerance Campus</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                24x7 Anti-Ragging Helpline & Immediate Support
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                Ragging is strictly prohibited by law inside the college campus, hostels, canteen, transit vehicles, and off-campus zones. Any student experiencing or witnessing ragging can contact the squad immediately or register an incident.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="tel:18001805522"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white text-red-900 hover:bg-amber-50 font-sans font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
              >
                <PhoneCall size={18} className="text-red-700 animate-pulse" />
                <span>National Helpline: 1800-180-5522</span>
              </a>
              <button
                onClick={() => setActiveTab("complaint")}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black/30 hover:bg-black/40 border border-white/20 text-white font-sans font-semibold text-xs sm:text-sm transition-all"
              >
                <ShieldAlert size={16} className="text-amber-300" />
                <span>Report Incident</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="bg-white rounded-2xl p-1.5 sm:p-2 border border-slate-200 shadow-2xs flex items-center justify-start overflow-x-auto gap-1 sm:gap-2">
          {[
            { id: "committee", label: "Committee", icon: Users },
            { id: "squad", label: "Squad", icon: ShieldCheck },
            { id: "circulars", label: "Circulars", icon: FileText },
            { id: "complaint", label: "Complaint", icon: ShieldAlert }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[120px] sm:min-w-[140px] py-2.5 sm:py-3 px-4 rounded-xl font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1a5d2e] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: COMMITTEE ── */}
        {activeTab === "committee" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Mission Statement Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-1 font-bold">
                  <ShieldCheck size={22} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    Institutional Charter & Mandate
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 font-sans leading-relaxed font-medium">
                    This committee and its members will educate and ensure that our institute students will not indulge in any form of ragging, to make our institute and campus free of ragging, by regularly monitoring the students and through counseling of seniors.
                  </p>
                </div>
              </div>
            </div>

            {/* Committee Members Table & Cards */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Anti Ragging Committee Members
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-sans mt-0.5">
                    Statutory multi-disciplinary committee comprising administration, faculty, counselor, civil & police authorities, media, students, and parents.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search member, role, contact..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#1a5d2e] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Committee Members Cards Grid (3 columns x 4 rows = 12 members) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                          {member.designation || "Committee Member"}
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
                          <span className="text-slate-400 font-mono text-[11.5px]">Direct Official Contact</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs font-mono">
                  No committee members found matching your search.
                </div>
              )}
            </div>

            {/* Statutory Compliance Footer Banner */}
            <div className="bg-[#fbf9f4] border border-[#d4af37]/40 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1a5d2e]" />
                <span>Anti-Ragging Committee constituted strictly in compliance with UGC & PCI statutory mandates</span>
              </div>
              <span className="font-bold text-[#1a5d2e]">Emergency Direct: +91 9427474602</span>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: SQUAD ── */}
        {activeTab === "squad" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Squad Overview & Mandate Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shrink-0 mt-1 font-bold">
                  <ShieldCheck size={22} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                    Anti-Ragging Squad (ARS)
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 font-sans leading-relaxed font-medium">
                    Committee consisting the following member is framed to keep watch on &quot;Ragging&quot; inside or outside the campus
                  </p>
                </div>
              </div>
            </div>

            {/* Squad Members Cards Grid */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center font-bold">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                      Vigilance Squad
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      Squad Members
                    </h3>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1a5d2e] font-mono text-xs font-semibold w-fit">
                  Active Campus Vigilance
                </span>
              </div>

              {/* Responsive Cards Grid (3 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {squadMembers.map((member, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#1a5d2e]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5 space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Card Top: Role Tag */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-[#1a5d2e] font-mono text-[11px] font-bold tracking-tight">
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
                    </div>

                    {/* Card Footer: Direct Contact Actions */}
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-sans">
                      {/* Phone */}
                      <div className="flex items-center justify-between text-slate-700">
                        <div className="flex items-center gap-2 min-w-0">
                          <Phone size={13} className="text-[#1a5d2e] shrink-0" />
                          <a
                            href={`tel:${member.contact.replace(/[^0-9]/g, "")}`}
                            className="font-mono font-medium hover:text-[#1a5d2e] hover:underline truncate"
                          >
                            {member.contact}
                          </a>
                        </div>

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
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail size={13} className="text-[#1a5d2e] shrink-0" />
                        <a
                          href={`mailto:${member.email}`}
                          className="font-mono text-[11.5px] hover:text-[#1a5d2e] hover:underline truncate block"
                          title={member.email}
                        >
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: CIRCULARS ── */}
        {activeTab === "circulars" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#1a5d2e] flex items-center justify-center shadow-2xs">
                <FileText size={32} />
              </div>
              
              <div className="space-y-2 max-w-md">
                <span className="text-xs font-mono font-bold text-[#1a5d2e] uppercase tracking-wider">
                  Official Institutional Document
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Anti-Ragging Circular
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Access the official statutory circular and notification issued by the institution regarding anti-ragging policies and compliance.
                </p>
              </div>

              <div>
                <a
                  href="https://console-navyugtrust-org.s3.ap-south-1.amazonaws.com/app/institutes/102/departments/docs/643e618a22187.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1a5d2e] hover:bg-emerald-800 text-white font-sans font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <FileText size={18} />
                  <span>Circular</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 4: COMPLAINT ── */}
        {activeTab === "complaint" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold shadow-2xs">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider">
                      Confidential & Anonymous Grievance Submission
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Online Incident Reporting Form
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs">
                  <Clock size={13} className="text-[#1a5d2e]" />
                  <span>Response Time: &lt;24 Hours</span>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 px-6 text-center space-y-5 bg-emerald-50/60 border border-emerald-200 rounded-3xl">
                  <div className="w-16 h-16 rounded-full bg-[#1a5d2e] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h4 className="text-2xl font-serif font-bold text-slate-900">
                      Complaint Registered Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans">
                      Your report has been securely dispatched to the Anti-Ragging Committee and Squad In-Charges for immediate preliminary review.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-emerald-200 max-w-xs mx-auto text-xs font-mono space-y-1">
                    <div className="text-slate-500">Tracking Reference ID:</div>
                    <div className="text-base font-bold text-[#1a5d2e]">{ticketId}</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setIncidentDetails("");
                        setFileName(null);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#1a5d2e] text-white font-sans text-xs font-semibold hover:bg-emerald-800 transition-all cursor-pointer"
                    >
                      Submit Another Report
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitComplaint} className="space-y-6">
                  {/* Anonymous Toggle */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                        {isAnonymous ? <EyeOff size={18} className="text-emerald-700" /> : <Eye size={18} />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">
                          Submit Anonymously?
                        </div>
                        <div className="text-[11.5px] text-slate-500 font-sans">
                          {isAnonymous 
                            ? "Your name, email, and phone will NOT be recorded."
                            : "Your details will be kept strictly confidential by the Chairman."}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        isAnonymous
                          ? "bg-emerald-700 text-white"
                          : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {isAnonymous ? "Anonymous Mode Enabled" : "Enable Anonymous Mode"}
                    </button>
                  </div>

                  {/* Personal Fields (if not anonymous) */}
                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={complaintName}
                          onChange={(e) => setComplaintName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="student@ckpipsr.ac.in"
                          value={complaintEmail}
                          onChange={(e) => setComplaintEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                        <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={complaintPhone}
                          onChange={(e) => setComplaintPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* Incident Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                        Enrollment No. / Batch
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 21102021001 (Optional)"
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                        Date / Time of Incident *
                      </label>
                      <input
                        type="date"
                        required
                        value={incidentDate}
                        onChange={(e) => setIncidentDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                        Location of Incident *
                      </label>
                      <select
                        value={incidentLocation}
                        onChange={(e) => setIncidentLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans"
                      >
                        <option value="Hostel Premise">Hostel Premise</option>
                        <option value="Campus Classrooms / Corridors">Campus Classrooms / Corridors</option>
                        <option value="Laboratories">Laboratories</option>
                        <option value="Canteen / Cafeteria">Canteen / Cafeteria</option>
                        <option value="Central Library">Central Library</option>
                        <option value="Bus / Transit Route">Bus / Transit Route</option>
                        <option value="Outside Campus / Online Media">Outside Campus / Online Media</option>
                      </select>
                    </div>
                  </div>

                  {/* Incident Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                      Incident Details & Nature of Grievance *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please provide factual details of the incident, including names or descriptions of persons involved, witness names, and specifics of what took place..."
                      value={incidentDetails}
                      onChange={(e) => setIncidentDetails(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#1a5d2e] font-sans resize-y"
                    />
                  </div>

                  {/* File Upload Attachment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
                      Supporting Evidence / Document / Audio-Video (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-slate-200 hover:border-emerald-500/50 rounded-2xl p-4 sm:p-6 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all">
                      <input
                        type="file"
                        id="arc-file-upload"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                        <Upload size={24} className="text-slate-400" />
                        <div className="text-xs sm:text-sm font-medium text-slate-700">
                          {fileName ? (
                            <span className="text-[#1a5d2e] font-mono font-bold">{fileName}</span>
                          ) : (
                            <span>Drag and drop file here, or <strong className="text-[#1a5d2e]">browse</strong></span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          PDF, JPG, PNG, MP4, MP3 (Max 25MB)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button & Emergency Note */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
                      <ShieldCheck size={16} className="text-[#1a5d2e] shrink-0" />
                      <span>Protected under the Whistleblower & Anti-Ragging Confidentiality Act</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#1a5d2e] hover:bg-emerald-800 text-white font-sans font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Send size={16} />
                      <span>Submit Grievance Report</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </SubPageLayout>
  );
}
